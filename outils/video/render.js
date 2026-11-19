// Rend une animation HTML (fonction render(t), durée window.T) en vidéo maîtresse sans son, image par image,
// les images passant directement à ffmpeg (aucun fichier intermédiaire).
// Usage : node render.js <page.html> <largeur> <hauteur> <sortie.mp4> [temps de l'affiche] [affiche.jpg]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
(async () => {
  const [page, W, H, out, pt, poster] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +W, height: +H } });
  await p.goto('file://' + path.resolve(page)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  if (await p.evaluate(() => window.ready)) await p.evaluate(() => window.ready);
  const fps = 30, T = await p.evaluate(() => window.T), n = Math.round(T * fps);
  const tmp = out.replace(/\.mp4$/, '.part.mp4');
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', tmp], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => render(t), i / fps);
    const buf = await p.screenshot({ type: 'jpeg', quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`image ${i} / ${n}`);
  }
  ff.stdin.end();
  const code = await new Promise(r => ff.on('close', r));
  if (code !== 0) { console.error('ffmpeg a échoué'); process.exit(1); }
  require('fs').renameSync(tmp, out);
  if (poster) { await p.evaluate(t => render(t), +pt); await p.screenshot({ path: poster, type: 'jpeg', quality: 90 }); }
  console.log(`${out} : ${n} images (${T} s)`); await b.close();
})().catch(e => { console.error(e); process.exit(1); });
