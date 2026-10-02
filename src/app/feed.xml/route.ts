import { getAllBlogPosts } from '@/lib/data/blog';
import { absUrl } from '@/lib/site';

/**
 * /feed.xml — RSS 2.0 for the blog, linked from every page's <head>.
 *
 * Dates are each post's own publishedAt / updatedAt from blog.ts, the same
 * values its Article schema states. Two posts are written in Russian; they
 * carry dc:language so a reader does not take the whole feed for English.
 */
export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rfc822 = (d: string) => new Date(`${d}T12:00:00Z`).toUTCString();
const CYRILLIC = /[\u0400-\u04FF]/;

export function GET() {
  const posts = getAllBlogPosts();
  const newest = posts.map((p) => p.updatedAt).sort().at(-1) ?? posts[0]?.publishedAt;
  const items = posts.map((p) => {
    const url = absUrl(`/blog/${p.slug}`);
    return [
      '    <item>',
      `      <title>${esc(p.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <description>${esc(p.excerpt)}</description>`,
      `      <category>${esc(p.category)}</category>`,
      `      <pubDate>${rfc822(p.publishedAt)}</pubDate>`,
      `      <dc:date>${p.updatedAt}</dc:date>`,
      `      <dc:language>${CYRILLIC.test(p.title) ? 'ru' : 'en'}</dc:language>`,
      '    </item>',
    ].join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    '    <title>Easy Move Florida — Moving guides</title>',
    `    <link>${absUrl('/blog')}</link>`,
    `    <atom:link href="${absUrl('/feed.xml')}" rel="self" type="application/rss+xml" />`,
    '    <description>Guides from a South Florida moving company: costs, condo and COI requirements, packing, and planning a move.</description>',
    '    <language>en-us</language>',
    `    <lastBuildDate>${rfc822(newest)}</lastBuildDate>`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
