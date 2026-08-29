// Высота каждого раздела печатной вёрстки, чтобы раскладывать их по страницам
// осознанно, а не наугад по номеру.
import { spawn } from 'node:child_process';
const CHROME = 'C:\\Users\\Eugene\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe';
const PORT = 9351;
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu',
  '--hide-scrollbars', '--user-data-dir=' + process.cwd() + '\\.chrome-h', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) { wsUrl = (await r.json()).webSocketDebuggerUrl; break; } } catch {} await sleep(250); }
const ws = new WebSocket(wsUrl); await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pend = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { const { res, rej } = pend.get(m.id); pend.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); } };
const send = (m, p = {}, s) => new Promise((res, rej) => { const msg = { id: ++id, method: m, params: p }; if (s) msg.sessionId = s; pend.set(msg.id, { res, rej }); ws.send(JSON.stringify(msg)); });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
await send('Emulation.setDeviceMetricsOverride', { width: 794, height: 1123, deviceScaleFactor: 1, mobile: false }, sessionId);
await send('Emulation.setEmulatedMedia', { media: 'print' }, sessionId);
await send('Page.navigate', { url: 'file:///' + process.cwd().replace(/\\/g, '/') + '/deflora-print.html' }, sessionId);
for (let i = 0; i < 60; i++) { await sleep(400); const r = await send('Runtime.evaluate', { expression: 'document.readyState==="complete"&&document.fonts.status==="loaded"', returnByValue: true }, sessionId); if (r.result?.value === true) break; }

const r = await send('Runtime.evaluate', {
  expression: `JSON.stringify([...document.querySelectorAll('.wrap > section, footer')].map((el,i)=>({
    i: i+1,
    title: (el.querySelector('h2')?.textContent || el.className || el.tagName).trim().slice(0,38),
    h: Math.round(el.getBoundingClientRect().height),
    mb: parseFloat(getComputedStyle(el).marginBottom)||0
  })))`, returnByValue: true,
}, sessionId);

const PAGE = Math.round((297 - 15 - 16) * 96 / 25.4);
console.log(`высота страницы контента: ${PAGE}px\n`);
const secs = JSON.parse(r.result.value);
for (const s of secs) {
  const pct = Math.round((s.h + s.mb) / PAGE * 100);
  console.log(`${String(s.i).padStart(2)}  ${String(s.h + Math.round(s.mb)).padStart(5)}px  ${String(pct).padStart(3)}% страницы  ${s.title}`);
}
console.log(`\nсумма: ${secs.reduce((a, s) => a + s.h + s.mb, 0).toFixed(0)}px ≈ ${(secs.reduce((a, s) => a + s.h + s.mb, 0) / PAGE).toFixed(1)} страниц контента`);
ws.close(); chrome.kill();
