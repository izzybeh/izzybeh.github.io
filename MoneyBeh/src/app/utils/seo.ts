// SEO utilities for managing page metadata

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function updateSEO({
  title,
  description,
  keywords,
  image = 'https://moneybeh.com/og-image.png',
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
}: SEOProps) {
  // Update page title
  document.title = `${title} | MoneyBeh`;

  // Helper to set meta tag
  const setMetaTag = (name: string, content: string, property?: boolean) => {
    const attr = property ? 'property' : 'name';
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    
    tag.setAttribute('content', content);
  };

  // Basic meta tags
  setMetaTag('description', description);
  if (keywords) {
    setMetaTag('keywords', keywords);
  }

  // Open Graph tags
  setMetaTag('og:title', `${title} | MoneyBeh`, true);
  setMetaTag('og:description', description, true);
  setMetaTag('og:type', type, true);
  setMetaTag('og:image', image, true);
  if (url) {
    setMetaTag('og:url', url, true);
  }

  // Twitter Card tags
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:title', `${title} | MoneyBeh`);
  setMetaTag('twitter:description', description);
  setMetaTag('twitter:image', image);

  // Article specific tags
  if (type === 'article') {
    if (author) {
      setMetaTag('article:author', author, true);
    }
    if (publishedTime) {
      setMetaTag('article:published_time', publishedTime, true);
    }
    if (modifiedTime) {
      setMetaTag('article:modified_time', modifiedTime, true);
    }
  }

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url || window.location.href);
}

// Structured data helpers
export function addStructuredData(data: object) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

// Organization schema for MoneyBeh
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MoneyBeh',
  url: 'https://moneybeh.com',
  logo: 'https://moneybeh.com/logo.png',
  description: 'Financial wellness without the stress. Clear decisions. Less stress. More freedom.',
  sameAs: [
    // Add social media profiles here when available
  ],
};

// WebSite schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MoneyBeh',
  url: 'https://moneybeh.com',
  description: 'Financial wellness without the stress. Clear decisions. Less stress. More freedom.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://moneybeh.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

// Mobile App schema
export const mobileAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'MoneyBeh',
  operatingSystem: 'iOS, Android',
  applicationCategory: 'FinanceApplication',
  description: 'Financial wellness app featuring Joy Fund, Safety Net, and Freedom Plan to help you achieve financial freedom without stress.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};
