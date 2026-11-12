// ===== Lisân Campus · lecteur des livres des Éditions Lisân (#lire-<livre>~<document>)
// Les livres de la collection se lisent en ligne, page par page, sans bouton de téléchargement
// (pdf.js, chargé à la demande depuis vendor/). Les documents de cours de l'espace Droit restent, eux, téléchargeables.
// Comme le reste du contrôle d'accès, ce lecteur organise la lecture ; il ne rend pas le fichier impossible à copier.

const READ_KEY = id => 'lc.read.' + id;
let reader = null;                                       // { doc, id, scale, obs, pages: [...] }

function readTarget(h) {                                // « lire-<livre>~<k> » → { b, d, file }
  const [bid, k] = h.slice(5).split('~');
  const b = (window.LIVRES || []).find(x => x.id === bid), d = b && b.docs.find(x => x.k === k);
  if (!b || !d || d.k === 'maitre') return null;
  return { b, d, file: `livres/Lisan_${b.id}_${d.k}.pdf`, id: b.id + '~' + d.k };
}
function viewReader(t) {
  const acc = libAccess(t.b.space), sp = space(t.b.space);
  const head = crumbs(['Bibliothèque', 'bibliotheque-' + t.b.space], [t.b.title]);
  if (acc !== 'ok') return `${head}<div class="gate c-${sp.color}"><span class="sp-icon" aria-hidden="true">📚</span><h1>${esc(t.b.title)}</h1>
    <p class="lead">${acc === 'signin' ? 'La lecture des livres demande la connexion Google, puis l’inscription à l’espace' : 'Pour lire ce livre, inscrivez-vous à l’espace'} « ${esc(sp.title)} ». C’est gratuit.</p>
    <div class="actions">${acc === 'signin' ? '<button type="button" class="btn" data-auth="signin">Se connecter avec Google</button>' : `<a class="btn" href="#inscription-${sp.id}">Remplir ma fiche d’inscription</a>`}<a class="btn ghost" href="#bibliotheque-${sp.id}">Retour à la bibliothèque</a></div></div>`;
  return `${head}<div class="reader c-${sp.color}">
    <div class="rd-bar" role="toolbar" aria-label="Lecture">
      <a class="rd-back" href="#bibliotheque-${sp.id}" aria-label="Retour à la bibliothèque">‹</a>
      <div class="rd-t"><b>${esc(t.b.title)}</b><small>${esc(t.d.name)}</small></div>
      <span class="rd-n" id="rd-n" aria-live="polite">…</span>
      <button type="button" class="rd-z" data-rd="out" aria-label="Réduire">−</button><button type="button" class="rd-z" data-rd="in" aria-label="Agrandir">+</button>
    </div>
    <p class="meta rd-note">Les livres des Éditions Lisân se lisent en ligne, sur le site ; ils ne sont pas téléchargeables. Votre page est retenue pour la prochaine lecture.</p>
    <div class="rd-pages" id="rd-pages"><p class="lead rd-wait">Ouverture du livre…</p></div></div>`;
}
function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  return new Promise((ok, ko) => { const s = document.createElement('script'); s.src = 'vendor/pdf.min.js';
    s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdf.worker.min.js'; ok(window.pdfjsLib); }; s.onerror = ko; document.head.appendChild(s); });
}
function closeReader() {
  if (!reader) return;
  if (reader.obs) reader.obs.disconnect();
  if (reader.track) reader.track.disconnect();
  try { reader.doc && reader.doc.destroy(); } catch (e) {}
  reader = null;
}
function bindReader(t) {
  const box = document.getElementById('rd-pages'); if (!box) return;
  const me = reader = { id: t.id, scale: 1, pages: [], cur: 1 };
  loadPdfJs().then(lib => lib.getDocument({ url: t.file, isEvalSupported: false, rangeChunkSize: 262144, disableAutoFetch: true }).promise).then(async doc => {
    if (reader !== me) { doc.destroy(); return; }
    me.doc = doc;
    const first = await doc.getPage(1), vp = first.getViewport({ scale: 1 });
    me.ratio = vp.height / vp.width;
    box.innerHTML = Array.from({ length: doc.numPages }, (_, i) => `<div class="rd-page" data-p="${i + 1}" style="aspect-ratio:${vp.width} / ${vp.height}"><span>${i + 1}</span></div>`).join('');
    me.pages = [...box.querySelectorAll('.rd-page')];
    me.obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) drawPage(me, e.target); else dropPage(e.target); }), { rootMargin: '150% 0px' });
    me.pages.forEach(p => me.obs.observe(p));
    me.track = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { me.cur = +e.target.dataset.p; showNum(me); try { localStorage.setItem(READ_KEY(me.id), String(me.cur)); } catch (x) {} } }), { rootMargin: '-45% 0px -45% 0px' });
    me.pages.forEach(p => me.track.observe(p));
    showNum(me);
    let saved = 1; try { saved = +localStorage.getItem(READ_KEY(me.id)) || 1; } catch (e) {}
    if (saved > 1 && saved <= doc.numPages) setTimeout(() => { const el = me.pages[saved - 1]; window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 70); }, 60);
  }).catch(() => { if (reader === me) box.innerHTML = '<p class="notice bad-n">Le livre n’a pas pu être ouvert. Vérifiez votre connexion internet, puis réessayez.</p>'; });
}
function showNum(me) { const n = document.getElementById('rd-n'); if (n && me.doc) n.textContent = `${me.cur} / ${me.doc.numPages}`; }
function drawPage(me, el) {
  if (el.dataset.on || !me.doc) return; el.dataset.on = '1';
  const n = +el.dataset.p;
  me.doc.getPage(n).then(pg => {
    if (!el.dataset.on || reader !== me) return;
    const w = el.clientWidth, dpr = Math.min(window.devicePixelRatio || 1, 2.5), base = pg.getViewport({ scale: 1 });
    const vp = pg.getViewport({ scale: w / base.width * dpr });
    const c = document.createElement('canvas'); c.width = Math.floor(vp.width); c.height = Math.floor(vp.height);
    c.setAttribute('aria-label', 'Page ' + n); c.setAttribute('role', 'img');
    const task = pg.render({ canvasContext: c.getContext('2d', { alpha: false }), viewport: vp });
    el._task = task;
    return task.promise.then(() => { if (el.dataset.on) { el.querySelectorAll('canvas').forEach(x => x.remove()); el.appendChild(c); el.classList.add('ok'); } });
  }).catch(() => { delete el.dataset.on; });
}
function dropPage(el) {
  if (!el.dataset.on) return; delete el.dataset.on;
  if (el._task) { try { el._task.cancel(); } catch (e) {} el._task = null; }
  el.querySelectorAll('canvas').forEach(c => { c.width = c.height = 0; c.remove(); }); el.classList.remove('ok');
}
function zoomReader(f) {
  const me = reader, box = document.getElementById('rd-pages'); if (!me || !box) return;
  me.scale = Math.max(1, Math.min(2.5, Math.round((me.scale * f) * 100) / 100));
  const cur = me.cur;
  box.style.setProperty('--rd-k', String(me.scale));
  box.classList.toggle('zoomed', me.scale > 1);
  me.pages.forEach(dropPage);
  requestAnimationFrame(() => { const el = me.pages[cur - 1]; if (el) window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 70); me.pages.forEach(p => { const r = p.getBoundingClientRect(); if (r.bottom > -innerHeight && r.top < innerHeight * 2) drawPage(me, p); }); });
}
document.addEventListener('click', e => { const z = e.target.closest('[data-rd]'); if (z) zoomReader(z.dataset.rd === 'in' ? 1.25 : 0.8); });
document.addEventListener('contextmenu', e => { if (e.target.closest('.rd-page')) e.preventDefault(); });
