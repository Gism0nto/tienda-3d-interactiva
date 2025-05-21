"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in on component mount
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = (email: string, password: string) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const userInfo = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      }
      setUser(userInfo)
      setIsAuthenticated(true)
      localStorage.setItem("currentUser", JSON.stringify(userInfo))
      return true
    }
    return false
  }

  const register = (name: string, email: string, password: string) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      return false
    }

    // Create new user
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    }

    // Add to users array
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Log in the user
    const userInfo = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }
    setUser(userInfo)
    setIsAuthenticated(true)
    localStorage.setItem("currentUser", JSON.stringify(userInfo))

    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("currentUser")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
