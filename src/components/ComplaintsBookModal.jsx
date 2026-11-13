import React, { useState } from 'react';
import { X, BookOpen, AlertCircle, CheckCircle2, Printer, Download, ShieldCheck, Building } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY_INFO } from '../data/products';

export const ComplaintsBookModal = () => {
  const { isComplaintsBookOpen, setIsComplaintsBookOpen } = useCart();

  const [formData, setFormData] = useState({
    docType: 'DNI',
    docNumber: '',
    fullName: '',
    phone: '',
    email: '',
    address: '',
    district: '',
    isMinor: false,
    guardianName: '',
    contractedType: 'PRODUCTO', // PRODUCTO o SERVICIO
    amountClaimed: '',
    contractedDescription: '',
    claimType: 'RECLAMO', // RECLAMO o QUEJA
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
      alert('Debe aceptar la declaración de veracidad de los datos.');
      return;
    }

    // Generar correlativo
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
      ...formData
    };

    setSubmittedSheet(submission);

    // Guardar en historial local
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

  const handleReset = () => {
    setSubmittedSheet(null);
    setIsComplaintsBookOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 flex flex-col">
        
        {/* Cabecera del Modal */}
        <div className="bg-brand-dark text-white p-5 flex items-center justify-between sticky top-0 z-10 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-500 rounded-lg text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white">
                Libro de Reclamaciones Virtual
              </h2>
              <p className="text-xs text-gray-300">
                Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571 - INDECOPI)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsComplaintsBookOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          
          {/* Ficha Legal de la Empresa */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 text-xs text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="font-bold text-gray-900 block">Razón Social:</span>
              <span>{COMPANY_INFO.legalName}</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 block">Nombre Comercial:</span>
              <span>{COMPANY_INFO.name}</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 block">RUC:</span>
              <span>20600000000</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 block">Domicilio Principal:</span>
              <span>{COMPANY_INFO.addressMain}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="font-bold text-gray-900 block">Depósito y Almacén:</span>
              <span>{COMPANY_INFO.addressWarehouse}</span>
            </div>
          </div>

          {!submittedSheet ? (
            /* Formulario */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Sección 1: Identificación del Consumidor */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-600 border-b border-brand-200 pb-1 mb-3 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                  Identificación del Consumidor Reclamante
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Tipo Doc.</label>
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
                      placeholder="Nombre completo del solicitante"
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
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Correo Electrónico (donde recibirá respuesta)</label>
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
                      placeholder="Av / Jr / Calle y número"
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Distrito / Ciudad</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="Ej: Jesús María, Lima"
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Identificación del Bien Contratado */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-600 border-b border-brand-200 pb-1 mb-3 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                  Identificación del Bien Contratado
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Tipo de Bien</label>
                    <div className="flex gap-4 p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800">
                        <input
                          type="radio"
                          name="contractedType"
                          value="PRODUCTO"
                          checked={formData.contractedType === 'PRODUCTO'}
                          onChange={handleChange}
                          className="text-brand-500"
                        />
                        <span>Producto (Materiales, Ferretería)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800">
                        <input
                          type="radio"
                          name="contractedType"
                          value="SERVICIO"
                          checked={formData.contractedType === 'SERVICIO'}
                          onChange={handleChange}
                          className="text-brand-500"
                        />
                        <span>Servicio (Desmonte, Flete)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Monto Reclamado en Soles (S/)</label>
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

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Descripción del Producto o Servicio Adquirido</label>
                    <input
                      type="text"
                      name="contractedDescription"
                      value={formData.contractedDescription}
                      onChange={handleChange}
                      placeholder="Ej. Cemento Sol 10 bolsas / Servicio de eliminación de desmonte..."
                      className="w-full text-xs p-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sección 3: Detalle de la Reclamación */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-600 border-b border-brand-200 pb-1 mb-3 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                  Detalle de la Reclamación y Pedido del Consumidor
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Tipo de Disconformidad</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className={`p-3 border rounded-xl cursor-pointer transition-all ${
                        formData.claimType === 'RECLAMO' ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-300' : 'border-gray-200 bg-white'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <input
                            type="radio"
                            name="claimType"
                            value="RECLAMO"
                            checked={formData.claimType === 'RECLAMO'}
                            onChange={handleChange}
                            className="text-brand-500"
                          />
                          <span className="font-black text-xs text-gray-900">RECLAMO</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-snug pl-5">
                          Disconformidad relacionada a los productos o servicios adquiridos.
                        </p>
                      </label>

                      <label className={`p-3 border rounded-xl cursor-pointer transition-all ${
                        formData.claimType === 'QUEJA' ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-300' : 'border-gray-200 bg-white'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <input
                            type="radio"
                            name="claimType"
                            value="QUEJA"
                            checked={formData.claimType === 'QUEJA'}
                            onChange={handleChange}
                            className="text-brand-500"
                          />
                          <span className="font-black text-xs text-gray-900">QUEJA</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-snug pl-5">
                          Disconformidad respecto a la atención recibida o malestar general.
                        </p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Detalle del Reclamo o Queja</label>
                    <textarea
                      name="claimDetail"
                      rows="3"
                      value={formData.claimDetail}
                      onChange={handleChange}
                      placeholder="Explique detalladamente los motivos de su reclamo o queja..."
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
                      placeholder="Indique con claridad qué solicita para dar solución (cambio de producto, devolución, rectificación...)"
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Declaración y Envío */}
              <div className="pt-2 border-t border-gray-200 space-y-4">
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
                    Declaro ser el titular del reclamo o queja y doy fe de que los datos consignados son verdaderos. Acepto el tratamiento de mis datos personales para la atención de este registro según la Ley N° 29733.
                  </span>
                </label>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-[11px] text-yellow-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Plazo Legal de Respuesta:</strong> La formulación del reclamo no impide acudir a otras vías de solución de controversias. El proveedor deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles improrrogables.
                  </span>
                </div>

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
            /* Constancia de Hoja de Reclamación Generada */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Hoja de Reclamación Registrada
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Su reclamo ha sido registrado con éxito en nuestro Libro de Reclamaciones Virtual.
                </p>
                <div className="mt-3 inline-block bg-brand-50 border border-brand-200 px-4 py-2 rounded-xl">
                  <span className="text-xs font-bold text-gray-500 block">Número de Registro:</span>
                  <span className="text-lg font-black text-brand-600">{submittedSheet.sheetNumber}</span>
                </div>
              </div>

              {/* Resumen para impresión */}
              <div className="text-left bg-gray-50 p-5 rounded-xl border border-gray-200 text-xs space-y-2 text-gray-700">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-bold">Fecha de Registro:</span>
                  <span>{submittedSheet.date}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-bold">Consumidor:</span>
                  <span>{submittedSheet.fullName} ({submittedSheet.docType}: {submittedSheet.docNumber})</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-bold">Tipo de Solicitud:</span>
                  <span className="font-bold text-brand-600">{submittedSheet.claimType}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
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

              {/* Botones de acción */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Guardar PDF</span>
                </button>
                <button
                  onClick={handleReset}
                  className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-colors shadow"
                >
                  Cerrar
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
