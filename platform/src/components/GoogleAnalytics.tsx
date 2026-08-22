'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

declare global {interface Window {dataLayer?:unknown[];gtag?:(...args:unknown[])=>void;}}

function contentGroup(path:string){
  if(path.startsWith('/regulations/')||path==='/regulations')return 'Regulatory Intelligence';
  if(path.startsWith('/software/')||path==='/software')return 'Commercial Software';
  if(path.startsWith('/platform/')||path==='/platform')return 'Platform Modules';
  if(path.startsWith('/product-compliance/')||path==='/product-compliance')return 'Product Compliance';
  if(path.startsWith('/tools/')||path==='/tools')return 'Interactive Tools';
  if(path.startsWith('/templates/')||path==='/templates')return 'Templates';
  if(path.startsWith('/compare/')||path==='/compare')return 'Buyer Guides';
  if(path.startsWith('/integrations/')||path==='/integrations')return 'Integrations';
  if(path.startsWith('/research/')||path==='/research'||path==='/regulatory-calendar'||path==='/epr-state-tracker')return 'Research Assets';
  if(path.startsWith('/blog/')||path==='/blog')return 'Blog';
  if(path.startsWith('/resources/')||path==='/resources')return 'Resources';
  if(path.startsWith('/solutions/')||path==='/solutions')return 'Solutions';
  if(path.startsWith('/industries/')||path==='/industries')return 'Industries';
  return 'Core';
}

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname=usePathname();
  const firstRender=useRef(true);
  useEffect(()=>{
    if(!measurementId||typeof window==='undefined'||!window.gtag)return;
    const path=`${window.location.pathname}${window.location.search}`;
    const group=contentGroup(window.location.pathname);
    if(firstRender.current){
      firstRender.current=false;
      window.gtag('event','seo_landing_view',{page_path:path,page_location:window.location.href,page_title:document.title,content_group:group});
      return;
    }
    window.gtag('event','page_view',{page_path:path,page_location:window.location.href,page_title:document.title,content_group:group});
  },[pathname,measurementId]);
  return null;
}
