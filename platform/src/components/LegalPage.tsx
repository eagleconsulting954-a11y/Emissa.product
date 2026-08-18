import LegalFooter from './LegalFooter';

export default function LegalPage({title,subtitle,children}:{title:string;subtitle:string;children:React.ReactNode}){
  return <main className="marketing legalPage">
    <nav className="siteNav"><a className="siteBrand" href="/"><div className="siteLogo">◎</div><div><b>emissa.tech</b><small>Supplier Compliance Infrastructure</small></div></a><div className="navLinks"><a href="/demo">Demo</a><a href="/pricing">Pricing</a><a className="button" href="/login">Log in</a></div></nav>
    <section className="legalHero"><p className="eyebrow">Legal</p><h1>{title}</h1><p className="heroCopy">{subtitle}</p><p className="legalUpdated">Last updated: August 18, 2026</p></section>
    <article className="legalBody">{children}</article>
    <LegalFooter />
  </main>;
}
