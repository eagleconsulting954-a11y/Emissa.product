import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { platformPages } from '@/lib/seoExpansionPhase3';
import '../seo.css';

export const metadata:Metadata={title:'Emissa Platform | Supplier Compliance Infrastructure',description:'Explore Supplier 360, Evidence Vault, Workflow Studio, Regulatory Intelligence, Network Risk, CAPA, communications, buyer requests and reporting.',alternates:{canonical:'/platform'},keywords:['supplier compliance platform','supplier compliance infrastructure','supplier evidence software']};
export default function PlatformPage(){return <SeoHub title="Supplier Compliance Infrastructure Platform" description="A shared operating layer for supplier records, requirements, evidence, risk, workflows, communications and reporting." basePath="/platform" eyebrow="Platform" entries={platformPages}/>;}
