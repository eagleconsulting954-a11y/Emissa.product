'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Phase3Tool } from '@/lib/seoExpansionPhase3';

type GtagWindow=Window&{gtag?:(...args:unknown[])=>void};

export default function Phase3AssessmentTool({tool,slug}:{tool:Phase3Tool;slug:string}){
  const [answers,setAnswers]=useState<Record<number,boolean>>({});
  const [sent,setSent]=useState(false);
  const answered=Object.keys(answers).length;
  const yes=Object.values(answers).filter(Boolean).length;
  const score=useMemo(()=>tool.questions.length?Math.round((yes/tool.questions.length)*100):0,[yes,tool.questions.length]);
  const result=score<50?tool.low:score<80?tool.medium:tool.high;
  const complete=answered===tool.questions.length;

  useEffect(()=>{
    if(!complete||sent||typeof window==='undefined')return;
    const gtag=(window as GtagWindow).gtag;
    gtag?.('event','seo_assessment_complete',{tool_slug:slug,score,source_path:window.location.pathname});
    setSent(true);
  },[complete,score,sent,slug]);

  return <section className="seoSection">
    <span className="seoKicker">Interactive assessment</span>
    <h2>Score your current operating model.</h2>
    <p>Answer each question based on what is true today. Your responses stay in this browser session and are not submitted to Emissa.</p>
    <div style={{display:'grid',gap:10,marginTop:18}}>{tool.questions.map((q,i)=><article className="seoCard" key={q} style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) auto',gap:12,alignItems:'center'}}><h3 style={{margin:0}}>{q}</h3><div className="seoActions" style={{margin:0}}><button type="button" className={answers[i]===true?'seoPrimary':'seoSecondary'} onClick={()=>{setAnswers(a=>({...a,[i]:true}));setSent(false);}}>Yes</button><button type="button" className={answers[i]===false?'seoPrimary':'seoSecondary'} onClick={()=>{setAnswers(a=>({...a,[i]:false}));setSent(false);}}>No</button></div></article>)}</div>
    <article className="seoCard" style={{marginTop:16}}><span className="seoKicker">Current score</span><h2 style={{fontSize:42,margin:'8px 0'}}>{complete?`${score}%`:`${answered}/${tool.questions.length} answered`}</h2>{complete&&<><p>{result}</p><div className="seoActions"><a className="seoPrimary" href="/demo">{tool.cta}</a><button type="button" className="seoSecondary" onClick={()=>{setAnswers({});setSent(false);}}>Reset</button></div></>}</article>
  </section>;
}
