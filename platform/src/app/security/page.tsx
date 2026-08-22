import type { Metadata } from 'next';
import '../seo.css';

export const metadata:Metadata={
  title:'Security and Trust',
  description:'Emissa security and trust overview for supplier compliance teams, including tenant controls, administrative protection, data handling boundaries and procurement review guidance.',
  alternates:{canonical:'/security'},
  robots:{index:true,follow:true},
  openGraph:{type:'website',title:'Emissa Security and Trust',description:'Security and trust controls for Emissa Supplier Compliance Infrastructure.',url:'/security'},
};

const controls=[
  ['Tenant-aware application access','Production product workflows are designed around organization membership and tenant-scoped records so customer data is separated by organization context.'],
  ['Protected administrative routes','Administrative application and API routes are protected separately from public marketing and knowledge pages.'],
  ['HTTPS transport','Production traffic is served over HTTPS through the hosting layer so data is encrypted in transit between supported browsers and the application endpoint.'],
  ['Payment-data boundary','Stripe handles payment processing. Emissa application code uses Stripe identifiers and subscription state rather than storing full payment-card numbers.'],
  ['Audit-oriented records','Compliance workflows are designed to preserve ownership, timestamps, evidence relationships and audit events so operational decisions remain traceable.'],
  ['Least-claim security posture','Emissa does not represent the application itself as SOC 2 certified unless and until a completed audit supports that claim.'],
] as const;

export default function SecurityPage(){
  const schema={'@context':'https://schema.org','@type':'WebPage',name:'Emissa Security and Trust',url:'https://emissa.tech/security',about:{'@type':'SoftwareApplication',name:'Emissa',applicationCategory:'BusinessApplication'}};
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/platform">Platform</a><a href="/software">Software</a><a href="/docs">Documentation</a><a href="/privacy">Privacy</a><a href="/demo">Demo</a></div></nav>
    <article>
      <header className="seoHero compact"><span className="seoKicker">Security & Trust</span><h1>Security controls designed for supplier compliance operations.</h1><p>Emissa handles supplier, evidence and compliance workflow data. The security model is built around controlled application access, tenant-aware records, protected administrative routes and clear boundaries with infrastructure and payment providers.</p><div className="seoActions"><a className="seoPrimary" href="/demo">Discuss a security review</a><a className="seoSecondary" href="/privacy">Privacy policy</a></div></header>
      <section className="seoGrid three">{controls.map(([title,body])=><article className="seoCard" key={title}><h2>{title}</h2><p>{body}</p></article>)}</section>
      <section className="seoSection"><span className="seoKicker">Procurement review</span><h2>What a buyer should verify during diligence.</h2><p>Enterprise security review should cover data categories, tenancy, authentication, subprocessors, retention, incident procedures, backup and recovery expectations, access-control design and the exact production integrations enabled for the customer environment. Emissa can address those questions during implementation and procurement review.</p></section>
      <section className="seoSection"><span className="seoKicker">Compliance boundary</span><h2>Infrastructure attestations are not the same as application certification.</h2><p>Cloud, database and payment providers may maintain their own security attestations. Those provider attestations should not be presented as an Emissa application certification. Emissa will only publish an application-level certification after the applicable audit or assessment has been completed.</p></section>
      <section className="seoSection"><h2>Related trust resources</h2><div className="seoActions"><a className="seoSecondary" href="/privacy">Privacy</a><a className="seoSecondary" href="/terms">Terms</a><a className="seoSecondary" href="/dpa">Data Processing Agreement</a><a className="seoSecondary" href="/about/editorial-policy">Editorial policy</a></div></section>
      <section className="seoCta"><h2>Need a supplier-security or procurement review?</h2><p>Use a private demonstration to review the product architecture, data boundaries and implementation controls relevant to your environment.</p><a className="seoPrimary" href="/demo">Book a private demo</a></section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  </main>;
}
