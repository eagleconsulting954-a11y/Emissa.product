import { db } from '@/lib/db';
import { addCertificate, addDataRoom, addDeadline, addIntegration, addMarketplaceRequest } from './actions';

export const dynamic='force-dynamic';

type Org={id:string;name:string};
type Count={value:number};
type Certificate={id:string;name:string;certificateType:string;expirationDate:Date|null;status:string;organizationName:string};
type Deadline={id:string;programName:string;deadlineType:string;dueDate:Date;status:string;organizationName:string};
type Integration={id:string;provider:string;category:string;status:string;lastSyncAt:Date|null;organizationName:string};
type Room={id:string;name:string;purpose:string;status:string;expiresAt:Date|null;organizationName:string};
type Request={id:string;serviceType:string;region:string|null;status:string;organizationName:string};

const date=new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric'});
const featureCards=[
 ['Direct Utility & EDI Integrations','Connect UtilityAPI, Arcadia, Walmart Retail Link, SAP Ariba, Coupa, WEX and Fuelman through scheduled syncs and source mapping.'],
 ['Multi-Facility Rollup','Define parent-child facility structures and consolidate emissions by operational control, financial control or equity share.'],
 ['Grant & Tax-Credit Matcher','Match company profile, NAICS code, location, revenue and planned investments to maintained federal and state incentive programs.'],
 ['Certificate Expiration Tracker','Store compliance certificates, owners, issue dates and expiration dates with lifecycle status and reminder-ready records.'],
 ['Auditor / Consultant Marketplace','Submit audit and consulting requests by service, region, budget and target date for matching with vetted providers.'],
 ['Carbon Offset Marketplace','Connect verified offset inventory and purchasing records to measured emissions and preserve the transaction audit trail.'],
 ['Anonymized Peer Benchmark Index','Create privacy-thresholded NAICS and revenue-band cohorts with median and quartile emissions intensity metrics.'],
 ['Compliance Deadline Calendar','Track buyer-program and regulatory dates, recurrence rules, ownership and notification channels.'],
 ['Due-Diligence Data Rooms','Assemble secure compliance rooms for M&A, lenders and buyer review using reports, certificates and evidence files.'],
];

async function data(){
 const [organizations,certificates,deadlines,integrations,rooms,requests,programs,offsets,benchmarks]=await Promise.all([
  db.$queryRaw<Org[]>`SELECT "id","name" FROM "Organization" ORDER BY "name"`,
  db.$queryRaw<Certificate[]>`SELECT c."id",c."name",c."certificateType",c."expirationDate",c."status"::text AS "status",o."name" AS "organizationName" FROM "Certificate" c JOIN "Organization" o ON o."id"=c."organizationId" ORDER BY c."expirationDate" NULLS LAST LIMIT 20`,
  db.$queryRaw<Deadline[]>`SELECT d."id",d."programName",d."deadlineType",d."dueDate",d."status",o."name" AS "organizationName" FROM "ComplianceDeadline" d JOIN "Organization" o ON o."id"=d."organizationId" ORDER BY d."dueDate" LIMIT 20`,
  db.$queryRaw<Integration[]>`SELECT i."id",i."provider",i."category",i."status"::text AS "status",i."lastSyncAt",o."name" AS "organizationName" FROM "IntegrationConnection" i JOIN "Organization" o ON o."id"=i."organizationId" ORDER BY i."updatedAt" DESC LIMIT 20`,
  db.$queryRaw<Room[]>`SELECT r."id",r."name",r."purpose",r."status"::text AS "status",r."expiresAt",o."name" AS "organizationName" FROM "DataRoom" r JOIN "Organization" o ON o."id"=r."organizationId" ORDER BY r."updatedAt" DESC LIMIT 20`,
  db.$queryRaw<Request[]>`SELECT r."id",r."serviceType",r."region",r."status"::text AS "status",o."name" AS "organizationName" FROM "MarketplaceRequest" r JOIN "Organization" o ON o."id"=r."organizationId" ORDER BY r."updatedAt" DESC LIMIT 20`,
  db.$queryRaw<Count[]>`SELECT COUNT(*)::int AS "value" FROM "IncentiveProgram" WHERE "active"=true`,
  db.$queryRaw<Count[]>`SELECT COUNT(*)::int AS "value" FROM "OffsetProject" WHERE "active"=true`,
  db.$queryRaw<Count[]>`SELECT COUNT(*)::int AS "value" FROM "BenchmarkCohort"`,
 ]);
 return {organizations,certificates,deadlines,integrations,rooms,requests,programs:programs[0]?.value??0,offsets:offsets[0]?.value??0,benchmarks:benchmarks[0]?.value??0};
}

export default async function ExpansionPage(){const d=await data();return <main className="main">
 <header className="topbar"><div><h1>Operations, Integrations & Marketplaces</h1><p className="muted">The complete non-AI expansion suite, backed by production database records and real empty states.</p></div><a className="button" href="/">Back to dashboard</a></header>
 <section className="grid metrics"><article className="card metric"><span>Connected sources</span><strong>{d.integrations.length}</strong></article><article className="card metric"><span>Certificates</span><strong>{d.certificates.length}</strong></article><article className="card metric"><span>Upcoming deadlines</span><strong>{d.deadlines.length}</strong></article><article className="card metric"><span>Data rooms</span><strong>{d.rooms.length}</strong></article></section>
 <section><h2>Expansion products</h2><div className="grid moduleGrid">{featureCards.map(([t,p])=><article className="card moduleCard" key={t}><span className="status complete">Included</span><h3>{t}</h3><p>{p}</p></article>)}</div></section>
 <section className="grid layout"><article className="card"><h2>Operational records</h2><div className="list"><div className="listItem"><b>Active incentive programs</b><p className="muted">{d.programs} maintained programs available for deterministic matching.</p></div><div className="listItem"><b>Verified offset projects</b><p className="muted">{d.offsets} active inventory records connected.</p></div><div className="listItem"><b>Benchmark cohorts</b><p className="muted">{d.benchmarks} privacy-thresholded cohorts generated.</p></div><div className="listItem"><b>Marketplace requests</b><p className="muted">{d.requests.length} current service requests.</p></div></div></article><article className="card"><h2>Integrations</h2>{d.integrations.length===0?<p className="muted">No integrations configured.</p>:d.integrations.map(i=><div className="listItem" key={i.id}><b>{i.provider}</b><p className="muted">{i.organizationName} · {i.category} · {i.status}</p></div>)}</article></section>
 <section className="grid layout"><article className="card"><h2>Certificate tracker</h2>{d.certificates.length===0?<p className="muted">No certificates uploaded.</p>:d.certificates.map(c=><div className="listItem" key={c.id}><b>{c.name}</b><p className="muted">{c.organizationName} · {c.certificateType} · {c.expirationDate?date.format(c.expirationDate):'No expiry'}</p></div>)}</article><article className="card"><h2>Deadline calendar</h2>{d.deadlines.length===0?<p className="muted">No deadlines configured.</p>:d.deadlines.map(x=><div className="listItem" key={x.id}><b>{x.programName}</b><p className="muted">{x.organizationName} · {x.deadlineType} · {date.format(x.dueDate)}</p></div>)}</article></section>
 <section className="grid layout"><article className="card"><h2>Marketplace requests</h2>{d.requests.length===0?<p className="muted">No auditor or consultant requests.</p>:d.requests.map(x=><div className="listItem" key={x.id}><b>{x.serviceType}</b><p className="muted">{x.organizationName} · {x.region||'Any region'} · {x.status}</p></div>)}</article><article className="card"><h2>Due-diligence data rooms</h2>{d.rooms.length===0?<p className="muted">No secure data rooms created.</p>:d.rooms.map(x=><div className="listItem" key={x.id}><b>{x.name}</b><p className="muted">{x.organizationName} · {x.purpose} · {x.status}</p></div>)}</article></section>
 <section><h2>Create operational records</h2><div className="grid moduleGrid">
  <article className="card"><h3>Add integration</h3><form action={addIntegration} className="list"><select name="organizationId" required><option value="">Organization</option>{d.organizations.map(o=><option value={o.id} key={o.id}>{o.name}</option>)}</select><input name="provider" placeholder="UtilityAPI, Arcadia, Retail Link..." required/><input name="category" placeholder="utility, retailer, fleet" required/><input name="externalAccountId" placeholder="External account ID"/><button className="button primary">Configure</button></form></article>
  <article className="card"><h3>Add certificate</h3><form action={addCertificate} className="list"><select name="organizationId" required><option value="">Organization</option>{d.organizations.map(o=><option value={o.id} key={o.id}>{o.name}</option>)}</select><input name="name" placeholder="Certificate name" required/><input name="certificateType" placeholder="ISO 14001, COI, W-9..." required/><input name="issuer" placeholder="Issuer"/><input name="certificateNumber" placeholder="Certificate number"/><input name="expirationDate" type="date"/><input name="ownerEmail" type="email" placeholder="Owner email"/><button className="button primary">Save certificate</button></form></article>
  <article className="card"><h3>Add deadline</h3><form action={addDeadline} className="list"><select name="organizationId" required><option value="">Organization</option>{d.organizations.map(o=><option value={o.id} key={o.id}>{o.name}</option>)}</select><input name="programName" placeholder="Walmart Gigaton, EcoVadis..." required/><input name="deadlineType" placeholder="Audit, filing, renewal" required/><input name="dueDate" type="date" required/><input name="recurrenceRule" placeholder="RRULE or annual"/><input name="ownerEmail" type="email" placeholder="Owner email"/><button className="button primary">Add deadline</button></form></article>
  <article className="card"><h3>Request auditor / consultant</h3><form action={addMarketplaceRequest} className="list"><select name="organizationId" required><option value="">Organization</option>{d.organizations.map(o=><option value={o.id} key={o.id}>{o.name}</option>)}</select><input name="serviceType" placeholder="ISO audit, CBAM verification..." required/><input name="region" placeholder="Region"/><input name="targetDate" type="date"/><input name="budget" type="number" min="0" placeholder="Budget"/><textarea name="notes" placeholder="Requirements"/><button className="button primary">Submit request</button></form></article>
  <article className="card"><h3>Create data room</h3><form action={addDataRoom} className="list"><select name="organizationId" required><option value="">Organization</option>{d.organizations.map(o=><option value={o.id} key={o.id}>{o.name}</option>)}</select><input name="name" placeholder="Data room name" required/><input name="purpose" placeholder="M&A, lender review, buyer diligence" required/><input name="requesterName" placeholder="Requester"/><input name="requesterEmail" type="email" placeholder="Requester email"/><input name="expiresAt" type="date"/><button className="button primary">Create room</button></form></article>
 </div></section>
 </main>}
