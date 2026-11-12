# Documents de cours de l'espace Droit (livres/droit/cours-*.pdf)

Un document par matière, à la même mise en page, construit à partir des leçons du site (`site/data/droit.js`) dans l'ordre du plan des cours et des sommaires fournis : couverture, sommaire paginé, parties et chapitres, chaque leçon avec ses encadrés et ses exercices suivis de leur corrigé, puis un lexique tiré des cartes de révision.

- `build_cours.js` : plan de chaque document (`DOCS` : leçons rangées par partie et chapitre), mise en pages (Paged.js), PDF (Chromium). Toute leçon d'une matière doit y être placée, sinon le script s'arrête.
- `complements.js` : pages propres aux documents (schéma simplifié du procès civil des TD de droit civil, bibliographie du cours de droit musulman).
- `originaux/` : polycopié du cours et fiches de TD de droit civil (M. TRAORE), ajoutés en annexe du document de droit civil.

Refaire les documents après toute modification des leçons :

1. dans un dossier DEPS : `npm i pagedjs@0.4.3 hyphen @fontsource/literata` ;
2. `DEPS=/chemin/node_modules node outils/cours/build_cours.js` (ou seulement certains : `… build_cours.js dm oj`) ;
3. reporter le nombre de pages et la taille affichés dans `window.DOCS` (`site/data/livres.js`), puis changer `VERSION` dans `site/sw.js`.
