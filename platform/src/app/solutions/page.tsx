import type { Metadata } from 'next';
import '../seo.css';

export const metadata: Metadata = {
  title: 'Supplier Compliance Software Solutions',
  description: 'Explore Emissa supplier compliance software for due diligence, buyer requests, evidence management, certificates, Scope 3, CBAM, EPR, product carbon footprints and climate risk.',
  keywords: ['supplier compliance software','supplier compliance solutions','supplier compliance management software','supplier compliance platform','supply chain compliance software'],
  alternates: { canonical: '/solutions' },
  openGraph: { title: 'Supplier Compliance Software Solutions | Emissa', description: 'Explore supplier compliance workflows for evidence, buyer requests, due diligence, carbon, packaging, trade and product compliance.', url: '/solutions', type: 'website' }
};

const groups = [
  ['Core supplier compliance', [
    ['/solutions/supplier-compliance-infrastructure','Supplier Compliance Infrastructure','One operating layer for supplier requirements, evidence, approvals and reusable compliance data.'],
    ['/solutions/supplier-due-diligence','Supplier Due Diligence Software','Structure supplier reviews, evidence, risk decisions, remediation and approvals.'],
    ['/solutions/buyer-compliance-requests','Buyer Compliance Request Management','Respond to recurring customer questionnaires and evidence requests from an approved data library.'],
    ['/solutions/supplier-evidence-management','Supplier Evidence Management','Control source documents, certificates, calculations, approvals and expiration dates.'],
    ['/solutions/supplier-certificate-management','Supplier Certificate Management','Track certificate currency, renewal ownership, approvals and reuse across requirements.'],
    ['/solutions/supplier-onboarding-compliance','Supplier Onboarding Compliance','Collect and validate required supplier documents before activation and carry them forward.'],
    ['/solutions/supplier-questionnaire-management','Supplier Questionnaire Management','Turn questionnaires into structured data, gap requests, reviews and approved responses.'],
  ]],
  ['Regulatory and sustainability workflows', [
    ['/solutions/scope-3-supplier-data','Scope 3 Supplier Data','Use supplier and purchasing data as a reusable value-chain data foundation.'],
    ['/solutions/cbam-compliance','CBAM Compliance Software','Connect shipment, installation, product and emissions evidence for importer requests.'],
    ['/solutions/epr-compliance','EPR Compliance Software','Manage packaging data, obligations, evidence, deadlines and reporting readiness.'],
    ['/solutions/product-carbon-footprints','Product Carbon Footprint Software','Build product-level carbon evidence from connected supplier and operational data.'],
    ['/solutions/climate-risk','Supplier Climate Risk Software','Screen supplier, facility and route exposure with action and evidence workflows.'],
    ['/solutions/compliance-data-rooms','Compliance Data Rooms','Package approved supplier and regulatory evidence for external review.'],
  ]]
] as const;

export default function SolutionsHub(){
  const breadcrumb = { '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    { '@type':'ListItem',position:1,name:'Home',item:'https://emissa.tech/' },
    { '@type':'ListItem',position:2,name:'Supplier Compliance Solutions',item:'https://emissa.tech/solutions' }
  ]};
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/industries">Industries</a><a href="/resources">Resources</a><a href="/blog">Blog</a><a href="/pricing">Pricing</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">Supplier Compliance Software</span><h1>Supplier compliance software solutions for enterprise-ready operations.</h1><p>Explore the workflows Emissa connects across supplier due diligence, buyer requirements, certificates, Scope 3, EPR, CBAM, product carbon footprints, climate risk and reusable evidence management.</p></section>
    {groups.map(([group,items])=><section className="seoSection" key={group}><h2>{group}</h2><div className="seoGrid three">{items.map(([href,title,description])=><article className="seoCard" key={href}><h3><a href={href}>{title}</a></h3><p>{description}</p><a className="seoSecondary" href={href}>Explore solution</a></article>)}</div></section>)}
    <section className="seoCta"><h2>Build one supplier compliance system instead of another point-tool stack.</h2><p>Start with the workflow creating urgency today and reuse the same supplier data and evidence across the rest of the platform.</p><a className="seoPrimary" href="/demo">Book a Demo</a></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}} />
  </main>;
}
