import type { Metadata } from 'next';
import { newBlogPosts } from '@/lib/newBlogContent';
import '../seo.css';

export const metadata: Metadata = {
  title: 'Supplier Compliance Blog & Guides',
  description: 'Practical guides on supplier compliance software, supplier compliance infrastructure, buyer requests, due diligence, Scope 3, CBAM, EPR, certificates, supplier data and workflow automation.',
  keywords: ['supplier compliance blog','supplier compliance software','supplier compliance infrastructure','supplier compliance management','supplier due diligence'],
  alternates: { canonical: '/blog' },
  robots: { index: true, follow: true },
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

const newPosts = Object.entries(newBlogPosts);

export default function BlogIndex(){
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/solutions">Solutions</a><a href="/industries">Industries</a><a href="/resources">Resources</a><a href="/pricing">Pricing</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">Supplier Compliance Library</span><h1>Supplier compliance software guides for modern operations teams.</h1><p>35 practical resources covering supplier compliance infrastructure, evidence, buyer requests, due diligence, workflow automation, Scope 3, packaging, trade, product compliance and supplier data.</p></section>
    <section className="seoSection"><span className="seoKicker">Newest guides</span><h2>Supplier compliance operations, automation and platform strategy</h2><div className="seoGrid three">{newPosts.map(([slug,post])=><article className="seoCard" key={slug}><h3>{post.title}</h3><p>{post.description}</p><a className="seoSecondary" href={`/blog/topics/${slug}`}>Read guide</a></article>)}</div></section>
    <section className="seoSection"><span className="seoKicker">Core library</span><h2>Foundational supplier compliance guides</h2><div className="seoGrid three">{posts.map(([slug,title])=><article className="seoCard" key={slug}><h3>{title}</h3><p>Practical guidance for supplier, sustainability, compliance and operations teams.</p><a className="seoSecondary" href={`/blog/${slug}`}>Read guide</a></article>)}</div></section>
    <section className="seoCta"><h2>Turn supplier compliance into an operating system.</h2><p>Explore Emissa’s supplier compliance infrastructure for evidence, buyer requests, due diligence, Scope 3 and regulatory workflows.</p><a className="seoPrimary" href="/demo">Book a demo</a></section>
  </main>;
}
