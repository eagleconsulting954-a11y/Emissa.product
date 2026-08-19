import { db } from '@/lib/db';
import AdminProductShell from '@/components/AdminProductShell';
import '../compliance/admin-compliance.css';
import '../product-template.css';

export const dynamic='force-dynamic';

export default async function WorkflowStudio(){
  const obligations=await db.obligation.findMany({orderBy:[{dueDate:'asc'},{updatedAt:'desc'}],take:60,include:{organization:{select:{name:true,slug:true}}}});
  const live=obligations.filter(o=>o.organization.slug!=='emissa-demo');
  const active=live.filter(o=>!['COMPLETE','APPROVED','ARCHIVED'].includes(o.status));
  const blocked=live.filter(o=>o.status==='BLOCKED');
  const review=live.filter(o=>o.status==='IN_REVIEW');
  const complete=live.filter(o=>['COMPLETE','APPROVED'].includes(o.status));
  return <AdminProductShell title="Workflow Studio" eyebrow="Build, automate and manage compliance workflows" active="/admin/workflows" actions={<a href="/admin/compliance">Command Center</a>}>
    <section className="ccMetricGrid"><article><span>Active workflows</span><strong>{active.length}</strong><small>Open obligations in production</small></article><article><span>In review</span><strong>{review.length}</strong><small>Awaiting compliance review</small></article><article><span>Blocked</span><strong>{blocked.length}</strong><small>Require intervention</small></article><article><span>Completed</span><strong>{complete.length}</strong><small>Closed workflow records</small></article></section>
    <section className="ccDashboardGrid">
      <article className="ccPanel ccHealth"><div className="ccPanelHead"><div><span>Workflow canvas</span><small>Live workflow states from compliance obligations</small></div><b>{active.length}</b></div><div className="wfCanvas">
        <div className="wfNode start"><i>1</i><b>Requirement</b><small>Trigger detected</small></div><div className="wfConnector"/>
        <div className="wfNode"><i>2</i><b>Request data</b><small>Assign supplier / owner</small></div><div className="wfConnector"/>
        <div className="wfNode"><i>3</i><b>Validate</b><small>Evidence and completeness</small></div><div className="wfConnector branch"/>
        <div className="wfNode gold"><i>4</i><b>Review</b><small>Human approval loop</small></div><div className="wfConnector"/>
        <div className="wfNode done"><i>5</i><b>Complete</b><small>Controlled output</small></div>
      </div></article>
      <article className="ccPanel"><div className="ccPanelHead"><div><span>Workflow distribution</span><small>Current production state</small></div></div><div className="ccRiskRows"><span><b>Open</b><i><em style={{width:`${Math.min(100,active.length*8)}%`}}/></i><strong>{active.length}</strong></span><span><b>Review</b><i><em style={{width:`${Math.min(100,review.length*12)}%`}}/></i><strong>{review.length}</strong></span><span><b>Blocked</b><i><em style={{width:`${Math.min(100,blocked.length*15)}%`}}/></i><strong>{blocked.length}</strong></span><span><b>Done</b><i><em style={{width:`${Math.min(100,complete.length*7)}%`}}/></i><strong>{complete.length}</strong></span></div></article>
      <article className="ccPanel"><div className="ccPanelHead"><div><span>Quick templates</span><small>Reusable compliance patterns</small></div></div><div className="ccQuick"><a href="/admin/workflows">Supplier evidence request</a><a href="/admin/workflows">CBAM data collection</a><a href="/admin/workflows">Certificate renewal</a><a href="/admin/workflows">Buyer questionnaire review</a></div></article>
    </section>
    <section className="ccPanel" style={{marginTop:10}}><div className="ccPanelHead"><div><span>Production workflows</span><small>No demo records</small></div></div>{live.length?<div className="ccTableWrap"><table className="ccTable"><thead><tr><th>Workflow</th><th>Organization</th><th>Module</th><th>Status</th><th>Owner</th><th>Due</th></tr></thead><tbody>{live.map(o=><tr key={o.id}><td>{o.title}</td><td>{o.organization.name}</td><td>{o.module}</td><td><span className="ccBadge">{o.status}</span></td><td>{o.ownerEmail||'Unassigned'}</td><td>{o.dueDate?o.dueDate.toLocaleDateString():'—'}</td></tr>)}</tbody></table></div>:<div className="ccEmptySmall">No production workflows yet.</div>}</section>
  </AdminProductShell>;
}
