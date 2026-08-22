import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { platformPages } from '@/lib/seoExpansionPhase3';
import '../seo.css';

export const metadata:Metadata={
  title:'Supplier Compliance Infrastructure Platform',
  description:'Explore Emissa Supplier 360, Evidence Vault, Workflow Studio, Regulatory Intelligence, Network Risk, CAPA, supplier communications, buyer requests and reporting.',
  alternates:{canonical:'/platform'},
  keywords:['supplier compliance platform','supplier compliance infrastructure','supplier evidence software'],
  openGraph:{type:'website',title:'Supplier Compliance Infrastructure Platform | Emissa',description:'A shared operating layer for supplier records, requirements, evidence, risk, workflows and reporting.',url:'/platform'},
};
export default function PlatformPage(){return <SeoHub title="Supplier Compliance Infrastructure Platform" description="A shared operating layer for supplier records, requirements, evidence, risk, workflows, communications and reporting—designed so reviewed supplier data can be reused across multiple compliance outcomes." basePath="/platform" eyebrow="Platform" entries={platformPages}/>;}
