// Annales des examens de Licence 1 : corrigés des sujets 1 à 8 (introduction au droit, droit des personnes,
// organisation judiciaire, droit constitutionnel). Droit ivoirien en vigueur : Constitution de 2016 révisée
// (outils/constitution/constitution.json), lois de 2019, 2020 et 2022 citées dans les leçons du site.

const VFC = rows => ({ table: { h: ['N°', 'Réponse', 'Justification'], r: rows } });
const C = [];

// ---------------------------------------------------------------- 1
C.push({ id: 'c1', title: 'Corrigé du sujet 1 · Introduction générale à l\'étude du droit', body: [
  { p: '*Leçons à revoir : La loi ; La coutume ; La jurisprudence ; Les droits patrimoniaux ; Les droits extrapatrimoniaux (Introduction à l\'étude du droit).*' },
  { h: '1. Les sources de la règle de droit' },
  { p: 'Les **sources du droit** sont les procédés par lesquels naissent les règles de droit. On distingue :' },
  { ul: [
    '**La loi**, au sens large : toute règle écrite, générale et obligatoire, posée par une autorité publique compétente (la Constitution, les traités, les lois votées par le Parlement, les ordonnances, les décrets et arrêtés). C\'est la source principale du droit ivoirien.',
    '**La coutume** : une règle non écrite, née d\'un usage répété et ressentie comme obligatoire par ceux qui la suivent.',
    '**La jurisprudence** : l\'ensemble des décisions rendues par les juridictions et, plus précisément, la solution que les tribunaux donnent habituellement à une même question de droit.',
    '**La doctrine** : l\'ensemble des opinions émises par les juristes (professeurs, magistrats, avocats) dans leurs ouvrages, articles et commentaires.',
  ] },
  { h: '2. Sources directes et sources indirectes' },
  { p: 'Les **sources directes** (la loi et la coutume) créent par elles-mêmes une règle obligatoire qui s\'impose à tous, et au juge. Les **sources indirectes** (la jurisprudence et la doctrine) n\'ont pas de force obligatoire générale : elles interprètent, précisent et inspirent la règle. Le juge ne peut d\'ailleurs pas « prononcer par voie de disposition générale et réglementaire » (article 5 du Code civil) : sa décision ne vaut que pour l\'affaire jugée.' },
  { h: '3. La hiérarchie des normes' },
  { p: 'La **hiérarchie des normes** est le classement des règles de droit selon leur valeur : chaque norme doit respecter celles qui lui sont supérieures, sous le contrôle d\'un juge. On la représente par une pyramide : Constitution, traités, lois, règlements, actes individuels.' },
  { table: { h: ['Rapport', 'Règle', 'Contrôle'], r: [
    ['**La loi et le règlement**', 'La Constitution partage les matières : le domaine de la loi est fixé par l\'article 101 ; « les matières autres que celles qui sont du domaine de la loi relèvent du domaine réglementaire » (article 103). Le règlement d\'application doit respecter la loi.', 'Le juge administratif : le Conseil d\'État annule les actes réglementaires illégaux (article 149)'],
    ['**La loi et la Constitution**', 'La loi doit être conforme à la Constitution.', 'Le Conseil constitutionnel, avant la promulgation (articles 113 et 134) ou par voie d\'exception au cours d\'un procès (article 135) ; la disposition contraire ne peut être promulguée ou est abrogée (article 137)'],
    ['**La Constitution et le traité**', 'Le traité régulièrement ratifié a, dès sa publication, une autorité supérieure à celle des lois, sous réserve de son application par l\'autre partie (article 123). Mais il reste inférieur à la Constitution : un traité qui comporte une clause contraire ne peut être ratifié qu\'après la révision de la Constitution (article 122).', 'Le Conseil constitutionnel, saisi avant la ratification (article 122)'],
  ] } },
  { box: 'Les Actes uniformes de l\'OHADA sont directement applicables et obligatoires dans les États parties, nonobstant toute disposition contraire de droit interne, antérieure ou postérieure (article 10 du Traité OHADA). La Constitution autorise ces abandons partiels de souveraineté en vue de l\'unité africaine (article 124).', title: 'Le droit communautaire', kind: 'marge' },
  { h: '4. La loi et le droit' },
  { ul: [
    '**La loi** a deux sens. Au **sens formel**, c\'est le texte voté par le Parlement selon la procédure prévue par la Constitution (« Le Parlement vote la loi », article 93). Au **sens matériel**, c\'est toute règle de droit générale, abstraite et obligatoire posée par une autorité publique, quelle qu\'elle soit (loi votée, ordonnance, décret).',
    '**Le droit** a, lui aussi, deux sens. Le **droit objectif** est l\'ensemble des règles de conduite qui régissent la vie en société et dont le respect est assuré par l\'autorité publique. Les **droits subjectifs** sont les prérogatives que le droit objectif reconnaît à une personne et qu\'elle peut faire valoir en justice (le droit de propriété, le droit à réparation).',
  ] },
  { h: '5. La classification des droits subjectifs' },
  { table: { h: ['Catégorie', 'Sous-catégories', 'Exemples'], r: [
    ['**Droits patrimoniaux** (évaluables en argent)', 'Droits réels principaux ; droits réels accessoires ; droits personnels ou de créance ; droits intellectuels', 'Propriété, usufruit ; hypothèque, gage ; droit au loyer ; droit d\'auteur, brevet, marque'],
    ['**Droits extrapatrimoniaux** (sans valeur pécuniaire)', 'Droits de la personnalité ; droits familiaux ; droits civiques et politiques', 'Vie privée, image, honneur ; autorité parentale ; droit de vote'],
  ] } },
  { h: '6. Le droit de propriété' },
  { p: '« La propriété est le droit de jouir et de disposer des choses de la manière la plus absolue, pourvu qu\'on n\'en fasse pas un usage prohibé par les lois ou par les règlements » (article 544 du Code civil). Elle confère trois attributs : l\'**usus** (user de la chose), le **fructus** (en percevoir les fruits) et l\'**abusus** (en disposer : la vendre, la donner, la détruire). Elle est **absolue**, **exclusive** et **perpétuelle**. La Constitution la garantit : nul n\'en est privé que pour cause d\'utilité publique et moyennant une juste et préalable indemnisation (article 11).' },
  { h: '7. Les démembrements du droit de propriété' },
  { ul: [
    '**L\'usufruit et la nue-propriété** : l\'usufruitier a l\'usus et le fructus ; le nu-propriétaire garde l\'abusus et retrouve la pleine propriété à la fin de l\'usufruit (au plus tard à la mort de l\'usufruitier).',
    '**Les droits d\'usage et d\'habitation** : des usufruits réduits aux besoins de leur titulaire et de sa famille.',
    '**Les servitudes** : des charges imposées à un immeuble (le fonds servant) pour l\'usage et l\'utilité d\'un immeuble appartenant à un autre propriétaire (le fonds dominant), par exemple un droit de passage.',
  ] },
  { h: '8. Droits patrimoniaux et droits extrapatrimoniaux' },
  { p: 'Le critère est la **valeur pécuniaire**. Les droits patrimoniaux sont évaluables en argent ; ils sont donc **cessibles**, **transmissibles** à cause de mort, **saisissables** par les créanciers et, en principe, **prescriptibles**. Les droits extrapatrimoniaux ne sont pas évaluables en argent : ils sont **incessibles**, **intransmissibles**, **insaisissables** et **imprescriptibles**. La distinction connaît des nuances : l\'atteinte à un droit extrapatrimonial se répare en argent (dommages-intérêts), et certains ont un aspect patrimonial (l\'exploitation commerciale de son image).' },
  { h: '9. Les éléments constitutifs de la coutume' },
  { ul: [
    '**L\'élément matériel** : un **usage** répété, **ancien**, **constant**, **général** (suivi par l\'ensemble d\'un groupe) et **notoire**.',
    '**L\'élément psychologique** : l\'*opinio necessitatis*, la conviction de ceux qui suivent l\'usage qu\'il est obligatoire, qu\'ils doivent s\'y conformer.',
  ] },
  { h: '10. L\'élément déterminant' },
  { p: 'C\'est l\'**élément psychologique**. Un usage, même très ancien, n\'est qu\'une habitude tant que ceux qui le suivent ne se sentent pas obligés de s\'y conformer : c\'est le sentiment d\'obligation qui transforme le fait en règle de droit et distingue la coutume des simples usages de politesse ou de commodité.' },
  { box: 'Coutume = **usage** + **sentiment d\'obligation**. Sans l\'élément psychologique, il n\'y a qu\'une habitude.', title: 'À retenir', kind: 'cle' },
] });

// ---------------------------------------------------------------- 2
C.push({ id: 'c2', title: 'Corrigé du sujet 2 · Droits de la personne, absence et disparition', body: [
  { p: '*Leçons à revoir : Les droits patrimoniaux ; Les droits extrapatrimoniaux ; La fin de la personnalité : la mort et l\'absence ; La disparition (Droit civil).*' },
  { h: 'Exercice 1' },
  { p: '**1. Vrai ou faux**' },
  VFC([
    ['1', 'Faux', 'Les droits extrapatrimoniaux n\'ont pas de valeur pécuniaire. C\'est le propre des droits patrimoniaux d\'être évaluables en argent.'],
    ['2', 'Faux', 'Le droit réel (*jus in re*) est un pouvoir direct et immédiat sur une chose : la propriété d\'une maison.'],
    ['3', 'Faux', 'Les droits réels accessoires (gage, nantissement, hypothèque) ont justement pour objet de **garantir une créance** : ils en sont l\'accessoire.'],
    ['4', 'Faux', 'Le droit personnel, ou de créance, est le droit d\'exiger **d\'une personne** une prestation (donner, faire ou ne pas faire). C\'est le droit réel qui porte directement sur une chose.'],
  ]),
  { p: '**2. Droits réels principaux et accessoires**' },
  { table: { h: ['Droits réels principaux', 'Droits réels accessoires'], r: [
    ['Le droit de propriété', 'Le gage (sur un meuble corporel)'],
    ['L\'usufruit', 'Le nantissement (sur un meuble incorporel : créance, fonds de commerce)'],
    ['La nue-propriété', 'L\'hypothèque (sur un immeuble)'],
  ] } },
  { p: 'Les droits réels **principaux** portent sur l\'utilité de la chose elle-même : la propriété et ses démembrements (usufruit, nue-propriété). Les droits réels **accessoires** n\'existent que pour garantir le paiement d\'une créance ; ils sont aujourd\'hui régis par l\'Acte uniforme OHADA portant organisation des sûretés.' },
  { box: 'L\'usufruit et la nue-propriété sont des **démembrements** de la propriété, donc des droits réels **principaux** : les ranger parmi les accessoires est l\'erreur la plus fréquente.', title: 'Piège', kind: 'piege' },
  { p: '**3. Droits de l\'homme et droits privés de la personnalité**' },
  { table: { h: ['Droits de l\'homme', 'Droits privés de la personnalité'], r: [
    ['Le droit à la vie (article 3 de la Constitution)', 'Le droit au respect de la vie privée'],
    ['Le droit à l\'éducation et le droit à la santé (article 9)', 'Le droit à l\'intégrité physique'],
    ['La liberté d\'expression et la liberté religieuse (article 19)', 'Le droit à l\'honneur'],
    ['La liberté d\'aller et venir (article 21)', 'Le droit à l\'image'],
  ] } },
  { p: 'Les **droits de l\'homme** sont des prérogatives que l\'individu oppose d\'abord à l\'État et que la Constitution garantit. Les **droits privés de la personnalité** protègent la personne dans ses rapports avec les autres particuliers ; leur violation est une faute qui oblige son auteur à réparer le dommage (article 1382 du Code civil).' },
  { h: 'Exercice 2' },
  VFC([
    ['1', 'Faux', 'La personnalité juridique est l\'aptitude d\'une **personne** (physique ou morale) à être titulaire de droits et d\'obligations. Une chose est objet de droit, jamais sujet.'],
    ['2', 'Faux', 'Il en existe **deux** : l\'absence et la disparition (loi n° 2022-885 du 23 novembre 2022 relative à l\'absence et à la disparition).'],
    ['3', 'Faux', 'C\'est la définition de l\'**absence** : la personne a cessé de paraître sans que l\'on ait de ses nouvelles (article 1er). Le disparu a cessé de paraître dans des circonstances de nature à mettre sa vie en danger, sans que son corps ait été retrouvé (article 13).'],
    ['4', 'Vrai', 'La volonté du défunt produit effet par son testament, sa mémoire et son corps sont protégés, et ses droits patrimoniaux passent à ses héritiers.'],
    ['5', 'Faux', 'C\'est la définition de la **disparition**.'],
    ['6', 'Faux', 'Le jugement déclaratif de décès du disparu peut être demandé **dès un an** après la disparition. Le délai de **dix ans** concerne l\'absent : il peut être déclaré décédé dix ans après les dernières nouvelles, ou sept ans après le jugement déclaratif d\'absence.'],
    ['7', 'Vrai', 'Le mariage est dissous dès que le jugement déclaratif d\'absence est définitif ; le conjoint peut se remarier.'],
    ['8', 'Vrai', 'Dans les deux cas, la succession s\'ouvre par le **jugement déclaratif de décès**, qui tient lieu d\'acte de décès : directement pour le disparu ; au terme de la procédure d\'absence pour l\'absent. La simple déclaration d\'absence n\'ouvre pas la succession.'],
    ['9', 'Faux', 'La personne qui réapparaît fait annuler le jugement ; elle recouvre ses biens dans l\'état où ils se trouvent, le prix de ceux qui ont été vendus ou les biens acquis en remploi (articles 12 et 26).'],
    ['10', 'Faux', 'Le mariage de l\'absent ou du disparu **reste dissous** ; le nouveau mariage du conjoint demeure valable.'],
  ]),
  { box: 'Absence : 1 an pour saisir le tribunal, 2 ans d\'enquête, puis décès déclaré 7 ans après le jugement d\'absence ou 10 ans après les dernières nouvelles. Disparition : jugement déclaratif de décès possible après 1 an.', title: 'Les délais à retenir', kind: 'cle' },
] });

// ---------------------------------------------------------------- 3
C.push({ id: 'c3', title: 'Corrigé du sujet 3 · Le nom et le domicile', body: [
  { p: '*Leçons à revoir : Le nom : attribution ; Le nom : changement, protection et caractères ; Le domicile (Droit civil).*' },
  { h: 'Exercice 1 · Le nom' },
  VFC([
    ['1', 'Vrai', 'Le nom est un attribut de la personnalité, hors du commerce et sans valeur pécuniaire. Seul le **nom commercial** a une valeur patrimoniale.'],
    ['2', 'Faux', 'Le nom désigne une **personne** : « toute personne doit avoir un nom patronymique et un ou plusieurs prénoms » (article 1er de la loi n° 2020-490 du 29 mai 2020 relative au nom).'],
    ['3', 'Faux', 'Le nom patronymique et les prénoms en sont les éléments **obligatoires**, mais pas les seuls : il existe des **accessoires du nom**, le surnom, le pseudonyme, la particule (article 16). Le mot « exclusivement » rend l\'affirmation fausse.'],
    ['4', 'Vrai', 'Le nom patronymique est le nom de la famille à laquelle on appartient.'],
    ['5', 'Vrai', 'Le nom découle de la **filiation** (articles 2 et 3 de la loi relative au nom). Le **mariage** ne donne pas un nouveau nom, mais la femme mariée a l\'**usage** du nom de son mari (article 55 de la loi relative au mariage).'],
    ['6', 'Vrai', 'Le prénom distingue l\'individu des autres membres de la même famille.'],
    ['7', 'Vrai', 'Le principe d\'immutabilité (article 15) connaît des exceptions : l\'adopté prend le nom de l\'adoptant ; la femme mariée prend l\'usage du nom de son mari.'],
    ['8', 'Vrai', 'Le nom commercial peut être cédé avec le fonds de commerce, pour sa seule exploitation ; la personne garde son nom de famille.'],
    ['9', 'Vrai', 'Le nom de l\'enfant trouvé, de parents inconnus, est attribué par l\'**officier de l\'état civil** (le maire ou le sous-préfet), en accord avec l\'établissement qui l\'a recueilli.'],
    ['10', 'Faux', 'Le porteur du nom et ses descendants peuvent s\'opposer à son usurpation et obtenir des dommages-intérêts (article 17) ; l\'usage d\'un faux nom est puni par le Code pénal.'],
  ]),
  { h: 'Exercice 2 · Le domicile' },
  { p: '**1. Vrai ou faux**' },
  VFC([
    ['1', 'Vrai', 'Le domicile est au lieu du principal établissement (article 1er de la loi n° 2020-491 du 29 mai 2020 relative au domicile) : c\'est le lieu où la loi situe la personne.'],
    ['2', 'Faux', 'Les définitions sont inversées : la **résidence** est le lieu où la personne vit effectivement de façon normale ; l\'**habitation** est le lieu d\'un séjour bref et occasionnel.'],
    ['3', 'Faux', 'Le domicile est **obligatoire** : toute personne en a un. Il est aussi **unique** (sauf le domicile élu) et **inviolable** (article 8 de la Constitution).'],
  ]),
  { p: '**2. Les types de domicile**' },
  { table: { h: ['Type', 'Description'], r: [
    ['**Domicile volontaire**', 'Le lieu où la personne a choisi d\'avoir son principal établissement : élément matériel et élément intentionnel'],
    ['**Domicile légal**', 'Le domicile imposé par la loi : de fonction (magistrats, notaires) ou de dépendance (mineur non émancipé)'],
    ['**Domicile élu**', 'Le lieu choisi par les parties à un acte juridique pour l\'exécution de cet acte (article 10)'],
  ] } },
  { p: '**3. Le cas de M. Tiémoko**' },
  { p: 'M. Tiémoko a son **domicile** à Yopougon et une **résidence** à Cocody, chez sa mère.' },
  { ol: [
    '**Le mariage** est célébré au centre d\'état civil du domicile ou de la résidence de l\'un des futurs époux (article 20 de la loi relative au mariage) : à **Yopougon**, son domicile, mais aussi à Cocody, sa résidence, ou dans la commune du domicile ou de la résidence de sa future épouse.',
    '**Le remboursement** se fait au domicile du débiteur, sauf convention contraire : la dette est **quérable** (article 1247 du Code civil). Il aura donc lieu à **Yopougon**, et non au Plateau, domicile du créancier.',
    '**En cas de litige**, le défendeur est assigné devant le tribunal de son domicile (article 11 du Code de procédure civile). M. Yao, créancier, poursuivra M. Tiémoko devant le **tribunal de première instance de Yopougon**.',
    '**La succession** s\'ouvre au lieu du **dernier domicile** du défunt : **Yopougon**.',
  ] },
] });

// ---------------------------------------------------------------- 4
const OJ_C = [
  ['1', 'Faux', 'La séparation des pouvoirs interdit au juge de faire la loi : il l\'applique à l\'affaire qui lui est soumise et ne peut statuer par voie de disposition générale (article 5 du Code civil).'],
  ['2', 'Vrai', 'Les sections détachées des tribunaux de première instance jugent en premier degré, dans leur ressort, avec la compétence du tribunal auquel elles sont rattachées.'],
  ['3', 'Vrai', 'C\'est la définition de la juridiction de droit commun : le tribunal de première instance connaît de tout ce qu\'un texte n\'attribue pas à une autre juridiction.'],
  ['4', 'Vrai', 'Le tribunal criminel juge les crimes en premier ressort ; c\'est une juridiction d\'exception, spécialisée.'],
  ['5', 'Vrai', 'Il ne connaît que des litiges commerciaux, en premier degré.'],
  ['6', 'Vrai', 'Les litiges immobiliers relèvent de la juridiction de droit commun, le tribunal de première instance.'],
  ['7', 'Vrai', 'C\'est le principe du double degré de juridiction : l\'affaire jugée en premier ressort peut être rejugée en fait et en droit par la cour d\'appel.'],
  ['8', 'Faux', 'Le tribunal du travail est présidé par un magistrat, assisté d\'**assesseurs** représentant, à parts égales, les employeurs et les travailleurs : c\'est une juridiction paritaire.'],
  ['9', 'Vrai', 'Le Conseil d\'État est la plus haute juridiction de l\'ordre administratif ; il connaît en premier et dernier ressort des recours en annulation des actes des autorités administratives centrales (article 149 de la Constitution). La Constitution prévoit aussi des tribunaux administratifs (article 143).'],
  ['10', 'Vrai', 'Elles ne peuvent faire l\'objet que d\'un **pourvoi en cassation**.'],
  ['11', 'Vrai', 'La gratuité signifie que l\'on ne paie pas le juge ; les honoraires de l\'avocat et certains frais restent dus (l\'assistance judiciaire aide les plus démunis).'],
  ['12', 'Faux', 'Les juges consulaires ne sont pas des magistrats : ce sont des **commerçants expérimentés**, nommés pour trois ans renouvelables, qui siègent aux côtés des juges professionnels.'],
  ['13', 'Vrai', 'La Cour de cassation statue sur les recours en cassation contre les décisions rendues en dernier ressort par les cours et tribunaux de l\'ordre judiciaire (article 148).'],
  ['14', 'Faux', 'Le recours pour excès de pouvoir relève de l\'**ordre administratif** : Conseil d\'État et tribunaux administratifs (articles 147 et 149).'],
  ['15', 'Faux', 'Le Conseil constitutionnel juge l\'élection présidentielle, les élections des députés et des sénateurs et le référendum (articles 126 et 127). Le contentieux des élections régionales et municipales relève du **Conseil d\'État**.'],
  ['16', 'Vrai', 'Le Conseil d\'État est le juge des élections locales ; il a ainsi tranché les recours des élections municipales et régionales de septembre 2023.'],
  ['17', 'Vrai', 'Voir la réponse 8.'],
  ['18', 'Faux', 'Il comprend des juges professionnels et des **juges consulaires** ; les juges professionnels ne peuvent y être plus nombreux que les juges consulaires.'],
  ['19', 'Faux', 'L\'appel des décisions du tribunal criminel est porté devant la **chambre criminelle de la cour d\'appel**. Le Conseil d\'État est une juridiction administrative.'],
  ['20', 'Faux', 'La Cour de cassation n\'est pas un degré de juridiction : elle juge **le droit et non les faits** ; elle vérifie que la loi a été correctement appliquée.'],
];
C.push({ id: 'c4', title: 'Corrigé du sujet 4 · Les juridictions ivoiriennes en vingt affirmations', body: [
  { p: '*Leçons à revoir : La séparation des pouvoirs ; Le tribunal de première instance ; Les juridictions d\'exception ; La cour d\'appel ; La Cour de cassation (Organisation judiciaire).*' },
  VFC(OJ_C),
  { box: 'La Cour de cassation (ordre judiciaire) et le Conseil d\'État (ordre administratif) sont les sommets de deux ordres distincts depuis la révision constitutionnelle de 2020, qui a supprimé la Cour suprême. Le Conseil constitutionnel est à part : il juge la loi et les élections nationales.', title: 'À retenir', kind: 'cle' },
] });

// ---------------------------------------------------------------- 5
C.push({ id: 'c5', title: 'Corrigé du sujet 5 · Magistrats, Haute Cour de justice, actes du greffe', body: [
  { h: 'Sujet n° 1' },
  { p: 'Voir les réponses 1 à 10 du corrigé du sujet 4.' },
  { h: 'Sujet n° 2' },
  { p: '**1. Magistrat du siège et magistrat du parquet**' },
  { table: { h: ['', 'Magistrat du siège', 'Magistrat du parquet'], r: [
    ['**Rôle**', 'Il **juge** : il tranche le litige et rend la décision', 'Il **poursuit** et **requiert** l\'application de la loi au nom de la société (ministère public)'],
    ['**Image**', 'La magistrature « assise »', 'La magistrature « debout » : il se lève pour prendre ses réquisitions'],
    ['**Statut**', '**Inamovible** : il ne peut être muté sans son accord, sauf nécessités de service (article 140 de la Constitution) ; il n\'obéit qu\'à la loi', '**Hiérarchisé** : il est placé sous l\'autorité de ses chefs et du garde des Sceaux, ministre de la Justice ; « la plume est serve, mais la parole est libre »'],
  ] } },
  { p: 'Les deux appartiennent au même corps : un magistrat peut passer du siège au parquet au cours de sa carrière.' },
  { p: '**2. Les attributions de la Haute Cour de justice**' },
  { ul: [
    'C\'est une **juridiction d\'exception**, non permanente, qui juge le Président de la République, le vice-Président et les membres du Gouvernement (article 156).',
    'Le **Président de la République** n\'y est traduit qu\'en cas de **haute trahison** (article 157). Le **vice-Président** et les **membres du Gouvernement** y répondent des faits qualifiés crimes ou délits commis dans l\'exercice de leurs fonctions (article 158).',
    'Elle est liée par la définition des crimes et délits et par les peines prévues par les lois pénales en vigueur au moment des faits (article 159).',
    'Elle se compose de membres élus en nombre égal, en leur sein, par l\'Assemblée nationale et par le Sénat, et elle est présidée par le Président de la Cour de cassation (article 160). La mise en accusation est votée au scrutin secret par le Parlement : à la majorité des deux tiers pour le Président de la République, à la majorité absolue pour les autres (article 161).',
  ] },
  { p: '**3. Minute, expédition et grosse**' },
  { ul: [
    '**La minute** est l\'**original** du jugement, signé par le président et le greffier, et conservé au greffe.',
    '**L\'expédition** est une **copie certifiée conforme** de la minute, délivrée par le greffier aux parties qui la demandent.',
    '**La grosse** est l\'expédition revêtue de la **formule exécutoire** : elle permet de faire exécuter la décision, au besoin par la force publique. Elle n\'est délivrée qu\'une fois à la partie qui l\'a obtenue.',
  ] },
  { p: '**4. Le principe d\'égalité**' },
  { p: 'Tous les citoyens sont égaux devant la justice : ils sont jugés **par les mêmes juridictions**, **selon les mêmes règles** de procédure et avec **les mêmes garanties**. Le principe interdit les juridictions de faveur fondées sur la naissance, la fortune, la religion ou l\'origine (article 4 de la Constitution ; libre et égal accès à la justice, article 6). Il n\'empêche pas des différences fondées sur une situation objective : le tribunal pour enfants protège le mineur.' },
  { p: '**5. Deux obligations du magistrat** (deux suffisent ; en voici plusieurs)' },
  { ul: [
    '**L\'impartialité, la neutralité et la probité** : « Le magistrat doit être compétent. Il doit faire preuve d\'impartialité, de neutralité et de probité dans l\'exercice de ses fonctions » (article 141 de la Constitution).',
    '**Le secret** des délibérations et le secret professionnel.',
    '**Le devoir de réserve** : il s\'abstient de toute manifestation publique d\'opinion qui compromettrait l\'image d\'impartialité de la justice, et de toute activité politique.',
    '**L\'obligation de résidence** au siège de la juridiction à laquelle il appartient.',
    '**Les incompatibilités** : pas de mandat électif, pas d\'activité commerciale ou professionnelle.',
  ] },
] });

// ---------------------------------------------------------------- 6
C.push({ id: 'c6', title: 'Corrigé du sujet 6 · Le contrôle de constitutionnalité ; les éléments constitutifs de l\'État', body: [
  { p: '*Leçons à revoir : La Constitution (4) : le contrôle de constitutionnalité ; Les éléments de l\'État ; Souveraineté et personnalité morale (Droit constitutionnel).*' },
  { h: 'Sujet 1 · Cas pratique' },
  { p: '**Les faits utiles.** Une loi interdisant les associations étudiantes à caractère syndical est adoptée le 15 décembre 2022. Trois actions la contestent : la saisine du juge constitutionnel par une association non déclarée (16 décembre), celle d\'un groupe parlementaire (17 décembre) et l\'exception d\'inconstitutionnalité soulevée dans un procès en responsabilité ouvert après une manifestation (31 décembre).' },
  { p: '**1. Le Collectif des révoltés** (saisine du 16 décembre)' },
  { ul: [
    '*Problème* : une association non déclarée de défense des étudiants peut-elle déférer une loi au Conseil constitutionnel avant sa promulgation ?',
    '*Règle* : « Les associations de défense des droits de l\'homme **légalement constituées** peuvent également déférer au Conseil constitutionnel, avant leur promulgation, les lois relatives aux **libertés publiques** » (article 113, alinéa 2). Selon la loi n° 60-315 du 21 septembre 1960 relative aux associations, l\'association non déclarée n\'a pas la personnalité juridique.',
    '*Application* : la loi touche bien une liberté publique (la liberté d\'association, article 20), et la saisine intervient avant la promulgation. Mais le Collectif n\'est pas déclaré, donc pas « légalement constitué », et son objet, la défense des étudiants, n\'est pas la défense des droits de l\'homme.',
    '*Conclusion* : sa requête est **irrecevable** ; il n\'a aucune chance d\'obtenir gain de cause.',
  ] },
  { p: '**2. Les députés du groupe « Les Justiciers »** (saisine du 17 décembre)' },
  { ul: [
    '*Problème* : un groupe parlementaire peut-il contester la loi avant sa promulgation ?',
    '*Règle* : les lois peuvent, avant leur promulgation, être déférées au Conseil constitutionnel par le Président de la République, les présidents des deux chambres, un dixième au moins des députés ou des sénateurs, ou **par les groupes parlementaires** (article 113, alinéa 1er). La saisine suspend le délai de promulgation ; le Conseil statue dans les quinze jours.',
    '*Application* : la saisine est recevable, la loi n\'étant pas encore promulguée (le Président dispose de trente jours, article 74). Sur le fond, la Constitution garantit la liberté d\'association (article 20) et charge la loi de fixer « les garanties fondamentales accordées aux citoyens pour l\'exercice des libertés publiques » (article 101) : le législateur peut **encadrer** une liberté, non la **supprimer**. Une interdiction générale de toutes les associations étudiantes à caractère syndical, sans motif d\'ordre public précis, est disproportionnée. Le droit syndical de l\'article 17, lui, est reconnu aux travailleurs et aux agents publics : les étudiants s\'appuieront donc d\'abord sur la liberté d\'association. Une loi relative aux libertés publiques doit aussi être transmise, avant sa promulgation, à l\'organisme chargé de la défense des droits de l\'homme (article 113, alinéa 3).',
    '*Conclusion* : la requête est recevable et a de **sérieuses chances** d\'aboutir. Si la loi est déclarée contraire à la Constitution, elle ne peut être ni promulguée ni appliquée et elle est nulle à l\'égard de tous (article 137).',
  ] },
  { p: '**3. L\'exception soulevée devant la section de tribunal de Babi** (31 décembre)' },
  { ul: [
    '*Problème* : un plaideur peut-il soulever, au cours d\'un procès en responsabilité, l\'inconstitutionnalité de la loi sur les associations ?',
    '*Règle* : « Tout plaideur peut, par voie d\'exception, soulever l\'inconstitutionnalité d\'une loi devant toute juridiction. » La juridiction sursoit à statuer et accorde au plaideur quinze jours pour saisir le Conseil constitutionnel ; à défaut de preuve de la saisine, elle passe outre (article 135). Les décisions du Conseil constitutionnel s\'imposent à toutes les autorités juridictionnelles (articles 137 et 138).',
    '*Application* : les dirigeants poursuivis sont des plaideurs et la section de tribunal est une juridiction : l\'exception est en principe recevable. Mais l\'exception vise une **loi en vigueur**, applicable au litige. Or, le 31 décembre, la loi est suspendue par la saisine du 17 décembre et n\'est sans doute pas encore promulguée : l\'exception est alors sans objet. Si le Conseil l\'a déclarée contraire à la Constitution, elle ne sera jamais appliquée ; s\'il l\'a déclarée conforme, sa décision s\'impose au juge et l\'exception ne peut prospérer. Surtout, l\'action de l\'enseignant repose sur la **responsabilité civile** (article 1382 du Code civil) : quelle que soit la validité de la loi, ceux qui l\'ont blessé lui doivent réparation.',
    '*Conclusion* : l\'exception a **peu de chances** de prospérer et ne fera pas échapper le Collectif à sa responsabilité. L\'enseignant obtiendra réparation contre les auteurs des coups, et contre les dirigeants s\'il prouve une faute personnelle de leur part (organisation ou incitation aux violences) ; l\'association non déclarée, sans personnalité juridique, ne peut pas être condamnée en tant que telle.',
  ] },
  { h: 'Sujet 2 · Dissertation : les éléments constitutifs de l\'État' },
  { p: '**Introduction.** L\'État se définit comme l\'organisation d\'une collectivité humaine vivant sur un territoire donné, soumise à un pouvoir politique souverain. La Convention de Montevideo (1933) retient les mêmes éléments en droit international : une population permanente, un territoire déterminé, un gouvernement, la capacité d\'entrer en relation avec les autres États. Ces éléments doivent être réunis **cumulativement**. *Problématique* : ces éléments suffisent-ils à faire un État, ou faut-il y ajouter la souveraineté qui les unit ?' },
  { ul: [
    '**I. Les éléments matériels : une population sur un territoire.** A. *La population* : l\'ensemble des personnes rattachées à l\'État par la nationalité, que l\'on distingue de la nation (conceptions objective, allemande, et subjective, française, de la nation) ; il n\'y a pas de seuil minimal. B. *Le territoire* : terrestre, maritime et aérien, délimité par des frontières ; en Afrique, le principe de l\'intangibilité des frontières héritées de la colonisation ; la République est « une et indivisible » (article 49 de la Constitution) et le Président est garant de l\'intégrité du territoire (article 54).',
    '**II. L\'élément politique et juridique : un pouvoir souverain.** A. *Le pouvoir politique organisé* : un gouvernement effectif, qui détient le monopole de la contrainte légitime et assure l\'ordre ; « la souveraineté appartient au peuple » (article 50). B. *La souveraineté et la personnalité morale* : souveraineté interne (aucun pouvoir supérieur sur le territoire) et externe (indépendance, égalité avec les autres États) ; la personnalité morale assure la continuité de l\'État. La **reconnaissance** par les autres États ne crée pas l\'État : elle constate son existence (effet déclaratif).',
  ] },
  { p: '**Conclusion** : la population et le territoire sont la matière de l\'État ; la souveraineté en fait une personne juridique distincte des gouvernants. Ouverture : les intégrations régionales (UEMOA, OHADA, article 124 de la Constitution) montrent qu\'un État peut consentir des abandons partiels de souveraineté sans cesser d\'exister.' },
] });

// ---------------------------------------------------------------- 7
const PR_POUVOIRS = [
  { p: 'Le Président de la République est « le détenteur exclusif du pouvoir exécutif » (article 63). Élu pour cinq ans au suffrage universel direct, rééligible une fois (article 55), il dispose de pouvoirs que l\'on peut classer ainsi :' },
  { table: { h: ['Domaine', 'Pouvoirs', 'Articles'], r: [
    ['**Chef de l\'État**', 'Il incarne l\'unité nationale, veille au respect de la Constitution, assure la continuité de l\'État ; garant de l\'indépendance nationale, de l\'intégrité du territoire et des engagements internationaux, et de l\'indépendance du pouvoir judiciaire', '54, 139'],
    ['**Exécutif**', 'Il détermine et conduit la politique de la Nation, assure l\'exécution des lois et des décisions de justice, prend les règlements ; il est le chef de l\'Administration et nomme aux emplois civils et militaires ; il préside le Conseil des ministres ; il peut déléguer certains pouvoirs', '64, 65, 67, 71, 76, 77'],
    ['**Gouvernement**', 'Il nomme le Premier ministre et met fin à ses fonctions ; sur proposition de celui-ci, il nomme et révoque les ministres, qui sont responsables devant lui', '70, 83'],
    ['**Vice-Président**', 'Il le choisit, en accord avec le Parlement', '55'],
    ['**Législation**', 'Initiative des lois et droit d\'amendement ; promulgation dans les trente jours et seconde délibération ; référendum ; ordonnances sur habilitation ; commission mixte paritaire et dernier mot donné à l\'Assemblée nationale', '74, 75, 106, 107, 110'],
    ['**Défense et diplomatie**', 'Chef suprême des Armées ; il accrédite les ambassadeurs ; il négocie et ratifie les traités', '68, 69, 119'],
    ['**Crise**', 'Pouvoirs exceptionnels en cas de menace grave et immédiate et d\'interruption du fonctionnement régulier des pouvoirs publics', '73'],
    ['**Justice**', 'Droit de grâce', '66'],
    ['**Nominations**', 'Un tiers des sénateurs ; le président et des conseillers du Conseil constitutionnel ; les présidents de la Cour de cassation, du Conseil d\'État et de la Cour des comptes', '87, 128-130, 150, 153'],
    ['**Contrôle de constitutionnalité**', 'Il peut saisir le Conseil constitutionnel', '113, 122, 134'],
  ] } },
];
C.push({ id: 'c7', title: 'Corrigé du sujet 7 · Le régime présidentiel ivoirien ; questions de droit constitutionnel 2', body: [
  { h: 'Sujet 1 · Dissertation : le régime présidentiel ivoirien' },
  { p: '**Introduction.** Le régime présidentiel, dont les États-Unis sont le modèle, repose sur une **séparation stricte** des pouvoirs : un président élu par le peuple, chef de l\'exécutif ; un Parlement qui ne peut renverser le gouvernement ; un président qui ne peut dissoudre le Parlement. La Côte d\'Ivoire s\'en réclame depuis la Constitution du 3 novembre 1960 ; la Constitution du 8 novembre 2016, révisée en 2020 et en 2023, le confirme. *Problématique* : le régime ivoirien est-il un régime présidentiel au sens classique, ou un régime où le Président domine les autres pouvoirs ?' },
  { ul: [
    '**I. Les traits d\'un régime présidentiel.** A. *Un Président à la légitimité propre* : élu au suffrage universel direct (article 55), « détenteur exclusif du pouvoir exécutif » (article 63) ; le Gouvernement met en œuvre sa politique et répond devant lui seul (articles 81 et 83). B. *Une séparation organique des pouvoirs* : le Parlement ne peut renverser le Gouvernement (pas de motion de censure, pas de question de confiance) et le Président ne peut dissoudre l\'Assemblée nationale ; les fonctions ministérielles sont incompatibles avec le mandat parlementaire (article 84).',
    '**II. Un régime dominé par le Président (présidentialisme).** A. *Des pouvoirs qui débordent l\'exécutif* : initiative et amendement des lois, seconde délibération, référendum, ordonnances, commission mixte paritaire et dernier mot donné à l\'Assemblée nationale à sa demande (articles 74, 75, 106, 107, 110) ; pouvoirs exceptionnels (article 73) ; nominations au Sénat (un tiers), au Conseil constitutionnel et à la tête des hautes juridictions. B. *Des contrepoids limités* : questions orales et écrites, commissions d\'enquête (article 117), vote du budget, contrôle du Conseil constitutionnel, mise en accusation devant la Haute Cour de justice pour haute trahison, à la majorité des deux tiers (articles 157 et 161).',
  ] },
  { p: '**Conclusion** : le régime ivoirien emprunte au régime présidentiel l\'indépendance des pouvoirs, mais il concentre l\'essentiel de l\'impulsion politique entre les mains du Président : la doctrine le qualifie de régime **présidentialiste**.' },
  { h: 'Sujet 2 · Questions' },
  { p: '**1. La procédure d\'adoption de la Constitution de 1960**' },
  { p: 'Devenue indépendante le **7 août 1960**, la Côte d\'Ivoire remplace la Constitution du 26 mars 1959 (loi n° 59-1), adoptée lorsqu\'elle était un État autonome de la Communauté française. Le projet, préparé par le Gouvernement du président Félix Houphouët-Boigny et inspiré de la Constitution française de 1958, est soumis à l\'**Assemblée nationale**, l\'assemblée élue en 1959, qui l\'adopte le **31 octobre 1960**, sans référendum : c\'est une procédure **parlementaire**, l\'assemblée agissant comme pouvoir constituant. Le texte est promulgué par la **loi n° 60-356 du 3 novembre 1960** portant Constitution de la République de Côte d\'Ivoire. Il institue un régime présidentiel : le Président est élu au suffrage universel direct pour cinq ans, les ministres sont responsables devant lui seul, et il n\'existe ni responsabilité du Gouvernement devant l\'Assemblée ni droit de dissolution.' },
  { p: '**2. Locke et Montesquieu : deux théories de la séparation des pouvoirs**' },
  { table: { h: ['', 'John Locke', 'Montesquieu'], r: [
    ['**Œuvre**', '*Deuxième traité du gouvernement civil* (1690)', '*De l\'esprit des lois* (1748), livre XI, chapitre 6'],
    ['**Les pouvoirs**', 'Le **législatif**, l\'**exécutif** (exécution des lois à l\'intérieur) et le **fédératif** (guerre, paix, alliances, relations extérieures)', 'La puissance **législative**, la puissance **exécutrice** de l\'État et la puissance **de juger**'],
    ['**La justice**', 'Pas de pouvoir judiciaire distinct : juger relève du législatif et de l\'exécutif', 'La puissance de juger est séparée des deux autres ; elle est « en quelque façon nulle » : le juge est « la bouche qui prononce les paroles de la loi »'],
    ['**Les rapports**', 'Le législatif est le **pouvoir suprême**, mais limité par sa fin (protéger la vie, la liberté et les biens) ; l\'exécutif et le fédératif sont confiés aux mêmes mains ; le peuple garde le droit de résister', 'Un **équilibre** : « il faut que, par la disposition des choses, le pouvoir arrête le pouvoir » ; chaque pouvoir a la faculté de statuer et la faculté d\'empêcher ; le législatif est divisé en deux chambres'],
    ['**Le but**', 'Éviter que ceux qui font les lois soient aussi ceux qui les exécutent', 'Garantir la **liberté politique** contre l\'abus de pouvoir'],
  ] } },
  { p: '**3. Les pouvoirs du Président de la République de Côte d\'Ivoire**' },
  ...PR_POUVOIRS,
  { p: '**4. Les caractéristiques du régime parlementaire britannique**' },
  { ul: [
    '**Une Constitution en grande partie coutumière**, faite de conventions, de lois et de jurisprudence.',
    '**Un exécutif bicéphale** : le monarque, chef de l\'État irresponsable (« le roi ne peut mal faire »), dont les actes sont contresignés ; le **Premier ministre** et le **Cabinet**, qui gouvernent.',
    '**Un Parlement bicaméral inégal** : la Chambre des communes, élue au scrutin majoritaire uninominal à un tour, et la Chambre des lords, non élue, aux pouvoirs réduits.',
    '**Une collaboration des pouvoirs et leurs moyens d\'action réciproques** : le Gouvernement est responsable devant la Chambre des communes, qui peut le renverser par une motion de défiance ; en retour, le Premier ministre peut obtenir du monarque la dissolution de la Chambre.',
    '**Le bipartisme** et le scrutin majoritaire donnent au parti vainqueur une majorité stable : son chef devient Premier ministre ; l\'opposition officielle forme un « cabinet fantôme ».',
  ] },
  { p: '**5. Définitions**' },
  { table: { h: ['Terme', 'Définition'], r: [
    ['**La motion de censure**', 'Texte par lequel des députés mettent en cause la responsabilité politique du Gouvernement ; si elle est adoptée, le Gouvernement doit démissionner. Elle est propre au régime parlementaire ; la Constitution ivoirienne ne la connaît pas.'],
    ['**La question de confiance**', 'Procédure par laquelle le Gouvernement engage lui-même sa responsabilité devant l\'assemblée, sur son programme, une déclaration de politique générale ou un texte ; si l\'assemblée lui refuse la confiance, il démissionne. Elle n\'existe pas non plus en Côte d\'Ivoire, où le Gouvernement n\'est responsable que devant le Président (article 83).'],
    ['**La majorité discordante**', 'Situation, propre aux régimes où le chef de l\'État et l\'assemblée sont élus séparément, dans laquelle la majorité parlementaire est politiquement opposée au chef de l\'État ; en régime semi-présidentiel, elle conduit à la **cohabitation** (France, 1986, 1993 et 1997).'],
    ['**Le vote bloqué**', 'En procédure parlementaire, technique par laquelle le Gouvernement demande à l\'assemblée de se prononcer **par un seul vote** sur tout ou partie d\'un texte, en ne retenant que les amendements qu\'il a proposés ou acceptés (article 44, alinéa 3, de la Constitution française de 1958). La Constitution ivoirienne en connaît une forme voisine : sur le texte de la commission mixte paritaire, « aucun amendement n\'est recevable, sauf accord du Président de la République » (article 110). En droit électoral, l\'expression désigne aussi le vote pour une liste entière, sans pouvoir la modifier.'],
  ] } },
] });

// ---------------------------------------------------------------- 8
C.push({ id: 'c8', title: 'Corrigé du sujet 8 · Responsabilité du gouvernement, Parlement ivoirien, Premier ministre britannique', body: [
  { h: 'Sujet 1' },
  { p: '**1. La responsabilité politique du gouvernement devant le Parlement en régime parlementaire**' },
  { p: 'C\'est l\'obligation pour le Gouvernement de **quitter le pouvoir** lorsqu\'il perd la confiance de l\'assemblée élue. Elle est **collective** (le Gouvernement est solidaire) et **politique** (elle sanctionne une politique, non une faute pénale). Elle se met en jeu de deux façons : à l\'initiative des députés, par la **motion de censure** ; à l\'initiative du Gouvernement, par la **question de confiance**. Elle est le cœur du régime parlementaire et a pour contrepartie le **droit de dissolution** de l\'exécutif. Les constitutions modernes la « rationalisent » (majorités renforcées, délais) pour éviter l\'instabilité gouvernementale.' },
  { box: 'En Côte d\'Ivoire, cette responsabilité n\'existe pas : « Le Premier ministre et les ministres sont solidairement responsables devant le Président de la République » (article 83). Le Parlement contrôle le Gouvernement (questions, commissions d\'enquête, article 117) sans pouvoir le renverser.', title: 'Et en Côte d\'Ivoire ?', kind: 'cle' },
  { p: '**2. Les pouvoirs du Président de la République de Côte d\'Ivoire**' },
  { p: 'Voir la question 3 du corrigé du sujet 7.' },
  { p: '**3. La désignation des sénateurs**' },
  { p: 'Le Sénat représente les collectivités territoriales et les Ivoiriens établis hors de Côte d\'Ivoire. Ses membres sont désignés de **deux façons** (article 87) : **deux tiers** sont **élus au suffrage universel indirect** et **un tiers** est **désigné par le Président de la République** parmi les anciens présidents d\'institution, les anciens Premiers ministres et les personnalités et compétences nationales, y compris des Ivoiriens de l\'extérieur et des membres de l\'opposition politique. Le mandat est de cinq ans. Les élus le sont par les « grands électeurs », conseillers régionaux et municipaux, dans chaque région et dans les districts autonomes ; une loi organique fixe le nombre de sénateurs et les modalités du scrutin (article 90). Le Sénat compte aujourd\'hui 99 sièges : 66 élus et 33 nommés.' },
  { p: '**4. Définitions**' },
  { table: { h: ['Terme', 'Définition'], r: [
    ['**Le CNSP**', 'Le **Comité national de salut public**, organe militaire qui a exercé le pouvoir après le coup d\'État du **24 décembre 1999**, sous la présidence du général Robert Guéï : il a suspendu les institutions de la Constitution de 1960 (Assemblée nationale, Gouvernement, Conseil constitutionnel, Cour suprême) et conduit une transition qui a abouti à la Constitution adoptée par référendum le **23 juillet 2000** (loi n° 2000-513 du 1er août 2000), puis à l\'élection présidentielle d\'octobre 2000.'],
    ['**La question de confiance**', 'Voir le corrigé du sujet 7, question 5.'],
    ['**Les institutions politiques**', 'Les organes qui exercent le pouvoir politique dans l\'État (le Président de la République, le Gouvernement, le Parlement) et les règles qui organisent leur désignation, leurs compétences et leurs rapports. Leur étude forme, avec le droit constitutionnel, le cœur du cours.'],
    ['**Le vote bloqué**', 'Voir le corrigé du sujet 7, question 5.'],
  ] } },
  { h: 'Sujet 2' },
  { p: '**1. La procédure d\'adoption de la Constitution de 1960** : voir le corrigé du sujet 7, question 1.' },
  { p: '**2. La composition et les pouvoirs du Parlement ivoirien**' },
  { ul: [
    '**Composition** : « Le Parlement est composé de l\'Assemblée nationale et du Sénat » (article 85). Les **députés** sont élus au suffrage universel direct pour cinq ans (article 86) ; les **sénateurs** sont élus pour deux tiers au suffrage universel indirect et nommés pour un tiers par le Président de la République, pour cinq ans (article 87). Les deux chambres se réunissent en **Congrès**, présidé par le Président de l\'Assemblée nationale (article 98).',
    '**Pouvoir législatif** : « Le Parlement vote la loi et consent l\'impôt » (article 93), dans le domaine fixé par l\'article 101 ; il vote la loi de finances (articles 111 et 112) ; il habilite le Président à prendre des ordonnances (article 106) ; il autorise la ratification des principaux traités (article 120) ; réuni en Congrès, il participe à la révision de la Constitution.',
    '**Pouvoir de contrôle** : questions orales et écrites, commissions d\'enquête, résolutions (article 117) ; loi de règlement, avec l\'assistance de la Cour des comptes (article 118) ; autorisation de la déclaration de guerre (article 104) et de la prorogation de l\'état de siège (article 105) ; mise en accusation devant la Haute Cour de justice (article 161).',
    '**Limite** : il ne peut pas renverser le Gouvernement, et la loi ordinaire peut être adoptée en dernier lieu par l\'Assemblée nationale seule à la demande du Président (article 110).',
  ] },
  { p: '**3. Les pouvoirs du Premier ministre britannique**' },
  { ul: [
    '**Le chef de la majorité** : il est le chef du parti qui a remporté les élections à la Chambre des communes ; le monarque le nomme par convention.',
    '**Le chef du Gouvernement** : il choisit les ministres et compose le Cabinet (le monarque les nomme sur son avis), les révoque, arbitre entre eux et dirige la politique de l\'État ; il exerce, au nom du monarque, la plupart des prérogatives royales (nominations, diplomatie, défense).',
    '**La maîtrise du travail parlementaire** : grâce à sa majorité disciplinée, il fait adopter les projets du Gouvernement.',
    '**La dissolution** : il peut demander au monarque de dissoudre la Chambre des communes et choisir ainsi la date des élections (pouvoir rétabli par la loi de 2022 sur la dissolution et la convocation du Parlement, après la parenthèse de la loi de 2011 sur les législatures à durée fixe).',
    '**Sa limite** : il reste responsable devant la Chambre des communes, qui peut le renverser par un vote de défiance, et dépend de la confiance de son propre parti.',
  ] },
  { p: '**4. Définitions**' },
  { table: { h: ['Terme', 'Définition'], r: [
    ['**La vacance du pouvoir**', 'Situation dans laquelle la fonction de Président de la République n\'est plus occupée, par **décès**, **démission** ou **empêchement absolu**. En Côte d\'Ivoire, le **vice-Président** devient alors Président de la République et achève le mandat ; l\'empêchement absolu est constaté par le Conseil constitutionnel, saisi par le Gouvernement à la majorité de ses membres ; si la vice-présidence est elle aussi vacante, le **Premier ministre** exerce les fonctions de Président (article 62).'],
    ['**La question de confiance**', 'Voir le corrigé du sujet 7, question 5.'],
    ['**Le régime mixte**', 'Régime qui combine des traits du régime présidentiel et du régime parlementaire : un chef de l\'État élu au suffrage universel direct, doté de pouvoirs propres, et un Gouvernement responsable devant le Parlement. On parle aussi de régime **semi-présidentiel** (France depuis 1962).'],
    ['**Le vote bloqué**', 'Voir le corrigé du sujet 7, question 5.'],
  ] } },
] });

module.exports = { C };
