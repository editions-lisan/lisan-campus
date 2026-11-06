// Produit site/data/romans.js (M_LIT) et les mini-exercices des romans
const fs = require('fs');
const NOVELS = require('./r1.js').concat(require('./r2.js'));
// guillemets et apostrophes typographiques dans les textes anglais
const typo = t => t.replace(/(^|[\s(—])"/g, '$1“').replace(/"/g, '”').replace(/(\w)'(\w)/g, '$1’$2').replace(/(\s)'/g, '$1‘').replace(/'/g, '’');
NOVELS.forEach(n => n.chapters.forEach(c => {
  c.story1 = c.story1.map(([en, fr]) => [typo(en), fr]); c.story2 = c.story2.map(([en, fr]) => [typo(en), fr]);
  c.dialog.lines = c.dialog.lines.map(([w, col, en, fr]) => [typo(w), col, typo(en), fr]);
  c.vocab = c.vocab.map(([e, w, fr, ex]) => [e, typo(w), fr, typo(ex)]);
  c.questions = c.questions.map(([q, en, fr]) => [typo(q), typo(en), fr]);
}));
const SITE = '/home/claude/lisan-campus/site/';
const roman = ['I', 'II', 'III', 'IV'];
// durées réelles des enregistrements, s'ils existent déjà
const AUDIO = (() => { try { const w = {}; new Function('window', fs.readFileSync(SITE + 'data/audio.js', 'utf8'))(w); return w.AUDIO || {}; } catch (e) { return {}; } })();
const fullText = c => [...c.story1.map(p => p[0]), ...c.dialog.lines.map(l => l[2]), ...c.story2.map(p => p[0])].join(' ');
const words = t => t.split(/\s+/).filter(w => /\p{L}/u.test(w)).length;

const intro = { id: 'intro', title: 'Before you read · Avant de lire', body: [
  { p: "Quatre courts romans juridiques en anglais, pour apprendre l’anglais du droit en lisant de vraies histoires. Chaque roman suit une affaire du cabinet **Kouassi & Traoré**, à Abidjan, à travers les yeux de **Moussa Diarra**, étudiant en première année de droit, stagiaire le samedi et pendant les vacances." },
  { p: "Les affaires reprennent les matières de la licence 1 : les personnes et les successions, le bail, la procédure pénale et les contrats. Les histoires, les personnages, les entreprises et les décisions sont **fictifs**." },
  { h: 'Les quatre romans' },
  { table: { h: ['Roman', 'Titre français', 'Thème juridique'], r: NOVELS.map((n, i) => [`**${roman[i]}. ${n.title}**`, n.fr, n.theme]) } },
  { h: 'Les personnages' },
  { table: { h: ['Personnage', 'Qui est-ce ?'], r: [
    ['**Moussa Diarra**', '19 ans, étudiant en licence 1 de droit, stagiaire au cabinet. Il note dans son carnet une leçon à la fin de chaque affaire.'],
    ['**Maître Aïcha Traoré**', '34 ans, avocate au barreau d’Abidjan. Exigeante et calme, elle répète qu’un avocat ne crie pas : il apporte des preuves.'],
    ['**Maître Paul Kouassi**', '58 ans, associé principal du cabinet. Il aime les maximes latines et les arrangements amiables.'],
  ] } },
  { h: 'Comment lire un chapitre' },
  { ol: [
    '**Écoute les mots clés** (Words to know) : touche chaque mot pour l’entendre avec sa phrase d’exemple.',
    '**Écoute le chapitre** en suivant le texte, sans t’arrêter sur chaque mot inconnu.',
    '**Relis** : touche une phrase pour la réentendre ; le bouton **Traduction** affiche le texte français sous chaque paragraphe.',
    '**Le dialogue** est joué par plusieurs voix ; écoute-le, puis répète les répliques à voix haute.',
    '**Language corner** : les expressions juridiques du chapitre, les faux amis et les nuances.',
    '**Did you understand?** Réponds par écrit en anglais, puis ouvre le corrigé.',
    'Termine par le **mini-exercice** : trois bonnes réponses ouvrent le chapitre suivant.',
  ] },
  { box: "Niveau visé : **B1** (intermédiaire). Prononciation et orthographe **américaines** (*color*, *Your Honor*), avec les variantes britanniques signalées dans le Language corner.", title: 'Niveau', kind: 'marge' },
] };

const lessons = [intro];
NOVELS.forEach((n, ni) => n.chapters.forEach((c, ci) => {
  const body = [];
  if (ci === 0) body.push({ illus: n.cover, cap: `${n.title} · ${n.fr}` });
  body.push({ p: (ci === 0 ? `**Roman ${roman[ni]} · ${n.fr}.** ${n.pitch} ` : '') + `*Chapitre ${ci + 1}.* ${c.intro}` });
  const t = fullText(c), rec = AUDIO['lit/' + c.id + '#c'], mins = Math.max(1, Math.round((rec ? rec.d : words(t) * 0.42) / 60));
  body.push({ listen: t, label: `Écouter le chapitre · ${mins} min` });
  body.push({ h: 'Words to know' }, { envocab: c.vocab });
  body.push({ h: 'The story' }, { enstory: c.story1 }, { endialog: c.dialog }, { enstory: c.story2 });
  body.push({ h: 'Language corner' }, { table: { h: ['Expression', 'Français', 'Remarque'], r: c.corner } });
  body.push({ h: 'Did you understand?' });
  c.questions.forEach(([q, en, fr], k) => body.push({ p: `**${k + 1}.** ${q}` }, { corrige: [{ p: en }, { p: `*${fr}*` }] }));
  lessons.push({ id: c.id, title: `${n.title} · ${ci + 1}. ${c.title}`, body });
}));

const quiz = [
  { q: 'Where does Moussa do his internship?', a: ['At the law firm Kouassi & Traoré', 'At the commercial court', 'At a notary’s office in Bouaké', 'At a police station'], c: 0, e: 'A small law firm in the Plateau district.' },
  { q: '« Infans conceptus pro nato habetur » means that…', a: ['a conceived child is treated as born when it is in its interest', 'a child cannot inherit before the age of 18', 'only married children can inherit', 'the father chooses the heirs'], c: 0, e: 'The child must be born alive.' },
  { q: 'Who keeps the original of an authentic will?', a: ['The notary', 'The widow', 'The court', 'The eldest son'], c: 0, e: 'The heirs receive a certified copy.' },
  { q: 'In The Missing Will, what did the court decide?', a: ['The will was valid', 'The will was a forgery', 'Gervais inherited everything', 'The case was sent to the notary'], c: 0, e: 'Mr. Yao was of sound mind.' },
  { q: '« Of sound mind » means…', a: ['sain d’esprit', 'de bonne humeur', 'en bonne santé physique', 'de bonne foi'], c: 0, e: 'A condition for making a valid will.' },
  { q: '« To leave something to someone » in a will means…', a: ['léguer', 'quitter', 'laisser tomber', 'prêter'], c: 0, e: 'He leaves the house to his wife.' },
  { q: 'Why did Ibrahim stop paying the rent?', a: ['The roof leaked and the landlord did not repair it', 'He lost his job', 'The rent was too high', 'He moved to Korhogo'], c: 0, e: 'The landlord stopped answering his phone.' },
  { q: 'What did the landlord do that was illegal?', a: ['He changed the lock without a court order', 'He asked for a deposit', 'He visited the studio', 'He sent a letter'], c: 0, e: 'Nobody may take the law into his own hands.' },
  { q: 'Who can carry out an eviction?', a: ['A bailiff, with a court order', 'The landlord himself', 'The neighbors', 'The tenant’s lawyer'], c: 0, e: 'Un commissaire de justice.' },
  { q: '« A landlord » is…', a: ['un bailleur', 'un locataire', 'un propriétaire terrien seulement', 'un agent immobilier'], c: 0, e: 'The tenant pays the rent to the landlord.' },
  { q: '« Damages » (always plural in this sense) means…', a: ['des dommages-intérêts', 'des dégâts', 'des dommages corporels', 'des frais de justice'], c: 0, e: 'My client will claim damages.' },
  { q: 'How did the lease story end?', a: ['With a settlement agreement', 'With a criminal trial', 'With the sale of the studio', 'With Ibrahim leaving Abidjan'], c: 0, e: 'Keys returned, roof repaired, arrears in three installments.' },
  { q: '« A bad settlement is better than… »', a: ['a good lawsuit', 'a good lawyer', 'no settlement at all', 'a bad judge'], c: 0, e: 'La maxime de Maître Kouassi.' },
  { q: 'Why was Koffi arrested?', a: ['He wore a red jacket like the thief', 'He had a stolen phone in his bag', 'He drove too fast', 'He insulted the police'], c: 0, e: 'Thousands of riders wear the same jacket.' },
  { q: 'Police custody cannot last more than 48 hours unless…', a: ['the public prosecutor extends it', 'the victim asks for it', 'the suspect agrees', 'the lawyer is absent'], c: 0, e: 'Only the prosecutor can extend it.' },
  { q: 'What proved Koffi’s innocence?', a: ['The GPS history and the shop’s video', 'A confession by the victim', 'His sister’s testimony only', 'A fingerprint'], c: 0, e: 'He was in Niangon at 5:52 p.m.' },
  { q: '« Presumed innocent until proven guilty » means…', a: ['présumé innocent jusqu’à preuve de sa culpabilité', 'innocent tant qu’il n’a pas avoué', 'coupable jusqu’à preuve du contraire', 'innocent s’il a un avocat'], c: 0, e: 'Principe fondamental du procès pénal.' },
  { q: '« To release a suspect » means…', a: ['relâcher un suspect', 'arrêter un suspect', 'interroger un suspect', 'juger un suspect'], c: 0, e: 'Koffi was released at dawn.' },
  { q: '« To bring no charges » means…', a: ['ne pas engager de poursuites', 'ne pas payer les frais', 'ne pas porter plainte contre la police', 'ne rien facturer'], c: 0, e: 'The prosecutor decided: no charges.' },
  { q: 'What did Awa have to deliver?', a: ['Two hundred uniforms', 'Two hundred wedding dresses', 'Twenty sewing machines', 'Two thousand meters of fabric'], c: 0, e: 'For the staff of the Lagoon Palace hotel.' },
  { q: 'What are the conditions of force majeure in Article 9?', a: ['Beyond one’s control, unforeseeable and irresistible', 'Expensive, long and difficult', 'Written, signed and dated', 'Foreseeable but costly'], c: 0, e: 'Plus a notice within 48 hours.' },
  { q: 'Why was Awa’s message to the manager important?', a: ['It proved she notified the hotel in time', 'It was a new contract', 'It cancelled the order', 'It reduced the price'], c: 0, e: 'The manager answered « Noted ».' },
  { q: 'Before going to the commercial court, the parties must…', a: ['attempt an amicable settlement', 'see a notary', 'go to the police', 'publish the contract'], c: 0, e: 'Otherwise the claim is inadmissible.' },
  { q: '« A delay » is a false friend. It means…', a: ['un retard', 'un délai', 'une date limite', 'une pénalité'], c: 0, e: '« Un délai » = a deadline, a time limit.' },
  { q: 'In a contract, « shall » expresses…', a: ['an obligation', 'a possibility', 'the past', 'a wish'], c: 0, e: 'Neither party shall be liable…' },
  { q: '« Pacta sunt servanda » means…', a: ['contracts must be kept', 'peace must be kept', 'payment is optional', 'contracts are void'], c: 0, e: 'Les conventions doivent être respectées.' },
  { q: 'Who sits at the commercial court of Abidjan in the story?', a: ['A professional judge and two consular judges', 'A jury of twelve citizens', 'Three notaries', 'One judge alone'], c: 0, e: 'Consular judges are experienced business people.' },
  { q: '« The costs of the proceedings » are…', a: ['les dépens', 'les honoraires de l’avocat seulement', 'les pénalités de retard', 'les intérêts'], c: 0, e: 'Paid by the losing party.' },
  { q: '« Your Honor » is used to address…', a: ['a judge', 'a lawyer', 'a notary', 'a police officer'], c: 0, e: 'British spelling: Your Honour.' },
  { q: 'Moussa’s lesson in A Night at the Police Station is…', a: ['only evidence decides', 'the victim is always right', 'never trust the police', 'a red jacket is suspicious'], c: 0, e: 'A sincere witness can be wrong.' },
];
const cards = [];
NOVELS.forEach(n => n.chapters.forEach(c => c.vocab.forEach(([e, w, fr]) => { if (!cards.some(k => k[0] === w)) cards.push([w, fr]); })));

const M = { id: 'lit', title: 'Romans juridiques en anglais', subtitle: 'Quatre courts romans à lire et à écouter : succession, bail, garde à vue, contrat', color: 'i', noLessonVoice: true, lessons, quiz, cards };
fs.writeFileSync(SITE + 'data/romans.js', '// Legal Stories from Abidjan : quatre courts romans juridiques en anglais (Éditions Lisân). Généré par outils/romans/build_site.js à partir des sources de outils/romans/.\nconst M_LIT = ' + JSON.stringify(M) + ';\n');

const mini = { 'lit/intro': [
  { q: 'Who is Moussa Diarra?', a: ['A first-year law student and intern', 'A judge in Bouaké', 'A notary'], c: 0, e: 'Il est stagiaire au cabinet Kouassi & Traoré.' },
  { q: 'Qui est Maître Aïcha Traoré ?', a: ['Une avocate du cabinet', 'Une juge du tribunal de commerce', 'La propriétaire du studio'], c: 0, e: 'Elle mène les quatre affaires.' },
  { q: 'Le bouton « Traduction » affiche…', a: ['le texte français sous chaque paragraphe', 'un dictionnaire', 'les réponses du mini-exercice'], c: 0, e: 'Lis d’abord en anglais, puis vérifie.' },
] };
NOVELS.forEach(n => n.chapters.forEach(c => { mini['lit/' + c.id] = c.mini; }));
let m = fs.readFileSync(SITE + 'data/mini.js', 'utf8');
const MARK = '\n// Romans juridiques en anglais\n';
if (m.includes(MARK)) m = m.slice(0, m.indexOf(MARK));
fs.writeFileSync(SITE + 'data/mini.js', m.trimEnd() + '\n' + MARK + 'Object.assign(window.MINI, ' + JSON.stringify(mini) + ');\n');
console.log(lessons.length, 'leçons', quiz.length, 'questions', cards.length, 'cartes', Object.keys(mini).length, 'mini');
