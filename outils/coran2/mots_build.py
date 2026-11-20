"""Fabrique l'audio des « mots du Coran » du parcours qr2 (site/audio/qr2/*.mp3) et le fichier mots_audio.json.

Pour chaque carte des leçons : choix du passage (mots_plan : même règle que la leçon, début et fin nets, arrêt réel quand
la leçon le demande), calage lettre par lettre (mots_ctc), contrôle par rapport de vraisemblance, découpe avec fondu,
niveau égalisé, MP3 mono 64 kb/s. Les cartes déjà faites avec la même version d'algorithme ne sont pas refaites.

    LC2_BASE=… OMNI=… python3 mots_build.py            # tout
    LC2_BASE=… OMNI=… python3 mots_build.py 12 13      # seulement les leçons 12 et 13
"""
import json, os, sys, importlib
import mots_audio as A, mots_plan as P, mots_ctc as C

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(HERE, '..', '..', 'site')
OUT = os.path.join(SITE, 'audio', 'qr2')
MAN = os.path.join(HERE, 'mots_audio.json')
VERSION = 'ctc3'
DOUTE = 0.0          # écart (nats) en dessous duquel l'extrait est signalé pour écoute

def cards():
    ETS = [importlib.import_module('e1spec').ETAPE] + [importlib.import_module(f'e{k}').ETAPE for k in range(2, 11)]
    for es in ETS:
        for sp in es['lessons']:
            for c in sp.get('mots', []):
                mk, s, a, note, i, j = c
                yield sp['n'], s, a, i, j, note

def key(n, s, a, i, j): return f'{n}:{s}:{a}:{i}:{j}'

def main(only=None):
    man = json.load(open(MAN)) if os.path.exists(MAN) else {}
    done = {}
    for n, s, a, i, j, note in cards():
        if only and n not in only: continue
        k = key(n, s, a, i, j)
        if k in man and man[k].get('v') == VERSION and os.path.exists(os.path.join(OUT, man[k]['file'])): continue
        p = P.plan(n, s, a, i, j, note)
        ck = (p['s'], p['a'], p['i'], p['j'])
        if ck not in done:
            r = C.best_cut(*ck)
            name = f'{ck[0]:03d}{ck[1]:03d}_{ck[2]}-{ck[3]}.mp3'
            y = C.clip(ck[0], ck[1], r['start'], r['stop'], r['free_in'], r['free_out'])
            A.write_mp3(y, os.path.join(OUT, name))
            done[ck] = dict(file=name, start=r['start'], stop=r['stop'], free_in=r['free_in'], free_out=r['free_out'],
                            margin=r['margin'], worst=r['worst'], heard=r['heard'], expected=r['expected'])
        d = done[ck]
        man[k] = dict(v=VERSION, n=n, orig=[s, a, i, j], s=ck[0], a=ck[1], i=ck[2], j=ck[3], text=p['text'], note=p['note'],
                      why=p['why'], flag=p['flag'], waqf=d['free_out'],
                      doute=d['margin'] < DOUTE, **d)
        print(k, '→', d['file'], d['margin'], d['worst'], p['why'], p['flag'], flush=True)
        json.dump(man, open(MAN, 'w'), ensure_ascii=False, indent=0, sort_keys=True)
    if only: return
    # fichiers qui ne servent plus
    used = {m['file'] for m in man.values()}
    for f in os.listdir(OUT) if os.path.isdir(OUT) else []:
        if f.endswith('.mp3') and f not in used: os.remove(os.path.join(OUT, f))

if __name__ == '__main__':
    main({int(x) for x in sys.argv[1:]} or None)
