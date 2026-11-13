import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, AlertCircle, ArrowRight } from 'lucide-react';
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

  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  if (!isCartOpen) return null;

  const handleCheckout = (e) => {
    e.preventDefault();
    const url = getWhatsAppOrderUrl(customerData);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header del Carrito */}
          <div className="p-4 bg-brand-dark text-white flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-500" />
              <h2 className="text-base font-bold tracking-tight">
                Mi Carrito de Pedidos ({totalCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Cerrar Carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Items */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
            {cartItems.length > 0 ? (
              <>
                <div className="flex items-center justify-between pb-3">
                  <span className="text-xs text-gray-500">
                    Artículos seleccionados:
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-red-500 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Vaciar carrito
                  </button>
                </div>

                {cartItems.map((item) => {
                  const hasItemPrice = item.price !== null && !isNaN(item.price);
                  return (
                    <div key={item.id} className="py-3 flex gap-3 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-lg bg-gray-50 p-1 border border-gray-200 flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {hasItemPrice ? (
                            <span>S/ {item.price.toFixed(2)} / {item.unit}</span>
                          ) : (
                            <span className="text-blue-600 font-semibold">Precio a cotizar</span>
                          )}
                        </div>

                        {/* Controles de Cantidad */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-300 rounded bg-gray-50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-gray-600 hover:bg-gray-200"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-gray-600 hover:bg-gray-200"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Subtotal del item */}
                          <div className="text-right">
                            {hasItemPrice ? (
                              <span className="text-xs font-black text-brand-600">
                                S/ {(item.price * item.quantity).toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-gray-400">
                                A cotizar
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Botón eliminar */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-red-50 text-brand-500 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-1">
                  Tu carrito está vacío
                </h3>
                <p className="text-xs text-gray-500 mb-4 max-w-xs">
                  Agrega materiales, cemento, drywall o pinturas desde nuestro catálogo para cotizar en WhatsApp.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Explorar Catálogo
                </button>
              </div>
            )}
          </div>

          {/* Formulario de Entrega y Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-3">
              
              {/* Formulario Ligero de Envío a Obra */}
              <div className="bg-white p-3 rounded-lg border border-gray-200 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block">
                  📍 Datos de Despacho (Opcional):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Tu Nombre / Empresa"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                    className="w-full text-xs p-2 border border-gray-300 rounded focus:border-brand-500 outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    className="w-full text-xs p-2 border border-gray-300 rounded focus:border-brand-500 outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Dirección / Obra / Distrito (Ej: Jesús María, Breña...)"
                  value={customerData.address}
                  onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                  className="w-full text-xs p-2 border border-gray-300 rounded focus:border-brand-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Comentarios (Ej: Descarga en 2do piso / Con estiba)"
                  value={customerData.notes}
                  onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                  className="w-full text-xs p-2 border border-gray-300 rounded focus:border-brand-500 outline-none"
                />
              </div>

              {/* Resumen de Total */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-gray-500">Subtotal Estimado:</span>
                  <span className="text-xs font-bold text-gray-700">
                    S/ {totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-black text-gray-900">Total Pedido:</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-brand-500">
                      S/ {totalPrice.toFixed(2)}
                    </span>
                    {hasQuoteItems && (
                      <span className="block text-[10px] text-blue-600 font-semibold">
                        + Items por cotizar
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Botón WhatsApp de Envío */}
              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-sm py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group active:scale-98"
              >
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <span>Pedir y Cotizar por WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-gray-500">
                Se abrirá WhatsApp con el número <strong>{COMPANY_INFO.phone}</strong> y tu pedido listo para enviar.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
