# Statut de la Cour internationale de Justice : texte reconnu (tesseract, fra) sur la copie numérisée de la publication
# officielle des Nations Unies (pages 20 à 30), nettoyé, découpé en chapitres, articles et alinéas, puis corrigé mot à mot
# d'après les images des pages (liste FIX) → statut.json.
# Usage : python3 extract_statut.py   (lit statut_ocr.txt, produit par tesseract colonne par colonne, coupures de mots recollées)
import re, json, os
D = os.path.dirname(os.path.abspath(__file__))
raw = open(os.path.join(D, 'statut_ocr.txt'), encoding='utf8').read()
# morceaux de titre courant coupés en deux colonnes
raw = raw.replace('STATUT DE LA COUR INTE\n', '').replace('RNATIONALE DE JUSTICE\n', '')
raw = raw.replace('À COUR INTERNATIONALE DE JUSTICE instituée\nL par', 'La Cour internationale de Justice instituée par')
lines = []
for l in raw.split('\n'):
    l = l.replace('’', "'").replace('‘', '').replace('“', '').replace('”', '').replace('«', '').replace('—', '')
    l = re.sub(r'(\s[|;.:,!}{\-_…]+)+\s*$', lambda m: m.group(0).strip()[:1] if m.group(0).strip()[:1] in '.;:,' and False else '', l)  # déchets de fin de ligne
    l = re.sub(r'^[\s|;.:,!}{\-_…]+', '', l)            # déchets de début de ligne
    l = re.sub(r'\s+(oo|a|e|le)$', '', l) if re.search(r'[.;:,]\s+(oo|a|e|le)$', l) else l
    l = l.strip()
    l = re.sub(r'^EL\. ', '1. ', l)                     # « 1. » mal lu (article 30)
    if l: lines.append(l)
items, cur = [], None
def push(k, **kw):
    global cur
    x = dict(k=k, **kw); items.append(x); cur = x if k == 'para' else None
i = 0
while i < len(lines):
    l = lines[i]
    m = re.fullmatch(r'CHAPITRE ([IV]+|IL)', l)
    if m:
        n = {'IL': 'II'}.get(m.group(1), m.group(1)); push('chap', n=n, tt=lines[i + 1].strip('/ .')); i += 2; continue
    m = re.match(r'^(?:\w{0,3}r\w{0,3}|4 r\w{0,2})cle (\d+)[\s\W]*(?:oo)?$', l)
    if m:
        prev = max([int(x['n']) for x in items if x['k'] == 'art'] or [0])
        if int(m.group(1)) != prev + 1: print('numéro lu', m.group(1), '→ article', prev + 1)
        push('art', n=str(prev + 1)); i += 1; continue
    num = re.match(r'^(\d)[.,] ?(?=[A-ZÀÉL\[])', l); let = re.match(r'^([a-d])\. ', l)
    if num:   # numéro d'alinéa : on suit l'ordre de l'article (le 3 est souvent lu 8)
        nums = [int(re.match(r'\d+', x['t']).group()) for x in items[next(j for j in range(len(items) - 1, -1, -1) if items[j]['k'] == 'art'):] if x['k'] == 'para' and re.match(r'\d+\. ', x['t'])]
        d = str((nums[-1] if nums else 0) + 1)
        if d != num.group(1): print('alinéa lu', num.group(1), '→', d)
        l = d + '. ' + l[num.end():].lstrip()
    new = num or let or cur is None   # dans le Statut, pas d'alinéa sans numéro à l'intérieur d'un article
    if new: push('para', t=l, **({'li': let.group(1)} if let else {}))
    else: cur['t'] += ' ' + l
    i += 1
FIX = json.load(open(os.path.join(D, 'statut_fix.json'), encoding='utf8'))
for x in items:
    if 't' not in x: continue
    t = re.sub(r'\s+', ' ', x['t']).strip()
    for a, b in FIX:
        if a not in t and a.replace("'", '’') not in t: continue
        t = t.replace(a, b)
    t = re.sub(r'(\w)- (?=[a-zéèêàâîôûç])', r'\1', t)     # coupures restées en fin de colonne
    t = re.sub(r'\s+([.,])', r'\1', t)
    t = re.sub(r' ?([;:!?])', ' \\1', t)
    t = t.replace("'", '’')
    t = re.sub(r'\bEtat', 'État', t); t = re.sub(r'\bA (?=[a-zé])', 'À ', t)
    x['t'] = t
# alinéas réunis par erreur à la lecture : séparés (\n)
out = []
for x in items:
    if x['k'] == 'para' and '\n' in x['t']:
        for k, part in enumerate(x['t'].split('\n')):
            y = dict(x, t=part.strip()); y.pop('li', None)
            m = re.match(r'([a-d])\. ', y['t'])
            if m: y['li'] = m.group(1)
            out.append(y)
    else: out.append(x)
items = out
for x in items:
    if x['k'] == 'chap': x['tt'] = x['tt'].capitalize().replace('Compétence de la cour', 'Compétence de la Cour').replace('Organisation de la cour', 'Organisation de la Cour').replace('Competence de la cour', 'Compétence de la Cour').replace('Procedure', 'Procédure')
json.dump(items, open(os.path.join(D, 'statut.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=0)
arts = [int(x['n']) for x in items if x['k'] == 'art']
print(len(items), 'éléments ;', len(arts), 'articles ; suite complète :', arts == list(range(1, 71)), '; chapitres', [(x['n'], x['tt']) for x in items if x['k'] == 'chap'])
