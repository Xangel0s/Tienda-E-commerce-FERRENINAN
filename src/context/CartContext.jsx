import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ferreninan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from storage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isComplaintsBookOpen, setIsComplaintsBookOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ferreninan_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cartItems.reduce((acc, item) => {
    if (item.price !== null && !isNaN(item.price)) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  const hasQuoteItems = cartItems.some(item => item.price === null);

  /**
   * Genera el enlace de WhatsApp preconfigurado con el desglose exacto
   */
  const getWhatsAppOrderUrl = (customerData = {}) => {
    if (cartItems.length === 0) return '';

    let message = `*¡Hola ${COMPANY_INFO.name}!* Deseo realizar un pedido desde la tienda web:\n\n`;
    message += `🛒 *DETALLE DEL PEDIDO:*\n`;
    message += `------------------------------------\n`;

    cartItems.forEach((item, index) => {
      if (item.price !== null) {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        message += `${index + 1}. *${item.quantity}x* ${item.name}\n`;
        message += `    Precio unit: S/ ${item.price.toFixed(2)} | Subtotal: S/ ${itemTotal}\n`;
      } else {
        message += `${index + 1}. *${item.quantity}x* ${item.name}\n`;
        message += `    *Precio:* (A cotizar por mayor/menor)\n`;
      }
    });

    message += `------------------------------------\n`;
    if (totalPrice > 0) {
      message += `💰 *TOTAL ESTIMADO:* S/ ${totalPrice.toFixed(2)}\n`;
    }
    if (hasQuoteItems) {
      message += `ℹ️ *Nota:* Incluye productos sujetos a cotización inmediata.\n`;
    }

    message += `\n📍 *DATOS DE ENTREGA:*\n`;
    message += `👤 *Cliente:* ${customerData.name ? customerData.name.trim() : 'Por coordinar'}\n`;
    message += `📱 *Teléfono:* ${customerData.phone ? customerData.phone.trim() : 'Por coordinar'}\n`;
    message += `📌 *Dirección / Distrito:* ${customerData.address ? customerData.address.trim() : 'Por coordinar'}\n`;
    if (customerData.notes && customerData.notes.trim()) {
      message += `📝 *Observaciones:* ${customerData.notes.trim()}\n`;
    }

    message += `\n¿Me confirman disponibilidad y costo de flete/despacho a obra? ¡Muchas gracias!`;

    return COMPANY_INFO.whatsappUrl(message);
  };

  /**
   * Consulta directa para un producto específico
   */
  const getWhatsAppProductInquiryUrl = (product) => {
    let message = `*¡Hola ${COMPANY_INFO.name}!* Me interesa cotizar el siguiente producto visto en su web:\n\n`;
    message += `📦 *Producto:* ${product.name}\n`;
    message += `📁 *Categoría:* ${product.category}\n`;
    if (product.price !== null) {
      message += `💲 *Precio web:* S/ ${product.price.toFixed(2)} por ${product.unit}\n`;
    } else {
      message += `💲 *Condición:* Precio a cotizar por mayor / menor\n`;
    }
    message += `\n¿Tienen stock disponible y cuál es el precio para despacho a obra?`;
    return COMPANY_INFO.whatsappUrl(message);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        hasQuoteItems,
        isCartOpen,
        setIsCartOpen,
        isComplaintsBookOpen,
        setIsComplaintsBookOpen,
        getWhatsAppOrderUrl,
        getWhatsAppProductInquiryUrl
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
