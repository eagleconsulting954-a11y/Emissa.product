import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../../seo.css';

const solutions = {
  'supplier-compliance-infrastructure': {
    title: 'Supplier Compliance Infrastructure Software',
    description: 'A connected operating system for supplier evidence, buyer requirements, due diligence, Scope 3, EPR, CBAM, product footprints, climate risk and regulatory workflows.',
    h1: 'Supplier Compliance Infrastructure for Modern Supply Chains',
    intro: 'Emissa gives manufacturers, exporters and enterprise suppliers one system to collect supplier and operational data, manage requirements, preserve evidence and deliver buyer-, auditor- or regulator-ready outputs.',
    terms: ['supplier compliance software', 'supplier compliance infrastructure', 'supplier compliance management software', 'supply chain compliance software'],
  },
  'supplier-due-diligence': {
    title: 'Supplier Due Diligence Software',
    description: 'Run supplier due diligence with structured evidence, risk reviews, approvals and reusable compliance records in one connected platform.',
    h1: 'Supplier Due Diligence Built on Reusable Compliance Evidence',
    intro: 'Create repeatable supplier due-diligence workflows with owners, evidence, approvals and risk context connected to supplier, facility, product and carbon records.',
    terms: ['supplier due diligence software', 'supply chain due diligence software', 'supplier risk compliance', 'supplier screening software'],
  },
  'buyer-compliance-requests': {
    title: 'Buyer Compliance Request Management Software',
    description: 'Manage buyer questionnaires, customer compliance requests and supplier evidence through reusable workflows instead of rebuilding every response manually.',
    h1: 'Turn Buyer Compliance Requests Into a Repeatable Workflow',
    intro: 'Centralize buyer requirements, deadlines and approved evidence so supplier teams can answer recurring customer requests faster and more consistently.',
    terms: ['buyer compliance request software', 'supplier questionnaire software', 'customer compliance portal', 'supplier sustainability questionnaire'],
  },
  'scope-3-supplier-data': {
    title: 'Scope 3 Supplier Data Management',
    description: 'Collect, calculate, verify and reuse supplier Scope 3 data across buyer reporting, product footprints and broader supplier compliance workflows.',
    h1: 'Scope 3 Supplier Data That Powers More Than Carbon Reporting',
    intro: 'Use Scope 3 as a supporting data foundation for buyer requests, supplier engagement, product carbon footprints, evidence packages and broader compliance workflows.',
    terms: ['Scope 3 supplier data', 'Scope 3 emissions software', 'supplier carbon data'],
  },
  'epr-compliance': {
    title: 'EPR Compliance Software',
    description: 'Manage packaging materials, jurisdictions, producer obligations, evidence and EPR reporting workflows in one system.',
    h1: 'EPR Compliance Infrastructure for Packaging-Intensive Suppliers',
    intro: 'Track packaging materials, jurisdiction requirements, evidence, filing deadlines and estimated fee exposure without maintaining disconnected spreadsheets.',
    terms: ['EPR compliance software', 'packaging compliance software', 'extended producer responsibility software'],
  },
  'cbam-compliance': {
    title: 'CBAM Compliance for Suppliers',
    description: 'Connect shipment, product, facility and emissions data for supplier-side CBAM evidence and embedded-carbon workflows.',
    h1: 'CBAM Compliance Workflows Built for Suppliers and Exporters',
    intro: 'Link shipment records to production evidence, supplier data and embedded-carbon calculations so teams can prepare importer-ready documentation faster.',
    terms: ['CBAM compliance software', 'CBAM supplier software', 'embedded carbon reporting'],
  },
  'product-carbon-footprints': {
    title: 'Product Carbon Footprint & LCA Software',
    description: 'Build product-level carbon footprints using materials, manufacturing, logistics and supplier inputs connected to broader supplier compliance data.',
    h1: 'Product Carbon Footprints Connected to Your Supplier Data',
    intro: 'Model lifecycle stages, compare suppliers and materials, and reuse validated company data across product footprint requests and LCA workflows.',
    terms: ['product carbon footprint software', 'LCA software', 'product emissions software'],
  },
  'climate-risk': {
    title: 'Supplier Climate Risk Software',
    description: 'Map physical and transition risk across suppliers, facilities and routes with connected evidence and action workflows.',
    h1: 'Climate Risk Intelligence for Supplier Operations',
    intro: 'Turn facility, supplier and route exposure into a practical workflow for screening, prioritization, mitigation and disclosure support.',
    terms: ['supplier climate risk', 'climate risk software', 'supply chain climate risk'],
  },
  'supplier-evidence-management': {
    title: 'Supplier Evidence Management',
    description: 'Create a system of record for supplier certificates, calculations, source documents, approvals and reusable compliance evidence.',
    h1: 'One Evidence Layer for Every Supplier Compliance Request',
    intro: 'Store the source, owner, approval status, expiration and reuse history behind every compliance claim instead of rebuilding evidence for every buyer.',
    terms: ['supplier evidence management', 'compliance evidence software', 'supplier documentation platform', 'supplier certificate tracking'],
  },
  'compliance-data-rooms': {
    title: 'Compliance Data Rooms',
    description: 'Create secure supplier compliance data rooms for buyers, lenders, auditors, investors and due diligence teams.',
    h1: 'Secure Compliance Data Rooms for Buyers and Due Diligence',
    intro: 'Package approved environmental, supplier, product and regulatory evidence into controlled workspaces that external stakeholders can review.',
    terms: ['compliance data room', 'supplier due diligence software', 'ESG data room'],
  },
} as const;

type Slug = keyof typeof solutions;

export function generateStaticParams() {
  return Object.keys(solutions).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions[slug as Slug];
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.description,
    keywords: [...solution.terms, 'supplier compliance infrastructure', 'supplier compliance software', 'Emissa'],
    alternates: { canonical: `/solutions/${slug}` },
    openGraph: { title: `${solution.title} | Emissa`, description: solution.description, url: `/solutions/${slug}`, type: 'website' },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions[slug as Slug];
  if (!solution) notFound();

  const faq = [
    ['What is Emissa?', 'Emissa is supplier compliance infrastructure that connects evidence, due diligence, buyer requirements, carbon, packaging, trade, product and risk workflows in one operating system.'],
    ['How does Scope 3 fit?', 'Scope 3 is an important supporting data foundation inside Emissa. Supplier, purchasing, logistics and product data can then be reused across adjacent compliance workflows.'],
    ['Who is it for?', 'Emissa is designed for manufacturers, exporters and enterprise suppliers facing recurring buyer, sustainability, product, trade or regulatory data requests.'],
  ];

  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };

  return (
    <main className="seoPage">
      <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/solutions/supplier-compliance-infrastructure">Solutions</a><a href="/demo">Demo</a><a href="/pricing">Pricing</a><a href="/login">Login</a></div></nav>
      <section className="seoHero compact">
        <span className="seoKicker">Supplier Compliance Infrastructure</span>
        <h1>{solution.h1}</h1>
        <p>{solution.intro}</p>
        <div className="seoActions"><a className="seoPrimary" href="/demo">Book a Demo</a><a className="seoSecondary" href="/pricing">View Pricing</a></div>
      </section>
      <section className="seoGrid three">
        <article className="seoCard"><h2>Connect source data</h2><p>Bring together supplier, facility, product, purchasing, packaging, shipment and evidence records instead of re-keying the same information into separate tools.</p></article>
        <article className="seoCard"><h2>Run the workflow</h2><p>Assign owners, validate missing information, track deadlines and preserve the evidence behind each calculation, review or submission.</p></article>
        <article className="seoCard"><h2>Deliver proof</h2><p>Generate reusable buyer-, auditor- and regulator-ready outputs from one controlled supplier compliance data layer.</p></article>
      </section>
      <section className="seoSection">
        <span className="seoKicker">Why Emissa</span>
        <h2>Scope 3 supports the data graph. Supplier compliance infrastructure defines the platform.</h2>
        <p>Most teams do not have isolated carbon, packaging, trade, product and due-diligence problems. They have one underlying data problem: the same supplier and operational information must be collected, validated and repackaged for different requirements. Emissa is built around that shared infrastructure.</p>
      </section>
      <section className="seoSection">
        <h2>Explore supplier compliance workflows</h2>
        <div className="seoActions"><a className="seoSecondary" href="/solutions/supplier-compliance-infrastructure">Supplier compliance infrastructure</a><a className="seoSecondary" href="/solutions/supplier-due-diligence">Supplier due diligence</a><a className="seoSecondary" href="/solutions/buyer-compliance-requests">Buyer compliance requests</a><a className="seoSecondary" href="/solutions/supplier-evidence-management">Supplier evidence</a><a className="seoSecondary" href="/solutions/scope-3-supplier-data">Scope 3 supplier data</a><a className="seoSecondary" href="/solutions/cbam-compliance">CBAM</a><a className="seoSecondary" href="/solutions/epr-compliance">EPR</a></div>
      </section>
      <section className="seoSection"><h2>Frequently asked questions</h2><div className="seoFaq">{faq.map(([q,a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></section>
      <section className="seoCta"><h2>Turn supplier compliance into an operating system.</h2><p>Start with the requirement creating urgency today. Expand across the full Emissa suite as the same data becomes useful elsewhere.</p><a className="seoPrimary" href="/demo">See Emissa in Action</a></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
