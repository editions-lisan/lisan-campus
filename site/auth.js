// ===== Lisân Campus · connexion avec Google et inscription par espace (Firebase)
// S'active seulement si config.js définit window.LISAN_FIREBASE (réglages du projet Firebase).
(function () {
  const CFG = window.LISAN_FIREBASE;
  if (!CFG || !CFG.apiKey) return;                       // pas de configuration : le site reste en accès libre
  const V = '10.12.2', BASE = `https://www.gstatic.com/firebasejs/${V}/`;
  const load = src => new Promise((ok, ko) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); });
  const cache = { get(k, d) { try { const v = localStorage.getItem('lc.auth.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
                  set(k, v) { try { localStorage.setItem('lc.auth.' + k, JSON.stringify(v)); } catch (e) {} } };
  let fb = null, user = null, profile = cache.get('profile', null), timer = null;
  const LisanAuth = {
    enabled: true,
    user: () => user,
    enrolled: id => !!(user && profile && profile.spaces && profile.spaces[id]),
    signIn() {
      if (!fb) return Promise.reject(new Error('Connexion indisponible'));
      const p = new fb.auth.GoogleAuthProvider(); p.setCustomParameters({ prompt: 'select_account' });
      return fb.auth().signInWithPopup(p).catch(e => {
        if (e && /popup-blocked|operation-not-supported/.test(e.code || '')) return fb.auth().signInWithRedirect(p);
        if (e && /popup-closed|cancelled-popup/.test(e.code || '')) throw e;
        alertMsg('La connexion n’a pas abouti. Vérifiez votre connexion internet et réessayez.'); throw e;
      });
    },
    signOut() { return fb ? fb.auth().signOut() : Promise.resolve(); },
    enroll(id) {
      if (!user) return LisanAuth.signIn();
      profile = profile || { spaces: {} }; profile.spaces = profile.spaces || {};
      profile.spaces[id] = new Date().toISOString(); cache.set('profile', profile);
      return doc().set({ spaces: { [id]: fb.firestore.FieldValue.serverTimestamp() } }, { merge: true }).catch(() => {});
    },
    onSave(k, v) {                                       // progression : envoyée au compte (regroupée toutes les 3 s)
      if (!user || !['done', 'quiz', 'known', 'words'].includes(k)) return;
      clearTimeout(timer);
      timer = setTimeout(() => { doc().set({ progress: { done: state.done, quiz: state.quiz, known: state.known, words: state.words } }, { merge: true }).catch(() => {}); }, 3000);
    },
  };
  const doc = () => fb.firestore().collection('users').doc(user.uid);
  function alertMsg(t) { const n = document.getElementById('ios-help'); if (n) { n.querySelector('.notice').textContent = t; n.hidden = false; setTimeout(() => { n.hidden = true; }, 6000); } }
  function mergeProgress(remote) {
    if (!remote) return;
    ['done', 'known', 'words'].forEach(k => { state[k] = Object.assign({}, remote[k] || {}, state[k] || {}); store.set(k, state[k]); });
    const q = Object.assign({}, remote.quiz || {});
    Object.entries(state.quiz || {}).forEach(([k, v]) => { if (q[k] === undefined || v > q[k]) q[k] = v; });
    state.quiz = q; store.set('quiz', q);
  }
  window.LisanAuth = LisanAuth;
  LisanAuth.ready = (async () => {
    await load(BASE + 'firebase-app-compat.js');
    await load(BASE + 'firebase-auth-compat.js');
    await load(BASE + 'firebase-firestore-compat.js');
    fb = window.firebase; fb.initializeApp(CFG);
    try { fb.firestore().enablePersistence({ synchronizeTabs: true }).catch(() => {}); } catch (e) {}
    await fb.auth().setPersistence(fb.auth.Auth.Persistence.LOCAL).catch(() => {});
    await new Promise(res => {
      let first = true;
      fb.auth().onAuthStateChanged(async u => {
        user = u;
        if (u) {
          try {
            const snap = await doc().get();
            const d = snap.exists ? snap.data() : {};
            profile = { spaces: Object.fromEntries(Object.entries(d.spaces || {}).map(([k, v]) => [k, v && v.toDate ? v.toDate().toISOString() : String(v)])) };
            cache.set('profile', profile);
            mergeProgress(d.progress);
            await doc().set({ name: u.displayName || '', email: u.email || '', photo: u.photoURL || '', lastLogin: fb.firestore.FieldValue.serverTimestamp(),
              ...(snap.exists ? {} : { createdAt: fb.firestore.FieldValue.serverTimestamp() }),
              progress: { done: state.done, quiz: state.quiz, known: state.known, words: state.words } }, { merge: true });
          } catch (e) { /* hors connexion : on garde les inscriptions en cache */ }
        } else { profile = null; cache.set('profile', null); }
        if (first) { first = false; res(); } else if (typeof route === 'function') route();
      });
    });
  })().catch(() => { LisanAuth.enabled = false; });
})();
