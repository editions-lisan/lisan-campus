# Romans juridiques en anglais (« Legal Stories from Abidjan »)

Quatre courts romans (trois chapitres chacun) et un chapitre d'accueil, parcours `M_LIT` de l'espace Droit.

- `r1.js` (romans I et II) et `r2.js` (romans III et IV) : textes anglais et traductions, vocabulaire, dialogue, « Language corner », questions et mini-exercices de chaque chapitre.
- `node build_site.js` : écrit `site/data/romans.js` et les entrées `lit/…` de `site/data/mini.js` ; reprend la durée des enregistrements de `data/audio.js` pour le bouton « Écouter le chapitre ».
- `python3 covers.py` : couvertures `site/img/romans/*.svg`.
- Enregistrements : `outils/audio/extract.js` crée pour chaque chapitre un fichier complet (narrateur Ryan, Aïcha : Amy, autres femmes : Lessac, hommes : Joe) et un fichier par dialogue ; puis `synth.py` (voir `outils/audio/LISEZMOI.md`).
- Le livret PDF de la bibliothèque est `site/livres/droit/legal-stories-from-abidjan.pdf` (mêmes textes, vocabulaire, questions, corrigés et lexique).

Après toute modification d'un texte : relancer `build_site.js`, réenregistrer les chapitres concernés, refaire le livret, changer `VERSION` dans `site/sw.js`.
