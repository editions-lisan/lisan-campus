# Étape 10 — Je récite le Coran
from ctx import *
E = 10

def verses(s): return [V(s, a) for a in range(1, len(Q[s - 1]['verses']) + 1)]

def sura_lesson(n, title, ar, suras, intro, table, lis_corr, mots, exos, jeu, defi, cahier, mini, cards):
    lis = []
    for s in suras: lis += verses(s)
    return lesson(e=E, n=n, title=title, ar=ar,
        obj=['réciter ' + ' et '.join(SURAS_FR[s] for s in suras) + ' au rythme **tadwîr** ;', 'repérer et nommer les règles de **chaque verset** ;', 'appliquer toutes les règles des étapes 1 à 9.'],
        dec=[('t', intro), ('g', ['Verset', 'Ce que je repère', 'Règle'], table, [2000, 3900, 4246], ['left', 'center', 'left']),
             ('tip', 'decouvre', 'Méthode', ['1. J’écoute la sourate en entier. 2. Je lis chaque verset lentement (taḥqîq) en nommant les règles. 3. Je récite en tadwîr. 4. Je me fais écouter.'])],
        ecoute=['Écoutez chaque verset avec le lien « Écouter », puis répétez-le en imitant al-Ḥouṣarî : arrêts, ghounnas, madd et lettres épaisses.'],
        ret=['Je repère la règle, je la nomme, je l’applique.', 'Je garde mes durées (madd, ghounna) égales dans toute la sourate.', 'Je m’arrête en fin de verset avec les règles de l’arrêt.'],
        lis=lis, lis_sz=42, lis_title='JE LIS : LA SOURATE', lis_corr=lis_corr, mots=mots, mots_title='MOTS DU CORAN : LES RÈGLES DE LA SOURATE', mots_field='La règle :',
        exos=exos, jeu=jeu, bilan=['Je récite la sourate sans erreur claire.', 'Je nomme les règles de chaque verset.', 'J’applique les durées et les arrêts.'], defi=(defi, False), cahier=cahier, mini=mini, cards=cards)

from suras import SURAS as SURAS_FR

L37 = sura_lesson(37, 'Aḍ-Ḍouḥâ et Ach-Charḥ', 'وَٱلضُّحَىٰ', [93, 94],
    'Aḍ-Ḍouḥâ (« Le jour montant ») console le Prophète ﷺ ; Ach-Charḥ (« L’ouverture ») lui rappelle qu’« avec la difficulté vient la facilité ». Deux sourates mecquoises, riches en râ’ et en madd.',
    [['Aḍ-Ḍouḥâ 4', ('AR', W(93, 4, 2) + ' ' + W(93, 4, 3), 34), 'idghâm sans ghounna (tanwîn + lâm)'], ['Aḍ-Ḍouḥâ 6, 7, 8', ('AR', W(93, 6, 3) + ' ' + W(93, 6, 4), 34), 'ikhfâ’ (tanwîn + fâ’)'],
     ['Aḍ-Ḍouḥâ 7', ('AR', W(93, 7, 2), 34), 'madd lâzim, six temps'], ['Aḍ-Ḍouḥâ 8, 10', ('AR', W(93, 8, 2) + '  ' + W(93, 10, 2), 34), 'madd joint, 4 ou 5 temps'],
     ['Aḍ-Ḍouḥâ 9, 10', ('AR', W(93, 9, 4) + '  ' + W(93, 10, 4), 34), 'râ’ épais à l’arrêt ; iẓhâr du noûn dans تَنْهَرْ'], ['Ach-Charḥ 2, 3, 7', ('AR', W(94, 2, 2) + '  ' + W(94, 3, 2) + '  ' + W(94, 7, 3), 34), 'ikhfâ’ du noûn dans un mot'],
     ['Ach-Charḥ 3', ('AR', W(94, 3, 1) + ' ' + W(94, 3, 2), 34), 'madd séparé'], ['Ach-Charḥ 5, 6', ('AR', W(94, 5, 3) + '  ' + W(94, 5, 4), 34), 'râ’ fin (kasra) ; râ’ épais (fatḥa) et madd de compensation à l’arrêt'],
     ['Ach-Charḥ 7, 8', ('AR', W(94, 7, 3) + '  ' + W(94, 8, 3), 34), 'qalqala du bâ’ à l’arrêt']],
    ['Aḍ-Ḍouḥâ : à chaque fin de verset, madd ‘âriḍ égal ; v. 4 idghâm sans ghounna ; v. 6-8 ikhfâ’ ; v. 7 madd lâzim de ضَآلّٗا ; v. 11 qalqala ? non : ثْ est soufflé, sans qalqala.',
     'Ach-Charḥ : râ’ épais de صَدْرَكَ, وِزْرَكَ, ظَهْرَكَ, ذِكْرَكَ ; v. 5-6 ghounna de إِنَّ et ikhfâ’ absent ; v. 7-8 qalqala du bâ’ à l’arrêt.'],
    [M(93, 4, 2, 3, pred=P_NOON), M(93, 7, 2, note='madd lâzim'), M(93, 8, 2, note='madd joint'), M(94, 2, 2, pred=P_NOON), M(94, 3, 1, 2, note='madd séparé'), M(94, 8, 3, note='qalqala à l’arrêt')],
    [dict(title='Je trouve dans Aḍ-Ḍouḥâ', instr='Trouvez et recopiez : un madd lâzim • un madd joint • un idghâm sans ghounna • un ikhfâ’.', kind='write', data=3,
          corr=['Madd lâzim : ضَآلّٗا • madd joint : عَآئِلٗا, ٱلسَّآئِلَ • idghâm sans ghounna : خَيْرٞ لَّكَ • ikhfâ’ : يَتِيمٗا فَـَٔاوَىٰ, ضَآلّٗا فَهَدَىٰ, عَآئِلٗا فَأَغْنَىٰ.']),
     dict(title='Épais ou fin ?', instr='Classez les râ’ d’Ach-Charḥ (lus à l’arrêt en fin de verset).', kind='classer', data=([W(94, 1, 4), W(94, 5, 3), W(94, 5, 4), W(94, 8, 2)], ['Râ’ épais', 'Râ’ fin']),
          corr=['Épais : صَدْرَكَ (fatḥa) • يُسْرًا (fatḥa) • Fin : ٱلْعُسْرِ (kasra) • رَبِّكَ (fatḥa : épais !) — attention, رَبِّكَ est épais.'])],
    ('La récitation en chaîne', 'En classe.', 'Chaque élève récite un verset d’Aḍ-Ḍouḥâ, puis le suivant enchaîne. Avant de réciter, il annonce une règle de son verset. Un verset sans erreur et une règle juste rapportent deux points à l’équipe.'),
    'Récitez Aḍ-Ḍouḥâ et Ach-Charḥ par cœur ou dans le Mouss-haf devant votre enseignant, en tadwîr, sans erreur claire.',
    [dict(title='J’analyse Ach-Charḥ', instr='Pour chaque verset d’Ach-Charḥ, écrivez une règle que vous y entendez.', kind='write', data=4,
          corr=['v. 1 : râ’ épais (صَدْرَكَ) • v. 2 : ikhfâ’ (عَنكَ) • v. 3 : madd séparé (ٱلَّذِيٓ أَنقَضَ) et ikhfâ’ • v. 4 : râ’ épais • v. 5-6 : ghounna de إِنَّ, madd de compensation à l’arrêt • v. 7 : ikhfâ’ (فَٱنصَبْ), qalqala • v. 8 : qalqala à l’arrêt.'])],
    [('Dans ضَآلّٗا (Aḍ-Ḍouḥâ, 7), le madd est…', ['lâzim : six temps', 'naturel : deux temps', 'séparé']), ('Dans خَيْرٞ لَّكَ, on fait…', ['un idghâm sans ghounna', 'un iẓhâr', 'un ikhfâ’']),
     ('À l’arrêt sur فَٱرْغَب, on fait…', ['une qalqala du bâ’', 'une ghounna', 'un madd'])],
    [('Aḍ-Ḍouḥâ', 'ضَآلّٗا : madd lâzim ; خَيْرٞ لَّكَ : idghâm sans ghounna'), ('Ach-Charḥ', 'râ’ épais de صَدْرَكَ ; qalqala de فَٱنصَبْ et فَٱرْغَب')])

L38 = sura_lesson(38, 'At-Tîn, Al-Qadr et Az-Zalzala', 'وَٱلتِّينِ', [95, 97, 99],
    'At-Tîn rappelle que l’homme a été créé « dans la plus belle forme » ; Al-Qadr décrit la Nuit du Destin ; Az-Zalzala annonce le tremblement du Jour dernier et le poids de chaque action.',
    [['At-Tîn 4', ('AR', W(95, 4, 4) + ' ' + W(95, 4, 5), 34), 'madd séparé'], ['At-Tîn 6', ('AR', W(95, 6, 7) + ' ' + W(95, 6, 8) + '  ' + W(95, 6, 8) + ' ' + W(95, 6, 9), 34), 'iẓhâr chafawî ; iẓhâr du tanwîn (ghayn)'],
     ['At-Tîn 8', ('AR', W(95, 8, 1) + ' ' + W(95, 8, 2), 34), 'lâm d’Allah épais'], ['Al-Qadr 3', ('AR', W(97, 3, 3) + ' ' + W(97, 3, 4) + '  ' + W(97, 3, 4) + ' ' + W(97, 3, 5), 34), 'idghâm avec ghounna ; iẓhâr'],
     ['Al-Qadr 4', ('AR', W(97, 4, 6) + ' ' + W(97, 4, 7) + '  ' + W(97, 4, 7) + ' ' + W(97, 4, 8), 34), 'idghâm du mîm ; ikhfâ’'], ['Az-Zalzala 4, 6', ('AR', W(99, 4, 1) + ' ' + W(99, 4, 2) + '  ' + W(99, 6, 1) + ' ' + W(99, 6, 2), 34), 'ikhfâ’ ; idghâm avec ghounna'],
     ['Az-Zalzala 6', ('AR', W(99, 6, 4) + ' ' + W(99, 6, 5), 34), 'idghâm sans ghounna'], ['Az-Zalzala 7', ('AR', W(99, 7, 1) + ' ' + W(99, 7, 2) + '  ' + W(99, 7, 4) + ' ' + W(99, 7, 5), 34), 'idghâm avec ghounna ; iẓhâr'],
     ['Az-Zalzala 8', ('AR', W(99, 8, 4) + ' ' + W(99, 8, 5), 34), 'ikhfâ’']],
    ['At-Tîn : fins de verset en madd ‘âriḍ (ٱلزَّيْتُونِ, سِينِينَ, ٱلْأَمِينِ…), ghounna de ثُمَّ, madd séparé فِيٓ أَحْسَنِ, lâm d’Allah épais (v. 8).',
     'Al-Qadr : madd séparé (v. 1-2), idghâm avec ghounna خَيْرٞ مِّنْ, idghâm du mîm رَبِّهِم مِّن, ikhfâ’ مِّن كُلِّ, madd joint ٱلْمَلَـٰٓئِكَةُ.',
     'Az-Zalzala : ikhfâ’ et idghâm (v. 4, 6-8), madd ṣila arrêtée sur يَرَهُۥ : « yarah ».'],
    [M(95, 4, 4, 5, note='madd séparé'), M(95, 8, 1, 2, note='lâm épais'), M(97, 3, 3, 4, pred=P_NOON), M(97, 4, 6, 7, pred=P_MEEM), M(99, 6, 4, 5, pred=P_NOON), M(99, 7, 1, 2, pred=P_NOON)],
    [dict(title='Je trouve dans Az-Zalzala', instr='Recopiez deux exemples d’idghâm avec ghounna, un idghâm sans ghounna et un ikhfâ’.', kind='write', data=3,
          corr=['Avec ghounna : يَوْمَئِذٖ يَصْدُرُ, فَمَن يَعْمَلْ, خَيْرٗا يَرَهُۥ • Sans ghounna : أَشْتَاتٗا لِّيُرَوْاْ • Ikhfâ’ : يَوْمَئِذٖ تُحَدِّثُ, ذَرَّةٖ شَرّٗا, ٱلْإِنسَٰنُ.']),
     dict(title='Vrai ou faux ?', kind='vf', data=['Dans أَلَيْسَ ٱللَّهُ, le lâm d’Allah est fin.', 'Dans خَيْرٞ مِّنْ, on fait un idghâm avec ghounna.', 'Dans مِّنْ أَلْفِ, le noûn est clair.'], corr=['1. Faux : épais (fatḥa avant). • 2. Vrai. • 3. Vrai (iẓhâr).'])],
    ('Le tribunal des règles', 'En classe.', 'Un élève récite un verset d’Az-Zalzala ; un « juge » note les règles appliquées ; un « avocat » doit défendre la récitation en nommant chaque règle. Le public vote : récitation « juste » ou « à revoir ».'),
    'Récitez At-Tîn, Al-Qadr et Az-Zalzala devant votre enseignant, en tadwîr, sans erreur claire.',
    [dict(title='J’analyse Al-Qadr', instr='Pour chaque verset d’Al-Qadr, écrivez au moins une règle.', kind='write', data=4,
          corr=['v. 1 : madd séparé, ikhfâ’ (أَنزَلْنَٰهُ) • v. 2 : madd séparé • v. 3 : idghâm avec ghounna, iẓhâr • v. 4 : madd joint, idghâm du mîm, ikhfâ’ • v. 5 : iẓhâr (سَلَٰمٌ هِيَ), râ’ épais à l’arrêt (ٱلْفَجْرِ).'])],
    [('Dans يَوْمَئِذٖ تُحَدِّثُ, on fait…', ['un ikhfâ’', 'un iẓhâr', 'un iqlâb']), ('Dans رَبِّهِم مِّن, on fait…', ['un idghâm du mîm', 'un iẓhâr chafawî', 'un ikhfâ’ chafawî']),
     ('Dans أَشْتَاتٗا لِّيُرَوْاْ, on fait…', ['un idghâm sans ghounna', 'un idghâm avec ghounna', 'un ikhfâ’'])],
    [('At-Tîn', 'فِيٓ أَحْسَنِ : madd séparé ; أَلَيْسَ ٱللَّهُ : lâm épais'), ('Az-Zalzala', 'idghâm avec et sans ghounna, ikhfâ’')])

L39 = sura_lesson(39, 'Al-‘Âdiyât et Al-Qâri‘a', 'وَٱلْعَٰدِيَٰتِ', [100, 101],
    'Al-‘Âdiyât (« Les coursiers ») décrit l’ingratitude de l’homme ; Al-Qâri‘a (« Le fracas ») décrit le Jour dernier et la balance des actions. Deux sourates au rythme puissant, pleines de qalqala et d’arrêts.',
    [['Al-‘Âdiyât 1-5', ('AR', W(100, 1, 2) + '  ' + W(100, 4, 3), 34), 'madd de compensation à l’arrêt ; qalqala du qâf (نَقْعٗا)'], ['Al-‘Âdiyât 6-8', ('AR', W(100, 6, 4) + '  ' + W(100, 8, 4), 34), 'qalqala du dâl à l’arrêt'],
     ['Al-‘Âdiyât 7', ('AR', W(100, 7, 1) + ' ' + W(100, 7, 2), 34), 'ṣila courte (hâ’ entre deux voyelles)'], ['Al-‘Âdiyât 11', ('AR', W(100, 11, 2) + ' ' + W(100, 11, 3), 34), 'ikhfâ’ chafawî'],
     ['Al-‘Âdiyât 11', ('AR', W(100, 11, 4) + ' ' + W(100, 11, 5), 34), 'idghâm sans ghounna'], ['Al-Qâri‘a 1-3', ('AR', W(101, 1, 1), 34), 'tâ’ marboûṭa → hâ’ à l’arrêt'],
     ['Al-Qâri‘a 6, 8', ('AR', W(101, 6, 2) + ' ' + W(101, 6, 3) + '  ' + W(101, 8, 2) + ' ' + W(101, 8, 3), 34), 'ikhfâ’ ; iẓhâr'], ['Al-Qâri‘a 7', ('AR', W(101, 7, 3) + ' ' + W(101, 7, 4), 34), 'idghâm sans ghounna'],
     ['Al-Qâri‘a 9', ('AR', W(101, 9, 1) + ' ' + W(101, 9, 2), 34), 'ghounna du mîm doublé ; ṣila courte'], ['Al-Qâri‘a 11', ('AR', W(101, 11, 1) + ' ' + W(101, 11, 2), 34), 'iẓhâr (tanwîn + ḥâ’)']],
    ['Al-‘Âdiyât : madd de compensation à l’arrêt (ضَبْحَا, قَدْحَا, صُبْحَا, نَقْعَا, جَمْعَا) ; qalqala de لَكَنُودْ, لَشَهِيدْ, لَشَدِيدْ ; v. 11 ikhfâ’ chafawî et idghâm sans ghounna.',
     'Al-Qâri‘a : arrêt en « h » sur ٱلْقَارِعَةُ ; v. 6 ikhfâ’ ; v. 7 idghâm sans ghounna ; v. 8 iẓhâr ; v. 10 madd séparé وَمَآ أَدْرَىٰكَ ; v. 11 iẓhâr.'],
    [M(100, 4, 3, note='qalqala, compensation'), M(100, 11, 2, 3, pred=P_MEEM), M(100, 11, 4, 5, pred=P_NOON), M(101, 6, 2, 3, pred=P_NOON), M(101, 7, 3, 4, pred=P_NOON), M(101, 11, 1, 2, pred=P_NOON)],
    [dict(title='Je classe', instr='Classez ces exemples d’Al-Qâri‘a selon la règle du noûn ou du tanwîn.', kind='classer',
          data=([W(101, 6, 2) + ' ' + W(101, 6, 3), W(101, 7, 3) + ' ' + W(101, 7, 4), W(101, 8, 2) + ' ' + W(101, 8, 3), W(101, 11, 1) + ' ' + W(101, 11, 2)], ['Iẓhâr', 'Idghâm', 'Ikhfâ’']),
          corr=['Iẓhâr : مَنْ خَفَّتْ • نَارٌ حَامِيَةُۢ • Idghâm : عِيشَةٖ رَّاضِيَةٖ • Ikhfâ’ : مَن ثَقُلَتْ.']),
     dict(title='Je choisis', kind='qcm', data=[('À l’arrêt sur ضَبْحٗا, je dis…', ['ḍabḥâ', 'ḍabḥan', 'ḍabḥ']), ('Dans رَبَّهُم بِهِمْ, on fait…', ['un ikhfâ’ chafawî', 'un iẓhâr chafawî', 'un idghâm'])],
          corr=['1. a) ḍabḥâ • 2. a) un ikhfâ’ chafawî.'])],
    ('Le grand défi', 'En classe.', 'Les élèves récitent Al-Qâri‘a à tour de rôle, un verset chacun, en se tenant debout. Une erreur claire fait asseoir le récitant, qui peut se relever en nommant correctement une règle du verset suivant. Les derniers debout gagnent.'),
    'Récitez Al-‘Âdiyât et Al-Qâri‘a devant votre enseignant, en tadwîr, sans erreur claire.',
    [dict(title='J’analyse Al-‘Âdiyât', instr='Relevez dans Al-‘Âdiyât : trois qalqala • deux madd de compensation • une ṣila courte • un ikhfâ’ chafawî.', kind='write', data=3,
          corr=['Qalqala : نَقْعٗا, لَكَنُودٞ, لَشَهِيدٞ, لَشَدِيدٌ (à l’arrêt) • compensation : ضَبْحٗا, قَدْحٗا… • ṣila : وَإِنَّهُۥ عَلَىٰ • ikhfâ’ chafawî : رَبَّهُم بِهِمْ.'])],
    [('Dans عِيشَةٖ رَّاضِيَةٖ, on fait…', ['un idghâm sans ghounna', 'un iẓhâr', 'un ikhfâ’']), ('À l’arrêt sur ٱلْقَارِعَةُ, je dis…', ['al-qâri‘ah', 'al-qâri‘atou', 'al-qâri‘a']),
     ('Dans لَكَنُودٞ à l’arrêt, on fait…', ['une qalqala du dâl', 'une ghounna', 'un madd lâzim'])],
    [('Al-‘Âdiyât', 'qalqala à l’arrêt ; ikhfâ’ chafawî رَبَّهُم بِهِمْ'), ('Al-Qâri‘a', 'arrêt en « h » ; iẓhâr, idghâm, ikhfâ’')])

RECAP = [['1', 'tajwîd, rythmes, isti‘âdha et basmala, erreurs'], ['2', 'les 17 points de sortie (makhârij)'], ['3', 'épaisses et fines, qalqala, souffle'],
         ['4', 'noûn sâkin et tanwîn : iẓhâr, idghâm, iqlâb, ikhfâ’'], ['5', 'mîm sâkin et ghounna'], ['6', 'lâm, lettres identiques, sœurs et voisines'],
         ['7', 'tafkhîm et tarqîq : lâm d’Allah, râ’'], ['8', 'madd : naturel, joint, séparé, ‘âriḍ, lîn, lâzim'], ['9', 'arrêt, signes de pause, particularités de Ḥafṣ'], ['10', 'récitation de sourates']]
L40 = lesson(e=E, n=40, title='Mon bilan final et mon attestation', ar='ٱقْرَأْ وَٱرْتَقِ',
    obj=['faire le point sur **toutes les règles** du livre ;', 'réciter devant mon enseignant pour l’**évaluation finale** ;', 'recevoir mon **attestation**.'],
    dec=[('t', 'Vous voici en haut de l’escalier ! Avant l’évaluation finale, relisez le tableau des dix étapes et, pour chaque ligne, citez un exemple de mémoire.'),
         ('g', ['Étape', 'Ce que j’ai appris'], RECAP, [1300, 8846], ['center', 'left']),
         ('d', 'L’évaluation finale'),
         ('b', ['**Récitation** : une sourate de l’étape 10 choisie par l’enseignant, en tadwîr.', '**Questions** : l’enseignant montre cinq passages ; je nomme la règle et je la justifie.', '**Arrêts** : je m’arrête et je reprends à trois endroits indiqués par l’enseignant.']),
         ('q', '« On dira au compagnon du Coran : lis, élève-toi et récite posément comme tu récitais dans le bas monde, car ta demeure sera au dernier verset que tu liras. »', 'Hadith rapporté par Abou Dâwoud et At-Tirmidhî', 'ٱقْرَأْ وَٱرْتَقِ وَرَتِّلْ')],
    ecoute=['Écoutez une dernière fois les sourates de l’étape 10, puis récitez-les seul, sans écouter, comme le jour de l’évaluation.'],
    ret=['Le tajwîd, c’est donner à chaque lettre son droit et son dû.', 'Toutes les règles se résument en trois questions : d’où sort la lettre ? comment sonne-t-elle ? que lui fait sa voisine ?', 'Le Coran s’apprend toute la vie : continuez à réciter devant un maître.'],
    lis=[V(1, 1), V(1, 2) + '  ' + V(1, 3) + '  ' + V(1, 4), V(1, 5) + '  ' + V(1, 6), V(1, 7), V(113, 1) + '  ' + V(113, 2) + '  ' + V(113, 3), V(113, 4) + '  ' + V(113, 5)], lis_sz=42,
    lis_title='JE LIS : MA RÉCITATION FINALE',
    lis_corr=['La Fâtiḥa : ḥâ’ soufflé, mîm net, madd ‘âriḍ égal à chaque fin de verset, chadda de إِيَّاكَ, ṣâd épais, ḍâd épais, six temps sur ٱلضَّآلِّينَ.', 'Al-Falaq : qalqala de ٱلْفَلَقِ et de وَقَبَ à l’arrêt, ikhfâ’ de مِن شَرِّ, idghâm de غَاسِقٍ إِذَا ? non : iẓhâr (hamza) ; ghounna de ٱلنَّفَّـٰثَٰتِ ? non : fâ’ doublé ; ikhfâ’ de حَاسِدٍ إِذَا ? non : iẓhâr.'],
    mots=[M(1, 7, 9, note='madd lâzim'), M(113, 1, 4, note='qalqala'), M(113, 3, 1, 2, pred=P_NOON), M(113, 5, 3, 4, pred=P_NOON), M(1, 5, 1, note='chadda'), M(1, 2, 1, note='ḥâ’ soufflé')],
    mots_title='MOTS DU CORAN : MA RÉVISION', mots_field='La règle :',
    exos=[dict(title='Mon tableau des règles', instr='Sans regarder le livre, complétez : noûn sâkin + ب → ……… • mîm sâkin + م → ……… • madd + hamza dans le même mot → ……… • râ’ + kasra → ……… • lâm d’Allah après ḍamma → ……… .', kind='write', data=2,
               corr=['iqlâb • idghâm du mîm • madd joint (4 ou 5) • fin • épais.']),
          dict(title='Je choisis', kind='qcm', data=[('Combien de points de sortie ?', ['dix-sept', 'cinq', 'vingt-huit']), ('Le madd lâzim dure…', ['six temps', 'deux temps', '4 ou 5 temps']), ('Dans بَلْۜ رَانَ, Ḥafṣ fait…', ['une sakta', 'un idghâm', 'un madd'])],
               corr=['1. a) dix-sept • 2. a) six temps • 3. a) une sakta.'])],
    jeu=('Le grand quiz du tajwîd', 'En classe ou en famille.', 'Préparez quarante cartes, une par leçon, avec une question au dos. Chaque joueur tire une carte, répond, puis lit un exemple du Coran pour cette règle. La première équipe qui atteint vingt points gagne.'),
    bilan=['Je connais les règles des dix étapes.', 'Je récite une sourate de l’étape 10 sans erreur claire.', 'Je nomme et je justifie les règles d’un passage.', 'Je m’arrête et je reprends correctement.'],
    defi=('Passez l’évaluation finale devant votre enseignant : récitation, questions et arrêts.', False),
    cahier=[dict(title='Mon évaluation finale (écrite)', instr='Répondez sans regarder le livre.', kind='qcm',
                 data=[('مِن شَرِّ : quelle règle ?', ['ikhfâ’', 'iẓhâr', 'iqlâb']), ('Le lâm de بِسْمِ ٱللَّهِ est…', ['fin', 'épais', 'muet']), ('Les lettres de la qalqala :', ['قُطْبُ جَدٍّ', 'يَرْمُلُونَ', 'خُصَّ ضَغْطٍ قِظْ']), ('À l’arrêt sur أَفْوَاجٗا :', ['afwâjâ', 'afwâjan', 'afwâj'])],
                 corr=['1. a) ikhfâ’ • 2. a) fin • 3. a) قُطْبُ جَدٍّ • 4. a) afwâjâ.'])],
    mini=[('Le tajwîd, c’est…', ['donner à chaque lettre son droit et son dû', 'réciter le plus vite possible', 'chanter le Coran']),
          ('Noûn sâkin + ب :', ['iqlâb', 'iẓhâr', 'idghâm']), ('Râ’ avec kasra :', ['fin', 'épais', 'au choix'])],
    cards=[('les trois questions du tajwîd', 'd’où sort la lettre ? comment sonne-t-elle ? que lui fait sa voisine ?')])
L40['lis_corr'] = ['La Fâtiḥa : ḥâ’ soufflé, mîm net, madd ‘âriḍ égal à chaque fin de verset, chadda de إِيَّاكَ, ṣâd épais, ḍâd épais, six temps sur ٱلضَّآلِّينَ.',
                   'Al-Falaq : qalqala de ٱلْفَلَقِ et de وَقَبَ à l’arrêt ; ikhfâ’ dans مِن شَرِّ ; iẓhâr dans غَاسِقٍ إِذَا et حَاسِدٍ إِذَا ; fâ’ doublé dans ٱلنَّفَّـٰثَٰتِ (sans ghounna).']
L37['lis_corr'] = ['Aḍ-Ḍouḥâ : à chaque fin de verset, madd ‘âriḍ égal ; v. 4 idghâm sans ghounna ; v. 6 à 8 ikhfâ’ ; v. 7 madd lâzim de ضَآلّٗا ; v. 8 et 10 madd joint ; v. 11 le thâ’ final est soufflé, sans qalqala.',
                   'Ach-Charḥ : râ’ épais de صَدْرَكَ, وِزْرَكَ, ظَهْرَكَ, ذِكْرَكَ ; v. 2, 3 et 7 ikhfâ’ dans un mot ; v. 3 madd séparé ; v. 5-6 ghounna de إِنَّ ; v. 7-8 qalqala du bâ’ à l’arrêt.']
L37['exos'][1]['corr'] = ['Épais : صَدْرَكَ (fatḥa) • يُسْرًا (fatḥa) • رَبِّكَ (fatḥa) • Fin : ٱلْعُسْرِ (kasra).']

ETAPE = dict(n=10, title='Je récite le Coran', ar='وَرَتِّلِ ٱلْقُرْءَانَ', aim='Réciter des sourates du dernier hizb en appliquant toutes les règles.',
    intro=['Toutes les règles sont maintenant connues : il est temps de **réciter**. Chaque leçon de cette étape étudie deux ou trois sourates : on écoute, on repère les règles verset par verset, puis on récite au rythme tadwîr.',
           'L’étape se termine par l’évaluation finale et l’attestation de fin du niveau 2.'],
    lessons=[L37, L38, L39, L40],
    bilan=['Je récite Aḍ-Ḍouḥâ, Ach-Charḥ, At-Tîn, Al-Qadr, Az-Zalzala, Al-‘Âdiyât et Al-Qâri‘a.', 'Je nomme les règles de chaque verset.', 'J’ai réussi l’évaluation finale.'],
    bilan_lis=None,
    defi='Réussissez l’évaluation finale : récitation sans erreur claire, cinq règles justifiées, trois arrêts corrects.',
    vigilance=['Faire écouter avant de faire réciter.', 'Exiger l’égalité des durées.', 'Évaluer d’abord les erreurs claires, puis les erreurs cachées.'],
    jeu_conseille='La récitation en chaîne (leçon 37) et le grand quiz du tajwîd (leçon 40).',
    duree='4 leçons, dont l’évaluation finale')
