import { newBlogPosts } from './newBlogContent';
import { blogCategories, blogV2Posts, type BlogCategorySlug } from './blogV2Content';

export type BlogCatalogPost={
  title:string;description:string;category:BlogCategorySlug;keywords:string[];published:string;updated:string;readTime:number;
  magnet:[string,string,string];sections:[string,string][];faq:[string,string][];related:string[];
};

function inferCategory(slug:string):BlogCategorySlug{
  if(/cbam|eudr|regulat|uflpa|csddd/.test(slug))return 'regulatory-intelligence';
  if(/epr|packag/.test(slug))return 'packaging-epr';
  if(/reach|rohs|pfas|product|passport|scip/.test(slug))return 'product-compliance';
  if(/buyer|questionnaire|customer|data-room/.test(slug))return 'buyer-requests';
  if(/risk|scorecard/.test(slug))return 'supplier-risk';
  if(/document|certificate|evidence|audit-readiness/.test(slug))return 'evidence-certificates';
  if(/due-diligence|onboarding/.test(slug))return 'due-diligence';
  if(/software|automation|dashboard|system-of-record|integration|platform/.test(slug))return 'compliance-technology';
  if(/workflow|procurement/.test(slug))return 'compliance-operations';
  return 'supplier-compliance';
}

const legacy:Record<string,BlogCatalogPost>=Object.fromEntries(Object.entries(newBlogPosts).map(([slug,p])=>{
  const post=p as {title:string;description:string;keywords:readonly string[];magnet:readonly [string,string,string];sections:readonly (readonly [string,string])[]};
  return [slug,{
    title:post.title,description:post.description,category:inferCategory(slug),keywords:[...post.keywords],published:'2026-08-01',updated:'2026-08-22',readTime:6,
    magnet:[post.magnet[0],post.magnet[1],post.magnet[2]],sections:post.sections.map(([a,b])=>[a,b] as [string,string]),faq:[],related:[]
  }];
}));

export const allBlogTopicPosts:Record<string,BlogCatalogPost>={...legacy,...blogV2Posts};
export { blogCategories };
export type { BlogCategorySlug } from './blogV2Content';

export function postsForCategory(category:BlogCategorySlug){return Object.entries(allBlogTopicPosts).filter(([,post])=>post.category===category);}
export function latestBlogPosts(limit=12){return Object.entries(allBlogTopicPosts).sort((a,b)=>b[1].updated.localeCompare(a[1].updated)||a[1].title.localeCompare(b[1].title)).slice(0,limit);}
