import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  Truck,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  ShoppingCart,
  MessageCircle,
  Share2,
  Copy,
  FileText,
  MapPin,
  Clock,
  Building2,
  Star,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES, COMPANY_INFO } from '../data/products';

const DISTRICTS = [
  { name: 'Jesús María', price: 15.00 },
  { name: 'Breña', price: 15.00 },
  { name: 'Pueblo Libre', price: 15.00 },
  { name: 'San Miguel', price: 20.00 },
  { name: 'Magdalena del Mar', price: 20.00 },
  { name: 'Lince', price: 20.00 },
  { name: 'Cercado de Lima', price: 20.00 },
  { name: 'Otros Distritos de Lima', price: 30.00 },
];

export const ProductPage = () => {
  const {
    currentProduct: product,
    addToCart,
    navigateToHome,
    navigateToCart,
    navigateToProduct,
    getWhatsAppProductInquiryUrl
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0]);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');
  const [selectedMedia, setSelectedMedia] = useState('main'); // 'main' | 'blueprint' | 'video'
  const [copiedSku, setCopiedSku] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-black text-gray-900 mb-2">Producto no encontrado</h2>
        <p className="text-xs text-gray-500 mb-6">El producto o SKU solicitado no se encuentra en el catálogo.</p>
        <button
          onClick={navigateToHome}
          className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
        >
          Volver a la portada de FERRENINAN
        </button>
      </div>
    );
  }

  const hasPrice = product.price !== null && !isNaN(product.price);
  const regularPrice = product.regularPrice || (hasPrice ? product.price * 1.15 : null);
  const discountPercent = regularPrice && hasPrice
    ? Math.round(((regularPrice - product.price) / regularPrice) * 100)
    : 0;
  const unitSavings = regularPrice && hasPrice ? (regularPrice - product.price) : 0;

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleCopySku = () => {
    const skuToCopy = product.sku || product.id.toUpperCase();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(skuToCopy);
      setCopiedSku(true);
      setTimeout(() => setCopiedSku(false), 2000);
    }
  };

  // Categoría formateada para breadcrumb
  const categoryObj = CATEGORIES.find(c => c.id === product.category);
  const categoryName = categoryObj ? categoryObj.name : product.category.toUpperCase();

  // Productos relacionados para la obra
  const relatedProducts = useMemo(() => {
    if (product.relatedIds && product.relatedIds.length > 0) {
      return PRODUCTS.filter(p => product.relatedIds.includes(p.id)).slice(0, 4);
    }
    return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  // Especificaciones técnicas completas según tipo de material
  const technicalSpecs = useMemo(() => {
    const specs = [
      { label: 'SKU Comercial', value: product.sku || product.id.toUpperCase() },
      { label: 'Marca / Fabricante', value: product.brand || 'FERRENINAN' },
      { label: 'Categoría', value: categoryName },
      { label: 'Presentación Oficial', value: product.unit || 'Unidad' },
      { label: 'Disponibilidad', value: 'Stock para entrega inmediata a pie de obra' },
      { label: 'Garantía', value: 'Garantía oficial de fábrica y distribuidor' },
      { label: 'Procedencia', value: 'Perú (Norma de Calidad Certificada)' },
    ];

    if (product.category === 'cementos') {
      specs.push(
        { label: 'Norma Técnica Nacional', value: 'NTP 334.009 / ASTM C150 Tipo I' },
        { label: 'Peso Neto por Unidad', value: '42.5 kg (93.7 lb)' },
        { label: 'Tiempo de Fraguado Inicial', value: 'Aproximadamente 90 a 120 minutos' },
        { label: 'Resistencia a la Compresión 28 días', value: '≥ 350 kg/cm² (5000 PSI)' },
        { label: 'Usos Principales', value: 'Columnas, losas aligeradas, zapatas, vigas y muros portantes' },
        { label: 'Recomendación de Almacenamiento', value: 'Sobre parihuelas de madera, en ambiente seco y techado' }
      );
    } else if (product.category === 'drywall') {
      specs.push(
        { label: 'Sistema Constructivo', value: 'Construcción en Seco Drywall Gyplac' },
        { label: 'Norma de Fabricación', value: 'ASTM C1396 estándar y resistente a la humedad RH' },
        { label: 'Bordes Laterales', value: 'Rebajados (tapered) para masillado y cinta microperforada' },
        { label: 'Comportamiento al Fuego', value: 'Incombustible (Clase A según ASTM E84)' },
        { label: 'Aplicación en Obra', value: 'Cielorrasos, tabiquerías interiores y detalles arquitectónicos' }
      );
    } else if (product.category === 'agregados') {
      specs.push(
        { label: 'Tipo de Cantera', value: 'Cantera clasificada con zaranda vibratoria' },
        { label: 'Granulometría', value: 'Partículas graduadas libres de impurezas orgánicas' },
        { label: 'Humedad Óptima', value: 'Controlada para evitar alteración del factor agua/cemento' }
      );
    } else if (product.category === 'fierros') {
      specs.push(
        { label: 'Norma Técnica', value: 'NTP 341.031 Grado 60 / ASTM A615' },
        { label: 'Límite de Fluencia (fy)', value: 'Mínimo 4200 kg/cm² (60,000 PSI)' },
        { label: 'Corrugas Antisísmicas', value: 'Estrías transversales de alta adherencia con concreto' }
      );
    } else if (product.category === 'herramientas') {
      specs.push(
        { label: 'Tipo de Uso', value: 'Profesional e Industrial de Alta Exigencia' },
        { label: 'Material de Estructura', value: 'Acero al carbono estampado / Caucho vulcanizado' }
      );
    }

    return specs;
  }, [product, categoryName]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* 1. Miga de Pan (Breadcrumbs Promart Style) */}
        <nav className="flex items-center flex-wrap gap-2 text-xs text-gray-500 font-semibold mb-6">
          <button
            onClick={navigateToHome}
            className="hover:text-brand-500 transition-colors flex items-center gap-1"
          >
            Inicio
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <button
            onClick={navigateToHome}
            className="hover:text-brand-500 transition-colors"
          >
            {categoryName}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold truncate max-w-[280px] sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* 2. Contenedor Principal de la Página de Detalle de Producto */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs p-6 sm:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* COLUMNA IZQUIERDA: Galería Visual y Vistas de Obra (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Visor Visual Principal */}
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center p-4 relative group">
                
                {selectedMedia === 'video' || product.cardType === 'video' ? (
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
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded bg-black/70 backdrop-blur-xs text-white border border-white/20 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Video en Obra
                    </span>
                  </div>
                ) : selectedMedia === 'blueprint' || product.cardType === 'blueprint' ? (
                  <div className="relative w-full h-full bg-blue-950 overflow-hidden rounded-xl flex items-center justify-center">
                    <img
                      src="/images/blueprint-bg.jpg"
                      alt="Plano Arquitectónico"
                      className="w-full h-full object-cover opacity-85 mix-blend-screen"
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
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/product-placeholder.svg';
                    }}
                  />
                )}

                {product.badge && (
                  <span className="absolute top-3 right-3 text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-xs bg-brand-500 text-white">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Selector de Vistas / Thumbnails (Foto, Plano CAD, Video) */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMedia('main')}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-gray-50 p-1 transition-all ${
                    selectedMedia === 'main' ? 'border-brand-500 shadow-sm' : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={product.image}
                    alt="Foto producto"
                    className="w-full h-full object-contain mix-blend-multiply"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/product-placeholder.svg';
                    }}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMedia('blueprint')}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-blue-950 p-1 flex flex-col items-center justify-center text-center transition-all ${
                    selectedMedia === 'blueprint' ? 'border-cyan-400 shadow-sm' : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <FileText className="w-5 h-5 text-cyan-400 mb-1" />
                  <span className="text-[9px] font-black text-cyan-200 uppercase leading-tight">Plano CAD</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMedia('video')}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-gray-900 p-1 flex flex-col items-center justify-center text-center transition-all ${
                    selectedMedia === 'video' ? 'border-green-500 shadow-sm' : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mb-1"></span>
                  <span className="text-[9px] font-black text-white uppercase leading-tight">Obra Viva</span>
                </button>
              </div>

              {/* Propuestas de Valor Promart */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900 block text-xs">Despacho en 24h</span>
                    <span className="text-[10px] text-gray-500">A pie de obra en Lima</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-brand-500 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900 block text-xs">Garantía Oficial</span>
                    <span className="text-[10px] text-gray-500">Distribuidor mayorista</span>
                  </div>
                </div>
              </div>

            </div>

            {/* COLUMNA DERECHA: Ficha de Compra, SKU y Precios (7 cols) */}
            <div className="lg:col-span-7 space-y-6">

              {/* Cabecera: Marca, SKU Único y Título */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
                    {product.brand || 'FERRENINAN'}
                  </span>

                  {/* SKU Único con botón de copiado */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-1.5 font-mono">
                      <span>SKU: {product.sku || product.id.toUpperCase()}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySku}
                      className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                      title="Copiar SKU"
                    >
                      {copiedSku ? (
                        <span className="text-[10px] font-bold text-green-600">Copiado</span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Estrellas de Calificación de Obra */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-black text-gray-900">4.9</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500 underline decoration-gray-300">
                    84 valoraciones de contratistas y maestros de obra
                  </span>
                </div>
              </div>

              {/* Bloque de Precios Promart */}
              <div className="p-5 bg-gray-50 border border-gray-200 rounded-3xl space-y-3">
                {hasPrice ? (
                  <>
                    {regularPrice && (
                      <div className="flex items-center gap-2.5 text-xs text-gray-400">
                        <span>Precio regular:</span>
                        <span className="line-through font-bold">S/ {regularPrice.toFixed(2)}</span>
                        {discountPercent > 0 && (
                          <span className="text-[11px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-md">
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

                    {unitSavings > 0 && (
                      <div className="text-xs font-bold text-green-700 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Ahorras S/ {unitSavings.toFixed(2)} por unidad en precio de distribuidor</span>
                      </div>
                    )}

                    <div className="pt-2.5 border-t border-gray-200 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
                      <span className="font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                        Precio Solución Obra FERRENINAN
                      </span>
                      <span className="text-[11px]">Todos los precios incluyen I.G.V.</span>
                    </div>
                  </>
                ) : (
                  <div className="py-2 space-y-1">
                    <span className="text-base font-black text-blue-900 block">
                      Precio a Cotizar por Mayor y Menor
                    </span>
                    <p className="text-xs text-blue-700">
                      Envía tu metrado o requerimiento por WhatsApp para aplicar escala de descuentos para contratistas.
                    </p>
                  </div>
                )}
              </div>

              {/* Selector de Despacho y Flete por Distrito */}
              <div className="p-4 bg-white border border-gray-200 rounded-2xl space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-700 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    Calcular despacho a distrito:
                  </span>
                  <span className="text-[11px] text-gray-500 font-semibold">
                    Flete estimado: <strong>S/ {selectedDistrict.price.toFixed(2)}</strong>
                  </span>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDistrictOpen(!isDistrictOpen)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-left font-bold text-gray-900 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <span>{selectedDistrict.name} (S/ {selectedDistrict.price.toFixed(2)})</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {isDistrictOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 max-h-48 overflow-y-auto p-1 text-xs">
                      {DISTRICTS.map((d) => (
                        <button
                          key={d.name}
                          type="button"
                          onClick={() => {
                            setSelectedDistrict(d);
                            setIsDistrictOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left rounded-lg flex items-center justify-between transition-colors ${
                            selectedDistrict.name === d.name ? 'bg-brand-50 font-bold text-brand-600' : 'hover:bg-gray-100'
                          }`}
                        >
                          <span>{d.name}</span>
                          <span>S/ {d.price.toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-gray-500 space-y-1 pt-1">
                  <div className="flex items-center gap-1.5 text-green-700 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Despacho programado para hoy en compras antes de las 2:00 PM</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    <span>Retiro gratis en almacén: Jr. General Felipe Varela 1855, Breña o Av. Garzón 1091, Jesús María</span>
                  </div>
                </div>
              </div>

              {/* Controles de Compra y WhatsApp */}
              <div className="space-y-3 pt-2">
                {hasPrice ? (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    
                    {/* Stepper numérico */}
                    <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden bg-white w-full sm:w-auto justify-between shadow-xs">
                      <button
                        type="button"
                        onClick={handleDecrement}
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
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
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Botón Añadir al Carrito Promart */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`flex-1 w-full py-3.5 px-6 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                        isAdded
                          ? 'bg-green-600 text-white'
                          : 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/20'
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

                {/* Botón Asesor WhatsApp con SKU inyectado */}
                <a
                  href={getWhatsAppProductInquiryUrl(product, quantity)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold bg-green-600 hover:bg-green-700 text-white transition-all shadow-md flex items-center justify-center gap-2 text-center active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar por WhatsApp con Asesor (+51 908 747 531)</span>
                </a>
              </div>

            </div>

          </div>

          {/* 3. Pestañas de Ficha Técnica, Normas y Despacho */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex border-b border-gray-200 gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs sm:text-sm font-black border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'specs'
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Ficha Técnica y Especificaciones
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('delivery')}
                className={`pb-3 text-xs sm:text-sm font-black border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'delivery'
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Condiciones de Entrega a Obra
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('warranty')}
                className={`pb-3 text-xs sm:text-sm font-black border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'warranty'
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Garantía y Calidad Certificada
              </button>
            </div>

            <div className="pt-6">
              {activeTab === 'specs' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    {technicalSpecs.map((spec, i) => (
                      <div key={i} className="flex justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="font-bold text-gray-500">{spec.label}:</span>
                        <span className="font-semibold text-gray-900 text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {product.description && (
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs text-gray-600 leading-relaxed">
                      <strong className="text-gray-900 block mb-1">Descripción del Producto:</strong>
                      <p>{product.description}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-4 text-xs text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <p>
                    • <strong>Horario de Operaciones y Despacho:</strong> Lunes a Sábado de 7:30 AM a 6:30 PM.
                  </p>
                  <p>
                    • <strong>Entregas Programadas:</strong> Para pedidos confirmados antes de las 2:00 PM, se programa el despacho durante el mismo día hábil.
                  </p>
                  <p>
                    • <strong>Puntos de Almacenamiento:</strong> Sede Jesús María (Av. General Garzón 1091) y Sede Breña (Jr. General Felipe Varela 1855).
                  </p>
                  <p>
                    • <strong>Acceso a Obra:</strong> Camiones de plataforma y volquetes autorizados con cuadrilla de descarga según coordinación.
                  </p>
                </div>
              )}

              {activeTab === 'warranty' && (
                <div className="space-y-4 text-xs text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <p>
                    • <strong>Control de Calidad:</strong> Todos los cementos, fierros, agregados y planchas drywall cuentan con certificación conforme a las Normas Técnicas Peruanas (NTP) y ASTM.
                  </p>
                  <p>
                    • <strong>Facturación Oficial:</strong> Emisión de Boleta o Factura electrónica autorizada por SUNAT por FERRENINANYA S.A.C.
                  </p>
                  <p>
                    • <strong>Libro de Reclamaciones:</strong> Acceso virtual directo conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571 - INDECOPI).
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* 4. Sección "Los Maestros de Obra También Compran" (Productos Complementarios) */}
        {relatedProducts.length > 0 && (
          <section className="mt-8 mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900">
                  Productos Complementarios para tu Obra
                </h3>
                <p className="text-xs text-gray-500">
                  Materiales frecuentemente adquiridos junto con {product.name}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => {
                const relHasPrice = rel.price !== null && !isNaN(rel.price);
                return (
                  <div
                    key={rel.id}
                    onClick={() => navigateToProduct(rel.id)}
                    className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg hover:border-brand-500 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 mb-2">
                        <span className="uppercase text-gray-400 font-mono">SKU: {rel.sku || rel.id}</span>
                        <span className="text-brand-600 bg-brand-50 px-2 py-0.5 rounded">{rel.brand || 'FERRENINAN'}</span>
                      </div>

                      <div className="w-full h-36 rounded-xl bg-gray-50 p-2 mb-3 flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/product-placeholder.svg';
                          }}
                        />
                      </div>

                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 min-h-[32px]">
                        {rel.name}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-baseline justify-between">
                      <div>
                        {relHasPrice ? (
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs font-black text-brand-600">S/</span>
                            <span className="text-lg font-black text-brand-600">
                              {rel.price.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-gray-400">/ {rel.unit}</span>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-blue-700">A cotizar</span>
                        )}
                      </div>

                      <span className="text-xs font-bold text-brand-500 group-hover:translate-x-0.5 transition-transform">
                        Ver ficha →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
