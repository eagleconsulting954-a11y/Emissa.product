import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { hubs, personas } from '@/lib/seoExpansionContent';
import '../seo.css';

export const metadata:Metadata={title:'Supplier Compliance Software by Team',description:hubs.for.description,alternates:{canonical:'/for'},keywords:['supplier compliance for procurement','supplier compliance for compliance managers','supplier compliance for sustainability teams']};
export default function ForPage(){return <SeoHub title={hubs.for.title} description={hubs.for.description} basePath="/for" eyebrow="Built for your team" entries={personas}/>}
