import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InlineLeadMagnet from '@/components/InlineLeadMagnet';
import { newBlogPosts, type NewBlogSlug } from '@/lib/newBlogContent';
import '../../../seo.css';

export function generateStaticParams() {
  return Object.keys(newBlogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = newBlogPosts[slug as NewBlogSlug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: [...post.keywords, 'supplier compliance infrastructure', 'Emissa'],
    alternates: { canonical: `/blog/topics/${slug}` },
    openGraph: { title: `${post.title} | Emissa`, description: post.description, url: `/blog/topics/${slug}`, type: 'article' },
    robots: { index: true, follow: true },
  };
}

export default async function BlogTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = newBlogPosts[slug as NewBlogSlug];
  if (!post) notFound();
  const [magnetTitle, magnetDescription, resource] = post.magnet;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Organization', name: 'Emissa' },
    publisher: { '@type': 'Organization', name: 'Emissa' },
    mainEntityOfPage: `https://emissa.tech/blog/topics/${slug}`,
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://emissa.tech/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://emissa.tech/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://emissa.tech/blog/topics/${slug}` },
    ],
  };

  return <main className="seoPage">
    <nav className="seoNav"><a className="seoBrand" href="/">◎ EMISSA</a><div><a href="/blog">Blog</a><a href="/solutions">Solutions</a><a href="/resources">Resources</a><a href="/pricing">Pricing</a></div></nav>
    <article>
      <section className="seoHero compact"><span className="seoKicker">Supplier Compliance Library</span><h1>{post.title}</h1><p>{post.description}</p></section>
      {post.sections.map(([heading, body], index) => <section className="seoSection" key={heading}><h2>{heading}</h2><p>{body}</p>{index === 1 && <InlineLeadMagnet title={magnetTitle} description={magnetDescription} resource={resource} source={`blog:${slug}`} />}</section>)}
      <section className="seoSection"><h2>Related supplier compliance workflows</h2><div className="seoActions"><a className="seoSecondary" href="/solutions/supplier-compliance-infrastructure">Supplier compliance software</a><a className="seoSecondary" href="/solutions/supplier-due-diligence">Supplier due diligence</a><a className="seoSecondary" href="/solutions/supplier-evidence-management">Evidence management</a><a className="seoSecondary" href="/solutions/buyer-compliance-requests">Buyer requests</a><a className="seoSecondary" href="/blog">More guides</a></div></section>
      <section className="seoCta"><h2>Ready to operationalize supplier compliance?</h2><p>See how Emissa connects supplier evidence, buyer requirements, due diligence and regulatory workflows in one operating layer.</p><a className="seoPrimary" href="/demo">Book a demo</a></section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
  </main>;
}
