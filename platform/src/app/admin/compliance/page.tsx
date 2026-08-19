import { db } from '@/lib/db';
import { riskBand, supplierRiskScore } from '@/lib/supplierCompliance';
import './admin-compliance.css';

export const dynamic = 'force-dynamic';

export default async function ComplianceCommandCenter() {
  const [suppliers, obligations, organizations] = await Promise.all([
    db.supplier.findMany({
      include: {
        cbamShipments: { select: { status: true, embeddedCo2e: true, cnCode: true } },
        lcaProducts: { select: { status: true, totalCo2eKg: true, sku: true } },
        organization: { select: { name: true, slug: true } },
      },
      orderBy: { updatedAt: 'desc' },
    }),
    db.obligation.findMany({ orderBy: { dueDate: 'asc' }, take: 30 }),
    db.organization.findMany({
      where: { NOT: { slug: 'emissa-demo' } },
      select: { id: true, onboardingStatus: true, stripeSubscription: true },
    }),
  ]);

  const liveSuppliers = suppliers.filter((supplier) => supplier.organization.slug !== 'emissa-demo');
  const scored = liveSuppliers.map((supplier) => ({ supplier, score: supplierRiskScore(supplier), band: riskBand(supplierRiskScore(supplier)) }))
    .sort((a, b) => b.score - a.score);

  const critical = scored.filter((item) => item.score >= 65).length;
  const incomplete = liveSuppliers.filter((supplier) => !supplier.email || !supplier.country || supplier.status !== 'APPROVED').length;
  const openObligations = obligations.filter((obligation) => !['COMPLETE','APPROVED','ARCHIVED'].includes(obligation.status)).length;
  const activeCustomers = organizations.filter((org) => Boolean(org.stripeSubscription)).length;

  return <main className="ccPage"><div className="ccShell">
    <header className="ccTop">
      <div><p>Emissa Operations</p><h1>Compliance Command Center</h1><p>Live supplier, obligation and customer data only.</p></div>
      <nav className="ccNav"><a href="/admin/crm">CRM</a><a href="/admin/suppliers">Supplier 360</a><a href="/">Website</a></nav>
    </header>

    <section className="ccGrid">
      <article className="ccCard"><small>Suppliers</small><strong>{liveSuppliers.length}</strong><p>Active supplier records across production organizations.</p></article>
      <article className="ccCard"><small>Critical risk</small><strong>{critical}</strong><p>Suppliers requiring immediate compliance review.</p></article>
      <article className="ccCard"><small>Incomplete records</small><strong>{incomplete}</strong><p>Supplier profiles with missing or unapproved core data.</p></article>
      <article className="ccCard"><small>Open obligations</small><strong>{openObligations}</strong><p>Current compliance obligations not yet complete.</p></article>
      <article className="ccCard"><small>Active customers</small><strong>{activeCustomers}</strong><p>Organizations with an active Stripe subscription.</p></article>
    </section>

    <section className="ccSection"><h2>Highest-risk suppliers</h2>
      {scored.length ? <div className="ccTableWrap"><table className="ccTable"><thead><tr><th>Supplier</th><th>Organization</th><th>Status</th><th>Risk</th><th>CBAM</th><th>Products</th><th>Updated</th></tr></thead><tbody>
        {scored.slice(0,20).map(({ supplier, score, band }) => <tr key={supplier.id}>
          <td><a href={`/admin/suppliers/${supplier.id}`}>{supplier.name}</a></td><td>{supplier.organization.name}</td><td><span className="ccBadge">{supplier.status}</span></td>
          <td><span className={`ccRisk ${band.toLowerCase()}`}>{score} · {band}</span></td><td>{supplier.cbamShipments.length}</td><td>{supplier.lcaProducts.length}</td><td>{supplier.updatedAt.toLocaleDateString()}</td>
        </tr>)}
      </tbody></table></div> : <div className="ccEmpty">No production supplier records yet. New supplier records will appear here automatically.</div>}
    </section>

    <section className="ccSection"><h2>Upcoming compliance obligations</h2>
      {obligations.length ? <div className="ccTableWrap"><table className="ccTable"><thead><tr><th>Requirement</th><th>Module</th><th>Status</th><th>Authority</th><th>Due date</th></tr></thead><tbody>
        {obligations.map((obligation) => <tr key={obligation.id}><td>{obligation.title}</td><td>{obligation.module}</td><td><span className="ccBadge">{obligation.status}</span></td><td>{obligation.authority || '—'}</td><td>{obligation.dueDate ? obligation.dueDate.toLocaleDateString() : 'No date'}</td></tr>)}
      </tbody></table></div> : <div className="ccEmpty">No compliance obligations have been created yet.</div>}
    </section>
  </div></main>;
}
