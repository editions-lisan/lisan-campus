# « Lire le Coran pas à pas 2 » — sources et fabrication

Une seule source pour quatre sorties : le livre de l'élève (Word + PDF), le cahier d'exercices, le livret du maître et le parcours `M_QR2` du site (`site/data/coran2.js` et les mini-exercices `qr2/tN` de `site/data/mini.js`).

## Contenu

- `e1spec.py`, `e2.py` … `e10.py` : les dix étapes et leurs 40 leçons (objectifs, « Je découvre », « Je retiens », lectures, mots du Coran, exercices, jeux, bilans, exercices du cahier, mini-exercices, cartes). Le texte du livre de l'étape 1 est rédigé dans `c_e1.py` ; `e1spec.py` en donne les données pour le cahier, le livret et le site.
- `tajwid.py` : repérage automatique des règles (noûn sâkin et tanwîn, mîm sâkin, qalqala…) dans le texte du Mouss-haf ; `ctx.py` : choix des exemples. Tous les mots et versets viennent du texte du Mouss-haf (`W(sourate, verset, mot)`), jamais d'une saisie à la main.
- `lib.py`, `blocks.py`, `lesson.py`, `annexes.py`, `c_front.py` : mise en page Word (même gabarit que le niveau 1 : polices Lisan Naskh à voyelles en couleur, Nunito, Quicksand, Fredoka).
- `main.py` (livre de l'élève), `cahier.py`, `maitre.py`, `gen_site.py` (site), `cover.py` (couverture), `assets/` (couvertures, en-tête, pied de page, logo sans nom d'auteur), `pages.json` (page de chaque leçon dans le livre et le cahier, reprise dans les encadrés « Dans le livre » du site).

## Fabrication

Dossier de travail `LC2_BASE` contenant :
- `qj/package/dist/quran.json` et `quran_fr.json` (texte uthmani du Mouss-haf de Médine) ;
- `lc1/x/` : le livre Word du niveau 1 décompressé (gabarit : styles, polices intégrées, icônes, schéma de l'appareil de la parole) ; les polices intégrées doivent être installées pour LibreOffice (`~/.fonts`).

```
LC2_BASE=/chemin/travail python3 main.py out/LC2.docx      # livre de l'élève (+ PDF)
LC2_BASE=/chemin/travail python3 cahier.py out/Cahier.docx
LC2_BASE=/chemin/travail python3 maitre.py out/Maitre.docx
LC2_BASE=/chemin/travail python3 gen_site.py               # site/data/coran2.js et mini.js
```

Les modules d'étapes doivent être importés dans l'ordre (2 à 10) : le choix automatique des exemples en dépend. Après une modification qui déplace les pages, recalculer `pages.json` à partir des PDF (bandeaux « ÉTAPE n • LEÇON n »).

Sur le site : `livres/Lisan_lire-le-coran-2_eleve.pdf` et `_exercices.pdf` (lecture en ligne seulement) ; le livret du maître n'est pas mis en ligne.
