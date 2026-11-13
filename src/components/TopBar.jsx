import React from 'react';
import { Phone, MapPin, Truck, BookOpen } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import { useCart } from '../context/CartContext';

export const TopBar = () => {
  const { setIsComplaintsBookOpen } = useCart();

  return (
    <div className="bg-brand-charcoal text-white text-xs py-2 px-4 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Beneficios tipo Promart */}
        <div className="flex items-center space-x-6 overflow-x-auto py-0.5 text-gray-300">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Truck className="w-3.5 h-3.5 text-brand-500" />
            <strong className="text-white">Despacho a Obra</strong> en Lima Metropolitana
          </span>
          <span className="hidden sm:inline-block text-gray-600">|</span>
          <span className="hidden sm:flex items-center gap-1.5 whitespace-nowrap">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            Sedes en <strong className="text-white">Jesús María</strong> y <strong className="text-white">Breña</strong>
          </span>
          <span className="hidden md:inline-block text-gray-600">|</span>
          <span className="hidden md:inline-block text-gray-300">
            Horario: Lun - Sáb: 7:30 AM - 6:30 PM
          </span>
        </div>

        {/* Canales y Libro */}
        <div className="flex items-center space-x-4">
          <a
            href={`https://wa.me/${COMPANY_INFO.phoneClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-green-400 font-medium transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-green-400" />
            WhatsApp: <span className="text-white font-bold">{COMPANY_INFO.phone}</span>
          </a>
          <span className="text-gray-600">|</span>
          <button
            onClick={() => setIsComplaintsBookOpen(true)}
            className="flex items-center gap-1 hover:text-brand-300 transition-colors text-gray-300"
            title="Libro de Reclamaciones Virtual"
          >
            <BookOpen className="w-3.5 h-3.5 text-brand-500" />
            <span>Libro de Reclamaciones</span>
          </button>
        </div>
      </div>
    </div>
  );
};
