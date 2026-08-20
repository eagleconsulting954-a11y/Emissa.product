import type { SeoEntry } from '@/lib/seoExpansionContent';

const clusters=[['Integrations','/integrations'],['Regulations','/regulations'],['Teams','/for'],['Comparisons','/compare'],['Tools','/tools'],['Templates','/templates'],['Documentation','/docs'],['Research','/research']];

export default function SeoHub({ title, description, basePath, eyebrow, entries }:{ title:string; description:string; basePath:string; eyebrow:string; entries:Record<string,SeoEntry> }) {
  const collectionSchema={
    '@context':'https://schema.org',
    '@type':'CollectionPage',
    name:title,
    description,
    url:`https://emissa.tech${basePath}`,
    publisher:{'@type':'Organization',name:'Emissa',url:'https://emissa.tech/'},
    mainEntity:{
      '@type':'ItemList',
      itemListElement:Object.entries(entries).map(([slug,entry],index)=>({
        '@type':'ListItem',position:index+1,name:entry.h1,url:`https://emissa.tech${basePath}/${slug}`,
      })),
    },
  };

  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/solutions">Solutions</a><a href="/regulations">Regulations</a><a href="/integrations">Integrations</a><a href="/tools">Tools</a><a href="/research">Research</a><a href="/demo">Demo</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">{eyebrow}</span><h1>{title}</h1><p>{description}</p><div className="seoActions"><a className="seoPrimary" href="/demo">Book a private demo</a><a className="seoSecondary" href="/solutions/supplier-compliance-infrastructure">Explore the platform</a></div></section>
    <section className="seoGrid three">{Object.entries(entries).map(([slug,entry]) => <article className="seoCard" key={slug}><span className="seoKicker">{eyebrow}</span><h2><a href={`${basePath}/${slug}`}>{entry.h1}</a></h2><p>{entry.description}</p><a className="seoSecondary" href={`${basePath}/${slug}`}>Explore →</a></article>)}</section>
    <section className="seoSection"><span className="seoKicker">One operating layer</span><h2>Build search visibility around real supplier compliance workflows.</h2><p>Every page in this library is connected back to the same Emissa architecture: suppliers, facilities, products, requirements, evidence, owners, approvals and reusable compliance data.</p></section>
    <section className="seoSection"><span className="seoKicker">Explore the knowledge graph</span><h2>Move between the requirement, system, role and workflow.</h2><div className="seoActions">{clusters.filter(([,href])=>href!==basePath).map(([label,href])=><a className="seoSecondary" href={href} key={href}>{label}</a>)}</div></section>
    <section className="seoCta"><h2>Move from guidance to execution.</h2><p>Use Emissa to turn recurring supplier requirements into production workflows with evidence and accountability.</p><a className="seoPrimary" href="/demo">See Emissa in action</a></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(collectionSchema)}} />
  </main>;
}
