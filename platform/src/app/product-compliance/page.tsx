import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { productCompliancePages } from '@/lib/productComplianceContent';
import '../seo.css';

export const metadata:Metadata={title:'Product Compliance Software | Emissa',description:'Product compliance infrastructure for REACH, RoHS, PFAS, SCIP, conflict minerals, material declarations, supplier declarations and digital product passports.',alternates:{canonical:'/product-compliance'},keywords:['product compliance software','supplier product compliance','REACH RoHS PFAS software','material declaration management','digital product passport software']};
export default function ProductComplianceHub(){return <SeoHub title="Product Compliance Infrastructure" description="Connect supplier, component, material, product, requirement and evidence records so product compliance decisions remain traceable and reusable." basePath="/product-compliance" eyebrow="Product Compliance" entries={productCompliancePages}/>;}
