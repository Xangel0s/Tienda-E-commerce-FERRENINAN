import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ShieldCheck, Tag, Truck, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/products';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    totalPrice,
    hasQuoteItems,
    getWhatsAppOrderUrl
  } = useCart();

  // Cupón de descuento estilo Promart
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Selector de distrito de despacho
  const [selectedDistrict, setSelectedDistrict] = useState('Jesus Maria');
  const [shippingCost, setShippingCost] = useState(15.00);

  // Datos del cliente
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'FERRE10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Cupón no válido. Prueba con FERRE10');
    }
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    if (['Jesus Maria', 'Brena', 'Pueblo Libre'].includes(district)) {
      setShippingCost(15.00);
    } else if (['San Miguel', 'Magdalena', 'Lince', 'Cercado de Lima'].includes(district)) {
      setShippingCost(20.00);
    } else {
      setShippingCost(30.00); // Otros distritos de Lima
    }
  };

  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalTotal = Math.max(0, totalPrice - discountAmount + (totalPrice > 0 ? shippingCost : 0));

  const handleCheckout = (e) => {
    e.preventDefault();
    const fullNotes = [
      customerData.notes,
      `Distrito: ${selectedDistrict} (Flete estimado S/ ${shippingCost.toFixed(2)})`,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      
      {/* Contenedor Cart Checkout Promart Style */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-gray-200">
        
        {/* Cabecera Checkout Promart */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="FERRENINAN" className="h-9 w-auto object-contain" />
            <div className="border-l border-gray-200 pl-3 hidden sm:block">
              <span className="text-sm font-black text-gray-900 block">Mi Carrito de Compras</span>
              <span className="text-[10px] text-gray-500 font-medium">Checkout directo y cotización</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Compra 100% Protegida</span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Cerrar Carrito"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contenido en Dos Columnas (Promart Checkout Layout) */}
        {cartItems.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gray-50">
            
            {/* Columna Izquierda: Listado de Productos (8 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Barra de Beneficio en flete */}
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 flex items-center gap-3 text-xs text-brand-900">
                <Truck className="w-5 h-5 text-brand-500 flex-shrink-0" />
                <div>
                  <strong className="block">Despacho garantizado a pie de obra</strong>
                  <span className="text-[11px] text-brand-700">Entregamos en Jesús María, Breña y todo Lima Metropolitana.</span>
                </div>
              </div>

              {/* Lista de Items */}
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 shadow-xs">
                <div className="p-3.5 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between text-xs font-bold text-gray-700">
                  <span>Productos en carrito ({totalCount})</span>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Vaciar todo
                  </button>
                </div>

                {cartItems.map((item) => {
                  const hasPrice = item.price !== null && !isNaN(item.price);
                  return (
                    <div key={item.id} className="p-4 flex gap-3 sm:gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-gray-50 p-1.5 border border-gray-200 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                          {item.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        
                        <div className="text-xs text-gray-500 mt-0.5">
                          {hasPrice ? (
                            <span>S/ {item.price.toFixed(2)} por {item.unit}</span>
                          ) : (
                            <span className="text-blue-600 font-bold">Precio a cotizar</span>
                          )}
                        </div>

                        {/* Controles de Cantidad */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-right">
                            {hasPrice ? (
                              <span className="text-sm font-black text-brand-600">
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
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-1"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Botón Seguir Comprando */}
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continuar explorando el catálogo</span>
              </button>

            </div>

            {/* Columna Derecha: Resumen de la Orden Promart (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Resumen de Compra */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                  Resumen de la Orden
                </h3>

                {/* Calculadora de Despacho */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-brand-500" />
                    <span>Calcular Despacho a Distrito:</span>
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500 bg-white"
                  >
                    <option value="Jesus Maria">Jesús María (S/ 15.00)</option>
                    <option value="Brena">Breña (S/ 15.00)</option>
                    <option value="Pueblo Libre">Pueblo Libre (S/ 15.00)</option>
                    <option value="San Miguel">San Miguel (S/ 20.00)</option>
                    <option value="Magdalena">Magdalena del Mar (S/ 20.00)</option>
                    <option value="Lince">Lince (S/ 20.00)</option>
                    <option value="Cercado de Lima">Cercado de Lima (S/ 20.00)</option>
                    <option value="Otros Distritos">Otros Distritos de Lima (S/ 30.00)</option>
                  </select>
                </div>

                {/* Cupón de Descuento Promart */}
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Cupón (Ej: FERRE10)"
                      className="flex-1 text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="bg-brand-dark hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                    >
                      Aplicar
                    </button>
                  </form>
                  {couponApplied && (
                    <span className="text-[11px] text-green-600 font-bold mt-1 flex items-center gap-1">
                      <Check className="w-3 h-3" /> ¡Cupón FERRE10 aplicado! 10% de descuento en materiales.
                    </span>
                  )}
                  {couponError && (
                    <span className="text-[11px] text-red-500 font-medium mt-1 block">
                      {couponError}
                    </span>
                  )}
                </div>

                {/* Desglose de Precios */}
                <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
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
                    <span>Despacho Estimado ({selectedDistrict}):</span>
                    <span className="font-bold text-gray-800">S/ {shippingCost.toFixed(2)}</span>
                  </div>

                  {hasQuoteItems && (
                    <div className="text-[11px] text-blue-600 font-semibold bg-blue-50 p-2 rounded">
                      * Incluye productos sujetos a cotización por mayor/menor.
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-2 border-t border-gray-200">
                    <span className="text-sm font-black text-gray-900">Total a Pagar:</span>
                    <span className="text-2xl font-black text-brand-600">
                      S/ {finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Datos de Entrega */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-700 block uppercase">
                    Datos para el Envío a Obra:
                  </span>
                  <input
                    type="text"
                    placeholder="Tu Nombre / Razón Social"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                  />
                  <input
                    type="text"
                    placeholder="Dirección exacta o referencia de obra"
                    value={customerData.address}
                    onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                    className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                  />
                </div>

                {/* Botón WhatsApp Promart Red */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-black text-sm py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group active:scale-98"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span>Realizar Pedido por WhatsApp</span>
                </button>

                <p className="text-[10px] text-center text-gray-500">
                  Atención directa con nuestro asesor en el <strong>{COMPANY_INFO.phone}</strong>
                </p>

              </div>

            </div>

          </div>
        ) : (
          <div className="p-12 text-center my-auto">
            <div className="w-20 h-20 rounded-full bg-red-50 text-brand-500 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-black text-gray-800 mb-1">
              Tu carrito está vacío
            </h3>
            <p className="text-xs text-gray-500 mb-6 max-w-sm mx-auto">
              Añade cemento, arena, drywall o pinturas desde nuestro catálogo para cotizar al por mayor o menor.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors shadow"
            >
              Explorar Ofertas
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
