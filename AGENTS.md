# AGENTS.md - FERRENINAN E-Commerce Project

Este documento define la arquitectura, normas de codificación, convenciones de diseño y flujo de trabajo para agentes y desarrolladores que trabajen en el proyecto **FERRENINAN**.

---

## 1. Visión General del Proyecto
- **Nombre Comercial**: FERRENINAN
- **Razón Social**: FERRENINANYA S.A.C.
- **Canal de Pedidos**: WhatsApp (+51 908 747 531) con mensaje preconfigurado y desglose de items.
- **Inspiración de Diseño**: Promart.pe (arquitectura de navegación, búsqueda en tiempo real, badges, drawer de carrito y megamenú) adaptado a la identidad de FERRENINAN.
- **Colores Principales**: Rojo FERRENINAN (`#FE0000` / `#DC2626`), Negro Carbón (`#111827`) y Blanco (`#FFFFFF`).
- **Cumplimiento Legal**: Libro de Reclamaciones Virtual conforme a la Ley N° 29571 (INDECOPI) con código correlativo e impresión/descarga de constancia.

---

## 2. Estructura de Directorios
```
Ferre/
├── public/                 # Assets públicos, logos optimizados, favicon
│   ├── images/             # Blueprints, SVG fallbacks e imágenes de productos locales
│   └── videos/             # Bucles de video CC0 MP4 (construcción y demolición)
├── src/
│   ├── assets/             # Recursos estáticos
│   ├── components/         # Componentes modulares UI
│   │   ├── TopBar.jsx              # Barra superior de beneficios y contacto
│   │   ├── Header.jsx              # Barra de búsqueda con dropdown animado, logo y carrito
│   │   ├── Navbar.jsx              # Megamenú, píldoras y teléfono vertical apilado
│   │   ├── HeroSlider.jsx          # Banners rotativos con videos de obra y planos CAD
│   │   ├── Benefits.jsx            # Propuestas de valor (Despacho a obra, etc.)
│   │   ├── ProductCard.jsx         # Tarjeta de producto con precios Promart y modal rápido
│   │   ├── ProductCarouselRow.jsx  # Carrusel horizontal con píldoras de filtrado por categoría
│   │   ├── ProductDetailModal.jsx  # Vista rápida / Ficha técnica con specs y compra
│   │   ├── ProductGrid.jsx         # Catálogo completo con filtros y ordenamiento
│   │   ├── PromoBanner.jsx         # Banner publicitario intersticial para contratistas
│   │   ├── PromoModal.jsx          # Popup comercial con cupón FERRE10 y sin emojis
│   │   ├── CartDrawer.jsx          # Drawer lateral rápido de carrito
│   │   ├── CartPage.jsx            # Página independiente de Checkout y cálculo de flete
│   │   ├── ComplaintsBookModal.jsx # Libro de Reclamaciones INDECOPI
│   │   └── Footer.jsx              # Pie de página con datos fiscales y enlaces
│   ├── context/
│   │   └── CartContext.jsx         # Estado global del carrito, vista actual y WhatsApp
│   ├── data/
│   │   └── products.js             # Catálogo oficial de 69 productos con imágenes verificadas
│   ├── App.jsx                     # Componente raíz y enrutamiento de vistas
│   ├── main.jsx                    # Punto de entrada Vite
│   └── index.css                   # Estilos base y Tailwind directives
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── AGENTS.md
```

---

## 3. Principios y Convenciones de Código
- **Componentes modulares y reutilizables**: Principio de responsabilidad única (SOLID / KISS).
- **Estilo visual**: Tailwind CSS con diseño responsive mobile-first y desktop optimizado.
- **Manejo de Productos**:
  - Productos con precio: Visualización en S/ con formato `S/ XX.XX` y cálculo automático en carrito.
  - Productos sin precio (a cotizar): Etiqueta `"Precio a Cotizar"`, botón `"Consultar Precio por WhatsApp"` que envía el mensaje directo con el producto seleccionado.
- **Reglas de Git y Commits**:
  - Usar conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`.
  - Crear commits tras cada tarea completada.
  - No modificar `.env` ni archivos de credenciales.
