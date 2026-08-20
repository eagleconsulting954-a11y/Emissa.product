'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { AssessmentTool as AssessmentToolContent } from '@/lib/seoExpansionContent';

export default function AssessmentTool({ tool }:{ tool:AssessmentToolContent }) {
  const [answers,setAnswers] = useState<Record<number,boolean>>({});
  const trackedComplete=useRef(false);
  const answered = Object.keys(answers).length;
  const yes = Object.values(answers).filter(Boolean).length;
  const score = useMemo(() => tool.questions.length ? Math.round((yes/tool.questions.length)*100) : 0,[yes,tool.questions.length]);
  const result = score < 50 ? tool.low : score < 80 ? tool.medium : tool.high;

  useEffect(()=>{
    if(answered!==tool.questions.length||trackedComplete.current||typeof window==='undefined')return;
    trackedComplete.current=true;
    window.gtag?.('event','seo_tool_complete',{
      tool_name:tool.title,
      score,
      page_path:window.location.pathname,
    });
  },[answered,score,tool.questions.length,tool.title]);

  return <section className="seoSection">
    <span className="seoKicker">Interactive assessment</span>
    <h2>Score your current operating model.</h2>
    <p>Answer each question based on what is true today—not what is planned.</p>
    <div style={{display:'grid',gap:10,marginTop:18}}>{tool.questions.map((q,i)=><article className="seoCard" key={q} style={{display:'grid',gridTemplateColumns:'1fr auto',gap:12,alignItems:'center'}}><h3 style={{margin:0}}>{q}</h3><div className="seoActions" style={{margin:0}}><button type="button" className={answers[i]===true?'seoPrimary':'seoSecondary'} onClick={()=>setAnswers((a)=>({...a,[i]:true}))}>Yes</button><button type="button" className={answers[i]===false?'seoPrimary':'seoSecondary'} onClick={()=>setAnswers((a)=>({...a,[i]:false}))}>No</button></div></article>)}</div>
    <article className="seoCard" style={{marginTop:16}}><span className="seoKicker">Current score</span><h2 style={{fontSize:42,margin:'8px 0'}}>{answered===tool.questions.length?`${score}%`:`${answered}/${tool.questions.length} answered`}</h2>{answered===tool.questions.length&&<p>{result}</p>}</article>
  </section>;
}
