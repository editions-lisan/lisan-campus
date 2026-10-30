// ===== Lisân Campus · certificats (parcours et espace complet), vérification publique, suggestions
// Utilise app.js (esc, crumbs, space, spaceOf, subj, SUBJECTS, state, subjectProgress, AUTH, route) et inscription.js (prenomFmt, dateFr).

const CERT_QUIZ = 80;                                    // score minimal à l'évaluation pour obtenir un certificat
// L'évaluation du certificat (#q-…) est enregistrée sous « parcours@eval » ; un quiz réussi à 70 % avant le
// 30 octobre 2026 (ancienne formule, clé « parcours ») reste valable.
const LEGACY_QUIZ = 70, EVAL_KEY = id => id + '@eval';
const quizBest = s => { const e = state.quiz[EVAL_KEY(s.id)], o = state.quiz[s.id]; return e === undefined ? o : (o !== undefined && o >= LEGACY_QUIZ && o > e ? o : e); };
const quizOk = s => (state.quiz[EVAL_KEY(s.id)] || 0) >= CERT_QUIZ || (state.quiz[s.id] || 0) >= LEGACY_QUIZ;
const SITE_URL = 'https://lisan-campus.pages.dev/';
const verifUrl = num => `${SITE_URL}#verifier-${num}`;

// ---------- conditions
function parcoursStatus(s) {
  const p = subjectProgress(s), q = quizBest(s), needQuiz = !!(s.quiz && s.quiz.length), qok = quizOk(s);
  return { p, q, qok, needQuiz, ok: p.n > 0 && p.d === p.n && (!needQuiz || qok) };
}
function spaceStatus(sp) {
  const ss = SUBJECTS.filter(s => spaceOf(s) === sp.id), st = ss.map(parcoursStatus);
  return { ss, st, ok: ss.length > 0 && st.every(x => x.ok), done: st.filter(x => x.ok).length };
}
const myCerts = A => (A && A.user() && A.certs ? A.certs() : []);
const myCertFor = (A, k) => (A && A.user() && A.certFor ? A.certFor(k) : null);
const singleSpace = sp => SUBJECTS.filter(s => spaceOf(s) === sp.id).length === 1;

function certData(kind, obj) {                           // contenu d'un certificat à délivrer
  const A = AUTH(), i = A.info() || {}, u = A.user();
  const name = i.prenom ? { civilite: i.civilite || '', prenom: prenomFmt(i.prenom), nom: String(i.nom || '').toUpperCase() } : (() => { const n = splitName(u.displayName); return { civilite: '', prenom: prenomFmt(n.prenom), nom: n.nom }; })();
  if (kind === 'parcours') { const s = obj, st = parcoursStatus(s), sp = space(spaceOf(s));
    return Object.assign({ key: 'p:' + s.id, type: 'parcours', titre: s.title, espace: sp.title, spaceId: sp.id, subjectId: s.id, lecons: st.p.n, quiz: st.needQuiz ? st.q : null }, name); }
  const sp = obj, st = spaceStatus(sp), qs = st.ss.filter(s => s.quiz && s.quiz.length).map(s => quizBest(s) || 0);
  return Object.assign({ key: 'e:' + sp.id, type: 'espace', titre: sp.title, espace: sp.title, spaceId: sp.id, subjectId: null,
    lecons: st.ss.reduce((a, s) => a + s.lessons.length, 0), quiz: qs.length ? Math.round(qs.reduce((a, b) => a + b, 0) / qs.length) : null }, name);
}

// ---------- bandeaux sur la page d'un parcours et d'un espace
function certPanelSubject(s) {
  const A = AUTH(); if (!A) return '';
  const sp = space(spaceOf(s));
  if (singleSpace(sp)) return certPanelSpace(sp);
  const st = parcoursStatus(s), mine = myCertFor(A, 'p:' + s.id);
  if (mine) return `<div class="cert-panel ok"><span class="cp-ic" aria-hidden="true">🎓</span><div><b>Votre certificat de réussite est prêt.</b><small>N° ${esc(mine.num)} · délivré le ${dateFr(mine.date)}</small></div><a class="btn small" href="#certificat-${mine.num}">Voir mon certificat</a></div>`;
  if (st.ok) return `<div class="cert-panel ok"><span class="cp-ic" aria-hidden="true">🎓</span><div><b>Félicitations ! Vous avez terminé ce parcours.</b><small>Votre certificat de réussite vous attend.</small></div>${issueBtn('parcours', s.id, sp)}</div>`;
  return `<div class="cert-panel"><span class="cp-ic" aria-hidden="true">🎓</span><div><b>Certificat de réussite</b><ul class="cp-list">
    <li class="${st.p.d === st.p.n ? 'ok' : ''}">Terminer les ${st.p.n} leçons <span>(${st.p.d} / ${st.p.n})</span></li>
    ${st.needQuiz ? `<li class="${st.qok ? 'ok' : ''}">Réussir l’évaluation avec au moins ${CERT_QUIZ} % <span>(${st.q === undefined ? 'pas encore fait' : 'meilleur score : ' + st.q + ' %'})</span></li>` : ''}</ul></div></div>`;
}
function certPanelSpace(sp) {
  const A = AUTH(); if (!A) return '';
  const st = spaceStatus(sp), mine = myCertFor(A, 'e:' + sp.id), one = singleSpace(sp);
  const title = one ? 'Certificat de réussite' : 'Grand certificat de l’espace';
  if (mine) return `<div class="cert-panel ok gold"><span class="cp-ic" aria-hidden="true">🏅</span><div><b>Votre ${title.toLowerCase()} est prêt.</b><small>N° ${esc(mine.num)} · délivré le ${dateFr(mine.date)}</small></div><a class="btn small" href="#certificat-${mine.num}">Voir mon certificat</a></div>`;
  if (st.ok) return `<div class="cert-panel ok gold"><span class="cp-ic" aria-hidden="true">🏅</span><div><b>Bravo ! Vous avez terminé ${one ? 'ce parcours' : 'toutes les leçons de cet espace'}.</b><small>Votre ${title.toLowerCase()} vous attend.</small></div>${issueBtn('espace', sp.id, sp)}</div>`;
  if (one) { const s = st.ss[0], ps = st.st[0];
    return `<div class="cert-panel"><span class="cp-ic" aria-hidden="true">🎓</span><div><b>${title}</b><ul class="cp-list">
      <li class="${ps.p.d === ps.p.n ? 'ok' : ''}">Terminer les ${ps.p.n} leçons <span>(${ps.p.d} / ${ps.p.n})</span></li>
      ${ps.needQuiz ? `<li class="${ps.qok ? 'ok' : ''}">Réussir l’évaluation avec au moins ${CERT_QUIZ} % <span>(${ps.q === undefined ? 'pas encore fait' : 'meilleur score : ' + ps.q + ' %'})</span></li>` : ''}</ul></div></div>`; }
  return `<div class="cert-panel gold"><span class="cp-ic" aria-hidden="true">🏅</span><div><b>${title}</b><small>Il récompense celui qui termine toutes les leçons de l’espace et réussit chaque évaluation (au moins ${CERT_QUIZ} %) : ${st.done} parcours réussi${st.done > 1 ? 's' : ''} sur ${st.ss.length}.</small></div></div>`;
}
function issueBtn(kind, id, sp) {
  const A = AUTH();
  if (!A.user()) return `<button type="button" class="btn small" data-auth="signin">Se connecter pour l’obtenir</button>`;
  if (!A.enrolled(sp.id)) return `<a class="btn small" href="#inscription-${sp.id}">M’inscrire pour l’obtenir</a>`;
  return `<button type="button" class="btn small" data-cert="${kind}:${id}">Obtenir mon certificat</button>`;
}

// ---------- le certificat
function qrSvg(text) {
  if (!window.qrcode) return '';
  const q = qrcode(0, 'M'); q.addData(text); q.make();
  const n = q.getModuleCount(); let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
  return `<svg viewBox="-2 -2 ${n + 4} ${n + 4}" role="img" aria-label="Code QR de vérification"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/><path d="${d}" fill="#141c2e"/></svg>`;
}
// ---------- éléments de sécurité du certificat
// Code d'authenticité : empreinte des données du registre (numéro, titulaire, parcours, résultats).
// Recalculé sur la page de vérification à partir du registre : un document modifié n'a plus le même code.
function certCode(c) {
  const str = [c.num, String(c.prenom || '').trim().toLowerCase(), String(c.nom || '').trim().toUpperCase(), c.type, c.titre, c.espace, Number(c.lecons) || 0, c.quiz === null || c.quiz === undefined ? '-' : Number(c.quiz)].join('|');
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) { const ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex = ((h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0')).toUpperCase().slice(0, 12);
  return hex.match(/.{4}/g).join('-');
}
// fond guilloché (comme sur les billets de banque) : rosace et ondes très fines, difficiles à reproduire à la photocopieuse
const GUIL = (() => {
  let g = '';
  for (let k = 0; k < 48; k++) g += `<ellipse cx="500" cy="372" rx="330" ry="118" transform="rotate(${(k * 3.75).toFixed(2)} 500 372)"/>`;
  for (let k = 0; k < 24; k++) g += `<ellipse cx="500" cy="372" rx="190" ry="62" transform="rotate(${(k * 7.5).toFixed(2)} 500 372)"/>`;
  let w = '';
  for (let r = 0; r < 34; r++) { const y0 = 20 + r * 20; let d = `M0 ${y0}`;
    for (let x = 0; x <= 1000; x += 10) d += ` L${x} ${(y0 + 6 * Math.sin(x / 38 + r * .7) + 3 * Math.sin(x / 11 + r)).toFixed(1)}`;
    w += `<path d="${d}"/>`; }
  return `<g class="g-waves">${w}</g><g class="g-rose">${g}</g>`;
})();
const STAR8 = (cx, cy, r) => { let d = ''; for (let k = 0; k < 16; k++) { const a = Math.PI / 8 * k - Math.PI / 2, rr = k % 2 ? r * .62 : r; d += (k ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1); } return d + 'Z'; };
const CORNER = `<svg class="cert-corner" viewBox="0 0 100 100" aria-hidden="true"><path d="M4 96V30Q4 4 30 4H96" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 96V36Q12 12 36 12H96" fill="none" stroke="currentColor" stroke-width=".9"/>
  <path d="${STAR8(34, 34, 16)}" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="34" cy="34" r="4.2" fill="currentColor"/></svg>`;
// le sceau doré, façon autocollant à bord festonné, avec ses rubans
function sticker(id, year, grand) {
  const R1 = 92, R2 = 84, N = 36; let d = '';
  for (let k = 0; k <= N; k++) { const a = 2 * Math.PI * k / N, b = 2 * Math.PI * (k - .5) / N;
    const x = 100 + R1 * Math.cos(a), y = 100 + R1 * Math.sin(a), qx = 100 + (R2 - 6) * Math.cos(b), qy = 100 + (R2 - 6) * Math.sin(b);
    d += k ? ` Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}` : `M${x.toFixed(1)} ${y.toFixed(1)}`; }
  const rib = grand ? '#7a1f35' : '#1e2a5a';
  return `<svg class="cert-sticker" viewBox="0 0 200 250" role="img" aria-label="Sceau d’authenticité de Lisân Campus">
  <defs><linearGradient id="${id}-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe7a1"/><stop offset=".28" stop-color="#d9a842"/><stop offset=".5" stop-color="#fff2c2"/><stop offset=".72" stop-color="#c38f2c"/><stop offset="1" stop-color="#f3d27a"/></linearGradient>
    <linearGradient id="${id}-s" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(35)"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".55"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <path id="${id}-c" d="M100 100m-60 0a60 60 0 1 1 120 0a60 60 0 1 1-120 0"/>
    <filter id="${id}-f" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#3b2a05" flood-opacity=".35"/></filter></defs>
  <path d="M62 150L40 240L66 222L80 248L98 160Z" fill="${rib}"/><path d="M138 150L160 240L134 222L120 248L102 160Z" fill="${rib}"/>
  <path d="M62 150L40 240L66 222L80 248L98 160Z" fill="none" stroke="#e6b450" stroke-width="2"/><path d="M138 150L160 240L134 222L120 248L102 160Z" fill="none" stroke="#e6b450" stroke-width="2"/>
  <g filter="url(#${id}-f)"><path d="${d}Z" fill="url(#${id}-g)" stroke="#a87a22" stroke-width="1.2"/></g>
  <circle cx="100" cy="100" r="74" fill="none" stroke="#8a6214" stroke-width="1.4" stroke-dasharray="2 2.4"/>
  <circle cx="100" cy="100" r="70" fill="${rib}"/><circle cx="100" cy="100" r="66" fill="none" stroke="#e6b450" stroke-width="1.6"/>
  <circle cx="100" cy="100" r="44" fill="none" stroke="#e6b450" stroke-width="1"/>
  <text font-size="11.2" font-weight="700" letter-spacing="1.6" fill="#f5d48a" font-family="Atkinson Hyperlegible, sans-serif"><textPath href="#${id}-c">AUTHENTIQUE · LISÂN CAMPUS · VÉRIFIABLE EN LIGNE ·</textPath></text>
  <path d="${STAR8(100, 84, 22)}" fill="#e6b450"/><circle cx="100" cy="84" r="8" fill="${rib}"/>
  <text x="100" y="121" text-anchor="middle" font-size="14" font-weight="700" letter-spacing="2" fill="#f5d48a" font-family="Atkinson Hyperlegible, sans-serif">${grand ? 'GRAND' : 'CERTIFIÉ'}</text>
  <text x="100" y="135" text-anchor="middle" font-size="10" letter-spacing="1.5" fill="#f5d48a" font-family="Atkinson Hyperlegible, sans-serif">${esc(year)}</text>
  <path d="${d}Z" fill="url(#${id}-s)" opacity=".9" pointer-events="none"/></svg>`;
}
const gq = t => `« ${esc(t)} »`;   // espaces insécables à l'intérieur des guillemets
function certHTML(c) {
  const name = `${c.civilite === 'Madame' ? 'Madame ' : c.civilite === 'Monsieur' ? 'Monsieur ' : ''}${prenomFmt(c.prenom)} ${String(c.nom || '').toUpperCase()}`.trim();
  const what = c.type === 'espace'
    ? (SUBJECTS.filter(s => spaceOf(s) === c.spaceId).length === 1 ? `a suivi avec succès le parcours ${gq(c.titre)}` : `a terminé avec succès l’ensemble des parcours de l’espace ${gq(c.espace)}`)
    : `a suivi avec succès le parcours ${gq(c.titre)} de l’espace ${gq(c.espace)}`;
  const grand = c.type === 'espace' && SUBJECTS.filter(s => spaceOf(s) === c.spaceId).length > 1;
  const id = 'k' + String(c.num || 'x').replace(/[^A-Za-z0-9]/g, ''), code = certCode(c), year = String(c.date || '').slice(0, 4) || String(new Date().getFullYear());
  const micro = `LISÂN CAMPUS · CERTIFICAT N° ${c.num} · ${name.toUpperCase()} · CODE ${code} · `.repeat(14);
  return `<div class="cert-wrap"><article class="cert${c.type === 'espace' ? ' grand' : ''}" id="cert" aria-label="Certificat ${esc(c.num)}">
    <div class="cert-in">
      <svg class="cert-guil" viewBox="0 0 1000 744" preserveAspectRatio="none" aria-hidden="true">${GUIL}</svg>
      <svg class="cert-micro" viewBox="0 0 1000 744" preserveAspectRatio="none" aria-hidden="true"><path id="${id}-m" d="M14 14H986V730H14Z" fill="none"/>
        <text font-size="6.2" letter-spacing=".4" font-family="Atkinson Hyperlegible, sans-serif"><textPath href="#${id}-m">${esc(micro)}</textPath></text></svg>
      <img class="cert-wm" src="logo.png" alt="">
      ${CORNER}${CORNER.replace('cert-corner', 'cert-corner tr')}${CORNER.replace('cert-corner', 'cert-corner bl')}${CORNER.replace('cert-corner', 'cert-corner br')}
      <header class="cert-head"><img src="logo.png" alt="" width="96" height="96"><div><b>Éditions Lisân</b><span>Lisân Campus · la langue qui ouvre les portes</span></div></header>
      <p class="cert-kicker">${grand ? 'Grand certificat' : 'Certificat de réussite'}</p>
      <p class="cert-ar ara" lang="ar" dir="rtl">${grand ? 'الشَّهَادَةُ الكُبْرَى' : 'شَهَادَةُ نَجَاحٍ'}</p>
      <p class="cert-lead">Ce certificat atteste que</p>
      <h2 class="cert-name">${esc(name)}</h2>
      <p class="cert-text">${what} sur Lisân Campus : ${Number(c.lecons) || 0} leçons terminées${c.quiz !== null && c.quiz !== undefined ? `, ${c.type === 'espace' ? 'évaluations réussies avec une moyenne de' : 'évaluation réussie avec'} ${Number(c.quiz)} %` : ''}.</p>
      <svg class="cert-orn" viewBox="0 0 240 16" aria-hidden="true"><path d="M0 8H96M144 8H240" stroke="currentColor" stroke-width="1.2"/><path d="${STAR8(120, 8, 7.5)}" fill="currentColor"/><circle cx="104" cy="8" r="2.2" fill="currentColor"/><circle cx="136" cy="8" r="2.2" fill="currentColor"/></svg>
      <footer class="cert-foot">
        <div class="cert-meta"><span>Délivré le</span><b>${dateFr(c.date)}</b><span>Certificat n°</span><b>${esc(c.num)}</b><span>Code d’authenticité</span><b class="cert-code">${code}</b></div>
        <div class="cert-seal">${sticker(id, year, grand)}</div>
        <div class="cert-sign"><b>Mouhamadou CISSEMA</b><span>Fondateur des Éditions Lisân</span></div>
        <div class="cert-qr">${qrSvg(verifUrl(c.num))}<span>Scannez pour vérifier</span></div>
      </footer>
      <p class="cert-check">Authenticité vérifiable sur lisan-campus.pages.dev/#verifier : le numéro, le titulaire et le code d’authenticité doivent correspondre exactement.</p>
    </div></article></div>`;
}
const certActions = c => `<div class="actions cert-actions"><button type="button" class="btn" data-cert-print="1">Imprimer ou enregistrer en PDF</button>
  <button type="button" class="btn ghost" data-cert-share="${esc(c.num)}">Partager le lien de vérification</button></div>
  <p class="meta" id="cert-msg" aria-live="polite">Pour un fichier PDF : touchez « Imprimer », puis choisissez « Enregistrer au format PDF ».</p>`;

function viewCert(num) {
  const A = AUTH(); if (!A) return null;
  const mine = myCerts(A).find(c => c.num === num);
  const head = crumbs(['Mon compte', 'compte'], ['Mon certificat']);
  if (mine) return `${head}<div class="cert-page"><h1>Mon certificat</h1>${certHTML(mine)}${certActions(mine)}</div>`;
  return `${head}<div class="cert-page" id="cert-page"><p class="lead">Chargement du certificat…</p></div>`;
}
function bindCert(num) {
  const box = document.getElementById('cert-page'); if (!box) return;
  AUTH().getCert(num).then(c => { box.innerHTML = c ? `<h1>Certificat</h1>${certHTML(c)}${certActions(c)}` : '<h1>Certificat introuvable</h1><p class="notice bad-n">Aucun certificat ne correspond à ce numéro.</p>'; })
    .catch(() => { box.innerHTML = '<p class="notice bad-n">Le certificat n’a pas pu être chargé. Vérifiez votre connexion internet.</p>'; });
}

// ---------- vérification publique
function viewVerify(num) {
  const A = AUTH();
  return `${crumbs(['Vérifier un certificat'])}<div class="cert-page"><h1>Vérifier un certificat</h1>
    <p class="lead">Chaque certificat de Lisân Campus porte un numéro et un code QR. Saisissez le numéro pour vérifier qu’il a bien été délivré par les Éditions Lisân.</p>
    <form class="form verify-form" id="verify-form"><label>Numéro du certificat<input name="num" value="${esc(num || '')}" placeholder="LCC-2026-XXXXXXXX" autocomplete="off" autocapitalize="characters" required></label>
      <div class="actions"><button type="submit" class="btn">Vérifier</button></div></form>
    <div id="verify-out" aria-live="polite">${A ? '' : '<p class="notice">La vérification n’est pas disponible sur cet aperçu : ouvrez lisan-campus.pages.dev.</p>'}</div>
    <p class="meta">Chaque certificat est inscrit dans le registre de Lisân Campus au moment où il est délivré ; il ne peut plus être modifié ensuite. Il porte un numéro unique, un code d’authenticité, un code QR, un micro-texte au nom du titulaire et un fond de sécurité. Un certificat Lisân Campus atteste que son titulaire a terminé les leçons et réussi les évaluations du parcours sur le site. Ce n’est pas un diplôme d’État.</p></div>`;
}
function bindVerify(num) {
  const f = document.getElementById('verify-form'), out = document.getElementById('verify-out'), A = AUTH();
  const check = n => { n = String(n || '').trim().toUpperCase().replace(/\s+/g, '');
    if (!A) return; if (!/^LCC-\d{4}-[A-Z0-9]{8}$/.test(n)) { out.innerHTML = '<p class="notice bad-n">Ce numéro n’a pas le bon format : il ressemble à LCC-2026-AB12CD34.</p>'; return; }
    out.innerHTML = '<p class="meta">Vérification…</p>';
    A.getCert(n).then(c => { out.innerHTML = c ? `<p class="notice ok verify-ok"><b>✓ Certificat authentique.</b> Il a été délivré par Lisân Campus le ${dateFr(c.date)} à ${esc(prenomFmt(c.prenom))} ${esc(String(c.nom || '').toUpperCase())}.
        Code d’authenticité : <b class="cert-code">${certCode(c)}</b>. Le document présenté doit porter exactement le même nom, le même parcours, les mêmes résultats et le même code ; sinon, il a été modifié.</p>${certHTML(c)}`
      : `<p class="notice bad-n"><b>✗ Aucun certificat ne porte le numéro ${esc(n)}.</b> Vérifiez le numéro, ou écrivez-nous depuis la page Contact.</p>`; })
      .catch(() => { out.innerHTML = '<p class="notice bad-n">La vérification n’a pas abouti. Vérifiez votre connexion internet et réessayez.</p>'; }); };
  f.addEventListener('submit', e => { e.preventDefault(); const n = f.elements.num.value.trim().toUpperCase(); history.replaceState(null, '', '#verifier-' + n); check(n); });
  if (num) check(num);
}

// ---------- suggestions
let suggestCtx = '';
const SUGG_TYPES = ['Un nouveau cours ou un nouveau livre', 'Une amélioration d’une leçon', 'Une erreur à corriger', 'Une idée pour le site', 'Autre'];
function viewSuggest() {
  const A = AUTH(), head = crumbs(['Suggérer une idée']);
  const intro = `<p class="lead">Une idée de cours, une amélioration, une erreur repérée ? Les Éditions Lisân lisent chaque suggestion pour faire grandir le Campus.</p>`;
  if (!A) return `${head}<div class="enroll"><h1>Suggérer une idée</h1>${intro}<p>Écrivez-nous depuis la page <a href="#contact">Contact</a>.</p></div>`;
  if (!A.user()) return `${head}<div class="gate"><span class="sp-icon" aria-hidden="true">💡</span><h1>Suggérer une idée</h1>${intro}
    <div class="actions"><button type="button" class="btn" data-auth="signin">Se connecter avec Google</button><a class="btn ghost" href="#contact">Écrire sans compte</a></div></div>`;
  const mine = (A.suggestions ? A.suggestions() : []).slice(0, 5);
  return `${head}<div class="enroll"><h1>Suggérer une idée</h1>${intro}
    <form class="form enroll-form" id="sugg-form" novalidate><fieldset class="group"><legend>Votre suggestion</legend>
      ${suggestCtx ? `<p class="meta">À propos de : <b>${esc(suggestCtx)}</b></p>` : ''}
      ${fieldRadio('type', 'Il s’agit de', SUGG_TYPES, suggestCtx ? SUGG_TYPES[1] : '', { req: 1 })}
      <label class="fld" data-f="texte"><span class="lbl">Votre message <span class="req" aria-hidden="true">*</span></span>
        <textarea name="texte" rows="6" maxlength="2000" required placeholder="Décrivez votre idée le plus précisément possible."></textarea><small class="hint" id="sugg-count">0 / 2000</small><small class="err" hidden></small></label>
    </fieldset><div class="actions"><button type="submit" class="btn">Envoyer ma suggestion</button></div><p class="meta" id="sugg-msg" aria-live="polite"></p></form>
    ${mine.length ? `<section class="panel"><h2>Mes dernières suggestions</h2>${mine.map(x => `<div class="sugg-item"><small>${dateFr(x.date)} · ${esc(x.type)}${x.contexte ? ' · ' + esc(x.contexte) : ''}</small><p>${esc(x.texte)}</p></div>`).join('')}</section>` : ''}</div>`;
}
function bindSuggest() {
  const f = document.getElementById('sugg-form'); if (!f) return;
  const ta = f.elements.texte, cnt = document.getElementById('sugg-count');
  ta.addEventListener('input', () => { cnt.textContent = `${ta.value.length} / 2000`; });
  f.addEventListener('submit', e => { e.preventDefault(); if (!validate(f)) return;
    if (ta.value.trim().length < 10) { const w = f.querySelector('[data-f="texte"]'); w.classList.add('bad'); const er = w.querySelector('.err'); er.textContent = 'Écrivez au moins quelques mots (10 caractères).'; er.hidden = false; return; }
    const m = document.getElementById('sugg-msg'), b = f.querySelector('button[type=submit]'); b.disabled = true; m.textContent = 'Envoi…';
    AUTH().suggest({ type: (f.querySelector('[name=type]:checked') || {}).value, texte: ta.value.trim(), contexte: suggestCtx })
      .then(() => { suggestCtx = ''; route(); setTimeout(() => { const mm = document.getElementById('sugg-msg'); if (mm) mm.textContent = 'Merci ! Votre suggestion a bien été transmise aux Éditions Lisân.'; }, 30); })
      .catch(() => { b.disabled = false; m.textContent = 'L’envoi n’a pas abouti. Vérifiez votre connexion internet et réessayez.'; }); });
}

// ---------- Mon compte : mes certificats
function certAccountPanel(A) {
  const cs = myCerts(A);
  return `<section class="panel"><h2>Mes certificats</h2>${cs.length ? cs.map(c => `<div class="ins-row"><div><b>${c.type === 'espace' ? '🏅' : '🎓'} ${esc(c.titre)}</b><small>N° ${esc(c.num)} · délivré le ${dateFr(c.date)}</small></div>
    <div class="actions"><a class="btn small" href="#certificat-${c.num}">Voir</a></div></div>`).join('')
    : `<p>Terminez toutes les leçons d’un parcours et réussissez son évaluation (au moins ${CERT_QUIZ} %) : votre certificat de réussite sera délivré ici. En terminant tout un espace, vous obtenez son grand certificat.</p>`}
    <p class="meta"><a href="#verifier">Vérifier un certificat</a></p></section>`;
}

// ---------- actions
document.addEventListener('click', e => {
  const sg = e.target.closest('[data-suggest]');
  if (sg) { suggestCtx = sg.dataset.suggest || ''; location.hash = '#suggestion'; return; }
  const ci = e.target.closest('[data-cert]');
  if (ci && AUTH()) { const [kind, id] = ci.dataset.cert.split(':'); const obj = kind === 'parcours' ? subj(id) : space(id); if (!obj) return;
    const st = kind === 'parcours' ? parcoursStatus(obj) : spaceStatus(obj); if (!st.ok) return;
    ci.disabled = true; ci.textContent = 'Délivrance du certificat…';
    AUTH().issueCert(certData(kind, obj)).then(c => { location.hash = '#certificat-' + c.num; })
      .catch(err => { ci.disabled = false; ci.textContent = 'Obtenir mon certificat';
        const msg = err && /permission/.test(err.code || err.message || '') ? 'La délivrance des certificats est en cours d’activation. Réessayez un peu plus tard.' : 'Le certificat n’a pas pu être délivré. Vérifiez votre connexion internet et réessayez.';
        ci.insertAdjacentHTML('afterend', `<small class="err">${msg}</small>`); });
    return; }
  if (e.target.closest('[data-cert-print]')) { document.body.classList.add('printing-cert'); window.print(); setTimeout(() => document.body.classList.remove('printing-cert'), 500); return; }
  const sh = e.target.closest('[data-cert-share]');
  if (sh) { const url = verifUrl(sh.dataset.certShare), m = document.getElementById('cert-msg');
    if (navigator.share) navigator.share({ title: 'Mon certificat Lisân Campus', text: 'Mon certificat de réussite Lisân Campus, vérifiable en ligne :', url }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => { m.textContent = 'Lien de vérification copié : ' + url; }, () => { m.textContent = url; });
    else m.textContent = url; }
});
window.addEventListener('afterprint', () => document.body.classList.remove('printing-cert'));
