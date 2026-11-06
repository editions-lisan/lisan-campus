// Produit site/data/romans.js (M_LIT : le roman « The Missing Will ») et ses mini-exercices dans site/data/mini.js
const fs = require('fs'), path = require('path');
const PARTS = [1, 2, 3].map(i => require('./novel1_p' + i + '.js'));
// guillemets et apostrophes typographiques dans les textes anglais
const typo = t => t.replace(/(^|[\s(—])"/g, '$1“').replace(/"/g, '”').replace(/(\w)'(\w)/g, '$1’$2').replace(/(\s)'/g, '$1‘').replace(/'/g, '’');
PARTS.forEach(p => p.chapters.forEach(c => {
  c.title = typo(c.title);
  c.paras = c.paras.map(([en, fr]) => [typo(en), fr]);
  c.vocab = c.vocab.map(([e, w, fr, ex]) => [e, typo(w), fr, typo(ex)]);
  c.corner = c.corner.map(([x, fr, n]) => [typo(x), fr, typo(n)]);
  c.questions = c.questions.map(([q, en, fr]) => [typo(q), typo(en), fr]);
}));
const SITE = path.join(__dirname, '../../site/');
// durées réelles des enregistrements, s'ils existent déjà
const AUDIO = (() => { try { const w = {}; new Function('window', fs.readFileSync(SITE + 'data/audio.js', 'utf8'))(w); return w.AUDIO || {}; } catch (e) { return {}; } })();
const words = t => t.split(/\s+/).filter(w => /\p{L}/u.test(w)).length;
const NUM = { Prologue: 'Prologue', Epilogue: 'Épilogue' };
const shortTitle = c => { const [l, n] = c.title.split(': '); const m = l.match(/^Chapter (\w+)/); const k = m ? ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'].indexOf(m[1]) + 1 : 0; return { label: m ? 'Chapitre ' + k : NUM[l], name: n }; };

const intro = { id: 'intro', title: 'Before you read · Avant de lire', body: [
  { illus: 'romans/will', cap: 'The Missing Will · Legal Stories from Abidjan, Book One' },
  { p: "**The Missing Will** (*Le testament introuvable*) est un roman juridique en anglais, écrit pour apprendre la langue du droit en suivant une véritable histoire. C’est le premier livre de la série **Legal Stories from Abidjan** des Éditions Lisân." },
  { p: "Bouaké, saison des pluies. Konan Yao, planteur de cacao, meurt brutalement. Son neveu Gervais réclame la maison et les plantations au nom de la coutume, et donne un mois à la veuve, Akissi, pour partir. Mais Akissi est enceinte, et Konan, qui ne savait pas lire, a un jour poussé la porte bleue d’un notaire… À Abidjan, **Moussa Diarra**, étudiant en première année de droit, commence son stage au cabinet **Kouassi & Traoré** le jour où Akissi y entre." },
  { p: "Le roman suit l’affaire du premier rendez-vous au jugement : coutume et loi, enfant conçu, testament authentique, preuve, procès. Les personnages, le cabinet et les décisions sont **fictifs**." },
  { h: 'Les trois parties' },
  { ul: PARTS.map(p => `**${p.title} · ${p.name}** (${p.fr}) : ${p.chapters.map(c => shortTitle(c).name).join(', ')}.`) },
  { h: 'Les personnages' },
  { ul: [
    '**Moussa Diarra**, 19 ans, étudiant en licence 1 de droit et stagiaire au cabinet ; il note tout dans son carnet.',
    '**Maître Aïcha Traoré**, avocate au barreau d’Abidjan : les faits, les dates, les preuves.',
    '**Maître Paul Kouassi**, associé principal, une tasse de thé et une maxime latine pour chaque occasion.',
    '**Akissi Yao**, institutrice à Bouaké, veuve de **Konan Yao**, planteur de cacao.',
    '**Gervais Yao**, neveu de Konan, propriétaire de deux minibus, et sa mère **Nanan Ahou**, sœur aînée de Konan.',
    '**M. Ernest Kouamé**, directeur d’école à la retraite, meilleur ami de Konan ; **Maître Dosso**, notaire à Bouaké.',
  ] },
  { h: 'Comment lire un chapitre' },
  { ol: [
    '**Écoute les mots clés** (Words to know) : touche chaque mot pour l’entendre avec sa phrase d’exemple.',
    '**Écoute le chapitre** en suivant le texte, sans t’arrêter sur chaque mot inconnu.',
    '**Relis** : touche un paragraphe pour le réentendre ; le bouton **Traduction** affiche le texte français sous chaque paragraphe.',
    '**Language corner** : les expressions juridiques du chapitre, les faux amis et les nuances.',
    '**Did you understand?** Réponds par écrit en anglais, puis ouvre le corrigé.',
    'Termine par le **mini-exercice** : trois bonnes réponses ouvrent le chapitre suivant.',
  ] },
  { box: "Le roman complet, illustré, avec le lexique et les questions de lecture, se lit et se télécharge dans la **Bibliothèque** de l’espace Droit (« The Missing Will », PDF).", title: 'Le livre', kind: 'cle' },
  { box: "Niveau visé : **B1** (intermédiaire). Orthographe **américaine** (*defense*, *honor*), avec les variantes britanniques signalées dans le Language corner.", title: 'Niveau', kind: 'marge' },
] };

const lessons = [intro];
PARTS.forEach(p => p.chapters.forEach((c, ci) => {
  const body = [], { label, name } = shortTitle(c);
  if (ci === 0) body.push({ illus: 'romans/' + p.illus, cap: `${p.title} · ${p.name} (${p.fr})` });
  else body.push({ illus: 'romans/v_' + c.id, cap: '' });
  body.push({ p: `*${label}.* ${c.intro}` });
  const t = c.paras.map(x => x[0]).join(' '), rec = AUDIO['lit/' + c.id + '#c'], mins = Math.max(1, Math.round((rec ? rec.d : words(t) * 0.42) / 60));
  body.push({ listen: t, label: `Écouter le chapitre · ${mins} min` });
  body.push({ h: 'Words to know' }, { envocab: c.vocab });
  body.push({ h: 'The story' }, { enstory: c.paras });
  body.push({ h: 'Language corner' }, { ul: c.corner.map(([x, fr, n]) => `${x} : ${fr}. ${n}`) });
  body.push({ h: 'Did you understand?' });
  c.questions.forEach(([q, en, fr], k) => body.push({ p: `**${k + 1}.** ${q}` }, { corrige: [{ p: en }, { p: `*${fr}*` }] }));
  lessons.push({ id: c.id, title: `${label} · ${name}`, body });
}));

const quiz = [
  { q: 'Where does Moussa do his internship?', a: ['At the law firm Kouassi & Traoré', 'At the court of Bouaké', 'At Maître Dosso’s office', 'At the hospital of Bouaké'], c: 0, e: 'A small firm in the Plateau district of Abidjan.' },
  { q: 'What did Konan Yao grow?', a: ['Cocoa', 'Coffee', 'Rice', 'Cotton'], c: 0, e: 'Two cocoa plantations near Bouaké.' },
  { q: 'Why does Gervais say the house is his?', a: ['By custom, the nephew inherits', 'He bought it', 'Konan gave it to him before he died', 'He lived in it'], c: 0, e: 'A man’s land goes to the son of his sister.' },
  { q: 'What important fact does Moussa discover on his first day?', a: ['Akissi is pregnant', 'Konan had a second wife', 'The house was sold', 'Gervais is a lawyer'], c: 0, e: 'Four months pregnant.' },
  { q: 'Since the reforms of 1964, inheritance is decided by…', a: ['the law', 'custom', 'the family council', 'the eldest son'], c: 0, e: 'Today, the law of 2019 on successions.' },
  { q: '« Infans conceptus pro nato habetur » means that…', a: ['a conceived child is treated as born when it is in its interest', 'a child cannot inherit before 18', 'only boys can inherit', 'the father chooses the heirs'], c: 0, e: 'On one condition: the child must be born alive.' },
  { q: 'The date of conception is placed between…', a: ['the 300th and the 180th day before birth', 'the 100th and the 50th day before birth', 'the wedding and the birth', 'the 9th and the 6th month after the death'], c: 0, e: 'Une présomption légale.' },
  { q: 'Who went with Konan to the notary?', a: ['Mr. Kouamé and Mrs. Gbané', 'Akissi and Gervais', 'Nanan Ahou and Dr. Fofana', 'Maître Traoré and Moussa'], c: 0, e: 'The two witnesses.' },
  { q: 'How was Konan’s will made, since he could not read?', a: ['He dictated it, the notary wrote it and read it back, before two witnesses', 'Akissi wrote it for him', 'He recorded a video', 'He signed a blank page'], c: 0, e: 'An authentic will.' },
  { q: 'Who keeps the original of an authentic will?', a: ['The notary', 'The widow', 'The court', 'The nephew'], c: 0, e: 'The parties receive certified copies.' },
  { q: 'What does the will leave to Akissi?', a: ['The house in Bouaké', 'The two plantations', 'The field by the river', 'Nothing'], c: 0, e: 'I leave my house in Bouaké to my wife.' },
  { q: 'To whom does Konan leave his plantations?', a: ['To his children, born or to be born', 'To Gervais', 'To Nanan Ahou', 'To Mr. Kouamé'], c: 0, e: 'In equal shares.' },
  { q: 'What does Gervais receive under the will?', a: ['The field by the river', 'The house', 'One plantation', 'Nothing at all'], c: 0, e: 'So that he remembers the days when they fished there.' },
  { q: 'In his lawsuit, Gervais finally argues that…', a: ['his uncle was not of sound mind', 'the notary was not a real notary', 'Akissi was not married', 'the will was too old'], c: 0, e: 'A forgery is too difficult to prove.' },
  { q: '« Actori incumbit probatio » means…', a: ['the one who makes a claim must prove it', 'the judge must prove everything', 'the defendant must prove his innocence', 'the witnesses must prove the facts'], c: 0, e: 'Gervais must prove his uncle was not of sound mind.' },
  { q: 'What did Dr. Fofana write one week before the will?', a: ['Fully conscious, asks many questions', 'Confused and very tired', 'In a coma', 'Unable to speak'], c: 0, e: 'Ill, but clear.' },
  { q: 'Why does Mrs. Gbané’s testimony convince the court?', a: ['Konan corrected the notary while he was reading', 'She is Konan’s sister', 'She wrote the will herself', 'She saw Gervais lie'], c: 0, e: 'The field by the river, not the field near the road.' },
  { q: 'What does Maître Traoré do with the threatening message?', a: ['She keeps a photo, the number and the time, and tells the judge and the police', 'She deletes it', 'She answers it', 'She sends it to Gervais’s mother'], c: 0, e: 'Pressure on witnesses is an offense.' },
  { q: '« The case is reserved for judgment » means…', a: ['l’affaire est mise en délibéré', 'l’affaire est classée', 'l’affaire est renvoyée', 'l’affaire est jugée sur-le-champ'], c: 0, e: 'Decision on the twentieth of October.' },
  { q: 'What did the court decide?', a: ['The will is valid and Gervais’s claim is rejected', 'The will is a forgery', 'Gervais inherits everything', 'The plantations are sold'], c: 0, e: 'And Gervais pays the costs.' },
  { q: '« For these reasons » (par ces motifs) introduces…', a: ['the decision of the court', 'the facts of the case', 'the claimant’s argument', 'the list of witnesses'], c: 0, e: 'Le dispositif du jugement.' },
  { q: '« The costs » that the losing party pays are…', a: ['les dépens', 'les dettes', 'les impôts', 'les honoraires du notaire'], c: 0, e: 'The claimant must pay the costs.' },
  { q: 'How long does Gervais have to appeal?', a: ['One month', 'One week', 'Six months', 'One year'], c: 0, e: 'He finally decides not to appeal.' },
  { q: 'Why is the baby called Espérance?', a: ['Her father hoped for her before she existed', 'It was Nanan Ahou’s name', 'The judge chose it', 'It was the name of the plantation'], c: 0, e: 'Born or to be born.' },
  { q: 'What does Akissi propose to Gervais?', a: ['To work the cocoa plantations with a written contract', 'To leave Bouaké', 'To sell her the field', 'To pay his debts'], c: 0, e: 'For a fair salary.' },
  { q: '« A summons » is…', a: ['une assignation', 'un sommaire', 'une sommation de payer', 'un jugement'], c: 0, e: 'It was a summons to appear in court.' },
  { q: '« The claimant » is…', a: ['le demandeur', 'le défendeur', 'le témoin', 'le greffier'], c: 0, e: 'Gervais is the claimant.' },
  { q: '« An audience » is a false friend. It means…', a: ['un public', 'une audience au tribunal', 'une assignation', 'un entretien'], c: 0, e: 'Une audience = *a hearing*.' },
  { q: '« To draft » a contract means…', a: ['le rédiger', 'le signer', 'l’annuler', 'le traduire'], c: 0, e: 'I will draft it myself.' },
  { q: 'According to Professor Kouadio, the right question is…', a: ['who exists for the law, and from when', 'who is the richest heir', 'what custom says', 'how long a trial lasts'], c: 0, e: 'Moussa asked if the baby existed.' },
];
const cards = [];
PARTS.forEach(p => p.chapters.forEach(c => c.vocab.forEach(([e, w, fr]) => { if (!cards.some(k => k[0] === w)) cards.push([w, fr]); })));

const M = { id: 'lit', title: 'Roman juridique en anglais', subtitle: 'The Missing Will : un roman illustré à lire et à écouter (succession, testament, procès)', color: 'i', noLessonVoice: true, lessons, quiz, cards };
fs.writeFileSync(SITE + 'data/romans.js', '// Legal Stories from Abidjan, Book One : « The Missing Will », roman juridique en anglais (Éditions Lisân). Généré par outils/romans/build_site.js à partir de outils/romans/novel1_p*.js.\nconst M_LIT = ' + JSON.stringify(M) + ';\n');

const mini = { 'lit/intro': [
  { q: 'Who is Moussa Diarra?', a: ['A first-year law student and intern', 'A judge in Bouaké', 'A notary'], c: 0, e: 'Il est stagiaire au cabinet Kouassi & Traoré.' },
  { q: 'Qui est Akissi Yao ?', a: ['La veuve de Konan Yao, institutrice à Bouaké', 'L’avocate du cabinet', 'La sœur de Gervais'], c: 0, e: 'Son mari, planteur de cacao, vient de mourir.' },
  { q: 'Le bouton « Traduction » affiche…', a: ['le texte français sous chaque paragraphe', 'un dictionnaire', 'les réponses du mini-exercice'], c: 0, e: 'Lis d’abord en anglais, puis vérifie.' },
  { q: 'Que réclame Gervais au nom de la coutume ?', a: ['La maison et les plantations de son oncle', 'Le cabinet d’avocats', 'Une voiture'], c: 0, e: 'Il donne un mois à Akissi pour partir.' },
] };
PARTS.forEach(p => p.chapters.forEach(c => { mini['lit/' + c.id] = c.mini.map(m => ({ ...m, q: typo(m.q), a: m.a.map(typo), e: typo(m.e) })); }));
let m = fs.readFileSync(SITE + 'data/mini.js', 'utf8');
const MARK = '\n// Romans juridiques en anglais\n';
if (m.includes(MARK)) m = m.slice(0, m.indexOf(MARK));
fs.writeFileSync(SITE + 'data/mini.js', m.trimEnd() + '\n' + MARK + 'Object.assign(window.MINI, ' + JSON.stringify(mini) + ');\n');
console.log(lessons.length, 'leçons', quiz.length, 'questions', cards.length, 'cartes', Object.keys(mini).length, 'mini');
