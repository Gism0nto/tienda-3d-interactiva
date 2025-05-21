"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { products } from "@/lib/data"
import type { Product } from "@/lib/types"
import { useCart } from "@/components/cart-provider"
import { useFavorites } from "@/components/favorites-provider"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  useEffect(() => {
    // Simulate loading from API
    const timer = setTimeout(() => {
      const foundProduct = products.find((p) => p.id === productId)
      setProduct(foundProduct || null)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
    }
  }

  const handleToggleFavorite = () => {
    if (!product) return

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const favoriteStatus = product ? isFavorite(product.id) : false

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <Skeleton className="h-[400px] w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <div className="flex space-x-4 pt-4">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <p>El producto que estás buscando no existe o ha sido eliminado.</p>
          <Button className="mt-4" asChild>
            <a href="/">Volver a la tienda</a>
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <Tabs defaultValue="image">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="image">Imagen</TabsTrigger>
                <TabsTrigger value="3d">Modelo 3D</TabsTrigger>
              </TabsList>
              <TabsContent value="image" className="relative h-[400px] w-full">
                <Image
                  src={product.image || "/placeholder.svg?height=400&width=400"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </TabsContent>
              <TabsContent value="3d">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `
                      <model-viewer
                        src="${product.modelUrl}"
                        alt="${product.name}"
                        auto-rotate
                        camera-controls
                        shadow-intensity="1"
                        environment-image="neutral"
                        exposure="0.8"
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                        style="width: 100%; height: 400px; background-color: #f5f5f5;"
                      ></model-viewer>
                    `,
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <Button variant="ghost" size="icon" onClick={handleToggleFavorite} className="h-10 w-10">
                <Heart className={cn("h-6 w-6", favoriteStatus ? "fill-red-500 text-red-500" : "text-gray-500")} />
              </Button>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">${product.price.toFixed(2)}</p>
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Descripción</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="flex space-x-4 mt-8">
              <Button size="lg" onClick={handleAddToCart} className="flex-1 md:flex-none md:min-w-[200px]">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Agregar al Carrito
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleFavorite}
                className={cn(favoriteStatus && "border-red-500 text-red-500 hover:bg-red-50")}
              >
                <Heart className={cn("h-5 w-5", favoriteStatus && "fill-red-500")} />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
