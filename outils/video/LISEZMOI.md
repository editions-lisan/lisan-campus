# Les deux vidéos du site (site/media/)

| Vidéo | Fichiers | Où | Source |
|---|---|---|---|
| Présentation (62 s, 1280 × 720, musique) | `campus-720` et `campus-480` (MP4 et WebM), `poster.webp` | accueil, lecture automatique sans le son | `index.html` (animation `render(t)`), `son.py` (bande-son) |
| Mode d'emploi (≈ 1 min 40, 720 × 1280, voix commentée et sous-titres) | `guide-720` (MP4 et WebM), `guide-poster.webp` | accueil (« Le mode d'emploi en vidéo ») et page `#guide` | dossier `guide/` |
| Réviser le droit (1 min 14, 720 × 1280, voix, sous-titres, code QR) | `droit-720` (MP4 et WebM), `droit-poster.webp` | en tête de l'espace Droit ; à envoyer sur WhatsApp | dossier `droit/` |

**Règle : à chaque nouvelle fonctionnalité ou nouveauté visible par les élèves, mettre à jour l'une ou l'autre vidéo selon le besoin, dans le même envoi.**
- Nouveau parcours, nouvel espace, nouvelle rubrique : la présentation (cartes `CARDS` des « Cinq espaces », scène de l'espace concerné dans `SC`, scènes « Pour bien apprendre » et « Bibliothèque et certificats ») ; si elle change la façon de se servir du site, aussi le mode d'emploi.
- Changement d'un écran montré dans le mode d'emploi (inscription, leçon, mini-exercice, cartes, évaluation, avis, certificat, actualité, menu) ou nouvelle étape pour l'élève : le mode d'emploi, et la liste `GUIDE_STEPS` et la durée `GUIDE_DUR` dans `site/app.js`.

## Préparer (une fois par machine)
- polices : `npm i @fontsource/literata@5.1.0 @fontsource/atkinson-hyperlegible@5.1.0`, puis copier les deux paquets dans `outils/fonts/fontsource-literata-5.1.0/package` et `outils/fonts/fontsource-atkinson-hyperlegible-5.1.0/package` (dossier non suivi par git) ;
- Playwright et Chromium (déjà présents dans l'environnement), ffmpeg, Python avec numpy et scipy ;
- voix du mode d'emploi : `pip install sherpa-onnx==1.12.40 soundfile`, puis la voix `vits-piper-fr_FR-siwis-medium.tar.bz2` (publications « tts-models » du dépôt k2-fsa/sherpa-onnx, comme pour `outils/audio`).

## Présentation
Onze scènes, minutage dans `S` (`index.html`) : la marque ; les huit livres de la collection et le kit (livre de l'élève, cahier, livret du maître) ; les cinq espaces (`CARDS`, nombre de leçons) ; une scène par espace — arabe, Coran (niveaux 1 et 2), islam, droit (dix matières, roman, actualité commentée), IA (huit parcours) — puis « Pour bien apprendre » (tuiles) et « Bibliothèque et certificats », toutes décrites dans `SC` (sur-titre, titre, lignes, étiquettes, tuiles, captures du téléphone et leur défilement) ; l'adresse du site. Les hauteurs se placent seules (`layout()`), selon que le titre tient sur une ou deux lignes.
1. Captures du téléphone `img/s_*.jpg` : pages du site au format téléphone (390 px, page entière, 1 500 px de haut), réduites à 580 × 2231 ; à refaire quand les écrans changent beaucoup ;
2. modifier `index.html` ; vérifier quelques instants avec `index.html#30` dans un navigateur ;
3. `node render.js index.html 1280 720 /tmp/campus-master.mp4 2.6 /tmp/poster.jpg` ;
4. `python3 son.py /tmp/campus.wav` (même minutage : reporter tout changement de `S` dans `S` et `ESP` de `son.py`) ;
5. `sh encode.sh /tmp/campus-master.mp4 /tmp/campus.wav campus 1280 720 854 480` (la version 480 p, lue sur téléphone, est plus compressée), puis `poster.jpg` → `site/media/poster.webp`.

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
