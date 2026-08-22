import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { commercialPages } from '@/lib/seoExpansionPhase3';
import '../seo.css';

export const metadata:Metadata={
  title:'Supplier Compliance Software',
  description:'Compare supplier compliance software workflows for evidence, documents, certificates, due diligence, questionnaires, audits, CAPA, supplier risk and onboarding.',
  alternates:{canonical:'/software'},
  keywords:['supplier compliance software','supplier compliance management software','supplier document management software','supplier due diligence software'],
  openGraph:{type:'website',title:'Supplier Compliance Software | Emissa',description:'One supplier compliance operating layer for evidence, requirements, due diligence and remediation.',url:'/software'},
};
export default function SoftwareHub(){return <SeoHub title="Supplier Compliance Software" description="Explore the operating systems used to control supplier evidence, requirements, certificates, due diligence, questionnaires, audits, CAPA and onboarding in one supplier compliance architecture." basePath="/software" eyebrow="Supplier Compliance Software" entries={commercialPages}/>;}
