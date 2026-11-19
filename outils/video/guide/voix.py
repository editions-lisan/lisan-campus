"""Vidéo du mode d'emploi : voix commentée (Piper fr_FR-siwis-medium via sherpa-onnx), nappe musicale discrète et minutage.

Lit scenes.json et captures.json, enregistre chaque phrase, place les scènes bout à bout et écrit :
  - data.js     : window.SCENES (positions résolues, début et durée de chaque scène) et window.T (durée totale), lus par guide.html ;
  - guide.wav   : la bande-son (voix + nappe), de la durée exacte de la vidéo.
Usage : python3 voix.py <dossier de la voix vits-piper-fr_FR-siwis-medium>
"""
import json, re, sys, os
import numpy as np, soundfile as sf, sherpa_onnx
from scipy.signal import butter, sosfilt

HERE = os.path.dirname(os.path.abspath(__file__))
V = sys.argv[1].rstrip('/') + '/'
S = json.load(open(os.path.join(HERE, 'scenes.json'), encoding='utf8'))
C = json.load(open(os.path.join(HERE, 'captures.json'), encoding='utf8'))
SR = 44100
tts = sherpa_onnx.OfflineTts(sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(vits=sherpa_onnx.OfflineTtsVitsModelConfig(
    model=V + 'fr_FR-siwis-medium.onnx', tokens=V + 'tokens.txt', data_dir=V + 'espeak-ng-data'), num_threads=2)))

def resolve(v, img):                       # « clé.top+120 » → nombre, d'après captures.json
    if isinstance(v, (int, float)): return v
    m = re.fullmatch(r'\s*(\w+)\.(\w+)\s*([+-]\s*\d+)?\s*', v)
    if not m: raise SystemExit(f'position illisible : {v}')
    base = C[img][m.group(1)]
    if base is None: raise SystemExit(f'position absente de captures.json : {img}.{m.group(1)}')
    return base[m.group(2)] + int((m.group(3) or '0').replace(' ', ''))

PRE, POST = 0.3, 0.5                     # silence avant et après chaque phrase
voice, t, out = [], 0.0, []
for sc in S['scenes']:
    a = tts.generate(sc['say'], sid=0, speed=1.05)
    x = np.array(a.samples, dtype=np.float32)
    x = np.interp(np.linspace(0, len(x) - 1, int(len(x) * SR / a.sample_rate)), np.arange(len(x)), x).astype(np.float32)
    speech = len(x) / SR
    dur = PRE + speech + POST
    if sc.get('kind') == 'intro': dur = max(dur + 0.6, 5.0)
    if sc.get('kind') == 'outro': dur = max(dur + 1.2, 4.0)
    voice.append((t + PRE, x))
    o = {k: v for k, v in sc.items() if k != 'say'}
    o['t0'], o['d'], o['speech'] = round(t, 3), round(dur, 3), round(speech, 3)
    for sh in o.get('shots', []):
        H = C[sh['img']]['h']
        sh['y0'], sh['y1'] = resolve(sh['y0'], sh['img']), resolve(sh['y1'], sh['img'])
        sh['y0'], sh['y1'] = [max(0, min(y, H - 710)) for y in (sh['y0'], sh['y1'])]
        if 'tap' in sh: sh['tap'] = [resolve(sh['tap'][0], sh['img']), resolve(sh['tap'][1], sh['img']), sh['tap'][2]]
    out.append(o); t += dur
T = round(t, 3); N = int(T * SR)
print('durée', T, 's')

# nappe : accords lents (ré, la, fa dièse… mode hijaz), très bas sous la voix
rng = np.random.default_rng(1447)
tt = np.arange(N) / SR
pad = np.zeros(N)
CH = [[146.83, 220.0, 293.66], [155.56, 233.08, 311.13], [146.83, 185.0, 293.66], [130.81, 196.0, 261.63]]
seg = 8.0
for i in range(int(T / seg) + 1):
    a, b = int(i * seg * SR), min(N, int((i + 1) * seg * SR + SR * 2))
    if a >= N: break
    env = np.sin(np.linspace(0, np.pi, b - a)) ** 1.5
    for f in CH[i % len(CH)]:
        for det in (-0.6, 0.6):
            pad[a:b] += env * np.sin(2 * np.pi * (f + det) * tt[a:b] + rng.uniform(0, 6.28)) * 0.05
pad = sosfilt(butter(2, 900, 'low', fs=SR, output='sos'), pad)
pad *= 0.22 / (np.abs(pad).max() + 1e-9)
fade = np.minimum(1, np.minimum(tt / 1.5, (T - tt) / 2.0)); pad *= np.clip(fade, 0, 1)

vo = np.zeros(N)
for st, x in voice:
    i = int(st * SR); vo[i:i + len(x)] += x[: max(0, N - i)]
vo *= 0.89 / (np.abs(vo).max() + 1e-9)
duck = np.convolve((np.abs(vo) > 0.02).astype(float), np.ones(int(SR * 0.3)) / (SR * 0.3), 'same')  # la nappe baisse sous la voix
mix = vo + pad * (1 - 0.55 * np.clip(duck * 3, 0, 1))
mix /= max(1.0, np.abs(mix).max() / 0.95)
sf.write(os.path.join(HERE, 'guide.wav'), np.stack([mix, mix], 1).astype(np.float32), SR)
open(os.path.join(HERE, 'data.js'), 'w', encoding='utf8').write(
    '// produit par voix.py à partir de scenes.json et captures.json : ne pas modifier à la main\n'
    f'window.STEPS = {S["steps"]};\nwindow.T = {T};\nwindow.SCENES = ' + json.dumps(out, ensure_ascii=False, indent=1) + ';\n')
for o in out: print(f"{o['t0']:6.2f}  {o['d']:5.2f}  {o.get('title', o.get('kind'))}")
