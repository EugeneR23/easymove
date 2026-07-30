import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.easy-move-florida.com';

// Standard disallow list shared across most agents
const STD_DISALLOW = ['/admin/', '/api/'];

// AI training + AI-search crawlers we want citing us (ChatGPT/Claude/Perplexity/Bing Copilot/AI Overviews)
const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  'Bytespider',
  'Amazonbot',
  'cohere-ai',
  'YouBot',
  'CCBot',
  'Diffbot',
];

// Major search engines — explicit Allow keeps us multilingual (EN default, /ru/ Russian, /es/ Spanish planned)
const SEARCH_BOTS = [
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'YandexBot',
  'YandexImages',
  'Mail.Ru',
  'DuckDuckBot',
  'Applebot',
];

// Aggressive SEO scrapers — block (consume bandwidth, no benefit)
const BLOCKED_SCRAPERS = ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'BLEXBot', 'PetalBot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule — applies to any UA not explicitly listed below.
      // EN (default) at /, RU at /ru/, ES at /es/ (planned). All language paths allowed.
      {
        userAgent: '*',
        allow: ['/', '/ru/', '/es/'],
        disallow: [
          ...STD_DISALLOW,
          '/*?*utm_',
          '/*?*fbclid=',
          '/*?*gclid=',
          '/*?*ref=',
        ],
      },

      // Search engines — same allow set, explicit so they win over restrictive *-rules.
      // Поисковые системы — Buscadores
      ...SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: ['/', '/ru/', '/es/'],
        disallow: STD_DISALLOW,
      })),

      // AI assistants & generative engines — keeps EasyMove Elite citable across
      // ChatGPT search, Claude, Perplexity, Copilot, Google AI Overviews, Meta AI.
      // AI-помощники / Asistentes de IA generativa
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: ['/', '/ru/', '/es/'],
        disallow: STD_DISALLOW,
      })),

      // Aggressive scrapers — fully blocked
      ...BLOCKED_SCRAPERS.map((userAgent) => ({
        userAgent,
        disallow: '/',
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
