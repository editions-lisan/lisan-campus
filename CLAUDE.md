# Lisân Campus — consignes de travail

- Le site public est dans le dossier `site` (une seule page, routage par `#ancre`). Il est publié par Netlify à chaque envoi sur la branche `main` (voir `netlify.toml`).
  - `index.html` : en-tête, référencement, menu ☰, pied de page, formulaire de contact Netlify caché, liste `SUBJECTS`.
  - `app.js` : fonctionnement (espaces, leçons, quiz, cartes, glossaire, paramètres, compte, pages d'information, menu).
  - `styles.css` : mise en page ; `fonts/` : police Lisan Naskh (voyelles en couleur) ; `logo.png`.
  - `data/droit.js`, `data/ia.js`, `data/arabe.js`, `data/coran.js` : les matières.
  - `auth.js` + `config.js` : connexion Google et inscription par espace (Firebase). Tant que `config.js` vaut `null`, tout le site reste en accès libre.
- Accès : l'accueil, la présentation des espaces et la première leçon de chaque matière sont libres ; le reste demande la connexion Google puis l'inscription à l'espace concerné (une inscription par espace). Ce contrôle se fait dans le navigateur : il organise l'accès, il ne protège pas les contenus.
- Espaces : `space` vaut `droit`, `ia`, `arabe` ou `coran` (voir `SPACES` dans `app.js`). L'arabe s'écrit `[[...]]` dans les textes des leçons.
- `data/arabe.js` et `data/coran.js` sont des compagnons des livres Lisân (niveaux 0 à 3, « Lire le Coran »), produits par le script `gen_campus.py` des sources des livres : les régénérer plutôt que les modifier à la main. Les récitations du Coran sont celles d'al-Ḥouṣarî (everyayah.com) ; pas de voix de synthèse pour le Coran.
- L'artéfact Claude « Lisân Campus » (https://claude.ai/artifact/HJAZt8haGXG6ubgq9rWVzZ) est un aperçu : la page sans l'en-tête `<head>`, sans formulaire Netlify ni script d'installation, avec les mêmes fichiers (`styles.css`, `app.js`, `data/`, `fonts/`, `logo.png`…). Le republier après chaque mise à jour.
- Contenus : en français, rédigés au nom de Mouhamadou CISSEMA et des Éditions Lisân, sans note laissant croire qu'un tiers rédige. Pas de données personnelles.
- À chaque mise à jour du site, changer la constante `VERSION` de `site/sw.js` (et ajouter tout nouveau fichier à la liste `CORE`) pour que les applications installées reçoivent la nouvelle version.
- Avant chaque envoi : ouvrir la page dans un navigateur sans erreur de console, vérifier l'accueil, une leçon de chaque espace, un quiz, les cartes et le menu.
- Ne jamais supprimer `site/googlea0fc3a4fa095fe5d.html` : il prouve à Google Search Console que le site appartient aux Éditions Lisân.
