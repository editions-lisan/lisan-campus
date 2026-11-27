// ===== Lisân Campus · administration : liste des inscrits par espace, contact et export Excel
// Page #admin, réservée à l'administrateur par les règles Firestore (lecture de toute la collection users).

let adminRun = { list: null, err: '', sp: 'all', q: '', loading: false, tab: 'ins', rulesOk: true, cq: '' };
const ADMIN_FLAG = 'lc.admin';
const isAdminCached = () => { try { return localStorage.getItem(ADMIN_FLAG) === '1'; } catch (e) { return false; } };
const setAdminCached = v => { try { v ? localStorage.setItem(ADMIN_FLAG, '1') : localStorage.removeItem(ADMIN_FLAG); } catch (e) {} };
// Le lien « Administration » du menu : on ne compte plus seulement sur la mémoire du téléphone (perdue si l'on vide les
// données du navigateur, change d'appareil ou réinstalle l'application). Une fois connecté, le compte est vérifié une
// fois auprès de Firestore (une lecture) ; un compte élève n'est revérifié qu'au bout de sept jours.
const ADMIN_PROBE = 'lc.admin.probe';
let adminProbing = false;
function probeAdmin(onYes) {
  const A = AUTH(), u = A && A.user && A.user();
  if (!u || !u.uid || !A.adminProbe || adminProbing || isAdminCached()) return;
  let p = null; try { p = JSON.parse(localStorage.getItem(ADMIN_PROBE) || 'null'); } catch (e) {}
  if (p && p.uid === u.uid && !p.ok && Date.now() - p.t < 7 * 864e5) return;
  adminProbing = true;
  A.adminProbe().then(ok => { adminProbing = false;
    try { localStorage.setItem(ADMIN_PROBE, JSON.stringify({ uid: u.uid, t: Date.now(), ok })); } catch (e) {}
    if (ok) { setAdminCached(true); if (onYes) onYes(); } }, () => { adminProbing = false; });
}

const civ = i => i && i.civilite === 'Madame' ? 'Mme' : 'M.';
const waLink = i => { if (!i || !i.tel) return ''; let t = String(i.tel).replace(/\D/g, ''); const c = String(i.ind || '').replace(/\D/g, '');
  if (c && c !== '225') t = t.replace(/^0+/, ''); return `https://wa.me/${c}${t}`; };
const telLink = i => i && i.tel ? `tel:${i.ind || ''}${String(i.tel).replace(/\D/g, '')}` : '';

// ---------- progression des élèves (lue dans « progress » de chaque compte, synchronisée par le site)
const fmtDur = sec => { const m = Math.round((+sec || 0) / 60); if (m < 1) return sec > 0 ? 'moins d’une minute' : '0 min'; const h = Math.floor(m / 60), r = m % 60;
  return h ? `${h} h${r ? ' ' + String(r).padStart(2, '0') + ' min' : ''}` : `${m} min`; };
const dayFr = k => k ? dateFr(k + 'T12:00:00') : '—';
function progOf(u, spId) {                               // leçons terminées, parcours réussis et temps d'étude dans un espace
  const P = u.prog || {}, done = P.done || {}, quiz = P.quiz || {}, time = P.time || {};
  const subs = SUBJECTS.filter(s => spaceOf(s) === spId);
  const parc = subs.map(s => { const n = s.lessons.length, d = s.lessons.filter(l => done[s.id + '/' + l.id]).length;
    const e = quiz[s.id + '@eval'], o = quiz[s.id], best = e === undefined ? o : (o !== undefined && o >= LEGACY_QUIZ && o > e ? o : e);
    const ok = d === n && ((e || 0) >= CERT_QUIZ || (o || 0) >= LEGACY_QUIZ);
    return { s, n, d, best, ok }; });
  const n = parc.reduce((a, p) => a + p.n, 0), d = parc.reduce((a, p) => a + p.d, 0);
  const sec = Object.entries(time).filter(([k]) => subs.some(s => k.startsWith(s.id + '/'))).reduce((a, [, v]) => a + (+v || 0), 0);
  const cur = parc.find(p => p.d > 0 && !p.ok) || parc.find(p => !p.ok) || null;
  return { parc, n, d, pct: n ? Math.round(d * 100 / n) : 0, passed: parc.filter(p => p.ok).length, sec, cur };
}
function activity(u) {                                   // jours d'étude (secondes par jour, 120 derniers jours)
  const D = (u.prog || {}).days || {}, keys = Object.keys(D).filter(k => D[k] > 0).sort();
  let week = 0; const now = new Date();
  for (let i = 0; i < 7; i++) { const x = new Date(now); x.setDate(now.getDate() - i); week += +D[dayKey(x)] || 0; }
  let streak = 0; const x = new Date(); if (!D[dayKey(x)]) x.setDate(x.getDate() - 1);
  while (D[dayKey(x)] > 0) { streak++; x.setDate(x.getDate() - 1); }
  return { last: keys[keys.length - 1] || null, week, streak, days: keys.length };
}
function lastUse(u) {                                    // dernière utilisation du site : ouverture connectée (lastLogin), envoi de la progression (progress.at), à défaut dernier jour d'étude
  const t = [u.lastLogin, u.seenAt].filter(Boolean).map(x => new Date(x).getTime()).filter(x => x > 0), d = activity(u).last;
  if (d) t.push(new Date(d + 'T00:00:00').getTime());
  return t.length ? Math.max(...t) : 0;
}
const useDay = u => { const d = activity(u).last; return !!d && lastUse(u) === new Date(d + 'T00:00:00').getTime(); };   // seul le jour est connu
const useFr = u => { const t = lastUse(u); return !t ? '—' : useDay(u) ? dayFr(activity(u).last) : whenFr(new Date(t).toISOString()); };
const progBar = pct => `<div class="bar adm-bar"><i style="width:${Math.max(0, Math.min(100, pct))}%"></i></div>`;
function progLine(u, id) {
  const p = progOf(u, id), a = activity(u);
  return `<div class="adm-prog">${progBar(p.pct)}<small><b>${p.d} / ${p.n} leçons</b> (${p.pct} %) · ${p.passed} / ${p.parc.length} parcours réussi${p.passed > 1 ? 's' : ''} · ${fmtDur(p.sec)} d’étude · dernière activité : ${dayFr(a.last)}</small></div>`;
}
function progTable(u, id) {
  const p = progOf(u, id);
  return `<div class="tablewrap"><table class="adm-pt"><thead><tr><th>Parcours</th><th>Leçons</th><th>Évaluation</th></tr></thead><tbody>${p.parc.map(x => `<tr${x.ok ? ' class="ok"' : ''}><td>${esc(x.s.title)}</td><td>${x.d} / ${x.n}</td><td>${x.best === undefined ? '—' : Number(x.best) + ' %'}${x.ok ? ' ✓' : ''}</td></tr>`).join('')}</tbody></table></div>`;
}

function adminRows() {                                   // une ligne par inscription (personne × espace)
  const rows = [];
  (adminRun.list || []).forEach(u => Object.entries(u.spaces).forEach(([id, en]) => rows.push({ u, id, en })));
  return rows.sort((a, b) => String(b.en.date).localeCompare(String(a.en.date)));
}
function adminFiltered() {
  const q = adminRun.q.trim().toLowerCase();
  return adminRows().filter(r => (adminRun.sp === 'all' || r.id === adminRun.sp) && (!q || [r.u.info && r.u.info.nom, r.u.info && r.u.info.prenom, r.u.name, r.u.email,
    r.u.info && r.u.info.tel, r.u.info && r.u.info.ville, r.en.num].join(' ').toLowerCase().includes(q)));
}

function viewAdmin() {
  const A = AUTH(); if (!A) return null;
  const head = crumbs(['Administration']);
  if (!A.user()) return `${head}<div class="gate"><span class="sp-icon" aria-hidden="true">📋</span><h1>Administration</h1>
    <p class="lead">Connectez-vous avec le compte Google de l’administrateur.</p><div class="actions"><button type="button" class="btn" data-auth="signin">Se connecter avec Google</button></div></div>`;
  return `${head}<div id="admin" class="admin"></div>`;
}
function bindAdmin() { if (!document.getElementById('admin')) return; if (!adminRun.list && !adminRun.loading) loadAdmin(); else { drawAdmin(); if (!adminRun.err) adminLive(); } }
// liste en direct : un compte qui se crée, une inscription ou une progression apparaissent aussitôt (sans « Actualiser »)
function adminLive() {
  const A = AUTH(); if (!A || !A.adminWatch || adminRun.unsub) return;
  adminRun.unsub = A.adminWatch((list, changes, fromCache) => {
    const before = new Set((adminRun.list || []).map(u => u.uid)), first = !adminRun.liveAt;
    adminRun.list = list; adminRun.liveAt = Date.now(); adminRun.live = !fromCache;
    if (!first) { const fresh = list.filter(u => !before.has(u.uid));
      fresh.forEach(u => adminToast(`Nouveau compte : ${u.name || u.email || 'élève'}`));
      const mod = changes.filter(c => c.type === 'modified').length; if (mod && !fresh.length) adminRun.changed = (adminRun.changed || 0) + mod; }
    if (!document.getElementById('admin') || adminRun.loading) return;
    const busy = document.activeElement && document.getElementById('admin').contains(document.activeElement) && /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (busy) { adminRun.stale = true; const n = document.getElementById('adm-live'); if (n) n.innerHTML = adminLiveLine(); } else drawAdmin();
  }, () => { adminRun.unsub = null; adminRun.live = false; const n = document.getElementById('adm-live'); if (n) n.innerHTML = adminLiveLine(); });
}
function adminStop() { if (adminRun.unsub) { try { adminRun.unsub(); } catch (e) {} } adminRun.unsub = null; adminRun.liveAt = 0; }
window.addEventListener('hashchange', () => { if (!/^#admin\b/.test(location.hash)) adminStop(); });
const whenFr = iso => { if (!iso) return '—'; const t = new Date(iso).getTime(), m = Math.round((Date.now() - t) / 60000);
  if (m < 1) return 'à l’instant'; if (m < 60) return `il y a ${m} min`; if (new Date(t).toDateString() === new Date().toDateString()) return `aujourd’hui à ${hm(t)}`; return dateFr(iso); };
const hm = ms => new Date(ms).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
function adminLiveLine() {
  const R = adminRun;
  if (R.unsub && R.live) return `<span class="live-dot" aria-hidden="true"></span> En direct · mis à jour à ${hm(R.liveAt)}${R.stale ? ' · <button type="button" class="linkbtn" data-admin="redraw">afficher les nouveautés</button>' : ''}`;
  if (R.unsub) return `<span class="live-dot off" aria-hidden="true"></span> Connexion au direct…`;
  return `<span class="live-dot off" aria-hidden="true"></span> Direct interrompu · <button type="button" class="linkbtn" data-admin="reload">reprendre</button>`;
}
function adminToast(t) {
  let z = document.getElementById('adm-toasts'); if (!z) { z = document.createElement('div'); z.id = 'adm-toasts'; z.setAttribute('aria-live', 'polite'); document.body.appendChild(z); }
  const e = document.createElement('div'); e.className = 'adm-toast'; e.textContent = '🔔 ' + t; z.appendChild(e); setTimeout(() => e.remove(), 6000);
}
function loadAdmin() {
  adminRun.loading = true; adminRun.err = ''; drawAdmin(); adminStop();
  AUTH().adminList().then(async list => { adminRun.list = list; adminRun.rulesOk = await AUTH().certRulesOk(); adminLive();
    adminRun.registry = null; try { adminRun.registry = await AUTH().adminRegistry(); } catch (e) {}
    adminRun.msgs = []; if (AUTH().adminMessages) { try { adminRun.msgs = await AUTH().adminMessages(); } catch (e) {} } await felicLoad(); adminRun.acces = {}; adminRun.accesOk = false; if (AUTH().adminAcces) { try { adminRun.acces = await AUTH().adminAcces(); adminRun.accesOk = true; } catch (e) {} } adminRun.loading = false; setAdminCached(true); drawAdmin(); if (typeof renderDrawer === 'function') renderDrawer(); })
    .catch(e => { adminRun.loading = false; adminRun.list = null;
      adminRun.err = e && /permission/.test(e.code || e.message || '') ? 'denied' : 'network'; if (adminRun.err === 'denied') setAdminCached(false); drawAdmin(); });
}
function rulesFor(uid) {
  return `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && request.auth.uid in ['${uid}'];
    }
    function isOwner(uid) {
      return request.auth != null && request.auth.uid == uid;
    }
    // Fiche de l'élève : uniquement les champs prévus par le site
    function validUser() {
      let d = request.resource.data;
      return d.keys().hasOnly(['name', 'email', 'photo', 'lastLogin', 'createdAt', 'profile', 'spaces', 'progress', 'certificats', 'suggestions'])
        && (!('profile' in d) || d.profile is map)
        && (!('spaces' in d) || (d.spaces is map && d.spaces.size() <= 10))
        && (!('certificats' in d) || (d.certificats is map && d.certificats.size() <= 60))
        && (!('suggestions' in d) || (d.suggestions is map && d.suggestions.size() <= 200));
    }
    match /users/{uid} {
      allow read: if isOwner(uid) || isAdmin();
      allow create, update: if isOwner(uid) && validUser();
      allow delete: if isOwner(uid);
    }
    // Registre des certificats : chacun peut vérifier un certificat par son numéro
    match /certificats/{num} {
      allow get: if true;
      allow list: if isAdmin();
      // un certificat est écrit une seule fois, à la date du serveur, par un élève inscrit à l'espace ; il ne peut plus être modifié
      allow create: if request.auth != null
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.num == num
        && num.matches('LCC-[0-9]{4}-[A-Z0-9]{8}')
        && request.resource.data.type in ['parcours', 'espace']
        && request.resource.data.keys().hasOnly(['num', 'uid', 'key', 'type', 'titre', 'espace', 'spaceId', 'subjectId', 'lecons', 'quiz', 'civilite', 'nom', 'prenom', 'date', 'v'])
        && request.resource.data.date == request.time
        && request.resource.data.nom is string && request.resource.data.nom.size() <= 80
        && request.resource.data.prenom is string && request.resource.data.prenom.size() <= 80
        && request.resource.data.titre is string && request.resource.data.titre.size() <= 120
        && request.resource.data.espace is string && request.resource.data.espace.size() <= 120
        && request.resource.data.lecons is int && request.resource.data.lecons > 0 && request.resource.data.lecons <= 2000
        && (request.resource.data.quiz == null || (request.resource.data.quiz is int && request.resource.data.quiz >= 70 && request.resource.data.quiz <= 100))
        && request.resource.data.spaceId in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.spaces;
      allow update: if false;
      allow delete: if isAdmin() || (request.auth != null && resource.data.uid == request.auth.uid);
    }
    // Messages du formulaire de contact : chacun peut écrire, seul l'administrateur lit
    match /messages/{id} {
      allow create: if request.resource.data.keys().hasOnly(['nom', 'email', 'sujet', 'message', 'date', 'uid'])
        && request.resource.data.nom is string && request.resource.data.nom.size() > 0 && request.resource.data.nom.size() <= 100
        && request.resource.data.email is string && request.resource.data.email.size() <= 150 && request.resource.data.email.matches('[^@ ]+@[^@ ]+[.][^@ ]+')
        && request.resource.data.sujet is string && request.resource.data.sujet.size() <= 80
        && request.resource.data.message is string && request.resource.data.message.size() > 0 && request.resource.data.message.size() <= 4000
        && request.resource.data.date == request.time
        && (!('uid' in request.resource.data) || (request.auth != null && request.resource.data.uid == request.auth.uid));
      allow read, delete: if isAdmin();
    }
    // Parcours ouverts par l'administrateur à un élève, sans le parcours précédent : l'élève lit seulement sa ligne
    match /acces/{uid} {
      allow get: if isOwner(uid) || isAdmin();
      allow list, create, update, delete: if isAdmin();
    }
    // Livrets du maître : déposés et lus par l'administrateur seul (fichier découpé en morceaux), jamais publics
    match /maitre/{doc=**} {
      allow read, write: if isAdmin();
    }
    // Classement de la semaine (facultatif) : visible par les élèves connectés ; chacun n'écrit que sa ligne
    match /classement/{uid} {
      allow read: if request.auth != null;
      allow create, update: if isOwner(uid)
        && request.resource.data.keys().hasOnly(['nom', 'sem', 'xp', 'tot', 'serie', 'esp', 'maj'])
        && request.resource.data.nom is string && request.resource.data.nom.size() > 0 && request.resource.data.nom.size() <= 24
        && request.resource.data.sem is string && request.resource.data.sem.matches('[0-9]{4}-S[0-9]{2}')
        && request.resource.data.xp is int && request.resource.data.xp >= 0 && request.resource.data.xp <= 30000
        && request.resource.data.tot is int && request.resource.data.tot >= 0 && request.resource.data.tot <= 5000000
        && request.resource.data.serie is int && request.resource.data.serie >= 0 && request.resource.data.serie <= 4000
        && (!('esp' in request.resource.data) || (request.resource.data.esp is list && request.resource.data.esp.size() <= 8))
        && request.resource.data.maj == request.time;
      allow delete: if isOwner(uid) || isAdmin();
    }
    // Félicitations déjà envoyées (une ligne par élève, une entrée par parcours ou espace réussi) : administrateur seul
    match /felicitations/{uid} {
      allow read, write: if isAdmin();
    }
    // repère de version des règles (vérifié par la page d'administration)
    match /regles/{v} {
      allow get: if v == 'v8';
    }
  }
}`;
}
const rulesBox = (A, intro) => `<details class="panel"${intro.open ? ' open' : ''}><summary><b>${intro.title}</b></summary>
    <ol><li>Copiez les règles ci-dessous : elles contiennent l’identifiant de votre compte (<code>${esc(A.uid())}</code>).</li>
      <li>Dans la console Firebase : <b>Firestore Database → Règles</b>, remplacez tout le texte par celui-ci, puis <b>Publier</b>.</li>
      <li>Revenez ici et touchez <b>Réessayer</b>.</li></ol>
    <pre class="rules" id="admin-rules">${esc(rulesFor(A.uid()))}</pre>
    <div class="actions"><button type="button" class="btn small" data-admin="copy">Copier les règles</button><button type="button" class="btn ghost small" data-admin="reload">Réessayer</button></div>
    <p class="meta" id="admin-copy" aria-live="polite"></p></details>`;
function drawAdmin() {
  const box = document.getElementById('admin'); if (!box) return;
  const A = AUTH(), R = adminRun; R.stale = false;
  if (R.loading) { box.innerHTML = '<h1>Administration</h1><p class="lead">Chargement des inscrits…</p>'; return; }
  if (R.err === 'denied') {
    box.innerHTML = `<h1>Administration</h1><div class="notice">Cette page est réservée à l’administrateur de Lisân Campus.</div>
      ${rulesBox(A, { title: 'Vous êtes l’administrateur ? Activer l’accès' })}`;
    return;
  }
  if (R.err === 'network') { box.innerHTML = `<h1>Administration</h1><p class="notice bad-n">Impossible de charger la liste. Vérifiez votre connexion internet.</p><div class="actions"><button type="button" class="btn" data-admin="reload">Réessayer</button></div>`; return; }
  const all = adminRows(), list = R.list || [], week = Date.now() - 7 * 864e5;
  const count = id => all.filter(r => r.id === id).length;
  const fresh = all.filter(r => new Date(r.en.date).getTime() > week).length;
  const noIns = list.filter(u => !Object.keys(u.spaces).length).length;
  const rows = adminFiltered(), certs = adminCerts(), suggs = adminSuggs(), avis = adminAvis();
  const felic = R.felic = felicRows();
  const majR = R.maj = majRows(), majTodo = majR.filter(r => !r.sent && !r.stop).length;
  const stat = (n, t, c) => `<div class="stat${c ? ' c-' + c : ''}"><b>${n}</b><span>${esc(t)}</span></div>`;
  const active = list.filter(u => activity(u).week > 0).length;
  const today = list.filter(u => u.lastLogin && new Date(u.lastLogin).toDateString() === new Date().toDateString()).length;
  const tabs = `<div class="chips adm-tabs" role="group" aria-label="Rubrique"><button type="button" class="chip" data-admin-tab="ins" aria-pressed="${R.tab === 'ins'}">👥 Inscrits (${new Set(all.map(r => r.u.uid)).size})</button>
    <button type="button" class="chip" data-admin-tab="prog" aria-pressed="${R.tab === 'prog'}">📈 Progression</button>
    <button type="button" class="chip" data-admin-tab="acc" aria-pressed="${R.tab === 'acc'}">👤 Comptes (${list.length})</button>
    <button type="button" class="chip" data-admin-tab="cert" aria-pressed="${R.tab === 'cert'}">🎓 Certificats (${certs.length})</button>
    <button type="button" class="chip" data-admin-tab="felic" aria-pressed="${R.tab === 'felic'}">🎉 Félicitations${felic.filter(r => !r.sent).length ? ` (${felic.filter(r => !r.sent).length} à envoyer)` : ''}</button>
    <button type="button" class="chip" data-admin-tab="maj" aria-pressed="${R.tab === 'maj'}">📬 Mises à jour${majTodo ? ` (${majTodo} à envoyer)` : ''}</button>
    <button type="button" class="chip" data-admin-tab="avis" aria-pressed="${R.tab === 'avis'}">⭐ Avis (${avis.length})</button>
    <button type="button" class="chip" data-admin-tab="sugg" aria-pressed="${R.tab === 'sugg'}">💡 Suggestions (${suggs.length})</button>
    <button type="button" class="chip" data-admin-tab="msg" aria-pressed="${R.tab === 'msg'}">✉️ Messages (${(R.msgs || []).length})</button></div>`;
  const head = `<span class="eyebrow">Éditions Lisân</span><h1>Administration</h1>
    ${R.rulesOk === true ? '' : `<div class="notice bad-n">${R.rulesOk === false ? 'Les règles Firebase doivent être mises à jour (certificats, parcours ouverts à un élève, livrets du maître, classement de la semaine, félicitations et mises à jour envoyées)' : 'Impossible de vérifier les règles Firebase pour le moment (connexion) : par précaution, republiez-les'} : copiez-les et publiez-les dans la console Firebase.</div>${rulesBox(A, { title: 'Mettre à jour les règles', open: true })}`}
    <div class="stats">${stat(list.length, 'comptes créés')}${stat(all.length, 'inscriptions')}${stat(fresh, 'nouvelles (7 jours)')}${stat(noIns, 'comptes sans inscription')}${stat(today, 'connectés aujourd’hui')}${stat(active, 'actifs (7 jours)')}
      ${stat(certs.length, 'certificats délivrés')}${stat(avis.length ? (avis.reduce((a, r) => a + r.x.note, 0) / avis.length).toFixed(1).replace('.', ',') + ' ★' : '—', avis.length + ' avis')}${stat(suggs.length, 'suggestions')}
      </div><p class="adm-spc">${SPACES.map(sp => `<span class="tag">${sp.icon} ${esc(sp.title)} : <b>${count(sp.id)}</b></span>`).join(' ')}</p>${tabs}
    <p class="meta adm-live" id="adm-live" aria-live="polite">${adminLiveLine()}</p>
    <div class="actions"><button type="button" class="btn small" data-admin="xlsx">⬇ Télécharger en Excel</button>${R.tab === 'sugg' ? '<button type="button" class="btn ghost small" data-admin="sugdoc">⬇ Document des suggestions</button>' : ''}${R.tab === 'ins' ? '<button type="button" class="btn ghost small" data-admin="csv">⬇ CSV</button>' : ''}
      <button type="button" class="btn ghost small" data-admin="reload">↻ Actualiser</button></div>
    ${R.rulesOk === true ? rulesBox(A, { title: '🔐 Règles Firebase : à jour (version v8) — les copier pour les republier' }) : ''}`;
  if (R.tab === 'cert') { box.innerHTML = `${head}<p class="meta" id="admin-msg" aria-live="polite">${certs.length} certificat${certs.length > 1 ? 's' : ''} délivré${certs.length > 1 ? 's' : ''}.</p><div class="adm-list">${certCards(certs)}</div>`; return; }
  if (R.tab === 'msg') { const ms = R.msgs || [];
    box.innerHTML = `${head}<p class="meta" id="admin-msg" aria-live="polite">${ms.length} message${ms.length > 1 ? 's' : ''} reçu${ms.length > 1 ? 's' : ''} par le formulaire de contact.</p><div class="adm-list">${msgCards(ms)}</div>`; return; }
  if (R.tab === 'acc') {
    box.innerHTML = `${head}<input class="search" id="admin-cq" type="search" placeholder="Rechercher : nom, e-mail…" value="${esc(R.cq)}" aria-label="Rechercher un compte">
      <p class="meta" id="admin-msg" aria-live="polite">${list.length} compte${list.length > 1 ? 's' : ''} créé${list.length > 1 ? 's' : ''}, du plus récent au plus ancien. Un compte est créé à la première connexion Google ; l’inscription à un espace se fait ensuite avec la fiche.</p>
      <div class="adm-list" id="acc-list">${accCards(accFiltered())}</div>`;
    const cq = document.getElementById('admin-cq');
    cq.addEventListener('input', () => { R.cq = cq.value; document.getElementById('acc-list').innerHTML = accCards(accFiltered()); });
    return;
  }
  if (R.tab === 'prog') {
    const pr = progRows();
    box.innerHTML = `${head}
      <div class="chips" role="group" aria-label="Filtrer par espace"><button type="button" class="chip" data-admin-sp="all" aria-pressed="${R.sp === 'all'}">Tous</button>
        ${SPACES.map(sp => `<button type="button" class="chip" data-admin-sp="${sp.id}" aria-pressed="${R.sp === sp.id}">${sp.icon} ${esc(sp.title)}</button>`).join('')}</div>
      <p class="meta" id="admin-msg" aria-live="polite">${insMsg(pr)} De la personne qui a utilisé le site le plus récemment à la plus ancienne ; le détail de chaque espace se déroule. La progression est celle que le site a synchronisée (élève connecté).</p>
      <div class="adm-list">${progCards(pr)}</div>`;
    return;
  }
  if (R.tab === 'maj') { box.innerHTML = `${head}${majPanel(majR)}`; return; }
  if (R.tab === 'felic') { const todo = felic.filter(r => !r.sent).length;
    box.innerHTML = `${head}<p class="meta" id="admin-msg" aria-live="polite">${felic.length} réussite${felic.length > 1 ? 's' : ''} (parcours et espaces), dont ${todo} à féliciter. Le message est prêt et modifiable : envoyez-le sur WhatsApp ou par e-mail. Une fois envoyé, il est grisé pour cette personne et cette réussite seulement, sur tous vos appareils${adminRun.felicOk ? '' : ' (pour l’instant sur cet appareil : republiez les règles Firestore pour l’enregistrer en ligne)'} ; chaque nouvelle réussite reste à féliciter.</p><div class="adm-list">${felicCards(felic)}</div>`; return; }
  if (R.tab === 'avis') { box.innerHTML = `${head}<p class="meta" id="admin-msg" aria-live="polite">${avis.length} avis donné${avis.length > 1 ? 's' : ''} à la fin d’un parcours ou d’un espace.</p>${avisSummary(avis)}<div class="adm-list">${avisCards(avis)}</div>`; return; }
  if (R.tab === 'sugg') { box.innerHTML = `${head}<p class="meta" id="admin-msg" aria-live="polite">${suggs.length} suggestion${suggs.length > 1 ? 's' : ''}, de la plus récente à la plus ancienne.</p><div class="adm-list">${suggCards(suggs)}</div>`; return; }
  box.innerHTML = `${head}
    <div class="chips" role="group" aria-label="Filtrer par espace"><button type="button" class="chip" data-admin-sp="all" aria-pressed="${R.sp === 'all'}">Tous (${all.length})</button>
      ${SPACES.map(sp => `<button type="button" class="chip" data-admin-sp="${sp.id}" aria-pressed="${R.sp === sp.id}">${sp.icon} ${esc(sp.title)} (${count(sp.id)})</button>`).join('')}</div>
    <input class="search" id="admin-q" type="search" placeholder="Rechercher : nom, téléphone, ville, numéro…" value="${esc(R.q)}" aria-label="Rechercher un inscrit">
    <p class="meta" id="admin-msg" aria-live="polite">${insMsg(rows)} Touchez un espace pour voir l’inscription et la progression. L’export Excel contient tous les inscrits, avec une feuille par espace.</p>
    <div class="adm-list" id="adm-list">${adminCards(rows)}</div>`;
  const q = document.getElementById('admin-q');
  q.addEventListener('input', () => { R.q = q.value; document.getElementById('adm-list').innerHTML = adminCards(adminFiltered());
    document.getElementById('admin-msg').textContent = insMsg(adminFiltered()); });
}
function adminCerts() { const out = []; (adminRun.list || []).forEach(u => (u.certs || []).forEach(c => out.push({ u, c }))); return out.sort((a, b) => String(b.c.date).localeCompare(String(a.c.date))); }
function adminAvis() { const out = []; (adminRun.list || []).forEach(u => (u.avis || []).forEach(x => out.push({ u, x }))); return out.sort((a, b) => String(b.x.date).localeCompare(String(a.x.date))); }
const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
function avisSummary(rows) {                             // moyenne et répartition des notes, par parcours ou espace
  if (!rows.length) return '';
  const by = {}; rows.forEach(({ x }) => { const k = x.cle; (by[k] = by[k] || { titre: x.titre, espace: x.espace, n: [0, 0, 0, 0, 0, 0], tot: 0, c: 0 }); by[k].n[x.note]++; by[k].tot += x.note; by[k].c++; });
  const list = Object.values(by).sort((a, b) => b.c - a.c);
  return `<div class="tablewrap stk"><table class="adm-pt"><thead><tr><th>Parcours ou espace</th><th>Avis</th><th>Moyenne</th><th>Répartition (1 à 5 ★)</th></tr></thead><tbody>${list.map(r =>
    `<tr><td data-l="Parcours ou espace">${esc(r.titre)}${r.espace && r.espace !== r.titre ? ` <small>· ${esc(r.espace)}</small>` : ''}</td><td data-l="Avis">${r.c}</td><td data-l="Moyenne"><b>${(r.tot / r.c).toFixed(1).replace('.', ',')}</b> <span class="st">${stars(Math.round(r.tot / r.c))}</span></td>
    <td data-l="Répartition">${[1, 2, 3, 4, 5].map(k => `${k}★ ${r.n[k]}`).join(' · ')}</td></tr>`).join('')}</tbody></table></div>`;
}
function avisCards(rows) {
  if (!rows.length) return '<p class="meta">Aucun avis pour le moment. Les élèves le donnent à la fin d’un parcours ou d’un espace, avant leur certificat.</p>';
  return rows.map(({ u, x }) => `<article class="adm-card c-${x.note >= 4 ? 'b' : x.note === 3 ? 'a' : 'h'}"><div class="adm-top"><b>${esc(x.titre || x.cle)}</b><small>${x.date ? dateFr(x.date) : ''}</small></div>
    <p><span class="st" aria-label="${x.note} sur 5">${stars(x.note)}</span> · ${esc(['', 'Décevant', 'Moyen', 'Bien', 'Très bien', 'Excellent'][x.note] || '')}</p>
    ${x.impressions ? `<small>Impressions</small><p class="sugg-text">${esc(x.impressions)}</p>` : ''}${x.ameliorations ? `<small>Suggestions d’amélioration</small><p class="sugg-text">${esc(x.ameliorations)}</p>` : ''}
    <small>De ${esc(who(u))}${u.email ? ' · ' + esc(u.email) : ''}</small>
    ${x.impressions || x.ameliorations ? `<div class="actions">${waLink(u.info) ? `<a class="btn small" href="${waLink(u.info)}" target="_blank" rel="noopener">Répondre sur WhatsApp</a>` : ''}${u.email ? `<a class="btn ghost small" href="mailto:${esc(u.email)}?subject=${encodeURIComponent('Votre avis sur Lisân Campus')}">Répondre par e-mail</a>` : ''}</div>` : ''}</article>`).join('');
}
// ---------- félicitations : un message prêt à envoyer (WhatsApp, e-mail) à chaque élève qui a réussi un parcours ou tout un espace
// Une fois les félicitations envoyées à une personne pour un événement (parcours réussi « p:<parcours> », espace réussi « e:<espace> »),
// la carte est grisée et rangée dans « Déjà félicités » : la marque porte sur le couple personne + événement, jamais au-delà.
// Elle est enregistrée dans Firestore (felicitations/{uid}, administrateur seul) pour valoir sur tous les appareils, et gardée sur l'appareil en secours.
const FELIC_KEY = 'lc.felic';                            // copie sur l'appareil : { '<uid>|<événement>': date } ou { d, via }
const felicLocal = () => { try { return JSON.parse(localStorage.getItem(FELIC_KEY) || '{}') || {}; } catch (e) { return {}; } };
const felicLocalSet = (k, v) => { const m = felicLocal(); if (v) m[k] = v; else delete m[k]; try { localStorage.setItem(FELIC_KEY, JSON.stringify(m)); } catch (e) {} };
const felicVal = v => !v ? null : typeof v === 'number' ? { d: v, via: '' } : { d: +v.d || 0, via: v.via || '' };
function felicSent() {                                   // marques réunies : Firestore d'abord, l'appareil ensuite
  const out = {}; Object.entries(felicLocal()).forEach(([k, v]) => { const x = felicVal(v); if (x) out[k] = x; });
  Object.entries(adminRun.felicDone || {}).forEach(([uid, ev]) => Object.entries(ev || {}).forEach(([e, v]) => { const x = felicVal(v); if (x) out[uid + '|' + e] = x; }));
  return out;
}
async function felicLoad() {                             // lecture des marques ; les marques laissées sur cet appareil sont recopiées dans Firestore
  adminRun.felicOk = false; if (!AUTH() || !AUTH().adminFelic) return;
  try { adminRun.felicDone = await AUTH().adminFelic(); adminRun.felicOk = true; } catch (e) { adminRun.felicDone = adminRun.felicDone || {}; return; }
  for (const [k, v] of Object.entries(felicLocal())) { const i = k.indexOf('|'), uid = k.slice(0, i), ev = k.slice(i + 1), x = felicVal(v);
    if (x && uid && ev && !((adminRun.felicDone[uid] || {})[ev])) { try { await AUTH().adminSetFelic(uid, ev, x); (adminRun.felicDone[uid] = adminRun.felicDone[uid] || {})[ev] = x; } catch (e) { break; } } }
}
function felicMark(r, on, via) {
  const x = on ? { d: Date.now(), via: via || '' } : null;
  felicLocalSet(r.k, x);
  const m = adminRun.felicDone || (adminRun.felicDone = {}); m[r.u.uid] = m[r.u.uid] || {}; if (x) m[r.u.uid][r.ev] = x; else delete m[r.u.uid][r.ev];
  if (AUTH() && AUTH().adminSetFelic) AUTH().adminSetFelic(r.u.uid, r.ev, x).catch(() => {});
}
const FELIC_VIA = { wa: 'WhatsApp', mail: 'e-mail', main: '' };
const FELIC_DOUA = { arabe: 'Qu’Allah bénisse vos efforts et vous accorde la réussite (Bârakallâhu fîk).', coran: 'Qu’Allah bénisse vos efforts et fasse du Coran la lumière de votre cœur (Bârakallâhu fîk).', islam: 'Qu’Allah bénisse vos efforts et vous accorde la science utile (Bârakallâhu fîk).' };
function felicRows() {                                   // une ligne par parcours réussi, et par espace réussi en entier (plusieurs parcours)
  const out = [], sent = felicSent();
  (adminRun.list || []).forEach(u => Object.keys(u.spaces).forEach(id => {
    const sp = space(id); if (!sp) return; const p = progOf(u, id), cert = key => (u.certs || []).find(c => c.key === key) || null;
    const next = p.parc.find(y => !y.ok);
    p.parc.filter(x => x.ok).forEach(x => out.push({ k: u.uid + '|p:' + x.s.id, ev: 'p:' + x.s.id, u, sp, kind: 'p', s: x.s, best: x.best, c: cert('p:' + x.s.id), next: next && next.s, all: p.passed === p.parc.length && p.parc.length > 1 }));
    if (p.parc.length > 1 && p.passed === p.parc.length) out.push({ k: u.uid + '|e:' + id, ev: 'e:' + id, u, sp, kind: 'e', n: p.parc.length, c: cert('e:' + id) });
  }));
  out.forEach(r => { const x = sent[r.k]; r.sent = x ? x.d || 1 : 0; r.via = x ? x.via : ''; });
  return out.sort((a, b) => (!!a.sent - !!b.sent) || (a.sent ? b.sent - a.sent : String((b.c || {}).date || '').localeCompare(String((a.c || {}).date || ''))));
}
function felicText(r) {
  const i = r.u.info || {}, nom = `${i.civilite === 'Madame' ? 'Madame' : i.civilite ? 'Monsieur' : ''} ${prenomFmt(i.prenom || r.u.name)} ${String(i.nom || '').toUpperCase()}`.replace(/\s+/g, ' ').trim();
  const L = [`Bonjour ${nom || ''},`.replace(' ,', ','), ''];
  if (r.kind === 'e') {
    L.push(`Toute l’équipe des Éditions Lisân vous adresse ses plus chaleureuses félicitations : vous avez réussi les ${r.n} parcours de l’espace « ${r.sp.title} » de Lisân Campus. C’est un très beau résultat, fruit de votre travail et de votre persévérance.`);
    L.push('', r.c ? `Votre grand certificat n° ${r.c.num} est vérifiable en ligne : ${verifUrl(r.c.num)}` : `Votre grand certificat vous attend : connectez-vous sur ${SITE_URL}#espace-${r.sp.id} pour l’obtenir.`);
  } else {
    L.push(`Toute l’équipe des Éditions Lisân vous adresse ses chaleureuses félicitations : vous avez terminé le parcours « ${r.s.title} »${r.s.title === r.sp.title ? '' : ` (espace « ${r.sp.title} »)`} de Lisân Campus${r.best !== undefined && r.best !== null ? `, avec ${Number(r.best)} % à l’évaluation finale` : ''}.`);
    L.push('', r.c ? `Votre certificat de réussite n° ${r.c.num} est vérifiable en ligne : ${verifUrl(r.c.num)}` : `Votre certificat de réussite vous attend : connectez-vous sur ${SITE_URL}#m-${r.s.id} pour l’obtenir.`);
    if (r.next) L.push('', `Prochaine étape : le parcours « ${r.next.title} » vous attend : ${SITE_URL}#m-${r.next.id}`);
    else if (r.all) L.push('', `Vous avez réussi tous les parcours de l’espace : votre grand certificat de l’espace vous attend aussi.`);
  }
  if (FELIC_DOUA[r.sp.id]) L.push('', FELIC_DOUA[r.sp.id]);
  L.push('', 'Merci pour votre confiance et bonne continuation !', '', 'Mouhamadou CISSEMA', 'Éditions Lisân · Lisân Campus', SITE_URL);
  return L.join('\n');
}
const felicSubject = r => r.kind === 'e' ? `Félicitations : espace « ${r.sp.title} » réussi — Lisân Campus` : `Félicitations : parcours « ${r.s.title} » réussi — Lisân Campus`;
function felicCard(r, n) {
  const wa = waLink(r.u.info), off = r.sent ? ' disabled aria-disabled="true"' : '';
  const what = r.kind === 'e' || r.s.title === r.sp.title ? (r.kind === 'e' ? r.sp.title : r.s.title) : r.s.title + ' · ' + r.sp.title;
  return `<article class="adm-card c-${r.sp.color}${r.sent ? ' felic-sent' : ''}"><div class="adm-top"><b>${esc(who(r.u))}</b><span class="tag">${r.kind === 'e' ? '🏅 Espace réussi' : '🎓 Parcours réussi'}</span></div>
      <small>${esc(what)}${r.c ? ' · certificat n° ' + esc(r.c.num) + ' du ' + dateFr(r.c.date) : ' · certificat pas encore demandé'}</small>
      ${r.sent ? `<p class="felic-done">✓ Félicitations envoyées le ${dateFr(r.sent)}${r.via ? ' (' + esc(r.via) + ')' : ''} pour cette réussite</p>` : ''}
      <details${r.sent ? '' : ' open'}><summary>${r.sent ? 'Message envoyé' : 'Message de félicitations'}</summary><textarea class="felic-t" id="felic-${n}" rows="12" aria-label="Message de félicitations (modifiable)"${r.sent ? ' readonly' : ''}>${esc(felicText(r))}</textarea></details>
      <div class="actions">${wa ? `<button type="button" class="btn small" data-felic="wa" data-n="${n}"${off}>Envoyer sur WhatsApp</button>` : ''}${r.u.email ? `<button type="button" class="btn ${wa ? 'ghost ' : ''}small" data-felic="mail" data-n="${n}"${off}>Envoyer par e-mail</button>` : ''}
        <button type="button" class="btn ghost small" data-felic="copy" data-n="${n}"${off}>Copier</button>
        ${r.sent ? `<button type="button" class="linkbtn small-l" data-felic="unsent" data-n="${n}">Le message n’est pas parti : le rétablir</button>` : `<button type="button" class="linkbtn small-l" data-felic="sent" data-n="${n}">Déjà envoyé autrement : marquer comme envoyé</button>`}</div></article>`;
}
function felicCards(rows) {
  if (!rows.length) return '<p class="meta">Aucun parcours réussi pour le moment.</p>';
  const todo = [], done = []; rows.forEach((r, n) => (r.sent ? done : todo).push(felicCard(r, n)));
  return `${todo.length ? todo.join('') : '<p class="meta">Toutes les réussites ont reçu leurs félicitations. Une nouvelle réussite (autre parcours, autre espace, autre élève) apparaîtra ici automatiquement.</p>'}
    ${done.length ? `<details class="felic-old"><summary>Déjà félicités (${done.length})</summary>${done.join('')}</details>` : ''}`;
}
function felicAction(b) {
  const rows = adminRun.felic || [], r = rows[+b.dataset.n]; if (!r) return;
  const ta = document.getElementById('felic-' + b.dataset.n), txt = ta ? ta.value : felicText(r), k = b.dataset.felic;
  if (r.sent && k !== 'unsent') return;                  // déjà félicité pour cette réussite : rien à renvoyer
  if (k === 'wa') { window.open(waLink(r.u.info) + '?text=' + encodeURIComponent(txt), '_blank', 'noopener'); felicMark(r, true, FELIC_VIA.wa); }
  else if (k === 'mail') { location.href = `mailto:${r.u.email}?subject=${encodeURIComponent(felicSubject(r))}&body=${encodeURIComponent(txt)}`; felicMark(r, true, FELIC_VIA.mail); }
  else if (k === 'copy') { const done = () => { b.textContent = 'Copié ✓'; };
    try { navigator.clipboard.writeText(txt).then(done, () => { ta.select(); b.textContent = 'Sélectionné : copiez'; }); } catch (e) { if (ta) ta.select(); } return; }
  else felicMark(r, k === 'sent', '');
  setTimeout(drawAdmin, k === 'mail' ? 600 : 0);
}
// ---------- mises à jour de Lisân Campus : un message à envoyer à chaque inscrit, par WhatsApp ou par e-mail
// Tous les inscrits les reçoivent, sauf refus : case décochée dans la fiche (maj = false) ou « STOP » reçu (marque « majstop » posée par l'administrateur).
// Une mise à jour = un identifiant (MAJ.id) : une fois envoyée à une personne, sa ligne est grisée pour cette mise à jour seulement (felicitations/{uid}, ev « maj:<id> ») ;
// une nouvelle mise à jour (nouvel identifiant) rend tout le monde de nouveau destinataire.
const MAJ = { id: '2026-11-27', titre: 'Mise à jour de Lisân Campus', texte: `Lisân Campus a été mis à jour :

• Un accueil personnel : la leçon à reprendre, les objectifs du jour, votre série et vos points d’expérience.
• Chaque parcours devient un chemin d’étoiles, de la première leçon jusqu’à l’évaluation et au certificat.
• « Mes progrès » : vos chiffres, votre régularité et seize distinctions à obtenir.
• Une barre de navigation en bas de l’écran : Accueil, Apprendre, Réviser, Bibliothèque, Progrès.
• Le classement de la semaine (facultatif) et un rappel quotidien à l’heure de votre choix.
• En droit : des sujets d’examen corrigés, la Charte des Nations Unies et le Statut de la Cour internationale de Justice.
• Le mode d’emploi en vidéo, refait pour tout montrer.

Ouvrez le site : https://lisan-campus.pages.dev
Si l’application est installée, touchez le logo en haut de l’écran pour recevoir la dernière version.` };
const MAJ_DRAFT = 'lc.maj.draft';
const majDraft = () => { try { const d = JSON.parse(localStorage.getItem(MAJ_DRAFT) || 'null'); if (d && d.id === MAJ.id) return d.t; } catch (e) {} return MAJ.texte; };
function majRows() {
  const sent = felicSent(), ev = 'maj:' + MAJ.id;
  return (adminRun.list || []).filter(u => u.info && (waLink(u.info) || u.email) && Object.keys(u.spaces || {}).length).map(u => {
    const x = sent[u.uid + '|' + ev], st = sent[u.uid + '|majstop'];
    return { k: u.uid + '|' + ev, ev, u, sent: x ? x.d || 1 : 0, via: x ? x.via : '', stop: u.info.maj === false ? 'fiche' : st ? 'stop' : '' };
  }).sort((a, b) => (!!a.stop - !!b.stop) || (!!a.sent - !!b.sent) || who(a.u).localeCompare(who(b.u), 'fr'));
}
const majText = (r, t) => `Bonjour ${civ(r.u.info) === 'Mme' ? 'Madame' : 'Monsieur'} ${prenomFmt((r.u.info || {}).prenom || r.u.name || '')},\n\n${t}\n\nLes Éditions Lisân\n\nPour ne plus recevoir ces messages, répondez « STOP ».`;
function majPanel(rows) {
  const ok = rows.filter(r => !r.stop), todo = ok.filter(r => !r.sent), done = ok.filter(r => r.sent), off = rows.filter(r => r.stop);
  const mails = todo.filter(r => r.u.email).map(r => r.u.email);
  const card = (r) => { const n = rows.indexOf(r), wa = waLink(r.u.info), dis = r.sent || r.stop ? ' disabled aria-disabled="true"' : '';
    return `<article class="adm-card${r.sent || r.stop ? ' felic-sent' : ''}"><div class="adm-top"><b>${esc(who(r.u))}</b><span class="tag">${Object.keys(r.u.spaces).map(id => (space(id) || {}).icon || '').join(' ')}</span></div>
      <small>${esc([telFr((r.u.info || {}).ind, (r.u.info || {}).tel), r.u.email].filter(Boolean).join(' · '))}</small>
      ${r.sent ? `<p class="felic-done">✓ Mise à jour envoyée le ${dateFr(r.sent)}${r.via ? ' (' + esc(r.via) + ')' : ''}</p>` : ''}
      ${r.stop ? `<p class="meta">${r.stop === 'fiche' ? 'A refusé les mises à jour dans sa fiche.' : 'A répondu « STOP » : ne plus lui envoyer de mises à jour.'}</p>` : ''}
      <div class="actions">${wa ? `<button type="button" class="btn small" data-maj="wa" data-n="${n}"${dis}>Envoyer sur WhatsApp</button>` : ''}${r.u.email ? `<button type="button" class="btn ${wa ? 'ghost ' : ''}small" data-maj="mail" data-n="${n}"${dis}>Envoyer par e-mail</button>` : ''}
        ${r.stop === 'stop' ? `<button type="button" class="linkbtn small-l" data-maj="unstop" data-n="${n}">Reprendre les envois</button>` : r.stop ? '' : r.sent ? `<button type="button" class="linkbtn small-l" data-maj="unsent" data-n="${n}">Le message n’est pas parti : le rétablir</button>`
          : `<button type="button" class="linkbtn small-l" data-maj="sent" data-n="${n}">Déjà envoyé autrement</button><button type="button" class="linkbtn small-l" data-maj="stop" data-n="${n}">A répondu « STOP »</button>`}</div></article>`; };
  return `<p class="meta" id="admin-msg" aria-live="polite">Mise à jour du ${dateFr(MAJ.id)} : ${ok.length} destinataire${ok.length > 1 ? 's' : ''} (tous les inscrits joignables, sauf refus), dont ${todo.length} à qui l’envoyer. Chaque envoi est grisé pour cette personne et cette mise à jour seulement ; une prochaine mise à jour rendra tout le monde de nouveau destinataire.</p>
    <details class="adm-sp" open><summary>Le message (modifiable ; « Bonjour Madame / Monsieur … » et la ligne « STOP » sont ajoutés pour chaque personne)</summary>
      <textarea class="felic-t" id="maj-t" rows="16" aria-label="Message de mise à jour">${esc(majDraft())}</textarea>
      <div class="actions"><button type="button" class="btn ghost small" data-maj="reset">Revenir au message proposé</button>
      ${mails.length ? `<button type="button" class="btn ghost small" data-maj="bcc">Copier les ${mails.length} adresses e-mail (pour un envoi groupé en copie cachée)</button>` : ''}</div></details>
    <div class="adm-list">${todo.length ? todo.map(card).join('') : '<p class="meta">La mise à jour a été envoyée à tous les destinataires.</p>'}
      ${done.length ? `<details class="felic-old"><summary>Déjà envoyée (${done.length})</summary>${done.map(card).join('')}</details>` : ''}
      ${off.length ? `<details class="felic-old"><summary>Ne reçoivent pas les mises à jour (${off.length})</summary>${off.map(card).join('')}</details>` : ''}</div>`;
}
function majAction(b) {
  const k = b.dataset.maj, ta = document.getElementById('maj-t');
  if (k === 'reset') { try { localStorage.removeItem(MAJ_DRAFT); } catch (e) {} if (ta) ta.value = MAJ.texte; return; }
  if (k === 'bcc') { const rows = (adminRun.maj || []).filter(r => !r.sent && !r.stop && r.u.email), list = rows.map(r => r.u.email).join(', ');
    try { navigator.clipboard.writeText(list).then(() => { b.textContent = 'Adresses copiées ✓'; }); } catch (e) {} return; }
  const r = (adminRun.maj || [])[+b.dataset.n]; if (!r) return;
  if ((r.sent || r.stop) && !['unsent', 'unstop'].includes(k)) return;
  const txt = majText(r, ta ? ta.value : majDraft());
  if (k === 'wa') { window.open(waLink(r.u.info) + '?text=' + encodeURIComponent(txt), '_blank', 'noopener'); felicMark(r, true, FELIC_VIA.wa); }
  else if (k === 'mail') { location.href = `mailto:${r.u.email}?subject=${encodeURIComponent(MAJ.titre)}&body=${encodeURIComponent(txt)}`; felicMark(r, true, FELIC_VIA.mail); }
  else if (k === 'sent' || k === 'unsent') felicMark(r, k === 'sent', '');
  else if (k === 'stop' || k === 'unstop') felicMark({ k: r.u.uid + '|majstop', ev: 'majstop', u: r.u }, k === 'stop', '');
  setTimeout(drawAdmin, k === 'mail' ? 600 : 0);
}
document.addEventListener('input', e => { if (e.target.id === 'maj-t') { try { localStorage.setItem(MAJ_DRAFT, JSON.stringify({ id: MAJ.id, t: e.target.value })); } catch (x) {} } });
function adminSuggs() { const out = []; (adminRun.list || []).forEach(u => (u.sugg || []).forEach(x => out.push({ u, x }))); return out.sort((a, b) => String(b.x.date).localeCompare(String(a.x.date))); }
const who = u => { const i = u.info || {}; return `${civ(i)} ${String(i.nom || '').toUpperCase()} ${prenomFmt(i.prenom || u.name)}`.trim(); };
function certCards(rows) {
  if (!rows.length) return '<p class="meta">Aucun certificat délivré pour le moment.</p>';
  return rows.map(({ u, c }) => { const revoked = adminRun.registry && !adminRun.registry.has(c.num);
    return `<article class="adm-card c-${(space(c.spaceId) || { color: 'a' }).color}${revoked ? ' revoked' : ''}"><div class="adm-top"><b>${esc(who(u))}</b><span class="tag">${revoked ? '✗ Annulé' : c.type === 'espace' ? '🏅 Grand certificat' : '🎓 Parcours'}</span></div>
    <small>N° ${esc(c.num)} · délivré le ${dateFr(c.date)}</small><p>${esc(c.titre)}${c.type === 'parcours' ? ' · ' + esc(c.espace) : ''} · ${Number(c.lecons) || 0} leçons${c.quiz !== null && c.quiz !== undefined ? ' · quiz ' + Number(c.quiz) + ' %' : ''}</p>
    <div class="actions" id="rv-${esc(c.num)}"><a class="btn ghost small" href="#verifier-${esc(c.num)}">Voir le certificat</a>${waLink(u.info) ? `<a class="btn ghost small" href="${waLink(u.info)}" target="_blank" rel="noopener">Féliciter sur WhatsApp</a>` : ''}
      ${revoked || !adminRun.registry ? '' : `<button type="button" class="linkbtn small-l" data-revoke="${esc(c.num)}">Annuler ce certificat</button>`}</div></article>`; }).join('');
}
function msgCards(ms) {
  if (!ms.length) return '<p class="meta">Aucun message pour le moment.</p>';
  return ms.map(m => `<article class="adm-card c-h" id="msg-${esc(m.id)}"><div class="adm-top"><b>${esc(m.sujet || 'Message')}</b><small>${m.date ? dateFr(m.date) : ''}</small></div>
    <p class="sugg-text">${esc(m.message)}</p><small>De ${esc(m.nom)} · ${esc(m.email)}</small>
    <div class="actions"><a class="btn small" href="mailto:${esc(m.email)}?subject=${encodeURIComponent('Re : ' + (m.sujet || 'votre message') + ' — Lisân Campus')}">Répondre par e-mail</a>
      <button type="button" class="linkbtn small-l" data-msg-del="${esc(m.id)}">Supprimer</button></div></article>`).join('');
}
function suggCards(rows) {
  if (!rows.length) return '<p class="meta">Aucune suggestion pour le moment.</p>';
  return rows.map(({ u, x }) => `<article class="adm-card c-a"><div class="adm-top"><b>${esc(x.type || 'Suggestion')}</b><small>${dateFr(x.date)}</small></div>
    ${x.contexte ? `<small>À propos de : ${esc(x.contexte)}</small>` : ''}<p class="sugg-text">${esc(x.texte)}</p>
    <small>De ${esc(who(u))}${u.email ? ' · ' + esc(u.email) : ''}</small>
    <div class="actions">${waLink(u.info) ? `<a class="btn small" href="${waLink(u.info)}" target="_blank" rel="noopener">Répondre sur WhatsApp</a>` : ''}${u.email ? `<a class="btn ghost small" href="mailto:${esc(u.email)}?subject=${encodeURIComponent('Votre suggestion sur Lisân Campus')}">Répondre par e-mail</a>` : ''}</div></article>`).join('');
}
function progRows() {
  return adminRows().filter(r => adminRun.sp === 'all' || r.id === adminRun.sp)
    .map(r => Object.assign({ p: progOf(r.u, r.id), a: activity(r.u), t: lastUse(r.u) }, r))
    .sort((x, y) => y.t - x.t || String(x.u.uid).localeCompare(String(y.u.uid)) || y.p.d - x.p.d);
}
function progCards(rows) {
  if (!rows.length) return '<p class="meta">Aucune inscription pour le moment.</p>';
  return byPerson(rows).map(({ u, items }) => { const a = items[0].a, one = items.length === 1;
    const d = items.reduce((n, r) => n + r.p.d, 0), n = items.reduce((k, r) => k + r.p.n, 0), sec = items.reduce((k, r) => k + r.p.sec, 0);
    const passed = items.reduce((k, r) => k + r.p.passed, 0), pct = n ? Math.round(d / n * 100) : 0;
    return `<article class="adm-card c-${one ? space(items[0].id).color : 'a'}"><div class="adm-top"><b>${esc(who(u))}</b><span>${items.map(r => `<span class="tag" title="${esc(space(r.id).title)}">${space(r.id).icon}${one ? ' ' + esc(space(r.id).title) : ''}</span>`).join(' ')}</span></div>
      <small class="adm-seen">🕒 Dernière utilisation : <b>${useFr(u)}</b></small>
      ${progBar(pct)}<p><b>${d} / ${n} leçons</b> (${pct} %) · ${passed} parcours réussi${passed > 1 ? 's' : ''} · ${fmtDur(sec)} d’étude${one ? '' : ` · ${items.length} espaces`}</p>
      <small>Cette semaine : ${fmtDur(a.week)} · série : ${a.streak} jour${a.streak > 1 ? 's' : ''} · dernier jour d’étude : ${dayFr(a.last)}</small>
      ${items.map(({ id, p }) => { const sp = space(id);
        return `<details class="adm-sp"><summary><b>${sp.icon} ${esc(sp.title)}</b><small>${p.d} / ${p.n} leçons (${p.pct} %) · ${p.cur ? 'en cours : ' + esc(p.cur.s.title) : 'tous les parcours sont réussis'}</small></summary>
          <div>${progBar(p.pct)}<p>${p.passed} / ${p.parc.length} parcours réussi${p.passed > 1 ? 's' : ''} · ${fmtDur(p.sec)} d’étude</p>${progTable(u, id)}</div></details>`; }).join('')}</article>`; }).join('');
}
function accFiltered() {
  const q = adminRun.cq.trim().toLowerCase();
  return (adminRun.list || []).filter(u => !q || [u.name, u.email, u.info && u.info.nom, u.info && u.info.prenom].join(' ').toLowerCase().includes(q))
    .sort((a, b) => String(b.createdAt || b.lastLogin || '').localeCompare(String(a.createdAt || a.lastLogin || '')));
}
// Ouvrir un parcours à un seul élève, sans qu'il ait réussi le parcours précédent (collection acces, règles v5)
const ORDERED = () => SUBJECTS.filter(s => !freeOrder(s) && spaceSubjects(s)[0] !== s);
function accesCtl(u) {
  if (!adminRun.rulesOk && !adminRun.accesOk) return '';
  const on = Object.keys(((adminRun.acces || {})[u.uid] || {}).parcours || {}).filter(id => SUBJECTS.some(s => s.id === id));
  const opts = ORDERED().filter(s => !on.includes(s.id));
  return `<div class="adm-acces" data-acces-uid="${esc(u.uid)}">${on.map(id => { const s = SUBJECTS.find(x => x.id === id);
      return `<span class="tag">🔓 ${esc(s.title)} <button type="button" class="linkbtn" data-acces-off="${esc(id)}" aria-label="Refermer ${esc(s.title)}">refermer</button></span>`; }).join(' ')}
    ${opts.length ? `<label class="meta">Ouvrir un parcours sans le précédent : <select data-acces-sel>${opts.map(s => `<option value="${esc(s.id)}">${esc(space(spaceOf(s)).title)} · ${esc(s.title)}</option>`).join('')}</select></label>
    <button type="button" class="btn ghost small" data-acces-on="1">Ouvrir pour cet élève</button>` : ''}<small class="meta" data-acces-msg aria-live="polite"></small></div>`;
}
function accesAction(b) {
  const box = b.closest('[data-acces-uid]'), uid = box.dataset.accesUid, msg = box.querySelector('[data-acces-msg]');
  const u = (adminRun.list || []).find(x => x.uid === uid) || {};
  const id = b.dataset.accesOff || box.querySelector('[data-acces-sel]').value, on = !b.dataset.accesOff;
  const s = SUBJECTS.find(x => x.id === id); b.disabled = true; msg.textContent = 'Enregistrement…';
  AUTH().adminSetAcces(uid, id, on, u.info ? who(u) : u.name).then(() => {
    const a = adminRun.acces || (adminRun.acces = {}); const r = a[uid] || (a[uid] = { parcours: {} }); r.parcours = r.parcours || {};
    if (on) r.parcours[id] = true; else delete r.parcours[id];
    box.outerHTML = accesCtl(u);
    const nb = document.querySelector(`[data-acces-uid="${CSS.escape(uid)}"] [data-acces-msg]`);
    if (nb) nb.textContent = on ? `« ${s.title} » est ouvert pour cet élève : il le verra à sa prochaine connexion ou en actualisant la page.` : `« ${s.title} » est refermé pour cet élève.`;
  }, () => { b.disabled = false; msg.textContent = 'Échec : vérifiez la connexion, et que les règles Firebase sont à jour.'; });
}
function accCards(list) {
  if (!list.length) return '<p class="meta">Aucun compte pour le moment.</p>';
  return list.map(u => { const ids = Object.keys(u.spaces), a = activity(u), wa = waLink(u.info);
    return `<article class="adm-card c-${ids.length ? 'a' : 'h'}"><div class="adm-top"><b>${esc(u.info ? who(u) : (u.name || 'Compte sans nom'))}</b><small>${u.createdAt ? 'créé ' + (Date.now() - new Date(u.createdAt) < 864e5 ? whenFr(u.createdAt) : 'le ' + dateFr(u.createdAt)) : ''}</small></div>
      <small>${esc(u.email || '')}${u.lastLogin ? ' · dernière connexion : ' + whenFr(u.lastLogin) : ''}</small>
      <p>${ids.length ? ids.map(id => `<span class="tag">${space(id).icon} ${esc(space(id).title)}</span>`).join(' ') : '<span class="tag">Aucune inscription : fiche non remplie</span>'}</p>
      <small>${u.done} leçon${u.done > 1 ? 's' : ''} terminée${u.done > 1 ? 's' : ''} · dernière activité : ${dayFr(a.last)}</small>
      <div class="actions">${wa ? `<a class="btn small" href="${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}${u.email ? `<a class="btn ghost small" href="mailto:${esc(u.email)}?subject=${encodeURIComponent('Lisân Campus')}">E-mail</a>` : ''}</div>${accesCtl(u)}</article>`; }).join('');
}
// une fiche par compte : identité et contacts une seule fois, puis chaque inscription (espace) à dérouler
const insMsg = rows => { const p = new Set(rows.map(r => r.u.uid)).size; return `${p} personne${p > 1 ? 's' : ''} · ${rows.length} inscription${rows.length > 1 ? 's' : ''}.`; };
function byPerson(rows) {
  const m = new Map(); rows.forEach(r => { if (!m.has(r.u.uid)) m.set(r.u.uid, { u: r.u, items: [] }); m.get(r.u.uid).items.push(r); }); return [...m.values()];
}
function adminCards(rows) {
  if (!rows.length) return '<p class="meta">Aucune inscription pour le moment.</p>';
  return byPerson(rows).map(({ u, items }) => { const i = u.info || {}, a = ageOf(i.naissance), wa = waLink(i), one = items.length === 1;
    const sps = items.map(r => space(r.id)), color = one ? sps[0].color : 'a';
    return `<article class="adm-card c-${color}">
      <div class="adm-top"><b>${esc(civ(i))} ${esc(String(i.nom || '').toUpperCase())} ${esc(prenomFmt(i.prenom || u.name))}</b><span>${sps.map(sp => `<span class="tag" title="${esc(sp.title)}">${sp.icon}${one ? ' ' + esc(sp.title) : ''}</span>`).join(' ')}</span></div>
      <small>${items.length} inscription${one ? '' : 's'} · ${u.lastLogin ? 'dernière connexion : ' + whenFr(u.lastLogin) : 'jamais reconnecté'}</small>
      <p>${[a !== null ? a + ' ans' : '', STATUT_OLD[i.statut] || i.statut, [i.ville, paysOf(i)].filter(Boolean).join(', ')].filter(Boolean).map(esc).join(' · ')}</p>
      <div class="actions">${wa ? `<a class="btn small" href="${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}${i.tel ? `<a class="btn ghost small" href="${telLink(i)}">Appeler ${esc(telFr(i.ind, i.tel))}</a>` : ''}
        ${u.email ? `<a class="btn ghost small" href="mailto:${esc(u.email)}">E-mail</a>` : ''}</div>
      ${items.map(({ id, en }) => { const sp = space(id), p = progOf(u, id);
        return `<details class="adm-sp"><summary><b>${sp.icon} ${esc(sp.title)}</b><small>N° ${esc(en.num)} · inscrit le ${dateFr(en.date)} · ${p.d} / ${p.n} leçons (${p.pct} %)</small></summary>
          <div>${progLine(u, id)}${progTable(u, id)}${dl(answerRows(id, en.reponses))}${SUBJECTS.some(s => spaceOf(s) === id && !freeOrder(s)) ? accesCtl(u) : ''}</div></details>`; }).join('')}
      <details><summary>Fiche complète</summary>${dl([['Adresse e-mail', u.email], ...infoRows(i), ['Leçons terminées (compte)', String(u.done)],
        ['Dernière connexion', u.lastLogin ? dateFr(u.lastLogin) : '—']])}</details></article>`; }).join('');
}

// ---------- export : Excel (feuille « Tous » + une feuille par espace) et CSV
const COLS = [['N° d’inscription', 14], ['Espace', 18], ['Date d’inscription', 14], ['Civilité', 9], ['Nom', 16], ['Prénoms', 18], ['Date de naissance', 14], ['Âge', 6],
  ['Téléphone', 16], ['Lien WhatsApp', 30], ['E-mail', 28], ['Pays', 14], ['Ville', 14], ['Situation', 30], ['Détails du parcours', 44], ['Connu par', 20], ['Mises à jour', 12], ['Parent ou tuteur', 20], ['Tél. parent', 14]];
function baseLine({ u, id, en }) {
  const i = u.info || {}, a = ageOf(i.naissance), d = en.date ? new Date(en.date) : null;
  return [en.num, space(id).title, d ? d.toLocaleDateString('fr-FR') : '', i.civilite || '', String(i.nom || '').toUpperCase(), prenomFmt(i.prenom || u.name), i.naissance ? new Date(i.naissance + 'T00:00:00').toLocaleDateString('fr-FR') : '',
    a === null ? '' : a, telFr(i.ind, i.tel), waLink(i), u.email, paysOf(i) || '', i.ville || '', STATUT_OLD[i.statut] || i.statut || '', parcoursText(i), i.source || '', i.maj === false ? 'Non' : 'Oui',
    i.tuteur ? i.tuteur.nom : '', i.tuteur ? i.tuteur.tel : ''];
}
const answersText = (id, rep) => answerRows(id, rep).map(([k, v]) => `${k} : ${v}`).join(' | ');
function sheetsData() {
  const rows = adminRows();
  const out = [{ name: 'Tous les inscrits', head: [...COLS.map(c => c[0]), 'Réponses'], widths: [...COLS.map(c => c[1]), 60], data: rows.map(r => [...baseLine(r), answersText(r.id, r.en.reponses)]) }];
  SPACES.forEach(sp => { const qs = QUESTIONS[sp.id] || [], rs = rows.filter(r => r.id === sp.id);
    out.push({ name: sp.title.replace(/[\\/?*[\]:]/g, ' ').slice(0, 31), head: [...COLS.map(c => c[0]), ...qs.map(q => q.l)], widths: [...COLS.map(c => c[1]), ...qs.map(() => 26)],
      data: rs.map(r => [...baseLine(r), ...qs.map(q => r.en.reponses[q.k] || '')]) }); });
  out.push({ name: 'Progression', head: ['Nom', 'Espace', 'Leçons terminées', 'Leçons au total', 'Progression (%)', 'Parcours réussis', 'Parcours au total', 'En cours', 'Temps d’étude (min)', 'Cette semaine (min)', 'Série (jours)', 'Dernier jour d’étude', 'Dernière utilisation', 'Téléphone', 'E-mail'],
    widths: [28, 20, 10, 10, 10, 10, 10, 30, 12, 12, 10, 14, 18, 18, 28],
    data: rows.slice().sort((x, y) => lastUse(y.u) - lastUse(x.u) || String(x.u.uid).localeCompare(String(y.u.uid))).map(r => { const p = progOf(r.u, r.id), a = activity(r.u), t = lastUse(r.u);
      return [who(r.u), space(r.id).title, p.d, p.n, p.pct, p.passed, p.parc.length, p.cur ? p.cur.s.title : 'Terminé', Math.round(p.sec / 60), Math.round(a.week / 60), a.streak, a.last ? new Date(a.last + 'T12:00:00').toLocaleDateString('fr-FR') : '', t ? new Date(t).toLocaleString('fr-FR', useDay(r.u) ? { dateStyle: 'short' } : { dateStyle: 'short', timeStyle: 'short' }) : '', telFr((r.u.info || {}).ind, (r.u.info || {}).tel), r.u.email]; }) });
  out.push({ name: 'Comptes', head: ['Nom (compte Google)', 'Nom (fiche)', 'E-mail', 'Créé le', 'Dernière connexion', 'Inscriptions', 'Leçons terminées', 'Dernière activité'], widths: [26, 28, 30, 14, 16, 40, 10, 14],
    data: (adminRun.list || []).slice().sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || ''))).map(u => { const a = activity(u);
      return [u.name || '', u.info ? who(u) : '', u.email || '', u.createdAt ? new Date(u.createdAt).toLocaleDateString('fr-FR') : '', u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('fr-FR') : '',
        Object.keys(u.spaces).map(id => space(id).title).join(', ') || 'Aucune', u.done, a.last ? new Date(a.last + 'T12:00:00').toLocaleDateString('fr-FR') : '']; }) });
  const cr = adminCerts();
  out.push({ name: 'Certificats', head: ['N° du certificat', 'Type', 'Parcours ou espace', 'Espace', 'Délivré le', 'Titulaire', 'Leçons', 'Quiz (%)', 'Téléphone', 'E-mail'], widths: [20, 16, 30, 24, 14, 28, 8, 9, 18, 28],
    data: cr.map(({ u, c }) => [c.num, c.type === 'espace' ? 'Grand certificat' : 'Parcours', c.titre, c.espace, c.date ? new Date(c.date).toLocaleDateString('fr-FR') : '', who(u), Number(c.lecons) || 0, c.quiz === null || c.quiz === undefined ? '' : Number(c.quiz), telFr((u.info || {}).ind, (u.info || {}).tel), u.email]) });
  const av = adminAvis();
  out.push({ name: 'Avis', head: ['Date', 'Parcours ou espace', 'Espace', 'Note (sur 5)', 'Impressions', 'Suggestions d’amélioration', 'De', 'Téléphone', 'E-mail'], widths: [12, 30, 22, 10, 60, 60, 26, 18, 28],
    data: av.map(({ u, x }) => [x.date ? new Date(x.date).toLocaleDateString('fr-FR') : '', x.titre || x.cle, x.espace || '', x.note, x.impressions || '', x.ameliorations || '', who(u), telFr((u.info || {}).ind, (u.info || {}).tel), u.email]) });
  const sg = adminSuggs();
  out.push({ name: 'Suggestions', head: ['Date', 'Type', 'À propos de', 'Suggestion', 'De', 'Téléphone', 'E-mail'], widths: [12, 26, 30, 70, 26, 18, 28],
    data: sg.map(({ u, x }) => [x.date ? new Date(x.date).toLocaleDateString('fr-FR') : '', x.type || '', x.contexte || '', x.texte || '', who(u), telFr((u.info || {}).ind, (u.info || {}).tel), u.email]) });
  return out;
}
const stamp = () => new Date().toISOString().slice(0, 10);
function exportXlsx() {
  const msg = document.getElementById('admin-msg');
  const go = () => { const wb = XLSX.utils.book_new();
    sheetsData().forEach(s => { const ws = XLSX.utils.aoa_to_sheet([s.head, ...s.data]); ws['!cols'] = s.widths.map(w => ({ wch: w }));
      ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: Math.max(s.data.length, 1), c: s.head.length - 1 } }) };
      XLSX.utils.book_append_sheet(wb, ws, s.name); });
    XLSX.writeFile(wb, `Lisan-Campus-inscrits-${stamp()}.xlsx`); msg.textContent = 'Le fichier Excel a été téléchargé.'; };
  if (window.XLSX) return go();
  msg.textContent = 'Préparation du fichier Excel…';
  const s = document.createElement('script'); s.src = 'vendor/xlsx.mini.min.js'; s.onload = go;
  s.onerror = () => { msg.textContent = 'Le fichier Excel n’a pas pu être préparé : utilisez l’export CSV.'; }; document.head.appendChild(s);
}
function exportSuggDoc() {                               // document des suggestions (HTML imprimable, s'ouvre partout ; à joindre pour l'analyse)
  const sg = adminSuggs(), d = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const types = [...new Set(sg.map(r => r.x.type || 'Suggestion'))];
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lisân Campus · suggestions des élèves</title>
<style>body{font:15px/1.55 system-ui,sans-serif;color:#1d2433;max-width:820px;margin:24px auto;padding:0 16px}h1{font-size:24px;margin:0}h2{font-size:18px;margin:28px 0 8px;color:#0f3d5e;border-bottom:2px solid #c8a24a;padding-bottom:4px}
.s{border:1px solid #d9dee6;border-radius:10px;padding:10px 14px;margin:10px 0;page-break-inside:avoid}.m{color:#5b6475;font-size:13px}.t{white-space:pre-wrap;margin:6px 0}</style></head><body>
<h1>Lisân Campus · suggestions des élèves</h1><p class="m">Éditions Lisân · document établi le ${esc(d)} · ${sg.length} suggestion${sg.length > 1 ? 's' : ''}</p>
${types.map(t => `<h2>${esc(t)} (${sg.filter(r => (r.x.type || 'Suggestion') === t).length})</h2>` + sg.filter(r => (r.x.type || 'Suggestion') === t).map(({ u, x }, k) =>
  `<div class="s"><div class="m">${k + 1}. ${x.date ? esc(dateFr(x.date)) : ''}${x.contexte ? ' · à propos de : ' + esc(x.contexte) : ''}</div><p class="t">${esc(x.texte || '')}</p><div class="m">De ${esc(who(u))}</div></div>`).join('')).join('')}
${sg.length ? '' : '<p>Aucune suggestion pour le moment.</p>'}</body></html>`;
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
  a.download = `Lisan-Campus-suggestions-${stamp()}.html`; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  document.getElementById('admin-msg').textContent = 'Le document des suggestions a été téléchargé : il s’ouvre dans le navigateur et s’imprime en PDF.';
}
function exportCsv() {
  const rows = adminFiltered(), cell = v => { let t = String(v === undefined || v === null ? '' : v); if (/^[=+\-@\t\r]/.test(t)) t = "'" + t; return /[;"\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
  const lines = [[...COLS.map(c => c[0]), 'Réponses'], ...rows.map(r => [...baseLine(r), answersText(r.id, r.en.reponses)])].map(l => l.map(cell).join(';'));
  const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' }), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = `Lisan-Campus-inscrits-${adminRun.sp === 'all' ? 'tous' : adminRun.sp}-${stamp()}.csv`; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  document.getElementById('admin-msg').textContent = 'Le fichier CSV a été téléchargé (il s’ouvre dans Excel ou Google Sheets).';
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-admin]'), c = e.target.closest('[data-admin-sp]');
  if (c) { adminRun.sp = c.dataset.adminSp; drawAdmin(); return; }
  const md_ = e.target.closest('[data-msg-del]');
  if (md_) { const id = md_.dataset.msgDel; md_.disabled = true;
    AUTH().adminDeleteMessage(id).then(() => { adminRun.msgs = (adminRun.msgs || []).filter(m => m.id !== id); drawAdmin(); }, () => { md_.disabled = false; });
    return; }
  const rv = e.target.closest('[data-revoke]');
  if (rv) { const n = rv.dataset.revoke, z = document.getElementById('rv-' + n);
    z.insertAdjacentHTML('beforeend', `<span class="meta">Annuler définitivement le certificat ${esc(n)} ? Il ne sera plus reconnu à la vérification.</span><button type="button" class="btn bad small" data-revoke-yes="${esc(n)}">Oui, annuler</button>`); rv.remove(); return; }
  const ry = e.target.closest('[data-revoke-yes]');
  if (ry) { ry.disabled = true; AUTH().adminRevoke(ry.dataset.revokeYes).then(loadAdmin, loadAdmin); return; }
  const ac_ = e.target.closest('[data-acces-on],[data-acces-off]');
  if (ac_) { accesAction(ac_); return; }
  const mj_ = e.target.closest('[data-maj]'); if (mj_) { majAction(mj_); return; }
  const fb_ = e.target.closest('[data-felic]');
  if (fb_) { felicAction(fb_); return; }
  const tb = e.target.closest('[data-admin-tab]');
  if (tb) { adminRun.tab = tb.dataset.adminTab; drawAdmin(); return; }
  if (!b) return;
  const k = b.dataset.admin;
  if (k === 'reload') loadAdmin();
  else if (k === 'redraw') drawAdmin();
  else if (k === 'xlsx') exportXlsx();
  else if (k === 'csv') exportCsv();
  else if (k === 'sugdoc') exportSuggDoc();
  else if (k === 'copy') { const t = document.getElementById('admin-rules').textContent, m = document.getElementById('admin-copy');
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => { m.textContent = 'Règles copiées.'; },
      () => { const r = document.createRange(); r.selectNodeContents(document.getElementById('admin-rules')); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); m.textContent = 'Texte sélectionné : copiez-le avec « Copier ».'; }); }
});
