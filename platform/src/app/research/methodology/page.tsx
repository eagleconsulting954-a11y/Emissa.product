import type { Metadata } from 'next';
import '../../seo.css';

export const metadata:Metadata={
  title:'Supplier Compliance Benchmark Methodology',
  description:'Transparent methodology for future Emissa supplier compliance benchmarks covering evidence readiness, supplier response, CAPA, certificate currency and data reuse.',
  keywords:['supplier compliance benchmark methodology','supplier compliance KPIs','supplier compliance metrics','supplier evidence readiness'],
  alternates:{canonical:'/research/methodology'},
  robots:{index:true,follow:true},
};

const definitions=[
  ['Evidence readiness rate','Approved, current evidence items mapped to active requirements divided by active evidence-required requirements.'],
  ['Supplier response time','Elapsed time from a documented request being issued to a complete response reaching the defined review state.'],
  ['Certificate currency','Required certificates classified as current, expiring within the configured window or expired at the measurement date.'],
  ['CAPA closure time','Elapsed time from corrective-action creation to verified closure, excluding cancelled records.'],
  ['Reusable answer coverage','Recurring request fields that can be populated from currently approved structured answers or evidence divided by total requested fields.'],
  ['Data reuse rate','Approved evidence or structured supplier data used by more than one distinct compliance workflow during the measurement period.'],
];

export default function ResearchMethodology(){
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/research">Research</a><a href="/regulations">Regulations</a><a href="/tools">Tools</a><a href="/docs">Documentation</a><a href="/demo">Demo</a></div></nav>
    <article>
      <section className="seoHero compact"><span className="seoKicker">Research Methodology</span><h1>A supplier compliance benchmark should be reproducible before it is impressive.</h1><p>This methodology defines how Emissa intends to calculate operational supplier-compliance metrics before publishing aggregate market findings. Definitions are designed to be auditable from structured workflow records rather than inferred from surveys alone.</p></section>
      <section className="seoSection"><h2>Metric definitions</h2><div className="seoGrid three">{definitions.map(([title,body])=><article className="seoCard" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className="seoSection"><h2>Dataset inclusion rules</h2><p>Only production records with a defined organization, workflow state and measurement timestamp should enter a benchmark dataset. Demo workspaces, test suppliers, synthetic records, deleted records and incomplete migrations should be excluded. Metrics should be calculated using the same definition across all included organizations.</p></section>
      <section className="seoSection"><h2>Aggregation and privacy</h2><p>Published benchmarks should use anonymized aggregate cohorts. A cohort should not be published when its size is too small to protect participating organizations or when one organization contributes a disproportionate share of the records. Customer names, supplier names, document contents and individual transaction details should never appear in public benchmark output without explicit permission.</p></section>
      <section className="seoSection"><h2>Versioning and comparability</h2><p>Every published report should identify the measurement period, metric-definition version, inclusion rules and meaningful methodology changes. If a definition changes, prior periods should either be recalculated or clearly marked as not directly comparable.</p></section>
      <section className="seoSection"><h2>What the methodology does not claim</h2><p>Operational benchmarks do not determine legal compliance, regulatory applicability or the quality of a company’s underlying legal analysis. They measure the execution characteristics of a supplier compliance program: evidence coverage, workflow timeliness, ownership, remediation and data reuse.</p></section>
      <section className="seoCta"><h2>Measure the same operating metrics inside Emissa.</h2><p>Structured requirements, evidence, owners, suppliers and corrective actions create the records needed for reliable compliance operations analytics.</p><a className="seoPrimary" href="/demo">Review the product workflow</a></section>
    </article>
  </main>;
}
