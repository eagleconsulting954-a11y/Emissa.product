import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { hubs, templates } from '@/lib/seoExpansionContent';
import { phase3Templates } from '@/lib/seoExpansionPhase3';
import '../seo.css';

const allTemplates={...templates,...phase3Templates};
export const metadata:Metadata={title:'Supplier Compliance Templates',description:'Download supplier onboarding, audit, risk, REACH, RoHS, PFAS, EUDR, DPP, evidence, CAPA, CBAM and EPR templates.',alternates:{canonical:'/templates'},keywords:['supplier compliance templates','supplier questionnaire template','supplier audit checklist','PFAS supplier questionnaire','EUDR supplier questionnaire','digital product passport checklist']};
export default function TemplatesPage(){return <SeoHub title={hubs.templates.title} description="Download structured supplier compliance templates, then convert them into controlled evidence and workflow records in Emissa." basePath="/templates" eyebrow="Templates" entries={allTemplates}/>;}
