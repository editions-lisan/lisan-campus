"""Lisân Campus · bande-son originale de la vidéo de présentation (16 s), entièrement synthétisée.

Instruments fabriqués ici, sans aucun échantillon : corde pincée façon oud (Karplus-Strong),
tambour sur cadre façon daf, clochettes, nappe grave, souffles de transition.
Mode : hijaz sur ré (ré, mi bémol, fa dièse, sol, la, si bémol, do).
Les effets suivent le minutage de index.html (render(t)).

    python3 son.py sortie.wav
"""
import sys
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 44100
T = 16.0
N = int(SR * T)
rng = np.random.default_rng(1447)          # graine fixe : la bande-son est toujours la même
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

# ---------- nappe de fond (ré + la), du début à la fin
place(pad(hz(-12), T - 0.2, 2.0, 1.4), 0.0, 1.0, -0.2)
place(pad(hz(-5), T - 1.0, 2.5, 1.4), 0.8, 0.7, 0.25)

# ---------- scène 1 : la marque
place(dum(1.0), 0.15, 1.1)
for k, deg in enumerate([0, 7, 12, 16]):                    # clochettes à l'apparition du logo
    place(bell(hz(deg, D3 * 2)), 0.18 + k * 0.07, 0.55, -0.4 + k * 0.27)
place(oud(hz(12), 2.0, .6), 0.95, 0.6, 0.1)                 # le titre
place(oud(hz(16), 2.0, .5), 1.35, 0.5, -0.1)                # le texte arabe
place(oud(hz(19), 2.4, .5), 1.7, 0.45, 0.2)                 # la devise

# ---------- rythme du daf (environ 96 battements par minute), de 2,0 s à 15,1 s
beat = 60 / 96
pattern = [('D', 0), ('t', 1), ('t', 1.5), ('D', 2), ('t', 3), ('t', 3.5)]   # dum, tak tak, dum, tak tak
t0 = 2.0
bar = 0
while t0 + bar * 4 * beat < 15.1:
    for kind, pos in pattern:
        tt = t0 + (bar * 4 + pos) * beat
        if tt >= 15.1:
            break
        if kind == 'D':
            place(dum(), tt, 0.55, 0.0)
        else:
            place(tak(bright=0.6 + 0.4 * (pos % 1 == 0)), tt, 0.32, 0.35 if pos % 1 else -0.3)
    bar += 1

# ---------- transitions
for tt in (2.95, 6.55, 10.05):
    place(whoosh(0.75), tt, 1.0, 0.0)
place(whoosh(0.9, up=False), 10.4, 0.8, 0.5)                # le téléphone glisse

# ---------- scène 2 : les cinq livres arrivent, une note par livre (mélodie montante)
for k, deg in enumerate([0, 4, 5, 7, 12]):
    place(oud(hz(deg), 1.6, .55), 3.6 + k * 0.13 + 0.2, 0.55, -0.6 + k * 0.3)
for k, deg in enumerate([16, 17, 19]):                      # les trois étiquettes
    place(bell(hz(deg, D3)), 4.75 + k * 0.22, 0.35, -0.3 + k * 0.3)

# ---------- scène 3 : les quatre espaces
for k, deg in enumerate([7, 8, 12, 13]):
    place(oud(hz(deg), 1.8, .5), 7.7 + k * 0.16 + 0.15, 0.55, -0.5 + k * 0.33)
place(oud(hz(0), 2.4, .3), 8.6, 0.4, 0.0)

# ---------- scène 4 : les quatre atouts, puis l'adresse du site
for k, deg in enumerate([12, 16, 17, 19]):
    place(bell(hz(deg, D3 * 2)), 11.3 + k * 0.38 + 0.1, 0.4, -0.3 + k * 0.2)
for k, deg in enumerate([0, 7, 12]):                         # accord final sur l'adresse
    place(oud(hz(deg), 2.6, .6), 13.15 + k * 0.05, 0.55, -0.3 + k * 0.3)
place(bell(hz(12, D3 * 2), 3.0), 13.2, 0.5, 0.0)
place(dum(1.2), 13.15, 0.8)

# ---------- réverbération légère, fondu final pour boucler avec le début
ir_t = np.arange(int(1.4 * SR)) / SR
ir = rng.normal(0, 1, (2, len(ir_t))) * np.exp(-ir_t * 4.2)
ir = np.array([lowpass(ch, 6000) for ch in ir]) * 0.05
wet = np.array([fftconvolve(mix[c], ir[c])[:N] for c in range(2)])
out = mix * 0.85 + wet * 0.6
tt = np.arange(N) / SR
fade = np.clip((T - tt) / 0.65, 0, 1) * np.clip(tt / 0.05, 0, 1)
out *= fade
out /= np.max(np.abs(out)) / 0.89

from scipy.io import wavfile
wavfile.write(sys.argv[1] if len(sys.argv) > 1 else 'son.wav', SR, (out.T * 32767).astype(np.int16))
print('ok', round(np.sqrt(np.mean(out ** 2)), 3))
