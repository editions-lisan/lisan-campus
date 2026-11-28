# BOILEAU · la carte du jour

Projet de cartes quotidiennes de mémorisation du droit (Licence 1 à Licence 3), aux couleurs de Lisân Campus, à partager chaque jour sur le site et dans le groupe WhatsApp des étudiants. **Pas encore public** : lancement prévu après les compositions.

- Rythme : du lundi au vendredi, un article de loi (texte exact, référence complète) + un complément (lundi : notion ; mardi : adage ; mercredi : distinction ; jeudi : grand arrêt ou procédure ; vendredi : piège ou chiffre à retenir). Samedi : révision des cinq articles en textes à trous (réponses à l'envers). Dimanche : défi du groupe (cinq questions et défi vocal).
- Devise (pied de chaque carte) : « Boileau seul ne fait pas juriste. Mais tête vide ne plaide pas. »
- `serie-l1.js` : semaines 1 à 8 de L1 (la loi ; la Constitution et l'État ; les biens ; la personne ; domicile, mariage, succession ; la justice ; le contrat ; responsabilité et preuve). Les textes sont recopiés mot pour mot des sources en vigueur : `outils/constitution/constitution.json`, Code civil I et II de la bibliothèque (titre préliminaire, biens et obligations), lois de 2019 sur le mariage, la filiation et les successions (même compilation, à jour), loi n° 2020-491 sur le domicile. `{mot}` = mot surligné, mis en blanc le samedi. Les grands arrêts français portent l'encadré « Et en Côte d'Ivoire ? ».
- `build.js` : fabrique les PNG 1080 × 1350 (format WhatsApp) ; contenu réduit automatiquement s'il dépasse. `NODE_PATH=$(npm root -g) node build.js serie-l1.js <dossier>`.
- `prototype.js` : les trois cartes de présentation envoyées au groupe.
- Avant toute nouvelle carte : vérifier que l'article est en vigueur et dans sa dernière rédaction (consignes de fiabilité juridique de CLAUDE.md).
