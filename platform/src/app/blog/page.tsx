import type { Metadata } from 'next';
import '../seo.css';

export const metadata: Metadata = {
  title: 'Supplier Compliance Blog | Software, Due Diligence & Buyer Requirements',
  description: 'High-intent supplier compliance guides covering supplier compliance software, due diligence, buyer requests, certificates, Scope 3, CBAM, EPR and evidence management.',
  keywords: ['supplier compliance software','supplier compliance blog','supplier compliance management','supplier due diligence','supplier questionnaire software','supplier certificate management'],
  alternates: { canonical: '/blog' },
  openGraph: { title: 'Supplier Compliance Blog | Emissa', description: 'Practical supplier compliance guides for software, due diligence, buyer requests, certificates, carbon, CBAM and EPR workflows.', url: '/blog', type: 'website' }
};

const posts = [
  ['what-is-supplier-compliance-infrastructure','What Is Supplier Compliance Infrastructure?'],
  ['supplier-compliance-software-vs-esg-software','Supplier Compliance Software vs. ESG Software'],
  ['supplier-compliance-checklist','Supplier Compliance Checklist for Manufacturers'],
  ['how-to-manage-buyer-compliance-requests','How to Manage Buyer Compliance Requests Without Spreadsheets'],
  ['supplier-due-diligence-workflow','Supplier Due Diligence Workflow: A Practical Guide'],
  ['supplier-certificate-management-guide','Supplier Certificate Management: A Complete Guide'],
  ['scope-3-as-supplier-data-foundation','Scope 3 Supplier Data as a Compliance Foundation'],
  ['cbam-supplier-data-checklist','CBAM Supplier Data Checklist'],
  ['epr-packaging-compliance-workflow','EPR Packaging Compliance Workflow'],
  ['product-carbon-footprint-vs-scope-3','Product Carbon Footprint vs. Scope 3'],
  ['supplier-onboarding-compliance-process','Supplier Onboarding Compliance Process'],
  ['supplier-questionnaire-management','Supplier Questionnaire Management Guide'],
  ['supplier-compliance-kpis','Supplier Compliance KPIs and Metrics'],
  ['how-to-build-supplier-compliance-system-of-record','How to Build a Supplier Compliance System of Record'],
  ['supplier-compliance-platform-buyers-guide','Supplier Compliance Platform Buyer’s Guide']
];

export default function BlogIndex(){
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/solutions">Solutions</a><a href="/industries">Industries</a><a href="/resources">Resources</a><a href="/pricing">Pricing</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">Supplier Compliance Blog</span><h1>Supplier compliance software, due diligence and buyer requirement guides.</h1><p>Practical educational content for supplier, sustainability, compliance and operations teams managing evidence, questionnaires, certificates, Scope 3, CBAM, EPR and product compliance workflows.</p></section>
    <section className="seoSection"><h2>Supplier compliance management topics</h2><div className="seoActions"><a className="seoSecondary" href="/solutions/supplier-compliance-infrastructure">Supplier compliance software</a><a className="seoSecondary" href="/solutions/supplier-due-diligence">Supplier due diligence</a><a className="seoSecondary" href="/solutions/buyer-compliance-requests">Buyer compliance requests</a><a className="seoSecondary" href="/solutions/supplier-certificate-management">Certificate management</a><a className="seoSecondary" href="/solutions/scope-3-supplier-data">Scope 3 supplier data</a></div></section>
    <section className="seoGrid three">{posts.map(([slug,title])=><article className="seoCard" key={slug}><h2><a href={`/blog/${slug}`}>{title}</a></h2><p>Practical guidance for supplier compliance, sustainability, operations and enterprise customer requirements.</p><a className="seoSecondary" href={`/blog/${slug}`}>Read guide</a></article>)}</section>
  </main>;
}
