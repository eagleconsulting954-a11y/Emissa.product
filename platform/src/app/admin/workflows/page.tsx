import { ModuleType, RecordStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import AdminProductShell from '@/components/AdminProductShell';
import '../compliance/admin-compliance.css';

export const dynamic='force-dynamic';

async function createWorkflow(formData: FormData){
  'use server';
  const organizationId=String(formData.get('organizationId')||'');
  const title=String(formData.get('title')||'').trim();
  const module=String(formData.get('module')||'CORE') as ModuleType;
  const ownerEmail=String(formData.get('ownerEmail')||'').trim()||null;
  const authority=String(formData.get('authority')||'').trim()||null;
  const description=String(formData.get('description')||'').trim()||null;
  const due=String(formData.get('dueDate')||'');
  if(!organizationId||!title) return;
  await db.obligation.create({data:{organizationId,title,module,ownerEmail,authority,description,dueDate:due?new Date(`${due}T12:00:00Z`):null,status:RecordStatus.PENDING}});
  await db.auditEvent.create({data:{organizationId,action:'WORKFLOW_CREATED',entityType:'Obligation',metadata:{title,module}}});
  revalidatePath('/admin/workflows');
  revalidatePath('/admin/compliance');
}

async function updateWorkflowStatus(formData: FormData){
  'use server';
  const id=String(formData.get('id')||'');
  const status=String(formData.get('status')||'PENDING') as RecordStatus;
  if(!id) return;
  const current=await db.obligation.findUnique({where:{id},select:{organizationId:true,title:true}});
  if(!current) return;
  await db.obligation.update({where:{id},data:{status}});
  await db.auditEvent.create({data:{organizationId:current.organizationId,action:'WORKFLOW_STATUS_CHANGED',entityType:'Obligation',entityId:id,metadata:{title:current.title,status}}});
  revalidatePath('/admin/workflows');
  revalidatePath('/admin/compliance');
}

export default async function WorkflowStudio(){
  const [obligations,organizations]=await Promise.all([
    db.obligation.findMany({orderBy:[{dueDate:'asc'},{updatedAt:'desc'}],take:100,include:{organization:{select:{name:true,slug:true}}}}),
    db.organization.findMany({where:{slug:{not:'emissa-demo'}},orderBy:{name:'asc'},select:{id:true,name:true}})
  ]);
  const live=obligations.filter(o=>o.organization.slug!=='emissa-demo');
  const active=live.filter(o=>!['COMPLETE','APPROVED','ARCHIVED'].includes(o.status));
  const blocked=live.filter(o=>o.status==='BLOCKED');
  const review=live.filter(o=>o.status==='IN_REVIEW');
  const complete=live.filter(o=>['COMPLETE','APPROVED'].includes(o.status));
  return <AdminProductShell title="Workflow Studio" eyebrow="Build, automate and manage compliance workflows" active="/admin/workflows" actions={<a href="#create-workflow">Create workflow</a>}>
    <section className="ccMetricGrid"><article><span>Active workflows</span><strong>{active.length}</strong><small>Open obligations in production</small></article><article><span>In review</span><strong>{review.length}</strong><small>Awaiting compliance review</small></article><article><span>Blocked</span><strong>{blocked.length}</strong><small>Require intervention</small></article><article><span>Completed</span><strong>{complete.length}</strong><small>Closed workflow records</small></article></section>
    <section className="ccDashboardGrid">
      <article className="ccPanel ccHealth"><div className="ccPanelHead"><div><span>Workflow canvas</span><small>Operational lifecycle used across compliance requirements</small></div><b>{active.length}</b></div><div className="wfCanvas">
        <div className="wfNode start"><i>1</i><b>Requirement</b><small>Trigger detected</small></div><div className="wfConnector"/>
        <div className="wfNode"><i>2</i><b>Request data</b><small>Assign supplier / owner</small></div><div className="wfConnector"/>
        <div className="wfNode"><i>3</i><b>Validate</b><small>Evidence and completeness</small></div><div className="wfConnector branch"/>
        <div className="wfNode gold"><i>4</i><b>Review</b><small>Human approval loop</small></div><div className="wfConnector"/>
        <div className="wfNode done"><i>5</i><b>Complete</b><small>Controlled output</small></div>
      </div></article>
      <article className="ccPanel"><div className="ccPanelHead"><div><span>Workflow distribution</span><small>Current production state</small></div></div><div className="ccRiskRows"><span><b>Open</b><i><em style={{width:`${Math.min(100,active.length*8)}%`}}/></i><strong>{active.length}</strong></span><span><b>Review</b><i><em style={{width:`${Math.min(100,review.length*12)}%`}}/></i><strong>{review.length}</strong></span><span><b>Blocked</b><i><em style={{width:`${Math.min(100,blocked.length*15)}%`}}/></i><strong>{blocked.length}</strong></span><span><b>Done</b><i><em style={{width:`${Math.min(100,complete.length*7)}%`}}/></i><strong>{complete.length}</strong></span></div></article>
      <article className="ccPanel"><div className="ccPanelHead"><div><span>Quick templates</span><small>Reusable compliance patterns</small></div></div><div className="ccQuick"><a href="#create-workflow">Supplier evidence request</a><a href="#create-workflow">CBAM data collection</a><a href="#create-workflow">Certificate renewal</a><a href="#create-workflow">Buyer questionnaire review</a></div></article>
    </section>

    <section className="ccPanel" id="create-workflow" style={{marginTop:10}}><div className="ccPanelHead"><div><span>Create production workflow</span><small>Writes directly to the Emissa compliance database</small></div></div>
      <form action={createWorkflow} className="ccFormGrid">
        <label><span>Organization</span><select name="organizationId" required><option value="">Select customer</option>{organizations.map(o=><option key={o.id} value={o.id}>{o.name}</option>)}</select></label>
        <label><span>Workflow title</span><input name="title" required placeholder="Supplier certificate renewal"/></label>
        <label><span>Module</span><select name="module" defaultValue="CORE">{Object.values(ModuleType).map(m=><option key={m}>{m}</option>)}</select></label>
        <label><span>Owner email</span><input name="ownerEmail" type="email" placeholder="compliance@company.com"/></label>
        <label><span>Authority / buyer</span><input name="authority" placeholder="EU Commission, Buyer X, Internal"/></label>
        <label><span>Due date</span><input name="dueDate" type="date"/></label>
        <label className="wide"><span>Description</span><textarea name="description" rows={3} placeholder="Required evidence, review criteria and expected output"/></label>
        <div className="wide"><button className="ccGoldButton" type="submit">Create workflow</button></div>
      </form>
    </section>

    <section className="ccPanel" style={{marginTop:10}}><div className="ccPanelHead"><div><span>Production workflows</span><small>No demo records</small></div></div>{live.length?<div className="ccTableWrap"><table className="ccTable"><thead><tr><th>Workflow</th><th>Organization</th><th>Module</th><th>Status</th><th>Owner</th><th>Due</th><th>Action</th></tr></thead><tbody>{live.map(o=><tr key={o.id}><td><strong>{o.title}</strong>{o.description&&<small className="ccCellSub">{o.description}</small>}</td><td>{o.organization.name}</td><td>{o.module}</td><td><span className="ccBadge">{o.status}</span></td><td>{o.ownerEmail||'Unassigned'}</td><td>{o.dueDate?o.dueDate.toLocaleDateString():'—'}</td><td><form action={updateWorkflowStatus} className="ccInlineForm"><input type="hidden" name="id" value={o.id}/><select name="status" defaultValue={o.status}>{Object.values(RecordStatus).map(s=><option key={s}>{s}</option>)}</select><button type="submit">Update</button></form></td></tr>)}</tbody></table></div>:<div className="ccEmptySmall">No production workflows yet.</div>}</section>
  </AdminProductShell>;
}
