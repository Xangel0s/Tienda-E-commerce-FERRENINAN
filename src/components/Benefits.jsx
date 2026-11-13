import React from 'react';
import { Truck, Percent, MessageCircle, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const Benefits = () => {
  const items = [
    {
      icon: Truck,
      title: 'Despacho Directo a Obra',
      description: 'Llevamos tus materiales a tiempo en Lima Metropolitana.',
      color: 'text-brand-500'
    },
    {
      icon: Percent,
      title: 'Precios x Mayor y Menor',
      description: 'Descuentos por volumen para contratistas y maestros de obra.',
      color: 'text-brand-600'
    },
    {
      icon: MessageCircle,
      title: 'Cotización Inmediata WhatsApp',
      description: 'Envía tu carrito o lista y recibe confirmación al instante.',
      color: 'text-green-600'
    },
    {
      icon: ShieldCheck,
      title: 'Eliminación de Desmonte Legal',
      description: 'Recojo embolsado o a granel con botaderos autorizados.',
      color: 'text-blue-600'
    }
  ];

  return (
    <section className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-brand-200 hover:shadow-sm transition-all"
              >
                <div className={`p-3 rounded-lg bg-white shadow-sm ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
