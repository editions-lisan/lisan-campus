# Supports photographiés : redresser et nettoyer sans retoucher le contenu

Pour un support remis en photos (comme le cours d'informatique 2026-2027) :

1. `pdfimages -j support.pdf raw/p` : photos d'origine, pleine résolution ;
2. `python3 nettoyer.py raw clean` : pour chaque page, perspective (si la feuille est photographiée de biais), rotation mesurée sur les lignes de texte (cadre agrandi : rien n'est coupé), fond du papier estimé seulement sur le papier puis divisé (ombres et voile effacés, grandes cases colorées intactes), encre assombrie selon la pâleur de la page, netteté légère, bords sombres retirés ; la couverture garde ses couleurs (lumière et netteté seulement) ;
3. `python3 assembler.py` (dans le même dossier) : pages au format du support (546 × 792 pt, 1 360 px de large, JPEG 64), coordonnées de l'enseignant masquées sur la couverture, couche de texte invisible (tesseract, français) pour la recherche et la sélection → `propre.pdf`.

Le texte, les tableaux et les images ne sont jamais modifiés : seules la géométrie et la lumière changent.
