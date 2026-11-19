# Primitives OOXML — « Lire le Coran pas à pas 2 » (même gabarit que le niveau 1)
import re, json, os, itertools

import os
S = os.environ.get('LC2_BASE', '/tmp/lc2-travail')
Q = json.load(open(S + '/qj/package/dist/quran.json'))
QF = json.load(open(S + '/qj/package/dist/quran_fr.json'))

INK = '1E2B26'; GRAY = 'B3B3B4'; LINK = '1565C0'; GREY_T = '5A5A5A'
RET_COL = '0B6B38'
ETAPES = [  # (couleur, fond clair) — mêmes couleurs que le niveau 1
    ('006030', 'EAF3E1'), ('2E7D4F', 'E8F2EC'), ('1F7A6B', 'E5F2EF'), ('1C4570', 'EEF2F8'), ('3B5BA0', 'ECF0F8'),
    ('BE1EB4', 'F8ECF7'), ('A83838', 'F8EFEF'), ('8A552B', 'F5F0E9'), ('B5741F', 'FBF1E3'), ('0E3B2E', 'E6EEEA')]
SURA_FR = {}

def qtext(t):
    return t.replace('ۡ', 'ْ')

def V(s, a):
    """Verset (texte du Mouss-haf, soukoun normalisé)."""
    return qtext(Q[s - 1]['verses'][a - 1]['text'])

def W(s, a, i, j=None):
    """Mot(s) i..j (1-based) du verset s:a."""
    w = V(s, a).split(' ')
    if i < 1 or (j or i) > len(w): raise IndexError(f'mot {s}:{a}:{i}-{j} hors limites ({len(w)} mots)')
    return ' '.join(w[i - 1:(j or i)])

def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

_id = itertools.count(91000)
def nid(): return next(_id)
_did = itertools.count(8000)

def rpr(font='Nunito', sz=24, b=False, i=False, color=None, rtl=False, shd=None, u=False, pos=None, spacing=None):
    x = ''
    if pos is not None: x += f'<w:position w:val="{pos}"/>'
    x += f'<w:rFonts w:ascii="{font}" w:eastAsia="{font}" w:hAnsi="{font}" w:cs="{font}"/>'
    if b: x += '<w:b/><w:bCs/>'
    if i: x += '<w:i/><w:iCs/>'
    if color: x += f'<w:color w:val="{color}"/>'
    if spacing: x += f'<w:spacing w:val="{spacing}"/>'
    x += f'<w:sz w:val="{sz}"/><w:szCs w:val="{sz}"/>'
    if u: x += '<w:u w:val="single"/>'
    if rtl: x += '<w:rtl/><w:lang w:bidi="ar-SA"/>'
    if shd: x += f'<w:shd w:val="clear" w:color="auto" w:fill="{shd}"/>'
    return f'<w:rPr>{x}</w:rPr>'

def R(t, **k):
    return f'<w:r>{rpr(**k)}<w:t xml:space="preserve">{esc(t)}</w:t></w:r>'

def TAB(): return '<w:r><w:tab/></w:r>'
def LRM(): return R('‎')

HL = 'FFE07A'   # fond jaune : lettres de la règle
HL2 = 'BFE3F5'  # fond bleu clair : seconde lettre (celle qui suit)

def AR(t, sz=36, color=INK, font='Lisan Naskh', b=False):
    """Arabe ; ⟦…⟧ fond jaune, ⟨…⟩ fond bleu, ⟪…⟫ gris (non prononcé)."""
    out = []
    for part in re.split(r'(⟦[^⟧]*⟧|⟪[^⟫]*⟫|⟨[^⟩]*⟩)', t):
        if not part: continue
        if part[0] == '⟦': out.append(R(part[1:-1], font=font, sz=sz, color=color, rtl=True, shd=HL, b=b))
        elif part[0] == '⟨': out.append(R(part[1:-1], font=font, sz=sz, color=color, rtl=True, shd=HL2, b=b))
        elif part[0] == '⟪': out.append(R(part[1:-1], font=font, sz=sz, color=GRAY, rtl=True, b=b))
        else: out.append(R(part, font=font, sz=sz, color=color, rtl=True, b=b))
    return ''.join(out)

ARCH = '؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿﴿﴾⟦⟧⟪⟫⟨⟩'
ARRUN = re.compile(f'[{ARCH}]+(?:[  ]+[{ARCH}]+)*')

def rich(s, sz=24, color=None, b=False, i=False, font='Nunito', arsz=36, arcolor=None, bfont=None):
    """**gras**, *italique*, arabe détecté automatiquement."""
    out = []
    for seg in re.split(r'(\*\*[^*]+\*\*|\*[^*]+\*)', s):
        if not seg: continue
        bb, ii, t = b, i, seg
        if seg.startswith('**'): bb, t = True, seg[2:-2]
        elif seg.startswith('*'): ii, t = True, seg[1:-1]
        pos = 0
        for m in ARRUN.finditer(t):
            if m.start() > pos: out.append(R(t[pos:m.start()], font=(bfont if bb and bfont else font), sz=sz, b=bb, i=ii, color=color))
            out.append(AR(m.group(0), sz=arsz, color=arcolor or color or INK)); out.append(LRM())
            pos = m.end()
        if pos < len(t): out.append(R(t[pos:], font=(bfont if bb and bfont else font), sz=sz, b=bb, i=ii, color=color))
    return ''.join(out)

def ppr(jc='left', before=0, after=55, line=252, rule='auto', keep=False, bidi=False, ind=None, tabs=None, border=None, pbb=False, extra=''):
    x = ''
    if keep: x += '<w:keepNext/>'
    if pbb: x += '<w:pageBreakBefore/>'
    if border: x += border
    if tabs: x += '<w:tabs>' + ''.join(f'<w:tab w:val="{v}"' + (f' w:leader="{l}"' if l else '') + f' w:pos="{p}"/>' for v, p, l in tabs) + '</w:tabs>'
    if bidi: x += '<w:bidi/>'
    x += f'<w:spacing w:before="{before}" w:after="{after}" w:line="{line}" w:lineRule="{rule}"/>'
    if ind: x += f'<w:ind w:left="{ind[0]}" w:right="0" w:hanging="{ind[1]}"/>'
    x += f'<w:jc w:val="{jc}"/>' + extra
    return f'<w:pPr>{x}</w:pPr>'

def P(content, **k):
    return f'<w:p>{ppr(**k)}{content}</w:p>'

def T(s, jc='both', after=55, line=252, sz=24, color=None, keep=False, before=0, i=False, b=False):
    return P(rich(s, sz=sz, color=color, i=i, b=b), jc=jc, after=after, line=line, keep=keep, before=before)

def SP(h=115):  # petit espace
    return f'<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="{max(h,20)}" w:lineRule="exact"/></w:pPr></w:p>'

def PAGEBREAK():
    return '<w:p><w:pPr><w:pageBreakBefore/><w:spacing w:before="0" w:after="0" w:line="60" w:lineRule="exact"/><w:jc w:val="both"/></w:pPr></w:p>'

def BM(name):
    i = next(_did)
    return f'<w:bookmarkStart w:id="{i}" w:name="{name}"/><w:bookmarkEnd w:id="{i}"/>'

def ANCHOR(anchor, content):
    return f'<w:hyperlink w:anchor="{anchor}" w:history="1">{content}</w:hyperlink>'

# ---------- tableaux ----------
def borders(color, sz=6, val='single', inside=True):
    iv = val if inside else 'nil'
    return ('<w:tblBorders>' + ''.join(f'<w:{s} w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>' for s in ('top', 'left', 'bottom', 'right'))
            + f'<w:insideH w:val="{iv}" w:sz="{sz}" w:space="0" w:color="{color}"/><w:insideV w:val="{iv}" w:sz="{sz}" w:space="0" w:color="{color}"/></w:tblBorders>')

def tc(content, w, fill='FFFFFF', mar=(36, 88, 36, 88), valign='center', span=None):
    m = '<w:tcMar>' + ''.join(f'<w:{s} w:w="{v}" w:type="dxa"/>' for s, v in zip(('top', 'left', 'bottom', 'right'), mar)) + '</w:tcMar>'
    gs = f'<w:gridSpan w:val="{span}"/>' if span else ''
    if not content.strip().startswith('<w:p') and not content.strip().startswith('<w:tbl'):
        content = P(content)
    if content.rstrip().endswith('</w:tbl>'): content += '<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="20" w:lineRule="exact"/></w:pPr></w:p>'
    return f'<w:tc><w:tcPr><w:tcW w:w="{w}" w:type="dxa"/>{gs}<w:shd w:val="clear" w:color="auto" w:fill="{fill}"/>{m}<w:vAlign w:val="{valign}"/></w:tcPr>{content}</w:tc>'

def tbl(rows, widths, bcolor='D5DDD8', bsz=6, bidi=False, inside=True, header=False, cant=True, jc='center'):
    grid = ''.join(f'<w:gridCol w:w="{w}"/>' for w in widths)
    trs = ''
    for n, r in enumerate(rows):
        trp = ('<w:cantSplit/>' if cant else '') + ('<w:tblHeader/>' if header and n == 0 else '')
        trs += f'<w:tr><w:trPr>{trp}</w:trPr>{"".join(r)}</w:tr>'
    return (f'<w:tbl><w:tblPr>{"<w:bidiVisual/>" if bidi else ""}<w:tblW w:w="{sum(widths)}" w:type="dxa"/><w:jc w:val="{jc}"/>{borders(bcolor, bsz, inside=inside)}'
            f'<w:tblLayout w:type="fixed"/><w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr>'
            f'<w:tblGrid>{grid}</w:tblGrid>{trs}</w:tbl>')

FULL = 10146

def box(paras, fill, border, w=FULL, mar=(110, 220, 110, 220)):
    return tbl([[tc(''.join(paras), w, fill, mar)]], [w], border)

# ---------- images ----------
RELS = []      # (rid, type, target, external)
_img = {}
def img_rel(path_in_media):
    if path_in_media not in _img:
        rid = f'rIdN{len(RELS) + 1}'
        RELS.append((rid, 'image', 'media/' + path_in_media, False)); _img[path_in_media] = rid
    return _img[path_in_media]

_url = {}
def url_rel(u):
    if u not in _url:
        rid = f'rIdN{len(RELS) + 1}'
        RELS.append((rid, 'hyperlink', u, True)); _url[u] = rid
    return _url[u]

def IMG(rid, cx, cy, name):
    i = next(_did)
    return (f'<w:r><w:rPr><w:noProof/></w:rPr><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="{cx}" cy="{cy}"/>'
            f'<wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="{i}" name="Illustration {i}" descr="{name}"/><wp:cNvGraphicFramePr>'
            f'<a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/></wp:cNvGraphicFramePr>'
            f'<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
            f'<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="{i}" name="{name}.png"/><pic:cNvPicPr/></pic:nvPicPr>'
            f'<pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
            f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>')

def COVER(rid):
    i = next(_did)
    return (f'<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="240" w:lineRule="auto"/><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:noProof/></w:rPr><w:drawing>'
            f'<wp:anchor distT="0" distB="0" distL="0" distR="0" simplePos="0" relativeHeight="1" behindDoc="1" locked="1" layoutInCell="1" allowOverlap="1"><wp:simplePos x="0" y="0"/>'
            f'<wp:positionH relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionH><wp:positionV relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionV>'
            f'<wp:extent cx="7560000" cy="10692000"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:wrapNone/><wp:docPr id="{i}" name="Couverture {i}"/><wp:cNvGraphicFramePr>'
            f'<a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">'
            f'<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="{i}" name="couverture.png"/><pic:cNvPicPr/></pic:nvPicPr>'
            f'<pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="7560000" cy="10692000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:anchor></w:drawing></w:r></w:p>')

ICON = {'decouvre': 'imglc_ic_decouvre.png', 'retiens': 'imglc_ic_retiens.png', 'lis': 'imglc_ic_lis.png', 'coran': 'imglc_ic_coran.png',
        'ecoute': 'imglc_ic_ecoute.png', 'exerce': 'imglc_ic_exerce.png', 'joue': 'imglc_ic_joue.png', 'bilan': 'imglc_ic_bilan.png',
        'attention': 'imglc_ic_attention.png'}
SECCOL = {'decouvre': 'B5741F', 'lis': '0E3B2E', 'coran': '1C4570', 'exerce': 'BE1EB4', 'joue': '1F7A6B', 'bilan': '006030'}

# ---------- champs à remplir ----------
def CHECK(color='2E7D4F', sz=32):
    return (f'<w:sdt><w:sdtPr><w:id w:val="{nid()}"/><w14:checkbox><w14:checked w14:val="0"/><w14:checkedState w14:val="2612" w14:font="Segoe UI Symbol"/>'
            f'<w14:uncheckedState w14:val="2610" w14:font="Segoe UI Symbol"/></w14:checkbox></w:sdtPr><w:sdtContent>{R("☐", font="Segoe UI Symbol", sz=sz, color=color)}</w:sdtContent></w:sdt>')

def FIELD(ph='…'):
    return (f'<w:sdt><w:sdtPr><w:alias w:val="Réponse"/><w:id w:val="{nid()}"/><w:showingPlcHdr/><w:text/></w:sdtPr><w:sdtContent>'
            f'{R(ph, color="8A9690", shd="EEF3F0")}</w:sdtContent></w:sdt>')
