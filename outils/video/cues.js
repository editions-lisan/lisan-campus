// Exporte le minutage et les repères de la vidéo de présentation (index.html) vers cues.json, lu par son.py.
// Usage : NODE_PATH=$(npm root -g) node cues.js
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  await p.goto('file://' + path.join(__dirname, 'index.html')); await p.waitForTimeout(500);
  const d = await p.evaluate(() => ({ T: window.T, S: window.S, CUES: window.CUES }));
  fs.writeFileSync(path.join(__dirname, 'cues.json'), JSON.stringify(d)); console.log('cues.json :', d.CUES.length, 'repères,', d.T, 's'); await b.close(); })();
