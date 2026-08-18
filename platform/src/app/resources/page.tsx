import type { Metadata } from 'next';
import '../seo.css';

export const metadata: Metadata = {
  title: 'Supplier Compliance Resources & Guides',
  description: 'Supplier compliance guides covering compliance infrastructure, Scope 3 supplier data, CBAM, EPR, buyer requests, due diligence, certificates and supplier evidence management.',
  keywords: ['supplier compliance guide','supplier compliance resources','supplier compliance checklist','supplier compliance management','supplier compliance software guide'],
  alternates: { canonical: '/resources' }
};

const guides = [
  ['/resources/supplier-compliance-guide','Supplier Compliance Guide','A practical framework for supplier requirements, evidence, ownership, approvals and reusable compliance workflows.'],
  ['/resources/scope-3-supplier-data-guide','Scope 3 Supplier Data Guide','How to structure supplier and purchasing data so it can support carbon and broader compliance workflows.'],
  ['/resources/cbam-supplier-guide','CBAM Supplier Guide','What suppliers and exporters should organize for product, installation, shipment and embedded-carbon requests.'],
  ['/resources/epr-compliance-guide','EPR Compliance Guide','How to structure packaging data, producer obligations, evidence, deadlines and reporting readiness.'],
] as const;

export default function ResourcesHub(){
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/solutions">Solutions</a><a href="/industries">Industries</a><a href="/blog">Blog</a><a href="/demo">Demo</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">Supplier Compliance Resources</span><h1>Supplier compliance guides for buyer, regulatory and sustainability workflows.</h1><p>Use these guides to structure supplier data, evidence, approvals and recurring compliance work before choosing or implementing a supplier compliance platform.</p></section>
    <section className="seoGrid three">{guides.map(([href,title,description])=><article className="seoCard" key={href}><h2><a href={href}>{title}</a></h2><p>{description}</p><a className="seoSecondary" href={href}>Read guide</a></article>)}</section>
    <section className="seoSection"><h2>Start with supplier compliance infrastructure, not disconnected reports.</h2><p>The most reusable architecture separates stable supplier, facility, product and evidence records from the specific requirements that consume them. That makes the same approved data useful across due diligence, buyer requests, certificates, Scope 3, CBAM, EPR and product workflows.</p></section>
    <section className="seoCta"><h2>Explore the full supplier compliance software platform.</h2><a className="seoPrimary" href="/solutions/supplier-compliance-infrastructure">Supplier Compliance Infrastructure</a></section>
  </main>;
}
