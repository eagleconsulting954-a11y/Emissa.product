import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { recommendedRequirements, riskBand, supplierRiskScore } from '@/lib/supplierCompliance';
import '../../compliance/admin-compliance.css';

export const dynamic = 'force-dynamic';

export default async function SupplierProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supplier = await db.supplier.findUnique({
    where: { id },
    include: {
      organization: { select: { name: true, slug: true, onboardingStatus: true, stripeSubscription: true } },
      cbamShipments: { orderBy: { updatedAt: 'desc' } },
      lcaProducts: { orderBy: { updatedAt: 'desc' } },
    },
  });

  if (!supplier || supplier.organization.slug === 'emissa-demo') notFound();

  const score = supplierRiskScore(supplier);
  const band = riskBand(score);
  const requirements = recommendedRequirements(supplier);

  return <main className="ccPage"><div className="ccShell">
    <header className="ccTop"><div><p>Supplier 360 Profile</p><h1>{supplier.name}</h1><p>{supplier.organization.name} · {supplier.country || 'Country missing'}</p></div><nav className="ccNav"><a href="/admin/suppliers">All Suppliers</a><a href="/admin/compliance">Command Center</a></nav></header>

    <section className="ccGrid">
      <article className="ccCard"><small>Compliance status</small><strong style={{fontSize:24}}>{supplier.status}</strong><p>Current supplier record status.</p></article>
      <article className="ccCard"><small>Risk score</small><strong>{score}</strong><p><span className={`ccRisk ${band.toLowerCase()}`}>{band} risk</span></p></article>
      <article className="ccCard"><small>CBAM shipments</small><strong>{supplier.cbamShipments.length}</strong><p>Shipment records connected to this supplier.</p></article>
      <article className="ccCard"><small>Product footprints</small><strong>{supplier.lcaProducts.length}</strong><p>LCA / PCF product records connected to this supplier.</p></article>
    </section>

    <section className="ccSection"><h2>Supplier identity</h2><div className="ccGrid">
      <article className="ccCard"><small>Primary contact</small><strong style={{fontSize:20}}>{supplier.email || 'Missing'}</strong><p>Compliance contact used for requests and follow-up.</p></article>
      <article className="ccCard"><small>Country</small><strong style={{fontSize:20}}>{supplier.country || 'Missing'}</strong><p>Operating jurisdiction for requirement mapping.</p></article>
      <article className="ccCard"><small>Customer onboarding</small><strong style={{fontSize:20}}>{supplier.organization.onboardingStatus}</strong><p>Organization-level onboarding state.</p></article>
      <article className="ccCard"><small>Billing</small><strong style={{fontSize:20}}>{supplier.organization.stripeSubscription ? 'Active' : 'Not active'}</strong><p>Live Stripe subscription state.</p></article>
    </div></section>

    <section className="ccSection"><h2>Compliance requirement engine</h2><div className="ccGrid">
      {requirements.map((requirement) => <article className="ccCard" key={requirement}><small>Required evidence</small><p style={{color:'#dce7f1',marginTop:10}}>{requirement}</p></article>)}
    </div></section>

    <section className="ccSection"><h2>CBAM activity</h2>
      {supplier.cbamShipments.length ? <div className="ccTableWrap"><table className="ccTable"><thead><tr><th>Shipment</th><th>Product</th><th>CN code</th><th>Origin</th><th>Status</th><th>Embedded CO₂e</th></tr></thead><tbody>
        {supplier.cbamShipments.map((row) => <tr key={row.id}><td>{row.shipmentReference}</td><td>{row.productName}</td><td>{row.cnCode || 'Missing'}</td><td>{row.originCountry}</td><td><span className="ccBadge">{row.status}</span></td><td>{row.embeddedCo2e ? String(row.embeddedCo2e) : 'Missing'}</td></tr>)}
      </tbody></table></div> : <div className="ccEmpty">No CBAM records are connected to this supplier.</div>}
    </section>

    <section className="ccSection"><h2>Product carbon / LCA records</h2>
      {supplier.lcaProducts.length ? <div className="ccTableWrap"><table className="ccTable"><thead><tr><th>Product</th><th>SKU</th><th>Boundary</th><th>Status</th><th>CO₂e kg</th><th>Updated</th></tr></thead><tbody>
        {supplier.lcaProducts.map((row) => <tr key={row.id}><td>{row.name}</td><td>{row.sku || 'Missing'}</td><td>{row.boundary}</td><td><span className="ccBadge">{row.status}</span></td><td>{row.totalCo2eKg ? String(row.totalCo2eKg) : 'Missing'}</td><td>{row.updatedAt.toLocaleDateString()}</td></tr>)}
      </tbody></table></div> : <div className="ccEmpty">No product carbon or LCA records are connected to this supplier.</div>}
    </section>
  </div></main>;
}
