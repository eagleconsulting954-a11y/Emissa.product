import { db } from '@/lib/db';
import { riskBand, supplierRiskScore } from '@/lib/supplierCompliance';
import AdminProductShell from '@/components/AdminProductShell';
import '../compliance/admin-compliance.css';
import '../product-template.css';
import './copilot.css';

export const dynamic='force-dynamic';

function answerFor(q:string, stats:{suppliers:number;highRisk:number;open:number;blocked:number;evidence:number}){
  const s=q.toLowerCase();
  if(!q) return 'Ask Emissa about suppliers, evidence, obligations, risk or workflow status.';
  if(s.includes('high risk')||s.includes('risk')) return `${stats.highRisk} production suppliers are currently in the high-risk band. Open Supplier 360 or the Network Risk Map to review them.`;
  if(s.includes('evidence')||s.includes('document')) return `${stats.evidence} production evidence files are currently stored in the Evidence Vault.`;
  if(s.includes('blocked')) return `${stats.blocked} compliance obligations are currently blocked and require intervention.`;
  if(s.includes('obligation')||s.includes('open')) return `${stats.open} compliance obligations are currently open across production organizations.`;
  if(s.includes('supplier')) return `${stats.suppliers} production supplier records are currently tracked in Emissa.`;
  return `Current production snapshot: ${stats.suppliers} suppliers, ${stats.highRisk} high-risk suppliers, ${stats.open} open obligations, ${stats.blocked} blocked obligations and ${stats.evidence} evidence files.`;
}

export default async function Copilot({searchParams}:{searchParams:Promise<{q?:string}>}){
  const {q=''}=await searchParams;
  const [suppliers,obligations,evidence]=await Promise.all([
    db.supplier.findMany({include:{organization:{select:{slug:true}},cbamShipments:{select:{status:true,embeddedCo2e:true,cnCode:true}},lcaProducts:{select:{status:true,totalCo2eKg:true,sku:true}}}}),
    db.obligation.findMany({include:{organization:{select:{slug:true}}}}),
    db.evidenceFile.findMany({include:{organization:{select:{slug:true}}}}),
  ]);
  const liveSuppliers=suppliers.filter(s=>s.organization.slug!=='emissa-demo');
  const liveObligations=obligations.filter(o=>o.organization.slug!=='emissa-demo');
  const liveEvidence=evidence.filter(e=>e.organization.slug!=='emissa-demo');
  const highRisk=liveSuppliers.filter(s=>supplierRiskScore(s)>=65).length;
  const open=liveObligations.filter(o=>!['COMPLETE','APPROVED','ARCHIVED'].includes(o.status)).length;
  const blocked=liveObligations.filter(o=>o.status==='BLOCKED').length;
  const stats={suppliers:liveSuppliers.length,highRisk,open,blocked,evidence:liveEvidence.length};
  const answer=answerFor(q.trim(),stats);
  return <AdminProductShell title="AI Compliance Copilot" eyebrow="Ask anything. Get clarity. Take action." active="/admin/copilot" actions={<a href="/admin/compliance">Command Center</a>}>
    <section className="copilotHero"><div className="copilotOrb"><span className="ccMark"><i/></span></div><h2>How can I help you today?</h2><p>Copilot is connected to current production compliance data. No demo records are included.</p><form method="get" className="copilotAsk"><input name="q" defaultValue={q} placeholder="Ask Emissa about suppliers, evidence, risk, workflows or obligations..."/><button>→</button></form><div className="copilotPrompts"><a href="?q=Which suppliers are high risk?">Which suppliers are high risk?</a><a href="?q=How many obligations are open?">Open obligations</a><a href="?q=How much evidence is stored?">Evidence status</a><a href="?q=What is blocked?">Blocked workflows</a></div></section>
    {q&&<section className="ccPanel copilotAnswer"><div className="ccPanelHead"><div><span>Copilot response</span><small>Generated from current database counts</small></div></div><p>{answer}</p></section>}
    <section className="copilotCards"><article><span>Suppliers</span><strong>{stats.suppliers}</strong><small>Production records</small><a href="/admin/suppliers">View all</a></article><article><span>High-risk suppliers</span><strong>{stats.highRisk}</strong><small>Require attention</small><a href="/admin/risk">View risk</a></article><article><span>Open obligations</span><strong>{stats.open}</strong><small>Active workflows</small><a href="/admin/workflows">View all</a></article><article><span>Evidence files</span><strong>{stats.evidence}</strong><small>Stored documents</small><a href="/admin/evidence">Open vault</a></article></section>
  </AdminProductShell>;
}
