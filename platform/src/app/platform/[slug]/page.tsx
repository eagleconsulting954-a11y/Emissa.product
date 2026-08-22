import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { platformPages } from '@/lib/seoExpansionPhase3';
import '../../seo.css';

type Slug=keyof typeof platformPages;
export function generateStaticParams(){return Object.keys(platformPages).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=platformPages[slug as Slug];if(!entry)return{};return{title:entry.title,description:entry.description,keywords:entry.keywords,alternates:{canonical:`/platform/${slug}`},robots:{index:true,follow:true}};}
export default async function PlatformModulePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=platformPages[slug as Slug];if(!entry)notFound();return <SeoExpansionPage entry={entry} hubPath="/platform" hubLabel="Platform"/>;}
