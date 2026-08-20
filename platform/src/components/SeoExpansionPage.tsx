import type { SeoEntry } from '@/lib/seoExpansionContent';

const clusters=[['Integrations','/integrations'],['Regulations','/regulations'],['Teams','/for'],['Comparisons','/compare'],['Tools','/tools'],['Templates','/templates'],['Documentation','/docs']];

export default function SeoExpansionPage({ entry, hubPath, hubLabel }:{ entry:SeoEntry; hubPath:string; hubLabel:string }) {
  const faqSchema = { '@context':'https://schema.org', '@type':'FAQPage', mainEntity: entry.faq.map(([q,a]) => ({ '@type':'Question', name:q, acceptedAnswer:{ '@type':'Answer', text:a } })) };
  const breadcrumb = { '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement:[{ '@type':'ListItem', position:1, name:'Home', item:'https://emissa.tech/' },{ '@type':'ListItem', position:2, name:hubLabel, item:`https://emissa.tech${hubPath}` },{ '@type':'ListItem', position:3, name:entry.h1 }]};
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/solutions">Solutions</a><a href="/regulations">Regulations</a><a href="/integrations">Integrations</a><a href="/tools">Tools</a><a href="/demo">Demo</a></div></nav>
    <article>
      <header className="seoHero compact"><span className="seoKicker">{hubLabel}</span><h1>{entry.h1}</h1><p>{entry.intro}</p><div className="seoActions"><a className="seoPrimary" href="/demo">Book a private demo</a><a className="seoSecondary" href={hubPath}>Explore {hubLabel}</a></div></header>
      {entry.note && <section className="seoGrid"><article className="seoCard"><span className="seoKicker">Important</span><p>{entry.note}</p></article></section>}
      {entry.sections.map((section) => <section className="seoSection" key={section.title}><h2>{section.title}</h2><p>{section.body}</p>{section.bullets && <div className="seoGrid three">{section.bullets.map((bullet) => <article className="seoCard" key={bullet}><h3>{bullet}</h3></article>)}</div>}</section>)}
      {entry.sources && <section className="seoSection"><span className="seoKicker">Authoritative sources</span><h2>Verify requirements against current official guidance.</h2><p>Regulatory requirements change. Emissa uses these sources as reference points for workflow design; organizations should confirm current applicability and obligations before relying on a compliance decision.</p><div className="seoActions">{entry.sources.map((source) => <a className="seoSecondary" href={source.url} rel="noreferrer" target="_blank" key={source.url}>{source.label} ↗</a>)}</div></section>}
      <section className="seoSection"><span className="seoKicker">Related Emissa resources</span><h2>Connect this topic to the wider compliance operating model.</h2><div className="seoActions">{clusters.filter(([,href])=>href!==hubPath).map(([label,href])=><a className="seoSecondary" href={href} key={href}>{label}</a>)}</div></section>
      <section className="seoSection"><h2>Frequently asked questions</h2><div className="seoFaq">{entry.faq.map(([q,a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></section>
      <section className="seoCta"><span className="seoKicker">Supplier Compliance Infrastructure</span><h2>Turn the requirement into a controlled operating workflow.</h2><p>Connect supplier data, evidence, ownership, deadlines, approvals and remediation in one Emissa workspace.</p><a className="seoPrimary" href="/demo">See Emissa in action</a></section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}} />
  </main>;
}
