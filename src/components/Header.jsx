import React from 'react';
import { Search, ShoppingCart, MessageCircle, MapPin, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO, CATEGORIES } from '../data/products';

export const Header = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  const { totalCount, totalPrice, setIsCartOpen } = useCart();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo FERRENINAN */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 group">
              <img
                src="/logo.png"
                alt="FERRENINAN Logo"
                className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback textual si no carga la imagen
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden">
                <span className="text-2xl font-black tracking-tight text-brand-500">
                  FERRE<span className="text-brand-dark">NINAN</span>
                </span>
                <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Materiales de Construcción
                </span>
              </div>
            </a>
          </div>

          {/* Buscador Promart Style */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl hidden md:flex items-center border-2 border-brand-500 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-300 transition-all bg-white"
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-50 text-xs text-gray-700 px-3 py-2.5 border-r border-gray-200 outline-none hover:bg-gray-100 cursor-pointer max-w-[170px] truncate"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="¿Qué estás buscando? (Ej. Cemento Sol, Drywall 1/2, Ladrillo, Thinner...)"
                className="w-full px-4 py-2 text-sm outline-none placeholder-gray-400"
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

            <button
              type="submit"
              className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 transition-colors flex items-center justify-center"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Acciones Derecha */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Ubicación / Sedes */}
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
              className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Cotizar Obra</span>
            </a>

            {/* Carrito de Compras Estilo Promart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg group"
              aria-label="Abrir Carrito"
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
                <span className="block text-[10px] uppercase font-bold tracking-wider text-red-100">Mi Pedido</span>
                <span className="text-xs font-black text-white">
                  {totalPrice > 0 ? `S/ ${totalPrice.toFixed(2)}` : 'Ver Carrito'}
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* Buscador Mobile (visible solo en celulares) */}
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
