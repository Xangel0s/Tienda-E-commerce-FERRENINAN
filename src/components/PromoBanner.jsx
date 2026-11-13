import React from 'react';
import { Tag, Send, Sparkles, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const PromoBanner = ({ onExplore }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 my-8">
      <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-dark rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-brand-400/40">
        
        {/* Glow de Fondo */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-3 max-w-xl z-10 text-left">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
            <span>Exclusivo para Maestros de Obra y Contratistas</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            ¿Tienes una obra o remodelación en Lima?
          </h3>

          <p className="text-xs sm:text-sm text-red-50 leading-relaxed">
            Consigue precios especiales por volumen en <strong>Cemento Sol, Arena fina, Ladrillos King Kong y Drywall Gyplac</strong>. Despacho directo a pie de obra con servicio de estiba y eliminación de desmonte.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold">
              <Truck className="w-4 h-4 text-yellow-300" />
              <span>Despacho el mismo día</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold">
              <Tag className="w-4 h-4 text-green-300" />
              <span>Cupón Flete: <strong className="text-yellow-300">FERRE10</strong></span>
            </div>
          </div>
        </div>

        {/* CTA Directo a WhatsApp */}
        <div className="z-10 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
          <a
            href={`https://wa.me/${COMPANY_INFO.phoneClean}?text=${encodeURIComponent('¡Hola FERRENINAN! Tengo una lista de materiales para una obra y deseo cotización al por mayor.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-gray-100 text-brand-dark font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-center"
          >
            <span>Cotizar mi Obra por WhatsApp</span>
            <Send className="w-4 h-4 text-green-600" />
          </a>

          <button
            onClick={onExplore}
            className="bg-brand-dark/80 hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-1.5 text-center"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-3.5 h-3.5 text-yellow-400" />
          </button>
        </div>

      </div>
    </div>
  );
};
