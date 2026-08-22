import { regulations } from '@/lib/seoExpansionContent';
import { phase2Regulations } from '@/lib/seoExpansionPhase2';
import { phase3Regulations } from '@/lib/seoExpansionPhase3';
import { phase3MoreRegulations } from '@/lib/seoExpansionPhase3RegMore';
import { sitemapResponse } from '@/lib/sitemapXml';

export const dynamic='force-static';
export function GET(){
  const paths=['/regulations','/regulatory-calendar',...Object.keys({...regulations,...phase2Regulations,...phase3Regulations,...phase3MoreRegulations}).map(slug=>`/regulations/${slug}`)];
  return sitemapResponse(paths);
}
