# Cahier d'exercices — Lire le Coran pas à pas 2
import sys, importlib
from build import *
from blocks import *
import lesson as LS
from c_front import PLAN

ETS = [importlib.import_module('e1spec').ETAPE] + [importlib.import_module(f'e{k}').ETAPE for k in range(2, 11)]

def front():
    x = COVER(img_rel('imglc2_couverture.png')) + PAGEBREAK() + SP(115)
    x += P(IMG(img_rel('imglc2_wordmark.png'), 2880000, 912000, 'lisan_wordmark'), jc='center', after=80, line=240)
    x += P(R('Lire le Coran pas à pas 2 — Cahier d’exercices', font='Fredoka Bold', color='0E3B2E', sz=36), jc='center', after=20, line=240)
    x += P(R('À utiliser avec le livre « Lire le Coran pas à pas 2 » • Lecture de Ḥafṣ ‘an ‘Âṣim', i=True, color=GREY_T), jc='center', after=200, line=252)
    own = (P(R('Ce cahier appartient à :', b=True, color='0E3B2E'), after=20, line=240) + P(TAB(), tabs=[('right', 6500, 'dot')], before=32, after=30, line=306))
    x += tbl([[tc(own, 6900, 'F2F8EC', (140, 260, 140, 260))]], [6900], '0E3B2E', 8) + SP(115)
    cr = ''.join(P(c, jc='center', after=30, line=250) for c in [
        R('Conception, rédaction et direction pédagogique :', b=True) + R(' Éditions Lisân'),
        R('Éditions Lisân', b=True) + R(' — « La langue qui ouvre les portes » • Abidjan, Côte d’Ivoire'),
        R('Première édition, 2026. © Éditions Lisân. Tous droits réservés. Toute reproduction, même partielle, est interdite sans l’autorisation écrite de l’éditeur (Convention de Berne).'),
        R('Les mots et les versets sont ceux du Mouss-haf de Médine (lecture de Ḥafṣ ‘an ‘Âṣim), avec le code couleur des voyelles du livre.'),
        R('Dans la même collection : Lire le Coran pas à pas 2 — livre de l’élève et livret du maître.'),
        AR('جَمِيعُ ٱلْحُقُوقِ مَحْفُوظَةٌ', sz=36, color='0E3B2E')])
    x += tbl([[tc(cr, FULL, 'FBF8F1', (81, 288, 81, 288))]], [FULL], 'D6B25C')
    x += H_PAGE('Comment utiliser ce cahier', 'Un entraînement pour chacune des 40 leçons du livre')
    x += BULLETS(['Chaque leçon du cahier suit une leçon du livre. Faites les exercices **après** la leçon, sans regarder le livre : c’est ainsi que la mémoire travaille.',
                  'Vous allez compléter, relier, classer, repérer des règles dans des versets et recopier des mots du Coran.',
                  'Tous les mots viennent du Mouss-haf : écrivez-les avec soin, avec toutes leurs voyelles. Dans les lectures, le **fond jaune** marque la lettre qui déclenche la règle et le **fond bleu** la lettre qui suit.',
                  'Les corrigés sont à la fin du cahier (liens « corrigé » et « retour »).'])
    x += DIAMOND('Conseils', '0E3B2E')
    x += BULLETS(['Lisez toujours à voix haute ce que vous écrivez : le tajwîd s’entend.', 'Traitez le cahier avec soin : il contient des mots et des versets du Coran.'], mark='●')
    x += DIAMOND('Sommaire', '0E3B2E')
    rows = []
    for n, title, ar, lessons in PLAN:
        c, l = ETAPES[n - 1]
        rows.append([tc(P(R(f'ÉTAPE {n}', b=True, color='FFFFFF'), jc='center', after=0, line=240), 1500, c),
                     tc(P(ANCHOR(f'cah_{lessons[0][0]}', R(title, b=True, color=c)), after=0, line=240), 6146, l),
                     tc(P(R(f'leçons {lessons[0][0]} à {lessons[-1][0]}', color=GREY_T), jc='center', after=0, line=240), 2500, 'FFFFFF')])
    x += tbl(rows, [1500, 6146, 2500], 'FFFFFF', 6)
    return x

def body():
    x = front()
    for es in ETS:
        for sp in es['lessons']:
            x += LS.lesson_cahier(sp)
    x += CORRIGES(LS.CORR_C)
    return x

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else 'out/Cahier.docx'
    build(body(), out, cover='couverture_cahier.png', title='Lire le Coran pas à pas 2 — Cahier d’exercices'); to_pdf(out, 'out')
