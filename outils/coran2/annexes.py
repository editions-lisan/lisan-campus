# Attestation et annexes du livre de l'élève
from blocks import *
from c_front import PLAN

G = '0E3B2E'

def ATTESTATION():
    x = PAGEBREAK() + BM('attestation') + SP(400)
    ps = (P(IMG(img_rel('imglc2_wordmark.png'), 2160000, 684000, 'lisan_wordmark'), jc='center', after=120, line=240)
          + P(R('ATTESTATION', font='Quicksand Bold', b=True, color=G, sz=56, spacing=60), jc='center', after=20, line=240)
          + P(R('de fin du niveau 2 — Lire le Coran pas à pas 2', font='Nunito ExtraBold', b=True, color='B8923A', sz=28), jc='center', after=200, line=240)
          + P(AR('وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا', sz=56, color=G), jc='center', bidi=True, after=200, line=240)
          + P(R('Cette attestation est décernée à', i=True, color=GREY_T, sz=26), jc='center', after=60, line=252)
          + P(TAB(), tabs=[('right', 8200, 'dot')], jc='left', before=60, after=120, line=360)
          + P(rich('qui a suivi les **dix étapes** et les **quarante leçons** du livre, appris les règles du **tajwîd** selon la lecture de **Ḥafṣ ‘an ‘Âṣim**, et récité devant son enseignant les sourates de l’étape 10 en appliquant ces règles.', sz=26), jc='center', after=200, line=276)
          + P(R('Fait à ', sz=26) + FIELD('……………………') + R('   le ', sz=26) + FIELD('……… / ……… / …………'), jc='center', after=240, line=276)
          + tbl([[tc(P(R('L’enseignant', b=True, color=G), jc='center', after=600, line=240), 4300, 'FFFFFF', (60, 60, 60, 60)),
                  tc(P(R('Le parent', b=True, color=G), jc='center', after=600, line=240), 4300, 'FFFFFF', (60, 60, 60, 60))]], [4300, 4300], 'FFFFFF', 4, inside=False)
          + P(R('Éditions Lisân — « La langue qui ouvre les portes »', i=True, color=GREY_T, sz=22), jc='center', before=200, after=0, line=240))
    x += tbl([[tc(ps, 9400, 'FBF8F1', (400, 500, 400, 500))]], [9400], 'B8923A', 24)
    return x

def RECAPS():
    x = H_PAGE('Tableaux récapitulatifs', 'Les règles du livre en un coup d’œil')
    x += DIAMOND('Le noûn sâkin et le tanwîn', G, before=0)
    x += GRID(['Règle', 'Lettres qui suivent', 'Ce que je fais'],
              [['Iẓhâr', ('AR', 'ء ه ع ح غ خ', 34), 'noûn clair, sans ghounna prolongée'], ['Idghâm avec ghounna', ('AR', 'ي ن م و', 34), 'fusion, ghounna de 2 temps (entre deux mots)'],
               ['Idghâm sans ghounna', ('AR', 'ل ر', 34), 'fusion complète'], ['Iqlâb', ('AR', 'ب', 34), 'mîm caché, ghounna de 2 temps'], ['Ikhfâ’', 'les 15 autres lettres', 'noûn caché, ghounna de 2 temps']],
              [2600, 3300, 4246], G, 'F4F8F6')
    x += SP(114) + DIAMOND('Le mîm sâkin', G)
    x += GRID(['Règle', 'Lettre qui suit', 'Ce que je fais'], [['Ikhfâ’ chafawî', ('AR', 'ب', 34), 'mîm caché, ghounna de 2 temps'], ['Idghâm', ('AR', 'م', 34), 'un mîm doublé, ghounna de 2 temps'], ['Iẓhâr chafawî', 'les 26 autres', 'mîm clair (surtout devant و et ف)']],
              [2600, 3300, 4246], G, 'F4F8F6')
    x += SP(114) + DIAMOND('Les madd', G)
    x += GRID(['Madd', 'Cause', 'Durée'], [['naturel', 'aucune', '2'], ['badal', 'hamza avant la lettre de prolongation', '2'], ['séparé (mounfaṣil)', 'hamza au début du mot suivant', '4 ou 5'],
                                           ['‘âriḍ et lîn', 'arrêt sur la dernière lettre', '2, 4 ou 6'], ['joint (mouttaṣil)', 'hamza dans le même mot', '4 ou 5'], ['lâzim', 'soukoun permanent ou chadda', '6']],
              [2800, 5346, 2000], G, 'F4F8F6', jcs=['left', 'left', 'center'])
    x += SP(114) + DIAMOND('Épais ou fin ?', G)
    x += GRID(['Lettre', 'Épaisse', 'Fine'], [['خُصَّ ضَغْطٍ قِظْ', 'toujours', 'jamais'], ['l’alif', 'après une lettre épaisse', 'après une lettre fine'],
                                             ['le lâm d’Allah', 'après fatḥa ou ḍamma, au début', 'après kasra'], ['le râ’', 'avec fatḥa ou ḍamma ; sans voyelle après fatḥa ou ḍamma', 'avec kasra ; sans voyelle après kasra (sauf lettre épaisse après)']],
              [2400, 3873, 3873], G, 'F4F8F6')
    return x

GLOSS = [('Badal', 'madd d’une lettre de prolongation précédée d’une hamza (2 temps).'), ('Chafawî', 'qui concerne les lèvres (ikhfâ’ et iẓhâr chafawî).'), ('Ghounna', 'son nasal du noûn et du mîm, qui sort du nez.'),
         ('Ḥadr', 'rythme de récitation rapide.'), ('Ibtidâ’', 'reprise de la récitation après un arrêt.'), ('Ichmâm', 'arrondir les lèvres sans voix à l’arrêt ; dans تَأْمَ۬نَّا, chez Ḥafṣ.'),
         ('Idghâm', 'fusion d’une lettre sans voyelle dans la suivante.'), ('Ikhfâ’', 'dissimulation du noûn ou du mîm, avec ghounna.'), ('Imâla', 'son entre « a » et « i » ; chez Ḥafṣ, seulement dans مَجْرٜىٰهَا.'),
         ('Iqlâb', 'le noûn sâkin ou le tanwîn devient mîm devant le bâ’.'), ('Isti‘lâ’', 'épaisseur des sept lettres خُصَّ ضَغْطٍ قِظْ.'), ('Iẓhâr', 'prononciation claire.'),
         ('Laḥn', 'erreur de récitation (claire ou cachée).'), ('Madd', 'prolongation d’une voyelle.'), ('Makhraj', 'point de sortie d’une lettre (pluriel : makhârij).'),
         ('Qalqala', 'léger rebond des lettres قُطْبُ جَدٍّ sans voyelle.'), ('Rawm', 'faire entendre une partie de la voyelle à l’arrêt, à voix basse.'), ('Ṣifa', 'qualité d’une lettre (pluriel : ṣifât).'),
         ('Sakta', 'petite pause sans reprendre son souffle.'), ('Ṣila', 'prolongation du hâ’ du pronom entre deux voyelles.'), ('Tadwîr', 'rythme de récitation moyen.'),
         ('Tafkhîm', 'épaississement d’une lettre.'), ('Taḥqîq', 'rythme de récitation très posé, pour apprendre.'), ('Tajwîd', 'donner à chaque lettre son droit et son dû.'),
         ('Tarqîq', 'prononciation fine d’une lettre.'), ('Tartîl', 'récitation posée demandée par le Coran.'), ('Tas-hîl', 'adoucissement d’une hamza ; chez Ḥafṣ, dans ءَا۬عْجَمِيّٞ.'),
         ('Waqf', 'arrêt de la récitation.')]

def GLOSSAIRE():
    x = H_PAGE('Petit glossaire du tajwîd', 'Les mots arabes du livre, par ordre alphabétique')
    rows = [[tc(P(R(t, font='Nunito ExtraBold', b=True, color=G), after=0, line=240), 2400, 'F4F8F6'), tc(P(rich(d, arsz=30), after=0, line=245), 7746, 'FFFFFF')] for t, d in GLOSS]
    return x + tbl(rows, [2400, 7746], 'D5DDD8', 6)

def CARNET():
    x = H_PAGE('Mon carnet de suivi', 'Je note la date et je fais signer chaque leçon réussie.')
    for n, title, ar, lessons in PLAN:
        c, l = ETAPES[n - 1]
        rows = [[tc(P(R(f'ÉTAPE {n} — {title}', b=True, color='FFFFFF'), after=0, line=240, keep=True), FULL, c, span=4)]]
        rows.append([tc(P(R(h, b=True, color=c), jc='center', after=0, line=240, keep=True), w, l) for h, w in (('Leçon', 1100), ('Titre', 5446), ('Réussie le', 1800), ('Visa', 1800))])
        for num, t, _ in lessons:
            rows.append([tc(P(R(str(num), b=True, color=c), jc='center', after=0, line=240, keep=True), 1100, 'FFFFFF'), tc(P(rich(t, arsz=28), after=0, line=240, keep=True), 5446, 'FFFFFF'),
                         tc(P(FIELD(), jc='center', after=0, line=240), 1800, 'FFFFFF'), tc(P(''), 1800, 'FFFFFF')])
        x += tbl(rows, [1100, 5446, 1800, 1800], 'D5DDD8', 6) + SP(114)
    return x
