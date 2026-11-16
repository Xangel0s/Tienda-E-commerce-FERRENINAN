import { useEffect } from 'react';
import { COMPANY_INFO } from '../data/products';

const SITE_URL = 'https://ferreninan.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;
const DEFAULT_TITLE = 'FERRENINAN | Materiales de Construcción, Ferretería y Acabados en Lima';
const DEFAULT_DESCRIPTION = 'FERRENINAN (FERRENINANYA S.A.C.) - Distribuidor mayorista y minorista de Cemento Sol, Apu, Drywall Gyplac, Ladrillos Pirámide, Fierros Aceros Arequipa y Pinturas en Lima. Sedes en Jesús María y Breña con despacho a pie de obra.';
const DEFAULT_KEYWORDS = 'cemento sol, cemento apu, cemento andino, drywall gyplac, ladrillos piramide, aceros arequipa, ferreteria lima, materiales de construccion, jesus maria, breña, retiro en almacen, despacho a obra';

/**
 * Helper para actualizar o crear una etiqueta meta en el <head>
 */
function setMetaTag(attrName, attrValue, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper para actualizar o crear la etiqueta canonical
 */
function setCanonical(url) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

/**
 * Helper para inyectar o actualizar un script JSON-LD en el <head>
 */
function setJsonLd(id, data) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/**
 * Componente SEO Universal para FERRENINAN
 */
export const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  image,
  type = 'website',
  product = null,
  breadcrumbs = null,
  noindex = false
}) => {
  useEffect(() => {
    // 1. Título del Documento
    const finalTitle = title ? `${title} | FERRENINAN` : DEFAULT_TITLE;
    document.title = finalTitle;

    // 2. Metas Básicas
    const finalDesc = description || DEFAULT_DESCRIPTION;
    const finalKeywords = keywords || DEFAULT_KEYWORDS;
    const finalCanonical = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : SITE_URL);
    const finalImage = image
      ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
      : DEFAULT_IMAGE;

    setMetaTag('name', 'description', finalDesc);
    setMetaTag('name', 'keywords', finalKeywords);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setCanonical(finalCanonical);

    // 3. Open Graph (Facebook, WhatsApp, LinkedIn)
    setMetaTag('property', 'og:site_name', COMPANY_INFO.name);
    setMetaTag('property', 'og:locale', 'es_PE');
    setMetaTag('property', 'og:type', product ? 'product' : type);
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:image', finalImage);
    setMetaTag('property', 'og:url', finalCanonical);

    // 4. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', finalImage);

    // 5. Schema.org - LocalBusiness / HardwareStore
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'HardwareStore',
      'name': COMPANY_INFO.name,
      'legalName': COMPANY_INFO.legalName,
      'url': SITE_URL,
      'logo': `${SITE_URL}/logo.png`,
      'image': `${SITE_URL}/logo.png`,
      'telephone': COMPANY_INFO.phone,
      'email': COMPANY_INFO.email,
      'priceRange': 'S/',
      'address': [
        {
          '@type': 'PostalAddress',
          'streetAddress': 'Av. General Garzón Nro. 1091',
          'addressLocality': 'Jesús María',
          'addressRegion': 'Lima',
          'addressCountry': 'PE'
        },
        {
          '@type': 'PostalAddress',
          'streetAddress': 'Jr. General Felipe Varela 1855, Urb. Azcona',
          'addressLocality': 'Breña',
          'addressRegion': 'Lima',
          'addressCountry': 'PE'
        }
      ],
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': -12.0722,
        'longitude': -77.0505
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '07:30',
          'closes': '18:30'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Sunday'],
          'opens': '08:00',
          'closes': '13:00'
        }
      ]
    };
    setJsonLd('schema-local-business', orgSchema);

    // 6. Schema.org - Product (si estamos en PDP)
    if (product) {
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name,
        'image': [finalImage],
        'description': product.description || finalDesc,
        'sku': product.sku || product.id,
        'mpn': product.sku || product.id,
        'brand': {
          '@type': 'Brand',
          'name': product.brand || 'FERRENINAN'
        },
        'offers': {
          '@type': 'Offer',
          'url': finalCanonical,
          'priceCurrency': 'PEN',
          'price': product.price !== null ? product.price.toFixed(2) : '0.00',
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          'seller': {
            '@type': 'Organization',
            'name': COMPANY_INFO.legalName
          }
        }
      };
      setJsonLd('schema-product', productSchema);
    } else {
      // Eliminar schema de producto si no estamos en una PDP
      const oldProdScript = document.getElementById('schema-product');
      if (oldProdScript) oldProdScript.remove();
    }

    // 7. Schema.org - Breadcrumbs (si se proporcionan)
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': b.name,
          'item': b.url ? (b.url.startsWith('http') ? b.url : `${SITE_URL}${b.url}`) : SITE_URL
        }))
      };
      setJsonLd('schema-breadcrumbs', breadcrumbSchema);
    } else {
      const oldBreadScript = document.getElementById('schema-breadcrumbs');
      if (oldBreadScript) oldBreadScript.remove();
    }
  }, [title, description, keywords, canonicalUrl, image, type, product, breadcrumbs, noindex]);

  return null;
};
