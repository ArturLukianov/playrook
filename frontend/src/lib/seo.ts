export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

export function updateSEO(data: SEOData) {
  // Update title
  document.title = data.title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', data.description);

  // Update or create keywords
  if (data.keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', data.keywords);
  }

  // Update or create Open Graph title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', data.ogTitle || data.title);

  // Update or create Open Graph description
  let ogDescription = document.querySelector('meta[property="og:description"]');
  if (!ogDescription) {
    ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    document.head.appendChild(ogDescription);
  }
  ogDescription.setAttribute('content', data.ogDescription || data.description);

  // Update or create Open Graph image
  if (data.ogImage) {
    let ogImage = document.querySelector('meta[name="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', data.ogImage);
  }

  // Update or create canonical URL
  if (data.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', data.canonical);
  }
}

// Default SEO data for the application
export const defaultSEO: SEOData = {
  title: 'PlayRook - SOC Playbook Management Platform',
  description:
    'PlayRook is a specialized platform for developing and executing playbooks, created specifically for Security Operations Center (SOC) teams. Transform complex processes into sequential, reproducible workflows.',
  keywords:
    'SOC, Security Operations Center, playbook, cybersecurity, incident response, security automation',
  ogTitle: 'PlayRook - SOC Playbook Management Platform',
  ogDescription:
    'Specialized platform for SOC teams to create and execute security playbooks with powerful Markdown syntax.',
  canonical: window.location.origin,
};
