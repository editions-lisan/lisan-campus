// Sujets d'examen corrigés, Licence 1 (droit des personnes, droit constitutionnel) : recueil des Éditions Lisân.
// Les cas pratiques sont des sujets nouveaux, écrits pour Lisân Campus : ils reprennent les problèmes de droit
// classiquement posés aux examens de L1 (les questions et les règles ne sont pas protégées), jamais les énoncés
// d'un autre recueil. Les corrigés suivent les leçons du site (droit ivoirien en vigueur).
// Même forme qu'une matière du site (lessons → body en blocs), mise en pages par outils/cours/build_cours.js (id « annales »).

const METHODE = [
  { h: 'La méthode du cas pratique, en cinq temps' },
  { ol: [
    '**Les faits utiles** : ne garder que les faits qui ont une portée juridique (âges, dates, qualité des personnes, actes accomplis).',
    '**La qualification** : traduire les faits en catégories juridiques (absence ou disparition, acte de disposition ou de la vie courante, domicile ou résidence).',
    '**Le problème de droit** : une question juridique générale, posée en une phrase, pour chaque difficulté.',
    '**La règle** : l\'article ou le principe applicable, cité avec précision.',
    '**L\'application et la conclusion** : confronter les faits à la règle, puis répondre clairement à la question posée.',
  ] },
  { box: 'Un cas pratique se lit deux fois avant d\'écrire : la première pour comprendre l\'histoire, la seconde pour relever chaque question, y compris celles qui ne sont pas posées en toutes lettres (« Conseillez-les utilement »).', title: 'Conseil', kind: 'cle' },
];

const L = [];

// ---------------------------------------------------------------- DROIT CIVIL : LES PERSONNES
L.push({ id: 'methode', title: 'La méthode du cas pratique', body: METHODE });

L.push({ id: 'dc1', title: 'Cas pratique 1 · La vie privée, l\'image et la presse', body: [
  { p: '*Leçons à revoir : Les droits extrapatrimoniaux ; TD séance 1.*' },
  { h: 'Énoncé' },
  { p: 'Le chanteur Zanga, très populaire à Abidjan, découvre dans l\'hebdomadaire *Le Lagunaire* un article qui révèle son hospitalisation pour une maladie grave, illustré d\'une photo prise à son insu dans sa chambre d\'hôpital. Un site d\'informations reprend l\'article et la photo le lendemain.' },
  { p: 'Quelques jours plus tard, M. Gnamien, voisin du chanteur, se dispute violemment avec son épouse dans la cour commune ; les voisins appellent la police. Le quotidien *L\'Éclaireur* consacre aux faits divers un article qui donne le nom du couple, son adresse et le détail de la dispute, en ajoutant que M. Gnamien « vit aux crochets de sa femme », ce qui est faux.' },
  { p: 'Zanga et M. Gnamien veulent agir. Conseillez-les.' },
  { corrige: [
    { p: '**1. Zanga**' },
    { p: '*Problème* : la révélation de l\'état de santé d\'une personne connue et la publication de sa photo prise à son insu sont-elles fautives ?' },
    { p: '*Règle* : le droit au respect de la vie privée protège notamment l\'état de santé ; le droit à l\'image interdit de photographier une personne ou de publier son image sans son consentement. Ce sont des droits de la personnalité : leur violation est une faute qui oblige à réparer le dommage (article 1382 du Code civil). La notoriété ne prive pas une personne de sa vie privée : seule son activité publique peut être commentée.' },
    { p: '*Application* : la maladie relève de la vie privée et la photo a été prise à l\'hôpital, sans consentement. *Le Lagunaire* et le site qui a repris l\'article commettent chacun une faute distincte.' },
    { p: '*Conclusion* : Zanga peut obtenir contre les deux publications des dommages-intérêts, le retrait de l\'article et de la photo et l\'interdiction de toute nouvelle diffusion.' },
    { p: '**2. M. Gnamien**' },
    { p: '*Problème* : un journal peut-il rapporter une dispute conjugale qui a provoqué l\'intervention de la police, et lui ajouter une affirmation fausse et blessante ?' },
    { p: '*Règle* : la presse peut informer le public d\'un fait divers, mais la vie familiale relève de la vie privée (article 1382 du Code civil pour la réparation). L\'allégation d\'un fait qui porte atteinte à l\'honneur ou à la considération d\'une personne est une diffamation (article 90 de la loi n° 2017-867 du 27 décembre 2017 portant régime juridique de la presse).' },
    { p: '*Application* : l\'intervention de la police peut être signalée, mais le nom, l\'adresse et le détail de la dispute n\'apportent rien à l\'information du public et exposent la vie privée du couple. L\'affirmation selon laquelle M. Gnamien « vit aux crochets de sa femme » est fausse et porte atteinte à sa considération.' },
    { p: '*Conclusion* : M. Gnamien peut demander réparation de l\'atteinte à sa vie privée et poursuivre le journal pour diffamation.' },
  ] },
] });

L.push({ id: 'dc2', title: 'Cas pratique 2 · L\'enfant simplement conçu', body: [
  { p: '*Leçons à revoir : La naissance de la personnalité juridique ; TD séance 1.*' },
  { h: 'Énoncé' },
  { p: 'M. Konan, comptable, avait souscrit une assurance-décès qui prévoit, à son décès, le versement d\'un capital de 3 000 000 F à son épouse et de 750 000 F à chacun de ses enfants. Il meurt le 10 février 2026, laissant son épouse, enceinte, et quatre enfants. Le 2 juillet 2026, Mme Konan met au monde une fille, Ahou, en bonne santé.' },
  { p: 'L\'assureur refuse de verser la part d\'Ahou : elle n\'était pas née au jour du décès. Les quatre aînés soutiennent, pour la même raison, qu\'elle ne peut pas hériter de leur père. Mme Konan vous consulte. Elle voudrait aussi savoir pendant quelle période sa fille est légalement présumée avoir été conçue.' },
  { corrige: [
    { p: '*Problème* : un enfant né après le décès de son père peut-il recueillir un droit né au jour de ce décès ?' },
    { p: '*Règle* : en principe, la personnalité juridique commence à la naissance. Par exception, l\'enfant conçu est considéré comme né chaque fois qu\'il y va de son intérêt (*infans conceptus pro nato habetur quoties de commodis ejus agitur*). Pour la succession, l\'article 7 de la loi n° 2019-573 du 26 juin 2019 relative aux successions exige d\'« exister à l\'instant de la succession » : sont incapables de succéder celui qui n\'est pas encore conçu et l\'enfant qui n\'est pas né vivant. Trois conditions : être conçu au jour où le droit naît, y avoir intérêt, naître vivant ; depuis 2019, la viabilité n\'est plus exigée. La loi présume que l\'enfant a été conçu entre le 300e et le 180e jour avant sa naissance, jour de la naissance non compté (article 4.1° de la loi n° 2019-571 du 26 juin 2019 relative à la filiation).' },
    { p: '*Période de conception* : comptée à partir du 2 juillet 2026, elle s\'étend du 300e jour (5 septembre 2025) au 180e jour (3 janvier 2026) avant la naissance. Le décès, le 10 février 2026, est postérieur à cette période : Ahou était conçue au jour du décès.' },
    { p: '*Application* : Ahou était conçue au décès, la succession et le capital d\'assurance sont dans son intérêt, et elle est née vivante. Les trois conditions sont réunies.' },
    { p: '*Conclusion* : Ahou hérite de son père au même titre que ses frères et sœurs, et l\'assureur doit lui verser 750 000 F, la règle *infans conceptus* s\'appliquant aussi aux capitaux d\'assurance destinés aux enfants.' },
  ] },
] });

L.push({ id: 'dc3', title: 'Cas pratique 3 · L\'absence, le remariage et le retour', body: [
  { p: '*Leçons à revoir : La fin de la personnalité : la mort et l\'absence ; La disparition.*' },
  { h: 'Énoncé' },
  { p: 'M. Kouamé, enseignant à Daloa, a quitté son domicile le 5 janvier 2024 pour, disait-il, rendre visite à un parent au Ghana. Depuis, personne n\'a de ses nouvelles ; aucun accident ni danger particulier n\'est signalé. Son épouse, Mme Kouamé, doit gérer les biens du couple et voudrait refaire sa vie.' },
  { ol: [
    'Que peut-elle faire, à partir de quand et devant quel tribunal ?',
    'Quand pourra-t-elle se remarier ? Quand la succession pourra-t-elle s\'ouvrir ?',
    'Si M. Kouamé avait été vu pour la dernière fois à bord d\'une pirogue qui a chaviré sur le lac de Kossou, sans que son corps soit retrouvé, la réponse serait-elle différente ?',
    'Supposons qu\'il réapparaisse en 2036, après le jugement déclarant son décès, et que sa maison ait été vendue entre-temps. Que peut-il réclamer ?',
  ] },
  { corrige: [
    { p: '**1. Qualification et première étape.** M. Kouamé a cessé de paraître sans nouvelles, sans circonstance dangereuse : c\'est une **absence** (article 1er de la loi n° 2022-885 du 23 novembre 2022 relative à l\'absence et à la disparition). Après **un an sans nouvelles**, soit à partir du 5 janvier 2025, Mme Kouamé (personne intéressée) ou le ministère public saisit par requête le **tribunal du domicile ou de la dernière résidence**, ici celui de Daloa. Le tribunal rend un jugement de **présomption d\'absence**, ordonne une enquête et nomme un **administrateur des biens** : actes conservatoires et d\'administration, actes de disposition seulement sur autorisation.' },
    { p: '**2. Remariage et succession.** Après **deux ans d\'enquête**, le tribunal rend un **jugement déclaratif d\'absence**. Dès qu\'il est définitif, le **mariage est dissous** : Mme Kouamé peut alors se remarier. La succession ne s\'ouvre qu\'avec le **jugement déclaratif de décès**, demandé **7 ans après le jugement d\'absence ou 10 ans après les dernières nouvelles** (janvier 2034).' },
    { p: '**3. La pirogue.** Une personne qui cesse de paraître à la suite de circonstances de nature à mettre sa vie en danger, sans que son corps soit retrouvé, est **disparue** (article 13 de la loi n° 2022-885). Il n\'y a pas de présomption ni de déclaration d\'absence : après une enquête obligatoire, le tribunal rend directement un **jugement déclaratif de décès**, possible **un an** après la disparition. L\'événement a eu lieu en Côte d\'Ivoire : le tribunal compétent est celui du **lieu de l\'événement** (article 15). Le jugement tient lieu d\'acte de décès ; le mariage est dissous dès qu\'il est définitif.' },
    { p: '**4. Le retour.** Le retour de l\'absent conduit à un nouveau jugement qui annule les précédents. Il **recouvre ses biens dans l\'état où ils se trouvent**, le **prix** de ceux qui ont été vendus ou les **biens achetés avec ce prix** (article 12) : il ne peut pas reprendre la maison vendue, mais réclame son prix ou le bien acquis en remploi. En revanche, **son mariage reste dissous** : il ne peut pas reprendre la vie commune de plein droit, et le remariage de son épouse est valable.' },
  ] },
] });

L.push({ id: 'dc4', title: 'Cas pratique 4 · Le nom et les prénoms', body: [
  { p: '*Leçons à revoir : Le nom : attribution ; Le nom : changement, protection et caractères ; L\'état civil ; TD séance 2.*' },
  { h: 'Énoncé' },
  { p: 'Mlle Gbané, romancière reconnue, prépare l\'histoire de sa famille. Elle découvre que l\'acte de naissance de son arrière-grand-père, dressé en 1930, a omis la particule « Lou » qui précédait le nom de ses ancêtres ; depuis, personne ne l\'a portée. Elle veut la rétablir.' },
  { p: 'En 2025, elle épouse M. Dosso. Elle refuse de porter son nom, ce qui irrite son mari. En 2026, leur fils naît ; ils veulent l\'appeler « Dosso Gbané » et lui donner un prénom inventé, que l\'officier de l\'état civil refuse d\'inscrire. Le couple se sépare quelques mois plus tard ; Mme Dosso s\'inquiète, car elle publie sous le nom de « Mme Dosso ».' },
  { p: 'Conseillez-les sur chaque question.' },
  { corrige: [
    { p: '**1. La particule.** La particule fait partie du nom et marque la filiation. Oubliée lors de la déclaration, elle se rétablit par **rectification judiciaire** de l\'acte de naissance : c\'est une erreur grave, qui échappe à la rectification administrative. Le nom est **imprescriptible** : il ne se perd pas faute d\'avoir été porté, et une famille peut réclamer un nom longtemps délaissé. Mlle Gbané a donc de bonnes chances d\'obtenir le rétablissement de la particule, à condition de prouver qu\'elle appartenait au nom de ses ancêtres.' },
    { p: '**2. Le nom du mari.** La femme mariée a **l\'usage** du nom de son mari (article 55 de la loi relative au mariage) : c\'est une faculté, non une obligation, et elle conserve son propre nom. Son refus est donc fondé ; il ne constitue pas une faute.' },
    { p: '**3. Le nom de l\'enfant.** Enfant né dans le mariage, il porte le **nom du père** ; le père peut demander d\'y **ajouter le nom de la mère** (article 2 de la loi n° 2020-490 du 29 mai 2020 relative au nom). Le nom « Dosso Gbané » est donc possible à la demande du père.' },
    { p: '**4. Le prénom.** L\'officier de l\'état civil ne peut recevoir que des prénoms figurant dans les calendriers ou consacrés par les usages et la tradition (article 10). Son refus d\'un prénom inventé est régulier ; les parents peuvent contester ce refus devant le tribunal ou choisir un autre prénom. Plus tard, l\'enfant pourra demander à changer de prénom s\'il justifie d\'un **intérêt légitime** (prénom ridicule, par exemple), par requête au tribunal du lieu où son acte de naissance a été établi.' },
    { p: '**5. Après la séparation.** Une simple séparation ne change rien : tant que le mariage dure, Mme Dosso garde l\'usage du nom de son mari. Le divorce, lui, rompt le lien d\'alliance et met fin, en principe, à l\'usage du nom du mari. Pour préserver la continuité de son œuvre, Mme Dosso peut publier sous **pseudonyme**, nom d\'emprunt choisi pour une activité artistique, qu\'elle peut faire ajouter à ses nom et prénoms (article 16 de la loi relative au nom).' },
  ] },
] });

L.push({ id: 'dc5', title: 'Cas pratique 5 · Le domicile et le tribunal compétent', body: [
  { p: '*Leçons à revoir : Le domicile ; TD séance 2.*' },
  { h: 'Énoncé' },
  { p: 'M. Yao, haut fonctionnaire domicilié à Cocody, est élu maire d\'une commune rurale du département d\'Agboville, où il fait construire une résidence. Il veut y installer sa famille. Son épouse, médecin au CHU de Treichville, refuse ; leurs enfants, Kévin (23 ans) et Grâce (16 ans), restent avec elle à Cocody.' },
  { ol: [
    'M. Yao peut-il imposer à sa femme et à ses enfants de le suivre ?',
    'Le propriétaire de l\'appartement de Cocody veut assigner Mme Yao en paiement des loyers devant le tribunal d\'Agboville. Le peut-il ?',
    'L\'entrepreneur qui a construit la résidence assigne M. Yao devant le tribunal d\'Agboville, en invoquant le contrat qui y élit domicile. M. Yao soulève l\'incompétence : a-t-il raison ?',
  ] },
  { corrige: [
    { p: '**1. Le domicile de la famille.** Les époux choisissent le domicile de la famille **d\'un commun accord** ; en cas de désaccord, il est **fixé par le juge dans l\'intérêt de la famille** (article 60 de la loi relative au mariage ; article 4 de la loi n° 2020-491 du 29 mai 2020 relative au domicile). M. Yao ne peut donc pas imposer seul le déménagement : il doit saisir le juge, qui tiendra compte de la profession de l\'épouse et de la scolarité des enfants. **Kévin**, majeur, choisit librement son domicile. **Grâce**, mineure non émancipée, a son domicile légal chez ses père et mère (article 5) : elle suit le domicile de la famille tel que les époux ou le juge l\'auront fixé.' },
    { p: '**2. Les loyers.** Le défendeur s\'assigne devant le tribunal de **son domicile** (article 11 du Code de procédure civile). Mme Yao est domiciliée à Cocody : le propriétaire doit saisir la juridiction d\'Abidjan compétente, non le tribunal d\'Agboville. Le paiement se fait d\'ailleurs au domicile du débiteur (dette quérable, article 1247 du Code civil).' },
    { p: '**3. L\'élection de domicile.** Le domicile **élu**, choisi dans un contrat pour l\'exécution de ce contrat, attribue compétence au tribunal du lieu choisi (article 10 de la loi relative au domicile). Si le contrat de construction élit domicile à Agboville, l\'entrepreneur peut y assigner M. Yao pour ce contrat : l\'exception d\'incompétence doit être rejetée. Sans clause d\'élection de domicile, la règle générale reprendrait : le tribunal du domicile de M. Yao.' },
  ] },
] });

L.push({ id: 'dc6', title: 'Cas pratique 6 · L\'état civil : déclaration tardive, jugement supplétif, registres détruits', body: [
  { p: '*Leçons à revoir : L\'état civil : les actes ; L\'état civil : suppléance, preuve et sanctions.*' },
  { h: 'Énoncé' },
  { p: 'Soro, né en 2008 dans un campement proche de Korhogo, n\'a jamais été déclaré à l\'état civil ni recensé par un agent de collecte. Il apprend par la radio qu\'une audience foraine aura lieu dans sa sous-préfecture.' },
  { p: 'Sa cousine Adjoua, née en 1999 à Man, prépare un concours ; elle doit fournir un extrait d\'acte de naissance, mais les deux exemplaires du registre de son année de naissance ont été détruits dans un incendie.' },
  { p: 'Enfin, la sœur d\'Adjoua a accouché le 3 février 2026 et n\'a pas encore déclaré la naissance, le 10 mai 2026. Indiquez à chacun la marche à suivre.' },
  { corrige: [
    { p: '**1. Soro.** Une naissance qui n\'a été ni déclarée ni collectée dans les délais ne peut plus être inscrite par simple déclaration : elle est constatée par un **jugement supplétif d\'acte de naissance**, rendu par le **tribunal du lieu de naissance** saisi par requête. Les **audiences foraines** permettent au tribunal de se déplacer au plus près des populations. Le jugement est transcrit sur les registres et **tient lieu d\'acte de naissance**.' },
    { p: '**2. Adjoua.** Lorsque les deux exemplaires d\'un registre sont perdus, le procureur et le greffier en chef font établir deux impressions à partir de la base de données numérique ; si les données manquent ou ne sont pas fiables, le registre est **reconstitué** année par année, la preuve étant reçue par tout moyen (articles 86 à 90 de la loi n° 2018-862 du 19 novembre 2018 relative à l\'état civil). Adjoua peut aussi demander au tribunal le **rétablissement de son acte**. En attendant, pour un usage précis, le président du tribunal peut dresser un **acte de notoriété** sur la déclaration de deux témoins majeurs.' },
    { p: '**3. La sœur d\'Adjoua.** La naissance se déclare dans les **3 mois** de l\'accouchement ; passé ce délai, l\'officier de l\'état civil dispose encore de **9 mois** pour l\'enregistrer sur la base d\'une **attestation de collecte** (article 41, dans sa rédaction issue de la loi n° 2025-220 du 28 mars 2025). Le 10 mai 2026, le délai de 3 mois est expiré (3 mai) : la naissance doit être enregistrée sur attestation de collecte ; si elle n\'a pas été collectée, il faudra un jugement supplétif.' },
  ] },
] });

L.push({ id: 'dc7', title: 'Cas pratique 7 · Le mineur : achats, contrat de travail et fausse autorisation', body: [
  { p: '*Leçons à revoir : Les incapacités : le mineur ; L\'émancipation et les majeurs incapables ; TD séance 3.*' },
  { h: 'Énoncé' },
  { p: 'Ibrahim, 17 ans, a hérité de son père une somme importante, gérée par sa mère. Le 4 avril 2026, il achète une voiture à un particulier pour 5 000 000 F ; il a retiré l\'argent à la banque en présentant une autorisation qu\'il a lui-même signée au nom de sa mère.' },
  { p: 'Son cousin Moussa, 15 ans, a été embauché seul comme manœuvre sur un chantier ; il est payé un tiers de moins que les autres ouvriers. Son père réclame le même salaire ; l\'employeur répond que le contrat est nul puisque Moussa est mineur.' },
  { p: 'Analysez ces situations.' },
  { corrige: [
    { p: '**1. L\'achat de la voiture.** Est mineure la personne qui n\'a pas dix-huit ans accomplis (article 1er de la loi n° 2019-572 du 26 juin 2019 relative à la minorité) ; le mineur est incapable d\'accomplir seul les actes de la vie civile (article 32). L\'achat d\'une voiture n\'est pas un acte de la vie courante : il est **nul**. C\'est une **nullité relative** : seul le mineur, par son représentant puis lui-même devenu majeur, peut l\'invoquer, dans les **5 ans** (article 40). Après l\'annulation, chacun restitue ce qu\'il a reçu ; mais le mineur ne rembourse ce qui lui a été payé que dans la mesure où cela a tourné à son profit (article 41).' },
    { p: '**2. La fausse autorisation.** Le mineur **engage son patrimoine par ses délits et quasi-délits** (article 36). En imitant la signature de sa mère, Ibrahim commet une faute qui a causé un dommage à la banque : il doit le réparer sur ses biens, et la manœuvre peut aussi être poursuivie pénalement. La banque, qui a payé sur un document falsifié, peut voir sa propre responsabilité discutée si la fausseté était décelable.' },
    { p: '**3. Le contrat de travail de Moussa.** Avant 16 ans, le contrat de travail est conclu **par le représentant légal** ; à partir de 16 ans, par le mineur assisté de son représentant (article 35). Conclu seul par Moussa, le contrat est irrégulier ; mais la nullité, relative, est établie **dans l\'intérêt du mineur** : l\'employeur ne peut pas s\'en prévaloir pour refuser de payer. Le père, représentant légal, peut confirmer le contrat et exiger le respect du principe « à travail égal, salaire égal » ; il peut aussi en demander la nullité si le contrat est désavantageux (rescision pour lésion, article 37 al. 2), le travail déjà fourni devant être rémunéré.' },
  ] },
] });

L.push({ id: 'dcsujets', title: 'Sujets de dissertation · Droit des personnes', body: [
  { p: 'Les sujets suivants reviennent aux examens. La colonne de droite indique les leçons du site à revoir avant de construire le plan.' },
  { table: { h: ['Sujet', 'Leçons à revoir'], r: [
    ['La personnalité juridique coïncide-t-elle avec la naissance ?', 'La naissance de la personnalité juridique'],
    ['L\'intérêt de la règle *infans conceptus*', 'La naissance de la personnalité juridique ; TD 1'],
    ['La mort de la personne physique', 'La fin de la personnalité'],
    ['Le régime juridique de l\'absence', 'La fin de la personnalité : la mort et l\'absence'],
    ['L\'absence et la disparition', 'La fin de la personnalité ; La disparition'],
    ['Le retour du disparu', 'La disparition'],
    ['Le droit à la vie privée à l\'épreuve du droit à l\'information', 'Les droits extrapatrimoniaux ; TD 1'],
    ['Les sanctions de la violation des droits de la personnalité', 'Les droits extrapatrimoniaux'],
    ['L\'immutabilité du nom et du prénom', 'Le nom : changement, protection et caractères'],
    ['La protection juridique du nom', 'Le nom : changement, protection et caractères'],
    ['Le nom de l\'enfant né hors mariage', 'Le nom : attribution'],
    ['Le nom patronymique double', 'Le nom : attribution'],
    ['Le domicile légal', 'Le domicile'],
    ['L\'élection de domicile', 'Le domicile'],
    ['Le jugement supplétif', 'L\'état civil : suppléance, preuve et sanctions'],
    ['La reconstitution des actes de l\'état civil', 'L\'état civil : suppléance, preuve et sanctions'],
    ['La rectification d\'un acte de l\'état civil', 'L\'état civil : suppléance, preuve et sanctions'],
    ['L\'officier de l\'état civil', 'L\'état civil : les actes'],
    ['Le sort des actes accomplis par le mineur', 'Les incapacités : le mineur ; TD 3'],
    ['L\'émancipation du mineur', 'L\'émancipation et les majeurs incapables'],
    ['L\'incapacité du majeur', 'L\'émancipation et les majeurs incapables'],
  ] } },
  { h: 'Plan proposé · L\'intérêt de la règle *infans conceptus*' },
  { ul: [
    '**Introduction** : principe (la personnalité commence à la naissance) ; adage et article 7 de la loi n° 2019-573 ; problématique : en quoi l\'exception protège-t-elle l\'enfant sans bouleverser le principe ?',
    '**I. Une règle protectrice de l\'enfant à naître** — A. Un domaine large : successions, libéralités, assurances, rentes ; B. Une règle à sens unique : elle ne joue que dans l\'intérêt de l\'enfant.',
    '**II. Une règle strictement encadrée** — A. La preuve de la conception : la période légale du 300e au 180e jour avant la naissance ; B. La naissance vivante, seule exigée depuis 2019 (suppression de la viabilité).',
  ] },
  { h: 'Plan proposé · L\'immutabilité du nom et du prénom' },
  { ul: [
    '**Introduction** : « Nul ne peut porter de nom ni de prénoms autres que ceux exprimés dans son acte de naissance » (article 15 de la loi relative au nom) ; le nom, institution de police civile et droit de la personnalité.',
    '**I. Un principe justifié** — A. Identifier les personnes : intérêt de l\'État ; B. Protéger la famille : imprescriptibilité, action contre l\'usurpation (article 17).',
    '**II. Un principe assoupli** — A. Les changements liés à l\'état : filiation, adoption, usage du nom du conjoint ; B. Les changements volontaires encadrés : relèvement, substitution, changement de prénom pour intérêt légitime.',
  ] },
] });

// ---------------------------------------------------------------- DROIT CONSTITUTIONNEL
L.push({ id: 'cst1', title: 'Exercice 1 · La hiérarchie des normes', body: [
  { p: '*Leçons à revoir : Introduction ; La Constitution (1) et (4).*' },
  { h: 'Énoncé' },
  { p: 'Classez, du sommet à la base de la pyramide de Kelsen, les actes suivants, en justifiant votre classement : un arrêté du maire d\'Abidjan sur la salubrité ; la loi portant révision de la Constitution ; un décret du Président de la République portant création d\'une commission nationale ; le traité relatif à l\'harmonisation du droit des affaires en Afrique (OHADA) ; l\'acte uniforme OHADA relatif au droit commercial général ; la loi organique sur le Conseil constitutionnel ; un arrêté ministériel ; la loi relative à la profession d\'avocat ; un règlement de l\'UEMOA sur la concurrence ; une ordonnance prise sur habilitation et ratifiée par le Parlement.' },
  { corrige: [
    { table: { h: ['Rang', 'Acte', 'Justification'], r: [
      ['1', 'La loi portant révision de la Constitution', 'Une fois adoptée, elle s\'intègre à la Constitution, norme suprême : elle a valeur constitutionnelle.'],
      ['2', 'Le traité OHADA', 'Les traités régulièrement ratifiés ont une autorité supérieure à celle des lois (article 123), mais restent soumis à la Constitution : un traité contraire ne peut être ratifié qu\'après révision (article 122).'],
      ['3', 'L\'acte uniforme OHADA ; le règlement UEMOA', 'Droit dérivé des organisations d\'intégration créées par traité (article 124) : directement applicables et supérieurs aux lois nationales, mais subordonnés au traité qui les fonde.'],
      ['4', 'La loi organique sur le Conseil constitutionnel', 'Elle précise l\'organisation des pouvoirs publics prévue par la Constitution ; contrôlée obligatoirement avant promulgation (article 134), elle s\'impose aux lois ordinaires.'],
      ['5', 'La loi relative à la profession d\'avocat ; l\'ordonnance ratifiée', 'Loi ordinaire, dans le domaine de l\'article 101. L\'ordonnance prise sur habilitation (article 106) acquiert valeur législative une fois ratifiée.'],
      ['6', 'Le décret présidentiel', 'Acte réglementaire (article 103), soumis à la loi.'],
      ['7', 'L\'arrêté ministériel', 'Pris en application des décrets, il leur est subordonné.'],
      ['8', 'L\'arrêté du maire', 'Autorité locale : il respecte les actes des autorités centrales.'],
    ] } },
    { box: 'Chaque norme tire sa validité de la norme supérieure et doit la respecter. Le Conseil constitutionnel garantit le sommet de la pyramide : il est « juge de la conformité de la loi au bloc de constitutionnalité » (article 126).', title: 'À retenir', kind: 'cle' },
  ] },
] });

L.push({ id: 'cst2', title: 'Exercice 2 · Les modes de scrutin (calcul)', body: [
  { p: '*Leçons à revoir : La participation du citoyen (2) et (3).*' },
  { h: 'Énoncé' },
  { p: 'Dans une circonscription qui élit 6 députés, on compte 150 000 inscrits, 112 400 votants et 2 150 bulletins blancs. Six listes obtiennent : A 41 200 voix ; B 27 300 ; C 16 900 ; D 10 400 ; E 8 700 ; F 3 500.' },
  { ol: [
    'Calculez le nombre de bulletins nuls, le taux de participation et le quotient électoral.',
    'Répartissez les sièges au scrutin majoritaire de liste à un tour, puis à la représentation proportionnelle au plus fort reste et à la plus forte moyenne.',
    'Un électeur propose de sanctionner les abstentionnistes. Est-ce possible en Côte d\'Ivoire ?',
  ] },
  { corrige: [
    { p: '**1. Les chiffres de base.** Suffrages exprimés : 41 200 + 27 300 + 16 900 + 10 400 + 8 700 + 3 500 = **108 000**. Les blancs et les nuls ne sont pas des suffrages exprimés : nuls = 112 400 − 108 000 − 2 150 = **2 250**. Participation : 112 400 ÷ 150 000 = **74,9 %** (abstention : 37 600 électeurs). Quotient électoral : 108 000 ÷ 6 = **18 000** voix par siège.' },
    { p: '**2. Les répartitions.**' },
    { table: { h: ['Liste', 'Voix', 'Majoritaire à un tour', 'Plus fort reste', 'Plus forte moyenne'], r: [
      ['A', '41 200', '6', '2', '3'],
      ['B', '27 300', '0', '2', '2'],
      ['C', '16 900', '0', '1', '1'],
      ['D', '10 400', '0', '1', '0'],
      ['E', '8 700', '0', '0', '0'],
      ['F', '3 500', '0', '0', '0'],
    ] } },
    { p: '*Majoritaire à un tour* : la liste arrivée en tête (A) prend les 6 sièges avec 38 % des suffrages.' },
    { p: '*Plus fort reste* : au quotient, A obtient 2 sièges (reste 5 200) et B 1 siège (reste 9 300) ; C (16 900), D (10 400), E (8 700) et F (3 500) n\'en obtiennent aucun. Les 3 sièges restants vont aux plus forts restes : C (16 900), D (10 400), B (9 300).' },
    { p: '*Plus forte moyenne* : après les 3 sièges au quotient (A 2, B 1), on calcule pour chaque siège la moyenne voix ÷ (sièges obtenus + 1). 4e siège : C (16 900 contre 13 733 pour A et 13 650 pour B). 5e siège : A (13 733). 6e siège : B (27 300 ÷ 2 = 13 650, contre 10 400 pour D et 10 300 pour A). La méthode d\'Hondt donne le même résultat.' },
    { p: '*Commentaire* : le scrutin majoritaire avantage la liste arrivée en tête ; le plus fort reste favorise les petites listes (D obtient un siège) ; la plus forte moyenne favorise les grandes listes (A obtient un troisième siège).' },
    { p: '**3. L\'abstention.** « Le suffrage est universel, libre, égal et secret » (article 52 de la Constitution). Le vote est un droit que le citoyen exerce librement : aucune sanction de l\'abstention n\'est prévue en Côte d\'Ivoire. Instaurer un vote obligatoire supposerait un texte, et se heurterait à la liberté du suffrage proclamée par la Constitution. La souveraineté appartient au peuple (article 50), qui l\'exerce par le référendum et par ses représentants élus (article 51).' },
  ] },
] });

L.push({ id: 'cst3', title: 'Exercice 3 · Questions de cours', body: [
  { p: '*Leçons à revoir : Introduction ; La notion de l\'État (2) ; La participation du citoyen (1) et (2).*' },
  { h: 'Énoncé' },
  { ol: [
    'Distinguez le droit constitutionnel et la science politique. Sont-ils complémentaires ?',
    'Présentez les deux théories de la souveraineté et la forme de démocratie que chacune implique. À quelle conception se rattache la Constitution ivoirienne ?',
    'Expliquez la formule : « Le droit de vote est l\'âme et l\'arme du citoyen en démocratie ».',
  ] },
  { corrige: [
    { p: '**1. Droit constitutionnel et science politique.** Le droit constitutionnel étudie les **règles juridiques** relatives à l\'organisation et à l\'exercice du pouvoir, à commencer par la Constitution. La science politique étudie les **faits politiques** : comportements électoraux, partis, pratique réelle du pouvoir. Le premier dit comment le pouvoir doit s\'exercer, la seconde comment il s\'exerce effectivement. Ils sont **complémentaires** : la règle ne se comprend pas sans la pratique qui l\'applique ou la contourne, et l\'analyse politique a besoin du cadre juridique.' },
    { p: '**2. Les deux théories de la souveraineté.**' },
    { table: { h: ['', 'Souveraineté nationale', 'Souveraineté populaire'], r: [
      ['Titulaire', 'La nation, entité abstraite et indivisible (Sieyès)', 'Le peuple, ensemble des citoyens : chacun en détient une part (Rousseau)'],
      ['Démocratie impliquée', 'Démocratie représentative', 'Démocratie directe ou semi-directe (référendum)'],
      ['Électorat', 'Une fonction, qui peut être réservée', 'Un droit de chaque citoyen : suffrage universel'],
      ['Mandat', 'Représentatif : l\'élu représente toute la nation', 'Impératif : l\'élu suit les instructions de ses électeurs'],
    ] } },
    { p: 'La Constitution ivoirienne combine les deux : « La souveraineté appartient au peuple » (article 50), qui l\'exerce « par la voie du référendum et par ses représentants élus » (article 51), au suffrage universel (article 52) ; mais chaque parlementaire « est le représentant de la Nation entière » et tout mandat impératif est nul (article 96). C\'est une **démocratie semi-directe**, d\'inspiration populaire, organisée sur le mode représentatif.' },
    { p: '**3. L\'âme et l\'arme du citoyen.** Le vote est **l\'âme** de la démocratie parce que la légitimité des gouvernants vient du suffrage : sans élections libres, il n\'y a pas de démocratie (articles 50 à 52). Il est **l\'arme** du citoyen parce qu\'il lui permet de choisir ses représentants, de sanctionner les sortants et de décider directement par référendum. D\'où l\'importance des garanties du suffrage : universel, libre, égal et secret, contrôlé par le Conseil constitutionnel, juge des élections (article 126).' },
  ] },
] });

L.push({ id: 'cstsujets', title: 'Sujets de dissertation · Droit constitutionnel', body: [
  { p: 'Ces sujets portent sur les chapitres étudiés en Droit constitutionnel 1. Les sujets sur les institutions ivoiriennes (Président de la République, Parlement, Sénat, responsabilité des gouvernants) relèvent du second semestre.' },
  { table: { h: ['Sujet', 'Leçons à revoir'], r: [
    ['La Constitution et le traité : quelle hiérarchie ?', 'La Constitution (1) et (4) ; Exercice 1'],
    ['Le sort du traité contraire à la Constitution', 'La Constitution (4)'],
    ['La technique juridique de révision de la Constitution', 'La Constitution (3)'],
    ['La Constitution ivoirienne de 2016 est-elle souple ou rigide ?', 'La Constitution (2) et (3)'],
    ['Les actes soumis au contrôle de constitutionnalité', 'La Constitution (4)'],
    ['Le sort de la loi contraire à la Constitution', 'La Constitution (4)'],
    ['Le contrôle de constitutionnalité de la loi déjà promulguée', 'La Constitution (4)'],
    ['Le pouvoir constituant', 'La Constitution (3)'],
    ['Souveraineté nationale et souveraineté populaire', 'La participation du citoyen (1) et (2)'],
    ['Les modes de scrutin et le système des partis', 'La participation du citoyen (3)'],
    ['Décentralisation et fédéralisme', 'Les formes de l\'État (1) et (2)'],
  ] } },
  { h: 'Plan proposé · La Constitution et le traité : quelle hiérarchie ?' },
  { ul: [
    '**Introduction** : la Constitution, norme suprême ; le traité, engagement de l\'État ; article 123 : autorité supérieure à celle des lois ; problématique : le traité peut-il s\'imposer à la Constitution ?',
    '**I. La supériorité du traité sur la loi** — A. Le principe (article 123) ; B. Ses conditions : ratification régulière, publication, application par l\'autre partie.',
    '**II. La primauté de la Constitution sur le traité** — A. Le contrôle préalable : un traité contraire ne peut être ratifié qu\'après révision (article 122) ; B. Les limites : l\'intégration africaine, qui suppose des abandons partiels de souveraineté consentis par la Constitution elle-même (article 124).',
  ] },
] });

module.exports = {
  id: 'annales', title: 'Sujets d\'examen corrigés', lessons: L, cards: [],
  parts: [
    ['Méthode', ['methode']],
    ['Première partie · Droit civil : les personnes', ['dc1', 'dc2', 'dc3', 'dc4', 'dc5', 'dc6', 'dc7', 'dcsujets']],
    ['Deuxième partie · Droit constitutionnel', ['cst1', 'cst2', 'cst3', 'cstsujets']],
  ],
};
