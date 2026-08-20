import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { docs } from '@/lib/seoExpansionContent';
import '../../seo.css';

type Slug=keyof typeof docs;
export function generateStaticParams(){return Object.keys(docs).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=docs[slug as Slug];if(!entry)return{};return{title:entry.title,description:entry.description,keywords:entry.keywords,alternates:{canonical:`/docs/${slug}`},robots:{index:true,follow:true}};}
export default async function DocPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=docs[slug as Slug];if(!entry)notFound();return <SeoExpansionPage entry={entry} hubPath="/docs" hubLabel="Documentation"/>;}
