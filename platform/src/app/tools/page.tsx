import type { Metadata } from 'next';
import { tools } from '@/lib/seoExpansionContent';
import { phase3Tools } from '@/lib/seoExpansionPhase3';
import '../seo.css';

export const metadata:Metadata={title:'Free Supplier Compliance Tools',description:'Free interactive supplier compliance assessments for maturity, certificate risk, evidence coverage, buyer requests, CBAM and EUDR readiness.',alternates:{canonical:'/tools'},keywords:['supplier compliance tools','supplier compliance maturity assessment','supplier certificate risk calculator','CBAM readiness tool','EUDR readiness assessment']};

export default function ToolsPage(){
  const existing=Object.entries(tools).map(([slug,tool])=>({slug,h1:tool.h1,description:tool.description}));
  const phase3=Object.entries(phase3Tools).map(([slug,tool])=>({slug,h1:tool.h1,description:tool.description}));
  return <main className="seoPage"><nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/platform">Platform</a><a href="/software">Software</a><a href="/regulations">Regulations</a><a href="/templates">Templates</a><a href="/demo">Demo</a></div></nav><section className="seoHero compact"><span className="seoKicker">Free Tools</span><h1>Supplier Compliance Assessments</h1><p>Use focused assessments to identify operating gaps in supplier evidence, certificates, buyer requests, CBAM, EUDR and overall compliance maturity.</p><div className="seoActions"><a className="seoPrimary" href="/demo">Book a private demo</a><a className="seoSecondary" href="/templates">Download templates</a></div></section><section className="seoGrid three">{[...existing,...phase3].map(tool=><article className="seoCard" key={tool.slug}><span className="seoKicker">Interactive</span><h2><a href={`/tools/${tool.slug}`}>{tool.h1}</a></h2><p>{tool.description}</p><a className="seoSecondary" href={`/tools/${tool.slug}`}>Run assessment →</a></article>)}</section><section className="seoCta"><h2>Turn the score into assigned work.</h2><p>Emissa converts evidence gaps and requirements into controlled workflows with owners, deadlines and audit history.</p><a className="seoPrimary" href="/demo">See Emissa in action</a></section></main>;
}
