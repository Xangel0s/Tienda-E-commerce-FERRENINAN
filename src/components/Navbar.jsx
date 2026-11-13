import React, { useState } from 'react';
import { Menu, X, ChevronDown, Truck, Phone } from 'lucide-react';
import { CATEGORIES, COMPANY_INFO } from '../data/products';

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
              className="flex items-center gap-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 transition-colors"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>Todas las Categorías</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Menú Desplegable con Animación */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 w-72 bg-white text-gray-800 shadow-2xl rounded-b-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  Explorar por Departamento
                </div>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsMenuOpen(false);
                      const el = document.getElementById('seccion-catalogo');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-brand-50 hover:text-brand-600 transition-colors ${
                      selectedCategory === cat.id ? 'bg-brand-50 text-brand-600 border-l-4 border-brand-500' : 'text-gray-700'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-gray-400 text-xs">›</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accesos rápidos horizontales estilo Promart (Sin emojis) */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-semibold overflow-x-auto py-2">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                selectedCategory === 'todos' ? 'bg-brand-500 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Catálogo Completo
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
              Pinturas y Acabados
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
                selectedCategory === 'desmonte' ? 'bg-yellow-400 text-gray-900 font-bold' : 'bg-yellow-400/90 text-gray-950 font-bold hover:bg-yellow-400'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-gray-900" />
              <span>Desmonte</span>
            </button>
          </div>

          {/* Formato solicitado por el usuario: Texto en la línea superior, Número debajo */}
          <div className="hidden xl:flex items-center gap-2.5 pl-4 border-l border-gray-800">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <div className="flex flex-col text-right leading-none">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                Ventas a Obra
              </span>
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-black text-white hover:text-green-400 tracking-wide transition-colors"
              >
                {COMPANY_INFO.phone}
              </a>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};
