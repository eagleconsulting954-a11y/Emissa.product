'use client';

import { useEffect, useState } from 'react';

type SpotData = { total: number; claimed: number; remaining: number };

export default function FoundingSpots({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<SpotData | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const response = await fetch('/api/founding-spots', { cache: 'no-store' });
        if (!response.ok) return;
        const payload = (await response.json()) as SpotData;
        if (active) setData(payload);
      } catch {
        // Keep the UI neutral if the database is temporarily unavailable.
      }
    }
    load();
    const timer = window.setInterval(load, 30000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  if (!data) return <span>Founding availability updates live</span>;
  if (compact) return <span>{data.remaining} of {data.total} founding spots remaining</span>;

  const percent = Math.min(100, Math.max(0, (data.claimed / data.total) * 100));
  return (
    <div className="foundingCounter">
      <div className="foundingCounterTop"><strong>{data.remaining}</strong><span>of {data.total} founding spots remaining</span></div>
      <div className="foundingTrack"><span style={{ width: `${percent}%` }} /></div>
      <small>{data.claimed} claimed · updates automatically after successful Stripe signup</small>
    </div>
  );
}
