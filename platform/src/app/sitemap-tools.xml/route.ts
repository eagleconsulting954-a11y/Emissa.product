import { tools } from '@/lib/seoExpansionContent';
import { phase3Tools } from '@/lib/seoExpansionPhase3';
import { sitemapResponse } from '@/lib/sitemapXml';
export const dynamic='force-static';
export function GET(){return sitemapResponse(['/tools',...Object.keys({...tools,...phase3Tools}).map(slug=>`/tools/${slug}`)]);}
