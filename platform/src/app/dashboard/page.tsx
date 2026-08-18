const obligations = [
  { title: 'CA SB 253 emissions filing', owner: 'Sustainability', due: 'Jul 28', status: 'pending' },
  { title: 'CBAM shipment packet EU-8852', owner: 'Trade Compliance', due: 'Jul 18', status: 'blocked' },
  { title: 'California EPR packaging review', owner: 'Operations', due: 'Aug 05', status: 'complete' },
];

const modules = [
  ['Emissa Core', 'Scope 1, 2 and 3 accounting, evidence and verification.'],
  ['Supplier Network', 'Buyer requests, supplier collection and secure data sharing.'],
  ['EPR Compliance', 'Packaging obligations, material volumes and fee estimates.'],
  ['CBAM Reporting', 'Shipment-level embedded carbon and EU declaration workflows.'],
  ['Climate Risk', 'Physical and transition risk across facilities and suppliers.'],
  ['LCA Studio', 'Product footprints, lifecycle stages and supplier comparisons.'],
];

export default function DashboardPage() {
  return <div className="shell"><aside className="sidebar"><div className="brand"><div className="logo">◎</div><div><b>emissa.tech</b><small>Compliance OS</small></div></div><div className="navGroup">Workspace</div><a className="navItem active" href="/dashboard">⌘ Dashboard</a><a className="navItem" href="/expansion">◆ Expansion Suite</a><a className="navItem" href="/admin">▦ Admin CRM</a><div className="navGroup">Modules</div>{modules.map(([name])=><a className="navItem" href="#modules" key={name}>{name}</a>)}</aside><main className="main"><header className="topbar"><div><h1>Executive Compliance Command Center</h1><p className="muted">Customer product workspace.</p></div><a className="button" href="/">Back to website</a></header><section className="grid metrics"><article className="card metric"><span>Compliance score</span><strong>98%</strong></article><article className="card metric"><span>Total emissions</span><strong>10,510</strong></article><article className="card metric"><span>Open obligations</span><strong>6</strong></article><article className="card metric"><span>Contracts protected</span><strong>$2.8M</strong></article></section><section className="grid layout"><article className="card"><h2>Compliance operations</h2><table className="table"><thead><tr><th>Requirement</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead><tbody>{obligations.map(x=><tr key={x.title}><td>{x.title}</td><td>{x.owner}</td><td>{x.due}</td><td><span className={`status ${x.status}`}>{x.status}</span></td></tr>)}</tbody></table></article><article className="card orb"><div className="core">EMISSA AI</div></article></section><section id="modules"><h2>Full suite modules</h2><div className="grid moduleGrid">{modules.map(([title,description])=><article className="card moduleCard" key={title}><span className="status complete">Included</span><h3>{title}</h3><p>{description}</p><button className="button">Open workspace</button></article>)}</div></section></main></div>;
}
