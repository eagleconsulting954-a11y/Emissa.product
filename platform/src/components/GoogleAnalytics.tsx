'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (!measurementId || typeof window === 'undefined') return;

    // The initial page_view is sent by the standard GA4 config call in the root layout.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!window.gtag) return;

    window.gtag('event', 'page_view', {
      page_path: `${window.location.pathname}${window.location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, measurementId]);

  return null;
}
