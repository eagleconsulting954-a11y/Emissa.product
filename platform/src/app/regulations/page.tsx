import type { Metadata } from 'next';
import SeoHub from '@/components/SeoHub';
import { hubs, regulations } from '@/lib/seoExpansionContent';
import { phase2Regulations } from '@/lib/seoExpansionPhase2';
import { phase3Regulations } from '@/lib/seoExpansionPhase3';
import { phase3MoreRegulations } from '@/lib/seoExpansionPhase3RegMore';
import '../seo.css';

const allRegulations = { ...regulations, ...phase2Regulations, ...phase3Regulations, ...phase3MoreRegulations };

export const metadata:Metadata={
  title:'Regulatory Intelligence for Supplier Compliance',
  description:hubs.regulations.description,
  alternates:{canonical:'/regulations'},
  keywords:['supplier compliance regulations','regulatory intelligence software','CBAM REACH RoHS PFAS EPR compliance','EUDR compliance','CSDDD supplier due diligence','Digital Product Passport software','packaging EPR software','UFLPA compliance software','conflict minerals compliance'],
};

export default function RegulationsPage(){return <SeoHub title={hubs.regulations.title} description={hubs.regulations.description} basePath="/regulations" eyebrow="Regulatory Intelligence" entries={allRegulations}/>;}
