import { ModuleType, RecordStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import AdminProductShell from '@/components/AdminProductShell';
import '../compliance/admin-compliance.css';
import '../admin-forms.css';

export const dynamic='force-dynamic';

async function createCapa(formData:FormData){
  'use server';
  const organizationId=String(formData.get('organizationId')||'');
  const title=String(formData.get('title')||'').trim();
  const ownerEmail=String(formData.get('ownerEmail')||'').trim()||null;
  const due=String(formData.get('dueDate')||'');
  const rootCause=String(formData.get('rootCause')||'').trim();
  const action=String(formData.get('correctiveAction')||'').trim();
  if(!organizationId||!title||!action) return;
  const description=`ROOT CAUSE: ${rootCause||'Not yet documented'}\nCORRECTIVE ACTION: ${action}`;
  const row=await db.obligation.create({data:{organizationId,module:ModuleType.CORE,title:`[CAPA] ${title}`,description,ownerEmail,dueDate:due?new Date(`${due}T12:00:00Z`):null,status:RecordStatus.PENDING,authority:'Corrective Action'}});
  await db.auditEvent.create({data:{organizationId,action:'CAPA_CREATED',entityType:'Obligation',entityId:row.id,metadata:{title,ownerEmail}}});
  revalidatePath('/admin/capa');revalidatePath('/admin/compliance');
}

async function setCapaStatus(formData:FormData){
  'use server';
  const id=String(formData.get('id')||'');
  const status=String(formData.get('status')||'PENDING') as RecordStatus;
  if(!id) return;
  const row=await db.obligation.findUnique({where:{id},select:{organizationId:true,title:true}});if(!row)return;
  await db.obligation.update({where:{id},data:{status}});
  await db.auditEvent.create({data:{organizationId:row.organizationId,action:'CAPA_STATUS_CHANGED',entityType:'Obligation',entityId:id,metadata:{status,title:row.title}}});
  revalidatePath('/admin/capa');revalidatePath('/admin/compliance');
}

export default async function CapaPage(){
  const [rows,orgs]=await Promise.all([
    db.obligation.findMany({where:{title:{startsWith:'[CAPA]'}},include:{organization:{select:{name:true,slug:true}}},orderBy:[{dueDate:'asc'},{updatedAt:'desc'}]}),
    db.organization.findMany({where:{slug:{not:'emissa-demo'}},select:{id:true,name:true},orderBy:{name:'asc'}})
  ]);
  const live=rows.filter(r=>r.organization.slug!=='emissa-demo');
  const overdue=live.filter(r=>r.dueDate&&r.dueDate<new Date()&&!['COMPLETE','APPROVED','ARCHIVED'].includes(r.status));
  const open=live.filter(r=>!['COMPLETE','APPROVED','ARCHIVED'].includes(r.status));
  const closed=live.filter(r=>['COMPLETE','APPROVED','ARCHIVED'].includes(r.status));
  return <AdminProductShell title="Corrective Actions" eyebrow="CAPA, remediation and closure control" active="/admin/capa" actions={<a href="#new-capa">New CAPA</a>}>
    <section className="ccMetricGrid"><article><span>Open CAPAs</span><strong>{open.length}</strong><small>Active corrective actions</small></article><article><span>Overdue</span><strong>{overdue.length}</strong><small>Past due and unresolved</small></article><article><span>In review</span><strong>{live.filter(r=>r.status==='IN_REVIEW').length}</strong><small>Awaiting verification</small></article><article><span>Closed</span><strong>{closed.length}</strong><small>Completed or approved</small></article></section>
    <section className="ccPanel" id="new-capa"><div className="ccPanelHead"><div><span>Create corrective action</span><small>Real production record with audit history</small></div></div><form action={createCapa} className="ccFormGrid"><label><span>Organization</span><select name="organizationId" required><option value="">Select organization</option>{orgs.map(o=><option key={o.id} value={o.id}>{o.name}</option>)}</select></label><label><span>Finding / issue</span><input name="title" required placeholder="Expired supplier certificate"/></label><label><span>Owner</span><input name="ownerEmail" type="email" placeholder="owner@company.com"/></label><label><span>Due date</span><input name="dueDate" type="date"/></label><label className="wide"><span>Root cause</span><textarea name="rootCause" rows={3} placeholder="Why did the issue occur?"/></label><label className="wide"><span>Corrective action</span><textarea name="correctiveAction" required rows={3} placeholder="What must be completed to close the finding?"/></label><div className="wide"><button className="ccGoldButton" type="submit">Create CAPA</button></div></form></section>
    <section className="ccPanel" style={{marginTop:10}}><div className="ccPanelHead"><div><span>Corrective action register</span><small>CAPA records are stored in the compliance workflow system</small></div></div>{live.length?<div className="ccTableWrap"><table className="ccTable"><thead><tr><th>Finding</th><th>Organization</th><th>Owner</th><th>Due</th><th>Status</th><th>Control</th></tr></thead><tbody>{live.map(r=><tr key={r.id}><td><strong>{r.title.replace('[CAPA] ','')}</strong>{r.description&&<small className="ccCellSub">{r.description}</small>}</td><td>{r.organization.name}</td><td>{r.ownerEmail||'Unassigned'}</td><td>{r.dueDate?r.dueDate.toLocaleDateString():'—'}</td><td><span className="ccBadge">{r.status}</span></td><td><form action={setCapaStatus} className="ccInlineForm"><input type="hidden" name="id" value={r.id}/><select name="status" defaultValue={r.status}>{Object.values(RecordStatus).map(s=><option key={s}>{s}</option>)}</select><button type="submit">Save</button></form></td></tr>)}</tbody></table></div>:<div className="ccEmptySmall">No corrective actions have been created yet.</div>}</section>
  </AdminProductShell>;
}
