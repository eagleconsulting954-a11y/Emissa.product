import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://emissa.tech';

const pages = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/demo', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },

  // Core category pages
  { path: '/solutions/supplier-compliance-infrastructure', priority: 0.95, changeFrequency: 'weekly' as const },
  { path: '/solutions/supplier-due-diligence', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/solutions/buyer-compliance-requests', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/solutions/supplier-evidence-management', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/solutions/compliance-data-rooms', priority: 0.85, changeFrequency: 'monthly' as const },

  // Compliance modules
  { path: '/solutions/scope-3-supplier-data', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/epr-compliance', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/cbam-compliance', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/product-carbon-footprints', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/climate-risk', priority: 0.8, changeFrequency: 'monthly' as const },

  // Next SEO expansion targets. These should be published as substantive landing pages before indexing.
  // '/industries/manufacturing-supplier-compliance'
  // '/industries/automotive-supplier-compliance'
  // '/industries/industrial-supplier-compliance'
  // '/industries/packaging-epr-compliance'
  // '/industries/metals-cbam-compliance'
  // '/solutions/supplier-certificate-management'
  // '/solutions/supplier-onboarding-compliance'
  // '/solutions/supplier-questionnaire-management'
  // '/solutions/ecovadis-readiness'
  // '/resources/supplier-compliance-guide'
  // '/resources/scope-3-supplier-data-guide'
  // '/resources/cbam-supplier-guide'
  // '/resources/epr-compliance-guide'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
