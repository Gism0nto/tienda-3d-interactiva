"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/components/favorites-provider"
import { useAuth } from "@/components/auth-provider"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Mis Favoritos</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Inicia sesión para ver tus favoritos</h2>
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para guardar y ver tus productos favoritos.</p>
            <Button>Iniciar Sesión</Button>
          </div>
        </main>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Mis Favoritos</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No tienes favoritos</h2>
            <p className="text-gray-600 mb-6">Aún no has agregado productos a tus favoritos.</p>
            <Button asChild>
              <Link href="/">Explorar Productos</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Mis Favoritos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
