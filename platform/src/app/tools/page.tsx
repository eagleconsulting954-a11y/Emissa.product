import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { hubs, tools } from '@/lib/seoExpansionContent';
import '../seo.css';

export const metadata:Metadata={title:'Free Supplier Compliance Tools',description:hubs.tools.description,alternates:{canonical:'/tools'},keywords:['supplier compliance tools','supplier compliance readiness assessment','supplier compliance calculator','buyer compliance readiness']};
export default function ToolsPage(){return <SeoHub title={hubs.tools.title} description={hubs.tools.description} basePath="/tools" eyebrow="Free Tools" entries={tools}/>}
