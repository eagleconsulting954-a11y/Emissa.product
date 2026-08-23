import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: { bodySizeLimit: '10mb' },
  },
  redirects: async () => [
    {
      source: '/get-started',
      destination: '/demo',
      permanent: true,
    },
    {
      source: '/blog/emissa-vs-watershed',
      destination: '/compare/emissa-vs-watershed',
      permanent: true,
    },
    {
      source: '/blog/walmart-project-gigaton-requirements-2026',
      destination: '/resources/scope-3-supplier-data-guide',
      permanent: true,
    },
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ],
};

export default nextConfig;
