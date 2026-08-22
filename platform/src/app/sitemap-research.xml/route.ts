import { sitemapResponse } from '@/lib/sitemapXml';
export const dynamic='force-static';
export function GET(){return sitemapResponse(['/research','/research/methodology','/research/state-of-supplier-compliance','/regulatory-calendar','/epr-state-tracker']);}
