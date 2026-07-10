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

export default function HomePage() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand"><div className="logo">◎</div><div><b>emissa.tech</b><small>Compliance OS</small></div></div>
        <div className="navGroup">Workspace</div>
        <a className="navItem active" href="#dashboard">⌘ Dashboard</a>
        <a className="navItem" href="#obligations">☷ Obligations</a>
        <a className="navItem" href="#suppliers">◎ Supplier Network</a>
        <div className="navGroup">Modules</div>
        <a className="navItem" href="#modules">🌿 Emissa Core</a>
        <a className="navItem" href="#modules">♻ EPR Compliance</a>
        <a className="navItem" href="#modules">🌐 CBAM Reporting</a>
        <a className="navItem" href="#modules">△ Climate Risk</a>
        <a className="navItem" href="#modules">◌ LCA Studio</a>
        <div className="navGroup">Administration</div>
        <a className="navItem" href="#billing">$ Billing</a>
        <a className="navItem" href="#settings">⚙ Settings</a>
      </aside>

      <main className="main" id="dashboard">
        <header className="topbar">
          <div><h1>Executive Compliance Command Center</h1><p className="muted">Live overview of emissions, obligations, suppliers and financial exposure.</p></div>
          <div><button className="button">Invite team</button> <button className="button primary">Generate report</button></div>
        </header>

        <section className="grid metrics">
          <article className="card metric"><span>Compliance score</span><strong>98%</strong><p className="muted">12% improvement this quarter</p></article>
          <article className="card metric"><span>Total emissions</span><strong>10,510</strong><p className="muted">tCO₂e across Scopes 1–3</p></article>
          <article className="card metric"><span>Open obligations</span><strong>6</strong><p className="muted">2 require action this month</p></article>
          <article className="card metric"><span>Contracts protected</span><strong>$2.8M</strong><p className="muted">Buyer requirements supported</p></article>
        </section>

        <section className="grid layout">
          <article className="card">
            <h2>Compliance operations</h2>
            <table className="table" id="obligations">
              <thead><tr><th>Requirement</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead>
              <tbody>{obligations.map((item) => <tr key={item.title}><td>{item.title}</td><td>{item.owner}</td><td>{item.due}</td><td><span className={`status ${item.status}`}>{item.status}</span></td></tr>)}</tbody>
            </table>
          </article>
          <article className="card orb"><div className="core">EMISSA AI</div></article>
        </section>

        <section id="modules">
          <h2>Full suite modules</h2>
          <div className="grid moduleGrid">
            {modules.map(([title, description]) => <article className="card moduleCard" key={title}><span className="status complete">Included</span><h3>{title}</h3><p>{description}</p><button className="button">Open workspace</button></article>)}
          </div>
        </section>

        <section className="grid layout" id="billing">
          <article className="card"><h2>Founding customer subscription</h2><p className="muted">Full Emissa platform, every current and future module, and a two-week custom dashboard implementation.</p><div className="metric"><span>Legacy rate</span><strong>$2,500/month</strong></div><button className="button primary">Open Stripe checkout</button></article>
          <article className="card"><h2>Two-week onboarding</h2><div className="list"><div className="listItem"><b>Week 1</b><p className="muted">Company profile, data connection, compliance assessment and dashboard planning.</p></div><div className="listItem"><b>Week 2</b><p className="muted">Custom configuration, module activation, team training and go-live.</p></div></div></article>
        </section>
      </main>
    </div>
  );
}
