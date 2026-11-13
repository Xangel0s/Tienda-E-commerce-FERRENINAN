import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Truck, Phone, FileText, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

const SLIDES = [
  {
    id: 1,
    title: 'MATERIALES DE CONSTRUCCIÓN A PRECIO DE DISTRIBUIDOR',
    subtitle: 'Cemento Sol S/ 32.00 • Cemento Apu S/ 30.00 • Arena Fina S/ 3.00',
    description: 'Despacho directo a pie de obra en Lima Metropolitana. Venta por mayor y menor para contratistas y maestros de obra.',
    bgGradient: 'from-brand-900/90 via-black/80 to-brand-700/80',
    tag: 'OFERTAS DE TEMPORADA',
    tagBg: 'bg-yellow-400 text-gray-950 font-black',
    ctaText: 'Ver Cementos y Agregados',
    categoryTarget: 'cementos',
    video: '/videos/construction-loop.mp4',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    cardType: 'video',
    cardBadge: 'Obra en Ejecución',
    cardTitle: 'Despacho Continuo a Obra'
  },
  {
    id: 2,
    title: 'PLANOS ARQUITECTÓNICOS Y SISTEMA DRYWALL GYPLAC',
    subtitle: 'Gyplac 1/2" y 3/8" a S/ 34.00 • Perfiles Parantes • Rieles • Masillas',
    description: 'Diseño modular y cotización según planos de obra. Planchas estándar y antihumedad para tabiquería técnica.',
    bgGradient: 'from-blue-950/90 via-gray-900/90 to-brand-900/80',
    tag: 'DISEÑO Y MODULARIDAD',
    tagBg: 'bg-cyan-400 text-gray-950 font-black',
    ctaText: 'Cotizar con Planos',
    categoryTarget: 'drywall',
    image: '/images/blueprint-bg.jpg',
    cardType: 'blueprint',
    cardBadge: 'Planos y Especificaciones',
    cardTitle: 'Cálculo por Metrado de Obra'
  },
  {
    id: 3,
    title: 'SERVICIO AUTORIZADO DE ELIMINACIÓN DE DESMONTE',
    subtitle: 'Servicio Embolsado y a Granel con Camiones Volquetes',
    description: 'Dejamos tu obra o remodelación completamente limpia. Recojo autorizado y certificado en todo Lima Metropolitana.',
    bgGradient: 'from-brand-950/90 via-black/85 to-red-950/80',
    tag: 'SERVICIO ESPECIALIZADO',
    tagBg: 'bg-green-500 text-white font-black',
    ctaText: 'Solicitar Recojo de Desmonte',
    categoryTarget: 'desmonte',
    video: '/videos/desmonte-loop.mp4',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    cardType: 'video',
    cardBadge: 'Maquinaria Pesada',
    cardTitle: 'Volquetes y Recojo Rápido'
  }
];

export const HeroSlider = ({ onSelectCategory }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);

  const slide = SLIDES[current];

  return (
    <div className="relative overflow-hidden bg-gray-950 text-white">
      
      {/* Contenedor del Slide Activo */}
      <div className="relative min-h-[380px] md:min-h-[460px] flex items-center transition-all duration-700">
        
        {/* Fondo: Video de Construcción / Desmonte en Bucle o Plano Arquitectónico Libre de Copyright */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {slide.video ? (
            <video
              key={slide.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105 filter brightness-50"
            >
              <source src={slide.video} type="video/mp4" />
            </video>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center scale-105 filter brightness-40"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          )}

          {/* Gradiente Protector para Legibilidad Óptima de Textos */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} mix-blend-multiply opacity-90`} />
        </div>

        {/* Contenido Principal del Slide */}
        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 w-full flex flex-col md:flex-row items-center justify-between gap-8 z-10">
          
          {/* Lado Izquierdo: Textos y CTAs */}
          <div className="max-w-2xl text-left space-y-4">
            <span className={`inline-block px-3 py-1 rounded-md text-xs font-black tracking-wider uppercase ${slide.tagBg} shadow-sm`}>
              {slide.tag}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-lg">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base md:text-lg font-bold text-yellow-300 drop-shadow">
              {slide.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-gray-200 max-w-xl leading-relaxed">
              {slide.description}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onSelectCategory(slide.categoryTarget);
                  const el = document.getElementById('seccion-ofertas');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-brand-500 hover:bg-brand-600 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group active:scale-95"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.phoneClean}?text=${encodeURIComponent(`Hola ${COMPANY_INFO.name}, vi la promocion de ${slide.title} y deseo una cotizacion.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-green-400" />
                <span>WhatsApp Asesor</span>
              </a>
            </div>
          </div>

          {/* Lado Derecho: Tarjeta Visual Dinámica (Video en Vivo o Plano Arquitectónico) */}
          <div className="hidden lg:block w-96 relative flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-gray-900">
              
              {slide.cardType === 'video' ? (
                <div className="relative h-64 w-full overflow-hidden bg-black">
                  <video
                    key={`card-${slide.video}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={slide.video} type="video/mp4" />
                  </video>
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span>{slide.cardBadge}</span>
                  </div>
                </div>
              ) : (
                /* Vista de Plano Arquitectónico / Blueprint CAD */
                <div className="relative h-64 w-full overflow-hidden bg-blue-950 p-2">
                  <img
                    src={slide.image}
                    alt="Plano Arquitectónico"
                    className="w-full h-full object-cover opacity-80 mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
                  
                  <div className="absolute top-3 left-3 bg-blue-900/80 backdrop-blur-sm text-cyan-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-cyan-400/30 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{slide.cardBadge}</span>
                  </div>
                </div>
              )}

              {/* Pie de la tarjeta */}
              <div className="bg-gray-900/95 backdrop-blur-md p-3.5 border-t border-gray-800 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{slide.cardTitle}</span>
                  <span className="text-gray-400 text-[11px]">{COMPANY_INFO.legalName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-green-400 font-bold bg-green-950/60 border border-green-800 px-2 py-0.5 rounded">
                    Activo
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Flechas de Navegación del Carrusel */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-colors z-20 backdrop-blur-xs border border-white/10"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-colors z-20 backdrop-blur-xs border border-white/10"
          aria-label="Slide siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicadores / Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${
                current === idx ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white/40 hover:bg-white'
              }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
