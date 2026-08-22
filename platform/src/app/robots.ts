import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://emissa.tech';

export default function robots(): MetadataRoute.Robots {
  return {
    rules:[{userAgent:'*',allow:'/',disallow:['/admin/','/api/','/dashboard/','/expansion/','/login','/onboarding/','/account/','/settings/']}],
    sitemap:[
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-core.xml`,
      `${baseUrl}/sitemap-solutions.xml`,
      `${baseUrl}/sitemap-industries.xml`,
      `${baseUrl}/sitemap-product.xml`,
      `${baseUrl}/sitemap-regulations.xml`,
      `${baseUrl}/sitemap-integrations.xml`,
      `${baseUrl}/sitemap-tools.xml`,
      `${baseUrl}/sitemap-templates.xml`,
      `${baseUrl}/sitemap-compare.xml`,
      `${baseUrl}/sitemap-blog.xml`,
      `${baseUrl}/sitemap-resources.xml`,
      `${baseUrl}/sitemap-research.xml`,
      `${baseUrl}/sitemap-library.xml`,
    ],
    host:baseUrl,
  };
}
