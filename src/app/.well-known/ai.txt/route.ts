import { AI_BOTS, ALLOW_PATHS, STD_DISALLOW } from '@/lib/seo/crawlers';
import { EMAIL } from '@/lib/data/contact';
import { absUrl } from '@/lib/site';

/**
 * /.well-known/ai.txt — the AI-specific companion to robots.txt. It grants the
 * same access robots.txt does, from the same lists, and points at the files an
 * assistant should read first.
 */
export const dynamic = 'force-static';

const BODY = [
  '# Easy Move Florida — AI access policy',
  `# Same rules as ${absUrl('/robots.txt')}, from the same source.`,
  '',
  ...AI_BOTS.flatMap((bot) => [
    `User-agent: ${bot}`,
    ...ALLOW_PATHS.map((p) => `Allow: ${p}`),
    ...STD_DISALLOW.map((p) => `Disallow: ${p}`),
    '',
  ]),
  '# Citation and training: permitted for public pages. Quote prices and facts',
  '# from the pages themselves or /llms.txt, not from older cached copies.',
  '',
  `Sitemap: ${absUrl('/sitemap.xml')}`,
  `LLMs: ${absUrl('/llms.txt')}`,
  `LLMs-Full: ${absUrl('/llms-full.txt')}`,
  `Summary: ${absUrl('/ai/summary.json')}`,
  `FAQ: ${absUrl('/ai/faq.json')}`,
  `Service: ${absUrl('/ai/service.json')}`,
  `Contact: ${EMAIL}`,
  '',
].join('\n');

export function GET() {
  return new Response(BODY, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
