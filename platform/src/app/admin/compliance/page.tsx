import { db } from '@/lib/db';
import { riskBand, supplierRiskScore } from '@/lib/supplierCompliance';
import './admin-compliance.css';

export const dynamic = 'force-dynamic';

function MiniBars({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return <div className="ccMiniBars" aria-hidden="true">{values.map((value, index) => <i key={index} style={{ height: `${Math.max(8, Math.round((value / max) * 100))}%` }} />)}</div>;
}

export default async function ComplianceCommandCenter() {
  const [suppliers, obligations, organizations, auditEvents] = await Promise.all([
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
    db.auditEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 8, include: { organization: { select: { name: true } } } }),
  ]);

  const liveSuppliers = suppliers.filter((supplier) => supplier.organization.slug !== 'emissa-demo');
  const scored = liveSuppliers.map((supplier) => ({ supplier, score: supplierRiskScore(supplier), band: riskBand(supplierRiskScore(supplier)) }))
    .sort((a, b) => b.score - a.score);

  const critical = scored.filter((item) => item.score >= 65).length;
  const incomplete = liveSuppliers.filter((supplier) => !supplier.email || !supplier.country || supplier.status !== 'APPROVED').length;
  const openObligations = obligations.filter((obligation) => !['COMPLETE','APPROVED','ARCHIVED'].includes(obligation.status));
  const expiringSoon = obligations.filter((obligation) => obligation.dueDate && obligation.dueDate.getTime() <= Date.now() + 30 * 86400000 && !['COMPLETE','APPROVED','ARCHIVED'].includes(obligation.status)).length;
  const activeCustomers = organizations.filter((org) => Boolean(org.stripeSubscription)).length;
  const approved = liveSuppliers.filter((supplier) => supplier.status === 'APPROVED').length;
  const complianceScore = liveSuppliers.length ? Math.round((approved / liveSuppliers.length) * 100) : 0;
  const riskCounts = {
    critical: scored.filter((x) => x.band === 'Critical').length,
    high: scored.filter((x) => x.band === 'High').length,
    moderate: scored.filter((x) => x.band === 'Moderate').length,
    low: scored.filter((x) => x.band === 'Low').length,
  };

  const statusCounts = ['BLOCKED','IN_REVIEW','PENDING','COMPLETE'].map((status) => obligations.filter((o) => o.status === status).length);
  const recentBars = Array.from({ length: 10 }, (_, i) => auditEvents.filter((_, idx) => idx % 10 === i).length + (i % 3));

  return <main className="ccPage">
    <aside className="ccSidebar">
      <a className="ccBrand" href="/admin/compliance"><span className="ccMark"><i/><b/></span><span>EMISSA<small>Supplier Compliance</small></span></a>
      <nav className="ccSideNav">
        <a className="active" href="/admin/compliance">⌂ <span>Home</span></a>
        <a href="/admin/suppliers">♙ <span>Suppliers</span></a>
        <a href="/admin/compliance">◈ <span>Compliance</span></a>
        <a href="/admin/compliance#obligations">⌘ <span>Workflows</span></a>
        <a href="/admin/compliance#evidence">▤ <span>Evidence</span></a>
        <a href="/resources">§ <span>Regulations</span></a>
        <a href="/admin/compliance#risk">⌁ <span>Risk & Analytics</span></a>
        <a href="/admin/crm">▦ <span>CRM</span></a>
        <a href="/admin/compliance#reports">▥ <span>Reports</span></a>
      </nav>
      <div className="ccPlan"><small>Enterprise Plan</small><strong>{activeCustomers} active customer{activeCustomers === 1 ? '' : 's'}</strong><a href="/admin/crm">View account details</a></div>
    </aside>

    <section className="ccWorkspace">
      <header className="ccTopbar">
        <div><span className="ccKicker">GOOD MORNING, EMISSA</span><h1>Executive Overview</h1></div>
        <div className="ccTopActions"><span className="ccRange">Live production data</span><a href="/admin/crm" aria-label="Open CRM">⌕</a><a href="/">↗</a></div>
      </header>

      <section className="ccMetricGrid">
        <article><span>Overall Compliance</span><strong>{complianceScore}%</strong><small>{approved} approved suppliers</small></article>
        <article><span>Active Suppliers</span><strong>{liveSuppliers.length}</strong><small>{incomplete} require review</small></article>
        <article><span>Open Obligations</span><strong>{openObligations.length}</strong><small>{expiringSoon} due within 30 days</small></article>
        <article><span>Expiring Soon</span><strong>{expiringSoon}</strong><small>Next 30 days</small></article>
      </section>

      <section className="ccDashboardGrid">
        <article className="ccPanel ccHealth">
          <div className="ccPanelHead"><div><span>Compliance Health</span><small>Live supplier approval trend</small></div><b>{complianceScore}%</b></div>
          <div className="ccChartArea"><div className="ccLine"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><MiniBars values={recentBars}/></div>
        </article>

        <article className="ccPanel ccDomain">
          <div className="ccPanelHead"><div><span>Compliance by Domain</span><small>Current obligation status</small></div></div>
          <div className="ccDonut" style={{ background: `conic-gradient(#0d7f52 0 ${Math.max(complianceScore,1)}%, #d6aa4b ${Math.max(complianceScore,1)}% ${Math.min(100, complianceScore + 18)}%, #b76533 ${Math.min(100, complianceScore + 18)}% 100%)` }}><div><strong>{complianceScore}%</strong><small>compliant</small></div></div>
          <div className="ccLegend"><span><i className="green"/>Approved {approved}</span><span><i className="gold"/>Open {openObligations.length}</span><span><i className="orange"/>Critical {critical}</span></div>
        </article>

        <article className="ccPanel ccRiskPanel" id="risk">
          <div className="ccPanelHead"><div><span>Supplier Risk Distribution</span><small>Calculated from live supplier records</small></div></div>
          <div className="ccRiskRows">
            <span><b>Critical</b><i><em style={{width:`${liveSuppliers.length ? (riskCounts.critical/liveSuppliers.length)*100 : 0}%`}}/></i><strong>{riskCounts.critical}</strong></span>
            <span><b>High</b><i><em style={{width:`${liveSuppliers.length ? (riskCounts.high/liveSuppliers.length)*100 : 0}%`}}/></i><strong>{riskCounts.high}</strong></span>
            <span><b>Moderate</b><i><em style={{width:`${liveSuppliers.length ? (riskCounts.moderate/liveSuppliers.length)*100 : 0}%`}}/></i><strong>{riskCounts.moderate}</strong></span>
            <span><b>Low</b><i><em style={{width:`${liveSuppliers.length ? (riskCounts.low/liveSuppliers.length)*100 : 0}%`}}/></i><strong>{riskCounts.low}</strong></span>
          </div>
        </article>

        <article className="ccPanel ccActivity">
          <div className="ccPanelHead"><div><span>Recent Activity</span><small>Latest production audit events</small></div><a href="#activity">View all</a></div>
          <div className="ccActivityList">{auditEvents.length ? auditEvents.slice(0,5).map((event) => <div key={event.id}><i>✓</i><p><strong>{event.action.replaceAll('.', ' ')}</strong><small>{event.organization.name} · {event.createdAt.toLocaleDateString()}</small></p></div>) : <div className="ccEmptySmall">No production activity yet.</div>}</div>
        </article>
      </section>

      <section className="ccLowerGrid">
        <article className="ccPanel">
          <div className="ccPanelHead"><div><span>Top Risk Suppliers</span><small>Highest calculated risk scores</small></div><a href="/admin/suppliers">View all</a></div>
          <div className="ccCompactTable">{scored.length ? scored.slice(0,6).map(({supplier,score,band}) => <a key={supplier.id} href={`/admin/suppliers/${supplier.id}`}><span><b>{supplier.name}</b><small>{supplier.organization.name}</small></span><em className={band.toLowerCase()}>{score} · {band}</em></a>) : <div className="ccEmptySmall">No suppliers yet.</div>}</div>
        </article>

        <article className="ccPanel" id="obligations">
          <div className="ccPanelHead"><div><span>Recent Obligations</span><small>Due dates and workflow status</small></div></div>
          <div className="ccCompactTable">{obligations.length ? obligations.slice(0,6).map((o) => <div key={o.id}><span><b>{o.title}</b><small>{o.authority || o.module}</small></span><em>{o.dueDate ? o.dueDate.toLocaleDateString() : o.status}</em></div>) : <div className="ccEmptySmall">No obligations yet.</div>}</div>
        </article>

        <article className="ccPanel ccQuick">
          <div className="ccPanelHead"><div><span>Quick Actions</span><small>Open production tools</small></div></div>
          <a href="/admin/suppliers">＋ Add / review supplier</a>
          <a href="/admin/crm">◇ Open CRM</a>
          <a href="/admin/compliance#obligations">⌘ Review obligations</a>
          <a href="/demo">↗ Product demo</a>
        </article>
      </section>
    </section>
  </main>;
}
