import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { docs, hubs } from '@/lib/seoExpansionContent';
import '../seo.css';

export const metadata:Metadata={title:'Emissa Supplier Compliance Documentation',description:hubs.docs.description,alternates:{canonical:'/docs'},keywords:['Emissa documentation','supplier compliance software documentation','supplier compliance workflows']};
export default function DocsPage(){return <SeoHub title={hubs.docs.title} description={hubs.docs.description} basePath="/docs" eyebrow="Documentation" entries={docs}/>}
