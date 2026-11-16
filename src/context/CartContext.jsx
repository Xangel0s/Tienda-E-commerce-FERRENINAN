import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO, PRODUCTS } from '../data/products';

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

  // 'home' | 'cart' | 'product'
  const [currentView, setCurrentView] = useState('home');
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isComplaintsBookOpen, setIsComplaintsBookOpen] = useState(false);

  // Navegar a la página de producto con SKU único y sincronizar historial del navegador
  const navigateToProduct = (productOrId) => {
    let prod = typeof productOrId === 'object' && productOrId !== null
      ? productOrId
      : PRODUCTS.find(p => p.id === productOrId || p.sku === productOrId);
    
    if (!prod) prod = PRODUCTS[0];
    setCurrentProduct(prod);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Actualizar URL en barra de direcciones sin recarga completa
    const url = new URL(window.location);
    url.searchParams.set('p', prod.id);
    url.searchParams.delete('view');
    window.history.pushState({ view: 'product', productId: prod.id }, '', url);
  };

  // Navegar al Home
  const navigateToHome = () => {
    setCurrentView('home');
    setCurrentProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const url = new URL(window.location);
    url.searchParams.delete('p');
    url.searchParams.delete('view');
    window.history.pushState({ view: 'home' }, '', url.pathname + (url.search ? url.search : ''));
  };

  // Navegar al Carrito
  const navigateToCart = () => {
    setCurrentView('cart');
    setCurrentProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const url = new URL(window.location);
    url.searchParams.delete('p');
    url.searchParams.set('view', 'cart');
    window.history.pushState({ view: 'cart' }, '', url);
  };

  // Sincronización con el botón Atrás / Adelante del navegador (popstate) y deep linking inicial
  useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      const prodId = params.get('p');
      const view = params.get('view');

      if (prodId) {
        const prod = PRODUCTS.find(p => p.id === prodId || p.sku === prodId);
        if (prod) {
          setCurrentProduct(prod);
          setCurrentView('product');
          return;
        }
      }

      if (view === 'cart') {
        setCurrentView('cart');
        setCurrentProduct(null);
        return;
      }

      setCurrentView('home');
      setCurrentProduct(null);
    };

    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

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
    navigateToCart();
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
        message += `[${index + 1}] ${item.quantity}x ${item.name} [SKU: ${item.sku || item.id}]\n`;
        message += `    Precio unitario: S/ ${item.price.toFixed(2)} | Subtotal: S/ ${itemTotal}\n`;
      } else {
        message += `[${index + 1}] ${item.quantity}x ${item.name} [SKU: ${item.sku || item.id}]\n`;
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
   * Consulta directa para un producto específico con SKU y cantidad (sin emojis)
   */
  const getWhatsAppProductInquiryUrl = (product, quantity = 1) => {
    let message = `*CONSULTA DE PRODUCTO - ${COMPANY_INFO.name}*\n\n`;
    message += `Producto: ${product.name}\n`;
    message += `SKU: ${product.sku || product.id}\n`;
    message += `Marca: ${product.brand || 'FERRENINAN'}\n`;
    message += `Presentacion: ${product.unit}\n`;
    message += `Cantidad requerida: ${quantity} ${product.unit}\n`;
    if (product.price !== null) {
      message += `Precio unitario ref.: S/ ${product.price.toFixed(2)}\n`;
      message += `Subtotal estimado: S/ ${(product.price * quantity).toFixed(2)}\n`;
    } else {
      message += `Condicion: Precio a cotizar por volumen para obra\n`;
    }
    message += `\nSolicito confirmacion de stock inmediato y costo de despacho a pie de obra. Muchas gracias.`;
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
        currentProduct,
        navigateToProduct,
        navigateToHome,
        navigateToCart,
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
