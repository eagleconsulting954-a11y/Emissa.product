import { templates } from '@/lib/seoExpansionContent';

function csvCell(value:string){return `"${value.replaceAll('"','""')}"`;}

export async function GET(_request:Request,{params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const entry=templates[slug as keyof typeof templates];
  if(!entry)return new Response('Template not found',{status:404});
  const fields=entry.sections.find(section=>section.bullets)?.bullets||[];
  const rows=[['Field','Value / Response','Evidence / Source','Owner','Review Status','Review / Expiration Date'],...fields.map(field=>[field,'','','','Pending',''])];
  const csv=rows.map(row=>row.map(csvCell).join(',')).join('\r\n');
  return new Response(csv,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':`attachment; filename="emissa-${slug}-template.csv"`,'Cache-Control':'public, max-age=3600'}});
}
