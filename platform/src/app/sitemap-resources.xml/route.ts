import { sitemapResponse } from '@/lib/sitemapXml';

export const dynamic='force-static';
const paths=['/resources','/resources/supplier-compliance-guide','/resources/scope-3-supplier-data-guide','/resources/cbam-supplier-guide','/resources/epr-compliance-guide'];
export function GET(){return sitemapResponse(paths);}
