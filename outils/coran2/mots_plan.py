"""Choix du passage enregistré pour chaque « mot du Coran » du site (parcours qr2), selon la règle de la leçon.

Principe : l'audio fait entendre exactement ce qui est écrit, lu comme la leçon le demande.
1. Début propre : un mot qui commence par une hamza de liaison (ٱ) ou par une lettre doublée par l'assimilation du mot
   précédent (chadda sur la première lettre) ne peut pas être isolé au milieu d'un verset récité d'un trait : on prend
   le même mot (même écriture) au début d'un autre verset ; à défaut, la carte montre aussi le mot qui précède.
2. Fin propre : si le mot suivant commence par une lettre doublée (idghâm : chadda dans le Mouss-haf) ou par l'article
   devant une lettre solaire (ٱللَّه, ٱلشَّمْس : lâm muet, lettre doublée), la fin du mot se fond dans le suivant : la carte
   montre aussi le mot suivant.
3. Arrêt : quand la règle de la leçon se fait entendre à l'arrêt (qalqala forte, madd ‘âriḍ et lîn, râ’ à l'arrêt,
   compensation, madd joint à l'arrêt, « comment m'arrêter »), on prend une occurrence en fin de verset (ou suivie
   d'une pause du récitateur) ; à défaut, le cas est signalé.
4. Remplacements choisis à la main (REMPLACE) quand la leçon le demande (autre mot, même règle).
"""
import json, os, re, unicodedata as ud, functools
import mots_audio as A
import mots_ctc as C

LC2 = os.environ.get('LC2_BASE', '/tmp/lc2-travail')
SHADDA = 'ّ'

@functools.lru_cache(None)
def quran():
    Q = json.load(open(LC2 + '/qj/package/dist/quran.json'))
    return {(s['id'], v['id']): v['text'].replace('ۡ', 'ْ').split(' ') for s in Q for v in s['verses']}

@functools.lru_cache(None)
def index():
    ix = {}
    for (s, a), ws in quran().items():
        for i, w in enumerate(ws, 1):
            ix.setdefault(ud.normalize('NFC', w), []).append((s, a, i))
    return ix

def words(s, a, i, j): return ' '.join(quran()[(s, a)][i - 1:j])

def doubled_start(w):
    """première lettre portant une chadda (assimilation du mot précédent), hors article et hamza"""
    core = re.sub(r'[ً-ٰٟۖ-ۭ]', '', w)
    return len(w) > 1 and not w.startswith('ٱ') and SHADDA in w[1:3]

def wasla_start(w): return w.startswith('ٱ')

def sun_article(w):
    """article suivi d'une lettre solaire (lâm muet, lettre doublée) : ٱلشَّمْس, ٱللَّه…"""
    m = re.match(r'ٱل(.)([\u064B-\u065F\u0670]*)', ud.normalize('NFC', w))
    return bool(m and SHADDA in m.group(2))

WAQF_NOTES = ('arrêt', 'compensation', '‘âriḍ', 'lîn', 'qalqala à l')
WAQF_LESSONS = {31, 34}
def needs_waqf(n, note):
    return n in WAQF_LESSONS or any(k in (note or '') for k in WAQF_NOTES)

# remplacements choisis : (leçon, sourate, verset, i, j) -> (sourate, verset, i, j, note ou None pour garder)
REMPLACE = {
    (33, 86, 1, 1, 1): (3, 5, 10, 11, 'joint à l’arrêt'),       # « fî s-samâ’ » en fin de verset : arrêt réel sur le madd joint
    (35, 6, 99, 33, 33): (17, 21, 1, 1, 'ounẓour'),              # ٱنظُرْ en tête de verset : hamza de liaison prononcée « ou »
    (15, 78, 36, 2, 3): (76, 10, 3, 4, None),                    # « min rabbinâ » : début net (le « mi » de 78:36 est assimilé au tanwîn)
    (21, 79, 33, 2, 3): (109, 6, 2, 3, None),                    # « dînukum waliya » : mîm sâkin + wâw, début net
    (34, 1, 7, 7, 7): (1, 7, 4, 4, None),                        # ‘alayhim suivi d'une pause d'al-Ḥouṣarî (le second est lié à « wa-lâ »)
}

# Coran vérifié verset par verset (minutage disponible) : sinon, pas de remplacement automatique
def has_timing(s, a, i, j):
    try: return A.word_times(s, a, i, j) is not None
    except Exception: return False

def pause_before(s, a, i, j): return C.bounds(s, a, i, j)['pre'] >= C.PAUSE
def pause_after(s, a, i, j): return C.bounds(s, a, i, j)['post'] >= C.PAUSE

def plan(n, s, a, i, j, note):
    why = []
    if (n, s, a, i, j) in REMPLACE:
        s, a, i, j, nn = REMPLACE[(n, s, a, i, j)]; note = nn if nn is not None else note; why.append('remplacé (leçon)')
    W = quran()[(s, a)]
    first, last = W[i - 1], W[j - 1]
    # 1. début propre
    if i > 1 and (wasla_start(first) or doubled_start(first)):
        if not pause_before(s, a, i, j):
            alt = None
            if i == j:
                cands = [x for x in index().get(ud.normalize('NFC', first), []) if x[2] == 1 and has_timing(x[0], x[1], 1, 1)]
                if needs_waqf(n, note): cands = [x for x in cands if len(quran()[(x[0], x[1])]) == 1]
                if cands: alt = cands[0]
            if alt:
                s, a, i, j = alt[0], alt[1], 1, 1; why.append('même mot en tête de verset')
            else:
                i -= 1; why.append('avec le mot précédent (début : ' + ('hamza de liaison' if wasla_start(first) else 'lettre assimilée') + ')')
                while i > 1 and (wasla_start(W[i - 1]) or doubled_start(W[i - 1])) and not pause_before(s, a, i, j):
                    i -= 1
    W = quran()[(s, a)]
    # 2. fin propre : le mot suivant commence par une lettre assimilée
    while j < len(W) and (doubled_start(W[j]) or sun_article(W[j])) and not pause_after(s, a, i, j):
        why.append('avec le mot suivant (' + ('lettre solaire' if sun_article(W[j]) else 'idghâm') + ')'); j += 1
    # 3. arrêt demandé
    flag = ''
    if needs_waqf(n, note):
        if not (j == len(W) or pause_after(s, a, i, j)):
            if i == j:
                cands = [x for x in index().get(ud.normalize('NFC', W[i - 1]), []) if x[2] == len(quran()[(x[0], x[1])]) and has_timing(*x, x[2])]
                cands = [x for x in cands if not (wasla_start(W[i - 1]) or doubled_start(W[i - 1])) or x[2] == 1]
                if cands:
                    s, a, i = cands[0]; j = i; why.append('même mot en fin de verset (arrêt)')
                else: flag = 'ARRÊT INTROUVABLE'
            else: flag = 'ARRÊT INTROUVABLE'
    return dict(s=s, a=a, i=i, j=j, note=note, why='; '.join(why), flag=flag, text=words(s, a, i, j))
