"use client"

import Link from "next/link"
import { useAuth } from "./auth-provider"
import { useCart } from "./cart-provider"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, History, Menu, X, User, LogOut } from "lucide-react"
import { useState } from "react"
import { LoginDialog } from "./login-dialog"
import { RegisterDialog } from "./register-dialog"

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { items } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Gis Store
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Inicio
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link href="/favorites" className="text-gray-600 hover:text-gray-900">
              <Heart className="h-5 w-5" />
            </Link>
            {isAuthenticated && (
              <Link href="/history" className="text-gray-600 hover:text-gray-900">
                <History className="h-5 w-5" />
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="flex items-center space-x-1">
                  <LogOut className="h-4 w-4" />
                  <span>Salir</span>
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => setLoginOpen(true)}>
                  Iniciar Sesión
                </Button>
                <Button onClick={() => setRegisterOpen(true)}>Registrarse</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>
                Inicio
              </Link>
              <Link
                href="/cart"
                className="text-gray-600 hover:text-gray-900 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span>Carrito</span>
                {cartItemsCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link
                href="/favorites"
                className="text-gray-600 hover:text-gray-900 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-5 w-5 mr-2" />
                <span>Favoritos</span>
              </Link>
              {isAuthenticated && (
                <Link
                  href="/history"
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <History className="h-5 w-5 mr-2" />
                  <span>Historial</span>
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="h-5 w-5" />
                    <span>{user?.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="justify-start pl-0"
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Cerrar Sesión</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start pl-0"
                    onClick={() => {
                      setLoginOpen(true)
                      setMobileMenuOpen(false)
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    className="justify-start"
                    onClick={() => {
                      setRegisterOpen(true)
                      setMobileMenuOpen(false)
                    }}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <RegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} />
    </header>
  )
}
