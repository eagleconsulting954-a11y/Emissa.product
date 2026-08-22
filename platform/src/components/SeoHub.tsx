import type { SeoEntry } from '@/lib/seoExpansionContent';

const clusters=[['Platform','/platform'],['Software','/software'],['Product Compliance','/product-compliance'],['Integrations','/integrations'],['Regulations','/regulations'],['Teams','/for'],['Comparisons','/compare'],['Tools','/tools'],['Templates','/templates'],['Documentation','/docs'],['Research','/research'],['Regulatory Calendar','/regulatory-calendar']];

export default function SeoHub({ title, description, basePath, eyebrow, entries }:{ title:string; description:string; basePath:string; eyebrow:string; entries:Record<string,SeoEntry> }) {
  const collectionSchema={
    '@context':'https://schema.org','@type':'CollectionPage',name:title,description,url:`https://emissa.tech${basePath}`,publisher:{'@type':'Organization',name:'Emissa',url:'https://emissa.tech/'},mainEntity:{'@type':'ItemList',itemListElement:Object.entries(entries).map(([slug,entry],index)=>({'@type':'ListItem',position:index+1,name:entry.h1,url:`https://emissa.tech${basePath}/${slug}`}))},
  };
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/platform">Platform</a><a href="/software">Software</a><a href="/regulations">Regulations</a><a href="/product-compliance">Product Compliance</a><a href="/tools">Tools</a><a href="/research">Research</a><a href="/demo">Demo</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">{eyebrow}</span><h1>{title}</h1><p>{description}</p><div className="seoActions"><a className="seoPrimary" href="/demo">Book a private demo</a><a className="seoSecondary" href="/platform">Explore the platform</a></div></section>
    <section className="seoGrid three">{Object.entries(entries).map(([slug,entry]) => <article className="seoCard" key={slug}><span className="seoKicker">{eyebrow}</span><h2><a href={`${basePath}/${slug}`}>{entry.h1}</a></h2><p>{entry.description}</p><a className="seoSecondary" href={`${basePath}/${slug}`}>Explore →</a></article>)}</section>
    <section className="seoSection"><span className="seoKicker">One operating layer</span><h2>Connect each requirement to the supplier data and evidence behind it.</h2><p>Emissa links suppliers, facilities, products, requirements, evidence, owners, approvals, remediation and reusable compliance data so teams can move from research to accountable execution without rebuilding the same information for every request.</p></section>
    <section className="seoSection"><span className="seoKicker">Explore related workflows</span><h2>Move between the regulation, system, role and operating workflow.</h2><div className="seoActions">{clusters.filter(([,href])=>href!==basePath).map(([label,href])=><a className="seoSecondary" href={href} key={href}>{label}</a>)}</div></section>
    <section className="seoCta"><h2>Move from guidance to execution.</h2><p>Use Emissa to turn recurring supplier requirements into production workflows with evidence and accountability.</p><a className="seoPrimary" href="/demo">See Emissa in action</a></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(collectionSchema)}} />
  </main>;
}
