// ===== Lisân Campus · application (Éditions Lisân)
// ---------- stockage local (confort de chaque appareil)
const store = {
  get(k, d) { try { const v = localStorage.getItem('lc.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('lc.' + k, JSON.stringify(v)); } catch (e) {} },
};
const state = {
  done: store.get('done', {}), quiz: store.get('quiz', {}), known: store.get('known', {}),
  words: store.get('words', {}), time: store.get('time', {}), rate: store.get('rate', 1), last: store.get('last', null),
  theme: store.get('theme', 'auto'), size: store.get('size', 'm'),
};
const save = k => { store.set(k, state[k]); if (window.LisanAuth && window.LisanAuth.onSave) window.LisanAuth.onSave(k, state[k]); };

// ---------- temps minimum d'étude : une leçon ne se marque « terminée » qu'après un temps égal à la durée
// de son écoute (« Écouter la leçon », vitesse normale), au moins 40 secondes. Le temps n'avance que lorsque
// la page de la leçon est ouverte et visible, et que l'élève lit (activité récente) ou écoute ; il s'arrête
// dès qu'on quitte la page et reprend au retour.
// texte lu à voix haute : le français, et l'arabe entre [[...]] (lu par la voix arabe, ou formule transcrite)
const lessonSpeech = l => [l.title, ...l.body.map(b => b.p || b.h || (b.ul || b.ol || []).join('. ') || b.box || b.quote || '')].filter(Boolean).map(x => String(x).replace(/\*\*|\*/g, '').replace(/\[([^\]]+)\]\(#[^)]*\)/g, '$1')).join('. ');
const lessonText = l => lessonSpeech(l).replace(/\[\[.+?\]\]/g, '');
// durée de l'écoute à vitesse normale : 0,36 s par mot français, 0,7 s par mot arabe, 0,25 s de pause par phrase
function audioSeconds(text) {
  const t = String(text), ar = (t.match(/\[\[(.+?)\]\]/g) || []).map(x => x.slice(2, -2)).filter(x => x.split(/\s+/).length <= 8);
  const fr = t.replace(/\[\[.+?\]\]/g, ' ').split(/\s+/).filter(w => /\p{L}/u.test(w)).length;
  const arw = ar.reduce((n, x) => n + x.split(/\s+/).length, 0), pauses = (t.match(/[.!?;:]/g) || []).length;
  return fr * 0.36 + arw * 0.7 + pauses * 0.25;
}
const needFor = l => Math.max(40, Math.min(1800, Math.round(audioSeconds(lessonSpeech(l)))));
const fmtLeft = n => n >= 60 ? `${Math.floor(n / 60)} min ${String(n % 60).padStart(2, '0')} s` : `${n} s`;
function doneBtnState(b) {
  const key = b.dataset.done, need = +b.dataset.need || 0, t = state.time[key] || 0, d = !!state.done[key], left = Math.max(0, need - t);
  b.setAttribute('aria-pressed', d); b.classList.toggle('wait', !d && left > 0); b.style.setProperty('--t', (need ? Math.min(100, Math.round(t / need * 100)) : 100) + '%');
  b.innerHTML = d ? '✓ Leçon terminée' : left > 0 ? `Marquer comme terminée <small>· encore ${fmtLeft(left)} d’étude</small>` : 'Marquer comme terminée';
}
let lessonClock = null, lastAct = Date.now();
['scroll', 'pointerdown', 'keydown', 'touchstart', 'wheel', 'mousemove'].forEach(ev => window.addEventListener(ev, () => { lastAct = Date.now(); }, { passive: true }));
function startLessonClock() {
  clearInterval(lessonClock);
  const b0 = document.querySelector('[data-done]'); if (!b0) return;
  const key = b0.dataset.done, need = +b0.dataset.need || 0; let n = 0;
  lessonClock = setInterval(() => {
    const b = document.querySelector('[data-done]');
    if (!b || b.dataset.done !== key) { clearInterval(lessonClock); return; }
    const listening = (window.speechSynthesis && speechSynthesis.speaking) || !player.paused;
    // seulement sur la page de la leçon, visible et au premier plan (pas une autre fenêtre), en lisant ou en écoutant
    if (document.visibilityState !== 'visible' || (!listening && (!document.hasFocus() || Date.now() - lastAct > 90000))) return;
    if ((state.time[key] || 0) >= need) return;
    state.time[key] = (state.time[key] || 0) + 1; n++;
    if (n % 10 === 0 || state.time[key] >= need) save('time');
    doneBtnState(b);
  }, 1000);
}

// ---------- outils de texte
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const md = s => esc(s).replace(/\[\[(.+?)\]\]/g, '<span class="ara" lang="ar" dir="rtl">$1</span>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
const plain = s => String(s).replace(/\[\[.+?\]\]/g, '').replace(/\*\*|\*/g, '');
const arOnly = s => String(s).replace(/\[\[|\]\]/g, '');
const ICON = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1l7 4-7 4z"/></svg>';
const subj = id => SUBJECTS.find(s => s.id === id);
const spaceOf = s => s.space || 'droit';
const cardLang = s => s.lang === 'ar' ? 'ar' : (s.id === 'en' ? 'en' : 'fr');

// ---------- les espaces
const SPACES = [
  { id: 'droit', title: 'Droit · Licence 1', eyebrow: 'Première année de droit', icon: '⚖️', color: 'a',
    lead: 'Les matières de la Licence 1 Droit, enrichies au fil des cours : leçons, quiz et cartes de révision.',
    intro: ['Huit matières de la première année de droit, rédigées à partir des cours et des textes officiels : introduction au droit, droit civil, droit musulman, organisation judiciaire, méthodologie, expression écrite, anglais et informatique.',
      'Chaque leçon s’écoute à voix haute. Le quiz et les cartes de révision de chaque matière servent à vérifier ce que vous avez retenu. Vérifiez toujours avec le cours de vos enseignants.'] },
  { id: 'ia', title: 'Formation à l’IA avec Claude', eyebrow: 'Ouvert à tous', icon: '🤖', color: 'i',
    lead: 'Comprendre l’intelligence artificielle et maîtriser Claude dans toutes les disciplines : étudier, enseigner, travailler, le droit, en toute sécurité.',
    intro: ['Huit parcours pour tous les profils : comprendre l’IA, bien formuler ses demandes, étudier (sciences, lettres, sciences humaines, sciences islamiques), enseigner et former, travailler (bureau, commerce, projets), l’IA juridique, l’éthique et la sécurité, et des projets pratiques.',
      'Chaque parcours a son quiz, ses cartes de révision et son certificat. Les consignes de la bibliothèque se copient d’un geste pour être collées dans Claude.'] },
  { id: 'arabe', title: 'Apprendre l’arabe', eyebrow: 'Collections « Je lis l’arabe ! » et « Je parle arabe ! »', icon: '💬', color: 'k',
    lead: 'Les compagnons des livres, du niveau 0 au niveau 3 : écouter les lettres, les mots et les dialogues, s’exercer et réviser.',
    intro: ['Ces quatre espaces accompagnent les livres des Éditions Lisân. Vous y écoutez les lettres, les syllabes, le vocabulaire et les dialogues de chaque leçon, vous vous entraînez avec les quiz et révisez avec les cartes.',
      'Le cours complet, les règles, les exercices écrits et leurs corrigés sont dans les livres : chaque leçon indique les pages correspondantes du livre et du cahier d’exercices.',
      'La voix arabe est celle de votre téléphone : vérifiez dans les **Paramètres** qu’elle est bien installée.'] },
  { id: 'islam', title: 'Vivre l’islam en famille', eyebrow: 'Collection « Vivre l’islam en famille »', icon: '🕌', color: 'b',
    lead: 'L’enseignement islamique pour toute la famille, rite mâlikite : les récits de Mamie Kadi, les leçons, les versets et les hadiths, niveaux 1 et 2.',
    intro: ['Le compagnon des livres « Vivre l’islam en famille » : **niveau 1, l’Islâm** (je pratique ma religion) et **niveau 2, l’Îmân** (je crois et je comprends). Chaque séance part d’une histoire racontée par Mamie Kadi à la famille Traoré, conduit à une leçon et se termine par une pratique.',
      'Les versets et les hadiths sont donnés en arabe vocalisé, avec leur traduction et leur référence. Les exercices écrits, les carnets et les ateliers sont dans le **cahier d’activités** ; le déroulement des séances et les précisions de fiqh mâlikite, dans le **livret de l’animateur**.',
      'La religion se transmet auprès de maîtres qualifiés : ce compagnon accompagne les séances en famille, à la mosquée ou à l’école, il ne les remplace pas.'] },
  { id: 'coran', title: 'Lire le Coran pas à pas', eyebrow: 'Collection « Lire le Coran pas à pas »', icon: '📖', color: 'n',
    lead: 'Le compagnon du livre : 43 leçons, des lignes de lecture et la récitation lente d’al-Ḥouṣarî pour vérifier.',
    intro: ['Ce compagnon suit les dix étapes et les 43 leçons du livre : objectifs, lettres et signes étudiés, lignes de lecture, mots du Coran et sourates courtes.',
      'Les récitations sont celles du cheikh **Maḥmoûd Khalîl al-Ḥouṣarî**, en lecture lente d’enseignement (Ḥafṣ ‘an ‘Âṣim). Aucune voix de synthèse n’est utilisée pour le Coran.',
      'La lecture du Coran s’apprend auprès d’un maître : ce compagnon sert à réviser entre deux séances.'] },
];
const space = id => SPACES.find(x => x.id === id);

// ---------- voix (synthèse du téléphone) : français, anglais, arabe
const synth = window.speechSynthesis || null;
let voices = { fr: null, en: null, ar: null }, playingBtn = null, voicesLoaded = false;
function pickVoices() {
  if (!synth) return;
  const vs = synth.getVoices();
  if (vs.length) voicesLoaded = true;
  voices.en = vs.find(v => v.lang === 'en-US' && /Google|Samantha|Aaron|Ava|Allison/i.test(v.name)) || vs.find(v => /^en[-_]US/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
  voices.fr = vs.find(v => /^fr[-_]FR/i.test(v.lang) && /Google|Thomas|Amélie|Audrey/i.test(v.name)) || vs.find(v => /^fr/i.test(v.lang)) || null;
  voices.ar = vs.find(v => /^ar[-_]SA/i.test(v.lang) && /Google/i.test(v.name)) || vs.find(v => /^ar/i.test(v.lang)) || null;
}
if (synth) { pickVoices(); synth.onvoiceschanged = () => { pickVoices(); checkArVoice(); }; }
function stopVoice() { if (synth) synth.cancel(); if (playingBtn) { playingBtn.classList.remove('playing'); playingBtn = null; } stopAudio(); }
// ---------- prononciation : mots arabes transcrits et formules islamiques
// Les transcriptions (Mouḥammad, Moûsâ, rak‘a, Ismâ‘îl…) sont réécrites pour la voix française ; l'arabe entre
// [[...]] est lu par la voix arabe de l'appareil, ou, à défaut, les formules connues sont dites en transcription.
const ARV = /[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g;                  // voyelles, signes coraniques, tatwîl
const arKey = t => String(t).replace(ARV, '').replace(/[ٱأإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/[.,؛،!؟?:«»"()]/g, '').replace(/\s+/g, ' ').trim();
const LIG = { 'ﷺ': 'صَلَّى ٱللَّهُ عَلَيْهِ وَسَلَّمَ', 'ﷻ': 'جَلَّ جَلَالُهُ', '﷽': 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', 'ﷲ': 'ٱللَّه' };
const arSpeak = t => String(t).replace(/[ﷺﷻ﷽ﷲ]/g, c => ' ' + LIG[c] + ' ').replace(/ٱ/g, 'ا').replace(/\u0640/g, '');
const FORMULES = {
  'صلى الله عليه وسلم': 'ṣalla Llâhou ‘alayhi wa sallam', 'جل جلاله': 'jalla jalâlouh',
  'بسم الله': 'bismi Llâh', 'بسم الله الرحمن الرحيم': 'bismi Llâhi r-raḥmâni r-raḥîm',
  'الحمد لله': 'al-ḥamdou li-Llâh', 'الحمد لله رب العالمين': 'al-ḥamdou li-Llâhi rabbi l-‘âlamîn',
  'سبحان الله': 'soubḥâna Llâh', 'الله اكبر': 'Allâhou akbar', 'لا اله الا الله': 'lâ ilâha illa Llâh',
  'محمد رسول الله': 'Mouḥammadoun rasoûlou Llâh', 'ان شاء الله': 'in châ’a Llâh', 'ما شاء الله': 'mâ châ’a Llâh',
  'استغفر الله': 'astaghfirou Llâh', 'السلام عليكم': 'as-salâmou ‘alaykoum', 'وعليكم السلام': 'wa ‘alaykoumou s-salâm',
  'السلام عليكم ورحمة الله وبركاته': 'as-salâmou ‘alaykoum wa raḥmatou Llâhi wa barakâtouh',
  'جزاك الله خيرا': 'jazâka Llâhou khayran', 'بارك الله فيك': 'bâraka Llâhou fîk', 'عليه السلام': '‘alayhi s-salâm',
  'عليها السلام': '‘alayhâ s-salâm', 'رضي الله عنه': 'raḍiya Llâhou ‘anhou', 'رضي الله عنها': 'raḍiya Llâhou ‘anhâ',
  'رضي الله عنهم': 'raḍiya Llâhou ‘anhoum', 'رحمه الله': 'raḥimahou Llâh', 'سبحانه وتعالى': 'soubḥânahou wa ta‘âlâ',
  'تبارك وتعالى': 'tabâraka wa ta‘âlâ', 'عز وجل': '‘azza wa jall', 'لا حول ولا قوة الا بالله': 'lâ ḥawla wa lâ qouwwata illâ bi-Llâh',
  'اعوذ بالله من الشيطان الرجيم': 'a‘oûdhou bi-Llâhi mina ch-chayṭâni r-rajîm', 'انا لله وانا اليه راجعون': 'innâ li-Llâhi wa innâ ilayhi râji‘oûn',
  'حسبنا الله ونعم الوكيل': 'ḥasbouna Llâhou wa ni‘ma l-wakîl', 'امين': 'âmîn', 'الله': 'Allâh',
};
const FORM_KEYS = Object.fromEntries(Object.entries(FORMULES).map(([k, v]) => [arKey(k), v]));
const ELIS = /^(?:jusqu|lorsqu|puisqu|quoiqu|quelqu|qu|[dlcjmnst])[’']/i;
const TRANSCR = /[âîûÂÎÛḥṣḍṭẓḤṢḌṬẒ‘ʿʾ]/;
function pronWord(w) {
  const m = w.match(ELIS), pre = m ? m[0] : '', x0 = w.slice(pre.length);
  if (!TRANSCR.test(x0)) return w;
  // mot français à accent circonflexe (maîtrise, coûteuse…) : inchangé
  if (!/[ḥṣḍṭẓḤṢḌṬẒ‘’ʿʾ]/.test(x0) && /(?:e|es|ent|er)$/.test(x0)) return w;
  let x = x0.replace(/dh/g, 'z').replace(/Dh/g, 'Z');                                 // dhikr → zikr (avant ḍ + ḥ)
  x = x.replace(/[ḥḤṣṢḍḌṭṬẓẒ]/g, c => ({ 'ḥ': 'h', 'Ḥ': 'H', 'ṣ': 's', 'Ṣ': 'S', 'ḍ': 'd', 'Ḍ': 'D', 'ṭ': 't', 'Ṭ': 'T', 'ẓ': 'z', 'Ẓ': 'Z' })[c]);
  x = x.replace(/([aeiouâîûAEIOUÂÎÛ])[‘’ʿʾ]([iîIÎ])/g, '$1ï')        // Ismâ‘îl → Ismâïl, Isrâ’îl → Isrâïl
       .replace(/[‘’ʿʾ]/g, '')                                         // ‘ayn et hamza : une simple attaque
       .replace(/ay(?=[^aeiouâîûy]|$)/g, 'aï').replace(/Ay(?=[^aeiouâîûy]|$)/g, 'Aï')   // Soulaymân → Soulaïmân
       .replace(/([aeiouâîûAEIOUÂÎÛ])s(?=[aeiouâîûAEIOUÂÎÛ])/g, '$1ss');           // Moûsâ → Moûssâ
  return pre + x;
}
// article assimilé collé au mot précédent, comme on le prononce : « rabbi l-‘âlamîn » → « rabbil ‘âlamîn »,
// « bismi Llâhi r-raḥmâni » → « bismi Llâhir raḥmâni »
const pronFr = t => String(t).replace(/\s+·\s+/g, ', ').replace(/(\p{L})\s+([a-z]{1,2})-(?=\p{L})/gu, '$1$2 ').replace(/[^\s()«»"“”,.;:!?]+/g, pronWord);
// découpe en morceaux : [{ lang, text }] ; l'arabe entre [[...]] devient un morceau arabe (ou une formule transcrite)
function speechParts(text, lang) {
  if (lang !== 'fr') return [{ lang, text: lang === 'ar' ? arSpeak(text) : text }];
  const out = []; let last = 0; const t = String(text);
  for (const m of t.matchAll(/\[\[(.+?)\]\]/g)) {
    if (m.index > last) out.push({ lang: 'fr', text: pronFr(t.slice(last, m.index)) });
    const a = m[1], f = FORM_KEYS[arKey(a.replace(/[ﷺﷻ﷽ﷲ]/g, c => LIG[c]))];
    if (voices.ar && a.split(/\s+/).length <= 8) out.push({ lang: 'ar', text: arSpeak(a) });
    else if (f) out.push({ lang: 'fr', text: pronFr(f) });
    last = m.index + m[0].length;
  }
  if (last < t.length) out.push({ lang: 'fr', text: pronFr(t.slice(last)) });
  return out.filter(p => /[\p{L}\p{N}]/u.test(p.text));
}
function speak(text, lang, btn) {
  if (!synth) { showNoVoice(); return; }
  if (btn && btn === playingBtn) { stopVoice(); return; }
  stopVoice();
  const slow = state.rate !== 1, loc = { en: 'en-US', ar: 'ar-SA', fr: 'fr-FR' };
  const utts = [];
  speechParts(text, lang).forEach(p => (p.text.match(/(?:[^.!?;:؟،]|\.(?=\d))+[.!?;:؟،]*/g) || [p.text]).forEach(c => {
    if (!/[\p{L}\p{N}]/u.test(c)) return;
    const u = new SpeechSynthesisUtterance(c.trim()), v = voices[p.lang] || null;
    u.lang = loc[p.lang] || 'fr-FR'; if (v) u.voice = v;
    u.rate = p.lang === 'ar' ? (slow ? 0.55 : 0.8) : (slow ? 0.65 : (p.lang === 'en' ? 0.95 : 1));
    utts.push(u);
  }));
  if (!utts.length) return;
  if (btn) { btn.classList.add('playing'); playingBtn = btn; }
  utts[utts.length - 1].onend = () => { if (btn && playingBtn === btn) { btn.classList.remove('playing'); playingBtn = null; } };
  utts.forEach(u => { u.onerror = () => { if (btn) btn.classList.remove('playing'); }; synth.speak(u); });
}
function showNoVoice() { const n = document.getElementById('novoice'); if (n) n.hidden = false; }
function checkArVoice() { const n = document.getElementById('noar'); if (n && synth && voicesLoaded) n.hidden = !!voices.ar; }

// ---------- récitations (fichiers audio)
const player = new Audio();
let audioBtn = null, playlist = [];
player.preload = 'none';
function stopAudio() { try { player.pause(); } catch (e) {} if (audioBtn) audioBtn.classList.remove('playing'); audioBtn = null; playlist = []; }
function playAudio(urls, btn) {
  if (btn && btn === audioBtn) { stopAudio(); if (synth) synth.cancel(); return; }
  if (synth) synth.cancel(); if (playingBtn) { playingBtn.classList.remove('playing'); playingBtn = null; }
  stopAudio();
  playlist = urls.slice(); audioBtn = btn || null; if (audioBtn) audioBtn.classList.add('playing');
  const next = () => { if (!playlist.length) { stopAudio(); return; } player.src = playlist.shift(); player.play().catch(() => { audioError(); }); };
  player.onended = next; player.onerror = audioError; next();
}
function audioError() { stopAudio(); const n = document.getElementById('noaudio'); if (n) n.hidden = false; }

// ---------- calculs de progression
function subjectProgress(s) {
  const n = s.lessons.length, d = s.lessons.filter(l => state.done[s.id + '/' + l.id]).length;
  return { n, d, pct: n ? Math.round(d / n * 100) : 0 };
}
function spaceProgress(sp) {
  const ss = SUBJECTS.filter(s => spaceOf(s) === sp.id);
  const n = ss.reduce((a, s) => a + s.lessons.length, 0), d = ss.reduce((a, s) => a + subjectProgress(s).d, 0);
  return { n, d, pct: n ? Math.round(d / n * 100) : 0, count: ss.length };
}

// ---------- accès : aperçu libre, puis connexion et inscription par espace (si la connexion est configurée)
const AUTH = () => window.LisanAuth && window.LisanAuth.enabled ? window.LisanAuth : null;
// Parcours en ordre : une leçon ne s'ouvre que si toutes les précédentes sont terminées
// (une leçon déjà terminée reste toujours accessible, pour la relire) ; le quiz, après la dernière leçon.
const firstUndone = s => s.lessons.findIndex(l => !state.done[s.id + '/' + l.id]);
function inOrder(s, i) {
  if (i === 'quiz') return firstUndone(s) === -1;
  if (state.done[s.id + '/' + s.lessons[i].id]) return true;
  const f = firstUndone(s); return f === -1 || i <= f;
}
// Espaces en ordre : un parcours ne s'ouvre qu'une fois le précédent du même espace réussi
// (toutes ses leçons terminées et son quiz réussi, au moins 70 %).
const PASS = () => (typeof CERT_QUIZ !== 'undefined' ? CERT_QUIZ : 70);
const spaceSubjects = s => SUBJECTS.filter(x => spaceOf(x) === spaceOf(s));
const subjectPassed = s => firstUndone(s) === -1 && (state.quiz[s.id] || 0) >= PASS();
function prevSubject(s) { const ss = spaceSubjects(s), k = ss.indexOf(s); return k > 0 ? ss[k - 1] : null; }
function blockingSubject(s) { const ss = spaceSubjects(s); for (const x of ss) { if (x === s) return null; if (!subjectPassed(x)) return x; } return null; }
const subjectOpen = s => !blockingSubject(s);
// prochaine étape d'un espace : première leçon non terminée du premier parcours non réussi, sinon son quiz
function nextStep(spId) {
  const x = SUBJECTS.filter(s => spaceOf(s) === spId).find(s => !subjectPassed(s)); if (!x) return null;
  const f = firstUndone(x);
  return f === -1 ? { s: x, href: '#q-' + x.id, label: `Quiz : ${x.title}` } : { s: x, href: `#l-${x.id}.${x.lessons[f].id}`, label: `${x.title} — ${/^\d/.test(x.lessons[f].title) ? '' : `leçon ${f + 1} : `}${x.lessons[f].title}` };
}
function access(s, lessonIndex) {
  const A = AUTH();
  if (!subjectOpen(s)) return 'prev';
  if (lessonIndex === 0) return 'ok';
  if (A && !A.user()) return 'login';
  if (A && !A.enrolled(spaceOf(s))) return 'enroll';
  return inOrder(s, lessonIndex) ? 'ok' : 'order';
}

// ---------- blocs de contenu
function renderBlock(b, s) {
  if (b.p) return `<p>${md(b.p)}</p>`;
  if (b.h) return `<h3>${md(b.h)}</h3>`;
  if (b.ul) return `<ul>${b.ul.map(x => `<li>${md(x)}</li>`).join('')}</ul>`;
  if (b.ol) return `<ol>${b.ol.map(x => `<li>${md(x)}</li>`).join('')}</ol>`;
  if (b.table) return `<div class="tablewrap"><table><thead><tr>${b.table.h.map(x => `<th>${md(x)}</th>`).join('')}</tr></thead><tbody>${b.table.r.map(r => `<tr>${r.map(x => `<td>${md(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if (b.box) return `<div class="box ${b.kind || 'marge'}"><b class="k">${esc(b.title || 'En marge')}</b><div>${md(b.box)}</div></div>`;
  if (b.quote) return `<div class="quote">${md(b.quote)}</div>`;
  if (b.prompt) return `<div class="pbox"><div class="pb-h"><b>${esc(b.label || 'Consigne à copier')}</b><button type="button" class="btn ghost small" data-copy="1">Copier</button></div><pre class="pb-t">${esc(b.prompt)}</pre></div>`;
  if (b.ayah) return `<figure class="ayah"><p class="ara" lang="ar" dir="rtl">${esc(b.ayah)}</p><figcaption><i>${md(b.fr)}</i><small>${md(b.ref)}</small></figcaption></figure>`;
  if (b.verse) return `<div class="verse"><header><div><h3>${esc(b.title)}</h3><small>${esc(b.src)}</small></div>
      <button type="button" class="btn small" data-say="${esc(b.verse.join(' '))}" data-lang="fr">${ICON}Écouter la fable</button></header>
      <div class="lines">${b.verse.map(l => `<div>${esc(l)}</div>`).join('')}</div></div>`;
  if (b.schema === 'oj') {
    const col = (h, top, rest, cls) => `<div class="scol"><div class="h">${h}</div><div class="n ${cls || 'top'}">${top}</div>${rest.map(([ar, n]) => `<div class="ar">${ar}</div><div class="n">${n}</div>`).join('')}</div>`;
    return `<div class="schema">${col('Ordre judiciaire', 'Cour de cassation', [['▲ pourvoi', "Cours d'appel"], ['▲ appel', 'Tribunaux de première instance et de commerce']])}${col('Ordre administratif', "Conseil d'État", [['▲ recours', 'Tribunaux administratifs']])}${col('Juridictions financières', 'Cour des comptes', [['▲ recours', 'Chambres régionales des comptes']])}${col('À part', 'Conseil constitutionnel', [], 'cc')}</div>`;
  }
  if (b.rules) return `<div class="tablewrap"><table><thead><tr><th>Règle</th><th>Explication</th><th>Exemples</th></tr></thead><tbody>${RULES.map(([r, e, ex]) =>
      `<tr><td><b>${esc(r)}</b></td><td>${esc(e)}</td><td>${ex.map(w => `<button type="button" class="say" data-say="${esc(w)}" data-lang="en">${esc(w)}</button>`).join(', ')}</td></tr>`).join('')}</tbody></table></div>`;
  if (b.words) {
    const list = WORDS[b.words] || [];
    return `<h3>${esc(WORD_TITLES[b.words])}</h3><p class="meta" data-wcount="${b.words}"></p><div class="words">${list.map(w => {
      const id = b.words + ':' + w.word, m = !!state.words[id];
      return `<div class="word${m ? ' mastered' : ''}" data-wid="${esc(id)}">
        <div class="w"><b>${esc(w.word)}</b><span class="ipa">${esc(w.ipa)}</span></div>
        <div class="fig">${esc(w.fig)}</div><div>${esc(w.sens)}</div><div class="tip">${esc(w.tip)}</div>
        <div class="row"><button type="button" class="btn small" data-say="${esc(w.word.replace(/^to /, 'to '))}" data-lang="en">${ICON}Écouter</button>
        <a class="ext" href="${esc(w.url)}" target="_blank" rel="noopener">Cambridge ↗</a>
        <button type="button" class="mark" aria-pressed="${m}">${m ? '✓ Maîtrisé' : 'Maîtrisé ?'}</button></div></div>`;
    }).join('')}</div>`;
  }
  if (b.sents) {
    const list = WORDS[b.sents] || [];
    return `<div class="sents">${list.map((x, i) => `${b.paras.includes(i) ? `<div class="para">${b.labels ? esc(b.labels[b.paras.indexOf(i)]) : 'Paragraphe ' + (b.paras.indexOf(i) + 1)}</div>` : ''}
      <div class="sent"><p>${esc(x.text)}</p><button type="button" class="btn small" data-say="${esc(x.text)}" data-lang="en">${ICON}Écouter</button></div>`).join('')}</div>`;
  }
  if (b.tool === 'conception') return `<div class="tool"><b>Calculateur de la période légale de conception</b>
      <div class="grid2"><label for="cc-birth">Date de naissance<input id="cc-birth" type="date" value="2008-05-30"></label>
      <label for="cc-death">Décès du père (facultatif)<input id="cc-death" type="date" value="2007-11-18"></label></div>
      <div class="res" id="cc-res"></div></div>`;
  if (b.tool === 'nom') return `<div class="tool"><label for="nom-sel"><b>Quel nom porte l'enfant ?</b></label>
      <p class="meta">Exemple : le père s'appelle KOUASSI, la mère TRAORÉ.</p>
      <select id="nom-sel" class="search" style="font-size:16px">
        <option value="mar">Parents mariés</option>
        <option value="m1">Hors mariage : reconnu par la mère seulement</option>
        <option value="p1">Hors mariage : reconnu par le père seulement</option>
        <option value="both">Hors mariage : reconnu par les deux en même temps</option>
        <option value="mp">Hors mariage : reconnu par la mère, puis par le père</option>
        <option value="adp">Enfant adultérin du père (père marié à une autre femme)</option>
        <option value="adm">Enfant adultérin de la mère (mère mariée à un autre homme)</option>
        <option value="inc">Parents inconnus (enfant trouvé)</option>
      </select><div class="res" id="nom-res"></div></div>`;
  if (b.tool === 'mineur') return `<div class="tool"><label for="min-sel"><b>Le mineur peut-il faire cet acte seul ?</b></label>
      <select id="min-sel" class="search" style="font-size:16px">
        <option value="cahier">Acheter un cahier ou un livre</option>
        <option value="taxi">Prendre un taxi wôrô-wôrô</option>
        <option value="assur">Assurer la maison dont il est propriétaire</option>
        <option value="bail">Mettre sa maison en location</option>
        <option value="vente">Vendre sa maison</option>
        <option value="voiture">Acheter une voiture</option>
        <option value="testament">Rédiger un testament</option>
        <option value="reco">Reconnaître son enfant</option>
        <option value="t17">Signer un contrat de travail (17 ans)</option>
        <option value="t15">Signer un contrat de travail (15 ans)</option>
        <option value="adop">Être adopté (17 ans)</option>
        <option value="proces">Engager un procès</option>
      </select><div class="res" id="min-res"></div></div>`;
  if (b.tool === 'prompt') return `<div class="tool"><b>Atelier : compose ta consigne</b>
      <label class="prompt-field" for="pr-role">1. Rôle<textarea id="pr-role" rows="2">Tu es un professeur de droit civil, patient et rigoureux.</textarea></label>
      <label class="prompt-field" for="pr-ctx">2. Contexte<textarea id="pr-ctx" rows="2">Je suis étudiant en L1 Droit à Abidjan ; mon examen est dans deux semaines.</textarea></label>
      <label class="prompt-field" for="pr-task">3. Tâche<textarea id="pr-task" rows="2">Explique-moi la différence entre abrogation expresse et abrogation tacite.</textarea></label>
      <label class="prompt-field" for="pr-fmt">4. Format<textarea id="pr-fmt" rows="2">Un tableau comparatif, puis deux exemples de la vie courante.</textarea></label>
      <label class="prompt-field" for="pr-cst">5. Contraintes<textarea id="pr-cst" rows="2">En droit ivoirien, 250 mots au plus. Signale ce que je dois vérifier dans mon cours.</textarea></label>
      <b>Ta consigne</b><div class="prompt-out" id="pr-out"></div>
      <div class="actions"><button type="button" class="btn small" id="pr-copy">Copier la consigne</button><a class="btn ghost small" href="https://claude.ai/new" target="_blank" rel="noopener">Ouvrir Claude ↗</a></div>
      <p class="meta" id="pr-msg" aria-live="polite"></p></div>`;
  if (b.tool === 'binary') return `<div class="tool"><label for="bin-in"><b>Convertisseur décimal → binaire</b></label>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><input id="bin-in" type="number" min="0" max="1023" value="13" inputmode="numeric"><span class="out" id="bin-out"></span></div>
      <div class="meta" id="bin-steps"></div></div>`;
  // ---- blocs des compagnons de livres (arabe et Coran)
  const SAY = (t, label) => `<button type="button" class="btn small" data-say="${esc(t)}" data-lang="ar">${ICON}${label || 'Écouter'}</button>`;
  if (b.ref) return `<div class="bookref"><b class="k">📘 Dans le livre</b><ul>${b.ref.map(([k, v]) => `<li><b>${esc(k)}</b> : ${md(v)}</li>`).join('')}</ul></div>`;
  if (b.syl) return `<div class="syl">${b.syl.map(([a, fr]) => `<button type="button" class="sylb" data-say="${esc(a)}" data-lang="ar"><span class="ara" lang="ar" dir="rtl">${esc(a)}</span>${fr ? `<small>${md(fr)}</small>` : ''}</button>`).join('')}</div>`;
  if (b.letters) return `<div class="letters">${b.letters.map(x => `<div class="letter">
      <div class="lt-top"><span class="ara big" lang="ar">${esc(x.c)}</span><div><b>${esc(x.name)}</b><span class="meta">${x.sound === 'support' ? 'support de la hamza · « â »' : `se prononce « ${esc(x.sound)} »`}</span></div></div>
      <div class="lt-forms" dir="rtl">${x.forms.map(f => `<span class="ara" lang="ar">${esc(f)}</span>`).join('')}</div>
      <p>${md(x.how)}</p><p class="meta">${md(x.shape)}</p>
      <div class="lt-word"><span class="emo" aria-hidden="true">${x.word.e}</span><span class="ara" lang="ar">${esc(x.word.ar)}</span><span>${esc(x.word.fr)} <i>(${esc(x.word.tr)})</i></span></div>
      <div class="actions">${SAY(x.name_ar, 'Le nom')}${SAY(x.word.ar, 'Le mot')}</div></div>`).join('')}</div>`;
  if (b.qletters) return `<div class="letters">${b.qletters.map(x => `<div class="letter">
      <div class="lt-top"><span class="ara big" lang="ar">${esc(x.c)}</span><div><b>${esc(x.name)}</b><span class="meta">${x.sound === 'support' ? 'support de la hamza · « â »' : `se prononce « ${esc(x.sound)} »`}</span></div></div>
      <div class="lt-forms" dir="rtl">${x.forms.map(f => `<span class="ara" lang="ar">${esc(f)}</span>`).join('')}</div>
      <p>${md(x.how)}</p><p class="meta">${md(x.shape)}</p></div>`).join('')}</div>`;
  if (b.vocab) return `<div class="vocab">${b.vocab.map(([e, a, fr]) => `<button type="button" class="voc" data-say="${esc(a)}" data-lang="ar">${e ? `<span class="emo" aria-hidden="true">${e}</span>` : ''}<span class="ara" lang="ar" dir="rtl">${esc(a)}</span><small>${md(fr)}</small></button>`).join('')}</div>`;
  if (b.dialog) {
    const all = b.dialog.lines.map(l => l[2]).join(' ');
    return `<div class="dialog"><p class="situ">${md(b.dialog.situation)}</p>
      <div class="actions">${SAY(all, 'Écouter tout le dialogue')}<button type="button" class="btn ghost small" data-trad="1" aria-pressed="false">Traduction</button></div>
      ${b.dialog.lines.map(([who, col, a, fr]) => `<div class="dl"><span class="who" style="color:${esc(col)}">${esc(who)}</span>
        <button type="button" class="dl-ar" data-say="${esc(a)}" data-lang="ar"><span class="ara" lang="ar" dir="rtl">${esc(a)}</span></button>
        <span class="fr">${md(fr)}</span></div>`).join('')}</div>`;
  }
  if (b.texte) return `<div class="dialog texte"><div class="emo big" aria-hidden="true">${b.texte.e}</div>
      <div class="actions">${SAY(b.texte.lines.join(' '), 'Écouter tout le texte')}<button type="button" class="btn ghost small" data-trad="1" aria-pressed="false">Traduction</button></div>
      ${b.texte.lines.map(a => `<button type="button" class="dl-ar" data-say="${esc(a)}" data-lang="ar"><span class="ara" lang="ar" dir="rtl">${esc(a)}</span></button>`).join('')}
      <p class="fr">${md(b.texte.fr)}</p></div>`;
  if (b.lines) return `<div class="rlines" dir="rtl">${b.lines.map(r => `<div class="rline">${(Array.isArray(r) ? r : [r]).map(w => `<span class="ara" lang="ar">${esc(w)}</span>`).join('')}</div>`).join('')}</div>`;
  if (b.qwords) return `<div class="qwords">${b.qwords.map(([w, r, u]) => `<div class="qw"><span class="ara" lang="ar" dir="rtl">${esc(w)}</span><span class="meta">${esc(r)}</span>
      <button type="button" class="btn small" data-audio="${esc(JSON.stringify([u]))}">${ICON}Écouter le verset</button></div>`).join('')}</div>`;
  if (b.qverses) return `<div class="qverses"><div class="actions"><button type="button" class="btn small" data-audio="${esc(JSON.stringify(b.qverses.verses.map(v => v[2])))}">${ICON}Écouter toute la sourate</button></div>
      ${b.qverses.verses.map(([v, r, u], i) => `<div class="qv"><span class="ara" lang="ar" dir="rtl">${esc(v)} <span class="vnum">﴿${(i + 1).toLocaleString('ar-EG')}﴾</span></span>
      <button type="button" class="btn ghost small" data-audio="${esc(JSON.stringify([u]))}">${ICON}Verset ${i + 1}</button></div>`).join('')}</div>`;
  return '';
}
const WORD_TITLES = { law: "Vocabulaire de la définition du droit", jur: "Mots juridiques à prononcer", pres: "Les mots de la présentation", c21: "Le procès, les métiers et les faux amis" };
const RULES = [
  ["L'accent tonique", "Chaque mot a une syllabe plus forte.", ["lawyer", "evidence", "defendant"]],
  ["Le r prononcé", "Le r se prononce partout, langue recourbée.", ["court", "lawyer", "clerk"]],
  ["Le t « flap »", "Entre deux voyelles, le t devient un d léger.", ["beautiful", "university", "community"]],
  ["Le o court = « â »", "Le o de not, job, contract se dit comme un a ouvert.", ["knowledge", "contract", "process"]],
  ["Le « th »", "Langue entre les dents, en soufflant.", ["the", "thank", "think"]],
  ["Le h soufflé", "On expire de l'air.", ["hello", "have", "hearing"]],
  ["Voyelles longues et courtes", "La durée change le sens.", ["ship", "sheep", "live", "leave"]],
  ["La terminaison -ed", "« t », « d », ou « id » après t et d.", ["worked", "signed", "motivated"]],
  ["Les lettres muettes", "Lettres écrites non prononcées.", ["knowledge", "island", "Wednesday"]],
];

// ---------- vues
const V = document.getElementById('view');
const noVoice = `<div class="notice" id="novoice" hidden>La voix n'est pas disponible dans ce navigateur. Ouvrez Lisân Campus dans <b>Chrome</b> (Android) ou <b>Safari</b> (iPhone).</div>`;
const noAr = `<div class="notice" id="noar" hidden>La voix arabe n’est pas installée sur cet appareil. Voir <a href="#parametres">Paramètres → Voix arabe</a>.</div>`;
const noAudio = `<div class="notice" id="noaudio" hidden>La récitation n’a pas pu être chargée : vérifiez votre connexion internet, puis réessayez.</div>`;
const crumbs = (...parts) => `<nav class="crumbs"><a href="#accueil">Accueil</a>${parts.map(([t, h]) => ` › ${h ? `<a href="#${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`}`).join('')}</nav>`;

function lastLesson() {
  return state.last && state.last.route && state.last.route.startsWith('l-') ? findLesson(state.last.route.slice(2)) : null;
}
const BOOKS = [['je-lis-l-arabe', 'Je lis l’arabe !', 'Niveau 0 · les lettres', 'm-a0'], ['je-parle-arabe-1', 'Je parle arabe !', 'Niveau 1 · A1 – A2', 'm-a1'],
  ['je-parle-arabe-2', 'Je parle arabe ! 2', 'Niveau 2 · A2 – B1', 'm-a2'], ['je-parle-arabe-3', 'Je parle arabe ! 3', 'Niveau 3 · B1 – B2', 'm-a3'],
  ['lire-le-coran', 'Lire le Coran pas à pas', '10 étapes · 43 leçons', 'm-qr'], ['vivre-l-islam-1', 'Vivre l’islam en famille', 'Niveau 1 · L’Islâm', 'm-is1'],
  ['vivre-l-islam-2', 'Vivre l’islam en famille 2', 'Niveau 2 · L’Îmân', 'm-is2']];
const nf = n => n.toLocaleString('fr-FR');
// découpe un titre en mots animés un à un (la virgule reste collée au mot précédent)
const words = (t, i0) => t.split(' ').filter(Boolean).map((w, k) => `<span class="wd" style="--i:${i0 + k}">${esc(w)}</span>`).join(' ');
function viewHome() {
  const last = lastLesson();
  // reprendre : la dernière leçon si elle n'est pas terminée, sinon la prochaine étape de son espace
  const ns = last && state.done[last.s.id + '/' + last.l.id] ? nextStep(spaceOf(last.s)) : null;
  const resumeHref = ns ? ns.href : last ? '#' + state.last.route : '#accueil';
  const totalL = SUBJECTS.reduce((a, s) => a + s.lessons.length, 0);
  const doneL = SUBJECTS.reduce((a, s) => a + subjectProgress(s).d, 0);
  const nQ = SUBJECTS.reduce((a, s) => a + s.quiz.length, 0), nC = SUBJECTS.reduce((a, s) => a + s.cards.length, 0);
  const pct = totalL ? Math.round(doneL / totalL * 100) : 0;
  const kpi = (ic, b, t, c) => `<div class="kpi" style="--kc:var(--s-${c})"><i aria-hidden="true">${ic}</i><b${typeof b === 'number' ? ` data-count="${b}"` : ''}>${typeof b === 'number' ? nf(b) : b}</b><span>${t}</span></div>`;
  const step = (ic, t, d) => `<div class="step"><span class="ic" aria-hidden="true">${ic}</span><h3>${t}</h3><p>${d}</p></div>`;
  return `<div class="home-hero"><section class="hero">
      <span class="eyebrow hz" style="--hd:.05s">Éditions Lisân · la langue qui ouvre les portes</span>
      <h1>${words('Apprendre, réviser et', 0)} <em>${words('se', 3)}</em> <span class="nw"><em>${words('former', 4)}</em>${words(',', 5)}</span> ${words('à son rythme', 6)}</h1>
      <p class="lead hz" style="--hd:.85s">L’arabe du niveau 0 au niveau 3, la lecture du Coran, la Licence 1 Droit et une formation à l’intelligence artificielle : des leçons courtes, la voix pour écouter, des quiz corrigés et des cartes de révision, sur téléphone et même hors connexion.</p>
      <div class="hero-cta hz" style="--hd:1.05s"><button type="button" class="btn" data-scrollto="espaces">Choisir un espace</button>${last ? `<a class="btn ghost" href="${resumeHref}">Reprendre ma leçon</a>` : '<a class="btn ghost" href="#apropos">Découvrir Lisân</a>'}</div>
    </section>${heroVideo()}</div>
    <section class="kpis" aria-label="Lisân Campus en chiffres">${kpi('🧭', SPACES.length, 'espaces', 'a')}${kpi('📚', totalL, 'leçons', 'n')}${kpi('✍️', nQ, 'questions de quiz', 'i')}${kpi('🃏', nC, 'cartes de révision', 'l')}${kpi('📶', 'Hors ligne', 'fonctionne même sans internet', 'm').replace('<b>', '<b class="txt">')}</section>
    ${doneL || last ? `<section class="mine"><span class="ring" style="--p:${pct}">${pct} %</span><div><b>Votre progression</b><p>${doneL} leçon${doneL > 1 ? 's' : ''} terminée${doneL > 1 ? 's' : ''} sur ${totalL}${last ? ` · dernière leçon : ${esc(last.s.title)}, ${esc(last.l.title)}` : ''}</p></div>${last ? `<a class="btn" href="${resumeHref}">Reprendre</a>` : ''}</section>` : ''}
    <div class="sec-h" id="espaces"><span class="orn" aria-hidden="true">✦ ✦ ✦</span><h2>Les cinq espaces</h2><p>Choisissez votre espace : la première leçon de chaque espace est en accès libre.</p></div>
    <section class="spaces">${SPACES.map(sp => { const p = spaceProgress(sp); const A = AUTH();
      const ins = A && A.user() ? (A.enrolled(sp.id) ? '<span class="tag ok">Inscrit</span>' : '<span class="tag">Non inscrit</span>') : '';
      return `<a class="spacecard c-${sp.color}" href="#espace-${sp.id}"><span class="sp-icon" aria-hidden="true">${sp.icon}</span>
        <span class="eyebrow">${esc(sp.eyebrow)}</span><h2>${esc(sp.title)}</h2><p>${esc(sp.lead)}</p>
        <div class="bar"><i style="width:${p.pct}%"></i></div><span class="meta">${p.count} parcours · ${p.d} / ${p.n} leçons ${ins}</span>
        <span class="go">Entrer <span aria-hidden="true">→</span></span></a>`; }).join('')}
    </section>
    <div class="sec-h"><span class="orn" aria-hidden="true">✦ ✦ ✦</span><h2>Comment ça marche ?</h2></div>
    <section class="steps">${step('🧭', 'Choisissez un espace', 'L’arabe, le Coran, le droit ou l’intelligence artificielle : commencez par la première leçon, en accès libre, puis suivez les étapes dans l’ordre.')}
      ${step('🎧', 'Apprenez et écoutez', 'Des leçons courtes, lues à voix haute, sur téléphone ou sur ordinateur, même sans connexion.')}
      ${step('✅', 'Vérifiez vos acquis', 'Les quiz se corrigent aussitôt ; les cartes de révision ramènent d’abord ce qu’il faut revoir.')}
      ${step('🎓', 'Recevez votre certificat', 'Toutes les leçons terminées et le quiz réussi à 70 % : votre certificat, vérifiable en ligne.')}</section>
    <div class="sec-h"><span class="orn" aria-hidden="true">✦ ✦ ✦</span><h2>Les livres des Éditions Lisân</h2><p>Les espaces « Apprendre l’arabe », « Lire le Coran pas à pas » et « Vivre l’islam en famille » accompagnent ces livres.</p></div>
    <section class="books" aria-label="Les livres">${BOOKS.map(([f, t, d, h]) => { const inner = `<img src="img/${f}.webp" alt="Couverture du livre « ${esc(t)} »" width="150" height="212" loading="lazy" decoding="async"><b>${esc(t)}</b><small>${esc(d)}</small>`;
      return h ? `<a class="book" href="#${h}">${inner}</a>` : `<div class="book">${inner}</div>`; }).join('')}</section>`;
}
// ---------- vidéo de présentation (accueil) : lecture automatique sans le son, sauf économie de données ou animations réduites
const HV_ICON = { pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3v14H7zM14 5h3v14h-3z"/></svg>', play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
  mute: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>' };
function heroAuto() {
  const c = navigator.connection; let reduce = false; try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  return !reduce && !(c && c.saveData);
}
function heroVideo() {
  const auto = heroAuto();
  return `<section class="hero-video" aria-label="Présentation de Lisân Campus en vidéo"><div class="hv-frame">
    <video id="hv" ${auto ? 'autoplay preload="auto"' : 'preload="none"'} muted loop playsinline poster="media/poster.webp" disablepictureinpicture
      aria-label="Lisân Campus en 16 secondes : les livres des Éditions Lisân, les quatre espaces et le Campus sur téléphone">
      <source src="media/campus-720.mp4" type="video/mp4" media="(min-width: 700px)"><source src="media/campus-720.webm" type="video/webm" media="(min-width: 700px)">
      <source src="media/campus-480.mp4" type="video/mp4"><source src="media/campus-480.webm" type="video/webm"></video>
    <div class="hv-ctrl"><button type="button" class="hv-btn hv-snd" id="hv-snd" aria-label="Activer le son" aria-pressed="false">${HV_ICON.mute}<span>Son</span></button>
    <button type="button" class="hv-btn" id="hv-btn" aria-label="${auto ? 'Mettre la vidéo en pause' : 'Lire la vidéo'}">${auto ? HV_ICON.pause : HV_ICON.play}</button></div></div></section>`;
}
function bindHeroVideo() {
  const v = document.getElementById('hv'), b = document.getElementById('hv-btn'); if (!v || !b) return;
  const ready = () => v.classList.add('ready');
  if (v.readyState >= 2) ready(); else { v.addEventListener('loadeddata', ready, { once: true }); setTimeout(ready, 2500); }
  const sync = () => { const on = !v.paused; b.innerHTML = on ? HV_ICON.pause : HV_ICON.play; b.setAttribute('aria-label', on ? 'Mettre la vidéo en pause' : 'Lire la vidéo'); };
  v.addEventListener('play', sync); v.addEventListener('pause', sync);
  b.onclick = () => { if (v.paused) v.play().catch(() => {}); else v.pause(); };
  const sb = document.getElementById('hv-snd');
  if (sb) sb.onclick = () => { v.muted = !v.muted; if (!v.muted) { v.volume = 0.8; if (v.paused) v.play().catch(() => {}); }
    sb.innerHTML = (v.muted ? HV_ICON.mute : HV_ICON.sound) + '<span>Son</span>'; sb.setAttribute('aria-pressed', String(!v.muted)); sb.setAttribute('aria-label', v.muted ? 'Activer le son' : 'Couper le son'); };
  if (v.autoplay) v.play().catch(sync);
}
function viewSpace(sp) {
  const ss = SUBJECTS.filter(s => spaceOf(s) === sp.id), p = spaceProgress(sp), A = AUTH();
  const card = (s, k) => { const q = subjectProgress(s); const best = state.quiz[s.id], open = subjectOpen(s), ok = subjectPassed(s);
    return `<a class="subj c-${s.color}${open ? '' : ' locked'}" href="#m-${s.id}"><span class="subj-step">${ok ? '✓ Réussi' : open ? 'Étape ' + (k + 1) : '🔒 Étape ' + (k + 1)}</span><h3>${esc(s.title)}</h3><p>${esc(s.subtitle)}</p>
      <div class="bar"><i style="width:${q.pct}%"></i></div>
      <span class="meta">${q.d} / ${q.n} leçons${best !== undefined ? ` · meilleur quiz ${best} %` : ''}</span></a>`; };
  let reg = '';
  if (A) {
    if (!A.user()) reg = `<div class="notice">La première leçon de l’espace est en accès libre. Pour la suite, <button type="button" class="linkbtn" data-auth="signin">connectez-vous avec Google</button> puis inscrivez-vous à cet espace.</div>`;
    else if (!A.enrolled(sp.id)) reg = `<div class="notice reg-n"><span>Vous n’êtes pas encore inscrit à cet espace. L’inscription est gratuite et ouvre toutes les leçons.</span> <a class="btn small" href="#inscription-${sp.id}">M’inscrire à « ${esc(sp.title)} »</a></div>`;
    else reg = `<div class="notice ok">Vous êtes inscrit à cet espace (n° <b>${esc(A.enrollment(sp.id).num)}</b>) : les leçons s’ouvrent au fil de votre progression. <a href="#inscription-${sp.id}">Ma fiche d’inscription</a></div>`;
  }
  const ns = nextStep(sp.id);
  const nextBox = ns ? `<div class="next-step c-${ns.s.color}"><span class="eyebrow">Votre prochaine étape</span><b>${esc(ns.label)}</b><a class="btn small" href="${ns.href}">${p.d ? 'Continuer' : 'Commencer'} →</a></div>`
    : `<div class="next-step done-all"><span class="eyebrow">Espace terminé</span><b>Tous les parcours de cet espace sont réussis. Bravo !</b></div>`;
  return `${crumbs([sp.title])}
    <div class="duo"><aside class="duo-side"><div class="subject-head c-${sp.color}"><span class="eyebrow">${esc(sp.eyebrow)}</span><h1>${sp.icon} ${esc(sp.title)}</h1>
      ${nextBox}
      ${sp.intro.map(t => `<p class="lead">${md(t)}</p>`).join('')}
      <div class="bar"><i style="width:${p.pct}%"></i></div><span class="meta">${p.d} / ${p.n} leçons terminées</span></div>
    ${reg}
    ${certPanelSpace(sp)}</aside>
    <div class="duo-main"><section class="subjects">${ss.map(card).join('')}</section></div></div>`;
}
function findLesson(key) {
  const [sid, lid] = key.split('.');
  const s = subj(sid); if (!s) return null;
  const i = s.lessons.findIndex(l => l.id === lid); if (i < 0) return null;
  return { s, l: s.lessons[i], i };
}
function viewSubject(s) {
  const p = subjectProgress(s), sp = space(spaceOf(s));
  return `${crumbs([sp.title, 'espace-' + sp.id], [s.title])}
    <div class="duo"><aside class="duo-side"><div class="subject-head c-${s.color}"><span class="eyebrow">${p.d} / ${p.n} leçons terminées</span><h1>${esc(s.title)}</h1><p class="lead">${esc(s.subtitle)}</p>
      <div class="bar"><i style="width:${p.pct}%"></i></div>
      <div class="actions"><a class="btn${inOrder(s, 'quiz') && subjectOpen(s) ? '' : ' is-locked'}" href="#q-${s.id}">${inOrder(s, 'quiz') && subjectOpen(s) ? '' : '🔒 '}Quiz (${s.quiz.length} questions)</a><a class="btn ghost${subjectOpen(s) ? '' : ' is-locked'}" href="#f-${s.id}">${subjectOpen(s) ? '' : '🔒 '}Cartes de révision (${s.cards.length})</a></div></div>
    ${subjectOpen(s) ? '' : `<div class="notice">🔒 Ce parcours s’ouvre après « ${esc(blockingSubject(s).title)} » : terminez-en toutes les leçons et réussissez son quiz (au moins ${PASS()} %). <a href="#m-${blockingSubject(s).id}">Y aller</a></div>`}
    ${certPanelSubject(s)}</aside>
    <div class="duo-main"><div class="lessons c-${s.color}">${s.lessons.map((l, i) => { const d = state.done[s.id + '/' + l.id]; const lock = access(s, i) !== 'ok' || !inOrder(s, i) || !subjectOpen(s);
      const cur = !d && state.last && state.last.route === 'l-' + s.id + '.' + l.id;
      return `<a class="lesson-link${d ? ' done' : ''}${cur ? ' cur' : ''}" href="#l-${s.id}.${l.id}"><span class="num">${d ? '✓' : i + 1}</span><span class="t">${esc(l.title)}${l.ar ? ` <span class="ara" lang="ar">${esc(l.ar)}</span>` : ''}</span>${d ? '<small>Terminée</small>' : cur ? '<small class="now">En cours</small>' : (lock ? '<small class="lock">🔒</small>' : (i === 0 && AUTH() ? '<small>Aperçu libre</small>' : ''))}</a>`; }).join('')}</div></div></div>`;
}
function viewGate(s, why, i) {
  const sp = space(spaceOf(s)), A = AUTH();
  const u = A && A.user();
  return `${crumbs([sp.title, 'espace-' + sp.id], [s.title, 'm-' + s.id], [i === undefined ? 'Accès' : i === 'quiz' ? 'Quiz' : (i + 1) + ' / ' + s.lessons.length])}
    <div class="gate c-${sp.color}"><span class="sp-icon" aria-hidden="true">🔒</span>
    ${why === 'prev' ? (() => { const x = blockingSubject(s), f = firstUndone(x), xp = subjectProgress(x), best = state.quiz[x.id];
      const go = f === -1 ? `#q-${x.id}` : `#l-${x.id}.${x.lessons[f].id}`;
      return `<h1>Ce parcours s’ouvre après « ${esc(x.title)} »</h1>
      <p class="lead">Dans l’espace « ${esc(sp.title)} », les parcours se suivent dans l’ordre. Pour ouvrir « ${esc(s.title)} », terminez d’abord toutes les leçons de « ${esc(x.title)} » et réussissez son quiz (au moins ${PASS()} %).</p>
      <p>Où vous en êtes : <b>${xp.d} / ${xp.n} leçons</b>${best !== undefined ? ` · meilleur quiz <b>${best} %</b>` : ' · quiz pas encore fait'}.</p>
      <div class="actions"><a class="btn" href="${go}">${f === -1 ? 'Faire le quiz' : `Reprendre à la leçon ${f + 1}`}</a><a class="btn ghost" href="#espace-${sp.id}">Voir l’espace</a></div>`; })()
    : why === 'order' ? (() => { const f = firstUndone(s), fl = s.lessons[f];
      return `<h1>${i === 'quiz' ? 'Le quiz s’ouvre à la fin du parcours' : 'Une étape à la fois'}</h1>
      <p class="lead">Les leçons de « ${esc(s.title)} » se suivent dans l’ordre : chacune s’appuie sur la précédente. ${i === 'quiz' ? 'Terminez toutes les leçons pour ouvrir le quiz.' : 'Cette leçon s’ouvrira quand les précédentes seront terminées.'}</p>
      <p>Prochaine étape : <b>leçon ${f + 1} · ${esc(fl.title)}</b></p>
      <div class="actions"><a class="btn" href="#l-${s.id}.${fl.id}">Reprendre à la leçon ${f + 1}</a><a class="btn ghost" href="#m-${s.id}">Voir le parcours</a></div>`; })()
    : why === 'login' ? `<h1>Connectez-vous pour continuer</h1>
      <p class="lead">La première leçon de chaque espace est en accès libre. Pour la suite, connectez-vous avec votre compte Google, puis inscrivez-vous à l’espace « ${esc(sp.title)} ». C’est gratuit.</p>
      <div class="actions"><button type="button" class="btn" data-auth="signin">Se connecter avec Google</button></div>
      <p class="meta">En vous connectant, vous acceptez les <a href="#conditions">conditions d’utilisation</a> et la <a href="#confidentialite">politique de confidentialité</a>.</p>`
    : `<h1>Inscription à l’espace « ${esc(sp.title)} »</h1>
      <p class="lead">Bonjour ${esc(u ? (u.displayName || '').split(' ')[0] : '')} ! Pour ouvrir toutes les leçons de cet espace, remplissez votre fiche d’inscription. Chaque espace demande une inscription séparée ; vos autres inscriptions ne changent pas.</p>
      <div class="actions"><a class="btn" href="#inscription-${sp.id}">Remplir ma fiche d’inscription</a><a class="btn ghost" href="#espace-${sp.id}">Voir l’espace</a></div>`}
    </div>`;
}
function viewLesson(found) {
  const { s, l, i } = found;
  const prev = s.lessons[i - 1], next = s.lessons[i + 1], sp = space(spaceOf(s));
  const key = s.id + '/' + l.id, d = !!state.done[key];
  const text = lessonSpeech(l), mins = Math.max(1, Math.round(audioSeconds(text) / 60));
  const P = subjectProgress(s);
  const side = `<aside class="lside c-${s.color}" aria-label="Le parcours"><div class="ls-head"><span class="eyebrow">Le parcours</span><a href="#m-${s.id}"><b>${esc(s.title)}</b></a>
      <div class="bar"><i style="width:${P.pct}%"></i></div><span class="meta">${P.d} / ${P.n} leçons terminées</span></div>
    <nav class="ls-list">${s.lessons.map((x, j) => { const dn = !!state.done[s.id + '/' + x.id], lk = !dn && !inOrder(s, j);
      return `<a href="#l-${s.id}.${x.id}" class="${j === i ? 'on' : ''}${dn ? ' done' : ''}${lk ? ' locked' : ''}"${j === i ? ' aria-current="page"' : ''}><span>${dn ? '✓' : lk ? '🔒' : j + 1}</span>${esc(x.title)}</a>`; }).join('')}</nav>
    <div class="ls-act"><a class="btn small" href="#q-${s.id}">${inOrder(s, 'quiz') ? '' : '🔒 '}Quiz</a><a class="btn ghost small" href="#f-${s.id}">Cartes</a></div></aside>`;
  return `${crumbs([sp.title, 'espace-' + sp.id], [s.title, 'm-' + s.id], [(i + 1) + ' / ' + s.lessons.length])}
    <div class="duo duo-r"><article class="lesson read c-${s.color}">
      <span class="eyebrow">${esc(s.title)} · ${i + 1} / ${s.lessons.length}</span>
      <h1>${esc(l.title)}</h1>${l.ar ? `<p class="ara title-ar" lang="ar" dir="rtl">${esc(l.ar)}</p>` : ''}
      ${noVoice}${s.lang === 'ar' && !s.noVoice ? noAr : ''}${s.noVoice ? noAudio : ''}
      ${!s.noLessonVoice && s.id !== 'en' ? `<div class="actions"><button type="button" class="btn ghost small" data-say="${esc(text)}" data-lang="fr">${ICON}Écouter la leçon <small>· ${mins} min</small></button></div>` : ''}
      ${l.body.map(b => renderBlock(b, s)).join('')}
      <div class="lesson-foot">
        <button type="button" class="btn done-toggle" data-done="${key}" data-need="${needFor(l)}" aria-pressed="${d}">${d ? '✓ Leçon terminée' : 'Marquer comme terminée'}</button>
        <p class="meta done-msg" id="done-msg" aria-live="polite"></p>
        <button type="button" class="linkbtn sugg-link" data-suggest="${esc(s.title + ' · ' + l.title)}">💡 Suggérer une amélioration</button>
        <div class="actions">${prev ? `<a class="btn ghost small" href="#l-${s.id}.${prev.id}">← Précédente</a>` : ''}<a class="btn small${d ? '' : ' is-locked'}" data-next="1" href="${next ? `#l-${s.id}.${next.id}` : `#q-${s.id}`}">${next ? 'Suivante →' : 'Faire le quiz →'}</a></div>
      </div>
    </article>${side}</div>`;
}
function shuffle(a) { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
let quizRun = null;
function viewQuiz(s) {
  quizRun = { s, answered: 0, right: 0, qs: s.quiz.map(q => ({ ...q, order: shuffle(q.a.map((_, k) => k)) })) };
  const best = state.quiz[s.id], sp = space(spaceOf(s));
  return `${crumbs([sp.title, 'espace-' + sp.id], [s.title, 'm-' + s.id], ['Quiz'])}
    <div class="subject-head c-${s.color}"><h1>Quiz : ${esc(s.title)}</h1><p class="lead">Touchez une réponse : la correction s'affiche aussitôt.${best !== undefined ? ` Votre meilleur score : ${best} %.` : ''}</p></div>
    <div class="duo duo-r"><div class="quiz read c-${s.color}"><div class="qbar" aria-hidden="true"><i id="qbar"></i></div>${quizRun.qs.map((q, n) => `<div class="q" data-q="${n}"><b>${n + 1}. ${md(q.q)}</b>
      <div class="opts">${q.order.map((k, j) => `<button type="button" class="opt" data-k="${k}"><span class="ol" aria-hidden="true">${'ABCDEF'[j]}</span><span class="ot${/^[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\s]+$/.test(q.a[k]) ? ' ara" lang="ar" dir="rtl' : ''}">${md(q.a[k])}</span></button>`).join('')}</div>
      <p class="expl" hidden>${md(q.e)}</p></div>`).join('')}
      <div class="qresult" id="qresult" hidden></div>
      <div class="score" id="score">0 / ${s.quiz.length}</div>
      <div class="actions" id="quiz-end" hidden><a class="btn" href="#q-${s.id}" data-reload="1">Recommencer</a><a class="btn ghost" href="#m-${s.id}">Retour au parcours</a></div>
      <div class="cert-panel ok" id="quiz-cert" hidden><span class="cp-ic" aria-hidden="true">🎓</span><div><b>Parcours réussi !</b><small>Toutes les leçons sont terminées et le quiz est réussi : votre certificat vous attend.</small></div><a class="btn small" href="#m-${s.id}">Obtenir mon certificat</a></div>
    </div>
    <aside class="qside c-${s.color}" aria-label="Votre score"><span class="eyebrow">Votre score</span><span class="ring" id="qs-ring" style="--p:0">0 %</span>
      <b id="qs-t">0 / ${s.quiz.length} questions</b><span class="meta" id="qs-m">Répondez aux questions : le score se met à jour.</span>
      <div class="bar"><i id="qs-bar" style="width:0%"></i></div>${best !== undefined ? `<span class="meta">Meilleur score : ${best} %</span>` : ''}
      <span class="meta">Seuil du certificat : 70 %</span><a class="btn ghost small" href="#m-${s.id}">Retour au parcours</a></aside></div>`;
}
let flashRun = null;
function viewFlash(s) {
  const deck = shuffle(s.cards.map((c, i) => i)).sort((a, b) => (state.known[s.id + ':' + a] ? 1 : 0) - (state.known[s.id + ':' + b] ? 1 : 0));
  flashRun = { s, deck, pos: 0, flipped: false };
  const sp = space(spaceOf(s));
  return `${crumbs([sp.title, 'espace-' + sp.id], [s.title, 'm-' + s.id], ['Cartes'])}
    <div class="subject-head c-${s.color}"><h1>Cartes : ${esc(s.title)}</h1><p class="lead">Touchez la carte pour voir la réponse, puis dites si vous la saviez. Les cartes à revoir reviennent en premier.</p></div>
    ${s.lang === 'ar' && !s.noVoice ? noAr : ''}
    <div class="flash c-${s.color}" id="flash"></div>`;
}
function drawFlash() {
  const el = document.getElementById('flash'); if (!el || !flashRun) return;
  const { s, deck, pos, flipped } = flashRun;
  const knownN = s.cards.filter((_, i) => state.known[s.id + ':' + i]).length;
  if (pos >= deck.length) {
    el.innerHTML = `<div class="cardface"><div class="term">Paquet terminé</div><div class="def">${knownN} carte${knownN > 1 ? 's' : ''} sue${knownN > 1 ? 's' : ''} sur ${s.cards.length}</div></div>
      <div class="controls"><a class="btn" href="#f-${s.id}" data-reload="1">Rejouer</a><a class="btn ghost" href="#m-${s.id}">Retour</a></div>`;
    return;
  }
  const [term, def] = s.cards[deck[pos]];
  const lang = cardLang(s);
  el.innerHTML = `<p class="meta">Carte ${pos + 1} sur ${deck.length} · ${knownN} sue${knownN > 1 ? 's' : ''}</p>
    <div class="cardface${flashRun.anim ? ' ' + flashRun.anim : ''}" id="cardface" role="button" tabindex="0" aria-label="Retourner la carte">
      <div class="term">${md(term)}</div>${flipped ? `<div class="def">${md(def)}</div>` : '<div class="hint">Touchez pour voir la réponse</div>'}</div>
    <div class="controls">${s.noVoice ? '' : `<button type="button" class="btn ghost small" data-say="${esc(lang === 'ar' ? arOnly(term) : plain(term))}" data-lang="${lang}">${ICON}Écouter</button>`}
      ${flipped ? `<button type="button" class="btn bad" data-flash="0">À revoir</button><button type="button" class="btn good" data-flash="1">Je savais</button>` : ''}</div>`;
  flashRun.anim = null;
}
let glossSpace = 'all';
function viewGlossary() {
  return `${crumbs(['Glossaire'])}
    <div><h1>Glossaire</h1><p class="lead">Tous les termes et tous les mots des espaces. Choisissez un espace, puis tapez un mot pour filtrer.</p></div>
    <div class="chips" role="group" aria-label="Espace">${[['all', 'Tous'], ...SPACES.map(sp => [sp.id, sp.title])].map(([id, t]) => `<button type="button" class="chip" data-gspace="${id}" aria-pressed="${glossSpace === id}">${esc(t)}</button>`).join('')}</div>
    <input class="search" id="gsearch" type="search" placeholder="Rechercher (ex. : servitude, prompt, كِتَابٌ)" aria-label="Rechercher un terme">
    <div class="gloss" id="glist"></div>`;
}
function drawGlossary(q) {
  const el = document.getElementById('glist'); if (!el) return;
  const n = s => s.normalize('NFD').replace(/[\u0300-\u036f\u064b-\u0655\u0670]/g, '').replace(/[\u0671\u0623\u0625\u0622]/g, '\u0627').toLowerCase();
  const items = SUBJECTS.filter(s => glossSpace === 'all' || spaceOf(s) === glossSpace).flatMap(s => s.cards.map(c => ({ s, t: c[0], d: c[1] })))
    .sort((a, b) => plain(a.t).localeCompare(plain(b.t), 'fr'));
  const f = q ? items.filter(x => n(arOnly(x.t) + ' ' + x.d).includes(n(q))) : items;
  const shown = f.slice(0, 300);
  el.innerHTML = shown.length ? shown.map(x => `<div class="gloss-item c-${x.s.color}"><b>${md(x.t)}</b>
      ${x.s.noVoice ? '<span></span>' : `<button type="button" class="say" data-say="${esc(cardLang(x.s) === 'ar' ? arOnly(x.t) : plain(x.t))}" data-lang="${cardLang(x.s)}">Écouter</button>`}
      <div style="grid-column:1/-1">${md(x.d)}</div><span class="s">${esc(x.s.title)}</span></div>`).join('') + (f.length > shown.length ? `<p class="meta">${f.length - shown.length} autres résultats : précisez votre recherche.</p>` : '')
    : `<p class="lead">Aucun terme ne correspond à « ${esc(q)} ».</p>`;
}

// ---------- paramètres
function seg(name, cur, opts) {
  return `<div class="seg" role="group" aria-label="${esc(name)}">${opts.map(([v, t]) => `<button type="button" data-set="${name}" data-val="${v}" aria-pressed="${String(cur) === String(v)}">${esc(t)}</button>`).join('')}</div>`;
}
function viewSettings() {
  const A = AUTH();
  return `${crumbs(['Paramètres'])}
    <div><h1>Paramètres</h1><p class="lead">Réglez Lisân Campus à votre convenance. Ces réglages sont enregistrés sur cet appareil.</p></div>
    <section class="panel"><h2>Voix</h2>
      <div class="setrow"><span>Vitesse de lecture</span>${seg('rate', state.rate, [[1, 'Normale'], [0.65, 'Lente']])}</div>
      <div class="setrow"><span>Essayer les voix</span><div class="actions">
        <button type="button" class="btn ghost small" data-say="Bienvenue sur Lisân Campus." data-lang="fr">${ICON}Français</button>
        <button type="button" class="btn ghost small" data-say="Welcome to Lisan Campus." data-lang="en">${ICON}Anglais</button>
        <button type="button" class="btn ghost small" data-say="مَرْحَبًا بِكُمْ فِي حَرَمِ لِسَانٍ." data-lang="ar">${ICON}Arabe</button></div></div>
      <div class="notice" id="voice-status"></div>
      <details class="help"><summary>Installer la voix arabe sur Android</summary>
        <ol><li>Ouvrez les <b>Paramètres</b> du téléphone, puis <b>Accessibilité</b> (ou <b>Gestion générale</b>, ou <b>Langues et saisie</b>).</li>
        <li>Touchez <b>Synthèse vocale</b> (ou « Sortie de la synthèse vocale »), puis l’icône ⚙️ à côté de <b>Services Google</b>.</li>
        <li>Touchez <b>Installer les données vocales</b>, choisissez <b>Arabe</b> et téléchargez la voix.</li>
        <li>Revenez sur Lisân Campus et touchez « Arabe » ci-dessus pour vérifier.</li></ol>
        <p>Sur iPhone : Réglages → Accessibilité → Contenu énoncé → Voix → Arabe.</p></details>
    </section>
    <section class="panel"><h2>Affichage</h2>
      <div class="setrow"><span>Thème</span>${seg('theme', state.theme, [['auto', 'Automatique'], ['light', 'Clair'], ['dark', 'Sombre']])}</div>
      <div class="setrow"><span>Taille du texte</span>${seg('size', state.size, [['m', 'Normale'], ['l', 'Grande'], ['xl', 'Très grande']])}</div>
    </section>
    <section class="panel"><h2>Application</h2>
      <p>Installez Lisân Campus sur votre téléphone : il s’ouvrira comme une application, même sans connexion.</p>
      <div class="actions"><button type="button" class="btn small" data-install="1">Installer l’application</button></div>
      <p class="meta" id="install-msg"></p>
    </section>
    ${A ? `<section class="panel"><h2>Compte</h2><p>Gérez votre connexion et vos inscriptions dans <a href="#compte">Mon compte</a>.</p></section>` : ''}
    <section class="panel"><h2>Ma progression</h2>
      <p>Leçons terminées, scores des quiz et cartes sues sont enregistrés sur cet appareil${A ? ' et, si vous êtes connecté, sur votre compte' : ''}.</p>
      <div class="actions" id="reset-zone"><button type="button" class="btn ghost small" data-reset="ask">Effacer ma progression</button></div>
    </section>`;
}
function voiceStatus() {
  const el = document.getElementById('voice-status'); if (!el) return;
  if (!synth) { el.innerHTML = 'La voix n’est pas disponible dans ce navigateur. Ouvrez Lisân Campus dans <b>Chrome</b> (Android) ou <b>Safari</b> (iPhone).'; return; }
  pickVoices();
  const ok = x => x ? '✓ installée' : '✗ non trouvée';
  el.innerHTML = `Voix française : <b>${ok(voices.fr)}</b> · anglaise : <b>${ok(voices.en)}</b> · arabe : <b>${ok(voices.ar)}</b>`;
}
function applyDisplay() {
  const r = document.documentElement;
  if (state.theme === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', state.theme);
  r.classList.remove('fs-l', 'fs-xl'); if (state.size !== 'm') r.classList.add('fs-' + state.size);
}

// ---------- mon compte (visible quand la connexion est configurée)
function viewAccount() {
  const A = AUTH(); if (!A) return viewHome();
  const u = A.user();
  if (!u) return `${crumbs(['Mon compte'])}<div class="gate"><span class="sp-icon" aria-hidden="true">👤</span><h1>Mon compte</h1>
    <p class="lead">Connectez-vous avec votre compte Google pour vous inscrire aux espaces et retrouver votre progression sur tous vos appareils.</p>
    <div class="actions"><button type="button" class="btn" data-auth="signin">Se connecter avec Google</button></div>
    <p class="meta">En vous connectant, vous acceptez les <a href="#conditions">conditions d’utilisation</a> et la <a href="#confidentialite">politique de confidentialité</a>.</p></div>`;
  return `${crumbs(['Mon compte'])}
    <div class="account">${u.photoURL ? `<img src="${esc(u.photoURL)}" alt="" width="64" height="64" referrerpolicy="no-referrer">` : '<span class="sp-icon">👤</span>'}
      <div><h1>${esc(u.displayName || 'Mon compte')}</h1><p class="meta">${esc(u.email || '')}</p></div></div>
    ${accountPanels(A)}
    ${certAccountPanel(A)}
    <section class="panel"><h2>Session</h2><div class="actions"><button type="button" class="btn ghost small" data-auth="signout">Se déconnecter</button></div></section>
    ${dangerPanel()}`;
}

// ---------- pages d'information
const PAGES = {
  apropos: { title: 'À propos', body: [
    { p: '**Lisân Campus** est le site d’apprentissage des **Éditions Lisân**, maison d’édition fondée à Abidjan par **Mouhamadou CISSEMA**, enseignant et auteur de méthodes. Sa devise : « la langue qui ouvre les portes ».' },
    { h: 'Cinq espaces' },
    { ul: ['**Droit · Licence 1** : les matières de la première année de droit, pour tous les étudiants en droit.',
      '**Formation à l’IA avec Claude** : comprendre l’intelligence artificielle et s’en servir avec méthode et prudence, dans toutes les disciplines.',
      '**Vivre l’islam en famille** : l’enseignement islamique pour toute la famille, compagnon des livres (niveaux 1 et 2).',
      '**Apprendre l’arabe** : les compagnons des livres « Je lis l’arabe ! » (niveau 0) et « Je parle arabe ! » (niveaux 1 à 3).',
      '**Lire le Coran pas à pas** : le compagnon du livre, avec la récitation lente d’al-Ḥouṣarî.'] },
    { h: 'Comment utiliser le Campus' },
    { ol: ['Choisissez un espace sur la page d’accueil, puis un parcours.', 'Lisez ou écoutez chaque leçon, puis marquez-la comme terminée.', 'Vérifiez vos acquis avec le quiz, et révisez avec les cartes.',
      'Installez l’application depuis les **Paramètres** pour l’utiliser hors connexion.'] },
    { box: 'Les contenus de droit résument des cours et des textes publics : vérifiez toujours avec vos enseignants.', title: 'À savoir', kind: 'marge' },
  ] },
  confidentialite: { title: 'Politique de confidentialité', body: [
    { p: '*Dernière mise à jour : 24 octobre 2026.*' },
    { p: 'Les Éditions Lisân attachent une grande importance à la protection de vos données personnelles, conformément à la **loi ivoirienne n° 2013-450 du 19 juin 2013** relative à la protection des données à caractère personnel.' },
    { h: '1. Responsable du traitement' },
    { p: 'Éditions Lisân, représentées par Mouhamadou CISSEMA, Abidjan, Côte d’Ivoire. Contact : la page [Contact](#contact) du site.' },
    { h: '2. Les données que nous traitons' },
    { ul: ['**Votre progression** (leçons terminées, temps de lecture de chaque leçon, scores, cartes sues) et **vos réglages** sont enregistrés **sur votre appareil**, dans le stockage du navigateur. Ils ne nous sont pas transmis.',
      '**Si vous vous connectez avec Google** : le nom, l’adresse e-mail et la photo de votre compte Google.',
      '**Si vous vous inscrivez à un espace** : votre fiche d’inscription (civilité, nom, prénoms, date de naissance, téléphone, pays et ville de résidence, profil, manière dont vous avez connu le site et, pour les moins de 18 ans, le nom et le téléphone d’un parent ou tuteur), vos réponses aux questions de l’espace, vos inscriptions et votre progression.',
      '**Si vous obtenez un certificat** : vos civilité, prénom et nom, le parcours réussi, le nombre de leçons, le score au quiz et la date. Ces informations sont inscrites au registre des certificats : **toute personne qui connaît le numéro du certificat** (ou scanne son code QR) peut les consulter, afin de vérifier qu’il est authentique. Aucune autre donnée n’y figure.',
      '**Si vous envoyez une suggestion** : son texte, son type et la leçon concernée, enregistrés avec votre fiche pour que nous puissions vous répondre.',
      '**Qui y a accès** : seuls les Éditions Lisân, administrateur du site, consultent les fiches d’inscription, pour gérer les inscriptions et contacter les élèves au sujet de leurs cours.',
      '**Si vous nous écrivez** par le formulaire de contact : votre nom, votre adresse e-mail et votre message, uniquement pour vous répondre.'] },
    { p: 'Ces données servent à **gérer vos inscriptions**, à **adapter les cours** à nos élèves et à **vous contacter au sujet de vos cours**. Vous ne recevez nos nouveautés que si vous l’avez demandé dans votre fiche. Vos données ne sont **ni vendues, ni cédées**.' },
    { p: 'Lisân Campus n’utilise **ni publicité, ni cookies de suivi, ni outil de mesure d’audience**.' },
    { h: '3. Les prestataires' },
    { ul: ['**Cloudflare** (hébergement du site).',
      '**Google** : connexion avec un compte Google, stockage des comptes et des messages du formulaire de contact (Firebase, serveurs situés en Europe). Les polices de caractères sont hébergées sur le site lui-même.',
      '**everyayah.com** : diffusion des récitations du Coran ; votre navigateur s’y connecte quand vous écoutez un verset.'] },
    { p: 'Ces prestataires peuvent traiter des données hors de Côte d’Ivoire. La voix de lecture est celle de votre appareil : les textes lus ne nous sont pas envoyés.' },
    { h: '4. Durée de conservation' },
    { p: 'Les données de compte sont conservées tant que votre compte existe : elles sont effacées dès que vous supprimez votre compte. Les messages du formulaire de contact sont conservés le temps nécessaire pour y répondre.' },
    { h: '5. Vos droits' },
    { p: 'Dans **Mon compte**, vous pouvez à tout moment consulter et modifier votre fiche, vous désinscrire d’un espace et supprimer votre compte. Vous pouvez aussi demander l’accès à vos données, leur rectification ou leur suppression, et vous opposer à leur traitement, en nous écrivant depuis la page [Contact](#contact). Vous pouvez aussi saisir l’**ARTCI**, l’autorité ivoirienne de protection des données personnelles. Pour effacer la progression enregistrée sur votre appareil : **Paramètres → Effacer ma progression**.' },
    { h: '6. Les mineurs' },
    { p: 'Les élèves de moins de 18 ans s’inscrivent avec l’accord d’un parent ou d’un tuteur, dont le nom et le téléphone sont demandés dans la fiche d’inscription. Ils utilisent Lisân Campus sous la responsabilité de leurs parents ou de leur établissement.' },
  ] },
  conditions: { title: 'Conditions d’utilisation', body: [
    { p: '*Dernière mise à jour : 23 octobre 2026.*' },
    { h: '1. Objet' },
    { p: 'Lisân Campus est un site d’apprentissage gratuit édité par les Éditions Lisân. En l’utilisant, vous acceptez les présentes conditions.' },
    { h: '2. Accès' },
    { p: 'La page d’accueil, la présentation des espaces et la première leçon de chaque espace sont en accès libre. Les leçons et les parcours se suivent dans l’ordre : chaque leçon s’ouvre quand la précédente est terminée, chaque parcours quand le précédent est réussi. L’accès au reste des contenus demande une connexion avec un compte Google et une inscription gratuite à chaque espace, avec une fiche d’inscription dont vous certifiez l’exactitude. Le site peut être interrompu pour maintenance ou évoluer sans préavis.' },
    { h: '3. Les contenus' },
    { p: 'Les contenus sont proposés à des fins d’apprentissage. Les leçons de droit ne constituent pas des consultations juridiques ; pour une situation personnelle, adressez-vous à un professionnel. La lecture du Coran s’apprend auprès d’un maître ; le Campus sert à réviser.' },
    { h: '4. Les certificats' },
    { p: 'Un certificat de réussite est délivré à l’élève inscrit qui termine toutes les leçons d’un parcours et réussit son quiz avec au moins 70 %. Le grand certificat d’un espace récompense celui qui réussit tous les parcours de cet espace. Chaque certificat porte un numéro et un code QR, vérifiables sur la page [Vérifier un certificat](#verifier). Il atteste le travail accompli sur Lisân Campus ; ce n’est pas un diplôme d’État. Tout certificat obtenu de manière frauduleuse peut être annulé.' },
    { h: '5. Propriété intellectuelle' },
    { p: 'Les textes, exercices, illustrations, le nom et le logo « Lisân » sont la propriété de Mouhamadou CISSEMA et des Éditions Lisân. Ils sont réservés à votre usage personnel et pédagogique : toute reproduction ou diffusion, même partielle, demande une autorisation écrite. Les récitations du Coran appartiennent à leurs ayants droit et sont diffusées par everyayah.com.' },
    { h: '6. Votre compte' },
    { p: 'Votre compte est personnel. Vous vous engagez à utiliser le site de manière loyale, sans chercher à en perturber le fonctionnement. Les Éditions Lisân peuvent suspendre un compte en cas d’abus.' },
    { h: '7. Droit applicable' },
    { p: 'Les présentes conditions sont régies par le droit ivoirien. En cas de litige, et à défaut d’accord amiable, les juridictions d’Abidjan sont compétentes.' },
  ] },
  mentions: { title: 'Mentions légales', body: [
    { h: 'Éditeur' },
    { p: '**Éditions Lisân**, marque de Mouhamadou CISSEMA, Abidjan, Côte d’Ivoire. Directeur de la publication : Mouhamadou CISSEMA. Contact : page [Contact](#contact).' },
    { h: 'Hébergement' },
    { p: '**Cloudflare, Inc.** (service Cloudflare Pages), San Francisco, États-Unis — www.cloudflare.com. Le code du site est conservé sur GitHub ; les comptes et les messages sont enregistrés sur Firebase (Google), en Europe.' },
    { h: 'Crédits' },
    { ul: ['Polices : Literata, Atkinson Hyperlegible et Noto Sans (licence SIL Open Font) ; **Lisan Naskh**, dérivée de Noto Naskh Arabic, avec le code couleur des voyelles des Éditions Lisân (licence SIL Open Font).',
      'Récitations du Coran : cheikh Maḥmoûd Khalîl al-Ḥouṣarî, lecture d’enseignement (al-mou‘allim), diffusées par everyayah.com.',
      'Voix de lecture : la synthèse vocale de votre appareil.',
      'Pictogrammes : Fluent Emoji de Microsoft et, pour les drapeaux, flag-icons (licence MIT ; textes des licences dans le fichier emoji/LICENCES.txt du site).',
      'Export des listes au format Excel : SheetJS (licence Apache 2.0) ; codes QR des certificats : qrcode-generator de Kazuhiko Arase (licence MIT).',
      'Vidéo de présentation et sa musique : créations originales des Éditions Lisân.'] },
    { p: '© Mouhamadou CISSEMA — Éditions Lisân. Tous droits réservés.' },
  ] },
};
function viewPage(k) {
  const P = PAGES[k];
  const mdl = s => md(s).replace(/\[([^\]]+)\]\((#[a-z-]+)\)/g, '<a href="$2">$1</a>');
  const block = b => b.p ? `<p>${mdl(b.p)}</p>` : renderBlock(b, null);
  return `${crumbs([P.title])}<article class="lesson read page"><h1>${esc(P.title)}</h1>${P.body.map(block).join('')}</article>`;
}
function viewContact() {
  return `${crumbs(['Contact'])}<article class="lesson read page"><h1>Contact</h1>
    <p>Une question sur un cours ou sur les livres, une erreur à signaler, une demande concernant vos données ? Écrivez-nous : nous vous répondrons à l’adresse que vous indiquez.</p>
    <form class="form" id="contact-form" name="contact">
      <label>Votre nom<input name="nom" required autocomplete="name"></label>
      <label>Votre adresse e-mail<input name="email" type="email" required autocomplete="email" inputmode="email"></label>
      <label>Sujet<select name="sujet"><option>Une question sur un cours</option><option>Les livres des Éditions Lisân</option><option>Signaler une erreur</option><option>Mon compte et mes données</option><option>Autre</option></select></label>
      <label>Votre message<textarea name="message" rows="6" required></textarea></label>
      <p class="hp" aria-hidden="true"><label>Ne pas remplir<input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
      <div class="actions"><button type="submit" class="btn">Envoyer</button></div>
      <p class="meta" id="contact-msg" aria-live="polite"></p>
    </form>
    <p class="meta">Vos informations servent uniquement à vous répondre (voir la <a href="#confidentialite">politique de confidentialité</a>).</p></article>`;
}

// ---------- routeur
// pile des pages visitées : un lien qui ramène à la page précédente fait un vrai « retour »,
// pour que le bouton retour du téléphone ne repasse pas par la même page.
const navStack = [];
function trackNav(h) { const n = navStack.length; if (n > 1 && navStack[n - 2] === h) navStack.pop(); else if (navStack[n - 1] !== h) navStack.push(h); if (navStack.length > 80) navStack.shift(); }
function route() {
  stopVoice(); closeMenu(); clearInterval(lessonClock);
  if (!location.hash) history.replaceState(null, '', '#accueil');
  const h = decodeURIComponent(location.hash.slice(1)) || 'accueil';
  trackNav(h);
  let html = '', after = null, keep = false;
  const gate = (s, i) => { const a = access(s, i); return a === 'ok' ? null : viewGate(s, a, i); };
  // quiz et cartes : connexion et inscription seulement (l'ordre du quiz est vérifié à part)
  const authGate = s => { const a = access(s, 1); return a === 'ok' || a === 'order' ? null : viewGate(s, a, a === 'prev' ? undefined : 1); };
  if (h.startsWith('espace-') && space(h.slice(7))) html = viewSpace(space(h.slice(7)));
  else if (h.startsWith('m-') && subj(h.slice(2))) html = viewSubject(subj(h.slice(2)));
  else if (h.startsWith('l-') && findLesson(h.slice(2))) { const f = findLesson(h.slice(2)); const g = gate(f.s, f.i);
    if (g) html = g; else { html = viewLesson(f); keep = true; after = afterLesson; } }
  else if (h.startsWith('q-') && subj(h.slice(2))) { const s = subj(h.slice(2)); html = authGate(s) || (inOrder(s, 'quiz') ? viewQuiz(s) : viewGate(s, 'order', 'quiz')); }
  else if (h.startsWith('f-') && subj(h.slice(2))) { const s = subj(h.slice(2)); const g = authGate(s); if (g) html = g; else { html = viewFlash(s); after = () => { drawFlash(); checkArVoice(); }; } }
  else if (h === 'glossaire') { html = viewGlossary(); after = () => { drawGlossary(''); document.getElementById('gsearch').addEventListener('input', e => drawGlossary(e.target.value)); }; }
  else if (h === 'parametres') { html = viewSettings(); after = voiceStatus; }
  else if (h === 'compte') html = viewAccount();
  else if (h.startsWith('inscription-') && space(h.slice(12)) && AUTH()) { html = viewEnroll(space(h.slice(12))); after = bindEnroll; }
  else if (h === 'profil' && AUTH() && AUTH().user()) { html = viewProfil(); after = bindProfil; }
  else if (h === 'admin' && AUTH()) { html = viewAdmin(); after = bindAdmin; }
  else if (h.startsWith('certificat-') && AUTH()) { const n = h.slice(11); html = viewCert(n); after = () => bindCert(n); }
  else if (h === 'verifier' || h.startsWith('verifier-')) { const n = h.slice(9); html = viewVerify(n); after = () => bindVerify(n); }
  else if (h === 'suggestion') { html = viewSuggest(); after = bindSuggest; }
  else if (h === 'contact') { html = viewContact(); after = bindContact; }
  else if (PAGES[h]) html = viewPage(h);
  else { html = viewHome(); after = bindHeroVideo; }
  V.innerHTML = html;
  V.classList.remove('enter', 'leave'); void V.offsetWidth; if (V.firstElementChild && !V.querySelector('.home-hero')) V.classList.add('enter');
  revealAll();
  document.body.classList.toggle('reading', h.startsWith('l-') && keep);
  document.querySelectorAll('.quick a').forEach(a => { const on = a.getAttribute('href') === '#' + h || (h === 'accueil' && a.getAttribute('href') === '#accueil') || (h.startsWith('verifier') && a.getAttribute('href') === '#verifier');
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  if (after) after();
  checkArVoice();
  if (keep) {
    const saved = state.last && state.last.route === h ? state.last.y : 0;
    window.scrollTo(0, saved || 0);
    state.last = { route: h, y: saved || 0 }; save('last');
  } else window.scrollTo(0, 0);
}
function bindContact() {
  const f = document.getElementById('contact-form'), msg = document.getElementById('contact-msg');
  f.addEventListener('submit', e => {
    e.preventDefault();
    if (f.elements['bot-field'] && f.elements['bot-field'].value) return;
    const x = { nom: f.elements.nom.value.trim(), email: f.elements.email.value.trim(), sujet: f.elements.sujet.value, message: f.elements.message.value.trim() };
    msg.textContent = 'Envoi en cours…';
    const send = AUTH() && AUTH().sendMessage ? AUTH().sendMessage(x)
      : (() => { const data = new URLSearchParams(new FormData(f)); data.append('form-name', 'contact');
        return fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data.toString() }).then(r => { if (!r.ok) throw new Error(r.status); }); })();
    send.then(() => { f.reset(); msg.textContent = 'Merci ! Votre message a bien été envoyé. Nous vous répondrons dès que possible.'; })
      .catch(() => { msg.textContent = 'L’envoi n’a pas abouti. Vérifiez votre connexion internet et réessayez.'; });
  });
}

function afterLesson() {
  const db = document.querySelector('[data-done]');
  if (db) {
    doneBtnState(db); startLessonClock(); }
  document.querySelectorAll('[data-wcount]').forEach(updateWordCount);
  const ns = document.getElementById('nom-sel');
  if (ns) {
    const R = {
      mar: "<b>KOUASSI</b>. Le père peut demander d'y ajouter le nom de la mère : <b>KOUASSI TRAORÉ</b> (article 2).",
      m1: "<b>TRAORÉ</b>, le nom du seul parent à l'égard duquel la filiation est établie (article 3).",
      p1: "<b>KOUASSI</b>, le nom du seul parent à l'égard duquel la filiation est établie (article 3).",
      both: "<b>KOUASSI</b> : quand la filiation est établie en même temps à l'égard des deux parents, l'enfant prend le nom du père (article 3).",
      mp: "<b>TRAORÉ KOUASSI</b> : le nom du père s'ajoute après celui de la mère, sans son accord. Avec le <b>consentement de la mère</b>, l'enfant peut porter <b>KOUASSI</b> seul ou <b>KOUASSI TRAORÉ</b> (article 3 al. 3).",
      adp: "<b>KOUASSI</b>, à condition que le père ait informé son épouse de la reconnaissance par acte de commissaire de justice. Sans cette information, la reconnaissance est <b>nulle</b> (article 22 de la loi sur la filiation).",
      adm: "Le nom du <b>mari</b> de la mère, présumé père. L'amant ne peut reconnaître l'enfant et lui donner son nom qu'après le <b>désaveu</b> par le mari (article 22 al. 2).",
      inc: "Un nom attribué par l'<b>officier de l'état civil</b>, en accord avec l'établissement qui a recueilli l'enfant.",
    };
    const f = () => { document.getElementById('nom-res').innerHTML = R[ns.value]; };
    ns.addEventListener('change', f); f();
  }
  const ms = document.getElementById('min-sel');
  if (ms) {
    const Y = '<b style="color:var(--good)">Oui.</b> ', N = '<b style="color:var(--bad)">Non.</b> ', P = '<b style="color:var(--saffron)">Oui, mais pas seul.</b> ';
    const R = {
      cahier: Y + "C'est un acte de la vie courante, un menu achat.",
      taxi: Y + "Le contrat de transport est un acte de la vie courante.",
      assur: Y + "C'est un acte conservatoire : il évite une perte (article 34).",
      bail: Y + "C'est un acte d'administration, de gestion courante.",
      vente: N + "C'est un acte de disposition. Son représentant ne peut lui-même vendre qu'avec l'autorisation du juge des tutelles ou du conseil de famille.",
      voiture: N + "C'est un acte de disposition, qui engage gravement son patrimoine.",
      testament: N + "Le mineur non émancipé ne peut pas rédiger de testament.",
      reco: Y + "Le mineur peut reconnaître seul son enfant.",
      t17: P + "À partir de 16 ans, il conclut lui-même le contrat, assisté de son représentant légal (article 35).",
      t15: N + "Avant 16 ans, c'est son représentant légal qui conclut le contrat en son nom (article 35).",
      adop: P + "Après 16 ans, son consentement personnel est indispensable : personne ne peut consentir à sa place (article 6 de la loi sur l'adoption).",
      proces: N + "Il n'agit en justice qu'assisté de son représentant légal (article 33).",
    };
    const f = () => { document.getElementById('min-res').innerHTML = R[ms.value]; };
    ms.addEventListener('change', f); f();
  }
  const cb = document.getElementById('cc-birth');
  if (cb) {
    const cd = document.getElementById('cc-death'), out = document.getElementById('cc-res');
    const parse = v => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ''); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null; };
    const fmt = t => new Date(t).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
    const DAY = 864e5;
    const calc = () => {
      const b = parse(cb.value), d = parse(cd.value);
      if (b === null) { out.textContent = 'Saisis une date de naissance.'; return; }
      const start = b - 300 * DAY, end = b - 180 * DAY;
      let html = `Période légale de conception : du <b>${fmt(start)}</b> (300e jour) au <b>${fmt(end)}</b> (180e jour).`;
      if (d !== null) {
        if (d < start) html += `<br>Le père est décédé le ${fmt(d)}, <b>avant</b> le début de la période : l'enfant n'était pas encore conçu à son décès et ne peut pas lui succéder.`;
        else if (d <= end) html += `<br>Le père est décédé le ${fmt(d)}, <b>pendant</b> la période : la conception se situe entre le ${fmt(start)} et le ${fmt(d - DAY)}. L'enfant est considéré comme conçu au décès et peut hériter, à condition de naître vivant.`;
        else if (d < b) html += `<br>Le père est décédé le ${fmt(d)}, <b>après</b> la période : l'enfant était déjà conçu et peut hériter, à condition de naître vivant.`;
        else html += `<br>Le père est décédé après la naissance : l'enfant était déjà né et hérite selon le principe.`;
      }
      out.innerHTML = html;
    };
    cb.addEventListener('input', calc); cd.addEventListener('input', calc); calc();
  }
  const pr = document.getElementById('pr-out');
  if (pr) {
    const ids = ['pr-role', 'pr-ctx', 'pr-task', 'pr-fmt', 'pr-cst'];
    const build = () => { pr.textContent = ids.map(i => document.getElementById(i).value.trim()).filter(Boolean).join('\n\n'); };
    ids.forEach(i => document.getElementById(i).addEventListener('input', build)); build();
    document.getElementById('pr-copy').addEventListener('click', () => {
      const msg = document.getElementById('pr-msg'), txt = pr.textContent;
      const done = () => { msg.textContent = 'Consigne copiée : colle-la dans une conversation avec Claude.'; };
      const fallback = () => { const r = document.createRange(); r.selectNodeContents(pr); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); msg.textContent = 'Le texte est sélectionné : copie-le avec ton appareil.'; };
      try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fallback); else fallback(); } catch (e) { fallback(); }
    });
  }
  const inp = document.getElementById('bin-in');
  if (inp) { const f = () => { let n = Math.max(0, Math.min(1023, parseInt(inp.value, 10) || 0)); const out = n.toString(2); const steps = []; let m = n; if (m === 0) steps.push('0 ÷ 2 = 0, reste 0'); while (m > 0) { steps.push(`${m} ÷ 2 = ${Math.floor(m / 2)}, reste ${m % 2}`); m = Math.floor(m / 2); } document.getElementById('bin-out').textContent = out; document.getElementById('bin-steps').textContent = steps.join(' · ') + ' → restes lus de bas en haut'; }; inp.addEventListener('input', f); f(); }
}
function updateWordCount(p) {
  const key = p.dataset.wcount, list = WORDS[key] || [];
  const k = list.filter(w => state.words[key + ':' + w.word]).length;
  p.textContent = `${k} mot${k > 1 ? 's' : ''} maîtrisé${k > 1 ? 's' : ''} sur ${list.length}`;
}

// ---------- menu ☰
const drawer = document.getElementById('drawer'), scrim = document.getElementById('scrim'), menuBtn = document.getElementById('menu-btn');
function renderDrawer() {
  const A = AUTH(), u = A && A.user();
  const item = (h, icon, t) => `<a href="#${h}"><span aria-hidden="true">${icon}</span>${esc(t)}</a>`;
  drawer.innerHTML = `<div class="dr-head"><img src="logo.png" alt="" width="40" height="40"><div><b>Lisân Campus</b><small>Éditions Lisân</small></div>
      <button type="button" class="dr-close" id="menu-close" aria-label="Fermer le menu">✕</button></div>
    ${A ? (u ? `<a href="#compte" class="dr-user">${u.photoURL ? `<img src="${esc(u.photoURL)}" alt="" width="32" height="32" referrerpolicy="no-referrer">` : '<span aria-hidden="true">👤</span>'}<span>${esc(u.displayName || 'Mon compte')}<small>Mon compte</small></span></a>`
      : `<button type="button" class="dr-login" data-auth="signin">Se connecter avec Google</button>`) : ''}
    <nav aria-label="Menu principal">
      ${item('accueil', '🏠', 'Accueil')}
      <div class="dr-sec">Les espaces</div>
      ${SPACES.map(sp => item('espace-' + sp.id, sp.icon, sp.title)).join('')}
      <div class="dr-sec">Outils</div>
      ${item('glossaire', '🔎', 'Glossaire')}
      ${A ? item('compte', '👤', 'Mon compte') : ''}
      ${A && u && isAdminCached() ? item('admin', '📋', 'Administration') : ''}
      ${item('suggestion', '💡', 'Suggérer une idée')}
      ${item('verifier', '✅', 'Vérifier un certificat')}
      ${item('parametres', '⚙️', 'Paramètres')}
      <div class="dr-sec">Informations</div>
      ${item('apropos', 'ℹ️', 'À propos')}
      ${item('contact', '✉️', 'Contact')}
      ${item('confidentialite', '🔐', 'Confidentialité')}
      ${item('conditions', '📄', 'Conditions d’utilisation')}
      ${item('mentions', '⚖️', 'Mentions légales')}
    </nav>`;
  document.getElementById('menu-close').onclick = closeMenu;
}
function openMenu() { renderDrawer(); drawer.hidden = false; scrim.hidden = false; requestAnimationFrame(() => document.body.classList.add('menu-open')); menuBtn.setAttribute('aria-expanded', 'true'); const f = drawer.querySelector('a, button'); if (f) f.focus(); }
function closeMenu() { if (!drawer || drawer.hidden) return; document.body.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded', 'false'); setTimeout(() => { drawer.hidden = true; scrim.hidden = true; }, 200); }
menuBtn.onclick = () => drawer.hidden ? openMenu() : closeMenu();
scrim.onclick = closeMenu;
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

let navT = null;
function navigate() {
  if (!MOTION || !V.firstElementChild) { route(); return; }
  clearTimeout(navT); V.classList.add('leave');
  navT = setTimeout(() => { try { route(); } finally { V.classList.remove('leave'); } }, 200);
}
window.addEventListener('hashchange', navigate);
// retour depuis une autre page (connexion Google, lien externe) : la page restaurée est réaffichée proprement
window.addEventListener('pageshow', e => { if (e.persisted) { V.classList.remove('leave'); route(); } });
let st = null;
// en-tête, bouton « haut de page » et barre de lecture
const readbar = document.getElementById('readbar'), totop = document.getElementById('totop');
let ticking = false;
function onScroll() {
  ticking = false; const y = window.scrollY, H = document.documentElement.scrollHeight - innerHeight;
  document.body.classList.toggle('scrolled', y > 8);
  if (totop) totop.classList.toggle('on', y > 700);
  if (readbar) readbar.style.transform = `scaleX(${document.body.classList.contains('reading') && H > 0 ? Math.min(1, y / H) : 0})`;
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
window.addEventListener('hashchange', () => requestAnimationFrame(onScroll));
const smooth = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'; } catch (e) { return 'auto'; } };
// apparitions en douceur : sections révélées au défilement, compteurs, images
const MOTION = (() => { try { return !matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return true; } })();
let revealIO = null;
function countUp(el) {
  const n = +el.dataset.count; if (!n || !MOTION) return; const t0 = performance.now(), D = 1400;
  (function f(t) { const k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3); el.textContent = nf(Math.round(n * e)); if (k < 1) requestAnimationFrame(f); })(t0);
}
function revealAll() {
  V.querySelectorAll('img[loading="lazy"]').forEach(im => { const ok = () => im.classList.add('ok'); if (im.complete) ok(); else { im.addEventListener('load', ok, { once: true }); im.addEventListener('error', ok, { once: true }); } });
  if (revealIO) { revealIO.disconnect(); revealIO = null; }
  if (!MOTION || !('IntersectionObserver' in window)) return;
  revealIO = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const el = e.target; el.classList.add('in'); revealIO.unobserve(el);
    el.querySelectorAll('[data-count]').forEach(c => setTimeout(() => countUp(c), parseFloat(getComputedStyle(el).getPropertyValue('--d')) * 1000 || 0)); }),
    { rootMargin: '0px 0px -6% 0px', threshold: .06 });
  const add = (el, i) => { el.classList.add('rv'); el.style.setProperty('--d', (Math.min(i, 7) * .09).toFixed(2) + 's'); revealIO.observe(el); };
  V.querySelectorAll(':scope > .sec-h, :scope > .mine').forEach(el => add(el, 0));
  V.querySelectorAll('.kpis, .spaces, .steps, .books, .subjects, .lessons').forEach(g => { g.classList.add('rvg'); [...g.children].forEach(add); });
  if (document.body.classList.contains('veiled')) V.querySelectorAll('.home-hero ~ .kpis > *').forEach(el => el.style.setProperty('--d', (parseFloat(el.style.getPropertyValue('--d')) + 1.1).toFixed(2) + 's'));
  else V.querySelectorAll('.home-hero ~ .kpis > *').forEach(el => el.style.setProperty('--d', (parseFloat(el.style.getPropertyValue('--d')) + .9).toFixed(2) + 's'));
}
// écran d'ouverture : logo en douceur, puis la page se dévoile
const veil = document.getElementById('veil');
function liftVeil() { if (!veil || veil.classList.contains('out')) return; veil.classList.add('out'); document.body.classList.remove('veiled'); setTimeout(() => veil.remove(), 1000); }
if (veil) {
  let seen = false; try { seen = sessionStorage.getItem('lc-intro') === '1'; sessionStorage.setItem('lc-intro', '1'); } catch (e) {}
  // rechargement : pas d'écran d'ouverture complet, la page revient tout de suite
  try { const n = performance.getEntriesByType('navigation')[0]; if (n && n.type === 'reload') seen = true; } catch (e) {}
  if (!MOTION) veil.remove();
  else if (!seen) document.body.classList.add('veiled');
  else { veil.style.transition = 'opacity .25s ease, visibility .25s ease'; const vi = veil.querySelector('.vl-in'); if (vi) vi.style.animation = 'none'; }
  // le voile se lève quand la page est prête (et les polices chargées), jamais sur une page vide
  const fontsOk = document.fonts && document.fonts.ready ? document.fonts.ready.catch(() => {}) : Promise.resolve();
  const pageOk = new Promise(res => { if (document.body.classList.contains('ready')) res(); else window.addEventListener('lc-ready', res, { once: true }); });
  Promise.all([fontsOk, pageOk]).then(() => setTimeout(liftVeil, seen ? 0 : Math.max(0, 1200 - performance.now())));
  setTimeout(liftVeil, 9000);
}
// confettis : petite fête quand une leçon est terminée ou un quiz réussi
function confetti(from) {
  try { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch (e) {}
  const c = document.createElement('canvas'); c.className = 'confetti'; c.setAttribute('aria-hidden', 'true'); document.body.appendChild(c);
  const dpr = Math.min(2, window.devicePixelRatio || 1), W = innerWidth, H = innerHeight; c.width = W * dpr; c.height = H * dpr; const g = c.getContext('2d'); g.scale(dpr, dpr);
  const r = from && from.getBoundingClientRect ? from.getBoundingClientRect() : { left: W / 2, top: H / 3, width: 0, height: 0 };
  const ox = r.left + r.width / 2, oy = r.top + r.height / 2, cols = ['#23468f', '#c8962e', '#0e6b4f', '#9e2e46', '#5a3fc0', '#f0b24a'];
  const P = Array.from({ length: 90 }, () => ({ x: ox, y: oy, vx: (Math.random() - .5) * 11, vy: -Math.random() * 11 - 3, s: 4 + Math.random() * 5, a: Math.random() * 6, va: (Math.random() - .5) * .4, c: cols[Math.random() * cols.length | 0] }));
  const t0 = performance.now();
  (function frame(t) { const k = (t - t0) / 1400; g.clearRect(0, 0, W, H);
    P.forEach(p => { p.vy += .32; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va; g.save(); g.globalAlpha = Math.max(0, 1 - k); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.c; g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); g.restore(); });
    if (k < 1) requestAnimationFrame(frame); else c.remove(); })(t0);
}
window.addEventListener('scroll', () => { clearTimeout(st); st = setTimeout(() => { if (state.last && location.hash.slice(1) === state.last.route) { state.last.y = Math.round(window.scrollY); save('last'); } }, 300); }, { passive: true });

// ---------- interactions
document.addEventListener('click', e => {
  const t = e.target;
  const back = t.closest('a[href^="#"]');
  if (back && !back.target && !back.hasAttribute('data-reload') && !e.ctrlKey && !e.metaKey && !e.shiftKey && navStack.length > 1
      && decodeURIComponent(back.getAttribute('href').slice(1)) === navStack[navStack.length - 2]) { e.preventDefault(); history.back(); return; }
  const au = t.closest('[data-audio]');
  if (au) { playAudio(JSON.parse(au.dataset.audio), au); return; }
  const sayB = t.closest('[data-say]');
  if (sayB) { speak(sayB.dataset.say, sayB.dataset.lang, sayB.classList.contains('btn') ? sayB : null); return; }
  const tr = t.closest('[data-trad]');
  if (tr) { const box = tr.closest('.dialog'); const on = !box.classList.contains('show-fr'); box.classList.toggle('show-fr', on); tr.setAttribute('aria-pressed', on); return; }
  const setB = t.closest('[data-set]');
  if (setB) { const k = setB.dataset.set; let v = setB.dataset.val; if (k === 'rate') v = +v; state[k] = v; save(k); applyDisplay();
    setB.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === setB)); return; }
  const rs = t.closest('[data-reset]');
  if (rs) { const z = document.getElementById('reset-zone');
    if (rs.dataset.reset === 'ask') z.innerHTML = `<p><b>Effacer toute votre progression sur cet appareil ?</b> Cette action est définitive.</p><button type="button" class="btn bad small" data-reset="yes">Oui, tout effacer</button><button type="button" class="btn ghost small" data-reset="no">Annuler</button>`;
    else if (rs.dataset.reset === 'yes') { ['done', 'quiz', 'known', 'words', 'time'].forEach(k => { state[k] = {}; save(k); }); state.last = null; save('last'); z.innerHTML = '<p class="meta">Votre progression a été effacée.</p>'; }
    else z.innerHTML = '<button type="button" class="btn ghost small" data-reset="ask">Effacer ma progression</button>';
    return; }
  const ins = t.closest('[data-install]');
  if (ins) { installApp(); return; }
  const gs = t.closest('[data-gspace]');
  if (gs) { glossSpace = gs.dataset.gspace; document.querySelectorAll('[data-gspace]').forEach(b => b.setAttribute('aria-pressed', b === gs)); drawGlossary(document.getElementById('gsearch').value); return; }
  const aut = t.closest('[data-auth]');
  if (aut && AUTH()) { closeMenu(); if (aut.dataset.auth === 'signin') AUTH().signIn().then(route, () => {}); else AUTH().signOut().then(() => { location.hash = '#accueil'; route(); }); return; }
  const en = t.closest('[data-enroll]');
  if (en && AUTH()) { location.hash = '#inscription-' + en.dataset.enroll; return; }
  const sto = t.closest('[data-scrollto]');
  if (sto) { const el = document.getElementById(sto.dataset.scrollto); if (el) el.scrollIntoView({ behavior: smooth(), block: 'start' }); return; }
  if (t.closest('#totop')) { window.scrollTo({ top: 0, behavior: smooth() }); return; }
  const cpy = t.closest('[data-copy]');
  if (cpy) { const pre = cpy.closest('.pbox').querySelector('.pb-t'), txt = pre.textContent;
    const ok = () => { cpy.textContent = '✓ Copié'; setTimeout(() => { cpy.textContent = 'Copier'; }, 1800); };
    const fb = () => { const r = document.createRange(); r.selectNodeContents(pre); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); cpy.textContent = 'Texte sélectionné'; };
    try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, fb); else fb(); } catch (err) { fb(); }
    return; }
  const rel = t.closest('[data-reload]');
  if (rel && rel.getAttribute('href') === location.hash) { e.preventDefault(); route(); return; }
  const nx = t.closest('[data-next].is-locked');
  if (nx) { e.preventDefault(); const b = document.querySelector('[data-done]'), m = document.getElementById('done-msg');
    if (m) m.textContent = 'Terminez d’abord cette leçon (bouton « Marquer comme terminée ») : les leçons se suivent dans l’ordre.';
    if (b) { b.scrollIntoView({ block: 'center', behavior: 'smooth' }); b.classList.remove('nudge'); void b.offsetWidth; b.classList.add('nudge'); } return; }
  const dt = t.closest('[data-done]');
  if (dt) { const k = dt.dataset.done, need = +dt.dataset.need || 0, left = need - (state.time[k] || 0), m = document.getElementById('done-msg');
    if (!state.done[k] && left > 0) {
      if (m) m.textContent = `Prenez le temps d’étudier la leçon jusqu’au bout : le temps demandé correspond à la durée de son écoute, et il reste environ ${fmtLeft(left)}. Le temps n’avance que lorsque la leçon est ouverte à l’écran et que vous la lisez ou l’écoutez ; il s’arrête dès que vous quittez la page et reprend à votre retour.`;
      dt.classList.remove('nudge'); void dt.offsetWidth; dt.classList.add('nudge'); return; }
    if (state.done[k]) { if (m) m.textContent = 'Cette leçon est terminée : elle reste ouverte pour la relire quand vous voulez.'; return; }
    state.done[k] = 1; save('done'); if (m) m.textContent = '';
    doneBtnState(dt); const nb = document.querySelector('[data-next]'); if (nb) nb.classList.toggle('is-locked', !state.done[k]);
    if (state.done[k]) confetti(dt); return; }
  const mk = t.closest('.mark');
  if (mk) { const card = mk.closest('.word'), id = card.dataset.wid; if (state.words[id]) delete state.words[id]; else state.words[id] = 1; save('words');
    const m = !!state.words[id]; card.classList.toggle('mastered', m); mk.setAttribute('aria-pressed', m); mk.textContent = m ? '✓ Maîtrisé' : 'Maîtrisé ?';
    const p = card.parentElement.previousElementSibling; if (p && p.dataset.wcount) updateWordCount(p); return; }
  const opt = t.closest('.opt');
  if (opt && quizRun) { const box = opt.closest('.q'), n = +box.dataset.q, q = quizRun.qs[n];
    box.querySelectorAll('.opt').forEach(b => { b.disabled = true; if (+b.dataset.k === q.c) b.classList.add('right'); });
    const ok = +opt.dataset.k === q.c; if (!ok) opt.classList.add('wrong');
    box.querySelector('.expl').hidden = false; box.classList.add('done-q'); quizRun.answered++; if (ok) quizRun.right++;
    const sc = document.getElementById('score'); sc.textContent = `${quizRun.right} / ${quizRun.qs.length}`;
    const qb = document.getElementById('qbar'); if (qb) qb.style.width = (quizRun.answered / quizRun.qs.length * 100) + '%';
    const N = quizRun.qs.length, rp = Math.round(quizRun.right / N * 100), rg = document.getElementById('qs-ring');
    if (rg) { rg.style.setProperty('--p', rp); rg.textContent = rp + ' %'; document.getElementById('qs-t').textContent = `${quizRun.answered} / ${N} questions`;
      document.getElementById('qs-m').textContent = `${quizRun.right} bonne${quizRun.right > 1 ? 's' : ''} réponse${quizRun.right > 1 ? 's' : ''}`; document.getElementById('qs-bar').style.width = (quizRun.answered / N * 100) + '%'; }
    if (quizRun.answered === quizRun.qs.length) { const pct = Math.round(quizRun.right / quizRun.qs.length * 100);
      if (state.quiz[quizRun.s.id] === undefined || pct > state.quiz[quizRun.s.id]) { state.quiz[quizRun.s.id] = pct; save('quiz'); }
      sc.textContent = `Score final : ${quizRun.right} / ${quizRun.qs.length} (${pct} %)`; document.getElementById('quiz-end').hidden = false;
      const qr = document.getElementById('qresult');
      if (qr) { qr.innerHTML = `<span class="ring" style="--p:${pct}">${pct} %</span><div><h2>${pct >= 70 ? (pct === 100 ? 'Parfait, sans faute !' : 'Quiz réussi, bravo !') : 'Continuez, vous progressez !'}</h2><p>${quizRun.right} bonne${quizRun.right > 1 ? 's' : ''} réponse${quizRun.right > 1 ? 's' : ''} sur ${quizRun.qs.length}. ${pct >= 70 ? 'Vous atteignez le seuil de 70 % du certificat.' : 'Relisez les leçons puis recommencez : il faut 70 % pour réussir le parcours, obtenir le certificat et ouvrir le parcours suivant.'}</p>${(() => {
          const ss = spaceSubjects(quizRun.s), nx = ss[ss.indexOf(quizRun.s) + 1];
          return pct >= 70 && nx && subjectOpen(nx) ? `<p class="unlock">🔓 Le parcours suivant est ouvert : <b>${esc(nx.title)}</b></p><a class="btn small" href="#l-${nx.id}.${nx.lessons[0].id}">Commencer « ${esc(nx.title)} » →</a>` : ''; })()}</div>`;
        qr.hidden = false; qr.scrollIntoView({ behavior: smooth(), block: 'center' }); }
      if (pct >= 70) confetti();
      if (AUTH() && parcoursStatus(quizRun.s).ok) document.getElementById('quiz-cert').hidden = false; }
    return; }
  if (t.closest('#cardface') && flashRun) { flashRun.flipped = !flashRun.flipped; flashRun.anim = 'show'; drawFlash(); return; }
  const fb = t.closest('[data-flash]');
  if (fb && flashRun) { const idx = flashRun.deck[flashRun.pos], key = flashRun.s.id + ':' + idx;
    if (fb.dataset.flash === '1') state.known[key] = 1; else delete state.known[key]; save('known');
    flashRun.pos++; flashRun.flipped = false; flashRun.anim = 'next'; drawFlash(); return; }
});
document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.id === 'cardface') { e.preventDefault(); flashRun.flipped = !flashRun.flipped; flashRun.anim = 'show'; drawFlash(); const c = document.getElementById('cardface'); if (c) c.focus(); } });

// ---------- installation de l'application
let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; const b = document.getElementById('install-btn'); if (b) b.hidden = false; });
window.addEventListener('appinstalled', () => { deferredInstall = null; const b = document.getElementById('install-btn'); if (b) b.hidden = true; });
function installApp() {
  const msg = document.getElementById('install-msg');
  const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (standalone) { if (msg) msg.textContent = 'Lisân Campus est déjà installé sur cet appareil.'; return; }
  if (deferredInstall) { deferredInstall.prompt(); deferredInstall.userChoice.finally(() => { deferredInstall = null; }); return; }
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const t = ios ? 'Sur iPhone : touchez le bouton Partager de Safari, puis « Sur l’écran d’accueil ».' : 'Ouvrez le menu ⋮ de Chrome, puis « Installer l’application » (ou « Ajouter à l’écran d’accueil »).';
  if (msg) msg.textContent = t; else alertInline(t);
}
function alertInline(t) { const n = document.getElementById('ios-help'); if (n) { n.querySelector('.notice').textContent = t; n.hidden = false; } }

// ---------- démarrage
applyDisplay();
if (!synth) setTimeout(showNoVoice, 0);
// La page s'affiche tout de suite ; on n'attend la connexion Google que si l'élève était connecté
// lors de sa dernière visite (au plus 7 secondes), pour ne pas lui montrer des leçons verrouillées.
let booted = false;
// Rechargement (tirer vers le bas, bouton Actualiser) : on revient sur la page et à l'endroit où l'on était,
// même si le téléphone recharge l'adresse de départ de l'application sans l'ancre de la page.
const isReload = (() => { try { const n = performance.getEntriesByType('navigation')[0]; return n ? n.type === 'reload' : performance.navigation.type === 1; } catch (e) { return false; } })();
// La page en cours et la position sont gardées sur l'appareil (localStorage, car certains téléphones rechargent
// l'application dans une nouvelle session) ; elles sont rétablies si l'on recharge ou rouvre dans les 30 minutes.
const PLACE_TTL = 30 * 60 * 1000;
const keepPlace = () => { try { if (location.hash) localStorage.setItem('lc.place', JSON.stringify({ h: location.hash, y: Math.round(scrollY), t: Date.now() })); } catch (e) {} };
window.addEventListener('pagehide', keepPlace);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') keepPlace(); });
window.addEventListener('hashchange', () => setTimeout(keepPlace, 400));
let placeTimer = null; window.addEventListener('scroll', () => { clearTimeout(placeTimer); placeTimer = setTimeout(keepPlace, 800); }, { passive: true });
function restorePlace() {
  let P = null; try { P = JSON.parse(localStorage.getItem('lc.place') || 'null'); } catch (e) {}
  if (!P || !P.h || Date.now() - (P.t || 0) > PLACE_TTL) return null;
  const here = location.hash;
  // rechargement ou réouverture sans page précise (adresse de départ) : on revient où l'on était
  if ((!here || (here === '#accueil' && isReload)) && P.h !== here) history.replaceState(null, '', P.h);
  return P.h === location.hash ? P.y : null;
}
function boot() { if (booted) return; booted = true; const y = restorePlace(); route(); document.body.classList.add('ready'); window.dispatchEvent(new Event('lc-ready'));
  if (y && !location.hash.startsWith('#l-')) setTimeout(() => scrollTo(0, y), 60); }
const LA = window.LisanAuth;
if (LA && LA.ready) {
  if (!LA.likely) boot();
  LA.ready.then(() => { if (!booted) boot(); else if (LA.user()) route(); }, boot);
  setTimeout(boot, 7000);
} else boot();
