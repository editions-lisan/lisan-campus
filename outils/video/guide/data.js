// produit par voix.py à partir de scenes.json et captures.json : ne pas modifier à la main
window.STEPS = 13;
window.T = 118.715;
window.SCENES = [
 {
  "kind": "intro",
  "caption": "Lisân Campus, le mode d’emploi : votre compte, votre inscription, vos leçons et votre certificat.",
  "t0": 0.0,
  "d": 8.199,
  "speech": 6.799
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
  "t0": 8.199,
  "d": 12.993,
  "speech": 12.193
 },
 {
  "step": 2,
  "title": "Choisissez votre espace",
  "caption": "Choisissez votre espace : l’arabe, le Coran, l’islam en famille, le droit ou l’intelligence artificielle.",
  "shots": [
   {
    "img": "home",
    "y0": 3682,
    "y1": 4062,
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
  "t0": 21.191,
  "d": 6.633,
  "speech": 5.833
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
  "t0": 27.825,
  "d": 4.925,
  "speech": 4.125
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
  "t0": 32.75,
  "d": 6.025,
  "speech": 5.225
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
  "t0": 38.775,
  "d": 6.248,
  "speech": 5.448
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
  "t0": 45.023,
  "d": 5.783,
  "speech": 4.983
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
  "t0": 50.806,
  "d": 6.377,
  "speech": 5.577
 },
 {
  "step": 8,
  "title": "Validez la leçon",
  "caption": "À la fin, un mini-exercice de trois questions. Tout est juste ? La leçon est terminée et la suivante s’ouvre.",
  "shots": [
   {
    "img": "mini",
    "y0": 4626,
    "y1": 5495,
    "at": 0
   }
  ],
  "t0": 57.183,
  "d": 6.811,
  "speech": 6.011
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
  "t0": 63.994,
  "d": 5.28,
  "speech": 4.48
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
  "t0": 69.274,
  "d": 8.545,
  "speech": 7.745
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
  "t0": 77.82,
  "d": 5.377,
  "speech": 4.577
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
  "t0": 83.196,
  "d": 7.081,
  "speech": 6.281
 },
 {
  "step": 12,
  "title": "Votre campus et vos progrès",
  "caption": "Votre campus : objectifs du jour, série et XP, puis vos progrès et vos distinctions. Comparez-vous chaque semaine et programmez un rappel.",
  "shots": [
   {
    "img": "campus",
    "y0": 0,
    "y1": 0,
    "at": 0
   },
   {
    "img": "progres",
    "y0": 227,
    "y1": 2123,
    "at": 0.25
   },
   {
    "img": "classement",
    "y0": 0,
    "y1": 523,
    "at": 0.55
   },
   {
    "img": "rappels",
    "y0": 961,
    "y1": 991,
    "at": 0.78,
    "tap": [
     195,
     1344,
     0.92
    ]
   }
  ],
  "t0": 90.277,
  "d": 13.646,
  "speech": 12.846
 },
 {
  "step": 13,
  "title": "La navigation",
  "caption": "En bas de l’écran : Accueil, Apprendre, Réviser, Bibliothèque et Progrès. Tout le reste est dans le menu.",
  "shots": [
   {
    "img": "apprendre",
    "y0": 0,
    "y1": 0,
    "at": 0
   },
   {
    "img": "menu",
    "y0": 0,
    "y1": 0,
    "at": 0.62
   }
  ],
  "t0": 103.923,
  "d": 10.412,
  "speech": 9.612
 },
 {
  "kind": "outro",
  "caption": "lisan-campus.pages.dev · Bonne étude !",
  "t0": 114.335,
  "d": 4.38,
  "speech": 2.38
 }
];
