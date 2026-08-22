'use client';

import { useEffect } from 'react';

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };
function sendEvent(name:string, params:Record<string,string|number|boolean>){const gtag=(window as GtagWindow).gtag;if(!gtag)return;gtag('event',name,params);}

export default function AnalyticsEvents(){
  useEffect(()=>{
    const handleClick=(event:MouseEvent)=>{
      const target=event.target as Element|null;
      const anchor=target?.closest('a');
      if(!anchor)return;
      const href=anchor.getAttribute('href')||'';
      const text=(anchor.textContent||'').trim().slice(0,120);
      const path=window.location.pathname;

      if(href==='/demo'||href.startsWith('/demo?')){sendEvent('demo_intent',{link_text:text,source_path:path,destination:href});return;}
      if(href==='/pricing'||href.startsWith('/pricing?')){sendEvent('pricing_intent',{link_text:text,source_path:path,destination:href});return;}
      if(/^\/templates\/[^/]+\/download/.test(href)){sendEvent('template_download',{link_text:text,source_path:path,destination:href});return;}
      if(href.startsWith('/tools/')){sendEvent('seo_tool_open',{link_text:text,source_path:path,destination:href});return;}
      if(href.startsWith('/platform/')){sendEvent('platform_module_click',{link_text:text,source_path:path,destination:href});return;}
      if(href.startsWith('/software/')){sendEvent('commercial_seo_click',{link_text:text,source_path:path,destination:href});return;}
      if(href.startsWith('/product-compliance/')){sendEvent('product_compliance_click',{link_text:text,source_path:path,destination:href});return;}
      if(href.startsWith('/research/')||href==='/research'||href==='/regulatory-calendar'||href==='/epr-state-tracker'){sendEvent('research_asset_click',{link_text:text,source_path:path,destination:href});return;}
      if(href.startsWith('/videos/')){sendEvent('product_video_click',{link_text:text,source_path:path,destination:href});return;}
      if(href.startsWith('/regulations/')||href.startsWith('/integrations/')||href.startsWith('/compare/')||href.startsWith('/for/')||href.startsWith('/docs/')){sendEvent('seo_content_click',{link_text:text,source_path:path,destination:href});return;}
      if(/^https?:\/\//.test(href)&&!href.includes('emissa.tech')){sendEvent('outbound_click',{link_text:text,source_path:path,destination:href});}
    };
    document.addEventListener('click',handleClick,true);
    return()=>document.removeEventListener('click',handleClick,true);
  },[]);
  return null;
}
