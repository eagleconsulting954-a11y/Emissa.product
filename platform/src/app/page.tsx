import type { Metadata } from 'next';
import LeadMagnet from '@/components/LeadMagnet';
import './marketing.css';
import './seo.css';

export const metadata: Metadata = {
  title: 'Supplier Compliance Infrastructure for Modern Supply Chains',
  description:
    'Emissa is supplier compliance infrastructure for manufacturers, exporters and enterprise suppliers. Unify Scope 3, EPR, CBAM, product carbon footprints, climate risk, supplier evidence and buyer requirements.',
  alternates: { canonical: '/' },
};

const features = [
  ['🌿','Scope 3 & Carbon Data','Use supplier, purchasing, logistics and facility data as a reusable foundation for carbon and wider compliance workflows.','/solutions/scope-3-supplier-data'],
  ['♻','EPR Compliance','Manage packaging materials, jurisdictions, evidence, deadlines and producer-responsibility workflows.','/solutions/epr-compliance'],
  ['🌐','CBAM Compliance','Connect shipment, product, facility and embedded-carbon data for supplier-side CBAM workflows.','/solutions/cbam-compliance'],
  ['◌','Product Carbon & LCA','Build product footprints from materials, manufacturing, logistics and supplier inputs.','/solutions/product-carbon-footprints'],
  ['△','Climate Risk','Map physical and transition risk across suppliers, facilities and critical operations.','/solutions/climate-risk'],
  ['◎','Supplier Evidence','Create a reusable system of record for certificates, calculations, approvals and buyer-ready evidence.','/solutions/supplier-evidence-management'],
];

export default function MarketingHome() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Emissa',
    url: process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://emissa.tech',
    description: 'Supplier compliance infrastructure for modern supply chains.',
  };

  return <main className="marketing seoPage">
    <LeadMagnet />
    <nav className="siteNav">
      <a className="siteBrand" href="/"><div className="siteLogo">◎</div><div><b>emissa.tech</b><small>Supplier Compliance Infrastructure</small></div></a>
      <div className="navLinks"><a href="/solutions/supplier-compliance-infrastructure">Platform</a><a href="/demo">Demo</a><a href="/pricing">Pricing</a><a className="button" href="/login">Log in</a><a className="button primary" href="/demo">Book demo</a></div>
    </nav>

    <section className="hero">
      <div><p className="eyebrow">Supplier Compliance Infrastructure</p><h1>Turn supplier data into the <span className="gradientText">proof buyers and regulators require.</span></h1><p className="heroCopy">Emissa gives manufacturers, exporters and enterprise suppliers one operating system for Scope 3, EPR, CBAM, product carbon footprints, climate risk, certificates, buyer requirements and compliance evidence.</p><div className="heroActions"><a className="button primary" href="/demo">See Emissa in action</a><a className="button" href="/solutions/supplier-compliance-infrastructure">Explore the platform</a></div><div className="heroMeta"><span>✓ Supplier-first compliance workflows</span><span>✓ Scope 3 as the shared data layer</span><span>✓ Full suite, one platform</span></div></div>
      <div className="visualStage"><div className="globe"></div><div className="hud one"><span>Category</span><strong>Supplier Compliance</strong></div><div className="hud two"><span>Connected workflows</span><strong>15+</strong></div><div className="hud three"><span>Founding rate</span><strong>$2,500/mo</strong></div></div>
    </section>

    <div className="proofBand"><div><strong>1 data layer</strong><span>Supplier, facility, product and evidence records</span></div><div><strong>15+ workflows</strong><span>Carbon, packaging, trade, product and risk</span></div><div><strong>2 weeks</strong><span>Guided customer implementation</span></div><div><strong>50 spots</strong><span>Founding customer program</span></div></div>

    <section className="section"><div className="sectionHead"><p className="eyebrow">The category</p><h2>Not another carbon dashboard. The infrastructure behind supplier compliance.</h2><p className="heroCopy">Most companies do not have separate Scope 3, EPR, CBAM, product and buyer-request problems. They have one underlying problem: the same operational and supplier data must be collected, validated and repackaged over and over. Emissa turns that work into a connected system.</p></div><div className="grid3"><article className="demoCard"><h3>1. Collect once</h3><p>Connect accounting, ERP, utility, supplier, fleet, packaging, shipment and product data.</p></article><article className="demoCard"><h3>2. Validate once</h3><p>Track owners, evidence, calculations, approvals, deadlines and missing information.</p></article><article className="demoCard"><h3>3. Reuse everywhere</h3><p>Deliver buyer-, auditor-, regulator- and diligence-ready outputs from the same controlled data layer.</p></article></div></section>

    <section className="section"><div className="sectionHead"><p className="eyebrow">Scope 3 is the foundation</p><h2>Start with supplier carbon data. Expand into the workflows that protect revenue.</h2><p className="heroCopy">Scope 3 creates the supplier, purchasing, logistics and product data graph. Emissa reuses that foundation across adjacent compliance requirements instead of forcing teams to rebuild the same evidence in point solutions.</p></div><div className="grid3">{features.map(([icon,title,description,href])=><article className="featureCard" key={title}><div className="iconBox">{icon}</div><h3>{title}</h3><p>{description}</p><a className="button" href={href}>Explore {title}</a></article>)}</div></section>

    <section className="section"><div className="sectionHead"><p className="eyebrow">Built for the supplier side</p><h2>For companies that cannot afford to treat compliance as a series of fire drills.</h2></div><div className="landingModules"><article className="landingModule"><h3>Industrial manufacturers</h3><p>Unify supplier emissions, facilities, product data and buyer evidence.</p></article><article className="landingModule"><h3>Exporters</h3><p>Connect shipment and production records to CBAM and customer requirements.</p></article><article className="landingModule"><h3>Packaging-intensive suppliers</h3><p>Manage EPR materials, evidence, deadlines and fee exposure.</p></article><article className="landingModule"><h3>Enterprise suppliers</h3><p>Respond faster to recurring buyer questionnaires, certificates and due diligence.</p></article></div></section>

    <section className="section"><div className="sectionHead"><p className="eyebrow">Core SEO solution areas</p><h2>One supplier compliance platform. Multiple high-value workflows.</h2></div><div className="landingModules"><div className="landingModule"><a href="/solutions/supplier-compliance-infrastructure">Supplier Compliance Infrastructure →</a><p>System-of-record positioning for the full Emissa platform.</p></div><div className="landingModule"><a href="/solutions/scope-3-supplier-data">Scope 3 Supplier Data →</a><p>Supplier carbon data, verification and reuse.</p></div><div className="landingModule"><a href="/solutions/cbam-compliance">CBAM Compliance →</a><p>Embedded-carbon and exporter workflows.</p></div><div className="landingModule"><a href="/solutions/epr-compliance">EPR Compliance →</a><p>Packaging and producer-responsibility workflows.</p></div><div className="landingModule"><a href="/solutions/product-carbon-footprints">Product Carbon Footprints →</a><p>LCA and product-level environmental data.</p></div><div className="landingModule"><a href="/solutions/climate-risk">Supplier Climate Risk →</a><p>Facility and supply-chain risk intelligence.</p></div><div className="landingModule"><a href="/solutions/supplier-evidence-management">Supplier Evidence Management →</a><p>Certificates, calculations, approvals and documentation.</p></div><div className="landingModule"><a href="/solutions/compliance-data-rooms">Compliance Data Rooms →</a><p>Controlled buyer, auditor and diligence evidence sharing.</p></div></div></section>

    <section className="section" id="demo"><div className="sectionHead"><p className="eyebrow">GTM message</p><h2>Protect revenue by staying ready for the next buyer or regulatory requirement.</h2><p className="heroCopy">The Emissa sales motion starts with the requirement creating urgency today, then expands into adjacent workflows that reuse the same supplier data.</p></div><div className="grid3"><article className="demoCard"><h3>Buyer request</h3><p>Turn recurring sustainability, supplier and product requests into reusable evidence workflows.</p></article><article className="demoCard"><h3>Regulatory trigger</h3><p>Map EPR, CBAM, climate, certificate and deadline requirements to owners and data.</p></article><article className="demoCard"><h3>Operational scale</h3><p>Replace spreadsheets and point tools with connected workflows across departments and facilities.</p></article></div><div className="heroActions"><a className="button primary" href="/demo">Book a supplier compliance demo</a></div></section>

    <section className="section" id="pricing"><div className="sectionHead"><p className="eyebrow">Simple founding pricing</p><h2>One subscription. The complete supplier compliance suite.</h2></div><div className="pricingWrap"><article className="priceCard"><h3>What is included</h3><ul><li>Scope 1, 2 and 3 carbon data</li><li>Supplier evidence management</li><li>EPR and packaging compliance</li><li>CBAM workflows</li><li>Product carbon footprints and LCA</li><li>Climate risk</li><li>Supplier network and data rooms</li><li>Certificates, deadlines and integrations</li></ul></article><article className="priceCard featured"><p className="eyebrow">Founding customer</p><div className="price">$2,500</div><h3>per month</h3><p className="heroCopy">Full suite access plus a two-week dashboard implementation. Limited to the first 50 founding customers.</p><a className="button primary" href="/pricing">See pricing & onboarding</a></article></div></section>

    <section className="cta"><p className="eyebrow">The system of record for supplier compliance</p><h2>Collect the data once. Prove compliance everywhere.</h2><div className="heroActions" style={{justifyContent:'center'}}><a className="button primary" href="/demo">Book a product demo</a><a className="button" href="/login">Customer login</a></div></section>

    <footer className="footer"><span>© 2026 Emissa.tech</span><span>Supplier Compliance Infrastructure • Scope 3 • EPR • CBAM • Product Carbon • Climate Risk</span></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
  </main>;
}
