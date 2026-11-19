# Une source, quatre sorties : livre de l'élève, cahier d'exercices, livret du maître, site Lisân Campus
import re
from blocks import *
from tajwid import mark_word, tokens

ARSITE = re.compile(f'[{ARCH}]+(?:[  ]+[{ARCH}]+)*')

def site_txt(s):
    """texte riche → markdown du site : arabe entre [[ ]], marques de couleur retirées."""
    s = re.sub('[⟦⟧⟨⟩⟪⟫]', '', s)
    return ARSITE.sub(lambda m: '[[' + m.group(0) + ']]', s)

def plain_ar(s):
    return re.sub('[⟦⟧⟨⟩⟪⟫]', '', s)

# ---------------------------------------------------------------- mots du Coran
def M(s, a, i, j=None, pred=None, nth=1, note=None, blue=True):
    """carte : (balisage, sourate, verset, note, indice du premier mot, indice du dernier mot)"""
    mk = mark_word(s, a, i, j, pred, nth, blue) if pred else W(s, a, i, j)
    return (mk, s, a, note, i, j or i)

def wurl(s, a, i):
    return f'https://audio.qurancdn.com/wbw/{s:03d}_{a:03d}_{i:03d}.mp3'
def vurl(s, a):
    return f'https://everyayah.com/data/Husary_Muallim_128kbps/{s:03d}{a:03d}.mp3'

# ---------------------------------------------------------------- éléments « Je découvre »
def dec_docx(items, C, L):
    x = ''
    prev_tbl = False
    for it in items:
        k = it[0]
        if k == 't': x += T(it[1]); prev_tbl = False
        elif k == 'd': x += DIAMOND(it[1], C); prev_tbl = False
        elif k == 'b': x += BULLETS(it[1], mcolor=C); prev_tbl = False
        elif k == 'v':
            x += P(AR(it[1], sz=44, color=C), jc='center', bidi=True, after=10, line=240, keep=True)
            x += P(R(it[2], i=True, color=GREY_T), jc='center', after=80, line=252); prev_tbl = False
        else:
            if prev_tbl: x += SP(114)
            if k == 'g': x += GRID(it[1], it[2], it[3], C, L, jcs=it[4] if len(it) > 4 else None)
            elif k == 'q': x += QUOTE(it[1], it[2], C, L, ar=it[3] if len(it) > 3 else None, arsz=40)
            elif k == 'tip': x += TIP(it[1], it[2], it[3], tcolor='A83838' if it[1] == 'attention' else 'B5741F')
            elif k == 'img': x += P(IMG(img_rel(it[1]), it[2], it[3], it[1]), jc='center', after=60, line=240)
            x += SP(114) if k != 'img' else ''
            prev_tbl = False
    return x

def cell_site(c):
    if isinstance(c, tuple) and c[0] == 'AR': return '[[' + plain_ar(c[1]) + ']]'
    return site_txt(c)

def dec_site(items):
    out = []
    for it in items:
        k = it[0]
        if k == 't': out.append({'p': site_txt(it[1])})
        elif k == 'd': out.append({'h': site_txt(it[1])})
        elif k == 'b': out.append({'ul': [site_txt(t) for t in it[1]]})
        elif k == 'v': out.append({'ayah': plain_ar(it[1]), 'fr': site_txt(it[2]), 'ref': ''})
        elif k == 'g': out.append({'table': {'h': [site_txt(h) for h in it[1]], 'r': [[cell_site(c) for c in r] for r in it[2]]}})
        elif k == 'q': out.append({'quote': (('[[' + it[3] + ']] ') if len(it) > 3 and it[3] else '') + site_txt(it[1]) + ' — *' + it[2] + '*'})
        elif k == 'tip': out.append({'box': ' '.join(site_txt(p) for p in it[3]), 'title': it[2], 'kind': 'marge'})
    return out

# ---------------------------------------------------------------- exercices
def exo_docx(n, ex, key):
    x = EXO(n, ex['title'], key, ex.get('instr'))
    k = ex['kind']; d = ex.get('data')
    if k == 'vf': x += VF(d)
    elif k == 'qcm': x += QCM(d)
    elif k == 'relier': x += RELIER(d[0], d[1])
    elif k == 'bul': x += BULLETS(d, mark='•', mcolor='BE1EB4', after=40)
    elif k == 'write': x += WRITE_LINES(d)
    elif k == 'classer':
        words, cats = d
        x += P(AR('   •   '.join(words), sz=42), jc='center', bidi=True, after=60, line=240, keep=True)
        w = FULL // len(cats); ws = [w] * len(cats); ws[-1] += FULL - w * len(cats)
        head = [tc(P(rich(c, b=True, color='FFFFFF', arsz=30, arcolor='FFFFFF'), jc='center', after=0, line=240, keep=True), ww, 'BE1EB4') for c, ww in zip(cats, ws)]
        body = [tc(P(R('Écrivez ici', i=True, color='C9CFCC'), jc='center', after=0, line=240), ww, 'FFFFFF', (300, 88, 300, 88)) for ww in ws]
        x += tbl([head, body], ws, 'E3C9E1', 6)
    elif k == 'repere':   # versets où repérer : ligne à lire + case
        x += JELIS(d, intro=False, arsz=44)
    return x

# ---------------------------------------------------------------- leçon : livre de l'élève
def lesson_docx(sp, plan_e):
    e, n = sp['e'], sp['n']
    C, L = ETAPES[e - 1]
    x = PAGEBREAK() + LESSON_BANNER(e, n, sp['title'], sp['ar']) + SP()
    x += OBJECTIFS(e, sp['obj'])
    x += SECTION('decouvre', 'JE DÉCOUVRE')
    x += dec_docx(sp['dec'], C, L)
    if sp.get('ecoute'): x += ECOUTE(sp['ecoute']) + SP(128)
    x += RETIENS(sp['ret'])
    x += SECTION('lis', sp.get('lis_title', 'JE LIS'))
    x += JELIS(sp['lis'], key=f'L{n}_lis', arsz=sp.get('lis_sz', 48))
    if sp.get('lis_note'): x += P(rich(sp['lis_note'], i=True, color=GREY_T, arsz=30), after=0, line=252)
    corr(f'L{n}_lis', 'Je lis — points à surveiller', sp['lis_corr'])
    if sp.get('mots'):
        x += SECTION('coran', sp.get('mots_title', 'MOTS DU CORAN'))
        cards = [(c[0], c[1], c[2], c[3]) for c in sp['mots']]
        key = f'L{n}_mots' if sp.get('mots_corr') else None
        x += MOTS(cards, field=sp.get('mots_field', 'La règle :'), key=key, arsz=sp.get('mots_sz', 48))
        if key: corr(key, 'Mots du Coran', sp['mots_corr'])
    x += SECTION('exerce', 'JE M’EXERCE')
    for k, ex in enumerate(sp['exos'], 1):
        key = f'L{n}_E{k}'
        x += exo_docx(k, ex, key)
        corr(key, f'Exercice {k}', ex['corr'])
    jt, js, jx = sp['jeu']
    x += SECTION('joue', 'JE JOUE : ' + jt.upper())
    x += P(R(js, i=True, color=GREY_T), keep=True, after=30, line=252) + T(jx)
    x += SECTION('bilan', 'MON BILAN')
    x += BILAN(sp['bilan'])
    dt = sp['defi']
    x += SP(128) + DEFI(dt[0], timed=dt[1])
    return x

def etape_docx(es):
    n = es['n']
    x = PAGEBREAK() + ETAPE_BANNER(n, es['title'], es['ar'], es['aim']) + SP()
    for t in es['intro']: x += T(t)
    x += LESSON_LIST(n, [(sp['n'], sp['title'], sp['ar']) for sp in es['lessons']])
    for sp in es['lessons']: x += lesson_docx(sp, es)
    x += bilan_etape_docx(es)
    return x

def bilan_etape_docx(es):
    n = es['n']; C, L = ETAPES[n - 1]
    x = PAGEBREAK() + SECTION('bilan', f'MON BILAN DE L’ÉTAPE {n}', before=0)
    x += P(R('Avant de monter la marche suivante, vérifiez que celle-ci est solide.', i=True, color=GREY_T), jc='center', after=60, line=252)
    x += BILAN(es['bilan'])
    if es.get('bilan_lis'):
        x += SP(128) + P(R('Je lis sans erreur, en appliquant les règles de l’étape :', b=True, color=C), keep=True, after=30, line=252)
        x += JELIS(es['bilan_lis'], intro=False, arsz=44)
    x += SP(128)
    ps = (P(R('★  Mon défi d’étape', font='Nunito ExtraBold', b=True, color='A83838'), after=15, line=240)
          + P(rich(es['defi']), jc='both', after=15, line=245)
          + P(R(f'Étape {n} validée le : ', b=True, color=C) + FIELD() + R('        Visa de l’enseignant ou du parent : ', b=True, color=C) + FIELD(), after=0, line=252))
    x += tbl([[tc(ps, FULL, 'FCF3E6', (100, 200, 100, 200))]], [FULL], 'E8C68C')
    return x

# ---------------------------------------------------------------- site
def lesson_site(sp, es, pages=None):
    e, n = sp['e'], sp['n']
    body = [{'p': f'**Étape {e} · {es["title"]}.** {es["aim"]}'}, {'p': 'Dans cette leçon, je vais :'}, {'ul': [site_txt(o).rstrip(' ;.') for o in sp['obj']]}]
    if pages: body.append({'ref': [['Livre', f'leçon {n}, p. {pages[0]}'], ['Cahier d’exercices', f'p. {pages[1]}']]})
    body.append({'h': 'Je découvre'})
    body += sp.get('site_dec') or dec_site(sp['dec'])
    if sp.get('ecoute'): body.append({'box': ' '.join(site_txt(p) for p in sp['ecoute']), 'title': 'J’écoute et je prononce', 'kind': 'marge'})
    body.append({'h': 'Je retiens'}); body.append({'ul': [site_txt(r) for r in sp['ret']]})
    body.append({'h': 'Je m’entraîne à lire'})
    body.append({'p': 'Lisez chaque ligne de droite à gauche, lentement. Repérez la règle de la leçon, puis recommencez jusqu’à lire sans hésiter.'})
    body.append({'lines': [[plain_ar(w) for w in l] if isinstance(l, list) else [plain_ar(l)] for l in sp['lis']]})
    if sp.get('lis_corr'): body.append({'corrige': [{'ul': [site_txt(c) for c in sp['lis_corr']]}]})
    if sp.get('mots'):
        body.append({'h': 'Des mots du Coran'})
        body.append({'p': 'Lisez d’abord **seul** en appliquant la règle, puis écoutez : **« Le mot »** fait entendre le mot seul, **« Le verset »** le verset entier récité lentement par **al-Ḥouṣarî**.'})
        qw = []
        for c in sp['mots']:
            mk, s, a, note, i, j = c
            from blocks import ref as refname
            qw.append([plain_ar(mk), refname(s, a) + (' · ' + re.sub(r'\*', '', site_txt(note)) if note else ''), vurl(s, a), wurl(s, a, i) if i == j else vurl(s, a)])
        body.append({'qwords': qw})
    body.append({'box': 'Le tajwîd s’apprend auprès d’un maître, de bouche à oreille : ce compagnon sert à **réviser** entre deux séances. Les versets sont récités par al-Ḥouṣarî (lecture de Ḥafṣ) ; les mots seuls proviennent de l’audio mot à mot de Quran.com.', 'title': 'Avec le maître', 'kind': 'marge'})
    return {'id': f't{n}', 'title': f'Leçon {n} : {sp["title"]}', 'body': body}

# ---------------------------------------------------------------- cahier d'exercices
CORR_C = []
def corr_c(key, title, lines): CORR_C.append((key, title, lines))

def lesson_cahier(sp):
    e, n = sp['e'], sp['n']
    C, L = ETAPES[e - 1]
    ps = (P(R(f'ÉTAPE {e}  •  LEÇON {n}', font='Nunito ExtraBold', b=True, color='FFFFFF', spacing=40), jc='center', after=10, line=240)
          + P(R(sp['title'], font='Quicksand Bold', b=True, color='FFFFFF', sz=36), jc='center', after=0, line=240))
    x = PAGEBREAK() + BM(f'cah_{n}') + tbl([[tc(ps, FULL, C, (140, 200, 140, 200))]], [FULL], C) + SP()
    x += P(R('À faire après la leçon ' + str(n) + ' du livre, sans regarder le livre.', i=True, color=GREY_T), jc='center', after=60, line=252)
    extra = []
    ws = [plain_ar(c[0]) for c in sp.get('mots', [])][:4]
    if ws:
        extra.append(dict(title='Je recopie et je lis', instr='Recopiez chaque mot avec toutes ses voyelles, puis lisez-le à voix haute en appliquant la règle de la leçon : ' + '  •  '.join(ws) + '.', kind='write', data=3,
                          corr=['Mots à recopier : ' + ' • '.join(ws) + '. Le maître vérifie la lecture.']))
    dw = []
    for l in sp['lis']:
        for w in (l if isinstance(l, list) else []):
            p_ = plain_ar(w)
            if p_ not in dw and p_ not in ws: dw.append(p_)
    if len(dw) >= 3:
        extra.append(dict(title='Dictée', instr='Le maître, un parent ou un camarade vous dicte trois mots. Écrivez-les avec toutes leurs voyelles.', kind='write', data=3,
                          corr=['Texte à dicter : ' + ' • '.join(dw[-3:]) + '.']))
    for k, ex in enumerate(sp['cahier'] + extra, 1):
        key = f'C{n}_E{k}'
        x += exo_docx(k, ex, key)
        CORR_C.append((key, f'Leçon {n} — Exercice {k}', ex['corr']))
    return x
