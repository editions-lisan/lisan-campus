"""Calage lettre par lettre des « mots du Coran » sur la récitation d'al-Ḥouṣarî, par alignement forcé CTC
(modèle de reconnaissance de la parole Omnilingual ASR de Meta, 300M CTC, version ONNX de sherpa-onnx, licence Apache 2.0).

Pour chaque verset, le modèle donne toutes les 20 ms la probabilité de chaque lettre ; l'alignement forcé (Viterbi) sur
le texte connu du verset (squelette consonantique du Mouss-haf) situe chaque lettre dans le temps. On en tire, pour
chaque mot, l'instant où se fait entendre sa première lettre prononcée : c'est là qu'on coupe (début du mot, et fin du
mot précédent). Le même modèle, appliqué ensuite au seul extrait, sert de contrôle : sa transcription doit être
exactement le mot écrit, sans lettre du mot voisin.

Réglage : variable d'environnement OMNI (dossier du modèle sherpa-onnx-omnilingual-asr-1600-languages-300M-ctc-int8).
"""
import os, re, json, functools, unicodedata as ud
import numpy as np
import mots_audio as A

OMNI = os.environ.get('OMNI', '')
CACHE = os.environ.get('CTC_CACHE', os.path.join(os.environ.get('LC2_BASE', '/tmp/lc2-travail'), 'ctc'))
STEP = 0.0200059756          # durée d'une trame du modèle (s), mesurée

@functools.lru_cache(None)
def vocab():
    T = {}
    for l in open(OMNI + '/tokens.txt', encoding='utf-8'):
        t, i = l.rstrip('\n').rsplit(' ', 1); T[t] = int(i)
    return T

@functools.lru_cache(None)
def session():
    import onnxruntime as ort
    o = ort.SessionOptions(); o.intra_op_num_threads = 4
    return ort.InferenceSession(OMNI + '/model.int8.onnx', o)

def to16k(y):
    idx = np.arange(0, len(y), A.SR / 16000).astype(int); z = y[idx].astype(np.float32)
    return (z - z.mean()) / (z.std() + 1e-7)

def logprobs(y):
    lg = session().run(None, {'x': to16k(y)[None]})[0][0].astype(np.float32)
    lg -= lg.max(-1, keepdims=True); return lg - np.log(np.exp(lg).sum(-1, keepdims=True))

@functools.lru_cache(None)
def arabic_ids():
    return np.array(sorted({0, vocab()[' ']} | {i for c, i in vocab().items() if len(c) == 1 and '\u0621' <= c <= '\u064A'}))

def decode(y, pad=0.4):
    """transcription (lettres arabes seulement) d'un extrait, entouré d'un peu de silence"""
    z = np.concatenate([np.zeros(int(A.SR * pad)), y, np.zeros(int(A.SR * pad))]).astype(np.float32)
    ids = arabic_ids(); inv = {v: k for k, v in vocab().items()}
    am = ids[logprobs(z)[:, ids].argmax(-1)]; out, prev = [], -1
    for a in am:
        if a != prev and a != 0: out.append(inv[a])
        prev = a
    return re.sub(' +', ' ', ''.join(out)).strip()

# --- squelette d'un mot du Mouss-haf, tel que le modèle l'écrit -------------------------------------------------
MARKS = re.compile(r'[ً-ٰٟۖ-ۭـ࣓-ࣿ]')
def skeleton(w):
    w = ud.normalize('NFC', w)
    w = w.replace('ٰ', 'ا')                                  # alif suscrit : prononcé
    w = w.replace('ٱ', 'ا').replace('ۥ', '').replace('ۦ', '')
    w = MARKS.sub('', w)
    if w.startswith('ءا'): w = 'آ' + w[2:]                 # hamza + alif en tête : écrit آ
    return ''.join(c for c in w if c in vocab() and c != ' ')

def pronounced_start(w):
    """indice, dans le squelette, de la première lettre prononcée en liaison (hamza de liaison et lâm solaire muets)"""
    sk = skeleton(w); k = 0
    if w.startswith('ٱ'):
        k = 1
        m = re.match(r'ٱل(.)([ً-ٰٟ]*)', ud.normalize('NFC', w))
        if m and 'ّ' in m.group(2): k = 2            # lâm solaire (lettre suivante doublée) : muet
    return min(k, max(0, len(sk) - 1))

# --- alignement forcé -------------------------------------------------------------------------------------------
def viterbi(lp, tgt):
    """alignement CTC (blanc = 0) ; renvoie pour chaque cible la première et la dernière trame où elle est émise"""
    T, L = lp.shape[0], len(tgt); S = 2 * L + 1
    lab = np.zeros(S, int); lab[1::2] = tgt
    em = lp[:, lab]                                       # T x S
    NEG = -1e9; dp = np.full(S, NEG); dp[0] = em[0, 0]; dp[1] = em[0, 1]
    bp = np.zeros((T, S), np.int8)
    skip = np.zeros(S, bool); skip[3::2] = lab[3::2] != lab[1:-2:2]
    for t in range(1, T):
        a = dp; b = np.concatenate([[NEG], dp[:-1]]); c = np.concatenate([[NEG, NEG], dp[:-2]]); c = np.where(skip, c, NEG)
        st = np.stack([a, b, c]); k = st.argmax(0); dp = st[k, np.arange(S)] + em[t]; bp[t] = k
    s = int(S - 1 if dp[S - 1] >= dp[S - 2] else S - 2)
    path = np.zeros(T, int)
    for t in range(T - 1, -1, -1):
        path[t] = s; s -= int(bp[t, s])
    first, last = np.full(L, -1), np.full(L, -1)
    for t, s in enumerate(path):
        if s % 2:
            q = s // 2
            if first[q] < 0: first[q] = t
            last[q] = t
    return first, last

def verse_words(s, a):
    import mots_plan as P
    return P.quran()[(s, a)]

@functools.lru_cache(256)
def align(s, a):
    """pour chaque mot du verset : (trame de la 1re lettre, trame de la 1re lettre prononcée, trame de la dernière lettre)"""
    os.makedirs(CACHE, exist_ok=True); f = f'{CACHE}/{s:03d}{a:03d}.json'
    if os.path.exists(f): return json.load(open(f))
    W = verse_words(s, a); V = vocab(); tgt, owner = [], []
    for k, w in enumerate(W):
        if k: tgt.append(V[' ']); owner.append(-1)
        for c in skeleton(w): tgt.append(V[c]); owner.append(k)
    lp = logprobs(A.audio(s, a)); first, last = viterbi(lp, tgt)
    out = []
    for k, w in enumerate(W):
        pos = [p for p, o in enumerate(owner) if o == k]
        ps = pos[pronounced_start(w)]
        out.append([int(first[pos[0]]), int(first[ps]), int(last[pos[-1]])])
    json.dump(out, open(f, 'w')); return out

def ms(fr): return int(round(fr * STEP * 1000))

# --- découpe ------------------------------------------------------------------------------------------------------
LAG = 70           # ms : l'attaque d'une lettre précède son pic CTC d'environ 50 ms (mesuré en tête de verset)
PAUSE = 250        # ms de silence entre deux mots = pause du récitateur

def silences(s, a, min_ms=80):
    d = A.env_db(s, a); thr = A.speech_thr(s, a); out = []; k = 0
    while k < len(d):
        if d[k] < thr:
            k0 = k
            while k < len(d) and d[k] < thr: k += 1
            if (k - k0) * 10 >= min_ms: out.append((k0 * 10, k * 10))
        else: k += 1
    return out

def gap_pause(s, a, t_end, t_next):
    """plus long silence entre la dernière lettre d'un mot et la première du suivant"""
    best = 0
    for b, e in silences(s, a):
        lo, hi = max(b, t_end), min(e, t_next)
        if hi - lo > best: best = hi - lo
    return best

def onset_cut(s, a, spike_ms, lo_ms=None):
    """point de coupe juste avant l'attaque d'une lettre (creux d'énergie entre spike-130 et spike-30 ms)"""
    d = A.env_db(s, a); c = (spike_ms - LAG) // 10
    lo, hi = max(1, (spike_ms - 130) // 10), max(2, (spike_ms - 30) // 10)
    if lo_ms is not None: lo = max(lo, lo_ms // 10)
    if hi <= lo: return max(0, c) * 10
    seg = d[lo:hi + 1] + np.abs(np.arange(lo, hi + 1) - c) * 0.05
    return (lo + int(np.argmin(seg))) * 10

def bounds(s, a, i, j):
    """(début, fin) en ms des mots i..j, avec l'état de chaque bord : 'libre' (silence) ou 'lié'"""
    al = align(s, a); N = len(al); d = A.env_db(s, a); thr = A.speech_thr(s, a); fl = A.floor_db(s, a)
    f_first = ms(al[i - 1][0]); f_pron = ms(al[i - 1][1]); f_last = ms(al[j - 1][2])
    # début
    pre = 9999 if i == 1 else gap_pause(s, a, ms(al[i - 2][2]), f_first)
    if pre >= PAUSE:
        k = max(0, (f_first - LAG) // 10)
        while k > 0 and d[k] > thr: k -= 1
        start, free_in = max(0, k - 3) * 10, True
    else:
        start, free_in = onset_cut(s, a, f_pron, lo_ms=ms(al[i - 2][2]) + 20), False
    # fin
    nxt = ms(al[j][1]) if j < N else len(d) * 10
    post = 9999 if j == N else gap_pause(s, a, f_last, ms(al[j][0]))
    if post >= PAUSE:
        k = f_last // 10
        while k < len(d) - 1 and d[k] > thr: k += 1
        while k < len(d) - 1 and d[k + 1] < d[k] and d[k] > fl + 4 and k - f_last // 10 < 60: k += 1
        stop, free_out = min(len(d) - 1, k + 4) * 10, True
    else:
        stop, free_out = onset_cut(s, a, nxt, lo_ms=f_last + 20), False
    return dict(start=start, stop=stop, free_in=free_in, free_out=free_out, pre=pre, post=post)

def clip(s, a, start, stop, free_in, free_out):
    return A.cut_at(s, a, start, stop, soft_in=not free_in, soft_out=not free_out)

# lettres qui peuvent manquer à l'oreille (muettes) : alif de liaison, alif après wâw du pluriel, alif maqṣûra brève…
def expected(s, a, i, j, free_in):
    W = verse_words(s, a)[i - 1:j]
    sk = [skeleton(w) for w in W]
    if not free_in and W[0].startswith('ٱ'): sk[0] = sk[0][pronounced_start(W[0]):]
    return ' '.join(sk)

def norm_cmp(t):
    t = t.replace('أ', 'ا').replace('إ', 'ا').replace('آ', 'ا').replace('ى', 'ي').replace('ة', 'ه').replace('ؤ', 'و').replace('ئ', 'ي').replace('ء', '')
    return re.sub(r'[^ء-ي]', '', t)

def judge(got, exp):
    """'exact' / 'proche' (lettre muette ou voyelle longue en plus ou en moins) / 'faux'"""
    g, e = norm_cmp(got), norm_cmp(exp)
    if g == e: return 'exact'
    import difflib
    sm = difflib.SequenceMatcher(None, g, e); ops = [o for o in sm.get_opcodes() if o[0] != 'equal']
    soft = set('اوي')
    ok = all((tag == 'delete' and set(g[a1:a2]) <= soft and 0 < a1 and a2 < len(g)) or
             (tag == 'insert' and set(e[b1:b2]) <= soft) for tag, a1, a2, b1, b2 in ops)
    return 'proche' if ok else 'faux'

# --- contrôle par rapport de vraisemblance ---------------------------------------------------------------------------
def ctc_ll(lp, tgt):
    """log-vraisemblance CTC (algorithme avant) de la suite de lettres tgt"""
    if not tgt: return float(lp[:, 0].sum())
    L = len(tgt); S = 2 * L + 1; lab = np.zeros(S, int); lab[1::2] = tgt
    em = lp[:, lab]; NEG = -1e30
    al = np.full(S, NEG); al[0] = em[0, 0]; al[1] = em[0, 1]
    skip = np.zeros(S, bool); skip[3::2] = lab[3::2] != lab[1:-2:2]
    for t in range(1, len(lp)):
        b = np.concatenate([[NEG], al[:-1]]); c = np.where(skip, np.concatenate([[NEG, NEG], al[:-2]]), NEG)
        al = np.logaddexp(np.logaddexp(al, b), c) + em[t]
    return float(np.logaddexp(al[-1], al[-2]))

SOFT = set('اويى')
def ids(txt): V = vocab(); return [V[c] for c in txt if c in V]

def check(s, a, i, j, start, stop, free_in, free_out, pad=0.4):
    """écart (nats) entre « exactement le mot écrit » et la meilleure autre hypothèse :
    une lettre du mot voisin en plus au début ou à la fin, ou la première / la dernière lettre du mot coupée.
    Positif : l'extrait s'explique le mieux par le texte écrit seul."""
    W = verse_words(s, a); exp = expected(s, a, i, j, free_in)
    y = clip(s, a, start, stop, free_in, free_out)
    z = np.concatenate([np.zeros(int(A.SR * pad)), y, np.zeros(int(A.SR * pad))]).astype(np.float32)
    lp = logprobs(z); base = ids(exp); sp = vocab()[' ']
    ll0 = ctc_ll(lp, base); alt = {}
    if not free_in:
        prev = skeleton(W[i - 2]).rstrip('اى') or skeleton(W[i - 2])
        alt['+avant ' + prev[-1]] = ctc_ll(lp, ids(prev[-1]) + [sp] + base)
        alt['+avant ' + prev[-1] + '(lié)'] = ctc_ll(lp, ids(prev[-1]) + base)
        if len(base) > 2: alt['-début ' + exp[0]] = ctc_ll(lp, base[1:])
    if not free_out:
        nx = skeleton(W[j])[pronounced_start(W[j])]
        alt['+après ' + nx] = ctc_ll(lp, base + [sp] + ids(nx))
        alt['+après ' + nx + '(lié)'] = ctc_ll(lp, base + ids(nx))
        k = len(base) - 1
        while k > 0 and exp[k] in SOFT | {' '}: k -= 1
        if k > 1: alt['-fin ' + exp[k]] = ctc_ll(lp, base[:k] + base[k + 1:])
    if not alt: return 99.0, ''
    worst = max(alt, key=alt.get)
    return round(ll0 - alt[worst], 2), worst

def candidates(s, a, t, lo, hi):
    """creux d'énergie (minima locaux) entre lo et hi ms, plus t lui-même"""
    d = A.env_db(s, a); k0, k1 = max(1, lo // 10), min(len(d) - 2, hi // 10)
    c = {t} | {k * 10 for k in range(k0, k1 + 1) if d[k] <= d[k - 1] and d[k] <= d[k + 1]}
    return sorted(x for x in c if lo <= x <= hi)

def best_cut(s, a, i, j):
    """bornes retenues : calage CTC, puis, pour chaque bord lié, le creux d'énergie voisin (± 60 ms) qui donne le meilleur
    contrôle (léger avantage au calage d'origine)"""
    b = bounds(s, a, i, j); st, en = b['start'], b['stop']
    def score(x, y): m, w = check(s, a, i, j, x, y, b['free_in'], b['free_out']); return m, w
    m, w = score(st, en)
    if not b['free_in'] and m < 3:
        for x in candidates(s, a, st, st - 60, st + 60):
            if x == st or en - x < 150: continue
            m2, w2 = score(x, en)
            if m2 - abs(x - b['start']) * 0.01 > m - abs(st - b['start']) * 0.01: st, m, w = x, m2, w2
    if not b['free_out'] and m < 3:
        for y in candidates(s, a, en, en - 60, en + 60):
            if y == en or y - st < 150: continue
            m2, w2 = score(st, y)
            if m2 - abs(y - b['stop']) * 0.01 > m - abs(en - b['stop']) * 0.01: en, m, w = y, m2, w2
    y = clip(s, a, st, en, b['free_in'], b['free_out'])
    return dict(b, start=st, stop=en, margin=m, worst=w, heard=decode(y), expected=expected(s, a, i, j, b['free_in']))
