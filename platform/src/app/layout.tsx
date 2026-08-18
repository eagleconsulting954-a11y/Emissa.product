import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://emissa.tech';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Emissa | Supplier Compliance Infrastructure',
    template: '%s | Emissa',
  },
  description:
    'Supplier compliance infrastructure for manufacturers, exporters and enterprise suppliers. Connect Scope 3, EPR, CBAM, product footprints, climate risk, supplier evidence and buyer requirements in one operating system.',
  keywords: [
    'supplier compliance infrastructure',
    'supplier compliance software',
    'supplier compliance management',
    'supplier compliance operating system',
    'Scope 3 supplier data',
    'Scope 3 emissions software',
    'CBAM supplier software',
    'EPR compliance software',
    'product carbon footprint software',
    'LCA software',
    'supplier sustainability compliance',
    'buyer compliance requirements',
    'supplier evidence management',
    'supply chain compliance software',
  ],
  authors: [{ name: 'Emissa' }],
  creator: 'Emissa',
  publisher: 'Emissa',
  category: 'B2B SaaS',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Emissa',
    title: 'Emissa | Supplier Compliance Infrastructure',
    description:
      'Turn supplier, carbon, packaging, trade and product data into the compliance proof buyers and regulators require.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emissa | Supplier Compliance Infrastructure',
    description:
      'Supplier compliance infrastructure powered by connected Scope 3, EPR, CBAM, product footprint and evidence workflows.',
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Emissa',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: siteUrl,
    description:
      'Supplier compliance infrastructure for Scope 3, EPR, CBAM, product footprints, climate risk, supplier evidence and buyer requirements.',
    offers: {
      '@type': 'Offer',
      price: '2500',
      priceCurrency: 'USD',
      category: 'subscription',
    },
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
