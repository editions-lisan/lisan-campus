// produit par voix.py à partir de scenes.json et captures.json : ne pas modifier à la main
window.STEPS = 7;
window.T = 73.294;
window.SCENES = [
 {
  "kind": "intro",
  "caption": "Semaine de révisions, puis les compos : révisez tout le programme de L1 Droit avec Lisân Campus.",
  "t0": 0.0,
  "d": 10.826,
  "speech": 9.426
 },
 {
  "step": 1,
  "title": "Toutes nos matières",
  "caption": "Introduction au droit, droit civil, organisation judiciaire, droit constitutionnel, méthodologie… 177 leçons claires, tirées des cours.",
  "shots": [
   {
    "img": "espace",
    "y0": 0,
    "y1": 160,
    "at": 0
   },
   {
    "img": "espace",
    "y0": 1295,
    "y1": 2575,
    "at": 0.36
   }
  ],
  "t0": 10.826,
  "d": 12.89,
  "speech": 12.09
 },
 {
  "step": 2,
  "title": "Révisez en écoutant",
  "caption": "Pas de coin calme ? Écoutez la leçon : dans le gbaka, en marchant, même écran éteint.",
  "shots": [
   {
    "img": "lecon",
    "y0": 0,
    "y1": 0,
    "at": 0,
    "tap": [
     135,
     392,
     0.22
    ]
   },
   {
    "img": "ecoute",
    "y0": 134,
    "y1": 134,
    "at": 0.42
   }
  ],
  "t0": 23.716,
  "d": 8.132,
  "speech": 7.332
 },
 {
  "step": 3,
  "title": "Vérifiez vos acquis",
  "caption": "À la fin de chaque leçon, trois questions pour vérifier que c’est vraiment acquis.",
  "shots": [
   {
    "img": "mini",
    "y0": 4059,
    "y1": 4857,
    "at": 0
   }
  ],
  "t0": 31.848,
  "d": 4.601,
  "speech": 3.801
 },
 {
  "step": 4,
  "title": "Les cas pratiques",
  "caption": "Les cas pratiques comme en classe : les faits, la règle, l’application, la conclusion. Avec le corrigé rédigé.",
  "shots": [
   {
    "img": "cas",
    "y0": 0,
    "y1": 653,
    "at": 0
   },
   {
    "img": "cas",
    "y0": 2165,
    "y1": 2943,
    "at": 0.34
   },
   {
    "img": "exo",
    "y0": 2701,
    "y1": 3079,
    "at": 0.7
   }
  ],
  "t0": 36.449,
  "d": 8.461,
  "speech": 7.661
 },
 {
  "step": 5,
  "title": "Cartes et révisions",
  "caption": "Les cartes pour fixer le vocabulaire juridique ; vos erreurs reviennent dans « Mes révisions » jusqu’à ce qu’elles soient acquises.",
  "shots": [
   {
    "img": "carte1",
    "y0": 229,
    "y1": 229,
    "at": 0,
    "tap": [
     195,
     549,
     0.16
    ]
   },
   {
    "img": "carte2",
    "y0": 229,
    "y1": 229,
    "at": 0.26
   },
   {
    "img": "revisions",
    "y0": 0,
    "y1": 488,
    "at": 0.55
   }
  ],
  "t0": 44.909,
  "d": 7.536,
  "speech": 6.736
 },
 {
  "step": 6,
  "title": "Comme à la compo",
  "caption": "L’évaluation de chaque matière : 20 questions, avec le chrono, comme le jour de la compo.",
  "shots": [
   {
    "img": "evalstart",
    "y0": 0,
    "y1": 98,
    "at": 0,
    "tap": [
     137,
     638,
     0.32
    ]
   },
   {
    "img": "eval",
    "y0": 0,
    "y1": 330,
    "at": 0.46
   }
  ],
  "t0": 52.446,
  "d": 6.395,
  "speech": 5.595
 },
 {
  "step": 7,
  "title": "Les cours en PDF",
  "caption": "Les cours complets en PDF et la Constitution à jour, à lire ou à télécharger.",
  "shots": [
   {
    "img": "pdf",
    "y0": 370,
    "y1": 1400,
    "at": 0
   }
  ],
  "t0": 58.84,
  "d": 5.63,
  "speech": 4.83
 },
 {
  "kind": "outro",
  "caption": "",
  "t0": 64.47,
  "d": 8.824,
  "speech": 6.824
 }
];
