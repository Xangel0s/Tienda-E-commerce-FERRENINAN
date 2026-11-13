import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, MessageCircle, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCarouselRow = ({ title, subtitle, products, categoryPills, onSelectCategory }) => {
  const scrollRef = useRef(null);
  const [activePill, setActivePill] = useState(categoryPills ? categoryPills[0]?.id : null);
  const { addToCart, getWhatsAppProductInquiryUrl } = useCart();
  const [addedId, setAddedId] = useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleAdd = (product) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const displayProducts = activePill && activePill !== 'todos'
    ? products.filter(p => p.category === activePill)
    : products;

  return (
    <section className="py-8 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Cabecera de la Sección y Pills Estilo Promart (Imagen 3) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span>{title}</span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </h2>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>

          {/* Category Filter Pills (Promart Style Imagen 3) */}
          {categoryPills && categoryPills.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
              {categoryPills.map((pill) => {
                const isActive = activePill === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => setActivePill(pill.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                      isActive
                        ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Carrusel Horizontal de Productos con Flechas circulares (Imagen 3 & 4) */}
        <div className="relative group/carousel">
          
          {/* Flecha Izquierda */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-xl border border-gray-200 text-gray-700 hover:text-brand-500 hover:border-brand-300 flex items-center justify-center transition-all opacity-90 hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Contenedor con Scroll Horizontal Fluido */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth py-2 px-1 no-scrollbar snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayProducts.map((product) => {
              const hasPrice = product.price !== null && !isNaN(product.price);
              const isAdded = addedId === product.id;

              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-card-hover hover:border-brand-300 transition-all flex flex-col justify-between snap-start group relative"
                >
                  {/* Badge y Logo FERRENINAN pequeño arriba */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase text-brand-500 tracking-wider flex items-center gap-1">
                        <span>▲</span> FERRENINAN
                      </span>
                      {product.badge && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-yellow-400 text-gray-900 shadow-xs">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Imagen del Producto */}
                    <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-2 mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Nombre y Categoría */}
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                      {product.category}
                    </span>
                    <h3 className="text-xs font-bold text-gray-900 line-clamp-2 min-h-[34px] group-hover:text-brand-600 transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  {/* Precios Estilo Promart con Caja Cyan (Imagen 3 & 4) */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    {hasPrice ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {/* Precio Oferta en Cyan / Rojo Promart */}
                          <div className="bg-cyan-50 border border-cyan-200 text-cyan-800 font-black text-sm px-2 py-0.5 rounded">
                            S/ {product.price.toFixed(2)}
                          </div>
                          {product.regularPrice && (
                            <span className="text-[11px] text-gray-400 line-through">
                              S/ {product.regularPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className="block text-[10px] text-gray-500 font-medium">
                          Por {product.unit} • Despacho a obra
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <span className="inline-block bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded border border-blue-200">
                          Precio a Cotizar
                        </span>
                        <span className="block text-[10px] text-gray-400">
                          Venta por mayor y menor
                        </span>
                      </div>
                    )}

                    {/* Botón de Acción */}
                    <div className="mt-3">
                      {hasPrice ? (
                        <button
                          onClick={() => handleAdd(product)}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                            isAdded
                              ? 'bg-green-600 text-white'
                              : 'bg-brand-500 hover:bg-brand-600 text-white active:scale-95'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>¡En Carrito!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Agregar al Carrito</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <a
                          href={getWhatsAppProductInquiryUrl(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Cotizar WhatsApp</span>
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Flecha Derecha */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-xl border border-gray-200 text-gray-700 hover:text-brand-500 hover:border-brand-300 flex items-center justify-center transition-all opacity-90 hover:opacity-100"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>
    </section>
  );
};
