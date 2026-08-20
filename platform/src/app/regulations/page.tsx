import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { hubs, regulations } from '@/lib/seoExpansionContent';
import '../seo.css';

export const metadata:Metadata={title:'Regulatory Intelligence for Supplier Compliance',description:hubs.regulations.description,alternates:{canonical:'/regulations'},keywords:['supplier compliance regulations','regulatory intelligence software','CBAM REACH RoHS PFAS EPR compliance']};
export default function RegulationsPage(){return <SeoHub title={hubs.regulations.title} description={hubs.regulations.description} basePath="/regulations" eyebrow="Regulatory Intelligence" entries={regulations}/>}
