import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductCarouselRow = ({ title, subtitle, products, categoryPills }) => {
  const scrollRef = useRef(null);
  const [activePill, setActivePill] = useState(categoryPills ? categoryPills[0]?.id : null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const displayProducts = activePill && activePill !== 'todos'
    ? products.filter(p => p.category === activePill)
    : products;

  return (
    <section className="py-8 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Cabecera de la Sección y Pills Estilo Promart */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>

          {/* Filtros por Categoría */}
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

        {/* Carrusel Horizontal de Productos con Flechas Circulares */}
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
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth py-2 px-1 no-scrollbar snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-56 sm:w-64 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
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
