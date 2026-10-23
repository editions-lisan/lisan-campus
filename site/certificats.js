// ===== Lisân Campus · certificats (parcours et espace complet), vérification publique, suggestions
// Utilise app.js (esc, crumbs, space, spaceOf, subj, SUBJECTS, state, subjectProgress, AUTH, route) et inscription.js (prenomFmt, dateFr).

const CERT_QUIZ = 70;                                    // score minimal au quiz pour obtenir un certificat
const SITE_URL = 'https://lisan-campus.netlify.app/';
const verifUrl = num => `${SITE_URL}#verifier-${num}`;

// ---------- conditions
function parcoursStatus(s) {
  const p = subjectProgress(s), q = state.quiz[s.id], needQuiz = !!(s.quiz && s.quiz.length);
  return { p, q, needQuiz, ok: p.n > 0 && p.d === p.n && (!needQuiz || (q !== undefined && q >= CERT_QUIZ)) };
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
  const sp = obj, st = spaceStatus(sp), qs = st.ss.filter(s => s.quiz && s.quiz.length).map(s => state.quiz[s.id] || 0);
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
    ${st.needQuiz ? `<li class="${st.q >= CERT_QUIZ ? 'ok' : ''}">Réussir le quiz avec au moins ${CERT_QUIZ} % <span>(${st.q === undefined ? 'pas encore fait' : 'meilleur score : ' + st.q + ' %'})</span></li>` : ''}</ul></div></div>`;
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
      ${ps.needQuiz ? `<li class="${ps.q >= CERT_QUIZ ? 'ok' : ''}">Réussir le quiz avec au moins ${CERT_QUIZ} % <span>(${ps.q === undefined ? 'pas encore fait' : 'meilleur score : ' + ps.q + ' %'})</span></li>` : ''}</ul></div></div>`; }
  return `<div class="cert-panel gold"><span class="cp-ic" aria-hidden="true">🏅</span><div><b>${title}</b><small>Il récompense celui qui termine toutes les leçons de l’espace et réussit chaque quiz (au moins ${CERT_QUIZ} %) : ${st.done} parcours réussi${st.done > 1 ? 's' : ''} sur ${st.ss.length}.</small></div></div>`;
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
const SEAL = `<svg viewBox="0 0 200 200" aria-hidden="true"><defs><path id="seal-c" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0"/></defs>
  <circle cx="100" cy="100" r="96" fill="#1e2a5a"/><circle cx="100" cy="100" r="88" fill="none" stroke="#e6b450" stroke-width="2.5"/>
  <circle cx="100" cy="100" r="58" fill="none" stroke="#e6b450" stroke-width="1.5"/>
  <text font-size="15.5" font-weight="700" letter-spacing="2.6" fill="#f5d48a" font-family="Atkinson Hyperlegible, sans-serif"><textPath href="#seal-c">LISÂN CAMPUS · CERTIFIÉ · ÉDITIONS LISÂN ·</textPath></text>
  <image href="icon-192.png" x="58" y="58" width="84" height="84"/></svg>`;
const gq = t => `«\u00a0${esc(t)}\u00a0»`;   // espaces insécables à l'intérieur des guillemets
function certHTML(c) {
  const name = `${c.civilite === 'Madame' ? 'Madame ' : c.civilite === 'Monsieur' ? 'Monsieur ' : ''}${prenomFmt(c.prenom)} ${String(c.nom || '').toUpperCase()}`.trim();
  const what = c.type === 'espace'
    ? (SUBJECTS.filter(s => spaceOf(s) === c.spaceId).length === 1 ? `a suivi avec succès le parcours ${gq(c.titre)}` : `a terminé avec succès l’ensemble des parcours de l’espace ${gq(c.espace)}`)
    : `a suivi avec succès le parcours ${gq(c.titre)} de l’espace ${gq(c.espace)}`;
  const grand = c.type === 'espace' && SUBJECTS.filter(s => spaceOf(s) === c.spaceId).length > 1;
  return `<div class="cert-wrap"><article class="cert${c.type === 'espace' ? ' grand' : ''}" id="cert" aria-label="Certificat ${esc(c.num)}">
    <div class="cert-in">
      <header class="cert-head"><img src="logo.png" alt="" width="96" height="96"><div><b>Éditions Lisân</b><span>Lisân Campus · la langue qui ouvre les portes</span></div></header>
      <p class="cert-kicker">${grand ? 'Grand certificat' : 'Certificat de réussite'}</p>
      <p class="cert-ar ara" lang="ar" dir="rtl">${grand ? 'الشَّهَادَةُ الكُبْرَى' : 'شَهَادَةُ نَجَاحٍ'}</p>
      <p class="cert-lead">Ce certificat atteste que</p>
      <h2 class="cert-name">${esc(name)}</h2>
      <p class="cert-text">${what} sur Lisân Campus : ${Number(c.lecons) || 0}\u00a0leçons terminées${c.quiz !== null && c.quiz !== undefined ? `, quiz réussi${c.type === 'espace' ? 's avec une moyenne de' : ' avec'} ${Number(c.quiz)}\u00a0%` : ''}.</p>
      <p class="cert-orn" aria-hidden="true">✦ ✦ ✦</p>
      <footer class="cert-foot">
        <div class="cert-meta"><span>Délivré le</span><b>${dateFr(c.date)}</b><span>Certificat n°</span><b>${esc(c.num)}</b></div>
        <div class="cert-seal">${SEAL}</div>
        <div class="cert-sign"><b>Mouhamadou CISSEMA</b><span>Fondateur des Éditions Lisân</span></div>
        <div class="cert-qr">${qrSvg(verifUrl(c.num))}<span>Vérifier ce certificat</span></div>
      </footer>
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
    <div id="verify-out" aria-live="polite">${A ? '' : '<p class="notice">La vérification n’est pas disponible sur cet aperçu : ouvrez lisan-campus.netlify.app.</p>'}</div>
    <p class="meta">Un certificat Lisân Campus atteste que son titulaire a terminé les leçons et réussi les quiz du parcours sur le site. Ce n’est pas un diplôme d’État.</p></div>`;
}
function bindVerify(num) {
  const f = document.getElementById('verify-form'), out = document.getElementById('verify-out'), A = AUTH();
  const check = n => { n = String(n || '').trim().toUpperCase().replace(/\s+/g, '');
    if (!A) return; if (!/^LCC-\d{4}-[A-Z0-9]{8}$/.test(n)) { out.innerHTML = '<p class="notice bad-n">Ce numéro n’a pas le bon format : il ressemble à LCC-2026-AB12CD34.</p>'; return; }
    out.innerHTML = '<p class="meta">Vérification…</p>';
    A.getCert(n).then(c => { out.innerHTML = c ? `<p class="notice ok verify-ok"><b>✓ Certificat authentique.</b> Il a été délivré par Lisân Campus le ${dateFr(c.date)} à ${esc(prenomFmt(c.prenom))} ${esc(String(c.nom || '').toUpperCase())}.</p>${certHTML(c)}`
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
    : `<p>Terminez toutes les leçons d’un parcours et réussissez son quiz (au moins ${CERT_QUIZ} %) : votre certificat de réussite sera délivré ici. En terminant tout un espace, vous obtenez son grand certificat.</p>`}
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
