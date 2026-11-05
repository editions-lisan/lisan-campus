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
 { space: "droit", kind: "Cours", title: "Cours de droit civil : le droit des personnes", desc: "Licence 1", file: "droit/cours-droit-civil-personnes.pdf", pages: 74, mb: 0.6 },
 { space: "droit", kind: "TD", title: "Travaux dirigés de droit civil : les personnes", desc: "Année 2026-2027 · trois séances", file: "droit/td-droit-civil-personnes-2026-2027.pdf", pages: 11, mb: 0.5 },
 { space: "droit", kind: "Méthode", title: "Fiche méthode : le cas pratique et le commentaire de décision", desc: "D’après les notes de cours et de TD", file: "droit/fiche-methode-cas-pratique-commentaire.pdf", pages: 14, mb: 0.2 },
 { space: "droit", kind: "Exercices", title: "Cahier d’exercices de méthodologie", desc: "Douze exercices progressifs et leurs corrigés", file: "droit/cahier-exercices-methodologie.pdf", pages: 11, mb: 0.2 },
 { space: "droit", kind: "Code", title: "Code civil II : droit des biens et des obligations", desc: "Texte de référence", file: "droit/code-civil-ii.pdf", pages: 341, mb: 1.2 }
];
