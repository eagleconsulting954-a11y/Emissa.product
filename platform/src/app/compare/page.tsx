import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { hubs, comparisons } from '@/lib/seoExpansionContent';
import '../seo.css';

export const metadata:Metadata={title:'Supplier Compliance Software Comparisons',description:hubs.compare.description,alternates:{canonical:'/compare'},keywords:['supplier compliance software comparison','supplier compliance buyers guide','supplier compliance vs ESG software']};
export default function ComparePage(){return <SeoHub title={hubs.compare.title} description={hubs.compare.description} basePath="/compare" eyebrow="Buyer Guides" entries={comparisons}/>}
