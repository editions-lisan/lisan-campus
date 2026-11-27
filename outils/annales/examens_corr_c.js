// Annales des examens de Licence 1 : corrigés des sujets 16 à 20 (économie politique, informatique,
// anglais juridique, rédaction administrative, éthique et morale).

const C = [];

// ---------------------------------------------------------------- 16
C.push({ id: 'c16', title: 'Corrigé du sujet 16 · Économie politique', body: [
  { p: '*Leçons à revoir : Chapitre I, exercices corrigés ; Chapitre II, exercices corrigés ; Chapitre III, principes 9 et 10 (Économie politique).*' },
  { p: '**1. L\'activité économique.** C\'est l\'ensemble des actes par lesquels les agents économiques (ménages, entreprises, institutions financières, administrations, reste du monde) **produisent**, **répartissent**, **échangent** et **consomment** des biens et des services pour satisfaire leurs besoins, à partir de ressources rares. Le cours insiste sur l\'**échange** : il existe parce que les individus sont différents (préférences, dotations) et qu\'il y a un gain à l\'échange.' },
  { p: '**2. Le besoin.** Une **sensation d\'insatisfaction qui ne peut être effacée qu\'au prix d\'un effort**. Il peut être physiologique (manger, se vêtir) ou social (manger dans un restaurant réputé) ; il est économique quand sa satisfaction exige une production.' },
  { p: '**3. L\'homo œconomicus.** C\'est l\'**individu rationnel** des modèles économiques : il connaît ses préférences, compare les coûts et les avantages de chaque choix et cherche à **maximiser sa satisfaction** (le consommateur, sous sa contrainte budgétaire) ou **son profit** (le producteur, en minimisant ses coûts). C\'est une hypothèse de travail : « S\'il est irréaliste de considérer les individus comme rationnels, il serait encore plus irréaliste de les considérer comme irrationnels » (Amartya Sen).' },
  { p: '**4. Les caractéristiques du besoin** : la **diversité** (les besoins sont multiples et, ensemble, illimités) ; la **satiabilité** (un besoin s\'apaise à mesure qu\'on le satisfait) ; l\'**interdépendance** (un besoin en entraîne d\'autres : une voiture appelle le carburant) ; l\'**évolution dans le temps et dans l\'espace**. On y ajoute la **comparabilité** : chacun hiérarchise ses besoins.' },
  { p: '**5. La loi de Pareto (20/80).** Environ **80 % des effets proviennent de 20 % des causes**. Vilfredo Pareto avait observé qu\'environ 20 % de la population possédait 80 % des terres en Italie. Exemple : 20 % des clients d\'une entreprise font souvent 80 % de son chiffre d\'affaires. On ne la confond pas avec l\'**optimum de Pareto**, situation où l\'on ne peut plus améliorer le sort d\'un individu sans détériorer celui d\'un autre.' },
  { p: '**6. La courbe de Phillips.** Elle décrit une **relation inverse** entre l\'inflation et le chômage : moins de chômage s\'accompagne de plus d\'inflation, et inversement. Phillips (1958) l\'observe entre la hausse des salaires et le chômage au Royaume-Uni ; Lipsey (1960) la transforme en relation entre inflation et chômage. Les gouvernements devraient donc arbitrer entre les deux. Les années 1970 ont montré les limites de cet arbitrage : la **stagflation** a réuni inflation et chômage.' },
  { p: '**7. La désinflation.** Le **ralentissement de l\'inflation** : les prix continuent d\'augmenter, mais moins vite (de 6 % à 2 % par an, par exemple). À ne pas confondre avec la **déflation**, baisse générale et durable des prix.' },
  { p: '**8. Capitalisme et socialisme**' },
  { table: { h: ['', 'Capitalisme', 'Socialisme'], r: [
    ['**Propriété des moyens de production**', 'Privée', 'Collective'],
    ['**Objectif**', 'L\'intérêt individuel et le profit', 'Une société sans classes, la satisfaction des besoins de chacun'],
    ['**Régulation**', 'Le marché (offre et demande, prix libres)', 'Le plan impératif'],
    ['**Rôle de l\'État**', 'Minimal', 'Central'],
  ] } },
  { p: '**9. L\'école des choix publics.** Son principal auteur est **James Buchanan** (avec Gordon Tullock, *The Calculus of Consent*, 1962 ; prix Nobel 1986). Elle applique au comportement des hommes politiques et des fonctionnaires l\'hypothèse de l\'homo œconomicus : ils ne poursuivent pas l\'intérêt général, mais **leur intérêt personnel** (être réélus, accroître leur budget et leur pouvoir). D\'où une croissance excessive de l\'État et des « défaillances de l\'État » comparables aux défaillances du marché : elle prône des règles, notamment constitutionnelles, qui limitent les dépenses et le pouvoir des gouvernants.' },
  { p: '**10. Le multiplicateur de crédit**' },
  { p: 'La banque doit garder en réserve 5 % de chaque dépôt et peut prêter le reste ; les sommes prêtées, dépensées, reviennent en dépôt dans le système bancaire, qui en prête à nouveau 95 %, et ainsi de suite.' },
  { table: { h: ['Étape', 'Dépôt', 'Réserve (5 %)', 'Crédit accordé (95 %)'], r: [
    ['1', '100 000', '5 000', '95 000'],
    ['2', '95 000', '4 750', '90 250'],
    ['3', '90 250', '4 512,50', '85 737,50'],
    ['…', '…', '…', '…'],
    ['**Total**', '**2 000 000**', '**100 000**', '**1 900 000**'],
  ] } },
  { ul: [
    'Multiplicateur de crédit : k = 1 / r = 1 / 0,05 = **20**.',
    'Total des dépôts créés : 100 000 × 20 = **2 000 000 FCFA**.',
    'Total des crédits alloués à l\'économie : 2 000 000 − 100 000 = **1 900 000 FCFA** (c\'est aussi 95 000 × 20).',
  ] },
  { p: '**Réponse** : le système bancaire peut allouer **1 900 000 FCFA** de crédits à l\'économie ; la masse totale des dépôts atteint 2 000 000 FCFA.' },
  { box: 'Le sujet parle du multiplicateur « de Keynes » : le multiplicateur de crédit (ou monétaire) est celui de la création monétaire par les banques. Le multiplicateur keynésien est un autre mécanisme, celui de l\'investissement : k = 1 / (1 − c), où c est la propension marginale à consommer.', title: 'Précision', kind: 'piege' },
] });

// ---------------------------------------------------------------- 17
C.push({ id: 'c17', title: 'Corrigé du sujet 17 · Informatique', body: [
  { p: '*Leçons à revoir : Qu\'est-ce que l\'informatique ? ; L\'unité centrale et le boîtier ; Le processeur ; La carte graphique ; Le disque dur ; La mémoire vive ; Le système d\'exploitation (Informatique).*' },
  { p: '**1. L\'informatique** est le **traitement automatique de l\'information** (textes, nombres, images, sons, vidéos) au moyen de machines, les ordinateurs. Le mot, proposé par Philippe Dreyfus en 1962, réunit « information » et « automatique ».' },
  { p: '**2. Définitions**' },
  { ul: [
    '**L\'unité centrale** : le cœur de l\'ordinateur, qui rassemble les composants qui le font fonctionner (carte mère, processeur, mémoire vive, carte graphique, carte son, disque dur, lecteur), protégés par le boîtier.',
    '**La carte graphique** (ou carte vidéo) : la carte qui convertit les données numériques en images et permet l\'affichage sur l\'écran.',
    '**Le disque dur** : la mémoire de stockage de l\'ordinateur ; il conserve le système d\'exploitation, les logiciels et les fichiers, même lorsque l\'ordinateur est éteint.',
  ] },
  { p: '**3. Les types de boîtiers** : le **grand tour**, le **moyen tour** et le **mini tour** (pour un ordinateur de bureau ; on rencontre aussi les boîtiers horizontaux, dits « desktop », et les mini PC).' },
  { p: '**4. Disque interne et disque externe.** Le disque **interne** est placé dans l\'unité centrale et relié à la carte mère par une interface (aujourd\'hui SATA, ou M.2 pour les SSD) ; il contient le système. Le disque **externe** est dans un boîtier indépendant, se branche en **USB** et se transporte : il sert aux sauvegardes et aux échanges de fichiers.' },
  { p: '**5. Les critères de choix d\'un processeur** : la **fréquence** (en GHz) ; le **nombre de cœurs** ; la **mémoire cache** ; la fréquence du bus ; la **compatibilité** avec la carte mère (le socket) ; la gamme (Intel Core i3 à i9, AMD Ryzen 3 à 9), selon l\'usage et le budget.' },
  { p: '**6. Les composants de la carte graphique** : le **processeur graphique** (GPU), qui calcule l\'affichage et allège le processeur principal ; la **mémoire vidéo**, qui garde les données d\'image ; le **BIOS** de la carte ; on y ajoute la connectique (HDMI, DisplayPort, DVI, VGA) et l\'interface avec la carte mère (PCI Express).' },
  { p: '**7. Les principaux systèmes d\'exploitation** : **Windows** (Microsoft), **macOS** (Apple) et **Linux** (par exemple Ubuntu) pour les ordinateurs ; Android et iOS pour les téléphones.' },
  { p: '**8. Avantages et inconvénients**' },
  { table: { h: ['Système', 'Deux avantages', 'Deux inconvénients'], r: [
    ['**Windows**', 'Le plus répandu : très grand nombre de logiciels et de jeux ; compatible avec presque tout le matériel', 'Payant ; plus exposé aux virus et logiciels malveillants'],
    ['**macOS**', 'Simple, stable et bien sécurisé ; bonne intégration avec les autres appareils Apple', 'Ne fonctionne que sur les ordinateurs Apple, chers ; moins de logiciels et de jeux disponibles'],
    ['**Linux**', 'Gratuit et libre ; stable, sûr et peu gourmand en ressources', 'Certains logiciels courants n\'existent pas en version Linux ; prise en main et installation de certains pilotes plus difficiles'],
  ] } },
  { p: '**9. Démarrer l\'ordinateur** : vérifier qu\'il est branché (ou que la batterie est chargée), allumer l\'écran, puis appuyer sur le **bouton d\'alimentation** de l\'unité centrale. Le **BIOS/UEFI** vérifie le matériel et lance le **système d\'exploitation** ; sur l\'écran de connexion, on choisit son compte et on saisit son **mot de passe** ou son code PIN.' },
  { p: '**10. Réinitialiser le mot de passe d\'un compte local** (Windows 10 et 11)' },
  { ol: [
    '**Depuis l\'écran de connexion** : après un mot de passe erroné, cliquer sur « Réinitialiser le mot de passe » et répondre aux **questions de sécurité** choisies à la création du compte (ou utiliser un **disque de réinitialisation de mot de passe** préparé à l\'avance sur une clé USB) ; saisir ensuite le nouveau mot de passe.',
    '**Depuis un autre compte administrateur** : Panneau de configuration > Comptes d\'utilisateurs > Gérer un autre compte > choisir le compte > « Modifier le mot de passe » ; ou, dans l\'invite de commandes ouverte en administrateur : `net user NomDuCompte *`, puis taper deux fois le nouveau mot de passe.',
    'Se reconnecter avec le nouveau mot de passe ; les fichiers chiffrés et les mots de passe enregistrés peuvent être perdus si le mot de passe a été changé par un autre compte.',
  ] },
  { p: '**11. Logiciels**' },
  { table: { h: ['Type', 'Définition', 'Deux exemples'], r: [
    ['**Logiciel de base**', 'Le logiciel qui fait fonctionner l\'ordinateur et gère le matériel : le système d\'exploitation et ses utilitaires', 'Windows, Linux'],
    ['**Logiciel d\'application**', 'Le logiciel qui permet à l\'utilisateur d\'accomplir une tâche précise', 'Microsoft Word, le navigateur Google Chrome'],
    ['**Pilote** (*driver*)', 'Le petit programme qui permet au système d\'exploitation de communiquer avec un matériel', 'Le pilote de la carte graphique, le pilote de l\'imprimante'],
  ] } },
  { p: '**12.** Le disque dur se trouve dans l\'**unité centrale** (le boîtier ou, sur un portable, sous le clavier), relié à la carte mère ; seul le disque externe est hors de l\'unité centrale.' },
  { p: '**13. La RAM** (*Random Access Memory*, mémoire vive) est la mémoire rapide et **volatile** où l\'ordinateur garde les données et les programmes **en cours d\'utilisation** ; elle s\'efface quand on l\'éteint. Sans elle, l\'ordinateur ne démarre pas.' },
  { p: '**14.** **1 Ko = 1 000 octets** selon la norme du Système international ; dans l\'usage informatique traditionnel, on comptait **1 024 octets** (2 puissance 10), valeur que l\'on note aujourd\'hui 1 Kio (kibioctet). La réponse attendue à l\'examen est souvent 1 024 octets : on donne les deux.' },
] });

// ---------------------------------------------------------------- 18
C.push({ id: 'c18', title: 'Corrigé du sujet 18 · Final English test (model answers)', body: [
  { p: '*Leçons à revoir : les unités d\'anglais juridique du site. Ces réponses modèles sont rédigées dans un anglais simple, que l\'on peut reprendre à l\'oral comme à l\'écrit.*' },
  { p: '**1. What is the definition of law?**' },
  { p: 'Law is a **set of rules** made by the State to organise life in society. These rules are **general** (they apply to everyone), **abstract** and **compulsory**: if a person breaks them, the courts can impose a **sanction**, such as a fine, damages or prison.' },
  { p: '**2. Types of law**' },
  { p: 'Law is divided into **public law** (relations involving the State) and **private law** (relations between individuals). It also distinguishes **national law** and **international law**.' },
  { ul: [
    '**Constitutional law** is the branch of public law that organises the State: its institutions, the separation of powers and the fundamental rights of citizens.',
    '**Criminal law** defines offences (crimes, misdemeanours, petty offences) and the punishments that the State imposes on offenders.',
    '**Civil law** governs relations between private persons: persons and family, property, contracts and civil liability.',
  ] },
  { p: '**3. The constitution**' },
  { p: 'A constitution is the **supreme law** of a country. It creates the main institutions (the President, the Government, Parliament, the courts), defines their powers and their relations, and protects the rights and freedoms of citizens. All other laws must comply with it. It can be written, like the Constitution of Côte d\'Ivoire of 8 November 2016, revised in 2020 and 2023, or largely unwritten, like the British constitution.' },
  { p: '**4. The importance of law**' },
  { p: 'Law keeps **order and peace** in society. It **protects** our rights, our freedoms and our property, especially the rights of the weakest. It allows people to **settle disputes** before judges instead of using force. It **limits the power** of rulers (the rule of law), and it creates the **security** that people and businesses need to make contracts and to invest.' },
  { p: '**5. Must law be in accordance with morality?**' },
  { p: 'In my opinion, law **should** be in accordance with morality, because a just law is more easily accepted and obeyed. Many legal rules are also moral rules: do not kill, do not steal, keep your promises. However, law and morality are **not the same**: morality concerns our conscience and its sanction is internal (remorse) or social, while law is made by the State and enforced by the courts. Some legal rules are morally neutral, like driving on the right, and some moral duties are not legal obligations, like gratitude. So law should respect fundamental moral values, but it cannot impose all of morality.' },
  { p: '**6. Introducing yourself: the most important elements**' },
  { p: 'When you introduce yourself, give your **name**, your **origin** or where you live, your **studies** or job, your **goals** and, briefly, your **interests**. For example: « Good morning. My name is Aminata Koné. I come from Bouaké and I live in Abidjan. I am a first-year law student. I chose law because I want to become a judge and defend justice in my country. In my free time, I like reading and playing basketball. Thank you. »' },
] });

// ---------------------------------------------------------------- 19
const ENTETE = 'RÉPUBLIQUE DE CÔTE D\'IVOIRE · Union – Discipline – Travail · UNIVERSITÉ · Secrétariat général';
C.push({ id: 'c19', title: 'Corrigé du sujet 19 · Rédaction administrative', body: [
  { p: '*Leçons à revoir : Techniques d\'expression écrite (niveaux 1 et 2). Chaque modèle respecte la présentation administrative : en-tête, références, titre ou objet, texte, lieu et date, signature.*' },
  { h: 'A. 1. Le communiqué' },
  { p: '*Le communiqué informe un large public d\'une décision ; il est bref, impersonnel et daté.*' },
  { p: `*${ENTETE}*` },
  { p: '**COMMUNIQUÉ**' },
  { p: 'La Secrétaire générale de l\'université porte à la connaissance de l\'ensemble des étudiants qu\'à compter du lundi 4 janvier 2027, **le port de la cravate est obligatoire** pour les étudiants de sexe masculin dans l\'enceinte de l\'université, pendant les cours, les travaux dirigés, les examens et les démarches administratives. Les étudiantes sont tenues de porter une tenue correcte et décente.' },
  { p: 'Cette mesure s\'inscrit dans la politique d\'assainissement de l\'environnement universitaire. L\'accès aux salles de cours et d\'examen pourra être refusé à tout étudiant qui ne s\'y conformerait pas.' },
  { p: 'La Secrétaire générale compte sur le sens de la discipline de chacun.' },
  { p: '*Abidjan, le 1er décembre 2026 · La Secrétaire générale (signature et cachet)*' },
  { h: 'A. 2. Le rapport' },
  { p: '*Le rapport expose des faits, les analyse et propose des solutions à l\'autorité qui l\'a demandé.*' },
  { p: '**De** : Le délégué de la Licence 1 Droit · **À** : Madame la Secrétaire générale · **Objet** : rapport sur l\'altercation survenue lors du cours de rédaction administrative' },
  { p: '**Introduction.** Le jeudi 26 novembre 2026, vers 10 h 30, au cours de la séance de rédaction administrative, en salle 4, une altercation a opposé deux étudiants de la Licence 1. Le présent rapport, établi à votre demande, en relate les faits, en recherche les causes et propose des mesures.' },
  { p: '**Les faits.** Pendant un travail de groupe, deux étudiants se sont disputé l\'unique exemplaire d\'un document. Le ton est monté ; des injures ont été échangées et l\'un d\'eux a bousculé l\'autre, qui est tombé sans se blesser. L\'enseignant a interrompu le cours et séparé les deux étudiants avec l\'aide de leurs camarades. La séance a repris quinze minutes plus tard.' },
  { p: '**Analyse.** L\'incident tient au manque de documents (un exemplaire pour six étudiants), à l\'effectif chargé de la salle et à une tension ancienne entre les deux étudiants. Il a privé la classe d\'une partie du cours et porté atteinte à la discipline.' },
  { p: '**Propositions.** Entendre les deux étudiants et appliquer, s\'il y a lieu, le règlement intérieur ; multiplier les supports de travail ; rappeler à tous les règles de discipline en classe.' },
  { p: '**Conclusion.** Aucun blessé n\'est à déplorer, mais l\'incident appelle une réponse ferme pour préserver le calme des enseignements.' },
  { p: '*Abidjan, le 27 novembre 2026 · Le délégué de la Licence 1 Droit (signature)*' },
  { h: 'A. 3. Le courrier aux vigiles : la note de service' },
  { p: '*Une instruction adressée par un supérieur à ses agents prend la forme d\'une note de service.*' },
  { p: '**NOTE DE SERVICE** · **De** : La Secrétaire générale · **À** : Messieurs les agents de sécurité · **Objet** : contrôle de l\'accès aux salles de cours' },
  { p: 'Il est demandé aux agents de sécurité, à compter du lundi 4 janvier 2027, de **ne laisser entrer dans les salles de cours** que les étudiants à jour du paiement de leurs frais de scolarité. Le contrôle se fera sur présentation de la carte d\'étudiant, au vu de la liste établie et mise à jour chaque semaine par le service de la scolarité.' },
  { p: 'Les étudiants concernés seront orientés, avec courtoisie, vers le service financier. Tout incident sera signalé sans délai au chef de la sécurité. J\'attache du prix à la stricte application de la présente note.' },
  { p: '*Abidjan, le 1er décembre 2026 · La Secrétaire générale (signature et cachet)*' },
  { h: 'A. 4. La doléance au recteur' },
  { p: '*La doléance est une lettre de demande : elle expose une situation, argumente et formule une requête, avec les formules de politesse.*' },
  { p: '**Les délégués des étudiants** · à **Monsieur le Recteur de l\'université** · **Objet** : demande de création d\'une infirmerie' },
  { p: 'Monsieur le Recteur,' },
  { p: 'Nous avons l\'honneur de solliciter de votre haute bienveillance la création d\'une infirmerie au sein de notre université.' },
  { p: 'Plusieurs étudiants ont été victimes de malaises pendant les cours et les examens au cours de ce semestre. Faute de lieu de soins, ils ont dû attendre longtemps avant d\'être conduits dans un centre de santé éloigné. Une infirmerie, dotée d\'un infirmier diplômé et d\'une trousse de premiers secours, permettrait de prendre en charge rapidement ces urgences et de suivre les étudiants souffrant de maladies chroniques. Un local inoccupé du bâtiment administratif pourrait l\'accueillir, et un partenariat avec un centre de santé voisin en réduirait le coût.' },
  { p: 'Persuadés que vous accorderez une suite favorable à notre demande, nous vous prions d\'agréer, Monsieur le Recteur, l\'expression de notre profond respect.' },
  { p: '*Abidjan, le 1er décembre 2026 · Pour les délégués des étudiants (signatures)*' },
  { h: 'B. Les différences' },
  { table: { h: ['', 'Définition', 'Ce qui les distingue'], r: [
    ['**La lettre circulaire**', 'Une **lettre** de même contenu, adressée à plusieurs destinataires (clients, parents, partenaires)', 'Elle garde la forme d\'une lettre : appel (« Madame, Monsieur »), formule de politesse, signature ; elle informe sans donner d\'ordre'],
    ['**La circulaire**', 'Un **acte administratif interne** par lequel un supérieur hiérarchique explique une règle ou donne des instructions à ses services', 'Ni appel ni formule de politesse ; elle s\'impose aux agents qu\'elle vise'],
    ['**Le compte rendu**', 'Le récit **résumé** et objectif d\'une réunion, d\'un événement ou d\'une mission', 'Il sélectionne l\'essentiel ; il n\'a pas de valeur juridique particulière'],
    ['**Le procès-verbal**', 'Le document **officiel** qui constate fidèlement des faits, des déclarations ou des décisions (une réunion d\'organe, une constatation d\'infraction)', 'Il est complet, daté et signé ; il fait foi et peut servir de preuve'],
  ] } },
] });

// ---------------------------------------------------------------- 20
C.push({ id: 'c20', title: 'Corrigé du sujet 20 · Éthique et morale', body: [
  { p: '**1. La morale et ses stades d\'évolution**' },
  { p: 'La **morale** (du latin *mores*, les mœurs) est l\'ensemble des règles de conduite qu\'une personne ou une société tient pour bonnes, et qui permettent de distinguer le **bien** du **mal**. Elle s\'adresse à la conscience ; sa sanction est intérieure (le remords) ou sociale (la réprobation).' },
  { p: 'La conscience morale se construit par **stades**, selon le psychologue Lawrence Kohlberg :' },
  { table: { h: ['Niveau', 'La personne fait le bien…', 'Exemple'], r: [
    ['**Préconventionnel** (l\'enfant)', 'pour éviter la punition ou obtenir une récompense', 'Ne pas mentir pour ne pas être puni'],
    ['**Conventionnel**', 'pour être approuvée par son entourage et respecter les lois et l\'ordre social', 'Respecter le règlement parce que c\'est la règle'],
    ['**Postconventionnel**', 'par adhésion à des principes universels de justice, même contre la règle établie', 'Refuser une loi injuste par conscience'],
  ] } },
  { p: 'Jean Piaget résume cette évolution par le passage d\'une morale **hétéronome** (la règle vient de l\'extérieur, de l\'adulte) à une morale **autonome** (la règle est comprise et acceptée par la raison).' },
  { p: '**2. Les déterminants et les dimensions de la morale**' },
  { ul: [
    '**Les déterminants**, ce qui façonne la morale : la **conscience** et la **raison** ; l\'**éducation** reçue dans la **famille** et à l\'école ; la **religion** ; la **culture** et les traditions de la société ; la **loi** ; le milieu professionnel (la déontologie).',
    '**Les dimensions** : une dimension **universelle** (des valeurs communes à tous les hommes : le respect de la vie, la justice) ; une dimension **particulière** (les valeurs propres à un groupe, une culture, une profession) ; une dimension **singulière** (la conscience de chaque personne, qui juge en dernier ressort). On distingue aussi la dimension **personnelle** et la dimension **sociale** de la morale.',
  ] },
  { p: '**3. Ce que doit faire un homme pour que son acte soit bon**' },
  { ul: [
    'Agir **librement** et **en connaissance de cause** : seul un acte volontaire est un acte moral.',
    'Choisir un **objet** bon : ce que l\'on fait doit être bon en soi (aider, dire vrai).',
    'Avoir une **intention** droite : une bonne action faite pour une mauvaise fin n\'est pas bonne.',
    'Tenir compte des **circonstances** et des conséquences : le lieu, le moment, les personnes concernées.',
  ] },
  { p: 'Les trois éléments (objet, intention, circonstances) doivent être bons ensemble : **la fin ne justifie pas les moyens**.' },
  { p: '**4. Éthique réflexive et éthique normative**' },
  { p: 'L\'**éthique réflexive** **s\'interroge** sur les fondements de la morale : qu\'est-ce que le bien ? pourquoi obéir à une règle ? d\'où viennent nos valeurs ? C\'est une démarche critique, qui cherche à comprendre. L\'**éthique normative** **prescrit** : elle formule les principes et les normes qui doivent guider l\'action. Elle comprend l\'éthique du **devoir** (Kant : agir selon une règle que l\'on peut vouloir universelle), l\'éthique des **conséquences** (l\'utilitarisme : le plus grand bonheur du plus grand nombre) et l\'éthique des **vertus** (Aristote : devenir une personne juste et prudente).' },
  { p: '**5. Quel citoyen pour la Côte d\'Ivoire face à la mondialisation et au progrès technologique ?** (plan de réponse)' },
  { ul: [
    '**Un citoyen enraciné et ouvert** : attaché aux valeurs de la Nation (Union, Discipline, Travail : article 48 de la Constitution) et à son patrimoine culturel, mais ouvert au monde, aux langues et aux échanges.',
    '**Un citoyen responsable et intègre** : qui respecte la Constitution et les lois (article 47), paie ses impôts (article 43), respecte les biens publics (article 44), refuse la corruption et, s\'il exerce une fonction publique, l\'accomplit avec compétence, intégrité et impartialité (article 45).',
    '**Un citoyen numérique éclairé** : formé aux technologies et à l\'intelligence artificielle, capable de vérifier une information avant de la partager, respectueux de la vie privée d\'autrui et de la vérité sur les réseaux sociaux.',
    '**Un citoyen solidaire et soucieux de l\'avenir** : tolérant, engagé pour la paix et la cohésion sociale, et protecteur de l\'environnement, devoir de chacun (article 40).',
  ] },
] });

module.exports = { C };
