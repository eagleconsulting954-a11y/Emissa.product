import type { Metadata } from 'next';
import '../seo.css';

export const metadata: Metadata = {
  title: 'Supplier Compliance Blog',
  description: 'Practical guides on supplier compliance infrastructure, buyer requests, due diligence, Scope 3, CBAM, EPR, certificates and supplier data workflows.',
  alternates: { canonical: '/blog' }
};

const posts = [
  ['what-is-supplier-compliance-infrastructure','What Is Supplier Compliance Infrastructure?'],
  ['supplier-compliance-software-vs-esg-software','Supplier Compliance Software vs. ESG Software'],
  ['supplier-compliance-checklist','Supplier Compliance Checklist for Manufacturers'],
  ['how-to-manage-buyer-compliance-requests','How to Manage Buyer Compliance Requests Without Spreadsheets'],
  ['supplier-due-diligence-workflow','A Practical Supplier Due Diligence Workflow'],
  ['supplier-certificate-management-guide','Supplier Certificate Management: A Complete Guide'],
  ['scope-3-as-supplier-data-foundation','Why Scope 3 Should Be a Supplier Data Foundation, Not a Silo'],
  ['cbam-supplier-data-checklist','CBAM Supplier Data Checklist'],
  ['epr-packaging-compliance-workflow','How to Build an EPR Packaging Compliance Workflow'],
  ['product-carbon-footprint-vs-scope-3','Product Carbon Footprint vs. Scope 3: What Is the Difference?'],
  ['supplier-onboarding-compliance-process','Supplier Onboarding Compliance Process: What to Automate'],
  ['supplier-questionnaire-management','Supplier Questionnaire Management: From Email to Workflow'],
  ['supplier-compliance-kpis','Supplier Compliance KPIs: What to Measure'],
  ['how-to-build-supplier-compliance-system-of-record','How to Build a Supplier Compliance System of Record'],
  ['supplier-compliance-platform-buyers-guide','Supplier Compliance Platform Buyer’s Guide']
];

export default function BlogIndex(){
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/solutions/supplier-compliance-infrastructure">Solutions</a><a href="/demo">Demo</a><a href="/pricing">Pricing</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">Supplier Compliance Library</span><h1>Practical supplier compliance guides for modern operations teams.</h1><p>Educational content covering supplier compliance infrastructure, evidence, buyer requests, due diligence, carbon, packaging, trade and product workflows.</p></section>
    <section className="seoGrid three">{posts.map(([slug,title])=><article className="seoCard" key={slug}><h2>{title}</h2><p>Practical guidance for supplier, sustainability, compliance and operations teams.</p><a className="seoSecondary" href={`/blog/${slug}`}>Read guide</a></article>)}</section>
  </main>;
}
