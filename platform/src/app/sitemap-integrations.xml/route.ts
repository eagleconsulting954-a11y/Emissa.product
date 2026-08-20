import { integrations } from '@/lib/seoExpansionContent';
import { phase2Integrations } from '@/lib/seoExpansionPhase2';
import { sitemapResponse } from '@/lib/sitemapXml';

export const dynamic='force-static';

export function GET(){
  const paths=['/integrations',...Object.keys({...integrations,...phase2Integrations}).map(slug=>`/integrations/${slug}`)];
  return sitemapResponse(paths);
}
