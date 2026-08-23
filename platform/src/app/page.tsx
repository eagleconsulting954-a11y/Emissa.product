// Deployment trigger: 2026-08-22
import type { Metadata } from 'next';
import LeadMagnet from '@/components/LeadMagnet';
import './marketing.css';
import './landing.css';

export const metadata: Metadata = {
  title: 'Supplier Compliance Infrastructure Software',
  description: 'Supplier compliance software for manufacturers: centralize supplier evidence, due diligence, buyer requests, product compliance, EPR, CBAM and Scope 3 workflows.',
  keywords: ['supplier compliance infrastructure','supplier compliance software','supplier compliance management software','supplier compliance platform','supplier due diligence software','supplier evidence management','enterprise supplier compliance'],
  alternates: { canonical: '/' },
  openGraph: { title: 'Emissa | Supplier Compliance Infrastructure', description: 'One operating system for supplier evidence, buyer requirements, due diligence and regulatory compliance workflows.', url: '/', type: 'website' },
  robots: { index: true, follow: true },
};

const features = [
  ['01','Centralize evidence','Create one controlled source of supplier, facility, product and regulatory evidence.'],
  ['02','Automate workflows','Run due diligence, buyer requests, Scope 3, EPR, CBAM and product compliance from one system.'],
  ['03','Prove readiness','Maintain defensible approvals, source records and audit trails for every requirement.'],
  ['04','Scale with confidence','Give enterprise teams secure infrastructure designed for multi-entity operations and integrations.'],
];

const seoClusters = [
  ['/platform','Platform Modules','Supplier 360, Evidence Vault, Workflow Studio, Regulatory Intelligence, risk, CAPA, communications and reporting.'],
  ['/software','Supplier Compliance Software','Commercial-intent guides for supplier documents, certificates, due diligence, questionnaires, audits, CAPA and onboarding.'],
  ['/product-compliance','Product Compliance','REACH, RoHS, PFAS, SCIP, conflict minerals, declarations, DPP and battery-passport operating workflows.'],
  ['/regulations','Regulatory Intelligence','CBAM, EUDR, CSDDD, Digital Product Passports, REACH, RoHS, PFAS, UFLPA, EPR and product compliance guidance.'],
  ['/integrations','Integrations','ERP, procurement, accounting, utility, fleet, data-platform and collaboration integration workflows.'],
  ['/compare','Buyer Guides','Compare supplier compliance platforms, pricing, features, build-vs-buy and adjacent software categories.'],
  ['/tools','Free Tools','Interactive maturity, certificate risk, evidence coverage, buyer request, CBAM and EUDR assessments.'],
  ['/templates','Templates','Supplier onboarding, audits, risk, REACH, RoHS, PFAS, EUDR, DPP, CAPA, CBAM and EPR structures.'],
  ['/research','Research & Benchmarks','Transparent supplier compliance benchmark definitions for evidence readiness, response performance, CAPA and data reuse.'],
  ['/regulatory-calendar','Regulatory Calendar','Selected effective dates and milestones connected to official regulatory sources and operating guidance.'],
] as const;

const regulatorySpotlights = [
  ['/regulations/espr-digital-product-passport','Digital Product Passport','Product, supplier, material and evidence data architecture for ESPR and DPP workflows.'],
  ['/regulations/eudr','EUDR','Supplier due diligence, commodity traceability, origin evidence and EU Information System readiness.'],
  ['/regulations/epr-california','California SB 54','Packaging, producer, material and source-evidence records for California EPR workflows.'],
  ['/regulations/epr-maryland','Maryland EPR','Producer, brand and covered-material workflows under current Maryland regulations.'],
] as const;

export default function MarketingHome() {
  return <main className="landingExact luxuryLanding">
    <LeadMagnet />
    <nav className="leNav">
      <a className="leBrand" href="/" aria-label="Emissa home"><div className="leLogo luxuryMark" aria-hidden="true"><span className="markGold"></span><span className="markGreen"></span></div><div><b>EMISSA</b><small>Supplier Compliance Infrastructure</small></div></a>
      <div className="leNavLinks"><a href="/platform">Platform</a><a href="/software">Software</a><a href="/regulations">Regulations</a><a href="/product-compliance">Product Compliance</a><a href="/research">Research</a><a className="login" href="/login">Log in</a><a className="demo" href="/demo">Book a private demo</a></div>
    </nav>

    <section className="leHero" id="platform">
      <div className="heroEtching" aria-hidden="true"></div>
      <div className="leHeroCopy"><p className="eyebrow">Supplier Compliance Infrastructure</p><h1>Supplier compliance,<br/><span className="leGradient">elevated.</span></h1><p className="leLead">A sophisticated operating layer for supplier evidence, buyer requirements, due diligence and regulatory workflows.</p><div className="leActions"><a className="lePrimary" href="/demo">Book a private demo <span>→</span></a><a className="leSecondary" href="/platform">Explore the platform <i>↗</i></a></div><div className="leTrusted"><span>✓</span> Built for mature compliance programs and complex supply chains</div></div>
      <div className="leVisual" aria-hidden="true"><div className="leGlow"></div><div className="luxuryHalo haloOne"></div><div className="luxuryHalo haloTwo"></div><div className="leTrail"></div><div className="leOrbit"></div><div className="leOrbit o2"></div><div className="leOrbit o3"></div><div className="leGlobe"><div className="globeMonogram"><span className="markGold"></span><span className="markGreen"></span></div></div><div className="leParticles"></div></div>
    </section>

    <section className="leStats" aria-label="Platform metrics"><div className="leStat"><span className="statLabel">Infrastructure</span><strong>1</strong><h3>supplier data layer</h3><p>Supplier, facility, product and evidence records connected in one controlled system.</p></div><div className="leStat"><span className="statLabel">Coverage</span><strong>15+</strong><h3>compliance workflows</h3><p>Buyer requests, due diligence, carbon, EPR, CBAM, product compliance and more.</p></div><div className="leStat"><span className="statLabel">Implementation</span><strong>2</strong><h3>weeks</h3><p>Guided onboarding designed to move teams from fragmented evidence to structured operations.</p></div></section>

    <section className="leTrustedCompanies" aria-label="Designed for compliance-intensive industries"><p>Designed for compliance-intensive industries</p><div className="leLogoRow"><span>MANUFACTURING</span><span>AUTOMOTIVE</span><span>INDUSTRIAL</span><span>PACKAGING</span><span>METALS</span></div></section>

    <section className="leFuture"><div className="sectionIntro"><span>THE OPERATING STANDARD</span><h2>Supplier compliance infrastructure built with discipline.</h2><p>Replace fragmented spreadsheets, folders and point solutions with a controlled system designed for evidence reuse, accountability and scale.</p></div><div className="leFeatureGrid">{features.map(([num,title,description]) => <article className="leFeature" key={title}><div className="featureNumber">{num}</div><h3>{title}</h3><p>{description}</p><div className="featureLine"></div></article>)}</div></section>

    <section className="executiveSection"><div className="executiveCopy"><span className="sectionKicker">CONTROL • CLARITY • CONFIDENCE</span><h2>Turn supplier compliance into enterprise infrastructure.</h2><p>Emissa connects every requirement to the evidence, ownership, approval and supplier record behind it—giving leadership a clear view of readiness, risk and execution.</p><a className="leSecondary" href="/platform">View platform architecture <i>↗</i></a></div><div className="executiveVisual" aria-hidden="true"><div className="goldFrame"><div className="greenCore"></div></div></div></section>

    <section className="leFuture"><div className="sectionIntro"><span>REGULATORY INTELLIGENCE</span><h2>Build operational readiness around the regulations changing supplier data.</h2><p>Use source-grounded guides to connect regulatory research to the supplier, product, facility, evidence and workflow records required to execute.</p></div><div className="leFeatureGrid">{regulatorySpotlights.map(([href,title,description],index)=><article className="leFeature" key={href}><div className="featureNumber">R{index+1}</div><h3><a href={href}>{title}</a></h3><p>{description}</p><a className="leSecondary" href={href}>Open guide <i>↗</i></a><div className="featureLine"></div></article>)}</div></section>

    <section className="leFuture"><div className="sectionIntro"><span>SUPPLIER COMPLIANCE LIBRARY</span><h2>Explore the product, requirement, system and workflow behind supplier compliance.</h2><p>Use Emissa’s public knowledge layer to move from regulatory research and operational questions into a structured supplier compliance system.</p></div><div className="leFeatureGrid">{seoClusters.map(([href,title,description],index)=><article className="leFeature" key={href}><div className="featureNumber">{String(index+1).padStart(2,'0')}</div><h3><a href={href}>{title}</a></h3><p>{description}</p><a className="leSecondary" href={href}>Explore {title} <i>↗</i></a><div className="featureLine"></div></article>)}</div></section>

    <section className="leCta"><div><span className="sectionKicker">PRIVATE DEMONSTRATION</span><h2>See what a mature supplier compliance system looks like.</h2><p>Explore how Emissa can structure your supplier evidence, workflows and reporting around one premium operating layer.</p></div><div className="leCtaCenter"><a className="lePrimary" href="/demo">Book a private demo <span>→</span></a><div style={{marginTop:16}}><a className="leSecondary" href="/pricing">View founding plan</a></div></div><div className="leCtaVisual" aria-hidden="true"><div className="luxuryMark ctaMark"><span className="markGold"></span><span className="markGreen"></span></div></div></section>

    <footer className="leFooter">
      <div><a className="leBrand" href="/"><div className="leLogo luxuryMark"><span className="markGold"></span><span className="markGreen"></span></div><div><b>EMISSA</b><small>Supplier Compliance Infrastructure</small></div></a></div>
      <div><h4>Platform</h4><a href="/platform">Modules</a><a href="/platform/supplier-360">Supplier 360</a><a href="/platform/evidence-vault">Evidence Vault</a><a href="/platform/workflow-studio">Workflow Studio</a><a href="/integrations">Integrations</a></div>
      <div><h4>Software</h4><a href="/software/supplier-compliance-software">Supplier Compliance</a><a href="/software/supplier-certificate-management-software">Certificates</a><a href="/software/supplier-due-diligence-software">Due Diligence</a><a href="/software/supplier-questionnaire-software">Questionnaires</a><a href="/compare/emissa-vs-watershed">Emissa vs Watershed</a></div>
      <div><h4>Product Compliance</h4><a href="/product-compliance/reach">REACH</a><a href="/product-compliance/rohs">RoHS</a><a href="/product-compliance/pfas">PFAS</a><a href="/product-compliance/digital-product-passports">DPP</a><a href="/product-compliance/battery-passports">Battery Passport</a></div>
      <div><h4>Resources</h4><a href="/tools">Free Tools</a><a href="/templates">Templates</a><a href="/research">Research</a><a href="/regulatory-calendar">Regulatory Calendar</a><a href="/resources">Guides</a></div>
      <div><h4>Trust</h4><a href="/security">Security</a><a href="/about/editorial-policy">Editorial Policy</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/dpa">DPA</a></div>
      <div className="leLegal"><span>© 2026 Emissa Technologies, Inc. All rights reserved.</span><div className="leLegalLinks"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div>
    </footer>
  </main>;
}
