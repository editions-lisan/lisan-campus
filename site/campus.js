// ===== Lisân Campus · le campus : accueil personnel, parcours en étoiles, objectifs du jour, barre de navigation,
// page « Apprendre » (#apprendre, #apprendre-<espace>) et page « Mes progrès » (#progression) avec les distinctions.
// Chargé avant app.js : les fonctions d'app.js (state, SUBJECTS, access, nextStep…) ne sont appelées qu'à l'affichage.
// Règle : tout ce qui est affiché vient de l'état réel de l'élève ou des contenus ; aucun chiffre décoratif.

// ---------- icônes (traits fins, couleur du texte)
const CI = {
  home: '<path d="M3.5 10.6 12 4l8.5 6.6V19a1.5 1.5 0 0 1-1.5 1.5h-4v-6H9v6H5A1.5 1.5 0 0 1 3.5 19z"/>',
  learn: '<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13"/>',
  rev: '<path d="M4.5 12a7.5 7.5 0 0 1 12.8-5.3L19.5 9M19.5 4.5V9H15M19.5 12a7.5 7.5 0 0 1-12.8 5.3L4.5 15M4.5 19.5V15H9"/>',
  lib: '<path d="M4.5 4.5h3.5v15H4.5zM8 4.5h3.5v15H8zM13 5.2l3.4-.9 3.9 14.5-3.4.9z"/>',
  prog: '<path d="M12 3.2l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.5l5-.7z"/><path d="M8 20.5h8"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>',
  check: '<path d="M5.5 12.5l4.2 4.2 8.8-9.4"/>',
  lock: '<rect x="5.5" y="10.5" width="13" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  key: '<circle cx="8" cy="15" r="3.5"/><path d="M10.5 12.5L19 4M16 7l2.5 2.5M14 9l2 2"/>',
  play: '<path d="M9 6.5v11l9-5.5z" fill="currentColor"/>',
  star: '<path d="M12 5.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L12 15.3l-3.8 2 .7-4.3-3.1-3 4.3-.6z" fill="currentColor"/>',
  trophy: '<path d="M8 4.5h8v4a4 4 0 0 1-8 0zM8 6.5H5c0 3 1.5 4.5 3.4 4.8M16 6.5h3c0 3-1.5 4.5-3.4 4.8M12 12.5v3.5M8.5 19.5h7M10 16h4v3.5h-4z"/>',
  seal: '<circle cx="12" cy="9.5" r="5"/><path d="M9 13.8L7.5 20l4.5-2 4.5 2-1.5-6.2M12 7.3l.8 1.5 1.6.2-1.2 1.1.3 1.6-1.5-.8-1.5.8.3-1.6-1.2-1.1 1.6-.2z"/>',
  cards: '<rect x="3.5" y="7" width="12" height="13" rx="2"/><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h9a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 1-1.5 1.5h-3.5"/>',
  dots: '<circle cx="6" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="18" cy="12" r="1.6" fill="currentColor"/>',
  news: '<path d="M4.5 5.5h12v13a1.5 1.5 0 0 0 1.5 1.5H6A1.5 1.5 0 0 1 4.5 18.5zM16.5 9h3v9.5a1.5 1.5 0 0 1-3 0M7.5 9h6M7.5 12.5h6M7.5 16h4"/>',
  book: '<path d="M5 4.5h11.5a2 2 0 0 1 2 2V20H7a2 2 0 0 1-2-2zM5 18a2 2 0 0 1 2-2h11.5"/>',
  film: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>',
  gloss: '<path d="M6 4.5h10l3 3v12H6zM9 10h7M9 13.5h7M9 17h4"/>',
  shield: '<path d="M12 3.5l7 3v5.2c0 4.3-3 7.6-7 8.8-4-1.2-7-4.5-7-8.8V6.5z"/><path d="M8.8 12l2.3 2.3 4.2-4.6"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.3M12 18.2v2.3M3.5 12h2.3M18.2 12h2.3M6 6l1.6 1.6M16.4 16.4L18 18M6 18l1.6-1.6M16.4 7.6L18 6"/>',
  user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c.8-3.8 3.8-5.8 7.5-5.8s6.7 2 7.5 5.8"/>',
  bolt: '<path d="M13 3.5L6 13.5h5l-1 7 7-10h-5z"/>',
  flame: '<path d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.4 2.6-5.2 3.4-8.4 1.9 1.3 2.6 3 2.6 4.6 1.2-.6 2-2 2-3.6 2.4 1.9 4 4.4 4 7.4 0 3.2-2.4 5.6-6 5.6z"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
  arrow: '<path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5"/>',
};
const ci = (n, cls) => `<svg class="ci${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${CI[n] || ''}</svg>`;
const plural = (n, s, p) => `${n} ${n > 1 ? (p || s + 's') : s}`;
// l'étoile à huit branches (khatam), forme des étapes du parcours et des distinctions
const KHATAM_SVG = (cls, inner) => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M50 2 63 15h22v22l13 13-13 13v22H63L50 98 37 85H15V63L2 50l13-13V15h22z"/>${inner || ''}</svg>`;

// ---------- objectifs du jour : compteurs du jour sur cet appareil (leçons terminées, mini-exercices réussis, questions revues)
function questDay() { const q = store.get('quest', null), k = dayKey(); return q && q.d === k ? q : { d: k, lecon: 0, mini: 0, rev: 0, cel: 0 }; }
function questAdd(kind) {
  const q = questDay(); q[kind] = (q[kind] || 0) + 1; store.set('quest', q);
  setTimeout(questCheck, 900);
}
function quests() {
  const q = questDay(), t = state.days[dayKey()] || 0, due = revDue().length;
  const list = [
    { id: 'time', icon: 'target', t: `Étudier ${DAY_GOAL / 60} minutes`, cur: Math.min(DAY_GOAL, t), goal: DAY_GOAL, show: t >= DAY_GOAL ? `${Math.floor(t / 60)} min d’étude aujourd’hui` : `${Math.floor(t / 60)} / ${DAY_GOAL / 60} min` },
    { id: 'lecon', icon: 'learn', t: 'Terminer une leçon', cur: Math.min(1, q.lecon), goal: 1, show: q.lecon ? plural(q.lecon, 'leçon') + ' aujourd’hui' : 'pas encore aujourd’hui' },
  ];
  if (due || q.rev) list.push({ id: 'rev', icon: 'rev', t: 'Revoir les questions du jour', cur: q.rev, goal: q.rev + due, show: due ? `${plural(due, 'question')} à revoir` : `${plural(q.rev, 'question')} revue${q.rev > 1 ? 's' : ''}`, href: '#revisions' });
  else list.push({ id: 'mini', icon: 'check', t: 'Réussir un mini-exercice', cur: Math.min(1, q.mini), goal: 1, show: q.mini ? 'réussi aujourd’hui' : 'à la fin de chaque leçon' });
  return list;
}
function questCheck() {                                // une seule célébration par jour, quand les trois objectifs sont atteints
  const q = questDay(); if (q.cel) return;
  if (quests().every(x => x.cur >= x.goal)) { q.cel = 1; store.set('quest', q); campusToast('Objectifs du jour atteints · bravo !'); }
}
function campusToast(t) {
  const e = document.createElement('div'); e.className = 'cm-toast'; e.setAttribute('role', 'status');
  e.innerHTML = `${KHATAM_SVG('cm-toast-k')}<span>${esc(t)}</span>`; document.body.appendChild(e); setTimeout(() => e.remove(), 3200);
}

// ---------- l'élève
function learner() {
  const A = AUTH(), u = A && A.user(), i = u && A.info ? (A.info() || {}) : {};
  const first = (i.prenom || (u && u.displayName) || '').trim().split(/\s+/)[0] || '';
  return { A, u, first, photo: u && u.photoURL ? u.photoURL : '' };
}
const avatar = (L, cls) => L.photo ? `<img class="${cls}" src="${esc(L.photo)}" alt="" width="56" height="56" referrerpolicy="no-referrer">`
  : `<span class="${cls} av-k" aria-hidden="true">${L.first ? esc(L.first.charAt(0).toUpperCase()) : KHATAM_SVG('av-s')}</span>`;
function maxStreak() {                                 // meilleure série parmi les jours d'étude gardés (quatre derniers mois)
  const ks = Object.keys(state.days).filter(k => state.days[k] > 0).sort(); let best = 0, run = 0, prev = null;
  for (const k of ks) { const d = new Date(k + 'T12:00:00'); run = prev && Math.round((d - prev) / 864e5) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = d; }
  return best;
}
const studyMin = () => Math.floor(Object.values(state.time || {}).reduce((a, b) => a + (+b || 0), 0) / 60);
const cmDur = m => m >= 60 ? `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}` : `${m} min`;
const lessonsDone = () => SUBJECTS.reduce((a, s) => a + subjectProgress(s).d, 0);
const lessonsAll = () => SUBJECTS.reduce((a, s) => a + s.lessons.length, 0);
const evalsPassed = () => SUBJECTS.filter(s => s.quiz && s.quiz.length && quizOk(s)).length;
const revKnown = () => Object.values(state.rev).filter(r => r.ok).length;
function divInfo() {
  if (typeof xpTotal !== 'function') return null;
  const tot = xpTotal(), i = divisionOf(tot), d = DIVISIONS[i], n = DIVISIONS[i + 1];
  return { tot, name: d[0], color: d[2], next: n ? n[0] : '', left: n ? n[1] - tot : 0, pct: n ? Math.round((tot - d[1]) / (n[1] - d[1]) * 100) : 100 };
}

// ---------- zone du haut : l'élève, sa division, sa série, ses XP de la semaine, son objectif du jour
function campusTop() {
  const L = learner(), st = streak(), t = state.days[dayKey()] || 0, pct = Math.min(100, Math.round(t / DAY_GOAL * 100)), due = revDue().length, D = divInfo();
  const h = new Date().getHours(), hello = h < 5 || h >= 18 ? 'Bonsoir' : 'Bonjour';
  return `<section class="ctop" aria-label="Mon tableau de bord">
    <div class="ct-id">${avatar(L, 'ct-av')}<div class="ct-name"><small>${L.first ? hello : 'Bienvenue sur Lisân Campus'}</small><b>${L.first ? esc(L.first) : 'Votre campus'}</b>
      ${D ? `<a class="ct-div" href="#progression" style="--dc:${D.color}">${KHATAM_SVG('ct-div-k')}Division ${esc(D.name)} · ${nf(D.tot)} XP</a>` : ''}</div>
      ${L.A && !L.u ? '<button type="button" class="btn small ct-login" data-auth="signin">Se connecter</button>' : ''}</div>
    <div class="ct-stats">
      <a class="ct-st${st ? ' on' : ''}" href="#progression" style="--k:#e3762b">${ci('flame')}<b>${st}</b><small>${st > 1 ? 'jours de suite' : 'jour de suite'}</small></a>
      ${typeof xpWeek === 'function' ? `<a class="ct-st" href="#classement" style="--k:#7c4dde">${ci('bolt')}<b>${nf(xpWeek())}</b><small>XP cette semaine</small></a>` : ''}
      <a class="ct-st${due ? ' on' : ''}" href="#revisions" style="--k:#1f7a5c">${ci('rev')}<b>${due}</b><small>${due > 1 ? 'questions à revoir' : 'question à revoir'}</small></a>
      <a class="ct-st ct-goal" href="#progression" style="--k:var(--gold);--p:${pct}"><span class="ct-ring"><i>${pct >= 100 ? ci('check') : ''}</i></span><b>${pct >= 100 ? Math.floor(t / 60) : Math.floor(t / 60) + '/' + DAY_GOAL / 60}</b><small>${pct >= 100 ? 'min · objectif atteint' : 'min aujourd’hui'}</small></a>
    </div></section>`;
}

// ---------- reprendre : la dernière leçon ouverte, sinon la prochaine étape de son espace ; les autres espaces en cours
function campusResume() {
  const last = typeof lastLesson === 'function' ? lastLesson() : null;
  if (!last) {
    return `<section class="cresume start"><div class="cr-h"><span class="eyebrow">Par où commencer ?</span><h2>La première leçon de chaque espace est libre</h2></div>
      <div class="cr-list">${SPACES.map(sp => { const s = SUBJECTS.find(x => spaceOf(x) === sp.id); if (!s) return '';
        return `<a class="cr-row c-${sp.color}" href="#l-${s.id}.${s.lessons[0].id}"><span class="cr-ic" aria-hidden="true">${sp.icon}</span><span><b>${esc(sp.title)}</b><small>${esc(s.lessons[0].title)}</small></span>${ci('arrow', 'cr-go')}</a>`; }).join('')}</div></section>`;
  }
  const { s, l, i } = last, key = s.id + '/' + l.id, sp = space(spaceOf(s));
  const doneIt = !!state.done[key], ns = doneIt ? nextStep(sp.id) : null;
  let target = { s, l, i, href: '#' + state.last.route }, label = 'Continuer';
  if (ns) { const f = firstUndone(ns.s); target = f === -1 ? { s: ns.s, quiz: true, href: ns.href } : { s: ns.s, l: ns.s.lessons[f], i: f, href: ns.href }; label = target.quiz ? 'Passer l’évaluation' : 'Commencer'; }
  const P = subjectProgress(target.s);
  const need = target.l ? needFor(target.l) : 0, spent = target.l ? Math.min(need, state.time[target.s.id + '/' + target.l.id] || 0) : 0;
  const sub = target.quiz ? `Toutes les leçons sont terminées : l’évaluation du certificat vous attend.` : target.l && spent && spent < need ? `Encore environ ${Math.max(1, Math.round((need - spent) / 60))} min d’étude pour cette leçon` : target.l ? `Leçon ${lessonPos(target.s, target.i)} · environ ${Math.max(1, Math.round(need / 60))} min` : '';
  const others = SPACES.filter(x => x.id !== sp.id && spaceProgress(x).d > 0).map(x => ({ x, n: nextStep(x.id) })).filter(o => o.n).slice(0, 2);
  return `<section class="cresume c-${target.s.color}"><a class="cr-main" href="${target.href}">
      <span class="cr-k" aria-hidden="true">${KHATAM_SVG('cr-ks')}<span class="cr-sp">${sp.icon}</span></span>
      <span class="cr-t"><span class="eyebrow">${ns ? 'Prochaine étape' : 'Reprendre'} · ${esc(sp.title)}</span>
        <b>${target.quiz ? 'Évaluation du certificat' : esc(target.l.title)}</b><small>${esc(target.s.title)}${sub ? ' · ' + esc(sub) : ''}</small>
        <span class="cr-bar"><i style="width:${P.pct}%"></i></span><small class="cr-pct">${P.d} / ${P.n} leçons du parcours</small></span>
      <span class="btn cr-btn">${label}${ci('arrow')}</span></a>
    ${others.length ? `<div class="cr-more"><span>Aussi en cours</span>${others.map(o => `<a href="${o.n.href}" class="c-${o.x.color}"><span aria-hidden="true">${o.x.icon}</span><span><b>${esc(o.x.title)}</b><small>${esc(o.n.label)}</small></span></a>`).join('')}</div>` : ''}</section>`;
}

// ---------- objectifs du jour (carte)
function campusQuests() {
  const Q = quests(), all = Q.every(x => x.cur >= x.goal);
  return `<section class="cquests${all ? ' all' : ''}" aria-label="Objectifs du jour"><div class="cq-h"><h2>Objectifs du jour</h2><small>${all ? 'Tout est fait · à demain !' : `${Q.filter(x => x.cur >= x.goal).length} / ${Q.length} atteints`}</small></div>
    ${Q.map(x => { const ok = x.cur >= x.goal, p = x.goal ? Math.min(100, Math.round(x.cur / x.goal * 100)) : 0, tag = x.href ? 'a' : 'div';
      return `<${tag} class="qrow${ok ? ' ok' : ''}"${x.href ? ` href="${x.href}"` : ''}><span class="cq-i">${ci(ok ? 'check' : x.icon)}</span><span class="cq-t"><b>${esc(x.t)}</b><span class="cq-bar"><i style="width:${p}%"></i></span><small>${esc(x.show)}</small></span></${tag}>`; }).join('')}</section>`;
}
// ---------- division et classement (carte)
function campusLeague() {
  const D = divInfo(); if (!D) return '';
  return `<a class="cleague" href="#classement" style="--dc:${D.color}"><span class="cl-k">${KHATAM_SVG('cl-ks')}${ci('trophy')}</span><span class="cl-t"><small>Division</small><b>${esc(D.name)}</b>
    <span class="cl-bar"><i style="width:${D.pct}%"></i></span><small>${D.next ? `${nf(D.left)} XP avant ${esc(D.next)}` : 'La plus haute division'}</small></span><span class="cl-go">Classement de la semaine${ci('arrow')}</span></a>`;
}
// ---------- raccourcis vers les outils du campus
function campusShortcuts() {
  const due = revDue().length, cur = curSubject(homeSpace());
  const it = (h, ic, t, badge, c) => `<a class="csc" href="${h}" style="--k:${c}"><span class="csc-i">${ci(ic)}${badge ? `<em>${badge}</em>` : ''}</span><span>${t}</span></a>`;
  return `<nav class="cshort" aria-label="Raccourcis">
    ${it('#revisions', 'rev', 'Révisions', due ? (due > 99 ? '99+' : due) : '', '#1f7a5c')}
    ${cur ? it('#f-' + cur.id, 'cards', 'Cartes', '', '#7a3d8f') : ''}
    ${it('#bibliotheque', 'lib', 'Bibliothèque', '', '#a3501c')}
    ${it('#recherche', 'search', 'Rechercher', '', '#23468f')}
    ${typeof viewBoard === 'function' ? it('#classement', 'trophy', 'Classement', '', '#b8811f') : ''}
    ${it('#actualites', 'news', 'Actualité', '', '#8b1d3f')}
    ${it('#glossaire', 'gloss', 'Glossaire', '', '#1f5f7a')}
    ${it('#verifier', 'shield', 'Certificats', '', '#0e6b4f')}
    ${it('#guide', 'film', 'Mode d’emploi', '', '#5a3fc0')}</nav>`;
}

// ---------- le parcours en étoiles
// espace affiché sur l'accueil : celui choisi par l'élève, sinon celui de la dernière leçon, sinon le premier où il est inscrit
function homeSpace() {
  const c = store.get('campus.sp', ''); if (space(c)) return c;
  const last = typeof lastLesson === 'function' ? lastLesson() : null; if (last) return spaceOf(last.s);
  const A = AUTH(); if (A && A.user()) { const e = SPACES.find(sp => A.enrolled(sp.id)); if (e) return e.id; }
  return SPACES[0].id;
}
// parcours en cours d'un espace : celui de la dernière leçon s'il n'est pas réussi, sinon la prochaine étape
function curSubject(spId) {
  const last = typeof lastLesson === 'function' ? lastLesson() : null;
  if (last && spaceOf(last.s) === spId && !subjectPassed(last.s) && subjectOpen(last.s)) return last.s;
  const ns = nextStep(spId); if (ns) return ns.s;
  const ss = SUBJECTS.filter(s => spaceOf(s) === spId); return ss[ss.length - 1] || null;
}
const WHY = { prev: s => `Ouvert après « ${blockingSubject(s).title} »`, login: () => 'Connexion requise', enroll: () => 'Inscription à l’espace requise', order: () => 'Après la leçon précédente' };
function lessonNode(s, i) {
  const l = s.lessons[i], key = s.id + '/' + l.id;
  if (state.done[key]) return { st: 'done', ic: 'check', why: state.minis[key] ? 'Terminée · exercice réussi' : 'Terminée' };
  const a = access(s, i);
  if (a === 'ok') return { st: i === firstUndone(s) ? 'cur' : 'open', ic: i === firstUndone(s) ? 'play' : 'star', why: state.time[key] ? 'Commencée' : i === 0 && AUTH() && !AUTH().user() ? 'Accès libre' : 'À étudier' };
  return { st: 'lock', ic: a === 'login' || a === 'enroll' ? 'key' : 'lock', why: (WHY[a] || WHY.order)(s) };
}
function evalNode(s) {
  const best = quizBest(s);
  if (quizOk(s)) return { st: 'done gold', ic: 'trophy', why: `Réussie · ${best} %` };
  if (!subjectOpen(s)) return { st: 'lock', ic: 'lock', why: WHY.prev(s) };
  if (!inOrder(s, 'quiz')) return { st: 'lock', ic: 'trophy', why: 'Après la dernière leçon' };
  const a = access(s, 1); if (a === 'login' || a === 'enroll') return { st: 'lock', ic: 'key', why: WHY[a](s) };
  return { st: 'cur', ic: 'trophy', why: best !== undefined ? `Meilleur score : ${best} % · ${typeof CERT_QUIZ !== 'undefined' ? CERT_QUIZ : 80} % requis` : '20 questions · 80 % requis' };
}
function certNode(s) {
  const A = AUTH(), sp = space(spaceOf(s)), one = typeof singleSpace === 'function' && singleSpace(sp), k = one ? 'e:' + sp.id : 'p:' + s.id;
  const mine = A && typeof myCertFor === 'function' ? myCertFor(A, k) : null;
  if (mine) return { st: 'done gold', ic: 'seal', why: `N° ${mine.num}`, href: '#certificat-' + mine.num };
  if (typeof parcoursStatus === 'function' && parcoursStatus(s).ok) return { st: 'cur gold', ic: 'seal', why: A ? 'Prêt : à recevoir sur la page du parcours' : 'Parcours réussi', href: '#m-' + s.id };
  return { st: 'lock', ic: 'seal', why: 'Leçons terminées et évaluation réussie', href: '#m-' + s.id };
}
const ROW = 84, XS = [0, 22, 34, 22, 0, -22, -34, -22];
// opts.window : sur l'accueil, quelques leçons autour de l'étape en cours ; sinon tout le parcours
function pathHTML(s, opts = {}) {
  const n = s.lessons.length, f = firstUndone(s), cur = f === -1 ? n - 1 : f;
  let from = 0, to = n - 1;
  if (opts.window) { from = Math.max(0, cur - 2); to = Math.min(n - 1, from + 5); from = Math.max(0, to - 5); }
  const rows = [];
  if (from > 0) rows.push({ gap: true, txt: `${plural(from, 'leçon')} avant · voir tout le parcours`, href: opts.full || '#m-' + s.id, done: true });
  for (let i = from; i <= to; i++) { const N = lessonNode(s, i); rows.push(Object.assign({ href: `#l-${s.id}.${s.lessons[i].id}`, k: 'l', small: lessonOff(s) && i === 0 ? 'Introduction' : 'Leçon ' + lessonNum(s, i), title: s.lessons[i].title }, N)); }
  if (to < n - 1) rows.push({ gap: true, txt: `${plural(n - 1 - to, 'autre leçon', 'autres leçons')} · voir tout le parcours`, href: opts.full || '#m-' + s.id });
  if (s.quiz && s.quiz.length) rows.push(Object.assign({ href: '#q-' + s.id, k: 'q', small: 'Évaluation', title: 'Évaluation du certificat' }, evalNode(s)));
  rows.push(Object.assign({ k: 'c', small: 'Certificat', title: 'Certificat de réussite' }, certNode(s)));
  // tracé : une courbe entre les étoiles ; la partie parcourue en or, jusqu'à l'étape en cours
  const cx = j => 66 + XS[j % XS.length], cy = j => j * ROW + ROW / 2;
  let d = '', dd = '', reach = -1;
  rows.forEach((r, j) => { if (r.st && r.st.startsWith('done') || r.done) reach = j; });
  const curIdx = rows.findIndex(r => r.st && r.st.startsWith('cur')); if (curIdx > reach) reach = curIdx;
  rows.forEach((r, j) => { if (!j) { d = `M${cx(0)} ${cy(0)}`; return; } const seg = ` C${cx(j - 1)} ${cy(j - 1) + ROW / 2} ${cx(j)} ${cy(j) - ROW / 2} ${cx(j)} ${cy(j)}`; d += seg; if (j <= reach) dd += seg; });
  const H = rows.length * ROW;
  return `<ol class="cpath c-${s.color}" style="--rows:${rows.length}"><svg class="cp-line" width="132" height="${H}" viewBox="0 0 132 ${H}" aria-hidden="true" focusable="false"><path class="cp-track" d="${d}"/>${dd ? `<path class="cp-done" d="M${cx(0)} ${cy(0)}${dd}"/>` : ''}</svg>
    ${rows.map((r, j) => {
      const x = XS[j % XS.length] + 'px';
      if (r.gap) return `<li class="pnode pn-gap" style="--x:${x}"><a class="pn-a" href="${r.href}"><span class="pn-k"><span class="pn-f">${ci('dots')}</span></span><span class="pn-t"><small>${esc(r.txt)}</small></span></a></li>`;
      const lab = `${r.small} : ${r.title} — ${r.why}`;
      return `<li class="pnode st-${r.st} k-${r.k}" style="--x:${x}"><a class="pn-a" href="${r.href}" aria-label="${esc(lab)}"${r.st.startsWith('cur') ? ' aria-current="step"' : ''}>
        <span class="pn-k">${KHATAM_SVG('pn-s')}${KHATAM_SVG('pn-face')}<span class="pn-i">${ci(r.ic)}</span></span>
        <span class="pn-t"><small>${esc(r.small)}${r.st.startsWith('cur') && r.k === 'l' ? ' · <em>Votre étape</em>' : ''}</small><b>${esc(r.title)}</b><span class="pn-w">${esc(r.why)}</span></span></a></li>`; }).join('')}</ol>`;
}
// en-tête d'un parcours : position dans l'espace, titre, progression, état, accès au parcours et aux cartes
function unitHead(s, tag) {
  const ss = SUBJECTS.filter(x => spaceOf(x) === spaceOf(s)), k = ss.indexOf(s), P = subjectProgress(s), ok = subjectPassed(s), open = subjectOpen(s);
  const state_ = ok ? '<span class="pu-st ok">✓ Réussi</span>' : open ? (P.d ? '<span class="pu-st">En cours</span>' : '<span class="pu-st">Ouvert</span>') : '<span class="pu-st lock">Verrouillé</span>';
  const T = tag || 'header';
  return `<${T} class="pu c-${s.color}${open ? '' : ' locked'}"><span class="pu-ring" style="--p:${P.pct}" aria-hidden="true"><i>${ok ? ci('check') : P.pct + '%'}</i></span>
    <span class="pu-t"><span class="eyebrow">Parcours ${k + 1} sur ${ss.length} ${state_}</span><b>${esc(s.title)}</b><small>${P.d} / ${P.n} leçons${quizBest(s) !== undefined ? ` · évaluation ${quizBest(s)} %` : ''}</small></span></${T}>`;
}
function unitActions(s) {
  return `<div class="pu-act"><a class="btn ghost small" href="#m-${s.id}">${ci('learn')}Le parcours</a><a class="btn ghost small${subjectOpen(s) ? '' : ' is-locked'}" href="#f-${s.id}">${ci('cards')}Cartes · ${s.cards.length}</a>${(window.DOCS || []).some(d => d.space === spaceOf(s)) || (window.LIVRES || []).some(b => b.space === spaceOf(s)) ? `<a class="btn ghost small" href="#bibliotheque-${spaceOf(s)}">${ci('lib')}Documents</a>` : ''}</div>`;
}
const spaceTabs = (cur, mode) => `<div class="sptabs" role="${mode === 'home' ? 'tablist' : 'navigation'}" aria-label="Les espaces">${SPACES.map(sp => { const p = spaceProgress(sp), on = sp.id === cur;
  const inner = `<span class="spt-i" aria-hidden="true">${sp.icon}</span><span class="spt-t">${esc(sp.title.replace(/ · Licence 1| avec Claude/g, ''))}</span>${p.d ? `<span class="spt-p">${p.pct}%</span>` : ''}`;
  return mode === 'home' ? `<button type="button" class="spt c-${sp.color}" role="tab" aria-selected="${on}" data-csp="${sp.id}">${inner}</button>` : `<a class="spt c-${sp.color}" href="#apprendre-${sp.id}"${on ? ' aria-current="page"' : ''}>${inner}</a>`; }).join('')}</div>`;
function homePath(spId) {
  const sp = space(spId), s = curSubject(spId); if (!s) return '';
  return `<div class="cp-wrap" id="cp-wrap">${unitHead(s)}${pathHTML(s, { window: true, full: '#apprendre-' + spId })}${unitActions(s)}
    <a class="cp-all" href="#apprendre-${spId}">Tous les parcours de l’espace « ${esc(sp.title)} »${ci('arrow')}</a></div>`;
}
function campusPath() {
  const spId = homeSpace();
  return `<section class="ccampus" aria-label="Mon parcours"><div class="cc-h"><h2>Mon parcours</h2><a href="#apprendre">Le campus${ci('arrow')}</a></div>${spaceTabs(spId, 'home')}${homePath(spId)}</section>`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-csp]'); if (!b) return;
  store.set('campus.sp', b.dataset.csp);
  document.querySelectorAll('[data-csp]').forEach(x => x.setAttribute('aria-selected', String(x === b)));
  const w = document.getElementById('cp-wrap'); if (w) { w.outerHTML = homePath(b.dataset.csp); const n = document.getElementById('cp-wrap'); if (n) n.classList.add('swap'); }
  const sc = document.querySelector('.cshort'); if (sc) sc.outerHTML = campusShortcuts();
});

// ---------- page « Apprendre » : le campus, espace par espace, tous les parcours et leurs étapes
function viewApprendre(spId) {
  const sp = space(spId) || space(homeSpace()), ss = SUBJECTS.filter(s => spaceOf(s) === sp.id), cur = curSubject(sp.id), p = spaceProgress(sp), A = AUTH();
  let reg = '';
  if (A && !A.user()) reg = `<div class="notice">La première leçon de l’espace est en accès libre. Pour la suite, <button type="button" class="linkbtn" data-auth="signin">connectez-vous avec Google</button> puis inscrivez-vous à cet espace.</div>`;
  else if (A && !A.enrolled(sp.id)) reg = `<div class="notice reg-n"><span>Vous n’êtes pas encore inscrit à cet espace. L’inscription est gratuite et ouvre toutes les leçons.</span> <a class="btn small" href="#inscription-${sp.id}">M’inscrire</a></div>`;
  return `${crumbs(['Apprendre'])}<div class="appr">
    <div class="appr-h"><h1>Le campus</h1><p class="lead">Chaque espace est un chemin : les parcours se suivent, chaque étoile est une leçon, l’évaluation et le certificat ferment la marche.</p></div>
    ${spaceTabs(sp.id, 'page')}
    <section class="appr-sp c-${sp.color}"><span class="appr-ic" aria-hidden="true">${sp.icon}</span><div><span class="eyebrow">${esc(sp.eyebrow)}</span><h2>${esc(sp.title)}</h2><p>${esc(sp.lead)}</p>
      <span class="appr-bar"><i style="width:${p.pct}%"></i></span><small>${p.d} / ${p.n} leçons · ${typeof spaceStatus === 'function' ? spaceStatus(sp).done + ' / ' : ''}${plural(ss.length, 'parcours', 'parcours')}${typeof spaceStatus === 'function' ? ' réussi' + (spaceStatus(sp).done > 1 ? 's' : '') : ''}${FREE_ORDER.includes(sp.id) ? ' · matières ouvertes en parallèle' : ''}</small></div>
      <a class="btn small appr-go" href="#espace-${sp.id}">Page de l’espace${ci('arrow')}</a></section>
    ${reg}
    <div class="appr-list">${ss.map(s => `<details class="pu-d"${s === cur ? ' open' : ''} data-sid="${s.id}"><summary>${unitHead(s, 'div')}<span class="pu-chev" aria-hidden="true"></span></summary>
      <div class="pu-body">${s === cur ? pathHTML(s) + unitActions(s) : ''}</div></details>`).join('')}</div></div>`;
}
document.addEventListener('toggle', e => {             // les étapes d'un parcours se dessinent quand on l'ouvre
  const d = e.target; if (!d.matches || !d.matches('details.pu-d') || !d.open) return;
  const b = d.querySelector('.pu-body'), s = subj(d.dataset.sid); if (b && s && !b.innerHTML.trim()) b.innerHTML = pathHTML(s) + unitActions(s);
}, true);

// ---------- distinctions : chacune se gagne par une activité réelle (leçons, série, temps, révisions, évaluations, certificats)
function badges() {
  const done = lessonsDone(), best = Math.max(maxStreak(), streak()), min = studyMin(), known = revKnown();
  const passed = SUBJECTS.filter(s => subjectPassed(s)).length;
  const spaceDone = typeof spaceStatus === 'function' ? SPACES.filter(sp => spaceStatus(sp).ok).length : 0;
  const perfect = Object.entries(state.quiz).some(([k, v]) => /@eval$/.test(k) && v >= 100) ? 1 : 0;
  const spacesTried = SPACES.filter(sp => spaceProgress(sp).d > 0).length;
  const goalDays = Object.values(state.days).filter(v => v >= DAY_GOAL).length;
  return [
    ['🌱', 'Premier pas', 'Terminer une première leçon', done, 1],
    ['📘', 'Lecteur assidu', 'Terminer 10 leçons', done, 10],
    ['📚', 'Studieux', 'Terminer 50 leçons', done, 50],
    ['🏛️', 'Érudit', 'Terminer 150 leçons', done, 150],
    ['🔥', 'Trois jours de suite', 'Étudier trois jours d’affilée', best, 3],
    ['🗓️', 'Une semaine entière', 'Étudier sept jours d’affilée', best, 7],
    ['🌟', 'Un mois de régularité', 'Étudier trente jours d’affilée', best, 30],
    ['🎯', 'Objectif tenu', 'Atteindre l’objectif du jour 10 fois', goalDays, 10],
    ['⏳', 'Cinq heures d’étude', 'Cinq heures passées dans les leçons', min, 300],
    ['🪶', 'Vingt heures d’étude', 'Vingt heures passées dans les leçons', min, 1200],
    ['🧠', 'Mémoire solide', 'Acquérir 10 questions dans « Mes révisions »', known, 10],
    ['🧭', 'Explorateur', 'Terminer des leçons dans trois espaces', spacesTried, 3],
    ['🎓', 'Premier parcours', 'Réussir un parcours (leçons et évaluation)', passed, 1],
    ['🏅', 'Cinq parcours', 'Réussir cinq parcours', passed, 5],
    ['⭐', 'Sans faute', 'Obtenir 100 % à une évaluation', perfect, 1],
    ['🏆', 'Espace achevé', 'Réussir tous les parcours d’un espace', spaceDone, 1],
  ].map(([ic, t, d, cur, goal]) => ({ ic, t, d, cur: Math.min(cur, goal), goal, ok: cur >= goal }));
}
function badgeHTML(b) {
  return `<li class="bdg${b.ok ? ' ok' : ''}"><span class="bdg-k">${KHATAM_SVG('bdg-s')}<span class="bdg-i" aria-hidden="true">${b.ic}</span>${b.ok ? '' : `<span class="bdg-l">${ci('lock')}</span>`}</span>
    <b>${esc(b.t)}</b><small>${esc(b.d)}</small>${b.ok ? '<span class="bdg-st">Obtenue</span>' : `<span class="bdg-bar" aria-label="${b.cur} sur ${b.goal}"><i style="width:${Math.round(b.cur / b.goal * 100)}%"></i></span><span class="bdg-st">${nf(b.cur)} / ${nf(b.goal)}</span>`}</li>`;
}

// ---------- page « Mes progrès »
function heatmap() {                                    // douze semaines d'étude, du lundi au dimanche
  const end = new Date(); end.setHours(12, 0, 0, 0); const start = weekStart(end); start.setDate(start.getDate() - 7 * 11);
  const cells = [], months = [];
  for (let w = 0; w < 12; w++) { for (let d = 0; d < 7; d++) { const x = new Date(start); x.setDate(start.getDate() + w * 7 + d); const k = dayKey(x), m = Math.floor((state.days[k] || 0) / 60), fut = x > end;
      const lv = fut ? -1 : m === 0 ? 0 : m < 5 ? 1 : m < 10 ? 2 : m < 20 ? 3 : 4;
      cells.push(`<i class="hm l${lv}" title="${fut ? '' : x.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) + ' : ' + (m ? m + ' min' : 'pas d’étude')}"></i>`);
      if (d === 0 && x.getDate() <= 7) months.push(`<span style="grid-column:${w + 1}">${x.toLocaleDateString('fr-FR', { month: 'short' })}</span>`); } }
  return `<div class="hm-wrap"><div class="hm-m">${months.join('')}</div><div class="hm-g" role="img" aria-label="Jours d’étude des douze dernières semaines">${cells.join('')}</div>
    <div class="hm-k"><span>Moins</span><i class="hm l0"></i><i class="hm l1"></i><i class="hm l2"></i><i class="hm l3"></i><i class="hm l4"></i><span>Plus</span></div></div>`;
}
function weekBars() {
  if (typeof weekDays !== 'function') return '';
  const today = dayKey(), ds = weekDays(), v = ds.map(d => dayKey(d) <= today ? xpDay(dayKey(d)) : 0), mx = Math.max(20, ...v);
  return `<div class="wk">${ds.map((d, i) => { const k = dayKey(d); return `<div class="wk-d${k === today ? ' today' : ''}${k > today ? ' fut' : ''}"><span class="wk-v">${k > today ? '' : v[i]}</span><span class="wk-b"><i style="height:${Math.round(v[i] / mx * 100)}%"></i></span><small>${d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')}</small></div>`; }).join('')}</div>`;
}
function viewProgression() {
  const L = learner(), D = divInfo(), B = badges(), got = B.filter(b => b.ok).length, done = lessonsDone(), all = lessonsAll(), st = streak();
  const stat = (ic, b, t, c, h) => `<${h ? `a href="${h}"` : 'div'} class="pg-st" style="--k:${c}">${ci(ic)}<b>${b}</b><small>${t}</small></${h ? 'a' : 'div'}>`;
  const certs = L.A && typeof myCerts === 'function' ? myCerts(L.A).length : 0;
  return `${crumbs(['Mes progrès'])}<div class="prog">
    <section class="pg-head"${D ? ` style="--dc:${D.color}"` : ''}>${avatar(L, 'pg-av')}<div class="pg-who"><small>${L.u ? 'Mes progrès' : 'Votre progression sur cet appareil'}</small><h1>${L.first ? esc(L.first) : 'Mes progrès'}</h1>
      ${D ? `<div class="pg-div">${KHATAM_SVG('pg-div-k')}<span><b>Division ${esc(D.name)}</b> · ${nf(D.tot)} XP au total</span></div><span class="pg-bar"><i style="width:${D.pct}%"></i></span><small>${D.next ? `${nf(D.left)} XP avant la division ${esc(D.next)}` : 'Vous êtes dans la plus haute division.'}</small>` : ''}</div>
      ${L.A && !L.u ? '<button type="button" class="btn small" data-auth="signin">Se connecter pour garder ma progression</button>' : ''}</section>
    <section class="pg-stats" aria-label="Mes chiffres">
      ${stat('flame', st, st > 1 ? 'jours de suite' : 'jour de suite', '#e3762b')}
      ${stat('star', Math.max(maxStreak(), st), 'meilleure série', '#b8811f')}
      ${stat('target', cmDur(studyMin()), 'passées dans les leçons', '#23468f')}
      ${stat('learn', `${nf(done)}<span>/${nf(all)}</span>`, 'leçons terminées', '#0e6b4f', '#apprendre')}
      ${stat('trophy', evalsPassed(), evalsPassed() > 1 ? 'évaluations réussies' : 'évaluation réussie', '#7c4dde')}
      ${stat('rev', revKnown(), `question${revKnown() > 1 ? 's' : ''} acquise${revKnown() > 1 ? 's' : ''} · ${revOpen().length} en révision`, '#1f7a5c', '#revisions')}
      ${L.A ? stat('seal', certs, certs > 1 ? 'certificats' : 'certificat', '#a3501c', '#compte') : ''}
    </section>
    <div class="pg-cols">
      <section class="pg-card"><div class="pg-ch"><h2>Cette semaine</h2>${typeof xpWeek === 'function' ? `<a href="#classement">${nf(xpWeek())} XP · classement${ci('arrow')}</a>` : ''}</div>${weekBars()}
        <p class="meta">1 XP par minute d’étude, plus 20 XP par leçon terminée, 10 XP par mini-exercice réussi la première fois, 2 XP par question de révision juste et des points à chaque évaluation.</p></section>
      <section class="pg-card"><div class="pg-ch"><h2>Régularité</h2><small>${Object.values(state.days).filter(v => v > 0).length} jours d’étude en quatre mois</small></div>${heatmap()}</section>
    </div>
    <section class="pg-card"><div class="pg-ch"><h2>Mes espaces</h2><a href="#apprendre">Le campus${ci('arrow')}</a></div><div class="pg-sp">${SPACES.map(sp => { const p = spaceProgress(sp), S = typeof spaceStatus === 'function' ? spaceStatus(sp) : null;
      return `<a class="pg-spr c-${sp.color}" href="#apprendre-${sp.id}"><span class="pg-spi" aria-hidden="true">${sp.icon}</span><span class="pg-spt"><b>${esc(sp.title)}</b><span class="pg-spb"><i style="width:${p.pct}%"></i></span><small>${p.d} / ${p.n} leçons${S ? ` · ${S.done} / ${S.ss.length} parcours réussi${S.done > 1 ? 's' : ''}` : ''}</small></span><span class="pg-spp">${p.pct}%</span></a>`; }).join('')}</div></section>
    <section class="pg-card"><div class="pg-ch"><h2>Distinctions</h2><small>${got} / ${B.length} obtenues</small></div><ul class="bdgs">${B.map(badgeHTML).join('')}</ul></section>
    <nav class="pg-links" aria-label="Mon compte">
      ${L.A && L.u ? `<a href="#profil">${ci('user')}Mes informations</a>` : ''}${L.A ? `<a href="#compte">${ci('seal')}Mon compte et mes certificats</a>` : ''}
      <a href="#revisions">${ci('rev')}Mes révisions</a>${typeof viewBoard === 'function' ? `<a href="#classement">${ci('trophy')}Classement de la semaine</a>` : ''}<a href="#parametres">${ci('gear')}Paramètres et rappels</a></nav></div>`;
}

// ---------- barre de navigation du bas (téléphone) et onglet actif de l'en-tête (ordinateur)
const TABS = [['accueil', 'home', 'Accueil'], ['apprendre', 'learn', 'Apprendre'], ['revisions', 'rev', 'Réviser'], ['bibliotheque', 'lib', 'Bibliothèque'], ['progression', 'prog', 'Progrès']];
function tabOf(h) {
  if (!h || h === 'accueil') return 'accueil';
  if (/^(apprendre|espace-|m-|l-|q-|f-|inscription-|glossaire|recherche)/.test(h)) return 'apprendre';
  if (/^(revisions)/.test(h)) return 'revisions';
  if (/^(bibliotheque|lire-)/.test(h)) return 'bibliotheque';
  if (/^(progression|classement|compte|profil|parametres|certificat-|avis-)/.test(h)) return 'progression';
  return '';
}
function tabbarHTML() {
  const due = typeof revDue === 'function' ? revDue().length : 0;
  return TABS.map(([h, ic, t]) => `<a href="#${h}" data-tab="${h}">${ci(ic)}<span>${t}</span>${h === 'revisions' && due ? `<em aria-label="${due} à revoir">${due > 99 ? '99+' : due}</em>` : ''}</a>`).join('');
}
function tabbarUpdate(h) {
  const bar = document.getElementById('tabbar'), cur = tabOf(h);
  if (bar) { bar.innerHTML = tabbarHTML(); bar.querySelectorAll('[data-tab]').forEach(a => { if (a.dataset.tab === cur) a.setAttribute('aria-current', 'page'); }); }
  // pendant une leçon, une évaluation ou une lecture : la barre s'efface pour laisser toute la place au contenu
  document.body.classList.toggle('no-tabbar', /^(l-|q-|lire-)/.test(h || ''));
  document.querySelectorAll('.quick a').forEach(a => { const t = (a.getAttribute('href') || '').slice(1); if (t === cur) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
}
