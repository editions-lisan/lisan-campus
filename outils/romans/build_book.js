// Livre « The Missing Will » (Legal Stories from Abidjan, Book One) : HTML mis en pages par Paged.js puis PDF par Chromium.
// Dépendances (hors dépôt) : npm i pagedjs@0.4.3 hyphen @fontsource/literata @fontsource/cormorant-garamond  dans un dossier DEPS
// Usage : DEPS=/chemin/node_modules node outils/romans/build_book.js [sortie.pdf]
const fs = require('fs'), path = require('path');
const DEPS = process.env.DEPS || path.join(__dirname, 'node_modules');
const req = m => require(path.join(DEPS, m));
const hyEN = req('hyphen/en').hyphenateSync, hyFR = req('hyphen/fr').hyphenateSync;
const { cover, part1, part2, part3, VIG } = require('./illus.js');
const PARTS = [1, 2, 3].map(i => require('./novel1_p' + i + '.js'));
const ART = { part1: part1(), part2: part2(), part3: part3() };
const SITE = path.join(__dirname, '../../site');
const OUTPDF = process.argv[2] || path.join(SITE, 'livres/droit/the-missing-will.pdf');
const WORK = path.join(require('os').tmpdir(), 'missing-will-book'); fs.mkdirSync(WORK, { recursive: true });

const typo = t => t.replace(/(^|[\s(—])"/g, '$1“').replace(/"/g, '”').replace(/(\w)'(\w)/g, '$1’$2').replace(/(\s)'/g, '$1‘').replace(/'/g, '’');
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
const en = t => hyEN(md(typo(t)));
const fr = t => hyFR(md(t));
// Scènes : paragraphe avant lequel on place un blanc orné
const BREAKS = { ch4: [4], ch7: [3, 5, 7], ch9: [2, 4], ch10: [2], epilogue: [1] };

function chapterHTML(c) {
  const [label, name] = typo(c.title).split(': ');
  let ps = '';
  c.paras.forEach(([t], i) => {
    if ((BREAKS[c.id] || []).includes(i)) ps += '<p class="brk" aria-hidden="true">*&#8195;*&#8195;*</p>';
    let h = en(t);
    if (i === 0) h = h.replace(/^((?:\S+\s){3})/, '<span class="lead">$1</span>');
    ps += `<p${i === 0 || (BREAKS[c.id] || []).includes(i) ? ' class="first"' : ''}>${h}</p>`;
  });
  return `<section class="chapter" id="${c.id}"><div class="vig">${VIG[c.id]}</div><p class="clabel">${esc(label)}</p><h2>${esc(name)}</h2><div class="text">${ps}</div></section>`;
}

const CAST = [
  ['Moussa Diarra', 'nineteen, a first-year law student and an intern at Kouassi & Traoré.'],
  ['Maître Aïcha Traoré', 'a lawyer at the Abidjan bar. She believes in facts, dates and evidence.'],
  ['Maître Paul Kouassi', 'the senior partner: a white beard, a cup of tea, a Latin proverb.'],
  ['Akissi Yao', 'a schoolteacher in Bouaké, the widow of Konan Yao.'],
  ['Konan Yao', 'a cocoa planter near Bouaké who could not read.'],
  ['Gervais Yao', 'Konan’s nephew, the owner of two minibuses.'],
  ['Nanan Ahou', 'Konan’s elder sister and Gervais’s mother, the oldest woman of the family.'],
  ['Mr. Ernest Kouamé', 'a retired headmaster, Konan’s best friend.'],
  ['Maître Dosso', 'a notary in Bouaké, behind a blue door near the big market.'],
  ['Mrs. Henriette Gbané', 'a retired pharmacist.'],
  ['Dr. Sylvie Fofana', 'a cardiologist at the hospital of Bouaké.'],
  ['Maître Diby', 'Gervais’s lawyer.'],
  ['Judge Marie-Claire Assi', 'the presiding judge of the court in Bouaké.'],
];

const LAW = [
  ['La coutume et la loi', 'Depuis les réformes de 1964, les successions ne sont plus réglées par la coutume mais par la loi, aujourd’hui la loi de 2019 relative aux successions. La coutume garde une place dans la vie familiale, mais elle ne peut pas aller contre la loi : c’est ce que Gervais refuse d’abord d’admettre.'],
  ['L’enfant conçu', 'Selon l’adage *infans conceptus pro nato habetur quoties de commodis ejus agitur*, l’enfant simplement conçu est considéré comme né chaque fois qu’il y va de son intérêt, à condition de naître vivant. La conception est présumée avoir eu lieu entre le trois-centième et le cent-quatre-vingtième jour avant la naissance. Espérance, conçue avant la mort de son père, peut donc hériter de lui.'],
  ['Le testament authentique', 'Konan ne sait pas lire : il dicte ses volontés à un notaire, qui les écrit, les lui relit, puis les fait signer en présence de deux témoins. L’original reste chez le notaire. Un tel acte authentique est une preuve très forte : on ne peut le contester comme faux que par une procédure spéciale, l’inscription de faux.'],
  ['La preuve', '*Actori incumbit probatio* : la preuve incombe au demandeur. C’est Gervais qui demande l’annulation du testament ; c’est donc à lui de prouver que son oncle n’était pas sain d’esprit. La défense apporte néanmoins ses propres preuves : certificat médical, témoins, registre du notaire.'],
  ['Le procès', 'L’assignation saisit le tribunal de première instance. À l’audience, chaque avocat plaide, les témoins sont entendus, puis l’affaire est mise en délibéré. Le jugement se compose de motifs (« attendu que… ») et d’un dispositif (« par ces motifs… »). La partie qui perd supporte en principe les dépens et dispose d’un délai, en principe d’un mois, pour faire appel.'],
  ['Les témoins', 'Faire pression sur un témoin pour l’empêcher de déposer est une infraction. Maître Traoré conserve la preuve du message (capture d’écran, numéro, heure) et la signale au juge et à la police.'],
];

const QWORD = { one: 'un', two: 'deux', three: 'trois', four: 'quatre', five: 'cinq', six: 'six', seven: 'sept', eight: 'huit', nine: 'neuf', ten: 'dix' };
const allCh = PARTS.flatMap(p => p.chapters);
const lex = allCh.map(c => {
  const [label, name] = typo(c.title).split(': ');
  const words = c.vocab.map(([e, w, f]) => `<b>${esc(typo(w))}</b> ${esc(f)}`).join(' · ');
  const expr = c.corner.map(([x, f]) => `${md(typo(x))} ${esc(f)}`).join(' · ');
  return `<h4>${esc(label)} · <i>${esc(name)}</i></h4><p class="lex">${hyFR(words)}</p><p class="lex expr">${hyFR(expr)}</p>`;
}).join('');
const quest = allCh.map(c => `<h4>${esc(typo(c.title).replace(': ', ' · '))}</h4><ol>${c.questions.map(q => `<li lang="en">${en(q[0])}</li>`).join('')}</ol>`).join('');
const answ = allCh.map(c => `<h4>${esc(typo(c.title).replace(': ', ' · '))}</h4><ol>${c.questions.map(q => `<li><span lang="en">${en(q[1])}</span><br><span class="frans">${fr(q[2])}</span></li>`).join('')}</ol>`).join('');

let toc = '';
PARTS.forEach((p, i) => {
  toc += `<li class="tpart"><span>${esc(p.title)} · ${esc(p.name)}</span></li>`;
  p.chapters.forEach(c => { const [l, n] = typo(c.title).split(': '); toc += `<li><a href="#${c.id}"><span class="tl">${esc(l)}</span><span class="tn">${esc(n)}</span></a><span class="dots"></span><a class="pg" href="#${c.id}"></a></li>`; });
});
toc += `<li class="tpart"><span>Notes de lecture</span></li><li><a href="#notes"><span class="tn">Le droit derrière l’histoire</span></a><span class="dots"></span><a class="pg" href="#notes"></a></li><li><a href="#lexique"><span class="tn">Lexique, chapitre par chapitre</span></a><span class="dots"></span><a class="pg" href="#lexique"></a></li><li><a href="#questions"><span class="tn">Questions de lecture et réponses</span></a><span class="dots"></span><a class="pg" href="#questions"></a></li>`;

const F = n => 'file://' + path.join(DEPS, '@fontsource', n);
const css = `
@font-face{font-family:Literata;font-weight:400;font-style:normal;src:url(${F('literata/files/literata-latin-400-normal.woff2')})}
@font-face{font-family:Literata;font-weight:400;font-style:italic;src:url(${F('literata/files/literata-latin-400-italic.woff2')})}
@font-face{font-family:Literata;font-weight:700;font-style:normal;src:url(${F('literata/files/literata-latin-700-normal.woff2')})}
@font-face{font-family:Literata;font-weight:700;font-style:italic;src:url(${F('literata/files/literata-latin-700-italic.woff2')})}
@font-face{font-family:Literata;font-weight:400;font-style:normal;src:url(${F('literata/files/literata-latin-ext-400-normal.woff2')});unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:Cormorant;font-weight:500;font-style:normal;src:url(${F('cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2')})}
@font-face{font-family:Cormorant;font-weight:600;font-style:normal;src:url(${F('cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2')})}
@font-face{font-family:Cormorant;font-weight:500;font-style:italic;src:url(${F('cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2')})}
@font-face{font-family:Cormorant;font-weight:600;font-style:italic;src:url(${F('cormorant-garamond/files/cormorant-garamond-latin-600-italic.woff2')})}
:root{--ink:#2a211b;--acc:#9a4325;--gold:#b07a2a;--soft:#6d6158}
@page{size:148mm 210mm;margin:19mm 16mm 21mm 19mm;
  @bottom-center{content:counter(page);font:9pt Literata;color:#7b6f66}}
@page :left{margin-left:16mm;margin-right:19mm;@top-left{content:"The Missing Will";font:italic 9pt Literata;color:#7b6f66}}
@page :right{@top-right{content:string(chap);font:italic 9pt Literata;color:#7b6f66}}
@page :blank{@top-left{content:none}@top-right{content:none}@bottom-center{content:none}}
@page cover{margin:0;@top-left{content:none}@top-right{content:none}@bottom-center{content:none}}
@page front{@top-left{content:none}@top-right{content:none}@bottom-center{content:none}}
@page part{@top-left{content:none}@top-right{content:none}@bottom-center{content:none}}
@page chapter:first{@top-left{content:none}@top-right{content:none}}
html{font-family:Literata,serif;font-size:12pt;color:var(--ink);line-height:1.45;hyphens:manual}
body{margin:0}
.cover,.back{page:cover;break-after:page;width:148mm;height:210mm;overflow:hidden;position:relative}
.cover svg{display:block;width:148mm;height:210mm}
.front{page:front;break-before:page;text-align:center}
.titlep{padding-top:22mm;break-before:right}
.dedic,.contents{break-before:right}
.kick{font:600 9.5pt Cormorant;letter-spacing:.32em;color:var(--gold);text-transform:uppercase}
.titlep h1{font:italic 500 40pt/1.05 Cormorant;margin:9mm 0 3mm;color:var(--ink)}
.sub{font:italic 13pt Literata;color:var(--soft)}
.orn{color:var(--gold);font:500 16pt Cormorant;letter-spacing:.5em;margin:9mm 0}
.author{font:600 14pt Cormorant;letter-spacing:.22em;text-transform:uppercase}
.pub{position:absolute;left:0;right:0;bottom:0;font:600 11pt Cormorant;letter-spacing:.2em;text-transform:uppercase;color:var(--soft)}
.titlep{position:relative;height:166mm}
.pub img{display:block;width:13mm;height:13mm;margin:0 auto 2mm}
.copy{text-align:left;font-size:12pt;line-height:1.36;padding-top:36mm;color:var(--soft)}
.copy p{margin:0 0 2.6mm;hyphens:auto}
.copy b{color:var(--ink)}
.dedic{padding-top:55mm;font:italic 15pt/1.5 Literata;color:var(--soft)}
.contents{text-align:left}
h3.sec{font:500 24pt Cormorant;text-align:center;margin:2mm 0 6mm;color:var(--ink)}
.chapter h2,.part h2,h3.sec{string-set:chap content()}
.toc{list-style:none;padding:0;margin:0}
.toc li{display:flex;align-items:baseline;margin:0 0 .6mm;line-height:1.3}
.toc li.tpart{margin:3.2mm 0 1mm;font:600 11pt Cormorant;letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
.toc a{color:inherit;text-decoration:none}
.toc .tl{font-size:10.5pt;color:var(--soft);margin-right:2mm}
.toc .dots{flex:1;border-bottom:1px dotted #b9ab9c;margin:0 2mm 1.2mm}
.toc .pg::after{content:target-counter(attr(href),page)}
.cast h3.sec{margin-bottom:4mm}
.cast p{text-align:left;margin:0 0 1mm;padding-left:5mm;text-indent:-5mm;line-height:1.27}
.cast b{font-weight:700;color:var(--acc)}
.note p{text-align:justify;text-indent:0;margin:0 0 3mm}
.part{page:part;break-before:right;text-align:center;padding-top:6mm}
.part .pn{font:600 11pt Cormorant;letter-spacing:.32em;text-transform:uppercase;color:var(--gold)}
.part h2{font:italic 500 34pt Cormorant;margin:2mm 0 7mm}
.part .art{width:100mm;margin:0 auto;border:1px solid #d7cbbb;padding:2mm;background:#fbf7ef}
.part .art svg{display:block;width:100%;height:auto}
.chapter{page:chapter;break-before:page}
.vig{width:36mm;margin:10mm auto 2mm}
.vig svg{display:block;width:100%}
.clabel{text-align:center;font:600 10.5pt Cormorant;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin:0}
.chapter h2{text-align:center;font:italic 500 25pt/1.15 Cormorant;margin:1mm 0 10mm}
.text p{margin:0;text-align:justify;text-indent:1.3em;orphans:2;widows:2}
.text p.first{text-indent:0}
.text p:first-child::first-letter{float:left;font:500 5.3em/.74 Cormorant;color:var(--acc);padding:.05em .08em 0 0;margin-top:.02em}
.lead{font-size:.84em;letter-spacing:.07em;text-transform:uppercase}
.brk{text-align:center!important;text-indent:0!important;color:var(--gold);font:600 13pt Cormorant;margin:3.5mm 0!important}
.notes{break-before:right;page:notes}
.notes h3.sec{margin-top:4mm}
.notes .intro{font-style:italic;color:var(--soft);text-align:center;margin:0 0 6mm}
.notes h4{font:600 12.5pt Cormorant;letter-spacing:.06em;color:var(--acc);margin:5mm 0 1.5mm;break-after:avoid}
.notes p{margin:0 0 2mm;text-align:justify}
.notes p.lex{text-align:left;margin:0 0 1.2mm}
.notes p.expr{color:var(--soft);font-style:italic}
.notes p.expr b{font-style:normal}
.notes ol{margin:0 0 2mm;padding-left:6mm}
.notes li{margin:0 0 1.6mm}
.frans{color:var(--soft);font-style:italic}
.sub2{break-before:page}
.back{break-before:left;background:#1c1830;color:#f3e9d6}
.back .in{position:absolute;inset:18mm 16mm}
.back .kick{color:#e3b866}
.back h2{font:italic 500 30pt Cormorant;margin:3mm 0 6mm;color:#fbf1dc}
.back p{text-align:justify;margin:0 0 3.5mm;line-height:1.45}
.back .fr{color:#cdbfa8;font-style:italic}
.back .bv{width:30mm;margin:6mm auto 0;opacity:.9}
.back .pub{color:#cdbfa8;bottom:0}
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>The Missing Will</title>
<style>${css}</style>
<script>window.PagedConfig={auto:true,after:()=>{window.__done=true}}</script>
<script src="file://${path.join(DEPS, 'pagedjs/dist/paged.polyfill.js')}"></script></head><body>
<div class="cover">${cover(true)}</div>
<section class="front titlep"><p class="kick">Legal Stories from Abidjan · Book One</p><h1>The Missing Will</h1><p class="sub">A legal novel</p><p class="orn">❧</p><p class="author">Mouhamadou Cissema</p>
<div class="pub"><img src="file://${SITE}/logo.png" alt="">Éditions Lisân</div></section>
<section class="front copy">
<p><b>The Missing Will</b><br>Legal Stories from Abidjan · Book One</p>
<p>© 2026 Mouhamadou CISSEMA and Éditions Lisân. All rights reserved.</p>
<p>This is a work of fiction. The characters, the law firm Kouassi &amp; Traoré, the cases and the court decisions in this book are invented; any resemblance to real persons is coincidental. The legal rules mentioned in the story are explained simply for learners and do not replace the advice of a lawyer.</p>
<p>Cover and illustrations: Éditions Lisân.</p>
<p>Read and listen online, with a French translation of every paragraph: Lisân Campus, lisan-campus.pages.dev.</p>
<p>First edition: November 2026.</p></section>
<section class="front dedic"><p>To every student<br>who asks the right question<br>on the very first day.</p></section>
<section class="front contents"><h3 class="sec">Contents</h3><ul class="toc">${toc}</ul></section>
<section class="front cast"><h3 class="sec">The People in the Story</h3>${CAST.map(([n, d]) => `<p><b>${esc(n)}</b>, ${hyEN(esc(d))}</p>`).join('')}</section>
<section class="front note" lang="fr"><h3 class="sec">Au lecteur</h3>
<p>${fr('Ce roman est écrit en anglais simple, de niveau B1, pour les étudiants qui veulent apprendre la langue du droit en suivant une histoire. Il se déroule en Côte d’Ivoire, entre Abidjan et Bouaké, et suit une affaire de succession du premier rendez-vous au jugement.')}</p>
<p>${fr('Lisez chaque chapitre d’une traite, sans vous arrêter sur chaque mot inconnu : le sens vient souvent de la phrase suivante. Relisez ensuite le chapitre avec le lexique et les questions de lecture placés à la fin du livre.')}</p>
<p>${fr('Sur Lisân Campus, chaque chapitre s’écoute en entier, chaque paragraphe a sa traduction française, et un court exercice vérifie votre compréhension.')}</p></section>
${PARTS.map((p, i) => `<section class="part"><p class="pn">${esc(p.title)}</p><h2>${esc(p.name)}</h2><div class="art">${ART[p.illus]}</div></section>${p.chapters.map(chapterHTML).join('')}`).join('')}
<section class="notes" lang="fr" id="notes"><h3 class="sec">Le droit derrière l’histoire</h3><p class="intro">Les règles qui font avancer le récit, expliquées simplement.</p>${LAW.map(([t, x]) => `<h4>${esc(t)}</h4><p>${fr(x)}</p>`).join('')}</section>
<section class="notes sub2" lang="fr" id="lexique"><h3 class="sec">Lexique, chapitre par chapitre</h3><p class="intro">Les mots clés de chaque chapitre, puis ses expressions.</p>${lex}</section>
<section class="notes sub2" lang="fr" id="questions"><h3 class="sec">Questions de lecture</h3><p class="intro">Répondez en anglais, puis vérifiez avec les réponses qui suivent.</p>${quest}
<h3 class="sec sub2">Réponses</h3>${answ}</section>
<div class="back"><div class="in"><p class="kick">Legal Stories from Abidjan · Book One</p><h2>The Missing Will</h2>
<p>${en("Moussa Diarra is nineteen, a first-year law student, and nervous in his only tie. On his first Saturday as an intern in a small law firm in Abidjan, a young widow arrives from Bouaké. Her husband's nephew wants her house and the cocoa plantations, and custom seems to be on his side.")}</p>
<p>${en("But Konan Yao, a planter who could not read, once pushed open a blue door near the big market. What did he sign there? And can a child who is not yet born inherit from a father who is already dead?")}</p>
<p class="fr">${fr('Un roman en anglais facile (niveau B1) pour découvrir la langue du droit à travers une histoire ivoirienne : succession, testament authentique, enfant à naître, preuve et procès.')}</p>
<div class="bv">${VIG.ch5}</div>
<div class="pub"><img src="file://${SITE}/logo.png" alt="">Éditions Lisân</div></div></div>
</body></html>`;

fs.writeFileSync(path.join(WORK, 'book.html'), html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const pg = await b.newPage();
  pg.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
  await pg.goto('file://' + path.join(WORK, 'book.html'));
  await pg.waitForFunction(() => window.__done === true, null, { timeout: 120000 });
  const n = await pg.evaluate(() => document.querySelectorAll('.pagedjs_page').length);
  await pg.pdf({ path: OUTPDF, preferCSSPageSize: true, printBackground: true });
  await b.close();
  console.log('pages', n, '→', OUTPDF);
})();
