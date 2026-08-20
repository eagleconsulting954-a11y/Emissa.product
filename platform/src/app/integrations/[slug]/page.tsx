import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { integrations } from '@/lib/seoExpansionContent';
import { phase2Integrations } from '@/lib/seoExpansionPhase2';
import '../../seo.css';

const allIntegrations = { ...integrations, ...phase2Integrations };
type Slug=keyof typeof allIntegrations;

export function generateStaticParams(){return Object.keys(allIntegrations).map(slug=>({slug}));}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const entry=allIntegrations[slug as Slug];
  if(!entry)return{};
  return{
    title:entry.title,
    description:entry.description,
    keywords:entry.keywords,
    alternates:{canonical:`/integrations/${slug}`},
    robots:{index:true,follow:true},
    openGraph:{title:`${entry.title} | Emissa`,description:entry.description,url:`/integrations/${slug}`,type:'article'},
  };
}

export default async function IntegrationPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const entry=allIntegrations[slug as Slug];
  if(!entry)notFound();
  return <SeoExpansionPage entry={entry} hubPath="/integrations" hubLabel="Integrations"/>;
}
