import { regulations } from '@/lib/seoExpansionContent';
import { phase2Regulations } from '@/lib/seoExpansionPhase2';
import { sitemapResponse } from '@/lib/sitemapXml';

export const dynamic='force-static';

export function GET(){
  const paths=['/regulations',...Object.keys({...regulations,...phase2Regulations}).map(slug=>`/regulations/${slug}`)];
  return sitemapResponse(paths);
}
