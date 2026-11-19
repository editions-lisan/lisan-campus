# Étape 6 — Quand deux lettres se rencontrent
from ctx import *
E = 6

def H(s, a, i, j, ch, note=None, nth=1):
    pred = lambda l, mk: l == ch and is_sakin(l, mk)
    return M(s, a, i, j, pred=pred, nth=nth, note=note)
def h(*a, **k): return H(*a, **k)[0]

# lâm de l'article
QAM = [x for x in find_words(lambda l, mk: l == 'ل' and SUK in mk, n=40, first=lambda w: w.startswith('ٱلْ') or w.startswith('وَٱلْ'))][:6]
SHM = find_words(lambda l, mk: False, n=0)
def art_words(shamsi, n):
    out = []
    for s, a, i, w in word_index():
        base = w[2:] if w.startswith('وَ') else w
        if not base.startswith('ٱل') or len(w) > 11: continue
        nxt = base[2:3]
        if shamsi and nxt in 'تثدذرزسشصضطظلن' and base[2:4] != 'ْ': out.append((s, a, i))
        if not shamsi and base[2:3] == 'ْ': out.append((s, a, i))
        if len(out) >= n * 3: break
    seen, res = set(), []
    for s, a, i in out:
        w = tokens(s, a)[i - 1]
        if w in seen or any(c in w for c in WAQF): continue
        seen.add(w); res.append((s, a, i))
        if len(res) >= n: break
    return res
QW = art_words(False, 6); SW = art_words(True, 6)
PL = lambda l, mk: l == 'ل' and (SUK in mk or mk == '')

L22 = lesson(e=E, n=22, title='Les lâm : l’article, le verbe, « hal » et « bal »', ar='قُلْ',
    obj=['revoir le lâm de l’**article** : lettres lunaires et solaires ;', 'prononcer le lâm sâkin d’un **verbe** ;', 'appliquer la règle du lâm de **hal** et **bal**.'],
    dec=[('d', '1. Le lâm de l’article ٱلْ (rappel du niveau 1)'),
         ('g', ['Lettres', 'Le lâm…', 'Exemples'],
          [['**14 lettres lunaires** : أَبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ', 'se prononce clairement (iẓhâr) : il porte un soukoun', ('AR', '  '.join(W(*x) for x in QW[:3]), 34)],
           ['**14 lettres solaires** : toutes les autres', 'ne se prononce pas : il entre dans la lettre suivante, qui porte une chadda', ('AR', '  '.join(W(*x) for x in SW[:3]), 34)]],
          [3400, 3646, 3100], ['left', 'left', 'center']),
         ('d', '2. Le lâm sâkin d’un verbe'),
         ('t', 'Quand le lâm sans voyelle fait partie d’un **verbe** (قُلْ, ٱجْعَلْ, أَنزَلْنَا…), on le prononce **toujours clairement**, sauf devant un **lâm** ou un **râ’** : il entre alors dans cette lettre.'),
         ('g', ['Cas', 'Exemple', 'Je dis'],
          [['lâm du verbe + lettre ordinaire', ('AR', h(112, 1, 1, 2, 'ل'), 40), 'qoul houwa : lâm clair'], ['lâm du verbe + noûn', ('AR', h(37, 18, 1, 2, 'ل'), 40), 'qoul na‘am : lâm clair, ne pas le fondre !'],
           ['lâm du verbe + râ’', ('AR', h(17, 24, 7, 8, 'ل'), 40), 'wa qour-rabbi : idghâm'], ['lâm du verbe + lâm', ('AR', h(3, 12, 1, 2, 'ل'), 40), 'qoul-lilladhîna : idghâm']],
          [3500, 3300, 3346], ['left', 'center', 'left']),
         ('d', '3. Le lâm de « hal » et « bal »'),
         ('t', 'Le lâm de هَلْ et de بَلْ suit la même règle : **clair** devant toutes les lettres, **fondu** devant le lâm et le râ’. Exemples : ' + W(79, 15, 1) + ' ' + W(79, 15, 2) + ' (clair), ' + W(87, 16, 1) + ' ' + W(87, 16, 2) + ' (clair), ' + W(79, 18, 2) + ' ' + W(79, 18, 3) + ' (fondu), ' + W(4, 158, 1) + ' ' + W(4, 158, 2) + ' (fondu).'),
         ('tip', 'attention', 'L’exception de Ḥafṣ', ['Dans ' + W(83, 14, 2) + ' ' + W(83, 14, 3) + ' (Al-Mouṭaffifîn, 14), Ḥafṣ fait une **petite pause sans respirer** (sakta) sur le lâm : pas d’idghâm. Le petit sîn ( ۜ ) au-dessus du lâm l’indique.'])],
    ecoute=['Écoutez ' + W(37, 18, 1) + ' ' + W(37, 18, 2) + ' : le lâm est net avant le noûn. Écoutez ' + W(17, 24, 7) + ' ' + W(17, 24, 8) + ' : on n’entend plus le lâm, le râ’ est doublé.'],
    ret=['Article : lâm **clair** devant les 14 lettres lunaires, **fondu** devant les 14 solaires.', 'Lâm sâkin d’un **verbe**, de **hal** et de **bal** : clair, sauf devant **ل** et **ر** où il se fond.', 'Exception de Ḥafṣ : sakta dans بَلْۜ رَانَ.'],
    lis=[[W(*x) for x in QW[:6]], [W(*x) for x in SW[:6]], [h(112, 1, 1, 2, 'ل'), h(113, 1, 1, 2, 'ل'), h(37, 18, 1, 2, 'ل'), h(79, 15, 1, 2, 'ل'), h(87, 16, 1, 2, 'ل')],
         [h(17, 24, 7, 8, 'ل'), h(79, 18, 2, 3, 'ل'), h(4, 158, 1, 2, 'ل'), W(83, 14, 2) + ' ' + W(83, 14, 3)]],
    lis_corr=['Ligne 1 : lâm de l’article clair (lunaire). Ligne 2 : lâm de l’article non prononcé (solaire). Ligne 3 : lâm clair. Ligne 4 : idghâm dans les trois premières cases ; sakta dans بَلْۜ رَانَ.'],
    mots=[H(112, 1, 1, 2, 'ل'), H(37, 18, 1, 2, 'ل'), H(17, 24, 7, 8, 'ل'), H(79, 18, 2, 3, 'ل'), H(4, 158, 1, 2, 'ل'), M(83, 14, 2, 3)],
    mots_title='MOTS DU CORAN : CLAIR OU FONDU ?', mots_field='Le lâm :',
    exos=[dict(title='Clair ou fondu ?', instr='Classez ces exemples selon le lâm.', kind='classer',
               data=([plain_ar(x) for x in (h(112, 1, 1, 2, 'ل'), h(17, 24, 7, 8, 'ل'), h(87, 16, 1, 2, 'ل'), h(79, 18, 2, 3, 'ل'), h(37, 18, 1, 2, 'ل'))], ['Lâm clair', 'Lâm fondu']),
               corr=['Clair : قُلْ هُوَ • بَلْ تُؤْثِرُونَ • قُلْ نَعَمْ • Fondu : وَقُل رَّبِّ • هَل لَّكَ.']),
          dict(title='Je choisis', kind='qcm', data=[('Le lâm de l’article est fondu devant…', ['les lettres solaires', 'les lettres lunaires', 'toutes les lettres']), ('Dans قُلْ نَعَمْ, le lâm est…', ['clair', 'fondu dans le noûn', 'muet'])],
               corr=['1. a) les lettres solaires • 2. a) clair.'])],
    jeu=('Soleil ou lune ?', 'En classe.', 'Le meneur dit un mot avec l’article ; les joueurs dessinent en l’air un soleil (lettre solaire, lâm fondu) ou un croissant de lune (lettre lunaire, lâm clair). Puis le meneur dit des exemples avec قُلْ, هَلْ ou بَلْ : « clair » ou « fondu » ?'),
    bilan=['Je distingue les lettres lunaires et solaires.', 'Je prononce clairement le lâm d’un verbe, sauf devant ل et ر.', 'Je connais la règle de hal et bal, et la sakta de بَلْۜ رَانَ.'],
    defi=('Récitez Al-Ikhlâṣ, Al-Falaq et An-Nâs en faisant entendre le lâm clair de قُلْ et les articles lunaires et solaires.', False),
    cahier=[dict(title='Je complète', kind='bul', data=['Les lettres lunaires sont réunies dans : ……………………… .', 'Le lâm d’un verbe se fond seulement devant ……… et ……… .', 'Dans بَلْۜ رَانَ, Ḥafṣ fait une ……… .'],
                 corr=['أَبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ • ل et ر • sakta (petite pause sans respirer).']),
            dict(title='Je classe les articles', instr='Classez ces mots selon le lâm de l’article.', kind='classer', data=([W(*x) for x in QW[3:6] + SW[3:6]], ['Lunaire (lâm clair)', 'Solaire (lâm fondu)']),
                 corr=['Lunaires : les trois premiers mots • Solaires : les trois derniers.'])],
    mini=[('Le lâm de l’article est **clair** devant…', ['les lettres lunaires', 'les lettres solaires', 'le râ’']),
          ('Dans وَقُل رَّبِّ, le lâm…', ['se fond dans le râ’', 'est clair', 'devient noûn']),
          ('Dans قُلْ نَعَمْ, le lâm…', ['est clair', 'se fond dans le noûn', 'est caché']),
          ('Dans بَلْۜ رَانَ, Ḥafṣ fait…', ['une sakta, sans idghâm', 'un idghâm', 'un ikhfâ’'])],
    cards=[('أَبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ', 'les 14 lettres lunaires (lâm de l’article clair)'), ('lâm d’un verbe, hal, bal', 'clair, sauf devant ل et ر')])

L23 = lesson(e=E, n=23, title='Lettres identiques, sœurs et voisines', ar='قَد تَّبَيَّنَ',
    obj=['fondre deux **lettres identiques** (mithlayn) ;', 'fondre deux **lettres sœurs** (moutajânisayn) dans les cas du Coran ;', 'connaître les **lettres voisines** (moutaqâribayn) qui se fondent.'],
    dec=[('t', 'Quand une lettre **sans voyelle** est suivie d’une lettre qui lui ressemble, la première peut entrer dans la seconde : c’est l’**idghâm** (fusion). Le Mouss-haf l’annonce : la première lettre n’a **pas de soukoun**, la seconde porte une **chadda**.'),
         ('g', ['Les deux lettres sont…', 'Ce que c’est', 'Exemples'],
          [['**identiques** (mithlayn)', 'la même lettre deux fois : on fond toujours', ('AR', h(21, 87, 3, 4, 'ذ') + '  ' + h(2, 60, 6, 7, 'ب') + '  ' + h(2, 16, 7, 8, 'ت'), 34)],
           ['**sœurs** (moutajânisayn)', 'même point de sortie, qualités différentes', ('AR', h(2, 256, 5, 6, 'د') + '  ' + h(3, 69, 1, 2, 'ت') + '  ' + h(11, 42, 14, 15, 'ب'), 34)],
           ['**voisines** (moutaqâribayn)', 'points de sortie proches', ('AR', h(17, 24, 7, 8, 'ل') + '  ' + h(77, 20, 2, 2, 'ق'), 34)]],
          [2800, 3300, 4046], ['left', 'left', 'center']),
         ('d', 'Les lettres sœurs dans le Coran'),
         ('g', ['Rencontre', 'Exemple', 'Je dis'],
          [['د + ت', ('AR', h(2, 256, 5, 6, 'د'), 40), 'qat-tabayyana'], ['ت + ط', ('AR', h(3, 69, 1, 2, 'ت'), 40), 'waddaṭ-ṭâ’ifa'], ['ت + د', ('AR', h(10, 89, 3, 4, 'ت'), 40), 'oujîbad-da‘watoukoumâ'],
           ['ذ + ظ', ('AR', h(4, 64, 11, 12, 'ذ'), 40), 'iẓ-ẓalamoû'], ['ث + ذ', ('AR', h(7, 176, 20, 21, 'ث'), 40), 'yalhadh-dhâlika'], ['ب + م', ('AR', h(11, 42, 14, 15, 'ب'), 40), 'irkam-ma‘anâ']],
          [2000, 4000, 4146], ['center', 'center', 'left']),
         ('tip', 'attention', 'Une fusion incomplète', ['Dans ' + W(5, 28, 2) + ' (Al-Mâ’ida, 28) et ' + W(27, 22, 5) + ' (An-Naml, 22), le ṭâ’ entre dans le tâ’ mais on garde son **épaisseur** : la langue se colle pour le ṭâ’ et l’on prononce un tâ’, sans relâcher l’épaisseur.']),
         ('t', 'Dans ' + W(77, 20, 1) + ' ' + W(77, 20, 2) + ' (Al-Moursalât, 20), le qâf entre dans le kâf : on dit le plus souvent « nakhloukkoum », en fusion complète.')],
    ecoute=['Écoutez ' + W(2, 256, 5) + ' ' + W(2, 256, 6) + ' : le dâl a disparu, on entend un tâ’ doublé. Écoutez ' + W(5, 28, 2) + ' : le ṭâ’ laisse une couleur épaisse avant le tâ’.'],
    ret=['Lettre sans voyelle + lettre **identique**, **sœur** ou **voisine** → souvent **idghâm**.', 'Le Mouss-haf l’annonce : pas de soukoun sur la première, chadda sur la seconde.', 'Fusion incomplète dans بَسَطتَّ / أَحَطتُ : on garde l’épaisseur du ṭâ’.'],
    lis=[[h(21, 87, 3, 4, 'ذ'), h(2, 60, 6, 7, 'ب'), h(2, 16, 7, 8, 'ت'), h(5, 61, 5, 6, 'د')], [h(2, 256, 5, 6, 'د'), h(3, 69, 1, 2, 'ت'), h(10, 89, 3, 4, 'ت'), h(4, 64, 11, 12, 'ذ')],
         [h(7, 176, 20, 21, 'ث'), h(11, 42, 14, 15, 'ب'), h(17, 24, 7, 8, 'ل'), h(77, 20, 2, 2, 'ق')], [W(5, 28, 2), W(27, 22, 5), W(39, 56, 7)]],
    lis_corr=['Ligne 1 : lettres identiques. Ligne 2 : lettres sœurs. Ligne 3 : sœurs (ث ذ, ب م) puis voisines (ل ر, ق ك). Ligne 4 : fusion incomplète, le ṭâ’ garde son épaisseur.'],
    mots=[H(2, 256, 5, 6, 'د'), H(3, 69, 1, 2, 'ت'), H(11, 42, 14, 15, 'ب'), H(21, 87, 3, 4, 'ذ'), H(77, 20, 2, 2, 'ق'), M(5, 28, 2)],
    mots_title='MOTS DU CORAN : LA FUSION', mots_field='Lettres :',
    exos=[dict(title='Je relie', kind='relier', data=(['identiques', 'sœurs', 'voisines', 'fusion incomplète'], ['قَد تَّبَيَّنَ', 'بَسَطتَ', 'إِذ ذَّهَبَ', 'وَقُل رَّبِّ']),
               corr=['identiques → C • sœurs → A • voisines → D • fusion incomplète → B.']),
          dict(title='Vrai ou faux ?', kind='vf', data=['Deux lettres identiques, la première sans voyelle, se fondent.', 'Dans بَسَطتَ, le ṭâ’ disparaît complètement.', 'Les lettres sœurs ont le même point de sortie.'],
               corr=['1. Vrai. • 2. Faux : on garde son épaisseur. • 3. Vrai.'])],
    jeu=('Les jumelles', 'En famille.', 'Préparez des cartes avec les exemples de « Je lis ». Chacun tire une carte, la lit à voix haute et dit si les deux lettres sont « jumelles » (identiques), « sœurs » ou « voisines ». Une bonne lecture et une bonne réponse rapportent deux points.'),
    bilan=['Je fonds deux lettres identiques.', 'Je connais les fusions des lettres sœurs dans le Coran.', 'Je garde l’épaisseur du ṭâ’ dans بَسَطتَ et أَحَطتُ.'],
    defi=('Lisez les quatre lignes de « Je lis » sans erreur, puis trouvez dans votre Mouss-haf un autre exemple de lettres identiques qui se fondent.', False),
    cahier=[dict(title='Je complète', kind='bul', data=['Deux lettres de même point de sortie et de qualités différentes sont des lettres ……… .', 'Dans قَد تَّبَيَّنَ, le ……… entre dans le tâ’.', 'Dans أَحَطتُ, on garde l’……… du ṭâ’.'], corr=['sœurs • dâl • épaisseur.']),
            dict(title='Je recopie', instr='Recopiez trois exemples d’idghâm de ce chapitre et soulignez les deux lettres qui se rencontrent.', kind='write', data=2, corr=['Par exemple : إِذ ذَّهَبَ • قَد تَّبَيَّنَ • ٱرْكَب مَّعَنَا.'])],
    mini=[('Dans قَد تَّبَيَّنَ, le dâl…', ['entre dans le tâ’', 'est clair', 'devient noûn']),
          ('Deux lettres de **même point de sortie** et de qualités différentes sont…', ['sœurs (moutajânisayn)', 'identiques (mithlayn)', 'voisines (moutaqâribayn)']),
          ('Dans بَسَطتَ, on garde…', ['l’épaisseur du ṭâ’', 'le ṭâ’ entier', 'une ghounna'])],
    cards=[('mithlayn', 'deux lettres identiques : idghâm'), ('moutajânisayn', 'lettres sœurs (même point de sortie)'), ('moutaqâribayn', 'lettres voisines (points proches)')])

L24 = lesson(e=E, n=24, title='Je récite et je repère les rencontres', ar='أَلَمْ نَخْلُقكُّمْ',
    obj=['repérer les rencontres de lettres dans une sourate ;', 'distinguer idghâm et iẓhâr dans les cas difficiles ;', 'réciter Al-‘Alaq (versets 1 à 8) en appliquant les règles des étapes 4 à 6.'],
    dec=[('t', 'Dans une récitation suivie, les règles se mêlent : noûn sâkin, mîm sâkin, lâm, lettres qui se fondent. Le Mouss-haf aide toujours : **chadda** sur la lettre suivante = fusion ; **soukoun** visible = lettre claire.'),
         ('g', ['Je vois…', 'Je fais…', 'Exemple'],
          [['soukoun sur la lettre', 'je la prononce clairement', ('AR', W(96, 1, 1), 40)], ['pas de soukoun + chadda sur la suivante', 'je fonds', ('AR', h(17, 24, 7, 8, 'ل'), 40)], ['petit sîn ( ۜ )', 'je fais une sakta', ('AR', W(83, 14, 2) + ' ' + W(83, 14, 3), 40)]],
          [3700, 3000, 3446], ['left', 'left', 'center']),
         ('d', 'Al-‘Alaq, versets 1 à 8'),
         ('t', 'Lisez les huit premiers versets, révélés en premier au Prophète ﷺ. Repérez les lettres sans voyelle, les articles, les noûns et les mîms : chacun a sa règle.')],
    ecoute=['Écoutez les versets 1 à 8 d’Al-‘Alaq. Après chaque verset, arrêtez l’écoute et nommez à voix haute une règle entendue.'],
    ret=['Chadda sur la lettre suivante → fusion ; soukoun visible → clarté.', 'Ḥafṣ : sakta dans بَلْۜ رَانَ et مَنْۜ رَاقٖ.', 'Je repère, je nomme, j’applique.'],
    lis=[V(96, k) for k in range(1, 9)], lis_sz=44,
    lis_corr=['V. 1 : ٱقْرَأْ (qalqala du qâf) ; ٱلَّذِي (lâm solaire). • V. 2 : ٱلْإِنسَٰنَ (lâm lunaire, ikhfâ’ du noûn) ; مِنْ عَلَقٍ (iẓhâr). • V. 4 : ٱلَّذِي, عَلَّمَ (lâm doublé). • V. 5 : ٱلْإِنسَٰنَ (ikhfâ’) ; مَا لَمْ يَعْلَمْ (iẓhâr chafawî du mîm de لَمْ devant le yâ’). • V. 6 : كَلَّآ إِنَّ ٱلْإِنسَٰنَ (ghounna de إِنَّ). • V. 7 : أَن رَّءَاهُ (idghâm sans ghounna). • V. 8 : إِنَّ (ghounna), إِلَىٰ رَبِّكَ (râ’ épais).'],
    mots=[M(96, 1, 1), M(96, 2, 3, 4, pred=P_NOON), M(96, 5, 4, 5, pred=P_MEEM), M(96, 6, 2), M(96, 8, 1), M(96, 4, 2)],
    mots_title='MOTS DU CORAN : AL-‘ALAQ', mots_field='La règle :',
    mots_corr=['ٱقْرَأْ : qalqala du qâf • مِنْ عَلَقٍ : iẓhâr du noûn • لَمْ يَعْلَمْ : iẓhâr chafawî • إِنَّ : ghounna de deux temps • إِنَّ (v. 8) : ghounna • عَلَّمَ : lâm doublé, sans ghounna.'],
    exos=[dict(title='Je cherche dans Al-‘Alaq', instr='Dans les versets 1 à 8, trouvez et recopiez : un lâm solaire • un lâm lunaire • un noûn sâkin en iẓhâr • une qalqala.', kind='write', data=3,
               corr=['Lâm solaire : ٱلَّذِي • lâm lunaire : ٱلْإِنسَٰنَ, ٱلْأَكْرَمُ • iẓhâr : مِنْ عَلَقٍ • qalqala : ٱقْرَأْ.']),
          dict(title='Je choisis', kind='qcm', data=[('Dans ٱلَّذِي, le lâm de l’article…', ['n’est pas prononcé (solaire)', 'est clair', 'a une ghounna']), ('Dans مِنْ عَلَقٍ, le noûn est…', ['clair (iẓhâr)', 'caché (ikhfâ’)', 'fondu'])],
               corr=['1. a) solaire • 2. a) iẓhâr (le ‘ayn est une lettre de la gorge).'])],
    jeu=('Le rallye des règles', 'En équipes.', 'Chaque équipe reçoit un verset d’Al-‘Alaq écrit en grand. Elle colle une gommette jaune sur chaque lettre qui déclenche une règle et dit la règle. L’équipe qui trouve le plus de règles justes gagne, à condition de réciter son verset sans erreur.'),
    bilan=['Je repère les rencontres de lettres dans un passage.', 'Je distingue fusion et clarté grâce aux signes du Mouss-haf.', 'Je récite Al-‘Alaq 1–8 avec les règles des étapes 4 à 6.'],
    defi=('Récitez les versets 1 à 8 d’Al-‘Alaq devant votre enseignant, puis expliquez trois règles de votre choix.', False),
    cahier=[dict(title='J’analyse un verset', instr='Recopiez le verset 5 d’Al-‘Alaq et écrivez sous chaque mot la règle qu’il contient.', kind='write', data=3,
                 corr=['عَلَّمَ : lâm doublé • ٱلْإِنسَٰنَ : lâm lunaire, ikhfâ’ du noûn devant le sîn • مَا : madd naturel • لَمْ يَعْلَمْ : iẓhâr chafawî ; à l’arrêt, mîm sans voyelle.']),
            dict(title='Vrai ou faux ?', kind='vf', data=['Dans عَلَّمَ, le lâm doublé a une ghounna.', 'Une chadda sur la lettre suivante annonce souvent une fusion.', 'Le petit sîn ( ۜ ) annonce une sakta.'], corr=['1. Faux (seuls noûn et mîm). • 2. Vrai. • 3. Vrai.'])],
    mini=[('Une **chadda** sur la lettre suivante annonce…', ['une fusion (idghâm)', 'une lettre claire', 'un arrêt']),
          ('Le petit sîn ( ۜ ) annonce…', ['une sakta', 'un madd', 'une ghounna']),
          ('Dans ٱلَّذِي, le lâm de l’article est…', ['solaire : non prononcé', 'lunaire : clair', 'épais'])],
    cards=[('chadda sur la lettre suivante', 'fusion (idghâm)'), ('soukoun visible', 'lettre claire')])

ETAPE = dict(n=6, title='Quand deux lettres se rencontrent', ar='إِدْغَامٌ', aim='Reconnaître les lettres qui se fondent et celles qui restent claires.',
    intro=['Une lettre sans voyelle et la lettre qui la suit peuvent se fondre (idghâm) ou rester séparées (iẓhâr). Cette étape réunit les cas du lâm et ceux des lettres identiques, sœurs et voisines.'],
    lessons=[L22, L23, L24],
    bilan=['Je distingue lettres lunaires et solaires.', 'Je connais la règle du lâm d’un verbe et de hal / bal.', 'Je fonds les lettres identiques, sœurs et voisines dans les cas du Coran.', 'Je récite Al-‘Alaq 1–8 en appliquant ces règles.'],
    bilan_lis=[V(96, 1) + '  ' + V(96, 2) + '  ' + V(96, 3), V(96, 4) + '  ' + V(96, 5)],
    defi='Récitez Al-‘Alaq 1–8 devant votre enseignant ; il vous montrera trois rencontres de lettres et vous direz la règle.',
    vigilance=['Lâm de قُلْ devant le noûn : clair (قُلْ نَعَمْ).', 'Fusion incomplète de بَسَطتَ : garder l’épaisseur.', 'Sakta de Ḥafṣ : بَلْۜ رَانَ, مَنْۜ رَاقٖ.'],
    jeu_conseille='Soleil ou lune ? (leçon 22) et le rallye des règles (leçon 24).',
    duree='3 leçons + 1 séance de révision et de bilan')
