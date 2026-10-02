import { aiFaq, jsonResponse } from '@/lib/seo/aiDiscovery';

/** /ai/faq.json — prerendered at build time from the site's own data. */
export const dynamic = 'force-static';

export function GET() {
  return jsonResponse(aiFaq());
}
