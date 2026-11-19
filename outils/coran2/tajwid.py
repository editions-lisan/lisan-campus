# Repérage automatique d'exemples de tajwîd dans le texte du Mouss-haf (Ḥafṣ)
import re
from lib import Q, V

LET = 'ء-غف-يٱیہ'
MARK = 'ً-ٰٟۖ-ۭـ'
CL = re.compile(f'([{LET}])([{MARK}]*)')
FATHA, DAMMA, KASRA, SUK, SHAD = 'َ', 'ُ', 'ِ', 'ْ', 'ّ'
TAN = 'ًࣰٌࣱٍࣲٖٗٞ'
TAN += '\u06E2\u06ED'
TAN_OPEN = 'ࣰࣱࣲٖٗٞ'
VOW = FATHA + DAMMA + KASRA + TAN
SMALL_MEEM = 'ۢ'   # iqlâb (haut)
SMALL_MEEM_LOW = 'ۭ'

IZHAR = 'ءأإؤئهعحغخ'
YARMALUN = 'يرملون'
IDGH_G = 'ينمو'
IDGH_NG = 'لر'
IKHFA = 'تثجدذزسشصضطظفقك'
QALQALA = 'قطبجد'
SURAS30 = list(range(78, 115))

def clusters(word):
    return [(m.group(1), m.group(2), m.start(), m.end()) for m in CL.finditer(word)]

def is_sakin(l, mk):
    """lettre sans voyelle prononcée (soukoun écrit ou omis devant idghâm/ikhfâ’)."""
    if SUK in mk: return True
    if any(v in mk for v in VOW) or SHAD in mk: return False
    if '۟' in mk or '۠' in mk: return False   # lettre non lue
    return True

def tokens(s, a):
    return V(s, a).split(' ')

def seq(s, a):
    """liste (mot, index cluster, lettre, marques) pour le verset."""
    out = []
    for wi, w in enumerate(tokens(s, a), 1):
        for ci, (l, mk, st, en) in enumerate(clusters(w)):
            out.append((wi, ci, l, mk))
    return out

def next_letter(sq, k):
    """lettre prononcée suivante (saute l'alif muet après tanwîn de fatḥa, les lettres non lues)."""
    j = k + 1
    while j < len(sq):
        wi, ci, l, mk = sq[j]
        if l in 'اى' and not any(c in mk for c in VOW + SHAD + SUK + 'ٰٔ'):
            j += 1; continue
        if '۟' in mk: j += 1; continue
        return j
    return None

def noon_rules(suras=SURAS30, limit=None):
    """renvoie [(règle, s, a, wi1, wi2, lettre suivante, tanwin?)]"""
    res = []
    for s in suras:
        for a in range(1, len(Q[s - 1]['verses']) + 1):
            sq = seq(s, a)
            for k, (wi, ci, l, mk) in enumerate(sq):
                tanw = any(t in mk for t in TAN)
                noon = (l == 'ن' and is_sakin(l, mk))
                if not (tanw or noon): continue
                j = next_letter(sq, k)
                if j is None: continue   # fin de verset : on s'arrête
                nw, nci, nl, nmk = sq[j]
                same_word = (nw == wi)
                if nl in IZHAR: r = 'izhar'
                elif nl == 'ب': r = 'iqlab'
                elif nl in IDGH_G: r = 'izhar_mutlaq' if same_word else 'idgham_g'
                elif nl in IDGH_NG: r = 'idgham_ng'
                elif nl in IKHFA: r = 'ikhfa'
                else: continue
                res.append((r, s, a, wi, nw, nl, tanw))
    return res

def meem_rules(suras=SURAS30):
    res = []
    for s in suras:
        for a in range(1, len(Q[s - 1]['verses']) + 1):
            sq = seq(s, a)
            for k, (wi, ci, l, mk) in enumerate(sq):
                if l != 'م' or not is_sakin(l, mk): continue
                j = next_letter(sq, k)
                if j is None: continue
                nw, nci, nl, nmk = sq[j]
                r = 'ikhfa_ch' if nl == 'ب' else ('idgham_m' if nl == 'م' else 'izhar_ch')
                res.append((r, s, a, wi, nw, nl, False))
    return res

def mark_word(s, a, i, j=None, pred=None, nth=1, blue=True):
    """Texte des mots i..j avec la n-ième lettre satisfaisant pred en jaune et la lettre suivante en bleu."""
    allw = tokens(s, a)
    if i < 1 or (j or i) > len(allw): raise IndexError(f'mot {s}:{a}:{i}-{j} hors limites')
    words = allw[i - 1:(j or i)]
    text = ' '.join(words)
    cl = [(m.group(1), m.group(2), m.start(), m.end()) for m in CL.finditer(text)]
    hits = [k for k, c in enumerate(cl) if pred(c[0], c[1])]
    if len(hits) < nth: raise ValueError(f'pas de cible dans {text}')
    k = hits[nth - 1]
    y0, y1 = cl[k][2], cl[k][3]
    b = None
    if blue:
        q = k + 1
        while q < len(cl):
            l, mk = cl[q][0], cl[q][1]
            if l in 'اى' and not any(c in mk for c in VOW + SHAD + SUK + 'ٰٔ'): q += 1; continue
            if '۟' in mk: q += 1; continue
            break
        if q < len(cl): b = (cl[q][2], cl[q][3])
    out = text[:y0] + '⟦' + text[y0:y1] + '⟧'
    if b:
        out += text[y1:b[0]] + '⟨' + text[b[0]:b[1]] + '⟩' + text[b[1]:]
    else:
        out += text[y1:]
    return out

# prédicats usuels
P_NOON = lambda l, mk: (l == 'ن' and is_sakin(l, mk)) or any(t in mk for t in TAN)
P_MEEM = lambda l, mk: l == 'م' and is_sakin(l, mk)
P_QALQ = lambda l, mk: l in QALQALA and SUK in mk
def P_LET(ch, sak=None):
    return lambda l, mk: l == ch and (sak is None or is_sakin(l, mk) == sak)
