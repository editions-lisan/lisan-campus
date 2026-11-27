// Annales des examens de Licence 1 Droit, sujets classés et corrigé général : document des Éditions Lisân.
// Sujets : examens_sujets.js ; corrigés : examens_corr_a.js (1 à 8), examens_corr_b.js (9 à 15), examens_corr_c.js (16 à 20).
// Mise en pages par outils/cours/build_cours.js (id « examens »), même forme qu'une matière du site.

const { S } = require('./examens_sujets.js');
const CA = require('./examens_corr_a.js').C, CB = require('./examens_corr_b.js').C, CC = require('./examens_corr_c.js').C;

const INTRO = [
  { id: 'mode', title: 'Comment travailler ces annales', body: [
    { p: 'Ces annales rassemblent les sujets d\'examen et d\'évaluation posés en **Licence 1 Droit** entre 2021-2022 et 2024-2025 : compositions de fin de semestre, examens de rattrapage (session 2), évaluations formatives de travaux dirigés, dans quatorze matières. Les sujets reçus en plusieurs exemplaires ont été réunis, et ceux qui se répètent d\'une épreuve à l\'autre sont signalés. Chacun reçoit un **corrigé complet**, rédigé selon le droit ivoirien en vigueur.' },
    { ol: [
      '**Traitez le sujet** au brouillon, dans le temps de l\'épreuve, sans ouvrir le corrigé.',
      '**Comparez** avec le corrigé : soulignez ce qui manque, en particulier les articles et les définitions exactes.',
      '**Revoyez la leçon** indiquée en tête du corrigé sur Lisân Campus, puis refaites ses mini-exercices.',
      '**La veille de l\'examen**, relisez le tableau des notions qui reviennent (page suivante).',
    ] },
    { box: 'Dans un vrai ou faux, la justification fait la note : une affirmation fausse se corrige en une phrase qui donne la bonne règle et, si possible, son article. Lisez chaque mot : « exclusivement », « uniquement », « toujours » rendent souvent une affirmation fausse.', title: 'Vrai ou faux', kind: 'cle' },
    { box: 'Les arrêts proposés en méthodologie sont des décisions de la Cour de cassation française, choisies pour leur valeur d\'exercice. Le corrigé indique pour chacune ce que prévoit le droit ivoirien : une solution française ne s\'applique jamais d\'elle-même en Côte d\'Ivoire.', title: 'Les décisions françaises', kind: 'marge' },
    { table: { h: ['Matière', 'Sujets', 'Corrigés'], r: [
      ['Introduction à l\'étude du droit', '1', 'Questionnaire'],
      ['Droit civil : les personnes', '2 et 3', 'Vrai ou faux, classements, cas pratique'],
      ['Organisation judiciaire', '4 et 5', 'Vrai ou faux, questionnaire'],
      ['Droit constitutionnel 1 et 2', '6, 7 et 8', 'Cas pratique, dissertations, questions'],
      ['Méthodologie juridique', '9, 10 et 11', 'Introduction et plan, fiches d\'arrêt, commentaire de texte'],
      ['Droits humains', '12', 'Vrai ou faux justifiés, questions'],
      ['Relations internationales', '13', 'Vrai ou faux justifiés, cas pratique'],
      ['Droit islamique et civilisation islamique', '14 et 15', 'Sources, définitions, questions'],
      ['Économie politique', '16', 'Questions, calcul du multiplicateur de crédit'],
      ['Informatique', '17', 'Questionnaire'],
      ['Anglais juridique', '18', 'Model answers'],
      ['Techniques d\'expression écrite', '19', 'Communiqué, rapport, note de service, doléance'],
      ['Éthique et morale', '20', 'Questions'],
    ] } },
  ] },
  { id: 'analyse', title: 'Les notions qui reviennent', body: [
    { p: 'L\'analyse de l\'ensemble des épreuves fait ressortir les notions que les enseignants posent le plus souvent, parfois mot pour mot. Une notion qui revient d\'une épreuve à l\'autre, ou d\'une matière à l\'autre, doit être sue par cœur : définition, article et exemple.' },
    { table: { h: ['Notion', 'Matière', 'Où elle revient'], r: [
      ['**La question de confiance**', 'Droit constitutionnel 2', '3 fois : sujet 7 et les deux sujets du sujet 8'],
      ['**Le vote bloqué**', 'Droit constitutionnel 2', '3 fois : sujets 7 et 8'],
      ['**Les pouvoirs du Président de la République de Côte d\'Ivoire**', 'Droit constitutionnel 2', '2 fois (sujets 7 et 8), plus la dissertation sur le régime présidentiel ivoirien'],
      ['**L\'adoption de la Constitution de 1960**', 'Droit constitutionnel 2', '2 fois : sujets 7 et 8'],
      ['**Le régime parlementaire britannique** et son Premier ministre', 'Droit constitutionnel 2', '2 fois : sujets 7 et 8'],
      ['**La responsabilité du gouvernement** (motion de censure, question de confiance)', 'Droit constitutionnel 2', 'Sujets 7 et 8'],
      ['**Les juridictions ivoiriennes en vrai ou faux**', 'Organisation judiciaire', '2 fois : les dix premières affirmations du sujet 4 reprises au sujet 5'],
      ['**L\'arrêt du taxi** (Cass. 1re civ., 2 décembre 1969)', 'Méthodologie', '2 fois : examen (sujet 9) et travaux dirigés'],
      ['**La fiche d\'arrêt**', 'Méthodologie', 'Sujets 9 et 11'],
      ['**La loi** (définition, sens formel et sens matériel)', 'Introduction au droit, méthodologie, anglais', 'Sujets 1, 10 et 18'],
      ['**Les sources du droit** (directes et indirectes, coutume)', 'Introduction au droit, droit islamique', 'Sujets 1 et 14'],
      ['**La hiérarchie des normes** (loi, règlement, Constitution, traité)', 'Introduction au droit, droit constitutionnel', 'Sujets 1 et 6'],
      ['**Droits patrimoniaux et extrapatrimoniaux**, propriété et démembrements', 'Introduction au droit, droit civil', 'Sujets 1 et 2'],
      ['**Droits de l\'homme, droits de la personnalité, droits fondamentaux**', 'Droit civil, droits humains', 'Sujets 2 et 12'],
      ['**Vie privée et droit à l\'image**', 'Droit civil, méthodologie', 'Sujets 2 et 11'],
      ['**L\'enfant conçu** (*infans conceptus*)', 'Méthodologie, droit civil', 'Sujet 9'],
      ['**La Constitution** (définition)', 'Anglais, droit constitutionnel', 'Sujets 6, 7 et 18'],
      ['**Le droit et la morale**', 'Anglais, éthique et morale', 'Sujets 18 et 20'],
      ['**Le choix et les composants de l\'ordinateur**', 'Informatique', 'Sujet 17 (5 questions sur 14)'],
    ] } },
    { box: 'Les quatre questions de droit constitutionnel 2 les plus fréquentes (question de confiance, vote bloqué, pouvoirs du Président, Constitution de 1960) se préparent ensemble : le corrigé du sujet 7 les traite toutes.', title: 'Priorité', kind: 'cle' },
  ] },
];

const L = [...INTRO, ...S, ...CA, ...CB, ...CC];
const groups = [
  ['Introduction à l\'étude du droit', ['1']],
  ['Droit civil : les personnes', ['2', '3']],
  ['Organisation judiciaire', ['4', '5']],
  ['Droit constitutionnel', ['6', '7', '8']],
  ['Méthodologie juridique', ['9', '10', '11']],
  ['Droits humains et relations internationales', ['12', '13']],
  ['Droit islamique et civilisation islamique', ['14', '15']],
  ['Économie politique et informatique', ['16', '17']],
  ['Anglais, expression écrite, éthique', ['18', '19', '20']],
];
module.exports = {
  id: 'examens', title: 'Annales des examens de Licence 1', lessons: L, cards: [],
  parts: [
    ['Présentation', ['mode', 'analyse']],
    ['Première partie · Les sujets', groups.map(([t, n]) => [t, n.map(x => 's' + x)])],
    ['Deuxième partie · Le corrigé général', groups.map(([t, n]) => [t, n.map(x => 'c' + x)])],
  ],
};
