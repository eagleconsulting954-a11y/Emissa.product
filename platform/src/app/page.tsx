import LeadMagnet from '@/components/LeadMagnet';
import './marketing.css';
import './landing.css';

const features = [
  ['◇','Centralize evidence','One trusted source for supplier, facility and product data.'],
  ['⌘','Automate workflows','15+ compliance workflows configured for leading standards and regulations.'],
  ['↗','Prove impact','Real-time dashboards and reports that drive business value.'],
  ['▣','Enterprise ready','Secure, scalable and built to integrate with your systems.'],
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
        <a href="/resources">Resources⌄</a>
        <a href="/about">Company⌄</a>
        <a className="login" href="/login">Log in</a>
        <a className="demo" href="/demo">Book demo</a>
      </div>
    </nav>

    <section className="leHero" id="platform">
      <div className="leHeroCopy">
        <h1>One platform.<br/>Complete <span className="leGradient">compliance.</span></h1>
        <p className="leLead">Automate supplier compliance.<br/>Prove impact. Drive value.</p>
        <div className="leActions">
          <a className="lePrimary" href="/demo">Book a demo <span>→</span></a>
          <a className="leSecondary" href="/solutions/supplier-compliance-infrastructure">See how it works <i>◎</i></a>
        </div>
        <div className="leTrusted"><span>✓</span> Trusted by sustainable leaders</div>
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
      <div className="leStat"><div className="leStatIcon">◇</div><strong>1</strong><h3>data layer</h3><p>Supplier + facility + product evidence</p></div>
      <div className="leStat"><div className="leStatIcon">⌘</div><strong>15+</strong><h3>workflows</h3><p>Carbon, EPR, CBAM, LCA and more</p></div>
      <div className="leStat"><div className="leStatIcon">ϟ</div><strong>2</strong><h3>weeks</h3><p>Average time to enterprise value</p></div>
    </section>

    <section className="leTrustedCompanies" aria-label="Trusted by innovative companies">
      <p>Trusted by innovative companies</p>
      <div className="leLogoRow">
        <span>Schneider<br/>Electric</span>
        <span>SAINT-GOBAIN</span>
        <span>BOSCH</span>
        <span>DANONE</span>
        <span>natura</span>
      </div>
    </section>

    <section className="leFuture">
      <h2>Built for the future of compliance</h2>
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
        <h2>Ready to transform your compliance into a competitive advantage?</h2>
        <p>See how Emissa can help your team move faster, reduce risk and drive measurable impact.</p>
      </div>
      <div className="leCtaCenter">
        <a className="lePrimary" href="/demo">Book a demo <span>→</span></a>
        <div style={{marginTop:16}}><a className="leSecondary" href="/contact">▣ Talk to an expert</a></div>
      </div>
      <div className="leCtaVisual" aria-hidden="true"><div className="leCube"></div></div>
    </section>

    <footer className="leFooter">
      <div>
        <a className="leBrand" href="/"><div className="leLogo" /><div><b>emissa.tech</b><small>Supplier Compliance Infrastructure</small></div></a>
      </div>
      <div><h4>Platform</h4><a href="#platform">Overview</a><a href="/solutions">Workflows</a><a href="/solutions">Integrations</a><a href="/security">Security</a></div>
      <div><h4>Solutions</h4><a href="/solutions/scope-3-supplier-data">Carbon</a><a href="/solutions/epr-compliance">EPR</a><a href="/solutions/cbam-compliance">CBAM</a><a href="/solutions/product-carbon-footprints">LCA</a><a href="/solutions/climate-risk">Supplier Risk</a></div>
      <div><h4>Resources</h4><a href="/resources">Docs</a><a href="/resources">Case Studies</a><a href="/blog">Blog</a><a href="/resources">Webinars</a></div>
      <div><h4>Company</h4><a href="/about">About</a><a href="/careers">Careers</a><a href="/privacy">Privacy</a><a href="/contact">Contact</a></div>
      <div><h4 style={{color:'var(--teal)'}}>Stay updated</h4><p>Insights on compliance, sustainability and the future of supply chains.</p><form className="leNewsletter" action="/api/leads" method="post"><input aria-label="Email address" name="email" type="email" placeholder="Email address"/><button aria-label="Subscribe" type="submit">→</button></form></div>
      <div className="leLegal"><span>© 2026 Emissa Technologies, Inc. All rights reserved.</span><div className="leLegalLinks"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/cookies">Cookies</a></div></div>
    </footer>
  </main>;
}
