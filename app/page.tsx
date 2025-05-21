import { Navbar } from "@/components/navbar"
import { ProductGrid } from "@/components/product-grid"
import { products } from "@/lib/data"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Gis Store</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora nuestra colección de productos con visualización 3D interactiva. Compra, guarda tus favoritos y
              recibe en la comodidad de tu hogar.
            </p>
          </div>

          <ProductGrid products={products} />
        </section>
      </main>
      <footer className="bg-gray-100 py-8 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Gis Store. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
