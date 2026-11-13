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

  // 'home' o 'cart' para que el carrito sea una página independiente
  const [currentView, setCurrentView] = useState('home');
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
    // Navegar directamente a la página del carrito
    setCurrentView('cart');
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
   * Genera el enlace de WhatsApp sin emojis, con formato limpio y profesional
   */
  const getWhatsAppOrderUrl = (customerData = {}) => {
    if (cartItems.length === 0) return '';

    let message = `*PEDIDO WEB - ${COMPANY_INFO.name}*\n\n`;
    message += `DETALLE DEL PEDIDO:\n`;
    message += `------------------------------------\n`;

    cartItems.forEach((item, index) => {
      if (item.price !== null) {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        message += `[${index + 1}] ${item.quantity}x ${item.name}\n`;
        message += `    Precio unitario: S/ ${item.price.toFixed(2)} | Subtotal: S/ ${itemTotal}\n`;
      } else {
        message += `[${index + 1}] ${item.quantity}x ${item.name}\n`;
        message += `    Precio: A cotizar por mayor / menor\n`;
      }
    });

    message += `------------------------------------\n`;
    if (totalPrice > 0) {
      message += `TOTAL ESTIMADO PRODUCTOS: S/ ${totalPrice.toFixed(2)}\n`;
    }
    if (hasQuoteItems) {
      message += `Nota: Incluye materiales sujetos a cotización inmediata.\n`;
    }

    message += `\nDATOS DE DESPACHO:\n`;
    message += `• Cliente: ${customerData.name ? customerData.name.trim() : 'Por coordinar'}\n`;
    message += `• Telefono: ${customerData.phone ? customerData.phone.trim() : 'Por coordinar'}\n`;
    message += `• Direccion / Obra: ${customerData.address ? customerData.address.trim() : 'Por coordinar'}\n`;
    if (customerData.notes && customerData.notes.trim()) {
      message += `• Observaciones: ${customerData.notes.trim()}\n`;
    }

    message += `\nFavor de confirmar disponibilidad de stock y fecha de despacho. Muchas gracias.`;

    return COMPANY_INFO.whatsappUrl(message);
  };

  /**
   * Consulta directa para un producto específico (sin emojis)
   */
  const getWhatsAppProductInquiryUrl = (product) => {
    let message = `*CONSULTA DE PRODUCTO - ${COMPANY_INFO.name}*\n\n`;
    message += `Producto: ${product.name}\n`;
    message += `Categoria: ${product.category}\n`;
    if (product.price !== null) {
      message += `Precio web referencial: S/ ${product.price.toFixed(2)} por ${product.unit}\n`;
    } else {
      message += `Condicion: Precio a cotizar por mayor y menor\n`;
    }
    message += `\nSolicito informacion sobre stock disponible y costo de envio a obra. Gracias.`;
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
        currentView,
        setCurrentView,
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
