import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { integrations } from '@/lib/seoExpansionContent';
import '../../seo.css';

type Slug=keyof typeof integrations;
export function generateStaticParams(){return Object.keys(integrations).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=integrations[slug as Slug];if(!entry)return{};return{title:entry.title,description:entry.description,keywords:entry.keywords,alternates:{canonical:`/integrations/${slug}`},robots:{index:true,follow:true}};}
export default async function IntegrationPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=integrations[slug as Slug];if(!entry)notFound();return <SeoExpansionPage entry={entry} hubPath="/integrations" hubLabel="Integrations"/>;}
