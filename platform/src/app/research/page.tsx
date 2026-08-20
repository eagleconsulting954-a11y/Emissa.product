import type { Metadata } from 'next';
import '../seo.css';

export const metadata:Metadata={
  title:'Supplier Compliance Research and Benchmarks',
  description:'Emissa research methodology for supplier compliance readiness, evidence coverage, response performance, corrective actions and regulatory workflow benchmarks.',
  keywords:['supplier compliance benchmarks','supplier compliance research','supplier compliance metrics','supplier compliance maturity benchmark'],
  alternates:{canonical:'/research'},
  robots:{index:true,follow:true},
};

const metrics=[
  ['Evidence readiness','Share of active requirements supported by current approved evidence.'],
  ['Response readiness','Share of recurring buyer or regulatory requests answerable from approved reusable data.'],
  ['Certificate currency','Share of required certificates that are current, expiring or overdue.'],
  ['CAPA performance','Time from finding to verified closure, segmented by severity and supplier group.'],
  ['Supplier response time','Elapsed time from request issuance to complete supplier response.'],
  ['Data reuse','Frequency with which approved evidence or supplier data supports more than one workflow.'],
];

export default function ResearchHub(){
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/regulations">Regulations</a><a href="/tools">Tools</a><a href="/templates">Templates</a><a href="/research/methodology">Methodology</a><a href="/demo">Demo</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">Emissa Research</span><h1>Build the benchmark for supplier compliance operations.</h1><p>Emissa is establishing a transparent research framework for measuring supplier evidence readiness, response performance, corrective actions and compliance data reuse without publishing invented findings or customer-identifiable data.</p><div className="seoActions"><a className="seoPrimary" href="/research/methodology">Review the methodology</a><a className="seoSecondary" href="/demo">Discuss benchmark participation</a></div></section>
    <section className="seoGrid three">{metrics.map(([title,body])=><article className="seoCard" key={title}><h2>{title}</h2><p>{body}</p></article>)}</section>
    <section className="seoSection"><span className="seoKicker">Research standard</span><h2>No fabricated benchmark claims.</h2><p>Emissa will only publish benchmark findings when the underlying dataset is large enough to support useful aggregation, the definitions are documented, and customer-level records cannot be inferred from the output. Until then, this section documents the framework and the metrics that future reports will use.</p></section>
    <section className="seoSection"><h2>What future reports can measure</h2><div className="seoGrid three"><article className="seoCard"><h3>By workflow</h3><p>Buyer requests, certificates, due diligence, CAPA, CBAM, EPR, product compliance and supplier evidence.</p></article><article className="seoCard"><h3>By supplier cohort</h3><p>Risk tier, geography, category, business criticality and program maturity when sample size protects anonymity.</p></article><article className="seoCard"><h3>By operating maturity</h3><p>Manual, partially structured and system-driven compliance programs using consistent definitions.</p></article></div></section>
    <section className="seoCta"><h2>Turn benchmark definitions into operating metrics.</h2><p>Emissa can measure evidence readiness, supplier response, CAPA and compliance workflow performance directly from controlled records.</p><a className="seoPrimary" href="/demo">See the operating model</a></section>
  </main>;
}
