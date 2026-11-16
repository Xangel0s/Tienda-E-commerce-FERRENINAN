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
│   ├── videos/             # Bucles de video CC0 MP4 (construcción y demolición)
│   ├── robots.txt          # Directivas para Googlebot, Bingbot, WhatsApp y Sitemap
│   └── sitemap.xml         # Mapa del sitio XML con 69 productos, categorías y fotos
├── scripts/
│   └── generate-sitemap.js # Generador dinámico de sitemap.xml a partir del catálogo
├── src/
│   ├── assets/             # Recursos estáticos
│   ├── components/         # Componentes modulares UI
│   │   ├── TopBar.jsx              # Barra superior de beneficios y contacto
│   │   ├── Header.jsx              # Barra de búsqueda con dropdown animado, logo y carrito
│   │   ├── Navbar.jsx              # Megamenú, píldoras y teléfono vertical apilado
│   │   ├── HeroSlider.jsx          # Banners rotativos con videos de obra y planos CAD
│   │   ├── Benefits.jsx            # Propuestas de valor (Despacho a obra, etc.)
│   │   ├── ProductCard.jsx         # Tarjeta de producto con precios Promart y navegación a PDP
│   │   ├── ProductCarouselRow.jsx  # Carrusel horizontal con píldoras de filtrado por categoría
│   │   ├── ProductPage.jsx         # Página dedicada de Producto (PDP) con SKU, specs y WhatsApp
│   │   ├── ProductGrid.jsx         # Catálogo completo con filtros y ordenamiento
│   │   ├── PromoBanner.jsx         # Banner publicitario intersticial para contratistas
│   │   ├── PromoModal.jsx          # Popup comercial con cupón FERRE10 y sin emojis
│   │   ├── CartDrawer.jsx          # Drawer lateral rápido de carrito
│   │   ├── CartPage.jsx            # Página independiente de Checkout y cálculo de flete
│   │   ├── ComplaintsBookModal.jsx # Libro de Reclamaciones INDECOPI
│   │   ├── SEO.jsx                 # Gestor dinámico de meta tags, Open Graph y JSON-LD
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
  - Imágenes Oficiales de Catálogo: Extraídas y sincronizadas directamente del catálogo oficial de Promart.pe en resolución 1000x1000 con fondo blanco limpio y marcas peruanas certificadas (Cemento Sol, Cemento Apu, Cemento Andino, Ladrillos Pirámide, Gyplac, Aceros Arequipa, Prodac, CPP, Truper, Pavco, Indeco).
  - Diseño Minimalista de Tarjeta de Producto: Icono de techo naranja con FERRENINAN, marca oficial en negrita mayúscula, título tipográfico limpio, formato de precio Promart (s/ [Entero]^[Decimales]) y botón directo de compra, unificado en carruseles, catálogo y productos relacionados.
- **Reglas de Git y Commits**:
  - Usar conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`.
  - Crear commits tras cada tarea completada.
  - No modificar `.env` ni archivos de credenciales.

---

## 4. Estrategia y Estándares de SEO
- **robots.txt**: Configurado con directivas para Googlebot, Googlebot-Image, Bingbot y rastreadores de previsualización de Open Graph (WhatsApp, Facebook, Twitter). Bloqueo de URLs duplicadas por parámetros de búsqueda y carrito.
- **sitemap.xml**: Generación automática mediante script (`npm run sitemap` / `npm run build`), indexando portada (prioridad 1.0), categorías (0.85) y los 69 productos individuales (0.80) con etiquetas `image:image` para Google Imágenes.
- **SEO Dinámico en Cliente (SEO.jsx)**:
  - Actualización de `document.title` por página y producto con formato `[Producto] | [Marca] - Precio Distribuidor Lima | FERRENINAN`.
  - Meta tags dinámicas: description, keywords, canonical, `og:title`, `og:description`, `og:image`, `og:url` y Twitter cards.
  - Datos Estructurados JSON-LD (`schema.org`):
    - `HardwareStore` / `WholesaleStore`: Con RUC, teléfonos, geo-coordenadas, sedes en Jesús María y Breña, reputación agregada (`AggregateRating` 4.9/5), cobertura en Lima Metropolitana y catálogo de servicios B2B (`hasOfferCatalog`).
    - `Service`: Esquema especializado para Suministro Mayorista a Pie de Obra, Eliminación Autorizada de Desmonte con Camiones Volquetes y Asesoría Técnica por Metrado de Planos CAD.
    - `Product`: Para cada PDP con precio en PEN, disponibilidad InStock, marca, SKU, vendedor mayorista y valoración.
    - `BreadcrumbList`: Jerarquía de navegación para snippets enriquecidos en Google.
  - **Posicionamiento como el Mejor Proveedor del Rubro**:
    - Meta títulos y descripciones orientados a contratistas, empresas constructoras y maestros de obra.
    - Palabras clave prioritarias: `"mejor proveedor de materiales de construccion lima"`, `"proveedor para obras y contratistas"`, `"distribuidor mayorista cemento sol lima"`, `"servicio de eliminacion de desmonte autorizado"`, `"despacho a pie de obra"`.
