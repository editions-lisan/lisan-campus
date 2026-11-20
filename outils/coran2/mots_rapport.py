"""Tableau des corrections de « Lire le Coran pas à pas 2 » (pour l'Oustaz seulement, hors site) : un classeur Excel.
    LC2_BASE=… python3 mots_rapport.py sortie.xlsx
"""
import json, os, sys, re
import mots_plan as P
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter

HERE = os.path.dirname(os.path.abspath(__file__))
SITE_URL = 'https://lisan-campus.pages.dev/'
man = json.load(open(os.path.join(HERE, 'mots_audio.json'), encoding='utf8'))
SRC = 'Existant recoupé : récitation d’al-Ḥouṣarî (al-Muṣḥaf al-mu‘allim), extrait calé lettre par lettre'

rows = []
# 1. texte arabe
rows.append(['23', 'بَسَطتَّ (Je retiens)', 'Chadda sur le tâ’ : le Mouss-haf écrit بَسَطتَ (fusion incomplète, pas de chadda).', 'Écrit بَسَطتَ, comme dans le Mouss-haf (Al-Mâ’ida, 28).', '—', ''])
rows.append(['Toutes', 'Mots saisis à la main (59 passages)', 'Voyelle placée avant la chadda dans le codage : ordre différent du Mouss-haf, risque de voyelle mal placée selon la police.', 'Chadda toujours avant la voyelle, comme dans le Mouss-haf.', '—', ''])
rows.append(['Toutes', 'Tanwîn « successif » (هُدٗى, قُلُوبٞ, يَوْمَئِذٖ…)', 'Codage du Complexe du roi Fahd, mal dessiné par les polices courantes (voyelle déplacée ou absente).', 'Codé selon Unicode (signes ࣰ ࣱ ࣲ) et dessiné par la police coranique.', '—', ''])
rows.append(['Toutes', 'Tout l’arabe du parcours', 'Police non coranique, taille et interligne serrés : voyelles proches de la ligne voisine.', 'Police Amiri Quran, taille agrandie, interligne de 2,1 à 2,4, alignement à droite.', '—', ''])
# 2. audio
for k, m in sorted(man.items(), key=lambda x: [int(y) for y in x[0].split(':')]):
    n, (s, a, i, j) = m['n'], m['orig']
    old = P.words(s, a, i, j)
    if i != j: err = '« Le mot » faisait entendre le verset entier (mots en plus avant et après).'
    else: err = '« Le mot » venait de l’audio mot à mot de Quran.com : autre voix, mot lu isolé, sans la liaison ni l’arrêt de la leçon.'
    corr = 'Extrait exact : « ' + m['text'] + ' » (' + f"{m['s']}:{m['a']}" + ').'
    if m['why']:
        why = m['why'].replace('remplacé (leçon)', 'autre exemple de la même règle, plus net')
        err += ' Pris tel quel, l’extrait ne pouvait pas être net (' + why + ').'
        if m['text'] != old: corr += ' La carte affiche désormais ce passage.'
    if m['waqf']: corr += ' Lu à l’arrêt (fin de verset ou pause du récitateur).'
    else: corr += ' Lu en liaison, coupé avant le mot suivant.'
    ecoute = ''
    if m.get('flag'): ecoute = 'À écouter : ' + m['flag'].lower()
    elif m.get('doute'): ecoute = 'À écouter : contrôle automatique incertain'
    rows.append([str(n), old, err, corr, SRC, ecoute, SITE_URL + 'audio/qr2/' + m['file'], m['text']])

wb = Workbook(); ws = wb.active; ws.title = 'Corrections'
H = ['Leçon', 'Mot', 'Erreur constatée', 'Correction faite', 'Source de l’audio', 'Écoute conseillée', 'Fichier audio']
ws.append(H)
for r in rows: ws.append((r + [''] * len(H))[:len(H)])
green = PatternFill('solid', fgColor='1B5E20'); thin = Side(style='thin', color='BBBBBB')
for c in ws[1]: c.font = Font(bold=True, color='FFFFFF', name='Times New Roman', size=12); c.fill = green; c.alignment = Alignment(vertical='center', wrap_text=True)
for row in ws.iter_rows(min_row=2):
    for c in row:
        c.font = Font(name='Times New Roman', size=12); c.alignment = Alignment(vertical='top', wrap_text=True)
        c.border = Border(top=thin, bottom=thin, left=thin, right=thin)
    row[1].font = Font(name='Amiri Quran', size=16); row[1].alignment = Alignment(vertical='top', horizontal='right', wrap_text=True)
    if row[5].value: row[5].font = Font(name='Times New Roman', size=12, bold=True, color='B71C1C')
    if row[6].value: row[6].hyperlink = row[6].value; row[6].font = Font(name='Times New Roman', size=10, color='1B5E20', underline='single')
for k, w in enumerate([8, 24, 48, 48, 30, 22, 40], 1): ws.column_dimensions[get_column_letter(k)].width = w
ws.freeze_panes = 'A2'; ws.auto_filter.ref = ws.dimensions
# feuille des extraits à écouter
w2 = wb.create_sheet('À écouter'); w2.append(['Leçon', 'Texte entendu (affiché sur la carte)', 'Raison', 'Fichier audio'])
for r in rows:
    if r[5]: w2.append([r[0], r[7], r[5], r[6]])
for c in w2[1]: c.font = Font(bold=True, color='FFFFFF', name='Times New Roman', size=12); c.fill = green
for row in w2.iter_rows(min_row=2):
    row[1].font = Font(name='Amiri Quran', size=16)
    if row[3].value: row[3].hyperlink = row[3].value
for k, w in enumerate([8, 26, 44, 50], 1): w2.column_dimensions[get_column_letter(k)].width = w
wb.save(sys.argv[1])
print(len(rows), 'lignes ;', sum(1 for r in rows if r[5]), 'à écouter')
