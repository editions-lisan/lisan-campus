// BOILEAU · fabrique les cartes PNG (1080 × 1350, format WhatsApp) d'une série.
// Usage : NODE_PATH=$(npm root -g) node build.js [serie-l1.js] [dossier de sortie]
// Pour chaque semaine : 5 cartes (lundi à vendredi), la révision du samedi (textes à trous, réponses à l'envers)
// et le défi du dimanche. Le contenu de chaque carte est réduit automatiquement s'il dépasse la hauteur.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const SERIE = require(path.resolve(__dirname, process.argv[2] || 'serie-l1.js')).SEMAINES;
const OUT = path.resolve(process.argv[3] || path.join(__dirname, 'cartes'));
const SITE = path.join(__dirname, '../../site');
const F = n => 'file://' + path.join(SITE, 'fonts', n);
const LOGO = 'file://' + path.join(SITE, 'icon-512.png');
const STAR = 'M50 2 63 15h22v22l13 13-13 13v22H63L50 98 37 85H15V63L2 50l13-13V15h22z';
const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const NIVEAU = 'L1';

const CSS = `
@font-face{font-family:Lit;src:url(${F('literata-800.woff2')});font-weight:800}
@font-face{font-family:Lit;src:url(${F('literata-600.woff2')});font-weight:600}
@font-face{font-family:Atk;src:url(${F('atkinson-400.woff2')});font-weight:400}
@font-face{font-family:Atk;src:url(${F('atkinson-700.woff2')});font-weight:700}
@font-face{font-family:Atk;src:url(${F('atkinson-400i.woff2')});font-weight:400;font-style:italic}
*{box-sizing:border-box;margin:0;padding:0}
:root{--night:#0f1a35;--night2:#1b2a5c;--em:#0f7a58;--em2:#16a079;--emsoft:#dcefe6;--gold:#c39a45;--gold2:#e5c87e;--champ:#f3e7c6;--ink:#1d2433;--ivory:#fbf6ea}
body{width:1080px;height:1350px;background:var(--ivory);font-family:Atk;color:var(--ink);position:relative;overflow:hidden}
.bgstar{position:absolute;fill:none;stroke:var(--gold);opacity:.13;stroke-width:1.2}
header{height:220px;background:linear-gradient(135deg,var(--night),var(--night2));position:relative;padding:44px 60px;color:#fff;overflow:hidden}
header .ring{position:absolute;right:-70px;top:-90px;width:430px;height:430px;fill:none;stroke:var(--gold);stroke-width:1.4;opacity:.45}
header .ring2{position:absolute;right:20px;top:0;width:250px;height:250px;fill:none;stroke:var(--gold2);stroke-width:1;opacity:.35}
.word{font-family:Lit;font-weight:800;font-size:100px;letter-spacing:6px;line-height:1;color:var(--gold2)}
.word span{color:#fff}
.under{font-size:30px;margin-top:14px;letter-spacing:1px;color:#dfe5f5}
.under b{color:#fff}
.pill{position:absolute;right:60px;top:44px;background:var(--em2);color:#fff;font-weight:700;font-size:26px;padding:10px 22px;border-radius:40px;box-shadow:0 4px 0 rgba(0,0,0,.25)}
main{padding:34px 60px 0;transform-origin:top left}
.blk{background:#fff;border-radius:26px;padding:28px 38px;position:relative;box-shadow:0 6px 0 rgba(15,26,53,.08),0 14px 30px rgba(15,26,53,.08)}
.blk.art{border-left:14px solid var(--gold)}
.tag{display:inline-flex;align-items:center;gap:12px;font-weight:700;font-size:24px;letter-spacing:3px;text-transform:uppercase;color:var(--em)}
.tag svg{width:34px;height:34px}
.ref{font-family:Lit;font-weight:800;font-size:44px;color:var(--night);margin:8px 0 4px;line-height:1.12}
.src{font-size:23px;color:#5b6475}
.quote{font-family:Lit;font-weight:600;font-size:39px;line-height:1.36;color:var(--night);margin-top:16px;position:relative;padding-left:46px}
.quote:before{content:"«";position:absolute;left:-6px;top:-18px;font-size:96px;color:var(--gold);line-height:1}
mark{background:linear-gradient(transparent 52%,var(--champ) 52%);color:inherit;padding:0 4px}
.ok{display:inline-flex;align-items:center;gap:10px;margin-top:16px;font-size:23px;color:var(--em);font-weight:700;background:var(--emsoft);padding:8px 18px;border-radius:30px}
.sticker{position:absolute;right:-18px;top:-26px;transform:rotate(8deg);background:var(--gold);color:var(--night);font-family:Lit;font-weight:800;font-size:28px;padding:12px 22px;border-radius:16px;box-shadow:0 5px 0 rgba(0,0,0,.18)}
.blk.second{margin-top:24px;background:var(--night);color:#fff;border-left:14px solid var(--em2)}
.blk.second .tag{color:var(--gold2)}
.h2{font-family:Lit;font-weight:800;font-size:40px;margin:8px 0 14px;line-height:1.15}
.h2 i{font-style:normal;color:var(--gold2)}
.lat{font-family:Lit;font-weight:800;font-style:italic;font-size:38px;color:var(--gold2);margin:8px 0 6px;line-height:1.2}
.trad{font-size:26px;color:#c3cbe0;margin-bottom:12px;font-style:italic}
.txt{font-size:29px;line-height:1.4;color:#e6eaf6}
.txt b,.memo b{color:var(--gold2)}
.chips{display:flex;gap:18px;margin-top:6px}
.chip{flex:1;background:rgba(255,255,255,.08);border:2px solid rgba(229,200,126,.55);border-radius:20px;padding:12px 12px;text-align:center}
.chip .L{font-family:Lit;font-weight:800;font-size:54px;color:var(--gold2);line-height:1}
.chip .w{font-weight:700;font-size:27px;margin-top:6px}
.chip .s{font-size:21px;color:#c3cbe0;margin-top:4px;line-height:1.25}
.memo{margin-top:16px;font-size:26px;color:#e6eaf6;line-height:1.35}
.duo{display:flex;gap:18px}
.duo>div{flex:1;background:rgba(255,255,255,.08);border-radius:20px;padding:16px 20px;border-top:6px solid var(--gold2)}
.duo>div+div{border-top-color:var(--em2)}
.duo .t{font-family:Lit;font-weight:800;font-size:31px;color:#fff;margin-bottom:8px}
.duo .d{font-size:25px;line-height:1.35;color:#dfe5f5}
.duo .d b{color:var(--gold2)}
.vs{align-self:center;font-family:Lit;font-weight:800;font-size:30px;color:var(--gold2);flex:0 0 auto!important;background:none!important;padding:0!important;border:0!important}
.steps{list-style:none;counter-reset:s;margin-top:4px}
.steps li{counter-increment:s;position:relative;padding:7px 0 7px 62px;font-size:26px;line-height:1.32;color:#e6eaf6}
.steps li b{color:var(--gold2)}
.steps li:before{content:counter(s);position:absolute;left:0;top:6px;width:44px;height:44px;border-radius:50%;background:var(--gold);color:var(--night);font-family:Lit;font-weight:800;font-size:24px;display:flex;align-items:center;justify-content:center}
.aref{font-family:Lit;font-weight:800;font-size:34px;color:var(--gold2);margin:8px 0 10px;line-height:1.2}
.aref small{font-family:Atk;font-weight:700;font-size:20px;background:rgba(255,255,255,.12);color:#fff;padding:4px 12px;border-radius:20px;margin-left:10px;vertical-align:5px}
.lab{font-weight:700;font-size:21px;letter-spacing:2px;text-transform:uppercase;color:var(--gold2);margin-top:10px}
.ci{margin-top:14px;background:rgba(22,160,121,.18);border-radius:16px;padding:12px 18px;font-size:23px;color:#dff3ea;line-height:1.35}
.ci b{color:#fff}
.pg{display:flex;gap:16px;align-items:flex-start;margin-top:10px}
.pg .ic{flex:none;width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:Lit;font-weight:800;font-size:30px}
.pg.x .ic{background:#c4473a;color:#fff}.pg.v .ic{background:var(--em2);color:#fff}
.pg .t{font-size:28px;line-height:1.38;color:#e6eaf6}
.pg.x .t{text-decoration:line-through;text-decoration-color:rgba(196,71,58,.9);text-decoration-thickness:3px;color:#c3cbe0}
.pg .t b{color:var(--gold2)}
.dl{display:flex;gap:26px;align-items:center}
.dl .big{font-family:Lit;font-weight:800;font-size:150px;line-height:.9;color:var(--gold2)}
.dl .u{font-family:Lit;font-weight:800;font-size:34px;color:#fff;margin-top:6px}
.dl .t{font-size:27px;line-height:1.38;color:#e6eaf6}
.dl .t b{color:var(--gold2)}
footer{position:absolute;left:0;right:0;bottom:0;height:150px;background:var(--night);display:flex;align-items:center;padding:0 60px;gap:26px;color:#fff}
footer img{width:84px;height:84px;border-radius:18px}
.sig{flex:1;font-family:Lit;font-weight:600;font-size:29px;line-height:1.3;color:#fff}
.sig b{color:var(--gold2);font-weight:800}
.site{font-size:21px;color:#aab4cf;text-align:right;line-height:1.35}
.site b{color:#fff;font-size:23px}
.frieze{position:absolute;left:0;right:0;bottom:150px;height:12px;background:repeating-linear-gradient(90deg,var(--gold) 0 26px,var(--em2) 26px 52px,var(--night2) 52px 78px)}
.gap{display:inline-block;min-width:130px;border-bottom:5px dashed var(--em2);margin:0 4px;height:1em;vertical-align:-6px}
.qnum{display:inline-flex;width:50px;height:50px;border-radius:50%;background:var(--gold);color:var(--night);font-family:Lit;font-weight:800;font-size:27px;align-items:center;justify-content:center;margin-right:16px;flex:none}
.q{display:flex;align-items:flex-start;margin-top:14px}
.q .qt{font-family:Lit;font-weight:600;font-size:29px;line-height:1.42;color:var(--night)}
.q .qr{font-size:22px;color:#5b6475;margin-top:2px;font-family:Atk}
.answers{margin-top:18px;background:var(--emsoft);border-radius:20px;padding:16px 24px;font-size:21px;line-height:1.4;color:#20473a;transform:rotate(180deg)}
.answers b{color:#0f5a41}
.theme{display:inline-block;background:var(--champ);color:var(--gold-ink,#6e5212);font-weight:700;font-size:24px;padding:6px 16px;border-radius:20px;margin-left:12px;letter-spacing:0;text-transform:none}
.dq{display:flex;align-items:flex-start;margin-top:14px}
.dq .qt{font-size:29px;line-height:1.38;color:#fff}
.vocal{margin-top:18px;border:2px dashed rgba(229,200,126,.7);border-radius:18px;padding:14px 20px;font-size:26px;color:#e6eaf6;line-height:1.35}
.vocal b{color:var(--gold2)}
`;
const icon = {
  scroll: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M10 8h6M10 12h6"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 21h14M6 7h12M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/></svg>',
  split: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M8 3H3v5M21 3l-7 7M3 3l7 7M12 22v-8"/></svg>',
  gavel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 13-7.5 7.5a2.1 2.1 0 0 1-3-3L11 10M16 16l6-6M8 8l6-6M9 7l8 8M21 11l-8-8"/></svg>',
  steps: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></svg>',
  warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h1V3z"/><path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h-1V3z"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>',
};
const LABEL = { notion: ['bulb', 'La notion qui va avec'], adage: ['scale', 'L\'adage qui va avec'], distinction: ['split', 'La distinction qui va avec'],
  arret: ['gavel', 'Le grand arrêt qui va avec'], procedure: ['steps', 'La procédure qui va avec'], piege: ['warn', 'Le piège à éviter'], delai: ['clock', 'Le chiffre à retenir'] };

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const marked = t => esc(t).replace(/\{([^}]+)\}/g, '<mark>$1</mark>');
const stars = () => [[-60, 380, 260], [880, 600, 300], [60, 1000, 200]].map(([x, y, s]) => `<svg class="bgstar" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px" viewBox="0 0 100 100"><path d="${STAR}"/></svg>`).join('');
const head = pill => `<header><svg class="ring" viewBox="0 0 100 100"><path d="${STAR}"/></svg><svg class="ring2" viewBox="0 0 100 100"><path d="${STAR}"/></svg>
  <div class="word">BOI<span>LEAU</span></div><div class="under"><b>La carte du jour</b> · un article à retenir, une notion à comprendre</div><div class="pill">${pill}</div></header>`;
const foot = `<div class="frieze"></div><footer><img src="${LOGO}"><div class="sig"><b>Boileau seul ne fait pas juriste.</b><br>Mais tête vide ne plaide pas.</div><div class="site">Lisân Campus<br><b>lisan-campus.pages.dev</b></div></footer>`;
const page = (pill, body) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>${CSS}</style></head><body>${stars()}${head(pill)}<main>${body}</main>${foot}</body></html>`;

function comp(c) {
  const [ic, lab] = LABEL[c.type];
  let h = `<div class="tag">${icon[ic]} ${lab}</div>`;
  if (c.type === 'notion') h += `<div class="h2">${c.title}</div><div class="chips">${c.chips.map(([L, w, s]) => `<div class="chip"><div class="L">${L}</div><div class="w">${w}</div><div class="s">${s}</div></div>`).join('')}</div>${c.memo ? `<div class="memo">${c.memo}</div>` : ''}`;
  if (c.type === 'adage') h += `<div class="lat">${c.latin}</div><div class="trad">${c.trad}</div><div class="txt">${c.text}</div>`;
  if (c.type === 'distinction') h += `<div class="h2">${c.title}</div><div class="duo"><div><div class="t">${c.a[0]}</div><div class="d">${c.a[1]}</div></div><div class="vs">≠</div><div><div class="t">${c.b[0]}</div><div class="d">${c.b[1]}</div></div></div>`;
  if (c.type === 'arret') h += `<div class="aref">${c.ref}<small>${c.flag}</small></div><div class="lab">Les faits</div><div class="txt">${c.faits}</div><div class="lab">La solution</div><div class="txt">${c.solution}</div><div class="ci"><b>Et en Côte d'Ivoire ?</b> ${c.ci}</div>`;
  if (c.type === 'procedure') h += `<div class="h2">${c.title}</div><ol class="steps">${c.steps.map(s => `<li>${s}</li>`).join('')}</ol>`;
  if (c.type === 'piege') h += `<div class="pg x"><div class="ic">✗</div><div class="t">${c.faux}</div></div><div class="pg v"><div class="ic">✓</div><div class="t">${c.vrai}</div></div>`;
  if (c.type === 'delai') h += `<div class="dl"><div><div class="big">${c.big}</div><div class="u">${c.unit}</div></div><div class="t">${c.text}</div></div>`;
  return h;
}
function daily(card, jour, num) {
  return page(`${jour} · Carte n° ${num} · ${NIVEAU}`, `
  <div class="blk art"><div class="sticker">Fais ton boileau !</div>
    <div class="tag">${icon.scroll} L'article du jour</div>
    <div class="ref">${card.ref}</div><div class="src">${card.src}</div>
    <div class="quote">${marked(card.text)} »</div>
    <div class="ok">${icon.check} Texte en vigueur · vérifié</div>
  </div>
  <div class="blk second">${comp(card.c)}</div>`);
}
// révision : la phrase qui contient le plus de mots surlignés (au plus 2 blancs), le reste coupé
function holes(text) {
  const sentences = text.match(/[^.;:]+[.;:]?/g).map(s => s.trim()).filter(Boolean);
  let best = sentences[0], n = -1;
  for (const s of sentences) { const k = (s.match(/\{/g) || []).length; if (k > n) { n = k; best = s; } }
  const words = []; let i = 0;
  const html = esc(best).replace(/\{([^}]+)\}/g, (m, w) => { if (i++ < 2) { words.push(w); return '<span class="gap"></span>'; } return w; });
  const cut = sentences.length > 1 && best !== sentences[0] ? '… ' : '';
  return { html: cut + html + (sentences[sentences.length - 1] !== best ? ' …' : ''), words };
}
function samedi(sem, w) {
  const items = sem.cartes.map(c => ({ ...holes(c.text), ref: c.ref }));
  return page(`Samedi · Semaine ${w}`, `
  <div class="blk art"><div class="sticker">Sans tricher !</div>
    <div class="tag">${icon.brain} Le boileau de la semaine <span class="theme">${sem.theme}</span></div>
    <div class="ref" style="font-size:40px">Complète de mémoire, puis donne l'article</div>
    ${items.map((it, k) => `<div class="q"><span class="qnum">${k + 1}</span><div><div class="qt">${it.html}</div></div></div>`).join('')}
    <div class="answers"><b>Réponses</b> · ${items.map((it, k) => `${k + 1}. ${esc(it.words.join(', '))} (${esc(it.ref)})`).join(' — ')}</div>
  </div>`);
}
function dimanche(sem, w) {
  return page(`Dimanche · Semaine ${w}`, `
  <div class="blk second" style="margin-top:0">
    <div class="tag">${icon.trophy} Le défi du groupe <span class="theme">${sem.theme}</span></div>
    <div class="h2">Cinq questions, <i>réponds dans le groupe</i></div>
    ${sem.defi.map(([q], k) => `<div class="dq"><span class="qnum">${k + 1}</span><div class="qt">${q}</div></div>`).join('')}
    <div class="vocal"><b>Défi vocal</b> : récite en note vocale l'article de la semaine que tu préfères, avec sa référence complète.</div>
  </div>
  <div class="blk" style="margin-top:22px;padding:18px 30px"><div class="answers" style="margin-top:0"><b>Réponses</b> · ${sem.defi.map(([, a], k) => `${k + 1}. ${a}`).join(' — ')}</div></div>`);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const jobs = []; let num = 0;
  SERIE.forEach((sem, i) => {
    const w = i + 1, W = String(w).padStart(2, '0');
    sem.cartes.forEach((c, d) => { num++; jobs.push([`s${W}-${d + 1}-${JOURS[d].toLowerCase()}`, daily(c, JOURS[d], num)]); });
    jobs.push([`s${W}-6-samedi`, samedi(sem, w)], [`s${W}-7-dimanche`, dimanche(sem, w)]);
  });
  const report = [];
  for (const [name, html] of jobs) {
    const f = path.join(OUT, name + '.html'); fs.writeFileSync(f, html);
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    const z = await p.evaluate(() => {
      const m = document.querySelector('main'), lim = document.querySelector('.frieze').getBoundingClientRect().top - 18;
      let z = 1; m.style.zoom = 1;
      while (m.getBoundingClientRect().bottom > lim && z > 0.62) { z -= 0.02; m.style.zoom = z; }
      return [Math.round(z * 100), m.getBoundingClientRect().bottom <= lim];
    });
    await p.screenshot({ path: path.join(OUT, name + '.png') });
    fs.unlinkSync(f);
    report.push(`${name} ${z[0]}%${z[1] ? '' : ' DÉBORDE'}`);
  }
  await b.close();
  console.log(report.filter(r => !/ 100%$/.test(r)).join('\n') || 'toutes à 100 %');
  console.log(jobs.length, 'cartes');
})();
