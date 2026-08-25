/**
 * IndexNow protocol — instant indexation push for Bing, Yandex, Naver, Seznam.
 * Bing/Yandex matter for: Bing Copilot AI search, Russian-speaking traffic (Yandex).
 * Spec: https://www.indexnow.org/documentation
 */

const INDEXNOW_KEY = '186c8626cf8c502a9b50e971fb27fbb6d324e5b44bd9956592991349c64013cc';
// Must be the canonical host. Every URL this site emits is www, and apex 301s to
// www, so an apex HOST both filtered out every real URL and made the payload's
// host disagree with its urlList — IndexNow rejects that.
const HOST = 'www.easy-move-florida.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

export type IndexNowResult =
  | { ok: true; submitted: number; status: number }
  | { ok: false; reason: 'no-valid-urls' | 'rejected' | 'network'; submitted: number; dropped: string[]; status?: number };

/** Accept apex or www input; IndexNow is told about the canonical www URL. */
function canonicalise(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname !== 'easy-move-florida.com' && u.hostname !== HOST) return null;
    u.protocol = 'https:';
    u.hostname = HOST;
    return u.toString();
  } catch {
    return null;
  }
}

/**
 * Notify IndexNow that one or more URLs have been added or updated.
 * Use after publishing a new blog post, city page, or making material changes
 * to existing pages. Single endpoint accepts up to 10,000 URLs per request.
 *
 * Never throws — indexation is best-effort and must not break the calling flow.
 * Returns why it failed rather than a bare false, so "nothing to send" and
 * "the endpoint rejected us" can never print the same sentence.
 */
export async function pingIndexNow(urls: string | string[]): Promise<IndexNowResult> {
  const urlList = Array.isArray(urls) ? urls : [urls];
  const valid: string[] = [];
  const dropped: string[] = [];
  for (const u of urlList) {
    const c = canonicalise(u);
    if (c) valid.push(c);
    else dropped.push(u);
  }
  if (valid.length === 0) return { ok: false, reason: 'no-valid-urls', submitted: 0, dropped };

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: valid,
      }),
    });
    if (res.ok || res.status === 202) {
      return { ok: true, submitted: valid.length, status: res.status };
    }
    return { ok: false, reason: 'rejected', submitted: valid.length, dropped, status: res.status };
  } catch {
    return { ok: false, reason: 'network', submitted: valid.length, dropped };
  }
}
