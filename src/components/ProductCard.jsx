import React, { useState } from 'react';
import { ShoppingCart, MessageCircle, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart, getWhatsAppProductInquiryUrl } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const hasPrice = product.price !== null && !isNaN(product.price);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-card-hover hover:border-brand-300 transition-all duration-300 flex flex-col justify-between group">
      
      {/* Zona Superior: Badge e Imagen */}
      <div className="relative p-4 pb-0">
        
        {/* Badges estilo Promart */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-sm ${
              product.badge.includes('OFERTA') || product.badge.includes('SUPER')
                ? 'bg-brand-500 text-white'
                : product.badge.includes('VENTAS') || product.badge.includes('VENDIDO')
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-brand-dark text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {!hasPrice && (
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-600 text-white shadow-sm">
              A Cotizar
            </span>
          )}
        </div>

        {/* Imagen con zoom */}
        <div className="w-full h-44 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-2 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              // Fallback image en caso de error
              e.target.src = 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500&q=80';
            }}
          />
        </div>
      </div>

      {/* Zona Media: Datos del Producto */}
      <div className="p-4 pt-3 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
            {product.category}
          </span>
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 min-h-[40px] leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[32px]">
            {product.description}
          </p>
        </div>

        {/* Precios Estilo Promart */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          {hasPrice ? (
            <div>
              {product.regularPrice && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400 line-through">
                    S/ {product.regularPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                    Ahorro S/ {(product.regularPrice - product.price).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xs font-black text-brand-500">S/</span>
                <span className="text-2xl font-black tracking-tight text-brand-500">
                  {product.price.toFixed(2)}
                </span>
                <span className="text-[11px] text-gray-500 font-medium ml-1">
                  / {product.unit}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-1">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                Precio a Cotizar con Asesor
              </span>
              <span className="block text-[11px] text-gray-500 mt-1">
                Disponibilidad por mayor y menor ({product.unit})
              </span>
            </div>
          )}

          {/* Acciones de Compra y Carrito */}
          <div className="mt-4 space-y-2">
            
            {hasPrice ? (
              <div className="flex items-center gap-2">
                {/* Selector de Cantidad */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    onClick={handleDecrement}
                    className="p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Botón Añadir al Carrito Promart */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-black tracking-wide transition-all shadow-sm ${
                    isAdded
                      ? 'bg-green-600 text-white'
                      : 'bg-brand-500 hover:bg-brand-600 text-white active:scale-95'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Agregado!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Agregar</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-1.5">
                {/* Botón WhatsApp directo para producto a cotizar */}
                <a
                  href={getWhatsAppProductInquiryUrl(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold bg-green-500 hover:bg-green-600 text-white transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar Precio WhatsApp</span>
                </a>

                {/* Botón para agregarlo al carrito para cotización grupal */}
                <button
                  onClick={handleAdd}
                  className="w-full text-center text-[11px] font-semibold text-gray-600 hover:text-brand-500 py-1 transition-colors"
                >
                  + Agregar a mi lista de cotización
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
