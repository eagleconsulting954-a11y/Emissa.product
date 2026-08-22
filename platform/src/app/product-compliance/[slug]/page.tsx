import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoExpansionPage from '@/components/SeoExpansionPage';
import { productCompliancePages } from '@/lib/productComplianceContent';
import '../../seo.css';

type Slug=keyof typeof productCompliancePages;
export function generateStaticParams(){return Object.keys(productCompliancePages).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=productCompliancePages[slug as Slug];if(!entry)return{};return{title:entry.title,description:entry.description,keywords:entry.keywords,alternates:{canonical:`/product-compliance/${slug}`},robots:{index:true,follow:true}};}
export default async function ProductCompliancePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=productCompliancePages[slug as Slug];if(!entry)notFound();return <SeoExpansionPage entry={entry} hubPath="/product-compliance" hubLabel="Product Compliance"/>;}
