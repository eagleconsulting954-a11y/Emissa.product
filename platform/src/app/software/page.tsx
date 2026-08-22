import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { commercialPages } from '@/lib/seoExpansionPhase3';
import '../seo.css';

export const metadata:Metadata={title:'Supplier Compliance Software | Emissa',description:'Explore supplier compliance, document, certificate, due-diligence, questionnaire, audit, CAPA and onboarding software workflows.',alternates:{canonical:'/software'},keywords:['supplier compliance software','supplier compliance management software','supplier document management software','supplier due diligence software']};
export default function SoftwareHub(){return <SeoHub title="Supplier Compliance Software" description="Commercial-intent guides for the operating problems Emissa is designed to solve across supplier evidence, requirements, risk and workflow." basePath="/software" eyebrow="Supplier Compliance Software" entries={commercialPages}/>;}
