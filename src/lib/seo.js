// SEO Configuration and Utilities

const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'ZetDigi',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://zetdigi.com',
  description: 'Grow your Amazon & marketplace sales with data-driven automation. Smart tools for product research, listing optimization, PPC automation & multi-channel selling.',
  logo: '/logo.png',
  twitterHandle: '@zetdigi',
};

/**
 * Generate comprehensive metadata for pages
 */
export function generateMetadata({
  title,
  description,
  image,
  type = 'website',
  path = '',
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
}) {
  const pageUrl = `${SITE_CONFIG.url}${path}`;
  const pageTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name;
  const pageDescription = description || SITE_CONFIG.description;
  const pageImage = image || `${SITE_CONFIG.url}/og-image.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,

    // Open Graph
    openGraph: {
      type,
      locale: 'en_US',
      url: pageUrl,
      siteName: SITE_CONFIG.name,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: title || SITE_CONFIG.name,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },

    // Additional Meta Tags
    alternates: {
      canonical: pageUrl,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification (add your verification codes)
    verification: {
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    description: SITE_CONFIG.description,
    sameAs: [
      // Add your social media URLs
      // 'https://www.facebook.com/yourpage',
      // 'https://twitter.com/yourhandle',
      // 'https://www.linkedin.com/company/yourcompany',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      // Add contact details
    },
  };
}

/**
 * Generate JSON-LD structured data for Website
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD structured data for Article/Blog Post
 */
export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || `${SITE_CONFIG.url}/og-image.png`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author || SITE_CONFIG.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url || SITE_CONFIG.url,
    },
  };
}

/**
 * Generate JSON-LD structured data for FAQ
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD structured data for Service
 */
export function generateServiceSchema(services) {
  return services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
          },
        },
      ],
    },
  }));
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
}

export { SITE_CONFIG };
