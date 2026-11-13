import React, { useState } from 'react';
import { Menu, X, ChevronDown, Sparkles, Truck, Tag, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Navbar = ({ selectedCategory, setSelectedCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-brand-dark text-white border-b border-gray-800 relative z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          
          {/* Botón "Todas las Categorías" - Promart Mega Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 transition-colors"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>Todas las Categorías</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Menú Desplegable */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 w-72 bg-white text-gray-800 shadow-2xl rounded-b-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  Explorar por Departamento
                </div>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsMenuOpen(false);
                      // Scroll al catálogo
                      const el = document.getElementById('catalogo');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-brand-50 hover:text-brand-600 transition-colors ${
                      selectedCategory === cat.id ? 'bg-brand-50 text-brand-600 border-l-4 border-brand-500' : 'text-gray-700'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-gray-400 text-[10px]">›</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accesos rápidos horizontales estilo Promart */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-semibold overflow-x-auto py-2">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                selectedCategory === 'todos' ? 'bg-brand-500 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Catálogo Completo</span>
            </button>

            <button
              onClick={() => setSelectedCategory('cementos')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                selectedCategory === 'cementos' ? 'bg-brand-500 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Cementos y Ladrillos
            </button>

            <button
              onClick={() => setSelectedCategory('agregados')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                selectedCategory === 'agregados' ? 'bg-brand-500 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Agregados x Bolsa
            </button>

            <button
              onClick={() => setSelectedCategory('drywall')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                selectedCategory === 'drywall' ? 'bg-brand-500 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Drywall Gyplac
            </button>

            <button
              onClick={() => setSelectedCategory('pinturas')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                selectedCategory === 'pinturas' ? 'bg-brand-500 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Pinturas & Acabados
            </button>

            <button
              onClick={() => setSelectedCategory('quimicos')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                selectedCategory === 'quimicos' ? 'bg-brand-500 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Químicos Losaro
            </button>

            <button
              onClick={() => setSelectedCategory('desmonte')}
              className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                selectedCategory === 'desmonte' ? 'bg-yellow-400 text-gray-900 font-bold' : 'text-yellow-400 hover:bg-gray-800'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Desmonte</span>
            </button>
          </div>

          {/* Badge de atención rápida */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-gray-300 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Ventas a Obra: <strong>+51 908 747 531</strong></span>
          </div>

        </div>
      </div>
    </nav>
  );
};
