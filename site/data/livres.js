// ===== Lisân Campus · bibliothèque : les livres des Éditions Lisân (élève, maître, exercices) et les documents de cours
// Fichiers dans livres/ (PDF allégés pour l’écran, couvertures dans livres/couv/). Les documents de droit se rangent dans DOCS.
window.LIVRES = [
 {
  "id": "je-lis-l-arabe-0",
  "space": "arabe",
  "title": "Je lis l’arabe ! · Niveau 0",
  "sub": "Méthode interactive d’alphabétisation",
  "docs": [
   {
    "k": "eleve",
    "name": "Livre de l’apprenant",
    "pages": 84,
    "mb": 0.9
   },
   {
    "k": "maitre",
    "name": "Livret de l’animateur",
    "pages": 46,
    "mb": 0.4
   },
   {
    "k": "exercices",
    "name": "Cahier d’exercices",
    "pages": 66,
    "mb": 0.6
   }
  ]
 },
 {
  "id": "je-parle-arabe-1",
  "space": "arabe",
  "title": "Je parle arabe ! · Niveau 1",
  "sub": "Niveau A1 – A2 : méthode interactive pour parler l’arabe",
  "docs": [
   {
    "k": "eleve",
    "name": "Livre de l’élève",
    "pages": 158,
    "mb": 1.7
   },
   {
    "k": "maitre",
    "name": "Livret du maître",
    "pages": 69,
    "mb": 0.5
   },
   {
    "k": "exercices",
    "name": "Cahier d’exercices",
    "pages": 81,
    "mb": 1.0
   }
  ]
 },
 {
  "id": "je-parle-arabe-2",
  "space": "arabe",
  "title": "Je parle arabe ! · Niveau 2",
  "sub": "Niveau A2 – B1 : raconter, expliquer, argumenter",
  "docs": [
   {
    "k": "eleve",
    "name": "Livre de l’élève",
    "pages": 158,
    "mb": 1.9
   },
   {
    "k": "maitre",
    "name": "Livret du maître",
    "pages": 70,
    "mb": 0.6
   },
   {
    "k": "exercices",
    "name": "Cahier d’exercices",
    "pages": 84,
    "mb": 1.0
   }
  ]
 },
 {
  "id": "je-parle-arabe-3",
  "space": "arabe",
  "title": "Je parle arabe ! · Niveau 3",
  "sub": "Niveau B1 – B2 : lire, débattre, convaincre",
  "docs": [
   {
    "k": "eleve",
    "name": "Livre de l’élève",
    "pages": 157,
    "mb": 1.8
   },
   {
    "k": "maitre",
    "name": "Livret du maître",
    "pages": 72,
    "mb": 0.6
   },
   {
    "k": "exercices",
    "name": "Cahier d’exercices",
    "pages": 90,
    "mb": 1.0
   }
  ]
 },
 {
  "id": "lire-le-coran",
  "space": "coran",
  "title": "Lire le Coran pas à pas",
  "sub": "Méthode progressive, des lettres arabes au Mouss-haf",
  "docs": [
   {
    "k": "eleve",
    "name": "Livre de l’élève",
    "pages": 336,
    "mb": 2.5
   },
   {
    "k": "maitre",
    "name": "Livret du maître",
    "pages": 40,
    "mb": 0.4
   },
   {
    "k": "exercices",
    "name": "Cahier d’exercices",
    "pages": 100,
    "mb": 0.7
   }
  ]
 },
 {
  "id": "vivre-l-islam-1",
  "space": "islam",
  "title": "Vivre l’islam en famille · Niveau 1",
  "sub": "L’islam : je pratique ma religion",
  "docs": [
   {
    "k": "eleve",
    "name": "Livre de la famille",
    "pages": 116,
    "mb": 0.9
   },
   {
    "k": "maitre",
    "name": "Livret de l’animateur",
    "pages": 78,
    "mb": 0.7
   },
   {
    "k": "exercices",
    "name": "Cahier d’activités",
    "pages": 72,
    "mb": 0.7
   }
  ]
 },
 {
  "id": "vivre-l-islam-2",
  "space": "islam",
  "title": "Vivre l’islam en famille · Niveau 2",
  "sub": "L’îmân : je crois et je comprends",
  "docs": [
   {
    "k": "eleve",
    "name": "Livre de la famille",
    "pages": 127,
    "mb": 1.0
   },
   {
    "k": "maitre",
    "name": "Livret de l’animateur",
    "pages": 87,
    "mb": 0.7
   },
   {
    "k": "exercices",
    "name": "Cahier d’activités",
    "pages": 82,
    "mb": 0.7
   }
  ]
 }
];
window.DOCS = [
 { space: "droit", kind: "Cours", title: "Introduction à l’étude du droit", desc: "Cours complet · le droit objectif et les droits subjectifs · exercices corrigés et lexique", file: "droit/cours-introduction-etude-droit.pdf", v: "9e3c1d92", pages: 30, mb: 0.4 },
 { space: "droit", kind: "Cours", title: "Droit civil : le droit des personnes", desc: "Cours complet, travaux dirigés corrigés, schéma du procès civil et lexique ; polycopié et fiches de TD originaux en annexe", file: "droit/cours-droit-civil.pdf", v: "e9c0b3a3", pages: 139, mb: 1.7 },
 { space: "droit", kind: "Cours", title: "Droit musulman : la Charia et ses sources", desc: "Cours complet · sources du droit musulman, révélation et compilation du Coran, bibliographie et lexique", file: "droit/cours-droit-musulman.pdf", v: "4a325f83", pages: 21, mb: 0.3 },
 { space: "droit", kind: "Cours", title: "Organisation judiciaire de la Côte d’Ivoire", desc: "Cours complet · principes, juridictions, magistrats et auxiliaires de justice · lexique", file: "droit/cours-organisation-judiciaire.pdf", v: "52538674", pages: 31, mb: 0.5 },
 { space: "droit", kind: "Cours", title: "Droit constitutionnel", desc: "Cours complet · l’État (origine, éléments constitutifs, souveraineté, État unitaire et État composé), la Constitution (sens, formes, révision, contrôle de constitutionnalité), la participation du citoyen (démocratie, suffrage, modes de scrutin avec calculs) · lexique", file: "droit/cours-droit-constitutionnel.pdf", v: "8b9a83aa", pages: 41, mb: 0.6 },
 { space: "droit", kind: "Cours", title: "Méthodologie juridique", desc: "Cours complet · dissertation, cas pratique, commentaire d’arrêt et de texte, quatre ateliers et neuf TD corrigés", file: "droit/cours-methodologie-juridique.pdf", v: "1bd477da", pages: 50, mb: 0.7 },
 { space: "droit", kind: "Cours", title: "Techniques d’expression écrite", desc: "Cours complet · niveaux 1 et 2, textes du cours et exercices corrigés", file: "droit/cours-expression-ecrite.pdf", v: "859b9971", pages: 39, mb: 0.4 },
 { space: "droit", kind: "Cours", title: "Informatique : l’ordinateur et le binaire", desc: "Cours complet · composants, choix d’un ordinateur, bit et octet, conversions binaire, décimal et hexadécimal, exercices corrigés", file: "droit/cours-informatique.pdf", v: "e0b7f06d", pages: 17, mb: 0.3 },
 { space: "droit", kind: "Cours", title: "Économie politique", desc: "Cours complet · activité économique, grands courants de pensée, dix principes de l’économie, exercices corrigés", file: "droit/cours-economie-politique.pdf", v: "a2b18c1d", pages: 29, mb: 0.4 },
 { space: "droit", kind: "Lectures", title: "The Missing Will : roman juridique en anglais illustré", desc: "Legal Stories from Abidjan, livre 1 · niveau B1 · lexique, notes de droit et questions de lecture", file: "droit/the-missing-will.pdf", v: "43c31ca7", pages: 66, mb: 0.6 },
 { space: "droit", kind: "Code", title: "Code civil II : droit des biens et des obligations", desc: "Texte de référence", file: "droit/code-civil-ii.pdf", v: "0fad8604", pages: 341, mb: 1.2 }
];
