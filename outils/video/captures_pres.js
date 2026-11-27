// Captures du site pour la vidéo de présentation (index.html) : pages au format téléphone (390 px de large, densité 2),
// coupées à 1 500 px de haut puis réduites à 580 × 2231 (img/s_*.jpg, affichées dans le téléphone de la vidéo).
// Élève de démonstration Habiba ZABRE (guide/demo-auth.js remplace la connexion Google ; aucune donnée réelle).
// Usage : NODE_PATH=$(npm root -g) node captures_pres.js
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');
const SITE = path.join(__dirname, '../../site'), OUT = path.join(__dirname, 'img');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.json': 'application/json', '.pdf': 'application/pdf' };
const srv = http.createServer((q, r) => {
  let f = decodeURIComponent(q.url.split('?')[0]); if (f.endsWith('/')) f += 'index.html';
  if (f === '/config.js') { r.writeHead(200, { 'Content-Type': 'text/javascript' }); return r.end('window.LISAN_FIREBASE = null;'); }
  const p = path.join(SITE, f); if (!p.startsWith(SITE) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r);
});
// pages entières : en-tête fixe rendu statique, barre du bas et boutons flottants masqués, animations d'apparition figées
const CSS = 'header.top{position:static!important} .tabbar,.totop,#readbar,#lp{display:none!important} #veil{display:none!important} .rv,.rv *{opacity:1!important;transform:none!important;filter:none!important;transition:none!important;animation:none!important} .st-cur .pn-k::before{animation:none!important;opacity:.7}';
const HABIBA = { civilite: 'Madame', prenom: 'Habiba', nom: 'ZABRE', naissance: '2003-04-12', ind: '+225', tel: '07 08 09 10 11', pays: 'Côte d’Ivoire', ville: 'Cocody, Abidjan', statut: 'Étudiant(e) à l’université', news: true, newsAsk: '2026-11-01' };

(async () => {
  await new Promise(r => srv.listen(8823, r)); const URL = 'http://localhost:8823/';
  const b = await chromium.launch(), errs = [];
  async function page(login) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block', locale: 'fr-FR' });
    await ctx.addInitScript({ path: path.join(__dirname, 'guide/demo-auth.js') });
    if (login) await ctx.addInitScript(h => { __demo.login(); __demo.prof.info = h;
      for (const sp of ['droit', 'ia', 'arabe', 'coran', 'islam']) __demo.prof.spaces[sp] = { num: 'LC-2026-' + sp.slice(0, 2).toUpperCase() + '-4F7K2A', date: '2026-10-01T09:00:00Z', reponses: {} };
      try { localStorage.setItem('lc.campus.sp', '"droit"'); } catch (e) {} }, HABIBA);
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    return { ctx, p };
  }
  // progression de démonstration : quelques jours d'étude, des leçons terminées dans chaque espace, le niveau 1 du Coran réussi
  const seed = () => {
    const k = n => { const d = new Date(); d.setDate(d.getDate() - n); return dayKey(d); };
    for (let i = 0; i < 9; i++) state.days[k(i)] = i ? 700 + i * 70 : 420; save('days');
    state.xpb[k(0)] = 30; state.xpb[k(1)] = 60; state.xpb[k(2)] = 40; save('xpb');
    const fin = (id, n) => { const s = SUBJECTS.find(x => x.id === id); s.lessons.slice(0, n).forEach(l => { state.done[id + '/' + l.id] = 1; state.minis[id + '/' + l.id] = 1; state.time[id + '/' + l.id] = 600; }); };
    fin('intro', 4); fin('dc', 2); fin('a0', 6); fin('qr', 43); fin('qr2', 3); fin('is1', 5); fin('ia', 5); fin('iap', 2);
    state.quiz['qr@eval'] = 90; state.quiz['ia@eval'] = 95;
    ['done', 'minis', 'time', 'quiz'].forEach(save);
    const S = SUBJECTS.find(x => x.id === 'intro'); state.last = { route: 'l-intro.' + S.lessons[4].id, y: 0 }; save('last');
    state.rev.demo1 = { q: 'Qu’est-ce qu’une règle de droit ?', a: ['Une règle générale, abstraite et obligatoire', 'Un conseil moral'], c: 0, src: 'intro', box: 1, due: k(0), t: 1 }; save('rev');
  };
  async function shot(p, name, h, opt = {}) {
    await p.goto(URL + h); await p.waitForSelector('body.ready'); await p.addStyleTag({ content: CSS }); await p.waitForTimeout(opt.wait || 1800);
    await p.evaluate(() => document.querySelectorAll('video').forEach(v => { try { v.pause(); } catch (e) {} }));
    if (opt.click) { await p.evaluate(s => { const e = [...document.querySelectorAll(s)].find(x => /Commencer|évaluation/i.test(x.textContent)); if (e) e.click(); }, opt.click); await p.waitForTimeout(1200); }
    if (opt.scroll) await p.evaluate(s => { const e = document.querySelector(s); if (e) window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 70); }, opt.scroll);
    const y = await p.evaluate(() => Math.round(scrollY));
    const png = path.join(OUT, name + '.png');
    await p.screenshot({ path: png, fullPage: true, clip: { x: 0, y, width: 390, height: 1500 } });
    execFileSync('python3', ['-c', `from PIL import Image\nim=Image.open('${png}').convert('RGB').resize((580,2231),Image.LANCZOS)\nim.save('${path.join(OUT, name + '.jpg')}',quality=88)`]);
    fs.unlinkSync(png); console.log('capture', name, h);
  }
  // visiteur
  { const { ctx, p } = await page(false); await shot(p, 's_home', '#accueil', { wait: 4000 }); await ctx.close(); }
  // élève connectée
  const { ctx, p } = await page(true);
  await p.goto(URL + '#accueil'); await p.waitForSelector('body.ready'); await p.evaluate(seed); await p.waitForTimeout(600);
  await p.goto(URL + '#apropos'); await p.waitForSelector('body.ready'); await p.evaluate(seed); await p.waitForTimeout(600);
  await shot(p, 's_apprendre', '#apprendre-droit', { scroll: '.pu-d[open]' });
  await shot(p, 's_lecon', '#l-intro.' + await p.evaluate(() => SUBJECTS.find(x => x.id === 'intro').lessons[4].id));
  await shot(p, 's_arabe', '#l-a0.l6');
  await shot(p, 's_coran', '#l-qr2.t4');
  await shot(p, 's_islam', '#l-is1.' + await p.evaluate(() => SUBJECTS.find(x => x.id === 'is1').lessons[5].id));
  await shot(p, 's_droit', '#espace-droit', { scroll: '.duo, .subjects, .sub-list, .sec-h' });
  await shot(p, 's_actus', '#actu-' + await p.evaluate(() => window.ACTUS.items[0].id));
  await shot(p, 's_ia', '#l-iap.' + await p.evaluate(() => SUBJECTS.find(x => x.id === 'iap').lessons[2].id));
  await p.evaluate(() => { const S = SUBJECTS.find(x => x.id === 'intro'); state.last = { route: 'l-intro.' + S.lessons[4].id, y: 0 }; save('last'); });
  await shot(p, 's_campus', '#accueil', { wait: 2500 });
  await shot(p, 's_progres', '#progression');
  await shot(p, 's_revisions', '#revisions');
  await shot(p, 's_biblio', '#bibliotheque~lisan');
  await shot(p, 's_textes', '#bibliotheque~textes');
  await shot(p, 's_quiz', '#q-ia', { click: '#view .btn' });
  await ctx.close(); await b.close(); srv.close();
  if (errs.length) console.log('Erreurs de page :', [...new Set(errs)].join(' | '));
})().catch(e => { console.error(e); process.exit(1); });
