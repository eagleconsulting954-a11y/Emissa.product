import { db } from '@/lib/db';
import { riskBand, supplierRiskScore } from '@/lib/supplierCompliance';
import AdminProductShell from '@/components/AdminProductShell';
import '../compliance/admin-compliance.css';
import '../product-template.css';

export const dynamic = 'force-dynamic';

export default async function SupplierDirectory() {
  const suppliers = await db.supplier.findMany({include:{organization:{select:{name:true,slug:true}},cbamShipments:{select:{status:true,embeddedCo2e:true,cnCode:true}},lcaProducts:{select:{status:true,totalCo2eKg:true,sku:true}}},orderBy:{updatedAt:'desc'}});
  const live=suppliers.filter(s=>s.organization.slug!=='emissa-demo').map(s=>({supplier:s,score:supplierRiskScore(s),band:riskBand(supplierRiskScore(s))})).sort((a,b)=>b.score-a.score);
  const approved=live.filter(x=>x.supplier.status==='APPROVED').length;
  const high=live.filter(x=>x.score>=65).length;
  const missing=live.filter(x=>!x.supplier.email||!x.supplier.country).length;
  return <AdminProductShell title="Supplier 360 Workspace" eyebrow="Complete supplier profile and compliance management" active="/admin/suppliers" actions={<a href="/admin/risk">Network Risk Map</a>}>
    <section className="ccMetricGrid"><article><span>Total suppliers</span><strong>{live.length}</strong><small>Production supplier records</small></article><article><span>Approved</span><strong>{approved}</strong><small>Current approved suppliers</small></article><article><span>High risk</span><strong>{high}</strong><small>Require attention</small></article><article><span>Incomplete profiles</span><strong>{missing}</strong><small>Missing country or contact</small></article></section>
    <section className="ccPanel"><div className="ccPanelHead"><div><span>Supplier network</span><small>Live compliance directory</small></div><b>{live.length}</b></div>{live.length?<div className="ccTableWrap"><table className="ccTable"><thead><tr><th>Supplier</th><th>Organization</th><th>Country</th><th>Status</th><th>Risk</th><th>CBAM</th><th>LCA / PCF</th><th>Contact</th></tr></thead><tbody>{live.map(({supplier,score,band})=><tr key={supplier.id}><td><a href={`/admin/suppliers/${supplier.id}`}>{supplier.name}</a></td><td>{supplier.organization.name}</td><td>{supplier.country||'Missing'}</td><td><span className="ccBadge">{supplier.status}</span></td><td><span className={`ccRisk ${band.toLowerCase()}`}>{score} · {band}</span></td><td>{supplier.cbamShipments.length}</td><td>{supplier.lcaProducts.length}</td><td>{supplier.email||'Missing'}</td></tr>)}</tbody></table></div>:<div className="ccEmptySmall">No production suppliers yet. Demo and placeholder records are excluded.</div>}</section>
  </AdminProductShell>;
}
