const baseUrl=process.env.NEXT_PUBLIC_SITE_URL||process.env.APP_URL||'https://emissa.tech';

function escapeXml(value:string){
  return value.replace(/[<>&'"]/g,(char)=>{
    switch(char){
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return char;
    }
  });
}

/**
 * Do not emit a synthetic lastmod timestamp for every URL on every build.
 * Search engines should only receive lastmod when it reflects a meaningful
 * content change, so these section sitemaps intentionally omit it until
 * per-page review timestamps are tracked in content metadata.
 */
export function sitemapResponse(paths:string[]){
  const uniquePaths=[...new Set(paths)];
  const body=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniquePaths.map(path=>`  <url><loc>${escapeXml(`${baseUrl}${path}`)}</loc></url>`).join('\n')}\n</urlset>`;
  return new Response(body,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600, s-maxage=3600'}});
}
