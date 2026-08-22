import { comparisons } from '@/lib/seoExpansionContent';
import { phase3Comparisons } from '@/lib/seoExpansionPhase3Comparisons';
import { sitemapResponse } from '@/lib/sitemapXml';
export const dynamic='force-static';
export function GET(){return sitemapResponse(['/compare',...Object.keys({...comparisons,...phase3Comparisons}).map(slug=>`/compare/${slug}`)]);}
