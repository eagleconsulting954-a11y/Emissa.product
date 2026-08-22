import type { Metadata } from 'next';
import '../seo.css';

export const metadata:Metadata={title:'Supplier Compliance Research and Benchmarks',description:'Emissa research, maturity models, state EPR tracking, regulatory milestones and benchmark methodology for supplier compliance operations.',keywords:['supplier compliance benchmarks','supplier compliance research','supplier compliance maturity model','supplier compliance metrics','packaging EPR tracker'],alternates:{canonical:'/research'},robots:{index:true,follow:true}};

const metrics=[
  ['Evidence readiness','Share of active requirements supported by current approved evidence.'],
  ['Response readiness','Share of recurring buyer or regulatory requests answerable from approved reusable data.'],
  ['Certificate currency','Share of required certificates that are current, expiring or overdue.'],
  ['CAPA performance','Time from finding to verified closure, segmented by severity and supplier group.'],
  ['Supplier response time','Elapsed time from request issuance to complete supplier response.'],
  ['Data reuse','Frequency with which approved evidence or supplier data supports more than one workflow.'],
];

const assets=[
  ['/research/state-of-supplier-compliance','State of Supplier Compliance','Research framework for future production-data benchmarks without fabricated findings.'],
  ['/research/supplier-compliance-maturity-model','Supplier Compliance Maturity Model','Five levels from reactive administration to compliance infrastructure.'],
  ['/research/methodology','Benchmark Methodology','Definitions, inclusion rules, privacy controls and comparability standards.'],
  ['/regulatory-calendar','Regulatory Calendar','Source-linked milestones for CBAM, EUDR, DPP, battery passports and EPR.'],
  ['/epr-state-tracker','US Packaging EPR State Tracker','Current operating reference for California, Colorado, Oregon, Maine, Minnesota and Maryland.'],
  ['/tools/supplier-compliance-maturity-assessment','Maturity Assessment','Interactive diagnostic tied to the five-level maturity model.'],
] as const;

export default function ResearchHub(){return <main className="seoPage"><nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/platform">Platform</a><a href="/regulations">Regulations</a><a href="/tools">Tools</a><a href="/templates">Templates</a><a href="/demo">Demo</a></div></nav><section className="seoHero compact"><span className="seoKicker">Emissa Research</span><h1>Build the benchmark for supplier compliance operations.</h1><p>Emissa is establishing a transparent research framework for measuring supplier evidence readiness, response performance, corrective actions and compliance data reuse without publishing invented findings or customer-identifiable data.</p><div className="seoActions"><a className="seoPrimary" href="/research/methodology">Review the methodology</a><a className="seoSecondary" href="/demo">Discuss benchmark participation</a></div></section><section className="seoGrid three">{assets.map(([href,title,body])=><article className="seoCard" key={href}><span className="seoKicker">Research Asset</span><h2><a href={href}>{title}</a></h2><p>{body}</p><a className="seoSecondary" href={href}>Explore →</a></article>)}</section><section className="seoSection"><h2>Operational benchmark measures</h2><div className="seoGrid three">{metrics.map(([title,body])=><article className="seoCard" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section><section className="seoSection"><span className="seoKicker">Research standard</span><h2>No fabricated benchmark claims.</h2><p>Emissa will only publish benchmark findings when the underlying dataset is large enough to support useful aggregation, the definitions are documented, and customer-level records cannot be inferred from the output.</p></section><section className="seoCta"><h2>Turn benchmark definitions into operating metrics.</h2><p>Emissa can measure evidence readiness, supplier response, CAPA and compliance workflow performance directly from controlled records.</p><a className="seoPrimary" href="/demo">See the operating model</a></section></main>;}
