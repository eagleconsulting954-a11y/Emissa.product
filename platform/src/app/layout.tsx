import type { Metadata } from 'next';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import './globals.css';
import './executive-theme.css';
import './executive-pages.css';
import './public-template-v3.css';
import './hero-network.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://emissa.tech';
const gaMeasurementId = 'G-538670958';
const googleSiteVerification=process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {default:'Emissa | Supplier Compliance Infrastructure Software',template:'%s | Emissa'},
  description:'Supplier compliance infrastructure software for manufacturers, exporters and enterprise suppliers. Centralize supplier evidence, certificates, due diligence, buyer requests, product compliance, EPR, CBAM, EUDR, DPP, climate risk and Scope 3 data in one operating system.',
  keywords:[
    'supplier compliance infrastructure','supplier compliance infrastructure software','supplier compliance software','supplier compliance management software','supplier compliance platform','supplier compliance operating system','supply chain compliance software','supplier due diligence software','supplier evidence management','supplier document management','supplier certificate management software','supplier audit management software','supplier CAPA software','supplier questionnaire software','supplier onboarding software','buyer compliance request software','supplier risk compliance software','product compliance software','REACH compliance software','RoHS compliance software','PFAS supplier data','Digital Product Passport software','battery passport software','EUDR compliance software','CBAM supplier software','packaging EPR compliance software','Scope 3 supplier data','product carbon footprint software','LCA software'
  ],
  authors:[{name:'Emissa'}],creator:'Emissa',publisher:'Emissa',category:'Supplier Compliance Software',
  openGraph:{type:'website',url:siteUrl,siteName:'Emissa',title:'Emissa | Supplier Compliance Infrastructure Software',description:'Turn supplier, product, packaging, trade and carbon data into the compliance proof buyers, auditors and regulators require.'},
  twitter:{card:'summary_large_image',title:'Emissa | Supplier Compliance Infrastructure Software',description:'One operating system for supplier evidence, due diligence, buyer requests, product compliance, EPR, CBAM, EUDR, product footprints and Scope 3 data.'},
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},
  ...(googleSiteVerification?{verification:{google:googleSiteVerification}}:{}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const softwareSchema={'@context':'https://schema.org','@type':'SoftwareApplication',name:'Emissa',applicationCategory:'BusinessApplication',applicationSubCategory:'Supplier Compliance Infrastructure',operatingSystem:'Web',url:siteUrl,description:'Supplier compliance infrastructure software for supplier evidence, due diligence, buyer requirements, product compliance, EPR, CBAM, EUDR, product footprints, climate risk and Scope 3 supplier data.',offers:{'@type':'Offer',price:'3500',priceCurrency:'USD',category:'subscription'}};
  const organizationSchema={'@context':'https://schema.org','@type':'Organization',name:'Emissa',url:siteUrl,description:'Supplier compliance infrastructure for manufacturers, exporters and enterprise suppliers.'};
  const websiteSchema={'@context':'https://schema.org','@type':'WebSite',name:'Emissa',alternateName:'Emissa Supplier Compliance Infrastructure',url:siteUrl,description:'Supplier compliance infrastructure, regulatory intelligence, product compliance, templates, tools, research and implementation guidance.'};
  return <html lang="en"><head><script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} /><script dangerouslySetInnerHTML={{__html:`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaMeasurementId}');`}} /></head><body><GoogleAnalytics measurementId={gaMeasurementId}/><AnalyticsEvents/>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(softwareSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}}/></body></html>;
}
