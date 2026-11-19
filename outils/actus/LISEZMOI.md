# Actualité juridique et judiciaire (pages #actualites et #actu-<id>)

Les informations sont dans `site/data/actus.js` (`window.ACTUS`), la plus récente en premier, 60 au plus (supprimer les plus anciennes au-delà).

L'objectif n'est pas de transmettre des nouvelles, mais d'**apprendre à les lire avec un regard de juriste** : chaque information est un support de cours. La liste (#actualites) montre le résumé ; la page de l'information (#actu-<id>) montre l'information, la procédure pas à pas, le commentaire pédagogique, l'encadré « À retenir », les textes cités, un petit test et les leçons du site.

Chaque information :

```js
{ id: 'loi-finances-2027-commission',   // identifiant unique, en minuscules et tirets (adresse #actu-<id>) ; ne plus le changer une fois publié
  d: 'AAAA-MM-JJ',            // date de l'événement (vote, décision, nomination, publication)
  cat: 'lois',                // lois | justice | institutions | carrieres | jurisprudence (voir window.RUBRIQUES)
  verif: 'AAAA-MM-JJ',        // date à laquelle les textes cités ont été vérifiés en vigueur
  titre: '…',                 // une ligne, en français, sans majuscules inutiles
  texte: '…',                 // 2 à 4 phrases : qui, quoi, quand ; numéros des textes exacts ; faits seulement
  src: ['Nom du média', 'https://…'],    // source vérifiable (AIP, Fraternité Matin, Abidjan.net, gouv.ci, presidence.ci, assnat.ci, senat.ci, conseil-constitutionnel.ci…)
  etapes: ['loi', 2],         // facultatif : procédure suivie (PROCEDURES dans app.js : loi, finances, ordonnance) et étape atteinte (0 = première)
  comprendre: [               // LE COMMENTAIRE PÉDAGOGIQUE : 3 à 7 questions qu'un étudiant de L1 se pose en lisant l'information
    ['Qu’est-ce qu’une commission parlementaire ?', 'Réponse en 3 à 8 phrases, **gras** pour les notions, articles cités…'],
  ],
  retenir: '…',               // une ou deux phrases : la notion ou le mécanisme à garder en mémoire
  textes: ['Constitution, articles 74 et 110', 'Loi n° … du …'],   // tous les textes cités dans l'information et le commentaire
  test: [['Question ?', ['bonne réponse', 'fausse', 'fausse'], 'Explication courte.']],   // 2 ou 3 questions ; la bonne réponse en premier (mélangée à l'affichage)
  cours: [['Titre de la leçon', '#l-matiere.lecon']] }   // leçon(s) du site, ou []
```

## Le commentaire pédagogique (`comprendre`)

Chaque mot technique de l'information devient une question. Exemple, pour « la commission des affaires économiques et financières a adopté à l'unanimité le projet de loi de finances, qui sera examiné en séance plénière puis transmis au Sénat » :

1. Qu'est-ce qu'une loi de finances ? (budget, consentement à l'impôt, annualité, loi organique relative aux lois de finances) ;
2. Qu'est-ce qu'une commission parlementaire ? (rôle, les six commissions permanentes, rapporteur, amendements, audition des ministres) ;
3. « À l'unanimité » : majorité simple, absolue, qualifiée, unanimité, délégation de vote (« présents et représentés ») ;
4. Pourquoi encore la séance plénière ? (la commission prépare, seule la plénière vote au nom de la chambre ; étapes de la procédure législative) ;
5. Quel est le rôle du Sénat ? (bicamérisme, navette, commission mixte paritaire, dernier mot de l'Assemblée nationale, délais propres au budget) ;
6. Promulgation, publication, entrée en vigueur (délais, contrôle du Conseil constitutionnel, Journal officiel, opposabilité, date d'application).

Règles du commentaire :
- partir de ce que dit l'information, puis expliquer **ce qui s'est passé, pourquoi, comment le mécanisme fonctionne juridiquement et ce qu'il faut en retenir** ; langage d'un bon enseignant de L1, sans jargon non expliqué ;
- relier chaque réponse au cours : article de la Constitution ou du texte applicable, notion du cours (hiérarchie des normes, double degré de juridiction, siège et parquet, légalité des délits et des peines…), et lien vers la leçon du site quand elle existe (`[titre](#l-matiere.lecon)` dans le texte, ou `cours`) ;
- présenter les débats de façon neutre (« l'opposition a regretté… », « le Gouvernement soutient… »), sans opinion politique ;
- chiffres : les recalculer (pourcentages, taux) avant de les écrire.

## Vérification des textes (obligatoire)

Avant de citer un article de loi, un code ou un texte réglementaire, vérifier qu'il est **en vigueur et dans sa dernière rédaction** :
- Constitution : `outils/constitution/constitution.json` (rédaction issue des révisions du 19 mars 2020 et du 25 juillet 2023 : articles 90, 94 et 107 nouveaux, 179 à 182 abrogés). Vérifier en ligne qu'aucune révision plus récente n'est intervenue (Journal officiel, presidence.ci, conseil-constitutionnel.ci) ; si c'est le cas, la reporter dans `extract.py` (comme `REV2023`), refaire la Constitution de la bibliothèque et le signaler ;
- lois, ordonnances, codes, actes uniformes OHADA : vérifier sur une source officielle ou fiable (Journal officiel, sites des ministères, de l'Assemblée nationale, du Sénat, ohada.org, BCEAO) qu'ils n'ont pas été abrogés ou modifiés ;
- ne jamais citer un numéro d'article ou de loi qu'on n'a pas vérifié : écrire plutôt la règle sans le numéro ;
- inscrire la date de vérification dans `verif`. Si une vérification révèle une erreur dans une leçon, corriger la leçon (et la réenregistrer, voir `outils/audio/`).

## Règles générales

- seulement l'actualité juridique et judiciaire **ivoirienne** (lois et ordonnances, Conseil des ministres pour les textes juridiques, Parlement, Conseil constitutionnel, Cour de cassation, Conseil d'État, Cour des comptes, réformes de la justice, barreau, notariat, concours de l'INFJ et de la magistrature, droit OHADA et UEMOA appliqué en Côte d'Ivoire) ;
- toujours vérifier la date et la nationalité de la source (certains sites reprennent l'actualité d'autres pays : Mauritanie, Sénégal…) ;
- résumé et commentaire rédigés par Lisân Campus, jamais copiés ; aucune opinion politique ; pas de faits divers judiciaires visant des particuliers ;
- quand une information fait suite à une autre (vote en plénière après la commission, promulgation…), publier une nouvelle information et faire avancer `etapes` ; le commentaire peut renvoyer à l'information précédente ;
- mettre à jour `maj` (date du jour), changer `VERSION` dans `site/sw.js`, vérifier `node --check site/data/actus.js` et que chaque `id` est unique, ouvrir #actualites et une page #actu-<id> sans erreur de console, puis envoyer sur `main`.
