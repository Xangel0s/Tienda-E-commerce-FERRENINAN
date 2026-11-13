import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/products';
import { ArrowUpDown, SearchX, Check, ChevronDown, Filter } from 'lucide-react';

export const ProductGrid = ({
  products,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm
}) => {
  const [sortBy, setSortBy] = useState('destacados');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Cerrar dropdown de ordenamiento al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortOptions = [
    { id: 'destacados', label: 'Destacados y Ofertas' },
    { id: 'precio-asc', label: 'Precio: Menor a Mayor' },
    { id: 'precio-desc', label: 'Precio: Mayor a Menor' },
    { id: 'nombre', label: 'Nombre: A - Z' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesCategory =
        selectedCategory === 'todos' || prod.category === selectedCategory;

      const cleanTerm = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !cleanTerm ||
        prod.name.toLowerCase().includes(cleanTerm) ||
        prod.description.toLowerCase().includes(cleanTerm) ||
        prod.category.toLowerCase().includes(cleanTerm);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'precio-asc') {
        const pA = a.price ?? 999999;
        const pB = b.price ?? 999999;
        return pA - pB;
      }
      if (sortBy === 'precio-desc') {
        const pA = a.price ?? -1;
        const pB = b.price ?? -1;
        return pB - pA;
      }
      if (sortBy === 'nombre') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [products, selectedCategory, searchTerm, sortBy]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);
  const activeSortObj = sortOptions.find(s => s.id === sortBy) || sortOptions[0];

  return (
    <section id="seccion-catalogo" className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Barra Principal de Título y Ordenamiento Promart Style */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {activeCategoryObj ? activeCategoryObj.name : 'Todos los Productos'}
            </h2>
            <span className="bg-red-50 text-brand-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-200">
              {filteredProducts.length} productos
            </span>
          </div>
          {searchTerm && (
            <p className="text-xs text-gray-500 mt-1">
              Resultados para la búsqueda: <strong className="text-gray-900">"{searchTerm}"</strong>
              <button
                onClick={() => setSearchTerm('')}
                className="text-brand-500 hover:underline ml-2 font-bold"
              >
                Limpiar búsqueda
              </button>
            </p>
          )}
        </div>

        {/* Dropdown Personalizado de Ordenamiento con Animación (Sin select nativo) */}
        <div className="relative flex items-center gap-2 justify-end" ref={sortRef}>
          <span className="text-xs text-gray-500 font-medium hidden sm:inline">Ordenar por:</span>
          
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-800 px-3.5 py-2 rounded-xl border border-gray-300 transition-colors shadow-xs"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <span>{activeSortObj.label}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isSortOpen ? 'rotate-180 text-brand-500' : ''}`} />
          </button>

          {isSortOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-52 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
              {sortOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSortBy(opt.id);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                    sortBy === opt.id ? 'bg-brand-50 text-brand-600 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-brand-500" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Barra de Filtro de Categorías Promart (Solicitado por el usuario) */}
      <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-xs mb-6">
        <div className="flex items-center gap-2 mb-2 px-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-brand-500" />
          <span>Filtrar por Categoría:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-brand-500 text-white border-brand-500 shadow-xs scale-102'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de Productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto my-8">
          <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            No hay productos que coincidan con la categoría o término buscado.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('todos');
              setSearchTerm('');
            }}
            className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Ver todos los productos
          </button>
        </div>
      )}

    </section>
  );
};
