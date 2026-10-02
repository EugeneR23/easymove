import type { MetadataRoute } from 'next';
import { AI_BOTS, ALLOW_PATHS, BLOCKED_SCRAPERS, SEARCH_BOTS, STD_DISALLOW } from '@/lib/seo/crawlers';

const siteUrl = 'https://www.easy-move-florida.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule — applies to any UA not explicitly listed below.
      // EN at /, RU at /ru/, UA at /ua/. Add a language path to ALLOW_PATHS when it ships.
      {
        userAgent: '*',
        allow: ALLOW_PATHS,
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
        allow: ALLOW_PATHS,
        disallow: STD_DISALLOW,
      })),

      // AI assistants & generative engines — keeps Easy Move Florida citable across
      // ChatGPT search, Claude, Perplexity, Copilot, Google AI Overviews, Meta AI.
      // AI-помощники / Asistentes de IA generativa
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: ALLOW_PATHS,
        disallow: STD_DISALLOW,
      })),

      // Aggressive scrapers — fully blocked
      ...BLOCKED_SCRAPERS.map((userAgent) => ({
        userAgent,
        disallow: '/',
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
