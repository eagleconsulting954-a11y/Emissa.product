import type { ReactNode } from 'react';

const nav = [
  ['Overview','/admin/compliance','⌂'],
  ['Suppliers','/admin/suppliers','⌘'],
  ['Workflows','/admin/workflows','◇'],
  ['Evidence','/admin/evidence','▣'],
  ['Regulations','/admin/regulations','◎'],
  ['Risk & Analytics','/admin/risk','↗'],
  ['AI Copilot','/admin/copilot','✦'],
  ['CRM','/admin/crm','◫'],
];

export default function AdminProductShell({ title, eyebrow, active, actions, children }:{ title:string; eyebrow:string; active:string; actions?:ReactNode; children:ReactNode }) {
  return <main className="ccPage">
    <aside className="ccSidebar">
      <a href="/admin/compliance" className="ccBrand"><span className="ccMark"><i/></span><div><b>EMISSA</b><small>Supplier Compliance Infrastructure</small></div></a>
      <nav className="ccSideNav">{nav.map(([label,href,icon])=><a key={href} className={active===href?'active':''} href={href}><span>{icon}</span>{label}</a>)}</nav>
      <div className="ccSideFoot"><span className="ccPlan">Enterprise</span><a href="/">Public website ↗</a></div>
    </aside>
    <section className="ccMain">
      <header className="ccTopbar"><div><p>{eyebrow}</p><h1>{title}</h1></div><div className="ccTopActions">{actions}</div></header>
      {children}
    </section>
  </main>;
}
