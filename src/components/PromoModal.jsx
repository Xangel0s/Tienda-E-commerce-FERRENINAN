import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import { useCart } from '../context/CartContext';

export const PromoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('ferreninan_promo_dismissed');
      if (!dismissed) {
        setIsOpen(true);
      }
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('ferreninan_promo_dismissed', 'true');
  };

  if (!isOpen) return null;

  const promoProduct = {
    id: 'promo-cem-sol',
    name: 'Pack Cemento Sol Tipo I (10 Bolsas)',
    category: 'cementos',
    price: 31.50,
    regularPrice: 34.50,
    unit: 'Bolsa',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    description: 'Cemento Portland Tipo I de alta resistencia con descuento especial para obra.'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      
      {/* Contenedor del Popup estilo Promart Imagen 1 */}
      <div className="relative bg-gradient-to-br from-brand-dark via-gray-900 to-black text-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-700 overflow-hidden flex flex-col md:flex-row">
        
        {/* Botón Cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 bg-black/60 hover:bg-black text-white p-1.5 rounded-full transition-colors"
          aria-label="Cerrar publicidad"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lado Izquierdo: Imagen del Producto sin emojis */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-tr from-brand-900/80 via-black to-blue-950/40 p-6 flex flex-col items-center justify-center min-h-[220px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500/20 via-transparent to-transparent pointer-events-none"></div>
          
          <img
            src={promoProduct.image}
            alt={promoProduct.name}
            className="w-48 h-48 object-cover rounded-xl shadow-2xl border border-white/10 z-10 hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/product-placeholder.svg';
            }}
          />

          <span className="mt-3 text-[11px] font-semibold text-gray-300 tracking-wide z-10 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-green-400" />
            Stock disponible para entrega inmediata
          </span>
        </div>

        {/* Lado Derecho: Contenido con dominio .com (sin emojis) */}
        <div className="w-full md:w-1/2 bg-brand-500 p-6 flex flex-col justify-between text-white relative">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-yellow-300">
                EXCLUSIVO EN
              </span>
              <span className="text-sm font-black tracking-tight bg-white text-brand-dark px-2 py-0.5 rounded">
                FERRENINAN.com
              </span>
            </div>

            <h3 className="text-lg font-black leading-tight text-white">
              {promoProduct.name}
            </h3>

            {/* Caja de Precio Azul/Cyan Promart */}
            <div className="flex items-baseline gap-2">
              <div className="bg-cyan-400 text-gray-950 font-black px-3 py-1 rounded-md text-2xl shadow">
                S/ 31<span className="text-sm">.50</span>
              </div>
              <div className="text-xs">
                <span className="text-red-100 line-through block">Precio regular: S/ 34.50</span>
                <span className="text-yellow-200 font-bold text-[10px]">Ahorras S/ 3.00 x bolsa</span>
              </div>
            </div>

            {/* Cupón Promocional Estilo Promart */}
            <div className="bg-white text-gray-900 rounded-xl p-3 shadow-lg flex items-center justify-between gap-3 border-2 border-dashed border-gray-300">
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-gray-500">
                  LLEVATE
                </span>
                <span className="text-base font-black text-brand-600 leading-none">
                  10% DSCTO
                </span>
                <span className="block text-[9px] text-gray-500 mt-0.5">
                  Adicional en flete por compras desde S/ 200
                </span>
              </div>

              <div className="bg-brand-dark text-white rounded-lg px-3 py-2 text-center">
                <span className="block text-[9px] text-gray-400 uppercase font-semibold">USA EL CUPON:</span>
                <span className="text-xs font-black tracking-widest text-yellow-400">FERRE10</span>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="pt-4 flex gap-2">
            <button
              onClick={() => {
                addToCart(promoProduct, 10);
                handleClose();
              }}
              className="flex-1 bg-white hover:bg-gray-100 text-brand-dark font-black text-xs py-2.5 px-3 rounded-lg shadow-md transition-all text-center"
            >
              Añadir 10 Bolsas al Carrito
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.phoneClean}?text=${encodeURIComponent('Hola FERRENINAN, deseo consultar sobre la promocion de Cemento Sol con el cupon FERRE10 para despacho a obra.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
