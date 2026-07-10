import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Emissa | Compliance Operating System',
  description: 'Enterprise carbon, EPR, CBAM, climate risk and LCA management.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
