import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { hubs, comparisons } from '@/lib/seoExpansionContent';
import { phase3Comparisons } from '@/lib/seoExpansionPhase3Comparisons';
import '../seo.css';

const allComparisons={...comparisons,...phase3Comparisons};
export const metadata:Metadata={title:'Supplier Compliance Software Comparisons',description:hubs.compare.description,alternates:{canonical:'/compare'},keywords:['supplier compliance software comparison','best supplier compliance software','supplier compliance buyers guide','supplier compliance software pricing','build vs buy supplier compliance']};
export default function ComparePage(){return <SeoHub title={hubs.compare.title} description="Commercial buyer guides for evaluating supplier compliance platforms, pricing, feature sets, implementation and adjacent software categories." basePath="/compare" eyebrow="Buyer Guides" entries={allComparisons}/>;}
