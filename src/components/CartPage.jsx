import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, Send, ShieldCheck, Truck, Check, ArrowLeft, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/products';

export const CartPage = () => {
  const {
    cartItems,
    setCurrentView,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    totalPrice,
    hasQuoteItems,
    getWhatsAppOrderUrl
  } = useCart();

  // Cupón de descuento
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Selector de distrito personalizado (con animación, sin select nativo)
  const districts = [
    { id: 'Jesus Maria', name: 'Jesús María', cost: 15.00 },
    { id: 'Brena', name: 'Breña', cost: 15.00 },
    { id: 'Pueblo Libre', name: 'Pueblo Libre', cost: 15.00 },
    { id: 'San Miguel', name: 'San Miguel', cost: 20.00 },
    { id: 'Magdalena', name: 'Magdalena del Mar', cost: 20.00 },
    { id: 'Lince', name: 'Lince', cost: 20.00 },
    { id: 'Cercado de Lima', name: 'Cercado de Lima', cost: 20.00 },
    { id: 'Otros Distritos', name: 'Otros Distritos de Lima', cost: 30.00 }
  ];

  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const districtRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (districtRef.current && !districtRef.current.contains(event.target)) {
        setIsDistrictDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to top al entrar a la página del carrito
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'FERRE10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Cupón no válido. Usa FERRE10');
    }
  };

  const discountAmount = (totalPrice * discountPercent) / 100;
  const shippingCost = selectedDistrict.cost;
  const finalTotal = Math.max(0, totalPrice - discountAmount + (totalPrice > 0 ? shippingCost : 0));

  const handleCheckout = (e) => {
    e.preventDefault();
    const fullNotes = [
      customerData.notes,
      `Distrito: ${selectedDistrict.name} (Flete estimado S/ ${shippingCost.toFixed(2)})`,
      couponApplied ? `Cupón aplicado: FERRE10 (-10%)` : ''
    ].filter(Boolean).join(' | ');

    const orderPayload = {
      ...customerData,
      notes: fullNotes
    };

    const url = getWhatsAppOrderUrl(orderPayload);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb de Navegación */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-brand-500 transition-colors"
            >
              Inicio
            </button>
            <span>/</span>
            <span className="text-gray-900 font-bold">Carrito de Compras</span>
          </div>

          <button
            onClick={() => setCurrentView('home')}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Seguir comprando</span>
          </button>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Columna Izquierda: Listado de Items en Carrito (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Franja de Despacho Promart */}
              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                <div className="p-2.5 bg-brand-500 text-white rounded-xl flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                    Despacho a Pie de Obra en Lima Metropolitana
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    Sedes en Jesús María y Breña. Entregas coordinadas el mismo día.
                  </p>
                </div>
              </div>

              {/* Contenedor de Items */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
                <div className="p-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-black text-gray-900">
                    Artículos en tu Pedido ({totalCount})
                  </h3>
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-red-500 hover:text-red-700 font-bold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Vaciar Carrito
                  </button>
                </div>

                {cartItems.map((item) => {
                  const hasPrice = item.price !== null && !isNaN(item.price);
                  return (
                    <div key={item.id} className="p-4 sm:p-5 flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-xl bg-gray-50 p-2 border border-gray-200 flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/product-placeholder.svg';
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black uppercase tracking-wider text-brand-500 block mb-0.5">
                          {item.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        
                        <div className="text-xs text-gray-500 mt-1">
                          {hasPrice ? (
                            <span>S/ {item.price.toFixed(2)} por {item.unit}</span>
                          ) : (
                            <span className="text-blue-600 font-bold">Precio a cotizar</span>
                          )}
                        </div>

                        {/* Stepper de Cantidad */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Subtotal del Producto */}
                          <div className="text-right">
                            {hasPrice ? (
                              <span className="text-sm sm:text-base font-black text-brand-600">
                                S/ {(item.price * item.quantity).toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-gray-400">
                                A cotizar
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Botón Eliminar */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Botón Inferior para volver al catálogo */}
              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('home')}
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 text-brand-500" />
                  <span>Continuar explorando el catálogo</span>
                </button>
              </div>

            </div>

            {/* Columna Derecha: Resumen de la Orden Estilo Promart (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5 sticky top-24">
                
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">
                    Resumen de la Orden
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Seguro</span>
                  </div>
                </div>

                {/* Calculadora de Despacho con Dropdown Animado Personalizado */}
                <div className="relative" ref={districtRef}>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-brand-500" />
                    <span>Calcular Despacho a Distrito:</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setIsDistrictDropdownOpen(!isDistrictDropdownOpen)}
                    className="w-full flex items-center justify-between p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 hover:bg-gray-100 transition-colors shadow-xs"
                  >
                    <span>{selectedDistrict.name} (S/ {selectedDistrict.cost.toFixed(2)})</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDistrictDropdownOpen ? 'rotate-180 text-brand-500' : ''}`} />
                  </button>

                  {/* Dropdown Animado */}
                  {isDistrictDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-40 animate-in fade-in slide-in-from-top-2 duration-150 max-h-60 overflow-y-auto">
                      {districts.map((d) => {
                        const isSelected = selectedDistrict.id === d.id;
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => {
                              setSelectedDistrict(d);
                              setIsDistrictDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                              isSelected ? 'bg-brand-50 text-brand-600 font-bold' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span>{d.name}</span>
                            <span className="font-bold text-gray-900">S/ {d.cost.toFixed(2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Cupón Promart */}
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Cupón (Ej: FERRE10)"
                      className="flex-1 text-xs p-2.5 border border-gray-300 rounded-xl outline-none focus:border-brand-500 uppercase font-semibold"
                    />
                    <button
                      type="submit"
                      className="bg-brand-dark hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                    >
                      Aplicar
                    </button>
                  </form>
                  {couponApplied && (
                    <span className="text-[11px] text-green-600 font-bold mt-1.5 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Cupón FERRE10 aplicado: 10% de descuento.
                    </span>
                  )}
                  {couponError && (
                    <span className="text-[11px] text-red-500 font-semibold mt-1 block">
                      {couponError}
                    </span>
                  )}
                </div>

                {/* Desglose de Precios */}
                <div className="space-y-2.5 pt-3 border-t border-gray-100 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal Productos:</span>
                    <span className="font-bold text-gray-800">S/ {totalPrice.toFixed(2)}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Descuento Cupón (10%):</span>
                      <span>- S/ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Despacho a {selectedDistrict.name}:</span>
                    <span className="font-bold text-gray-800">S/ {shippingCost.toFixed(2)}</span>
                  </div>

                  {hasQuoteItems && (
                    <div className="text-[11px] text-blue-700 font-medium bg-blue-50 p-2.5 rounded-xl border border-blue-100">
                      Incluye productos sujetos a cotización inmediata por mayor o menor.
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-3 border-t border-gray-200">
                    <span className="text-sm font-black text-gray-900">Total a Pagar:</span>
                    <span className="text-2xl font-black text-brand-600">
                      S/ {finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Datos de Entrega a Obra */}
                <div className="space-y-2.5 pt-3 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-700 block uppercase tracking-wider">
                    Datos para el Envío a Obra:
                  </span>
                  <input
                    type="text"
                    placeholder="Tu Nombre / Razón Social"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl outline-none focus:border-brand-500"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono / Celular de contacto"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl outline-none focus:border-brand-500"
                  />
                  <input
                    type="text"
                    placeholder="Dirección exacta o referencia de obra"
                    value={customerData.address}
                    onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl outline-none focus:border-brand-500"
                  />
                </div>

                {/* Botón Promart Rojo sin emojis en el pedido */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-black text-sm py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group active:scale-98"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span>Realizar Pedido por WhatsApp</span>
                </button>

                <p className="text-[10px] text-center text-gray-500 leading-snug">
                  Atención directa con nuestro asesor en el <strong>{COMPANY_INFO.phone}</strong> • Sedes Jesús María y Breña
                </p>

              </div>

            </div>

          </div>
        ) : (
          /* Carrito Vacío */
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto my-12 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-red-50 text-brand-500 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Añade cemento, agregados, drywall, pinturas o solicita servicio de desmonte para cotizar tu obra.
            </p>
            <button
              onClick={() => setCurrentView('home')}
              className="bg-brand-500 hover:bg-brand-600 text-white font-black text-xs px-6 py-3 rounded-xl transition-colors shadow"
            >
              Explorar Ofertas del Catálogo
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
