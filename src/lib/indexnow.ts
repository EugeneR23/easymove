/**
 * IndexNow protocol — instant indexation push for Bing, Yandex, Naver, Seznam.
 * Bing/Yandex matter for: Bing Copilot AI search, Russian-speaking traffic (Yandex).
 * Spec: https://www.indexnow.org/documentation
 */

const INDEXNOW_KEY = '186c8626cf8c502a9b50e971fb27fbb6d324e5b44bd9956592991349c64013cc';
const HOST = 'easy-move-florida.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

/**
 * Notify IndexNow that one or more URLs have been added or updated.
 * Use after publishing a new blog post, city page, or making material changes
 * to existing pages. Single endpoint accepts up to 10,000 URLs per request.
 *
 * Returns true on success (HTTP 200/202), false otherwise. Never throws —
 * indexation is best-effort and should not break the calling flow.
 */
export async function pingIndexNow(urls: string | string[]): Promise<boolean> {
  const urlList = Array.isArray(urls) ? urls : [urls];
  const valid = urlList.filter((u) => u.startsWith(`https://${HOST}`));
  if (valid.length === 0) return false;

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
    return res.ok || res.status === 202;
  } catch {
    return false;
  }
}
