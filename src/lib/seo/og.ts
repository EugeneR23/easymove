/**
 * Open Graph image entries that state the image's real size.
 *
 * 83 metadata blocks declared width 1200 x height 630 by hand. None of the
 * photos they pointed at is that size: Hero.png is 1024x1536 portrait and
 * Real/Miami.jpg is 813x484. A share card sized from a false declaration crops
 * or letterboxes. ogImage() reads the dimensions from the file at build time,
 * so the declaration cannot drift from the image.
 *
 * Pages with no photo of their own use ogCard(), the share card that
 * src/app/opengraph-image.png already serves at /opengraph-image.png.
 */
import fs from 'node:fs';
import path from 'node:path';
import { SITE_URL, absUrl } from '@/lib/site';

const cache = new Map<string, { width: number; height: number } | null>();

function readDims(file: string): { width: number; height: number } | null {
  let b: Buffer;
  try { b = fs.readFileSync(file); } catch { return null; }
  // PNG: IHDR width and height at bytes 16..24.
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }
  // JPEG: walk the segments to the first start-of-frame marker.
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  }
  return null;
}

/** Real pixel size of a file under public/, or null if it cannot be read. */
export function imageSize(src: string): { width: number; height: number } | null {
  const rel = decodeURIComponent(src.replace(SITE_URL, '').split('?')[0]);
  if (!cache.has(rel)) cache.set(rel, readDims(path.join(process.cwd(), 'public', rel)));
  return cache.get(rel) ?? null;
}

/** An openGraph.images entry for a file in public/, with its true size. */
export function ogImage(src: string, alt: string) {
  const dims = imageSize(src);
  return { url: src.startsWith('http') ? src : absUrl(src), ...(dims ?? {}), alt };
}

/** The 1200x630 share card, for pages without a photo of their own. */
export const OG_CARD_URL = absUrl('/opengraph-image.png');
export const TWITTER_CARD_URL = absUrl('/twitter-image.png');
export function ogCard(alt: string) {
  const dims = readDims(path.join(process.cwd(), 'src/app/opengraph-image.png'));
  return { url: OG_CARD_URL, ...(dims ?? {}), alt };
}
