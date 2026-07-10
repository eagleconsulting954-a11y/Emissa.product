import { db } from '@/lib/db';
import { completeActivity, createCrmAccount, createCrmActivity, createCrmContact, createCrmDeal, updateDealStage } from './actions';
import './admin.css';

export const dynamic = 'force-dynamic';

type OrganizationRow = { id: string; name: string; slug: string; stripeSubscription: string | null; onboardingStatus: string; createdAt: Date };
type AccountRow = { id: string; organizationId: string; organizationName: string; name: string; domain: string | null; industry: string | null; status: string; source: string | null; createdAt: Date };
type ContactRow = { id: string; organizationId: string; accountId: string | null; name: string; email: string | null; phone: string | null; jobTitle: string | null; accountName: string | null };
type DealRow = { id: string; organizationId: string; accountId: string; accountName: string; name: string; stage: string; amount: number; probability: number; expectedCloseDate: Date | null };
type ActivityRow = { id: string; organizationId: string; accountId: string | null; contactId: string | null; dealId: string | null; type: string; subject: string; body: string | null; dueAt: Date | null; completedAt: Date | null; createdAt: Date; accountName: string | null };
type FunnelRow = { stage: string; count: number; value: number };
type ScalarRow = { value: number };

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

async function loadAdminData() {
  const [organizations, accounts, contacts, deals, activities, userCount, subscriptionCount, funnel] = await Promise.all([
    db.$queryRaw<OrganizationRow[]>`SELECT "id", "name", "slug", "stripeSubscription", "onboardingStatus", "createdAt" FROM "Organization" ORDER BY "createdAt" DESC`,
    db.$queryRaw<AccountRow[]>`SELECT a."id", a."organizationId", o."name" AS "organizationName", a."name", a."domain", a."industry", a."status"::text AS "status", a."source", a."createdAt" FROM "CrmAccount" a JOIN "Organization" o ON o."id"=a."organizationId" ORDER BY a."createdAt" DESC LIMIT 100`,
    db.$queryRaw<ContactRow[]>`SELECT c."id", c."organizationId", c."accountId", CONCAT(c."firstName", ' ', c."lastName") AS "name", c."email", c."phone", c."jobTitle", a."name" AS "accountName" FROM "CrmContact" c LEFT JOIN "CrmAccount" a ON a."id"=c."accountId" ORDER BY c."createdAt" DESC LIMIT 100`,
    db.$queryRaw<DealRow[]>`SELECT d."id", d."organizationId", d."accountId", a."name" AS "accountName", d."name", d."stage"::text AS "stage", d."amount"::float AS "amount", d."probability", d."expectedCloseDate" FROM "CrmDeal" d JOIN "CrmAccount" a ON a."id"=d."accountId" ORDER BY d."updatedAt" DESC LIMIT 100`,
    db.$queryRaw<ActivityRow[]>`SELECT x."id", x."organizationId", x."accountId", x."contactId", x."dealId", x."type"::text AS "type", x."subject", x."body", x."dueAt", x."completedAt", x."createdAt", a."name" AS "accountName" FROM "CrmActivity" x LEFT JOIN "CrmAccount" a ON a."id"=x."accountId" ORDER BY x."createdAt" DESC LIMIT 50`,
    db.$queryRaw<ScalarRow[]>`SELECT COUNT(*)::int AS "value" FROM "User"`,
    db.$queryRaw<ScalarRow[]>`SELECT COUNT(*)::int AS "value" FROM "Organization" WHERE "stripeSubscription" IS NOT NULL`,
    db.$queryRaw<FunnelRow[]>`SELECT "stage"::text AS "stage", COUNT(*)::int AS "count", COALESCE(SUM("amount"),0)::float AS "value" FROM "CrmDeal" GROUP BY "stage" ORDER BY "stage"`,
  ]);
  return { organizations, accounts, contacts, deals, activities, userCount: userCount[0]?.value ?? 0, subscriptionCount: subscriptionCount[0]?.value ?? 0, funnel };
}

export default async function AdminPage() {
  const data = await loadAdminData();
  const pipelineValue = data.deals.filter((d) => !['CLOSED_WON', 'CLOSED_LOST'].includes(d.stage)).reduce((sum, d) => sum + d.amount, 0);
  const weightedPipeline = data.deals.filter((d) => !['CLOSED_WON', 'CLOSED_LOST'].includes(d.stage)).reduce((sum, d) => sum + d.amount * (d.probability / 100), 0);
  const wonRevenue = data.deals.filter((d) => d.stage === 'CLOSED_WON').reduce((sum, d) => sum + d.amount, 0);
  const mrr = data.subscriptionCount * 2500;
  const maxFunnel = Math.max(1, ...data.funnel.map((row) => row.count));

  return <main className="adminShell">
    <header className="adminHeader">
      <div><div className="eyebrow">Emissa Internal Operations</div><h1>Admin Analytics & CRM</h1><p className="muted">Live metrics from the production database. No sample or hard-coded CRM records are shown.</p></div>
      <a className="button" href="/">Open customer platform</a>
    </header>

    <section className="metricGrid">
      <article className="metricCard"><span>Organizations</span><strong>{data.organizations.length}</strong><small className="muted">Total tenants</small></article>
      <article className="metricCard"><span>Users</span><strong>{data.userCount}</strong><small className="muted">Platform users</small></article>
      <article className="metricCard"><span>Active subscriptions</span><strong>{data.subscriptionCount}</strong><small className="muted">Stripe-linked accounts</small></article>
      <article className="metricCard"><span>MRR</span><strong>{currency.format(mrr)}</strong><small className="muted">At $2,500 per subscription</small></article>
      <article className="metricCard"><span>Open pipeline</span><strong>{currency.format(pipelineValue)}</strong><small className="muted">Unclosed opportunities</small></article>
      <article className="metricCard"><span>Weighted pipeline</span><strong>{currency.format(weightedPipeline)}</strong><small className="muted">Probability adjusted</small></article>
    </section>

    <section className="grid2">
      <article className="panel">
        <h2>Sales funnel</h2>
        {data.funnel.length === 0 ? <div className="empty">No deals yet. Add the first opportunity below.</div> : <div className="funnel">{data.funnel.map((row) => <div className="funnelRow" key={row.stage}><span>{row.stage.replaceAll('_',' ')}</span><div className="track"><div className="fill" style={{width:`${Math.max(6,(row.count/maxFunnel)*100)}%`}} /></div><b>{row.count}</b></div>)}</div>}
      </article>
      <article className="panel">
        <h2>Revenue analytics</h2>
        <div className="activityList">
          <div className="activity"><div className="activityTop"><b>Closed-won revenue</b><strong>{currency.format(wonRevenue)}</strong></div></div>
          <div className="activity"><div className="activityTop"><b>Average deal size</b><strong>{currency.format(data.deals.length ? data.deals.reduce((s,d)=>s+d.amount,0)/data.deals.length : 0)}</strong></div></div>
          <div className="activity"><div className="activityTop"><b>CRM accounts</b><strong>{data.accounts.length}</strong></div></div>
          <div className="activity"><div className="activityTop"><b>Contacts</b><strong>{data.contacts.length}</strong></div></div>
        </div>
      </article>
    </section>

    <section className="grid3">
      <article className="panel"><h2>Latest organizations</h2>{data.organizations.length===0?<div className="empty">No organizations have signed up.</div>:<div className="tableWrap"><table className="table"><thead><tr><th>Company</th><th>Subscription</th><th>Onboarding</th><th>Created</th></tr></thead><tbody>{data.organizations.slice(0,10).map(o=><tr key={o.id}><td>{o.name}</td><td>{o.stripeSubscription?<span className="badge customer">Active</span>:<span className="badge pending">None</span>}</td><td>{o.onboardingStatus}</td><td>{date.format(o.createdAt)}</td></tr>)}</tbody></table></div>}</article>
      <article className="panel"><h2>CRM accounts</h2>{data.accounts.length===0?<div className="empty">No CRM accounts.</div>:<div className="tableWrap"><table className="table"><thead><tr><th>Account</th><th>Tenant</th><th>Status</th><th>Source</th></tr></thead><tbody>{data.accounts.slice(0,12).map(a=><tr key={a.id}><td>{a.name}<div className="tiny">{a.domain||a.industry||''}</div></td><td>{a.organizationName}</td><td><span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span></td><td>{a.source||'—'}</td></tr>)}</tbody></table></div>}</article>
      <article className="panel"><h2>Recent activities</h2>{data.activities.length===0?<div className="empty">No CRM activity logged.</div>:<div className="activityList">{data.activities.slice(0,10).map(a=><div className="activity" key={a.id}><div className="activityTop"><b>{a.subject}</b><span className="badge">{a.type}</span></div><div className="tiny">{a.accountName||'No account'} · {date.format(a.createdAt)}</div>{!a.completedAt&&<form action={completeActivity}><input type="hidden" name="activityId" value={a.id}/><button className="button" style={{marginTop:8}}>Mark complete</button></form>}</div>)}</div>}</article>
    </section>

    <section className="panel" style={{marginTop:14}}>
      <h2>Deal pipeline</h2>
      {data.deals.length===0?<div className="empty">No deals have been created.</div>:<div className="tableWrap"><table className="table"><thead><tr><th>Deal</th><th>Account</th><th>Stage</th><th>Amount</th><th>Probability</th><th>Expected close</th><th>Update</th></tr></thead><tbody>{data.deals.map(d=><tr key={d.id}><td>{d.name}</td><td>{d.accountName}</td><td><span className={`badge ${d.stage.toLowerCase()}`}>{d.stage.replaceAll('_',' ')}</span></td><td>{currency.format(d.amount)}</td><td>{d.probability}%</td><td>{d.expectedCloseDate?date.format(d.expectedCloseDate):'—'}</td><td><form action={updateDealStage}><input type="hidden" name="dealId" value={d.id}/><select name="stage" defaultValue={d.stage}>{['QUALIFICATION','DISCOVERY','PROPOSAL','NEGOTIATION','CLOSED_WON','CLOSED_LOST'].map(s=><option key={s}>{s}</option>)}</select><button className="button">Save</button></form></td></tr>)}</tbody></table></div>}
    </section>

    <section className="forms">
      <article className="formCard"><h3>Add CRM account</h3><form action={createCrmAccount} className="form"><label>Tenant<select name="organizationId" required><option value="">Select</option>{data.organizations.map(o=><option value={o.id} key={o.id}>{o.name}</option>)}</select></label><label>Account name<input name="name" required/></label><label>Domain<input name="domain" placeholder="company.com"/></label><label>Industry<input name="industry"/></label><label>Source<input name="source" placeholder="Referral, LinkedIn, inbound..."/></label><label>Status<select name="status" defaultValue="LEAD">{['LEAD','PROSPECT','CUSTOMER','CHURNED','PARTNER'].map(s=><option key={s}>{s}</option>)}</select></label><button className="button primary full">Create account</button></form></article>

      <article className="formCard"><h3>Add contact</h3><form action={createCrmContact} className="form"><label>Tenant<select name="organizationId" required><option value="">Select</option>{data.organizations.map(o=><option value={o.id} key={o.id}>{o.name}</option>)}</select></label><label>Account<select name="accountId"><option value="">No account</option>{data.accounts.map(a=><option value={a.id} key={a.id}>{a.name}</option>)}</select></label><label>First name<input name="firstName" required/></label><label>Last name<input name="lastName" required/></label><label>Email<input name="email" type="email"/></label><label>Phone<input name="phone"/></label><label className="full">Job title<input name="jobTitle"/></label><button className="button primary full">Create contact</button></form></article>

      <article className="formCard"><h3>Add deal</h3><form action={createCrmDeal} className="form"><label>Tenant<select name="organizationId" required><option value="">Select</option>{data.organizations.map(o=><option value={o.id} key={o.id}>{o.name}</option>)}</select></label><label>Account<select name="accountId" required><option value="">Select</option>{data.accounts.map(a=><option value={a.id} key={a.id}>{a.name}</option>)}</select></label><label>Deal name<input name="name" required/></label><label>Stage<select name="stage" defaultValue="QUALIFICATION">{['QUALIFICATION','DISCOVERY','PROPOSAL','NEGOTIATION','CLOSED_WON','CLOSED_LOST'].map(s=><option key={s}>{s}</option>)}</select></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required/></label><label>Probability<input name="probability" type="number" min="0" max="100" defaultValue="10" required/></label><label className="full">Expected close<input name="expectedCloseDate" type="date"/></label><button className="button primary full">Create deal</button></form></article>

      <article className="formCard"><h3>Log activity</h3><form action={createCrmActivity} className="form"><label>Tenant<select name="organizationId" required><option value="">Select</option>{data.organizations.map(o=><option value={o.id} key={o.id}>{o.name}</option>)}</select></label><label>Account<select name="accountId"><option value="">No account</option>{data.accounts.map(a=><option value={a.id} key={a.id}>{a.name}</option>)}</select></label><label>Contact<select name="contactId"><option value="">No contact</option>{data.contacts.map(c=><option value={c.id} key={c.id}>{c.name}</option>)}</select></label><label>Deal<select name="dealId"><option value="">No deal</option>{data.deals.map(d=><option value={d.id} key={d.id}>{d.name}</option>)}</select></label><label>Type<select name="type" defaultValue="NOTE">{['NOTE','CALL','EMAIL','MEETING','TASK'].map(s=><option key={s}>{s}</option>)}</select></label><label>Due date<input name="dueAt" type="datetime-local"/></label><label className="full">Subject<input name="subject" required/></label><label className="full">Notes<textarea name="body"/></label><button className="button primary full">Log activity</button></form></article>
    </section>
  </main>;
}
