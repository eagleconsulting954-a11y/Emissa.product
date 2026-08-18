'use client';

import { FormEvent, useState } from 'react';

type Props = {
  title: string;
  description: string;
  resource: string;
  source: string;
};

export default function InlineLeadMagnet({ title, description, resource, source }: Props) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('saving');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...Object.fromEntries(form.entries()), source, resource }),
    });
    setStatus(response.ok ? 'success' : 'error');
  }

  return (
    <aside className="seoCard" style={{marginTop: 28}} aria-label={`${resource} download`}>
      <span className="seoKicker">Free resource</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {status === 'success' ? (
        <div className="leadSuccess"><strong>Request received.</strong><p>We’ll send the resource to your work email.</p></div>
      ) : (
        <form className="leadForm" onSubmit={submit}>
          <input name="firstName" placeholder="First name" required />
          <input name="email" type="email" placeholder="Work email" required />
          <input name="company" placeholder="Company" required />
          <button className="seoPrimary" disabled={status === 'saving'}>{status === 'saving' ? 'Sending…' : `Get ${resource}`}</button>
          {status === 'error' && <small className="errorText">We couldn’t save your request. Try again.</small>}
        </form>
      )}
    </aside>
  );
}
