// Constitution de la République de Côte d'Ivoire (loi n° 2016-886 du 8 novembre 2016, telle que modifiée par la loi
// constitutionnelle n° 2020-348 du 19 mars 2020) : édition de la bibliothèque de Lisân Campus, mise en pages comme les
// documents de cours (Paged.js puis Chromium), avec un sommaire détaillé et des signets.
// Texte : constitution.json, produit par extract.py à partir du document source.
// Usage : DEPS=/chemin/node_modules node outils/constitution/build_constitution.js
const fs = require('fs'), path = require('path');
const DEPS = process.env.DEPS || path.join(__dirname, '../cours/node_modules');
const hy = require(path.join(DEPS, 'hyphen/fr')).hyphenateHTMLSync;
const SITE = path.join(__dirname, '../../site');
const OUT = path.join(SITE, 'livres/droit/constitution-cote-divoire.pdf');
const WORK = path.join(require('os').tmpdir(), 'lisan-cours'); fs.mkdirSync(WORK, { recursive: true });
const items = JSON.parse(fs.readFileSync(path.join(__dirname, 'constitution.json'), 'utf8'));

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const txt = s => hy(esc(s).replace(/\bn° /g, 'n° ').replace(/(\d) (\d{3})\b/g, '$1 $2'));
const chapName = n => n === 'PREMIER' ? 'Chapitre premier' : 'Chapitre ' + n;
const artName = n => n === '1' || n === 'PREMIER' ? 'Article premier' : 'Article ' + n;

// ---- plan : titres, chapitres et numéros d'articles couverts
const toc = []; let curT = null, curC = null, inAnnex = false;
items.forEach(x => {
  if (x.k === 'preamble') toc.push({ lvl: 1, id: 'preambule', t: 'Préambule' });
  if (x.k === 'annexe') { inAnnex = true; toc.push({ lvl: 1, id: 'annexe', t: 'Annexe · Loi constitutionnelle n° 2020-348 du 19 mars 2020' }); }
  if (inAnnex) return;
  if (x.k === 'titre') { curT = { lvl: 1, id: 't' + x.n, t: `Titre ${x.n} · ${x.tt}`, arts: [] }; toc.push(curT); curC = null; }
  if (x.k === 'chap') { curC = { lvl: 2, id: 't' + curT.n + 'c' + x.n, t: `${chapName(x.n)} · ${x.tt}`, arts: [] }; curC.id = curT.id + 'c' + x.n; toc.push(curC); }
  if (x.k === 'art') { if (curT) curT.arts.push(+x.n); if (curC) curC.arts.push(+x.n); }
});
const range = a => !a || !a.length ? '' : a.length === 1 ? `art. ${a[0]}` : `art. ${a[0]} à ${a[a.length - 1]}`;

// ---- corps du texte
let body = '', list = null, annex = false, T = null;
const flush = () => { if (list) { body += `<ul>${list.join('')}</ul>`; list = null; } };
items.forEach((x, i) => {
  if (x.k !== 'para' || !x.li) flush();
  switch (x.k) {
    case 'loihead': break;
    case 'preamble':
      body += `<div class="part" id="preambule"><p class="tn">Loi n° 2016-886 du 8 novembre 2016 portant Constitution de la République de Côte d’Ivoire</p><h1 data-run="Préambule">Préambule</h1>`; break;
    case 'titre':
      T = x; body += `</div><div class="part"><h1 id="t${x.n}" data-run="Titre ${x.n} · ${esc(x.tt)}"><span class="tn">Titre ${x.n}</span><span class="sep"> · </span><br>${esc(x.tt)}</h1>`; break;
    case 'chap':
      if (annex) { body += `<h2 class="chap ax">Chapitre ${x.n}${x.nouveau ? ' nouveau' : ''} du titre IX · ${esc(x.tt)}</h2>`; break; }
      body += `<h2 class="chap" id="t${T.n}c${x.n}"><span class="lab">${chapName(x.n)}</span><span class="sep"> · </span><br>${esc(x.tt)}</h2>`; break;
    case 'sect': body += `<h3 class="sect">Section ${esc(x.n)} · ${esc(x.tt)}</h3>`; break;
    case 'art': {
      const id = annex ? '' : ` id="a${x.n}"`;
      body += `<h3 class="art"${id}>${artName(x.n)}${x.nouveau ? ' <span class="nv">nouveau</span>' : ''}</h3>`;
      if (x.loi && !annex) body += `<p class="loi">Rédaction issue de la loi constitutionnelle n° 2020-348 du 19 mars 2020</p>`;
      break; }
    case 'annexe':
      annex = true; body += `</div><div class="part annex"><h1 id="annexe" data-run="Annexe · Loi constitutionnelle n° 2020-348"><span class="tn">Annexe</span><span class="sep"> · </span><br>Loi constitutionnelle n° 2020-348 du 19 mars 2020</h1>`; break;
    case 'annexhead':
      body += `<p class="axsub">modifiant la loi n° 2016-886 du 8 novembre 2016 portant Constitution de la République de Côte d’Ivoire</p>
        <p class="axnote">Texte de la loi de révision, tel qu’il a été promulgué. Ses dispositions sont déjà intégrées, sous la mention « nouveau », dans le texte de la Constitution qui précède.</p>`; break;
    case 'para': {
      const m = x.t.match(/^(Fait à Abidjan, le [^A-Z]+?\d{4})\s+(.+)$/);
      if (m) { body += `<p class="sign">${esc(m[1])}<br><b>${esc(m[2])}</b></p>`; break; }
      if (x.li) { (list = list || []).push(`<li>${txt(x.t)}</li>`); break; }
      body += `<p${x.ital ? ' class="serment"' : ''}>${txt(x.t)}</p>`; break; }
  }
});
flush(); body = body.replace(/^<\/div>/, '') + '</div>';

// signets, dans l'ordre des intitulés du document
const outl = [{ lvl: 1, t: 'Sommaire' }]; let hasChap = false, inAx = false;
items.forEach(x => {
  if (x.k === 'preamble') outl.push({ lvl: 1, t: 'Préambule' });
  if (x.k === 'titre') { outl.push({ lvl: 1, t: `Titre ${x.n} · ${x.tt}` }); hasChap = false; }
  if (x.k === 'chap') { outl.push({ lvl: 2, t: inAx ? `Chapitre ${x.n} nouveau du titre IX · ${x.tt}` : `${chapName(x.n)} · ${x.tt}` }); hasChap = true; }
  if (x.k === 'art') outl.push({ lvl: hasChap ? 3 : 2, t: artName(x.n) + (x.nouveau ? ' (nouveau)' : '') });
  if (x.k === 'annexe') { inAx = true; hasChap = false; outl.push({ lvl: 1, t: 'Annexe · Loi constitutionnelle n° 2020-348 du 19 mars 2020' }); }
});
const tocHTML = toc.map(e => `<li class="t${e.lvl}"><a class="tt" href="#${e.id}">${esc(e.t)}${e.arts && e.arts.length ? ` <span class="rg">${range(e.arts)}</span>` : ''}</a><a class="pg" href="#${e.id}"></a></li>`).join('');
const nArt = items.filter(x => x.k === 'art' && !x.annex).length;
const nNew = items.filter(x => x.k === 'art' && !x.annex && x.nouveau).length;

const KHATAM = `<svg class="kh" viewBox="-50 -50 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6"><rect x="-30" y="-30" width="60" height="60"/><rect x="-30" y="-30" width="60" height="60" transform="rotate(45)"/><circle r="13"/><rect x="-20" y="-20" width="40" height="40" transform="rotate(22.5)" stroke-width=".8"/><rect x="-20" y="-20" width="40" height="40" transform="rotate(67.5)" stroke-width=".8"/></g></svg>`;
const F = n => 'file://' + path.join(SITE, 'fonts', n);
const L = n => 'file://' + path.join(DEPS, '@fontsource/literata/files', n);
const CSS = `
@font-face{font-family:Lit;font-weight:400;src:url(${L('literata-latin-400-normal.woff2')})}
@font-face{font-family:Lit;font-weight:400;src:url(${L('literata-latin-ext-400-normal.woff2')});unicode-range:U+0100-024F,U+1E00-1EFF,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:Lit;font-weight:400;font-style:italic;src:url(${L('literata-latin-400-italic.woff2')})}
@font-face{font-family:Lit;font-weight:700;src:url(${L('literata-latin-700-normal.woff2')})}
@font-face{font-family:Lit;font-weight:700;src:url(${L('literata-latin-ext-700-normal.woff2')});unicode-range:U+0100-024F,U+1E00-1EFF,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:Atk;font-weight:400;src:url(${F('atkinson-400.woff2')})}
@font-face{font-family:Atk;font-weight:400;src:url(${F('atkinson-400-ext.woff2')});unicode-range:U+0100-02BA,U+1E00-1E9F,U+1EF2-1EFF}
@font-face{font-family:Atk;font-weight:700;src:url(${F('atkinson-700.woff2')})}
@font-face{font-family:Atk;font-weight:700;src:url(${F('atkinson-700-ext.woff2')});unicode-range:U+0100-02BA,U+1E00-1E9F,U+1EF2-1EFF}
:root{--ink:#18202f;--navy:#14213d;--acc:#23468f;--gold:#b98a2e;--mut:#5d6779;--line:#d6dbe4;--soft:#f3f5f9}
@page{size:A4;margin:20mm 20mm 22mm 22mm;
  @top-left{content:"Constitution de la République de Côte d’Ivoire";font:8.5pt Atk;color:var(--mut)}
  @top-right{content:string(run);font:8.5pt Atk;color:var(--mut)}
  @bottom-left{content:"Lisân Campus · Bibliothèque · Textes officiels";font:8pt Atk;color:var(--mut)}
  @bottom-right{content:counter(page);font:700 9pt Atk;color:var(--navy)}}
@page :blank{@top-left{content:none}@top-right{content:none}}
@page cover{margin:0;@top-left{content:none}@top-right{content:none}@bottom-left{content:none}@bottom-right{content:none}}
@page front{@top-right{content:none}}
html{font-family:Lit,serif;font-size:10.6pt;line-height:1.52;color:var(--ink)}
body{margin:0}
p{margin:0 0 2.2mm;text-align:justify;orphans:2;widows:2}
.cover{page:cover;width:210mm;height:297mm;position:relative;overflow:hidden;break-after:page;background:#fff}
.band{background:var(--navy);color:#fff;height:180mm;padding:34mm 22mm 0;box-sizing:border-box;position:relative}
.band .kh{position:absolute;right:-26mm;top:-22mm;width:120mm;height:120mm;color:rgba(201,162,74,.28)}
.lvl{font:700 10pt Atk;letter-spacing:.18em;text-transform:uppercase;color:#e3c47c;margin:0 0 9mm;text-align:left}
.ct{font:700 32pt/1.12 Lit;margin:0 0 8mm;max-width:155mm;color:#fff}
.cs{font:400 13.5pt/1.4 Lit;font-style:italic;color:#dfe5f1;max-width:150mm;text-align:left}
.band::after{content:"";position:absolute;left:22mm;bottom:0;width:40mm;height:2.2mm;background:#c9a24a}
.cbot{padding:16mm 22mm 0}
.cby{font:700 12pt Atk;color:var(--navy);text-align:left;margin-bottom:2mm}
.cy{font:400 11pt Atk;color:var(--mut);text-align:left}
.cn{font:400 10.5pt Lit;font-style:italic;color:var(--mut);text-align:left;margin-top:8mm}
.brand{position:absolute;left:22mm;bottom:22mm;display:flex;align-items:center;gap:4mm}
.brand img{width:15mm;height:15mm;object-fit:contain}
.brand b{display:block;font:700 13pt Atk;color:var(--navy)} .brand span{font:400 9.5pt Atk;color:var(--mut)}
.front{page:front;break-after:page}
.fh{font:700 20pt Lit;color:var(--navy);margin:0 0 5mm;padding-bottom:3mm;border-bottom:.6mm solid var(--gold)}
.toc{list-style:none;margin:0;padding:0}
.toc li{display:flex;align-items:baseline;gap:2mm}
.toc li a{color:inherit;text-decoration:none}
.toc .tt{flex:0 1 auto}
.toc .rg{font:400 8pt Atk;color:var(--mut);white-space:nowrap}
.toc li::after{content:"";flex:1 1 auto;border-bottom:.25mm dotted #aab2c0;margin:0 1mm;order:1;transform:translateY(-1mm)}
.toc .pg{order:2;font:700 9pt Atk;color:var(--navy);min-width:7mm;text-align:right}
.toc a.pg::after{content:target-counter(attr(href),page)}
.toc .t1{font:700 9.8pt Atk;color:var(--navy);margin:2.6mm 0 .6mm}
.toc .t2{font:400 9pt Lit;margin:.25mm 0 .25mm 5mm}
.note{margin-top:6mm;font-size:8.8pt;color:var(--mut);font-style:italic;border-top:.25mm solid var(--line);padding-top:2.5mm}
.part{break-before:page}
.tn{font:700 9.5pt Atk;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin:0 0 2mm;text-align:left}
.part>h1 .tn{display:inline-block;margin:0 0 2.4mm;line-height:1}
.part>h1 .sep{display:inline-block;width:0;overflow:hidden;white-space:pre;vertical-align:top}
.part>h1 br{line-height:0}
.part>h1{string-set:run attr(data-run);font:700 20pt/1.2 Lit;color:var(--navy);margin:0 0 6mm;padding:0 0 3.5mm;border-bottom:.6mm solid var(--gold)}
h2.chap{font:700 13.5pt/1.3 Lit;color:var(--acc);margin:8mm 0 3mm;break-after:avoid}
h2.chap .sep{display:inline-block;width:0;overflow:hidden;white-space:pre;vertical-align:top}
h2.chap .lab{display:inline-block;margin-bottom:1.2mm;line-height:1;font:700 8.8pt Atk;letter-spacing:.12em;font-variant-caps:all-small-caps;font-size:10.5pt;color:var(--mut);margin-bottom:1mm}
h3.sect{font:700 11pt Atk;color:var(--acc);margin:5mm 0 2mm;break-after:avoid}
h3.art{font:700 10.6pt/1.3 Atk;color:var(--navy);margin:5mm 0 1.6mm;padding-left:2.6mm;border-left:1.1mm solid var(--gold);break-after:avoid}
.nv{display:inline-block;font:700 7.4pt Atk;letter-spacing:.06em;text-transform:uppercase;color:#7a5a12;background:#f6ecd4;border-radius:1mm;padding:.3mm 1.6mm;margin-left:1.5mm;vertical-align:1px}
p.loi{font:400 8.2pt Atk;color:var(--mut);margin:-.6mm 0 1.8mm 3.7mm;break-after:avoid}
ul{margin:0 0 2.4mm;padding-left:6mm} li{margin:0 0 .9mm;text-align:justify}
ul li::marker{color:var(--gold)}
p.serment{font-style:italic;margin-left:6mm;margin-right:4mm;color:#26304a}
.annex{font-size:9.6pt}
.annex h3.art{font-size:9.8pt;margin-top:3.6mm}
.axsub{font:400 11pt/1.4 Lit;font-style:italic;color:var(--mut);margin:-3mm 0 3mm;text-align:left}
.axnote{font:400 8.8pt Atk;color:var(--mut);background:var(--soft);border-radius:1.6mm;padding:2mm 3mm;text-align:left}
h2.chap.ax{font-size:11pt;margin-top:5mm}
.sign{text-align:right;margin-top:6mm;font-style:italic}
.sign b{font-style:normal;letter-spacing:.04em}
`;

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Constitution de la République de Côte d’Ivoire</title><style>${CSS}</style>
<script>window.PagedConfig={auto:true,after:()=>{window.__done=true}}</script>
<script src="file://${path.join(DEPS, 'pagedjs/dist/paged.polyfill.js')}"></script></head><body>
<section class="cover"><div class="band">${KHATAM}<p class="lvl">Bibliothèque · Textes officiels</p><p class="ct">Constitution de la République de Côte d’Ivoire</p>
<p class="cs">Loi n° 2016-886 du 8 novembre 2016, telle que modifiée par la loi constitutionnelle n° 2020-348 du 19 mars 2020</p></div>
<div class="cbot"><p class="cby">Texte intégral à jour de la révision du 19 mars 2020</p><p class="cy">Préambule · ${nArt} articles · seize titres</p>
<p class="cn">Sommaire détaillé, articles modifiés en 2020 signalés, loi de révision en annexe</p>
<div class="brand"><img src="file://${path.join(SITE, 'logo.png')}" alt=""><div><b>Lisân Campus</b><span>Éditions Lisân · édition numérique</span></div></div></div></section>
<section class="front"><h2 class="fh">Sommaire</h2><ol class="toc">${tocHTML}</ol>
<p class="note">La Constitution du 8 novembre 2016 est reproduite dans sa rédaction issue de la loi constitutionnelle n° 2020-348 du 19 mars 2020 : les ${nNew} articles modifiés portent la mention « nouveau », et la loi de révision est reproduite en annexe. Seul le texte publié au Journal officiel de la République de Côte d’Ivoire fait foi.</p></section>
${body}</body></html>`;

(async () => {
  const hf = path.join(WORK, 'constitution.html'); fs.writeFileSync(hf, html);
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const pg = await b.newPage();
  const errs = []; pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await pg.goto('file://' + hf);
  await pg.waitForFunction(() => window.__done === true, null, { timeout: 300000 });
  const n = await pg.evaluate(() => document.querySelectorAll('.pagedjs_page').length);
  await pg.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true, outline: true, tagged: true });
  await b.close();
  const sj = path.join(WORK, 'signets.json'); fs.writeFileSync(sj, JSON.stringify(outl));
  console.log(require('child_process').execFileSync('python3', [path.join(__dirname, 'signets.py'), OUT, sj]).toString().trim());
  if (errs.length) console.log('erreurs :', errs.slice(0, 5));
  console.log(`livres/droit/constitution-cote-divoire.pdf : ${n} pages, ${(fs.statSync(OUT).size / 1048576).toFixed(1)} Mo, ${nArt} articles (${nNew} nouveaux)`);
})().catch(e => { console.error(e); process.exit(1); });
