import { db } from '@/lib/db';
import { riskBand, supplierRiskScore } from '@/lib/supplierCompliance';
import '../compliance/admin-compliance.css';

export const dynamic = 'force-dynamic';

export default async function SupplierDirectory() {
  const suppliers = await db.supplier.findMany({
    include: {
      organization: { select: { name: true, slug: true } },
      cbamShipments: { select: { status: true, embeddedCo2e: true, cnCode: true } },
      lcaProducts: { select: { status: true, totalCo2eKg: true, sku: true } },
    },
    orderBy: { updatedAt: 'desc' },
  });

  const live = suppliers.filter((supplier) => supplier.organization.slug !== 'emissa-demo');

  return <main className="ccPage"><div className="ccShell">
    <header className="ccTop"><div><p>Supplier Network</p><h1>Supplier 360</h1><p>Every production supplier in one live compliance directory.</p></div><nav className="ccNav"><a href="/admin/compliance">Command Center</a><a href="/admin/crm">CRM</a></nav></header>
    {live.length ? <div className="ccTableWrap"><table className="ccTable"><thead><tr><th>Supplier</th><th>Organization</th><th>Country</th><th>Status</th><th>Risk</th><th>CBAM</th><th>LCA / PCF</th><th>Contact</th></tr></thead><tbody>
      {live.map((supplier) => { const score = supplierRiskScore(supplier); const band = riskBand(score); return <tr key={supplier.id}>
        <td><a href={`/admin/suppliers/${supplier.id}`}>{supplier.name}</a></td><td>{supplier.organization.name}</td><td>{supplier.country || 'Missing'}</td><td><span className="ccBadge">{supplier.status}</span></td><td><span className={`ccRisk ${band.toLowerCase()}`}>{score} · {band}</span></td><td>{supplier.cbamShipments.length}</td><td>{supplier.lcaProducts.length}</td><td>{supplier.email || 'Missing'}</td>
      </tr>; })}
    </tbody></table></div> : <div className="ccEmpty">No production suppliers yet. This view intentionally contains no demo or placeholder records.</div>}
  </div></main>;
}
