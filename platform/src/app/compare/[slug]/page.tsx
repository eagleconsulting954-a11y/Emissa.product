import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { comparisons } from '@/lib/seoExpansionContent';
import { phase3Comparisons } from '@/lib/seoExpansionPhase3Comparisons';
import '../../seo.css';

const allComparisons={...comparisons,...phase3Comparisons};
type Slug=keyof typeof allComparisons;
export function generateStaticParams(){return Object.keys(allComparisons).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=allComparisons[slug as Slug];if(!entry)return{};return{title:entry.title,description:entry.description,keywords:entry.keywords,alternates:{canonical:`/compare/${slug}`},robots:{index:true,follow:true}};}
export default async function ComparisonPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=allComparisons[slug as Slug];if(!entry)notFound();return <SeoExpansionPage entry={entry} hubPath="/compare" hubLabel="Buyer Guides"/>;}
