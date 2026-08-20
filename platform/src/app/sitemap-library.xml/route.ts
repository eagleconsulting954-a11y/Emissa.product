import { comparisons, docs, personas, templates, tools } from '@/lib/seoExpansionContent';
import { newBlogPosts } from '@/lib/newBlogContent';
import { sitemapResponse } from '@/lib/sitemapXml';

export const dynamic='force-static';

const blogSlugs=[
  'what-is-supplier-compliance-infrastructure',
  'supplier-compliance-software-vs-esg-software',
  'supplier-compliance-checklist',
  'how-to-manage-buyer-compliance-requests',
  'supplier-due-diligence-workflow',
  'supplier-certificate-management-guide',
  'scope-3-as-supplier-data-foundation',
  'cbam-supplier-data-checklist',
  'epr-packaging-compliance-workflow',
  'product-carbon-footprint-vs-scope-3',
  'supplier-onboarding-compliance-process',
  'supplier-questionnaire-management',
  'supplier-compliance-kpis',
  'how-to-build-supplier-compliance-system-of-record',
  'supplier-compliance-platform-buyers-guide',
];

export function GET(){
  const paths=[
    '/resources','/blog','/for','/compare','/tools','/templates','/docs','/research','/research/methodology',
    '/resources/supplier-compliance-guide','/resources/scope-3-supplier-data-guide','/resources/cbam-supplier-guide','/resources/epr-compliance-guide',
    ...Object.keys(personas).map(slug=>`/for/${slug}`),
    ...Object.keys(comparisons).map(slug=>`/compare/${slug}`),
    ...Object.keys(tools).map(slug=>`/tools/${slug}`),
    ...Object.keys(templates).map(slug=>`/templates/${slug}`),
    ...Object.keys(docs).map(slug=>`/docs/${slug}`),
    ...blogSlugs.map(slug=>`/blog/${slug}`),
    ...Object.keys(newBlogPosts).map(slug=>`/blog/topics/${slug}`),
  ];
  return sitemapResponse(paths);
}
