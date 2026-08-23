import type { Metadata } from 'next';
import { allBlogTopicPosts, blogCategories, latestBlogPosts, postsForCategory } from '@/lib/blogCatalog';
import '../seo.css';

export const metadata:Metadata={
  title:'Supplier Compliance Blog, Guides & Regulatory Operations',
  description:'Supplier compliance guides on due diligence, evidence, certificates, buyer requests, product compliance, EPR, CBAM, EUDR, supplier risk, workflow automation and software.',
  keywords:['supplier compliance blog','supplier compliance guides','supplier due diligence','supplier evidence management','supplier compliance software','product compliance','EPR CBAM EUDR'],
  alternates:{canonical:'/blog'},robots:{index:true,follow:true},
  openGraph:{title:'Supplier Compliance Blog & Guides | Emissa',description:'Practical operating guidance for supplier evidence, due diligence, buyer requests, risk, product compliance and regulatory workflows.',url:'/blog',type:'website'},
};

const core=[
  ['what-is-supplier-compliance-infrastructure','What Is Supplier Compliance Infrastructure?'],['supplier-compliance-checklist','Supplier Compliance Checklist for Manufacturers'],['supplier-due-diligence-workflow','A Practical Supplier Due Diligence Workflow'],['supplier-certificate-management-guide','Supplier Certificate Management: A Complete Guide'],['supplier-compliance-platform-buyers-guide','Supplier Compliance Platform Buyer’s Guide'],['how-to-build-supplier-compliance-system-of-record','How to Build a Supplier Compliance System of Record']
] as const;
const latest=latestBlogPosts(18);const total=Object.keys(allBlogTopicPosts).length;

export default function BlogIndex(){
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/platform">Platform</a><a href="/software">Software</a><a href="/regulations">Regulations</a><a href="/tools">Tools</a><a href="/templates">Templates</a><a href="/demo">Demo</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">Supplier Compliance Blog</span><h1>Operational guidance for modern supplier compliance teams.</h1><p>{total}+ topic guides across supplier compliance programs, evidence, due diligence, buyer requests, product compliance, EPR, regulatory intelligence, risk, workflow automation and technology.</p><div className="seoActions"><a className="seoPrimary" href="/blog/category/supplier-compliance">Browse supplier compliance</a><a className="seoSecondary" href="/blog/rss.xml">RSS feed</a></div></section>

    <section className="seoSection"><span className="seoKicker">Topic clusters</span><h2>Explore the blog by operating problem.</h2><div className="seoGrid three">{Object.entries(blogCategories).map(([slug,category])=>{const count=postsForCategory(slug as keyof typeof blogCategories).length;return <article className="seoCard" key={slug}><span className="seoKicker">{count} guides</span><h3><a href={`/blog/category/${slug}`}>{category.name}</a></h3><p>{category.description}</p><a className="seoSecondary" href={`/blog/category/${slug}`}>Explore {category.name} →</a></article>})}</div></section>

    <section className="seoSection"><span className="seoKicker">Latest guides</span><h2>New supplier compliance operating guidance.</h2><div className="seoGrid three">{latest.map(([slug,post])=><article className="seoCard" key={slug}><span className="seoKicker">{blogCategories[post.category].name} • {post.readTime} min</span><h3><a href={`/blog/topics/${slug}`}>{post.title}</a></h3><p>{post.description}</p><a className="seoSecondary" href={`/blog/topics/${slug}`}>Read guide →</a></article>)}</div></section>

    <section className="seoSection"><span className="seoKicker">Foundational library</span><h2>Core supplier compliance guides.</h2><div className="seoGrid three">{core.map(([slug,title])=><article className="seoCard" key={slug}><h3><a href={`/blog/${slug}`}>{title}</a></h3><p>Foundational guidance for structuring supplier compliance data, evidence and workflows.</p><a className="seoSecondary" href={`/blog/${slug}`}>Read guide →</a></article>)}</div></section>

    <section className="seoSection"><span className="seoKicker">From research to execution</span><h2>Use the blog as the entry point, then move into the workflow.</h2><p>Every editorial cluster is connected to Emissa’s software pages, platform modules, regulatory intelligence, templates and interactive tools so readers can move from a search question to an operating model.</p><div className="seoActions"><a className="seoSecondary" href="/software">Supplier compliance software</a><a className="seoSecondary" href="/platform">Platform modules</a><a className="seoSecondary" href="/regulations">Regulatory intelligence</a><a className="seoSecondary" href="/tools">Free tools</a><a className="seoSecondary" href="/templates">Templates</a></div></section>

    <section className="seoCta"><h2>Turn supplier compliance knowledge into controlled execution.</h2><p>Emissa connects suppliers, requirements, evidence, approvals, remediation and regulatory workflows in one operating layer.</p><a className="seoPrimary" href="/demo">Book a private demo</a></section>
  </main>;
}
