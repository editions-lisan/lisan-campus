// Charte des Nations Unies et Statut de la Cour internationale de Justice : édition de la bibliothèque de Lisân Campus
// (rubrique « Textes officiels »), mise en pages comme la Constitution (Paged.js puis Chromium), avec une page
// « État de mise à jour », un sommaire détaillé et des signets par article.
// Textes : charte.json (extract_charte.py) et statut.json (extract_statut.py). Voir LISEZMOI.md.
// Usage : DEPS=/chemin/node_modules node outils/onu/build_onu.js
const fs = require('fs'), path = require('path');
const DEPS = process.env.DEPS || path.join(__dirname, '../cours/node_modules');
const hy = require(path.join(DEPS, 'hyphen/fr')).hyphenateHTMLSync;
const SITE = path.join(__dirname, '../../site');
const OUT = path.join(SITE, 'livres/droit/charte-nations-unies-statut-cij.pdf');
const WORK = path.join(require('os').tmpdir(), 'lisan-cours'); fs.mkdirSync(WORK, { recursive: true });
const CH = JSON.parse(fs.readFileSync(path.join(__dirname, 'charte.json'), 'utf8'));
const ST = JSON.parse(fs.readFileSync(path.join(__dirname, 'statut.json'), 'utf8'));

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const txt = s => hy(esc(s).replace(/\bn° /g, 'n° '));
const AMEND = { 23: 1, 27: 1, 61: 1, 109: 1 };   // articles dont la rédaction résulte d'un amendement

// ---- plan et corps d'un texte (préfixe c = Charte, s = Statut)
function render(items, P, name) {
  const toc = [], outl = []; let body = '', curC = null, hasChap = false;
  const flushList = () => {};
  items.forEach(x => {
    switch (x.k) {
      case 'preamble':
        toc.push({ lvl: 2, id: P + 'pre', t: 'Préambule' }); outl.push({ lvl: 2, t: 'Préambule' });
        body += `<h2 class="chap" id="${P}pre">Préambule</h2>`; break;
      case 'pre': {
        const cls = /^(Nous, peuples|et à ces fins|avons décidé)/.test(x.t) ? 'pre-k' : /^En conséquence/.test(x.t) ? 'pre-e' : 'pre-a';
        body += `<p class="${cls}">${txt(x.t)}</p>`; break; }
      case 'chap':
        curC = { lvl: 2, id: P + 'c' + x.n, t: `Chapitre ${x.n} · ${x.tt}`, arts: [] }; toc.push(curC); hasChap = true;
        outl.push({ lvl: 2, t: `Chapitre ${x.n} · ${x.tt}` });
        body += `<h2 class="chap" id="${P}c${x.n}"><span class="lab">Chapitre ${x.n}</span><span class="sep"> · </span><br>${esc(x.tt)}</h2>`; break;
      case 'inter': body += `<p class="inter">${esc(x.t)}</p>`; break;
      case 'art': {
        if (curC) curC.arts.push(+x.n);
        const am = P === 'c' && AMEND[x.n];
        outl.push({ lvl: hasChap ? 3 : 2, t: `Article ${x.n}` + (am ? ' (amendé)' : '') });
        body += `<h3 class="art" id="${P}a${x.n}">Article ${x.n}${am ? ' <span class="nv">amendé</span>' : ''}</h3>`;
        if (am) body += `<p class="loi">${{ 23: 'Rédaction issue de l’amendement adopté le 17 décembre 1963, en vigueur depuis le 31 août 1965', 27: 'Rédaction issue de l’amendement adopté le 17 décembre 1963, en vigueur depuis le 31 août 1965', 61: 'Rédaction issue de l’amendement adopté le 20 décembre 1971, en vigueur depuis le 24 septembre 1973 (premier amendement : 1963-1965)', 109: 'Paragraphe 1 issu de l’amendement adopté le 20 décembre 1965, en vigueur depuis le 12 juin 1968 ; paragraphe 3 resté dans sa rédaction de 1945' }[x.n]}</p>`;
        break; }
      case 'para':
        if (x.sign) { body += `<p class="sign1">${txt(x.t)}</p>`; break; }
        body += `<p${x.li ? ' class="li"' : ''}>${txt(x.t)}</p>`; break;
      case 'fait': body += `<p class="sign">${esc(x.t)}</p>`; break;
    }
  });
  return { toc, outl, body };
}
const C = render(CH, 'c', 'Charte'), S = render(ST, 's', 'Statut');
const range = a => !a || !a.length ? '' : a.length === 1 ? `art. ${a[0]}` : `art. ${a[0]} à ${a[a.length - 1]}`;
const NOTE = CH.filter(x => x.k === 'note').map(x => `<p>${txt(x.t)}</p>`).join('');
const nC = CH.filter(x => x.k === 'art').length, nS = ST.filter(x => x.k === 'art').length;

// ---- état de mise à jour
const ETAT = `<div class="part" id="etat"><h1 data-run="État de mise à jour"><span class="tn">Avant le texte</span><span class="sep"> · </span><br>État de mise à jour</h1>
<p class="lead">La Charte des Nations Unies a été signée à San Francisco le 26 juin 1945 et elle est entrée en vigueur le 24 octobre 1945. Le Statut de la Cour internationale de Justice lui est annexé et « fait partie intégrante » de la Charte (article 92). Cette édition reproduit les deux textes <b>tels qu’ils sont en vigueur aujourd’hui</b> : les amendements de 1963, 1965 et 1971 sont intégrés à la Charte, et le Statut n’a jamais été modifié depuis 1945.</p>
<p class="h">1. Les amendements de la Charte : texte de 1945 et texte en vigueur</p>
<div class="tw"><table class="am"><thead><tr><th>Article</th><th>Texte de 1945</th><th>Texte en vigueur</th><th>Amendement</th></tr></thead><tbody>
<tr><td><b>23</b><br>Conseil de sécurité</td><td>11 membres : 5 permanents et 6 non permanents</td><td><b>15 membres</b> : 5 permanents et 10 non permanents élus pour deux ans</td><td>adopté le 17 décembre 1963<br>en vigueur le 31 août 1965</td></tr>
<tr><td><b>27</b><br>Vote au Conseil de sécurité</td><td>décisions prises par un vote affirmatif de 7 membres (questions de fond : y compris les voix de tous les membres permanents)</td><td>décisions prises par un vote affirmatif de <b>9 membres</b> (questions de fond : y compris les voix de tous les membres permanents)</td><td>adopté le 17 décembre 1963<br>en vigueur le 31 août 1965</td></tr>
<tr><td><b>61</b><br>Conseil économique et social</td><td>18 membres</td><td>27 membres de 1965 à 1973, puis <b>54 membres</b>, dont 18 élus chaque année pour trois ans</td><td>adopté le 17 décembre 1963, en vigueur le 31 août 1965 ; puis adopté le 20 décembre 1971, en vigueur le 24 septembre 1973</td></tr>
<tr><td><b>109</b><br>Conférence de révision</td><td>convocation par un vote des deux tiers de l’Assemblée générale et de 7 membres quelconques du Conseil de sécurité</td><td>paragraphe 1 : vote de <b>9 membres</b> quelconques du Conseil de sécurité ; paragraphe 3 inchangé (« sept »), car il ne visait que la dixième session de l’Assemblée générale, en 1955</td><td>adopté le 20 décembre 1965<br>en vigueur le 12 juin 1968</td></tr>
</tbody></table></div>
<p class="small">Aucun autre amendement n’est entré en vigueur depuis 1973. Dans le texte qui suit, les quatre articles concernés portent la mention « amendé ».</p>
<p class="h">2. La note liminaire des Nations Unies</p>
<div class="nl">${NOTE}</div>
<p class="h">3. Ce que la pratique a changé sans modifier le texte</p>
<ul class="pr">
<li><b>Chine.</b> L’article 23 nomme toujours la « République de Chine ». Par la résolution 2758 (XXVI) du 25 octobre 1971, l’Assemblée générale a reconnu les représentants du gouvernement de la République populaire de Chine comme les seuls représentants légitimes de la Chine aux Nations Unies : c’est ce gouvernement qui occupe le siège permanent.</li>
<li><b>Russie.</b> L’article 23 nomme toujours l’« Union des Républiques socialistes soviétiques ». Par une lettre du 24 décembre 1991, le Président de la Fédération de Russie a fait savoir au Secrétaire général que la Fédération de Russie continuait la qualité de Membre de l’URSS, y compris au Conseil de sécurité ; cette position n’a pas été contestée.</li>
<li><b>Conseil de tutelle</b> (chapitres XII et XIII). Il a suspendu ses activités le 1<sup>er</sup> novembre 1994, un mois après l’indépendance des Palaos, dernier territoire sous tutelle. En 2005, le Document final du Sommet mondial (résolution 60/1, paragraphe 176) a envisagé de supprimer le chapitre XIII : aucun amendement en ce sens n’est entré en vigueur.</li>
<li><b>« États ennemis »</b> (articles 53, 77 et 107). Le même document (paragraphe 177) exprime la volonté de supprimer ces mentions, qui visent les adversaires de la seconde guerre mondiale ; elles demeurent dans le texte, faute d’amendement.</li>
</ul>
<p class="h">4. La Côte d’Ivoire et les Nations Unies</p>
<p>La Côte d’Ivoire est Membre des Nations Unies depuis le 20 septembre 1960 (résolution 1484 (XV) de l’Assemblée générale, sur la recommandation du Conseil de sécurité, résolution 150 (1960) du 23 août 1960). Dans son ordre juridique, la Constitution du 8 novembre 2016 prévoit que le Président de la République négocie et ratifie les traités (article 119), que les traités relatifs à la création d’organisations internationales ne peuvent être ratifiés qu’à la suite d’une loi (article 120) et que les traités régulièrement ratifiés ont, dès leur publication, une autorité supérieure à celle des lois, sous réserve de leur application par l’autre partie (article 123).</p>
<p class="h">5. Les textes reproduits</p>
<p class="small">Charte : texte français en vigueur, avec la note liminaire de l’édition des Nations Unies. Statut : texte de la publication officielle des Nations Unies (Charte des Nations Unies et Statut de la Cour internationale de Justice), relu sur les pages imprimées ; la seule correction porte sur l’article 69 (« par la même procédure »), coquille de l’impression. Dans les deux textes, l’écriture des majuscules suit l’usage actuel des Nations Unies (« Assemblée générale », « Conseil de sécurité », « État »). Seuls les textes publiés par l’Organisation des Nations Unies font foi ; ils sont consultables sur un.org et icj-cij.org.</p>
</div>`;

const tocHTML = [{ lvl: 1, id: 'etat', t: 'État de mise à jour' }, { lvl: 1, id: 'charte', t: 'Charte des Nations Unies' }, ...C.toc, { lvl: 1, id: 'statut', t: 'Statut de la Cour internationale de Justice' }, { lvl: 2, id: 'sa1', t: 'Article 1', arts: [] }, ...S.toc]
  .map(e => `<li class="t${e.lvl}"><a class="tt" href="#${e.id}">${esc(e.t)}${e.arts && e.arts.length ? ` <span class="rg">${range(e.arts)}</span>` : ''}</a><a class="pg" href="#${e.id}"></a></li>`).join('');
const outl = [{ lvl: 1, t: 'Sommaire' }, { lvl: 1, t: 'État de mise à jour' }, { lvl: 1, t: 'Charte des Nations Unies' }, ...C.outl, { lvl: 1, t: 'Statut de la Cour internationale de Justice' }, ...S.outl];

const KHATAM = `<svg class="kh" viewBox="-50 -50 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6"><rect x="-30" y="-30" width="60" height="60"/><rect x="-30" y="-30" width="60" height="60" transform="rotate(45)"/><circle r="13"/><rect x="-20" y="-20" width="40" height="40" transform="rotate(22.5)" stroke-width=".8"/><rect x="-20" y="-20" width="40" height="40" transform="rotate(67.5)" stroke-width=".8"/></g></svg>`;
const F = n => 'file://' + path.join(SITE, 'fonts', n);
const L = n => 'file://' + path.join(DEPS, '@fontsource/literata/files', n);
const CSS = `
@font-face{font-family:Lit;font-weight:400;src:url(${L('literata-latin-400-normal.woff2')})}
@font-face{font-family:Lit;font-weight:400;src:url(${L('literata-latin-ext-400-normal.woff2')});unicode-range:U+0100-024F,U+1E00-1EFF,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:Lit;font-weight:400;font-style:italic;src:url(${L('literata-latin-400-italic.woff2')})}
@font-face{font-family:Lit;font-weight:700;src:url(${L('literata-latin-700-normal.woff2')})}
@font-face{font-family:Atk;font-weight:400;src:url(${F('atkinson-400.woff2')})}
@font-face{font-family:Atk;font-weight:400;src:url(${F('atkinson-400-ext.woff2')});unicode-range:U+0100-02BA,U+1E00-1E9F,U+1EF2-1EFF}
@font-face{font-family:Atk;font-weight:700;src:url(${F('atkinson-700.woff2')})}
@font-face{font-family:Atk;font-weight:700;src:url(${F('atkinson-700-ext.woff2')});unicode-range:U+0100-02BA,U+1E00-1E9F,U+1EF2-1EFF}
:root{--ink:#18202f;--navy:#14213d;--acc:#23468f;--gold:#b98a2e;--mut:#5d6779;--line:#d6dbe4;--soft:#f3f5f9}
@page{size:A4;margin:20mm 20mm 22mm 22mm;
  @top-left{content:"Charte des Nations Unies · Statut de la CIJ";font:8.5pt Atk;color:var(--mut)}
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
.ct{font:700 30pt/1.14 Lit;margin:0 0 4mm;max-width:160mm;color:#fff;text-align:left}
.ct2{font:700 19pt/1.2 Lit;margin:0 0 8mm;max-width:160mm;color:#f1e3bd;text-align:left}
.cs{font:400 13pt/1.4 Lit;font-style:italic;color:#dfe5f1;max-width:150mm;text-align:left}
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
.toc .t2{font:400 9pt Lit;margin:.2mm 0 .2mm 5mm}
.part{break-before:page}
.tn{font:700 9.5pt Atk;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin:0 0 2mm;text-align:left}
.part>h1 .tn{display:inline-block;margin:0 0 2.4mm;line-height:1}
.part>h1 .sep,h2.chap .sep{display:inline-block;width:0;overflow:hidden;white-space:pre;vertical-align:top}
.part>h1{string-set:run attr(data-run);font:700 20pt/1.2 Lit;color:var(--navy);margin:0 0 6mm;padding:0 0 3.5mm;border-bottom:.6mm solid var(--gold)}
h2.chap{font:700 13.5pt/1.3 Lit;color:var(--acc);margin:8mm 0 3mm;break-after:avoid}
h2.chap .lab{display:inline-block;line-height:1;font:700 10.5pt Atk;letter-spacing:.12em;font-variant-caps:all-small-caps;color:var(--mut);margin-bottom:1mm}
p.inter{font:700 9.5pt Atk;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin:5mm 0 1mm;break-after:avoid;text-align:left}
h3.art{font:700 10.6pt/1.3 Atk;color:var(--navy);margin:5mm 0 1.6mm;padding-left:2.6mm;border-left:1.1mm solid var(--gold);break-after:avoid}
.nv{display:inline-block;font:700 7.4pt Atk;letter-spacing:.06em;text-transform:uppercase;color:#7a5a12;background:#f6ecd4;border-radius:1mm;padding:.3mm 1.6mm;margin-left:1.5mm;vertical-align:1px}
p.loi{font:400 8.2pt Atk;color:var(--mut);margin:-.6mm 0 1.8mm 3.7mm;break-after:avoid;text-align:left}
p.li{margin-left:6mm}
p.pre-k{font-weight:700;color:var(--navy);margin:3mm 0 1.6mm;text-align:left}
p.pre-a{margin-left:6mm;font-style:italic}
p.pre-e{margin-top:4mm}
p.sign1{margin-top:5mm}
p.sign{text-align:right;font-style:italic;margin-top:3mm}
#etat p{font-size:9.8pt} #etat .lead{font-size:10.4pt} #etat .small{font-size:8.8pt}
p.h{font:700 11pt/1.3 Lit;color:var(--acc);margin:4.6mm 0 1.8mm;break-after:avoid;text-align:left}
.tw{margin:1mm 0 2mm}
table.am{width:100%;border-collapse:collapse;font:400 8.3pt/1.34 Atk}
table.am th{background:var(--navy);color:#fff;text-align:left;padding:1.6mm 2mm;font-weight:700}
table.am td{border-bottom:.25mm solid var(--line);padding:1.3mm 2mm;vertical-align:top}
table.am tr:nth-child(even) td{background:var(--soft)}
table.am td:first-child{width:24mm;color:var(--navy)} table.am td:last-child{width:34mm;color:var(--mut)}
.small{font:400 8.8pt/1.45 Atk;color:var(--mut)}
.nl{background:var(--soft);border-left:1mm solid var(--gold);padding:2.2mm 3.4mm;font-size:8.7pt;line-height:1.42;border-radius:0 1.6mm 1.6mm 0}
.nl p:last-child{margin-bottom:0}
ul.pr{margin:0 0 2mm;padding-left:5mm} ul.pr li{margin:0 0 1.3mm;text-align:justify;font-size:9.3pt;line-height:1.45} ul.pr li::marker{color:var(--gold)}
`;

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Charte des Nations Unies et Statut de la Cour internationale de Justice</title><style>${CSS}</style>
<script>window.PagedConfig={auto:true,after:()=>{window.__done=true}}</script>
<script src="file://${path.join(DEPS, 'pagedjs/dist/paged.polyfill.js')}"></script></head><body>
<section class="cover"><div class="band">${KHATAM}<p class="lvl">Bibliothèque · Textes officiels</p><p class="ct">Charte des Nations Unies</p><p class="ct2">et Statut de la Cour internationale de Justice</p>
<p class="cs">Signés à San Francisco le 26 juin 1945, entrés en vigueur le 24 octobre 1945 · texte en vigueur, à jour des amendements de 1963, 1965 et 1971</p></div>
<div class="cbot"><p class="cby">Textes intégraux en vigueur</p><p class="cy">Charte : préambule, ${nC} articles, dix-neuf chapitres · Statut : ${nS} articles, cinq chapitres</p>
<p class="cn">État de mise à jour (texte de 1945 et texte en vigueur), articles amendés signalés, sommaire détaillé et signets par article</p>
<div class="brand"><img src="file://${path.join(SITE, 'logo.png')}" alt=""><div><b>Lisân Campus</b><span>Éditions Lisân · édition numérique</span></div></div></div></section>
<section class="front"><h2 class="fh">Sommaire</h2><ol class="toc">${tocHTML}</ol></section>
${ETAT}
<div class="part" id="charte"><h1 data-run="Charte des Nations Unies"><span class="tn">Texte 1</span><span class="sep"> · </span><br>Charte des Nations Unies</h1>${C.body}</div>
<div class="part" id="statut"><h1 data-run="Statut de la Cour internationale de Justice"><span class="tn">Texte 2 · annexé à la Charte</span><span class="sep"> · </span><br>Statut de la Cour internationale de Justice</h1>${S.body}</div>
</body></html>`;

(async () => {
  const hf = path.join(WORK, 'onu.html'); fs.writeFileSync(hf, html);
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const pg = await b.newPage();
  const errs = []; pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await pg.goto('file://' + hf);
  await pg.waitForFunction(() => window.__done === true, null, { timeout: 300000 });
  const n = await pg.evaluate(() => document.querySelectorAll('.pagedjs_page').length);
  await pg.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true, outline: true, tagged: true });
  await b.close();
  const sj = path.join(WORK, 'signets-onu.json'); fs.writeFileSync(sj, JSON.stringify(outl));
  console.log(require('child_process').execFileSync('python3', [path.join(__dirname, '../constitution/signets.py'), OUT, sj]).toString().trim());
  if (errs.length) console.log('erreurs :', errs.slice(0, 5));
  console.log(`livres/droit/charte-nations-unies-statut-cij.pdf : ${n} pages, ${(fs.statSync(OUT).size / 1048576).toFixed(1)} Mo, Charte ${nC} articles, Statut ${nS} articles`);
})().catch(e => { console.error(e); process.exit(1); });
