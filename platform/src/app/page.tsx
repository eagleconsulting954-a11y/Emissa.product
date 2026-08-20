import type { Metadata } from 'next';
import LeadMagnet from '@/components/LeadMagnet';
import './marketing.css';
import './landing.css';

export const metadata: Metadata = {
  title: 'Supplier Compliance Infrastructure Software',
  description: 'Premium supplier compliance infrastructure for manufacturers and enterprise suppliers. Centralize evidence, automate due diligence, buyer requests, Scope 3, EPR, CBAM and product compliance workflows.',
  keywords: ['supplier compliance infrastructure','supplier compliance software','supplier compliance management software','supplier compliance platform','supplier due diligence software','supplier evidence management','enterprise supplier compliance'],
  alternates: { canonical: '/' },
  openGraph: { title: 'Emissa | Supplier Compliance Infrastructure', description: 'One refined operating system for supplier evidence, buyer requirements, due diligence and regulatory compliance workflows.', url: '/', type: 'website' },
  robots: { index: true, follow: true },
};

const features = [
  ['01','Centralize evidence','Create one controlled source of supplier, facility, product and regulatory evidence.'],
  ['02','Automate workflows','Run due diligence, buyer requests, Scope 3, EPR, CBAM and product compliance from one system.'],
  ['03','Prove readiness','Maintain defensible approvals, source records and audit trails for every requirement.'],
  ['04','Scale with confidence','Give enterprise teams secure infrastructure designed for multi-entity operations and integrations.'],
];

const seoClusters = [
  ['/regulations','Regulatory Intelligence','CBAM, EUDR, CSDDD, Digital Product Passports, REACH, RoHS, PFAS, UFLPA, EPR and product compliance guidance.'],
  ['/integrations','Integrations','ERP, procurement, accounting, utility, fleet, data-platform and collaboration integration workflows.'],
  ['/for','Teams & Roles','Supplier compliance workflows for procurement, compliance, sustainability, quality, operations, legal and finance.'],
  ['/compare','Buyer Guides','Compare supplier compliance platforms with spreadsheets, ESG, procurement, GRC, risk and carbon tools.'],
  ['/tools','Free Tools','Interactive supplier readiness, certificate risk, buyer request and evidence-gap assessments.'],
  ['/templates','Templates','Supplier questionnaires, evidence matrices, CAPA, CBAM, EPR and due-diligence structures.'],
  ['/docs','Documentation','Public product documentation for Supplier 360, Evidence Vault, Workflow Studio, CAPA, risk and reporting.'],
  ['/research','Research & Benchmarks','Transparent supplier compliance benchmark definitions for evidence readiness, response performance, CAPA and data reuse.'],
] as const;

const regulatorySpotlights = [
  ['/regulations/espr-digital-product-passport','Digital Product Passport','Product, supplier, material and evidence data architecture for ESPR and DPP workflows.'],
  ['/regulations/eudr','EUDR','Supplier due diligence, commodity traceability, origin evidence and EU Information System readiness.'],
  ['/regulations/csddd','CSDDD','Value-chain due diligence evidence, risk review, remediation and accountability workflows.'],
  ['/regulations/uflpa','UFLPA','Supplier traceability, manufacturing evidence and import-compliance documentation.'],
] as const;

export default function MarketingHome() {
  return <main className="landingExact luxuryLanding">
    <LeadMagnet />
    <nav className="leNav">
      <a className="leBrand" href="/" aria-label="Emissa home"><div className="leLogo luxuryMark" aria-hidden="true"><span className="markGold"></span><span className="markGreen"></span></div><div><b>EMISSA</b><small>Supplier Compliance Infrastructure</small></div></a>
      <div className="leNavLinks"><a href="#platform">Platform</a><a href="/solutions">Solutions</a><a href="/regulations">Regulations</a><a href="/integrations">Integrations</a><a href="/research">Research</a><a className="login" href="/login">Log in</a><a className="demo" href="/demo">Book a private demo</a></div>
    </nav>

    <section className="leHero" id="platform">
      <div className="heroEtching" aria-hidden="true"></div>
      <div className="leHeroCopy"><p className="eyebrow">Supplier Compliance Infrastructure</p><h1>Compliance,<br/><span className="leGradient">elevated.</span></h1><p className="leLead">A sophisticated operating layer for supplier evidence, buyer requirements, due diligence and regulatory workflows.</p><div className="leActions"><a className="lePrimary" href="/demo">Book a private demo <span>→</span></a><a className="leSecondary" href="/solutions/supplier-compliance-infrastructure">Explore the platform <i>↗</i></a></div><div className="leTrusted"><span>✓</span> Built for mature compliance programs and complex supply chains</div></div>
      <div className="leVisual" aria-hidden="true"><div className="leGlow"></div><div className="luxuryHalo haloOne"></div><div className="luxuryHalo haloTwo"></div><div className="leTrail"></div><div className="leOrbit"></div><div className="leOrbit o2"></div><div className="leOrbit o3"></div><div className="leGlobe"><div className="globeMonogram"><span className="markGold"></span><span className="markGreen"></span></div></div><div className="leParticles"></div></div>
    </section>

    <section className="leStats" aria-label="Platform metrics"><div className="leStat"><span className="statLabel">Infrastructure</span><strong>1</strong><h3>supplier data layer</h3><p>Supplier, facility, product and evidence records connected in one controlled system.</p></div><div className="leStat"><span className="statLabel">Coverage</span><strong>15+</strong><h3>compliance workflows</h3><p>Buyer requests, due diligence, carbon, EPR, CBAM, product compliance and more.</p></div><div className="leStat"><span className="statLabel">Implementation</span><strong>2</strong><h3>weeks</h3><p>Guided onboarding designed to move teams from fragmented evidence to structured operations.</p></div></section>

    <section className="leTrustedCompanies" aria-label="Designed for compliance-intensive industries"><p>Designed for compliance-intensive industries</p><div className="leLogoRow"><span>MANUFACTURING</span><span>AUTOMOTIVE</span><span>INDUSTRIAL</span><span>PACKAGING</span><span>METALS</span></div></section>

    <section className="leFuture"><div className="sectionIntro"><span>THE OPERATING STANDARD</span><h2>Supplier compliance infrastructure built with discipline.</h2><p>Replace fragmented spreadsheets, folders and point solutions with a controlled system designed for evidence reuse, accountability and scale.</p></div><div className="leFeatureGrid">{features.map(([num,title,description]) => <article className="leFeature" key={title}><div className="featureNumber">{num}</div><h3>{title}</h3><p>{description}</p><div className="featureLine"></div></article>)}</div></section>

    <section className="executiveSection"><div className="executiveCopy"><span className="sectionKicker">CONTROL • CLARITY • CONFIDENCE</span><h2>Turn supplier compliance into enterprise infrastructure.</h2><p>Emissa connects every requirement to the evidence, ownership, approval and supplier record behind it—giving leadership a clear view of readiness, risk and execution.</p><a className="leSecondary" href="/solutions">View solution architecture <i>↗</i></a></div><div className="executiveVisual" aria-hidden="true"><div className="goldFrame"><div className="greenCore"></div></div></div></section>

    <section className="leFuture"><div className="sectionIntro"><span>REGULATORY INTELLIGENCE</span><h2>Build operational readiness around the regulations changing supplier data.</h2><p>Use source-grounded guides to connect regulatory research to the supplier, product, facility, evidence and workflow records required to execute.</p></div><div className="leFeatureGrid">{regulatorySpotlights.map(([href,title,description],index)=><article className="leFeature" key={href}><div className="featureNumber">R{index+1}</div><h3><a href={href}>{title}</a></h3><p>{description}</p><a className="leSecondary" href={href}>Open guide <i>↗</i></a><div className="featureLine"></div></article>)}</div></section>

    <section className="leFuture"><div className="sectionIntro"><span>SUPPLIER COMPLIANCE LIBRARY</span><h2>Explore the requirement, system, role and workflow behind supplier compliance.</h2><p>Use Emissa’s growing public knowledge layer to move from research to an operational supplier compliance system.</p></div><div className="leFeatureGrid">{seoClusters.map(([href,title,description],index)=><article className="leFeature" key={href}><div className="featureNumber">{String(index+1).padStart(2,'0')}</div><h3><a href={href}>{title}</a></h3><p>{description}</p><a className="leSecondary" href={href}>Explore {title} <i>↗</i></a><div className="featureLine"></div></article>)}</div></section>

    <section className="leCta"><div><span className="sectionKicker">PRIVATE DEMONSTRATION</span><h2>See what a mature supplier compliance system looks like.</h2><p>Explore how Emissa can structure your supplier evidence, workflows and reporting around one premium operating layer.</p></div><div className="leCtaCenter"><a className="lePrimary" href="/demo">Book a private demo <span>→</span></a><div style={{marginTop:16}}><a className="leSecondary" href="/pricing">View founding plan</a></div></div><div className="leCtaVisual" aria-hidden="true"><div className="luxuryMark ctaMark"><span className="markGold"></span><span className="markGreen"></span></div></div></section>

    <footer className="leFooter">
      <div><a className="leBrand" href="/"><div className="leLogo luxuryMark"><span className="markGold"></span><span className="markGreen"></span></div><div><b>EMISSA</b><small>Supplier Compliance Infrastructure</small></div></a></div>
      <div><h4>Platform</h4><a href="/solutions/supplier-compliance-infrastructure">Overview</a><a href="/integrations">Integrations</a><a href="/docs">Documentation</a><a href="/pricing">Pricing</a><a href="/demo">Demo</a></div>
      <div><h4>Solutions</h4><a href="/solutions/supplier-due-diligence">Due Diligence</a><a href="/solutions/buyer-compliance-requests">Buyer Requests</a><a href="/solutions/supplier-evidence-management">Evidence</a><a href="/regulations">Regulatory Intelligence</a><a href="/tools">Compliance Tools</a></div>
      <div><h4>Resources</h4><a href="/resources">Guides</a><a href="/blog">Insights</a><a href="/templates">Templates</a><a href="/compare">Buyer Guides & Comparisons</a><a href="/research">Research & Benchmarks</a></div>
      <div><h4>Industries & Teams</h4><a href="/industries/manufacturing-supplier-compliance">Manufacturing</a><a href="/industries/automotive-supplier-compliance">Automotive</a><a href="/industries/packaging-epr-compliance">Packaging</a><a href="/industries/metals-cbam-compliance">Metals</a><a href="/for">Teams & Roles</a></div>
      <div><h4>Regulations</h4><a href="/regulations/espr-digital-product-passport">Digital Product Passport</a><a href="/regulations/eudr">EUDR</a><a href="/regulations/csddd">CSDDD</a><a href="/regulations/uflpa">UFLPA</a><a className="leSecondary" href="/regulations">View regulatory library</a></div>
      <div className="leLegal"><span>© 2026 Emissa Technologies, Inc. All rights reserved.</span><div className="leLegalLinks"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div>
    </footer>
  </main>;
}
