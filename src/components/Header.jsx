import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, MessageCircle, Store, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO, CATEGORIES } from '../data/products';

export const Header = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  const { totalCount, totalPrice, setCurrentView } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const el = document.getElementById('seccion-ofertas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeCategory = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Logo FERRENINAN Transparente sin bordes blancos */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="/" className="flex items-center gap-2 group py-1">
              <img
                src="/logo.png"
                alt="FERRENINAN"
                className="h-11 md:h-13 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>
          </div>

          {/* Buscador Promart Style con Dropdown Animado Personalizado */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl hidden md:flex items-center border-2 border-brand-500 rounded-xl bg-white shadow-sm focus-within:ring-2 focus-within:ring-brand-300 transition-all relative"
          >
            {/* Custom Animated Category Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-700 px-3.5 py-2.5 rounded-l-lg border-r border-gray-200 transition-colors cursor-pointer select-none max-w-[190px]"
              >
                <span className="truncate">{activeCategory.name}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180 text-brand-500' : ''
                  }`}
                />
              </button>

              {/* Menú Desplegable con Animación Fluida */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                  <div className="px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    Seleccionar Categoría
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-brand-50 text-brand-600 font-bold border-l-4 border-brand-500'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-brand-600'
                          }`}
                        >
                          <span className="truncate">{cat.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Input de Búsqueda */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="¿Qué estás buscando? (Ej. Cemento Sol, Drywall 1/2, Ladrillo, Thinner...)"
                className="w-full px-4 py-2 text-xs sm:text-sm outline-none placeholder-gray-400 bg-transparent"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Botón Buscar */}
            <button
              type="submit"
              className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 transition-colors rounded-r-lg flex items-center justify-center font-bold"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>

          {/* Acciones Derecha */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Sedes */}
            <div className="hidden lg:flex items-center gap-2 text-left text-xs text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <Store className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <div>
                <span className="block text-[10px] text-gray-500 uppercase font-semibold">Almacenes</span>
                <span className="font-bold text-gray-900 truncate">Jesús María / Breña</span>
              </div>
            </div>

            {/* Asesor WhatsApp Rápido */}
            <a
              href={`https://wa.me/${COMPANY_INFO.phoneClean}?text=${encodeURIComponent('¡Hola FERRENINAN! Deseo hacer una consulta sobre materiales de construcción.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Cotizar Obra</span>
            </a>

            {/* Carrito de Compras Estilo Promart (Abre página de Carrito) */}
            <button
              onClick={() => setCurrentView('cart')}
              className="relative flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-3 sm:px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-lg group"
              aria-label="Abrir Carrito de Compras"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
                {totalCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-brand-dark text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {totalCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-red-100">Mi Carrito</span>
                <span className="text-xs font-black text-white">
                  {totalPrice > 0 ? `S/ ${totalPrice.toFixed(2)}` : 'Ver Pedido'}
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* Buscador Mobile */}
        <div className="mt-2.5 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border-2 border-brand-500 rounded-lg overflow-hidden bg-white"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar cemento, drywall, ladrillos..."
              className="w-full px-3 py-2 text-xs outline-none"
            />
            <button
              type="submit"
              className="bg-brand-500 text-white px-3 py-2 flex items-center justify-center"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </header>
  );
};
