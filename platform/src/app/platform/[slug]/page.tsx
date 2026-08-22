import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { platformPages } from '@/lib/seoExpansionPhase3';
import '../../seo.css';

type Slug=keyof typeof platformPages;
export function generateStaticParams(){return Object.keys(platformPages).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=platformPages[slug as Slug];if(!entry)return{};return{title:entry.title,description:entry.description,keywords:entry.keywords,alternates:{canonical:`/platform/${slug}`},robots:{index:true,follow:true}};}
export default async function PlatformModulePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=platformPages[slug as Slug];if(!entry)notFound();const schema={'@context':'https://schema.org','@type':'SoftwareApplication',name:`Emissa ${entry.h1}`,applicationCategory:'BusinessApplication',applicationSubCategory:'Supplier Compliance Software',operatingSystem:'Web',url:`https://emissa.tech/platform/${slug}`,description:entry.description,isPartOf:{'@type':'SoftwareApplication',name:'Emissa',url:'https://emissa.tech/'},offers:{'@type':'Offer',price:'3500',priceCurrency:'USD',category:'subscription'}};return <><SeoExpansionPage entry={entry} hubPath="/platform" hubLabel="Platform"/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>;}
