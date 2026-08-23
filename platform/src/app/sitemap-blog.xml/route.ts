import { allBlogTopicPosts, blogCategories } from '@/lib/blogCatalog';
import { sitemapResponse } from '@/lib/sitemapXml';

export const dynamic='force-static';
const core=['what-is-supplier-compliance-infrastructure','supplier-compliance-software-vs-esg-software','supplier-compliance-checklist','how-to-manage-buyer-compliance-requests','supplier-due-diligence-workflow','supplier-certificate-management-guide','scope-3-as-supplier-data-foundation','cbam-supplier-data-checklist','epr-packaging-compliance-workflow','product-carbon-footprint-vs-scope-3','supplier-onboarding-compliance-process','supplier-questionnaire-management','supplier-compliance-kpis','how-to-build-supplier-compliance-system-of-record','supplier-compliance-platform-buyers-guide'];
export function GET(){return sitemapResponse(['/blog',...Object.keys(blogCategories).map(slug=>`/blog/category/${slug}`),...core.map(slug=>`/blog/${slug}`),...Object.keys(allBlogTopicPosts).map(slug=>`/blog/topics/${slug}`)]);}
