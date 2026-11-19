# Pages d'ouverture — Lire le Coran pas à pas 2
from blocks import *

PLAN = [
    (1, 'Bien commencer ma récitation', 'ٱلتَّجْوِيدُ', [
        (1, 'Le tajwîd : donner à chaque lettre son droit', 'تَجْوِيدٌ'),
        (2, 'Les rythmes de la récitation : taḥqîq, tadwîr, ḥadr', 'تَرْتِيلًا'),
        (3, 'L’isti‘âdha et la basmala', 'بِسْمِ ٱللَّهِ'),
        (4, 'Les erreurs à éviter : erreur claire et erreur cachée', 'لَحْنٌ')]),
    (2, 'D’où sortent les lettres (makhârij)', 'مَخَارِجُ', [
        (5, 'L’appareil de la parole et les cinq zones de sortie', 'ٱلْمَخَارِجُ'),
        (6, 'Le vide de la bouche et la gorge', 'ء ه ع ح غ خ'),
        (7, 'Le fond et le milieu de la langue', 'ق ك ج ش ي'),
        (8, 'Les côtés et la pointe de la langue', 'ض ل ن ر'),
        (9, 'La pointe de la langue et les dents', 'ط د ت ظ ذ ث ص س ز'),
        (10, 'Les lèvres et le nez', 'ف و ب م')]),
    (3, 'Les qualités des lettres (ṣifât)', 'صِفَاتٌ', [
        (11, 'Lettres épaisses et lettres fines', 'خُصَّ ضَغْطٍ قِظْ'),
        (12, 'La qalqala : la lettre qui rebondit', 'قُطْبُ جَدٍّ'),
        (13, 'Souffle, voix et autres qualités utiles', 'فَحَثَّهُ شَخْصٌ سَكَتَ')]),
    (4, 'Le noûn sâkin et le tanwîn', 'نْ ـًـٍـٌ', [
        (14, 'Les quatre règles ; l’iẓhâr : je prononce clairement', 'إِظْهَارٌ'),
        (15, 'L’idghâm : je fais entrer le noûn dans la lettre suivante', 'يَرْمُلُونَ'),
        (16, 'L’iqlâb : le noûn devient mîm devant le bâ’', 'إِقْلَابٌ'),
        (17, 'L’ikhfâ’ : je cache le noûn avec une ghounna', 'إِخْفَاءٌ'),
        (18, 'Je récite avec les quatre règles', 'مِنۢ بَعْدِ')]),
    (5, 'Le mîm sâkin et la ghounna', 'مْ', [
        (19, 'L’ikhfâ’ chafawî : le mîm caché devant le bâ’', 'تَرْمِيهِم بِحِجَارَةٍ'),
        (20, 'L’idghâm du mîm et la ghounna des lettres doublées', 'مّ نّ'),
        (21, 'L’iẓhâr chafawî : le mîm bien fermé', 'لَهُمْ فِيهَا')]),
    (6, 'Quand deux lettres se rencontrent', 'إِدْغَامٌ', [
        (22, 'Les lâm : l’article, le verbe, « hal » et « bal »', 'قُلْ'),
        (23, 'Lettres identiques, sœurs et voisines', 'قَد تَّبَيَّنَ'),
        (24, 'Je récite et je repère les rencontres', 'أَلَمْ نَخْلُقكُّمْ')]),
    (7, 'Épaisse ou fine ? (tafkhîm et tarqîq)', 'تَفْخِيمٌ', [
        (25, 'Les lettres toujours épaisses et leurs degrés', 'خُصَّ ضَغْطٍ قِظْ'),
        (26, 'Le lâm du nom d’Allah', 'ٱللَّهُ'),
        (27, 'Le râ’ épais et le râ’ fin (1) : le râ’ avec voyelle', 'رَ رِ'),
        (28, 'Le râ’ épais et le râ’ fin (2) : le râ’ sans voyelle', 'رْ')]),
    (8, 'Les prolongations (madd)', 'مَدٌّ', [
        (29, 'Le madd naturel : deux temps', 'قَالَ قِيلَ يَقُولُ'),
        (30, 'Le madd joint et le madd séparé', 'جَآءَ إِنَّآ أَنزَلْنَٰهُ'),
        (31, 'Le madd avant un arrêt et le madd des lettres douces', 'ٱلْعَٰلَمِينَ قُرَيْشٍ'),
        (32, 'Le madd obligatoire et les lettres isolées', 'ٱلضَّآلِّينَ الٓمٓ'),
        (33, 'Je classe les madd : le plus fort l’emporte', 'مَدٌّ')]),
    (9, 'S’arrêter et reprendre (waqf et ibtidâ’)', 'وَقْفٌ', [
        (34, 'Comment m’arrêter sur un mot', 'ٱلْعَٰلَمِينْ'),
        (35, 'Où m’arrêter : les sortes d’arrêt et les signes', 'مـ ج صلى قلى'),
        (36, 'Les particularités de Ḥafṣ : sakta et mots spéciaux', 'عِوَجَاۜ')]),
    (10, 'Je récite le Coran', 'وَرَتِّلِ ٱلْقُرْءَانَ', [
        (37, 'Ad-Ḍouḥâ et Ach-Charḥ', 'وَٱلضُّحَىٰ'),
        (38, 'At-Tîn, Al-Qadr et Az-Zalzala', 'وَٱلتِّينِ'),
        (39, 'Al-‘Âdiyât et Al-Qâri‘a', 'وَٱلْعَٰدِيَٰتِ'),
        (40, 'Mon bilan final et mon attestation', 'ٱقْرَأْ وَٱرْتَقِ')]),
]

def TITLEPAGE():
    x = COVER(img_rel('imglc2_couverture.png')) + PAGEBREAK()
    x += SP(115)
    x += P(IMG(img_rel('imglc2_wordmark.png'), 2880000, 912000, 'lisan_wordmark'), jc='center', after=80, line=240)
    x += P(R('Lire le Coran pas à pas 2', font='Fredoka Bold', color='0E3B2E', sz=40), jc='center', after=0, line=240)
    x += P(R('Niveau 2 — Je récite avec le tajwîd', font='Quicksand Bold', b=True, color='B8923A', sz=28), jc='center', after=20, line=240)
    x += P(AR('وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا', sz=44, color='B8923A'), jc='center', bidi=True, after=20, line=240)
    x += P(R('Méthode progressive de tajwîd, de la lecture juste à la récitation • lecture de Ḥafṣ ‘an ‘Âṣim', i=True, color=GREY_T), jc='center', after=150, line=252)
    own = (P(R('Ce livre appartient à :', b=True, color='0E3B2E'), after=20, line=240)
           + P(TAB(), tabs=[('right', 6500, 'dot')], before=32, after=30, line=306)
           + P(R('J’ai commencé le niveau 2 le : ……… / ……… / …………', i=True, color=GREY_T), after=0, line=252))
    x += tbl([[tc(own, 6900, 'F2F8EC', (140, 260, 140, 260))]], [6900], '0E3B2E', 8)
    x += SP(115)
    cr = ''.join(P(c, jc='center', after=30, line=250) for c in [
        R('Conception, rédaction et direction pédagogique :', b=True) + R(' Éditions Lisân'),
        R('Éditions Lisân', b=True) + R(' — « La langue qui ouvre les portes » • Abidjan, Côte d’Ivoire'),
        R('Première édition, 2026. © Éditions Lisân. Tous droits réservés. Toute reproduction, impression, modification, diffusion ou mise en ligne, totale ou partielle, est interdite sans l’autorisation écrite de l’éditeur (Convention de Berne).'),
        R('Ce livre contient des versets du Coran : merci de le traiter avec respect.', b=True),
        R('Dans la même collection : Lire le Coran pas à pas (niveau 1 : la lecture) ; Lire le Coran pas à pas 2 — livret du maître et cahier d’exercices.'),
        R('Polices : Nunito, Quicksand et Noto Naskh Arabic (licence SIL Open Font) ; Lisan Naskh (dérivée de Noto Naskh Arabic, avec le code couleur des voyelles).', sz=22, color=GREY_T),
        AR('جَمِيعُ ٱلْحُقُوقِ مَحْفُوظَةٌ', sz=36, color='0E3B2E')])
    x += tbl([[tc(cr, FULL, 'FBF8F1', (81, 288, 81, 288))]], [FULL], 'D6B25C')
    return x

def SOMMAIRE():
    x = H_PAGE('Sommaire', 'Dix étapes, une marche après l’autre')
    for n, title, ar, lessons in PLAN:
        c, l = ETAPES[n - 1]
        left = (P(R('ÉTAPE', font='Nunito ExtraBold', b=True, color='FFFFFF', spacing=30), jc='center', after=0, line=240)
                + P(R(str(n), font='Quicksand Bold', b=True, color='FFFFFF', sz=48), jc='center', after=0, line=240))
        right = P(ANCHOR(f'etape_{n}', R(title, font='Quicksand Bold', b=True, color=c, sz=28)) + R('    ') + AR(ar, sz=34, color=c), after=10, line=240)
        for num, t, _ in lessons:
            right += P(ANCHOR(f'lecon_{num}', R(f'Leçon {num}', font='Nunito ExtraBold', b=True, color=c) + TAB() + rich(t, color=INK, arsz=30)),
                       tabs=[('left', 1150, None)], ind=(1150, 1150), after=0, line=245)
        x += tbl([[tc(left, 1500, c, (27, 32, 27, 32)), tc(right, 8646, l, (31, 128, 31, 128), 'top')]], [1500, 8646], 'FFFFFF') + SP(114)
    x += P(R('Annexes : tableaux récapitulatifs • petit glossaire du tajwîd • corrigés des exercices • mon carnet de suivi', i=True, color=GREY_T), jc='center', after=0, line=252)
    return x

def BIENVENUE():
    x = H_PAGE('Bienvenue au niveau 2 !')
    x += P(AR('وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا', sz=56, color='0E3B2E'), jc='center', bidi=True, after=20, line=240)
    x += P(R('« … et récite le Coran lentement et clairement. » (Al-Mouzzammil, 4)', i=True, color=GREY_T), jc='center', after=60, line=252)
    x += T('Vous savez maintenant **lire le Coran** dans le Mouss-haf : vous reconnaissez les lettres, les voyelles, le soukoun, la chadda, le tanwîn, la hamza et les signes du Mouss-haf. Ce deuxième livre vous fait monter une nouvelle marche : passer de la **lecture juste** à la **récitation belle et fidèle**, celle que l’on appelle le **tajwîd**.')
    x += T('Le Coran n’a pas seulement été transmis par écrit : il a été transmis **de bouche à oreille**, du Prophète ﷺ à ses Compagnons, puis de maître en élève jusqu’à nous. Le tajwîd rassemble les règles de cette récitation transmise : d’où sort chaque lettre, comment elle sonne, quand le noûn se cache, quand la voix s’allonge, où l’on peut s’arrêter.')
    x += DIAMOND('Deux paroles pour se mettre en route', '0E3B2E')
    x += QUOTE('« On demanda à Anas comment était la récitation du Prophète ﷺ. Il répondit : “Elle était faite de prolongations.” Puis il récita « bismi-Llâhi r-raḥmâni r-raḥîm » en prolongeant « bismi-Llâh », en prolongeant « ar-raḥmân » et en prolongeant « ar-raḥîm ». »',
               'Hadith rapporté par Al-Boukhârî', '0E3B2E', 'E6EEEA')
    x += SP(114)
    x += QUOTE('Umm Salama, l’épouse du Prophète ﷺ, décrivit sa récitation : « une récitation claire, lettre par lettre ».',
               'Hadith rapporté par Abou Dâwoud, An-Nasâ’î et At-Tirmidhî', '0E3B2E', 'E6EEEA', ar='قِرَاءَةً مُفَسَّرَةً حَرْفًا حَرْفًا', arsz=44)
    x += DIAMOND('Ce que vous allez apprendre', '0E3B2E')
    x += BULLETS(['à bien **commencer** votre récitation : rythmes de lecture, isti‘âdha et basmala, erreurs à éviter ;',
                  'les **points de sortie** des lettres (makhârij) et leurs **qualités** (ṣifât) ;',
                  'les règles du **noûn sâkin**, du **tanwîn** et du **mîm sâkin** : iẓhâr, idghâm, iqlâb, ikhfâ’ ;',
                  'la rencontre de deux lettres, les lettres **épaisses** et **fines**, le lâm d’Allah et le râ’ ;',
                  'les **prolongations** (madd) et leur durée ;',
                  'l’**arrêt** et la **reprise**, et les particularités de la lecture de Ḥafṣ ;',
                  'la **récitation suivie** de sourates du dernier hizb, en appliquant toutes les règles.'])
    return x

def MODE_EMPLOI():
    x = H_PAGE('Comment utiliser ce livre')
    x += T('Chaque leçon suit le même parcours que dans le niveau 1 : on découvre la règle, on la retient, on la lit, on la repère dans le Coran, on s’exerce, on joue, puis on fait le point.', jc='center')
    rows = [('decouvre', 'Je découvre', 'La règle expliquée pas à pas : ce qu’elle est, quand elle s’applique, comment la prononcer.'),
            ('retiens', 'Je retiens', 'L’essentiel de la leçon dans un encadré vert, à relire avant chaque séance.'),
            ('lis', 'Je lis', 'Des lignes de mots et de versets à lire à voix haute, de droite à gauche ; on coche chaque ligne lue sans erreur.'),
            ('coran', 'Mots du Coran', 'Des passages du Mouss-haf où la règle apparaît, avec la récitation d’al-Ḥouṣarî à écouter (lien ou code QR).'),
            ('ecoute', 'J’écoute et je prononce', 'Le geste de la bouche, le son juste et les confusions à éviter.'),
            ('exerce', 'Je m’exerce', 'Repérer, classer, compléter, relier, choisir. Un lien mène au corrigé, à la fin du livre.'),
            ('joue', 'Je joue', 'Un jeu pour apprendre en s’amusant, seul, en famille ou en classe.'),
            ('bilan', 'Mon bilan', 'Je fais le point sur ce que je sais, et je relève le défi de la leçon.')]
    trs = []
    for ic, lab, d in rows:
        col = SECCOL.get(ic, '3B5BA0' if ic == 'ecoute' else RET_COL)
        trs.append([tc(P(IMG(img_rel(ICON[ic]), 432000, 432000, 'ic_' + ic), jc='center', after=0, line=240), 1100, 'FFFFFF', (60, 60, 60, 60)),
                    tc(P(R(lab, font='Nunito ExtraBold', b=True, color=col), after=0, line=240), 2700, 'FFFFFF'),
                    tc(P(rich(d), after=0, line=245), 6346, 'FFFFFF')])
    x += tbl(trs, [1100, 2700, 6346], 'E3E8E5', 6) + SP(115)
    x += DIAMOND('Dix étapes, dix couleurs', '0E3B2E')
    x += T('Chaque étape garde la couleur qu’elle avait dans le niveau 1. Dans les lectures, deux fonds de couleur vous guident :')
    x += P(AR('⟦نْ⟧', sz=60) + R('   ') + rich('Le **fond jaune** marque la lettre qui déclenche la règle (par exemple le noûn sâkin).'), after=30, line=252)
    x += P(AR('⟨ب⟩', sz=60) + R('   ') + rich('Le **fond bleu** marque la lettre qui suit et décide de la règle.'), after=30, line=252)
    x += T('Les lettres **grises** restent, comme au niveau 1, des lettres écrites mais non prononcées à cet endroit. Les voyelles gardent leurs couleurs : fatḥa rouge, kasra bleue, ḍamma verte, soukoun orange, chadda violette, madd ocre.')
    x += DIAMOND('Pour bien apprendre', '0E3B2E')
    tips = [('1. Écouter avant de réciter', 'Le tajwîd s’apprend d’abord avec l’oreille. Écoutez la récitation de chaque passage avant de le lire, puis imitez-la.'),
            ('2. Avec un maître', 'Aucun livre ne remplace la correction d’un enseignant : faites-vous écouter régulièrement par un lecteur compétent.'),
            ('3. Un peu chaque jour', 'Quinze à vingt minutes par jour valent mieux qu’une longue séance par semaine.'),
            ('4. Une règle à la fois', 'Appliquez la règle de la leçon dans toute votre récitation de la semaine, même hors du livre.'),
            ('5. Réviser avant d’avancer', 'Commencez chaque séance par la rubrique « Je lis » de la leçon précédente.'),
            ('6. Avec respect', 'Ce livre contient des versets du Coran : rangez-le dans un endroit propre. Il est recommandé d’être en état d’ablution pour réciter.')]
    trs = []
    for i in range(0, 6, 2):
        trs.append([tc(P(R(t, font='Nunito ExtraBold', b=True, color='0E3B2E'), after=15, line=240) + P(rich(d), jc='both', after=0, line=245), 5073, 'F2F8EC', (90, 160, 90, 160), 'top')
                    for t, d in tips[i:i + 2]])
    x += tbl(trs, [5073, 5073], 'FFFFFF', 12) + SP(115)
    x += TIP('decouvre', 'Bon à savoir', ['Ce livre suit la lecture de **Ḥafṣ ‘an ‘Âṣim** par la voie d’ach-Châṭibiyya, celle du **Mouss-haf de Médine**, et donne pour chaque règle la manière la plus répandue de la réciter.',
                                           'Il suppose acquis le niveau 1 : si le test de la page suivante vous met en difficulté, reprenez d’abord les étapes indiquées du premier livre.'])
    return x

def TEST():
    x = H_PAGE('Suis-je prêt pour le niveau 2 ?', 'Test de lecture : lisez chaque ligne à voix haute, devant votre enseignant ou un parent.')
    x += JELIS([V(1, 2) + '  ' + V(1, 3) + '  ' + V(1, 4), V(1, 5) + '  ' + V(1, 6), V(1, 7), V(112, 1) + '  ' + V(112, 2) + '  ' + V(112, 3) + '  ' + V(112, 4),
                V(103, 1) + '  ' + V(103, 2), V(103, 3), V(108, 1), V(2, 29)], intro=False, arsz=46)
    x += SP(115)
    x += GRID(['Si j’ai hésité sur…', 'Je revois dans le niveau 1…'],
              [['les voyelles courtes, le soukoun', 'les étapes 3 et 4'], ['les voyelles longues et le tanwîn', 'les étapes 5 et 6'],
               ['la chadda, la hamza, l’article', 'les étapes 7 et 8'], ['les signes du Mouss-haf (lettres non lues, fins de versets)', 'l’étape 9']],
              [6146, 4000], '0E3B2E', 'F7F9F8')
    x += SP(115)
    x += P(R('Lignes lues sans erreur : ') + FIELD() + R(' / 8      •      Date : ') + FIELD() + R('      •      Visa de l’enseignant : ') + FIELD(), after=0, line=252)
    x += T('*Six lignes sur huit lues sans erreur : vous pouvez commencer l’étape 1.*', jc='center', before=80)
    return x
