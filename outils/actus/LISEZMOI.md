# Actualité juridique et judiciaire (page #actualites)

Les informations sont dans `site/data/actus.js` (`window.ACTUS`), la plus récente en premier, 60 au plus (supprimer les plus anciennes au-delà).

Chaque information :

```js
{ d: 'AAAA-MM-JJ',            // date de l'événement (vote, décision, nomination, publication)
  cat: 'lois',                // lois | justice | institutions | carrieres | jurisprudence (voir window.RUBRIQUES)
  titre: '…',                 // une ligne, en français, sans majuscules inutiles
  texte: '…',                 // 2 à 4 phrases : qui, quoi, quand, pourquoi c'est important ; numéros des textes exacts
  src: ['Nom du média', 'https://…'],    // source vérifiable (AIP, Fraternité Matin, Abidjan.net, gouv.ci, presidence.ci, assnat.ci, senat.ci, conseil-constitutionnel.ci, courdecassation.ci…)
  cours: [['Titre de la leçon', '#l-matiere.lecon']] }   // leçon(s) du site qui aident à comprendre, ou []
```

Règles :
- seulement l'actualité juridique et judiciaire **ivoirienne** (lois et ordonnances, Conseil des ministres pour les textes juridiques, Parlement, Conseil constitutionnel, Cour de cassation, Conseil d'État, Cour des comptes, réformes de la justice, barreau, notariat, concours de l'INFJ et de la magistrature, droit OHADA appliqué en Côte d'Ivoire) ;
- toujours vérifier la date et la nationalité de la source (certains sites reprennent l'actualité d'autres pays : Mauritanie, Sénégal…) ;
- résumé rédigé par Lisân Campus, jamais copié ; aucune opinion politique ; pas de faits divers judiciaires visant des particuliers ;
- mettre à jour `maj` (date du jour), changer `VERSION` dans `site/sw.js`, vérifier `node --check site/data/actus.js`, puis envoyer sur `main`.
