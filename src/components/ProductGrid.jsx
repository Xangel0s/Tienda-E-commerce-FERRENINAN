import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/products';
import { Filter, ArrowUpDown, SearchX } from 'lucide-react';

export const ProductGrid = ({
  products,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm
}) => {
  const [sortBy, setSortBy] = useState('destacados');

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Filtro por categoría
      const matchesCategory =
        selectedCategory === 'todos' || prod.category === selectedCategory;

      // Filtro por término de búsqueda
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
      // 'destacados' por defecto
      return 0;
    });
  }, [products, selectedCategory, searchTerm, sortBy]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Barra de Filtro y Ordenamiento Promart Style */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              {activeCategoryObj ? activeCategoryObj.name : 'Catálogo de Productos'}
            </h2>
            <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-brand-200">
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
                Limpiar filtro
              </button>
            </p>
          )}
        </div>

        {/* Control de Ordenamiento */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <ArrowUpDown className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500 whitespace-nowrap hidden sm:inline">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg px-3 py-2 outline-none hover:border-gray-300 cursor-pointer"
          >
            <option value="destacados">Destacados y Ofertas</option>
            <option value="precio-asc">Precio: Menor a Mayor</option>
            <option value="precio-desc">Precio: Mayor a Menor</option>
            <option value="nombre">Nombre: A - Z</option>
          </select>
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
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-lg mx-auto my-8">
          <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            No encontramos coincidencias para tu búsqueda o filtro seleccionado.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('todos');
              setSearchTerm('');
            }}
            className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Ver todos los productos
          </button>
        </div>
      )}

    </section>
  );
};
