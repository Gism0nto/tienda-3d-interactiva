"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "./auth-provider"
import type { CartItem } from "@/lib/types"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { PrinterIcon } from "lucide-react"

type InvoiceProps = {
  items: CartItem[]
  subtotal: number
  iva: number
  total: number
  shippingData: {
    fullName: string
    address: string
    city: string
    state: string
    zipCode: string
    phone: string
  }
  onConfirm: () => void
  onCancel: () => void
}

export function Invoice({ items, subtotal, iva, total, shippingData, onConfirm, onCancel }: InvoiceProps) {
  const { user } = useAuth()
  const currentDate = new Date()
  const formattedDate = format(currentDate, "PPP", { locale: es })
  const formattedTime = format(currentDate, "p", { locale: es })
  const invoiceNumber = `INV-${Math.floor(Math.random() * 10000)}-${currentDate.getFullYear()}`

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="print:shadow-none print:border-none">
        <CardHeader className="border-b print:border-gray-300">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Factura</CardTitle>
              <p className="text-sm text-gray-500">
                {formattedDate} - {formattedTime}
              </p>
              <p className="text-sm font-medium mt-1">No. {invoiceNumber}</p>
            </div>
            <div className="text-right print:hidden">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <PrinterIcon className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Datos del Cliente</h3>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{shippingData.fullName}</p>
                <p>{shippingData.address}</p>
                <p>
                  {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                </p>
                <p>Tel: {shippingData.phone}</p>
                {user && <p>Email: {user.email}</p>}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Datos de la Empresa</h3>
              <div className="space-y-1 text-sm">
                <p className="font-medium">Gis Store S.A</p>
                <p>Cra 1 A3 #58-33</p>
                <p>Santiago de Cali</p>
                <p>Tel: (55) 3117172456</p>
                
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Detalle de Productos</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio Unit.
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.product.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.product.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">${item.product.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IVA (16%):</span>
                <span>${iva.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 text-sm text-gray-500">
            <p className="mb-1">
              <span className="font-medium">Método de pago:</span> Tarjeta de crédito
            </p>
            <p className="mb-1">
              <span className="font-medium">Fecha estimada de entrega:</span>{" "}
              {format(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000), "PPP", {
                locale: es,
              })}
            </p>
            <p className="mt-4 text-xs">
              Esta factura es un comprobante de compra. Conserve este documento para cualquier reclamación o devolución.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t print:hidden">
          <Button variant="outline" onClick={onCancel}>
            Volver
          </Button>
          <Button onClick={onConfirm}>Confirmar Compra</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
