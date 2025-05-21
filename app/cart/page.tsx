"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { ShippingForm } from "@/components/shipping-form"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, total, iva, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [showShippingForm, setShowShippingForm] = useState(false)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Parece que aún no has agregado productos a tu carrito.</p>
            <Button asChild>
              <Link href="/">Explorar Productos</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Show login prompt
      alert("Por favor inicia sesión para continuar con la compra")
      return
    }

    setShowShippingForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>

        {!showShippingForm ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Productos</h2>
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex flex-col sm:flex-row gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <Link href={`/product/${item.product.id}`} className="text-lg font-medium hover:underline">
                              {item.product.name}
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.product.id)}
                              className="h-8 w-8 text-gray-500 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">${item.product.price.toFixed(2)}</p>
                          <div className="flex items-center mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const value = Number.parseInt(e.target.value)
                                if (!isNaN(value) && value > 0) {
                                  updateQuantity(item.product.id, value)
                                }
                              }}
                              className="h-8 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Resumen de Compra</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IVA (16%)</span>
                    <span>${iva.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full mt-6" onClick={handleCheckout}>
                  Proceder al Pago
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <ShippingForm onCancel={() => setShowShippingForm(false)} />
        )}
      </main>
    </div>
  )
}
