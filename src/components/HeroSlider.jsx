import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: 'MATERIALES DE CONSTRUCCIÓN A PRECIO DE DISTRIBUIDOR',
    subtitle: 'Cemento Sol S/ 32.00 • Cemento Apu S/ 30.00 • Arena Fina S/ 3.00',
    description: 'Despacho directo a pie de obra en Lima Metropolitana. Venta por mayor y menor.',
    bgGradient: 'from-brand-600 via-brand-500 to-red-800',
    tag: 'OFERTAS DE TEMPORADA',
    tagBg: 'bg-yellow-400 text-gray-900',
    ctaText: 'Ver Cementos y Agregados',
    categoryTarget: 'cementos',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    title: 'SISTEMA DRYWALL COMPLETO: PLANCHAS Y PERFILERÍA',
    subtitle: 'Gyplac 1/2" y 3/8" a S/ 34.00 • Parantes • Rieles • Masillas',
    description: 'Todo para tabiquería y techos termoacústicos. Calidad garantizada con entrega rápida.',
    bgGradient: 'from-gray-900 via-gray-800 to-brand-900',
    tag: 'STOCK PERMANENTE',
    tagBg: 'bg-brand-500 text-white',
    ctaText: 'Cotizar Drywall',
    categoryTarget: 'drywall',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    title: 'SERVICIO AUTORIZADO DE ELIMINACIÓN DE DESMONTE',
    subtitle: 'Servicio Embolsado y a Granel con Camiones Volquetes',
    description: 'Dejamos tu obra o remodelación completamente limpia. Atención rápida en todo Lima.',
    bgGradient: 'from-brand-700 via-red-900 to-black',
    tag: 'SERVICIO ESPECIALIZADO',
    tagBg: 'bg-green-500 text-white',
    ctaText: 'Solicitar Servicio de Desmonte',
    categoryTarget: 'desmonte',
    image: 'https://images.unsplash.com/photo-1580901068590-2679261a9956?auto=format&fit=crop&w=1200&q=80'
  }
];

export const HeroSlider = ({ onSelectCategory }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);

  const slide = SLIDES[current];

  return (
    <div className="relative overflow-hidden bg-gray-900 text-white">
      <div className={`relative min-h-[340px] md:min-h-[420px] flex items-center bg-gradient-to-r ${slide.bgGradient} transition-all duration-700`}>
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img src={slide.image} alt="Hero Banner" className="w-full h-full object-cover" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 w-full flex flex-col md:flex-row items-center justify-between gap-8 z-10">
          
          {/* Contenido del Slide */}
          <div className="max-w-2xl text-left space-y-4">
            <span className={`inline-block px-3 py-1 rounded-md text-xs font-black tracking-wider uppercase ${slide.tagBg} shadow-sm`}>
              {slide.tag}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              {slide.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-bold text-yellow-300">
              {slide.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-gray-200 max-w-xl">
              {slide.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onSelectCategory(slide.categoryTarget);
                  const el = document.getElementById('catalogo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-gray-100 text-brand-dark font-black text-xs sm:text-sm px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-brand-500 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/51908747531?text=Hola%20FERRENINAN,%20deseo%20cotizar%20un%20pedido%20para%20obra"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-lg shadow-md transition-colors flex items-center gap-2"
              >
                <span>WhatsApp Rápido</span>
              </a>
            </div>
          </div>

          {/* Imagen destacada en tarjeta flotante para Desktop */}
          <div className="hidden lg:block w-96 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src={slide.image}
                alt="Banner visual"
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-xs">
                <span className="font-bold text-white block">FERRENINANYA S.A.C.</span>
                <span className="text-gray-300 text-[11px]">Garantía, puntualidad y precios de distribuidor</span>
              </div>
            </div>
          </div>

        </div>

        {/* Flechas de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full transition-colors z-20"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full transition-colors z-20"
          aria-label="Slide siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicadores / Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${
                current === idx ? 'w-8 bg-yellow-400' : 'w-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
