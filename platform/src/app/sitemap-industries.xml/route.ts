import { sitemapResponse } from '@/lib/sitemapXml';

export const dynamic='force-static';
const paths=['/industries','/industries/manufacturing-supplier-compliance','/industries/automotive-supplier-compliance','/industries/industrial-supplier-compliance','/industries/packaging-epr-compliance','/industries/metals-cbam-compliance'];
export function GET(){return sitemapResponse(paths);}
