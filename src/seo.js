import { blogPostsMetadata } from '../blog-posts-metadata';
import { faqTopics } from './faqTopics';

const origin = 'https://juwa2casino.com';
const supportKeywords = 'juwa2 support, juwa 2.0 support, juwa777 support, juwa 777 support, juwa customer support, juwa 2.0 customer service, juwa777 help, juwa login help, juwa support email';

const homeTitle = 'Juwa 2.0 Download Link & Juwa777 Support | Juwa2Casino';
const homeDescription = 'Get the Juwa 2.0 download link and Juwa777 APK for Android and iOS. Contact Juwa 2.0 support and Juwa777 support for login, setup, and account help.';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Juwa2Casino',
  url: origin + '/',
  logo: origin + '/pictures/icons/logo2.png',
  email: 'support@juwa2casino.com',
  description: homeDescription,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@juwa2casino.com',
    url: origin + '/contact',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://www.facebook.com/people/Juwa-Jackpot-quest/61584448090525/',
    'https://t.me/juwa2go',
  ],
};

const pages = {
  '/': {
    title: homeTitle,
    description: homeDescription,
    keywords: 'juwa 2.0 download link, juwa 2.0 download link android, juwa 2.0 download link apk, juwa 2.0 download link ios, juwa777 download, juwa 777 apk download, dl juwa 777, juwa2, juwa 2.0, juwa777, juwa 777, ' + supportKeywords,
    schemas: [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Juwa2Casino', alternateName: ['Juwa 2.0', 'Juwa777'], url: origin + '/' },
      organization,
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Juwa 2.0',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Android, iOS',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: homeDescription,
      },
    ],
  },
  '/games': {
    title: 'Juwa 2.0 Game Library | Juwa2Casino',
    description: 'Browse Juwa 2.0 and Juwa777 slots, fish games, and keno by cover art or search by name.',
    keywords: 'juwa 2.0 games, juwa777 games, juwa slots, juwa fish games, juwa keno',
    schemas: [],
  },
  '/about': {
    title: 'About Juwa 2.0 & Juwa777 Support | Juwa2Casino',
    description: 'Learn about the Juwa 2.0 lobby, mobile setup, and where to find Juwa 2.0 support and Juwa777 support.',
    keywords: 'juwa 2.0, juwa777, ' + supportKeywords,
    schemas: [],
  },
  '/blog': {
    title: 'Juwa 2.0 Guides & Support Help | Juwa2Casino',
    description: 'Read Juwa 2.0 setup guides, game help, and Juwa777 support articles for Android and iPhone.',
    keywords: 'juwa 2.0 guide, juwa777 help, ' + supportKeywords,
    schemas: [],
  },
  '/contact': {
    title: 'Juwa 2.0 Support & Juwa777 Support | Juwa2Casino',
    description: 'Contact Juwa 2.0 support and Juwa777 support for login help, download help, and account questions. Email Juwa customer support at support@juwa2casino.com.',
    keywords: supportKeywords,
    schemas: [{
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Juwa 2.0 Support and Juwa777 Support',
      url: origin + '/contact',
      description: 'Contact Juwa 2.0 support and Juwa777 support for login help, download help, and account questions.',
      mainEntity: organization,
    }],
  },
  '/contact/faq': {
    title: 'Juwa 2.0 Support FAQ | Juwa777 Help | Juwa2Casino',
    description: 'Juwa 2.0 support and Juwa777 support answers for login help, Android and iPhone setup, and how to reach Juwa customer support.',
    keywords: supportKeywords + ', juwa 2.0 faq, juwa777 faq',
    schemas: [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqTopics.flatMap(topic => topic.items.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      }))),
    }],
  },
};

function articleSchema(post, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Organization', name: 'Juwa2Casino' },
    publisher: organization,
    datePublished: post.published || '2025-10-01',
    mainEntityOfPage: url,
    articleSection: post.category,
    keywords: post.keywords,
    image: post.image,
  };
}

function resolve(path) {
  if (path.startsWith('/blog/') && path.length > 6) {
    const post = blogPostsMetadata[path.slice(6)];
    if (!post) return missing(path);
    const url = origin + path;
    return {
      title: post.title + ' | Juwa2Casino',
      description: post.description,
      keywords: post.keywords + ', ' + supportKeywords,
      robots: 'index, follow',
      type: 'article',
      url,
      schemas: [articleSchema(post, url)],
    };
  }
  const page = pages[path];
  if (!page) return missing(path);
  return { ...page, robots: 'index, follow', type: 'website', url: origin + (path === '/' ? '/' : path) };
}

function missing(path) {
  return {
    title: 'Page unavailable | Juwa2Casino',
    description: 'This page is not available. Visit Juwa2Casino for Juwa 2.0 downloads and Juwa777 support.',
    keywords: supportKeywords,
    robots: 'noindex, follow',
    type: 'website',
    url: origin + path,
    schemas: [],
  };
}

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function applySeo(path) {
  const meta = resolve(path);
  document.title = meta.title;
  setMeta('name', 'description', meta.description);
  setMeta('name', 'title', meta.title);
  setMeta('name', 'keywords', meta.keywords);
  setMeta('name', 'robots', meta.robots);
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:url', meta.url);
  setMeta('property', 'og:type', meta.type);
  setMeta('property', 'twitter:title', meta.title);
  setMeta('property', 'twitter:description', meta.description);
  setMeta('property', 'twitter:url', meta.url);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = meta.url;
  document.querySelectorAll('script[data-managed-schema]').forEach(node => node.remove());
  for (const schema of meta.schemas) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.managedSchema = 'true';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
