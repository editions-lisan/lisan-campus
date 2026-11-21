// produit par voix.py à partir de scenes.json et captures.json : ne pas modifier à la main
window.STEPS = 7;
window.T = 73.125;
window.SCENES = [
 {
  "kind": "intro",
  "caption": "Semaine de révisions, puis les compos : révisez tout le programme de L1 Droit avec Lisân Campus.",
  "t0": 0.0,
  "d": 11.112,
  "speech": 9.712
 },
 {
  "step": 1,
  "title": "Toutes nos matières",
  "caption": "Introduction au droit, droit civil, organisation judiciaire, droit constitutionnel, méthodologie… 189 leçons claires, tirées des cours.",
  "shots": [
   {
    "img": "espace",
    "y0": 0,
    "y1": 160,
    "at": 0
   },
   {
    "img": "espace",
    "y0": 2457,
    "y1": 3737,
    "at": 0.36
   }
  ],
  "t0": 11.112,
  "d": 12.678,
  "speech": 11.878
 },
 {
  "step": 2,
  "title": "Révisez en écoutant",
  "caption": "Pas de coin calme ? Écoutez la leçon : dans le transport, en marchant, à la maison, même écran éteint.",
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
  "t0": 23.79,
  "d": 7.629,
  "speech": 6.829
 },
 {
  "step": 3,
  "title": "Vérifiez vos acquis",
  "caption": "À la fin de chaque leçon, trois questions pour vérifier que c’est vraiment acquis.",
  "shots": [
   {
    "img": "mini",
    "y0": 4059,
    "y1": 4961,
    "at": 0
   }
  ],
  "t0": 31.419,
  "d": 4.526,
  "speech": 3.726
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
  "t0": 35.945,
  "d": 8.544,
  "speech": 7.744
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
  "t0": 44.489,
  "d": 7.662,
  "speech": 6.862
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
  "t0": 52.151,
  "d": 6.547,
  "speech": 5.747
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
  "t0": 58.698,
  "d": 5.458,
  "speech": 4.658
 },
 {
  "kind": "outro",
  "caption": "",
  "t0": 64.156,
  "d": 8.969,
  "speech": 6.969
 }
];
