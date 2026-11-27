// Annales des examens de Licence 1 : les sujets, classés par matière (doublons regroupés).
// Sujets réellement posés de 2021-2022 à 2024-2025, transcrits sans nom d'enseignant ni d'étudiant,
// orthographe corrigée ; les personnages des cas pratiques reçoivent des noms d'emprunt.
// Les décisions de justice sont reproduites (elles ne sont pas protégées) ; l'extrait de manuel du sujet 10
// est seulement résumé, avec sa référence.

const VF = (rows, start = 1) => ({ table: { h: ['N°', 'Affirmation', 'Vrai', 'Faux'], r: rows.map((t, i) => [String(start + i), t, '', '']) } });
const S = [];

// ---------------------------------------------------------------- INTRODUCTION AU DROIT
S.push({ id: 's1', title: 'Sujet 1 · Composition du premier semestre (session 1, 2025)', body: [
  { p: '*Introduction générale à l\'étude du droit · Durée : 1 h 30.*' },
  { p: '**Consigne** : répondez au questionnaire en numérotant chaque réponse. L\'orthographe, la grammaire et la conjugaison sont prises en compte.' },
  { ol: [
    'Distinguez, tout en les définissant, les sources de la règle de droit. (2 points)',
    'Quelle distinction faites-vous entre les sources directes et les sources indirectes de la règle de droit ? (1 point)',
    'En quoi consiste la hiérarchie des normes ? Mettez-la en rapport avec la hiérarchie entre la loi et le règlement, entre la loi et la Constitution, entre la Constitution et le traité ou accord international. (4 points)',
    'Définissez la loi, puis le droit. (3 points)',
    'Donnez, en les énumérant, la classification des droits subjectifs. (2 points)',
    'Comment peut-on définir le droit de propriété ? (2 points)',
    'Déterminez les démembrements du droit de propriété. (2 points)',
    'Qu\'est-ce qui distingue classiquement les droits patrimoniaux des droits extrapatrimoniaux ? (2 points)',
    'Expliquez les éléments constitutifs de la coutume en droit. (2 points)',
    'Quel est l\'élément déterminant dans la formation de la coutume ? Justifiez votre réponse. (2 points)',
  ] },
] });

// ---------------------------------------------------------------- DROIT CIVIL : LES PERSONNES
S.push({ id: 's2', title: 'Sujet 2 · Évaluation formative 1 de travaux dirigés (janvier 2025)', body: [
  { p: '*Droit civil, droit des personnes · Durée : 20 minutes · Noté sur 20.*' },
  { h: 'Exercice 1' },
  { p: '**1.** Répondez par vrai ou faux (0,5 point par bonne réponse).' },
  VF([
    'Les droits extrapatrimoniaux sont des droits évaluables en argent.',
    'Les droits réels sont des droits qui ne portent pas sur une chose, un bien.',
    'Les droits réels accessoires n\'ont pas pour objet de garantir une créance.',
    'Les droits personnels sont des droits que l\'on exerce directement sur une chose.',
  ]),
  { p: '**2.** Rangez les droits patrimoniaux suivants dans la colonne qui convient, droits réels principaux ou droits réels accessoires (0,5 point par bonne réponse) : l\'usufruit, le gage, l\'hypothèque, le droit de propriété, le nantissement, la nue-propriété.' },
  { p: '**3.** Rangez les droits extrapatrimoniaux suivants dans la colonne qui convient, droits de l\'homme ou droits privés de la personnalité (0,5 point par bonne réponse) : le droit au respect de la vie privée ; le droit à la vie ; le droit à l\'intégrité physique ; le droit à l\'éducation ; le droit à la santé ; le droit à l\'honneur ; la liberté d\'expression ; la liberté d\'aller et venir ; le droit à l\'image ; la liberté religieuse.' },
  { h: 'Exercice 2' },
  { p: 'Répondez par vrai ou faux (1 point par bonne réponse).' },
  VF([
    'La personnalité juridique de l\'individu est l\'aptitude d\'une chose à être sujet de droit.',
    'Il existe trois cas d\'incertitude sur l\'existence juridique de la personne physique.',
    'La disparition est la situation juridique d\'une personne qui a cessé de paraître depuis un moment et dont on ignore si elle est encore en vie.',
    'Certains droits du défunt survivent ou subsistent malgré sa mort.',
    'L\'absence est la situation juridique d\'une personne qui a cessé de paraître dans des circonstances qui tendent à mettre sa vie en danger.',
    'Le jugement déclaratif de décès du disparu ne peut s\'obtenir qu\'après l\'écoulement d\'une période de dix ans.',
    'L\'absence judiciairement déclarée est une cause de dissolution du mariage.',
    'Tout comme l\'absence, la disparition est une cause d\'ouverture de la succession du disparu.',
    'Au retour de l\'absent ou du disparu, le jugement déclaratif de décès ne peut pas être annulé.',
    'Le retour de l\'absent ou du disparu entraîne l\'annulation du nouveau mariage contracté par son conjoint.',
  ]),
] });

S.push({ id: 's3', title: 'Sujet 3 · Évaluation formative 2 de travaux dirigés (janvier 2025)', body: [
  { p: '*Droit civil, droit des personnes · Durée : 20 minutes · Noté sur 20.*' },
  { h: 'Exercice 1 · Le nom' },
  { p: 'Répondez par vrai ou faux (1 point par bonne réponse).' },
  VF([
    'Le nom est un droit extrapatrimonial.',
    'Le nom est une appellation ou un ensemble de mots servant à désigner une chose dans la société.',
    'Le nom est exclusivement composé du nom patronymique et du ou des prénoms.',
    'Appelé nom de famille, le nom patronymique est l\'appellation portée par les personnes unies par un lien de parenté.',
    'Le nom de famille est attribué en tenant compte de la filiation et du lien du mariage.',
    'Le ou les prénoms sont une appellation qui sert à individualiser une personne parmi celles qui sont issues de la même lignée.',
    'Le nom patronymique peut subir des changements ou des modifications en cas d\'adoption et de mariage.',
    'Lorsque le nom est rattaché à un fonds de commerce ou à une entreprise, il peut faire l\'objet d\'une cession.',
    'Le nom de l\'enfant abandonné ou trouvé est attribué par décision de l\'autorité administrative.',
    'La fraude sur le nom et l\'usurpation du nom d\'autrui ne sont pas passibles de sanctions.',
  ]),
  { h: 'Exercice 2 · Le domicile' },
  { p: '**1.** Répondez par vrai ou faux (1 point par bonne réponse).' },
  VF([
    'Le domicile d\'un individu est le lieu de son principal établissement, le lieu où la loi le localise, le lieu dans lequel il a ses principaux intérêts.',
    'La résidence est le lieu d\'un séjour bref et occasionnel, tandis que l\'habitation est le lieu où la personne vit de façon normale.',
    'Le domicile est facultatif, unique et inviolable.',
  ]),
  { p: '**2.** Reliez chaque type de domicile à sa description (1 point par bonne réponse).' },
  { table: { h: ['Type de domicile', 'Description'], r: [
    ['Le domicile volontaire', 'C\'est le lieu choisi par les parties à un acte juridique pour l\'exécution de cet acte.'],
    ['Le domicile légal', 'C\'est le lieu où la personne a choisi d\'avoir son principal établissement. Sa détermination suppose la réunion d\'un élément matériel et d\'un élément intentionnel.'],
    ['Le domicile élu', 'C\'est le domicile imposé par la loi à une personne. Il peut être de fonction ou de dépendance.'],
  ] } },
  { p: '**3.** M. Tiémoko est domicilié à Yopougon. Il vit souvent chez sa mère, à Cocody. Il désire se marier, mais souhaite d\'abord rembourser les deux millions de francs CFA qu\'il doit à M. Yao, qui habite au Plateau (1 point par question).' },
  { ol: [
    'Quel sera le lieu de célébration du mariage de M. Tiémoko ?',
    'Dans quelle commune se fera le remboursement de sa dette ?',
    'En cas de litige sur le remboursement, la juridiction de quelle commune sera saisie pour connaître de l\'affaire ?',
    'En cas de décès de M. Tiémoko, la juridiction de quelle commune sera saisie pour l\'ouverture de sa succession ?',
  ] },
] });

// ---------------------------------------------------------------- ORGANISATION JUDICIAIRE
const OJ_VF = [
  'Le principe de séparation des pouvoirs autorise les juges à édicter les lois qu\'ils prennent pour trancher les litiges.',
  'Les sections des tribunaux de première instance sont des juridictions de premier degré.',
  'Une juridiction de droit commun est une juridiction compétente en toute matière, sauf pour les matières qui sont confiées par des textes à une juridiction spéciale.',
  'Le tribunal criminel est une juridiction d\'exception compétente en matière de crime.',
  'Le tribunal de commerce est une juridiction d\'exception de premier degré.',
  'Le tribunal compétent en matière immobilière est le tribunal de première instance.',
  'La cour d\'appel est une juridiction de second degré compétente pour connaître des affaires jugées en premier ressort par les juridictions du premier degré.',
  'Le tribunal du travail se compose exclusivement de magistrats professionnels.',
  'Le Conseil d\'État est la juridiction compétente pour connaître des recours contre les décisions des autorités administratives.',
  'Les décisions rendues en premier et dernier ressort par les juridictions du premier degré ne peuvent pas faire l\'objet d\'appel.',
  'La gratuité de la justice n\'exclut pas le paiement des honoraires des avocats.',
  'Les juges consulaires sont des magistrats professionnels qui siègent au tribunal de commerce.',
  'La Cour de cassation est compétente pour connaître des pourvois en cassation formés contre les décisions rendues en dernier ressort par les juridictions de l\'ordre judiciaire.',
  'La Cour de cassation est compétente pour connaître des recours en excès de pouvoir contre les décisions administratives.',
  'Le Conseil constitutionnel se prononce sur la régularité des élections régionales.',
  'Le Conseil d\'État se prononce sur la régularité des élections municipales.',
  'Le tribunal du travail se compose de magistrats professionnels et d\'assesseurs représentant les employeurs et les travailleurs.',
  'Le tribunal de commerce se compose exclusivement de magistrats professionnels.',
  'Les décisions rendues par le tribunal criminel peuvent faire l\'objet d\'appel devant le Conseil d\'État.',
  'La Cour de cassation est un troisième degré de juridiction.',
];
S.push({ id: 's4', title: 'Sujet 4 · Évaluation 1 (année 2024-2025)', body: [
  { p: '*Organisation judiciaire.*' },
  { p: 'Répondez par vrai ou faux.' },
  VF(OJ_VF),
] });

S.push({ id: 's5', title: 'Sujet 5 · Épreuve de fin de semestre (année 2024-2025)', body: [
  { p: '*Organisation judiciaire · Durée : 1 h · Traiter les deux sujets.*' },
  { h: 'Sujet n° 1 · Répondez par vrai ou faux' },
  { p: 'Les dix affirmations de ce sujet sont **les dix premières affirmations du sujet 4**, posées dans le même ordre : traitez-les dans le tableau ci-dessus, puis voyez le corrigé du sujet 4.' },
  { h: 'Sujet n° 2 · Questionnaire' },
  { ol: [
    'Quelle est la différence entre un magistrat du siège et un magistrat du parquet ?',
    'Quelles sont les attributions de la Haute Cour de justice ?',
    'Définissez les termes suivants : minute, expédition et grosse.',
    'Définissez le principe d\'égalité.',
    'Citez deux obligations qui pèsent sur le magistrat.',
  ] },
] });

// ---------------------------------------------------------------- DROIT CONSTITUTIONNEL
S.push({ id: 's6', title: 'Sujet 6 · Examen de Droit constitutionnel 1', body: [
  { p: '*Durée : 3 h · Traitez l\'un des deux sujets.*' },
  { h: 'Sujet 1 · Cas pratique' },
  { p: 'Le 15 décembre 2022, une loi interdisant les associations estudiantines à caractère syndical a été adoptée. Avant sa promulgation, « le Collectif des révoltés », une association non déclarée de défense des étudiants, a saisi le 16 décembre 2022 le juge constitutionnel en vue de l\'annulation de cette loi.' },
  { p: 'Le 17 décembre 2022, les députés du groupe parlementaire « Les Justiciers » déposent ensemble une requête devant le juge constitutionnel pour contester la constitutionnalité de la même loi.' },
  { p: 'Le 31 décembre 2022, lors d\'une manifestation contre cette loi, des membres locaux du Collectif des révoltés blessent un enseignant au front. Furieux, celui-ci assigne les dirigeants du Collectif devant la section de tribunal de Babi. Au cours du procès, le Collectif soulève l\'inconstitutionnalité de la loi interdisant les associations, qui est au cœur des débats devant le juge.' },
  { p: 'Vous êtes consulté pour analyser les chances des différents demandeurs d\'obtenir gain de cause. La Constitution ivoirienne de 2016 révisée est applicable en l\'espèce.' },
  { h: 'Sujet 2 · Dissertation' },
  { p: '**Les éléments constitutifs de l\'État.**' },
] });

S.push({ id: 's7', title: 'Sujet 7 · Droit constitutionnel 2, examen final (session 1)', body: [
  { p: '*Durée : 2 h · Traitez l\'un des deux sujets.*' },
  { h: 'Sujet 1 · Dissertation' },
  { p: '**Le régime présidentiel ivoirien.**' },
  { h: 'Sujet 2 · Questions' },
  { ol: [
    'Expliquez la procédure d\'adoption de la Constitution ivoirienne de 1960.',
    'Expliquez de façon exhaustive la différence entre la théorie de la séparation des pouvoirs de John Locke et celle de Montesquieu.',
    'Quels sont les pouvoirs du Président de la République de Côte d\'Ivoire ?',
    'Quelles sont les caractéristiques du régime parlementaire britannique ?',
    'Donnez le sens ou la définition des termes suivants : la motion de censure ; la question de confiance ; la majorité discordante ; le vote bloqué.',
  ] },
] });

S.push({ id: 's8', title: 'Sujet 8 · Droit constitutionnel 2, examen final (session 2)', body: [
  { p: '*Durée : 2 h · Traitez l\'un des deux sujets.*' },
  { h: 'Sujet 1 · Questions' },
  { ol: [
    'Expliquez la responsabilité politique du gouvernement devant le Parlement dans un régime parlementaire.',
    'Quels sont les pouvoirs du Président de la République de Côte d\'Ivoire ?',
    'Expliquez le mode de désignation des sénateurs en Côte d\'Ivoire.',
    'Donnez le sens ou la définition des termes suivants : le CNSP ; la question de confiance ; les institutions politiques ; le vote bloqué.',
  ] },
  { h: 'Sujet 2 · Questions' },
  { ol: [
    'Expliquez la procédure d\'adoption de la Constitution ivoirienne de 1960.',
    'Quels sont la composition et les pouvoirs du Parlement ivoirien ?',
    'Quels sont les pouvoirs du Premier ministre britannique ?',
    'Donnez le sens ou la définition des termes suivants : la vacance du pouvoir ; la question de confiance ; le régime mixte ; le vote bloqué.',
  ] },
] });

// ---------------------------------------------------------------- MÉTHODOLOGIE
const ARRET_1969 = [
  { p: '**Cour de cassation, première chambre civile, 2 décembre 1969**' },
  { p: '*Sur le premier moyen* : Attendu qu\'il résulte des énonciations de l\'arrêt attaqué (Paris, 7 mars 1968) que dame Jean Jacques fut blessée au moment où elle montait dans un taxi de la société des Autoplaces, qui s\'était mis en mouvement, entraîné par la déclivité du sol, son chauffeur ayant desserré le frein à main ;' },
  { p: 'Attendu qu\'il est fait grief à la cour d\'appel d\'avoir retenu l\'entière responsabilité de la société Autoplaces, au motif qu\'il s\'était formé un contrat de transport dès que le voyageur avait manifesté son intention de prendre le taxi en ouvrant la portière, alors que le contrat de transport, de caractère consensuel, impliquerait l\'accord du transporteur ; que, nonobstant les règles de police qui obligent le chauffeur de taxi à charger, ce dernier, sur le terrain civil, serait libre de refuser un client ; que l\'ouverture de la portière par un voyageur éventuel ne suffirait donc pas à caractériser la conclusion du contrat dès lors qu\'il n\'est pas constaté que le chauffeur avait eu conscience de cette ouverture et y avait acquiescé ;' },
  { p: 'Mais attendu que la formation du contrat de transport résulte de l\'offre du transporteur et de l\'acceptation du voyageur ; que les juges d\'appel, qui apprécient souverainement la volonté des parties de conclure une convention, relèvent, d\'une part, que le simple fait de laisser une voiture de place en stationnement dans un emplacement réservé, gaine du compteur non mise et chauffeur au volant, constitue une offre, d\'autre part, que dame Jean Jacques avait manifesté son intention de prendre place dans le taxi en ouvrant la portière, geste non équivoque ; qu\'ainsi, le premier moyen doit être écarté ;' },
  { p: '*Sur les deuxième et troisième moyens* : Attendu qu\'il est encore reproché à l\'arrêt attaqué d\'avoir exonéré la victime de toute faute et retenu l\'entière responsabilité du transporteur, alors que les juges d\'appel n\'auraient constaté ni que la victime eût avisé le conducteur de son intention de pénétrer dans son véhicule, ni que ce dernier eût connaissance de cette intention, et que dame Jean Jacques, dont ils relatent qu\'elle était âgée et corpulente, aurait manqué à son devoir de veiller à sa propre sécurité, tandis que le chauffeur, en laissant son véhicule descendre « doucement », ainsi qu\'ils le relèvent, sur une voie en pente, n\'aurait commis aucune faute ;' },
  { p: 'Mais attendu que la cour d\'appel, qui a, contrairement aux dires du pourvoi, constaté l\'accord de volonté des parties, a justement décidé que, dès le moment où dame Jean Jacques avait commencé à monter dans la voiture, l\'obligation de sécurité pesait sur le transporteur, et a pu estimer qu\'en l\'espèce il ne pouvait être reproché à la victime nulle faute de nature à exonérer le débiteur de cette obligation ; que les deuxième et troisième moyens ne sauraient donc être accueillis ;' },
  { p: 'Par ces motifs : rejette.' },
];
S.push({ id: 's9', title: 'Sujet 9 · Composition de méthodologie (deux examens au choix)', body: [
  { p: '*Méthodologie juridique · Chaque examen dure 2 h · Traitez l\'un des deux examens.*' },
  { h: 'Examen 1 · Commentaire d\'arrêt' },
  { p: 'Rédigez l\'**introduction intégrale** du commentaire de cet arrêt, en dégageant le **plan intégral**.' },
  ...ARRET_1969,
  { box: 'Le même arrêt a servi de support aux travaux dirigés de méthodologie (année 2022-2023), pour apprendre à distinguer, dans une décision, l\'**exposé des motifs** (les « attendus ») et le **dispositif** (« Par ces motifs : rejette »). C\'est l\'arrêt qui revient le plus souvent.', title: 'Sujet qui revient', kind: 'cle' },
  { h: 'Examen 2 · Commentaire d\'arrêt (fiche d\'arrêt)' },
  { p: 'Faites la fiche d\'arrêt de la décision suivante.' },
  { p: '**Cour de cassation, première chambre civile, 10 décembre 1985** (*Bulletin* I, 1985, n° 339)' },
  { p: '*Sur le moyen unique* : Vu le principe selon lequel l\'enfant conçu est réputé né chaque fois qu\'il y va de son intérêt ;' },
  { p: 'Attendu que Bernard Segers, au service de la société Comex, avait adhéré, le 20 août 1979, à une police d\'assurance-groupe souscrite par son employeur pour son personnel auprès de la Compagnie européenne d\'assurance sur la vie (Euravie), laquelle garantissait, en cas de décès, le paiement d\'un capital d\'un montant de 200 % du salaire de base, majoré de 30 % par enfant à charge vivant au foyer de l\'assuré ; que Bernard Segers, déjà père de trois enfants, dont deux issus d\'un premier mariage, a désigné comme bénéficiaire de l\'assurance-groupe sa seconde épouse, Brigitte Segers, née Bonneau, et, à défaut, ses enfants ; qu\'il est décédé le 1er mars 1980 ; que Mme Segers a mis au monde deux jumeaux le 24 mai 1980 ; que la compagnie Euravie lui a réglé la somme de 522 300 francs mais a refusé de tenir compte des deux enfants, qui n\'étaient pas nés au moment de la réalisation du risque ; que Mme Segers a, le 30 juillet 1981, assigné cet assureur en paiement de la somme complémentaire de 108 062 francs ;' },
  { p: 'Attendu que l\'arrêt attaqué a rejeté sa demande, aux motifs essentiels que la seule bénéficiaire contractuellement désignée de l\'assurance décès était Mme Segers, que la clause de la police était « envisagée comme une notion de seul fait » et que les enfants simplement conçus dont il s\'agit « ne vivaient pas au foyer de l\'assuré » ;' },
  { p: 'Attendu cependant que, si les conditions d\'application du contrat d\'assurance décès doivent être appréciées au moment de la réalisation du risque, la détermination des enfants à charge vivant au foyer doit être faite en se conformant aux principes généraux du droit, spécialement à celui d\'après lequel l\'enfant conçu est réputé né chaque fois qu\'il y va de son intérêt, étant observé que la majoration du capital-décès, lorsqu\'il existe des enfants à charge, est destinée à faciliter l\'entretien de ces enfants ;' },
  { p: 'Qu\'en statuant comme elle l\'a fait, en écartant, pour le calcul de la majoration du capital-décès, les enfants simplement conçus et qui, en l\'espèce, sont nés viables, la cour d\'appel a violé la règle et le texte susvisés ;' },
  { p: '*Par ces motifs* : casse et annule l\'arrêt rendu le 24 mai 1984, entre les parties, par la cour d\'appel de Paris ; remet, en conséquence, la cause et les parties dans l\'état où elles se trouvaient avant ledit arrêt et, pour être fait droit, les renvoie devant la cour d\'appel de Versailles.' },
] });

S.push({ id: 's10', title: 'Sujet 10 · Composition du second semestre (session 1, 2024-2025)', body: [
  { p: '*Méthodologie des exercices juridiques · Durée : 2 h.*' },
  { h: 'Examen 1 · Commentaire de texte' },
  { p: '**Le texte.** Un extrait de manuel : Sophie Druffin-Bricca et Laurence-Caroline Henry, *Introduction générale au droit*, 4e édition, Lextenso, Paris, 2009, page 82. En deux paragraphes, les auteurs expliquent que le mot « loi » a deux sens. **Au sens formel**, la loi est la disposition qui émane de l\'organe de l\'État investi du pouvoir législatif par la Constitution, adoptée selon les formes qu\'elle prévoit : en France, celle qui émane du Parlement. **Au sens matériel**, beaucoup plus large, la loi désigne toutes les règles de droit qui émanent de l\'État et que formule un organe compétent dans l\'exercice du pouvoir législatif ou exécutif : la loi formelle est aussi une loi matérielle, mais les textes administratifs de portée générale, ou réglementaires, pris par le pouvoir exécutif le sont également.' },
  { p: '**I. Questionnaire**' },
  { ol: [
    'Quelle est la nature de ce texte ? Justifiez votre réponse.',
    'Quels sont les éléments d\'un paratexte ? Déterminez-les en vous référant à cet extrait.',
    'Quels sont les différents types de textes qui peuvent faire l\'objet d\'un commentaire de texte en droit ?',
    'Quelle distinction faites-vous entre le thème et l\'idée générale ? Dégagez ces deux éléments en vous référant au texte.',
    'L\'introduction d\'un commentaire de texte en droit comporte-t-elle un problème ? Justifiez votre réponse.',
  ] },
] });

S.push({ id: 's11', title: 'Sujet 11 · Composition du second semestre (session 2, 2024-2025)', body: [
  { p: '*Méthodologie des exercices juridiques · Durée : 2 h · Sujet unique : commentaire de décision de justice.*' },
  { p: 'Dégagez la **fiche** de cette décision de justice.' },
  { p: '**Cour de cassation, première chambre civile, 27 février 2007**' },
  { p: 'Au nom du peuple français,' },
  { p: 'Attendu que, dans son numéro 2920 daté du 5 mai 2005, l\'hebdomadaire *Paris-Match* a publié, en ses pages 50 à 59, un entretien avec Mme X…, consacré à la révélation de la naissance d\'un garçon prénommé Alexandre, et présenté comme issu de ses relations intimes avec Albert Y…, prince de Monaco ; que le texte est illustré de plusieurs photographies représentant celui-ci avec celui-là ; que ces développements sont annoncés en gros caractères dès la couverture, sous le titre « Albert de Monaco : Alexandre, l\'enfant secret. Nicole, sa mère, raconte leur longue histoire » ; que le prince Albert, arguant d\'atteinte à ses droits sur sa vie privée et son image, a assigné la société Hachette Filipacchi (la société), éditrice du journal, et Mme A…, directrice de la publication ; que l\'arrêt confirmatif attaqué, accueillant la demande, a condamné la société au paiement de dommages-intérêts et à la publication de la décision ;' },
  { p: '*Sur le premier moyen* : Attendu qu\'il est fait grief à la cour d\'appel (Versailles, 24 novembre 2005) d\'avoir violé l\'article 6 de la Convention européenne des droits de l\'homme, sa décision ne visant pas une note en délibéré produite par la société après que le ministère public eut pris la parole le dernier ;' },
  { p: 'Mais attendu que la disposition visée n\'exige pas qu\'une note en délibéré, déposée en réponse aux conclusions du ministère public partie jointe au procès civil, conformément aux articles 443 et 445 du nouveau code de procédure civile, soit mentionnée par la décision à s\'ensuivre ; qu\'il résulte des pièces de la procédure que l\'audience publique s\'est tenue le 27 octobre 2005, que la note adressée par la société est arrivée au secrétariat-greffe de la cour de Versailles le 2 novembre 2005 et que l\'arrêt a été rendu le 24 novembre suivant ; qu\'il en résulte que la pièce est bien parvenue au juge dans le cours du délibéré ; qu\'il n\'est pas établi que celui-ci aurait été tenu pour définitivement clos dès avant son arrivée, de sorte que le moyen n\'est pas fondé ;' },
  { p: '*Et sur le second moyen, pris en ses trois branches* : Attendu qu\'il est fait aussi grief à l\'arrêt d\'avoir violé les articles 9 du code civil et 10 de la Convention européenne des droits de l\'homme, dès lors que la révélation dans l\'article incriminé de la paternité d\'Albert de Monaco, souverain régnant depuis avril 2005 sur une principauté pratiquant la transmission héréditaire du pouvoir, concernait la vie publique en raison des fonctions de l\'intéressé, et était ainsi justifiée par les nécessités de l\'information et le droit du lectorat, [sans que puissent y faire obstacle ni les précisions apportées,] anodines et seulement destinées à mettre la nouvelle en perspective, ni l\'adjonction de photographies, remises par Mme X…, prises au soutien de l\'événement, et en relation directe avec lui ;' },
  { p: 'Mais attendu que toute personne, quels que soient son rang, sa naissance, sa fortune, ses fonctions présentes ou à venir, a droit au respect de sa vie privée ; que l\'arrêt relève, d\'une part, qu\'à la date de parution de l\'article, l\'existence et la filiation de l\'enfant étaient inconnues du public, que, d\'autre part, la Constitution de la principauté exclut que, né hors mariage, il puisse accéder au trône, situation que, du reste, les conclusions de la société ne soutenaient ni être en débat dans les sociétés française ou monégasque, ni être étudiée par la publication litigieuse, et, enfin, que l\'article comportait de nombreuses digressions sur les circonstances de la rencontre et de la liaison de Mme X… et du prince Albert, les réactions de celui-ci à l\'annonce de la grossesse et son comportement ultérieur à l\'égard de l\'enfant ; qu\'au vu de ces constatations et énonciations, la cour d\'appel a exactement retenu l\'absence de tout fait d\'actualité comme de tout débat d\'intérêt général dont l\'information légitime du public aurait justifié qu\'il fût rendu compte au moment de la publication litigieuse ; que, par ailleurs, la publication de photographies représentant une personne pour illustrer des développements attentatoires à sa vie privée porte nécessairement atteinte à son droit au respect de son image ;' },
  { p: '*Par ces motifs* : rejette le pourvoi.' },
] });

// ---------------------------------------------------------------- DROITS HUMAINS
S.push({ id: 's12', title: 'Sujet 12 · Composition de droits humains', body: [
  { p: '*Durée : 1 h · Traitez obligatoirement les deux exercices.*' },
  { h: 'Exercice 1 (10 points)' },
  { p: 'Répondez par vrai ou faux, puis justifiez votre réponse de façon concise.' },
  VF([
    'Les droits fondamentaux sont des droits de l\'homme consacrés par des sources supra-législatives.',
    'Les droits de la troisième génération sont consacrés dans l\'ordre international, tandis que les droits des générations précédentes sont consacrés dans l\'ordre interne.',
    'La Déclaration des droits de l\'homme et du citoyen s\'applique en Côte d\'Ivoire, bien que ce texte ne figure plus dans le préambule de la Constitution du 8 novembre 2016.',
    'La Magna Carta, texte adopté en 1215, fait partie des textes précurseurs en matière de proclamation des droits de l\'homme.',
    'Les droits fondamentaux sont protégés contre le pouvoir législatif et le pouvoir exécutif, tandis que les libertés publiques sont protégées uniquement contre le pouvoir exécutif.',
  ]),
  { h: 'Exercice 2 (10 points)' },
  { ol: [
    'Quels sont les critères de fondamentalité des droits de l\'homme au niveau international ?',
    'À quel instrument normatif ou institutionnel correspondent les dates suivantes : 1945 ; 1981 ; 1948 ; 1789 ; 1236 ; 1966 ?',
  ] },
] });

// ---------------------------------------------------------------- RELATIONS INTERNATIONALES
S.push({ id: 's13', title: 'Sujet 13 · Évaluation de travaux dirigés de relations internationales', body: [
  { p: '*Documents non autorisés · Réponses obligatoires.*' },
  { h: 'Trouvez la bonne réponse en vous justifiant' },
  { ol: [
    'Il est faux de dire qu\'il est vrai que le droit de légation est une négociation diplomatique.',
    'Il est vrai de dire qu\'il faut que l\'ambassade constitue un micro-État dans l\'État accréditaire.',
    'Il est douteux d\'affirmer que la lettre d\'accréditation est une lettre de créance.',
    'Il est admissible de croire vrai que la mission diplomatique est identique à la mission consulaire.',
  ] },
  { h: 'Cas pratique' },
  { p: 'La province pétrolière du Wari est la principale source de richesse de l\'État du Money. Très en colère en raison de leur grande pauvreté, les populations du Wari veulent, par un mouvement de libération nationale, faire sécession. Leur chef vient vous consulter pour avis.' },
  { p: 'Relevez les différents problèmes en apportant la solution.' },
] });

// ---------------------------------------------------------------- DROIT ISLAMIQUE, CIVILISATION ISLAMIQUE
S.push({ id: 's14', title: 'Sujet 14 · Introduction à l\'étude du droit islamique (session 1, 2024-2025)', body: [
  { p: '*Durée : 1 h.*' },
  { h: '1. Cochez la ou les bonnes réponses' },
  { p: '**a. Les sources fondamentales (4 points)** : le raisonnement par analogie ; la coutume ; la Sunna ; l\'intérêt public ; le jugement préférentiel ; le Coran ; l\'interprétation.' },
  { p: '**b. Les sources secondaires (4 points)** : le Qiyas, raisonnement analogique ; le consensus des savants ; la Sunna ; le Coran ; la coutume.' },
  { h: '2. Définissez les sources suivantes (12 points)' },
  { p: 'Le Coran ; la Sunna ; le consensus (Idjma\') ; le Qiyas, raisonnement analogique ; l\'intérêt public ; le jugement humain ; le cadi.' },
] });

S.push({ id: 's15', title: 'Sujet 15 · Civilisation islamique (session 1)', body: [
  { p: 'La civilisation islamique est l\'ensemble des réalisations culturelles, scientifiques, politiques, sociales et spirituelles développées par les musulmans depuis l\'avènement de l\'islam au VIIe siècle jusqu\'à aujourd\'hui. Lisez bien ce texte et répondez aux questions suivantes.' },
  { ol: [
    'Qu\'entendez-vous par islam, imane et ihsane ? (10 points)',
    'L\'islam est venu préserver cinq buts supérieurs : citez-les. (5 points)',
    'Selon la civilisation islamique, l\'être humain entretient quatre relations distinctes. Quelles sont ces quatre relations, et quel est le but recherché de chaque relation ? (5 points)',
  ] },
] });

// ---------------------------------------------------------------- ÉCONOMIE POLITIQUE
S.push({ id: 's16', title: 'Sujet 16 · Examen terminal d\'économie politique (2023)', body: [
  { p: '*Durée : 1 h · Répondez aux questions suivantes.*' },
  { ol: [
    'Définissez l\'activité économique.',
    'Qu\'est-ce qu\'un besoin ?',
    'Expliquez ce qu\'est un homo œconomicus.',
    'Quelles sont les caractéristiques d\'un besoin ?',
    'Expliquez la loi de Pareto (20/80).',
    'Expliquez la relation entre l\'inflation et le chômage décrite par la courbe de Phillips.',
    'Définissez la désinflation.',
    'Comparez le système capitaliste et le système socialiste.',
    'Expliquez la position de l\'école des choix publics et donnez l\'auteur de cette pensée.',
    'Après un dépôt de 100 000 FCFA dans une banque commerciale, quel est le montant total qui peut être alloué à l\'économie sous forme de crédits par le système bancaire, sachant que le taux de réserve obligatoire est de 5 %, selon le multiplicateur de crédit ?',
  ] },
] });

// ---------------------------------------------------------------- INFORMATIQUE
S.push({ id: 's17', title: 'Sujet 17 · Examen d\'informatique (session 1, janvier 2022)', body: [
  { p: '*Durée : 1 h 30 · Noté sur 20.*' },
  { ol: [
    'Qu\'est-ce que l\'informatique ? (1 point)',
    'Définissez les termes suivants : l\'unité centrale ; la carte graphique ; le disque dur. (2 points)',
    'Citez les différents types de boîtiers. (1 point)',
    'Donnez la différence entre un disque dur interne et un disque dur externe.',
    'Quels sont les critères de choix d\'un processeur ? (2 points)',
    'Donnez les composants de la carte graphique. (2 points)',
    'Quels sont les principaux systèmes d\'exploitation ? (1 point)',
    'Donnez deux avantages et deux inconvénients de chaque système d\'exploitation. (2 points)',
    'Comment démarrer votre ordinateur ? (1 point)',
    'Comment réinitialiser le mot de passe d\'un compte d\'utilisateur local ? (3 points)',
    'Définissez les termes suivants et donnez deux exemples de chaque type : logiciel de base ; logiciel d\'application ; pilotes. (3 points)',
    'Dans quelle partie de l\'ordinateur se trouve le disque dur ? (1 point)',
    'Définissez la RAM. (1 point)',
    'Un kilooctet (1 Ko) représente combien d\'octets ? (1 point)',
  ] },
] });

// ---------------------------------------------------------------- ANGLAIS JURIDIQUE
S.push({ id: 's18', title: 'Sujet 18 · Final English test', body: [
  { p: '*Anglais juridique.*' },
  { ol: [
    'What is the definition of law?',
    'Tell me about the types of law, defining three of them.',
    'How can you explain the constitution?',
    'Try to define the importance of law.',
    'In your opinion, does law have to be in accordance with morality?',
    'Tell me about the most important elements when introducing yourself.',
  ] },
] });

// ---------------------------------------------------------------- EXPRESSION ÉCRITE, ÉTHIQUE
S.push({ id: 's19', title: 'Sujet 19 · Rédaction administrative (sujet unique)', body: [
  { p: '*Techniques d\'expression écrite · Durée : 1 h 30.*' },
  { p: 'Pour sa nouvelle politique d\'assainissement de l\'environnement universitaire, la direction de l\'université a pris plusieurs mesures : port de la cravate obligatoire ; discipline en classe ; renforcement des mesures de sécurité.' },
  { p: '**A.** La secrétaire générale de l\'université vous demande de rédiger (18 points) :' },
  { ol: [
    'un communiqué pour le port de la cravate ;',
    'un rapport sur l\'altercation constatée entre deux étudiants lors de la dernière séance du cours de rédaction ;',
    'un courrier à l\'attention des vigiles, leur demandant d\'interdire l\'accès aux cours à tout étudiant en retard de paiement de sa scolarité ;',
    'une doléance, ou courrier adressé au recteur de l\'université, lui demandant la création d\'une infirmerie.',
  ] },
  { p: '**B.** Quelle différence y a-t-il entre la lettre circulaire et la circulaire, et entre le compte rendu et le procès-verbal ? (2 points)' },
] });

S.push({ id: 's20', title: 'Sujet 20 · Évaluation d\'éthique et morale', body: [
  { p: '*Licence 1 (sciences économiques et sciences juridiques) · Durée : 1 h · Le candidat doit être précis et concis dans ses réponses.*' },
  { ol: [
    'Après avoir défini la morale, indiquez ses stades d\'évolution.',
    'Quels sont les déterminants et les dimensions de la morale ?',
    'Que doit faire un homme pour que son acte soit bon ?',
    'Quelle différence faites-vous entre l\'éthique réflexive et l\'éthique normative ?',
    'Face aux défis de la mondialisation et du progrès technologique, quel modèle de citoyen entrevoyez-vous pour la société ivoirienne ?',
  ] },
] });

module.exports = { S, OJ_VF };
