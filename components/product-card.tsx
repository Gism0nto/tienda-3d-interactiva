"use client"

import type { Product } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "./cart-provider"
import { useFavorites } from "./favorites-provider"
import { cn } from "@/lib/utils"

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const favoriteStatus = isFavorite(product.id)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/product/${product.id}`} className="hover:underline">
            <h3 className="font-semibold text-lg">{product.name}</h3>
          </Link>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleToggleFavorite}>
            <Heart className={cn("h-5 w-5", favoriteStatus ? "fill-red-500 text-red-500" : "text-gray-500")} />
          </Button>
        </div>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
