// ===== Lisân Campus · démarrage : liste des matières et lecture hors connexion
const SUBJECTS = [M_INTRO, M_DC, M_DM, M_OJ, M_METHO, M_TEE, M_EN, M_INFO, M_IA, M_IAP, M_IAE, M_IAEN, M_IAT, M_IAJ, M_IAETH, M_IAPR, M_A0, M_A1, M_A2, M_A3, M_QR, M_IS1, M_IS2];
if ('serviceWorker' in navigator) {
  // Nouvelle version : juste après l'ouverture, la page se recharge aussitôt ; sinon la mise à jour attend que
  // l'élève change de page ou quitte l'application, pour ne jamais l'interrompre. Il retrouve ensuite la page où il était.
  const hadSW = !!navigator.serviceWorker.controller, t0 = Date.now(); let pending = false;
  const doReload = () => { try { if (sessionStorage.getItem('lc-sw-reload')) return; sessionStorage.setItem('lc-sw-reload', '1'); } catch (e) {} location.reload(); };
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (!hadSW) return; if (Date.now() - t0 < 4000) doReload(); else pending = true; });
  window.addEventListener('hashchange', () => { if (pending) doReload(); });
  document.addEventListener('visibilitychange', () => { if (pending && document.visibilityState === 'hidden') doReload(); });
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').then(r => {
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') r.update().catch(() => {}); }); }).catch(() => {}); });
}
