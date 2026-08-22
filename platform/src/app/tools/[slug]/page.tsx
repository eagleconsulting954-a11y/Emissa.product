import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AssessmentTool from '@/components/AssessmentTool';
import Phase3AssessmentTool from '@/components/Phase3AssessmentTool';
import { tools } from '@/lib/seoExpansionContent';
import { phase3Tools } from '@/lib/seoExpansionPhase3';
import '../../seo.css';

const allSlugs=[...Object.keys(tools),...Object.keys(phase3Tools)];
export function generateStaticParams(){return allSlugs.map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const tool=(tools as Record<string,typeof tools[keyof typeof tools]>)[slug]||(phase3Tools as Record<string,typeof phase3Tools[keyof typeof phase3Tools]>)[slug];if(!tool)return{};return{title:tool.title,description:tool.description,keywords:tool.keywords,alternates:{canonical:`/tools/${slug}`},robots:{index:true,follow:true}};}

export default async function ToolPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const legacy=(tools as Record<string,typeof tools[keyof typeof tools]>)[slug];
  const phase3=(phase3Tools as Record<string,typeof phase3Tools[keyof typeof phase3Tools]>)[slug];
  if(!legacy&&!phase3)notFound();
  if(phase3)return <main className="seoPage"><nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/platform">Platform</a><a href="/software">Software</a><a href="/regulations">Regulations</a><a href="/templates">Templates</a><a href="/demo">Demo</a></div></nav><header className="seoHero compact"><span className="seoKicker">Free Supplier Compliance Tool</span><h1>{phase3.h1}</h1><p>{phase3.intro}</p></header><Phase3AssessmentTool tool={phase3} slug={slug}/><section className="seoSection"><h2>Use the result as an operating diagnostic.</h2><p>The score is not a legal or audit conclusion. It is a structured way to identify where supplier data, evidence, ownership, deadlines, review and audit history are still too manual or fragmented.</p></section><section className="seoCta"><h2>Turn the score into assigned work.</h2><p>Emissa converts supplier evidence gaps and requirements into controlled workflows with owners, deadlines and audit history.</p><a className="seoPrimary" href="/demo">Book a private demo</a></section></main>;
  const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:legacy.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
  return <main className="seoPage"><nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/platform">Platform</a><a href="/regulations">Regulations</a><a href="/templates">Templates</a><a href="/docs">Docs</a><a href="/demo">Demo</a></div></nav><header className="seoHero compact"><span className="seoKicker">Free Supplier Compliance Tool</span><h1>{legacy.h1}</h1><p>{legacy.intro}</p></header><AssessmentTool tool={legacy}/>{legacy.sections.map(section=><section className="seoSection" key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}<section className="seoSection"><h2>Frequently asked questions</h2><div className="seoFaq">{legacy.faq.map(([q,a])=><article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></section><section className="seoCta"><h2>Turn the score into assigned work.</h2><p>Emissa converts evidence gaps, supplier requirements and exceptions into controlled workflows with owners and audit history.</p><a className="seoPrimary" href="/demo">Book a private demo</a></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/></main>;
}
