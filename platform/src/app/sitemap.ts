import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://emissa.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    '',
    '/demo',
    '/pricing',
    '/solutions/supplier-compliance-infrastructure',
    '/solutions/supplier-due-diligence',
    '/solutions/buyer-compliance-requests',
    '/solutions/supplier-evidence-management',
    '/solutions/compliance-data-rooms',
    '/solutions/scope-3-supplier-data',
    '/solutions/epr-compliance',
    '/solutions/cbam-compliance',
    '/solutions/product-carbon-footprints',
    '/solutions/climate-risk',
  ];

  return paths.map((path, index) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : path === '/solutions/supplier-compliance-infrastructure' ? 0.95 : path.startsWith('/solutions/') ? 0.85 : 0.7,
  }));
}
