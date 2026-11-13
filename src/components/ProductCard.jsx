import React, { useState } from 'react';
import { ShoppingCart, MessageCircle, Plus, Minus, Check, Truck, ShieldCheck, FileText, Play } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart, getWhatsAppProductInquiryUrl } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const hasPrice = product.price !== null && !isNaN(product.price);
  const savings = product.regularPrice && hasPrice ? (product.regularPrice - product.price) : 0;
  const discountPercent = product.regularPrice && hasPrice
    ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-xl hover:border-brand-500 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group relative">
      
      <div>
        {/* Cabecera de la Tarjeta: Tag de Stock y Marca */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {hasPrice ? (
            <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Truck className="w-3 h-3 text-green-600" />
              <span>Despacho a obra</span>
            </span>
          ) : (
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
              Precio a Cotizar
            </span>
          )}

          <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded truncate max-w-[120px]">
            {product.brand || 'FERRENINAN'}
          </span>
        </div>

        {/* Zona Visual del Producto */}
        <div className="w-full h-44 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center relative mb-3 border border-gray-100 group-hover:bg-white transition-colors">
          {product.badge && (
            <span className="absolute top-2 left-2 z-10 text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-xs bg-brand-500 text-white">
              {product.badge}
            </span>
          )}

          {product.cardType === 'video' || product.video ? (
            <div className="relative w-full h-full bg-black overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-105"
              >
                <source src={product.video || '/videos/desmonte-loop.mp4'} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              <span className="absolute top-2 right-2 z-10 text-[9px] font-bold px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white border border-white/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Video Obra
              </span>
            </div>
          ) : product.cardType === 'blueprint' ? (
            <div className="relative w-full h-full bg-blue-950 overflow-hidden flex items-center justify-center">
              <img
                src="/images/blueprint-bg.jpg"
                alt="Plano Arquitectónico"
                className="w-full h-full object-cover opacity-80 mix-blend-screen group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />
              <span className="absolute top-2 right-2 z-10 text-[9px] font-bold px-2 py-0.5 rounded bg-blue-900/80 backdrop-blur-xs text-cyan-200 border border-cyan-400/30 flex items-center gap-1">
                <FileText className="w-3 h-3 text-cyan-300" />
                Plano CAD
              </span>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-106 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/product-placeholder.svg';
              }}
            />
          )}
        </div>

        {/* Información del Producto */}
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-0.5">
            {product.category}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 min-h-[38px] leading-snug">
            {product.name}
          </h3>
          <span className="text-[11px] text-gray-500 mt-1 block">
            Unidad: <strong className="text-gray-700">{product.unit}</strong>
          </span>
        </div>
      </div>

      {/* Bloque Inferior: Precios y Acciones */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        
        {/* Precios Estilo Promart */}
        {hasPrice ? (
          <div className="space-y-1 mb-3">
            {product.regularPrice && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 line-through">
                  S/ {product.regularPrice.toFixed(2)}
                </span>
                {discountPercent > 0 && (
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded border border-red-200">
                    -{discountPercent}%
                  </span>
                )}
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-black text-brand-600">S/</span>
              <span className="text-2xl font-black text-brand-600 tracking-tight">
                {product.price.toFixed(2)}
              </span>
              <span className="text-[10px] text-gray-500 font-medium ml-1">
                / {product.unit}
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-3 p-2 bg-blue-50/70 border border-blue-100 rounded-xl">
            <span className="text-xs font-black text-blue-900 block">
              Precio al por mayor y menor
            </span>
            <span className="text-[10px] text-blue-700">
              Cotiza según volumen para despacho a obra
            </span>
          </div>
        )}

        {/* Controles de Compra */}
        {hasPrice ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {/* Stepper numérico */}
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
                  aria-label="Disminuir"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
                  aria-label="Aumentar"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Botón Añadir al Carrito Promart Rojo */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                  isAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-brand-500 hover:bg-brand-600 text-white active:scale-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Agregado</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Agregar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            <a
              href={getWhatsAppProductInquiryUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Cotizar por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleAdd}
              className="w-full text-center text-[10px] font-semibold text-gray-500 hover:text-brand-600 py-1 transition-colors"
            >
              + Añadir a lista de cotización
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
