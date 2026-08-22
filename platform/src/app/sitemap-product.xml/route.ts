import { platformPages, commercialPages } from '@/lib/seoExpansionPhase3';
import { productCompliancePages } from '@/lib/productComplianceContent';
import { sitemapResponse } from '@/lib/sitemapXml';
export const dynamic='force-static';
export function GET(){return sitemapResponse(['/platform','/software','/product-compliance',...Object.keys(platformPages).map(slug=>`/platform/${slug}`),...Object.keys(commercialPages).map(slug=>`/software/${slug}`),...Object.keys(productCompliancePages).map(slug=>`/product-compliance/${slug}`)]);}
