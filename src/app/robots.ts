import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.easy-move-florida.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Explicit Allow for AI search crawlers — keeps EasyMove Elite citable
      // in ChatGPT search, Claude, Perplexity, Bing Copilot, Google AI Overviews.
      { userAgent: 'GPTBot', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'Claude-Web', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/admin/', '/api/'] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
