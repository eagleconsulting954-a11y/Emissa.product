import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogCategories, postsForCategory, type BlogCategorySlug } from '@/lib/blogCatalog';
import '../../../seo.css';

export function generateStaticParams(){return Object.keys(blogCategories).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const category=blogCategories[slug as BlogCategorySlug];if(!category)return{};
  return{title:`${category.name} Guides`,description:category.description,keywords:category.keywords,alternates:{canonical:`/blog/category/${slug}`},robots:{index:true,follow:true},openGraph:{title:`${category.name} Guides | Emissa`,description:category.description,url:`/blog/category/${slug}`,type:'website'}};
}

export default async function BlogCategoryPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const category=blogCategories[slug as BlogCategorySlug];if(!category)notFound();const posts=postsForCategory(slug as BlogCategorySlug);
  const schema={'@context':'https://schema.org','@type':'CollectionPage',name:`${category.name} Guides`,description:category.description,url:`https://emissa.tech/blog/category/${slug}`,mainEntity:{'@type':'ItemList',itemListElement:posts.map(([postSlug,post],i)=>({'@type':'ListItem',position:i+1,name:post.title,url:`https://emissa.tech/blog/topics/${postSlug}`}))}};
  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/blog">Blog</a><a href="/platform">Platform</a><a href="/software">Software</a><a href="/regulations">Regulations</a><a href="/templates">Templates</a><a href="/demo">Demo</a></div></nav>
    <section className="seoHero compact"><span className="seoKicker">Emissa Blog</span><h1>{category.name}</h1><p>{category.description}</p><div className="seoActions"><a className="seoPrimary" href="/demo">Book a private demo</a><a className="seoSecondary" href="/blog">All blog categories</a></div></section>
    <section className="seoGrid three">{posts.map(([postSlug,post])=><article className="seoCard" key={postSlug}><span className="seoKicker">{post.readTime} min read</span><h2><a href={`/blog/topics/${postSlug}`}>{post.title}</a></h2><p>{post.description}</p><a className="seoSecondary" href={`/blog/topics/${postSlug}`}>Read guide →</a></article>)}</section>
    <section className="seoSection"><h2>Related supplier compliance resources</h2><div className="seoActions"><a className="seoSecondary" href="/tools">Free tools</a><a className="seoSecondary" href="/templates">Templates</a><a className="seoSecondary" href="/regulations">Regulatory intelligence</a><a className="seoSecondary" href="/software">Software guides</a><a className="seoSecondary" href="/platform">Platform modules</a></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  </main>;
}
