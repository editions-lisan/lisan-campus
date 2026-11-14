# Extrait la Constitution (loi n° 2016-886 du 8 novembre 2016, telle que modifiée par la loi constitutionnelle n° 2020-348
# du 19 mars 2020) du PDF source et la range dans constitution.json : préambule, titres, chapitres, articles, paragraphes.
# Usage : python3 outils/constitution/extract.py <source.pdf>
import json, re, sys, unicodedata
import pymupdf as fitz

SRC = sys.argv[1]
doc = fitz.open(SRC)
BULLET = ''

def lines_of(page):
    out = []
    for b in page.get_text('dict')['blocks']:
        if b['type'] != 0: continue
        bl = []
        for l in b['lines']:
            spans = [s for s in l['spans'] if s['text'].strip()]
            t = ''.join(s['text'] for s in l['spans']).replace(' ', ' ').strip()
            if not t: bl.append({'blank': True}); continue
            bold = sum(len(s['text']) for s in spans if 'Bold' in s['font']) > .6 * sum(len(s['text']) for s in spans)
            ital = sum(len(s['text']) for s in spans if 'Italic' in s['font'] or 'Yu Gothic' in s['font']) > .5 * sum(len(s['text']) for s in spans)
            size = max(s['size'] for s in spans)
            bl.append({'t': t, 'bold': bold, 'ital': ital, 'x': l['bbox'][0], 'x1': l['bbox'][2], 'y': l['bbox'][1], 'size': size})
        if bl: out.append(bl)
    return out

# ---- toutes les lignes, avec une marque de début de paragraphe (bloc, ligne vide, ou ligne courte finie par un point)
L = []; started = False; prev = None
for pn in range(len(doc)):
    for bl in lines_of(doc[pn]):
        brk = True
        for ln in bl:
            if ln.get('blank'): brk = True; continue
            t = ln['t']
            if re.fullmatch(r'\d{1,3}', t) and (ln['y'] > 700 or ln['size'] <= 12.5): continue        # numéro de page
            if t.startswith('Téléchargez'): continue
            if not started:
                if not t.startswith('LOI N° 2016-886'): continue
                started = True
            if prev is not None and not brk and prev['page'] == pn + 1 and prev['x1'] < 470 and re.search(r'[.;:!?»]\s*$', prev['t']): brk = True
            ln['start'] = brk; ln['page'] = pn + 1; brk = False
            L.append(ln); prev = ln

RE_TITRE = re.compile(r'^TITRE\s+([IVXL]+|PREMIER)\s*:?\s*(.*)$')
RE_CHAP = re.compile(r'^CHAPITRE\s+([IVXL0-9]+|PREMIER|UNIQUE)\s*:?\s*(.*)$', re.I)
RE_SECT = re.compile(r'^SECTION\s+([IVXL0-9]+|PREMIERE|UNIQUE)\s*:?\s*(.*)$', re.I)
RE_ART = re.compile(r'^ARTICLE\s+(\d+|PREMIER)(\s+NOUVEAU)?\s*(.*)$')
RE_LOI = re.compile(r'^\(LOI N° 2020-348 DU 19/03/2020\)\s*(.*)$')

items = []      # suite d'éléments : {k: preamble|titre|chap|sect|art|para|annexe|annexhead}
cur_para = None
def end_para():
    global cur_para
    cur_para = None
def add_para(t, ital, bullet):
    global cur_para
    cur_para = {'k': 'para', 't': t, 'ital': ital, 'li': bullet}; items.append(cur_para)
TERM = re.compile(r'[.;:!?»…]\s*$')
pending_title = None    # titre/chapitre dont l'intitulé suit sur les lignes en gras
in_annex = False
for ln in L:
    t = ln['t']
    if t.startswith('TEXTE MODIFICATIF'):
        in_annex = True; items.append({'k': 'annexe'}); end_para(); pending_title = None; continue
    if in_annex and re.match(r'^LOI CONSTITUTIONNELLE N° 2020-348', t):
        items.append({'k': 'annexhead', 't': t}); pending_title = items[-1]; end_para(); continue
    if t == 'PREAMBULE' or t.startswith('PREAMBULE'):
        items.append({'k': 'preamble'}); end_para(); pending_title = None; continue
    if t.startswith('LOI N° 2016-886'):
        items.append({'k': 'loihead', 't': t}); pending_title = items[-1]; end_para(); continue
    m = RE_TITRE.match(t)
    if m and ln['bold']:
        it = {'k': 'titre', 'n': m.group(1), 't': m.group(2).strip()}; items.append(it); pending_title = it; end_para(); continue
    m = RE_CHAP.match(t)
    if m and ln['bold']:
        it = {'k': 'chap', 'n': m.group(1), 't': m.group(2).strip()}; items.append(it); pending_title = it; end_para(); continue
    m = RE_SECT.match(t)
    if m and ln['bold']:
        it = {'k': 'sect', 'n': m.group(1), 't': m.group(2).strip()}; items.append(it); pending_title = it; end_para(); continue
    m = RE_ART.match(t)
    if m and (ln['bold'] or in_annex):
        items.append({'k': 'art', 'n': m.group(1), 'nouveau': bool(m.group(2)), 'annex': in_annex}); pending_title = None; end_para()
        rest = m.group(3).strip()
        if rest: add_para(rest, False, False)
        continue
    m = RE_LOI.match(t)
    if m:
        a = next(x for x in reversed(items) if x['k'] == 'art'); a['loi'] = True; end_para()
        if m.group(1).strip(): add_para(m.group(1).strip(), False, False)
        continue
    # intitulé d'un titre ou d'un chapitre (lignes en gras, centrées)
    if pending_title is not None and ln['bold'] and not ln['ital']:
        pending_title['t'] = (pending_title.get('t', '') + ' ' + t).strip(); continue
    pending_title = None
    bullet = t.startswith(BULLET) or t.startswith('- ') or t.startswith('– ')
    if bullet: t = t.lstrip(BULLET + '-– ').strip()
    # nouveau paragraphe : début de bloc (sauf suite d'une phrase coupée par la page), puce
    cont = cur_para is not None and not bullet and (not ln['start'] or not TERM.search(cur_para['t']))
    if cont:
        prev = cur_para['t']
        cur_para['t'] = prev + t if re.search(r'\w-$', prev) else prev + ' ' + t
    else:
        add_para(t, ln['ital'], bullet)

# coquilles de saisie du document source (mots collés ou coupés, faute de frappe) : corrections typographiques seulement
FIX = [('applicationeffective', 'application effective'), ('cetteéducation', 'cette éducation'), ('descommissions', 'des commissions'),
  ('dutravail', 'du travail'), ('endiscussion', 'en discussion'), ('foncierrural', 'foncier rural'), ('laRépublique', 'la République'),
  ('lepeuple', 'le peuple'), ('loiorganique', 'loi organique'), ('oppositionpolitique', 'opposition politique'), ('sontinterdits', 'sont interdits'),
  ('etgarantis', 'et garantis'), ('laretraite', 'la retraite'), ('oumental', 'ou mental'), ('politiqueétrangère', 'politique étrangère'),
  ('àcourir', 'à courir'), ('concoqué', 'convoqué'), ('ind épendance', 'indépendance'), ('vice- Président', 'vice-Président'),
  ('SOCIAL,ENVIRONNEMENTAL', 'SOCIAL, ENVIRONNEMENTAL'), ('Côte d Ivoire', 'Côte d’Ivoire'), ('75 alinéa I et', '75 alinéa 1 et'),
  ('de la Constitution la détermination des crimes', 'de la Constitution ;§la détermination des crimes')]   # article 101 : deux matières distinctes
# nettoyage des paragraphes
for it in items:
    if it['k'] == 'para' or 't' in it:
        s = it.get('t', '')
        s = re.sub(r'\s+', ' ', s).strip()
        for a, b in FIX: s = s.replace(a, b)
        s = s.replace(' ,', ',').replace(" ’", "’").replace("’ ", "’").replace("' ", "'")
        s = re.sub(r'\s+([;:!?])', r' \1', s)                                    # espace fine insécable
        s = re.sub(r'(?<=\S)([;:!?])(?=\s|$)', r' \1', s)
        s = s.replace('« ', '« ').replace(' »', ' »')
        it['t'] = s
# un paragraphe marqué « § » se scinde en deux éléments de liste
out = []
for it in items:
    if it['k'] == 'para' and '§' in it['t']:
        for k, part in enumerate(it['t'].split('§')): out.append(dict(it, t=part.strip()))
    else: out.append(it)
items = out
# corps du texte : l'article 182 se terminait par l'article 2 de la loi de révision, collé par erreur
for it in items:
    if it['k'] == 'para' and ' ARTICLE 2 La présente loi' in it['t'] and it is not items[-1]:
        pass
def article(n, annex):
    k = next(i for i, x in enumerate(items) if x['k'] == 'art' and x['n'] == n and x['annex'] == annex)
    j = k + 1
    while j < len(items) and items[j]['k'] == 'para': j += 1
    return k, j
k, j = article('182', False)
for x in items[k + 1:j]:
    if ' ARTICLE 2 La présente loi' in x['t']: x['t'] = x['t'].split(' ARTICLE 2 La présente loi')[0]
# article 62 : le document source reproduisait dans le corps l'ancienne rédaction de 2016 sous la mention « nouveau » ;
# la rédaction en vigueur est celle de la loi constitutionnelle n° 2020-348 (reprise de l'annexe)
k, j = article('62', False); ka, ja = article('62', True)
items[k + 1:j] = [dict(x) for x in items[ka + 1:ja]]
items[k]['nouveau'] = True; items[k]['loi'] = True
# annexe : « CHAPITRE 4 NOUVEAU », intitulé sur la ligne suivante
for i, x in enumerate(items):
    if x['k'] == 'chap' and x['n'] == '4' and x['t'] == 'NOUVEAU' and items[i + 1]['k'] == 'para':
        x['t'] = items[i + 1]['t']; x['nouveau'] = True; del items[i + 1]; break
# intitulés lisibles (le document source les écrit en capitales sans accents)
TT = {
 'DES DROITS, DES LIBERTES ET DES DEVOIRS': 'Des droits, des libertés et des devoirs', 'DES DROITS ET DES LIBERTES': 'Des droits et des libertés',
 'DES DEVOIRS': 'Des devoirs', "DE L'ETAT ET DE LA SOUVERAINETE": 'De l’État et de la souveraineté',
 'DES PRINCIPES FONDATEURS DE LA REPUBLIQUE': 'Des principes fondateurs de la République', 'DE LA SOUVERAINETE': 'De la souveraineté',
 'DU POUVOIR EXECUTIF': 'Du pouvoir exécutif', 'DE LA COMPOSITION DE L’EXECUTIF': 'De la composition de l’Exécutif',
 'DU PRESIDENT DE LA REPUBLIQUE': 'Du Président de la République', 'DU VICE-PRESIDENT DE LA REPUBLIQUE': 'Du vice-Président de la République',
 'DU GOUVERNEMENT': 'Du Gouvernement', 'DU POUVOIR LEGISLATIF': 'Du pouvoir législatif',
 'DE LA COMPOSITION DU POUVOIR LEGISLATIF': 'De la composition du pouvoir législatif', 'DU STATUT DES PARLEMENTAIRES': 'Du statut des parlementaires',
 'DES POUVOIRS DU PARLEMENT': 'Des pouvoirs du Parlement',
 'DU MODE D’ORGANISATION ET DE FONCTIONNEMENT DUPARLEMENT': 'Du mode d’organisation et de fonctionnement du Parlement',
 'DES RAPPORTS ENTRE LE POUVOIR LEGISLATIF ET LE POUVOIR EXECUTIF': 'Des rapports entre le pouvoir législatif et le pouvoir exécutif',
 'DES DOMAINES DE LA LOI ET DU REGLEMENT': 'Des domaines de la loi et du règlement', 'DE LA PROCEDURE LEGISLATIVE': 'De la procédure législative',
 'DE LA COMMUNICATION ENTRE L’EXECUTIF ET LE PARLEMENT': 'De la communication entre l’Exécutif et le Parlement',
 'DU CONTROLE DE L’ACTION GOUVERNEMENTALE': 'Du contrôle de l’action gouvernementale', 'DES TRAITES ET ACCORDS INTERNATIONAUX': 'Des traités et accords internationaux',
 'DE LA NEGOCIATION ET DE LA RATIFICATION': 'De la négociation et de la ratification', "DE L'AUTORITE DES TRAITES": 'De l’autorité des traités',
 'DE L’ASSOCIATION, DE LA COOPERATION ET DE L’INTEGRATION ENTRE ETATS AFRICAINS': 'De l’association, de la coopération et de l’intégration entre États africains',
 'DE L’INTEGRATION AFRICAINE': 'De l’intégration africaine', 'DES FINALITES DES ACCORDS': 'Des finalités des accords',
 'DU CONSEIL CONSTITUTIONNEL': 'Du Conseil constitutionnel', 'DES ATTRIBUTIONS': 'Des attributions', 'DE LA COMPOSITION': 'De la composition',
 'DU STATUT DES MEMBRES': 'Du statut des membres', 'DE L’ORGANISATION ET DU FONCTIONNEMENT': 'De l’organisation et du fonctionnement',
 'DE L’AUTORITE DES DECISIONS': 'De l’autorité des décisions', 'DU POUVOIR JUDICIAIRE': 'Du pouvoir judiciaire',
 'DU STATUT DU MAGISTRAT': 'Du statut du magistrat', 'DE L’ORGANISATION DE LA JUSTICE': 'De l’organisation de la justice',
 'DU CONSEIL SUPERIEUR DE LA MAGISTRATURE': 'Du Conseil supérieur de la Magistrature',
 'DE LA COUR DE CASSATION ET DU CONSEIL D’ETAT': 'De la Cour de Cassation et du Conseil d’État', 'De la Cour de Cassation et du Conseil d’Etat': 'De la Cour de Cassation et du Conseil d’État',
 'DE LA COUR DES COMPTES': 'De la Cour des comptes', 'DE L’AUTORITE DES DECISIONS DE JUSTICE': 'De l’autorité des décisions de justice',
 'DE LA HAUTE COUR DE JUSTICE': 'De la Haute Cour de justice',
 'DU CONSEIL ECONOMIQUE, SOCIAL, ENVIRONNEMENTAL ET CULTUREL': 'Du Conseil économique, social, environnemental et culturel',
 'DE LA COMPOSITION ET DU FONCTIONNEMENT': 'De la composition et du fonctionnement', 'DU MEDIATEUR DE LA REPUBLIQUE': 'Du Médiateur de la République',
 'DES ATTRIBUTIONS DU MEDIATEUR DE LA REPUBLIQUE': 'Des attributions du Médiateur de la République',
 'DU STATUT DU MEDIATEUR DE LA REPUBLIQUE': 'Du statut du Médiateur de la République',
 'DE L’ORGANISATION ET DU FONCTIONNEMENT DU MEDIATEUR DE LA REPUBLIQUE': 'De l’organisation et du fonctionnement du Médiateur de la République',
 'DES COLLECTIVITES TERRITORIALES': 'Des collectivités territoriales', 'DE LA CHEFFERIE TRADITIONNELLE': 'De la chefferie traditionnelle',
 'DE LA REVISION CONSTITUTIONNELLE': 'De la révision constitutionnelle', 'DE LA PROCEDURE DE REVISION': 'De la procédure de révision',
 'DES LIMITES AU POUVOIR DE REVISION': 'Des limites au pouvoir de révision', 'DES DISPOSITIONS TRANSITOIRES ET FINALES': 'Des dispositions transitoires et finales',
 'DE LA DESIGNATION DU VICE-PRESIDENT DE LA REPUBLIQUE': 'De la désignation du vice-Président de la République',
 'DE LA VACANCE DE LA PRESIDENCE DE LA REPUBLIQUE': 'De la vacance de la Présidence de la République', 'DU STATUT DES INSTITUTIONS': 'Du statut des institutions',
 'DE LA CONTINUITE LEGISLATIVE': 'De la continuité législative', 'DE L’ENTREE EN VIGUEUR DE LA CONSTITUTION': 'De l’entrée en vigueur de la Constitution',
}
for x in items:
    if x['k'] in ('titre', 'chap', 'sect'):
        if x['t'] not in TT: raise SystemExit('intitulé sans forme lisible : ' + x['t'])
        x['tt'] = TT[x['t']]
json.dump(items, open('outils/constitution/constitution.json', 'w', encoding='utf8'), ensure_ascii=False, indent=0)
arts = [i for i in items if i['k'] == 'art' and not i['annex']]
print('articles', len(arts), 'premier', arts[0]['n'], 'dernier', arts[-1]['n'])
nums = [int(a['n']) if a['n'].isdigit() else 1 for a in arts]
print('manquants', sorted(set(range(1, max(nums) + 1)) - set(nums)), 'doublons', sorted({n for n in nums if nums.count(n) > 1}))
print('titres', [(i['n'], i['t']) for i in items if i['k'] == 'titre'])
