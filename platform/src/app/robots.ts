import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://emissa.tech';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/solutions/', '/industries/', '/resources/', '/blog/', '/pricing', '/demo'],
        disallow: ['/admin/', '/api/', '/dashboard/', '/expansion/', '/login', '/onboarding/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
