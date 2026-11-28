// BOILEAU · la carte du jour (prototype) : cartes 1080 × 1350 aux couleurs de Lisân Campus.
// Usage : NODE_PATH=$(npm root -g) node cartes.js  → carte-*.png
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const SITE = '/home/claude/lisan-campus/site';
const F = n => 'file://' + path.join(SITE, 'fonts', n);
const LOGO = 'file://' + path.join(SITE, 'icon-512.png');
const STAR = 'M50 2 63 15h22v22l13 13-13 13v22H63L50 98 37 85H15V63L2 50l13-13V15h22z';
const SIGN = ['Boileau seul ne fait pas juriste.', 'Mais tête vide ne plaide pas.'];

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
main{padding:34px 60px 0}
.blk{background:#fff;border-radius:26px;padding:28px 38px 28px;position:relative;box-shadow:0 6px 0 rgba(15,26,53,.08),0 14px 30px rgba(15,26,53,.08)}
.blk.art{border-left:14px solid var(--gold)}
.tag{display:inline-flex;align-items:center;gap:12px;font-weight:700;font-size:24px;letter-spacing:3px;text-transform:uppercase;color:var(--em)}
.tag svg{width:34px;height:34px}
.ref{font-family:Lit;font-weight:800;font-size:46px;color:var(--night);margin:8px 0 4px;line-height:1.1}
.src{font-size:24px;color:#5b6475}
.quote{font-family:Lit;font-weight:600;font-size:39px;line-height:1.36;color:var(--night);margin-top:16px;position:relative;padding-left:46px}
.quote:before{content:"«";position:absolute;left:-6px;top:-18px;font-size:96px;color:var(--gold);line-height:1}
mark{background:linear-gradient(transparent 52%,var(--champ) 52%);color:inherit;padding:0 4px}
.ok{display:inline-flex;align-items:center;gap:10px;margin-top:16px;font-size:23px;color:var(--em);font-weight:700;background:var(--emsoft);padding:8px 18px;border-radius:30px}
.sticker{position:absolute;right:-18px;top:-26px;transform:rotate(8deg);background:var(--gold);color:var(--night);font-family:Lit;font-weight:800;font-size:28px;padding:12px 22px;border-radius:16px;box-shadow:0 5px 0 rgba(0,0,0,.18)}
.blk.second{margin-top:24px;background:var(--night);color:#fff;border-left:14px solid var(--em2)}
.blk.second .tag{color:var(--gold2)}
.h2{font-family:Lit;font-weight:800;font-size:40px;margin:8px 0 14px;line-height:1.15}
.h2 i{font-style:normal;color:var(--gold2)}
.txt{font-size:29px;line-height:1.4;color:#e6eaf6}
.txt b{color:#fff}
.chips{display:flex;gap:18px;margin-top:6px}
.chip{flex:1;background:rgba(255,255,255,.08);border:2px solid rgba(229,200,126,.55);border-radius:20px;padding:12px 12px;text-align:center}
.chip .L{font-family:Lit;font-weight:800;font-size:54px;color:var(--gold2);line-height:1}
.chip .w{font-weight:700;font-size:27px;margin-top:6px}
.chip .s{font-size:21px;color:#c3cbe0;margin-top:4px}
.memo{margin-top:16px;font-size:26px;color:#e6eaf6}
.memo b{color:var(--gold2)}
footer{position:absolute;left:0;right:0;bottom:0;height:150px;background:var(--night);display:flex;align-items:center;padding:0 60px;gap:26px;color:#fff}
footer img{width:84px;height:84px;border-radius:18px}
.sig{flex:1;font-family:Lit;font-weight:600;font-size:29px;line-height:1.3;color:#fff}
.sig b{color:var(--gold2);font-weight:800}
.site{font-size:21px;color:#aab4cf;text-align:right;line-height:1.35}
.site b{color:#fff;font-size:23px}
.frieze{position:absolute;left:0;right:0;bottom:150px;height:12px;background:repeating-linear-gradient(90deg,var(--gold) 0 26px,var(--em2) 26px 52px,var(--night2) 52px 78px)}
/* révision */
.gap{display:inline-block;min-width:150px;border-bottom:5px dashed var(--em2);margin:0 6px;height:1em;vertical-align:-6px}
.qnum{display:inline-flex;width:56px;height:56px;border-radius:50%;background:var(--gold);color:var(--night);font-family:Lit;font-weight:800;font-size:30px;align-items:center;justify-content:center;margin-right:16px;flex:none}
.q{display:flex;align-items:flex-start;margin-top:16px}
.q .qt{font-family:Lit;font-weight:600;font-size:33px;line-height:1.45;color:var(--night)}
.q .qr{font-size:24px;color:#5b6475;margin-top:4px;font-family:Atk}
.answers{margin-top:18px;background:var(--emsoft);border-radius:20px;padding:20px 26px;font-size:24px;color:#20473a;transform:rotate(180deg)}
.week{display:flex;gap:12px;margin-top:4px}
.day{flex:1;border-radius:16px;background:rgba(255,255,255,.08);padding:14px 8px;text-align:center;border:2px solid rgba(255,255,255,.12)}
.day .d{font-weight:700;font-size:22px;color:var(--gold2)}
.day .n{font-size:20px;color:#dfe5f5;margin-top:4px;line-height:1.25}
`;

const icon = {
  scroll: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M10 8h6M10 12h6"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 21h14M6 7h12M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h1V3z"/><path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h-1V3z"/></svg>',
};
const stars = () => [[-60, 380, 260], [880, 600, 300], [60, 1000, 200]].map(([x, y, s]) => `<svg class="bgstar" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px" viewBox="0 0 100 100"><path d="${STAR}"/></svg>`).join('');
const head = (pill) => `<header><svg class="ring" viewBox="0 0 100 100"><path d="${STAR}"/></svg><svg class="ring2" viewBox="0 0 100 100"><path d="${STAR}"/></svg>
  <div class="word">BOI<span>LEAU</span></div><div class="under"><b>La carte du jour</b> · un article à retenir, une notion à comprendre</div><div class="pill">${pill}</div></header>`;
const foot = `<div class="frieze"></div><footer><img src="${LOGO}"><div class="sig"><b>${SIGN[0]}</b><br>${SIGN[1]}</div><div class="site">Lisân Campus<br><b>lisan-campus.pages.dev</b></div></footer>`;
const page = body => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>${CSS}</style></head><body>${stars()}${body}${foot}</body></html>`;

const CARDS = {
  'carte-1-lundi': page(head('Lundi · Carte n° 1 · L1') + `<main>
  <div class="blk art"><div class="sticker">Fais ton boileau !</div>
    <div class="tag">${icon.scroll} L'article du jour</div>
    <div class="ref">Code civil, article 1382</div>
    <div class="src">Responsabilité civile délictuelle · Code civil applicable en Côte d'Ivoire</div>
    <div class="quote">Tout <mark>fait quelconque</mark> de l'homme, qui cause à autrui un <mark>dommage</mark>, oblige celui par la <mark>faute</mark> duquel il est arrivé à le <mark>réparer</mark>. »</div>
    <div class="ok">${icon.check} Texte en vigueur · vérifié</div>
  </div>
  <div class="blk second"><div class="tag">${icon.bulb} La notion qui va avec</div>
    <div class="h2">Trois conditions, <i>pas une de moins</i></div>
    <div class="chips">
      <div class="chip"><div class="L">F</div><div class="w">Faute</div><div class="s">un comportement fautif</div></div>
      <div class="chip"><div class="L">D</div><div class="w">Dommage</div><div class="s">un préjudice certain</div></div>
      <div class="chip"><div class="L">L</div><div class="w">Lien</div><div class="s">de causalité : l\'un cause l\'autre</div></div>
    </div>
    <div class="memo">Pour retenir : <b>F · D · L</b>. Il en manque une ? La victime n'obtient pas réparation.</div>
  </div></main>`),

  'carte-2-mardi': page(head('Mardi · Carte n° 2 · L1') + `<main>
  <div class="blk art"><div class="sticker">Fais ton boileau !</div>
    <div class="tag">${icon.scroll} L'article du jour</div>
    <div class="ref">Constitution, article 7, alinéa 1er</div>
    <div class="src">Constitution du 8 novembre 2016, révisée en 2020 et en 2023</div>
    <div class="quote">Nul ne peut être <mark>poursuivi</mark>, <mark>arrêté</mark>, <mark>gardé à vue</mark> ou <mark>inculpé</mark>, qu'en vertu d'une <mark>loi promulguée antérieurement</mark> aux faits qui lui sont reprochés. »</div>
    <div class="ok">${icon.check} Texte en vigueur · vérifié</div>
  </div>
  <div class="blk second"><div class="tag">${icon.scale} L'adage qui va avec</div>
    <div class="h2"><i>Nullum crimen, nulla poena sine lege</i></div>
    <div class="txt">« Pas de crime, pas de peine sans loi. » C'est le <b>principe de légalité des délits et des peines</b> : on ne peut être puni que pour un fait que la loi interdisait <b>déjà</b> au moment où on l'a commis. Une loi d'aujourd'hui ne punit pas le fait d'hier.</div>
  </div></main>`),

  'carte-3-samedi': page(head('Samedi · Révision') + `<main>
  <div class="blk art" style="padding-bottom:30px"><div class="sticker">Sans tricher !</div>
    <div class="tag">${icon.brain} Le boileau de la semaine</div>
    <div class="ref" style="font-size:44px">Complète de mémoire</div>
    <div class="q"><span class="qnum">1</span><div><div class="qt">Tout fait quelconque de l'homme, qui cause à <span class="gap"></span> un dommage, oblige celui par la <span class="gap"></span> duquel il est arrivé à le <span class="gap"></span>.</div><div class="qr">Code civil, article ?</div></div></div>
    <div class="q"><span class="qnum">2</span><div><div class="qt">Nul ne peut être poursuivi, arrêté, gardé à vue ou inculpé, qu'en vertu d'une loi <span class="gap"></span> antérieurement aux faits.</div><div class="qr">Constitution, article ? · et l'adage latin ?</div></div></div>
    <div class="answers">Réponses : 1. autrui · faute · réparer (Code civil, art. 1382) — 2. promulguée (Constitution, art. 7, al. 1er) · Nullum crimen, nulla poena sine lege</div>
  </div>
  <div class="blk second" style="margin-top:26px"><div class="tag">${icon.bulb} Le rythme Boileau</div>
    <div class="week">
      <div class="day"><div class="d">Lun</div><div class="n">article + notion</div></div>
      <div class="day"><div class="d">Mar</div><div class="n">article + adage</div></div>
      <div class="day"><div class="d">Mer</div><div class="n">article + distinction</div></div>
      <div class="day"><div class="d">Jeu</div><div class="n">article + grand arrêt</div></div>
      <div class="day"><div class="d">Ven</div><div class="n">article + délai ou piège</div></div>
      <div class="day" style="border-color:var(--gold2)"><div class="d">Sam</div><div class="n">textes à trous</div></div>
      <div class="day" style="border-color:var(--gold2)"><div class="d">Dim</div><div class="n">défi du groupe</div></div>
    </div>
  </div></main>`),
};

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  for (const [name, html] of Object.entries(CARDS)) {
    const f = path.join(__dirname, name + '.html'); fs.writeFileSync(f, html);
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    const over = await p.evaluate(() => { const m = document.querySelector('main'); const fo = document.querySelector('.frieze'); return Math.round(m.getBoundingClientRect().bottom - fo.getBoundingClientRect().top); });
    await p.screenshot({ path: path.join(__dirname, name + '.png') });
    console.log(name, over > -10 ? 'DÉBORDE de ' + (over + 10) + ' px' : 'ok, marge ' + (-over) + ' px');
  }
  await b.close();
})();
