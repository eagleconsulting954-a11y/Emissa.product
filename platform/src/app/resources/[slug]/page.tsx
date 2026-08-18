import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../../seo.css';

const resources = {
  'supplier-compliance-guide': {
    title: 'Supplier Compliance Guide',
    description: 'A practical guide to supplier compliance infrastructure, evidence management, buyer requests, due diligence, Scope 3 and regulatory workflows.',
    h1: 'Supplier Compliance Infrastructure: A Practical Guide',
    intro: 'Supplier compliance becomes difficult when the same supplier, facility and product data must be recreated for buyers, auditors and regulators. This guide explains the operating model Emissa is designed around.',
    terms: ['supplier compliance guide','supplier compliance infrastructure guide','supplier compliance management'],
    sections: [
      ['What supplier compliance infrastructure means','A supplier compliance infrastructure layer connects evidence, ownership, deadlines, approvals and reusable supplier data instead of treating each request as an isolated project.'],
      ['The core data layer','Supplier, facility, product, purchasing, shipment, packaging and certificate records become reusable inputs for multiple workflows.'],
      ['The workflow layer','Teams assign owners, identify missing evidence, manage reviews, preserve approval history and deliver controlled outputs.'],
      ['Where Scope 3 fits','Scope 3 is one supporting data use case. The same supplier and operational records can also support buyer requests, product footprints, EPR, CBAM and due diligence.'],
    ],
  },
  'scope-3-supplier-data-guide': {
    title: 'Scope 3 Supplier Data Guide',
    description: 'Learn how supplier Scope 3 data can become a reusable foundation for broader supplier compliance workflows.',
    h1: 'Scope 3 Supplier Data as a Compliance Foundation',
    intro: 'Scope 3 collection can create a valuable supplier data graph. The larger opportunity is reusing that validated data across product, buyer and regulatory requirements.',
    terms: ['Scope 3 supplier data guide','supplier emissions data','Scope 3 data management'],
    sections: [
      ['Collect once','Bring together supplier, spend, logistics, product and facility records in a consistent structure.'],
      ['Validate evidence','Preserve source documents, methodologies, owners and approvals behind carbon data.'],
      ['Reuse across workflows','Use supplier records in buyer requests, product footprints, CBAM, due diligence and compliance evidence packages.'],
      ['Avoid a carbon-only silo','Treat carbon accounting as part of the supplier compliance operating layer rather than a disconnected reporting system.'],
    ],
  },
  'cbam-supplier-guide': {
    title: 'CBAM Supplier Guide',
    description: 'A supplier-focused guide to organizing product, facility, shipment and emissions evidence for CBAM workflows.',
    h1: 'CBAM Data and Evidence for Suppliers',
    intro: 'CBAM requests can require suppliers to connect production, product, shipment and emissions records. Emissa is designed to organize that evidence in a repeatable workflow.',
    terms: ['CBAM supplier guide','CBAM compliance for suppliers','embedded carbon evidence'],
    sections: [
      ['Connect product and facility data','Tie products to production facilities and the evidence used for emissions calculations.'],
      ['Preserve methodology','Keep calculation assumptions, source records and approvals connected to each output.'],
      ['Prepare importer-ready packages','Organize approved evidence so teams can respond consistently to external requests.'],
      ['Reuse the same records','Use validated facility and supplier data across Scope 3, product footprints and other compliance workflows.'],
    ],
  },
  'epr-compliance-guide': {
    title: 'EPR Compliance Guide',
    description: 'A practical guide to packaging data, supplier evidence, jurisdiction tracking and EPR workflow management.',
    h1: 'EPR and Packaging Compliance: A Workflow Guide',
    intro: 'Packaging EPR creates a recurring data-management challenge across materials, suppliers, products and jurisdictions. The infrastructure should make that evidence reusable and auditable.',
    terms: ['EPR compliance guide','packaging compliance guide','extended producer responsibility workflow'],
    sections: [
      ['Map packaging data','Structure material, component, weight and supplier information at the product level.'],
      ['Track obligations','Connect products and packaging records to relevant jurisdictions and reporting requirements.'],
      ['Maintain evidence','Preserve the supporting supplier documentation, assumptions and review history.'],
      ['Integrate with the wider platform','Reuse supplier and product records in buyer requests, product footprints and other compliance requirements.'],
    ],
  },
} as const;

type Slug = keyof typeof resources;
export function generateStaticParams() { return Object.keys(resources).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources[slug as Slug];
  if (!resource) return {};
  return { title: resource.title, description: resource.description, keywords: [...resource.terms, 'supplier compliance infrastructure', 'Emissa'], alternates: { canonical: `/resources/${slug}` }, openGraph: { title: `${resource.title} | Emissa`, description: resource.description, url: `/resources/${slug}`, type: 'article' } };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resources[slug as Slug];
  if (!resource) notFound();

  const articleSchema = { '@context':'https://schema.org', '@type':'Article', headline:resource.h1, description:resource.description, author:{'@type':'Organization',name:'Emissa'}, publisher:{'@type':'Organization',name:'Emissa'}, mainEntityOfPage:`https://emissa.tech/resources/${slug}` };

  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/solutions/supplier-compliance-infrastructure">Platform</a><a href="/demo">Demo</a><a href="/pricing">Pricing</a></div></nav>
    <article>
      <header className="seoHero compact"><span className="seoKicker">Resource Center</span><h1>{resource.h1}</h1><p>{resource.intro}</p><div className="seoActions"><a className="seoPrimary" href="/demo">Book a Demo</a><a className="seoSecondary" href="/solutions/supplier-compliance-infrastructure">Explore Supplier Compliance Infrastructure</a></div></header>
      <section className="seoSection">{resource.sections.map(([title,body]) => <article className="seoCard" style={{marginBottom:16}} key={title}><h2>{title}</h2><p>{body}</p></article>)}</section>
      <section className="seoSection"><h2>Related supplier compliance workflows</h2><div className="seoActions"><a className="seoSecondary" href="/solutions/supplier-evidence-management">Evidence management</a><a className="seoSecondary" href="/solutions/supplier-due-diligence">Due diligence</a><a className="seoSecondary" href="/solutions/buyer-compliance-requests">Buyer requests</a><a className="seoSecondary" href="/solutions/scope-3-supplier-data">Scope 3</a><a className="seoSecondary" href="/solutions/epr-compliance">EPR</a><a className="seoSecondary" href="/solutions/cbam-compliance">CBAM</a></div></section>
      <section className="seoCta"><h2>Turn compliance guidance into an operating system.</h2><p>Emissa connects the source data, evidence and workflows behind recurring supplier requirements.</p><a className="seoPrimary" href="/demo">See the Platform</a></section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
  </main>;
}
