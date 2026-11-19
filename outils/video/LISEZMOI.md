# Les deux vidéos du site (site/media/)

| Vidéo | Fichiers | Où | Source |
|---|---|---|---|
| Présentation (23 s, 1280 × 720, musique) | `campus-720` et `campus-480` (MP4 et WebM), `poster.webp` | accueil, lecture automatique sans le son | `index.html` (animation `render(t)`), `son.py` (bande-son) |
| Mode d'emploi (≈ 1 min 40, 720 × 1280, voix commentée et sous-titres) | `guide-720` (MP4 et WebM), `guide-poster.webp` | accueil (« Le mode d'emploi en vidéo ») et page `#guide` | dossier `guide/` |

**Règle : à chaque nouvelle fonctionnalité ou nouveauté visible par les élèves, mettre à jour l'une ou l'autre vidéo selon le besoin, dans le même envoi.**
- Nouveau parcours, nouvel espace, nouvelle rubrique : la présentation (scène « Cinq espaces » et scène « Nouveau : le Campus s'agrandit », qui montre les cinq dernières nouveautés) ; si elle change la façon de se servir du site, aussi le mode d'emploi.
- Changement d'un écran montré dans le mode d'emploi (inscription, leçon, mini-exercice, cartes, évaluation, avis, certificat, actualité, menu) ou nouvelle étape pour l'élève : le mode d'emploi, et la liste `GUIDE_STEPS` et la durée `GUIDE_DUR` dans `site/app.js`.

## Préparer (une fois par machine)
- polices : `npm i @fontsource/literata@5.1.0 @fontsource/atkinson-hyperlegible@5.1.0`, puis copier les deux paquets dans `outils/fonts/fontsource-literata-5.1.0/package` et `outils/fonts/fontsource-atkinson-hyperlegible-5.1.0/package` (dossier non suivi par git) ;
- Playwright et Chromium (déjà présents dans l'environnement), ffmpeg, Python avec numpy et scipy ;
- voix du mode d'emploi : `pip install sherpa-onnx==1.12.40 soundfile`, puis la voix `vits-piper-fr_FR-siwis-medium.tar.bz2` (publications « tts-models » du dépôt k2-fsa/sherpa-onnx, comme pour `outils/audio`).

## Présentation
1. Modifier `index.html` (textes, cartes des espaces, nouveautés `nf0`…`nf4`, visuels `rc0`…`rc3`, captures du téléphone `img/s_*.png` : 780 px de large, page entière, en-tête non fixe) ; vérifier quelques instants avec `index.html#14.5` dans un navigateur ;
2. `node render.js index.html 1280 720 /tmp/campus-master.mp4 2.6 /tmp/poster.jpg` ;
3. `python3 son.py /tmp/campus.wav` (la bande-son suit le minutage de `render(t)` : 23 s) ;
4. `sh encode.sh /tmp/campus-master.mp4 /tmp/campus.wav campus 1280 720 854 480`, puis `poster.jpg` → `site/media/poster.webp`.

## Mode d'emploi (`guide/`)
1. `node guide/captures.js` : captures du site actuel au format téléphone, avec l'élève de démonstration Habiba ZABRE (`guide/demo-auth.js` remplace la connexion Google ; aucune donnée réelle), dans `guide/img/` (non suivi par git), et positions utiles dans `guide/captures.json` ;
2. modifier `guide/scenes.json` : une scène par étape (titre, sous-titre `caption`, texte lu `say` avec la prononciation adaptée — « Lissâne », « point dève » —, plans `shots` avec le défilement et le doigt qui touche l'écran) ;
3. `python3 guide/voix.py <dossier de la voix siwis>` : voix, nappe musicale et minutage → `guide/data.js` et `guide/guide.wav` ;
4. vérifier quelques instants avec `guide/guide.html#40` dans un navigateur ;
5. `node render.js guide/guide.html 720 1280 /tmp/guide-master.mp4 4.2 /tmp/guide-poster.jpg`, puis `sh encode.sh /tmp/guide-master.mp4 guide/guide.wav guide 720 1280` et `guide-poster.jpg` → `site/media/guide-poster.webp` ;
6. reporter la durée dans `GUIDE_DUR` et les étapes dans `GUIDE_STEPS` (`site/app.js`), changer `VERSION` dans `site/sw.js`.

Les vidéos ne passent pas par le cache hors connexion ; `/media/*` est servi en `Cache-Control: no-cache` (les téléphones revérifient la version).
