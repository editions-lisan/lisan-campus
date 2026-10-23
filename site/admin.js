// ===== Lisân Campus · administration : liste des inscrits par espace, contact et export Excel
// Page #admin, réservée à l'administrateur par les règles Firestore (lecture de toute la collection users).

let adminRun = { list: null, err: '', sp: 'all', q: '', loading: false };
const ADMIN_FLAG = 'lc.admin';
const isAdminCached = () => { try { return localStorage.getItem(ADMIN_FLAG) === '1'; } catch (e) { return false; } };
const setAdminCached = v => { try { v ? localStorage.setItem(ADMIN_FLAG, '1') : localStorage.removeItem(ADMIN_FLAG); } catch (e) {} };

const civ = i => i && i.civilite === 'Madame' ? 'Mme' : 'M.';
const waLink = i => { if (!i || !i.tel) return ''; let t = String(i.tel).replace(/\D/g, ''); const c = String(i.ind || '').replace(/\D/g, '');
  if (c && c !== '225') t = t.replace(/^0+/, ''); return `https://wa.me/${c}${t}`; };
const telLink = i => i && i.tel ? `tel:${i.ind || ''}${String(i.tel).replace(/\D/g, '')}` : '';

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
function bindAdmin() { if (!document.getElementById('admin')) return; if (!adminRun.list && !adminRun.loading) loadAdmin(); else drawAdmin(); }
function loadAdmin() {
  adminRun.loading = true; adminRun.err = ''; drawAdmin();
  AUTH().adminList().then(list => { adminRun.list = list; adminRun.loading = false; setAdminCached(true); drawAdmin(); if (typeof renderDrawer === 'function') renderDrawer(); })
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
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
      allow read: if isAdmin();
    }
  }
}`;
}
function drawAdmin() {
  const box = document.getElementById('admin'); if (!box) return;
  const A = AUTH(), R = adminRun;
  if (R.loading) { box.innerHTML = '<h1>Administration</h1><p class="lead">Chargement des inscrits…</p>'; return; }
  if (R.err === 'denied') {
    box.innerHTML = `<h1>Administration</h1><div class="notice">Cette page est réservée à l’administrateur de Lisân Campus.</div>
      <details class="panel"><summary><b>Vous êtes l’administrateur ?</b> Activer l’accès</summary>
        <ol><li>Copiez les règles ci-dessous : elles contiennent l’identifiant de votre compte (<code>${esc(A.uid())}</code>).</li>
          <li>Dans la console Firebase : <b>Firestore Database → Règles</b>, remplacez tout le texte par celui-ci, puis <b>Publier</b>.</li>
          <li>Revenez ici et touchez <b>Réessayer</b>.</li></ol>
        <pre class="rules" id="admin-rules">${esc(rulesFor(A.uid()))}</pre>
        <div class="actions"><button type="button" class="btn small" data-admin="copy">Copier les règles</button><button type="button" class="btn ghost small" data-admin="reload">Réessayer</button></div>
        <p class="meta" id="admin-copy" aria-live="polite"></p></details>`;
    return;
  }
  if (R.err === 'network') { box.innerHTML = `<h1>Administration</h1><p class="notice bad-n">Impossible de charger la liste. Vérifiez votre connexion internet.</p><div class="actions"><button type="button" class="btn" data-admin="reload">Réessayer</button></div>`; return; }
  const all = adminRows(), list = R.list || [], week = Date.now() - 7 * 864e5;
  const count = id => all.filter(r => r.id === id).length;
  const fresh = all.filter(r => new Date(r.en.date).getTime() > week).length;
  const noIns = list.filter(u => !Object.keys(u.spaces).length).length;
  const rows = adminFiltered();
  const stat = (n, t, c) => `<div class="stat${c ? ' c-' + c : ''}"><b>${n}</b><span>${esc(t)}</span></div>`;
  box.innerHTML = `<span class="eyebrow">Éditions Lisân</span><h1>Administration · les inscrits</h1>
    <div class="stats">${stat(list.length, 'comptes créés')}${stat(all.length, 'inscriptions')}${stat(fresh, 'nouvelles (7 jours)')}${stat(noIns, 'comptes sans inscription')}
      ${SPACES.map(sp => stat(count(sp.id), sp.title, sp.color)).join('')}</div>
    <div class="chips" role="group" aria-label="Filtrer par espace"><button type="button" class="chip" data-admin-sp="all" aria-pressed="${R.sp === 'all'}">Tous (${all.length})</button>
      ${SPACES.map(sp => `<button type="button" class="chip" data-admin-sp="${sp.id}" aria-pressed="${R.sp === sp.id}">${sp.icon} ${esc(sp.title)} (${count(sp.id)})</button>`).join('')}</div>
    <input class="search" id="admin-q" type="search" placeholder="Rechercher : nom, téléphone, ville, numéro…" value="${esc(R.q)}" aria-label="Rechercher un inscrit">
    <div class="actions"><button type="button" class="btn small" data-admin="xlsx">⬇ Télécharger en Excel</button><button type="button" class="btn ghost small" data-admin="csv">⬇ CSV</button>
      <button type="button" class="btn ghost small" data-admin="reload">↻ Actualiser</button></div>
    <p class="meta" id="admin-msg" aria-live="polite">${rows.length} inscription${rows.length > 1 ? 's' : ''} affichée${rows.length > 1 ? 's' : ''}. L’export Excel contient tous les inscrits, avec une feuille par espace.</p>
    <div class="adm-list" id="adm-list">${adminCards(rows)}</div>`;
  const q = document.getElementById('admin-q');
  q.addEventListener('input', () => { R.q = q.value; document.getElementById('adm-list').innerHTML = adminCards(adminFiltered());
    const n = adminFiltered().length; document.getElementById('admin-msg').textContent = `${n} inscription${n > 1 ? 's' : ''} affichée${n > 1 ? 's' : ''}.`; });
}
function adminCards(rows) {
  if (!rows.length) return '<p class="meta">Aucune inscription pour le moment.</p>';
  return rows.map(({ u, id, en }) => { const i = u.info || {}, sp = space(id), a = ageOf(i.naissance), wa = waLink(i);
    return `<article class="adm-card c-${sp.color}">
      <div class="adm-top"><b>${esc(civ(i))} ${esc(i.nom || '')} ${esc(i.prenom || u.name)}</b><span class="tag">${sp.icon} ${esc(sp.title)}</span></div>
      <small>N° ${esc(en.num)} · inscrit le ${dateFr(en.date)}</small>
      <p>${[a !== null ? a + ' ans' : '', i.statut, [i.ville, paysOf(i)].filter(Boolean).join(', ')].filter(Boolean).map(esc).join(' · ')}</p>
      <div class="actions">${wa ? `<a class="btn small" href="${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}${i.tel ? `<a class="btn ghost small" href="${telLink(i)}">Appeler ${esc(telFr(i.ind, i.tel))}</a>` : ''}
        ${u.email ? `<a class="btn ghost small" href="mailto:${esc(u.email)}">E-mail</a>` : ''}</div>
      <details><summary>Fiche complète</summary>${dl([['Adresse e-mail', u.email], ...infoRows(i), ...answerRows(id, en.reponses), ['Leçons terminées (compte)', String(u.done)],
        ['Dernière connexion', u.lastLogin ? dateFr(u.lastLogin) : '—']])}</details></article>`; }).join('');
}

// ---------- export : Excel (feuille « Tous » + une feuille par espace) et CSV
const COLS = [['N° d’inscription', 14], ['Espace', 18], ['Date d’inscription', 14], ['Civilité', 9], ['Nom', 16], ['Prénoms', 18], ['Date de naissance', 14], ['Âge', 6],
  ['Téléphone', 16], ['Lien WhatsApp', 30], ['E-mail', 28], ['Pays', 14], ['Ville', 14], ['Profil', 16], ['Connu par', 20], ['Nouveautés', 10], ['Parent ou tuteur', 20], ['Tél. parent', 14]];
function baseLine({ u, id, en }) {
  const i = u.info || {}, a = ageOf(i.naissance), d = en.date ? new Date(en.date) : null;
  return [en.num, space(id).title, d ? d.toLocaleDateString('fr-FR') : '', i.civilite || '', i.nom || '', i.prenom || u.name, i.naissance ? new Date(i.naissance + 'T00:00:00').toLocaleDateString('fr-FR') : '',
    a === null ? '' : a, telFr(i.ind, i.tel), waLink(i), u.email, paysOf(i) || '', i.ville || '', i.statut || '', i.source || '', i.news ? 'Oui' : 'Non',
    i.tuteur ? i.tuteur.nom : '', i.tuteur ? i.tuteur.tel : ''];
}
const answersText = (id, rep) => answerRows(id, rep).map(([k, v]) => `${k} : ${v}`).join(' | ');
function sheetsData() {
  const rows = adminRows();
  const out = [{ name: 'Tous les inscrits', head: [...COLS.map(c => c[0]), 'Réponses'], widths: [...COLS.map(c => c[1]), 60], data: rows.map(r => [...baseLine(r), answersText(r.id, r.en.reponses)]) }];
  SPACES.forEach(sp => { const qs = QUESTIONS[sp.id] || [], rs = rows.filter(r => r.id === sp.id);
    out.push({ name: sp.title.replace(/[\\/?*[\]:]/g, ' ').slice(0, 31), head: [...COLS.map(c => c[0]), ...qs.map(q => q.l)], widths: [...COLS.map(c => c[1]), ...qs.map(() => 26)],
      data: rs.map(r => [...baseLine(r), ...qs.map(q => r.en.reponses[q.k] || '')]) }); });
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
function exportCsv() {
  const rows = adminFiltered(), cell = v => { const t = String(v === undefined || v === null ? '' : v); return /[;"\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
  const lines = [[...COLS.map(c => c[0]), 'Réponses'], ...rows.map(r => [...baseLine(r), answersText(r.id, r.en.reponses)])].map(l => l.map(cell).join(';'));
  const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' }), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = `Lisan-Campus-inscrits-${adminRun.sp === 'all' ? 'tous' : adminRun.sp}-${stamp()}.csv`; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  document.getElementById('admin-msg').textContent = 'Le fichier CSV a été téléchargé (il s’ouvre dans Excel ou Google Sheets).';
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-admin]'), c = e.target.closest('[data-admin-sp]');
  if (c) { adminRun.sp = c.dataset.adminSp; drawAdmin(); return; }
  if (!b) return;
  const k = b.dataset.admin;
  if (k === 'reload') loadAdmin();
  else if (k === 'xlsx') exportXlsx();
  else if (k === 'csv') exportCsv();
  else if (k === 'copy') { const t = document.getElementById('admin-rules').textContent, m = document.getElementById('admin-copy');
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => { m.textContent = 'Règles copiées.'; },
      () => { const r = document.createRange(); r.selectNodeContents(document.getElementById('admin-rules')); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); m.textContent = 'Texte sélectionné : copiez-le avec « Copier ».'; }); }
});
