import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { templates } from '@/lib/seoExpansionContent';
import { phase3Templates } from '@/lib/seoExpansionPhase3';
import '../../seo.css';

const allTemplates={...templates,...phase3Templates};
type Slug=keyof typeof allTemplates;
export function generateStaticParams(){return Object.keys(allTemplates).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=allTemplates[slug as Slug];if(!entry)return{};return{title:entry.title,description:entry.description,keywords:entry.keywords,alternates:{canonical:`/templates/${slug}`},robots:{index:true,follow:true}};}
export default async function TemplatePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=allTemplates[slug as Slug];if(!entry)notFound();return <SeoExpansionPage entry={entry} hubPath="/templates" hubLabel="Supplier Compliance Templates" downloadHref={`/templates/${slug}/download`}/>;}
