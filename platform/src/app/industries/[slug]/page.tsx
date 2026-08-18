import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../../seo.css';

const industries = {
  'manufacturing-supplier-compliance': {
    title: 'Manufacturing Supplier Compliance Software',
    description: 'Supplier compliance infrastructure for manufacturers managing buyer requirements, certificates, Scope 3, product evidence, EPR, CBAM and due diligence.',
    h1: 'Supplier Compliance Infrastructure for Manufacturers',
    intro: 'Emissa helps manufacturing teams centralize supplier evidence, product and facility data, buyer requests and regulatory workflows in one operating layer.',
    terms: ['manufacturing supplier compliance software','manufacturer compliance software','supplier compliance management for manufacturers'],
    problems: ['Supplier certificates and evidence expire across multiple systems.','Buyer questionnaires repeatedly ask for the same environmental and product data.','Carbon, packaging, product and trade requirements depend on overlapping supplier records.'],
  },
  'automotive-supplier-compliance': {
    title: 'Automotive Supplier Compliance Software',
    description: 'Centralize supplier evidence, product data, carbon reporting, due diligence and buyer compliance workflows for automotive suppliers.',
    h1: 'Supplier Compliance Infrastructure for Automotive Supply Chains',
    intro: 'Emissa gives automotive suppliers a reusable evidence layer for customer requirements, carbon data, product documentation, supplier due diligence and recurring compliance reviews.',
    terms: ['automotive supplier compliance software','automotive supply chain compliance','supplier compliance automotive'],
    problems: ['OEM and Tier 1 customer requests create repeated evidence work.','Supplier and product data must be traceable across complex multi-tier networks.','Sustainability and compliance teams need one source for approved documentation.'],
  },
  'industrial-supplier-compliance': {
    title: 'Industrial Supplier Compliance Software',
    description: 'Supplier compliance infrastructure for industrial companies managing documentation, due diligence, buyer requests and sustainability obligations.',
    h1: 'Compliance Infrastructure for Industrial Suppliers',
    intro: 'Use Emissa to connect supplier, facility, product and evidence records so industrial teams can answer buyer and regulatory requirements from one controlled system.',
    terms: ['industrial supplier compliance software','industrial compliance platform','supplier documentation software'],
    problems: ['Compliance evidence is fragmented across plants, teams and vendors.','Customer requests arrive with different formats, deadlines and supporting-document rules.','The same operational data is repeatedly rebuilt for carbon, product and supplier reviews.'],
  },
  'packaging-epr-compliance': {
    title: 'Packaging EPR Compliance Software',
    description: 'Manage packaging data, supplier evidence, producer obligations, reporting readiness and EPR workflows in one supplier compliance platform.',
    h1: 'Packaging and EPR Compliance Infrastructure',
    intro: 'Connect packaging specifications, supplier documentation, jurisdictions, evidence and filing workflows so teams can prepare for EPR obligations without disconnected spreadsheets.',
    terms: ['packaging EPR compliance software','packaging compliance software','extended producer responsibility platform'],
    problems: ['Packaging material data lives across suppliers and product teams.','Jurisdiction-specific requirements create duplicated tracking work.','Evidence, deadlines and reporting assumptions need a defensible audit trail.'],
  },
  'metals-cbam-compliance': {
    title: 'CBAM Compliance Software for Metals Suppliers',
    description: 'Connect facility, product, shipment and emissions evidence for metals suppliers responding to EU CBAM data requests.',
    h1: 'CBAM Compliance Infrastructure for Metals and Exporters',
    intro: 'Emissa connects product, facility, shipment and emissions evidence so metals suppliers can organize embedded-carbon data and importer-ready documentation in one workflow.',
    terms: ['CBAM metals compliance software','CBAM supplier software metals','embedded carbon reporting software'],
    problems: ['Importers need consistent embedded-carbon evidence tied to specific products and facilities.','Shipment, production and emissions records are often managed separately.','Teams need repeatable review and approval workflows before sharing compliance data externally.'],
  },
} as const;

type Slug = keyof typeof industries;

export function generateStaticParams() { return Object.keys(industries).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries[slug as Slug];
  if (!industry) return {};
  return {
    title: industry.title,
    description: industry.description,
    keywords: [...industry.terms, 'supplier compliance infrastructure', 'supplier compliance software', 'Emissa'],
    alternates: { canonical: `/industries/${slug}` },
    openGraph: { title: `${industry.title} | Emissa`, description: industry.description, url: `/industries/${slug}`, type: 'website' },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries[slug as Slug];
  if (!industry) notFound();

  const faq = [
    ['What does Emissa replace?', 'Emissa is designed to reduce dependence on disconnected spreadsheets, evidence folders and point workflows by creating one supplier compliance operating layer.'],
    ['Is Scope 3 the whole platform?', 'No. Scope 3 is a supporting data foundation. Emissa is positioned as supplier compliance infrastructure spanning evidence, due diligence, buyer requests, product, packaging, trade and risk workflows.'],
    ['Can the same evidence be reused?', 'Yes. The platform is designed around reusable supplier, facility, product and approval records so teams do not rebuild every response from scratch.'],
  ];

  const schema = { '@context':'https://schema.org', '@type':'FAQPage', mainEntity: faq.map(([q,a]) => ({ '@type':'Question', name:q, acceptedAnswer:{ '@type':'Answer', text:a } })) };

  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/solutions/supplier-compliance-infrastructure">Platform</a><a href="/demo">Demo</a><a href="/pricing">Pricing</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">Industry Solutions</span><h1>{industry.h1}</h1><p>{industry.intro}</p><div className="seoActions"><a className="seoPrimary" href="/demo">Book a Demo</a><a className="seoSecondary" href="/solutions/supplier-compliance-infrastructure">Explore the Platform</a></div></section>
    <section className="seoSection"><span className="seoKicker">Common friction</span><h2>Why supplier compliance becomes an infrastructure problem.</h2><div className="seoGrid three">{industry.problems.map((problem,i) => <article className="seoCard" key={problem}><h3>0{i+1}</h3><p>{problem}</p></article>)}</div></section>
    <section className="seoGrid three"><article className="seoCard"><h2>Centralize evidence</h2><p>Store approved supplier, facility, product and regulatory evidence with ownership and review history.</p></article><article className="seoCard"><h2>Automate workflows</h2><p>Route requirements, deadlines, approvals and missing-data requests through repeatable compliance processes.</p></article><article className="seoCard"><h2>Reuse validated data</h2><p>Use the same underlying supplier records across buyer requests, Scope 3, CBAM, EPR, product footprints and due diligence.</p></article></section>
    <section className="seoSection"><h2>Related Emissa workflows</h2><div className="seoActions"><a className="seoSecondary" href="/solutions/supplier-due-diligence">Supplier due diligence</a><a className="seoSecondary" href="/solutions/buyer-compliance-requests">Buyer requests</a><a className="seoSecondary" href="/solutions/supplier-evidence-management">Evidence management</a><a className="seoSecondary" href="/solutions/scope-3-supplier-data">Scope 3 supplier data</a><a className="seoSecondary" href="/solutions/cbam-compliance">CBAM</a><a className="seoSecondary" href="/solutions/epr-compliance">EPR</a></div></section>
    <section className="seoSection"><h2>Frequently asked questions</h2><div className="seoFaq">{faq.map(([q,a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></section>
    <section className="seoCta"><h2>Build supplier compliance around one reusable data layer.</h2><p>See how Emissa can connect the requirements your team handles today and the workflows you will need next.</p><a className="seoPrimary" href="/demo">See Emissa in Action</a></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
