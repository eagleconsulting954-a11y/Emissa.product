import { sitemapResponse } from '@/lib/sitemapXml';
export const dynamic='force-static';
export function GET(){return sitemapResponse(['/research','/research/methodology','/research/state-of-supplier-compliance','/research/supplier-compliance-maturity-model','/regulatory-calendar','/epr-state-tracker']);}
