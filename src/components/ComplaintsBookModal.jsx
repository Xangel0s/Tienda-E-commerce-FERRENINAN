import React, { useState } from 'react';
import { X, BookOpen, AlertCircle, CheckCircle2, Printer, Mail, Send, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/products';

export const ComplaintsBookModal = () => {
  const { isComplaintsBookOpen, setIsComplaintsBookOpen } = useCart();

  const [formData, setFormData] = useState({
    claimType: 'RECLAMO', // RECLAMO o QUEJA
    docType: 'DNI',
    docNumber: '',
    fullName: '',
    phone: '',
    email: '',
    department: 'Lima',
    province: 'Lima',
    district: '',
    address: '',
    isMinor: false,
    guardianName: '',
    contractedType: 'PRODUCTO', // PRODUCTO o SERVICIO
    invoiceNumber: '',
    amountClaimed: '',
    contractedDescription: '',
    claimDetail: '',
    claimRequest: '',
    acceptTerms: false
  });

  const [submittedSheet, setSubmittedSheet] = useState(null);

  if (!isComplaintsBookOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      alert('Debe aceptar la declaración jurada de veracidad de datos.');
      return;
    }

    const year = new Date().getFullYear();
    const count = parseInt(localStorage.getItem('ferreninan_claim_seq') || '0', 10) + 1;
    localStorage.setItem('ferreninan_claim_seq', count.toString());
    const sheetNumber = `REC-${year}-${count.toString().padStart(5, '0')}`;

    const submission = {
      sheetNumber,
      date: new Date().toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      targetEmail: COMPANY_INFO.email, // Ferreterianinanyasac1@hotmail.com
      ...formData
    };

    setSubmittedSheet(submission);

    try {
      const history = JSON.parse(localStorage.getItem('ferreninan_claims_list') || '[]');
      history.push(submission);
      localStorage.setItem('ferreninan_claims_list', JSON.stringify(history));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmailCopy = () => {
    if (!submittedSheet) return;
    const subject = encodeURIComponent(`Hoja de Reclamación ${submittedSheet.sheetNumber} - ${submittedSheet.fullName}`);
    const body = encodeURIComponent(
      `HOJA DE RECLAMACIÓN VIRTUAL N° ${submittedSheet.sheetNumber}\n` +
      `Fecha: ${submittedSheet.date}\n` +
      `Empresa: ${COMPANY_INFO.legalName} (${COMPANY_INFO.name})\n` +
      `Enviado a: ${COMPANY_INFO.email}\n\n` +
      `DATOS DEL RECLAMANTE:\n` +
      `- Nombre: ${submittedSheet.fullName}\n` +
      `- ${submittedSheet.docType}: ${submittedSheet.docNumber}\n` +
      `- Teléfono: ${submittedSheet.phone}\n` +
      `- Email: ${submittedSheet.email}\n` +
      `- Domicilio: ${submittedSheet.address}, ${submittedSheet.district} - ${submittedSheet.province}, ${submittedSheet.department}\n\n` +
      `DETALLE:\n` +
      `- Tipo: ${submittedSheet.claimType}\n` +
      `- Bien: ${submittedSheet.contractedType} - ${submittedSheet.contractedDescription}\n` +
      `- Monto: S/ ${submittedSheet.amountClaimed || '0.00'}\n` +
      `- Detalle: ${submittedSheet.claimDetail}\n` +
      `- Pedido del cliente: ${submittedSheet.claimRequest}\n`
    );
    window.open(`mailto:${COMPANY_INFO.email}?cc=${submittedSheet.email}&subject=${subject}&body=${body}`, '_blank');
  };

  const handleReset = () => {
    setSubmittedSheet(null);
    setIsComplaintsBookOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      
      {/* Contenedor Modal sin bordes blancos ni fugas de scrollbar */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-gray-800">
        
        {/* Cabecera Oscura Promart Style (Fija, sin scrollbar cortándola) */}
        <div className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-500 rounded-lg text-white shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>Libro de Reclamaciones Virtual</span>
                <span className="text-[10px] bg-red-600/40 text-red-200 px-2 py-0.5 rounded border border-red-500/40 font-semibold">
                  Ley N° 29571
                </span>
              </h2>
              <p className="text-[11px] text-gray-300">
                FERRENINANYA S.A.C. • Reclamos a: <strong className="text-yellow-400">{COMPANY_INFO.email}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsComplaintsBookOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del Modal con scroll interno limpio */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-white">
          
          {/* Ficha Legal de la Empresa */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 mb-5 text-xs text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2 shadow-inner">
            <div>
              <span className="font-bold text-gray-900">Razón Social: </span>
              <span>{COMPANY_INFO.legalName}</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">Nombre Comercial: </span>
              <span>{COMPANY_INFO.name}</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">RUC: </span>
              <span>20600000000</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">Correo de Atención: </span>
              <span className="font-semibold text-brand-600">{COMPANY_INFO.email}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="font-bold text-gray-900">Direcciones: </span>
              <span>{COMPANY_INFO.addressMain} / {COMPANY_INFO.addressWarehouse}</span>
            </div>
          </div>

          {!submittedSheet ? (
            /* Formulario */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Sección 1: Tipo de Disconformidad Promart Style */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-600 border-b border-brand-200 pb-1 mb-2.5 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                  Tipo de Reclamación
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-3 border rounded-xl cursor-pointer transition-all ${
                    formData.claimType === 'RECLAMO' ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-300' : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="radio"
                        name="claimType"
                        value="RECLAMO"
                        checked={formData.claimType === 'RECLAMO'}
                        onChange={handleChange}
                        className="text-brand-500 focus:ring-brand-400"
                      />
                      <span className="font-black text-xs text-gray-900">RECLAMO</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug pl-5">
                      Disconformidad relacionada directamente a los materiales o productos adquiridos.
                    </p>
                  </label>

                  <label className={`p-3 border rounded-xl cursor-pointer transition-all ${
                    formData.claimType === 'QUEJA' ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-300' : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="radio"
                        name="claimType"
                        value="QUEJA"
                        checked={formData.claimType === 'QUEJA'}
                        onChange={handleChange}
                        className="text-brand-500 focus:ring-brand-400"
                      />
                      <span className="font-black text-xs text-gray-900">QUEJA</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug pl-5">
                      Disconformidad respecto a la atención recibida o malestar con el personal/despacho.
                    </p>
                  </label>
                </div>
              </div>

              {/* Sección 2: Identificación del Consumidor */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-600 border-b border-brand-200 pb-1 mb-2.5 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                  Identificación del Consumidor Reclamante
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Tipo de Documento</label>
                    <select
                      name="docType"
                      value={formData.docType}
                      onChange={handleChange}
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500 bg-white"
                      required
                    >
                      <option value="DNI">DNI</option>
                      <option value="CE">Carnet de Extranjería</option>
                      <option value="RUC">RUC</option>
                      <option value="PASAPORTE">Pasaporte</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Número de Documento</label>
                    <input
                      type="text"
                      name="docNumber"
                      value={formData.docNumber}
                      onChange={handleChange}
                      placeholder="Ingrese número de documento"
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Nombres y Apellidos / Razón Social</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nombres completos del solicitante"
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Teléfono / Celular</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="999 999 999"
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Correo Electrónico (donde recibirá respuesta oficial)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Dirección de Domicilio</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Av. / Jr. / Calle y N° de casa o dpto"
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Distrito</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="Ej: Jesús María"
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sección 3: Identificación del Bien Contratado */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-600 border-b border-brand-200 pb-1 mb-2.5 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                  Identificación del Bien Contratado
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Tipo de Bien</label>
                    <div className="flex gap-3 p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer font-bold text-gray-800">
                        <input
                          type="radio"
                          name="contractedType"
                          value="PRODUCTO"
                          checked={formData.contractedType === 'PRODUCTO'}
                          onChange={handleChange}
                          className="text-brand-500"
                        />
                        <span>Producto</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer font-bold text-gray-800">
                        <input
                          type="radio"
                          name="contractedType"
                          value="SERVICIO"
                          checked={formData.contractedType === 'SERVICIO'}
                          onChange={handleChange}
                          className="text-brand-500"
                        />
                        <span>Servicio</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">N° Comprobante / Guía</label>
                    <input
                      type="text"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleChange}
                      placeholder="Ej: B001-0042 o F001-012"
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Monto Reclamado (S/)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="amountClaimed"
                      value={formData.amountClaimed}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Descripción del Producto o Servicio</label>
                    <input
                      type="text"
                      name="contractedDescription"
                      value={formData.contractedDescription}
                      onChange={handleChange}
                      placeholder="Ej. Cemento Sol 20 bolsas / Servicio de eliminación de desmonte a granel..."
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sección 4: Detalle y Pedido */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-600 border-b border-brand-200 pb-1 mb-2.5 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] flex items-center justify-center font-bold">4</span>
                  Detalle del Reclamo / Queja y Pedido
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Detalle de los Hechos</label>
                    <textarea
                      name="claimDetail"
                      rows="3"
                      value={formData.claimDetail}
                      onChange={handleChange}
                      placeholder="Explique detalladamente qué ocurrió..."
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Pedido Concreto del Consumidor</label>
                    <textarea
                      name="claimRequest"
                      rows="2"
                      value={formData.claimRequest}
                      onChange={handleChange}
                      placeholder="Indique qué solución solicita (cambio de producto, devolución de dinero, rectificación...)"
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Declaración y Plazo Legal */}
              <div className="pt-2 border-t border-gray-200 space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-0.5 rounded text-brand-500 focus:ring-brand-400"
                    required
                  />
                  <span>
                    Declaro ser el titular del reclamo o queja y doy fe de que los datos consignados son verdaderos. Este registro será enviado a <strong>{COMPANY_INFO.email}</strong> para su investigación y respuesta en un plazo no mayor a 15 días hábiles conforme a la Ley N° 29571.
                  </span>
                </label>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsComplaintsBookOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-md transition-colors"
                  >
                    Enviar Hoja de Reclamación
                  </button>
                </div>
              </div>

            </form>
          ) : (
            /* Pantalla de Confirmación y Constancia */
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Hoja de Reclamación Registrada
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Se ha generado la constancia oficial para el correo: <strong className="text-gray-800">{submittedSheet.email}</strong> y notificado a <strong className="text-brand-600">{COMPANY_INFO.email}</strong>.
                </p>
                <div className="mt-3 inline-block bg-brand-50 border border-brand-200 px-5 py-2 rounded-xl">
                  <span className="text-[11px] font-bold text-gray-500 block">Número de Registro Correlativo:</span>
                  <span className="text-lg font-black text-brand-600">{submittedSheet.sheetNumber}</span>
                </div>
              </div>

              {/* Ficha Resumen */}
              <div className="text-left bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs space-y-2 text-gray-700">
                <div className="flex justify-between border-b pb-1.5">
                  <span className="font-bold">Fecha y Hora:</span>
                  <span>{submittedSheet.date}</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="font-bold">Consumidor:</span>
                  <span>{submittedSheet.fullName} ({submittedSheet.docType}: {submittedSheet.docNumber})</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="font-bold">Tipo:</span>
                  <span className="font-bold text-brand-600">{submittedSheet.claimType}</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="font-bold">Bien Contratado:</span>
                  <span>{submittedSheet.contractedType}: {submittedSheet.contractedDescription}</span>
                </div>
                <div className="pt-1">
                  <span className="font-bold block mb-1">Detalle del Reclamo:</span>
                  <p className="bg-white p-2.5 rounded border border-gray-200 italic">
                    "{submittedSheet.claimDetail}"
                  </p>
                </div>
                <div className="pt-1">
                  <span className="font-bold block mb-1">Pedido del Consumidor:</span>
                  <p className="bg-white p-2.5 rounded border border-gray-200 italic">
                    "{submittedSheet.claimRequest}"
                  </p>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleSendEmailCopy}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow"
                >
                  <Mail className="w-4 h-4" />
                  <span>Enviar copia por Email</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Guardar Constancia</span>
                </button>
                <button
                  onClick={handleReset}
                  className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors shadow"
                >
                  Listo / Cerrar
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
