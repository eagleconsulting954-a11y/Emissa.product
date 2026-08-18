import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://emissa.tech';

const pages = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/demo', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },

  { path: '/solutions/supplier-compliance-infrastructure', priority: 0.95, changeFrequency: 'weekly' as const },
  { path: '/solutions/supplier-due-diligence', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/solutions/buyer-compliance-requests', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/solutions/supplier-evidence-management', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/solutions/compliance-data-rooms', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/supplier-certificate-management', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/supplier-onboarding-compliance', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/supplier-questionnaire-management', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/ecovadis-readiness', priority: 0.8, changeFrequency: 'monthly' as const },

  { path: '/solutions/scope-3-supplier-data', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/epr-compliance', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/cbam-compliance', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/product-carbon-footprints', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/solutions/climate-risk', priority: 0.8, changeFrequency: 'monthly' as const },

  { path: '/industries/manufacturing-supplier-compliance', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/industries/automotive-supplier-compliance', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/industries/industrial-supplier-compliance', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/industries/packaging-epr-compliance', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/industries/metals-cbam-compliance', priority: 0.8, changeFrequency: 'monthly' as const },

  { path: '/resources/supplier-compliance-guide', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/resources/scope-3-supplier-data-guide', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/resources/cbam-supplier-guide', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/resources/epr-compliance-guide', priority: 0.75, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map(({ path, priority, changeFrequency }) => ({ url: `${baseUrl}${path}`, lastModified: now, changeFrequency, priority }));
}
