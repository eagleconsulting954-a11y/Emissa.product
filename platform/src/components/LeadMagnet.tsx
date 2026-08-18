'use client';

import { FormEvent, useEffect, useState } from 'react';

export default function LeadMagnet() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    const seen = window.sessionStorage.getItem('emissa-lead-magnet-seen');
    if (!seen) {
      const timer = window.setTimeout(() => setOpen(true), 700);
      return () => window.clearTimeout(timer);
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('saving');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(form.entries())),
    });
    if (response.ok) {
      setStatus('success');
      window.sessionStorage.setItem('emissa-lead-magnet-seen', '1');
    } else {
      setStatus('error');
    }
  }

  function dismiss() {
    window.sessionStorage.setItem('emissa-lead-magnet-seen', '1');
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="leadOverlay" role="dialog" aria-modal="true" aria-label="Free compliance readiness kit">
      <div className="leadModal">
        <button className="leadClose" onClick={dismiss} aria-label="Close">×</button>
        <div className="leadVisual"><div className="leadOrb">◎</div><span>FREE RESOURCE</span></div>
        <div>
          <p className="eyebrow">Supplier Compliance Readiness Kit</p>
          <h2>See exactly what buyers and regulators will ask you for.</h2>
          <p className="muted">Get the Emissa readiness checklist covering emissions data, CBAM, EPR, certificates, buyer requests, deadlines, and due-diligence documentation.</p>
          {status === 'success' ? (
            <div className="leadSuccess"><strong>You're on the list.</strong><p>We’ll send the readiness kit to the email you submitted.</p><button className="button primary" onClick={dismiss}>Continue to Emissa</button></div>
          ) : (
            <form className="leadForm" onSubmit={submit}>
              <input name="firstName" placeholder="First name" required />
              <input name="email" type="email" placeholder="Work email" required />
              <input name="company" placeholder="Company" required />
              <button className="button primary" disabled={status === 'saving'}>{status === 'saving' ? 'Saving…' : 'Send me the free kit'}</button>
              {status === 'error' && <small className="errorText">We couldn’t save your request. Try again.</small>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
