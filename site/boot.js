// ===== Lisân Campus · démarrage : liste des matières et lecture hors connexion
const SUBJECTS = [M_INTRO, M_DC, M_DM, M_OJ, M_METHO, M_TEE, M_EN, M_INFO, M_IA, M_IAP, M_IAE, M_IAEN, M_IAT, M_IAJ, M_IAETH, M_IAPR, M_A0, M_A1, M_A2, M_A3, M_QR, M_IS1, M_IS2];
// Actualiser (clic sur le logo de l'en-tête) : on cherche une nouvelle version, on l'installe si elle existe,
// puis la page se recharge sur la même page et à la même position (app.js : lc.place).
window.lcRefresh = () => location.reload();
if ('serviceWorker' in navigator) {
  // Nouvelle version : juste après l'ouverture, la page se recharge aussitôt (sur la même page) ; sinon la mise à
  // jour n'interrompt jamais l'élève : elle s'applique quand il quitte l'application, à la prochaine ouverture
  // ou quand il touche le logo. Il retrouve toujours la page et la position où il était.
  const hadSW = !!navigator.serviceWorker.controller, t0 = Date.now(); let pending = false;
  // garde-fou contre une boucle de rechargements (au plus un rechargement automatique toutes les 15 secondes)
  const doReload = () => { try { const last = +sessionStorage.getItem('lc-sw-reload') || 0; if (Date.now() - last < 15000) return; sessionStorage.setItem('lc-sw-reload', String(Date.now())); } catch (e) {}
    pending = false; location.reload(); };
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (!hadSW) return; if (Date.now() - t0 < 4000) doReload(); else pending = true; });
  document.addEventListener('visibilitychange', () => { if (pending && document.visibilityState === 'hidden') doReload(); });
  const reg = new Promise(res => window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').then(r => {
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') r.update().catch(() => {}); }); res(r); }).catch(() => res(null))));
  window.lcRefresh = () => {
    if (pending) { location.reload(); return; }
    const go = () => { clearTimeout(tm); try { sessionStorage.setItem('lc-sw-reload', String(Date.now())); } catch (e) {} location.reload(); }, tm = setTimeout(go, 4000);   // jamais plus de 4 secondes d'attente
    navigator.serviceWorker.addEventListener('controllerchange', go, { once: true });
    reg.then(r => { if (!r) return go(); return r.update().then(() => { const w = r.installing || r.waiting; if (!w) return go();
      if (w.state === 'activated') return go(); w.addEventListener('statechange', () => { if (w.state === 'redundant') go(); }); }); }).catch(go);
  };
}
