import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { personas } from '@/lib/seoExpansionContent';
import '../../seo.css';

type Slug=keyof typeof personas;
export function generateStaticParams(){return Object.keys(personas).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=personas[slug as Slug];if(!entry)return{};return{title:entry.title,description:entry.description,keywords:entry.keywords,alternates:{canonical:`/for/${slug}`},robots:{index:true,follow:true}};}
export default async function PersonaPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=personas[slug as Slug];if(!entry)notFound();return <SeoExpansionPage entry={entry} hubPath="/for" hubLabel="Emissa by Team"/>;}
