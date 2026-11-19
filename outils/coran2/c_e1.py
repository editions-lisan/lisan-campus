# Étape 1 — Bien commencer ma récitation
from blocks import *
from c_front import PLAN

E = 1
C, L = ETAPES[0]

def etape_open():
    n, title, ar, lessons = PLAN[0]
    x = PAGEBREAK() + ETAPE_BANNER(1, title, ar, 'Savoir ce qu’est le tajwîd, choisir son rythme, bien commencer et éviter les erreurs.') + SP()
    x += T('Avant d’étudier les règles une à une, il faut savoir **ce qu’est le tajwîd**, pourquoi on l’apprend et comment se présente une récitation. Cette étape pose ces bases : le sens et l’importance du tajwîd, les trois rythmes de la récitation, la façon de commencer par l’isti‘âdha et la basmala, et les deux sortes d’erreurs que le tajwîd permet d’éviter. À la fin de l’étape, vous réciterez la Fâtiḥa en surveillant chaque lettre.')
    x += LESSON_LIST(1, lessons)
    return x

# ---------------------------------------------------------------- Leçon 1
def L1():
    x = PAGEBREAK() + LESSON_BANNER(E, 1, 'Le tajwîd : donner à chaque lettre son droit', 'تَجْوِيدٌ') + SP()
    x += OBJECTIFS(E, ['savoir ce que signifie le mot **tajwîd** ;', 'distinguer le **droit** d’une lettre et son **dû** ;', 'connaître la place du tajwîd dans la récitation du Coran.'])
    x += SECTION('decouvre', 'JE DÉCOUVRE')
    x += T('Le mot **tajwîd** (تَجْوِيدٌ) vient du verbe جَوَّدَ, « rendre beau, bien faire ». Dans la langue, le tajwîd est donc **le fait de bien faire une chose**. Pour la récitation du Coran, c’est **prononcer chaque lettre comme il faut** : de son bon point de sortie, avec ses qualités, et en appliquant les règles qui changent selon sa place dans le mot.')
    x += T('Les savants résument cela en deux mots : donner à chaque lettre **son droit** (ḥaqq) et **son dû** (mustaḥaqq).')
    x += GRID(['', 'Ce que c’est', 'Exemple'],
              [['**Le droit** de la lettre (ḥaqq)', 'Ce qui ne la quitte jamais : son **point de sortie** et ses **qualités permanentes**. Le ṣâd est toujours épais, le ḥâ’ toujours soufflé.', ('AR', W(1, 6, 2))],
               ['**Le dû** de la lettre (mustaḥaqq)', 'Ce qui dépend de **sa place** : une ghounna, un allongement, un noûn caché, un râ’ épais ou fin… Ces règles naissent de la lettre voisine.', ('AR', W(1, 7, 9))]],
              [2600, 5146, 2400], C, L)
    x += SP(114)
    x += T('Dans ٱلصِّرَٰطَ, le ṣâd garde **toujours** son épaisseur : c’est son droit. Dans ٱلضَّآلِّينَ, la voix s’allonge longuement sur l’alif **parce que** la lettre suivante porte une chadda : c’est un dû, il dépend de la position.')
    x += DIAMOND('Pourquoi apprendre le tajwîd ?', C)
    x += T('Le Coran a été révélé avec une récitation précise, que le Prophète ﷺ a reçue de Jibrîl et transmise à ses Compagnons. Allah dit :')
    x += P(AR(V(73, 4), sz=44, color=C), jc='center', bidi=True, after=10, line=240)
    x += P(R('« … et récite le Coran lentement et clairement. » (Al-Mouzzammil, 4)', i=True, color=GREY_T), jc='center', after=80, line=252)
    x += T('L’imam Ibn al-Jazarî, grand maître des lectures, l’a dit dans son célèbre poème sur le tajwîd :')
    x += QUOTE('« Appliquer le tajwîd est une obligation ferme : celui qui ne récite pas le Coran correctement est en faute. Car c’est ainsi qu’Allah l’a fait descendre, et c’est ainsi qu’il nous est parvenu de Lui. »',
               'Ibn al-Jazarî, Al-Mouqaddima (al-Jazariyya)', C, L, ar='وَٱلْأَخْذُ بِٱلتَّجْوِيدِ حَتْمٌ لَازِمُ ۝ مَنْ لَمْ يُجَوِّدِ ٱلْقُرَانَ آثِمُ', arsz=40)
    x += SP(114)
    x += T('Les savants distinguent deux choses : **connaître** les règles en détail (leurs noms, leurs définitions) est un savoir que la communauté doit posséder ; **réciter** en appliquant ces règles concerne chaque musulman qui récite le Coran, selon ses capacités. Celui qui fait des efforts et progresse est récompensé pour chaque effort.')
    x += ECOUTE(['Le tajwîd ne s’apprend pas seulement dans les livres : il s’apprend **par l’oreille**. Écoutez un récitateur reconnu, comme al-Ḥouṣarî dont la récitation accompagne ce livre, puis imitez-le, mot par mot.',
                 'Écoutez ٱلْحَمْدُ : le ḥâ’ est soufflé du milieu de la gorge, le mîm s’arrête net, sans voyelle ajoutée. Écoutez ٱلضَّآلِّينَ : la voix tient l’alif longuement, environ **six temps**.'])
    x += SP(128)
    x += RETIENS(['Le **tajwîd**, c’est réciter chaque lettre comme il faut.', 'Le **droit** de la lettre ne change jamais (point de sortie, qualités) ; son **dû** dépend de sa place.',
                  'Le Coran se récite comme il a été révélé et transmis : avec le tajwîd.'])
    x += SECTION('lis', 'JE LIS')
    x += JELIS([V(1, 1), V(1, 2), V(1, 3) + '  ' + V(1, 4), V(1, 5), V(1, 6), V(1, 7)], key='L1_lis', arsz=48)
    x += P(R('Lisez la Fâtiḥa lentement : une ligne n’est cochée que si chaque lettre a été prononcée de son bon point de sortie.', i=True, color=GREY_T), after=0, line=252)
    corr('L1_lis', 'Je lis — points à surveiller', ['Ligne 1 : le ḥâ’ de ٱلرَّحْمَٰنِ et de ٱلرَّحِيمِ est soufflé (ce n’est pas un hâ’ léger).',
                                                   'Ligne 2 : le mîm de ٱلْحَمْدُ s’arrête net ; le ‘ayn de ٱلْعَٰلَمِينَ vient du milieu de la gorge.',
                                                   'Ligne 4 : la chadda de إِيَّاكَ est bien doublée : *iy-yâ-ka*.', 'Ligne 5 : le ṣâd de ٱلصِّرَٰطَ est épais, différent du sîn.',
                                                   'Ligne 6 : le ḍâd de ٱلْمَغْضُوبِ et de ٱلضَّآلِّينَ est épais ; l’alif de ٱلضَّآلِّينَ dure environ six temps.'])
    x += SECTION('coran', 'MOTS DU CORAN : LE DROIT DE LA LETTRE')
    x += MOTS([(W(1, 6, 2), 1, 6, 'le **ṣâd** est épais'),
               (W(1, 2, 1), 1, 2, 'le **ḥâ’** est soufflé'),
               (W(1, 2, 4), 1, 2, 'le **‘ayn** vient du milieu de la gorge'),
               (W(112, 1, 1), 112, 1, 'le **qâf**, du fond de la langue'),
               (W(112, 2, 2), 112, 2, 'le **ṣâd** de aṣ-ṣamad'),
               (W(1, 7, 6), 1, 7, 'le **ḍâd** de al-maghḍoûb')], field='Je lis :')
    x += SECTION('exerce', 'JE M’EXERCE')
    x += EXO(1, 'Droit ou dû ?', 'L1_E1', 'Pour chaque phrase, cochez « Vrai » ou « Faux ».')
    x += VF(['Le droit d’une lettre change selon la lettre qui la suit.', 'Le point de sortie d’une lettre fait partie de son droit.',
             'L’allongement de six temps dans ٱلضَّآلِّينَ est un dû : il dépend de la chadda qui suit.', 'Le ṣâd peut devenir fin s’il est suivi d’une kasra.',
             'Le tajwîd s’apprend d’abord par l’oreille, auprès d’un maître.'])
    corr('L1_E1', 'Exercice 1', ['1. Faux : c’est le **dû** qui dépend de la place ; le droit ne change jamais.', '2. Vrai.', '3. Vrai.',
                                 '4. Faux : le ṣâd reste toujours épais, même avec une kasra (ٱلصِّرَٰطَ) ; c’est son droit.', '5. Vrai.'])
    x += EXO(2, 'Je complète', 'L1_E2', 'Complétez avec les mots : **bien faire** • **droit** • **dû** • **transmis** • **Mouzzammil**.')
    x += BULLETS(['Le mot tajwîd veut dire « ……………… ».', 'Le point de sortie et les qualités permanentes forment le ……………… de la lettre.',
                  'Une ghounna ou un allongement qui dépendent de la place forment le ……………… de la lettre.',
                  'Le Coran nous a été ……………… de bouche à oreille.', 'Le verset « wa rattili l-Qour’âna tartîlâ » se trouve dans la sourate Al-……………… .'], mark='•', mcolor='BE1EB4', after=40)
    corr('L1_E2', 'Exercice 2', ['1. bien faire • 2. droit • 3. dû • 4. transmis • 5. Mouzzammil.'])
    x += SECTION('joue', 'JE JOUE : L’ÉCHO')
    x += P(R('Deux joueurs ou plus : l’oreille avant la langue.', i=True, color=GREY_T), keep=True, after=30, line=252)
    x += T('Un joueur (ou l’enseignant) fait écouter un verset de la Fâtiḥa avec le lien « Écouter ». Les autres le répètent **en écho**, sans regarder le livre, en imitant exactement les arrêts, les allongements et les lettres soufflées. On gagne un point quand l’écho est fidèle ; au bout de sept versets, celui qui a le plus de points choisit le verset de la manche suivante.')
    x += SECTION('bilan', 'MON BILAN')
    x += BILAN(['Je sais dire ce que signifie le mot tajwîd.', 'Je sais distinguer le droit et le dû d’une lettre.', 'Je sais pourquoi on récite le Coran avec le tajwîd.', 'Je lis la Fâtiḥa en surveillant chaque lettre.'])
    x += SP(128) + DEFI('Récitez la Fâtiḥa en entier devant votre enseignant ou un parent, sans erreur de lettre, puis récitez-la une seconde fois en écho avec la récitation d’al-Ḥouṣarî.', timed=False)
    return x

# ---------------------------------------------------------------- Leçon 2
def L2():
    x = PAGEBREAK() + LESSON_BANNER(E, 2, 'Les rythmes de la récitation', W(73, 4, 6)) + SP()
    x += OBJECTIFS(E, ['connaître le **tartîl**, la récitation posée demandée par le Coran ;', 'distinguer les trois rythmes : **taḥqîq**, **tadwîr** et **ḥadr** ;', 'garder les mêmes règles quel que soit le rythme.'])
    x += SECTION('decouvre', 'JE DÉCOUVRE')
    x += T('Le Coran ne se lit pas comme un journal. Allah demande de le réciter avec **tartîl** : posément, en donnant à chaque lettre son temps, en marquant les arrêts et en méditant le sens. ‘Alî, qu’Allah l’agrée, a expliqué ce mot ainsi : « Le tartîl, c’est **bien prononcer les lettres** et **connaître les arrêts**. »')
    x += T('À l’intérieur de cette récitation posée, les maîtres distinguent **trois rythmes**. Tous trois sont permis et tous gardent les règles : on change seulement la vitesse, jamais la prononciation.')
    x += GRID(['Rythme', 'Comment ?', 'Pour qui, quand ?'],
              [['**At-taḥqîq** (ٱلتَّحْقِيقُ) — le plus lent', 'Très posé : chaque lettre, chaque allongement, chaque ghounna est donné pleinement.', 'Pour **apprendre** et pour **enseigner** : c’est le rythme de ce livre.'],
               ['**At-tadwîr** (ٱلتَّدْوِيرُ) — moyen', 'Entre les deux : ni lent ni rapide.', 'Pour la récitation de tous les jours, seul ou dans la prière.'],
               ['**Al-ḥadr** (ٱلْحَدْرُ) — le plus rapide', 'Rapide, mais sans avaler de lettre ni raccourcir un allongement obligatoire.', 'Pour celui qui récite beaucoup et révise sa mémorisation.']],
              [2900, 4046, 3200], C, L)
    x += SP(114)
    x += TIP('attention', 'Attention', ['Réciter vite n’autorise **jamais** à supprimer une lettre, à raccourcir un allongement obligatoire ou à oublier une ghounna. Si l’on se trompe en allant vite, on revient au rythme lent.',
                                        'Dans ce livre, nous travaillons d’abord au rythme **taḥqîq**, puis nous passons au **tadwîr** quand la règle est bien acquise.'], tcolor='A83838')
    x += SP(114)
    x += DIAMOND('Le Coran parle de sa récitation', C)
    x += T('Plusieurs versets décrivent la manière de recevoir et de réciter le Coran : avec calme, sans précipitation, en suivant la récitation entendue.')
    x += MOTS([(W(73, 4, 4, 6), 73, 4, '« et récite le Coran lentement et clairement »'),
               (W(17, 106, 1, 7), 17, 106, '« … pour que tu le lises aux gens posément »'),
               (W(25, 32, 14, 15), 25, 32, '« et Nous l’avons récité avec soin »'),
               (V(75, 16), 75, 16, '« Ne remue pas ta langue pour te hâter de le réciter »'),
               (V(75, 18), 75, 18, '« Quand Nous le récitons, suis sa récitation »'),
               (W(96, 1, 1, 3), 96, 1, '« Lis, au nom de ton Seigneur »')], field=None, arsz=44)
    x += SP(114)
    x += ECOUTE(['Choisissez un verset court, par exemple ' + V(112, 1) + '. Récitez-le trois fois : très lentement (taḥqîq), à vitesse moyenne (tadwîr), puis plus vite (ḥadr).',
                 'À chaque vitesse, vérifiez trois choses : le **qâf** de قُلْ reste net, le **hâ’** de هُوَ reste léger, et le **dâl** de أَحَدٌ se fait bien entendre à l’arrêt.'])
    x += SP(128)
    x += RETIENS(['Le **tartîl** est demandé par le Coran : bien prononcer les lettres et connaître les arrêts.', 'Trois rythmes : **taḥqîq** (lent), **tadwîr** (moyen), **ḥadr** (rapide).',
                  'Le rythme change la vitesse, **jamais** les règles.'])
    x += SECTION('lis', 'JE LIS : TROIS VITESSES')
    x += P(R('Lisez chaque verset trois fois, en changeant de rythme. Cochez une case par rythme réussi.', i=True, color=GREY_T), keep=True, after=30, line=252)
    rows = [[tc(P(R(h, b=True, color='FFFFFF'), jc='center', after=0, line=240, keep=True), w, C) for h, w in (('Verset', 6546), ('Taḥqîq', 1200), ('Tadwîr', 1200), ('Ḥadr', 1200))]]
    for s, a in ((103, 1), (103, 2), (103, 3), (108, 1), (108, 2), (108, 3)):
        rows.append([tc(P(AR(V(s, a), sz=40), jc='center', bidi=True, after=40, line=240), 6546, 'FFFFFF', (40, 80, 40, 80))]
                    + [tc(P(CHECK(C, 30), jc='center', after=0, line=240), 1200, L) for _ in range(3)])
    x += tbl(rows, [6546, 1200, 1200, 1200], 'D5DDD8', 6, header=True)
    x += SECTION('exerce', 'JE M’EXERCE')
    x += EXO(1, 'Je relie', 'L2_E1', 'Reliez chaque rythme à sa description.')
    x += RELIER(['At-taḥqîq', 'At-tadwîr', 'Al-ḥadr', 'At-tartîl'],
                ['récitation rapide, règles gardées', 'récitation posée demandée par le Coran', 'rythme le plus lent, pour apprendre', 'rythme moyen, entre les deux'])
    corr('L2_E1', 'Exercice 1', ['1 → C (taḥqîq : le plus lent, pour apprendre) • 2 → D (tadwîr : moyen) • 3 → A (ḥadr : rapide) • 4 → B (tartîl : la récitation posée demandée par le Coran).'])
    x += EXO(2, 'Je choisis la bonne réponse', 'L2_E2')
    x += QCM([('Pour apprendre une nouvelle règle, quel rythme choisit-on ?', ['al-ḥadr', 'at-taḥqîq', 'n’importe lequel, si l’on va vite']),
              ('En récitant vite (ḥadr), peut-on raccourcir un allongement obligatoire ?', ['oui, pour gagner du temps', 'non, jamais', 'seulement à la fin de la sourate']),
              ('Selon ‘Alî, le tartîl, c’est…', ['réciter d’une voix forte', 'bien prononcer les lettres et connaître les arrêts', 'réciter le plus vite possible'])])
    corr('L2_E2', 'Exercice 2', ['1. b) at-taḥqîq • 2. b) non, jamais • 3. b) bien prononcer les lettres et connaître les arrêts.'])
    x += SECTION('joue', 'JE JOUE : LE MÉTRONOME')
    x += P(R('En classe ou en famille.', i=True, color=GREY_T), keep=True, after=30, line=252)
    x += T('Le meneur annonce un rythme (« taḥqîq ! », « tadwîr ! », « ḥadr ! ») et désigne un joueur, qui récite un verset d’Al-‘Aṣr ou d’Al-Kawthar à ce rythme. Les autres lèvent la main s’ils entendent une lettre avalée ou un allongement raccourci. Une récitation juste rapporte deux points ; une erreur relevée correctement rapporte un point à celui qui l’a trouvée.')
    x += SECTION('bilan', 'MON BILAN')
    x += BILAN(['Je sais ce qu’est le tartîl.', 'Je connais les trois rythmes et leur usage.', 'Je garde les règles quand je récite plus vite.'])
    x += SP(128) + DEFI('Récitez la sourate Al-‘Aṣr trois fois de suite, en taḥqîq, en tadwîr puis en ḥadr, sans aucune erreur de lettre ni d’allongement.', timed=False)
    return x

# ---------------------------------------------------------------- Leçon 3
ISTI = 'أَعُوذُ بِٱللَّهِ مِنَ ٱلشَّيْطَٰنِ ٱلرَّجِيمِ'
BASM = V(1, 1)

def L3():
    x = PAGEBREAK() + LESSON_BANNER(E, 3, 'L’isti‘âdha et la basmala', 'بِسْمِ ٱللَّهِ') + SP()
    x += OBJECTIFS(E, ['dire l’**isti‘âdha** avant de réciter ;', 'savoir où dire la **basmala** et où ne pas la dire ;', 'enchaîner isti‘âdha, basmala et début de sourate de la bonne façon.'])
    x += SECTION('decouvre', 'JE DÉCOUVRE')
    x += DIAMOND('1. L’isti‘âdha : demander la protection d’Allah', C, before=20)
    x += T('Avant de réciter, on demande à Allah de nous protéger de Satan. C’est un ordre du Coran :')
    x += P(AR(V(16, 98), sz=42, color=C), jc='center', bidi=True, after=10, line=240)
    x += P(R('« Lorsque tu lis le Coran, demande la protection d’Allah contre Satan le lapidé. » (An-Naḥl, 98)', i=True, color=GREY_T), jc='center', after=80, line=252)
    x += T('La formule la plus employée est :')
    x += P(AR(ISTI, sz=52, color=INK), jc='center', bidi=True, after=10, line=240)
    x += P(R('a‘oûdhou bi-Llâhi mina ch-chayṭâni r-rajîm — « Je cherche la protection d’Allah contre Satan le lapidé »', i=True, color=GREY_T), jc='center', after=80, line=252)
    x += T('On la dit **au début** de la récitation, que l’on commence au début d’une sourate ou au milieu. On la dit **à voix haute** quand on récite à voix haute devant d’autres personnes, et à voix basse quand on récite pour soi. Si l’on interrompt la récitation pour parler d’autre chose, on la redit en reprenant.')
    x += DIAMOND('2. La basmala : au nom d’Allah', C)
    x += GRID(['Où ?', 'La basmala', 'Exemple'],
              [['Au **début de chaque sourate**', 'On la dit, **sauf** au début de la sourate At-Tawba.', ('AR', BASM, 34)],
               ['Au début d’**At-Tawba**', 'On ne la dit **pas** : on commence directement par le premier mot.', ('AR', W(9, 1, 1, 3), 34)],
               ['Au **milieu** d’une sourate', 'Au choix : on peut la dire ou non après l’isti‘âdha.', ('AR', '…', 34)]],
              [2600, 4746, 2800], C, L)
    x += SP(114)
    x += T('La basmala est aussi **un verset** d’An-Naml, dans la lettre de Soulaymân : '+ W(27, 30, 5, 8) + ' (An-Naml, 30). Là, elle fait partie du texte et se récite toujours.')
    x += DIAMOND('3. Comment enchaîner au début d’une sourate ?', C)
    x += T('Entre l’isti‘âdha, la basmala et le premier verset, il y a **quatre façons** permises. Dans le tableau, **‖** signifie « je m’arrête et je reprends mon souffle » et **⟶** signifie « j’enchaîne sans m’arrêter ».')
    x += GRID(['Façon', 'Isti‘âdha', '', 'Basmala', '', 'Début de la sourate'],
              [['1. Tout séparer', 'a‘oûdhou…', '‖', 'bismi-Llâh…', '‖', 'qoul houwa-Llâhou aḥad'],
               ['2. Tout enchaîner', 'a‘oûdhou…', '⟶', 'bismi-Llâh…', '⟶', 'qoul houwa-Llâhou aḥad'],
               ['3. Séparer le premier, enchaîner les deux autres', 'a‘oûdhou…', '‖', 'bismi-Llâh…', '⟶', 'qoul houwa-Llâhou aḥad'],
               ['4. Enchaîner les deux premiers, séparer le dernier', 'a‘oûdhou…', '⟶', 'bismi-Llâh…', '‖', 'qoul houwa-Llâhou aḥad']],
              [3046, 1700, 600, 1700, 600, 2500], C, L, jcs=['left', 'center', 'center', 'center', 'center', 'center'])
    x += SP(114)
    x += DIAMOND('4. Entre deux sourates', C)
    x += T('Quand on termine une sourate et que l’on commence la suivante, la basmala se place entre les deux. **Trois façons** sont permises ; une quatrième est **interdite**.')
    x += GRID(['Façon', 'Fin de la sourate', '', 'Basmala', '', 'Sourate suivante', 'Statut'],
              [['1', 'min charri ḥâsidin idhâ ḥasad', '‖', 'bismi-Llâh…', '‖', 'qoul a‘oûdhou…', '**permis**'],
               ['2', 'min charri ḥâsidin idhâ ḥasad', '⟶', 'bismi-Llâh…', '⟶', 'qoul a‘oûdhou…', '**permis**'],
               ['3', 'min charri ḥâsidin idhâ ḥasad', '‖', 'bismi-Llâh…', '⟶', 'qoul a‘oûdhou…', '**permis**'],
               ['4', 'min charri ḥâsidin idhâ ḥasad', '⟶', 'bismi-Llâh…', '‖', 'qoul a‘oûdhou…', '**interdit**']],
              [900, 2746, 500, 1700, 500, 2100, 1700], C, L, jcs=['center'] * 7)
    x += SP(114)
    x += T('La façon 4 est interdite parce qu’en collant la basmala à la fin de la sourate puis en s’arrêtant, on laisse croire que la basmala est le dernier verset de la sourate précédente.')
    x += TIP('decouvre', 'Le cas d’At-Tawba', ['Entre la fin d’Al-Anfâl et le début d’At-Tawba, on ne dit **pas** la basmala. On peut alors **s’arrêter** (en reprenant son souffle), faire une **courte pause sans respirer** (sakt), ou **enchaîner** directement.'])
    x += SP(114)
    x += ECOUTE(['Dans ' + ISTI + ', faites bien entendre le **‘ayn** de أَعُوذُ (et non une simple hamza) et le **ṭâ’** épais de ٱلشَّيْطَٰنِ.',
                 'Dans la basmala, le lâm du nom d’Allah est **fin**, car il suit la kasra de بِسْمِ : *bismi-llâhi*. Vous étudierez cette règle à la leçon 26.'])
    x += SP(128)
    x += RETIENS(['L’**isti‘âdha** se dit avant de réciter, au début comme au milieu d’une sourate.', 'La **basmala** se dit au début de chaque sourate, sauf At-Tawba ; au milieu, au choix.',
                  'Quatre façons d’enchaîner au début d’une sourate ; entre deux sourates, trois façons, et l’on ne s’arrête jamais sur une basmala collée à la sourate précédente.'])
    x += SECTION('lis', 'JE LIS')
    x += JELIS([ISTI, BASM, V(112, 1) + '  ' + V(112, 2), V(113, 5), V(114, 1), V(9, 1)], key='L3_lis', arsz=46)
    corr('L3_lis', 'Je lis — points à surveiller', ['Ligne 1 : ‘ayn de أَعُوذُ, ṭâ’ épais de ٱلشَّيْطَٰنِ, râ’ fin de ٱلرَّجِيمِ (après la kasra).', 'Ligne 2 : lâm d’Allah fin après la kasra : *bismi-llâhi*.',
                                                   'Lignes 4 et 5 : essayez les trois façons permises pour passer de la fin d’Al-Falaq au début d’An-Nâs.',
                                                   'Ligne 6 : début d’At-Tawba, **sans** basmala.'])
    x += SECTION('exerce', 'JE M’EXERCE')
    x += EXO(1, 'Permis ou interdit ?', 'L3_E1', 'Pour chaque enchaînement entre la fin d’une sourate et le début de la suivante, cochez « Vrai » s’il est permis, « Faux » s’il est interdit.')
    x += VF(['Je m’arrête après la sourate, je dis la basmala, je m’arrête, puis je commence la sourate suivante.', 'J’enchaîne la fin de la sourate avec la basmala, puis je m’arrête avant la sourate suivante.',
             'J’enchaîne tout sans m’arrêter : fin de sourate, basmala, début de la sourate suivante.', 'Je dis la basmala au début de la sourate At-Tawba.',
             'Au milieu d’une sourate, je peux dire la basmala après l’isti‘âdha.'])
    corr('L3_E1', 'Exercice 1', ['1. Vrai (permis : tout séparer).', '2. Faux (interdit : on croirait que la basmala termine la sourate précédente).', '3. Vrai (permis : tout enchaîner).',
                                 '4. Faux : At-Tawba commence sans basmala.', '5. Vrai : au milieu d’une sourate, c’est au choix.'])
    x += EXO(2, 'Je recopie dans l’ordre', 'L3_E2', 'Écrivez dans l’ordre ce que l’on récite pour commencer la sourate Al-Ikhlâṣ : la basmala • qoul houwa-Llâhou aḥad • l’isti‘âdha.')
    x += WRITE_LINES(2)
    corr('L3_E2', 'Exercice 2', ['1. l’isti‘âdha (' + ISTI + ') • 2. la basmala (' + BASM + ') • 3. ' + V(112, 1) + '.'])
    x += SECTION('joue', 'JE JOUE : FEU VERT, FEU ROUGE')
    x += P(R('À deux ou en groupe.', i=True, color=GREY_T), keep=True, after=30, line=252)
    x += T('Le meneur récite la fin d’une sourate courte, la basmala et le début de la suivante, en choisissant l’une des quatre façons. Les joueurs lèvent un carton **vert** si la façon est permise, **rouge** si elle est interdite (façon 4) ou si la basmala est dite avant At-Tawba. Chaque bonne réponse rapporte un point.')
    x += SECTION('bilan', 'MON BILAN')
    x += BILAN(['Je dis l’isti‘âdha correctement avant de réciter.', 'Je sais où dire la basmala et où ne pas la dire.', 'Je connais les quatre façons d’enchaîner au début d’une sourate.', 'Je sais quelle façon est interdite entre deux sourates.'])
    x += SP(128) + DEFI('Récitez la fin d’Al-Falaq et le début d’An-Nâs en utilisant successivement les trois façons permises, puis nommez la façon interdite.', timed=False)
    return x

# ---------------------------------------------------------------- Leçon 4
def L4():
    x = PAGEBREAK() + LESSON_BANNER(E, 4, 'Les erreurs à éviter', 'لَحْنٌ') + SP()
    x += OBJECTIFS(E, ['distinguer l’**erreur claire** et l’**erreur cachée** ;', 'repérer les confusions de lettres les plus fréquentes ;', 'corriger les erreurs de voyelles, de chadda, de soukoun et d’allongement.'])
    x += SECTION('decouvre', 'JE DÉCOUVRE')
    x += T('Une erreur de récitation s’appelle **laḥn** (لَحْنٌ). Le tajwîd sert justement à les éviter. Les savants en distinguent deux sortes.')
    x += GRID(['', 'L’erreur claire (al-laḥn al-jaliyy)', 'L’erreur cachée (al-laḥn al-khafiyy)'],
              [['**Ce que c’est**', 'Une faute qui touche **le mot lui-même** : changer une lettre, une voyelle, oublier une chadda, ajouter ou supprimer une lettre.', 'Une faute qui touche **la beauté et la justesse** de la récitation sans changer le mot : ghounna oubliée, allongement mal mesuré, râ’ épais au lieu de fin…'],
               ['**Qui l’entend ?**', 'Tout le monde, même celui qui n’a pas étudié le tajwîd.', 'Surtout ceux qui connaissent les règles.'],
               ['**Gravité**', 'Elle peut **changer le sens** du verset : il faut absolument l’éviter.', 'Elle abîme la récitation transmise : on s’applique à la corriger.']],
              [1900, 4123, 4123], C, L, jcs=['left', 'left', 'left'])
    x += SP(114)
    x += DIAMOND('Quand une erreur claire change le sens', C)
    x += T('Dans ' + W(1, 7, 3) + ' (an‘am**ta**), la fatḥa sur le tâ’ veut dire « **Tu** as comblé de bienfaits » : on s’adresse à Allah. Lire une ḍamma (an‘am**tou**) donnerait « **j’ai** comblé » : le sens est complètement changé. De même, ' + W(2, 29, 19) + ' (‘alîm, « Omniscient ») commence par un ‘ayn ; prononcé avec une hamza, il ressemblerait à ' + W(2, 10, 9) + ' (alîm, « douloureux »).')
    x += DIAMOND('Les lettres que l’on confond souvent', C)
    x += GRID(['Lettres', 'La différence', 'Mots du Coran'],
              [[('AR', 'ح  /  ه', 40), 'ḥâ’ soufflé du milieu de la gorge / hâ’ léger du fond de la gorge', ('AR', W(1, 3, 1) + '  ' + W(112, 1, 2), 36)],
               [('AR', 'ع  /  ء', 40), '‘ayn serré du milieu de la gorge / hamza, arrêt net', ('AR', W(2, 29, 19) + '  ' + W(112, 1, 4), 36)],
               [('AR', 'ق  /  ك', 40), 'qâf épais du fond de la langue / kâf fin, un peu plus en avant', ('AR', W(112, 1, 1) + '  ' + W(112, 4, 4), 36)],
               [('AR', 'ص  /  س', 40), 'ṣâd épais / sîn fin', ('AR', W(1, 6, 2) + '  ' + W(114, 1, 4), 36)],
               [('AR', 'ط  /  ت', 40), 'ṭâ’ épais / tâ’ fin', ('AR', W(16, 98, 7) + '  ' + W(111, 1, 1), 36)],
               [('AR', 'ض  /  د', 40), 'ḍâd épais, par les côtés de la langue / dâl fin', ('AR', W(1, 7, 9) + '  ' + W(1, 4, 3), 36)],
               [('AR', 'ذ  /  ز', 40), 'dhâl, langue entre les dents / zây, sifflé', ('AR', W(1, 7, 2) + '  ' + W(99, 1, 2), 36)],
               [('AR', 'ث  /  س', 40), 'thâ’, langue entre les dents / sîn, sifflé', ('AR', W(102, 4, 1) + '  ' + W(102, 4, 3), 36)]],
              [1700, 4846, 3600], C, L, jcs=['center', 'left', 'center'])
    x += SP(114)
    x += DIAMOND('Les autres erreurs fréquentes', C)
    x += GRID(['Erreur', 'Ce qu’il faut faire', 'Exemple'],
              [['**Oublier la chadda**', 'Doubler la lettre : on la tient un instant.', ('AR', W(1, 5, 1), 40)],
               ['**Faire rebondir le soukoun**', 'La lettre sans voyelle s’arrête net, sans petite voyelle ajoutée.', ('AR', W(1, 2, 1), 40)],
               ['**Raccourcir un allongement**', 'Tenir la voyelle longue au moins deux temps.', ('AR', W(1, 4, 1), 40)],
               ['**Allonger une voyelle courte**', 'Une voyelle courte reste brève : *la-koum*, pas *lâ-koum*.', ('AR', W(2, 29, 4), 40)],
               ['**Prononcer l’alif de liaison**', 'En enchaînant, l’alif de liaison ne se lit pas.', ('AR', W(103, 3, 7), 40)]],
              [3000, 4546, 2600], C, L)
    x += SP(114)
    x += ECOUTE(['Pour sentir la différence entre ḥâ’ et hâ’, posez la main sur la gorge : le **ḥâ’** frotte au milieu de la gorge, comme quand on souffle sur des lunettes pour les nettoyer ; le **hâ’** est un simple souffle, très léger.',
                 'Pour le ‘ayn, serrez légèrement le milieu de la gorge en laissant passer la voix : ‘a. Pour la hamza, coupez net : a.'])
    x += SP(128)
    x += RETIENS(['L’**erreur claire** touche le mot (lettre, voyelle, chadda) : elle peut changer le sens.', 'L’**erreur cachée** touche la justesse (ghounna, allongement, épaisseur).',
                  'Paires à ne pas confondre : ḥâ’ et hâ’ • ‘ayn et hamza • qâf et kâf • ṣâd et sîn • ṭâ’ et tâ’ • ḍâd et dâl • dhâl et zây • thâ’ et sîn.'])
    x += SECTION('lis', 'JE LIS : LES PAIRES')
    x += JELIS([[W(1, 3, 1), W(112, 1, 2), W(113, 5, 3), W(112, 4, 3)],
                [W(2, 29, 19), W(2, 10, 9), W(1, 2, 4), W(112, 1, 4)],
                [W(112, 1, 1), W(112, 4, 4), W(113, 1, 4), W(102, 4, 2)],
                [W(1, 6, 2), W(114, 1, 4), W(103, 3, 5), W(112, 2, 2)],
                [W(1, 7, 9), W(1, 4, 3), W(1, 7, 6), W(1, 4, 2)],
                [W(1, 7, 2), W(99, 1, 2), W(102, 4, 1), W(102, 4, 3)]], key='L4_lis', arsz=48)
    corr('L4_lis', 'Je lis — points à surveiller', ['Dans chaque ligne, les deux premiers mots forment la paire de la leçon : faites entendre nettement la différence (ligne 1 : ḥâ’/hâ’ ; ligne 2 : ‘ayn/hamza ; ligne 3 : qâf/kâf ; ligne 4 : ṣâd/sîn ; ligne 5 : ḍâd/dâl ; ligne 6 : dhâl/zây puis thâ’/sîn).'])
    x += SECTION('coran', 'MOTS DU CORAN : ATTENTION AU SENS')
    x += MOTS([(W(1, 7, 3), 1, 7, 'fatḥa sur le tâ’ : « **Tu** as comblé »'),
               (W(2, 29, 19), 2, 29, '‘ayn : « Omniscient »'),
               (W(2, 10, 9), 2, 10, 'hamza : « douloureux »'),
               (W(112, 1, 1), 112, 1, 'qâf : « Dis »'),
               (W(1, 5, 1), 1, 5, 'chadda : *iy-yâ-ka*'),
               (W(1, 4, 1), 1, 4, 'allongement : *mâ-li-ki*')], field='Je lis :')
    x += SECTION('exerce', 'JE M’EXERCE')
    x += EXO(1, 'Claire ou cachée ?', 'L4_E1', 'Indiquez pour chaque erreur s’il s’agit d’une erreur **claire** (C) ou **cachée** (K).')
    x += BULLETS(['Lire un hâ’ léger à la place du ḥâ’ de ٱلرَّحْمَٰنِ.  ……', 'Oublier la ghounna du noûn doublé de إِنَّ.  ……', 'Lire une ḍamma à la place de la fatḥa de أَنْعَمْتَ.  ……',
                  'Tenir l’alif de ٱلضَّآلِّينَ deux temps au lieu de six.  ……', 'Oublier la chadda de إِيَّاكَ.  ……'], mark='•', mcolor='BE1EB4', after=40)
    corr('L4_E1', 'Exercice 1', ['1. C (une lettre est changée) • 2. K (la ghounna touche la justesse) • 3. C (le sens change) • 4. K (allongement mal mesuré) • 5. C (la chadda fait partie du mot).'])
    x += EXO(2, 'Je relie la lettre et son point de sortie', 'L4_E2')
    x += RELIER(['ح', 'ه', 'ق', 'ذ'], ['langue entre les dents', 'milieu de la gorge, soufflé', 'fond de la langue, épais', 'fond de la gorge, léger'])
    corr('L4_E2', 'Exercice 2', ['ح → B (milieu de la gorge, soufflé) • ه → D (fond de la gorge, léger) • ق → C (fond de la langue, épais) • ذ → A (langue entre les dents).'])
    x += SECTION('joue', 'JE JOUE : LE DÉTECTIVE DES ERREURS')
    x += P(R('Avec l’enseignant ou un parent.', i=True, color=GREY_T), keep=True, after=30, line=252)
    x += T('Le meneur lit à voix haute un mot de la rubrique « Je lis » en glissant **parfois** une erreur (un hâ’ au lieu d’un ḥâ’, une chadda oubliée, un allongement raccourci). Le détective, livre ouvert, dit « Juste ! » ou « Erreur ! » et, s’il a trouvé une erreur, il la nomme : claire ou cachée ? Dix mots par manche ; on échange ensuite les rôles.')
    x += SECTION('bilan', 'MON BILAN')
    x += BILAN(['Je sais distinguer l’erreur claire et l’erreur cachée.', 'Je ne confonds pas le ḥâ’ et le hâ’, ni le ‘ayn et la hamza.', 'Je distingue les lettres épaisses (ṣâd, ṭâ’, ḍâd, qâf) de leurs voisines fines.',
                'Je respecte chadda, soukoun et allongements.'])
    x += SP(128) + DEFI('Lisez les six lignes de « Je lis » sans aucune erreur claire, en moins d’une minute.')
    return x

def BILAN_ETAPE():
    x = PAGEBREAK() + SECTION('bilan', 'MON BILAN DE L’ÉTAPE 1', before=0)
    x += P(R('Avant de monter la marche suivante, vérifiez que celle-ci est solide.', i=True, color=GREY_T), jc='center', after=60, line=252)
    x += BILAN(['Je sais ce qu’est le tajwîd : le droit et le dû de la lettre.', 'Je connais les rythmes taḥqîq, tadwîr et ḥadr.',
                'Je dis l’isti‘âdha et la basmala et j’enchaîne correctement au début d’une sourate.', 'Je sais quelle façon est interdite entre deux sourates, et le cas d’At-Tawba.',
                'Je distingue l’erreur claire et l’erreur cachée.', 'Je ne confonds plus les paires de lettres de la leçon 4.'])
    x += SP(128)
    ps = (P(R('★  Mon défi d’étape', font='Nunito ExtraBold', b=True, color='A83838'), after=15, line=240)
          + P(rich('Commencez par l’isti‘âdha et la basmala, puis récitez **toute la Fâtiḥa** au rythme **tadwîr**, sans erreur claire, devant votre enseignant. Faites-vous signaler les erreurs cachées éventuelles et notez-les ci-dessous pour les travailler.'), jc='both', after=15, line=245)
          + P(R('Erreurs cachées à travailler : ', color=GREY_T) + FIELD(), after=30, line=252)
          + P(R('Étape 1 validée le : ', b=True, color=C) + FIELD() + R('        Visa de l’enseignant ou du parent : ', b=True, color=C) + FIELD(), after=0, line=252))
    x += tbl([[tc(ps, FULL, 'FCF3E6', (100, 200, 100, 200))]], [FULL], 'E8C68C')
    return x

def ETAPE1():
    return etape_open() + L1() + L2() + L3() + L4() + BILAN_ETAPE()
