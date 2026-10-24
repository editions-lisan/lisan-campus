// ===== Lisân Campus · démarrage : liste des matières et lecture hors connexion
const SUBJECTS = [M_INTRO, M_DC, M_DM, M_OJ, M_METHO, M_TEE, M_EN, M_INFO, M_IA, M_IAP, M_IAE, M_IAEN, M_IAT, M_IAJ, M_IAETH, M_IAPR, M_A0, M_A1, M_A2, M_A3, M_QR, M_IS1, M_IS2];
if ('serviceWorker' in navigator) {
  // quand une nouvelle version du site prend le relais, la page se recharge une fois pour l'afficher
  const hadSW = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadSW) return; try { if (sessionStorage.getItem('lc-sw-reload')) return; sessionStorage.setItem('lc-sw-reload', '1'); } catch (e) {}
    location.reload();
  });
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').then(r => {
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') r.update().catch(() => {}); }); }).catch(() => {}); });
}
