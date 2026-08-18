import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../../seo.css';

const solutions = {
  'supplier-compliance-infrastructure': {
    title: 'Supplier Compliance Infrastructure',
    description: 'A connected operating system for supplier compliance, buyer requirements, evidence, Scope 3, EPR, CBAM, product footprints and climate risk.',
    h1: 'Supplier Compliance Infrastructure for Modern Supply Chains',
    intro: 'Emissa gives manufacturers, exporters and enterprise suppliers one system to collect operational data, manage requirements, preserve evidence and deliver buyer- or regulator-ready outputs.',
    terms: ['supplier compliance software', 'supplier compliance infrastructure', 'supply chain compliance software'],
  },
  'scope-3-supplier-data': {
    title: 'Scope 3 Supplier Data Management',
    description: 'Collect, calculate, verify and reuse supplier Scope 3 data across buyer reporting, product footprints and compliance workflows.',
    h1: 'Scope 3 Supplier Data That Powers More Than Carbon Reporting',
    intro: 'Use Scope 3 as the shared data foundation for buyer requests, supplier engagement, product carbon footprints, evidence packages and broader compliance workflows.',
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
    description: 'Build product-level carbon footprints using materials, manufacturing, logistics and supplier inputs connected to corporate Scope 3 data.',
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
    terms: ['supplier evidence management', 'compliance evidence software', 'supplier documentation platform'],
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
    keywords: [...solution.terms, 'supplier compliance infrastructure', 'Emissa'],
    alternates: { canonical: `/solutions/${slug}` },
    openGraph: {
      title: `${solution.title} | Emissa`,
      description: solution.description,
      url: `/solutions/${slug}`,
      type: 'website',
    },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions[slug as Slug];
  if (!solution) notFound();

  const faq = [
    ['What is Emissa?', 'Emissa is supplier compliance infrastructure that connects carbon, packaging, trade, product, risk and evidence workflows in one operating system.'],
    ['How does Scope 3 fit?', 'Scope 3 is a core data foundation inside Emissa. Supplier, purchasing, logistics and product data can then be reused across adjacent compliance workflows.'],
    ['Who is it for?', 'Emissa is designed for manufacturers, exporters and enterprise suppliers facing recurring buyer, sustainability, product or regulatory data requests.'],
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <main className="seoPage">
      <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/demo">Demo</a><a href="/pricing">Pricing</a><a href="/login">Login</a></div></nav>
      <section className="seoHero compact">
        <span className="seoKicker">Supplier Compliance Infrastructure</span>
        <h1>{solution.h1}</h1>
        <p>{solution.intro}</p>
        <div className="seoActions"><a className="seoPrimary" href="/demo">Book a Demo</a><a className="seoSecondary" href="/pricing">View Pricing</a></div>
      </section>
      <section className="seoGrid three">
        <article className="seoCard"><h2>Connect source data</h2><p>Bring together supplier, facility, product, purchasing, packaging, shipment and evidence records instead of re-keying the same information into separate tools.</p></article>
        <article className="seoCard"><h2>Run the workflow</h2><p>Assign owners, validate missing information, track deadlines and preserve the evidence behind each calculation or submission.</p></article>
        <article className="seoCard"><h2>Deliver proof</h2><p>Generate reusable buyer-, auditor- and regulator-ready outputs from one controlled compliance data layer.</p></article>
      </section>
      <section className="seoSection">
        <span className="seoKicker">Why Emissa</span>
        <h2>Scope 3 starts the data graph. Supplier compliance creates the platform.</h2>
        <p>Most teams do not have isolated carbon, packaging, trade and product problems. They have one underlying data problem: the same supplier and operational information must be collected, validated and repackaged for different requirements. Emissa is built around that shared infrastructure.</p>
      </section>
      <section className="seoSection">
        <h2>Frequently asked questions</h2>
        <div className="seoFaq">{faq.map(([q,a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div>
      </section>
      <section className="seoCta"><h2>Turn supplier compliance into an operating system.</h2><p>Start with the requirement creating urgency today. Expand across the full Emissa suite as the same data becomes useful elsewhere.</p><a className="seoPrimary" href="/demo">See Emissa in Action</a></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
