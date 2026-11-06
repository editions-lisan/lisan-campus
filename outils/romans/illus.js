// Illustrations du roman « The Missing Will » (couverture, pages de partie, vignettes de chapitre).
// node outils/romans/illus.js  → écrit les SVG dans site/img/romans/
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '../../site/img/romans');
const R = n => Math.round(n * 10) / 10;

// ---------- éléments réutilisables ----------
function palm(x, y, h, lean, col, w = 1) {
  const tx = x + lean, ty = y - h;
  let s = `<path d="M${x - 9 * w} ${y} Q${R(x + lean * .2)} ${R(y - h * .55)} ${R(tx - 3 * w)} ${ty} L${R(tx + 3 * w)} ${ty} Q${R(x + lean * .25 + 10 * w)} ${R(y - h * .55)} ${x + 9 * w} ${y} Z" fill="${col}"/>`;
  const fr = [[-160, .95], [-130, 1.1], [-100, .9], [-60, 1.05], [-20, 1.1], [15, .95], [-80, .7], [40, .8], [-195, .8]];
  fr.forEach(([a, l]) => {
    const L = h * .42 * l * w, rad = a * Math.PI / 180;
    const ex = tx + Math.cos(rad) * L, ey = ty + Math.sin(rad) * L + L * .35;
    const mx = tx + Math.cos(rad) * L * .5, my = ty + Math.sin(rad) * L * .5 - L * .12;
    const nx = -Math.sin(rad) * L * .09, ny = Math.cos(rad) * L * .09;
    s += `<path d="M${R(tx)} ${R(ty)} Q${R(mx + nx)} ${R(my + ny)} ${R(ex)} ${R(ey)} Q${R(mx - nx)} ${R(my - ny)} ${R(tx)} ${R(ty)} Z" fill="${col}"/>`;
  });
  return s;
}
function blob(cx, cy, r, col, seed = 1, n = 9) {
  let s = '', k = seed;
  const rnd = () => (k = (k * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rnd(), d = r * (.35 + rnd() * .45);
    s += `<circle cx="${R(cx + Math.cos(a) * d)}" cy="${R(cy + Math.sin(a) * d * .7)}" r="${R(r * (.42 + rnd() * .25))}" fill="${col}"/>`;
  }
  return s + `<circle cx="${cx}" cy="${cy}" r="${R(r * .6)}" fill="${col}"/>`;
}
function cocoa(x, y, s, col, pod) {
  let o = `<path d="M${x - 6 * s} ${y} L${x - 3 * s} ${y - 60 * s} L${x + 3 * s} ${y - 60 * s} L${x + 6 * s} ${y} Z" fill="${col}"/>`;
  o += blob(x, y - 85 * s, 48 * s, col, Math.round(x + y));
  if (pod) [[-8, -42], [7, -36], [-2, -28]].forEach(([dx, dy]) => o += `<ellipse cx="${x + dx * s}" cy="${y + dy * s}" rx="${4 * s}" ry="${8 * s}" fill="${pod}"/>`);
  return o;
}
function person(x, y, s, body, head = '#3b2418', sit = false) {
  const h = sit ? 34 : 52;
  return `<path d="M${x - 11 * s} ${y} Q${x - 12 * s} ${y - h * s} ${x} ${y - (h + 4) * s} Q${x + 12 * s} ${y - h * s} ${x + 11 * s} ${y} Z" fill="${body}"/><circle cx="${x}" cy="${y - (h + 13) * s}" r="${8.5 * s}" fill="${head}"/>`;
}
const svg = (w, h, body, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" ${extra}>${body}</svg>\n`;

// ---------- couverture ----------
function cover(withText) {
  const W = 1480, H = 2100;
  let b = `<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16152f"/><stop offset=".38" stop-color="#3b2b55"/><stop offset=".58" stop-color="#a24a3e"/><stop offset=".69" stop-color="#eea24b"/></linearGradient>
<linearGradient id="riv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6c66c"/><stop offset=".5" stop-color="#d77a43"/><stop offset="1" stop-color="#6b3346"/></linearGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".75"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  let k = 7; const rnd = () => (k = (k * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 90; i++) { const x = rnd() * W, y = rnd() * 950, r = .8 + rnd() * 2.6; b += `<circle cx="${R(x)}" cy="${R(y)}" r="${R(r)}" fill="#fff4d6" opacity="${R(.25 + rnd() * .6)}"/>`; }
  b += `<circle cx="740" cy="1360" r="420" fill="url(#glow)"/><circle cx="740" cy="1360" r="215" fill="#f9d585"/>`;
  b += `<path d="M0 1350 Q200 1290 420 1335 T860 1320 T1480 1310 L1480 1500 L0 1500 Z" fill="#7d3c4c"/>`;
  b += `<path d="M0 1420 Q260 1370 520 1405 T1000 1395 T1480 1385 L1480 1600 L0 1600 Z" fill="#4c2740"/>`;
  // berges
  b += `<path d="M0 1450 L700 1440 Q560 1600 610 1760 Q660 1930 420 2100 L0 2100 Z" fill="#1f1424"/>`;
  b += `<path d="M1480 1440 L790 1440 Q930 1600 900 1760 Q860 1930 1130 2100 L1480 2100 Z" fill="#1a1220"/>`;
  b += `<path d="M700 1440 L790 1440 Q930 1600 900 1760 Q860 1930 1130 2100 L420 2100 Q660 1930 610 1760 Q560 1600 700 1440 Z" fill="url(#riv)"/>`;
  [[1500, 6], [1580, 10], [1680, 14], [1800, 18], [1950, 24]].forEach(([y, l]) => b += `<path d="M${740 - l * 5} ${y} h${l * 6}" stroke="#ffe3a3" stroke-width="${l / 4}" stroke-linecap="round" opacity=".55"/>`);
  const C = '#120b16';
  b += cocoa(120, 1500, 1.5, C) + cocoa(330, 1470, 1.1, C) + cocoa(470, 1460, .8, C) + cocoa(1010, 1460, .9, C) + cocoa(1180, 1480, 1.25, C) + cocoa(1390, 1510, 1.6, C);
  b += palm(250, 1700, 420, 60, C, 1.2) + palm(1270, 1720, 470, -70, C, 1.3) + palm(560, 1480, 180, 15, C, .6);
  b += cocoa(70, 1900, 2.6, '#0d0810', '#c9702e') + cocoa(1420, 1930, 2.8, '#0d0810', '#c9702e');
  // le testament sur la berge
  b += `<g transform="translate(980 1880) rotate(-9)"><rect x="0" y="0" width="300" height="200" rx="6" fill="#f4e6c4"/><path d="M0 0 L300 0 L300 40 L0 40 Z" fill="#e8d4a6"/>`;
  for (let i = 0; i < 6; i++) b += `<path d="M30 ${70 + i * 20} h${i === 5 ? 120 : 240}" stroke="#8a6d4a" stroke-width="4" stroke-linecap="round"/>`;
  b += `<circle cx="245" cy="168" r="26" fill="#a3262a"/><circle cx="245" cy="168" r="15" fill="none" stroke="#d65a4d" stroke-width="4"/><path d="M232 190 l-10 34 l18 -12 l10 16 l4 -36" fill="#a3262a"/></g>`;
  if (withText) {
    b += `<text x="740" y="250" text-anchor="middle" font-family="Literata, Georgia, serif" font-size="40" letter-spacing="10" fill="#f0c877">LEGAL STORIES FROM ABIDJAN</text>`;
    b += `<text x="740" y="560" text-anchor="middle" font-family="Literata, Georgia, serif" font-style="italic" font-size="190" fill="#fbf1dc">The Missing</text><text x="740" y="760" text-anchor="middle" font-family="Literata, Georgia, serif" font-style="italic" font-size="190" fill="#fbf1dc">Will</text>`;
    b += `<text x="740" y="900" text-anchor="middle" font-family="Literata, Georgia, serif" font-size="52" letter-spacing="6" fill="#f0c877">MOUHAMADOU CISSEMA</text>`;
  }
  return svg(W, H, b, withText ? 'role="img" aria-label="The Missing Will — couverture"' : 'aria-hidden="true"');
}

// ---------- Partie 1 : la cour et le manguier ----------
function part1() {
  const W = 1000, H = 1150;
  let b = `<defs><linearGradient id="s1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3c3a6a"/><stop offset=".45" stop-color="#c26b4a"/><stop offset=".7" stop-color="#f2c27a"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#s1)"/><circle cx="820" cy="520" r="70" fill="#fbe0a0" opacity=".9"/>`;
  b += palm(80, 640, 260, 25, '#5b3550', .8) + palm(940, 650, 300, -30, '#5b3550', .9) + palm(700, 600, 200, 10, '#6a3d55', .6);
  b += `<rect x="0" y="600" width="${W}" height="60" fill="#6a3d55"/>`;
  // maison
  b += `<rect x="500" y="560" width="470" height="300" fill="#d79c5a"/><rect x="500" y="820" width="470" height="40" fill="#b9793f"/>`;
  b += `<path d="M470 575 L990 530 L990 560 L470 605 Z" fill="#8d939b"/>`;
  for (let i = 0; i < 13; i++) b += `<path d="M${490 + i * 40} ${R(603 - i * 3.6)} L${490 + i * 40} ${R(573 - i * 3.6)}" stroke="#6e737a" stroke-width="3"/>`;
  b += `<rect x="560" y="640" width="90" height="110" fill="#4a2c1d"/><rect x="565" y="645" width="38" height="100" fill="#6b4a2e"/><rect x="607" y="645" width="38" height="100" fill="#6b4a2e"/>`;
  b += `<rect x="830" y="630" width="70" height="230" fill="#5a3522"/><circle cx="888" cy="750" r="5" fill="#e0b25a"/><rect x="700" y="650" width="90" height="90" fill="#3b4a5e"/><path d="M745 650 v90 M700 695 h90" stroke="#d79c5a" stroke-width="5"/>`;
  b += `<rect x="0" y="840" width="${W}" height="${H - 840}" fill="#c98b51"/><path d="M0 860 Q500 845 1000 870" stroke="#b67a43" stroke-width="6" fill="none"/>`;
  // ombre + manguier
  b += `<ellipse cx="400" cy="985" rx="380" ry="120" fill="#7b4f2c" opacity=".45"/>`;
  b += `<path d="M290 1010 Q300 860 280 700 L330 700 Q330 860 350 1010 Z" fill="#4d3020"/><path d="M300 760 Q230 700 200 640 M320 740 Q390 690 430 620" stroke="#4d3020" stroke-width="22" fill="none" stroke-linecap="round"/>`;
  b += blob(320, 470, 300, '#2d4728', 3, 14) + blob(250, 430, 170, '#3a5a31', 5, 8) + blob(420, 420, 150, '#3a5a31', 11, 8);
  [[210, 560], [380, 590], [460, 520], [150, 470], [300, 600]].forEach(([x, y]) => b += `<ellipse cx="${x}" cy="${y}" rx="11" ry="15" fill="#e8a83a"/>`);
  // cercle de chaises
  const cx = 470, cy = 990, rx = 330, ry = 95, N = 11;
  const seats = [];
  for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2 + .3; seats.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, Math.sin(a), i]); }
  seats.sort((p, q) => p[2] - q[2]).forEach(([x, y, d, i]) => {
    const s = .9 + d * .18, col = i % 3 === 0 ? '#3d6fa8' : '#f3efe6';
    b += `<rect x="${R(x - 16 * s)}" y="${R(y - 52 * s)}" width="${R(32 * s)}" height="${R(30 * s)}" rx="${R(5 * s)}" fill="${col}"/><rect x="${R(x - 18 * s)}" y="${R(y - 24 * s)}" width="${R(36 * s)}" height="${R(8 * s)}" fill="${col}"/><path d="M${R(x - 15 * s)} ${R(y - 16 * s)} v${R(16 * s)} M${R(x + 15 * s)} ${R(y - 16 * s)} v${R(16 * s)}" stroke="${col}" stroke-width="${R(4 * s)}"/>`;
    if (i % 2 === 0 || i === 3) { const pc = ['#7a2f3a', '#1f5a5a', '#c0612e', '#4b3a7a', '#2f5d3a'][i % 5]; b += person(x, y - 20 * s, s * 1.05, pc, '#2e1a12', true); }
  });
  b += person(560, 1100, 1.5, '#e6e0d2', '#2e1a12') + `<path d="M545 1050 h30" stroke="#b5532f" stroke-width="6"/>`;
  return svg(W, H, b, 'role="img" aria-label="La cour de la maison de Bouaké et le conseil de famille sous le manguier"');
}

// ---------- Partie 2 : la route de Bouaké ----------
function part2() {
  const W = 1000, H = 1150;
  let b = `<defs><linearGradient id="s2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb3d5"/><stop offset=".55" stop-color="#d9ecf2"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#s2)"/><circle cx="800" cy="170" r="70" fill="#fff3c4"/>`;
  [[180, 200, 1], [520, 140, .8], [700, 300, .6]].forEach(([x, y, s]) => b += `<g fill="#fff" opacity=".9"><ellipse cx="${x}" cy="${y}" rx="${90 * s}" ry="${28 * s}"/><ellipse cx="${x - 40 * s}" cy="${y - 18 * s}" rx="${45 * s}" ry="${28 * s}"/><ellipse cx="${x + 30 * s}" cy="${y - 25 * s}" rx="${50 * s}" ry="${32 * s}"/></g>`);
  b += `<path d="M0 560 Q250 500 500 540 T1000 520 L1000 650 L0 650 Z" fill="#8aa37a"/><path d="M0 600 Q300 570 600 600 T1000 590 L1000 ${H} L0 ${H} Z" fill="#c9b86a"/>`;
  b += `<path d="M0 760 Q300 720 520 760 T1000 740 L1000 ${H} L0 ${H} Z" fill="#b5a457"/>`;
  // route
  b += `<path d="M470 600 L530 600 L900 ${H} L100 ${H} Z" fill="#b8562f"/><path d="M490 600 L510 600 L640 ${H} L360 ${H} Z" fill="#c8693c"/>`;
  for (let i = 0; i < 7; i++) { const t = i / 7, y = 610 + Math.pow(t, 1.6) * 540, w = 2 + t * 14; b += `<rect x="${R(500 - w / 2)}" y="${R(y)}" width="${R(w)}" height="${R(8 + t * 40)}" fill="#f2d7a8" opacity=".7"/>`; }
  // baobab
  b += `<path d="M120 640 Q110 520 135 470 L185 470 Q205 520 195 640 Z" fill="#6b5240"/><path d="M140 480 Q100 430 70 420 M150 470 Q140 410 150 380 M180 470 Q200 420 240 400 M175 480 Q230 470 260 450" stroke="#6b5240" stroke-width="14" fill="none" stroke-linecap="round"/>` + blob(160, 395, 80, '#58703f', 4, 7);
  b += palm(820, 640, 230, -20, '#4f6b3a', .8) + palm(880, 660, 190, 25, '#4f6b3a', .7) + palm(320, 620, 120, 10, '#5d774a', .45);
  b += cocoa(640, 600, .5, '#5d774a') + cocoa(380, 605, .45, '#5d774a') + cocoa(60, 700, 1, '#4f6b3a');
  // car
  b += `<g transform="translate(470 770)"><rect x="0" y="0" width="220" height="110" rx="18" fill="#e9eef2"/><rect x="0" y="62" width="220" height="16" fill="#2f7a4a"/><rect x="0" y="80" width="220" height="10" fill="#e3a52f"/>`;
  for (let i = 0; i < 5; i++) b += `<rect x="${14 + i * 40}" y="14" width="32" height="38" rx="4" fill="#3c5466"/>`;
  b += `<rect x="186" y="14" width="28" height="60" rx="4" fill="#3c5466"/><circle cx="48" cy="112" r="20" fill="#222"/><circle cx="48" cy="112" r="8" fill="#888"/><circle cx="172" cy="112" r="20" fill="#222"/><circle cx="172" cy="112" r="8" fill="#888"/><rect x="40" y="-14" width="140" height="14" rx="4" fill="#7a5a3a"/><rect x="50" y="-26" width="40" height="14" fill="#c0612e"/><rect x="100" y="-24" width="50" height="12" fill="#3d6fa8"/></g>`;
  // panneau
  b += `<rect x="842" y="820" width="12" height="190" fill="#666"/><rect x="740" y="760" width="230" height="100" rx="10" fill="#1f6b45" stroke="#fff" stroke-width="6"/><text x="855" y="805" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="36" fill="#fff">BOUAKÉ</text><text x="855" y="843" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#fff">112 km</text>`;
  b += person(230, 960, 1.6, '#c0612e', '#3a2418') + `<ellipse cx="230" cy="852" rx="38" ry="11" fill="#d9a93a"/><ellipse cx="220" cy="842" rx="12" ry="8" fill="#8a5a2a"/><ellipse cx="240" cy="844" rx="12" ry="8" fill="#9a6a32"/>`;
  return svg(W, H, b, 'role="img" aria-label="La route de Bouaké, un car et un panneau indicateur"');
}

// ---------- Partie 3 : le palais de justice ----------
function part3() {
  const W = 1000, H = 1150;
  let b = `<defs><linearGradient id="s3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d9fd0"/><stop offset=".6" stop-color="#cfe6f2"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#s3)"/>`;
  b += `<rect x="0" y="760" width="${W}" height="${H - 760}" fill="#c99a62"/>`;
  // drapeau
  b += `<rect x="497" y="210" width="8" height="250" fill="#555"/><circle cx="501" cy="206" r="8" fill="#c9a23a"/><path d="M505 218 Q560 228 620 218 L620 298 Q560 308 505 298 Z" fill="#fff"/><path d="M505 218 Q525 222 545 223 L545 303 Q525 302 505 298 Z" fill="#f08a24"/><path d="M580 224 Q600 222 620 218 L620 298 Q600 302 580 304 Z" fill="#2f9a4a"/>`;
  // bâtiment
  b += `<rect x="90" y="470" width="820" height="300" fill="#f5f2ea"/><rect x="70" y="440" width="860" height="38" fill="#e4dfd2"/><rect x="330" y="400" width="340" height="50" fill="#e4dfd2"/><rect x="350" y="380" width="300" height="24" fill="#d8d2c2"/>`;
  b += `<text x="500" y="436" text-anchor="middle" font-family="Georgia, serif" font-size="24" letter-spacing="4" fill="#7a6a50">PALAIS DE JUSTICE</text>`;
  for (let i = 0; i < 9; i++) { const x = 120 + i * 88; if (i === 4) continue; b += `<rect x="${x}" y="510" width="44" height="190" rx="22" fill="#3d5266"/><rect x="${x}" y="510" width="44" height="190" rx="22" fill="none" stroke="#c9c2b0" stroke-width="5"/><path d="M${x + 22} 515 v185" stroke="#c9c2b0" stroke-width="3"/>`; }
  b += `<rect x="452" y="560" width="96" height="210" rx="6" fill="#5a3a26"/><path d="M500 560 v210" stroke="#3a2416" stroke-width="4"/>`;
  for (let i = 0; i < 6; i++) b += `<rect x="${360 - i * 18}" y="${770 + i * 18}" width="${280 + i * 36}" height="18" fill="${i % 2 ? '#e2dccd' : '#ece7da'}"/>`;
  b += palm(40, 800, 440, 20, '#3e6332', 1.1) + palm(960, 800, 460, -20, '#3e6332', 1.15) + blob(160, 760, 70, '#4f7a3a', 2, 6) + blob(850, 765, 75, '#4f7a3a', 9, 6);
  b += person(440, 830, 1.1, '#1d1d1d', '#2e1a12') + person(470, 832, 1, '#7a2f3a', '#2e1a12') + person(600, 865, 1.15, '#c0612e', '#2e1a12') + person(630, 870, 1.05, '#d9d2c2', '#2e1a12');
  b += person(250, 1000, 1.7, '#1d1d1d', '#2e1a12') + `<rect x="262" y="930" width="34" height="26" rx="3" fill="#7a5a3a"/>`;
  return svg(W, H, b, 'role="img" aria-label="Le palais de justice de Bouaké"');
}

// ---------- vignettes de chapitre (trait d’encre, une couleur) ----------
const INK = '#3a2a20', OCH = '#d79a3b', TER = '#b5532f', BLU = '#2f5d8a', GRN = '#5b7a3a';
const V = body => svg(240, 140, `<g fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${body}</g>`, 'aria-hidden="true"');
const VIG = {
  prologue: V(`<path d="M60 110 Q40 60 90 30 Q110 70 60 110 Z" fill="${GRN}" fill-opacity=".35"/><path d="M60 110 Q75 70 90 30"/><path d="M180 112 Q210 70 165 32 Q140 72 180 112 Z" fill="${GRN}" fill-opacity=".35"/><path d="M180 112 Q170 72 165 32"/><path d="M120 22 Q160 60 120 124 Q80 60 120 22 Z" fill="${OCH}" fill-opacity=".55"/><path d="M120 24 V122 M104 40 Q96 72 110 112 M136 40 Q144 72 130 112"/><path d="M120 22 v-12"/>`),
  ch1: V(`<rect x="62" y="22" width="96" height="100" rx="6" fill="#f4ead2"/><path d="M62 22 h-0" /><path d="M78 46 h64 M78 62 h64 M78 78 h64 M78 94 h40"/>${[0, 1, 2, 3, 4].map(i => `<circle cx="62" cy="${34 + i * 20}" r="4"/>`).join('')}<path d="M150 118 L196 36 L206 42 L160 124 L148 130 Z" fill="${BLU}" fill-opacity=".45"/><path d="M196 36 l4 -8 l10 6 l-4 8"/>`),
  ch2: V(`<path d="M118 122 Q122 92 116 70 M126 122 Q126 92 132 70"/><path d="M70 66 Q60 30 100 26 Q120 6 146 24 Q186 26 176 62 Q170 82 140 76 Q120 88 100 78 Q72 86 70 66 Z" fill="${GRN}" fill-opacity=".35"/><circle cx="104" cy="58" r="4" fill="${OCH}"/><circle cx="150" cy="52" r="4" fill="${OCH}"/>${[[40, 120], [72, 126], [176, 126], [206, 120]].map(([x, y]) => `<path d="M${x - 9} ${y - 28} v16 h18 v-16 M${x - 11} ${y - 12} h22 M${x - 8} ${y - 12} v12 M${x + 8} ${y - 12} v12"/>`).join('')}`),
  ch3: V(`<rect x="50" y="88" width="140" height="28" rx="3" fill="#e9dcc0"/><path d="M62 96 h80"/><rect x="62" y="56" width="120" height="32" rx="3" fill="${TER}" fill-opacity=".7"/><path d="M76 64 v16 M168 64 v16"/><path d="M120 50 V14 M92 24 h56 M92 24 l-12 22 h24 Z M148 24 l-12 22 h24 Z" /><circle cx="120" cy="12" r="3"/>`),
  ch4: V(`<path d="M20 118 h200" stroke-dasharray="14 10"/><rect x="40" y="40" width="160" height="64" rx="12" fill="#eef1f3"/><path d="M40 82 h160" stroke="${GRN}" stroke-width="6"/>${[0, 1, 2, 3].map(i => `<rect x="${52 + i * 30}" y="50" width="22" height="22" rx="3" fill="${BLU}" fill-opacity=".35"/>`).join('')}<rect x="174" y="50" width="16" height="40" rx="3" fill="${BLU}" fill-opacity=".35"/><circle cx="76" cy="106" r="11" fill="#fff"/><circle cx="168" cy="106" r="11" fill="#fff"/><rect x="70" y="28" width="90" height="12" rx="3" fill="${OCH}" fill-opacity=".5"/>`),
  ch5: V(`<path d="M70 126 V30 H170 V126"/><rect x="90" y="44" width="60" height="82" fill="${BLU}" fill-opacity=".75"/><rect x="98" y="54" width="20" height="28"/><rect x="122" y="54" width="20" height="28"/><rect x="98" y="88" width="20" height="28"/><rect x="122" y="88" width="20" height="28"/><circle cx="142" cy="86" r="2.5" fill="${OCH}"/><rect x="82" y="12" width="76" height="14" rx="2" fill="#f4ead2"/><path d="M50 126 h140"/>`),
  ch6: V(`<rect x="44" y="30" width="152" height="90" rx="5" fill="#f4ead2"/><path d="M44 34 L120 84 L196 34"/><circle cx="120" cy="88" r="14" fill="${TER}" fill-opacity=".8"/><rect x="160" y="40" width="26" height="22" stroke-dasharray="4 3"/>`),
  ch7: V(`<rect x="44" y="18" width="66" height="112" rx="10" fill="#eef1f3"/><path d="M68 26 h18"/><rect x="52" y="44" width="50" height="22" rx="8" fill="${TER}" fill-opacity=".45"/><path d="M58 52 h38 M58 58 h24"/><path d="M140 30 V70 Q140 100 168 100 Q196 100 196 70 V30 M134 30 h12 M190 30 h12"/><path d="M168 100 V112"/><circle cx="168" cy="118" r="8" fill="${OCH}" fill-opacity=".6"/>`),
  ch8: V(`<path d="M120 22 V118 M84 126 h72 M100 118 h40"/><path d="M60 40 Q120 30 180 40"/><circle cx="120" cy="18" r="4" fill="${OCH}"/><path d="M60 40 L40 84 M60 40 L80 84 M180 40 L160 84 M180 40 L200 84"/><path d="M36 84 Q60 104 84 84 Z" fill="${OCH}" fill-opacity=".5"/><path d="M156 84 Q180 104 204 84 Z" fill="${OCH}" fill-opacity=".5"/>`),
  ch9: V(`<path d="M86 18 h68 M86 122 h68"/><path d="M94 18 Q94 56 120 70 Q146 56 146 18"/><path d="M94 122 Q94 84 120 70 Q146 84 146 122"/><path d="M104 32 Q120 52 136 32 Z" fill="${OCH}" fill-opacity=".6"/><path d="M100 120 Q120 92 140 120 Z" fill="${OCH}" fill-opacity=".6"/><path d="M120 70 v26" stroke-dasharray="2 5"/>`),
  ch10: V(`<path d="M56 70 Q120 140 184 70 Z" fill="#f4ead2"/><path d="M50 70 h140 M70 104 l-14 22 M170 104 l14 22 M48 126 Q120 140 192 126"/><path d="M60 70 Q70 30 120 32" /><path d="M150 38 l5 11 l12 1 l-9 8 l3 12 l-11 -6 l-11 6 l3 -12 l-9 -8 l12 -1 Z" fill="${OCH}" fill-opacity=".7"/>`),
  epilogue: V(`<path d="M20 100 Q40 92 60 100 T100 100 T140 100 T180 100 T220 100" stroke="${BLU}"/><path d="M30 118 Q50 110 70 118 T110 118 T150 118 T190 118" stroke="${BLU}"/><path d="M40 20 Q120 10 170 70 L170 104" /><path d="M40 20 L30 80"/><path d="M150 112 Q170 96 190 112 Q170 128 150 112 Z M150 112 l-10 -8 v16 Z" fill="${OCH}" fill-opacity=".6"/><circle cx="196" cy="34" r="16" fill="${OCH}" fill-opacity=".45"/>`),
};

if (require.main === module) {
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'will.svg'), cover(true));
  fs.writeFileSync(path.join(OUT, 'part1.svg'), part1());
  fs.writeFileSync(path.join(OUT, 'part2.svg'), part2());
  fs.writeFileSync(path.join(OUT, 'part3.svg'), part3());
  for (const [k, v] of Object.entries(VIG)) fs.writeFileSync(path.join(OUT, 'v_' + k + '.svg'), v);
  console.log('ok', Object.keys(VIG).length + 4, 'fichiers');
}
module.exports = { cover, part1, part2, part3, VIG };
