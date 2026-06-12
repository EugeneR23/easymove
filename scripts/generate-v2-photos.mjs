/**
 * One-off: generate the 4 cinematic noir scene photos for /v2 via OpenAI gpt-image-1.
 * Run: OPENAI_API_KEY=... node scripts/generate-v2-photos.mjs
 * Output: public/images/v2/scene-{1..4}.png
 */
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) { console.error('OPENAI_API_KEY not set'); process.exit(1); }

const STYLE =
  'Cinematic editorial photograph, moody low-key lighting, deep charcoal-black shadows, ' +
  'single warm golden accent light (#C9A84C tone), luxury aesthetic, shallow depth of field, ' +
  'subtle film grain, high-end commercial photography for a private moving atelier, ' +
  'photorealistic, no text, no logos, no watermarks.';

const SCENES = [
  {
    file: 'scene-1-arrival.png',
    prompt:
      'A pristine luxury moving truck parked at dawn in front of a modern Miami estate with royal palms, ' +
      'two professional movers in elegant dark uniforms walking toward the entrance carrying moving blankets, ' +
      'early-morning golden light cutting through deep blue-black shadows, mist on the driveway. ' + STYLE,
  },
  {
    file: 'scene-2-protection.png',
    prompt:
      'Close-up of a professional mover’s hands in crisp white gloves wrapping an elegant designer lounge chair ' +
      'in translucent protective film, dark luxury interior behind, warm golden rim light tracing the film and the chair edges, ' +
      'everything else falling into rich black shadow. ' + STYLE,
  },
  {
    file: 'scene-3-loading.png',
    prompt:
      'Interior of a moving truck loaded like a bank vault: perfectly stacked furniture wrapped in dark moving blankets ' +
      'and matte black boxes secured with leather straps, one dramatic shaft of warm golden light entering from the door, ' +
      'geometric precision, deep shadows. ' + STYLE,
  },
  {
    file: 'scene-4-home.png',
    prompt:
      'Luxurious Miami penthouse living room at sunset, floor-to-ceiling windows with a golden skyline view over Biscayne Bay, ' +
      'elegant furniture already in place, one mover’s silhouette removing the last protective wrap from an armchair, ' +
      'warm sunset glow flooding the dark interior. ' + STYLE,
  },
];

const outDir = path.resolve('public/images/v2');
await mkdir(outDir, { recursive: true });

for (const [i, s] of SCENES.entries()) {
  console.log(`[${i + 1}/4] generating ${s.file} ...`);
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt: s.prompt,
      size: '1024x1536',
      quality: 'high',
      n: 1,
    }),
  });
  if (!res.ok) {
    console.error(`FAILED ${s.file}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) { console.error(`No image data for ${s.file}`); process.exit(1); }
  await writeFile(path.join(outDir, s.file), Buffer.from(b64, 'base64'));
  console.log(`[${i + 1}/4] saved ${s.file}`);
}
console.log('DONE');
