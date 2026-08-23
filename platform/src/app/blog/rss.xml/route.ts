import { allBlogTopicPosts } from '@/lib/blogCatalog';

export const dynamic='force-static';
const base='https://emissa.tech';
const esc=(s:string)=>s.replace(/[<>&'\"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','\"':'&quot;'}[c]||c));

export function GET(){
  const items=Object.entries(allBlogTopicPosts).sort((a,b)=>b[1].updated.localeCompare(a[1].updated)||a[1].title.localeCompare(b[1].title)).slice(0,60);
  const body=`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Emissa Supplier Compliance Blog</title><link>${base}/blog</link><description>Supplier compliance, evidence, due diligence, product compliance, regulatory operations and software guidance.</description><language>en-us</language>${items.map(([slug,p])=>`<item><title>${esc(p.title)}</title><link>${base}/blog/topics/${slug}</link><guid>${base}/blog/topics/${slug}</guid><pubDate>${new Date(`${p.updated}T12:00:00Z`).toUTCString()}</pubDate><description>${esc(p.description)}</description><category>${esc(p.category)}</category></item>`).join('')}</channel></rss>`;
  return new Response(body,{headers:{'Content-Type':'application/rss+xml; charset=utf-8','Cache-Control':'public, max-age=3600, s-maxage=3600'}});
}
