import { useEffect } from 'react';
import { COMPANY_INFO } from '../data/products';

const SITE_URL = 'https://ferreninan.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;
const DEFAULT_TITLE = 'FERRENINAN | El Mejor Proveedor y Distribuidor Mayorista de Materiales de Construcción en Lima';
const DEFAULT_DESCRIPTION = 'FERRENINAN (FERRENINANYA S.A.C.) es el mejor proveedor y distribuidor mayorista de materiales de construcción y líder en servicios de limpieza de desmonte, recojo de escombros, demolición y transporte en camiones volquetes en Lima. Suministro oficial de Cemento Sol, Apu, Andino, Drywall Gyplac, Ladrillos Pirámide, Fierros Aceros Arequipa, Agregados y herramientas con despacho inmediato a pie de obra en Jesús María, Breña y todo Lima Metropolitana.';
const DEFAULT_KEYWORDS = 'limpieza de desmonte lima, recojo de escombros lima, retiro de desmonte embolsado y a granel, eliminacion de desmonte autorizada, volquetes para desmonte en lima, limpieza de obras y terrenos, demolicion y desmonte lima, botaderos autorizados lima, peones para carguio de desmonte, sacos para desmonte, limpieza profunda de obra, mejor proveedor de materiales de construccion lima, proveedor para obras y contratistas, distribuidor mayorista materiales de construccion, proveedor oficial cemento sol lima, distribuidor cemento apu lima, proveedor drywall gyplac por mayor, suministro para obras de construccion lima, ferreteria mayorista jesus maria breña, despacho de materiales a pie de obra, venta por volumen para constructoras';

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
 * Especializado en Posicionamiento B2B como el Mejor Proveedor del Rubro de la Construcción
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

    // 5. Schema.org - Empresa Líder Proveedora y Mayorista (HardwareStore + WholesaleStore)
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': ['HardwareStore', 'WholesaleStore'],
      'name': COMPANY_INFO.name,
      'legalName': COMPANY_INFO.legalName,
      'slogan': 'El mejor proveedor y distribuidor mayorista de materiales de construcción en Lima',
      'description': finalDesc,
      'url': SITE_URL,
      'logo': `${SITE_URL}/logo.png`,
      'image': `${SITE_URL}/logo.png`,
      'telephone': COMPANY_INFO.phone,
      'email': COMPANY_INFO.email,
      'priceRange': 'S/',
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '194',
        'bestRating': '5',
        'worstRating': '1'
      },
      'knowsAbout': [
        'Materiales de Construcción',
        'Limpieza de Desmonte y Escombros',
        'Recojo de Desmonte Embolsado y a Granel',
        'Limpieza de Obras y Terrenos',
        'Demoliciones Menores y Retiro de Materiales',
        'Camiones Volquetes de 8m³ y 15m³',
        'Disposición en Botaderos Autorizados',
        'Suministro a Contratistas y Constructoras',
        'Distribución Mayorista de Cemento Sol y Apu',
        'Sistema Drywall Gyplac',
        'Fierros Aceros Arequipa',
        'Ladrillos Pirámide',
        'Logística y Despacho a Pie de Obra'
      ],
      'areaServed': [
        { '@type': 'AdministrativeArea', 'name': 'Lima Metropolitana' },
        { '@type': 'City', 'name': 'Lima' },
        { '@type': 'AdministrativeArea', 'name': 'Jesús María' },
        { '@type': 'AdministrativeArea', 'name': 'Breña' },
        { '@type': 'AdministrativeArea', 'name': 'Pueblo Libre' },
        { '@type': 'AdministrativeArea', 'name': 'San Miguel' },
        { '@type': 'AdministrativeArea', 'name': 'Magdalena del Mar' },
        { '@type': 'AdministrativeArea', 'name': 'Lince' },
        { '@type': 'AdministrativeArea', 'name': 'Cercado de Lima' }
      ],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Catálogo de Suministro y Servicios para Proveedores y Obras',
        'itemListElement': [
          {
            '@type': 'OfferCatalog',
            'name': 'Suministro Mayorista de Cemento y Agregados a Pie de Obra',
            'description': 'Distribución rápida y programada de Cemento Sol, Apu, Andino y agregados seleccionados.'
          },
          {
            '@type': 'OfferCatalog',
            'name': 'Distribución Integral del Sistema Drywall Gyplac',
            'description': 'Planchas de yeso estándar y RH, perfiles parantes y rieles galvanizados para tabiquería técnica.'
          },
          {
            '@type': 'OfferCatalog',
            'name': 'Servicio Oficial de Limpieza de Desmonte y Recojo de Escombros',
            'description': 'Limpieza de obra, recojo de desmonte embolsado y a granel con camiones volquetes, carguío y botaderos autorizados.'
          },
          {
            '@type': 'OfferCatalog',
            'name': 'Cotización y Asesoría por Metrado de Planos CAD',
            'description': 'Cálculo técnico y asesoría comercial para contratistas y maestros de obra.'
          }
        ]
      },
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

    // 6. Schema.org - Servicios B2B para Proveedores y Contratistas (Service)
    const servicesSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': `${SITE_URL}/#servicio-despacho-obra`,
          'name': 'Suministro Mayorista y Despacho a Pie de Obra',
          'provider': {
            '@type': 'WholesaleStore',
            'name': COMPANY_INFO.legalName
          },
          'areaServed': 'Lima Metropolitana',
          'serviceType': 'Distribución y Transporte de Materiales de Construcción',
          'description': 'Abastecimiento continuo y entrega garantizada en 24h de cemento, ladrillos, agregados, fierros y drywall en Lima.',
          'offers': {
            '@type': 'Offer',
            'priceCurrency': 'PEN',
            'availability': 'https://schema.org/InStock',
            'description': 'Precios de distribuidor mayorista por volumen para contratistas.'
          }
        },
        {
          '@type': 'Service',
          '@id': `${SITE_URL}/#servicio-eliminacion-desmonte`,
          'name': 'Servicio Autorizado de Limpieza de Desmonte, Recojo de Escombros y Volquetes',
          'provider': {
            '@type': 'WholesaleStore',
            'name': COMPANY_INFO.legalName
          },
          'areaServed': 'Lima Metropolitana',
          'serviceType': 'Limpieza de Obra, Recojo de Escombros y Retiro de Desmonte',
          'description': 'Servicio integral y certificado de limpieza de desmonte, retiro de escombros embolsados o a granel con flota de volquetes autorizados, peones para carguío y botaderos oficiales en Lima.',
          'offers': {
            '@type': 'Offer',
            'priceCurrency': 'PEN',
            'availability': 'https://schema.org/InStock',
            'description': 'Tarifas por m³, por bolsa o por viaje completo de camión volquete.'
          }
        },
        {
          '@type': 'Service',
          '@id': `${SITE_URL}/#servicio-asesoria-planos`,
          'name': 'Asesoría Técnica y Cotización Inmediata para Obras por WhatsApp',
          'provider': {
            '@type': 'WholesaleStore',
            'name': COMPANY_INFO.legalName
          },
          'areaServed': 'Lima Metropolitana',
          'serviceType': 'Cálculo y Modularidad de Materiales por Planos CAD',
          'description': 'Atención comercial inmediata con asesor asignado para metrados de obra y listas de materiales.',
          'offers': {
            '@type': 'Offer',
            'priceCurrency': 'PEN',
            'availability': 'https://schema.org/InStock'
          }
        }
      ]
    };
    setJsonLd('schema-services', servicesSchema);

    // 7. Schema.org - Product (si estamos en PDP)
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
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '87',
          'bestRating': '5'
        },
        'offers': {
          '@type': 'Offer',
          'url': finalCanonical,
          'priceCurrency': 'PEN',
          'price': product.price !== null ? product.price.toFixed(2) : '0.00',
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          'seller': {
            '@type': 'WholesaleStore',
            'name': COMPANY_INFO.legalName,
            'url': SITE_URL
          }
        }
      };
      setJsonLd('schema-product', productSchema);
    } else {
      const oldProdScript = document.getElementById('schema-product');
      if (oldProdScript) oldProdScript.remove();
    }

    // 8. Schema.org - Breadcrumbs (si se proporcionan)
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
