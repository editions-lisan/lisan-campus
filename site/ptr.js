// ===== Lisân Campus · retour après « tirer pour actualiser » ou rechargement : pas d'écran d'ouverture
(function () {
  var R = document.documentElement, q = false;
  function off() { var v = document.getElementById('veil'); if (v) v.remove(); R.classList.add('quick'); }
  try { if (Date.now() - (+sessionStorage.getItem('lc-ptr') || 0) < 20000) { R.classList.add('ptr-back'); q = true; } } catch (e) {}
  try { var n = performance.getEntriesByType('navigation')[0]; if (n && n.type === 'reload') q = true; } catch (e) {}
  try { var P = JSON.parse(localStorage.getItem('lc.place') || 'null'); if (P && Date.now() - (P.t || 0) < 30 * 60 * 1000) q = true; } catch (e) {}
  if (q) off();
})();
