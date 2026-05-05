import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { getBlogPost, getAllBlogPosts, type BlogBlock } from '@/lib/data/blog';

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: { absolute: 'Post not found | EasyMove Elite' } };

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: `https://easy-move-florida.com/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      siteName: 'EasyMove Elite',
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://easy-move-florida.com/blog/${post.slug}`,
      images: [{ url: `https://easy-move-florida.com${post.heroImage}`, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [`https://easy-move-florida.com${post.heroImage}`],
    },
  };
}

function renderBlock(block: BlogBlock, key: number) {
  switch (block.type) {
    case 'p':
      return <p key={key} className="text-gray-700 text-base leading-relaxed mb-5">{block.text}</p>;
    case 'h2':
      return <h2 key={key} className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-12 mb-5">{block.text}</h2>;
    case 'h3':
      return <h3 key={key} className="font-display text-xl font-semibold text-charcoal mt-8 mb-3">{block.text}</h3>;
    case 'ul':
      return (
        <ul key={key} className="list-disc list-outside ml-5 space-y-2 mb-6 text-gray-700 text-base leading-relaxed">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case 'ol':
      return (
        <ol key={key} className="list-decimal list-outside ml-5 space-y-2 mb-6 text-gray-700 text-base leading-relaxed">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      );
    case 'callout':
      return (
        <aside key={key} className="my-8 bg-gold/5 border border-gold/30 p-6">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{block.title}</p>
          <p className="text-charcoal text-sm leading-relaxed">{block.text}</p>
        </aside>
      );
    case 'quote':
      return (
        <blockquote key={key} className="my-8 border-l-2 border-gold pl-5 italic text-gray-600">
          <p className="text-base leading-relaxed">{block.text}</p>
          {block.cite && <cite className="block mt-2 text-sm not-italic text-gold">— {block.cite}</cite>}
        </blockquote>
      );
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const articleJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: `https://easy-move-florida.com${post.heroImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: post.author, url: 'https://easy-move-florida.com/about' },
    publisher: {
      '@type': 'Organization',
      name: 'EasyMove Elite',
      logo: { '@type': 'ImageObject', url: 'https://easy-move-florida.com/images/Hero.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://easy-move-florida.com/blog/${post.slug}` },
  });

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://easy-move-florida.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://easy-move-florida.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://easy-move-florida.com/blog/${post.slug}` },
    ],
  });

  const related = (post.related ?? [])
    .map((slug) => getBlogPost(slug))
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        {/* Hero */}
        <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden bg-charcoal">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold tracking-widest uppercase mb-4 hover:underline">
              <ArrowLeft size={12} /> All Resources
            </Link>
            <span className="inline-block bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-300">
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>
              <span>· By {post.author}</span>
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {post.body.map(renderBlock)}
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-cream py-12 md:py-16 border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Related</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-8">Continue Reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block bg-white border border-gray-100 p-6 hover:border-gold/40 transition-colors">
                    <p className="text-gold text-[10px] font-bold tracking-widest uppercase mb-2">{rel.category}</p>
                    <h3 className="font-display text-lg font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors">{rel.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{rel.excerpt}</p>
                    <span className="text-gold text-sm font-semibold inline-flex items-center gap-1">
                      Read <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
