import type { MetadataRoute } from 'next';
import { allBlogTopicPosts, blogCategories } from '@/lib/blogCatalog';
import { comparisons, docs, integrations, personas, regulations, templates, tools } from '@/lib/seoExpansionContent';
import { phase2Integrations, phase2Regulations } from '@/lib/seoExpansionPhase2';
import { commercialPages, phase3Regulations, phase3Templates, phase3Tools, platformPages } from '@/lib/seoExpansionPhase3';
import { phase3MoreRegulations } from '@/lib/seoExpansionPhase3RegMore';
import { phase3Comparisons } from '@/lib/seoExpansionPhase3Comparisons';
import { productCompliancePages } from '@/lib/productComplianceContent';

const baseUrl=process.env.NEXT_PUBLIC_SITE_URL||process.env.APP_URL||'https://emissa.tech';
const allIntegrations={...integrations,...phase2Integrations};
const allRegulations={...regulations,...phase2Regulations,...phase3Regulations,...phase3MoreRegulations};
const allComparisons={...comparisons,...phase3Comparisons};
const allTemplates={...templates,...phase3Templates};
const item=(path:string,priority=.8,changeFrequency:'daily'|'weekly'|'monthly'|'yearly'='monthly')=>({path,priority,changeFrequency});

const core=[
  item('',1,'weekly'),item('/platform',.97,'weekly'),item('/software',.97,'weekly'),item('/product-compliance',.94,'weekly'),item('/solutions',.95,'weekly'),item('/industries',.9,'weekly'),item('/resources',.9,'weekly'),item('/blog',.94,'weekly'),item('/integrations',.9,'weekly'),item('/regulations',.95,'weekly'),item('/regulatory-calendar',.9,'weekly'),item('/for',.85),item('/compare',.9),item('/tools',.92),item('/templates',.9),item('/docs',.85,'weekly'),item('/research',.87),item('/research/methodology',.82),item('/research/state-of-supplier-compliance',.85),item('/security',.8),item('/about/editorial-policy',.78),item('/demo',.8),item('/pricing',.8),
];

const solutions=['supplier-compliance-infrastructure','supplier-due-diligence','buyer-compliance-requests','supplier-evidence-management','compliance-data-rooms','supplier-certificate-management','supplier-onboarding-compliance','supplier-questionnaire-management','ecovadis-readiness','scope-3-supplier-data','epr-compliance','cbam-compliance','product-carbon-footprints','climate-risk'].map(slug=>item(`/solutions/${slug}`,slug==='supplier-compliance-infrastructure'?.95:.85));
const industries=['manufacturing-supplier-compliance','automotive-supplier-compliance','industrial-supplier-compliance','packaging-epr-compliance','metals-cbam-compliance'].map(slug=>item(`/industries/${slug}`,.82));
const resources=['supplier-compliance-guide','scope-3-supplier-data-guide','cbam-supplier-guide','epr-compliance-guide'].map(slug=>item(`/resources/${slug}`,.8));
const coreBlog=['what-is-supplier-compliance-infrastructure','supplier-compliance-software-vs-esg-software','supplier-compliance-checklist','how-to-manage-buyer-compliance-requests','supplier-due-diligence-workflow','supplier-certificate-management-guide','scope-3-as-supplier-data-foundation','cbam-supplier-data-checklist','epr-packaging-compliance-workflow','product-carbon-footprint-vs-scope-3','supplier-onboarding-compliance-process','supplier-questionnaire-management','supplier-compliance-kpis','how-to-build-supplier-compliance-system-of-record','supplier-compliance-platform-buyers-guide'].map(slug=>item(`/blog/${slug}`,.82));

const collections=[
  ...Object.keys(platformPages).map(slug=>item(`/platform/${slug}`,.9)),...Object.keys(commercialPages).map(slug=>item(`/software/${slug}`,.92)),...Object.keys(productCompliancePages).map(slug=>item(`/product-compliance/${slug}`,.88)),...Object.keys(allIntegrations).map(slug=>item(`/integrations/${slug}`,.8)),...Object.keys(allRegulations).map(slug=>item(`/regulations/${slug}`,.88)),...Object.keys(personas).map(slug=>item(`/for/${slug}`,.8)),...Object.keys(allComparisons).map(slug=>item(`/compare/${slug}`,.84)),...Object.keys(tools).map(slug=>item(`/tools/${slug}`,.85)),...Object.keys(phase3Tools).map(slug=>item(`/tools/${slug}`,.9)),...Object.keys(allTemplates).map(slug=>item(`/templates/${slug}`,.82)),...Object.keys(docs).map(slug=>item(`/docs/${slug}`,.75)),
  ...Object.keys(blogCategories).map(slug=>item(`/blog/category/${slug}`,.86,'weekly')),...Object.keys(allBlogTopicPosts).map(slug=>item(`/blog/topics/${slug}`,.84,'weekly')),
];

export default function sitemap():MetadataRoute.Sitemap{return [...core,...solutions,...industries,...resources,...coreBlog,...collections].map(({path,priority,changeFrequency})=>({url:`${baseUrl}${path}`,priority,changeFrequency}));}
