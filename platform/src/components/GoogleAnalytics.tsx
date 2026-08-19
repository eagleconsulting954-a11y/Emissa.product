'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const lastPath = useRef<string | null>(null);

  const sendPageView = (path: string) => {
    if (!window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  };

  useEffect(() => {
    if (!ready || typeof window === 'undefined') return;
    const currentPath = `${pathname}${window.location.search}`;
    if (lastPath.current === null) {
      lastPath.current = currentPath;
      return;
    }
    if (lastPath.current !== currentPath) {
      lastPath.current = currentPath;
      sendPageView(currentPath);
    }
  }, [pathname, ready]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        id="emissa-ga4-library"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={() => {
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer.push(args));
          window.gtag('js', new Date());
          window.gtag('config', measurementId, {
            send_page_view: false,
            transport_type: 'beacon',
          });
          const currentPath = `${window.location.pathname}${window.location.search}`;
          sendPageView(currentPath);
          lastPath.current = currentPath;
          setReady(true);
        }}
      />
      <Script id="emissa-ga4-bootstrap" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
        `}
      </Script>
    </>
  );
}
