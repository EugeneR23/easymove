// Проверка английской версии на следы ИИ-письма и целостность разметки.
// Пишется файлом, а не heredoc: bash на Windows съедает \\b и проверка
// начинает молча «проходить».
import { readFileSync } from 'node:fs';

const file = process.argv[2] || 'deflora-en.html';
const raw = readFileSync(file, 'utf8');
const noStyle = raw.replace(/<style[\s\S]*?<\/style>/g, '');
const txt = noStyle.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');

// ── разметка ──────────────────────────────────────────────────────────────
const VOID = new Set(['link', 'meta', 'br', 'hr', 'img', 'input', 'source']);
const stack = [], errs = [];
let m, re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g;
while ((m = re.exec(noStyle))) {
  const [, close, tag, self] = m;
  const n = tag.toLowerCase();
  if (VOID.has(n) || self === '/') continue;
  if (!close) stack.push(n);
  else { const top = stack.pop(); if (top !== n) errs.push(`</${n}> при открытом <${top}>`); }
}
console.log(`разметка: незакрытых ${stack.length}, несовпадений ${errs.length}`);
errs.slice(0, 3).forEach(e => console.log('   ', e));

// ── следы ИИ ──────────────────────────────────────────────────────────────
const dashes = (txt.match(/[—–]/g) || []).length;
const cyr = (txt.match(/[а-яА-Я]/g) || []).length;
console.log(`длинных тире: ${dashes} (нужно 0)`);
console.log(`кириллицы: ${cyr} (нужно 0)`);

const WATCH = ['vibrant', 'showcase', 'testament', 'delve', 'underscore', 'tapestry',
  'pivotal', 'seamless', 'robust', 'leverage', 'crucial', 'elevate', 'unlock',
  'game-changer', 'cutting-edge', 'holistic', 'synergy', 'empower', 'streamline'];
const hits = [];
for (const w of WATCH) {
  const r = new RegExp('\\b' + w, 'gi');
  const found = [...txt.matchAll(r)];
  for (const f of found) {
    const ctx = txt.slice(Math.max(0, f.index - 45), f.index + w.length + 35).trim();
    const quoted = /["“”]/.test(ctx);   // внутри кавычек = цитата чужого текста
    hits.push({ w, quoted, ctx });
  }
}
const real = hits.filter(h => !h.quoted);
console.log(`\nслова-маркеры: всего ${hits.length}, из них не в кавычках ${real.length}`);
for (const h of hits) console.log(`   ${h.quoted ? '(цитата, ок)' : 'ТРЕБУЕТ ПРАВКИ'} «${h.w}»: …${h.ctx}…`);

// ── контроль: проверка обязана уметь находить ─────────────────────────────
const probe = 'this is a vibrant tapestry';
const canFind = WATCH.some(w => new RegExp('\\b' + w, 'i').test(probe));
console.log(`\nконтроль на заведомо плохой строке: ${canFind ? 'находит ✓' : 'СЛЕПАЯ ПРОВЕРКА ✗'}`);
if (!canFind) process.exit(2);
