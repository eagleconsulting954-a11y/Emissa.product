import LeadMagnet from '@/components/LeadMagnet';
import './marketing.css';

const features = [
  ['🌿','Carbon Accounting','Scope 1, 2 and 3 accounting with evidence, facilities and reporting workflows.'],
  ['♻','EPR Compliance','Packaging obligations, materials, fees, certificates and filing deadlines.'],
  ['🌐','CBAM','Shipment-level embedded carbon and importer-ready declaration workflows.'],
  ['△','Climate Risk','Physical and transition risk across facilities, suppliers and operations.'],
  ['◌','LCA Studio','Product footprints, lifecycle stages and supplier comparisons.'],
  ['◎','Supplier Network','Buyer requests, supplier collection, secure sharing and due diligence.'],
];

export default function MarketingHome() {
  return <main className="marketing">
    <LeadMagnet />
    <nav className="siteNav">
      <a className="siteBrand" href="/"><div className="siteLogo">◎</div><div><b>emissa.tech</b><small>Compliance OS</small></div></a>
      <div className="navLinks"><a href="/demo">Demo</a><a href="/pricing">Pricing</a><a className="button" href="/login">Log in</a><a className="button primary" href="/pricing">Get started</a></div>
    </nav>

    <section className="hero">
      <div><p className="eyebrow">The operating system for supplier compliance</p><h1>Turn sustainability compliance into a <span className="gradientText">connected workflow.</span></h1><p className="heroCopy">Emissa brings carbon accounting, EPR, CBAM, climate risk, LCA, supplier data, certificates, deadlines, integrations, marketplaces and secure data rooms into one modern platform.</p><div className="heroActions"><a className="button primary" href="/demo">See the product demo</a><a className="button" href="/pricing">View pricing</a></div><div className="heroMeta"><span>✓ Full suite included</span><span>✓ Two-week onboarding</span><span>✓ Built for mid-market suppliers</span></div></div>
      <div className="visualStage"><div className="globe"></div><div className="hud one"><span>Compliance readiness</span><strong>98%</strong></div><div className="hud two"><span>Connected modules</span><strong>15+</strong></div><div className="hud three"><span>Founding rate</span><strong>$2,500/mo</strong></div></div>
    </section>

    <div className="proofBand"><div><strong>1 platform</strong><span>Corporate + product compliance</span></div><div><strong>15+ modules</strong><span>Core, EPR, CBAM, LCA and more</span></div><div><strong>2 weeks</strong><span>Guided dashboard onboarding</span></div><div><strong>50 spots</strong><span>Founding customer program</span></div></div>

    <section className="section"><div className="sectionHead"><p className="eyebrow">Everything connected</p><h2>Replace disconnected spreadsheets and point tools.</h2><p className="heroCopy">One source of truth for emissions, supplier evidence, product data, regulatory obligations and buyer requests.</p></div><div className="grid3">{features.map(([icon,title,description])=><article className="featureCard" key={title}><div className="iconBox">{icon}</div><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="section" id="demo"><div className="sectionHead"><p className="eyebrow">Demo</p><h2>See how Emissa turns compliance into an operating workflow.</h2></div><div className="grid3"><article className="demoCard"><h3>1. Connect</h3><p>Bring in accounting, ERP, utility, supplier, fleet and packaging data.</p></article><article className="demoCard"><h3>2. Validate</h3><p>Organize records, identify gaps, calculate impacts and attach evidence.</p></article><article className="demoCard"><h3>3. Deliver</h3><p>Generate buyer-ready, regulator-ready and diligence-ready outputs from the same data.</p></article></div><div className="heroActions"><a className="button primary" href="/demo">Open interactive demo</a></div></section>

    <section className="section" id="pricing"><div className="sectionHead"><p className="eyebrow">Simple pricing</p><h2>One subscription. The complete suite.</h2></div><div className="pricingWrap"><article className="priceCard"><h3>What is included</h3><ul><li>Carbon accounting and Scope 3</li><li>EPR and packaging compliance</li><li>CBAM workflows</li><li>Climate risk</li><li>LCA and product footprints</li><li>Supplier network and data rooms</li><li>Certificates, deadlines and integrations</li><li>Future Emissa modules</li></ul></article><article className="priceCard featured"><p className="eyebrow">Founding customer</p><div className="price">$2,500</div><h3>per month</h3><p className="heroCopy">Full suite access plus a two-week dashboard implementation. Limited to the first 50 founding customers.</p><a className="button primary" href="/pricing">See pricing & onboarding</a></article></div></section>

    <section className="cta"><p className="eyebrow">Built for suppliers under pressure to prove compliance</p><h2>Move from reactive reporting to a system your team can run every day.</h2><div className="heroActions" style={{justifyContent:'center'}}><a className="button primary" href="/demo">Book a product demo</a><a className="button" href="/login">Customer login</a></div></section>

    <footer className="footer"><span>© 2026 Emissa.tech</span><span>Carbon • EPR • CBAM • Climate Risk • LCA • Supplier Compliance</span></footer>
  </main>;
}
