# Les deux vidéos du site (site/media/)

| Vidéo | Fichiers | Où | Source |
|---|---|---|---|
| Présentation (76 s, 1280 × 720, musique) | `campus-720` et `campus-480` (MP4 et WebM), `poster.webp` | accueil, lecture automatique sans le son | `index.html` (animation `render(t)`), `son.py` (bande-son) |
| Mode d'emploi (≈ 1 min 50, 720 × 1280, voix commentée et sous-titres) | `guide-720` (MP4 et WebM), `guide-poster.webp` | accueil (« Le mode d'emploi en vidéo ») et page `#guide` | dossier `guide/` |
| Réviser le droit (1 min 13, 720 × 1280, voix, sous-titres, code QR) | `droit-720` (MP4 et WebM), `droit-poster.webp` | en tête de l'espace Droit ; à envoyer sur WhatsApp | dossier `droit/` |

**Règle : à chaque nouvelle fonctionnalité ou nouveauté visible par les élèves, mettre à jour l'une ou l'autre vidéo selon le besoin, dans le même envoi.**
- Nouveau parcours, nouvel espace, nouvelle rubrique : la présentation (cartes `CARDS` des « Cinq espaces », scène de l'espace concerné dans `SC`, scènes « Pour bien apprendre » et « Bibliothèque et certificats ») ; si elle change la façon de se servir du site, aussi le mode d'emploi.
- Changement d'un écran montré dans le mode d'emploi (inscription, leçon, mini-exercice, cartes, évaluation, avis, certificat, actualité, menu) ou nouvelle étape pour l'élève : le mode d'emploi, et la liste `GUIDE_STEPS` et la durée `GUIDE_DUR` dans `site/app.js`.

## Préparer (une fois par machine)
- polices : `npm i @fontsource/literata@5.1.0 @fontsource/atkinson-hyperlegible@5.1.0`, puis copier les deux paquets dans `outils/fonts/fontsource-literata-5.1.0/package` et `outils/fonts/fontsource-atkinson-hyperlegible-5.1.0/package` (dossier non suivi par git) ;
- Playwright et Chromium (déjà présents dans l'environnement), ffmpeg, Python avec numpy et scipy ;
- voix du mode d'emploi : `pip install sherpa-onnx==1.12.40 soundfile`, puis la voix `vits-piper-fr_FR-siwis-medium.tar.bz2` (publications « tts-models » du dépôt k2-fsa/sherpa-onnx, comme pour `outils/audio`).

## Présentation
Vidéo intemporelle : elle présente ce que le Campus offre, sans jamais parler de nouveauté, de version ni de mise à jour. Identité du site (ivoire, bleu nuit, émeraude, or champagne, étoile à huit branches). Douze scènes, minutage dans `S` (`index.html`) : l'ouverture (l'étoile se trace autour du logo) ; « Un campus numérique » (apprendre, lire, s'exercer, progresser, et les chiffres réels du Campus dans `FIGS` : espaces, parcours, leçons, questions d'évaluation, cartes — à recompter quand les contenus changent) ; les cinq espaces (`CARDS`, nombre de leçons) ; puis les scènes de `SC`, texte à gauche et téléphone à droite : le tableau de bord de l'accueil, le parcours en étoiles (dessiné en direct : `PN`), les leçons (écoute, mini-exercice), la langue arabe et les sciences islamiques (trois encadrés et les huit couvertures), la Licence 1 de droit, la formation à l'IA, « Réviser et progresser » (tuiles), « Bibliothèque et certificats » ; la fin sur l'adresse du site. Les hauteurs se placent seules (`layout()`).
1. `NODE_PATH=$(npm root -g) node captures_pres.js` : captures du site actuel au format téléphone (390 px, 1 500 px de haut, réduites à 580 × 2231) dans `img/s_*.jpg`, avec l'élève de démonstration Habiba ZABRE (`guide/demo-auth.js`) et une progression de démonstration ; à refaire quand les écrans changent ;
2. modifier `index.html` ; vérifier quelques instants avec `index.html#30` dans un navigateur ;
3. `NODE_PATH=$(npm root -g) node cues.js` : exporte le minutage et les repères (titres, éléments, étoiles) dans `cues.json`, que suit la bande-son ;
4. `node render.js index.html 1280 720 /tmp/campus-master.mp4 3.2 /tmp/poster.jpg` ;
5. `python3 son.py /tmp/campus.wav` ;
6. `sh encode.sh /tmp/campus-master.mp4 /tmp/campus.wav campus 1280 720 854 480` (la version 480 p, lue sur téléphone, est plus compressée), puis `poster.jpg` → `site/media/poster.webp`.

## Mode d'emploi (`guide/`)
1. `node guide/captures.js` : captures du site actuel au format téléphone, avec l'élève de démonstration Habiba ZABRE (`guide/demo-auth.js` remplace la connexion Google ; aucune donnée réelle), dans `guide/img/` (non suivi par git), et positions utiles dans `guide/captures.json` ;
2. modifier `guide/scenes.json` : une scène par étape (titre, sous-titre `caption`, texte lu `say` avec la prononciation adaptée — « Lissâne », « point dève » —, plans `shots` avec le défilement et le doigt qui touche l'écran) ;
3. `python3 guide/voix.py <dossier de la voix siwis>` : voix, nappe musicale et minutage → `guide/data.js` et `guide/guide.wav` ;
4. vérifier quelques instants avec `guide/guide.html#40` dans un navigateur ;
5. `node render.js guide/guide.html 720 1280 /tmp/guide-master.mp4 4.2 /tmp/guide-poster.jpg`, puis `sh encode.sh /tmp/guide-master.mp4 guide/guide.wav guide 720 1280` et `guide-poster.jpg` → `site/media/guide-poster.webp` ;
6. reporter la durée dans `GUIDE_DUR` et les étapes dans `GUIDE_STEPS` (`site/app.js`), changer `VERSION` dans `site/sw.js`.

Les vidéos ne passent pas par le cache hors connexion ; `/media/*` est servi en `Cache-Control: no-cache` (les téléphones revérifient la version).

## Réviser le droit (`droit/`)
Même chaîne que le mode d'emploi, avec l'élève de démonstration inscrite à l'espace Droit : `node droit/captures.js` (captures `droit/img/d_*.png`, positions `droit/captures.json`), `droit/scenes.json` (sept scènes : matières, écoute, mini-exercice, cas pratiques, cartes et révisions, évaluation, cours en PDF), `python3 droit/voix.py <voix siwis>` → `droit/data.js` et `droit/droit.wav`, vérifier avec `droit/droit.html#40`, puis `node render.js droit/droit.html 720 1280 /tmp/droit-master.mp4` et `sh encode.sh /tmp/droit-master.mp4 droit/droit.wav droit 720 1280` ; affiche : instant 5,5 s sans le sous-titre → `site/media/droit-poster.webp` ; durée dans `DROIT_DUR` (`site/app.js`). Code QR de la fin : `droit/img/qr.png` (vers `#espace-droit`).
