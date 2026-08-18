import type { Metadata } from 'next';
import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import './admin-crm.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Admin CRM', robots: { index: false, follow: false } };

type Lead = { id:string; firstName:string; email:string; company:string; source:string; createdAt:Date; updatedAt:Date };
type SourceRow = { source:string; count:bigint };

async function leads(q:string) {
  try {
    const needle = `%${q}%`;
    return q
      ? db.$queryRaw<Lead[]>(Prisma.sql`SELECT "id","firstName","email","company","source","createdAt","updatedAt" FROM "MarketingLead" WHERE "firstName" ILIKE ${needle} OR "email" ILIKE ${needle} OR "company" ILIKE ${needle} OR "source" ILIKE ${needle} ORDER BY "createdAt" DESC LIMIT 250`)
      : db.$queryRaw<Lead[]>(Prisma.sql`SELECT "id","firstName","email","company","source","createdAt","updatedAt" FROM "MarketingLead" ORDER BY "createdAt" DESC LIMIT 250`);
  } catch { return []; }
}

async function leadCount() {
  try { const r = await db.$queryRaw<Array<{count:bigint}>>(Prisma.sql`SELECT COUNT(*)::bigint count FROM "MarketingLead"`); return Number(r[0]?.count ?? 0); } catch { return 0; }
}

async function sources() {
  try { return await db.$queryRaw<SourceRow[]>(Prisma.sql`SELECT COALESCE(NULLIF("source",''),'unknown') source, COUNT(*)::bigint count FROM "MarketingLead" GROUP BY 1 ORDER BY count DESC LIMIT 10`); } catch { return []; }
}

const fmt = (d:Date) => new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric'}).format(d);
const label = (s:string) => s.replace(/^blog-lead-magnet-/,'').replace(/^lead-magnet-/,'').replaceAll('-',' ').replace(/\b\w/g,m=>m.toUpperCase());

export default async function AdminCrm({ searchParams }:{ searchParams:Promise<{q?:string}> }) {
  const { q = '' } = await searchParams;
  const query = q.trim().slice(0,100);
  const [leadRows,totalLeads,sourceRows,orgs,totalOrgs,founding,subs] = await Promise.all([
    leads(query), leadCount(), sources(),
    db.organization.findMany({ where:{ slug:{ not:'emissa-demo' } }, orderBy:{createdAt:'desc'}, take:100, select:{id:true,name:true,slug:true,onboardingStatus:true,legacySeatNumber:true,stripeCustomerId:true,stripeSubscription:true,createdAt:true,_count:{select:{memberships:true,suppliers:true,facilities:true,files:true}}} }),
    db.organization.count({ where:{ slug:{ not:'emissa-demo' } } }),
    db.organization.count({ where:{ slug:{ not:'emissa-demo' }, legacySeatNumber:{not:null} } }),
    db.organization.count({ where:{ slug:{ not:'emissa-demo' }, stripeSubscription:{not:null} } }),
  ]);
  const totalSources = sourceRows.reduce((n,r)=>n+Number(r.count),0) || 1;
  const onboarding = orgs.filter(o=>!['complete','completed','active','live'].includes(o.onboardingStatus.toLowerCase())).slice(0,10);

  return <main className="adminCrm">
    <header className="crmTopbar"><div className="crmBrand"><div className="crmLogo"/><div><strong>Emissa Admin CRM</strong><span>Production revenue and customer operations</span></div></div><div className="crmTopActions"><a className="crmBtn" href="/admin">Admin home</a><a className="crmBtn primary" href="/">Live site</a></div></header>
    <div className="crmShell">
      <aside className="crmSidebar"><h4>Revenue</h4><a className="active" href="/admin/crm">CRM overview</a><a href="#leads">Lead pipeline</a><a href="#customers">Customers</a><h4>Operations</h4><a href="#onboarding">Onboarding</a><a href="#sources">Lead sources</a></aside>
      <section className="crmMain">
        <div className="crmHeading"><div><h1>CRM & Customer Intelligence</h1><p>Live database records only. Demo records are excluded from production CRM views.</p></div><span className="crmStatus"><i/> Production data</span></div>
        <div className="crmStats">
          <article className="crmStat"><span>Total leads</span><strong>{totalLeads}</strong><small>Captured marketing leads</small></article>
          <article className="crmStat"><span>Organizations</span><strong>{totalOrgs}</strong><small>Production customer accounts</small></article>
          <article className="crmStat"><span>Subscriptions</span><strong>{subs}</strong><small>Stripe-linked subscriptions</small></article>
          <article className="crmStat"><span>Founding seats</span><strong>{founding}</strong><small>{Math.max(0,50-founding)} of 50 remaining</small></article>
          <article className="crmStat"><span>Lead sources</span><strong>{sourceRows.length}</strong><small>Tracked acquisition channels</small></article>
        </div>

        <section className="crmPanel" id="leads"><div className="crmPanelHead"><div><h2>Lead pipeline</h2><p>Website and lead-magnet conversions</p></div><form className="crmSearch" method="get"><input name="q" defaultValue={query} placeholder="Search leads"/><button className="crmBtn">Search</button></form></div><div className="crmTableWrap"><table className="crmTable"><thead><tr><th>Lead</th><th>Company</th><th>Source</th><th>Captured</th><th>Updated</th></tr></thead><tbody>{leadRows.map(l=><tr key={l.id}><td><strong>{l.firstName}</strong><br/>{l.email}</td><td>{l.company}</td><td><span className="crmPill">{label(l.source||'unknown')}</span></td><td>{fmt(l.createdAt)}</td><td>{fmt(l.updatedAt)}</td></tr>)}</tbody></table>{!leadRows.length&&<div className="crmEmpty">No lead records found.</div>}</div></section>

        <section className="crmPanel" id="customers"><div className="crmPanelHead"><div><h2>Customer accounts</h2><p>Production organizations and implementation status</p></div></div><div className="crmTableWrap"><table className="crmTable"><thead><tr><th>Organization</th><th>Billing</th><th>Founding seat</th><th>Onboarding</th><th>Workspace</th><th>Created</th></tr></thead><tbody>{orgs.map(o=><tr key={o.id}><td><strong>{o.name}</strong><br/>{o.slug}</td><td>{o.stripeSubscription?<span className="crmPill">Subscribed</span>:o.stripeCustomerId?<span className="crmPill purple">Stripe customer</span>:'Not linked'}</td><td>{o.legacySeatNumber?`#${o.legacySeatNumber}`:'—'}</td><td><span className="crmPill purple">{o.onboardingStatus.replaceAll('_',' ')}</span></td><td>{o._count.memberships} users · {o._count.suppliers} suppliers · {o._count.facilities} facilities · {o._count.files} files</td><td>{fmt(o.createdAt)}</td></tr>)}</tbody></table>{!orgs.length&&<div className="crmEmpty">No production customer accounts yet.</div>}</div></section>

        <div className="crmGrid2">
          <section className="crmPanel" id="sources"><div className="crmPanelHead"><div><h2>Lead-source performance</h2><p>Actual captured lead distribution</p></div></div><div className="crmList">{sourceRows.map(r=>{const c=Number(r.count);const w=Math.max(3,Math.round(c/totalSources*100));return <div className="crmListItem" key={r.source}><div style={{flex:1}}><strong>{label(r.source)}</strong><div className="crmProgress"><i style={{width:`${w}%`}}/></div></div><span>{c} leads</span></div>})}{!sourceRows.length&&<div className="crmEmpty">No lead-source data yet.</div>}</div></section>
          <section className="crmPanel" id="onboarding"><div className="crmPanelHead"><div><h2>Onboarding queue</h2><p>Accounts that still require implementation work</p></div></div><div className="crmList">{onboarding.map(o=><div className="crmListItem" key={o.id}><div><strong>{o.name}</strong><br/><span>{o.onboardingStatus.replaceAll('_',' ')}</span></div><span>{o.stripeSubscription?'Paid':'Not subscribed'}</span></div>)}{!onboarding.length&&<div className="crmEmpty">No onboarding items waiting.</div>}</div></section>
        </div>
      </section>
    </div>
  </main>;
}
