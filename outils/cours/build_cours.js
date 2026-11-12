// Documents de cours de l'espace Droit : un document par matière, mis en pages à l'identique
// à partir des leçons du site (site/data/droit.js), dans l'ordre du plan des cours et sommaires fournis.
// HTML mis en pages par Paged.js puis PDF par Chromium (Playwright).
// Dépendances (hors dépôt) : npm i pagedjs@0.4.3 hyphen @fontsource/literata  dans un dossier DEPS
// Usage : DEPS=/chemin/node_modules node outils/cours/build_cours.js [id …]   (sans id : tous les documents)
const fs = require('fs'), path = require('path'), vm = require('vm'), { execFileSync } = require('child_process');
const DEPS = process.env.DEPS || path.join(__dirname, 'node_modules');
const hy = require(path.join(DEPS, 'hyphen/fr')).hyphenateHTMLSync;
const SITE = path.join(__dirname, '../../site');
const OUT = path.join(SITE, 'livres/droit');
const WORK = path.join(require('os').tmpdir(), 'lisan-cours'); fs.mkdirSync(WORK, { recursive: true });
const EXTRA = require('./complements.js');

// ---------- matières du site
const ctx = { window: {}, console }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(SITE, 'data/droit.js'), 'utf8') + ';this.S={M_INTRO,M_DC,M_DM,M_OJ,M_METHO,M_TEE,M_ECO};', ctx);
const S = ctx.S;

// ---------- plan de chaque document
const ANNEE = 'Année universitaire 2026-2027';
const DOCS = [
  { id: 'intro', m: S.M_INTRO, file: 'cours-introduction-etude-droit.pdf', title: "Introduction à l'étude du droit", sub: 'Le droit objectif et les droits subjectifs',
    parts: [
      ['Introduction générale', ['introgen']],
      ['Première partie · Le droit objectif', ['caracteres', 'matieres', 'loi', 'forceloi', 'coutume', 'jurisprudence', 'interpretation', 'espace', 'temps', 'institution']],
      ['Deuxième partie · Les droits subjectifs', ['patrimoniaux', 'extrapatrimoniaux', 'chargepreuve', 'procedes', 'action', 'instance']],
    ] },
  { id: 'dc', m: S.M_DC, file: 'cours-droit-civil.pdf', title: 'Droit civil', sub: 'Le droit des personnes', by: "D'après le cours et les travaux dirigés de M. TRAORE",
    parts: [
      ['Introduction', ['intro']],
      ['Titre I · Les personnes physiques', [
        ['Chapitre 1 · Le commencement et la fin de la personnalité juridique', ['naissance', 'fin', 'disparition']],
        ['Chapitre 2 · Les droits de la personne physique', ['patrimoniaux', 'extrapatrimoniaux']],
        ['Chapitre 3 · L\'individualisation des personnes physiques', ['nom', 'nom2', 'domicile', 'etatcivil', 'etatcivil2']],
        ['Chapitre 4 · Les incapacités', ['mineur', 'autorite', 'controle', 'tutelle', 'emancipation']]]],
      ['Titre II · Les personnes morales', ['pmclass', 'pmregime']],
      ['Travaux dirigés', ['td1', 'td2', 'td3', 'x:proces']],
    ],
    annexes: [['Annexe 1 · Le polycopié du cours (texte intégral)', 'cours-droit-civil-personnes.pdf'], ['Annexe 2 · Les fiches de travaux dirigés (énoncés)', 'td-droit-civil-personnes-2026-2027.pdf']] },
  { id: 'dm', m: S.M_DM, file: 'cours-droit-musulman.pdf', title: 'Droit musulman', sub: 'La Charia et les sources du droit musulman', by: "D'après le cours de Dr Youssouf BAKAYOKO",
    parts: [
      ['Chapitre 1 · Définitions et compréhension de la Charia', ['charia']],
      ['Chapitre 2 · Les sources du droit musulman', ['coran', 'sunna']],
      ['Chapitre 3 · Les sources dérivées : l\'effort rationnel et doctrinal', ['idjma', 'qiyas', 'complement', 'etat']],
      ['Chapitre 4 · La révélation', ['revelation']],
      ['Synthèse', ['synthese', 'x:biblio']],
    ] },
  { id: 'oj', m: S.M_OJ, file: 'cours-organisation-judiciaire.pdf', title: "Organisation judiciaire de la Côte d'Ivoire", sub: 'Principes, juridictions et acteurs de la justice',
    parts: [
      ['Introduction', ['introduction']],
      ['Première partie · Les principes fondamentaux et les principales juridictions', [
        ['Chapitre I · Les principes fondamentaux', ['separation', 'egalite', 'contradictoire']],
        ['Chapitre II · Les principales juridictions', ['tpi', 'exception1', 'exception2', 'appel', 'cc-comptes', 'cassation', 'nonpermanentes', 'communautaires']]]],
      ['Deuxième partie · Les acteurs de la justice', [
        ['Chapitre I · Les magistrats', ['magistrats', 'recrutement', 'statut', 'responsabilite']],
        ['Chapitre II · Les auxiliaires de justice', ['avocats', 'notaire', 'commissaire', 'greffier']]]],
    ] },
  { id: 'metho', m: S.M_METHO, file: 'cours-methodologie-juridique.pdf', title: 'Méthodologie juridique', sub: 'Dissertation, cas pratique, commentaire d\'arrêt et commentaire de texte', by: "D'après le cours de M. OUATTARA Dotianga Kader",
    parts: [
      ['Introduction générale', ['introgen', 'atelier1']],
      ['Chapitre 1 · La dissertation juridique', ['methode', 'dissexo', 'sujet', 'corrige', 'atelier2']],
      ['Chapitre 2 · Le cas pratique', ['caspratique', 'casexemple', 'casexo', 'atelier3']],
      ['Chapitre 3 · Le commentaire d\'arrêt (fiche d\'arrêt)', ['fichedecision', 'commentaire', 'ficheexo', 'atelier4']],
      ['Chapitre 4 · Le commentaire de texte', ['commtexte']],
      ['Travaux dirigés', ['td1', 'td2', 'td3', 'td4', 'td5', 'td6', 'td7', 'td8', 'td9']],
    ] },
  { id: 'eco', m: S.M_ECO, file: 'cours-economie-politique.pdf', title: 'Économie politique', sub: 'Activité économique, grands courants de pensée et dix principes de l\'économie', by: "D'après le cours du Dr SANOGO Aly Balé",
    strip: /^Chapitre [IV]+ · /,
    parts: [
      ['Introduction générale', ['intro']],
      ['Chapitre I · L\'activité économique', ['concepts', 'agents', 'besoins', 'methodes', 'exo1']],
      ['Chapitre II · Les grands courants de la pensée économique', ['courants', 'classiques', 'neoclassiques', 'marxisme', 'keynes', 'neolib', 'systemes', 'exo2']],
      ['Chapitre III · Les dix principes de l\'économie', ['p1a4', 'p5a7', 'p8a10']],
    ] },
  { id: 'tee', m: S.M_TEE, file: 'cours-expression-ecrite.pdf', title: 'Techniques d\'expression écrite', sub: 'Niveaux 1 et 2 : langue, style et exercices corrigés',
    strip: /^(N[12]|Textes du cours) · /,
    parts: [
      ['Niveau 1', ['n1-intro', 'n1-genre', 'n1-ortho', 'n1-homo', 'n1-expr1', 'n1-expr2', 'n1-expr3', 'n1-constr', 'n1-pleo', 'n1-modes', 'n1-relprep', 'n1-exos']],
      ['Niveau 2', ['n2-genre', 'n2-accords', 'n2-sens', 'n2-liens', 'n2-syntaxe', 'n2-fautes1', 'n2-fautes2', 'n2-exos']],
      ['Textes du cours', ['vocab', 'fontaine']],
    ] },
];

// ---------- texte
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mdh = (t, h) => (h ? hy : x => x)(esc(t).replace(/\[([^\]]+)\]\(#[^)]*\)/g, '$1').replace(/\[\[(.+?)\]\]/g, '<span class="ara" lang="ar" dir="rtl">$1</span>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>'))
  .replace(/(<span class="ara"[^>]*>)([\s\S]*?)(<\/span>)/g, (_, a, b, c) => a + b.replace(/­/g, '') + c)
  .replace(/ ([:;!?»])/g, ' $1').replace(/« /g, '« ');
const md = t => mdh(t, true), mt = t => mdh(t, false); // mt : titres, sans césure
const svg = n => { const f = path.join(SITE, 'img', n.includes('/') ? n : 'en/' + n) + '.svg'; return fs.existsSync(f) ? 'file://' + f : null; };

function block(b) {
  if (b.raw) return b.raw;
  if (b.corrige) return `<div class="corr"><p class="corr-k">Corrigé</p>${b.corrige.map(block).join('')}</div>`;
  if (b.illus) { const s = svg(b.illus); return s ? `<figure class="ill"><img src="${s}" alt="">${b.cap ? `<figcaption>${md(b.cap)}</figcaption>` : ''}</figure>` : ''; }
  if (b.p) return `<p>${md(b.p)}</p>`;
  if (b.h) return `<h4>${mt(b.h)}</h4>`;
  if (b.ul) return `<ul>${b.ul.map(x => `<li>${md(x)}</li>`).join('')}</ul>`;
  if (b.ol) return `<ol>${b.ol.map(x => `<li>${md(x)}</li>`).join('')}</ol>`;
  if (b.table) { const n = b.table.h.length, empty = b.table.h.every(x => !String(x).trim());
    return `<table class="c${Math.min(n, 5)}${b.table.r.length <= 8 ? ' short' : ''}">${empty ? '' : `<thead><tr>${b.table.h.map(x => `<th>${mt(x)}</th>`).join('')}</tr></thead>`}<tbody>${b.table.r.map(r => `<tr>${r.map(x => `<td>${md(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`; }
  if (b.box) return `<div class="box ${b.kind || 'marge'}"><p class="k">${esc(b.title || 'En marge')}</p><p>${md(b.box)}</p></div>`;
  if (b.quote) return `<blockquote>${md(b.quote)}</blockquote>`;
  if (b.verse) return `<div class="verse"><p class="vt">${esc(b.title)}</p><p class="vs">${esc(b.src)}</p>${b.verse.map(l => `<p>${esc(l)}</p>`).join('')}</div>`;
  if (b.ayah) return `<figure class="ayah"><p class="ara" lang="ar" dir="rtl">${esc(b.ayah)}</p><figcaption><i>${md(b.fr)}</i> — ${md(b.ref)}</figcaption></figure>`;
  if (b.schema === 'oj') {
    const col = (h, top, rest) => `<div class="scol"><p class="sh">${h}</p><p class="sn top">${top}</p>${rest.map(([a, n]) => `<p class="sa">${a}</p><p class="sn">${n}</p>`).join('')}</div>`;
    return `<div class="schema">${col('Ordre judiciaire', 'Cour de cassation', [['▲ pourvoi', "Cours d'appel"], ['▲ appel', 'Tribunaux de première instance et de commerce']])}${col('Ordre administratif', "Conseil d'État", [['▲ recours', 'Tribunaux administratifs']])}${col('Juridictions financières', 'Cour des comptes', [['▲ recours', 'Chambres régionales des comptes']])}${col('À part', 'Conseil constitutionnel', [])}</div>`;
  }
  return ''; // outils interactifs (calculateurs…) : propres au site
}

// ---------- document
let uid = 0;
function lessonHTML(d, l, level) {
  const id = 'l' + (++uid), t = d.strip ? l.title.replace(d.strip, '') : l.title;
  return { id, t, html: `<section class="lesson"><h3 id="${id}" class="lv${level}">${mt(t)}</h3>${l.body.map(block).join('')}</section>` };
}
function build(d) {
  uid = 0;
  const byId = Object.fromEntries(d.m.lessons.map(l => [l.id, l]));
  const used = new Set(), toc = [];
  let body = '';
  const items = (ids, level) => ids.map(x => {
    if (Array.isArray(x)) { const id = 'c' + (++uid); toc.push({ lvl: 2, id, t: x[0] }); return `<h2 id="${id}" class="chap">${mt(x[0])}</h2>` + items(x[1], 3); }
    let l = x.startsWith('x:') ? EXTRA[x.slice(2)] : byId[x];
    if (!l) throw new Error(d.id + ' : leçon inconnue ' + x);
    used.add(x); const r = lessonHTML(d, l, level); toc.push({ lvl: level, id: r.id, t: r.t }); return r.html;
  }).join('');
  d.parts.forEach(([t, ids]) => { const id = 'p' + (++uid); toc.push({ lvl: 1, id, t });
    body += `<div class="part"><h1 id="${id}">${mt(t)}</h1>${items(ids, 2)}</div>`; });
  const miss = d.m.lessons.filter(l => !used.has(l.id)).map(l => l.id);
  if (miss.length) throw new Error(d.id + ' : leçons non placées ' + miss.join(', '));
  // lexique : cartes de révision de la matière
  const cards = (d.m.cards || []).slice().sort((a, b) => a[0].localeCompare(b[0], 'fr'));
  if (cards.length) { toc.push({ lvl: 1, id: 'lex', t: 'Lexique' });
    body += `<div class="part lexpart"><h1 id="lex">Lexique</h1><p class="lexi">Les notions essentielles de la matière, par ordre alphabétique.</p><dl class="lex">${cards.map(([a, b]) => `<div><dt>${mt(a)}</dt><dd>${md(b)}</dd></div>`).join('')}</dl></div>`; }
  if (d.annexes) d.annexes.forEach(([t], i) => { toc.push({ lvl: 1, id: 'ax' + i, t, ax: true, i }); body += `<div class="axsep"><h1 id="ax${i}">${mt(t)}</h1><p>Le document original est reproduit dans les pages qui suivent.</p></div>`; });
  const tocHTML = toc.map(e => `<li class="t${e.lvl}${e.ax ? ' ax' : ''}"><a class="tt" href="#${e.id}">${mt(e.t)}</a>${e.ax ? `<span class="pg pgx" data-i="${e.i}"></span>` : `<a class="pg" href="#${e.id}"></a>`}</li>`).join('');
  const nb = d.m.lessons.length;
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc(d.title)}</title><style>${CSS(d)}</style>
<script>window.PagedConfig={auto:true,after:()=>{window.__done=true}}</script>
<script src="file://${path.join(DEPS, 'pagedjs/dist/paged.polyfill.js')}"></script></head><body>
<section class="cover"><div class="band">${KHATAM}<p class="lvl">Licence 1 · Droit</p><h1 class="ct">${esc(d.title)}</h1><p class="cs">${esc(d.sub)}</p></div>
<div class="cbot"><p class="cby">${d.by ? esc(d.by) : 'D\'après le plan du cours de Licence 1'}</p><p class="cy">${ANNEE}</p>
<p class="cn">Cours complet · ${nb} leçons, exercices corrigés et lexique</p>
<div class="brand"><img src="file://${path.join(SITE, 'logo.png')}" alt=""><div><b>Lisân Campus</b><span>Éditions Lisân</span></div></div></div></section>
<section class="front"><h2 class="fh">Sommaire</h2><ol class="toc">${tocHTML}</ol>
<p class="note">Ce document rassemble le cours de la matière tel qu'il est enseigné sur Lisân Campus : chaque leçon, ses encadrés et ses exercices avec leur corrigé. Il se lit en complément des leçons à écouter, des mini-exercices, des cartes de révision et de l'évaluation du parcours, sur lisan-campus.pages.dev.</p></section>
${body}</body></html>`;
}

const KHATAM = `<svg class="kh" viewBox="-50 -50 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6"><rect x="-30" y="-30" width="60" height="60"/><rect x="-30" y="-30" width="60" height="60" transform="rotate(45)"/><circle r="13"/><rect x="-20" y="-20" width="40" height="40" transform="rotate(22.5)" stroke-width=".8"/><rect x="-20" y="-20" width="40" height="40" transform="rotate(67.5)" stroke-width=".8"/></g></svg>`;

const F = n => 'file://' + path.join(SITE, 'fonts', n);
const L = n => 'file://' + path.join(DEPS, '@fontsource/literata/files', n);
const CSS = d => `
@font-face{font-family:Lit;font-weight:400;src:url(${L('literata-latin-400-normal.woff2')})}
@font-face{font-family:Lit;font-weight:400;src:url(${L('literata-latin-ext-400-normal.woff2')});unicode-range:U+0100-024F,U+1E00-1EFF,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:Lit;font-weight:400;font-style:italic;src:url(${L('literata-latin-400-italic.woff2')})}
@font-face{font-family:Lit;font-weight:400;font-style:italic;src:url(${L('literata-latin-ext-400-italic.woff2')});unicode-range:U+0100-024F,U+1E00-1EFF,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:Lit;font-weight:700;src:url(${L('literata-latin-700-normal.woff2')})}
@font-face{font-family:Lit;font-weight:700;src:url(${L('literata-latin-ext-700-normal.woff2')});unicode-range:U+0100-024F,U+1E00-1EFF,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:Lit;font-weight:700;font-style:italic;src:url(${L('literata-latin-700-italic.woff2')})}
@font-face{font-family:Atk;font-weight:400;src:url(${F('atkinson-400.woff2')})}
@font-face{font-family:Atk;font-weight:400;src:url(${F('atkinson-400-ext.woff2')});unicode-range:U+0100-02BA,U+1E00-1E9F,U+1EF2-1EFF}
@font-face{font-family:Atk;font-weight:700;src:url(${F('atkinson-700.woff2')})}
@font-face{font-family:Atk;font-weight:700;src:url(${F('atkinson-700-ext.woff2')});unicode-range:U+0100-02BA,U+1E00-1E9F,U+1EF2-1EFF}
@font-face{font-family:Naskh;font-weight:400;src:url(${F('LisanNaskh-R.woff2')})}
@font-face{font-family:Naskh;font-weight:700;src:url(${F('LisanNaskh-B.woff2')})}
:root{--ink:#18202f;--navy:#14213d;--acc:#23468f;--gold:#b98a2e;--mut:#5d6779;--line:#d6dbe4;--soft:#f3f5f9}
@page{size:A4;margin:20mm 19mm 22mm 21mm;
  @top-left{content:"${esc(d.title).replace(/"/g, '\\"')}";font:8.5pt Atk;color:var(--mut);letter-spacing:.02em}
  @top-right{content:string(part);font:8.5pt Atk;color:var(--mut)}
  @bottom-left{content:"Lisân Campus · Licence 1 Droit";font:8pt Atk;color:var(--mut)}
  @bottom-right{content:counter(page);font:700 9pt Atk;color:var(--navy)}}
@page :blank{@top-left{content:none}@top-right{content:none}}
@page cover{margin:0;@top-left{content:none}@top-right{content:none}@bottom-left{content:none}@bottom-right{content:none}}
@page front{@top-right{content:none}}
@page axsep{@top-right{content:none}}
html{font-family:Lit,serif;font-size:10.4pt;line-height:1.5;color:var(--ink)}
body{margin:0}
p{margin:0 0 2.4mm;text-align:justify;orphans:2;widows:2}
b{font-weight:700;color:#0f1a33}
.ara{font-family:Naskh,serif;font-size:1.18em;line-height:1.2}
.cover{page:cover;width:210mm;height:297mm;position:relative;overflow:hidden;break-after:page;background:#fff}
.band{background:var(--navy);color:#fff;height:178mm;padding:34mm 22mm 0;box-sizing:border-box;position:relative}
.band .kh{position:absolute;right:-26mm;top:-22mm;width:120mm;height:120mm;color:rgba(201,162,74,.28)}
.lvl{font:700 10pt Atk;letter-spacing:.18em;text-transform:uppercase;color:#e3c47c;margin:0 0 9mm;text-align:left}
.ct{font:700 31pt/1.12 Lit;margin:0 0 7mm;max-width:150mm;color:#fff}
.cs{font:400 14pt/1.35 Lit;font-style:italic;color:#dfe5f1;max-width:150mm;text-align:left}
.band::after{content:"";position:absolute;left:22mm;bottom:0;width:40mm;height:2.2mm;background:#c9a24a}
.cbot{padding:16mm 22mm 0}
.cby{font:700 12pt Atk;color:var(--navy);text-align:left;margin-bottom:2mm}
.cy{font:400 11pt Atk;color:var(--mut);text-align:left}
.cn{font:400 10.5pt Lit;font-style:italic;color:var(--mut);text-align:left;margin-top:8mm}
.brand{position:absolute;left:22mm;bottom:22mm;display:flex;align-items:center;gap:4mm}
.brand img{width:15mm;height:15mm;object-fit:contain}
.brand b{display:block;font:700 13pt Atk;color:var(--navy)} .brand span{font:400 9.5pt Atk;color:var(--mut)}
.front{page:front;break-after:page}
.fh{font:700 20pt Lit;color:var(--navy);margin:0 0 6mm;padding-bottom:3mm;border-bottom:.6mm solid var(--gold)}
.toc{list-style:none;margin:0;padding:0}
.toc li{display:flex;align-items:baseline;gap:2mm}
.toc li a{color:inherit;text-decoration:none}
.toc .tt{flex:0 1 auto}
.toc li::after{content:"";flex:1 1 auto;border-bottom:.25mm dotted #aab2c0;margin:0 1mm;order:1;transform:translateY(-1mm)}
.toc .pg{order:2;font:700 9pt Atk;color:var(--navy);min-width:7mm;text-align:right}
.toc a.pg::after{content:target-counter(attr(href),page)}
.toc .t1{font:700 10.5pt Atk;color:var(--navy);margin:4mm 0 1.2mm}
.toc .t2{font:400 9.6pt Lit;margin:.7mm 0 .7mm 5mm}
.toc .t3{font:400 9.2pt Lit;color:#3b4456;margin:.5mm 0 .5mm 10mm}
.note{margin-top:9mm;font-size:9.2pt;color:var(--mut);font-style:italic;border-top:.25mm solid var(--line);padding-top:3mm}
.part{break-before:page}
.part>h1{string-set:part content(text);font:700 21pt/1.2 Lit;color:var(--navy);margin:0 0 7mm;padding:0 0 3.5mm;border-bottom:.6mm solid var(--gold)}
h2.chap{font:700 14.5pt/1.25 Lit;color:var(--acc);margin:7mm 0 4mm;break-after:avoid}
.lesson h3{font:700 13pt/1.3 Atk;color:var(--navy);margin:7mm 0 3mm;padding-left:3mm;border-left:1.2mm solid var(--gold);break-after:avoid}
.lesson h3.lv3{font-size:12pt}
h4{font:700 10.8pt/1.3 Atk;color:var(--acc);margin:4.5mm 0 1.8mm;break-after:avoid}
ul,ol{margin:0 0 2.6mm;padding-left:6mm} li{margin:0 0 1mm;text-align:justify}
ul li::marker{color:var(--gold)} ol li::marker{color:var(--acc);font-weight:700;font-family:Atk}
table{width:100%;border-collapse:collapse;margin:1.5mm 0 3.5mm;font-size:9.1pt;line-height:1.38;break-inside:auto}
th{background:var(--navy);color:#fff;font:700 8.8pt Atk;text-align:left;padding:1.6mm 2mm;vertical-align:bottom}
th b{color:#fff}
td{border-bottom:.25mm solid var(--line);padding:1.5mm 2mm;vertical-align:top;text-align:left}
tr:nth-child(even) td{background:var(--soft)} tr{break-inside:avoid} table.short{break-inside:avoid} thead{break-after:avoid}
.box{border-radius:2mm;padding:2.6mm 3.5mm 1mm;margin:2mm 0 3.5mm;break-inside:avoid}
.box .k{font:700 8.6pt Atk;letter-spacing:.06em;text-transform:uppercase;margin:0 0 1mm}
.box.marge{background:#fbf2e0} .box.marge .k{color:#9a5f06}
.box.cle{background:#e7edf8} .box.cle .k{color:var(--acc)}
.box.piege{background:#f9e5e2} .box.piege .k{color:#a2301f}
blockquote{margin:2mm 0 3.5mm;padding:1mm 0 1mm 5mm;border-left:.8mm solid var(--line);font-style:italic;color:#2c3446}
.corr{border:.3mm solid #b9d6c3;border-left:1.2mm solid #2f7d4f;background:#f4faf6;border-radius:1.5mm;padding:2.4mm 3.5mm .8mm;margin:2mm 0 4mm}
.corr-k{font:700 8.6pt Atk;letter-spacing:.06em;text-transform:uppercase;color:#2f7d4f;margin:0 0 1.2mm}
.corr h4{margin-top:2.5mm}
figure.ill{margin:3mm 0 4mm;text-align:center;break-inside:avoid}
figure.ill img{max-width:100%;max-height:92mm}
figure.ill figcaption{font:400 8.6pt Atk;color:var(--mut);margin-top:1.5mm}
.verse{margin:2mm 0 4mm;padding:3mm 5mm;background:var(--soft);border-radius:2mm;break-inside:avoid}
.verse p{margin:0;text-align:left;font-style:italic} .verse .vt{font:700 11pt Atk;font-style:normal;color:var(--navy)} .verse .vs{font:400 8.6pt Atk;font-style:normal;color:var(--mut);margin-bottom:2mm}
.schema{display:grid;grid-template-columns:repeat(4,1fr);gap:2.5mm;margin:2mm 0 4mm;break-inside:avoid}
.scol p{margin:0;text-align:center}
.sh{font:700 8pt Atk;text-transform:uppercase;letter-spacing:.05em;color:var(--mut);margin-bottom:1.5mm!important}
.sn{border:.3mm solid var(--line);border-radius:1.5mm;padding:1.6mm;font:700 8.8pt Atk;color:var(--navy);background:var(--soft)}
.sn.top{background:var(--navy);color:#fff}
.sa{font:400 8pt Atk;color:var(--gold);padding:1mm 0}
.lex{margin:0;column-count:2;column-gap:7mm}
.lex div{break-inside:avoid;margin:0 0 2.6mm}
.lex dt{font:700 9.6pt Atk;color:var(--navy)} .lex dd{margin:.3mm 0 0;font-size:9.2pt;line-height:1.4}
.lexi{font-style:italic;color:var(--mut)}
.axsep{page:axsep;break-before:page;padding-top:80mm;text-align:center}
.axsep h1{font:700 19pt/1.3 Lit;color:var(--navy);margin:0 0 5mm}
.axsep p{text-align:center;color:var(--mut);font-style:italic}
.proc{margin:3mm 0 4mm;break-inside:avoid}
.proc .row{display:grid;grid-template-columns:62mm 16mm 1fr;align-items:center;gap:0 2mm}
.proc .court{border:.4mm solid var(--navy);border-radius:2mm;overflow:hidden}
.proc .court p{margin:0;text-align:left}
.proc .cn1{background:var(--navy);color:#fff;font:700 9.2pt Atk;padding:1.6mm 2.5mm}
.proc .cn2{font:400 9pt Atk;padding:1.6mm 2.5mm;background:var(--soft)}
.proc .dec{font:700 8.6pt Atk;color:var(--gold);text-align:center}
.proc .out p{margin:0 0 1.2mm;font-size:9.1pt;text-align:left;line-height:1.35}
.proc .out .ou{font:400 8pt Atk;color:var(--mut);margin:0 0 1.2mm 4mm}
.proc .step{width:62mm;text-align:center;font:400 8.8pt Atk;color:var(--acc);padding:2mm 0}
.proc .step::before{content:"▼";display:block;color:var(--gold);font-size:8pt}
`;

// ---------- PDF
async function render(d) {
  const html = build(d), hf = path.join(WORK, d.id + '.html'); fs.writeFileSync(hf, html);
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const pg = await b.newPage();
  const errs = []; pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await pg.goto('file://' + hf);
  await pg.waitForFunction(() => window.__done === true, null, { timeout: 300000 });
  const n = await pg.evaluate(() => document.querySelectorAll('.pagedjs_page').length);
  if (d.annexes) { // numéro de page des annexes, placées après le document principal
    const np = d.annexes.map(([, f]) => +execFileSync('qpdf', ['--show-npages', path.join(__dirname, 'originaux', f)]).toString().trim());
    const at = d.annexes.map((a, i) => n - d.annexes.length + 1 + i + np.slice(0, i).reduce((x, y) => x + y, 0));
    await pg.evaluate(at => document.querySelectorAll('.pgx').forEach(e => { e.textContent = at[+e.dataset.i]; }), at);
  }
  const main = d.annexes ? path.join(WORK, d.id + '-main.pdf') : path.join(OUT, d.file);
  await pg.pdf({ path: main, preferCSSPageSize: true, printBackground: true });
  await b.close();
  if (errs.length) console.log(d.id, 'erreurs :', errs.slice(0, 5));
  let pages = n;
  if (d.annexes) {
    // les annexes (documents originaux) suivent chacune leur page de titre
    const order = [], sep = d.annexes.length; // les dernières pages du PDF principal sont les pages de titre des annexes
    order.push(main + '=1-' + (n - sep));
    d.annexes.forEach(([, f], i) => { order.push(main + '=' + (n - sep + 1 + i)); order.push(path.join(__dirname, 'originaux', f)); });
    const args = ['--empty', '--pages'];
    order.forEach(o => { const [file, r] = o.split('='); args.push(file); if (r) args.push(r); else args.push('1-z'); });
    args.push('--', path.join(OUT, d.file));
    execFileSync('qpdf', args);
    pages = +execFileSync('qpdf', ['--show-npages', path.join(OUT, d.file)]).toString().trim();
  }
  const mb = fs.statSync(path.join(OUT, d.file)).size / 1048576;
  console.log(`${d.id} → livres/droit/${d.file} : ${pages} pages, ${mb.toFixed(1)} Mo`);
  return { id: d.id, file: d.file, pages, mb: +mb.toFixed(1) };
}

module.exports = { DOCS, build };
if (require.main === module) (async () => {
  const want = process.argv.slice(2), res = [];
  for (const d of DOCS) if (!want.length || want.includes(d.id)) res.push(await render(d));
  fs.writeFileSync(path.join(WORK, 'resultats.json'), JSON.stringify(res, null, 1));
})().catch(e => { console.error(e); process.exit(1); });
