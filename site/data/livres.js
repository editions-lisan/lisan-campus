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
  "id": "lire-le-coran-2",
  "space": "coran",
  "title": "Lire le Coran pas à pas 2",
  "sub": "Niveau 2 · le tajwîd, de la lecture juste à la récitation (Ḥafṣ)",
  "docs": [
   {
    "k": "eleve",
    "name": "Livre de l’élève",
    "pages": 220,
    "mb": 4.8
   },
   {
    "k": "maitre",
    "name": "Livret du maître",
    "pages": 45,
    "mb": 1.4
   },
   {
    "k": "exercices",
    "name": "Cahier d’exercices",
    "pages": 56,
    "mb": 1.0
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
 { space: "droit", kind: "Cours", title: "Droit civil : le droit des personnes", desc: "Cours complet, travaux dirigés corrigés, schéma du procès civil et lexique ; polycopié et fiches de TD originaux en annexe", file: "droit/cours-droit-civil.pdf", v: "2e76cff1", pages: 139, mb: 1.6 },
 { space: "droit", kind: "Cours", title: "Droit musulman : la Charia et ses sources", desc: "Cours complet · sources du droit musulman, révélation et compilation du Coran, bibliographie et lexique", file: "droit/cours-droit-musulman.pdf", v: "4a325f83", pages: 21, mb: 0.3 },
 { space: "droit", kind: "Cours", title: "Organisation judiciaire de la Côte d’Ivoire", desc: "Cours complet · principes, juridictions, magistrats et auxiliaires de justice · lexique", file: "droit/cours-organisation-judiciaire.pdf", v: "52538674", pages: 31, mb: 0.5 },
 { space: "droit", kind: "Cours", title: "Droit constitutionnel", desc: "Cours complet · l’État (origine, éléments constitutifs, souveraineté, État unitaire et État composé), la Constitution (sens, formes, révision, contrôle de constitutionnalité), la participation du citoyen (démocratie, suffrage, modes de scrutin avec calculs) · lexique", file: "droit/cours-droit-constitutionnel.pdf", v: "e741544d", pages: 41, mb: 0.6 },
 { space: "droit", kind: "Cours", title: "Méthodologie juridique", desc: "Cours complet · dissertation, cas pratique, commentaire d’arrêt et de texte, quatre ateliers et neuf TD corrigés", file: "droit/cours-methodologie-juridique.pdf", v: "1bd477da", pages: 50, mb: 0.7 },
 { space: "droit", kind: "Cours", title: "Techniques d’expression écrite", desc: "Cours complet · niveaux 1 et 2, textes du cours et exercices corrigés", file: "droit/cours-expression-ecrite.pdf", v: "859b9971", pages: 39, mb: 0.4 },
 { space: "droit", kind: "Cours", title: "Informatique : les bases de l’informatique et le binaire", desc: "Cours complet · histoire de l’informatique, types d’ordinateurs, unité centrale et composants, choix d’un ordinateur, système d’exploitation, binaire et hexadécimal, exercices corrigés ; en annexe, le support du cours de l’année 2026-2027 (pages 1 à 33)", file: "droit/cours-informatique.pdf", v: "9e08505c", pages: 77, mb: 7.8 },
 { space: "droit", kind: "Cours", title: "Économie politique", desc: "Cours complet · activité économique, grands courants de pensée, dix principes de l’économie, exercices corrigés", file: "droit/cours-economie-politique.pdf", v: "a2b18c1d", pages: 29, mb: 0.4 },
 { space: "droit", kind: "Lectures", title: "The Missing Will : roman juridique en anglais illustré", desc: "Legal Stories from Abidjan, livre 1 · niveau B1 · lexique, notes de droit et questions de lecture", file: "droit/the-missing-will.pdf", v: "43c31ca7", pages: 66, mb: 0.6 },
 { space: "droit", kind: "Texte officiel", title: "Constitution de la République de Côte d’Ivoire", desc: "Loi n° 2016-886 du 8 novembre 2016, à jour des révisions du 19 mars 2020 et du 25 juillet 2023 · texte intégral, sommaire détaillé et signets par article, loi de révision de 2020 en annexe", file: "droit/constitution-cote-divoire.pdf", v: "92f5b431", pages: 57, mb: 0.8 },
 { space: "droit", kind: "Texte officiel", title: "Charte des Nations Unies et Statut de la Cour internationale de Justice", desc: "Textes en vigueur, à jour des amendements de 1963, 1965 et 1971 · état de mise à jour (texte de 1945 et texte en vigueur, pratique), la Côte d’Ivoire et les Nations Unies, sommaire détaillé et signets par article", file: "droit/charte-nations-unies-statut-cij.pdf", v: "718471d5", pages: 42, mb: 0.6 },
 { space: "droit", kind: "Code", title: "Code civil I : droit des personnes et de la famille", desc: "Compilation de 2021, avec une première page qui indique l’état de chaque partie : mariage, filiation, minorité et successions à jour (lois de 2019) ; nom, divorce, adoption et libéralités remplacés depuis ; état civil modifié en 2025", file: "droit/code-civil-i.pdf", v: "2289e5fd", pages: 333, mb: 1.4 },
 { space: "droit", kind: "Code", title: "Code civil II : droit des biens et des obligations", desc: "Texte de référence", file: "droit/code-civil-ii.pdf", v: "0fad8604", pages: 341, mb: 1.2 }
];

// Livres conseillés (rubrique « Livres conseillés » de la bibliothèque, #bibliotheque~conseils) : ouvrages protégés par le droit
// d'auteur, présentés mais jamais déposés sur le site. Liens vers des présentations publiques de l'ouvrage, jamais vers une copie.
// droit : 'fr' quand l'ouvrage décrit le droit français (à vérifier en droit ivoirien), 'gen' pour une méthode valable partout.
window.CONSEILS = [
 { titre: "Lexique des termes juridiques", auteurs: "Serge Guinchard et Thierry Debard (dir.)", editeur: "Dalloz, collection « Lexiques »", edition: "Nouvelle édition chaque année ; 33e édition : 2025-2026",
   resume: "Le dictionnaire de référence des étudiants en droit : plusieurs milliers de termes classés de A à Z, définis en quelques lignes, avec des renvois entre notions voisines.",
   interet: "À garder près de soi dès la première année : chercher chaque mot technique rencontré en cours ou en TD, et vérifier le sens exact d'une notion avant une copie.",
   niveau: "L1 à Master", matieres: ["Toutes les matières", "Introduction au droit"], droit: "fr",
   lien: { url: "https://export.side.fr/9782247240258-lexique-des-termes-juridiques-2025-2026-33e-éd", label: "Fiche de la 33e édition (distributeur)" } },
 { titre: "Lexique de droit constitutionnel", auteurs: "Pierre Avril et Jean Gicquel", editeur: "PUF, collection « Que sais-je ? »", edition: "6e édition (la plus récente repérée)",
   resume: "Un petit lexique des notions du droit constitutionnel et des institutions politiques : constitution, régimes, séparation des pouvoirs, procédure parlementaire, contrôle de constitutionnalité.",
   interet: "Pour réviser le droit constitutionnel de L1 et retrouver la définition précise d'une notion ; les exemples viennent surtout de la Constitution française de 1958.",
   niveau: "L1, L2", matieres: ["Droit constitutionnel"], droit: "fr",
   lien: { url: "https://openlibrary.org/works/OL27737686W", label: "Notice du livre (Open Library)" } },
 { titre: "Lexique de science politique", auteurs: "Olivier Nay (dir.)", editeur: "Dalloz, collection « Lexiques »", edition: "5e édition, 2025",
   resume: "Les concepts de la science politique (État, pouvoir, démocratie, partis, élections, opinion publique, relations internationales) et les principaux auteurs, présentés et situés.",
   interet: "Pour le droit constitutionnel et les institutions politiques, et pour préparer une dissertation qui demande des notions de science politique.",
   niveau: "L1 à Master", matieres: ["Droit constitutionnel", "Science politique"], droit: "gen",
   lien: { url: "https://univ-droit.fr/recherche/actualites-de-la-recherche/parutions/59937-lexique-de-science-politique", label: "Présentation (Portail universitaire du droit)" } },
 { titre: "Je veux réussir mon droit : méthodes de travail et clés du succès", auteurs: "Isabelle Defrénois-Souleau", editeur: "Dalloz", edition: "Édition 2026",
   resume: "Un guide de méthode pour les études de droit : prendre des notes, apprendre ses cours, lire une décision, rédiger une dissertation, un commentaire et un cas pratique, préparer les examens.",
   interet: "Pour bien démarrer la première année et corriger sa façon de travailler ; il complète les leçons de Méthodologie du Campus.",
   niveau: "L1, L2", matieres: ["Méthodologie"], droit: "gen",
   lien: { url: "https://actualitte.com/livres/906642/extraits/je-veux-reussir-mon-droit-isabelle-defrenois-souleau-isabelle-defrenois-souleau-9782247249442", label: "Présentation et extrait (ActuaLitté)" } },
 { titre: "Méthodologie des exercices juridiques", auteurs: "Christophe Doubovetzky", editeur: "Gualino, collection « En poche »", edition: "11e édition, 2026",
   resume: "Six fiches courtes : la dissertation, le commentaire de texte, le commentaire d'arrêt, le cas pratique, la question à réponse courte et les règles communes à tous les exercices.",
   interet: "Un format de poche à relire la veille d'un TD ou d'un examen pour retrouver les étapes de chaque exercice.",
   niveau: "L1 à L3", matieres: ["Méthodologie"], droit: "gen",
   lien: { url: "https://univ-droit.fr/recherche/actualites-de-la-recherche/parutions/63978-methodologie-des-exercices-juridiques-9782297291248", label: "Présentation (Portail universitaire du droit)" } },
 { titre: "Conseils et méthodes pour réussir ses études de droit", auteurs: "Aurélie Angué", editeur: "Publié par l'auteure", edition: "Livre numérique et broché",
   resume: "Des conseils d'organisation pour l'étudiant en droit : gérer la masse de travail, apprendre les cours, préparer les TD et les examens, garder le rythme sur l'année.",
   interet: "Pour l'organisation personnelle et la motivation, en complément d'un ouvrage de méthode des exercices.",
   niveau: "L1", matieres: ["Méthodologie"], droit: "gen" },
];
