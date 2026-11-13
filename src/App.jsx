import React, { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { Benefits } from './components/Benefits';
import { ProductCarouselRow } from './components/ProductCarouselRow';
import { PromoBanner } from './components/PromoBanner';
import { PromoModal } from './components/PromoModal';
import { ProductGrid } from './components/ProductGrid';
import { CartPage } from './components/CartPage';
import { ComplaintsBookModal } from './components/ComplaintsBookModal';
import { Footer } from './components/Footer';
import { PRODUCTS, CATEGORIES } from './data/products';
import { ArrowRight } from 'lucide-react';

function StoreContent() {
  const { currentView, setCurrentView } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [showFullCatalog, setShowFullCatalog] = useState(false);

  // Filtros de categoría para las píldoras estilo Promart (Imagen 3)
  const exclusivePills = [
    { id: 'todos', label: 'Renueva y Construye' },
    { id: 'cementos', label: 'Cementos y Ladrillos' },
    { id: 'agregados', label: 'Agregados x Bolsa' },
    { id: 'drywall', label: 'Drywall Gyplac' },
    { id: 'pinturas', label: 'Pinturas y Acabados' },
    { id: 'quimicos', label: 'Químicos Losaro' },
    { id: 'desmonte', label: 'Desmonte' },
  ];

  // Productos para los carruseles horizontales
  const featuredOfferProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.badge || p.price !== null);
  }, []);

  const drywallAndPaintProducts = useMemo(() => {
    return PRODUCTS.filter(p => ['drywall', 'pinturas', 'quimicos'].includes(p.category));
  }, []);

  const heavyConstructionProducts = useMemo(() => {
    return PRODUCTS.filter(p => ['cementos', 'agregados', 'fierros', 'desmonte'].includes(p.category));
  }, []);

  const isBrowsingAll = searchTerm.trim().length > 0 || selectedCategory !== 'todos' || showFullCatalog;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans text-gray-900">
      
      {/* Barra superior de anuncios y beneficios */}
      <TopBar />

      {/* Cabecera Promart con buscador, dropdown animado y logo transparente */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentView === 'cart') setCurrentView('home');
        }}
      />

      {/* Menú de categorías desplegable y accesos */}
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentView === 'cart') setCurrentView('home');
        }}
      />

      {/* VISTA 1: PÁGINA INDEPENDIENTE DE CARRITO DE COMPRAS (Promart Checkout) */}
      {currentView === 'cart' ? (
        <main className="flex-1">
          <CartPage />
        </main>
      ) : isBrowsingAll ? (
        /* VISTA 2: CATÁLOGO COMPLETO / BÚSQUEDA */
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 pt-4">
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchTerm('');
                setShowFullCatalog(false);
              }}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
            >
              ← Volver a la portada de ofertas y promociones
            </button>
          </div>

          <ProductGrid
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </main>
      ) : (
        /* VISTA 3: PORTADA DINÁMICA PROMART STYLE */
        <main className="flex-1 space-y-2">
          
          {/* 1. Carrusel Hero Promart */}
          <HeroSlider onSelectCategory={setSelectedCategory} />

          {/* 2. Propuestas de valor */}
          <Benefits />

          {/* 3. Fila 1: "Descuentos Exclusivos" con píldoras de filtro (Imagen 3) */}
          <div id="seccion-ofertas">
            <ProductCarouselRow
              title="Descuentos Exclusivos"
              subtitle="Ofertas seleccionadas en cemento, drywall, pinturas y agregados con entrega inmediata."
              products={featuredOfferProducts}
              categoryPills={exclusivePills}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* 4. Banner Publicitario Intersticial de Oferta (Imagen 2) */}
          <PromoBanner onExplore={() => setShowFullCatalog(true)} />

          {/* 5. Fila 2: "Materiales de Construcción y Agregados" (Imagen 4) */}
          <ProductCarouselRow
            title="Materiales de Construcción y Agregados"
            subtitle="Precios por mayor y menor en Cemento Sol, Apu, Ladrillos y Arena por bolsa."
            products={heavyConstructionProducts}
            onSelectCategory={setSelectedCategory}
          />

          {/* 6. Showcase "Crea y Construye": Drywall y Acabados (Imagen 4) */}
          <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-500 block mb-1">
                    Especialistas en Tabiquería
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                    Sistema Drywall Gyplac y Acabados de Pintura
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xl">
                    Planchas de yeso estándar y antihumedad, perfiles parantes y rieles galvanizados, masillas y pinturas látex de primera calidad.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('drywall');
                    setShowFullCatalog(true);
                  }}
                  className="bg-brand-dark hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                >
                  <span>Ver Todo Drywall</span>
                  <ArrowRight className="w-3.5 h-3.5 text-yellow-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {drywallAndPaintProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="border border-gray-100 rounded-xl p-3 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-brand-200 transition-all flex flex-col justify-between"
                  >
                    <img src={p.image} alt={p.name} className="w-full h-32 object-contain mix-blend-multiply mb-2" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 truncate">{p.name}</h4>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-sm font-black text-brand-600">
                          {p.price ? `S/ ${p.price.toFixed(2)}` : 'A cotizar'}
                        </span>
                        <span className="text-[10px] text-gray-500">{p.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Fila 3: Pinturas, Acabados y Químicos Losaro */}
          <ProductCarouselRow
            title="Pinturas, Acabados y Solventes Losaro"
            subtitle="Látex Pato, Vencelátex, American Colors, Thinner y Bencina para acabado profesional."
            products={drywallAndPaintProducts}
            onSelectCategory={setSelectedCategory}
          />

          {/* 8. Botón Prominente para Abrir Catálogo Completo */}
          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <button
              onClick={() => setShowFullCatalog(true)}
              className="bg-brand-500 hover:bg-brand-600 text-white font-black text-sm px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Ver Catálogo Completo (68 Productos y Servicios)
            </button>
          </div>

        </main>
      )}

      {/* Publicidad Flotante Automática Estilo Promart (Imagen 2) */}
      <PromoModal />

      {/* Libro de Reclamaciones Virtual Oficial INDECOPI */}
      <ComplaintsBookModal />

      {/* Pie de Página */}
      <Footer onSelectCategory={(cat) => {
        setSelectedCategory(cat);
        if (currentView === 'cart') setCurrentView('home');
        setShowFullCatalog(true);
      }} />

    </div>
  );
}

export function App() {
  return (
    <CartProvider>
      <StoreContent />
    </CartProvider>
  );
}

export default App;
