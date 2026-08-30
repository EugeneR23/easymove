import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/data/blog';

export const metadata: Metadata = {
  title: { absolute: 'Moving Resources & Guides — South Florida | Easy Move Florida' },
  description: 'Practical moving guides from a working South Florida mover: Brickell condo checklists, Miami pricing, COI requirements, and more. No fluff.',
  alternates: { canonical: 'https://www.easy-move-florida.com/blog' },
  openGraph: {
    type: 'website',
    siteName: 'Easy Move Florida',
    title: 'Moving Resources & Guides — South Florida | Easy Move Florida',
    description: 'Practical moving guides from a working South Florida mover.',
    url: 'https://www.easy-move-florida.com/blog',
    images: [{ url: 'https://www.easy-move-florida.com/images/Hero.png', width: 1200, height: 630, alt: 'Easy Move Florida — movers in South Florida' }],
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        {/* Hero */}
        <section className="relative bg-charcoal py-16 md:py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              Resources
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
              Moving Guides & South Florida Resources
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Practical, no-fluff guides written by a working mover. Building checklists,
              pricing breakdowns, and the answers we wish more clients knew before move day.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="section-padding bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="bg-white border border-gray-100 hover:border-gold/40 transition-colors h-full flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.heroImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-charcoal/90 text-gold text-[10px] font-bold tracking-widest uppercase px-2 py-1">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="font-display text-xl font-bold text-charcoal mb-3 leading-snug group-hover:text-gold transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400 pt-4 border-t border-gray-100">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                        <span className="ml-auto text-gold flex items-center gap-1 font-semibold">
                          Read <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
