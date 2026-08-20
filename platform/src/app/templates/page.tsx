import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { hubs, templates } from '@/lib/seoExpansionContent';
import '../seo.css';

export const metadata:Metadata={title:'Supplier Compliance Templates',description:hubs.templates.description,alternates:{canonical:'/templates'},keywords:['supplier compliance templates','supplier questionnaire template','supplier evidence matrix','CAPA template']};
export default function TemplatesPage(){return <SeoHub title={hubs.templates.title} description={hubs.templates.description} basePath="/templates" eyebrow="Templates" entries={templates}/>}
