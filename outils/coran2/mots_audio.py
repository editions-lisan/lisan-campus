"""Audio des « mots du Coran » du parcours « Lire le Coran pas à pas 2 » : chaque mot (ou groupe de mots) est découpé
dans la récitation d'al-Ḥouṣarî (al-Muṣḥaf al-Mu‘allim, lecture de Ḥafṣ, fichiers verset par verset d'EveryAyah),
grâce au minutage mot par mot de quran-align (C. Fair, licence CC BY 4.0), puis recalé sur le signal :
- le début et la fin sont déplacés vers le creux d'énergie le plus proche (pas de syllabe du mot voisin) ;
- au début d'un verset ou après une pause du récitateur, on garde l'attaque entière ; en fin de verset (ou avant une
  pause), on garde la fin du son (rebond de la qalqala, ghounna, allongement) jusqu'au silence ;
- une petite marge, un fondu d'entrée et de sortie, puis MP3 mono.
Le contrôle (`check`) signale les découpes risquées : énergie forte à une coupure, mot commençant par une hamza de
liaison ou une lettre doublée par l'assimilation du mot précédent sans pause avant, arrêt demandé sans pause après.

Réglages : variables d'environnement HUSARY_DIR (fichiers SSS/SSSAAA.mp3) et QALIGN (Husary_Muallim_128kbps.json).
"""
import json, os, subprocess, functools, hashlib
import numpy as np

HUSARY = os.environ.get('HUSARY_DIR', '/home/claude/raf0707/q7h_husary_muallim')
QALIGN = os.environ.get('QALIGN', '')
SR = 44100
FR = 441                      # 10 ms
VERSION = 'v1'
PAUSE = 300                   # silence (ms) qui marque une pause du récitateur                # à changer si l'algorithme de découpe change (les fichiers sont refaits)

@functools.lru_cache(None)
def alignment():
    return {(x['surah'], x['ayah']): x['segments'] for x in json.load(open(QALIGN))}

@functools.lru_cache(64)
def audio(s, a):
    f = f'{HUSARY}/{s:03d}/{s:03d}{a:03d}.mp3'
    if not os.path.exists(f):
        subprocess.run(['git', '-C', HUSARY, 'checkout', 'HEAD', '--', f'{s:03d}/{s:03d}{a:03d}.mp3'], check=True, capture_output=True)
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

@functools.lru_cache(64)
def env_db(s, a):
    x = audio(s, a)
    e = np.sqrt(np.convolve(x ** 2, np.ones(FR * 2) / (FR * 2), 'same'))[::FR]   # fenêtre 20 ms, pas de 10 ms
    return 20 * np.log10(e + 1e-6)

def word_times(s, a, i, j):
    """(début, fin) en ms des mots i..j (1-based) d'après le minutage ; None si un mot manque."""
    segs = alignment()[(s, a)]
    st = [g for g in segs if g[0] <= i - 1 < g[1]]
    en = [g for g in segs if g[0] <= j - 1 < g[1]]
    if not st or not en: return None
    return st[0][2], en[0][3]

def n_words(s, a):
    return max(g[1] for g in alignment()[(s, a)])

def floor_db(s, a):
    d = env_db(s, a); return float(np.percentile(d, 5))

def speech_thr(s, a):
    d = env_db(s, a); return max(floor_db(s, a) + 12, float(d.max()) - 34)

def pause_between(s, a, t_ms, span=600):
    """durée (ms) du plus long silence dans [t-span/2, t+span/2] autour d'une frontière de mots"""
    d = env_db(s, a); thr = speech_thr(s, a)
    lo, hi = max(0, (t_ms - span // 2) // 10), min(len(d), (t_ms + span // 2) // 10)
    best = run = 0
    for k in range(lo, hi):
        run = run + 1 if d[k] < thr else 0; best = max(best, run)
    return best * 10

def context(s, a, i, j):
    t = word_times(s, a, i, j)
    if t is None: return None
    N = n_words(s, a)
    pre = 9999 if i == 1 else pause_between(s, a, t[0])
    post = 9999 if j >= N else pause_between(s, a, t[1])
    pre, post = (pre if pre >= PAUSE else 0), (post if post >= PAUSE else 0)
    return dict(t0=t[0], t1=t[1], pre=pre, post=post, first=i == 1, last=j >= N)

def _valley(d, center, radius, side=0):
    lo, hi = max(1, center - radius), min(len(d) - 1, center + radius)
    if hi <= lo: return center
    seg = d[lo:hi]
    # léger biais vers le centre (le minutage est juste à ~70 ms près), et vers le côté demandé
    w = np.abs(np.arange(lo, hi) - center) * 0.04
    if side: w += np.where((np.arange(lo, hi) - center) * side < 0, 0.6, 0)
    return lo + int(np.argmin(seg + w))

def cut(s, a, i, j, end='auto', pad_ms=25):
    """renvoie (échantillons, infos) du mot i..j recalé ; end = 'waqf' (garder jusqu'au silence) / 'wasl' / 'auto'"""
    c = context(s, a, i, j); d = env_db(s, a); thr = speech_thr(s, a); x = audio(s, a)
    k0, k1 = c['t0'] // 10, c['t1'] // 10
    if c['pre'] >= PAUSE:     # attaque libre : remonter jusqu'au silence qui précède
        k = k0
        while k > 0 and d[k] > thr: k -= 1
        while k > 0 and d[k - 1] < d[k] and d[k] > floor_db(s, a) + 4 and k0 - k < 25: k -= 1
        start = max(0, k - pad_ms // 10)
    else:
        start = _valley(d, k0, 12, side=+1)
    if c['post'] >= PAUSE:
        k = k1
        while k < len(d) - 1 and (d[k] > thr or k < k1): k += 1
        while k < len(d) - 1 and d[k + 1] < d[k] and d[k] > floor_db(s, a) + 4 and k - k1 < 40: k += 1
        stop = min(len(d) - 1, k + pad_ms // 10 + 2)
    else:
        stop = _valley(d, k1, 12, side=-1)
    y = x[start * FR: stop * FR].copy()
    fi, fo = int(SR * (0.006 if c['pre'] >= PAUSE else 0.012)), int(SR * (0.03 if c['post'] >= PAUSE else 0.035))
    y[:fi] *= np.linspace(0, 1, fi) ** 2
    y[-fo:] *= np.linspace(1, 0, fo) ** 2
    info = dict(c, start=start * 10, stop=stop * 10, edge_in=float(d[start]), edge_out=float(d[min(stop, len(d) - 1)]), thr=thr,
                peak=float(d[k0:k1 + 1].max()) if k1 > k0 else float(d[k0]))
    return y, info

def level(y):
    """même niveau pour tous les mots : parole à -19 dBFS environ, crête à -1,5 dBFS au plus"""
    fr = int(SR * 0.02); e = np.sqrt(np.convolve(y ** 2, np.ones(fr) / fr, 'same'))
    loud = e[e > e.max() * 0.25]; rms = float(np.sqrt((loud ** 2).mean())) if len(loud) else 1e-4
    g = min(10 ** (-19 / 20) / max(rms, 1e-5), 10 ** (-1.5 / 20) / max(float(np.abs(y).max()), 1e-5))
    return y * g

def cut_at(s, a, start_ms, stop_ms, soft_in=True, soft_out=True):
    x = audio(s, a); y = x[int(start_ms * SR / 1000): int(stop_ms * SR / 1000)].copy()
    fi, fo = int(SR * (0.012 if soft_in else 0.006)), int(SR * (0.035 if soft_out else 0.03))
    y[:fi] *= np.linspace(0, 1, fi) ** 2; y[-fo:] *= np.linspace(1, 0, fo) ** 2
    return y

def write_wav16(y, path):
    import wave
    z = y[::1]
    idx = np.arange(0, len(z), SR / 16000).astype(int); z = z[idx]
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(16000); w.writeframes((np.clip(z, -1, 1) * 32767).astype(np.int16).tobytes())

def write_mp3(y, path):
    os.makedirs(os.path.dirname(path), exist_ok=True); y = level(y)
    pcm = (np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes()
    tmp = path + '.part.mp3'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-',
                    '-c:a', 'libmp3lame', '-b:a', '64k', tmp], input=pcm, check=True)
    os.replace(tmp, path)

def clip_name(s, a, i, j, end):
    return f'{s:03d}{a:03d}_{i}-{j}{"_w" if end == "waqf" else ""}.mp3'
