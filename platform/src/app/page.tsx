import LeadMagnet from '@/components/LeadMagnet';
import LegalFooter from '@/components/LegalFooter';
import FoundingSpots from '@/components/FoundingSpots';
import './marketing.css';

const capabilities = [
  ['01','Centralize evidence','One trusted source for supplier, facility, product, packaging and transaction evidence.'],
  ['02','Automate workflows','Run Scope 3, EPR, CBAM, LCA, supplier risk and buyer-request workflows from the same data layer.'],
  ['03','Prove impact','Turn connected operational data into defensible outputs for buyers, regulators, audits and diligence.'],
  ['04','Enterprise ready','Secure, scalable infrastructure built for multi-facility suppliers, integrations, approvals and audit history.'],
];

const workflows = ['Scope 1, 2 & 3','Supplier evidence','EPR & packaging','CBAM','LCA & product footprints','Climate risk','Certificates','Buyer requests','Due diligence','Data rooms'];

export default function MarketingHome() {
  return <main className="marketing premiumMarketing">
    <LeadMagnet />

    <nav className="siteNav premiumNav">
      <a className="siteBrand" href="/" aria-label="Emissa home">
        <div className="siteLogo premiumLogo"><span></span></div>
        <div><b>emissa.tech</b><small>Supplier Compliance Infrastructure</small></div>
      </a>
      <div className="navLinks">
        <a href="#platform">Platform</a>
        <a href="/solutions/supplier-compliance-infrastructure">Solutions</a>
        <a href="#workflows">Workflows</a>
        <a href="/pricing">Pricing</a>
        <a className="button ghostButton" href="/login">Log in</a>
        <a className="button primary" href="/demo">Book demo <span>→</span></a>
      </div>
    </nav>

    <section className="premiumHero" id="platform">
      <div className="ambient ambientOne"></div><div className="ambient ambientTwo"></div>
      <div className="heroContent">
        <p className="eyebrow">Supplier Compliance Infrastructure</p>
        <h1>One platform.<br/>Complete <span className="gradientText">compliance.</span></h1>
        <p className="heroCopy heroLead">Automate supplier compliance. Centralize evidence. Prove impact. Protect revenue.</p>
        <div className="heroActions">
          <a className="button primary heroButton" href="/demo">Book a demo <span>→</span></a>
          <a className="textLink" href="#workflows">See how it works <span>◎</span></a>
        </div>
        <div className="trustLine"><span className="trustIcon">✓</span> Built for suppliers serving enterprise buyers and regulated markets</div>
      </div>

      <div className="orbitalVisual" aria-hidden="true">
        <div className="orbitGlow"></div>
        <div className="orbit orbitA"></div>
        <div className="orbit orbitB"></div>
        <div className="orbit orbitC"></div>
        <div className="dataGlobe">
          <div className="globeGrid"></div>
          <div className="globeGlow"></div>
          <span className="pulseDot dotA"></span><span className="pulseDot dotB"></span><span className="pulseDot dotC"></span>
        </div>
        <div className="particleField"></div>
      </div>
    </section>

    <section className="metricShell" aria-label="Platform metrics">
      <div className="metricCard"><div className="metricIcon">◇</div><strong>1</strong><h3>data layer</h3><p>Supplier + facility + product evidence</p></div>
      <div className="metricCard"><div className="metricIcon purple">⌘</div><strong className="purpleText">15+</strong><h3>workflows</h3><p>Carbon, EPR, CBAM, LCA and more</p></div>
      <div className="metricCard"><div className="metricIcon">ϟ</div><strong>2</strong><h3>weeks</h3><p>Guided implementation to enterprise value</p></div>
      <div className="metricCard foundingMetric"><div className="metricIcon purple">50</div><strong><FoundingSpots compact /></strong><h3>founding access</h3><p>Live Stripe-backed availability</p></div>
    </section>

    <section className="section premiumSection" id="workflows">
      <div className="sectionHead centeredHead"><p className="eyebrow">Built for the future of compliance</p><h2>One connected system instead of a stack of point tools.</h2><p className="heroCopy">Scope 3 is the foundation. Emissa uses the same connected evidence to power the rest of supplier compliance.</p></div>
      <div className="workflowPills">{workflows.map((item)=><span key={item}>{item}</span>)}</div>
      <div className="capabilityGrid">{capabilities.map(([num,title,description])=><article className="premiumCard" key={title}><div className="cardTop"><span>{num}</span><div className="cardOrb"></div></div><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="section outcomeSection">
      <div className="outcomeVisual"><div className="miniStack"><i></i><i></i><i></i></div></div>
      <div className="outcomeCopy"><p className="eyebrow">Commercial outcome</p><h2>Turn compliance into a competitive advantage.</h2><p className="heroCopy">Move faster on buyer requests, reduce manual work, reuse validated supplier data and create a defensible record of every submission.</p><div className="heroActions"><a className="button primary" href="/demo">Book a demo <span>→</span></a><a className="button ghostButton" href="/pricing">View pricing</a></div></div>
    </section>

    <section className="section pricingPreview">
      <div className="sectionHead"><p className="eyebrow">Founding plan</p><h2>Premium infrastructure. One full-suite subscription.</h2></div>
      <div className="pricingPreviewCard"><div><span className="priceLabel">Founding customer</span><div className="price">$3,500<span>/mo</span></div><p>Full-suite access plus a two-week implementation for the first 50 companies.</p></div><div className="pricingList">{workflows.slice(0,8).map((item)=><span key={item}>✓ {item}</span>)}</div><div className="pricingAction"><a className="button primary" href="/pricing">See pricing</a><FoundingSpots /></div></div>
    </section>

    <section className="cta premiumCta"><div><p className="eyebrow">Ready to transform supplier compliance?</p><h2>Build one system your team can use for every requirement.</h2></div><div className="heroActions"><a className="button primary" href="/demo">Book a demo <span>→</span></a><a className="textLink" href="/login">Customer login</a></div></section>

    <LegalFooter />
  </main>;
}
