import { aiService, jsonResponse } from '@/lib/seo/aiDiscovery';

/** /ai/service.json — prerendered at build time from the site's own data. */
export const dynamic = 'force-static';

export function GET() {
  return jsonResponse(aiService());
}
