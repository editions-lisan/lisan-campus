// ===== Lisân Campus · inscription aux espaces (formulaire, vérification, confirmation) et fiche personnelle
// Utilise les fonctions de app.js (esc, crumbs, space, AUTH, route), appelées au moment de l'affichage.

const PAYS = [
  ['Côte d’Ivoire', '+225'], ['Burkina Faso', '+226'], ['Mali', '+223'], ['Guinée', '+224'], ['Sénégal', '+221'], ['Niger', '+227'],
  ['Togo', '+228'], ['Bénin', '+229'], ['Ghana', '+233'], ['Liberia', '+231'], ['Cameroun', '+237'], ['Mauritanie', '+222'],
  ['Gambie', '+220'], ['Nigeria', '+234'], ['Tchad', '+235'], ['Gabon', '+241'], ['Congo', '+242'], ['RD Congo', '+243'],
  ['Maroc', '+212'], ['Algérie', '+213'], ['Tunisie', '+216'], ['Égypte', '+20'], ['Arabie saoudite', '+966'], ['Émirats arabes unis', '+971'],
  ['Qatar', '+974'], ['France', '+33'], ['Belgique', '+32'], ['Suisse', '+41'], ['Canada', '+1'], ['États-Unis', '+1'], ['Autre pays', ''],
];
const STATUTS = ['Élève', 'Étudiant(e)', 'Enseignant(e) ou maître', 'Parent', 'Professionnel(le)', 'Sans emploi ou au foyer', 'Autre'];
const SOURCES = ['Un enseignant ou un maître', 'Un livre des Éditions Lisân', 'Un ami ou la famille', 'WhatsApp', 'Facebook', 'Une recherche sur Google', 'Mon université', 'Autre'];
const SPACE_CODE = { droit: 'DR', ia: 'IA', arabe: 'AR', coran: 'QR' };

// Questions propres à chaque espace
const QUESTIONS = {
  arabe: [
    { k: 'niveau', t: 'radio', l: 'Votre niveau en arabe', req: 1, o: ['Je débute : je ne lis pas encore l’arabe', 'Je lis un peu, lentement', 'Je lis et je comprends quelques phrases', 'Je parle déjà un peu arabe'] },
    { k: 'depart', t: 'radio', l: 'Par quel niveau voulez-vous commencer ?', req: 1, o: ['Niveau 0 · Je lis l’arabe !', 'Niveau 1 · Je parle arabe !', 'Niveau 2 · Je parle arabe !', 'Niveau 3 · Je parle arabe !', 'Je ne sais pas encore'] },
    { k: 'cadre', t: 'radio', l: 'Vous apprenez…', req: 1, o: ['Seul(e), à mon rythme', 'Dans une école ou un centre', 'Avec un enseignant en ligne'] },
    { k: 'livre', t: 'radio', l: 'Avez-vous le livre des Éditions Lisân ?', req: 1, o: ['Oui', 'Pas encore'] },
  ],
  coran: [
    { k: 'niveau', t: 'radio', l: 'Votre lecture du Coran aujourd’hui', req: 1, o: ['Je ne connais pas encore les lettres', 'Je connais les lettres', 'Je lis lentement, en épelant', 'Je lis couramment et je veux améliorer ma lecture'] },
    { k: 'maitre', t: 'radio', l: 'Suivez-vous un maître ?', req: 1, o: ['Oui, dans une école coranique ou un centre', 'Oui, en ligne', 'Pas encore'] },
    { k: 'centre', t: 'text', l: 'Nom de l’école ou du centre', hint: 'Facultatif' },
    { k: 'objectif', t: 'radio', l: 'Votre objectif', req: 1, o: ['Apprendre à lire le Coran', 'Améliorer ma lecture', 'Préparer la mémorisation', 'Accompagner mon enfant'] },
    { k: 'livre', t: 'radio', l: 'Avez-vous le livre « Lire le Coran pas à pas » ?', req: 1, o: ['Oui', 'Pas encore'] },
  ],
  droit: [
    { k: 'etab', t: 'text', l: 'Établissement', req: 1 },
    { k: 'niveau', t: 'select', l: 'Niveau d’études', req: 1, o: ['Licence 1', 'Licence 2', 'Licence 3', 'Master', 'Pas encore inscrit(e)', 'Autre'] },
    { k: 'annee', t: 'select', l: 'Année universitaire', req: 1, o: ['2026-2027', '2025-2026', 'Autre'] },
    { k: 'matricule', t: 'text', l: 'Numéro matricule', hint: 'Facultatif' },
  ],
  ia: [
    { k: 'objectif', t: 'radio', l: 'Pourquoi vous former à l’IA ?', req: 1, o: ['Pour mes études', 'Pour enseigner', 'Pour mon travail', 'Pour créer des contenus', 'Pour découvrir'] },
    { k: 'usage', t: 'radio', l: 'Utilisez-vous déjà un assistant d’IA ?', req: 1, o: ['Jamais', 'Un peu', 'Souvent'] },
    { k: 'compte', t: 'radio', l: 'Avez-vous un compte Claude ?', req: 1, o: ['Oui', 'Pas encore'] },
  ],
};

// ---------- outils
const ageOf = d => { if (!d) return null; const b = new Date(d + 'T00:00:00'); if (isNaN(b)) return null; const n = new Date();
  let a = n.getFullYear() - b.getFullYear(); if (n.getMonth() < b.getMonth() || (n.getMonth() === b.getMonth() && n.getDate() < b.getDate())) a--; return a; };
// Prénoms : une majuscule à chaque prénom (« MOUHAMADOU » ou « mouhamadou » → « Mouhamadou », « jean-paul » → « Jean-Paul »)
const prenomFmt = p => String(p || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase('fr-FR').replace(/(^|[\s\-'’])(\p{L})/gu, (m, a, b) => a + b.toLocaleUpperCase('fr-FR'));
const dateFr = iso => { try { return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return ''; } };
const telFr = (ind, num) => `${ind || ''} ${String(num || '').replace(/\s+/g, '').replace(/(\d{2})(?=\d)/g, '$1 ')}`.trim();
function splitName(full) {
  const t = String(full || '').trim().split(/\s+/).filter(Boolean); if (!t.length) return { prenom: '', nom: '' };
  const up = t.filter(w => w.length > 1 && w === w.toUpperCase() && /[A-ZÀ-Ý]/.test(w));
  if (up.length && up.length < t.length) return { nom: up.join(' '), prenom: t.filter(w => !up.includes(w)).join(' ') };
  return t.length > 1 ? { prenom: t.slice(0, -1).join(' '), nom: t[t.length - 1].toUpperCase() } : { prenom: t[0], nom: '' };
}
function defaultInfo() {
  const A = AUTH(), u = A && A.user(), saved = A && A.info && A.info();
  if (saved) return Object.assign({}, saved);
  const n = splitName(u && u.displayName);
  return { civilite: '', prenom: n.prenom, nom: n.nom, naissance: '', ind: '+225', tel: '', pays: 'Côte d’Ivoire', paysAutre: '', ville: '', statut: '', source: '', news: false, tuteur: null };
}

// ---------- champs
const reqMark = r => r ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="opt-l">(facultatif)</span>';
const fieldText = (k, l, v, o = {}) => `<label class="fld" data-f="${k}"><span class="lbl">${esc(l)}${o.ro ? '' : reqMark(o.req)}</span>
  <input name="${k}" value="${esc(v || '')}"${o.req ? ' required' : ''}${o.type ? ` type="${o.type}"` : ''}${o.ac ? ` autocomplete="${o.ac}"` : ''}${o.im ? ` inputmode="${o.im}"` : ''}${o.max ? ` max="${o.max}"` : ''}${o.min ? ` min="${o.min}"` : ''}${o.ro ? ' readonly' : ''}>
  ${o.hint ? `<small class="hint">${esc(o.hint)}</small>` : ''}<small class="err" hidden></small></label>`;
const fieldSelect = (k, l, opts, v, o = {}) => `<label class="fld" data-f="${k}"><span class="lbl">${esc(l)}${reqMark(o.req)}</span>
  <select name="${k}"${o.req ? ' required' : ''}><option value="">— Choisir —</option>${opts.map(x => `<option${x === v ? ' selected' : ''}>${esc(x)}</option>`).join('')}</select><small class="err" hidden></small></label>`;
const fieldRadio = (k, l, opts, v, o = {}) => `<fieldset class="fld radios" data-f="${k}"><legend>${esc(l)}${reqMark(o.req)}</legend>
  ${opts.map(x => `<label class="choice"><input type="radio" name="${k}" value="${esc(x)}"${x === v ? ' checked' : ''}${o.req ? ' required' : ''}><span>${esc(x)}</span></label>`).join('')}<small class="err" hidden></small></fieldset>`;
const fieldCheck = (k, html, v, req) => `<label class="choice check fld" data-f="${k}"><input type="checkbox" name="${k}"${v ? ' checked' : ''}${req ? ' required' : ''}><span>${html}${req ? ' <span class="req" aria-hidden="true">*</span>' : ''}</span><small class="err" hidden></small></label>`;

function infoFieldsets(i, opts = {}) {
  const A = AUTH(), u = A && A.user();
  const today = new Date().toISOString().slice(0, 10), minor = (ageOf(i.naissance) ?? 99) < 18, t = i.tuteur || {};
  return `<fieldset class="group"><legend>Identité</legend>
      ${fieldRadio('civilite', 'Civilité', ['Monsieur', 'Madame'], i.civilite, { req: 1 })}
      <div class="row2">${fieldText('prenom', 'Prénom(s)', i.prenom, { req: 1, ac: 'given-name' })}${fieldText('nom', 'Nom', i.nom, { req: 1, ac: 'family-name' })}</div>
      ${fieldText('naissance', 'Date de naissance', i.naissance, { req: 1, type: 'date', max: today, min: '1920-01-01', ac: 'bday' })}
    </fieldset>
    <fieldset class="group" id="tuteur-box"${minor ? '' : ' hidden'}><legend>Parent ou tuteur</legend>
      <p class="meta">Vous avez moins de 18 ans : l’inscription se fait avec l’accord d’un parent ou d’un tuteur.</p>
      <div class="row2">${fieldText('tNom', 'Nom et prénom(s) du parent ou tuteur', t.nom, { req: 1 })}${fieldText('tTel', 'Son téléphone', t.tel, { req: 1, type: 'tel', im: 'tel' })}</div>
      ${fieldCheck('tAccord', 'Mon parent ou tuteur est d’accord avec cette inscription.', !!t.accord, true)}
    </fieldset>
    <fieldset class="group"><legend>Coordonnées</legend>
      ${fieldText('email', 'Adresse e-mail (compte Google)', u ? u.email : '', { ro: 1, hint: 'C’est l’adresse de votre compte Google : elle identifie votre compte et ne peut pas être modifiée ici. Pour en utiliser une autre, déconnectez-vous et reconnectez-vous avec un autre compte Google.' })}
      <div class="fld tel-row" data-f="tel"><span class="lbl">Téléphone (WhatsApp de préférence)${reqMark(1)}</span>
        <div class="tel-in"><select name="ind" aria-label="Indicatif">${[...new Set(PAYS.map(p => p[1]).filter(Boolean))].map(c => `<option${c === i.ind ? ' selected' : ''}>${c}</option>`).join('')}</select>
        <input name="tel" type="tel" inputmode="tel" autocomplete="tel-national" value="${esc(i.tel || '')}" required aria-label="Numéro de téléphone" placeholder="07 00 00 00 00"></div><small class="err" hidden></small></div>
      <div class="row2">${fieldSelect('pays', 'Pays de résidence', PAYS.map(p => p[0]), i.pays, { req: 1 })}${fieldText('ville', 'Ville ou commune', i.ville, { req: 1, ac: 'address-level2' })}</div>
      <div id="pays-autre"${i.pays === 'Autre pays' ? '' : ' hidden'}>${fieldText('paysAutre', 'Précisez le pays', i.paysAutre, { req: 1 })}</div>
    </fieldset>
    <fieldset class="group"><legend>Votre profil</legend>
      ${fieldSelect('statut', 'Vous êtes', STATUTS, i.statut, { req: 1 })}
      ${fieldSelect('source', 'Comment avez-vous connu Lisân Campus ?', SOURCES, i.source)}
      ${opts.news !== false ? fieldCheck('news', 'Je souhaite recevoir les nouveautés des Éditions Lisân (nouveaux cours, nouveaux livres).', i.news, false) : ''}
    </fieldset>`;
}
function bindInfoFields(f) {
  const nb = f.elements.naissance, box = f.querySelector('#tuteur-box');
  const sync = () => { box.hidden = !((ageOf(nb.value) ?? 99) < 18); };
  nb.addEventListener('change', sync); nb.addEventListener('input', sync);
  const ps = f.elements.pays, pa = f.querySelector('#pays-autre');
  ps.addEventListener('change', () => { const c = (PAYS.find(p => p[0] === ps.value) || [])[1]; if (c) f.elements.ind.value = c;
    pa.hidden = ps.value !== 'Autre pays'; });
  f.addEventListener('input', e => { const w = e.target.closest('.fld'); if (w) { w.classList.remove('bad'); const er = w.querySelector('.err'); if (er) er.hidden = true; } });
}
function readInfo(f) {
  const g = k => (f.elements[k] && f.elements[k].value || '').trim();
  const minor = (ageOf(g('naissance')) ?? 99) < 18;
  return { civilite: (f.querySelector('[name=civilite]:checked') || {}).value || '', prenom: prenomFmt(g('prenom')), nom: g('nom').replace(/\s+/g, ' ').toUpperCase(),
    naissance: g('naissance'), ind: g('ind'), tel: g('tel').replace(/[^\d]/g, ''), pays: g('pays'), paysAutre: g('pays') === 'Autre pays' ? g('paysAutre') : '', ville: g('ville'),
    statut: g('statut'), source: g('source'), news: !!(f.elements.news && f.elements.news.checked),
    tuteur: minor ? { nom: g('tNom'), tel: g('tTel').replace(/[^\d+]/g, ''), accord: !!f.elements.tAccord.checked } : null };
}
function validate(f) {
  const bad = [];
  const fail = (k, msg) => { const w = f.querySelector(`[data-f="${k}"]`); if (!w) return; w.classList.add('bad'); const er = w.querySelector('.err'); if (er) { er.textContent = msg; er.hidden = false; } bad.push(w); };
  f.querySelectorAll('.fld').forEach(w => { w.classList.remove('bad'); const er = w.querySelector('.err'); if (er) er.hidden = true; });
  f.querySelectorAll('[data-f]').forEach(w => {
    if (w.closest('[hidden]')) return;
    const k = w.dataset.f, inputs = [...w.querySelectorAll('input, select')].filter(x => x.required);
    if (!inputs.length) return;
    const x = inputs[0];
    if (x.type === 'radio') { if (!w.querySelector('input:checked')) fail(k, 'Choisissez une réponse.'); }
    else if (x.type === 'checkbox') { if (!x.checked) fail(k, 'Cette case est obligatoire.'); }
    else if (!x.value.trim()) fail(k, 'Ce champ est obligatoire.');
  });
  const d = f.elements.naissance;
  if (d && d.value) { const a = ageOf(d.value); if (a === null || a < 4 || a > 105) fail('naissance', 'Vérifiez la date de naissance.'); }
  const t = f.elements.tel;
  if (t && t.value.trim() && !/^\d{6,15}$/.test(t.value.replace(/[^\d]/g, ''))) fail('tel', 'Numéro de téléphone incomplet : chiffres uniquement, sans l’indicatif.');
  const tt = f.elements.tTel;
  if (tt && tt.required && tt.value.trim() && !/^\+?\d{6,15}$/.test(tt.value.replace(/[^\d+]/g, ''))) fail('tTel', 'Numéro de téléphone incomplet.');
  if (bad.length) { bad[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); const i = bad[0].querySelector('input:not([type=radio]):not([readonly]), select'); if (i) setTimeout(() => i.focus({ preventScroll: true }), 300); }
  return !bad.length;
}

// ---------- résumé d'une fiche
const paysOf = i => i.pays === 'Autre pays' ? (i.paysAutre || 'Autre pays') : i.pays;
function infoRows(i) {
  const a = ageOf(i.naissance);
  const rows = [['Nom et prénom(s)', `${i.civilite === 'Madame' ? 'Mme' : 'M.'} ${String(i.nom || '').toUpperCase()} ${prenomFmt(i.prenom)}`], ['Date de naissance', `${dateFr(i.naissance)}${a !== null ? ` (${a} ans)` : ''}`],
    ['Téléphone', telFr(i.ind, i.tel)], ['Résidence', `${i.ville}, ${paysOf(i)}`], ['Profil', i.statut]];
  if (i.source) rows.push(['Connu par', i.source]);
  if (i.tuteur) rows.push(['Parent ou tuteur', `${i.tuteur.nom} · ${telFr('', i.tuteur.tel)}${i.tuteur.accord ? ' · accord donné' : ''}`]);
  rows.push(['Recevoir les nouveautés', i.news ? 'Oui' : 'Non']);
  return rows;
}
const dl = rows => `<dl class="recap">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v || '—')}</dd></div>`).join('')}</dl>`;
const answerRows = (id, rep) => (QUESTIONS[id] || []).filter(q => rep[q.k]).map(q => [q.l, rep[q.k]]);

// ---------- l'inscription : formulaire → vérification → confirmation
let enrollRun = null;   // { id, step, info, rep, attest, cgu, num, date, err }
function stepper(n) {
  const S = ['Vos informations', 'Vérification', 'Confirmation'];
  return `<ol class="stepper">${S.map((t, k) => `<li class="${k + 1 < n ? 'past' : k + 1 === n ? 'now' : ''}"><b>${k + 1 < n ? '✓' : k + 1}</b><span>${t}</span></li>`).join('')}</ol>`;
}
function viewEnroll(sp) {
  const A = AUTH(); if (!A) return null;
  const head = `${crumbs([sp.title, 'espace-' + sp.id], ['Inscription'])}`;
  if (!A.user()) return `${head}<div class="gate c-${sp.color}"><span class="sp-icon" aria-hidden="true">${sp.icon}</span>
      <h1>Inscription à l’espace « ${esc(sp.title)} »</h1>
      <p class="lead">Pour vous inscrire, connectez-vous d’abord avec votre compte Google. Vous remplirez ensuite votre fiche d’inscription.</p>
      <div class="actions"><button type="button" class="btn" data-auth="signin">Se connecter avec Google</button></div>
      <p class="meta">En vous connectant, vous acceptez les <a href="#conditions">conditions d’utilisation</a> et la <a href="#confidentialite">politique de confidentialité</a>.</p></div>`;
  if (!enrollRun || enrollRun.id !== sp.id) enrollRun = { id: sp.id, step: A.enrolled(sp.id) ? 'fiche' : 'form', info: defaultInfo(), rep: {} };
  if (A.enrolled(sp.id) && enrollRun.step !== 'done') enrollRun.step = 'fiche';
  return `${head}<div id="enroll" class="enroll c-${sp.color}"></div>`;
}
function bindEnroll() { if (document.getElementById('enroll')) drawEnroll(); }
function drawEnroll() {
  const box = document.getElementById('enroll'), R = enrollRun, sp = space(R.id), A = AUTH(), first = !(A.info && A.info());
  const title = `<span class="eyebrow">${sp.icon} ${esc(sp.title)}</span>`;
  if (R.step === 'form') {
    const qs = QUESTIONS[R.id] || [];
    box.innerHTML = `${title}<h1>Fiche d’inscription</h1>${stepper(1)}
      <p class="lead">${first ? 'Remplissez votre fiche une seule fois : vos informations seront reprises pour vos prochaines inscriptions.' : 'Vos informations sont déjà remplies d’après votre première inscription : vérifiez-les, puis répondez aux questions de cet espace.'}</p>
      <p class="meta">Les champs marqués <span class="req">*</span> sont obligatoires.</p>
      <form class="form enroll-form" novalidate>
        ${infoFieldsets(R.info)}
        <fieldset class="group"><legend>Votre parcours : ${esc(sp.title)}</legend>
          ${qs.map(q => q.t === 'radio' ? fieldRadio('q_' + q.k, q.l, q.o, R.rep[q.k], q) : q.t === 'select' ? fieldSelect('q_' + q.k, q.l, q.o, R.rep[q.k], q)
            : fieldText('q_' + q.k, q.l, R.rep[q.k] !== undefined ? R.rep[q.k] : (q.def || ''), { req: q.req })).join('')}
        </fieldset>
        <fieldset class="group"><legend>Engagements</legend>
          ${fieldCheck('attest', 'Je certifie que les informations de cette fiche sont exactes.', R.attest, true)}
          ${fieldCheck('cgu', 'J’ai lu et j’accepte les <a href="#conditions" target="_blank">conditions d’utilisation</a> et la <a href="#confidentialite" target="_blank">politique de confidentialité</a>.', R.cgu, true)}
        </fieldset>
        <div class="actions"><button type="submit" class="btn">Continuer</button><a class="btn ghost" href="#espace-${sp.id}">Annuler</a></div>
      </form>`;
    const f = box.querySelector('form'); bindInfoFields(f);
    f.addEventListener('submit', e => { e.preventDefault(); if (!validate(f)) return;
      R.info = readInfo(f); R.rep = {}; qs.forEach(q => { const v = q.t === 'radio' ? (f.querySelector(`[name="q_${q.k}"]:checked`) || {}).value : (f.elements['q_' + q.k].value || '').trim(); if (v) R.rep[q.k] = v; });
      R.attest = f.elements.attest.checked; R.cgu = f.elements.cgu.checked; R.step = 'check'; R.err = ''; drawEnroll(); window.scrollTo(0, 0); });
    return;
  }
  if (R.step === 'check') {
    box.innerHTML = `${title}<h1>Vérifiez votre inscription</h1>${stepper(2)}
      <p class="lead">Relisez votre fiche. Si tout est juste, confirmez votre inscription.</p>
      <section class="panel"><h2>Vos informations</h2>${dl([['Adresse e-mail', A.user().email], ...infoRows(R.info)])}</section>
      <section class="panel"><h2>Votre parcours</h2>${dl(answerRows(R.id, R.rep))}</section>
      ${R.err ? `<p class="notice bad-n" role="alert">${esc(R.err)}</p>` : ''}
      <div class="actions"><button type="button" class="btn" id="enroll-ok">Confirmer mon inscription</button><button type="button" class="btn ghost" id="enroll-back">Modifier</button></div>`;
    box.querySelector('#enroll-back').onclick = () => { R.step = 'form'; drawEnroll(); window.scrollTo(0, 0); };
    box.querySelector('#enroll-ok').onclick = e => { const b = e.currentTarget; b.disabled = true; b.textContent = 'Inscription en cours…';
      A.enroll(R.id, R.info, R.rep).then(en => { R.num = en.num; R.date = en.date; R.step = 'done'; drawEnroll(); window.scrollTo(0, 0); if (typeof renderDrawer === 'function') renderDrawer(); })
        .catch(() => { R.err = 'L’inscription n’a pas pu être enregistrée. Vérifiez votre connexion internet, puis réessayez.'; drawEnroll(); }); };
    return;
  }
  // confirmation (juste après l'inscription) ou fiche (inscription déjà faite)
  const en = A.enrollment(R.id) || {}, info = A.info() || R.info, done = R.step === 'done';
  const firstSub = SUBJECTS.find(s => spaceOf(s) === R.id);
  box.innerHTML = `${title}<h1>${done ? 'Inscription confirmée' : 'Ma fiche d’inscription'}</h1>${done ? stepper(4) : ''}
    ${done ? `<div class="notice ok big-ok"><b>✓ Bienvenue, ${esc(prenomFmt(info.prenom).split(' ')[0])} !</b> Votre inscription à l’espace « ${esc(sp.title)} » est enregistrée. Toutes les leçons de cet espace sont maintenant ouvertes.</div>` : ''}
    <section class="panel fiche"><div class="fiche-head"><img src="logo.png" alt="" width="44" height="44"><div><b>Lisân Campus · Éditions Lisân</b><small>Fiche d’inscription</small></div></div>
      ${dl([['Numéro d’inscription', en.num || R.num], ['Espace', sp.title], ['Date d’inscription', dateFr(en.date || R.date || new Date().toISOString())],
        ['Adresse e-mail', A.user().email], ...infoRows(info).filter(r => r[0] !== 'Recevoir les nouveautés'), ...answerRows(R.id, en.reponses || R.rep)])}
      <p class="meta">Conservez votre numéro d’inscription : il vous sera demandé si vous nous écrivez au sujet de votre inscription.</p></section>
    <div class="actions noprint">${firstSub ? `<a class="btn" href="#m-${firstSub.id}">${done ? 'Commencer' : 'Continuer'} mes leçons</a>` : ''}<a class="btn ghost" href="#espace-${sp.id}">Voir l’espace</a>
      <button type="button" class="btn ghost" data-print="1">Imprimer ma fiche</button><a class="btn ghost" href="#compte">Mon compte</a></div>`;
  if (done) R.step = 'fiche';
}

// ---------- modifier ma fiche personnelle
function viewProfil() {
  const A = AUTH(); if (!A || !A.user()) return null;
  return `${crumbs(['Mon compte', 'compte'], ['Mes informations'])}<div class="enroll"><h1>Mes informations</h1>
    <p class="lead">Ces informations sont communes à toutes vos inscriptions.</p><p class="meta">Les champs marqués <span class="req">*</span> sont obligatoires.</p>
    <form class="form enroll-form" id="profil-form" novalidate>${infoFieldsets(defaultInfo())}
      <div class="actions"><button type="submit" class="btn">Enregistrer</button><a class="btn ghost" href="#compte">Annuler</a></div><p class="meta" id="profil-msg" aria-live="polite"></p></form></div>`;
}
function bindProfil() {
  const f = document.getElementById('profil-form'); if (!f) return; bindInfoFields(f);
  f.addEventListener('submit', e => { e.preventDefault(); if (!validate(f)) return; const m = document.getElementById('profil-msg'); m.textContent = 'Enregistrement…';
    AUTH().saveInfo(readInfo(f)).then(() => { location.hash = '#compte'; }).catch(() => { m.textContent = 'L’enregistrement n’a pas abouti. Vérifiez votre connexion internet et réessayez.'; }); });
}

// ---------- mon compte : fiche, inscriptions, désinscription, suppression du compte
function accountPanels(A) {
  const i = A.info();
  const infoP = `<section class="panel"><h2>Mes informations</h2>${i ? dl(infoRows(i)) : '<p>Votre fiche sera créée lors de votre première inscription à un espace.</p>'}
    ${i ? '<div class="actions"><a class="btn ghost small" href="#profil">Modifier mes informations</a></div>' : ''}</section>`;
  const insP = `<section class="panel"><h2>Mes inscriptions</h2><p>Chaque espace demande une inscription séparée.</p>
    ${SPACES.map(sp => { const en = A.enrollment(sp.id);
      return `<div class="ins-row"><div><b>${sp.icon} ${esc(sp.title)}</b>${en ? `<small>N° ${esc(en.num)} · inscrit le ${dateFr(en.date)}</small>` : '<small>Non inscrit</small>'}</div>
        <div class="actions" id="ins-${sp.id}">${en ? `<a class="btn small" href="#espace-${sp.id}">Ouvrir</a><a class="btn ghost small" href="#inscription-${sp.id}">Ma fiche</a><button type="button" class="linkbtn small-l" data-unenroll="${sp.id}">Me désinscrire</button>`
          : `<a class="btn small" href="#inscription-${sp.id}">M’inscrire</a>`}</div></div>`; }).join('')}</section>`;
  return infoP + insP;
}
const dangerPanel = () => `<section class="panel danger"><h2>Supprimer mon compte</h2>
  <p>La suppression efface définitivement votre fiche, vos inscriptions et votre progression enregistrée dans votre compte.</p>
  <div id="del-zone"><button type="button" class="btn ghost small bad-b" data-delacct="ask">Supprimer mon compte</button></div></section>`;
document.addEventListener('click', e => {
  if (e.target.closest('[data-print]')) { window.print(); return; }
  const A = AUTH(); if (!A) return;
  const u = e.target.closest('[data-unenroll]');
  if (u) { const id = u.dataset.unenroll, z = document.getElementById('ins-' + id), sp = space(id);
    z.innerHTML = `<span class="meta">Vous désinscrire de « ${esc(sp.title)} » ?</span><button type="button" class="btn bad small" data-unenroll-yes="${id}">Oui, me désinscrire</button><button type="button" class="btn ghost small" data-unenroll-no="1">Non</button>`; return; }
  const uy = e.target.closest('[data-unenroll-yes]');
  if (uy) { uy.disabled = true; A.unenroll(uy.dataset.unenrollYes).then(route, route); return; }
  if (e.target.closest('[data-unenroll-no]')) { route(); return; }
  const d = e.target.closest('[data-delacct]');
  if (d) { const z = document.getElementById('del-zone');
    if (d.dataset.delacct === 'ask') z.innerHTML = `<p><b>Supprimer définitivement votre compte Lisân Campus ?</b> Cette action ne peut pas être annulée.</p><div class="actions"><button type="button" class="btn bad small" data-delacct="yes">Oui, supprimer mon compte</button><button type="button" class="btn ghost small" data-delacct="no">Annuler</button></div>`;
    else if (d.dataset.delacct === 'yes') { d.disabled = true; d.textContent = 'Suppression…';
      A.deleteAccount().then(() => { enrollRun = null; location.hash = '#accueil'; route(); },
        () => { z.innerHTML = '<p class="notice bad-n">La suppression n’a pas abouti. Reconnectez-vous puis réessayez, ou écrivez-nous depuis la page Contact.</p>'; }); }
    else z.innerHTML = '<button type="button" class="btn ghost small bad-b" data-delacct="ask">Supprimer mon compte</button>';
  }
});
