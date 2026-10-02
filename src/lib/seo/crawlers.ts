/**
 * Which crawlers may read the site. One list, read by /robots.txt and by
 * /.well-known/ai.txt, so the two files cannot grant different access.
 */

// Standard disallow list shared across most agents
export const STD_DISALLOW = ['/admin/', '/api/'];

// AI training + AI-search crawlers we want citing us (ChatGPT/Claude/Perplexity/Bing Copilot/AI Overviews)
export const AI_BOTS = [
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
  'GoogleOther',
  'DuckAssistBot',
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

// Major search engines — explicit Allow keeps us multilingual (EN at /, Russian at /ru/, Ukrainian at /ua/)
export const SEARCH_BOTS = [
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
export const BLOCKED_SCRAPERS = ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'BLEXBot', 'PetalBot'];

// Language paths that actually exist. One source, so a bot rule can never allow
// a path we never shipped.
export const ALLOW_PATHS = ['/', '/ru/', '/ua/'];
