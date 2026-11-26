# Charte des Nations Unies : texte extrait de la transcription fournie (texte en vigueur, amendements de 1963, 1965 et 1971
# intégrés), découpé en préambule, chapitres, intertitres, articles et alinéas → charte.json.
# Usage : python3 extract_charte.py <texte.txt> (texte brut tiré du PDF par PyMuPDF)
import re, json, sys, os
src = open(sys.argv[1], encoding='utf8').read().split('\n')
L = [l.strip() for l in src]
# note liminaire et préambule
a = L.index('NOTE LIMINAIRE'); b = L.index('PRÉAMBULE'); c = L.index('CHAPITRE I')
note, pre = [], []
for l in L[a + 1:b]:
    if not l or l == 'Charte des Nations Unies': continue
    if note and not re.search(r'\.$', note[-1]): note[-1] += ' ' + l
    else: note.append(l)
for l in L[b + 1:c]:
    if not l or l == 'Charte des Nations Unies': continue
    if pre and not re.match(r'(à |et à ces fins|avons décidé|En conséquence)', l): pre[-1] += ' ' + l
    else: pre.append(l)
start = next(i for i, l in enumerate(L) if l == 'CHAPITRE I')
L = [l for l in L[start:] if l and l != 'Charte des Nations Unies']
ROM = 'I II III IV V VI VII VIII IX X XI XII XIII XIV XV XVI XVII XVIII XIX'.split()
items, cur = [], None
items += [dict(k='note', t=t) for t in note] + [dict(k='preamble')] + [dict(k='pre', t=t) for t in pre]
def push(k, **kw):
    global cur
    x = dict(k=k, **kw); items.append(x); cur = x if k == 'para' else None
i = 0
while i < len(L):
    l = L[i]
    m = re.fullmatch(r'(?i)chapitre ([IVX]+)', l)
    if m:
        t = L[i + 1]; i += 2
        while not re.match(r'Article \d+$', L[i]) and not L[i + 1].startswith('Article'):   # titre sur deux lignes
            t += ' ' + L[i]; i += 1
        if not re.match(r'Article \d+$', L[i]) and re.match(r'Article \d+$', L[i + 1]): pass
        push('chap', n=m.group(1), tt=t.strip()); continue
    m = re.fullmatch(r'Article (\d+)', l)
    if m: push('art', n=m.group(1)); i += 1; continue
    # intertitre : ligne courte sans ponctuation finale suivie d'un article
    if i + 1 < len(L) and re.fullmatch(r'Article \d+', L[i + 1]) and not re.search(r'[.;:,]$', l) and len(l) < 70 and l[0].isupper():
        push('inter', t=l); i += 1; continue
    if l.startswith('En foi de quoi'):
        push('para', t=l, sign=True); i += 1; continue
    if l.startswith('Fait à San Francisco'):
        push('fait', t=l + '.'); i += 1; continue
    num = re.match(r'(\d+)\. ', l); let = re.match(r'([a-e])\. ', l)
    new = num or let or cur is None or (re.search(r'[.:]$', cur['t']) and l[0].isupper())
    if new:
        push('para', t=l, **({'li': let.group(1)} if let else {}))
    else:
        cur['t'] += ' ' + l
    i += 1
for x in items:
    if 't' in x:
        t = re.sub(r'\s+', ' ', x['t']).strip()
        t = re.sub(r' ([;:!?])', ' \\1', re.sub(r'(?<=\w)([;:!?])', ' \\1', t))   # espace insécable avant ; : ! ?
        t = t.replace("'", '’'); t = re.sub(r'"([^"]+)"', '«\u00a0\\1\u00a0»', t)
        t = re.sub(r'\bEtat', 'État', t); t = re.sub(r'\bEtre\b', 'Être', t); t = re.sub(r'\bA (?=[a-zé])', 'À ', t)
        x['t'] = t
json.dump(items, open(os.path.join(os.path.dirname(__file__), 'charte.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=0)
print(len(items), 'éléments ;', sum(x['k'] == 'art' for x in items), 'articles ;', sum(x['k'] == 'chap' for x in items), 'chapitres')
print('intertitres :', [x['t'] for x in items if x['k'] == 'inter'])
print('chapitres :', [(x['n'], x['tt']) for x in items if x['k'] == 'chap'])
