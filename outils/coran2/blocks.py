# Blocs de mise en page (calqués sur le niveau 1)
from lib import *
import qrcode

MEDIA_NEW = {}   # nom -> chemin source

def H_PAGE(title, sub=None, pbb=True, color='0E3B2E'):
    x = P(R(title, font='Quicksand Bold', sz=44, b=True, color=color), jc='center', after=40, line=240, pbb=pbb)
    if sub: x += P(R(sub, font='Nunito', sz=24, i=True, color=GREY_T), jc='center', after=160, line=252)
    return x

def DIAMOND(t, color='0E3B2E', before=80):
    return P(R('◆ ', b=True, color=color, sz=28, u=True) + R(t, font='Nunito ExtraBold', b=True, color=color, sz=30, u=True), keep=True, before=before, after=35)

def BULLETS(items, color=None, mark='➢', mcolor='0E3B2E', after=20):
    out = ''
    for it in items:
        out += P(R(mark, font='Segoe UI Symbol', color=mcolor) + TAB() + rich(it, color=color), tabs=[('left', 360, None)], ind=(360, 300), after=after, line=252, jc='left')
    return out

def QUOTE(text, source, color, light, ar=None, arsz=40):
    ps = ''
    if ar: ps += P(AR(ar, sz=arsz, color=color), jc='center', bidi=True, after=40, line=240)
    ps += P(rich(text, i=True, color=INK), jc='both', after=20, line=250)
    ps += P(R(source, font='Nunito ExtraBold', b=True, color=color), jc='right', after=0, line=240)
    return box([ps], light, color, mar=(120, 240, 120, 240))

def TIP(icon, title, paras, tcolor='B5741F'):
    left = P(IMG(img_rel(ICON[icon]), 378000, 378000, 'ic_' + icon), jc='center', after=55, line=240)
    right = P(R(title, font='Nunito ExtraBold', b=True, color=tcolor, pos=0), after=15, line=240) + ''.join(P(rich(p), jc='both', after=15, line=245) for p in paras)
    return tbl([[tc(left, 1000, 'F7F7F7', (100, 60, 60, 60), 'top'), tc(right, 9146, 'F7F7F7', (100, 160, 100, 200), 'top')]], [1000, 9146], 'F7F7F7', 4, inside=False)

def ECOUTE(paras, title='J’écoute et je prononce'):
    left = P(IMG(img_rel(ICON['ecoute']), 432000, 432000, 'ic_ecoute'), jc='center', after=55, line=240)
    right = P(R(title, font='Nunito ExtraBold', b=True, color='3B5BA0', pos=0), after=15, line=240) + ''.join(P(rich(p), jc='both', after=25, line=245) for p in paras)
    return tbl([[tc(left, 1000, 'F7F7F7', (100, 60, 60, 60), 'top'), tc(right, 9146, 'F7F7F7', (100, 160, 100, 200), 'top')]], [1000, 9146], 'F7F7F7', 4, inside=False)

def RETIENS(items, title='Je retiens'):
    ps = P(R(title, font='Quicksand Bold', b=True, color='FFFFFF'), after=20, line=240)
    for it in items:
        ps += P(R('➢', font='Segoe UI Symbol', color='FFFFFF') + TAB() + rich(it, b=True, color='FFFFFF', arcolor='FFFFFF'),
                tabs=[('left', 360, None)], ind=(360, 300), after=15, line=240)
    return tbl([[tc(ps, 9200, RET_COL, (120, 240, 120, 240), 'top')]], [9200], RET_COL)

def SECTION(kind, label, before=168):
    col = SECCOL[kind]
    return P(IMG(img_rel(ICON[kind]), 378000, 378000, 'ic_' + kind) + R('  ') + R(label, font='Quicksand Bold', b=True, color=col, sz=34, pos=14),
             keep=True, before=before, after=50, line=240, border=f'<w:pBdr><w:top w:val="single" w:sz="12" w:space="6" w:color="{col}"/></w:pBdr>')

def CORLINK(key):
    return BM('ex_' + key) + R('     ') + ANCHOR('co_' + key, R('✓︎', font='Segoe UI Symbol', color=LINK) + R(' ') + R('corrigé', font='Nunito ExtraBold', b=True, color=LINK, u=True))

def EXO(n, title, key, instr=None):
    x = P(R('▸  ', font='Segoe UI Symbol', color='BE1EB4') + R(f'Exercice {n} — {title}', font='Nunito ExtraBold', b=True, color='BE1EB4', sz=26) + CORLINK(key),
          keep=True, before=80, after=40, line=252)
    if instr: x += P(rich(instr), keep=True, after=40, line=252, jc='both')
    return x

def ETAPE_BANNER(n, title, ar, aim):
    c, l = ETAPES[n - 1]
    ps = (P(R(f'ÉTAPE {n}', font='Quicksand Bold', b=True, color='FFFFFF', spacing=80, sz=40), jc='center', after=0, line=240)
          + P(R(title, font='Quicksand Bold', b=True, color='FFFFFF', sz=60), jc='center', after=30, line=240)
          + P(AR(ar, sz=96, color='FFFFFF', font='Lisan Naskh Mono'), jc='center', bidi=True, after=30, line=240)
          + P(R(aim, i=True, color='FFFFFF'), jc='center', after=0, line=250))
    return BM(f'etape_{n}') + tbl([[tc(ps, FULL, c, (300, 400, 300, 400))]], [FULL], c)

def LESSON_LIST(n, lessons):
    c, l = ETAPES[n - 1]
    rows = []
    for num, title, ar in lessons:
        rows.append([tc(P(ANCHOR(f'lecon_{num}', R(f'Leçon {num}', font='Nunito ExtraBold', b=True, color=c)), after=0, line=240), 1700, l, (60, 120, 60, 120)),
                     tc(P(R(title, color=INK), after=0, line=245), 6146, 'FFFFFF', (60, 120, 60, 120)),
                     tc(P(AR(ar, sz=36, color=c), jc='center', bidi=True, after=0, line=240), 2300, 'FFFFFF', (40, 60, 40, 60))])
    return tbl(rows, [1700, 6146, 2300], c, 4)

def LESSON_BANNER(e, n, title, ar):
    c, l = ETAPES[e - 1]
    ps = (P(R(f'ÉTAPE {e}  •  LEÇON {n}', font='Nunito ExtraBold', b=True, color='FFFFFF', spacing=40), jc='center', after=10, line=240)
          + P(R(title, font='Quicksand Bold', b=True, color='FFFFFF', sz=44), jc='center', after=10, line=240)
          + P(AR(ar, sz=72, color='FFFFFF', font='Lisan Naskh Mono'), jc='center', bidi=True, after=0, line=240))
    return BM(f'lecon_{n}') + tbl([[tc(ps, FULL, c, (160, 200, 180, 200))]], [FULL], c)

def OBJECTIFS(e, items):
    c, l = ETAPES[e - 1]
    ps = P(R('Dans cette leçon, je vais :', font='Nunito ExtraBold', b=True, color=c), after=15, line=240)
    for it in items:
        ps += P(R('✓', font='Segoe UI Symbol', b=True, color=c) + TAB() + rich(it), tabs=[('left', 400, None)], ind=(400, 400), after=10, line=240)
    return tbl([[tc(ps, FULL, l, (110, 220, 110, 220))]], [FULL], c, 4)

def GRID(head, rows, widths, hcolor, light='FFFFFF', arsz=40, jcs=None, alt=None):
    """Tableau d'explication : en-tête coloré, cellules riches (arabe détecté)."""
    jcs = jcs or ['left'] * len(widths)
    trs = [[tc(P(R(h, b=True, color='FFFFFF'), jc='center', after=0, line=240, keep=True), w, hcolor) for h, w in zip(head, widths)]]
    for k, r in enumerate(rows):
        fill = (alt if (alt and k % 2) else light)
        cells = []
        for cell, w, j in zip(r, widths, jcs):
            if isinstance(cell, tuple) and cell[0] == 'AR':
                cells.append(tc(P(AR(cell[1], sz=cell[2] if len(cell) > 2 else arsz), jc='center', bidi=True, after=0, line=240), w, fill, (40, 60, 40, 60)))
            else:
                cells.append(tc(P(rich(cell, arsz=34), jc=j, after=0, line=245), w, fill))
        trs.append(cells)
    return tbl(trs, widths, 'D5DDD8', 6, header=True)

def JELIS(lines, key=None, arsz=50, intro=True):
    """lines : liste ; chaque ligne = liste de cellules arabes (≤ 7) ou chaîne (ligne entière)."""
    x = ''
    if intro:
        x += P(R('Lisez chaque ligne à voix haute, de droite à gauche. Cochez la case de la ligne quand vous l’avez lue sans erreur.', i=True, color=GREY_T), keep=True, after=30, line=252)
    if key:
        x += P(R('Lisez d’abord seul, puis vérifiez votre lecture :') + CORLINK(key), keep=True, after=30, line=252)
    rows = []
    numw = 760; avail = FULL - numw
    ncol = max((len(l) for l in lines if isinstance(l, list)), default=1)
    cw = avail // ncol; widths = [cw] * ncol; widths[0] += avail - cw * ncol
    for k, l in enumerate(lines, 1):
        kp = (k == 1)
        num = tc(P(R(str(k), font='Nunito ExtraBold', b=True, color=GREY_T) + R(' ') + CHECK('5A5A5A', 28), jc='center', after=55, line=240, keep=kp), numw, 'EEF0EF', (36, 88, 36, 88))
        if isinstance(l, list):
            cells = [tc(P(AR(w, sz=arsz), jc='center', bidi=True, after=55, line=240, keep=kp), widths[i], 'FFFFFF', (31, 24, 31, 24)) for i, w in enumerate(l)]
            for i in range(len(l), ncol): cells.append(tc(P(''), widths[i], 'FFFFFF', (31, 24, 31, 24)))
        else:
            cells = [tc(P(AR(l, sz=arsz - 6), jc='center', bidi=True, after=55, line=240, keep=kp), avail, 'FFFFFF', (40, 80, 40, 80), span=ncol if ncol > 1 else None)]
        rows.append(cells + [num])
    return x + tbl(rows, widths + [numw], 'D5DDD8', 6, bidi=True)

QRDIR = S + '/lc2/qr'
os.makedirs(QRDIR, exist_ok=True)
def qr_for(s, a):
    u = f'https://everyayah.com/data/Husary_Muallim_128kbps/{s:03d}{a:03d}.mp3'
    name = f'imglc2_qr_{s:03d}{a:03d}.png'
    p = QRDIR + '/' + name
    if not os.path.exists(p):
        q = qrcode.QRCode(border=1, box_size=8, error_correction=qrcode.constants.ERROR_CORRECT_M); q.add_data(u); q.make(fit=True)
        q.make_image(fill_color='#1E2B26', back_color='white').save(p)
    MEDIA_NEW[name] = p
    return img_rel(name), url_rel(u)

from suras import SURAS
def ref(s, a): return f'{SURAS[s]}, {a}'

SITE_URL = 'https://lisan-campus.pages.dev/'

def qr_url(u, name):
    """code QR d'une adresse quelconque (fichier imglc2_qr_<name>.png)"""
    name = f'imglc2_qr_{name}.png'; p = QRDIR + '/' + name
    if not os.path.exists(p):
        q = qrcode.QRCode(border=1, box_size=8, error_correction=qrcode.constants.ERROR_CORRECT_M); q.add_data(u); q.make(fit=True)
        q.make_image(fill_color='#1E2B26', back_color='white').save(p)
    MEDIA_NEW[name] = p
    return img_rel(name), url_rel(u)

_MA = None
def mot_audio(s, a, mk):
    """extrait du site (mots_build.py → mots_audio.json) qui fait entendre exactement cette carte, ou None"""
    global _MA
    if _MA is None:
        import json
        f = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'mots_audio.json')
        _MA = json.load(open(f, encoding='utf8')) if os.path.exists(f) else {}
    import mots_plan
    plain = re.sub('[⟦⟧⟨⟩⟪⟫]', '', mk)
    for m in _MA.values():
        os_, oa, oi, oj = m['orig']
        if (os_, oa) == (s, a) and mots_plan.words(os_, oa, oi, oj) == plain: return m
    return None

def mot_display(mk, m):
    """la carte montre ce que l'on entend : le mot (couleurs de la règle) et, au besoin, le mot voisin ajouté"""
    import mots_plan
    plain = re.sub('[⟦⟧⟨⟩⟪⟫]', '', mk)
    if m['text'] == plain: return mk
    os_, oa, oi, oj = m['orig']
    if (m['s'], m['a']) == (os_, oa) and m['i'] <= oi and oj <= m['j']:
        pre = mots_plan.words(os_, oa, m['i'], oi - 1) if m['i'] < oi else ''
        post = mots_plan.words(os_, oa, oj + 1, m['j']) if oj < m['j'] else ''
        return ' '.join(x for x in (pre, mk, post) if x)
    return m['text']

def MOTS(cards, field='Je lis :', key=None, arsz=52, cols=3):
    """cards : (markup arabe, sourate, verset, note facultative). « Écouter » et le code QR mènent à l'extrait de la
    récitation d'al-Ḥouṣarî qui fait entendre exactement la carte (site Lisân Campus), sinon au verset."""
    x = P(R('Lisez d’abord seul, puis écoutez al-Ḥouṣarî réciter exactement ce qui est écrit (lien « Écouter » ou code QR).', i=True, color=GREY_T), keep=True, after=30, line=252)
    if key: x += P(R('Vérifiez vos réponses :') + CORLINK(key), keep=True, after=30, line=252)
    w = FULL // cols; widths = [w] * cols; widths[-1] += FULL - w * cols
    rows = []
    for i in range(0, len(cards), cols):
        row = []
        for j in range(cols):
            if i + j >= len(cards): row.append(tc(P(''), widths[j], 'F3F6FB', (31, 80, 31, 80))); continue
            mk, s, a, note = (cards[i + j] + (None,))[:4]
            m = mot_audio(s, a, mk)
            if m:
                if m['why'].startswith('remplacé') and m['note']: note = m['note']
                mk = mot_display(mk, m); s, a = m['s'], m['a']
                if m['waqf'] and re.search(r'([\u064B-\u0650\u0656\u0657\u065E]|\u0651)[^\u0621-\u064A]*$|[\u064B\u0657][^\u0621-\u064A]*[اى][^\u0621-\u064A]*$', re.sub('[⟦⟧⟨⟩⟪⟫]', '', mk).strip()) and 'arrêt' not in (note or ''):
                    note = (note + ' · ' if note else '') + 'lu à l’arrêt'
                rq, ru = qr_url(SITE_URL + 'audio/qr2/' + m['file'], 'mot_' + m['file'][:-4])
            else:
                rq, ru = qr_for(s, a)
            c = P(AR(mk, sz=arsz if len(re.sub('[⟦⟧⟨⟩⟪⟫]', '', mk)) <= 26 else max(34, arsz - 14)), jc='center', bidi=True, after=40, line=240, keep=True)
            if note: c += P(rich(note, sz=22, color='1C4570', arsz=30), jc='center', after=20, line=240, keep=True)
            c += P(f'<w:hyperlink r:id="{ru}" w:history="1">{IMG(rq, 504000, 504000, "qr")}</w:hyperlink>' + R('  ') + R(ref(s, a), i=True, color=GREY_T, pos=10), jc='center', after=30, line=240, keep=True)
            c += P(f'<w:hyperlink r:id="{ru}" w:history="1">' + R('►︎', font='Segoe UI Symbol', color=LINK) + R(' Écouter', font='Nunito ExtraBold', b=True, color=LINK, u=True) + '</w:hyperlink>', jc='center', after=10, line=240, keep=(i == 0 or bool(field)))
            if field: c += P(R(field + ' ', color='1C4570') + FIELD(), before=12, after=0, line=252, keep=(i == 0))
            row.append(tc(c, widths[j], 'F3F6FB', (31, 80, 31, 80)))
        rows.append(row)
    return x + tbl(rows, widths, 'D7DEE8', 6, bidi=True)

def WRITE_LINES(n=2, w=FULL):
    return ''.join(P(TAB(), tabs=[('right', 9900, 'dot')], before=40, after=30, line=306) for _ in range(n))

def QCM(items, key_letters=True):
    """items : (question, [choix])"""
    x = ''
    for k, (q, ch) in enumerate(items, 1):
        x += P(R(f'{k}. ', font='Nunito ExtraBold', b=True, color='BE1EB4') + rich(q), keep=True, after=20, line=252, before=30)
        for m, c in enumerate(ch):
            x += P(CHECK('BE1EB4', 26) + R('  ') + rich(f'{"abcd"[m]}) {c}'), ind=(560, 0), after=10, line=252, keep=(m < len(ch) - 1))
    return x

def VF(items):
    rows = [[tc(P(R('Affirmation', b=True, color='FFFFFF'), jc='center', after=0, line=240), 8146, 'BE1EB4'),
             tc(P(R('Vrai', b=True, color='FFFFFF'), jc='center', after=0, line=240), 1000, 'BE1EB4'),
             tc(P(R('Faux', b=True, color='FFFFFF'), jc='center', after=0, line=240), 1000, 'BE1EB4')]]
    for k, it in enumerate(items, 1):
        rows.append([tc(P(rich(f'{k}. {it}', arsz=34), after=0, line=245), 8146, 'FFFFFF'),
                     tc(P(CHECK('BE1EB4', 30), jc='center', after=0, line=240), 1000, 'FFFFFF'),
                     tc(P(CHECK('BE1EB4', 30), jc='center', after=0, line=240), 1000, 'FFFFFF')])
    return tbl(rows, [8146, 1000, 1000], 'E3C9E1', 6, header=True)

def RELIER(left, right, lw=4600, rw=4600):
    rows = []
    for k, (a, b) in enumerate(zip(left, right)):
        kp = k < len(left) - 1
        rows.append([tc(P(rich(f'{k + 1}. {a}', arsz=34), after=0, line=245, keep=kp), lw, 'FFFFFF'),
                     tc(P(R('●   ●', color='BE1EB4'), jc='center', after=0, line=240), FULL - lw - rw, 'FFFFFF'),
                     tc(P(rich(f'{"ABCDEFGH"[k]}. {b}', arsz=34), after=0, line=245), rw, 'FFFFFF')])
    return tbl(rows, [lw, FULL - lw - rw, rw], 'FFFFFF', 4, inside=False)

def BILAN(items):
    head = [tc(P(R('Je sais…', b=True, color='FFFFFF'), after=0, line=240, keep=True), 6346, '006030'),
            tc(P(R('Acquis', b=True, color='FFFFFF'), jc='center', after=0, line=240, keep=True), 1266, '2E7D4F'),
            tc(P(R('Presque', b=True, color='FFFFFF'), jc='center', after=0, line=240, keep=True), 1267, 'C79A2E'),
            tc(P(R('À revoir', b=True, color='FFFFFF'), jc='center', after=0, line=240, keep=True), 1267, 'A83838')]
    rows = [head]
    for it in items:
        rows.append([tc(P(rich(it, arsz=34), after=0, line=240, keep=True), 6346, 'EAF3E1'),
                     tc(P(CHECK('2E7D4F'), jc='center', after=55, line=240, keep=True), 1266, 'EAF3E1'),
                     tc(P(CHECK('C79A2E'), jc='center', after=55, line=240, keep=True), 1267, 'EAF3E1'),
                     tc(P(CHECK('A83838'), jc='center', after=55, line=240, keep=True), 1267, 'EAF3E1')])
    return (P(R('Cliquez sur la case qui vous correspond (ou cochez-la au crayon) : c’est pour vous, pas pour une note.', i=True, color=GREY_T), keep=True, after=30, line=252)
            + tbl(rows, [6346, 1266, 1267, 1267], 'D5DDD8', 6, header=True))

def DEFI(text, timed=True):
    ps = P(R('★  Mon défi', font='Nunito ExtraBold', b=True, color='A83838'), after=15, line=240)
    ps += P(rich(text), jc='both', after=15, line=245)
    if timed:
        ps += P(R('Mon temps : 1er essai ', color=GREY_T) + FIELD() + R(' s   •   2e essai ', color=GREY_T) + FIELD() + R(' s   •   3e essai ', color=GREY_T) + FIELD()
                + R(' s   •   Réussi ', color=GREY_T) + CHECK('A83838', 28), after=0, line=252)
    else:
        ps += P(R('Défi réussi le : ', color=GREY_T) + FIELD() + R('   •   Réussi ', color=GREY_T) + CHECK('A83838', 28), after=0, line=252)
    return tbl([[tc(ps, FULL, 'FCF3E6', (100, 200, 100, 200))]], [FULL], 'E8C68C')

# ---------- corrigés ----------
CORR = []   # (clé, titre, paragraphes)
def corr(key, title, lines):
    CORR.append((key, title, lines))

def CORRIGES(lst=None):
    x = H_PAGE('Corrigés des exercices', 'Faites d’abord l’exercice seul, puis vérifiez. Le lien « retour » ramène à l’exercice.')
    cur = None
    for key, title, lines in (CORR if lst is None else lst):
        L = key.split('_')[0]
        if L != cur:
            cur = L
            x += DIAMOND(f'Leçon {L[1:]}', '0E3B2E')
        x += P(BM('co_' + key) + R(title, font='Nunito ExtraBold', b=True, color='BE1EB4') + R('     ')
               + ANCHOR('ex_' + key, R('↩ retour', font='Nunito ExtraBold', b=True, color=LINK, u=True)), keep=True, before=60, after=20, line=252)
        for l in lines:
            x += P(rich(l, arsz=34), ind=(360, 0), after=15, line=252, jc='left')
    return x
