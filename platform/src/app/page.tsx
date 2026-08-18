import LeadMagnet from '@/components/LeadMagnet';
import LegalFooter from '@/components/LegalFooter';
import FoundingSpots from '@/components/FoundingSpots';
import './marketing.css';

const capabilities = [
  ['01','Centralize supplier compliance evidence','One trusted source for supplier, facility, product, packaging and transaction evidence.'],
  ['02','Automate compliance workflows','Run Scope 3, EPR, CBAM, LCA, supplier risk and buyer-request workflows from the same data layer.'],
  ['03','Prove compliance readiness','Turn connected operational data into defensible outputs for buyers, regulators, audits and diligence.'],
  ['04','Scale supplier compliance management','Secure infrastructure for multi-facility suppliers, integrations, approvals and audit history.'],
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
        <a href="/solutions">Solutions</a>
        <a href="/industries">Industries</a>
        <a href="/blog">Blog</a>
        <a href="/pricing">Pricing</a>
        <a className="button ghostButton" href="/login">Log in</a>
        <a className="button primary" href="/demo">Book demo <span>→</span></a>
      </div>
    </nav>

    <section className="premiumHero" id="platform">
      <div className="ambient ambientOne"></div><div className="ambient ambientTwo"></div>
      <div className="heroContent">
        <p className="eyebrow">Supplier Compliance Software & Infrastructure</p>
        <h1>Supplier compliance software.<br/>One platform. <span className="gradientText">Complete compliance.</span></h1>
        <p className="heroCopy heroLead">Automate supplier compliance management, centralize evidence, respond to enterprise buyers, and run Scope 3, EPR, CBAM, product and due-diligence workflows from one connected system.</p>
        <div className="heroActions">
          <a className="button primary heroButton" href="/demo">Book a demo <span>→</span></a>
          <a className="textLink" href="/solutions/supplier-compliance-infrastructure">Explore supplier compliance infrastructure <span>◎</span></a>
        </div>
        <div className="trustLine"><span className="trustIcon">✓</span> Built for manufacturers and suppliers serving enterprise buyers and regulated markets</div>
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
      <div className="metricCard"><div className="metricIcon">◇</div><strong>1</strong><h3>supplier data layer</h3><p>Supplier + facility + product evidence</p></div>
      <div className="metricCard"><div className="metricIcon purple">⌘</div><strong className="purpleText">15+</strong><h3>compliance workflows</h3><p>Carbon, EPR, CBAM, LCA and more</p></div>
      <div className="metricCard"><div className="metricIcon">ϟ</div><strong>2</strong><h3>weeks</h3><p>Guided implementation to enterprise value</p></div>
      <div className="metricCard foundingMetric"><div className="metricIcon purple">50</div><strong><FoundingSpots compact /></strong><h3>founding access</h3><p>Live Stripe-backed availability</p></div>
    </section>

    <section className="section premiumSection" id="workflows">
      <div className="sectionHead centeredHead"><p className="eyebrow">Supplier Compliance Management Platform</p><h2>Supplier compliance infrastructure for buyer, regulatory and sustainability workflows.</h2><p className="heroCopy">Scope 3 is a supporting data foundation. Emissa uses the same connected evidence to power supplier due diligence, certificates, buyer requests, CBAM, EPR, product footprints and broader compliance operations.</p></div>
      <div className="workflowPills">{workflows.map((item)=><span key={item}>{item}</span>)}</div>
      <div className="capabilityGrid">{capabilities.map(([num,title,description])=><article className="premiumCard" key={title}><div className="cardTop"><span>{num}</span><div className="cardOrb"></div></div><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="section outcomeSection">
      <div className="outcomeVisual"><div className="miniStack"><i></i><i></i><i></i></div></div>
      <div className="outcomeCopy"><p className="eyebrow">Supplier Compliance Management Software</p><h2>Turn supplier compliance into a system that protects revenue.</h2><p className="heroCopy">Move faster on buyer requests, reduce manual work, reuse validated supplier data and maintain a defensible record of every submission, certificate and approval.</p><div className="heroActions"><a className="button primary" href="/demo">Book a demo <span>→</span></a><a className="button ghostButton" href="/solutions/supplier-due-diligence">Supplier due diligence</a></div></div>
    </section>

    <section className="section premiumSection">
      <div className="sectionHead"><p className="eyebrow">High-Intent Supplier Compliance Resources</p><h2>Learn how to build supplier compliance workflows that are easier to audit and faster to reuse.</h2></div>
      <div className="capabilityGrid">
        <article className="premiumCard"><h3><a href="/blog/what-is-supplier-compliance-infrastructure">What is supplier compliance infrastructure?</a></h3><p>Understand the operating layer behind evidence, buyer requests, due diligence and regulatory workflows.</p></article>
        <article className="premiumCard"><h3><a href="/blog/supplier-compliance-platform-buyers-guide">Supplier compliance platform buyer’s guide</a></h3><p>Compare data models, workflow controls, evidence reuse and implementation requirements.</p></article>
        <article className="premiumCard"><h3><a href="/resources/supplier-compliance-guide">Supplier compliance guide</a></h3><p>Build a practical system of record for supplier requirements, evidence, approvals and deadlines.</p></article>
        <article className="premiumCard"><h3><a href="/industries/manufacturing-supplier-compliance">Supplier compliance for manufacturers</a></h3><p>See how manufacturers can organize supplier evidence across buyer, carbon and regulatory workflows.</p></article>
      </div>
    </section>

    <section className="section pricingPreview">
      <div className="sectionHead"><p className="eyebrow">Founding plan</p><h2>Premium supplier compliance infrastructure. One full-suite subscription.</h2></div>
      <div className="pricingPreviewCard"><div><span className="priceLabel">Founding customer</span><div className="price">$3,500<span>/mo</span></div><p>Full-suite access plus a two-week implementation for the first 50 companies.</p></div><div className="pricingList">{workflows.slice(0,8).map((item)=><span key={item}>✓ {item}</span>)}</div><div className="pricingAction"><a className="button primary" href="/pricing">See pricing</a><FoundingSpots /></div></div>
    </section>

    <section className="cta premiumCta"><div><p className="eyebrow">Ready to transform supplier compliance?</p><h2>Build one supplier compliance system your team can use for every requirement.</h2></div><div className="heroActions"><a className="button primary" href="/demo">Book a demo <span>→</span></a><a className="textLink" href="/login">Customer login</a></div></section>

    <LegalFooter />
  </main>;
}
