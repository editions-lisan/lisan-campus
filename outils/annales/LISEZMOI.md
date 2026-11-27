# Sujets d'examen corrigés (Licence 1)

Recueil des Éditions Lisân : `site/livres/droit/sujets-examen-corriges-l1.pdf` (bibliothèque, rubrique « Exercices » de l'espace Droit).

- `annales.js` : contenu, sous la forme d'une matière du site (`lessons` → `body` en blocs `p`, `h`, `ol`, `ul`, `table`, `box`, `corrige`) et plan (`parts`).
- Les cas pratiques et exercices sont des sujets nouveaux, écrits pour Lisân Campus à partir des problèmes de droit habituellement posés en L1 : ne jamais recopier l'énoncé d'un autre recueil (les questions et les règles ne sont pas protégées, la rédaction d'un énoncé l'est). Les corrigés suivent les leçons du site et le droit ivoirien en vigueur ; les sujets de dissertation renvoient aux leçons à revoir.
- Fabrication : `DEPS=/chemin/node_modules node outils/cours/build_cours.js annales`, puis `node outils/cours/versions.js`.
- Les questions d'entraînement tirées du recueil sont ajoutées aux évaluations du Droit civil et du Droit constitutionnel (bloc « Entraînement aux examens » à la fin de `site/data/droit.js`).
- À compléter au second semestre : droit de la famille, droit constitutionnel 2 (institutions ivoiriennes), histoire du droit, économie politique.

# Annales des examens de Licence 1 (avec corrigé)

Document des Éditions Lisân : `site/livres/droit/annales-examens-l1-corrigees.pdf` (bibliothèque, rubrique « Exercices »).

- Vingt sujets réellement posés en L1 Droit (2021-2022 à 2024-2025), classés par matière, doublons regroupés : `examens_sujets.js`. Aucun nom d'enseignant ni d'étudiant ; noms d'emprunt dans les cas pratiques ; décisions de justice reproduites ; l'extrait de manuel du sujet 10 est seulement résumé avec sa référence.
- Corrigé général : `examens_corr_a.js` (sujets 1 à 8), `examens_corr_b.js` (9 à 15), `examens_corr_c.js` (16 à 20), selon les leçons du site et le droit ivoirien en vigueur ; pour chaque arrêt français, un encadré « Et en Côte d'Ivoire ? ».
- Plan et présentation (mode d'emploi, notions qui reviennent) : `examens.js`.
- Fabrication : `DEPS=/chemin/node_modules node outils/cours/build_cours.js examens`, puis `node outils/cours/versions.js`.
