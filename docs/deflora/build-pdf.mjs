// Собирает печатную версию предложения из того же deflora.html, что опубликован,
// и печатает её в PDF закэшированным Chromium через CDP.
// Запуск: node build-pdf.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';

const SRC = process.env.SRC || 'deflora.html';
const HTML_OUT = process.env.HTML_OUT || 'deflora-print.html';
const PDF_OUT = process.env.PDF_OUT || 'deFLORA-предложение-Orium-Studios.pdf';
const CHROME = 'C:\\Users\\Eugene\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe';

// ── 1. Печатная обёртка ─────────────────────────────────────────────────────
const src = readFileSync(SRC, 'utf8');
const title = (src.match(/<title>([^<]*)<\/title>/) || [, 'Предложение'])[1];
const body = src.replace(/<title>[\s\S]*?<\/title>/, '');

const EN = (process.env.SRC || '').includes('-en');
// Раздел с ценами должен открывать страницу целиком, иначе слои и итоговая
// цена расходятся по разным листам. В английской версии он и так помещается.
const BREAKS = (process.env.BREAKS ?? (EN ? '' : '8')).split(',').filter(Boolean)
  .map(n => 'section:nth-of-type(' + n.trim() + ')').join(', ') + '{ break-before:page; }';
const PRINT_CSS = `
<style>
@page { size: A4; margin: 15mm 0 16mm; }
@page :first { margin: 0; }

/* Печать всегда в светлой теме: тёмные токены на бумаге нечитаемы. */
:root, :root[data-theme="dark"]{
  --paper:#FFFFFF; --card:#FFFFFF;
  --ink:#161A17; --ink-soft:#41483F; --ink-faint:#6E756C;
  --rule:#D3D8CE; --rule-soft:#EDF0EA;
  --stem:#2C5545; --stem-soft:#EBF2ED;
  --bloom:#9B3350; --bloom-soft:#F9EAEE;
  --amber:#7E560F; --amber-soft:#F7F0E1;
  --shadow:none;
}
*{ -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }

html,body{ background:#fff !important; }
body{ font-size:9.6pt; line-height:1.5; }
.wrap{ max-width:none; padding:0 17mm; }

/* Обложка — на всю страницу, без полей */
.cover{
  width:210mm; height:297mm; background:var(--stem); color:#F2F6F1;
  padding:26mm 22mm; display:flex; flex-direction:column; justify-content:space-between;
  break-after:page; position:relative; overflow:hidden;
}
.cover-top{ display:flex; justify-content:space-between; align-items:flex-start; gap:16mm; }
.cover-mark{
  font-family:'JetBrains Mono',monospace; font-size:9.5pt; letter-spacing:.22em;
  text-transform:uppercase; color:rgba(242,246,241,.72);
}
.cover-date{ font-family:'JetBrains Mono',monospace; font-size:9.5pt; color:rgba(242,246,241,.6); letter-spacing:.08em; }
.cover-mid h1{
  font-family:'Bodoni Moda',Georgia,serif; font-weight:700; font-size:40pt; line-height:1.08;
  letter-spacing:-.01em; color:#F2F6F1; margin:0 0 10mm; max-width:none;
}
.cover-mid h1 em{ font-style:italic; color:#F0B9C6; }
.cover-lede{ font-size:12pt; line-height:1.6; color:rgba(242,246,241,.86); max-width:46ch; margin:0; }
.cover-rule{ height:1px; background:rgba(242,246,241,.28); margin:9mm 0; }
.cover-grid{ display:flex; gap:9mm; }
.cover-cell{ flex:1 1 0; min-width:0; }
.cover-cell .k{
  font-family:'JetBrains Mono',monospace; font-size:8pt; letter-spacing:.16em; text-transform:uppercase;
  color:rgba(242,246,241,.55); display:block; margin-bottom:3mm;
}
.cover-cell .v{ font-size:11.5pt; color:#F2F6F1; line-height:1.4; }
.cover-cell .v b{ font-weight:700; }
.cover-phone{ font-family:'Bodoni Moda',Georgia,serif; font-size:19pt; font-weight:700; letter-spacing:.01em; }

/* ── Разрывы страниц ───────────────────────────────────────────────────────
   Документ верстается ПОД СТРАНИЦЫ, а не течёт как веб-страница.

   Правило первое: карточка никогда не режется пополам. Разрезанная карточка
   без нижней рамки, продолжающаяся списком без заголовка на следующей
   странице, выглядит как брак — хуже любой пустоты.

   Правило второе: разделы, которые начинаются с крупной сетки карточек,
   открывают новую страницу. Тогда карточки гарантированно помещаются целиком,
   а поле внизу предыдущей страницы читается как поле, а не как дыра.

   Исключение — таблица: она длиннее страницы по своей природе, поэтому ей
   ломаться можно, а шапка повторяется. */
.layer,.bundle,.plain,.caveat,.sign-card,.evidence,
.score-col,.city-col,.stance-col,.roi,.steps{ break-inside:avoid; }

/* Находок много и они крупные (290–400px). Держать их коробками означало
   листы, занятые одной карточкой. Поэтому в печати находка — не коробка,
   а блок с боковой линейкой: тогда перенос между рассуждением и его
   доказательством выглядит как продолжение текста, а не как разорванная
   рамка. Сами рассуждение и доказательство внутри себя неделимы. */
.finding{
  break-inside:auto; overflow:visible;
  border:none; border-left:2px solid var(--rule); border-radius:0;
  background:transparent; box-shadow:none;
}
.f-top,.f-body{ break-inside:avoid; }
.f-top{ break-after:avoid; padding-left:6mm; }
.f-body{ padding-left:6mm; }
.evidence{ border-top:none; margin-left:6mm; }
/* Таблица «Сам сайт» — 775px, а весь её раздел 852px, то есть помещается на
   страницу целиком. Рвать её незачем: разрыв оставлял на следующей странице
   две строки и лист пустоты. Даём разделу свою страницу и держим таблицу
   монолитом. Шапка всё равно объявлена повторяемой — на случай, если таблица
   когда-нибудь вырастет. */
.tbl-wrap,table{ break-inside:avoid; }
thead{ display:table-header-group; }
tr,li{ break-inside:avoid; }
p{ orphans:3; widows:3; }
h2,h3,h4,.sec-head,.sec-intro,.roi-h,.roi-sub{ break-after:avoid; }

/* Замеренные высоты разделов (при странице 1005px):
     01 645 · 02 706 · 03 273 · 04 1306 · 05 1175 · 06 721 · 07 852
     08 1378 · 09 533 · 10 468 · 11 385 · 12 378 · подпись 307
   Разделы 04 и 08 открываются крупной сеткой карточек и целиком в страницу не
   влезают: если они начнутся с середины, сетка уедет целиком и оставит дыру.
   Поэтому им — и только им — чистая страница. Остальное укладывается потоком:
   02+03 = 979px и дают почти идеальную страницу. */
${BREAKS}

h2,h3,h4,.sec-head{ break-after:avoid; }
section{ margin-bottom:6.5mm; }
.masthead{ display:none; }           /* заменена обложкой */
.sec-head{ margin-bottom:2px; }
.sec-intro{ margin:6px 0 11px; }
.plain{ padding:4mm 6mm; font-size:9.4pt; }

/* Плотнее под формат листа */
.findings{ gap:5mm; }
.f-top{ padding:4mm 7mm 0; }
.f-body{ padding:2.5mm 7mm 4mm; font-size:9.5pt; }
.evidence{ padding:3mm 7mm; font-size:8pt; line-height:1.5; white-space:pre-wrap; }
.score,.cities,.stance{ gap:5mm; }
.score-col,.city-col{ padding:4.5mm; }
.score-col ul{ gap:1.9mm; font-size:8.9pt; }
.city-list{ font-size:9.1pt; line-height:1.6; }
.layers{ gap:5mm; }
.layer-head{ padding:4.5mm 7mm 0; }
.layer-name{ font-size:16pt; }
.layer-price{ font-size:19pt; }
.layer-body{ padding:2.5mm 7mm 4.5mm; font-size:9.5pt; }
.layer-body ul{ font-size:9.1pt; gap:1.9mm; }
.layer-foot{ padding:2.4mm 7mm; font-size:8pt; }
.bundle{ padding:7mm 8mm; }
.bundle-t{ font-size:15pt; }
.bundle-s{ font-size:9.8pt; }
.bundle-p{ font-size:26pt; }
.roi{ padding:5mm 7mm; }
.roi-row{ padding:1.8mm 0; font-size:9.5pt; }
.roi-n{ font-size:17pt; }
th,td{ padding:2.1mm 4.5mm; font-size:9.1pt; }
/* padding-left трогать нельзя — на нём держится колонка с номером */
.steps li{ padding-top:2.6mm; padding-bottom:2.6mm; font-size:9.5pt; }
.steps li::before{ top:3.9mm; }
.sign-card{ padding:7mm 9mm; }
.sign-name{ font-size:19pt; }
.sign-phone{ font-size:20pt; }
a{ text-decoration:none; }
/* Подвал в печати не нужен: ровно тот же текст уже стоит колонтитулом на
   каждой странице. Оставленный, он утаскивал за собой целый пустой лист. */
footer{ display:none; }

/* Неделимый вводный абзац пробовали — стало хуже: он сам начал расталкивать
   страницы и добавил три дыры. Висячую строку ловим мягко, через widows. */
.sec-intro{ widows:2; orphans:2; }
.signoff{ break-after:avoid; }
</style>`;


const COVER = EN ? `
<div class="cover">
  <div class="cover-top">
    <span class="cover-mark">Orium Studios · AI systems for business</span>
    <span class="cover-date">26 August 2026</span>
  </div>
  <div class="cover-mid">
    <h1>Aventura is<br>your closest neighborhood.<br>To a machine<br>you are <em>not there</em>.</h1>
    <p class="cover-lede">
      A read of deflorashop.com through a machine's eyes, and a proposal to build three layers:
      a business AI can read, an agent that takes the order, and a system that remembers the
      customer and brings them back.
    </p>
  </div>
  <div>
    <div class="cover-rule"></div>
    <div class="cover-grid">
      <div class="cover-cell"><span class="k">For</span><span class="v"><b>deFLORA Shop</b><br>Flowers and Gifts</span></div>
      <div class="cover-cell"><span class="k">From</span><span class="v"><b>Eugene Romanov</b><br>CEO, Orium Studios</span></div>
      <div class="cover-cell"><span class="k">Contact</span><span class="v cover-phone">786-305-1844</span></div>
    </div>
  </div>
</div>` : `
<div class="cover">
  <div class="cover-top">
    <span class="cover-mark">Orium Studios · внедрение ИИ в бизнес</span>
    <span class="cover-date">26 августа 2026</span>
  </div>
  <div class="cover-mid">
    <h1>Авентура — ваш<br>ближайший район.<br>Для ИИ вас там<br><em>не существует</em>.</h1>
    <p class="cover-lede">
      Разбор deflorashop.com глазами машины и предложение построить три слоя: бизнес,
      который ИИ умеет прочитать; агент, который принимает заказ; система, которая
      помнит клиента и возвращает его.
    </p>
  </div>
  <div>
    <div class="cover-rule"></div>
    <div class="cover-grid">
      <div class="cover-cell">
        <span class="k">Кому</span>
        <span class="v"><b>deFLORA Shop</b><br>Flowers and Gifts</span>
      </div>
      <div class="cover-cell">
        <span class="k">От кого</span>
        <span class="v"><b>Евгений Романов</b><br>CEO, Orium Studios</span>
      </div>
      <div class="cover-cell">
        <span class="k">Связь</span>
        <span class="v cover-phone">786-305-1844</span>
      </div>
    </div>
  </div>
</div>`;


// В английской версии текст короче, и подпись не дотягивает до последней
// страницы: она уезжала одна наверх пустого листа и читалась как обрыв.
// Поэтому там подпись получает свой лист намеренно и стоит по центру.
// В русской версии подпись помещается вместе с шагами, и трогать её нельзя.

// Русская версия: раздел с ценами уплотнён так, чтобы три слоя и итоговый
// «комплект за $6 900» помещались на одну страницу. Оторванный от слоёв
// блок с итоговой ценой читается как чужой. Английской версии не касается.
const RU_CSS = EN ? '' : `
<style>
.layers{ gap:3mm; }
.sec-intro{ margin:4px 0 8px; }
.layer-head{ padding:3mm 6mm 0; }
.layer-name{ font-size:14pt; }
.layer-price{ font-size:17pt; }
.layer-body{ padding:2mm 6mm 3mm; font-size:9pt; }
.layer-body p{ margin-bottom:2.4mm; }
.layer-body ul{ font-size:8.6pt; gap:1.5mm; }
.layer-foot{ padding:1.5mm 6mm; font-size:7.6pt; }
.bundle{ margin-top:3mm; }
.bundle{ padding:5mm 7mm; }
.bundle-t{ font-size:13pt; }
.bundle-s{ font-size:9pt; }
.bundle-p{ font-size:23pt; }
</style>`;

const EN_CSS = EN ? `
<style>
.signoff{
  break-before:page; margin:0;
  min-height:calc(297mm - 15mm - 16mm);
  display:flex; align-items:center;
}
.sign-card{ width:100%; }
</style>` : '';

const out = `<!doctype html><html lang="${EN ? 'en' : 'ru'}"><head><meta charset="utf-8">
<title>${title}</title>
${body.match(/<link[^>]*>/g)?.join('\n') ?? ''}
${body.match(/<style>[\s\S]*?<\/style>/)?.[0] ?? ''}
${PRINT_CSS}
${EN_CSS}
${RU_CSS}
</head><body>
${COVER}
${body.replace(/<link[^>]*>/g, '').replace(/<style>[\s\S]*?<\/style>/, '')}
</body></html>`;

writeFileSync(HTML_OUT, out, 'utf8');
console.log('печатная версия собрана:', HTML_OUT, (out.length / 1024).toFixed(1), 'КБ');

// ── 2. Печать через CDP ─────────────────────────────────────────────────────
const PORT = 9339;
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`,
  '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--user-data-dir=' + process.cwd() + '\\.chrome-pdf',
  'about:blank',
], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function endpoint() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return (await r.json()).webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error('Chromium не поднял отладочный порт');
}

const ws = new WebSocket(await endpoint());
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0;
const pending = new Map();
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? rej(new Error(m.error.message)) : res(m.result);
  }
};
const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
  const msg = { id: ++id, method, params };
  if (sessionId) msg.sessionId = sessionId;
  pending.set(msg.id, { res, rej });
  ws.send(JSON.stringify(msg));
});

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);

const fileUrl = 'file:///' + process.cwd().replace(/\\/g, '/') + '/' + HTML_OUT;
await send('Page.navigate', { url: fileUrl }, sessionId);

// Ждём, пока догрузятся шрифты — иначе Bodoni подменится и вёрстка поедет.
let fontsOk = false;
for (let i = 0; i < 60; i++) {
  await sleep(400);
  try {
    const r = await send('Runtime.evaluate', {
      expression: 'document.readyState==="complete" && document.fonts.status==="loaded"',
      returnByValue: true,
    }, sessionId);
    if (r.result?.value === true) { fontsOk = true; break; }
  } catch {}
}
console.log(fontsOk ? 'шрифты загружены' : 'ВНИМАНИЕ: шрифты не подтвердились, вёрстка может отличаться');

const { data } = await send('Page.printToPDF', {
  printBackground: true,
  paperWidth: 8.27, paperHeight: 11.69,          // A4
  marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate: `<div style="width:100%;font-family:Arial,sans-serif;font-size:7pt;color:#8A928A;
      padding:0 17mm;display:flex;justify-content:space-between;">
      <span>${EN ? "Orium Studios · Eugene Romanov · 786-305-1844" : "Orium Studios · Евгений Романов · 786-305-1844"}</span>
      <span>${EN ? "Page" : "Стр."} <span class="pageNumber"></span> ${EN ? "of" : "из"} <span class="totalPages"></span></span>
    </div>`,
}, sessionId);

writeFileSync(PDF_OUT, Buffer.from(data, 'base64'));
console.log('PDF записан:', PDF_OUT);

ws.close();
chrome.kill();
