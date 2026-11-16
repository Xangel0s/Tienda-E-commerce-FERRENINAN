import React, { useState } from 'react';
import { X, ShoppingCart, MessageCircle, Truck, ShieldCheck, Check, Plus, Minus, FileText, MapPin, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/products';

export const ProductDetailModal = ({ product, onClose }) => {
  const { addToCart, getWhatsAppProductInquiryUrl } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'delivery'

  if (!product) return null;

  const hasPrice = product.price !== null && !isNaN(product.price);
  const regularPrice = product.regularPrice || (hasPrice ? product.price * 1.15 : null);
  const discountPercent = regularPrice && hasPrice
    ? Math.round(((regularPrice - product.price) / regularPrice) * 100)
    : 0;

  const handleAdd = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  // Especificaciones técnicas generadas según categoría
  const getSpecs = () => {
    const defaultSpecs = [
      { label: 'Marca', value: product.brand || 'FERRENINAN' },
      { label: 'Presentación', value: product.unit || 'Unidad' },
      { label: 'Categoría', value: product.category.toUpperCase() },
      { label: 'Garantía', value: 'Garantía de fábrica / Distribuidor oficial' },
      { label: 'Disponibilidad', value: 'Stock inmediato para despacho a obra' },
      { label: 'Procedencia', value: 'Nacional / Con certificación de calidad' }
    ];

    if (product.category === 'cementos') {
      defaultSpecs.push(
        { label: 'Tipo de Cemento', value: 'Portland Tipo I / Tipo ICo según norma NTP 334.009' },
        { label: 'Peso por Bolsa', value: '42.5 kg' },
        { label: 'Uso Recomendado', value: 'Columnas, losas, zapatas, vigas y muros portantes' }
      );
    } else if (product.category === 'drywall') {
      defaultSpecs.push(
        { label: 'Sistema Constructivo', value: 'Sistema de Construcción en Seco (Drywall)' },
        { label: 'Espesor Nominal', value: '1/2" (12.7 mm) o 3/8" (9.5 mm)' },
        { label: 'Resistencia', value: 'Norma ASTM C1396 estándar y antihumedad RH' }
      );
    } else if (product.category === 'agregados') {
      defaultSpecs.push(
        { label: 'Granulometría', value: 'Seleccionada y zarandeada en cantera autorizada' },
        { label: 'Humedad', value: 'Controlada para óptima relación agua/cemento' }
      );
    } else if (product.category === 'fierros') {
      defaultSpecs.push(
        { label: 'Norma Técnica', value: 'NTP 341.031 Grado 60' },
        { label: 'Corrugación', value: 'Alta adherencia para estructuras antisísmicas' }
      );
    }

    return defaultSpecs;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-brand-500">
              FERRENINAN
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-bold text-gray-500 uppercase">
              SKU: {product.id.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del Modal con Scroll */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 no-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Lado Izquierdo: Visual (Imagen / Video / Plano) (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center p-4 relative group">
                
                {product.cardType === 'video' || product.video ? (
                  <div className="relative w-full h-full bg-black overflow-hidden rounded-xl">
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
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-white border border-white/20 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Video en Obra
                    </span>
                  </div>
                ) : product.cardType === 'blueprint' ? (
                  <div className="relative w-full h-full bg-blue-950 overflow-hidden rounded-xl flex items-center justify-center">
                    <img
                      src="/images/blueprint-bg.jpg"
                      alt="Plano Arquitectónico"
                      className="w-full h-full object-cover opacity-80 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:14px_14px] opacity-40 pointer-events-none" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded bg-blue-900/80 backdrop-blur-xs text-cyan-200 border border-cyan-400/30 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-cyan-300" />
                      Plano CAD Técnico
                    </span>
                  </div>
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/product-placeholder.svg';
                    }}
                  />
                )}

                {product.badge && (
                  <span className="absolute top-3 right-3 text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-xs bg-brand-500 text-white">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Badges de Confianza Promart */}
              <div className="w-full mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-gray-700 text-left leading-tight">
                    Despacho a pie de obra
                  </span>
                </div>
                <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-gray-700 text-left leading-tight">
                    Calidad garantizada
                  </span>
                </div>
              </div>
            </div>

            {/* Lado Derecho: Información de Compra y Precios (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {product.brand || 'FERRENINAN'}
                </span>

                <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                  {product.name}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Presentación oficial: <strong className="text-gray-800">{product.unit}</strong> | Código: {product.id}
                </p>
              </div>

              {/* Bloque de Precios Estilo Promart */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-2">
                {hasPrice ? (
                  <>
                    {regularPrice && (
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>Precio regular:</span>
                        <span className="line-through font-bold">S/ {regularPrice.toFixed(2)}</span>
                        {discountPercent > 0 && (
                          <span className="text-[11px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded">
                            -{discountPercent}% DCTO
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-black text-brand-600">S/</span>
                      <span className="text-3xl sm:text-4xl font-black text-brand-600 tracking-tight">
                        {product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">
                        por {product.unit}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                      <span className="font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                        Precio Distribuidor Solución Obra
                      </span>
                      <span className="text-gray-500 text-[11px]">
                        Precios incluyen I.G.V.
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="py-2">
                    <span className="text-sm font-black text-blue-900 block">
                      Precio Sujeto a Cotización por Volumen
                    </span>
                    <p className="text-xs text-blue-700 mt-1">
                      Precios especiales para contratistas y maestros de obra con entrega directa en obra.
                    </p>
                  </div>
                )}
              </div>

              {/* Descripción del Producto */}
              {product.description && (
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Controles de Compra / WhatsApp */}
              <div className="pt-3 border-t border-gray-100 space-y-3">
                {hasPrice ? (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    
                    {/* Stepper */}
                    <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden bg-white w-full sm:w-auto justify-between">
                      <button
                        type="button"
                        onClick={handleDecrement}
                        className="px-3.5 py-2.5 text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Disminuir"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-black text-gray-900">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={handleIncrement}
                        className="px-3.5 py-2.5 text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Botón Añadir al Carrito */}
                    <button
                      type="button"
                      onClick={handleAdd}
                      className={`flex-1 w-full py-3 px-6 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all shadow-md ${
                        isAdded
                          ? 'bg-green-600 text-white'
                          : 'bg-brand-500 hover:bg-brand-600 text-white active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>¡Agregado al Carrito!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Añadir {quantity} al Carrito</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : null}

                {/* Botón Asesor WhatsApp */}
                <a
                  href={getWhatsAppProductInquiryUrl(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-bold bg-green-600 hover:bg-green-700 text-white transition-all shadow-md flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar con Asesor por WhatsApp (+51 908 747 531)</span>
                </a>
              </div>

              {/* Cobertura de Entrega */}
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span>Despacho disponible para: Jesús María, Breña, Cercado de Lima, Pueblo Libre, San Miguel y toda Lima Metropolitana.</span>
              </div>

            </div>

          </div>

          {/* Sección de Pestañas: Especificaciones Técnicas */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex border-b border-gray-200 gap-6">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs sm:text-sm font-black border-b-2 transition-colors ${
                  activeTab === 'specs'
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Especificaciones Técnicas
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`pb-3 text-xs sm:text-sm font-black border-b-2 transition-colors ${
                  activeTab === 'delivery'
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Condiciones de Despacho a Obra
              </button>
            </div>

            <div className="pt-4">
              {activeTab === 'specs' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {getSpecs().map((spec, i) => (
                    <div key={i} className="flex justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                      <span className="font-bold text-gray-500">{spec.label}:</span>
                      <span className="font-semibold text-gray-900 text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 text-xs text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <p>
                    • <strong>Horario de atención y despacho:</strong> Lunes a Sábado de 7:30 AM a 6:30 PM.
                  </p>
                  <p>
                    • <strong>Sedes de almacenamiento:</strong> Av. General Garzón Nro. 1091 (Jesús María) y Jr. General Felipe Varela 1855 (Breña).
                  </p>
                  <p>
                    • <strong>Descarga a pie de obra:</strong> Camiones acondicionados para entrega rápida en Lima Metropolitana.
                  </p>
                  <p>
                    • <strong>Pedidos por volumen:</strong> Coordinación directa vía WhatsApp para programación de volquetes y cuadrillas.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
