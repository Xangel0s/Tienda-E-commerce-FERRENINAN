import React, { useState } from 'react';
import { ShoppingCart, MessageCircle, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart, getWhatsAppProductInquiryUrl, navigateToProduct } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const hasPrice = product.price !== null && !isNaN(product.price);
  const discountPercent = product.regularPrice && hasPrice
    ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
    : 0;

  // Formato Promart de precio: S/ [Entero]^[Decimales]
  const priceParts = hasPrice ? product.price.toFixed(2).split('.') : ['0', '00'];
  const intPart = priceParts[0];
  const decPart = priceParts[1];

  return (
    <div
      onClick={() => navigateToProduct(product)}
      className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between cursor-pointer group h-full select-none"
    >
      <div>
        {/* Imagen del Producto sobre fondo blanco limpio */}
        <div className="w-full h-44 sm:h-48 flex items-center justify-center p-2 mb-2 bg-white overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/product-placeholder.svg';
            }}
          />
        </div>

        {/* Insignia Retail Estilo Promart (Techo Naranja + FERRENINAN) */}
        <div className="flex items-center gap-1 text-[#f97316] font-bold text-[11px] tracking-tight mb-0.5">
          <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M12 4L3 12h3v8h12v-8h3L12 4z" />
          </svg>
          <span className="uppercase tracking-wider font-extrabold text-[10px]">
            FERRENINAN
          </span>
        </div>

        {/* Marca Oficial (SOL, APU, GYPLAC, PIRÁMIDE, etc.) */}
        <div className="text-[12px] sm:text-[13px] font-black text-gray-900 tracking-tight uppercase leading-tight">
          {product.brand || 'FERRENINAN'}
        </div>

        {/* Nombre / Título del Producto */}
        <h3 className="text-[13px] sm:text-[14px] text-gray-800 font-normal line-clamp-2 leading-snug mt-1 min-h-[38px] group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>

        {/* Presentación / Unidad */}
        <span className="text-[11px] text-gray-400 block mt-0.5">
          {product.unit}
        </span>
      </div>

      {/* Bloque de Precios y Acción */}
      <div className="mt-3 pt-2">
        {hasPrice ? (
          <div>
            {/* Precio Promart s/ 30.90 con decimales en superíndice */}
            <div className="flex items-baseline">
              <span className="text-xs font-bold text-gray-900 mr-1 self-baseline">s/</span>
              <span className="text-2xl sm:text-[26px] font-black text-gray-950 tracking-tight leading-none">
                {intPart}
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-950 -top-1.5 relative">
                .{decPart}
              </span>
            </div>

            {/* Precio Regular y Descuento */}
            {product.regularPrice && discountPercent > 0 && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] text-gray-400 line-through">
                  s/ {product.regularPrice.toFixed(2)}
                </span>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1 py-0.2 rounded">
                  -{discountPercent}%
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="py-1">
            <span className="inline-block text-[11px] font-bold text-brand-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded">
              Precio a Cotizar
            </span>
          </div>
        )}

        {/* Botón de Acción Estilo Promart */}
        <div className="mt-3">
          {hasPrice ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
              className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                isAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-brand-500 hover:bg-brand-600 text-white active:scale-98'
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
                  <span>Añadir</span>
                </>
              )}
            </button>
          ) : (
            <a
              href={getWhatsAppProductInquiryUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Cotizar</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
