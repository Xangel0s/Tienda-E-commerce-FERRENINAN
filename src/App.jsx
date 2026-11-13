import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { Benefits } from './components/Benefits';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { ComplaintsBookModal } from './components/ComplaintsBookModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';

export function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        
        {/* Barra superior de anuncios y contacto */}
        <TopBar />

        {/* Cabecera estilo Promart con logo y buscador */}
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Menú de Categorías y Megamenú */}
        <Navbar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Banners Promocionales Promart */}
        <HeroSlider onSelectCategory={setSelectedCategory} />

        {/* Propuesta de valor */}
        <Benefits />

        {/* Catálogo de Productos y Filtros */}
        <main className="flex-1">
          <ProductGrid
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </main>

        {/* Carrito Lateral Deslizante */}
        <CartDrawer />

        {/* Libro de Reclamaciones Virtual INDECOPI */}
        <ComplaintsBookModal />

        {/* Pie de Página */}
        <Footer onSelectCategory={setSelectedCategory} />

      </div>
    </CartProvider>
  );
}

export default App;
