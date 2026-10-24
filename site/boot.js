// ===== Lisân Campus · démarrage : liste des matières et lecture hors connexion
const SUBJECTS = [M_INTRO, M_DC, M_DM, M_OJ, M_METHO, M_TEE, M_EN, M_INFO, M_IA, M_IAP, M_IAE, M_IAEN, M_IAT, M_IAJ, M_IAETH, M_IAPR, M_A0, M_A1, M_A2, M_A3, M_QR, M_IS1, M_IS2];
if ('serviceWorker' in navigator) window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
