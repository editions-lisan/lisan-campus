# Outils communs aux étapes
from lesson import *
from tajwid import *

WAQF = 'ۖۗۘۙۚۛۜ'
_NR = None; _MR = None
def NR():
    global _NR
    if _NR is None: _NR = noon_rules(list(range(78, 115)) + [1, 2, 36, 67])
    return _NR
def MR():
    global _MR
    if _MR is None: _MR = meem_rules(list(range(78, 115)) + [1, 36, 67])
    return _MR

def clean_pair(s, a, wi, nw):
    w = tokens(s, a)
    return not any(ch in w[wi - 1] for ch in WAQF) and not w[wi - 1].startswith('۞')

def picks(rule, letters=None, n=6, src=None, tanwin=None, used=None, maxw=2):
    """choisit n exemples variés d'une règle (lettres suivantes différentes si possible)."""
    src = src if src is not None else NR()
    used = used if used is not None else set()
    out, seen_l = [], {}
    cands = [x for x in src if x[0] == rule and (letters is None or x[5] in letters) and (tanwin is None or x[6] == tanwin)
             and clean_pair(x[1], x[2], x[3], x[4]) and (x[4] - x[3] + 1) <= maxw]
    # tour 1 : une lettre différente à chaque fois
    for x in cands:
        if len(out) >= n: break
        k = (x[1], x[2], x[3])
        if k in used or x[5] in seen_l: continue
        out.append(x); used.add(k); seen_l[x[5]] = 1
    for x in cands:
        if len(out) >= n: break
        k = (x[1], x[2], x[3])
        if k in used: continue
        out.append(x); used.add(k)
    return out

def cards_from(xs, pred, note=None):
    res = []
    for r, s, a, wi, nw, nl, tw in xs:
        res.append(M(s, a, wi, nw, pred=pred, note=(note(nl, tw) if callable(note) else note)))
    return res

def marks_from(xs, pred):
    return [mark_word(s, a, wi, nw, pred) for r, s, a, wi, nw, nl, tw in xs]

def rows(lst, k):
    return [lst[i:i + k] for i in range(0, len(lst), k)]

LETNAME = {'ء': 'hamza', 'أ': 'hamza', 'إ': 'hamza', 'ؤ': 'hamza', 'ئ': 'hamza', 'ه': 'hâ’', 'ع': '‘ayn', 'ح': 'ḥâ’', 'غ': 'ghayn', 'خ': 'khâ’', 'ي': 'yâ’', 'ن': 'noûn',
           'م': 'mîm', 'و': 'wâw', 'ل': 'lâm', 'ر': 'râ’', 'ب': 'bâ’', 'ت': 'tâ’', 'ث': 'thâ’', 'ج': 'jîm', 'د': 'dâl', 'ذ': 'dhâl', 'ز': 'zây', 'س': 'sîn', 'ش': 'chîn',
           'ص': 'ṣâd', 'ض': 'ḍâd', 'ط': 'ṭâ’', 'ظ': 'ẓâ’', 'ف': 'fâ’', 'ق': 'qâf', 'ك': 'kâf', 'ا': 'alif'}

def lesson(**k): return k

_WIDX = None
def word_index():
    global _WIDX
    if _WIDX is None:
        _WIDX = []
        for s in [1] + list(range(78, 115)):
            for a in range(1, len(Q[s - 1]['verses']) + 1):
                for i, w in enumerate(tokens(s, a), 1):
                    _WIDX.append((s, a, i, w))
    return _WIDX

_usedw = set()
_seen_txt = set()
def find_words(pred, n=6, maxlen=12, avoid_marks=True, exclude=(), first=None, skip=0):
    """mots du dernier hizb (et de la Fâtiḥa) contenant une lettre qui satisfait pred."""
    out = []
    for s, a, i, w in word_index():
        if (s, a, i) in _usedw or w in exclude or w in _seen_txt: continue
        if skip and any(ch in w for ch in ''): pass
        if avoid_marks and any(ch in w for ch in WAQF + '۞'): continue
        if len(w) > maxlen: continue
        cl = [(m.group(1), m.group(2)) for m in CL.finditer(w)]
        if any(pred(l, mk) for l, mk in cl):
            if first and not first(w): continue
            if skip: skip -= 1; continue
            out.append((s, a, i)); _usedw.add((s, a, i)); _seen_txt.add(w)
            if len(out) >= n: break
    return out

def W1(s, a, i, pred=None, note=None, blue=False):
    return M(s, a, i, None, pred=pred, note=note, blue=blue)

def P_SUK(chars):
    return lambda l, mk: l in chars and SUK in mk
def P_ANY(chars):
    return lambda l, mk: l in chars
def FW(chars, n=6, sak=True, **k):
    """n mots (cartes) avec une des lettres chars (avec soukoun si sak), lettre surlignée."""
    pred = P_SUK(chars) if sak else P_ANY(chars)
    return [W1(s, a, i, pred=pred) for s, a, i in find_words(pred, n=n, **k)]

def FM(chars, n=2, sak=True, start=0, **k):
    """cartes « mots du Coran » : n mots, sans tenir compte des mots déjà employés."""
    pred = P_SUK(chars) if sak else P_ANY(chars)
    out, seen = [], set()
    for s, a, i, w in word_index():
        if any(ch in w for ch in WAQF + '۞') or len(w) > 12 or w in seen: continue
        if any(pred(l, mk) for l, mk in [(m.group(1), m.group(2)) for m in CL.finditer(w)]):
            seen.add(w)
            if start: start -= 1; continue
            out.append(W1(s, a, i, pred=pred))
            if len(out) >= n: break
    return out

def uniq(cards):
    seen, out = set(), []
    for c in cards:
        k = plain_ar(c[0])
        if k in seen: continue
        seen.add(k); out.append(c)
    return out

def FRE(regex, n=6, pred=None, maxlen=12, start=0, used=None):
    """mots dont le texte correspond à regex ; surlignage optionnel par pred."""
    rx = re.compile(regex); out, seen = [], set()
    for s, a, i, w in word_index():
        if any(ch in w for ch in WAQF + '۞') or len(w) > maxlen or w in seen: continue
        if used is not None and (s, a, i) in used: continue
        if rx.search(w):
            seen.add(w)
            if start: start -= 1; continue
            out.append(W1(s, a, i, pred=pred) if pred else M(s, a, i))
            if used is not None: used.add((s, a, i))
            if len(out) >= n: break
    return out
def txts(cards): return [c[0] for c in cards]
