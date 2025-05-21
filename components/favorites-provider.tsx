"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Product } from "@/lib/types"
import { useAuth } from "./auth-provider"

type FavoritesContextType = {
  favorites: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])
  const { user } = useAuth()

  // Load favorites from localStorage on mount or when user changes
  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`)
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      } else {
        setFavorites([])
      }
    } else {
      setFavorites([])
    }
  }, [user])

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites))
    }
  }, [favorites, user])

  const addToFavorites = (product: Product) => {
    if (!user) return

    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === product.id)) {
        return prevFavorites
      }
      return [...prevFavorites, product]
    })
  }

  const removeFromFavorites = (productId: string) => {
    if (!user) return

    setFavorites((prevFavorites) => prevFavorites.filter((product) => product.id !== productId))
  }

  const isFavorite = (productId: string) => {
    return favorites.some((product) => product.id === productId)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
