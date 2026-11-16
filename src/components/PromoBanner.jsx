import React from 'react';
import { Tag, Send, Sparkles, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const PromoBanner = ({ onExplore }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 my-8">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-400/40 bg-brand-600">
        
        {/* Imagen de Construcción de Fondo con degradé fluido (elimina fondo oscuro plano) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/construction-banner.jpg"
            alt="Obra de construcción en ejecución en Lima"
            className="w-full h-full object-cover object-right filter brightness-95 contrast-105"
          />
          {/* Degradé: Rojo corporativo sólido en el texto a la izquierda, fusionándose suavemente con la foto de obra en la derecha */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-600 via-brand-600/90 to-brand-600/35 md:via-brand-600/85 md:to-transparent" />
          {/* Viñeta sutil para contraste y legibilidad óptima de los botones */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Contenido en primer plano */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
              <span>Exclusivo para Maestros de Obra y Contratistas</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              ¿Tienes una obra o remodelación en Lima?
            </h3>

            <p className="text-xs sm:text-sm text-red-50 leading-relaxed drop-shadow">
              Consigue precios especiales por volumen en <strong>Cemento Sol, Arena fina, Ladrillos King Kong y Drywall Gyplac</strong>. Despacho directo a pie de obra con servicio de estiba y eliminación de desmonte.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="bg-black/35 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-white shadow-xs">
                <Truck className="w-4 h-4 text-yellow-300" />
                <span>Despacho el mismo día</span>
              </div>
              <div className="bg-black/35 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-white shadow-xs">
                <Tag className="w-4 h-4 text-green-300" />
                <span>Cupón Flete: <strong className="text-yellow-300">FERRE10</strong></span>
              </div>
            </div>
          </div>

          {/* CTA Directo a WhatsApp y Catálogo */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            <a
              href={`https://wa.me/${COMPANY_INFO.phoneClean}?text=${encodeURIComponent('¡Hola FERRENINAN! Tengo una lista de materiales para una obra y deseo cotización al por mayor.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-brand-dark font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>Cotizar mi Obra por WhatsApp</span>
              <Send className="w-4 h-4 text-green-600" />
            </a>

            <button
              onClick={onExplore}
              className="bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-xs font-bold px-5 py-2.5 rounded-xl border border-white/30 transition-all flex items-center justify-center gap-1.5 text-center shadow-lg"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-3.5 h-3.5 text-yellow-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
