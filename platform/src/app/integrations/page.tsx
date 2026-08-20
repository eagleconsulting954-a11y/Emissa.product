import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { hubs, integrations } from '@/lib/seoExpansionContent';
import '../seo.css';

export const metadata:Metadata={title:'Supplier Compliance Integrations',description:hubs.integrations.description,alternates:{canonical:'/integrations'},keywords:['supplier compliance integrations','supplier data integrations','ERP compliance integration','procurement compliance integration']};
export default function IntegrationsPage(){return <SeoHub title={hubs.integrations.title} description={hubs.integrations.description} basePath="/integrations" eyebrow="Integrations" entries={integrations}/>}
