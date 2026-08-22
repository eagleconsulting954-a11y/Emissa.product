import { templates } from '@/lib/seoExpansionContent';
import { phase3Templates } from '@/lib/seoExpansionPhase3';
import { sitemapResponse } from '@/lib/sitemapXml';
export const dynamic='force-static';
export function GET(){return sitemapResponse(['/templates',...Object.keys({...templates,...phase3Templates}).map(slug=>`/templates/${slug}`)]);}
