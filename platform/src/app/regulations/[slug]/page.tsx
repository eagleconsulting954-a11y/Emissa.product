import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { regulations } from '@/lib/seoExpansionContent';
import '../../seo.css';

type Slug=keyof typeof regulations;
export function generateStaticParams(){return Object.keys(regulations).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=regulations[slug as Slug];if(!entry)return{};return{title:entry.title,description:entry.description,keywords:entry.keywords,alternates:{canonical:`/regulations/${slug}`},robots:{index:true,follow:true}};}
export default async function RegulationPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=regulations[slug as Slug];if(!entry)notFound();return <SeoExpansionPage entry={entry} hubPath="/regulations" hubLabel="Regulatory Intelligence"/>;}
