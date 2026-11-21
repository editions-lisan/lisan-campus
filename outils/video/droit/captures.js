// Captures du site pour la vidéo « Réviser le droit (L1) avec Lisân Campus » (format téléphone 390 × 844, densité 2),
// avec l'élève de démonstration Habiba ZABRE inscrite à l'espace Droit (../guide/demo-auth.js : aucune donnée réelle).
// Usage : node captures.js   →  img/d_*.png et captures.json (positions utiles, en pixels CSS)
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const SITE = path.join(__dirname, '../../../site'), OUT = path.join(__dirname, 'img');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.json': 'application/json', '.pdf': 'application/pdf' };
const srv = http.createServer((q, r) => {
  let f = decodeURIComponent(q.url.split('?')[0]); if (f.endsWith('/')) f += 'index.html';
  if (f === '/config.js') { r.writeHead(200, { 'Content-Type': 'text/javascript' }); return r.end('window.LISAN_FIREBASE = null;'); }
  const p = path.join(SITE, f); if (!p.startsWith(SITE) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r);
});
const CSS = 'header.top{position:static!important} .totop,#readbar{display:none!important} .rv,.rv *{opacity:1!important;transform:none!important;filter:none!important;transition:none!important;animation:none!important}';
const CSS_VIEW = '.totop,#readbar{display:none!important} .rv,.rv *{opacity:1!important;transform:none!important;filter:none!important;transition:none!important;animation:none!important}';
const HABIBA = { civilite: 'Madame', prenom: 'Habiba', nom: 'ZABRE', naissance: '2003-04-12', ind: '+225', tel: '07 08 09 10 11', pays: 'Côte d’Ivoire', ville: 'Cocody, Abidjan', statut: 'Étudiant(e) à l’université', news: true, newsAsk: '2026-11-21' };
const meta = {};
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  await new Promise(r => srv.listen(8823, r)); const URL = 'http://localhost:8823/';
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block', locale: 'fr-FR' });
  await ctx.addInitScript({ path: path.join(__dirname, '../guide/demo-auth.js') });
  await ctx.addInitScript(h => { window.addEventListener('DOMContentLoaded', () => { if (window.__demo) { __demo.login(); __demo.prof.info = h;
    __demo.prof.spaces.droit = { num: 'LC-2026-DR-4F7K2A', date: '2026-11-02T09:00:00Z', reponses: {} }; } }); }, HABIBA);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  const go = async (h, wait = 1400, css = CSS) => { await p.goto(URL + h); await p.waitForSelector('body.ready'); await p.addStyleTag({ content: css }); await p.waitForTimeout(wait); };
  const pos = sels => p.evaluate(S => Object.fromEntries(Object.entries(S).map(([k, s]) => { const e = document.querySelector(s); if (!e) return [k, null];
    const r = e.getBoundingClientRect(); return [k, { top: Math.round(r.top + scrollY), cx: Math.round(r.left + r.width / 2), cy: Math.round(r.top + scrollY + r.height / 2), h: Math.round(r.height) }]; })), sels);
  const mark = (re, id) => p.evaluate(([re, id]) => { const r = new RegExp(re, 'i');
    const el = [...document.querySelectorAll('#view h2, #view h3, #view h4, #view .eyebrow, #view b, #view strong, #view span, #view p, #view summary, #view div')].find(e => r.test(e.textContent.trim().slice(0, 60)) && e.children.length < 6);
    if (el) el.id = id; }, [re, id]);
  const shot = async (name, sels = {}, opt = {}) => {
    await p.evaluate(() => { document.querySelectorAll('video').forEach(v => { try { v.pause(); } catch (e) {} }); });
    meta[name] = Object.assign(await pos(sels), { h: opt.view ? 844 : await p.evaluate(() => document.documentElement.scrollHeight) });
    await p.screenshot(opt.view ? { path: path.join(OUT, `d_${name}.png`) } : { path: path.join(OUT, `d_${name}.png`), fullPage: true, clip: { x: 0, y: 0, width: 390, height: Math.min(meta[name].h, 6000) } });
    console.log('capture', name, JSON.stringify(meta[name]));
  };
  // progression de démonstration : quelques leçons terminées, une série de jours, des questions à revoir
  await go('#accueil', 2500);
  await p.evaluate(() => {
    const done = { intro: 9, dc: 6, oj: 5, metho: 12, const: 3, dm: 4 };
    Object.entries(done).forEach(([id, n]) => { const S = SUBJECTS.find(s => s.id === id); S.lessons.slice(0, n).forEach(l => { state.done[id + '/' + l.id] = 1; }); });
    const d = new Date(); for (let k = 0; k < 6; k++) { const x = new Date(d - k * 864e5); state.days[x.toISOString().slice(0, 10)] = k ? 900 : 420; }
    const qs = [...SUBJECTS.find(s => s.id === 'dc').quiz.slice(0, 3), ...SUBJECTS.find(s => s.id === 'oj').quiz.slice(0, 3), ...SUBJECTS.find(s => s.id === 'intro').quiz.slice(0, 3)];
    qs.forEach(q => revAdd(q, 'quiz'));
    save('done'); save('days'); });
  // 1. l'espace Droit
  await go('#espace-droit', 1800); await shot('espace', { subjects: '.subjects', next: '.next-step', first: '.subjects .subj' });
  // 2. une leçon et son écoute (lecteur du bas, capture de l'écran visible)
  await go('#l-dc.naissance', 1500, CSS_VIEW);
  await p.click('[data-say]').catch(() => {}); await p.waitForTimeout(2500);
  await p.evaluate(() => window.scrollTo(0, 420)); await p.waitForTimeout(900); await shot('ecoute', {}, { view: true });
  await p.evaluate(() => { try { stopVoice(); } catch (e) {} });
  await go('#l-dc.naissance', 1200); await shot('lecon', { listen: '[data-say]', mini: '.mini' });
  // 3. le mini-exercice réussi
  await p.evaluate(() => { const m = document.querySelector('.mini'); if (m) m.scrollIntoView(); });
  for (const q of await p.$$('.mini .q')) { const o = await q.$('.opt[data-k="0"]'); if (o) { await o.click(); await p.waitForTimeout(250); } }
  await p.waitForTimeout(700); await shot('mini', { mini: '.mini', end: '.mini-end' });
  // 4. un cas pratique corrigé (Méthodologie), corrigé déplié
  await go('#l-metho.casexo', 1200);
  await p.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true; })); await p.waitForTimeout(500);
  await mark('^le raisonnement en quatre temps', 'm-rais'); await mark('^l.énoncé', 'm-enonce'); await mark('^I\\. La situation', 'm-sol');
  await shot('cas', { h1: 'h1', rais: '#m-rais', enonce: '#m-enonce', sol: '#m-sol' });
  // 5. une leçon d'exercice d'application (Droit civil) avec son corrigé
  await go('#l-dc.disparition', 1200);
  await p.evaluate(() => { const d = [...document.querySelectorAll('details')].pop(); if (d) { d.open = true; d.scrollIntoView(); } }); await p.waitForTimeout(500);
  await mark('^exercice d.application', 'm-exo');
  await shot('exo', { exo: '#m-exo', cor: '#view details' });
  // 6. cartes de révision
  await go('#f-dc', 1200); await shot('carte1', { card: '#cardface' });
  await p.click('#cardface').catch(() => {}); await p.waitForTimeout(800); await shot('carte2', { card: '#cardface' });
  // 7. mes révisions
  await go('#revisions', 1400); await shot('revisions', { start: '.revq, .quiz, [data-rev]' });
  // 8. évaluation du certificat, comme un devoir (compte à rebours)
  await p.evaluate(() => { const S = SUBJECTS.find(s => s.id === 'oj'); S.lessons.forEach(l => { state.done['oj/' + l.id] = 1; }); save('done'); });
  await go('#q-oj', 1200); await shot('evalstart', { start: '[data-eval-start]' });
  await p.click('[data-eval-start]').catch(() => {}); await p.waitForTimeout(6000);
  await p.evaluate(() => window.scrollTo(0, 0)); await shot('eval', { q: '.q, .quiz' });
  // 9. les cours en PDF et la Constitution à jour
  await go('#bibliotheque-droit', 1500); await shot('pdf', { docs: '.lib-doc' });
  // 10. l'actualité juridique commentée
  await go('#actualites', 1200); await shot('actus', { list: '.actus' });
  fs.writeFileSync(path.join(__dirname, 'captures.json'), JSON.stringify(meta, null, 1));
  if (errs.length) console.log('erreurs de la page :', errs);
  await b.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
