// Растрирует реальные страницы PDF. pdf.js ждёт браузерные глобалы —
// без них render() молча рисует пустой лист и проверка «проходит».
import { readFileSync, writeFileSync } from 'node:fs';
import canvasPkg from '@napi-rs/canvas';
const { createCanvas, DOMMatrix, ImageData, Path2D } = canvasPkg;
globalThis.DOMMatrix ??= DOMMatrix;
globalThis.ImageData ??= ImageData;
globalThis.Path2D ??= Path2D;


const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

const doc = await pdfjs.getDocument({
  data: new Uint8Array(readFileSync(process.env.PDF || 'deFLORA-предложение-Orium-Studios.pdf')),
  useSystemFonts: true,
}).promise;

const pages = process.argv.slice(2).map(Number).filter(Boolean);
let anyInk = false;

for (const n of pages) {
  const page = await doc.getPage(n);
  const vp = page.getViewport({ scale: 1.35 });
  const cv = createCanvas(vp.width, vp.height);
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, vp.width, vp.height);
  await page.render({ canvasContext: ctx, canvas: cv, viewport: vp }).promise;

  // Контроль: страница, на которой вообще нет краски, означает сломанный
  // рендер, а не пустую страницу. Об этом надо кричать, а не молчать.
  const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
  let ink = 0;
  for (let i = 0; i < d.length; i += 40) if (d[i] < 245 || d[i + 1] < 245 || d[i + 2] < 245) ink++;
  if (ink > 0) anyInk = true;
  writeFileSync(`pdf-${String(n).padStart(2, '0')}.png`, cv.toBuffer('image/png'));
  console.log(`стр.${String(n).padStart(2)} — закрашенных проб: ${ink}${ink === 0 ? '  <-- РЕНДЕР НЕ РАБОТАЕТ' : ''}`);
}
if (!anyInk) { console.error('\nни одного пикселя ни на одной странице — растеризатор сломан, снимкам верить нельзя'); process.exit(2); }
