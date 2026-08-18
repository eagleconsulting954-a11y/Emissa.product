import LeadMagnet from '@/components/LeadMagnet';
import LegalFooter from '@/components/LegalFooter';
import './marketing.css';

const features = [
  ['◎','Supplier Compliance Infrastructure','One operating layer for supplier evidence, buyer requests, regulatory obligations, deadlines and due diligence.'],
  ['🌿','Scope 3 Data Foundation','Collect, calculate and reuse supplier, spend, logistics and facility emissions data across downstream compliance workflows.'],
  ['♻','EPR & Packaging','Track packaging materials, producer obligations, evidence, fees and filing readiness across jurisdictions.'],
  ['🌐','CBAM & Trade Carbon','Connect shipment, supplier and product data to embedded-carbon workflows for EU importer requests.'],
  ['◌','Product Footprints & LCA','Build product-level environmental evidence from materials, manufacturing, logistics and end-of-life data.'],
  ['△','Risk, Certificates & Data Rooms','Manage climate risk, certificates, expiration dates, audit evidence and controlled diligence sharing.'],
];

const outcomes = [
  ['Protect revenue','Keep buyer requirements, supplier evidence and contract-critical compliance work from falling through spreadsheets and inboxes.'],
  ['Reuse the same data','Collect supplier and operational data once, then use it across Scope 3, EPR, CBAM, LCA and buyer requests.'],
  ['Move faster','Create repeatable workflows with owners, deadlines, evidence and approval history instead of rebuilding every response manually.'],
];

export default function MarketingHome() {
  return <main className="marketing">
    <LeadMagnet />
    <nav className="siteNav">
      <a className="siteBrand" href="/"><div className="siteLogo">◎</div><div><b>emissa.tech</b><small>Supplier Compliance Infrastructure</small></div></a>
      <div className="navLinks"><a href="/solutions/supplier-compliance-infrastructure">Solutions</a><a href="/demo">Demo</a><a href="/pricing">Pricing</a><a className="button" href="/login">Log in</a><a className="button primary" href="/demo">Book demo</a></div>
    </nav>

    <section className="hero">
      <div><p className="eyebrow">Supplier Compliance Infrastructure</p><h1>Turn supplier data into the <span className="gradientText">proof buyers and regulators require.</span></h1><p className="heroCopy">Emissa is the operating infrastructure for supplier compliance. Scope 3 is the data foundation. EPR, CBAM, product footprints, climate risk, certificates, buyer requests and due diligence run on top of the same connected evidence layer.</p><div className="heroActions"><a className="button primary" href="/demo">See the platform</a><a className="button" href="/pricing">View pricing</a></div><div className="heroMeta"><span>✓ Scope 3 foundation</span><span>✓ Full compliance suite</span><span>✓ Two-week implementation</span></div></div>
      <div className="visualStage"><div className="globe"></div><div className="hud one"><span>Supplier readiness</span><strong>98%</strong></div><div className="hud two"><span>Compliance workflows</span><strong>15+</strong></div><div className="hud three"><span>Founding plan</span><strong>$3,500/mo</strong></div></div>
    </section>

    <div className="proofBand"><div><strong>1 data layer</strong><span>Supplier + facility + product evidence</span></div><div><strong>15+ workflows</strong><span>Carbon, EPR, CBAM, LCA and more</span></div><div><strong>2 weeks</strong><span>Guided implementation</span></div><div><strong>50 companies</strong><span>Founding customer cohort</span></div></div>

    <section className="section"><div className="sectionHead"><p className="eyebrow">A new operating layer</p><h2>Supplier compliance should not live in disconnected point tools.</h2><p className="heroCopy">Emissa connects the data, evidence and workflows suppliers need to satisfy enterprise buyers and regulated markets without rebuilding the same response every time.</p></div><div className="grid3">{features.map(([icon,title,description])=><article className="featureCard" key={title}><div className="iconBox">{icon}</div><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="section"><div className="sectionHead"><p className="eyebrow">Built around commercial outcomes</p><h2>Compliance infrastructure that helps suppliers stay qualified.</h2></div><div className="grid3">{outcomes.map(([title,description],i)=><article className="demoCard" key={title}><div className="iconBox">0{i+1}</div><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="section" id="demo"><div className="sectionHead"><p className="eyebrow">How it works</p><h2>One workflow from source data to defensible proof.</h2></div><div className="grid3"><article className="demoCard"><h3>1. Connect</h3><p>Bring in accounting, ERP, utility, supplier, fleet, packaging, shipment and product data.</p></article><article className="demoCard"><h3>2. Validate</h3><p>Classify records, calculate impacts, identify gaps, attach evidence and route approvals.</p></article><article className="demoCard"><h3>3. Deliver</h3><p>Generate buyer-ready, regulator-ready and diligence-ready outputs from the same source data.</p></article></div><div className="heroActions"><a className="button primary" href="/demo">Open interactive demo</a><a className="button" href="/solutions/scope-3-supplier-data">See Scope 3 foundation</a></div></section>

    <section className="section" id="pricing"><div className="sectionHead"><p className="eyebrow">Premium full-suite pricing</p><h2>One subscription for the compliance infrastructure layer.</h2><p className="heroCopy">Built for mid-market and upper-mid-market suppliers that need more than a carbon calculator or supplier questionnaire portal.</p></div><div className="pricingWrap"><article className="priceCard"><h3>Everything included</h3><ul><li>Supplier compliance operating layer</li><li>Scope 1, 2 and 3 carbon accounting</li><li>Supplier evidence and buyer requests</li><li>EPR and packaging compliance</li><li>CBAM workflows</li><li>Climate risk</li><li>LCA and product footprints</li><li>Certificates and deadline tracking</li><li>Integrations and multi-facility rollups</li><li>Due-diligence data rooms</li><li>Future Emissa modules</li></ul></article><article className="priceCard featured"><p className="eyebrow">Founding customer</p><div className="price">$3,500</div><h3>per month</h3><p className="heroCopy">Full-suite access plus a two-week implementation. Founding pricing is limited to the first 50 companies. Standard full-suite pricing after the founding cohort is planned at $4,500/month.</p><a className="button primary" href="/pricing">See pricing & onboarding</a></article></div></section>

    <section className="cta"><p className="eyebrow">Scope 3 gets the data moving. Emissa runs the compliance infrastructure around it.</p><h2>Build one system your team can use for every supplier requirement.</h2><div className="heroActions" style={{justifyContent:'center'}}><a className="button primary" href="/demo">Book a product demo</a><a className="button" href="/login">Customer login</a></div></section>

    <LegalFooter />
  </main>;
}
