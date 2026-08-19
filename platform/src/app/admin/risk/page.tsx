import { db } from '@/lib/db';
import { riskBand, supplierRiskScore } from '@/lib/supplierCompliance';
import AdminProductShell from '@/components/AdminProductShell';
import '../compliance/admin-compliance.css';
import '../product-template.css';

export const dynamic='force-dynamic';

export default async function RiskMap(){
  const [suppliers,facilities]=await Promise.all([
    db.supplier.findMany({include:{organization:{select:{name:true,slug:true}},cbamShipments:{select:{status:true,embeddedCo2e:true,cnCode:true}},lcaProducts:{select:{status:true,totalCo2eKg:true,sku:true}}},orderBy:{updatedAt:'desc'}}),
    db.facility.findMany({include:{organization:{select:{slug:true,name:true}}}})
  ]);
  const live=suppliers.filter(s=>s.organization.slug!=='emissa-demo').map(s=>({supplier:s,score:supplierRiskScore(s),band:riskBand(supplierRiskScore(s))})).sort((a,b)=>b.score-a.score);
  const liveFacilities=facilities.filter(f=>f.organization.slug!=='emissa-demo'&&f.latitude!=null&&f.longitude!=null);
  const high=live.filter(s=>s.score>=65).length, med=live.filter(s=>s.score>=35&&s.score<65).length, low=live.filter(s=>s.score<35).length;
  return <AdminProductShell title="Network Risk Map" eyebrow="Visualize supplier and facility risk exposure" active="/admin/risk" actions={<a href="/admin/suppliers">Supplier 360</a>}>
    <section className="ccMetricGrid"><article><span>Total suppliers</span><strong>{live.length}</strong><small>Production supplier network</small></article><article><span>High risk</span><strong>{high}</strong><small>Immediate attention</small></article><article><span>Medium risk</span><strong>{med}</strong><small>Active monitoring</small></article><article><span>Low risk</span><strong>{low}</strong><small>Current lower-risk band</small></article></section>
    <section className="ccPanel"><div className="ccPanelHead"><div><span>Global facility exposure</span><small>Facility coordinates from production data</small></div><b>{liveFacilities.length}</b></div><div className="riskMap"><div className="mapGrid"/><div className="continent c1"/><div className="continent c2"/><div className="continent c3"/><div className="continent c4"/>{liveFacilities.map(f=>{const left=((Number(f.longitude)+180)/360)*100;const top=((90-Number(f.latitude))/180)*100;return <a key={f.id} className="mapDot" href="/admin/risk" title={`${f.name} · ${f.organization.name}`} style={{left:`${left}%`,top:`${top}%`}}/>})}<div className="mapArc a1"/><div className="mapArc a2"/></div><div className="ccLegend riskLegend"><span><i className="green"/>Facility</span><span><i className="gold"/>Supplier relationship</span><span><i className="orange"/>Review queue</span></div></section>
    <section className="ccPanel" style={{marginTop:10}}><div className="ccPanelHead"><div><span>Supplier risk ranking</span><small>Dynamic score from actual supplier completeness and connected compliance records</small></div></div>{live.length?<div className="ccTableWrap"><table className="ccTable"><thead><tr><th>Supplier</th><th>Organization</th><th>Country</th><th>Status</th><th>Risk score</th><th>CBAM</th><th>Products</th></tr></thead><tbody>{live.slice(0,30).map(({supplier,score,band})=><tr key={supplier.id}><td><a href={`/admin/suppliers/${supplier.id}`}>{supplier.name}</a></td><td>{supplier.organization.name}</td><td>{supplier.country||'Missing'}</td><td><span className="ccBadge">{supplier.status}</span></td><td><span className={`ccRisk ${band.toLowerCase()}`}>{score} · {band}</span></td><td>{supplier.cbamShipments.length}</td><td>{supplier.lcaProducts.length}</td></tr>)}</tbody></table></div>:<div className="ccEmptySmall">No production suppliers yet.</div>}</section>
  </AdminProductShell>;
}
