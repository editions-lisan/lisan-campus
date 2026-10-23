# Lisân Campus — consignes de travail

- Le site public est `site/index.html` (une seule page, routage par `#ancre`). Il est publié par Netlify à chaque envoi sur la branche `main` (dossier `site`, voir `netlify.toml`).
- La même page existe comme artéfact Claude « Lisân Campus » (https://claude.ai/artifact/HJAZt8haGXG6ubgq9rWVzZ). Toute modification doit être faite dans les deux : l'artéfact contient la page sans l'en-tête `<head>` de la version autonome ni le script d'installation.
- Contenus : en français, rédigés au nom de Mouhamadou CISSEMA et des Éditions Lisân, sans note laissant croire qu'un tiers rédige. Pas de données personnelles.
- Les matières sont des objets `M_*` (leçons `body`, `quiz`, `cards`) listés dans `SUBJECTS` ; `space: "ia"` place une matière dans l'espace « Formation à l'IA ».
- À chaque mise à jour du site, changer la constante `VERSION` de `site/sw.js` pour que les applications installées reçoivent la nouvelle version.
- Avant chaque envoi : ouvrir la page dans un navigateur sans erreur de console, vérifier l'accueil, une leçon, un quiz et les cartes.
- Ne jamais supprimer `site/googlea0fc3a4fa095fe5d.html` : il prouve à Google Search Console que le site appartient aux Éditions Lisân.
