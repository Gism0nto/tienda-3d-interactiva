"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import type { CartItem } from "@/lib/types"

type Purchase = {
  id: string
  date: string
  items: CartItem[]
  subtotal: number
  iva: number
  total: number
  shipping: {
    fullName: string
    address: string
    city: string
    state: string
    zipCode: string
    phone: string
  }
}

export default function HistoryPage() {
  const { user, isAuthenticated } = useAuth()
  const [purchases, setPurchases] = useState<Purchase[]>([])

  useEffect(() => {
    if (user) {
      const storedPurchases = localStorage.getItem(`compras_por_usuario_${user.id}`)
      if (storedPurchases) {
        setPurchases(JSON.parse(storedPurchases))
      }
    }
  }, [user])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Historial de Compras</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Inicia sesión para ver tu historial</h2>
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para ver tu historial de compras.</p>
            <Button>Iniciar Sesión</Button>
          </div>
        </main>
      </div>
    )
  }

  if (purchases.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Historial de Compras</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No tienes compras realizadas</h2>
            <p className="text-gray-600 mb-6">Aún no has realizado ninguna compra en nuestra tienda.</p>
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
        <h1 className="text-2xl font-bold mb-6">Historial de Compras</h1>
        <div className="space-y-6">
          {purchases
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Compra del {format(parseISO(purchase.date), "PPP", { locale: es })}
                    </CardTitle>
                    <span className="text-sm text-gray-500">
                      {format(parseISO(purchase.date), "p", { locale: es })}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-2">Productos</h3>
                      <div className="space-y-2">
                        {purchase.items.map((item) => (
                          <div key={item.product.id} className="flex justify-between">
                            <div className="flex-1">
                              <Link href={`/product/${item.product.id}`} className="font-medium hover:underline">
                                {item.product.name}
                              </Link>
                              <span className="text-gray-500 ml-2">x{item.quantity}</span>
                            </div>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Enviado a:</p>
                        <p className="font-medium">{purchase.shipping.fullName}</p>
                        <p className="text-sm text-gray-600">
                          {purchase.shipping.address}, {purchase.shipping.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total:</p>
                        <p className="font-bold text-lg">${purchase.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
    </div>
  )
}
