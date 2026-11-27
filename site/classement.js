// ===== Lisân Campus · classement de la semaine et rappels d'étude (Éditions Lisân)
// Points d'expérience (XP) : 1 XP par minute d'étude (state.days), plus des bonus enregistrés jour par jour dans
// state.xpb (leçon terminée 20, mini-exercice réussi 10, évaluation jusqu'à 20 + 30 si réussie, révision juste 2 : xpAdd() dans app.js).
// Le classement est facultatif : l'élève connecté choisit d'y apparaître (collection Firestore classement/{uid},
// visible par les élèves connectés ; règles regles/v7, puis v8). Les rappels restent sur l'appareil (service worker, agenda).

const XP_RULES = [['⏱️', 'Chaque minute d’étude', '1 XP'], ['✅', 'Une leçon terminée', '20 XP'], ['🧩', 'Un mini-exercice réussi', '10 XP'],
  ['📝', 'Une évaluation', 'jusqu’à 20 XP, + 30 si réussie'], ['🔁', 'Une question de révision juste', '2 XP']];
const DIVISIONS = [['Bronze', 0, '#c98a4b'], ['Argent', 300, '#9aa6b8'], ['Or', 1000, '#e7b52f'], ['Saphir', 2500, '#3f7fe0'], ['Diamant', 5000, '#38c7e8']];

// ---------- calcul des points
const xpDay = k => Math.floor(((state.days || {})[k] || 0) / 60) + ((state.xpb || {})[k] || 0);
function weekStart(d = new Date()) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - (x.getDay() + 6) % 7); return x; }
function weekDays() { const s = weekStart(), out = []; for (let i = 0; i < 7; i++) { const d = new Date(s); d.setDate(s.getDate() + i); out.push(d); } return out; }
function xpWeek() { const today = dayKey(); return weekDays().map(dayKey).filter(k => k <= today).reduce((n, k) => n + xpDay(k), 0); }
function semKey(d = new Date()) {                          // semaine ISO : 2026-S48
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())), day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day); const y = t.getUTCFullYear(), w = Math.ceil(((t - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7);
  return `${y}-S${String(w).padStart(2, '0')}`;
}
function xpTotal() {
  const min = Math.floor(Object.values(state.time || {}).reduce((a, b) => a + (+b || 0), 0) / 60);
  const ev = Object.entries(state.quiz || {}).filter(([k, v]) => /@eval$/.test(k) && v >= (typeof PASS === 'function' ? PASS() : 80)).length;
  const bonus = Object.values(state.xpb || {}).reduce((a, b) => a + (+b || 0), 0);
  return Math.max(min + 20 * Object.keys(state.done || {}).length + 10 * Object.keys(state.minis || {}).length + 50 * ev, Math.floor(min + bonus));
}
const divisionOf = tot => DIVISIONS.reduce((d, x, i) => tot >= x[1] ? i : d, 0);
const daysLeft = () => { const n = 7 - (new Date().getDay() + 6) % 7; return n === 1 ? 'Dernier jour' : `${n} jours`; };

// ---------- ma ligne dans le classement
const BOARD = { list: null, at: 0, sem: '', loading: false, err: '' };
const boardMine = () => { const A = AUTH(), u = A && A.user(); return u ? store.get('board.' + u.uid, null) : null; };   // nom affiché, si l'élève a rejoint
function defaultName() {
  const A = AUTH(), i = (A && A.info && A.info()) || {}, u = (A && A.user()) || {};
  const pre = String(i.prenom || u.displayName || u.name || '').trim().split(/\s+/)[0] || 'Élève';
  const nom = String(i.nom || (String(u.displayName || u.name || '').trim().split(/\s+/)[1] || '')).trim();
  const cap = w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '';
  return (cap(pre) + (nom ? ' ' + nom.charAt(0).toUpperCase() + '.' : '')).slice(0, 24);
}
function myRecord(nom) {
  const A = AUTH();
  return { nom: String(nom).slice(0, 24), sem: semKey(), xp: Math.min(30000, xpWeek()), tot: Math.min(5000000, xpTotal()), serie: Math.min(4000, streak()),
    esp: SPACES.filter(sp => A && A.enrolled && A.enrolled(sp.id)).map(sp => sp.id).slice(0, 8) };
}
let boardTimer = null, boardLast = 0;
function boardTouch(now) {                                   // met ma ligne à jour (au plus une écriture toutes les 90 s)
  remindStore();
  const nom = boardMine(), A = AUTH(); if (!nom || !A || !A.user() || !A.boardPut) return;
  const go = () => { boardTimer = null; boardLast = Date.now(); A.boardPut(myRecord(nom)).catch(() => {}); };
  if (now) { clearTimeout(boardTimer); return go(); }
  if (boardTimer) return; boardTimer = setTimeout(go, Math.max(5000, 90000 - (Date.now() - boardLast)));
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { remindStore(); if (boardTimer) { clearTimeout(boardTimer); boardTimer = null; boardTouch(true); } } });

function xpToast(n) {                                       // « +20 XP » qui s'envole, comme une petite récompense
  const e = document.createElement('div'); e.className = 'xp-toast'; e.setAttribute('aria-live', 'polite'); e.textContent = `+${n} XP`;
  document.body.appendChild(e); setTimeout(() => e.remove(), 1900);
}
// ---------- la page du classement
const initials = n => String(n).split(/\s+/).filter(Boolean).slice(0, 2).map(w => w.charAt(0)).join('').toUpperCase() || '?';
const hue = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
const trophy = (c, on) => `<svg class="trophy${on ? ' on' : ''}" viewBox="0 0 64 64" aria-hidden="true"><path d="M18 8h28v10c0 9-6 16-14 16S18 27 18 18z" fill="${c}"/><path d="M18 12H9c0 9 4 14 11 15M46 12h9c0 9-4 14-11 15" fill="none" stroke="${c}" stroke-width="3.5"/><path d="M28 34h8v9h-8z" fill="${c}" opacity=".85"/><rect x="18" y="43" width="28" height="7" rx="2" fill="${c}"/><path d="M24 13c1 6 3 9 6 11" stroke="#fff" stroke-width="2.5" opacity=".55" fill="none" stroke-linecap="round"/></svg>`;
const medal = r => r <= 3 ? `<span class="b-medal m${r}" aria-label="${r}e place">${r}</span>` : `<span class="b-rank">${r}</span>`;
function boardHead(tot) {
  const d = divisionOf(tot), D = DIVISIONS[d], nx = DIVISIONS[d + 1];
  return `<div class="b-head"><div><span class="eyebrow">Classement de la semaine</span><h1>Division ${D[0]}</h1>
    <p class="meta">⏳ ${daysLeft()} · ${nx ? `encore <b>${nx[1] - tot} XP</b> au total pour la division ${nx[0]}` : 'la plus haute division : bravo !'}</p></div></div>
    <div class="b-trophies">${DIVISIONS.map((x, i) => `<div class="b-tr${i === d ? ' on' : ''}${i > d ? ' off' : ''}">${trophy(x[2], i === d)}<small>${x[0]}</small></div>`).join('')}</div>`;
}
function boardMe() {
  const w = xpWeek(), t = xpTotal(), st = streak(), days = weekDays(), today = dayKey(), mx = Math.max(30, ...days.map(d => xpDay(dayKey(d))));
  return `<section class="panel b-me"><div class="b-me-top"><div><b>${w} XP</b><small>cette semaine</small></div><div><b>${t} XP</b><small>au total</small></div><div><b>🔥 ${st}</b><small>jour${st > 1 ? 's' : ''} de série</small></div></div>
    <div class="b-week" aria-label="XP de chaque jour de la semaine">${days.map(d => { const k = dayKey(d), v = xpDay(k);
      return `<div class="b-day${k === today ? ' today' : ''}${k > today ? ' fut' : ''}"><i style="height:${Math.round(v / mx * 100)}%"></i><small>${'LMMJVSD'[(d.getDay() + 6) % 7]}</small><em>${k > today ? '' : v}</em></div>`; }).join('')}</div></section>`;
}
const xpHelp = () => `<details class="panel b-help"><summary><b>Comment gagner des XP ?</b></summary><div class="tablewrap"><table><tbody>${XP_RULES.map(r => `<tr><td>${r[0]} ${r[1]}</td><td><b>${r[2]}</b></td></tr>`).join('')}</tbody></table></div>
  <p class="meta">Le classement repart à zéro chaque lundi. La division dépend de vos XP au total : Bronze, puis Argent (300 XP), Or (1 000), Saphir (2 500) et Diamant (5 000).</p></details>`;
function viewBoard() {
  const A = AUTH(), u = A && A.user(), tot = xpTotal();
  let body;
  if (!A) body = `<div class="notice">Le classement réunit les élèves connectés à Lisân Campus. Vos XP ci-dessus sont comptés sur cet appareil.</div>`;
  else if (!u) body = `<div class="gate b-join"><h2>Rejoignez le classement</h2><p>Connectez-vous pour comparer votre progression à celle des autres élèves, semaine après semaine.</p>
      <div class="actions"><button type="button" class="btn" data-auth="signin">Se connecter avec Google</button></div></div>`;
  else if (!boardMine()) body = joinCard();
  else body = `<div id="board-list" class="b-list" aria-live="polite"><p class="meta">Chargement du classement…</p></div>
      <p class="meta b-opts">Vous apparaissez sous le nom <b>${esc(boardMine())}</b>. <button type="button" class="linkbtn" data-board="rename">Changer de nom</button> · <button type="button" class="linkbtn" data-board="leave">Quitter le classement</button></p>`;
  return `${crumbs(['Classement de la semaine'])}<div class="board">${boardHead(tot)}${boardMe()}${body}${xpHelp()}</div>`;
}
function joinCard(rename) {
  const cur = boardMine() || defaultName();
  return `<section class="panel b-join" id="board-join"><h2>${rename ? 'Changer de nom' : 'Apparaître dans le classement'}</h2>
    ${rename ? '' : '<p>Comparez vos XP de la semaine à ceux des autres élèves et encouragez-vous les uns les autres. C’est facultatif : vous pouvez le quitter quand vous voulez.</p>'}
    <label class="b-field">Nom affiché <input id="board-name" maxlength="24" value="${esc(cur)}" autocomplete="off"></label>
    <p class="meta">Prénom et initiale du nom, ou un pseudonyme : pas de numéro de téléphone ni d’adresse.</p>
    ${rename ? '' : `<label class="check"><input type="checkbox" id="board-ok"> J’accepte que ce nom, mes XP, ma série de jours et mes espaces soient visibles par les élèves connectés (voir la <a href="#confidentialite">politique de confidentialité</a>).</label>`}
    <div class="actions"><button type="button" class="btn" data-board="${rename ? 'save' : 'join'}">${rename ? 'Enregistrer' : 'Rejoindre le classement'}</button>${rename ? '<button type="button" class="btn ghost" data-board="cancel">Annuler</button>' : ''}</div>
    <p class="meta" id="board-msg" aria-live="polite"></p></section>`;
}
function bindBoard() { if (document.getElementById('board-list')) { boardTouch(true); setTimeout(() => loadBoard(), 600); } }
function loadBoard(force) {
  const A = AUTH(), box = document.getElementById('board-list'); if (!A || !box) return;
  const sem = semKey();
  if (!force && BOARD.list && BOARD.sem === sem && Date.now() - BOARD.at < 180000) return drawBoard();
  A.boardList(sem).then(l => { BOARD.list = l; BOARD.sem = sem; BOARD.at = Date.now(); BOARD.err = ''; drawBoard(); },
    e => { BOARD.err = /permission/i.test((e && (e.code || e.message)) || '') ? 'rules' : 'net'; drawBoard(); });
}
function drawBoard() {
  const box = document.getElementById('board-list'); if (!box) return;
  if (BOARD.err) { box.innerHTML = `<p class="notice">${BOARD.err === 'rules' ? 'Le classement sera disponible très bientôt.' : 'Impossible de charger le classement : vérifiez votre connexion.'} <button type="button" class="linkbtn" data-board="reload">Réessayer</button></p>`; return; }
  const A = AUTH(), me = A.user().uid, admin = typeof isAdminCached === 'function' && isAdminCached();
  const rows = (BOARD.list || []).map(r => r.uid === me ? Object.assign({}, r, myRecord(boardMine())) : r);
  if (!rows.some(r => r.uid === me)) rows.push(Object.assign({ uid: me }, myRecord(boardMine())));
  rows.sort((a, b) => (b.xp || 0) - (a.xp || 0) || (b.serie || 0) - (a.serie || 0) || String(a.nom).localeCompare(String(b.nom)));
  const myRank = rows.findIndex(r => r.uid === me) + 1, show = rows.slice(0, 50);
  if (myRank > 50) show.push(rows[myRank - 1]);
  const line = (r, i) => { const rank = rows.indexOf(r) + 1, sp = (r.esp || []).map(id => space(id)).filter(Boolean);
    return `<li class="b-row${r.uid === me ? ' me' : ''}">${medal(rank)}<span class="b-av" style="--h:${hue(r.uid)}" aria-hidden="true">${esc(initials(r.nom))}</span>
      <span class="b-name"><b>${esc(r.nom)}${r.uid === me ? ' <small>(vous)</small>' : ''}</b><small>${r.serie ? `🔥 ${r.serie} j` : ''}${sp.length ? ' · ' + sp.map(s => `<span title="${esc(s.title)}">${s.icon}</span>`).join(' ') : ''}</small></span>
      <span class="b-xp">${r.xp || 0} XP</span>${admin && r.uid !== me ? `<button type="button" class="linkbtn b-del" data-board-del="${esc(r.uid)}" aria-label="Retirer ${esc(r.nom)} du classement">retirer</button>` : ''}</li>`; };
  const n = rows.length;
  box.innerHTML = `<p class="meta">${n} élève${n > 1 ? 's' : ''} cette semaine · vous êtes <b>${myRank}${myRank === 1 ? 'er' : 'e'}</b>${myRank > 1 ? ` · ${(rows[myRank - 2].xp || 0) - (rows[myRank - 1].xp || 0) + 1} XP pour passer devant ${esc(rows[myRank - 2].nom)}` : n > 1 ? ' · gardez la tête !' : ' · invitez vos camarades à vous rejoindre'}</p>
    <ol class="b-rows">${show.map(line).join('')}</ol>`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-board], [data-board-del]'); if (!b) return;
  const A = AUTH(), u = A && A.user(), act = b.dataset.board, msg = document.getElementById('board-msg');
  if (b.dataset.boardDel) { b.disabled = true; A.boardLeave(b.dataset.boardDel).then(() => { BOARD.list = (BOARD.list || []).filter(r => r.uid !== b.dataset.boardDel); drawBoard(); }, () => { b.disabled = false; }); return; }
  if (act === 'reload') return loadBoard(true);
  if (act === 'rename') { const box = document.getElementById('board-list'); if (box) box.insertAdjacentHTML('beforebegin', joinCard(true)); b.closest('.b-opts').hidden = true; return; }
  if (act === 'cancel') return route();
  if (act === 'leave') {
    if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Confirmer : quitter et effacer ma ligne'; return; }
    b.disabled = true; A.boardLeave().then(() => { store.set('board.' + u.uid, null); BOARD.list = null; route(); }, () => { b.disabled = false; });
    return;
  }
  if (act === 'join' || act === 'save') {
    const nom = String((document.getElementById('board-name') || {}).value || '').replace(/\s+/g, ' ').trim().slice(0, 24);
    if (!nom) { msg.textContent = 'Indiquez le nom à afficher.'; return; }
    if (/\d{6,}|@|https?:/i.test(nom.replace(/\s/g, ''))) { msg.textContent = 'Le nom ne doit contenir ni numéro, ni adresse e-mail, ni lien.'; return; }
    if (act === 'join' && !document.getElementById('board-ok').checked) { msg.textContent = 'Cochez la case pour accepter d’apparaître dans le classement.'; return; }
    b.disabled = true; msg.textContent = 'Enregistrement…';
    A.boardPut(myRecord(nom)).then(() => { store.set('board.' + u.uid, nom); BOARD.list = null; route(); },
      err => { b.disabled = false; msg.textContent = /permission/i.test((err && (err.code || err.message)) || '') ? 'Le classement sera disponible très bientôt.' : 'Échec de l’enregistrement : vérifiez votre connexion.'; });
  }
});
// un autre appareil a déjà rejoint le classement : la ligne existe, on retient le nom
if (window.LisanAuth && window.LisanAuth.ready) window.LisanAuth.ready.then(() => setTimeout(() => {
  const A = AUTH(), u = A && A.user(); if (!u || boardMine() || !A.boardList) return;
  A.boardList(semKey()).then(l => { const r = l.find(x => x.uid === u.uid); if (r) { store.set('board.' + u.uid, r.nom); boardTouch(); } }).catch(() => {});
}, 4000)).catch(() => {});

// ---------- rappels d'étude : notifications de l'appareil (si le navigateur le permet) et rappel d'agenda
const remindPrefs = () => store.get('remind', { on: false, hour: 19 });
function remindStore() {                                     // ce que le service worker lit pour décider d'un rappel
  if (!('caches' in window)) return;
  const p = remindPrefs(), k = dayKey(), studied = (state.days[k] || 0) >= 60 ? k : '';
  try { caches.open('lc-prefs').then(c => c.put('/__lc-prefs', new Response(JSON.stringify({ on: !!p.on, hour: p.hour, studied, serie: streak(), xp: xpWeek() }), { headers: { 'Content-Type': 'application/json' } }))).catch(() => {}); } catch (e) {}
}
function remindPanel() {
  const p = remindPrefs(), hours = []; for (let h = 6; h <= 22; h++) hours.push(h);
  return `<section class="panel" id="remind"><h2>Rappels d’étude</h2>
    <p>Dix minutes par jour suffisent pour garder votre série. Choisissez une heure : Lisân Campus vous le rappellera si vous n’avez pas encore étudié ce jour-là.</p>
    <div class="setrow"><span>Heure du rappel</span><select id="rem-h" aria-label="Heure du rappel">${hours.map(h => `<option value="${h}"${h === p.hour ? ' selected' : ''}>${h} h</option>`).join('')}</select></div>
    <div class="actions">${p.on ? '<button type="button" class="btn ghost small" data-rem="off">🔕 Désactiver les rappels</button>' : '<button type="button" class="btn small" data-rem="on">🔔 Activer les rappels sur cet appareil</button>'}
      <button type="button" class="btn ghost small" data-rem="ics">📅 Ajouter un rappel quotidien à mon agenda</button></div>
    <p class="meta" id="rem-msg" aria-live="polite">${p.on ? `Rappels activés vers ${p.hour} h sur cet appareil.` : ''}</p>
    <details class="help"><summary>Quel rappel choisir ?</summary><ul>
      <li><b>Sur cet appareil</b> : le téléphone affiche une notification vers l’heure choisie, si vous n’avez pas encore étudié. Cela fonctionne sur Android avec l’application installée (Chrome) ; le moment exact dépend du téléphone.</li>
      <li><b>Dans l’agenda</b> : un rendez-vous quotidien de 15 minutes, avec une alerte, s’ajoute à l’agenda de votre téléphone (Android ou iPhone). C’est le rappel le plus sûr.</li></ul></details></section>`;
}
function icsFile(h) {
  const d = new Date(); if (d.getHours() >= h) d.setDate(d.getDate() + 1);
  const p2 = n => String(n).padStart(2, '0'), day = `${d.getFullYear()}${p2(d.getMonth() + 1)}${p2(d.getDate())}`, now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Editions Lisan//Lisan Campus//FR', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
    `UID:rappel-${Date.now().toString(36)}@lisan-campus.pages.dev`, `DTSTAMP:${now}`, `DTSTART:${day}T${p2(h)}0000`, 'DURATION:PT15M', 'RRULE:FREQ=DAILY',
    'SUMMARY:Lisân Campus : ma séance du jour', 'DESCRIPTION:Dix minutes pour garder ma série et avancer dans mes cours.\\nhttps://lisan-campus.pages.dev/', 'URL:https://lisan-campus.pages.dev/',
    'BEGIN:VALARM', 'TRIGGER:PT0M', 'ACTION:DISPLAY', 'DESCRIPTION:Lisân Campus : ma séance du jour', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n') + '\r\n';
}
document.addEventListener('change', e => { if (e.target.id !== 'rem-h') return; const p = remindPrefs(); p.hour = +e.target.value; store.set('remind', p); remindStore();
  const m = document.getElementById('rem-msg'); if (m && p.on) m.textContent = `Rappels activés vers ${p.hour} h sur cet appareil.`; });
document.addEventListener('click', async e => {
  const b = e.target.closest('[data-rem]'); if (!b) return;
  const m = document.getElementById('rem-msg'), p = remindPrefs(), act = b.dataset.rem;
  if (act === 'ics') {
    const url = URL.createObjectURL(new Blob([icsFile(p.hour)], { type: 'text/calendar' })), a = document.createElement('a');
    a.href = url; a.download = 'rappel-lisan-campus.ics'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
    m.textContent = `Ouvrez le fichier téléchargé : votre agenda propose d’ajouter un rendez-vous chaque jour à ${p.hour} h.`; return;
  }
  if (act === 'off') { p.on = false; store.set('remind', p); remindStore(); route(); return; }
  if (!('Notification' in window) || !('serviceWorker' in navigator)) { m.textContent = 'Ce navigateur ne permet pas les notifications : ajoutez plutôt le rappel à votre agenda.'; return; }
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') { m.textContent = 'Les notifications sont refusées pour Lisân Campus. Vous pouvez les autoriser dans les réglages du navigateur, ou ajouter le rappel à votre agenda.'; return; }
  let auto = false;
  try { const reg = await navigator.serviceWorker.ready;
    if ('periodicSync' in reg) { await reg.periodicSync.register('lc-rappel', { minInterval: 6 * 3600 * 1000 }); auto = true; }
    reg.showNotification('Rappels activés', { body: `Lisân Campus vous rappellera d’étudier vers ${p.hour} h, si vous ne l’avez pas encore fait.`, icon: 'icon-192.png', tag: 'lc-rappel' });
  } catch (err) {}
  p.on = true; store.set('remind', p); remindStore();
  route(); const m2 = document.getElementById('rem-msg');
  if (m2) m2.textContent = auto ? `Rappels activés vers ${p.hour} h sur cet appareil.` : 'Les notifications sont autorisées, mais ce navigateur ne permet pas les rappels automatiques à heure fixe (iPhone, ordinateur, application non installée) : ajoutez aussi le rappel à votre agenda.';
});
window.addEventListener('load', () => setTimeout(remindStore, 1500));
