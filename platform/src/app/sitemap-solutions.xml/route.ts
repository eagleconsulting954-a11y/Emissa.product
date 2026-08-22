import { sitemapResponse } from '@/lib/sitemapXml';

export const dynamic='force-static';

const paths=[
  '/solutions',
  '/solutions/supplier-compliance-infrastructure',
  '/solutions/supplier-due-diligence',
  '/solutions/buyer-compliance-requests',
  '/solutions/supplier-evidence-management',
  '/solutions/compliance-data-rooms',
  '/solutions/supplier-certificate-management',
  '/solutions/supplier-onboarding-compliance',
  '/solutions/supplier-questionnaire-management',
  '/solutions/ecovadis-readiness',
  '/solutions/scope-3-supplier-data',
  '/solutions/epr-compliance',
  '/solutions/cbam-compliance',
  '/solutions/product-carbon-footprints',
  '/solutions/climate-risk',
];

export function GET(){return sitemapResponse(paths);}
