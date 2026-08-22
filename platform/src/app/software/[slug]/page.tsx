import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { commercialPages } from '@/lib/seoExpansionPhase3';
import '../../seo.css';

type Slug=keyof typeof commercialPages;
export function generateStaticParams(){return Object.keys(commercialPages).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const entry=commercialPages[slug as Slug];
  if(!entry)return{};
  const title=entry.title.replace(/\s*\|\s*Emissa$/,'');
  return{
    title,
    description:entry.description,
    keywords:entry.keywords,
    alternates:{canonical:`/software/${slug}`},
    robots:{index:true,follow:true},
    openGraph:{type:'website',title:`${title} | Emissa`,description:entry.description,url:`/software/${slug}`},
    twitter:{card:'summary_large_image',title:`${title} | Emissa`,description:entry.description},
  };
}
export default async function SoftwarePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const entry=commercialPages[slug as Slug];
  if(!entry)notFound();
  const schema={'@context':'https://schema.org','@type':'SoftwareApplication',name:entry.h1,applicationCategory:'BusinessApplication',applicationSubCategory:'Supplier Compliance Software',operatingSystem:'Web',url:`https://emissa.tech/software/${slug}`,description:entry.description,offers:{'@type':'Offer',price:'3500',priceCurrency:'USD',category:'subscription'},provider:{'@type':'Organization',name:'Emissa',url:'https://emissa.tech/'}};
  return <><SeoExpansionPage entry={entry} hubPath="/software" hubLabel="Supplier Compliance Software"/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>;
}
