# Lisân Campus

**Accéder au site : [lisan-campus.netlify.app](https://lisan-campus.netlify.app)**

**Lisân Campus** est le site d'apprentissage des **Éditions Lisân**, fondées par **Mouhamadou CISSEMA** (Abidjan, Côte d'Ivoire).

Le site réunit quatre espaces :

- **Apprendre l'arabe** : les compagnons des livres « Je lis l'arabe ! » (niveau 0) et « Je parle arabe ! » (niveaux 1 à 3) — lettres, syllabes, vocabulaire, dialogues et textes, avec la voix, des quiz et des cartes de révision ;
- **Lire le Coran pas à pas** : le compagnon du livre — lettres coraniques, signes de lecture, mots et versets, avec la récitation d'al-Ḥouṣarî ;
- **Droit · Licence 1** : les matières de la Licence 1 Droit de l'Université Musulmane Africaine (introduction au droit, droit civil, droit musulman, organisation judiciaire, méthodologie juridique, expression écrite, anglais, informatique), enrichies au fil des cours ;
- **Formation à l'IA avec Claude** : comprendre l'intelligence artificielle et maîtriser Claude pour étudier, travailler et produire, en toute sécurité.

La première leçon de chaque matière est en accès libre. Pour la suite, on se connecte avec son compte Google et on s'inscrit, gratuitement, à chaque espace qu'on veut suivre. Le site s'installe sur le téléphone comme une application et fonctionne hors connexion.

Les espaces de droit sont une initiative indépendante ; Lisân Campus n'est pas un site officiel de l'Université Musulmane Africaine.

## Organisation du dépôt

| Fichier | Rôle |
|---|---|
| `site/index.html` | La page : en-tête, menu, pied de page, référencement |
| `site/app.js` | Le fonctionnement du site |
| `site/styles.css` | La mise en page |
| `site/data/*.js` | Les contenus des quatre espaces |
| `site/fonts/` | La police arabe Lisan Naskh (voyelles en couleur) |
| `site/auth.js`, `site/config.js` | Connexion Google et inscription par espace |
| `site/manifest.webmanifest`, `site/sw.js` | Application installable et lecture hors connexion |
| `site/logo.png`, `site/icon-*.png`, `site/apple-touch-icon.png`, `site/favicon-32.png` | Logo et icônes Lisân |
| `site/robots.txt`, `site/sitemap.xml` | Moteurs de recherche |
| `netlify.toml` | Publication sur Netlify (dossier `site`) |

© Mouhamadou CISSEMA — Éditions Lisân. Tous droits réservés.
