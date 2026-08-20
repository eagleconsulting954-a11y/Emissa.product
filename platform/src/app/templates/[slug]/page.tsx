import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { templates } from '@/lib/seoExpansionContent';
import '../../seo.css';

type Slug=keyof typeof templates;
export function generateStaticParams(){return Object.keys(templates).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=templates[slug as Slug];if(!entry)return{};return{title:entry.title,description:entry.description,keywords:entry.keywords,alternates:{canonical:`/templates/${slug}`},robots:{index:true,follow:true}};}
export default async function TemplatePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=templates[slug as Slug];if(!entry)notFound();return <SeoExpansionPage entry={entry} hubPath="/templates" hubLabel="Supplier Compliance Templates" downloadHref={`/templates/${slug}/download`}/>;}
