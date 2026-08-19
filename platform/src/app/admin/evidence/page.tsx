import { db } from '@/lib/db';
import AdminProductShell from '@/components/AdminProductShell';
import '../compliance/admin-compliance.css';
import '../product-template.css';

export const dynamic='force-dynamic';

export default async function EvidenceVault(){
  const files=await db.evidenceFile.findMany({orderBy:{createdAt:'desc'},take:100,include:{organization:{select:{name:true,slug:true}}}});
  const live=files.filter(f=>f.organization.slug!=='emissa-demo');
  const totalBytes=live.reduce((n,f)=>n+f.sizeBytes,0);
  const types=new Set(live.map(f=>f.mimeType)).size;
  const linked=live.filter(f=>f.emissionRecordId||f.eprRecordId||f.cbamShipmentId||f.lcaProductId).length;
  return <AdminProductShell title="Evidence Vault" eyebrow="Controlled evidence and document management" active="/admin/evidence" actions={<a href="/admin/suppliers">Supplier 360</a>}>
    <section className="ccMetricGrid"><article><span>Evidence files</span><strong>{live.length}</strong><small>Production files</small></article><article><span>Linked records</span><strong>{linked}</strong><small>Evidence tied to compliance data</small></article><article><span>File types</span><strong>{types}</strong><small>Distinct MIME types</small></article><article><span>Storage</span><strong>{(totalBytes/1024/1024).toFixed(1)}</strong><small>MB indexed in vault</small></article></section>
    <section className="ccDashboardGrid">
      <article className="ccPanel ccHealth"><div className="ccPanelHead"><div><span>All evidence</span><small>Search-ready production evidence library</small></div><b>{live.length}</b></div>{live.length?<div className="evidenceList">{live.slice(0,18).map(f=><div className="evidenceRow" key={f.id}><span className="fileIcon">▣</span><div><b>{f.name}</b><small>{f.organization.name} · {f.mimeType}</small></div><em>{(f.sizeBytes/1024).toFixed(0)} KB</em><span className={f.checksum?'evValid':'evPending'}>{f.checksum?'Verified':'Stored'}</span></div>)}</div>:<div className="ccEmptySmall">No production evidence files yet.</div>}</article>
      <article className="ccPanel"><div className="ccPanelHead"><div><span>Evidence integrity</span><small>Controlled file status</small></div></div><div className="ccDonut" style={{background:`conic-gradient(#2f8a5e ${live.length?Math.round(linked/live.length*100):0}%,#d5a84a 0)`}}><div><strong>{live.length?Math.round(linked/live.length*100):0}%</strong><small>linked</small></div></div><div className="ccLegend"><span><i className="green"/>Linked</span><span><i className="gold"/>Unlinked</span><span><i className="orange"/>Review</span></div></article>
      <article className="ccPanel"><div className="ccPanelHead"><div><span>Evidence categories</span><small>Connected workflow types</small></div></div><div className="ccQuick"><a href="/admin/evidence">Supplier certificates</a><a href="/admin/evidence">CBAM evidence</a><a href="/admin/evidence">EPR documents</a><a href="/admin/evidence">Carbon / LCA evidence</a><a href="/admin/evidence">Buyer response packages</a></div></article>
    </section>
  </AdminProductShell>;
}
