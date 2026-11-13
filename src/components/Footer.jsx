import React from 'react';
import { Phone, Mail, MapPin, BookOpen, Clock, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';
import { COMPANY_INFO, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';

export const Footer = ({ onSelectCategory }) => {
  const { setIsComplaintsBookOpen } = useCart();

  return (
    <footer className="bg-brand-dark text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Grilla Principal del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 pb-8 border-b border-gray-800">
          
          {/* Columna 1: Identidad Corporativa */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="FERRENINAN Logo"
                className="h-10 w-auto object-contain bg-white rounded p-1"
              />
              <span className="text-xl font-black text-white tracking-tight">
                FERRE<span className="text-brand-500">NINAN</span>
              </span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>{COMPANY_INFO.legalName}</strong> - Empresa líder en la distribución y comercialización de materiales de construcción, agregados, drywall, pinturas y servicio integral de eliminación de desmonte en Lima.
            </p>

            <div className="text-xs space-y-1.5 pt-1 text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span>Lun - Sáb: 7:30 AM - 6:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                <span>Atención a contratistas y obras públicas/privadas</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Sedes y Contacto */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-gray-800 pb-2">
              Nuestras Sedes y Contacto
            </h4>
            <ul className="text-xs space-y-2.5 text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Sede Principal:</strong>
                  <span>{COMPANY_INFO.addressMain}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Depósito de Materiales:</strong>
                  <span>{COMPANY_INFO.addressWarehouse}</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <div>
                  <strong className="text-white">WhatsApp Pedidos:</strong>{' '}
                  <a href={`https://wa.me/${COMPANY_INFO.phoneClean}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 font-bold">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2 text-[11px]">
                <span className="text-gray-500">Teléfonos Fijos: {COMPANY_INFO.telLines}</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Categorías Populares */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-gray-800 pb-2">
              Líneas de Productos
            </h4>
            <ul className="text-xs space-y-1.5 text-gray-400">
              {CATEGORIES.slice(1, 8).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      const el = document.getElementById('catalogo');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-brand-400 flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-brand-500" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Libro de Reclamaciones y Pagos */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-gray-800 pb-2">
              Atención al Consumidor
            </h4>

            {/* Libro de Reclamaciones Virtual Banner */}
            <div
              onClick={() => setIsComplaintsBookOpen(true)}
              className="bg-white/5 hover:bg-white/10 p-3.5 rounded-xl border border-gray-700 cursor-pointer transition-all group hover:border-brand-500"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-black text-white group-hover:text-brand-400 transition-colors">
                    LIBRO DE RECLAMACIONES
                  </span>
                  <span className="block text-[10px] text-gray-400">
                    Virtual según Ley N° 29571
                  </span>
                </div>
              </div>
            </div>

            {/* Formas de Pago */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Medios de Pago Aceptados
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                <span className="bg-purple-900/60 text-purple-200 border border-purple-700 px-2 py-1 rounded">Yape</span>
                <span className="bg-cyan-900/60 text-cyan-200 border border-cyan-700 px-2 py-1 rounded">Plin</span>
                <span className="bg-blue-900/60 text-blue-200 border border-blue-700 px-2 py-1 rounded">BCP</span>
                <span className="bg-blue-950 text-blue-200 border border-blue-800 px-2 py-1 rounded">BBVA</span>
                <span className="bg-green-900/60 text-green-200 border border-green-700 px-2 py-1 rounded">Contra Entrega</span>
              </div>
            </div>

          </div>

        </div>

        {/* Barra Inferior Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>
            © {new Date().getFullYear()} <strong>{COMPANY_INFO.legalName}</strong> (FERRENINAN). Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-4">
            <span>Precios incluyen I.G.V.</span>
            <span>•</span>
            <button
              onClick={() => setIsComplaintsBookOpen(true)}
              className="text-gray-400 hover:text-white underline"
            >
              Libro de Reclamaciones
            </button>
            <span>•</span>
            <span>Lima, Perú</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
