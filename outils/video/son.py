"""Lisân Campus · bande-son originale de la vidéo de présentation (76 s), entièrement synthétisée.

Instruments fabriqués ici, sans aucun échantillon : corde pincée façon oud (Karplus-Strong),
tambour sur cadre façon daf, clochettes, nappe grave, souffles de transition.
Mode : hijaz sur ré (ré, mi bémol, fa dièse, sol, la, si bémol, do).
Les effets suivent le minutage et les repères de index.html, exportés dans cues.json par cues.js.

    python3 son.py sortie.wav            (version avec oud, clochettes et nappe, celle du site)
    python3 son.py sortie.wav --daf      (version daf seul)
"""
import sys
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 44100
import json, os
CUES = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cues.json')))
T = float(CUES['T'])
N = int(SR * T)
rng = np.random.default_rng(1447)          # graine fixe : la bande-son est toujours la même
DAF = '--daf' in sys.argv                  # --daf : percussions seules, sans instrument mélodique
mix = np.zeros((2, N))

D3 = 146.83
def hz(semi, base=D3):
    return base * 2 ** (semi / 12)
HIJAZ = [0, 1, 4, 5, 7, 8, 10, 12, 13, 16, 17, 19]   # degrés du mode hijaz (demi-tons depuis ré)

def place(sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N:
        return
    sig = sig[: N - i] * gain
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    mix[0, i:i + len(sig)] += sig * l
    mix[1, i:i + len(sig)] += sig * r

def lowpass(x, f, order=2):
    return sosfilt(butter(order, f, 'low', fs=SR, output='sos'), x)

def bandpass(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], 'band', fs=SR, output='sos'), x)

# ---------- instruments
def oud(f, dur=1.6, bright=0.5):
    """Corde pincée (Karplus-Strong), un peu sourde comme une corde en boyau."""
    n, p = int(dur * SR), max(2, int(SR / f))
    buf = rng.uniform(-1, 1, p)
    buf = lowpass(buf, 1500 + 4000 * bright)          # attaque plus ou moins brillante
    out = np.empty(n)
    k = 0.996
    for i in range(n):
        out[i] = buf[i % p]
        buf[i % p] = k * 0.5 * (buf[i % p] + buf[(i + 1) % p])
    env = np.minimum(1, np.arange(n) / (0.002 * SR))
    return lowpass(out * env, 5000) * 0.9

def bell(f, dur=2.4):
    t = np.arange(int(dur * SR)) / SR
    parts = [(1, 1, 1.0), (2.01, .55, 1.6), (2.76, .35, 2.2), (4.07, .18, 3.2), (5.4, .1, 4.5)]
    s = sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t * d) for m, a, d in parts)
    return s * np.minimum(1, t / 0.003) * 0.35

def dum(dur=0.6):
    """Coup grave du daf : son de peau qui descend, plus le frottement."""
    t = np.arange(int(dur * SR)) / SR
    f = 62 + 50 * np.exp(-t * 18)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7)
    skin = lowpass(rng.normal(0, 1, len(t)), 900) * np.exp(-t * 30) * 0.25
    return (body + skin) * 0.9

def tak(dur=0.18, bright=1.0):
    """Coup aigu sur le bord du daf, avec le cliquetis des anneaux."""
    t = np.arange(int(dur * SR)) / SR
    hit = bandpass(rng.normal(0, 1, len(t)), 1800, 5200) * np.exp(-t * 45)
    rings = bandpass(rng.normal(0, 1, len(t)), 6000, 12000) * np.exp(-t * 16) * 0.35 * bright
    return (hit + rings) * 0.45

def whoosh(dur=0.7, up=True):
    n = int(dur * SR)
    x = rng.normal(0, 1, n)
    t = np.linspace(0, 1, n)
    env = np.sin(np.pi * t) ** 2
    lo, hi = bandpass(x, 300, 1200), bandpass(x, 1500, 6000)
    w = t if up else 1 - t
    return (lo * (1 - w) + hi * w) * env * 0.22

def pad(f, dur, att=1.5, rel=1.5):
    t = np.arange(int(dur * SR)) / SR
    s = sum(np.sin(2 * np.pi * f * m * (1 + dt) * t + ph) * a
            for m, a, dt, ph in [(1, 1, 0, 0), (1, .6, .003, 1), (2, .3, -.002, 2), (3, .12, .001, .5)])
    env = np.minimum(1, t / att) * np.minimum(1, (dur - t) / rel)
    return lowpass(s * env, 900) * 0.10

# ---------- minutage : celui de index.html (cues.json : S = scènes, CUES = [temps, sorte, scène])
S = {k: tuple(v) for k, v in CUES['S'].items()}
ROOT = dict(ouverture=0, campus=0, espaces=7, accueil=0, parcours=5, lecon=7, langue=0, droit=5, ia=7, progres=0, biblio=5, fin=0)

# ---------- nappe de fond : accord tenu qui change avec les scènes
if not DAF:
    for k, (a, b) in S.items():
        r = ROOT.get(k, 0); d = b - a + 1.2
        place(pad(hz(r - 12), d, 1.0, 1.0), max(0, a - 0.4), 0.9, -0.2)
        place(pad(hz(r - 5), d, 1.2, 1.0), max(0, a - 0.3), 0.6, 0.25)

# ---------- ouverture : l'étoile se trace (clochettes montantes), puis le logo
place(dum(1.0), 0.15, 1.1)
for k, deg in enumerate([0, 4, 7, 12, 16, 19]):
    if DAF: place(tak(bright=0.6), 0.12 + k * 0.2, 0.3, -0.5 + k * 0.2)
    else: place(bell(hz(deg, D3 * 2)), 0.12 + k * 0.2, 0.42, -0.5 + k * 0.2)
if not DAF:
    place(oud(hz(12), 2.0, .6), 1.3, 0.6, 0.1)
    place(oud(hz(16), 2.0, .5), 1.75, 0.5, -0.1)
    place(oud(hz(19), 2.4, .5), 2.15, 0.45, 0.2)

# ---------- rythme du daf (96 battements par minute), de 2,4 s à la fin ; plus léger pendant la fin
beat = 60 / 96
pattern = [('D', 0), ('t', 1), ('t', 1.5), ('D', 2), ('t', 3), ('t', 3.5)]
END = T - 1.0
bar = 0
while 2.4 + bar * 4 * beat < END:
    for kind, pos in pattern:
        tt = 2.4 + (bar * 4 + pos) * beat
        if tt >= END:
            break
        g = 0.75 if tt > S['fin'][0] + 2.5 else 1.0
        if kind == 'D':
            place(dum(), tt, 0.5 * g, 0.0)
        else:
            place(tak(bright=0.6 + 0.4 * (pos % 1 == 0)), tt, 0.28 * g, 0.35 if pos % 1 else -0.3)
    bar += 1

def note(t, deg, base=D3, kind='oud', gain=0.5, pan=0.0):
    if DAF:
        place(tak(bright=0.7) if kind != 'dum' else dum(0.5), t, gain * 0.8, pan)
    elif kind == 'bell':
        place(bell(hz(deg, base)), t, gain * 0.75, pan)
    else:
        place(oud(hz(deg, base), 1.7, .5), t, gain, pan)

# ---------- repères : un souffle à chaque scène, une note à chaque élément qui apparaît (mode hijaz, dans la tonalité de la scène)
count = {}
for t, kind, sc in CUES['CUES']:
    if t >= T - 0.5:
        continue
    r = ROOT.get(sc, 0); j = count.get((sc, kind), 0); count[(sc, kind)] = j + 1
    if kind == 'scene':
        place(whoosh(0.75), max(0, t - 0.4), 0.9, 0.0)
    elif kind == 'slide':
        place(whoosh(0.9, up=False), t, 0.8, 0.5)
    elif kind == 'title':
        note(t + .05, r + 12, gain=0.45, pan=-0.2)
    elif kind == 'item':
        note(t + .1, HIJAZ[j % 8] + r, gain=0.42, pan=-0.4 + (j % 5) * 0.2)
    elif kind == 'bell':
        note(t + .08, HIJAZ[(j + 2) % len(HIJAZ)] + r, base=D3 * 2, kind='bell', gain=0.24, pan=-0.5 + (j % 4) * 0.33)
    elif kind == 'big':
        for k, deg in enumerate([12, 16, 19]):
            note(t + k * .06, deg + r, base=D3 * 2, kind='bell', gain=0.36, pan=-0.3 + k * 0.3)

# ---------- fin : accord final sur l'adresse du site
a = S['fin'][0]
if DAF:
    for k in range(10):
        place(tak(0.1, bright=0.7), a + 0.7 + k * 0.06, 0.12 + 0.03 * k, -0.2 + 0.04 * k)
    place(tak(0.6), a + 1.3, 0.55, 0.0)
else:
    for k, deg in enumerate([0, 7, 12]):
        place(oud(hz(deg), 2.6, .6), a + 1.3 + k * 0.05, 0.55, -0.3 + k * 0.3)
    place(bell(hz(12, D3 * 2), 3.0), a + 1.35, 0.5, 0.0)
place(dum(1.2), a + 1.3, 0.8)

# ---------- réverbération légère, fondu final pour boucler avec le début
ir_t = np.arange(int(1.4 * SR)) / SR
ir = rng.normal(0, 1, (2, len(ir_t))) * np.exp(-ir_t * 4.2)
ir = np.array([lowpass(ch, 6000) for ch in ir]) * 0.05
wet = np.array([fftconvolve(mix[c], ir[c])[:N] for c in range(2)])
out = mix * 0.85 + wet * 0.6
tt = np.arange(N) / SR
fade = np.clip((T - tt) / 0.9, 0, 1) * np.clip(tt / 0.05, 0, 1)
out *= fade
out /= np.max(np.abs(out)) / 0.89

from scipy.io import wavfile
wavfile.write(sys.argv[1] if len(sys.argv) > 1 else 'son.wav', SR, (out.T * 32767).astype(np.int16))
print('ok', round(np.sqrt(np.mean(out ** 2)), 3))
