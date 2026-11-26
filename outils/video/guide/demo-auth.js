(() => { let u = null; const prof = { spaces: {}, info: null, certs: {}, avis: {} };
  window.__demo = { prof, login() { u = { uid: 'demo', displayName: 'Habiba ZABRE', email: 'habiba.zabre@exemple.ci', photoURL: '' }; } };
  window.LisanAuth = { enabled: true, likely: false, user: () => u, uid: () => u && u.uid,
    enrolled: id => !!prof.spaces[id], enrollment: id => prof.spaces[id] || null, info: () => prof.info,
    signIn() { window.__demo.login(); return Promise.resolve(); }, signOut() { u = null; return Promise.resolve(); },
    enroll(id, info, rep) { prof.info = info; prof.spaces[id] = { num: 'LC-2026-DR-4F7K2A', date: new Date().toISOString(), reponses: rep || {} }; return Promise.resolve(prof.spaces[id]); },
    saveInfo(i) { prof.info = i; return Promise.resolve(); }, unenroll() { return Promise.resolve(); }, onSave() {},
    certs: () => Object.values(prof.certs), certFor: key => Object.values(prof.certs).find(c => c.key === key) || null, suggestions: () => [], suggest: () => Promise.resolve(),
    issueCert: async c => { const o = Object.assign({}, c, { num: 'LCC-2026-7Q2M9XKD', date: new Date().toISOString() }); prof.certs[o.num] = o; return o; }, getCert: async n => prof.certs[n] || null,
    avisFor: k => prof.avis[k] || null, giveAvis(x) { prof.avis[x.cle] = Object.assign({}, x, { date: new Date().toISOString() }); window.__lastAvis = x; return Promise.resolve(); },
    adminProbe: async () => false,
    boardList: async sem => [{ uid: 'b1', nom: 'Fatou D.', sem, xp: 640, tot: 2100, serie: 12, esp: ['arabe', 'coran'] }, { uid: 'b2', nom: 'Yao K.', sem, xp: 410, tot: 1250, serie: 7, esp: ['droit'] },
      { uid: 'b3', nom: 'Aïcha B.', sem, xp: 220, tot: 900, serie: 4, esp: ['islam'] }, { uid: 'b4', nom: 'Ibrahim T.', sem, xp: 95, tot: 300, serie: 2, esp: ['droit', 'ia'] }],
    boardPut: () => Promise.resolve(), boardLeave: () => Promise.resolve(), ready: Promise.resolve() };
})();
