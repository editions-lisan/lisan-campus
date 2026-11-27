// Captures d'écran du site pour la vidéo du mode d'emploi (format téléphone 390 × 844, densité 2), avec
// l'élève de démonstration Habiba ZABRE (demo-auth.js remplace la connexion Google ; aucune donnée réelle).
// Sert le dossier site/ sur un port local (config.js remplacé par null, service worker bloqué).
// Usage : node captures.js   →  img/g_*.png (pages entières) et captures.json (positions utiles, en pixels CSS)
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
const CSS = 'header.top{position:static!important} body.capfull .tabbar{display:none!important} .totop,#readbar{display:none!important} .rv,.rv *{opacity:1!important;transform:none!important;filter:none!important;transition:none!important;animation:none!important}';
const HABIBA = { civilite: 'Madame', prenom: 'Habiba', nom: 'ZABRE', naissance: '2003-04-12', ind: '+225', tel: '07 08 09 10 11', pays: 'Côte d’Ivoire', ville: 'Cocody, Abidjan', statut: 'Étudiant(e) à l’université' };
const meta = {};

(async () => {
  await new Promise(r => srv.listen(8822, r)); const URL = 'http://localhost:8822/';
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block', locale: 'fr-FR' });
  await ctx.addInitScript({ path: path.join(__dirname, 'demo-auth.js') });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  const go = async (h, wait = 1400) => { await p.goto(URL + h); await p.waitForSelector('body.ready'); await p.addStyleTag({ content: CSS }); await p.waitForTimeout(wait); };
  const pos = sels => p.evaluate(S => Object.fromEntries(Object.entries(S).map(([k, s]) => { const e = document.querySelector(s); if (!e) return [k, null];
    const r = e.getBoundingClientRect(); return [k, { top: Math.round(r.top + scrollY), cx: Math.round(r.left + r.width / 2), cy: Math.round(r.top + scrollY + r.height / 2), h: Math.round(r.height) }]; })), sels);
  const shot = async (name, sels = {}, opt = {}) => {
    await p.evaluate(v => document.body.classList.toggle('capfull', !v), !!opt.view);
    await p.evaluate(() => { document.querySelectorAll('video').forEach(v => { try { v.pause(); } catch (e) {} }); });
    meta[name] = Object.assign(await pos(sels), { h: await p.evaluate(() => document.documentElement.scrollHeight) });
    await p.screenshot(opt.view ? { path: path.join(OUT, `g_${name}.png`) } : { path: path.join(OUT, `g_${name}.png`), fullPage: true, clip: { x: 0, y: 0, width: 390, height: meta[name].h } }); console.log('capture', name, JSON.stringify(meta[name]));
  };
  // 1. accueil (non connecté), puis les espaces
  await go('#accueil', 5000);
  await shot('home', { espaces: '#espaces, .spaces, .sp-grid', guide: '.guide' });
  // ordinateur
  const d = await b.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, serviceWorkers: 'block', locale: 'fr-FR' });
  const dp = await d.newPage(); await dp.goto(URL + '#accueil'); await dp.waitForSelector('body.ready'); await dp.waitForTimeout(5000);
  await dp.evaluate(() => document.querySelectorAll('video').forEach(v => v.pause())); await dp.screenshot({ path: path.join(OUT, 'g_desktop.png') }); await d.close();
  // 2-3. un espace et son premier parcours (première leçon libre)
  await go('#espace-droit'); await shot('espace', { next: '.next-step, .nstep, .callout', parcours: '.subjects, .sub-list, .grid' });
  await go('#m-intro'); await shot('parcours', { lessons: '.lessons, .lesson-list, ol' });
  // 4. une leçon suivante sans être connecté : page de connexion
  await go('#l-intro.caracteres'); await shot('gate', { btn: '[data-auth="signin"]' });
  // 5-6. fiche d'inscription (préremplie), vérification, confirmation
  await p.evaluate(h => { __demo.login(); __demo.prof.info = h; }, HABIBA);
  await go('#inscription-droit', 1200);
  await p.evaluate(() => { const f = document.querySelector('form'); if (!f) return;
    f.querySelectorAll('.fld').forEach(fl => { if (fl.closest('[hidden]')) return;
      const rs = fl.querySelectorAll('input[type=radio]'); if (rs.length && ![...rs].some(r => r.checked)) { rs[0].checked = true; rs[0].dispatchEvent(new Event('change', { bubbles: true })); }
      const s = fl.querySelector('select'); if (s && !s.value && s.options.length > 1) { s.selectedIndex = 1; s.dispatchEvent(new Event('change', { bubbles: true })); } });
    f.querySelectorAll('input[type=checkbox][required]').forEach(c => { c.checked = true; }); });
  await p.waitForTimeout(300); await shot('fiche', { form: 'form', send: 'form [type=submit]' });
  await p.click('form [type=submit]'); await p.waitForTimeout(900); await shot('verif', { send: '.actions .btn' });
  const conf = await p.$('[data-enroll="confirm"], [data-confirm], .actions .btn:not(.ghost)'); if (conf) await conf.click();
  await p.waitForTimeout(1500); await shot('confirm', { num: '.enroll-num, .num, strong' });
  // 7-8. une leçon : écouter, puis le mini-exercice réussi
  await go('#l-intro.introgen'); await shot('lecon', { listen: '[data-say]' });
  await p.evaluate(() => { const m = document.querySelector('.mini'); if (m) m.scrollIntoView(); });
  for (const q of await p.$$('.mini .q')) { const o = await q.$('.opt[data-k="0"]'); if (o) { await o.click(); await p.waitForTimeout(250); } }
  await p.waitForTimeout(700); await shot('mini', { mini: '.mini', end: '.mini-end' });
  // 9. cartes de révision, réponse affichée
  await go('#f-intro'); await p.click('#cardface').catch(() => {}); await p.waitForTimeout(700); await shot('cartes', { card: '#cardface' });
  // 10. évaluation, avis, certificat (parcours terminé)
  await p.evaluate(() => { const S = SUBJECTS.find(s => s.id === 'intro'); S.lessons.forEach(l => { state.done['intro/' + l.id] = 1; }); state.quiz['intro@eval'] = 90; save('done'); save('quiz'); });
  await go('#m-intro'); await shot('fini', { cert: '.cert-panel, [data-cert]', eval: 'a[href^="#q-"]' });
  await go('#avis-p~intro'); await p.click('label.star:nth-of-type(5), .star:nth-child(5)').catch(() => {});
  await p.fill('textarea[name="impressions"]', 'Des leçons claires, et l’écoute est très pratique dans le wôrô-wôrô !').catch(() => {});
  await p.waitForTimeout(300); await shot('avis', { stars: '.stars', star5: '.stars label:last-of-type, .star:last-of-type', send: 'form [type=submit]' });
  await p.click('form [type=submit]'); await p.waitForTimeout(1500);
  if (!/certificat-/.test(p.url())) { await go('#m-intro'); await p.click('text=Obtenir mon certificat'); await p.waitForTimeout(2200); }
  await p.addStyleTag({ content: CSS }); await shot('certificat', { cert: '.cert, .certificate, .cert-doc' });
  // 11. actualité juridique commentée
  await go('#actualites'); await shot('actus', { list: '.actus' });
  await go('#actu-loi-finances-2027-commission'); await shot('actu', { steps: '.psteps', comprendre: '.cq', test: '.atest' });
  // 12. le menu
  await p.evaluate(() => { store.set('board.demo', 'Habiba Z.'); state.days[dayKey()] = Math.max(state.days[dayKey()] || 0, 1500); save('days'); });
  await go('#classement', 2200); await shot('classement', { list: '.b-rows', trophies: '.b-trophies' });
  await go('#parametres'); await shot('rappels', { remind: '#remind', ics: '[data-rem="ics"]' });
  // 12. le campus : tableau de bord de l'accueil (élève connectée, quelques jours d'étude), progrès et distinctions
  await p.evaluate(() => { __demo.prof.info.newsAsk = '2026-11-01'; const k = n => { const d = new Date(); d.setDate(d.getDate() - n); return dayKey(d); };
    for (let i = 1; i < 6; i++) state.days[k(i)] = Math.max(state.days[k(i)] || 0, 700 + i * 90); save('days');
    const S = SUBJECTS.find(s => s.id === 'dc'); S.lessons.slice(0, 3).forEach(l => { state.done['dc/' + l.id] = 1; state.minis['dc/' + l.id] = 1; }); save('done'); save('minis');
    state.last = { route: 'l-dc.' + S.lessons[3].id, y: 0 }; save('last'); store.set('campus.sp', 'droit'); });
  // plans « écran » : hauteur visible du téléphone de la vidéo (706 px à 388 px de large), pour que la barre du bas soit dans le cadre
  await p.setViewportSize({ width: 390, height: 710 });
  await go('#accueil', 2500); await shot('campus', {}, { view: true });
  await go('#progression', 1500); await shot('progres', { badges: '.bdgs', stats: '.pg-stats' });
  // 13. la navigation : la barre du bas (page « Apprendre »), puis le menu
  await go('#apprendre-droit', 1500); await shot('apprendre', {}, { view: true });
  await go('#accueil', 2500); await p.click('#menu-btn'); await p.waitForTimeout(800); await shot('menu', {}, { view: true });
  fs.writeFileSync(path.join(__dirname, 'captures.json'), JSON.stringify(meta, null, 1));
  if (errs.length) console.log('erreurs de la page :', errs);
  await b.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
