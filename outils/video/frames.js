const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  await p.goto(process.argv[2]); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const fps = 30, T = await p.evaluate(() => window.T), n = Math.round(T * fps);
  for (let i = 0; i < n; i++) { await p.evaluate(t => render(t), i / fps); await p.screenshot({ path: `fr/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 93 }); }
  await p.evaluate(() => render(2.6)); await p.screenshot({ path: 'poster.jpg', type: 'jpeg', quality: 88 });
  console.log('frames', n); await b.close();
})();
