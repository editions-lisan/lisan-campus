// BOILEAU · la carte du jour — série de Licence 1, semaines 1 à 8 (40 cartes du lundi au vendredi,
// plus la révision du samedi et le défi du dimanche de chaque semaine).
// Textes des articles recopiés mot pour mot des sources en vigueur :
//  - Constitution du 8 novembre 2016 révisée : outils/constitution/constitution.json ;
//  - Code civil applicable en Côte d'Ivoire : compilations Code civil I et II de la bibliothèque (livres/droit),
//    titre préliminaire, biens et obligations, sans réforme depuis ;
//  - lois n° 2019-570 (mariage), 2019-571 (filiation) et 2019-573 (successions), à jour, même compilation ;
//  - loi n° 2020-491 relative au domicile (article 2, première phrase).
// {mot} : mot surligné sur la carte et mis en blanc dans la révision du samedi.
// Compléments : notion, adage, distinction, arret, procedure, piege, delai.

const CC = 'Code civil applicable en Côte d\'Ivoire';
const CONST = 'Constitution du 8 novembre 2016, révisée en 2020 et en 2023';

const SEMAINES = [
  // ------------------------------------------------------------------ SEMAINE 1
  { theme: 'La loi', cartes: [
    { ref: 'Code civil, article 2', src: CC + ' · titre préliminaire',
      text: 'La loi ne dispose que pour {l\'avenir}, elle n\'a point d\'{effet rétroactif}.',
      c: { type: 'notion', title: 'Le principe <i>et ses exceptions</i>', chips: [
        ['1', 'Loi pénale plus douce', 'elle s\'applique aux faits non encore jugés'],
        ['2', 'Loi interprétative', 'elle précise une loi ancienne'],
        ['3', 'Rétroactivité voulue', 'par le législateur, jamais pour une loi pénale plus sévère'],
      ], memo: 'La loi nouvelle regarde <b>devant</b>, pas derrière. Sauf ces trois cas.' } },
    { ref: 'Code civil, article 1er', src: CC + ' · titre préliminaire',
      text: 'Les lois sont {exécutoires}, dans tout le territoire ivoirien, de la {promulgation} qui en est faite par le Président de la République. Elles seront exécutées dans chaque partie de la République, du moment où la promulgation en pourra être {connue}.',
      c: { type: 'adage', latin: 'Nul n\'est censé ignorer la loi', trad: 'Nemo censetur ignorare legem',
        text: 'Une fois la loi promulguée et publiée, elle s\'impose à <b>tous</b>, même à celui qui ne l\'a jamais lue. Devant le juge, « je ne savais pas » n\'est pas une excuse.' } },
    { ref: 'Code civil, article 5', src: CC + ' · titre préliminaire',
      text: 'Il est défendu aux juges de prononcer par voie de {disposition générale}, et {réglementaire} sur les causes qui leur sont soumises.',
      c: { type: 'distinction', title: 'Ne pas confondre', a: ['Arrêt de règlement', 'Le juge pose une règle générale pour l\'avenir, comme un législateur. <b>Interdit</b> (article 5).'], b: ['Arrêt de principe', 'Le juge tranche l\'affaire en formulant une solution de portée générale, que les autres juges suivront. <b>Permis</b> : c\'est la jurisprudence.'] } },
    { ref: 'Constitution, article 74, alinéa 2', src: CONST,
      text: 'Il assure la {promulgation} des lois dans les {trente (30) jours} qui suivent la transmission qui lui est faite de la loi définitivement adoptée. Ce délai est réduit à {cinq (5) jours} en cas d\'urgence.',
      c: { type: 'procedure', title: 'Le parcours d\'une loi', steps: [
        '<b>Initiative</b> : projet du Président ou proposition des parlementaires (art. 74, al. 1er)',
        '<b>Dépôt</b> sur le bureau d\'une chambre, examen en commission (art. 109)',
        '<b>Vote</b> successif par l\'Assemblée nationale et le Sénat, en vue d\'un texte identique (art. 110)',
        '<b>Désaccord</b> : commission mixte paritaire, puis dernier mot à l\'Assemblée nationale (art. 110)',
        '<b>Promulgation</b> en 30 jours, puis publication au Journal officiel',
      ] } },
    { ref: 'Code civil, article 4', src: CC + ' · titre préliminaire',
      text: 'Le juge qui refusera de juger, sous prétexte du {silence}, de l\'{obscurité} ou de l\'{insuffisance} de la loi, pourra être poursuivi comme coupable de {déni de justice}.',
      c: { type: 'piege', faux: 'La loi ne dit rien sur mon affaire : le juge peut refuser de juger.', vrai: 'Il doit trancher quand même : il interprète la loi, raisonne par analogie, applique les principes généraux. Sinon, c\'est un <b>déni de justice</b>.' } },
  ], defi: [
    ['La loi nouvelle s\'applique-t-elle aux faits passés ?', 'Non, sauf exceptions (Code civil, art. 2)'],
    ['À partir de quand une loi est-elle exécutoire ?', 'Par sa promulgation (Code civil, art. 1er)'],
    ['Arrêt de règlement ou arrêt de principe : lequel est interdit ?', 'L\'arrêt de règlement (Code civil, art. 5)'],
    ['En combien de jours le Président promulgue-t-il une loi ?', '30 jours, 5 en cas d\'urgence (Constitution, art. 74)'],
    ['Comment s\'appelle le refus de juger ?', 'Le déni de justice (Code civil, art. 4)'],
  ] },

  // ------------------------------------------------------------------ SEMAINE 2
  { theme: 'La Constitution et l\'État', cartes: [
    { ref: 'Constitution, article 50', src: CONST,
      text: 'La {souveraineté} appartient au {peuple}. Aucune section du peuple ni aucun individu ne peut s\'en {attribuer l\'exercice}.',
      c: { type: 'notion', title: 'Comment le peuple <i>exerce sa souveraineté</i>', chips: [
        ['R', 'Référendum', 'le peuple vote lui-même la décision'],
        ['É', 'Élus', 'ses représentants votent pour lui'],
        ['C', 'Contrôle', 'le Conseil constitutionnel veille aux scrutins'],
      ], memo: 'Article 51 : « par la voie du <b>référendum</b> et par ses <b>représentants élus</b> ».' } },
    { ref: 'Constitution, article 7, alinéa 1er', src: CONST,
      text: 'Nul ne peut être {poursuivi}, {arrêté}, {gardé à vue} ou {inculpé}, qu\'en vertu d\'une loi {promulguée antérieurement} aux faits qui lui sont reprochés.',
      c: { type: 'adage', latin: 'Nullum crimen, nulla poena sine lege', trad: '« Pas de crime, pas de peine sans loi. »',
        text: 'C\'est le <b>principe de légalité des délits et des peines</b> : on ne peut être puni que pour un fait que la loi interdisait <b>déjà</b> au moment où on l\'a commis. Une loi d\'aujourd\'hui ne punit pas le fait d\'hier.' } },
    { ref: 'Constitution, article 103, alinéa 1er', src: CONST,
      text: 'Les matières autres que celles qui sont du {domaine de la loi} relèvent du {domaine réglementaire}.',
      c: { type: 'distinction', title: 'Ne pas confondre', a: ['La loi', 'Votée par le <b>Parlement</b>, dans les matières que l\'article 101 énumère (libertés, état des personnes, crimes et délits, impôts…).'], b: ['Le règlement', 'Pris par l\'<b>exécutif</b> (décrets, arrêtés), dans toutes les autres matières. Il doit respecter la loi.'] } },
    { ref: 'Constitution, article 113, alinéa 1er', src: CONST,
      text: 'Les lois peuvent, {avant leur promulgation}, être déférées au {Conseil constitutionnel} par le Président de la République, le Président de l\'Assemblée nationale ou le Président du Sénat ou par {un dixième} au moins des députés ou des sénateurs ou par les {groupes parlementaires}.',
      c: { type: 'procedure', title: 'Le contrôle avant la promulgation', steps: [
        '<b>Saisine</b> par une autorité de l\'alinéa 1er, ou par une association de défense des droits de l\'homme pour les lois sur les libertés publiques',
        '<b>Effet</b> : le délai de promulgation est suspendu (al. 4)',
        '<b>Décision</b> du Conseil dans les 15 jours (al. 5)',
        '<b>Loi contraire</b> : elle ne peut être ni promulguée ni appliquée, elle est nulle à l\'égard de tous (art. 137)',
      ] } },
    { ref: 'Constitution, article 123', src: CONST,
      text: 'Les traités ou accords régulièrement ratifiés ont, dès leur publication, une {autorité supérieure à celle des lois}, sous réserve, pour chaque traité ou accord, de son {application par l\'autre partie}.',
      c: { type: 'piege', faux: 'Le traité est au-dessus de la Constitution.', vrai: 'Il est au-dessus des <b>lois</b>, mais en dessous de la Constitution : un traité contraire à la Constitution ne peut être ratifié qu\'après sa révision (article 122).' } },
  ], defi: [
    ['À qui appartient la souveraineté ?', 'Au peuple (Constitution, art. 50)'],
    ['Que signifie « Nullum crimen, nulla poena sine lege » ?', 'Pas de crime, pas de peine sans loi (Constitution, art. 7)'],
    ['Qui peut saisir le Conseil constitutionnel avant la promulgation ?', 'Président, présidents des chambres, 1/10 des parlementaires, groupes parlementaires (art. 113)'],
    ['En combien de jours le Conseil constitutionnel statue-t-il ?', '15 jours (art. 113, al. 5)'],
    ['Le traité est-il au-dessus de la loi ?', 'Oui, s\'il est ratifié, publié et appliqué par l\'autre partie (art. 123)'],
  ] },

  // ------------------------------------------------------------------ SEMAINE 3
  { theme: 'Les biens', cartes: [
    { ref: 'Code civil, article 516', src: CC + ' · livre II, les biens',
      text: 'Tous les biens sont {meubles} ou {immeubles}.',
      c: { type: 'notion', title: 'Immeuble : <i>trois façons de l\'être</i>', chips: [
        ['N', 'Par nature', 'le sol, les bâtiments, ce qui ne se déplace pas'],
        ['D', 'Par destination', 'le meuble attaché par le propriétaire au service du fonds'],
        ['O', 'Par l\'objet', 'le droit portant sur un immeuble (usufruit, hypothèque)'],
      ], memo: 'Article 517 : immeubles « par leur <b>nature</b>, ou par leur <b>destination</b>, ou par l\'<b>objet</b> auquel ils s\'appliquent ».' } },
    { ref: 'Code civil, article 2279, alinéa 1er', src: CC + ' · livre III, la prescription',
      text: 'En fait de {meubles}, la {possession} vaut {titre}.',
      c: { type: 'adage', latin: 'Nemo plus juris ad alium transferre potest quam ipse habet', trad: '« Nul ne peut transmettre à autrui plus de droits qu\'il n\'en a lui-même. »',
        text: 'En principe, celui qui achète à un non-propriétaire n\'acquiert rien. L\'article 2279 fait <b>exception</b> pour les meubles : l\'acheteur de bonne foi qui les possède en devient propriétaire. La chose perdue ou volée peut être revendiquée pendant <b>trois ans</b> (al. 2).' } },
    { ref: 'Code civil, article 544', src: CC + ' · livre II, la propriété',
      text: 'La propriété est le droit de {jouir} et {disposer} des choses de la manière la plus {absolue}, pourvu qu\'on n\'en fasse pas un usage {prohibé} par les lois ou par les règlements.',
      c: { type: 'distinction', title: 'Ne pas confondre', a: ['Droit réel', 'Un pouvoir <b>direct sur une chose</b> : la propriété de ma maison, l\'usufruit d\'un champ.'], b: ['Droit personnel', 'Le droit d\'exiger <b>d\'une personne</b> une prestation : me payer, me livrer, me construire.'] } },
    { ref: 'Code civil, article 552, alinéa 1er', src: CC + ' · livre II, la propriété',
      text: 'La propriété du {sol} emporte la propriété du {dessus} et du {dessous}.',
      c: { type: 'arret', ref: 'Cass. req., 3 août 1915, Clément-Bayard', flag: 'France',
        faits: 'Un propriétaire dresse sur son terrain de hautes carcasses de bois hérissées de tiges de fer, sans aucune utilité pour lui, pour crever les dirigeables de son voisin.',
        solution: 'C\'est un <b>abus du droit de propriété</b> : il a agi dans la seule intention de nuire. Il doit réparer le dommage.',
        ci: 'Mêmes articles 544 et 1382 dans le Code civil applicable en Côte d\'Ivoire : la propriété est « absolue », mais pas pour nuire.' } },
    { ref: 'Code civil, article 545', src: CC + ' · livre II, la propriété',
      text: 'Nul ne peut être contraint de céder sa propriété, si ce n\'est pour cause d\'{utilité publique}, et moyennant une {juste} et {préalable} indemnité.',
      c: { type: 'piege', faux: 'L\'État peut exproprier d\'abord et payer plus tard.', vrai: 'L\'indemnité doit être <b>préalable</b> : payée avant la dépossession, et <b>juste</b>. La Constitution le répète (article 11).' } },
  ], defi: [
    ['Tous les biens sont… ?', 'Meubles ou immeubles (Code civil, art. 516)'],
    ['Cite les trois catégories d\'immeubles.', 'Par nature, par destination, par l\'objet (art. 517)'],
    ['« En fait de meubles… » ?', '… la possession vaut titre (art. 2279, al. 1er)'],
    ['Droit réel ou droit personnel : l\'usufruit ?', 'Droit réel'],
    ['Quelles sont les deux qualités de l\'indemnité d\'expropriation ?', 'Juste et préalable (art. 545 ; Constitution, art. 11)'],
  ] },

  // ------------------------------------------------------------------ SEMAINE 4
  { theme: 'La personne', cartes: [
    { ref: 'Constitution, article 2, alinéa 3', src: CONST,
      text: 'Tout individu a droit à la {dignité humaine} et à la reconnaissance de sa {personnalité juridique}.',
      c: { type: 'notion', title: 'La personnalité juridique', chips: [
        ['D', 'Définition', 'l\'aptitude à être titulaire de droits et d\'obligations'],
        ['N', 'Naissance', 'elle commence quand l\'enfant naît vivant'],
        ['M', 'Mort', 'elle prend fin au décès'],
      ], memo: 'Les <b>personnes physiques</b> (les êtres humains) et les <b>personnes morales</b> (sociétés, associations, État) en sont dotées.' } },
    { ref: 'Loi n° 2019-573 du 26 juin 2019 relative aux successions, article 7', src: 'Loi en vigueur',
      text: 'Pour succéder, il faut {exister à l\'instant de la succession}. Sont donc incapables de succéder : 1°) celui qui n\'est pas encore {conçu} ; 2°) l\'enfant qui n\'est pas {né vivant}.',
      c: { type: 'adage', latin: 'Infans conceptus pro nato habetur quoties de commodis ejus agitur', trad: '« L\'enfant conçu est tenu pour né chaque fois qu\'il y va de son intérêt. »',
        text: 'L\'enfant déjà conçu au décès de son père hérite de lui, <b>à condition de naître vivant</b>. Depuis la loi de 2019, il n\'est plus exigé qu\'il soit né viable.' } },
    { ref: 'Loi n° 2019-571 du 26 juin 2019 relative à la filiation, article 2', src: 'Loi en vigueur',
      text: 'L\'enfant {conçu pendant le mariage} ou né moins de {trois cents jours} après la dissolution du mariage, a pour père le {mari de sa mère}.',
      c: { type: 'distinction', title: 'Ne pas confondre', a: ['Présomption de paternité', 'Automatique : l\'enfant de la femme mariée a pour père <b>le mari</b>, sans démarche (article 2).'], b: ['Reconnaissance', 'Un <b>acte volontaire</b> par lequel le père (ou la mère) établit la filiation d\'un enfant né hors mariage.'] } },
    { ref: 'Loi n° 2019-571 du 26 juin 2019 relative à la filiation, article 4', src: 'Loi en vigueur',
      text: 'Le mari peut {désavouer} l\'enfant conçu pendant le mariage : 1°) s\'il prouve que pendant le temps qui a couru depuis les {trois centièmes jours} jusqu\'au {cent quatre-vingtième jour} avant la naissance de cet enfant, il était dans l\'impossibilité physique de cohabiter avec sa femme, 2°) si, selon les données acquises de la {science médicale}, il est établi qu\'il ne peut en être le père.',
      c: { type: 'procedure', title: 'Trouver la période de conception', steps: [
        'Partir de la <b>date de naissance</b> de l\'enfant',
        'Remonter de <b>300 jours</b> : c\'est le début de la période',
        'Remonter de <b>180 jours</b> : c\'est la fin de la période',
        'L\'enfant est présumé conçu <b>entre ces deux dates</b>',
      ] } },
    { ref: 'Loi n° 2019-570 du 26 juin 2019 relative au mariage, article 2', src: 'Loi en vigueur',
      text: 'L\'homme et la femme avant {dix-huit (18) ans révolus} ne peuvent contracter mariage.',
      c: { type: 'delai', big: '18', unit: 'ans révolus', text: 'Le même âge pour <b>l\'homme et la femme</b> : avant 18 ans accomplis, pas de mariage. « Révolus » veut dire que le dix-huitième anniversaire doit être passé.' } },
  ], defi: [
    ['Qu\'est-ce que la personnalité juridique ?', 'L\'aptitude à être titulaire de droits et d\'obligations'],
    ['L\'enfant conçu hérite-t-il de son père mort avant sa naissance ?', 'Oui, s\'il naît vivant (loi de 2019 sur les successions, art. 7)'],
    ['Qui est le père de l\'enfant conçu pendant le mariage ?', 'Le mari de sa mère (loi de 2019 sur la filiation, art. 2)'],
    ['Quelle est la période légale de conception ?', 'Du 300e au 180e jour avant la naissance (art. 4)'],
    ['À quel âge peut-on se marier ?', '18 ans révolus, pour l\'homme et la femme (loi de 2019 sur le mariage, art. 2)'],
  ] },

  // ------------------------------------------------------------------ SEMAINE 5
  { theme: 'Domicile, mariage, succession', cartes: [
    { ref: 'Loi n° 2020-491 du 29 mai 2020 relative au domicile, article 2, 1re phrase', src: 'Loi en vigueur',
      text: 'Toute personne, sauf {disposition spéciale} de la loi, n\'a qu\'{un domicile}.',
      c: { type: 'distinction', title: 'Domicile <i>ou</i> résidence ?', a: ['Le domicile', 'Le lieu du <b>principal établissement</b> : là où la personne a choisi de vivre de façon permanente. Un seul.'], b: ['La résidence', 'Le lieu où elle vit de façon <b>temporaire</b>. On peut en avoir plusieurs (article 1er).'] } },
    { ref: 'Code civil, article 1247, dernière phrase', src: CC + ' · livre III, les obligations',
      text: 'Hors ces deux cas, le payement doit être fait au {domicile du débiteur}.',
      c: { type: 'adage', latin: 'Les dettes sont quérables et non portables', trad: 'Adage du droit français ancien',
        text: 'C\'est le <b>créancier</b> qui va chercher son argent chez le débiteur, et non le débiteur qui doit le lui porter. Sauf si le contrat a prévu un autre lieu, ou s\'il s\'agit d\'un corps certain (début de l\'article 1247).' } },
    { ref: 'Loi n° 2019-570 du 26 juin 2019 relative au mariage, article 1er', src: 'Loi en vigueur',
      text: 'Le mariage est l\'union d\'{un homme et d\'une femme} célébrée par devant l\'{officier de l\'état civil}.',
      c: { type: 'distinction', title: 'Ne pas confondre', a: ['Mariage civil', 'Célébré par l\'<b>officier de l\'état civil</b> : c\'est lui seul qui fait de vous des époux aux yeux de la loi.'], b: ['Mariage religieux ou coutumier', 'Il a sa valeur pour la foi ou la tradition, mais <b>ne produit pas les effets juridiques</b> du mariage.'] } },
    { ref: 'Loi n° 2019-570 du 26 juin 2019 relative au mariage, article 20, alinéas 1er et 2', src: 'Loi en vigueur',
      text: 'Le mariage est célébré {publiquement} au siège de la circonscription ou du centre d\'état civil du {domicile} ou de la {résidence} de l\'un des futurs époux. La résidence est établie par {un (1) mois} au moins d\'habitation continue, à la date de la célébration.',
      c: { type: 'procedure', title: 'Où se marier ?', steps: [
        'Au centre d\'état civil du <b>domicile</b> ou de la <b>résidence</b> de l\'un des futurs époux (al. 1er)',
        'La résidence compte après <b>un mois</b> d\'habitation continue (al. 2)',
        'Ailleurs : avec l\'<b>autorisation du procureur</b> de la République, pour de justes motifs (al. 3)',
        'Empêchement grave : l\'officier <b>se déplace</b> au domicile, sur réquisition du procureur (art. 21)',
      ] } },
    { ref: 'Loi n° 2019-573 du 26 juin 2019 relative aux successions, article 5, alinéa 1er', src: 'Loi en vigueur',
      text: 'La succession s\'ouvre au {dernier domicile} du défunt pour l\'ensemble des biens. Pour les cas où le dernier domicile ne serait pas connu, la succession s\'ouvre à la {dernière résidence}.',
      c: { type: 'piege', faux: 'La succession s\'ouvre là où se trouvent les biens du défunt.', vrai: 'Elle s\'ouvre au <b>dernier domicile</b>, pour l\'ensemble des biens ; à défaut, à la dernière résidence. Le juge de ce lieu est compétent.' } },
  ], defi: [
    ['Combien de domiciles une personne peut-elle avoir ?', 'Un seul, sauf disposition spéciale (loi de 2020, art. 2)'],
    ['Où se paie une dette, si rien n\'est prévu ?', 'Au domicile du débiteur (Code civil, art. 1247)'],
    ['Le mariage religieux seul fait-il des époux aux yeux de la loi ?', 'Non : seul celui célébré par l\'officier de l\'état civil (loi de 2019, art. 1er)'],
    ['Après combien de temps la résidence permet-elle de se marier ?', 'Un mois d\'habitation continue (art. 20)'],
    ['Où s\'ouvre la succession ?', 'Au dernier domicile du défunt (loi de 2019 sur les successions, art. 5)'],
  ] },

  // ------------------------------------------------------------------ SEMAINE 6
  { theme: 'La justice', cartes: [
    { ref: 'Constitution, article 139, alinéas 1er et 2', src: CONST,
      text: 'Le pouvoir judiciaire est {indépendant}. Le Président de la République est le {garant} de l\'indépendance du pouvoir judiciaire. Il est assisté par le {Conseil supérieur de la Magistrature}.',
      c: { type: 'notion', title: 'Ce qui protège <i>le juge</i>', chips: [
        ['I', 'Inamovibilité', 'le juge du siège n\'est pas muté sans son accord'],
        ['C', 'CSM', 'il décide des sanctions, par décision motivée'],
        ['P', 'Protection', 'contre toute ingérence ou pression (art. 140)'],
      ], memo: 'Un juge indépendant ne dépend ni du Gouvernement ni du Parlement : il n\'obéit qu\'à la <b>loi</b>.' } },
    { ref: 'Constitution, article 6, alinéa 2', src: CONST,
      text: 'Toute personne a droit à un {procès équitable} et à un jugement rendu dans un {délai raisonnable} déterminé par la loi.',
      c: { type: 'adage', latin: 'Audi alteram partem', trad: '« Écoute l\'autre partie. »',
        text: 'C\'est le <b>principe du contradictoire</b>, cœur du procès équitable : nul ne peut être jugé sans avoir été entendu ou appelé, et chaque partie doit connaître les arguments et les pièces de l\'autre.' } },
    { ref: 'Constitution, article 147', src: CONST,
      text: 'La {Cour de Cassation} veille à l\'application de la loi par les juridictions de l\'{ordre judiciaire}. Le {Conseil d\'Etat} veille à l\'application de la loi par les juridictions de l\'{ordre administratif}.',
      c: { type: 'distinction', title: 'Deux ordres, <i>deux sommets</i>', a: ['Ordre judiciaire', 'Litiges entre particuliers et affaires pénales. Sommet : la <b>Cour de cassation</b>.'], b: ['Ordre administratif', 'Litiges avec l\'administration. Sommet : le <b>Conseil d\'État</b>.'] } },
    { ref: 'Constitution, article 148', src: CONST,
      text: 'La Cour de Cassation est la {plus haute juridiction} de l\'ordre judiciaire. Elle statue souverainement sur les recours en cassation contre les décisions rendues en {dernier ressort} par les Cours et tribunaux de l\'ordre judiciaire.',
      c: { type: 'arret', ref: 'Tribunal des conflits, 8 février 1873, Blanco', flag: 'France',
        faits: 'Une enfant, Agnès Blanco, est renversée par un wagonnet d\'une manufacture de tabacs de l\'État, à Bordeaux. Son père réclame réparation à l\'État.',
        solution: 'La responsabilité de l\'État pour ses services publics ne relève pas du Code civil : elle obéit à des <b>règles spéciales</b>, et le juge <b>administratif</b> est compétent.',
        ci: 'C\'est l\'acte de naissance de la dualité de juridictions, que la Côte d\'Ivoire consacre depuis 2020 avec la Cour de cassation et le Conseil d\'État.' } },
    { ref: 'Constitution, article 140, alinéa 1er, 1re phrase', src: CONST,
      text: 'Les magistrats du {siège} sont {inamovibles}.',
      c: { type: 'piege', faux: 'Tous les magistrats sont inamovibles.', vrai: 'Seuls ceux du <b>siège</b> (qui jugent). Ceux du <b>parquet</b> (qui poursuivent) sont placés sous l\'autorité hiérarchique du garde des Sceaux.' } },
  ], defi: [
    ['Qui est le garant de l\'indépendance du pouvoir judiciaire ?', 'Le Président de la République, assisté du CSM (art. 139)'],
    ['Que signifie « Audi alteram partem » ?', 'Écoute l\'autre partie : le principe du contradictoire'],
    ['Quel est le sommet de l\'ordre administratif ?', 'Le Conseil d\'État (art. 147)'],
    ['Quel arrêt fonde la responsabilité spéciale de l\'administration ?', 'Blanco, Tribunal des conflits, 8 février 1873'],
    ['Les magistrats du parquet sont-ils inamovibles ?', 'Non, seuls ceux du siège (art. 140)'],
  ] },

  // ------------------------------------------------------------------ SEMAINE 7
  { theme: 'Le contrat', cartes: [
    { ref: 'Code civil, article 1101', src: CC + ' · livre III, les contrats',
      text: 'Le contrat est une {convention} par laquelle une ou plusieurs personnes s\'obligent, envers une ou plusieurs autres, à {donner}, à {faire} ou à {ne pas faire} quelque chose.',
      c: { type: 'notion', title: 'Les trois obligations', chips: [
        ['D', 'Donner', 'transférer la propriété : le vendeur'],
        ['F', 'Faire', 'accomplir une prestation : le maçon'],
        ['NF', 'Ne pas faire', 's\'abstenir : la clause de non-concurrence'],
      ], memo: 'Tout contrat se ramène à <b>donner, faire ou ne pas faire</b>.' } },
    { ref: 'Code civil, article 1165', src: CC + ' · livre III, les contrats',
      text: 'Les conventions n\'ont d\'effet qu\'{entre les parties contractantes} ; elles ne {nuisent} point au tiers, et elles ne lui {profitent} que dans le cas prévu par l\'article 1121.',
      c: { type: 'adage', latin: 'Res inter alios acta aliis neque nocere neque prodesse potest', trad: '« Ce qui a été conclu entre les uns ne peut ni nuire ni profiter aux autres. »',
        text: 'C\'est l\'<b>effet relatif</b> du contrat : il n\'oblige que ceux qui l\'ont signé. L\'exception de l\'article 1121 est la <b>stipulation pour autrui</b> (l\'assurance au profit d\'un bénéficiaire).' } },
    { ref: 'Code civil, article 1108', src: CC + ' · livre III, les contrats',
      text: 'Quatre conditions sont essentielles pour la validité d\'une convention : le {consentement} de la partie qui s\'oblige ; sa {capacité} de contracter ; un {objet} certain qui forme la matière de l\'engagement ; une {cause} licite dans l\'obligation.',
      c: { type: 'distinction', title: 'Si une condition manque : <i>la nullité</i>', a: ['Nullité absolue', 'Protège l\'<b>intérêt général</b> (objet ou cause illicite) : tout intéressé peut l\'invoquer.'], b: ['Nullité relative', 'Protège <b>une partie</b> (vice du consentement, incapacité) : seule la personne protégée peut l\'invoquer.'] } },
    { ref: 'Code civil, article 1134, alinéa 1er', src: CC + ' · livre III, les contrats',
      text: 'Les conventions légalement formées {tiennent lieu de loi} à ceux qui les ont faites.',
      c: { type: 'arret', ref: 'Cass. civ., 6 mars 1876, Canal de Craponne', flag: 'France',
        faits: 'Des contrats du XVIe siècle fixaient la redevance d\'arrosage du canal de Craponne. Trois siècles plus tard, le prix était dérisoire : la cour d\'appel l\'augmente.',
        solution: 'Cassation : le juge ne peut <b>jamais modifier le contrat</b>, même si les circonstances ont changé et même au nom de l\'équité. C\'est le refus de la révision pour imprévision.',
        ci: 'Même article 1134 dans le Code civil applicable en Côte d\'Ivoire : le contrat est la loi des parties.' } },
    { ref: 'Code civil, article 6', src: CC + ' · titre préliminaire',
      text: 'On ne peut déroger, par des {conventions particulières}, aux lois qui intéressent l\'{ordre public} et les {bonnes mœurs}.',
      c: { type: 'piege', faux: 'Si les deux parties sont d\'accord, le contrat peut tout prévoir.', vrai: 'La liberté contractuelle s\'arrête à l\'<b>ordre public</b> et aux <b>bonnes mœurs</b> : la clause contraire est nulle.' } },
  ], defi: [
    ['Quelles sont les trois obligations de l\'article 1101 ?', 'Donner, faire, ne pas faire'],
    ['Un contrat peut-il obliger un tiers ?', 'Non : effet relatif (Code civil, art. 1165)'],
    ['Cite les quatre conditions de validité d\'un contrat.', 'Consentement, capacité, objet certain, cause licite (art. 1108)'],
    ['Le juge peut-il réviser un contrat devenu déséquilibré ?', 'Non : Canal de Craponne, 1876 (art. 1134)'],
    ['Peut-on écarter par contrat une loi d\'ordre public ?', 'Non (Code civil, art. 6)'],
  ] },

  // ------------------------------------------------------------------ SEMAINE 8
  { theme: 'Responsabilité et preuve', cartes: [
    { ref: 'Code civil, article 1382', src: CC + ' · livre III, la responsabilité',
      text: 'Tout {fait quelconque} de l\'homme, qui cause à autrui un {dommage}, oblige celui par la {faute} duquel il est arrivé à le {réparer}.',
      c: { type: 'notion', title: 'Trois conditions, <i>pas une de moins</i>', chips: [
        ['F', 'Faute', 'un comportement fautif'],
        ['D', 'Dommage', 'un préjudice certain'],
        ['L', 'Lien', 'de causalité : l\'un cause l\'autre'],
      ], memo: 'Pour retenir : <b>F · D · L</b>. Il en manque une ? La victime n\'obtient pas réparation.' } },
    { ref: 'Code civil, article 1315, alinéa 1er', src: CC + ' · livre III, la preuve',
      text: 'Celui qui {réclame} l\'exécution d\'une obligation doit la {prouver}.',
      c: { type: 'adage', latin: 'Actori incumbit probatio', trad: '« La preuve incombe au demandeur. »',
        text: 'Celui qui réclame quelque chose en justice doit <b>prouver</b> ce qu\'il avance. Et celui qui se dit libéré doit prouver le paiement (alinéa 2). Sans preuve, pas de droit devant le juge.' } },
    { ref: 'Code civil, article 1383', src: CC + ' · livre III, la responsabilité',
      text: 'Chacun est responsable du dommage qu\'il a causé non seulement par son fait, mais encore par sa {négligence} ou par son {imprudence}.',
      c: { type: 'distinction', title: 'Ne pas confondre', a: ['Délit civil (art. 1382)', 'Une faute <b>intentionnelle</b> : on a voulu le dommage.'], b: ['Quasi-délit (art. 1383)', 'Une faute <b>non intentionnelle</b> : négligence ou imprudence. Elle oblige aussi à réparer.'] } },
    { ref: 'Code civil, article 1384, alinéa 1er', src: CC + ' · livre III, la responsabilité',
      text: 'On est responsable non seulement du dommage que l\'on cause par son propre fait, mais encore de celui qui est causé par le fait des {personnes dont on doit répondre}, ou des {choses que l\'on a sous sa garde}.',
      c: { type: 'arret', ref: 'Cass. ch. réunies, 13 février 1930, Jand\'heur', flag: 'France',
        faits: 'Un camion renverse et blesse une jeune fille, Lise Jand\'heur. Le propriétaire du camion soutient qu\'aucune faute n\'est prouvée contre lui.',
        solution: 'L\'article 1384, alinéa 1er, pose une <b>présomption de responsabilité</b> contre le gardien de la chose. Prouver qu\'il n\'a pas commis de faute ne suffit pas : seule une <b>cause étrangère</b> (force majeure) l\'exonère.',
        ci: 'Même article 1384 dans le Code civil applicable en Côte d\'Ivoire.' } },
    { ref: 'Code civil, article 2262', src: CC + ' · livre III, la prescription',
      text: 'Toutes les actions tant réelles que personnelles, sont prescrites par {trente ans}, sans que celui qui allègue cette prescription soit obligé d\'en rapporter un titre, ou qu\'on puisse lui opposer l\'exception déduite de la mauvaise foi.',
      c: { type: 'delai', big: '30', unit: 'ans', text: 'Le délai de <b>droit commun</b> en matière civile. Mais attention : entre commerçants, ou entre commerçant et non-commerçant pour une affaire commerciale, c\'est <b>5 ans</b> (Acte uniforme OHADA relatif au droit commercial général, article 16).' } },
  ], defi: [
    ['Quelles sont les trois conditions de la responsabilité de l\'article 1382 ?', 'Faute, dommage, lien de causalité'],
    ['Qui doit prouver ?', 'Celui qui réclame (Code civil, art. 1315) : actori incumbit probatio'],
    ['Négligence et imprudence engagent-elles la responsabilité ?', 'Oui : quasi-délit (art. 1383)'],
    ['Le gardien d\'une chose s\'exonère-t-il en prouvant qu\'il n\'a pas commis de faute ?', 'Non : il faut une cause étrangère (Jand\'heur, 1930)'],
    ['Quel est le délai de prescription de droit commun en matière civile ?', '30 ans (Code civil, art. 2262)'],
  ] },
];

module.exports = { SEMAINES };
