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

export function sitemapResponse(paths:string[]){
  const lastmod=new Date().toISOString();
  const body=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path=>`  <url><loc>${escapeXml(`${baseUrl}${path}`)}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>`;
  return new Response(body,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600, s-maxage=3600'}});
}
