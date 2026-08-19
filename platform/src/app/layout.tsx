import type { Metadata } from 'next';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';
import './executive-theme.css';
import './executive-pages.css';
import './public-template-v3.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://emissa.tech';
const gaMeasurementId = 'G-538670958';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Emissa | Supplier Compliance Infrastructure Software',
    template: '%s | Emissa',
  },
  description:
    'Supplier compliance infrastructure software for manufacturers, exporters and enterprise suppliers. Centralize supplier evidence, buyer requirements, due diligence, EPR, CBAM, product compliance, climate risk and Scope 3 data in one operating system.',
  keywords: [
    'supplier compliance infrastructure',
    'supplier compliance infrastructure software',
    'supplier compliance software',
    'supplier compliance management software',
    'supplier compliance platform',
    'supplier compliance operating system',
    'supply chain compliance software',
    'supplier due diligence software',
    'supplier evidence management',
    'supplier document management',
    'buyer compliance request software',
    'supplier questionnaire software',
    'supplier risk compliance software',
    'product compliance software',
    'Scope 3 supplier data',
    'Scope 3 emissions software',
    'CBAM supplier software',
    'EPR compliance software',
    'product carbon footprint software',
    'LCA software',
  ],
  authors: [{ name: 'Emissa' }],
  creator: 'Emissa',
  publisher: 'Emissa',
  category: 'Supplier Compliance Software',
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Emissa',
    title: 'Emissa | Supplier Compliance Infrastructure Software',
    description:
      'Turn supplier, product, packaging, trade and carbon data into the compliance proof buyers, auditors and regulators require.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emissa | Supplier Compliance Infrastructure Software',
    description:
      'One operating system for supplier evidence, due diligence, buyer requests, EPR, CBAM, product footprints, climate risk and Scope 3 data.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Emissa',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Supplier Compliance Infrastructure',
    operatingSystem: 'Web',
    url: siteUrl,
    description:
      'Supplier compliance infrastructure software for supplier evidence, due diligence, buyer requirements, EPR, CBAM, product footprints, climate risk and Scope 3 supplier data.',
    offers: { '@type': 'Offer', price: '3500', priceCurrency: 'USD', category: 'subscription' },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Emissa',
    url: siteUrl,
    description: 'Supplier compliance infrastructure for manufacturers, exporters and enterprise suppliers.',
  };

  return (
    <html lang="en">
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}');
            `,
          }}
        />
      </head>
      <body>
        <GoogleAnalytics measurementId={gaMeasurementId} />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
