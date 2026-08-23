import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InlineLeadMagnet from '@/components/InlineLeadMagnet';
import { allBlogTopicPosts, blogCategories } from '@/lib/blogCatalog';
import '../../../seo.css';

export function generateStaticParams(){return Object.keys(allBlogTopicPosts).map(slug=>({slug}));}
const idFor=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const post=allBlogTopicPosts[slug];if(!post)return{};
  return{
    title:post.title,description:post.description,keywords:[...post.keywords,'supplier compliance infrastructure','Emissa'],
    alternates:{canonical:`/blog/topics/${slug}`},
    openGraph:{title:`${post.title} | Emissa`,description:post.description,url:`/blog/topics/${slug}`,type:'article',publishedTime:post.published,modifiedTime:post.updated},
    twitter:{card:'summary_large_image',title:post.title,description:post.description},robots:{index:true,follow:true},
  };
}

export default async function BlogTopicPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const post=allBlogTopicPosts[slug];if(!post)notFound();
  const category=blogCategories[post.category];const [magnetTitle,magnetDescription,resource]=post.magnet;
  const related=post.related.length?post.related:['/software/supplier-compliance-software','/platform','/tools','/templates'];
  const schema={
    '@context':'https://schema.org','@type':'Article',headline:post.title,description:post.description,datePublished:post.published,dateModified:post.updated,
    author:{'@type':'Organization',name:'Emissa'},reviewedBy:{'@type':'Organization',name:'Emissa Compliance Research'},publisher:{'@type':'Organization',name:'Emissa',url:'https://emissa.tech/'},
    mainEntityOfPage:`https://emissa.tech/blog/topics/${slug}`,articleSection:category.name,keywords:post.keywords.join(', '),
  };
  const breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:'https://emissa.tech/'},{'@type':'ListItem',position:2,name:'Blog',item:'https://emissa.tech/blog'},
    {'@type':'ListItem',position:3,name:category.name,item:`https://emissa.tech/blog/category/${post.category}`},{'@type':'ListItem',position:4,name:post.title,item:`https://emissa.tech/blog/topics/${slug}`}
  ]};
  const faqSchema=post.faq.length?{'@context':'https://schema.org','@type':'FAQPage',mainEntity:post.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}:null;

  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">EMISSA</a><div><a href="/blog">Blog</a><a href="/blog/category/supplier-compliance">Categories</a><a href="/platform">Platform</a><a href="/regulations">Regulations</a><a href="/tools">Tools</a><a href="/demo">Demo</a></div></nav>
    <article>
      <div className="seoSection" style={{paddingBottom:0}}><nav aria-label="Breadcrumb" style={{display:'flex',gap:8,flexWrap:'wrap',fontSize:13}}><a href="/">Home</a><span>/</span><a href="/blog">Blog</a><span>/</span><a href={`/blog/category/${post.category}`}>{category.name}</a><span>/</span><span>{post.title}</span></nav></div>
      <header className="seoHero compact"><span className="seoKicker">{category.name}</span><h1>{post.title}</h1><p>{post.description}</p><div className="seoActions"><span className="seoSecondary">Updated {post.updated}</span><span className="seoSecondary">{post.readTime} min read</span><span className="seoSecondary">Reviewed by Emissa Compliance Research</span></div></header>
      <section className="seoSection"><span className="seoKicker">On this page</span><h2>Guide contents</h2><div className="seoActions">{post.sections.map(([heading])=><a className="seoSecondary" href={`#${idFor(heading)}`} key={heading}>{heading}</a>)}</div></section>
      {post.sections.map(([heading,body],index)=><section className="seoSection" id={idFor(heading)} key={heading}><h2>{heading}</h2><p>{body}</p>{index===1&&<InlineLeadMagnet title={magnetTitle} description={magnetDescription} resource={resource} source={`blog:${slug}`}/>}</section>)}
      {post.faq.length>0&&<section className="seoSection"><span className="seoKicker">Frequently asked questions</span><h2>Questions about {post.title}</h2><div className="seoFaq">{post.faq.map(([q,a])=><article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></section>}
      <section className="seoSection"><span className="seoKicker">Continue the workflow</span><h2>Related Emissa resources</h2><div className="seoActions">{related.map(href=><a className="seoSecondary" href={href} key={href}>{href.split('/').filter(Boolean).pop()?.replaceAll('-',' ')||'Emissa resource'} →</a>)}</div></section>
      <section className="seoSection"><span className="seoKicker">Editorial standard</span><h2>Source-aware supplier compliance guidance</h2><p>Emissa articles focus on operational data, evidence and workflow design. Regulatory applicability and legal decisions should be confirmed against current official sources and qualified advisors.</p><div className="seoActions"><a className="seoSecondary" href="/about/editorial-policy">Editorial policy</a><a className="seoSecondary" href={`/blog/category/${post.category}`}>More {category.name}</a></div></section>
      <section className="seoCta"><h2>Turn the guidance into an operating workflow.</h2><p>See how Emissa connects supplier evidence, buyer requirements, due diligence and regulatory work in one controlled operating layer.</p><a className="seoPrimary" href="/demo">Book a private demo</a></section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/>
    {faqSchema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>}
  </main>;
}
