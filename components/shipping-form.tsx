"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "./cart-provider"
import { useAuth } from "./auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Invoice } from "./invoice"

type ShippingFormProps = {
  onCancel: () => void
}

type ShippingData = {
  fullName: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
}

export function ShippingForm({ onCancel }: ShippingFormProps) {
  const { items, subtotal, total, iva, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [showInvoice, setShowInvoice] = useState(false)
  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const { fullName, address, city, state, zipCode, phone } = shippingData
    if (!fullName || !address || !city || !state || !zipCode || !phone) {
      alert("Por favor complete todos los campos")
      return
    }

    // Show invoice
    setShowInvoice(true)
  }

  const handleConfirmPurchase = () => {
    if (!user) return

    // Save purchase to history
    const purchaseData = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      items: items,
      subtotal,
      iva,
      total,
      shipping: shippingData,
    }

    // Get existing purchases
    const existingPurchases = JSON.parse(localStorage.getItem(`compras_por_usuario_${user.id}`) || "[]")

    // Add new purchase
    existingPurchases.push(purchaseData)
    localStorage.setItem(`compras_por_usuario_${user.id}`, JSON.stringify(existingPurchases))

    // Clear cart
    clearCart()

    // Redirect to history page
    router.push("/history")
  }

  if (showInvoice) {
    return (
      <Invoice
        items={items}
        subtotal={subtotal}
        iva={iva}
        total={total}
        shippingData={shippingData}
        onConfirm={handleConfirmPurchase}
        onCancel={() => setShowInvoice(false)}
      />
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Información de Envío</CardTitle>
            <CardDescription>Ingresa los datos para el envío de tu pedido</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} id="shipping-form">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Nombre Completo</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={shippingData.fullName}
                    onChange={handleChange}
                    placeholder="Jhon Montoya"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    name="address"
                    value={shippingData.address}
                    onChange={handleChange}
                    placeholder="Calle Principal #123"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingData.city}
                      onChange={handleChange}
                      placeholder="Santiago de Cali"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingData.state}
                      onChange={handleChange}
                      placeholder="Sur / Norte"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="zipCode">Código Postal</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={shippingData.zipCode}
                      onChange={handleChange}
                      placeholder="01000"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleChange}
                      placeholder="3001234567"
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onCancel}>
              Volver al Carrito
            </Button>
            <Button type="submit" form="shipping-form">
              Continuar
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator className="my-2" />
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
