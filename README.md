## Autores

- Gisel Montoya 

# Tienda 3D Interactiva

![Tienda 3D Interactiva](public/images/chair.jpg)

## Descripción

Gis Store es una aplicación web que permite visualizar productos en 3D, registrarse, comprar, agregar favoritos, gestionar envíos y generar facturas personalizadas. El diseño está inspirado en tiendas como IKEA, pero con un estilo propio y moderno.

## Características Principales

- **Autenticación Local**: Sistema de registro e inicio de sesión con localStorage.
- **Catálogo de Productos 3D**: Visualización de productos con modelos 3D interactivos.
- **Carrito de Compras**: Gestión completa de productos con cálculo de subtotal, IVA y total.
- **Sistema de Favoritos**: Permite guardar productos favoritos para cada usuario.
- **Generación de Facturas**: Creación de facturas detalladas con información del comprador y productos.
- **Historial de Compras**: Seguimiento de todas las compras realizadas por el usuario.
- **Diseño Responsivo**: Interfaz adaptable a dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuario.
- **Next.js**: Framework de React para aplicaciones web.
- **TypeScript**: Superset de JavaScript con tipado estático.
- **Tailwind CSS**: Framework de CSS para diseño rápido y responsivo.
- **Shadcn/UI**: Componentes de UI reutilizables y accesibles.
- **Model-Viewer**: Componente web para visualización de modelos 3D.
- **LocalStorage**: Para persistencia de datos en el navegador.
- **Lucide React**: Biblioteca de iconos.
- **Date-fns**: Biblioteca para manipulación de fechas.

## Requisitos Previos

- Node.js (versión 18.x o superior)
- npm o yarn

## Instalación

1. Clona el repositorio:
   \`\`\`bash
   git clone https://github.com/tu-usuario/tienda-3d-interactiva.git
   cd tienda-3d-interactiva
   \`\`\`

2. Instala las dependencias:
   \`\`\`bash
   npm install
   # o
   yarn install
   \`\`\`

3. Inicia el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   # o
   yarn dev
   \`\`\`

4. Abre tu navegador y visita `http://localhost:3000`

## Estructura de Archivos

\`\`\`
tienda-3d/
├── app/                    # Páginas de la aplicación (Next.js App Router)
│   ├── cart/               # Página del carrito
│   ├── favorites/          # Página de favoritos
│   ├── history/            # Página de historial de compras
│   ├── product/[id]/       # Página de detalle de producto
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página principal
├── components/             # Componentes reutilizables
│   ├── auth-provider.tsx   # Proveedor de autenticación
│   ├── cart-provider.tsx   # Proveedor del carrito
│   ├── favorites-provider.tsx # Proveedor de favoritos
│   ├── invoice.tsx         # Componente de factura
│   ├── login-dialog.tsx    # Diálogo de inicio de sesión
│   ├── navbar.tsx          # Barra de navegación
│   ├── product-card.tsx    # Tarjeta de producto
│   ├── product-grid.tsx    # Cuadrícula de productos
│   ├── register-dialog.tsx # Diálogo de registro
│   └── shipping-form.tsx   # Formulario de envío
├── lib/                    # Utilidades y datos
│   ├── data.ts             # Datos de productos
│   ├── types.ts            # Definiciones de tipos
│   └── utils.ts            # Funciones de utilidad
├── public/                 # Archivos estáticos
│   ├── images/             # Imágenes de productos
│   └── models/             # Modelos 3D (.glb)
├── types/                  # Tipos adicionales
│   └── model-viewer.d.ts   # Definición de tipos para model-viewer
└── README.md               # Este archivo
\`\`\`

## Uso

### Navegación

- **Página Principal**: Muestra el catálogo de productos.
- **Detalle de Producto**: Haz clic en un producto para ver su detalle y modelo 3D.
- **Carrito**: Accede al carrito desde el ícono en la barra de navegación.
- **Favoritos**: Guarda tus productos favoritos haciendo clic en el ícono de corazón.
- **Historial**: Revisa tus compras anteriores (requiere inicio de sesión).

### Autenticación

1. Haz clic en "Registrarse" para crear una nueva cuenta.
2. Ingresa tu nombre, correo electrónico y contraseña.
3. Una vez registrado, puedes iniciar sesión con tu correo y contraseña.

### Compra de Productos

1. Navega por el catálogo y añade productos al carrito.
2. Ve al carrito para revisar tus productos seleccionados.
3. Ajusta las cantidades o elimina productos si es necesario.
4. Haz clic en "Proceder al Pago" para continuar.
5. Completa el formulario de envío con tus datos.
6. Revisa la factura generada y confirma tu compra.

### Visualización 3D

- En la página de detalle del producto, puedes interactuar con el modelo 3D:
  - Gira el modelo arrastrando con el mouse.
  - Haz zoom con la rueda del mouse.
  - El modelo rota automáticamente para mostrar todos los ángulos.

## Personalización

### Añadir Nuevos Productos

Para añadir nuevos productos, edita el archivo `lib/data.ts` siguiendo la estructura existente:

\`\`\`typescript
{
  id: "9",
  name: "Nombre del Producto",
  description: "Descripción detallada del producto...",
  price: 299.99,
  image: "/images/tu-imagen.jpg",
  modelUrl: "/models/tu-modelo.glb",
}
\`\`\`

### Modelos 3D

Los modelos 3D deben estar en formato GLB y ubicarse en la carpeta `public/models/`. Para obtener mejores resultados, asegúrate de que los modelos:

- Estén optimizados para web (tamaño reducido)
- Tengan materiales y texturas correctamente configurados
- Estén centrados en el origen (0,0,0)
