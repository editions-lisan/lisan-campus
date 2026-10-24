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
    likely: !!profile,                                    // connecté lors de la dernière visite (fiche gardée en mémoire)
    user: () => user,
    enrolled: id => !!(user && profile && profile.spaces && profile.spaces[id] && profile.spaces[id].num),
    enrollment: id => (user && profile && profile.spaces && profile.spaces[id] && profile.spaces[id].num) ? profile.spaces[id] : null,
    info: () => (user && profile && profile.info) || null,
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
    enroll(id, info, reponses) {                         // fiche personnelle + inscription à un espace
      if (!user) return Promise.reject(new Error('non connecté'));
      const num = numero(id), date = new Date().toISOString();
      const data = { profile: Object.assign({}, info, { updatedAt: fb.firestore.FieldValue.serverTimestamp() }),
        spaces: { [id]: { num, date: fb.firestore.FieldValue.serverTimestamp(), reponses: reponses || {}, attestation: true, conditions: true } } };
      return within(doc().set(data, { merge: true })).then(() => {
        profile = profile || { spaces: {} }; profile.spaces = profile.spaces || {};
        profile.info = Object.assign({}, info); profile.spaces[id] = { num, date, reponses: reponses || {} };
        cache.set('profile', profile); return profile.spaces[id];
      });
    },
    saveInfo(info) {
      if (!user) return Promise.reject(new Error('non connecté'));
      return within(doc().set({ profile: Object.assign({}, info, { updatedAt: fb.firestore.FieldValue.serverTimestamp() }) }, { merge: true }))
        .then(() => { profile = profile || { spaces: {} }; profile.info = Object.assign({}, info); cache.set('profile', profile); });
    },
    unenroll(id) {
      if (!user) return Promise.resolve();
      return within(doc().update({ ['spaces.' + id]: fb.firestore.FieldValue.delete() }))
        .then(() => { if (profile && profile.spaces) delete profile.spaces[id]; cache.set('profile', profile); });
    },
    async adminList() {                                  // administration : toutes les fiches (règle Firestore réservée à l'administrateur)
      if (!user) throw Object.assign(new Error('non connecté'), { code: 'unauthenticated' });
      const snap = await fb.firestore().collection('users').get({ source: 'server' });
      return snap.docs.map(d => { const x = d.data() || {}, sp = {};
        Object.entries(x.spaces || {}).forEach(([k, v]) => { if (v && typeof v === 'object' && v.num) sp[k] = { num: v.num, date: iso(v.date), reponses: v.reponses || {} }; });
        const info = x.profile ? Object.assign({}, x.profile) : null; if (info) delete info.updatedAt;
        return { uid: d.id, name: x.name || '', email: x.email || '', createdAt: iso(x.createdAt), lastLogin: iso(x.lastLogin), info, spaces: sp,
          done: Object.keys((x.progress && x.progress.done) || {}).length,
          certs: Object.values(x.certificats || {}).filter(c => c && c.num).map(c => Object.assign({}, c, { date: iso(c.date) })),
          sugg: Object.entries(x.suggestions || {}).filter(([, v]) => v && v.texte).map(([id, v]) => Object.assign({ id }, v, { date: iso(v.date) })) };
      });
    },
    uid: () => user && user.uid,
    async adminRegistry() {                              // administration : numéros présents au registre des certificats
      const snap = await fb.firestore().collection('certificats').get({ source: 'server' }); return new Set(snap.docs.map(d => d.id));
    },
    adminRevoke: num => within(fb.firestore().collection('certificats').doc(num).delete()),
    certs: () => Object.values((user && profile && profile.certs) || {}).sort((a, b) => String(b.date).localeCompare(String(a.date))),
    certFor: key => Object.values((user && profile && profile.certs) || {}).find(c => c.key === key) || null,
    async issueCert(c) {                                 // certificat : registre public (vérification) + copie dans la fiche de l'élève
      if (!user) throw Object.assign(new Error('non connecté'), { code: 'unauthenticated' });
      let h = 5381; for (const ch of user.uid + '|' + c.key) h = ((h * 33) ^ ch.charCodeAt(0)) >>> 0;
      let h2 = 52711; for (const ch of c.key + '|' + user.uid) h2 = ((h2 * 31) ^ ch.charCodeAt(0)) >>> 0;
      const num = `LCC-${new Date().getFullYear()}-${(h.toString(36) + h2.toString(36)).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8).padEnd(8, '0')}`;
      const db = fb.firestore(), ref = db.collection('certificats').doc(num);
      const old = await ref.get();
      if (old.exists) { const o = old.data(); const out = Object.assign({}, o, { date: iso(o.date) }); profile.certs = profile.certs || {}; profile.certs[num] = out; cache.set('profile', profile); return out; }
      const rec = Object.assign({}, c, { num, uid: user.uid, date: fb.firestore.FieldValue.serverTimestamp(), v: 1 });
      const batch = db.batch(); batch.set(ref, rec); batch.set(doc(), { certificats: { [num]: rec } }, { merge: true });
      await within(batch.commit(), 15000);
      const out = Object.assign({}, rec, { date: new Date().toISOString() });
      profile.certs = profile.certs || {}; profile.certs[num] = out; cache.set('profile', profile); return out;
    },
    async getCert(num) {                                 // vérification publique d'un certificat
      if (!/^LCC-\d{4}-[A-Z0-9]{8}$/.test(num)) return null;
      const snap = await fb.firestore().collection('certificats').doc(num).get({ source: 'server' });
      if (!snap.exists) return null; const o = snap.data(); return Object.assign({}, o, { date: iso(o.date) });
    },
    async certRulesOk() {                                // les règles Firestore autorisent-elles déjà les certificats ?
      try { await fb.firestore().collection('regles').doc('v4').get({ source: 'server' }); return true; }
      catch (e) { return !/permission/.test((e && (e.code || e.message)) || ''); }
    },
    sendMessage(x) {                                     // formulaire de contact : enregistré dans Firebase, lu par l'administrateur
      const rec = { nom: String(x.nom || '').slice(0, 100), email: String(x.email || '').slice(0, 150), sujet: String(x.sujet || '').slice(0, 80),
        message: String(x.message || '').slice(0, 4000), date: fb.firestore.FieldValue.serverTimestamp() };
      if (user) rec.uid = user.uid;
      return within(fb.firestore().collection('messages').add(rec), 15000);
    },
    async adminMessages() {                              // administration : messages du formulaire de contact
      const snap = await fb.firestore().collection('messages').get({ source: 'server' });
      return snap.docs.map(d => Object.assign({ id: d.id }, d.data(), { date: iso(d.data().date) })).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    },
    adminDeleteMessage: id => within(fb.firestore().collection('messages').doc(id).delete()),
    suggestions: () => Object.values((user && profile && profile.sugg) || {}).sort((a, b) => String(b.date).localeCompare(String(a.date))),
    suggest(x) {                                         // suggestion : enregistrée dans la fiche de l'élève, lue par l'administrateur
      if (!user) return Promise.reject(new Error('non connecté'));
      const id = 's' + Date.now().toString(36);
      const rec = { type: String(x.type || '').slice(0, 80), texte: String(x.texte || '').slice(0, 2000), contexte: String(x.contexte || '').slice(0, 200), date: fb.firestore.FieldValue.serverTimestamp() };
      return within(doc().set({ suggestions: { [id]: rec } }, { merge: true })).then(() => {
        profile = profile || { spaces: {} }; profile.sugg = profile.sugg || {}; profile.sugg[id] = Object.assign({}, rec, { date: new Date().toISOString() }); cache.set('profile', profile); });
    },
    async deleteAccount() {                              // efface la fiche, les inscriptions et la progression, puis le compte
      if (!user) return;
      for (const num of Object.keys((profile && profile.certs) || {})) { try { await within(fb.firestore().collection('certificats').doc(num).delete()); } catch (e) {} }
      await within(doc().delete());
      try { await user.delete(); }
      catch (e) {
        if (e && /requires-recent-login/.test(e.code || '')) { const p = new fb.auth.GoogleAuthProvider(); await user.reauthenticateWithPopup(p); await user.delete(); }
        else throw e;
      }
      profile = null; cache.set('profile', null);
      ['done', 'quiz', 'known', 'words', 'time'].forEach(k => { state[k] = {}; store.set(k, {}); }); state.last = null; store.set('last', null);
    },
    onSave(k, v) {                                       // progression : envoyée au compte (regroupée toutes les 3 s)
      if (!user || !['done', 'quiz', 'known', 'words', 'time'].includes(k)) return;
      clearTimeout(timer);
      timer = setTimeout(() => { doc().set({ progress: { done: state.done, quiz: state.quiz, known: state.known, words: state.words, time: state.time } }, { merge: true }).catch(() => {}); }, 3000);
    },
  };
  const doc = () => fb.firestore().collection('users').doc(user.uid);
  // une écriture sans réponse du serveur au bout de 10 s (hors connexion) reste en file d'attente : on continue
  const within = (p, ms = 10000) => Promise.race([p, new Promise(r => setTimeout(r, ms))]);
  function numero(id) {                                  // numéro d'inscription stable : LC-2026-QR-4F7K2A
    const code = { droit: 'DR', ia: 'IA', arabe: 'AR', coran: 'QR' }[id] || 'XX';
    let h = 5381; for (const c of user.uid + id) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0;
    return `LC-${new Date().getFullYear()}-${code}-${h.toString(36).toUpperCase().padStart(6, '0').slice(-6)}`;
  }
  const iso = v => v && v.toDate ? v.toDate().toISOString() : (typeof v === 'string' ? v : null);
  function alertMsg(t) { const n = document.getElementById('ios-help'); if (n) { n.querySelector('.notice').textContent = t; n.hidden = false; setTimeout(() => { n.hidden = true; }, 6000); } }
  function mergeProgress(remote) {
    if (!remote) return;
    ['done', 'known', 'words'].forEach(k => { state[k] = Object.assign({}, remote[k] || {}, state[k] || {}); store.set(k, state[k]); });
    const tm = Object.assign({}, remote.time || {});
    Object.entries(state.time || {}).forEach(([k, v]) => { if (tm[k] === undefined || v > tm[k]) tm[k] = v; });
    state.time = tm; store.set('time', tm);
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
            const sp = {};
            Object.entries(d.spaces || {}).forEach(([k, v]) => { if (v && typeof v === 'object' && v.num) sp[k] = { num: v.num, date: iso(v.date) || new Date().toISOString(), reponses: v.reponses || {} }; });
            const info = d.profile ? Object.assign({}, d.profile) : null; if (info) delete info.updatedAt;
            const certs = {}; Object.entries(d.certificats || {}).forEach(([k, v]) => { if (v && v.num) certs[k] = Object.assign({}, v, { date: iso(v.date) || new Date().toISOString() }); });
            const sugg = {}; Object.entries(d.suggestions || {}).forEach(([k, v]) => { if (v && v.texte) sugg[k] = Object.assign({}, v, { date: iso(v.date) || new Date().toISOString() }); });
            profile = { spaces: sp, info, certs, sugg };
            cache.set('profile', profile);
            mergeProgress(d.progress);
            await doc().set({ name: u.displayName || '', email: u.email || '', photo: u.photoURL || '', lastLogin: fb.firestore.FieldValue.serverTimestamp(),
              ...(snap.exists ? {} : { createdAt: fb.firestore.FieldValue.serverTimestamp() }),
              progress: { done: state.done, quiz: state.quiz, known: state.known, words: state.words, time: state.time } }, { merge: true });
          } catch (e) { /* hors connexion : on garde les inscriptions en cache */ }
        } else { profile = null; cache.set('profile', null); }
        if (first) { first = false; res(); } else if (typeof route === 'function') route();
      });
    });
  })().catch(() => { LisanAuth.enabled = false; });
})();
