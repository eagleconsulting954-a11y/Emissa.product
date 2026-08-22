import { templates } from '@/lib/seoExpansionContent';
import { phase3Templates } from '@/lib/seoExpansionPhase3';

function csvCell(value:string){return `"${value.replaceAll('"','""')}"`;}

export async function GET(_request:Request,{params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const allTemplates={...templates,...phase3Templates};
  const entry=allTemplates[slug as keyof typeof allTemplates];
  if(!entry)return new Response('Template not found',{status:404,headers:{'X-Robots-Tag':'noindex, nofollow'}});
  const fields=entry.sections.find(section=>section.bullets)?.bullets||[];
  const rows=[['Field','Value / Response','Evidence / Source','Owner','Review Status','Review / Expiration Date'],...fields.map(field=>[field,'','','','Pending',''])];
  const csv=rows.map(row=>row.map(csvCell).join(',')).join('\r\n');
  return new Response(csv,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':`attachment; filename="emissa-${slug}-template.csv"`,'Cache-Control':'public, max-age=3600','X-Robots-Tag':'noindex, nofollow'}});
}
