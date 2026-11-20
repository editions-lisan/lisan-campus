# Produit site/data/coran2.js (parcours M_QR2) et les mini-exercices « qr2/tN » de site/data/mini.js
import json, importlib, re, sys, os
from lesson import lesson_site, site_txt
REPO = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'site')
pages = {int(k): v for k, v in json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pages.json'))).items()}
ETS = [importlib.import_module('e1spec').ETAPE] + [importlib.import_module(f'e{k}').ETAPE for k in range(2, 11)]

lessons, minis, quiz, cards = [], {}, [], []
for es in ETS:
    for sp in es['lessons']:
        lessons.append(lesson_site(sp, es, pages.get(sp['n'])))
        e = site_txt(sp['ret'][0])
        qs = [{'q': site_txt(q), 'a': [site_txt(x) for x in a], 'c': 0, 'e': e} for q, a in sp['mini']]
        minis[f'qr2/t{sp["n"]}'] = qs
        quiz += qs[:1]
        for f, b in sp.get('cards', []):
            cards.append([site_txt(f), site_txt(b)])
# quelques questions de plus pour la réserve de l'évaluation
for es in ETS:
    for sp in es['lessons'][::2]:
        if len(sp['mini']) > 1:
            q, a = sp['mini'][1]
            quiz.append({'q': site_txt(q), 'a': [site_txt(x) for x in a], 'c': 0, 'e': site_txt(sp['ret'][0])})

# Arabe affiché en police coranique Amiri Quran : tanwîn « successif » du Mouss-haf de Médine codé selon Unicode
# (le texte source suit le codage du Complexe du roi Fahd : ٗ ٞ ٖ), et chadda toujours avant la voyelle, comme dans le Mouss-haf
TANWIN = str.maketrans({'\u0657': '\u08F0', '\u065E': '\u08F1', '\u0656': '\u08F2'})
def ar_fix(x):
    if isinstance(x, str):
        x = re.sub('([\u064B-\u0650\u0656\u0657\u065E])\u0651', '\u0651\\1', x)
        return x.translate(TANWIN)
    if isinstance(x, list): return [ar_fix(y) for y in x]
    if isinstance(x, dict): return {k: ar_fix(v) for k, v in x.items()}
    return x
lessons, quiz, cards, minis = ar_fix(lessons), ar_fix(quiz), ar_fix(cards), ar_fix(minis)

M = {'id': 'qr2', 'space': 'coran', 'lang': 'ar', 'noVoice': True, 'noLessonVoice': True, 'color': 'n',
     'title': 'Lire le Coran pas à pas 2', 'subtitle': '10 étapes, 40 leçons · le tajwîd, de la lecture juste à la récitation (Ḥafṣ)',
     'lessons': lessons, 'quiz': quiz, 'cards': cards}
js = ('// Lisân Campus · « Lire le Coran pas à pas 2 » (Éditions Lisân) : compagnon du livre, 10 étapes et 40 leçons de tajwîd (lecture de Ḥafṣ).\n'
      '// Produit par outils/coran2/gen_site.py à partir des sources du livre : le régénérer plutôt que le modifier à la main.\n'
      'const M_QR2 = ' + json.dumps(M, ensure_ascii=False) + ';\n')
open(REPO + '/data/coran2.js', 'w', encoding='utf8').write(js)

mp = REPO + '/data/mini.js'
s = open(mp, encoding='utf8').read()
s = re.sub(r'\n// ===== LIRE LE CORAN PAS À PAS 2 =====\n.*\Z', '', s, flags=re.S)
s = s.rstrip('\n') + '\n// ===== LIRE LE CORAN PAS À PAS 2 =====\nObject.assign(window.MINI, ' + json.dumps(minis, ensure_ascii=False) + ');\n'
open(mp, 'w', encoding='utf8').write(s)
print(len(lessons), 'leçons', len(quiz), 'questions', len(cards), 'cartes', len(js) // 1024, 'Ko')
