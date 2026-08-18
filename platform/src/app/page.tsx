import type { Metadata } from 'next';
import LeadMagnet from '@/components/LeadMagnet';
import './marketing.css';
import './landing.css';

export const metadata: Metadata = {
  title: 'Supplier Compliance Software & Infrastructure',
  description: 'Supplier compliance software for manufacturers and enterprise suppliers. Centralize evidence, automate buyer requirements, due diligence, Scope 3, EPR, CBAM, product compliance and supplier risk workflows.',
  keywords: [
    'supplier compliance software',
    'supplier compliance infrastructure',
    'supplier compliance management software',
    'supplier compliance platform',
    'supply chain compliance software',
    'supplier due diligence software',
    'supplier evidence management',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Supplier Compliance Software & Infrastructure | Emissa',
    description: 'One operating system for supplier evidence, buyer requirements, due diligence and regulatory compliance workflows.',
    url: '/',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const features = [
  ['◇','Centralize evidence','One trusted source for supplier, facility and product data.'],
  ['⌘','Automate workflows','Run supplier due diligence, buyer requests, Scope 3, EPR, CBAM and product compliance workflows.'],
  ['↗','Prove readiness','Create defensible evidence trails for buyers, auditors and regulatory requirements.'],
  ['▣','Enterprise ready','Secure, scalable infrastructure designed to integrate with operational systems.'],
];

export default function MarketingHome() {
  return <main className="landingExact">
    <LeadMagnet />

    <nav className="leNav">
      <a className="leBrand" href="/" aria-label="Emissa home">
        <div className="leLogo" aria-hidden="true" />
        <div><b>emissa.tech</b><small>Supplier Compliance Infrastructure</small></div>
      </a>
      <div className="leNavLinks">
        <a href="#platform">Platform</a>
        <a href="/solutions">Solutions⌄</a>
        <a href="/industries">Industries⌄</a>
        <a href="/resources">Resources⌄</a>
        <a href="/blog">Blog</a>
        <a className="login" href="/login">Log in</a>
        <a className="demo" href="/demo">Book demo</a>
      </div>
    </nav>

    <section className="leHero" id="platform">
      <div className="leHeroCopy">
        <p className="eyebrow">Supplier Compliance Software</p>
        <h1>Supplier compliance infrastructure.<br/>One platform. <span className="leGradient">Complete compliance.</span></h1>
        <p className="leLead">Centralize supplier evidence. Automate compliance workflows. Respond to buyers faster.</p>
        <div className="leActions">
          <a className="lePrimary" href="/demo">Book a demo <span>→</span></a>
          <a className="leSecondary" href="/solutions/supplier-compliance-infrastructure">Explore supplier compliance software <i>◎</i></a>
        </div>
        <div className="leTrusted"><span>✓</span> Built for manufacturers, exporters and enterprise suppliers</div>
      </div>

      <div className="leVisual" aria-hidden="true">
        <div className="leGlow"></div>
        <div className="leTrail"></div>
        <div className="leOrbit"></div>
        <div className="leOrbit o2"></div>
        <div className="leOrbit o3"></div>
        <div className="leGlobe"></div>
        <div className="leParticles"></div>
      </div>
    </section>

    <section className="leStats" aria-label="Platform metrics">
      <div className="leStat"><div className="leStatIcon">◇</div><strong>1</strong><h3>supplier data layer</h3><p>Supplier + facility + product evidence</p></div>
      <div className="leStat"><div className="leStatIcon">⌘</div><strong>15+</strong><h3>compliance workflows</h3><p>Buyer requests, due diligence, carbon, EPR, CBAM and more</p></div>
      <div className="leStat"><div className="leStatIcon">ϟ</div><strong>2</strong><h3>weeks</h3><p>Guided implementation target</p></div>
    </section>

    <section className="leTrustedCompanies" aria-label="Designed for supplier compliance teams">
      <p>Designed for compliance-intensive supply chains</p>
      <div className="leLogoRow">
        <span>MANUFACTURING</span>
        <span>AUTOMOTIVE</span>
        <span>INDUSTRIAL</span>
        <span>PACKAGING</span>
        <span>METALS</span>
      </div>
    </section>

    <section className="leFuture">
      <h2>Supplier compliance management software built for connected workflows</h2>
      <div className="leFeatureGrid">
        {features.map(([icon,title,description]) => <article className="leFeature" key={title}>
          <div className="leFeatureIcon">{icon}</div>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>)}
      </div>
    </section>

    <section className="leCta">
      <div>
        <h2>Turn supplier compliance into a repeatable operating system.</h2>
        <p>See how Emissa connects supplier evidence, due diligence, buyer requirements and regulatory workflows in one platform.</p>
      </div>
      <div className="leCtaCenter">
        <a className="lePrimary" href="/demo">Book a demo <span>→</span></a>
        <div style={{marginTop:16}}><a className="leSecondary" href="/pricing">View pricing</a></div>
      </div>
      <div className="leCtaVisual" aria-hidden="true"><div className="leCube"></div></div>
    </section>

    <footer className="leFooter">
      <div>
        <a className="leBrand" href="/"><div className="leLogo" /><div><b>emissa.tech</b><small>Supplier Compliance Infrastructure</small></div></a>
      </div>
      <div><h4>Platform</h4><a href="/solutions/supplier-compliance-infrastructure">Overview</a><a href="/solutions">Workflows</a><a href="/pricing">Pricing</a><a href="/demo">Demo</a></div>
      <div><h4>Solutions</h4><a href="/solutions/supplier-due-diligence">Due Diligence</a><a href="/solutions/buyer-compliance-requests">Buyer Requests</a><a href="/solutions/supplier-evidence-management">Evidence</a><a href="/solutions/cbam-compliance">CBAM</a><a href="/solutions/epr-compliance">EPR</a></div>
      <div><h4>Resources</h4><a href="/resources">Guides</a><a href="/blog">Blog</a><a href="/resources/supplier-compliance-guide">Supplier Compliance Guide</a><a href="/blog/supplier-compliance-platform-buyers-guide">Buyer’s Guide</a></div>
      <div><h4>Industries</h4><a href="/industries/manufacturing-supplier-compliance">Manufacturing</a><a href="/industries/automotive-supplier-compliance">Automotive</a><a href="/industries/packaging-epr-compliance">Packaging</a><a href="/industries/metals-cbam-compliance">Metals</a></div>
      <div><h4 style={{color:'var(--teal)'}}>Explore Emissa</h4><p>Supplier compliance infrastructure for evidence, buyer requests, due diligence and regulatory workflows.</p><a className="leSecondary" href="/demo">Book a demo</a></div>
      <div className="leLegal"><span>© 2026 Emissa Technologies, Inc. All rights reserved.</span><div className="leLegalLinks"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div>
    </footer>
  </main>;
}
