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

  <!-- ========================================== -->
  <!-- 2. CATEGORÍAS PRINCIPALES DEL CATÁLOGO    -->
  <!-- ========================================== -->
`;

CATEGORIES.filter(c => c.id !== 'todos').forEach(cat => {
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
  <!-- 3. CATÁLOGO DE PRODUCTOS INDIVIDUALES (PDP) -->
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
  <!-- 4. PÁGINAS LEGALES E INSTITUCIONALES        -->
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
console.log(`✓ Sitemap generado con éxito en public/sitemap.xml con ${PRODUCTS.length} productos indexados.`);
