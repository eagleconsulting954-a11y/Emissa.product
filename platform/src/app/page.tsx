import type { Metadata } from 'next';
import LeadMagnet from '@/components/LeadMagnet';
import './marketing.css';
import './landing.css';

export const metadata: Metadata = {
  title: 'Supplier Compliance Infrastructure Software',
  description: 'Premium supplier compliance infrastructure for manufacturers and enterprise suppliers. Centralize evidence, automate due diligence, buyer requests, Scope 3, EPR, CBAM and product compliance workflows.',
  keywords: [
    'supplier compliance infrastructure',
    'supplier compliance software',
    'supplier compliance management software',
    'supplier compliance platform',
    'supplier due diligence software',
    'supplier evidence management',
    'enterprise supplier compliance',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Emissa | Supplier Compliance Infrastructure',
    description: 'One refined operating system for supplier evidence, buyer requirements, due diligence and regulatory compliance workflows.',
    url: '/',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const features = [
  ['01','Centralize evidence','Create one controlled source of supplier, facility, product and regulatory evidence.'],
  ['02','Automate workflows','Run due diligence, buyer requests, Scope 3, EPR, CBAM and product compliance from one system.'],
  ['03','Prove readiness','Maintain defensible approvals, source records and audit trails for every requirement.'],
  ['04','Scale with confidence','Give enterprise teams secure infrastructure designed for multi-entity operations and integrations.'],
];

export default function MarketingHome() {
  return <main className="landingExact luxuryLanding">
    <LeadMagnet />

    <nav className="leNav">
      <a className="leBrand" href="/" aria-label="Emissa home">
        <div className="leLogo luxuryMark" aria-hidden="true"><span className="markGold"></span><span className="markGreen"></span></div>
        <div><b>EMISSA</b><small>Supplier Compliance Infrastructure</small></div>
      </a>
      <div className="leNavLinks">
        <a href="#platform">Platform</a>
        <a href="/solutions">Solutions</a>
        <a href="/industries">Industries</a>
        <a href="/resources">Resources</a>
        <a href="/blog">Insights</a>
        <a className="login" href="/login">Log in</a>
        <a className="demo" href="/demo">Book a private demo</a>
      </div>
    </nav>

    <section className="leHero" id="platform">
      <div className="heroEtching" aria-hidden="true"></div>
      <div className="leHeroCopy">
        <p className="eyebrow">Supplier Compliance Infrastructure</p>
        <h1>Compliance,<br/><span className="leGradient">elevated.</span></h1>
        <p className="leLead">A sophisticated operating layer for supplier evidence, buyer requirements, due diligence and regulatory workflows.</p>
        <div className="leActions">
          <a className="lePrimary" href="/demo">Book a private demo <span>→</span></a>
          <a className="leSecondary" href="/solutions/supplier-compliance-infrastructure">Explore the platform <i>↗</i></a>
        </div>
        <div className="leTrusted"><span>✓</span> Built for mature compliance programs and complex supply chains</div>
      </div>

      <div className="leVisual" aria-hidden="true">
        <div className="leGlow"></div>
        <div className="luxuryHalo haloOne"></div>
        <div className="luxuryHalo haloTwo"></div>
        <div className="leTrail"></div>
        <div className="leOrbit"></div>
        <div className="leOrbit o2"></div>
        <div className="leOrbit o3"></div>
        <div className="leGlobe"><div className="globeMonogram"><span className="markGold"></span><span className="markGreen"></span></div></div>
        <div className="leParticles"></div>
      </div>
    </section>

    <section className="leStats" aria-label="Platform metrics">
      <div className="leStat"><span className="statLabel">Infrastructure</span><strong>1</strong><h3>supplier data layer</h3><p>Supplier, facility, product and evidence records connected in one controlled system.</p></div>
      <div className="leStat"><span className="statLabel">Coverage</span><strong>15+</strong><h3>compliance workflows</h3><p>Buyer requests, due diligence, carbon, EPR, CBAM, product compliance and more.</p></div>
      <div className="leStat"><span className="statLabel">Implementation</span><strong>2</strong><h3>weeks</h3><p>Guided onboarding designed to move teams from fragmented evidence to structured operations.</p></div>
    </section>

    <section className="leTrustedCompanies" aria-label="Designed for compliance-intensive industries">
      <p>Designed for compliance-intensive industries</p>
      <div className="leLogoRow">
        <span>MANUFACTURING</span><span>AUTOMOTIVE</span><span>INDUSTRIAL</span><span>PACKAGING</span><span>METALS</span>
      </div>
    </section>

    <section className="leFuture">
      <div className="sectionIntro"><span>THE OPERATING STANDARD</span><h2>Supplier compliance infrastructure built with discipline.</h2><p>Replace fragmented spreadsheets, folders and point solutions with a controlled system designed for evidence reuse, accountability and scale.</p></div>
      <div className="leFeatureGrid">
        {features.map(([num,title,description]) => <article className="leFeature" key={title}>
          <div className="featureNumber">{num}</div>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="featureLine"></div>
        </article>)}
      </div>
    </section>

    <section className="executiveSection">
      <div className="executiveCopy"><span className="sectionKicker">CONTROL • CLARITY • CONFIDENCE</span><h2>Turn supplier compliance into enterprise infrastructure.</h2><p>Emissa connects every requirement to the evidence, ownership, approval and supplier record behind it—giving leadership a clear view of readiness, risk and execution.</p><a className="leSecondary" href="/solutions">View solution architecture <i>↗</i></a></div>
      <div className="executiveVisual" aria-hidden="true"><div className="goldFrame"><div className="greenCore"></div></div></div>
    </section>

    <section className="leCta">
      <div><span className="sectionKicker">PRIVATE DEMONSTRATION</span><h2>See what a mature supplier compliance system looks like.</h2><p>Explore how Emissa can structure your supplier evidence, workflows and reporting around one premium operating layer.</p></div>
      <div className="leCtaCenter"><a className="lePrimary" href="/demo">Book a private demo <span>→</span></a><div style={{marginTop:16}}><a className="leSecondary" href="/pricing">View founding plan</a></div></div>
      <div className="leCtaVisual" aria-hidden="true"><div className="luxuryMark ctaMark"><span className="markGold"></span><span className="markGreen"></span></div></div>
    </section>

    <footer className="leFooter">
      <div><a className="leBrand" href="/"><div className="leLogo luxuryMark"><span className="markGold"></span><span className="markGreen"></span></div><div><b>EMISSA</b><small>Supplier Compliance Infrastructure</small></div></a></div>
      <div><h4>Platform</h4><a href="/solutions/supplier-compliance-infrastructure">Overview</a><a href="/solutions">Workflows</a><a href="/pricing">Pricing</a><a href="/demo">Demo</a></div>
      <div><h4>Solutions</h4><a href="/solutions/supplier-due-diligence">Due Diligence</a><a href="/solutions/buyer-compliance-requests">Buyer Requests</a><a href="/solutions/supplier-evidence-management">Evidence</a><a href="/solutions/cbam-compliance">CBAM</a><a href="/solutions/epr-compliance">EPR</a></div>
      <div><h4>Resources</h4><a href="/resources">Guides</a><a href="/blog">Insights</a><a href="/resources/supplier-compliance-guide">Supplier Compliance Guide</a><a href="/blog/supplier-compliance-platform-buyers-guide">Buyer’s Guide</a></div>
      <div><h4>Industries</h4><a href="/industries/manufacturing-supplier-compliance">Manufacturing</a><a href="/industries/automotive-supplier-compliance">Automotive</a><a href="/industries/packaging-epr-compliance">Packaging</a><a href="/industries/metals-cbam-compliance">Metals</a></div>
      <div><h4>Emissa</h4><p>Premium supplier compliance infrastructure for organizations that value control, clarity and scale.</p><a className="leSecondary" href="/demo">Book a private demo</a></div>
      <div className="leLegal"><span>© 2026 Emissa Technologies, Inc. All rights reserved.</span><div className="leLegalLinks"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div>
    </footer>
  </main>;
}
