import type { MetadataRoute } from 'next';
import { newBlogPosts } from '@/lib/newBlogContent';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://emissa.tech';

const pages = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/solutions', priority: 0.95, changeFrequency: 'weekly' as const },
  { path: '/industries', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/resources', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
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

  { path: '/blog/what-is-supplier-compliance-infrastructure', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/blog/supplier-compliance-software-vs-esg-software', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog/supplier-compliance-checklist', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/blog/how-to-manage-buyer-compliance-requests', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog/supplier-due-diligence-workflow', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog/supplier-certificate-management-guide', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog/scope-3-as-supplier-data-foundation', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog/cbam-supplier-data-checklist', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog/epr-packaging-compliance-workflow', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog/product-carbon-footprint-vs-scope-3', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/blog/supplier-onboarding-compliance-process', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog/supplier-questionnaire-management', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog/supplier-compliance-kpis', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/blog/how-to-build-supplier-compliance-system-of-record', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/blog/supplier-compliance-platform-buyers-guide', priority: 0.8, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const newBlogPages = Object.keys(newBlogPosts).map((slug) => ({
    path: `/blog/topics/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  return [...pages, ...newBlogPages].map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
