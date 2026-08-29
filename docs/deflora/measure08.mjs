// Высоты элементов внутри раздела «Что мы предлагаем построить»,
// чтобы понять, на сколько его надо ужать под одну страницу.
import { spawn } from 'node:child_process';
const CHROME = 'C:\\Users\\Eugene\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe';
const PORT = 9361;
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu',
  '--hide-scrollbars', '--user-data-dir=' + process.cwd() + '\\.chrome-m8', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws;
for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) { ws = (await r.json()).webSocketDebuggerUrl; break; } } catch {} await sleep(250); }
const sock = new WebSocket(ws); await new Promise((res, rej) => { sock.onopen = res; sock.onerror = rej; });
let id = 0; const pend = new Map();
sock.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { const { res, rej } = pend.get(m.id); pend.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } };
const send = (m, p = {}, s) => new Promise((res, rej) => { const g = { id: ++id, method: m, params: p }; if (s) g.sessionId = s; pend.set(g.id, { res, rej }); sock.send(JSON.stringify(g)); });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
await send('Emulation.setDeviceMetricsOverride', { width: 794, height: 1123, deviceScaleFactor: 1, mobile: false }, sessionId);
await send('Emulation.setEmulatedMedia', { media: 'print' }, sessionId);
await send('Page.navigate', { url: 'file:///' + process.cwd().replace(/\\/g, '/') + '/deflora-print.html' }, sessionId);
for (let i = 0; i < 60; i++) { await sleep(400); const r = await send('Runtime.evaluate', { expression: 'document.readyState==="complete"&&document.fonts.status==="loaded"', returnByValue: true }, sessionId); if (r.result?.value === true) break; }

const r = await send('Runtime.evaluate', {
  expression: `(() => {
    const secs = [...document.querySelectorAll('.wrap > section')];
    const s = secs.find(x => /предлагаем построить/.test(x.textContent));
    if (!s) return 'раздел не найден';
    const h = el => el ? Math.round(el.getBoundingClientRect().height) : 0;
    const parts = [
      ['заголовок', h(s.querySelector('.sec-head'))],
      ['вступление', h(s.querySelector('.sec-intro'))],
      ...[...s.querySelectorAll('.layer')].map((l, i) => ['слой ' + (i+1), h(l)]),
      ['комплект', h(s.querySelector('.bundle'))],
    ];
    const total = h(s);
    return JSON.stringify({ parts, total, page: 1005 });
  })()`, returnByValue: true,
}, sessionId);

const d = JSON.parse(r.result.value);
for (const [n, v] of d.parts) console.log(`  ${String(v).padStart(5)}px  ${n}`);
console.log(`  ${String(d.total).padStart(5)}px  ВЕСЬ РАЗДЕЛ`);
console.log(`\nстраница: ${d.page}px, надо ужать на ${d.total - d.page}px (${Math.round((d.total - d.page) / d.total * 100)}%)`);
sock.close(); chrome.kill();
