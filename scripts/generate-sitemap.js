import fs from 'fs';
import { PRODUCTS, CATEGORIES, COMPANY_INFO } from '../src/data/products.js';

const DOMAIN = 'https://ferreninan.com';
const TODAY = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- ========================================== -->
  <!-- 1. PÁGINA PRINCIPAL / HOME                 -->
  <!-- ========================================== -->
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- ==================================================== -->
  <!-- 2. SERVICIOS Y SUMINISTRO PARA PROVEEDORES Y OBRAS   -->
  <!-- ==================================================== -->
  <url>
    <loc>${DOMAIN}/?cat=desmonte</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>${DOMAIN}/images/products/desmonte_volquete.jpg</image:loc>
      <image:title>Servicio Autorizado de Eliminación de Desmonte con Camiones Volquetes</image:title>
      <image:caption>Servicio oficial de recojo de escombros de construcción en Lima</image:caption>
    </image:image>
  </url>
  <url>
    <loc>${DOMAIN}/?cat=cementos</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.92</priority>
    <image:image>
      <image:loc>${DOMAIN}/images/products/cemento_sol.jpg</image:loc>
      <image:title>Proveedor Mayorista de Cemento Sol, Apu y Andino en Lima</image:title>
      <image:caption>Distribuidor oficial de cemento para obras con despacho a pie de obra</image:caption>
    </image:image>
  </url>
  <url>
    <loc>${DOMAIN}/?cat=drywall</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
    <image:image>
      <image:loc>${DOMAIN}/images/products/plancha_gyplac_standard.jpg</image:loc>
      <image:title>Proveedor Mayorista de Drywall Gyplac y Perfiles Galvanizados</image:title>
      <image:caption>Suministro de planchas de yeso, parantes y rieles para contratistas</image:caption>
    </image:image>
  </url>
  <url>
    <loc>${DOMAIN}/?cat=agregados</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
    <image:image>
      <image:loc>${DOMAIN}/images/products/arena_fina.jpg</image:loc>
      <image:title>Proveedor de Arena Fina, Gruesa y Agregados por Bolsa</image:title>
      <image:caption>Materiales de construcción zarandeados y clasificados para tarrajeo y concreto</image:caption>
    </image:image>
  </url>
  <url>
    <loc>${DOMAIN}/?cat=fierros</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
    <image:image>
      <image:loc>${DOMAIN}/images/products/fierro_corrugado.jpg</image:loc>
      <image:title>Distribuidor de Fierro Corrugado Aceros Arequipa y Alambre Prodac</image:title>
      <image:caption>Fierro estructural antisísmico Grado 60 para obras en Lima</image:caption>
    </image:image>
  </url>

  <!-- ========================================== -->
  <!-- 3. OTRAS CATEGORÍAS DEL CATÁLOGO           -->
  <!-- ========================================== -->
`;

const priorityCats = ['desmonte', 'cementos', 'drywall', 'agregados', 'fierros'];
CATEGORIES.filter(c => c.id !== 'todos' && !priorityCats.includes(c.id)).forEach(cat => {
  xml += `  <url>
    <loc>${DOMAIN}/?cat=${cat.id}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
});

xml += `
  <!-- ========================================== -->
  <!-- 4. CATÁLOGO DE PRODUCTOS INDIVIDUALES (PDP) -->
  <!-- ========================================== -->
`;

PRODUCTS.forEach(p => {
  const imgUrl = p.image.startsWith('http') ? p.image : `${DOMAIN}${p.image}`;
  const cleanTitle = p.name.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

  xml += `  <url>
    <loc>${DOMAIN}/?p=${p.id}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
    <image:image>
      <image:loc>${imgUrl}</image:loc>
      <image:title>${cleanTitle} - ${p.brand || 'FERRENINAN'}</image:title>
      <image:caption>Precio distribuidor ${cleanTitle} en FERRENINAN Lima</image:caption>
    </image:image>
  </url>
`;
});

xml += `
  <!-- ========================================== -->
  <!-- 5. PÁGINAS LEGALES E INSTITUCIONALES        -->
  <!-- ========================================== -->
  <url>
    <loc>${DOMAIN}/?view=reclamaciones</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.30</priority>
  </url>

</urlset>
`;

fs.writeFileSync('public/sitemap.xml', xml, 'utf-8');
console.log(`✓ Sitemap generado con éxito en public/sitemap.xml con ${PRODUCTS.length} productos y servicios indexados.`);
