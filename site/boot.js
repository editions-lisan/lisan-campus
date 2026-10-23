// ===== Lisân Campus · démarrage : liste des matières et lecture hors connexion
const SUBJECTS = [M_INTRO, M_DC, M_DM, M_OJ, M_METHO, M_TEE, M_EN, M_INFO, M_IA, M_A0, M_A1, M_A2, M_A3, M_QR];
if ('serviceWorker' in navigator) window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
