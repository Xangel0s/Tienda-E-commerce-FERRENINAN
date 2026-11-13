import { PRODUCTS, CATEGORIES, COMPANY_INFO } from '../data/products.js';

console.log('--- INICIANDO VERIFICACIÓN DE FERRENINAN ---');

// 1. Verificar catálogo
console.log(`✓ Total de productos cargados: ${PRODUCTS.length}`);
if (PRODUCTS.length < 20) {
  throw new Error('Faltan productos en el catálogo');
}

// 2. Verificar categorías
const validCategoryIds = new Set(CATEGORIES.map(c => c.id));
PRODUCTS.forEach((p, idx) => {
  if (!p.id || !p.name) {
    throw new Error(`Producto #${idx} carece de id o nombre`);
  }
  if (!validCategoryIds.has(p.category)) {
    throw new Error(`Categoría inválida '${p.category}' en producto: ${p.name}`);
  }
});
console.log('✓ Todas las categorías de productos son válidas');

// 3. Verificar productos con precio y a cotizar
const priced = PRODUCTS.filter(p => p.price !== null);
const quoted = PRODUCTS.filter(p => p.price === null);
console.log(`✓ Productos con precio directo en S/: ${priced.length}`);
console.log(`✓ Productos para consulta/cotización: ${quoted.length}`);

// 4. Verificar configuración de WhatsApp
if (COMPANY_INFO.phoneClean !== '51908747531') {
  throw new Error(`Número de WhatsApp incorrecto: ${COMPANY_INFO.phoneClean}`);
}
const testMsg = COMPANY_INFO.whatsappUrl('Prueba de mensaje');
if (!testMsg.startsWith('https://wa.me/51908747531?text=')) {
  throw new Error(`URL de WhatsApp mal formada: ${testMsg}`);
}
console.log('✓ Canal de WhatsApp verificado correctamente (+51 908 747 531)');

console.log('--- TODAS LAS VERIFICACIONES COMPLETADAS CON ÉXITO ---');
