import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import AdminProductShell from '@/components/AdminProductShell';
import '../compliance/admin-compliance.css';

export const dynamic='force-dynamic';

async function sendSupplierMessage(formData:FormData){
  'use server';
  const supplierId=String(formData.get('supplierId')||'');
  const subject=String(formData.get('subject')||'').trim();
  const message=String(formData.get('message')||'').trim();
  if(!supplierId||!subject||!message)return;
  const supplier=await db.supplier.findUnique({where:{id:supplierId},include:{organization:{select:{id:true,name:true,slug:true}}}});
  if(!supplier||supplier.organization.slug==='emissa-demo'||!supplier.email)return;
  const apiKey=process.env.RESEND_API_KEY;
  const from=process.env.RESEND_FROM_EMAIL;
  if(!apiKey||!from) throw new Error('RESEND_API_KEY and RESEND_FROM_EMAIL are required');
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[supplier.email],subject,html:`<div style="font-family:Arial,sans-serif;color:#17211d"><p>Hello ${supplier.name},</p><p>${message.replace(/\n/g,'<br/>')}</p><p>Regards,<br/>Emissa Compliance Operations</p></div>`})});
  const payload=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(`Resend failed: ${JSON.stringify(payload)}`);
  await db.auditEvent.create({data:{organizationId:supplier.organization.id,action:'SUPPLIER_EMAIL_SENT',entityType:'Supplier',entityId:supplier.id,metadata:{to:supplier.email,subject,resendId:payload.id||null}}});
  revalidatePath('/admin/communications');
}

export default async function CommunicationsPage(){
  const [suppliers,events]=await Promise.all([
    db.supplier.findMany({where:{email:{not:null},organization:{slug:{not:'emissa-demo'}}},include:{organization:{select:{name:true}}},orderBy:{name:'asc'}}),
    db.auditEvent.findMany({where:{action:'SUPPLIER_EMAIL_SENT',organization:{slug:{not:'emissa-demo'}}},include:{organization:{select:{name:true}}},orderBy:{createdAt:'desc'},take:40})
  ]);
  return <AdminProductShell title="Supplier Communications" eyebrow="Request evidence, send reminders and preserve outreach history" active="/admin/communications" actions={<a href="/admin/suppliers">Supplier 360</a>}>
    <section className="ccMetricGrid"><article><span>Reachable suppliers</span><strong>{suppliers.length}</strong><small>Supplier records with email</small></article><article><span>Messages logged</span><strong>{events.length}</strong><small>Recent supplier outreach</small></article><article><span>Email provider</span><strong style={{fontSize:18}}>{process.env.RESEND_API_KEY?'Ready':'Setup'}</strong><small>Resend production configuration</small></article><article><span>Delivery mode</span><strong style={{fontSize:18}}>Direct</strong><small>Sent from Emissa workflow</small></article></section>
    <section className="commLayout">
      <article className="ccPanel"><div className="ccPanelHead"><div><span>Send supplier request</span><small>Messages are delivered through Resend and logged in AuditEvent</small></div></div><form action={sendSupplierMessage} className="ccFormGrid oneCol">
        <label><span>Supplier</span><select name="supplierId" required><option value="">Select supplier</option>{suppliers.map(s=><option key={s.id} value={s.id}>{s.name} · {s.organization.name} · {s.email}</option>)}</select></label>
        <label><span>Subject</span><input name="subject" required defaultValue="Compliance information request"/></label>
        <label><span>Message</span><textarea name="message" rows={9} required defaultValue={'Please provide the outstanding compliance information or supporting evidence requested by our team.\n\nIf you have already submitted the requested information, no further action is required.'}/></label>
        <button className="ccGoldButton" type="submit">Send supplier email</button>
      </form></article>
      <article className="ccPanel"><div className="ccPanelHead"><div><span>Communication templates</span><small>Common supplier compliance outreach</small></div></div><div className="templateStack"><div><b>Evidence request</b><small>Request certificates, declarations or supporting documents.</small></div><div><b>Expiration reminder</b><small>Notify a supplier before compliance evidence expires.</small></div><div><b>Corrective action</b><small>Send CAPA requirements and closure expectations.</small></div><div><b>Buyer questionnaire</b><small>Request missing data required for a customer response.</small></div><div><b>CBAM / EPR data request</b><small>Collect regulatory product, packaging or emissions information.</small></div></div></article>
    </section>
    <section className="ccPanel" style={{marginTop:10}}><div className="ccPanelHead"><div><span>Recent outreach</span><small>Auditable supplier communication history</small></div></div>{events.length?<div className="ccTableWrap"><table className="ccTable"><thead><tr><th>Organization</th><th>Subject</th><th>Recipient</th><th>Sent</th></tr></thead><tbody>{events.map(e=>{const m=(e.metadata||{}) as Record<string,unknown>;return <tr key={e.id}><td>{e.organization.name}</td><td>{String(m.subject||'Supplier message')}</td><td>{String(m.to||'—')}</td><td>{e.createdAt.toLocaleString()}</td></tr>})}</tbody></table></div>:<div className="ccEmptySmall">No supplier messages have been sent yet.</div>}</section>
  </AdminProductShell>;
}
