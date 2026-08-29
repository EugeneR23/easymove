// Где на каждой странице реального PDF кончается контент.
// Берём координаты текста прямо из документа — без растеризации.
import { readFileSync } from 'node:fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const doc = await pdfjs.getDocument({
  data: new Uint8Array(readFileSync(process.env.PDF || 'deFLORA-предложение-Orium-Studios.pdf')),
  useSystemFonts: true,
}).promise;

const MARGIN_BOTTOM_PT = 16 / 25.4 * 72;   // 16 мм нижнего поля
const MARGIN_TOP_PT    = 15 / 25.4 * 72;
console.log('страниц:', doc.numPages, '\n');

const rows = [];
for (let n = 1; n <= doc.numPages; n++) {
  const page = await doc.getPage(n);
  const H = page.view[3] - page.view[1];
  // Колонтитул печатается В ПОЛЕ, ниже границы контента. Если его не выкинуть,
  // на каждой странице «текст до самого низа» и проверка всегда зелёная.
  const items = (await page.getTextContent()).items
    .filter(i => i.str.trim())
    .filter(i => i.transform[5] >= MARGIN_BOTTOM_PT && i.transform[5] <= H - MARGIN_TOP_PT + 2);
  if (!items.length) { rows.push({ n, empty: null, items: 0 }); continue; }
  const ys = items.map(i => i.transform[5]);
  const lowest = Math.min(...ys);          // самая нижняя строка, от низа листа
  const highest = Math.max(...ys);
  const usableTop = H - MARGIN_TOP_PT;
  const emptyPt = lowest - MARGIN_BOTTOM_PT;
  const usable = usableTop - MARGIN_BOTTOM_PT;
  rows.push({ n, items: items.length, emptyPct: Math.round(emptyPt / usable * 100),
              startPct: Math.round((usableTop - highest) / usable * 100) });
}

// контроль: инструмент обязан отличать полную страницу от пустой
const filled = rows.filter(r => r.items > 40).length;
if (!filled) { console.error('ОШИБКА: ни одной заполненной страницы не найдено — инструмент не работает'); process.exit(2); }
console.log(`контроль: страниц с >40 текстовых элементов — ${filled}, значит извлечение работает\n`);

console.log('стр  строк  пусто снизу   начало сверху');
for (const r of rows) {
  if (r.emptyPct === null) { console.log(`${String(r.n).padStart(3)}      0   (нет текста — вероятно обложка)`); continue; }
  const flag = r.emptyPct > 25 ? '   <-- ДЫРА ВНИЗУ' : '';
  const flag2 = r.startPct > 15 ? '   <-- начинается с середины' : '';
  console.log(`${String(r.n).padStart(3)}  ${String(r.items).padStart(5)}  ${String(r.emptyPct).padStart(9)}%  ${String(r.startPct).padStart(10)}%${flag}${flag2}`);
}
const bad = rows.filter(r => r.emptyPct > 25);
console.log(`\nстраниц с дырой больше четверти: ${bad.length} → ${bad.map(r => r.n).join(', ') || 'нет'}`);
