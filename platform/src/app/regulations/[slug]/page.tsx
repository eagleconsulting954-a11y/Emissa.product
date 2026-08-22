import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { regulations } from '@/lib/seoExpansionContent';
import { phase2Regulations } from '@/lib/seoExpansionPhase2';
import { phase3Regulations } from '@/lib/seoExpansionPhase3';
import '../../seo.css';

const allRegulations = { ...regulations, ...phase2Regulations, ...phase3Regulations };
type Slug=keyof typeof allRegulations;

export function generateStaticParams(){return Object.keys(allRegulations).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=allRegulations[slug as Slug];if(!entry)return{};return{title:entry.title,description:entry.description,keywords:entry.keywords,alternates:{canonical:`/regulations/${slug}`},robots:{index:true,follow:true},openGraph:{title:`${entry.title} | Emissa`,description:entry.description,url:`/regulations/${slug}`,type:'article'}};}
export default async function RegulationPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=allRegulations[slug as Slug];if(!entry)notFound();return <SeoExpansionPage entry={entry} hubPath="/regulations" hubLabel="Regulatory Intelligence"/>;}
