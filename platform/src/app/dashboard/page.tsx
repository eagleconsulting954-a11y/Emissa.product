import AdminProductShell from '@/components/AdminProductShell';
import '../admin/compliance/admin-compliance.css';

const obligations = [
  { title: 'CBAM report · Q3 2026', status: 'Overdue', value: 8 },
  { title: 'Supplier evidence renewals', status: 'Due in 7 days', value: 12 },
  { title: 'Buyer questionnaire queue', status: 'Due in 30 days', value: 37 },
  { title: 'Validated requirements', status: 'Completed', value: 142 },
];

const risk = [
  ['High risk',18,72],['Medium',63,55],['Low risk',167,34],['Compliant',1000,82]
];

const activities = [
  ['CBAM report submitted','Pacific Metalworks · 2h ago'],
  ['Supplier certificate uploaded','GreenCycle Plastics · 4h ago'],
  ['Buyer request approved','Advanced Alloys · 7h ago'],
  ['Corrective action closed','NorthStar Components · 9h ago'],
];

export default function DashboardPage(){
  return <AdminProductShell title="Dashboard" eyebrow="Real-time compliance operating system" active="/admin/compliance" actions={<><span className="ccRange">May 29 – May 27, 2026⌄</span><a href="/">Public website</a></>}>
    <section className="ccMetricGrid">
      <article><span>Total suppliers</span><strong>1,248</strong><small>+3.2% vs last 30 days</small></article>
      <article><span>Compliance score</span><strong>92%</strong><small>+5.6% vs last 30 days</small></article>
      <article><span>Open obligations</span><strong>57</strong><small>−8 vs last 30 days</small></article>
      <article><span>Expiring soon</span><strong>23</strong><small>Next 30 days</small></article>
    </section>

    <section className="ccDashboardGrid">
      <article className="ccPanel ccHealth">
        <div className="ccPanelHead"><div><span>Compliance health</span><small>30 day network trend</small></div><b>92%</b></div>
        <div className="ccChartArea"><div className="ccMiniBars">{[38,45,42,49,53,48,57,60,56,64,68,65,72,76,80].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><div className="ccLine">{Array.from({length:10}).map((_,i)=><i key={i}/>)}</div></div>
        <div className="ccLegend"><span><i className="green"/>Compliant 92%</span><span><i className="gold"/>At risk 6%</span><span><i className="orange"/>Non-compliant 2%</span></div>
      </article>

      <article className="ccPanel">
        <div className="ccPanelHead"><div><span>Obligations by status</span><small>Current workflow queue</small></div></div>
        <div className="ccRiskRows">{obligations.map((o,i)=><span key={o.title}><b>{o.status}</b><i><em style={{width:`${Math.min(100,o.value*2)}%`}}/></i><strong>{o.value}</strong></span>)}</div>
      </article>

      <article className="ccPanel ccRiskPanel">
        <div className="ccPanelHead"><div><span>Supplier risk distribution</span><small>Network risk posture</small></div></div>
        <div className="ccDonut" style={{background:'conic-gradient(#bd5f54 0 8%,#d5a84a 8% 24%,#79bd70 24% 49%,#176e49 49% 100%)'}}><div><strong>1,248</strong><small>suppliers</small></div></div>
        <div className="ccRiskRows">{risk.map(([label,count,width])=><span key={String(label)}><b>{label}</b><i><em style={{width:`${width}%`}}/></i><strong>{count}</strong></span>)}</div>
      </article>

      <article className="ccPanel ccActivity">
        <div className="ccPanelHead"><div><span>Recent activity</span><small>Latest compliance events</small></div><a href="/admin/compliance">View all</a></div>
        <div className="ccActivityList">{activities.map(([title,meta])=><div key={title}><i>✓</i><p><strong>{title}</strong><small>{meta}</small></p></div>)}</div>
      </article>
    </section>

    <section className="ccLowerGrid">
      <article className="ccPanel"><div className="ccPanelHead"><div><span>My tasks</span><small>Priority actions</small></div></div><div className="ccCompactTable"><div><span><b>Review supplier corrective action</b><small>Pacific Metalworks</small></span><em>Today</em></div><div><span><b>Approve CBAM supplier validation</b><small>Advanced Alloys</small></span><em>Tomorrow</em></div><div><span><b>Validate ISO 14001 certificate</b><small>GreenCycle Plastics</small></span><em>May 22</em></div></div></article>
      <article className="ccPanel"><div className="ccPanelHead"><div><span>Integrations</span><small>Connected enterprise systems</small></div></div><div className="ccCompactTable"><div><span><b>QuickBooks</b><small>Financial data</small></span><em className="low">Connected</em></div><div><span><b>SAP Ariba</b><small>Supplier network</small></span><em className="low">Connected</em></div><div><span><b>Salesforce</b><small>Customer workflows</small></span><em className="low">Connected</em></div></div></article>
      <article className="ccPanel ccQuick"><div className="ccPanelHead"><div><span>Quick actions</span><small>Common workflows</small></div></div><a href="/admin/suppliers">Add supplier</a><a href="/admin/workflows">Create workflow</a><a href="/admin/evidence">Upload evidence</a><a href="/admin/reports">Generate report</a></article>
    </section>
  </AdminProductShell>;
}
