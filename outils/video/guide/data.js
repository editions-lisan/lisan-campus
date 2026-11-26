// produit par voix.py à partir de scenes.json et captures.json : ne pas modifier à la main
window.STEPS = 13;
window.T = 110.215;
window.SCENES = [
 {
  "kind": "intro",
  "caption": "Lisân Campus, le mode d’emploi : votre compte, votre inscription, vos leçons et votre certificat.",
  "t0": 0.0,
  "d": 8.082,
  "speech": 6.682
 },
 {
  "step": 1,
  "title": "Ouvrez le site",
  "caption": "Ouvrez lisan-campus.pages.dev sur téléphone ou sur ordinateur : même compte, même progression. Sur téléphone, ajoutez-le à l’écran d’accueil.",
  "shots": [
   {
    "img": "home",
    "y0": 0,
    "y1": 120,
    "at": 0
   }
  ],
  "extra": "desktop",
  "t0": 8.082,
  "d": 13.082,
  "speech": 12.282
 },
 {
  "step": 2,
  "title": "Choisissez votre espace",
  "caption": "Choisissez votre espace : l’arabe, le Coran, l’islam en famille, le droit ou l’intelligence artificielle.",
  "shots": [
   {
    "img": "home",
    "y0": 1575,
    "y1": 1955,
    "at": 0
   },
   {
    "img": "espace",
    "y0": 0,
    "y1": 160,
    "at": 0.55,
    "tap": [
     195,
     329,
     0.75
    ]
   }
  ],
  "t0": 21.164,
  "d": 6.675,
  "speech": 5.875
 },
 {
  "step": 3,
  "title": "Première leçon libre",
  "caption": "La première leçon de chaque espace est en accès libre : essayez-la avant de vous inscrire.",
  "shots": [
   {
    "img": "parcours",
    "y0": 0,
    "y1": 390,
    "at": 0,
    "tap": [
     195,
     690,
     0.8
    ]
   }
  ],
  "t0": 27.84,
  "d": 5.044,
  "speech": 4.244
 },
 {
  "step": 4,
  "title": "Connectez-vous",
  "caption": "Pour continuer, connectez-vous avec votre compte Google. C’est gratuit, sans mot de passe à retenir.",
  "shots": [
   {
    "img": "gate",
    "y0": 0,
    "y1": 0,
    "at": 0,
    "tap": [
     152,
     488,
     0.6
    ]
   }
  ],
  "t0": 32.884,
  "d": 6.163,
  "speech": 5.363
 },
 {
  "step": 5,
  "title": "Remplissez votre fiche",
  "caption": "Remplissez votre fiche : nom et adresse viennent de Google. Complétez le reste, puis vérifiez.",
  "shots": [
   {
    "img": "fiche",
    "y0": 0,
    "y1": 1500,
    "at": 0
   },
   {
    "img": "verif",
    "y0": 0,
    "y1": 868,
    "at": 0.6,
    "tap": [
     131,
     1449,
     0.9
    ]
   }
  ],
  "t0": 39.047,
  "d": 6.029,
  "speech": 5.229
 },
 {
  "step": 6,
  "title": "Inscription confirmée",
  "caption": "C’est confirmé ! Vous recevez votre numéro d’inscription, et toutes les leçons de l’espace s’ouvrent.",
  "shots": [
   {
    "img": "confirm",
    "y0": 0,
    "y1": 360,
    "at": 0
   }
  ],
  "t0": 45.076,
  "d": 5.617,
  "speech": 4.817
 },
 {
  "step": 7,
  "title": "Lisez ou écoutez",
  "caption": "Lisez chaque leçon, ou écoutez-la : la voix continue même écran éteint, et le passage lu s’affiche en couleur.",
  "shots": [
   {
    "img": "lecon",
    "y0": 0,
    "y1": 520,
    "at": 0,
    "tap": [
     135,
     392,
     0.22
    ]
   }
  ],
  "t0": 50.693,
  "d": 6.303,
  "speech": 5.503
 },
 {
  "step": 8,
  "title": "Validez la leçon",
  "caption": "À la fin, un mini-exercice de trois questions. Tout est juste ? La leçon est terminée et la suivante s’ouvre.",
  "shots": [
   {
    "img": "mini",
    "y0": 4626,
    "y1": 5504,
    "at": 0
   }
  ],
  "t0": 56.996,
  "d": 6.986,
  "speech": 6.186
 },
 {
  "step": 9,
  "title": "Révisez avec les cartes",
  "caption": "Révisez avec les cartes : touchez la carte pour voir la réponse, puis dites si vous la saviez.",
  "shots": [
   {
    "img": "cartes",
    "y0": 0,
    "y1": 120,
    "at": 0,
    "tap": [
     195,
     581,
     0.35
    ]
   }
  ],
  "t0": 63.981,
  "d": 5.159,
  "speech": 4.359
 },
 {
  "step": 10,
  "title": "Évaluation et avis",
  "caption": "Toutes les leçons terminées ? Passez l’évaluation : avec 80 %, le parcours est réussi. Donnez votre avis en quelques étoiles…",
  "shots": [
   {
    "img": "fini",
    "y0": 0,
    "y1": 220,
    "at": 0,
    "tap": [
     142,
     378,
     0.2
    ]
   },
   {
    "img": "avis",
    "y0": 0,
    "y1": 260,
    "at": 0.55,
    "tap": [
     264,
     417,
     0.7
    ]
   }
  ],
  "t0": 69.141,
  "d": 8.328,
  "speech": 7.528
 },
 {
  "step": 10,
  "title": "Votre certificat",
  "caption": "… et recevez votre certificat de réussite, vérifiable en ligne grâce à son code QR.",
  "shots": [
   {
    "img": "certificat",
    "y0": 0,
    "y1": 60,
    "at": 0
   }
  ],
  "t0": 77.468,
  "d": 5.386,
  "speech": 4.586
 },
 {
  "step": 11,
  "title": "L’actualité juridique",
  "caption": "Suivez l’actualité juridique : chaque information est expliquée pas à pas, reliée au cours, avec un petit test.",
  "shots": [
   {
    "img": "actus",
    "y0": 0,
    "y1": 420,
    "at": 0
   },
   {
    "img": "actu",
    "y0": 620,
    "y1": 1452,
    "at": 0.45
   }
  ],
  "t0": 82.854,
  "d": 6.699,
  "speech": 5.899
 },
 {
  "step": 12,
  "title": "Classement et rappels",
  "caption": "Gagnez des XP en étudiant, comparez-vous aux autres élèves chaque semaine et programmez un rappel quotidien.",
  "shots": [
   {
    "img": "classement",
    "y0": 0,
    "y1": 523,
    "at": 0
   },
   {
    "img": "rappels",
    "y0": 961,
    "y1": 991,
    "at": 0.6,
    "tap": [
     195,
     1344,
     0.82
    ]
   }
  ],
  "t0": 89.553,
  "d": 9.616,
  "speech": 8.816
 },
 {
  "step": 13,
  "title": "Le menu",
  "caption": "Dans le menu : les espaces, la bibliothèque, vos révisions, le classement, la recherche et ce mode d’emploi.",
  "shots": [
   {
    "img": "menu",
    "y0": 0,
    "y1": 0,
    "at": 0
   }
  ],
  "t0": 99.169,
  "d": 6.909,
  "speech": 6.109
 },
 {
  "kind": "outro",
  "caption": "lisan-campus.pages.dev · Bonne étude !",
  "t0": 106.079,
  "d": 4.136,
  "speech": 2.136
 }
];
