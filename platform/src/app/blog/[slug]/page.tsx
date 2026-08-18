import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../../seo.css';

const posts = {
  'what-is-supplier-compliance-infrastructure': {
    title: 'What Is Supplier Compliance Infrastructure?',
    description: 'A practical guide to supplier compliance infrastructure, the systems, evidence and workflows companies use to manage buyer and regulatory requirements.',
    keywords: ['supplier compliance infrastructure','supplier compliance software','supplier compliance management'],
    sections: [
      ['Supplier compliance is becoming an operating-system problem','Supplier compliance is no longer one questionnaire or one annual sustainability report. Manufacturers and enterprise suppliers increasingly manage recurring buyer requests, product documentation, carbon data, packaging obligations, trade-related evidence, certificates, due diligence and audit records. The infrastructure layer is the system that connects those requirements to the same underlying supplier, facility, shipment, product and evidence data.'],
      ['What belongs in the infrastructure layer','A strong supplier compliance system should centralize supplier records, ownership, deadlines, certificates, source evidence, approval history, buyer requests and regulator-ready outputs. It should also allow the same validated data to be reused across multiple workflows instead of being recollected for each request.'],
      ['Why Scope 3 matters but is not the entire category','Scope 3 is important because purchasing, logistics and supplier data create a useful value-chain data foundation. GHG Protocol separates corporate Scope 3 accounting from product-level accounting, which reinforces the need for systems that can support multiple layers of compliance data rather than treating carbon reporting as the only workflow.'],
      ['The commercial outcome','The goal is not simply to create reports. The goal is to keep supplier teams ready to respond to customers, auditors and regulators with defensible evidence while reducing repetitive manual work.']
    ]
  },
  'supplier-compliance-software-vs-esg-software': {
    title: 'Supplier Compliance Software vs. ESG Software',
    description: 'Understand the difference between supplier compliance software and ESG reporting tools, and when companies need a broader compliance operating layer.',
    keywords: ['supplier compliance software','ESG software','supply chain compliance software'],
    sections: [
      ['The categories overlap, but the workflows are different','ESG software often focuses on disclosure, metrics and reporting. Supplier compliance software is more operational: collecting evidence, managing requirements, tracking supplier records, validating documents, assigning owners and delivering responses to buyers or regulators.'],
      ['Where the overlap happens','Carbon accounting, supplier sustainability questionnaires, climate risk and due diligence can sit inside both categories. The difference is whether the system is designed mainly to report metrics or to run the workflow required to obtain, validate and reuse the underlying evidence.'],
      ['What mid-market suppliers should prioritize','If your team repeatedly answers buyer requests, manages certificates, handles EPR or CBAM data, maintains product footprints or supports due diligence, the stronger architecture is usually a supplier compliance data layer with ESG reporting as one of several outputs.']
    ]
  },
  'supplier-compliance-checklist': {
    title: 'Supplier Compliance Checklist for Manufacturers',
    description: 'A supplier compliance checklist covering evidence, certificates, buyer requests, Scope 3, EPR, CBAM, product data and due diligence workflows.',
    keywords: ['supplier compliance checklist','manufacturer compliance checklist','supplier compliance management'],
    sections: [
      ['Build the supplier system of record','Maintain a controlled supplier master with ownership, locations, products supplied, criticality, active requirements and document status.'],
      ['Track evidence and expiration dates','Certificates, declarations, policies, product records and calculation files should have source, owner, approval status and expiration dates.'],
      ['Standardize buyer requests','Capture customer questionnaires and data requests in one queue, map each request to reusable evidence and record the final approved response.'],
      ['Connect carbon and product data','Use supplier, purchasing, logistics and facility data across Scope 3 and product footprint workflows instead of maintaining separate carbon-only records.'],
      ['Add regulatory workflows','Where relevant, connect packaging/EPR, CBAM, trade, product and due-diligence requirements to the same evidence layer.']
    ]
  },
  'how-to-manage-buyer-compliance-requests': {
    title: 'How to Manage Buyer Compliance Requests Without Spreadsheets',
    description: 'A workflow for managing buyer questionnaires, sustainability requests and compliance evidence without rebuilding every response manually.',
    keywords: ['buyer compliance requests','supplier questionnaire software','customer compliance requests'],
    sections: [
      ['Turn requests into structured work','Every incoming buyer request should have an owner, due date, requirement type, requested evidence and approval status.'],
      ['Create a reusable answer library','Approved answers should link to the evidence that supports them. This makes the next request faster while preserving accountability.'],
      ['Separate source evidence from presentation','The same certificate, Scope 3 dataset or product declaration may support several buyers. Store the underlying evidence once and generate buyer-specific responses from it.'],
      ['Measure response readiness','Track how much of your buyer-request library can be answered from current approved data versus how much requires new collection.']
    ]
  },
  'supplier-due-diligence-workflow': {
    title: 'A Practical Supplier Due Diligence Workflow',
    description: 'A structured supplier due diligence process for risk review, evidence collection, approvals, remediation and ongoing monitoring.',
    keywords: ['supplier due diligence workflow','supplier due diligence software','supplier risk compliance'],
    sections: [
      ['Define the trigger and risk scope','Due diligence should start with a clear business trigger: onboarding, annual review, buyer requirement, sourcing change or regulatory obligation.'],
      ['Collect the minimum defensible evidence','Request only the documents and data needed for the identified risk areas, then preserve the source and review history.'],
      ['Route exceptions instead of treating all suppliers equally','High-risk findings should create remediation tasks and approval workflows while low-risk suppliers move through a lighter process.'],
      ['Keep the record reusable','The output should remain connected to supplier master data so the same evidence can support buyer requests and future reviews.']
    ]
  },
  'supplier-certificate-management-guide': {
    title: 'Supplier Certificate Management: A Complete Guide',
    description: 'How to manage supplier certificates, expiration dates, approvals and reusable compliance evidence in a controlled system.',
    keywords: ['supplier certificate management','supplier certificate tracking','compliance evidence management'],
    sections: [
      ['Why certificate tracking breaks down','Shared drives and inboxes make it difficult to know which document is current, who approved it and when it expires.'],
      ['The fields every certificate record should have','Capture supplier, document type, issuing body, effective date, expiration date, owner, approval status and source file.'],
      ['Automate renewal workflows','Create reminders before expiration, assign renewal ownership and block outdated evidence from being reused in new buyer responses.'],
      ['Connect certificates to requirements','A certificate becomes more valuable when the system records which buyers, products, facilities or compliance obligations it supports.']
    ]
  },
  'scope-3-as-supplier-data-foundation': {
    title: 'Why Scope 3 Should Be a Supplier Data Foundation, Not a Silo',
    description: 'Use Scope 3 supplier data as a reusable foundation for buyer requests, product footprints, due diligence and supplier compliance workflows.',
    keywords: ['Scope 3 supplier data','supplier carbon data','supplier compliance infrastructure'],
    sections: [
      ['Scope 3 naturally creates a supplier data graph','The GHG Protocol Corporate Value Chain Standard covers 15 upstream and downstream categories and encourages supplier engagement. That means Scope 3 work already touches purchasing, logistics, suppliers, products and operations.'],
      ['Reuse matters more than another dashboard','The higher-value architecture is one where supplier and purchasing data collected for carbon can also support product footprints, buyer requests and compliance evidence.'],
      ['Corporate and product accounting are different layers','GHG Protocol distinguishes corporate Scope 3 accounting from product-level accounting. Systems should therefore preserve common source data while allowing different methodologies and outputs.']
    ]
  },
  'cbam-supplier-data-checklist': {
    title: 'CBAM Supplier Data Checklist',
    description: 'A practical CBAM data checklist for suppliers and exporters preparing embedded-carbon evidence for importer requests.',
    keywords: ['CBAM supplier data','CBAM compliance software','embedded carbon reporting'],
    sections: [
      ['Start with product and shipment identity','Tie each request to the product, production installation, shipment period and customer or importer asking for the data.'],
      ['Preserve calculation inputs','Store activity data, emissions factors, energy inputs, production volumes and calculation methodology with source evidence.'],
      ['Create an approval trail','Embedded-carbon outputs should be reviewed before release and remain linked to the underlying evidence used for the calculation.'],
      ['Build for repeat requests','A supplier should not rebuild the same installation and product evidence every time an importer asks for updated data.']
    ]
  },
  'epr-packaging-compliance-workflow': {
    title: 'How to Build an EPR Packaging Compliance Workflow',
    description: 'A practical workflow for packaging data, producer obligations, evidence, deadlines and EPR reporting readiness.',
    keywords: ['EPR compliance software','packaging compliance workflow','extended producer responsibility software'],
    sections: [
      ['Create a packaging material master','Track packaging type, material, weight, market, product association and evidence source.'],
      ['Map obligations by jurisdiction','Different markets can create different producer definitions, reporting requirements and fee structures. The system should separate jurisdiction rules from core packaging data.'],
      ['Assign evidence and owners','Each reported figure should be traceable to a source file or approved calculation and have a responsible owner.'],
      ['Reuse packaging data','The same packaging records may support internal analysis, buyer requests and multiple jurisdictional filings.']
    ]
  },
  'product-carbon-footprint-vs-scope-3': {
    title: 'Product Carbon Footprint vs. Scope 3: What Is the Difference?',
    description: 'Compare corporate Scope 3 accounting with product carbon footprints and learn how the two data layers should work together.',
    keywords: ['product carbon footprint vs Scope 3','product carbon footprint software','Scope 3 emissions'],
    sections: [
      ['Corporate Scope 3 is organization-level','GHG Protocol describes Scope 3 as corporate value-chain accounting across upstream and downstream activities.'],
      ['Product footprints are product-level','The GHG Protocol Product Standard focuses on emissions associated with an individual product life cycle.'],
      ['The source data can overlap','Supplier materials, logistics, energy and production records can support both, but the boundaries and calculation outputs are different.'],
      ['One evidence layer reduces duplication','Companies should preserve shared source data while allowing separate corporate and product methodologies.']
    ]
  },
  'supplier-onboarding-compliance-process': {
    title: 'Supplier Onboarding Compliance Process: What to Automate',
    description: 'A supplier onboarding compliance process covering required documents, risk checks, approvals and ongoing evidence management.',
    keywords: ['supplier onboarding compliance','supplier onboarding software','supplier compliance management'],
    sections: [
      ['Define requirements before inviting the supplier','Requirements should vary by supplier type, geography, product and risk rather than using one oversized questionnaire for everyone.'],
      ['Validate before activation','Critical documents and declarations should be reviewed before a supplier reaches approved status.'],
      ['Carry the evidence forward','Onboarding documents should become part of the permanent supplier record instead of disappearing into an onboarding folder.'],
      ['Trigger future reviews','Expiration dates, sourcing changes and risk events should create renewal or reassessment tasks.']
    ]
  },
  'supplier-questionnaire-management': {
    title: 'Supplier Questionnaire Management: From Email to Workflow',
    description: 'How to standardize supplier questionnaires, evidence collection, follow-ups and approvals in a repeatable compliance workflow.',
    keywords: ['supplier questionnaire management','supplier questionnaire software','supplier compliance platform'],
    sections: [
      ['Questionnaires should be mapped to data fields','Repeated questions should map to structured supplier attributes and evidence records wherever possible.'],
      ['Only ask what is missing','A reusable data layer lets teams prefill known information and request only gaps from suppliers.'],
      ['Track completion and quality separately','A completed questionnaire is not necessarily a validated questionnaire. Review status should be explicit.'],
      ['Reuse approved answers','Once a response is approved, it should be available for future due diligence and buyer workflows.']
    ]
  },
  'supplier-compliance-kpis': {
    title: 'Supplier Compliance KPIs: What to Measure',
    description: 'Supplier compliance KPIs for evidence readiness, buyer response speed, certificate coverage, due diligence and workflow performance.',
    keywords: ['supplier compliance KPIs','supplier compliance metrics','supplier compliance management'],
    sections: [
      ['Evidence readiness rate','Measure the percentage of active requirements that can be supported by current approved evidence.'],
      ['Buyer request turnaround time','Track time from request receipt to approved submission, including where delays occur.'],
      ['Certificate currency','Measure the share of required certificates that are current, expiring soon or overdue.'],
      ['Due diligence completion and exception rate','Separate completed reviews from unresolved risk exceptions.'],
      ['Data reuse rate','Measure how often an approved supplier data point or evidence item is reused across workflows.']
    ]
  },
  'how-to-build-supplier-compliance-system-of-record': {
    title: 'How to Build a Supplier Compliance System of Record',
    description: 'Design a supplier compliance system of record that connects suppliers, facilities, products, requirements, evidence and approvals.',
    keywords: ['supplier compliance system of record','supplier compliance infrastructure','supplier evidence management'],
    sections: [
      ['Start with stable entities','Create controlled records for suppliers, facilities, products, requirements and evidence.'],
      ['Keep requirements separate from evidence','A requirement describes what must be proven. Evidence describes the source used to prove it. One evidence item can support multiple requirements.'],
      ['Record ownership and approvals','Every important record should have a responsible owner and a visible review state.'],
      ['Make history auditable','Preserve changes, approvals, expirations and prior submissions so teams can explain what was known and used at a given point in time.']
    ]
  },
  'supplier-compliance-platform-buyers-guide': {
    title: 'Supplier Compliance Platform Buyer’s Guide',
    description: 'What to evaluate when selecting supplier compliance software for evidence, workflows, Scope 3, product data, due diligence and buyer requests.',
    keywords: ['supplier compliance platform','supplier compliance software','supplier compliance software buyers guide'],
    sections: [
      ['Evaluate the data model first','Look for a system that can connect suppliers, facilities, products, requirements, documents and approvals instead of storing only questionnaire responses.'],
      ['Test evidence reuse','Ask whether one approved source record can be reused across buyer requests, due diligence, carbon, product and regulatory workflows.'],
      ['Check workflow controls','Owners, deadlines, review states, exception handling and audit history matter more than dashboard volume.'],
      ['Separate current needs from platform extensibility','Choose a system that solves the urgent use case but can expand without forcing the team to rebuild its supplier data foundation.']
    ]
  }
} as const;

type Slug = keyof typeof posts;

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug as Slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: [...post.keywords, 'Emissa'],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: `${post.title} | Emissa`, description: post.description, url: `/blog/${slug}`, type: 'article' }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug as Slug];
  if (!post) notFound();
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description,
    author: { '@type': 'Organization', name: 'Emissa' }, publisher: { '@type': 'Organization', name: 'Emissa' },
    mainEntityOfPage: `https://emissa.tech/blog/${slug}`
  };
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/blog">Blog</a><a href="/solutions/supplier-compliance-infrastructure">Solutions</a><a href="/demo">Demo</a><a href="/pricing">Pricing</a></div></nav>
    <article>
      <section className="seoHero compact"><span className="seoKicker">Supplier Compliance Library</span><h1>{post.title}</h1><p>{post.description}</p></section>
      {post.sections.map(([heading, body]) => <section className="seoSection" key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      <section className="seoSection"><h2>Related Emissa workflows</h2><div className="seoActions"><a className="seoSecondary" href="/solutions/supplier-compliance-infrastructure">Supplier compliance infrastructure</a><a className="seoSecondary" href="/solutions/supplier-due-diligence">Supplier due diligence</a><a className="seoSecondary" href="/solutions/buyer-compliance-requests">Buyer requests</a><a className="seoSecondary" href="/solutions/supplier-evidence-management">Evidence management</a><a className="seoSecondary" href="/solutions/scope-3-supplier-data">Scope 3 supplier data</a></div></section>
      <section className="seoCta"><h2>Move from disconnected compliance tasks to one supplier data layer.</h2><p>Emissa connects supplier evidence, buyer requests, due diligence, Scope 3 and adjacent compliance workflows in one operating system.</p><a className="seoPrimary" href="/demo">Book a Demo</a></section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
