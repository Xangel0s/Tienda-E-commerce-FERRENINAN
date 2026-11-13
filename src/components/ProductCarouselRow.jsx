import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, MessageCircle, Check, Truck } from 'lucide-react';
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
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {title}
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
              const discountPercent = product.regularPrice && hasPrice
                ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-xl hover:border-brand-500 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between snap-start group relative"
                >
                  <div>
                    {/* Cabecera de la Tarjeta */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded truncate max-w-[130px]">
                        {product.brand || 'FERRENINAN'}
                      </span>

                      {product.badge && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-brand-500 text-white shadow-xs">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Imagen del Producto */}
                    <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2.5 mb-3 border border-gray-100 group-hover:bg-white transition-colors">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-106 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/product-placeholder.svg';
                        }}
                      />
                    </div>

                    {/* Nombre y Unidad */}
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                      {product.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 min-h-[38px] group-hover:text-brand-600 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <span className="text-[11px] text-gray-500 mt-1 block">
                      Presentación: <strong>{product.unit}</strong>
                    </span>
                  </div>

                  {/* Precios Estilo Promart */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    {hasPrice ? (
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-cyan-50 border border-cyan-200 text-cyan-800 font-black text-sm px-2 py-0.5 rounded">
                            S/ {product.price.toFixed(2)}
                          </div>
                          {product.regularPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              S/ {product.regularPrice.toFixed(2)}
                            </span>
                          )}
                          {discountPercent > 0 && (
                            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1 py-0.5 rounded border border-red-200">
                              -{discountPercent}%
                            </span>
                          )}
                        </div>
                        <span className="block text-[10px] text-gray-500 font-medium">
                          Despacho directo a pie de obra
                        </span>
                      </div>
                    ) : (
                      <div className="mb-3 p-2 bg-blue-50/70 border border-blue-100 rounded-xl">
                        <span className="text-xs font-black text-blue-900 block">
                          Precio al por mayor y menor
                        </span>
                        <span className="text-[10px] text-blue-700">
                          Cotiza según volumen para despacho
                        </span>
                      </div>
                    )}

                    {/* Botón de Acción */}
                    <div>
                      {hasPrice ? (
                        <button
                          type="button"
                          onClick={() => handleAdd(product)}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                            isAdded
                              ? 'bg-green-600 text-white'
                              : 'bg-brand-500 hover:bg-brand-600 text-white active:scale-95'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>En Carrito</span>
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
                          className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Cotizar por WhatsApp</span>
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
