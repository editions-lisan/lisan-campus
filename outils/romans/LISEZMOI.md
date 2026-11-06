# Roman juridique en anglais : « The Missing Will » (Legal Stories from Abidjan, livre 1)

Parcours `M_LIT` de l'espace Droit : un chapitre d'accueil, le prologue, dix chapitres en trois parties (*The Widow*, *The Search*, *The Judgment*) et l'épilogue.

- `novel1_p1.js`, `novel1_p2.js`, `novel1_p3.js` : les trois parties ; pour chaque chapitre, l'introduction française, les paragraphes `[anglais, français]`, le vocabulaire, le « Language corner », les questions avec corrigé et le mini-exercice.
- `node build_site.js` : écrit `site/data/romans.js` et les entrées `lit/…` de `site/data/mini.js` ; reprend la durée des enregistrements de `data/audio.js` pour le bouton « Écouter le chapitre ».
- `node illus.js` : couverture, pages de partie et vignettes de chapitre dans `site/img/romans/`.
- Livre PDF illustré (A5, sans tableaux : page de titre, sommaire, personnages, parties illustrées, lettrines, puis notes de droit, lexique et questions en français) : dans un dossier de travail, `npm i pagedjs@0.4.3 hyphen @fontsource/literata @fontsource/cormorant-garamond`, puis `DEPS=<ce dossier>/node_modules node build_book.js` → `site/livres/droit/the-missing-will.pdf` (mettre à jour le nombre de pages dans `data/livres.js`). Les coupures de mots viennent du paquet `hyphen`.
- Enregistrements : `outils/audio/extract.js` crée un fichier par chapitre, lu par un seul narrateur (Ryan), avec une pause plus longue entre les paragraphes ; puis `synth.py` (voir `outils/audio/LISEZMOI.md`).
- `brouillons/` : les trois autres affaires du cabinet Kouassi & Traoré (*The Locked Door*, *A Night at the Police Station*, *Two Hundred Uniforms*) dans leur première version courte (`r1.js`, `r2.js`, couvertures de `covers.py`), base des prochains livres de la série.

Après toute modification d'un texte : relancer `build_site.js`, réenregistrer les chapitres concernés, refaire le livre, changer `VERSION` dans `site/sw.js`.
