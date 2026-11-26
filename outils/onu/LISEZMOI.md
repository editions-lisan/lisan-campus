# Charte des Nations Unies et Statut de la Cour internationale de Justice

Document de la bibliothèque (rubrique « Textes officiels ») : `site/livres/droit/charte-nations-unies-statut-cij.pdf`.

## Sources

- **Charte** : transcription française du texte en vigueur (amendements des articles 23, 27, 61 et 109 intégrés), avec la note liminaire de l'édition des Nations Unies. `extract_charte.py <texte.txt>` découpe le texte brut du PDF (PyMuPDF) en note liminaire, préambule, chapitres, intertitres (Composition, Fonctions et pouvoirs, Vote, Procédure), articles et alinéas → `charte.json`.
- **Statut** : copie numérisée de la publication officielle des Nations Unies (pages 20 à 30). Texte reconnu par tesseract (`fra`) colonne par colonne, coupures recollées → `statut_ocr.txt` ; `extract_statut.py` le nettoie, suit l'ordre des articles et des alinéas (le 3 est souvent lu 8), puis applique les corrections relues sur les images des pages (`statut_fix.json`) → `statut.json`. Seule correction de fond : article 69, « par la même procédure » (coquille de l'impression).
- Dans les deux textes, les majuscules suivent l'usage actuel des Nations Unies (« Assemblée générale », « Conseil de sécurité », « Secrétaire général », « État »).

## Fabrication

```
python3 outils/onu/extract_charte.py texte_charte.txt
python3 outils/onu/extract_statut.py
DEPS=/chemin/node_modules node outils/onu/build_onu.js     # Paged.js + Chromium, signets par article (../constitution/signets.py)
node outils/cours/versions.js                               # v, pages et mb dans site/data/livres.js
```

## Page « État de mise à jour »

Tableau texte de 1945 / texte en vigueur pour les articles 23, 27, 61 et 109 (dates d'adoption et d'entrée en vigueur d'après la note liminaire et la page « Amendments to Articles 23, 27, 61, 109 » de un.org), note liminaire, pratique sans modification du texte (Chine : résolution 2758 (XXVI) du 25 octobre 1971 ; Russie : lettre du 24 décembre 1991 ; Conseil de tutelle suspendu le 1er novembre 1994 ; « États ennemis » et chapitre XIII : résolution 60/1, paragraphes 176 et 177), la Côte d'Ivoire (Membre depuis le 20 septembre 1960, résolution 1484 (XV) ; Constitution, articles 119, 120 et 123).

À chaque amendement de la Charte ou du Statut entré en vigueur : reporter le nouveau texte dans le JSON, compléter le tableau et le marqueur `AMEND` de `build_onu.js`, refaire le PDF puis `versions.js`.
