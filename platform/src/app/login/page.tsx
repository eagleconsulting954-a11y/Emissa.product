import '../marketing.css';

export default function LoginPage(){
  return <main className="marketing authPage"><section className="authCard"><a className="siteBrand" href="/"><div className="siteLogo">◎</div><div><b>emissa.tech</b><small>Compliance OS</small></div></a><p className="eyebrow" style={{marginTop:28}}>Customer access</p><h1>Log in to Emissa.</h1><p className="muted">Production authentication will be connected to the dedicated Emissa Supabase project so customers only access their own organization workspace.</p><form className="authForm"><input type="email" placeholder="Work email" autoComplete="email" required/><input type="password" placeholder="Password" autoComplete="current-password" required/><button className="button primary" type="button">Log in</button></form><div style={{marginTop:18}}><a className="muted" href="/pricing">Need an account? View founding pricing.</a></div></section></main>
}
