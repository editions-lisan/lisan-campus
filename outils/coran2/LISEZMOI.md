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

## Audio des « mots du Coran » (site)

Sur le site, « Le mot » fait entendre **exactement ce qui est écrit sur la carte**, tel qu'al-Ḥouṣarî le récite (al-Muṣḥaf al-mu‘allim, lecture de Ḥafṣ ; fichiers verset par verset d'EveryAyah, dépôt GitHub `Raf0707/q7h_husary_muallim`), lu comme la leçon le demande. Fabrication :

- `mots_plan.py` choisit le passage de chaque carte : un mot qui commence par une hamza de liaison ou une lettre doublée par l'assimilation est pris en tête d'un autre verset (sinon avec le mot précédent) ; si le mot suivant commence par une lettre doublée ou par l'article devant une lettre solaire, il est ajouté ; quand la règle se fait entendre à l'arrêt (qalqala, madd ‘âriḍ et lîn, râ’ à l'arrêt, « comment m'arrêter »…), une occurrence en fin de verset ; remplacements choisis à la main dans `REMPLACE`. La carte du site affiche le passage retenu (le livre garde ses exemples).
- `mots_ctc.py` cale chaque lettre dans le temps par alignement forcé sur le texte du verset (modèle Omnilingual ASR 300M CTC de Meta, version ONNX de sherpa-onnx, licence Apache 2.0) et coupe juste avant l'attaque de la première lettre prononcée du mot suivant (creux d'énergie) ; aux pauses du récitateur, l'extrait va jusqu'au silence (rebond de la qalqala, ghounna, allongement entiers). Contrôle : le même modèle compare « exactement le texte écrit » aux hypothèses « une lettre du mot voisin en plus » et « une lettre du mot coupée » ; un écart négatif signale l'extrait pour une écoute (`doute` dans `mots_audio.json`).
- `mots_audio.py` : lecture des fichiers, fondu, niveau égalisé, MP3 mono 64 kb/s.
- `mots_build.py` fabrique tout (`site/audio/qr2/*.mp3` et `mots_audio.json`, repris par `lesson.py`) ; `mots_rapport.py sortie.xlsx` produit le tableau des corrections (hors site).

```
HUSARY_DIR=…/q7h_husary_muallim OMNI=…/sherpa-onnx-omnilingual-asr-1600-languages-300M-ctc-int8-2025-11-12 \
QALIGN=…/Husary_Muallim_128kbps.json LC2_BASE=/chemin/travail python3 mots_build.py && python3 gen_site.py
```

`QALIGN` (minutage quran-align de C. Fair, CC BY 4.0) ne sert plus qu'à vérifier qu'un verset existe. Changer `VERSION` dans `mots_build.py` refait tous les extraits.

