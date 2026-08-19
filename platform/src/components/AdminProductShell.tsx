import type { ReactNode } from 'react';

const nav = [
  ['Home','/dashboard','⌂'],
  ['Suppliers','/admin/suppliers','♧'],
  ['Compliance','/admin/compliance','◇'],
  ['Workflows','/admin/workflows','⌘'],
  ['Evidence','/admin/evidence','▣'],
  ['Regulations','/admin/regulations','◎'],
  ['Risk & Analytics','/admin/risk','↗'],
  ['Corrective Actions','/admin/capa','✓'],
  ['Communications','/admin/communications','✉'],
  ['AI Copilot','/admin/copilot','✦'],
  ['CRM','/admin/crm','◫'],
];

export default function AdminProductShell({ title, eyebrow, active, actions, children }:{ title:string; eyebrow:string; active:string; actions?:ReactNode; children:ReactNode }) {
  return <main className="ccPage">
    <aside className="ccSidebar">
      <a href="/dashboard" className="ccBrand"><span className="ccMark"><i/></span><span><b>EMISSA</b><small>Supplier Compliance Infrastructure</small></span></a>
      <nav className="ccSideNav">{nav.map(([label,href,icon])=><a key={href} className={active===href?'active':''} href={href}><b>{icon}</b><span>{label}</span></a>)}</nav>
      <div className="ccPlan"><small>ENTERPRISE PLAN</small><strong>Production workspace</strong><a href="/">Public website ↗</a></div>
    </aside>
    <section className="ccWorkspace">
      <header className="ccTopbar"><div><span className="ccKicker">{eyebrow}</span><h1>{title}</h1></div><div className="ccTopActions">{actions}</div></header>
      {children}
    </section>
  </main>;
}
