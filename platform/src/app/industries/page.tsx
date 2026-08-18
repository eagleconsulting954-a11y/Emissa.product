import type { Metadata } from 'next';
import '../seo.css';

export const metadata: Metadata = {
  title: 'Supplier Compliance Software by Industry',
  description: 'Supplier compliance software for manufacturers, automotive suppliers, industrial companies, packaging-intensive businesses and metals exporters managing buyer and regulatory requirements.',
  keywords: ['supplier compliance software for manufacturers','manufacturing supplier compliance','automotive supplier compliance','industrial supplier compliance','packaging compliance software','CBAM supplier software'],
  alternates: { canonical: '/industries' }
};

const industries = [
  ['/industries/manufacturing-supplier-compliance','Manufacturing Supplier Compliance Software','Centralize buyer requests, certificates, Scope 3, product evidence and regulatory workflows for manufacturers.'],
  ['/industries/automotive-supplier-compliance','Automotive Supplier Compliance Software','Manage recurring OEM and tier-one requirements, supplier evidence, due diligence and product data.'],
  ['/industries/industrial-supplier-compliance','Industrial Supplier Compliance Software','Connect supplier documentation, operational evidence and enterprise customer requirements across facilities.'],
  ['/industries/packaging-epr-compliance','Packaging & EPR Compliance Software','Organize packaging material data, producer obligations, evidence, deadlines and reporting readiness.'],
  ['/industries/metals-cbam-compliance','Metals & CBAM Compliance Software','Prepare shipment, installation, product and embedded-carbon evidence for importer requests and trade workflows.'],
] as const;

export default function IndustriesHub(){
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/solutions">Solutions</a><a href="/resources">Resources</a><a href="/blog">Blog</a><a href="/demo">Demo</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">Supplier Compliance by Industry</span><h1>Supplier compliance software for manufacturers and regulated supply chains.</h1><p>Emissa helps supplier teams organize buyer requirements, evidence, carbon, product, packaging and trade workflows around the same supplier compliance infrastructure.</p></section>
    <section className="seoGrid three">{industries.map(([href,title,description])=><article className="seoCard" key={href}><h2><a href={href}>{title}</a></h2><p>{description}</p><a className="seoSecondary" href={href}>View industry workflow</a></article>)}</section>
    <section className="seoSection"><h2>Why industry-specific supplier compliance matters</h2><p>Manufacturers and exporters often face the same underlying challenge in different forms: customer requirements, regulatory obligations and sustainability requests depend on overlapping supplier, facility, shipment, product and evidence records. A shared compliance data layer reduces duplicate collection while preserving workflow-specific review and approval controls.</p></section>
    <section className="seoCta"><h2>See how Emissa fits your supplier compliance workflow.</h2><a className="seoPrimary" href="/demo">Book a Demo</a></section>
  </main>;
}
