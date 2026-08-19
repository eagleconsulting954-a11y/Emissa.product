import { db } from '@/lib/db';
import AdminProductShell from '@/components/AdminProductShell';
import '../compliance/admin-compliance.css';
import '../product-template.css';

export const dynamic='force-dynamic';

export default async function RegulatoryHub(){
  const obligations=await db.obligation.findMany({orderBy:[{dueDate:'asc'},{updatedAt:'desc'}],take:80,include:{organization:{select:{name:true,slug:true}}}});
  const live=obligations.filter(o=>o.organization.slug!=='emissa-demo');
  const authorities=[...new Set(live.map(o=>o.authority).filter(Boolean))];
  const modules=[...new Set(live.map(o=>o.module))];
  const overdue=live.filter(o=>o.dueDate&&o.dueDate<new Date()&&!['COMPLETE','APPROVED','ARCHIVED'].includes(o.status));
  return <AdminProductShell title="Regulatory Intelligence Hub" eyebrow="Monitor obligations, authorities and operational impact" active="/admin/regulations" actions={<a href="/admin/workflows">Create workflow</a>}>
    <section className="ccMetricGrid"><article><span>Tracked obligations</span><strong>{live.length}</strong><small>Production compliance records</small></article><article><span>Authorities</span><strong>{authorities.length}</strong><small>Distinct regulators / bodies</small></article><article><span>Modules</span><strong>{modules.length}</strong><small>Compliance domains represented</small></article><article><span>Overdue</span><strong>{overdue.length}</strong><small>Require immediate action</small></article></section>
    <section className="regLayout">
      <aside className="ccPanel regFeed"><div className="ccPanelHead"><div><span>Tracked requirements</span><small>Sorted by due date</small></div></div>{live.slice(0,18).map(o=><a className="regItem" href="#impact" key={o.id}><b>{o.title}</b><small>{o.authority||'Internal requirement'} · {o.module}</small><em>{o.dueDate?o.dueDate.toLocaleDateString():'No due date'}</em></a>)}</aside>
      <article className="ccPanel regDetail" id="impact"><div className="ccPanelHead"><div><span>Compliance impact</span><small>Operational view built from current production obligations</small></div><b>{live.filter(o=>!['COMPLETE','APPROVED','ARCHIVED'].includes(o.status)).length}</b></div><div className="regHero"><span className="regShield">◇</span><div><h2>Supplier compliance requirements are mapped to live workflows.</h2><p>Each obligation remains tied to its organization, module, authority, owner, status and due date so teams can move directly from intelligence to execution.</p></div></div><div className="regCards">{modules.slice(0,6).map(m=>{const rows=live.filter(o=>o.module===m);return <div key={m}><span>{m}</span><strong>{rows.length}</strong><small>{rows.filter(o=>!['COMPLETE','APPROVED','ARCHIVED'].includes(o.status)).length} open</small></div>})}</div><div className="ccPanelHead" style={{marginTop:18}}><div><span>Recommended actions</span><small>Based on current workflow state</small></div></div><div className="ccQuick"><a href="/admin/workflows">Review overdue obligations</a><a href="/admin/suppliers">Map impacted suppliers</a><a href="/admin/evidence">Validate supporting evidence</a><a href="/admin/compliance">Return to command center</a></div></article>
    </section>
  </AdminProductShell>;
}
