# Livret du maître — Lire le Coran pas à pas 2
import sys, importlib
from build import *
from blocks import *
from lesson import site_txt, plain_ar
from c_front import PLAN

ETS = [importlib.import_module('e1spec').ETAPE] + [importlib.import_module(f'e{k}').ETAPE for k in range(2, 11)]
G = '0E3B2E'

def front():
    x = COVER(img_rel('imglc2_couverture.png')) + PAGEBREAK() + SP(115)
    x += P(IMG(img_rel('imglc2_wordmark.png'), 2880000, 912000, 'lisan_wordmark'), jc='center', after=80, line=240)
    x += P(R('Lire le Coran pas à pas 2 — Livret du maître', font='Fredoka Bold', color=G, sz=36), jc='center', after=20, line=240)
    x += P(R('Méthode progressive de tajwîd • Lecture de Ḥafṣ ‘an ‘Âṣim • Mouss-haf de Médine', i=True, color=GREY_T), jc='center', after=200, line=252)
    cr = ''.join(P(c, jc='center', after=30, line=250) for c in [
        R('Conception, rédaction et direction pédagogique :', b=True) + R(' Éditions Lisân'),
        R('Éditions Lisân', b=True) + R(' — « La langue qui ouvre les portes » • Abidjan, Côte d’Ivoire'),
        R('Première édition, 2026. © Éditions Lisân. Tous droits réservés. Les pages « à photocopier » (évaluations, grilles, fiches de suivi) peuvent être reproduites pour l’usage exclusif de la classe.'),
        R('Ce livret est réservé aux enseignants.', b=True),
        R('Dans la même collection : Lire le Coran pas à pas 2 — livre de l’élève et cahier d’exercices.'),
        AR('جَمِيعُ ٱلْحُقُوقِ مَحْفُوظَةٌ', sz=36, color=G)])
    x += tbl([[tc(cr, FULL, 'FBF8F1', (81, 288, 81, 288))]], [FULL], 'D6B25C')
    x += H_PAGE('Sommaire')
    items = [('Présentation de la méthode', 'pres'), ('Progression et calendrier', 'prog')]
    for es in ETS:
        items.append((f'Fiche de l’étape {es["n"]} — {es["title"]} (leçons {es["lessons"][0]["n"]} à {es["lessons"][-1]["n"]})', f'fiche_{es["n"]}'))
        if es['n'] in (3, 6, 9): items.append((f'Évaluation {es["n"] // 3} (après l’étape {es["n"]})', f'eval_{es["n"] // 3}'))
    items += [('Évaluation finale (à photocopier)', 'eval_f'), ('Corrigés et barèmes des évaluations', 'eval_c'), ('Grille d’observation de la récitation', 'grille'), ('Banque de jeux', 'jeux'), ('Fiche de suivi de la classe', 'suivi')]
    x += ''.join(P(R('•  ', color='B8923A', b=True) + ANCHOR(a, R(t, color=INK)), after=40, line=252) for t, a in items)
    return x

def presentation():
    x = PAGEBREAK() + BM('pres') + H_PAGE('Présentation de la méthode', 'De la lecture juste à la récitation', pbb=False)
    x += DIAMOND('Public et objectifs', G, before=0)
    x += T('« Lire le Coran pas à pas 2 » s’adresse aux élèves qui lisent déjà le Coran dans le Mouss-haf (niveau 1 de la méthode ou niveau équivalent) : enfants à partir de 9 ans, adolescents et adultes. En **10 étapes** et **40 leçons**, l’élève apprend les règles du **tajwîd** dans la lecture de **Ḥafṣ ‘an ‘Âṣim** (voie d’ach-Châṭibiyya) et les applique à la récitation de sourates du dernier hizb.')
    x += GRID(['Principe', 'Dans la classe'],
              [['L’oreille d’abord', 'Chaque passage est d’abord écouté (al-Ḥouṣarî, lecture d’enseignement, codes QR du livre), puis répété, puis lu seul.'],
               ['Une règle à la fois', 'Une notion par leçon ; chaque leçon réutilise les précédentes ; bilan à la fin de chaque étape.'],
               ['Le Mouss-haf comme guide', 'L’élève apprend à lire les signes du Mouss-haf de Médine qui annoncent les règles (soukoun, chadda, petit mîm, tanwîn décalé, signes de pause).'],
               ['Les couleurs', 'Fond jaune : la lettre qui déclenche la règle ; fond bleu : la lettre qui décide. Les voyelles gardent les couleurs du niveau 1.'],
               ['Le maître, modèle vivant', 'Le tajwîd se transmet de bouche à oreille (talaqqî) : l’élève récite devant le maître, qui corrige avec douceur et précision.']],
              [3000, 7146], G, 'F4F8F6')
    x += SP(114) + DIAMOND('L’adab de la récitation', G)
    x += BULLETS(['L’**intention** : on apprend le tajwîd pour réciter la Parole d’Allah telle qu’elle a été révélée ; le rappeler régulièrement.',
                  'La **pureté** : selon l’avis de la majorité des savants, on ne touche le Mouss-haf qu’en état d’ablution. Le livre et le cahier contiennent des versets : les traiter avec respect.',
                  'L’**isti‘âdha** au début de chaque séance de récitation, et la basmala au début des sourates.'], mcolor=G)
    x += SP(114) + DIAMOND('Déroulement type d’une séance (1 h 30)', G)
    x += BULLETS(['**Ouverture (10 min)** : isti‘âdha, basmala ; récitation individuelle de la rubrique « Je lis » de la leçon précédente.',
                  '**Découverte (20 min)** : « Je découvre » ; le maître explique, montre au tableau avec les couleurs, fait écouter l’exemple.',
                  '**Lecture (25 min)** : « Je lis » en chœur, par rangée, puis individuellement ; « Mots du Coran » avec l’écoute du verset.',
                  '**Exercices (20 min)** : « Je m’exerce » du livre, correction collective ; le jeu de la leçon.',
                  '**Bilan (15 min)** : « Mon bilan » et le défi ; le cahier d’exercices se fait à la maison.'], mcolor=G)
    return x

def progression():
    x = PAGEBREAK() + BM('prog') + H_PAGE('Progression et calendrier', 'Une leçon par séance hebdomadaire ; une séance de bilan à la fin de chaque étape', pbb=False)
    rows, wk = [], 1
    for es in ETS:
        n = len(es['lessons'])
        rows.append([f'**{es["n"]}**', es['title'], f'{es["lessons"][0]["n"]} à {es["lessons"][-1]["n"]}', f'semaines {wk} à {wk + n}'])
        wk += n + 1
    x += GRID(['Étape', 'Titre', 'Leçons', 'Calendrier indicatif'], rows, [900, 5046, 1700, 2500], G, 'F4F8F6', jcs=['center', 'left', 'center', 'center'])
    x += SP(114)
    x += T('Soit environ **cinquante séances** avec les bilans d’étape, et quatre évaluations (après les étapes 3, 6 et 9, puis l’évaluation finale). Pour un groupe qui se réunit deux fois par semaine, le livre se termine en un semestre.')
    x += TIP('decouvre', 'Adapter le rythme', ['Les étapes 4 (noûn sâkin) et 8 (madd) demandent souvent une séance de plus. N’avancez que lorsque les trois quarts du groupe réussissent le défi d’étape.'])
    return x

def fiche(es):
    n = es['n']; c, l = ETAPES[n - 1]
    x = PAGEBREAK() + BM(f'fiche_{n}')
    ps = (P(R(f'FICHE • ÉTAPE {n}', font='Nunito ExtraBold', b=True, color='FFFFFF', spacing=40), jc='center', after=10, line=240)
          + P(R(es['title'], font='Quicksand Bold', b=True, color='FFFFFF', sz=40), jc='center', after=10, line=240)
          + P(AR(es['ar'], sz=56, color='FFFFFF', font='Lisan Naskh Mono'), jc='center', bidi=True, after=0, line=240))
    x += tbl([[tc(ps, FULL, c, (160, 200, 160, 200))]], [FULL], c) + SP()
    x += GRID(['', ''], [['**Objectif**', es['aim']], ['**Durée**', es.get('duree', '')], ['**Matériel**', 'Livre de l’élève, cahier d’exercices, téléphone ou enceinte pour l’écoute (codes QR), miroir de poche, tableau.']], [2000, 8146], c, l)
    x += SP(114) + DIAMOND('Les leçons', c)
    rows = [[f'**{sp["n"]}**', '**' + sp['title'] + '** — ' + ' '.join(o.rstrip(' ;.') + ';' for o in sp['obj']).rstrip(';') + '.'] for sp in es['lessons']]
    x += GRID(['Leçon', 'Titre et objectifs'], rows, [1100, 9046], c, 'FFFFFF', jcs=['center', 'left'])
    x += SP(114) + DIAMOND('Points de vigilance', c)
    x += BULLETS(es['vigilance'], mcolor=c)
    x += DIAMOND('L’essentiel à faire retenir', c)
    x += BULLETS([r for sp in es['lessons'] for r in sp['ret'][:2]], mcolor=c)
    x += DIAMOND('Jeux conseillés', c) + T(es['jeu_conseille'])
    x += DIAMOND('Défi d’étape', c) + T(es['defi'])
    x += DIAMOND('Questions orales de fin d’étape', c)
    qs = [q for sp in es['lessons'] for q in sp.get('mini', [])[:2]]
    x += GRID(['Question', 'Réponse attendue'], [[q, a[0]] for q, a in qs], [5600, 4546], c, 'FFFFFF')
    return x

def eval_page(k, ets, final=False):
    lessons = [sp for es in ets for sp in es['lessons']]
    x = PAGEBREAK() + BM('eval_f' if final else f'eval_{k}')
    title = 'Évaluation finale' if final else f'Évaluation {k}'
    x += H_PAGE(title, ('Étapes 1 à 10' if final else f'Étapes {ets[0]["n"]} à {ets[-1]["n"]}') + ' • à photocopier • 45 minutes', pbb=False)
    x += P(R('Nom et prénom : ') + FIELD('……………………………………') + R('      Date : ') + FIELD('…… / …… / ……') + R('      Note : ……… / 20'), after=80, line=276)
    x += DIAMOND('A. Questions (10 points)', G, before=0)
    import random
    rnd = random.Random(k * 7 + (100 if final else 0))
    pool = [q for sp in lessons for q in sp.get('mini', [])]
    rnd.shuffle(pool)
    qs = pool[:10]
    items = []
    for q, a in qs:
        ch = a[:]; rnd.shuffle(ch); items.append((q, ch))
    x += QCM(items)
    x += DIAMOND('B. Récitation devant le maître (10 points)', G)
    if final:
        x += T('L’élève récite une sourate de l’étape 10 tirée au sort (Aḍ-Ḍouḥâ, Ach-Charḥ, At-Tîn, Al-Qadr, Az-Zalzala, Al-‘Âdiyât ou Al-Qâri‘a), puis justifie cinq règles montrées par le maître et s’arrête à trois endroits indiqués.')
    else:
        last = ets[-1]
        lines = last.get('bilan_lis') or [V(1, 7)]
        x += T('L’élève lit les passages suivants au rythme tadwîr ; le maître note avec la grille d’observation.')
        x += JELIS(lines, intro=False, arsz=42)
    return x, qs

def corriges_eval(evals):
    x = PAGEBREAK() + BM('eval_c') + H_PAGE('Corrigés et barèmes des évaluations', pbb=False)
    for title, qs in evals:
        x += DIAMOND(title, G)
        x += P(rich('**A.** ' + ' • '.join(f'{i}. {a[0]}' for i, (q, a) in enumerate(qs, 1)), arsz=30), after=40, line=252)
        x += P(rich('**B. Barème de la récitation (10 points)** : lettres et points de sortie (3) • règles du noûn, du mîm et de la ghounna (2) • madd et durées égales (2) • épaisseur et râ’ (1) • arrêts et reprises (2). Retirer 1 point par erreur claire, ½ point par erreur cachée, sans descendre au-dessous de 0 dans chaque rubrique.'), after=80, line=252)
    return x

def grille():
    x = PAGEBREAK() + BM('grille') + H_PAGE('Grille d’observation de la récitation', 'À photocopier : une grille par élève et par évaluation', pbb=False)
    crit = ['Points de sortie (ح ه ع ء ق ك ض ظ ذ ث)', 'Qualités : lettres épaisses, qalqala, souffle', 'Noûn sâkin et tanwîn', 'Mîm sâkin et ghounna de deux temps', 'Lâm, lettres qui se fondent',
            'Lâm d’Allah et râ’', 'Madd : durées et égalité', 'Arrêts et reprises', 'Rythme (tadwîr), fluidité', 'Adab : isti‘âdha, basmala, posture']
    head = [tc(P(R(h, b=True, color='FFFFFF'), jc='center', after=0, line=240), w, G) for h, w in (('Critère', 5146), ('Acquis', 1250), ('En cours', 1250), ('À revoir', 1250), ('Remarques', 1250))]
    rows = [head] + [[tc(P(rich(cr, arsz=28), after=0, line=245), 5146, 'FFFFFF')] + [tc(P(CHECK(G, 28), jc='center', after=0, line=240), 1250, 'FFFFFF') for _ in range(3)] + [tc(P(''), 1250, 'FFFFFF')] for cr in crit]
    x += P(R('Élève : ') + FIELD('…………………………') + R('     Passage récité : ') + FIELD('…………………………') + R('     Date : ') + FIELD('…… / …… / ……'), after=80, line=276)
    x += tbl(rows, [5146, 1250, 1250, 1250, 1250], 'D5DDD8', 6, header=True)
    return x

def jeux():
    x = PAGEBREAK() + BM('jeux') + H_PAGE('Banque de jeux', 'Les jeux du livre, leçon par leçon', pbb=False)
    rows = []
    for es in ETS:
        for sp in es['lessons']:
            if sp.get('jeu'):
                t, sub, tx = sp['jeu']; rows.append([f'**{sp["n"]}**', f'**{t}** — *{sub}* {tx}'])
    J1 = [('1', '**L’écho** — *Deux joueurs ou plus.* Un verset de la Fâtiḥa est écouté puis répété en écho, sans regarder le livre.'), ('2', '**Le métronome** — *En classe.* Le meneur annonce un rythme ; un joueur récite à ce rythme ; les autres relèvent les erreurs.'),
          ('3', '**Feu vert, feu rouge** — *En groupe.* Cartons verts et rouges pour juger les façons d’enchaîner la basmala.'), ('4', '**Le détective des erreurs** — *Avec le maître.* Le meneur glisse des erreurs ; le détective les trouve et les nomme.')]
    rows = [[f'**{a}**', b] for a, b in J1] + rows
    x += GRID(['Leçon', 'Le jeu'], rows, [1100, 9046], G, 'FFFFFF', jcs=['center', 'left'])
    return x

def suivi():
    x = PAGEBREAK() + BM('suivi') + H_PAGE('Fiche de suivi de la classe', 'À photocopier : cochez chaque étape validée', pbb=False)
    ws = [3146] + [700] * 10
    head = [tc(P(R('Élève', b=True, color='FFFFFF'), jc='center', after=0, line=240), ws[0], G)] + [tc(P(R(f'É{k}', b=True, color='FFFFFF'), jc='center', after=0, line=240), 700, ETAPES[k - 1][0]) for k in range(1, 11)]
    rows = [head] + [[tc(P(''), ws[0], 'FFFFFF', (160, 88, 160, 88))] + [tc(P(''), 700, 'FFFFFF') for _ in range(10)] for _ in range(20)]
    return x + tbl(rows, ws, 'D5DDD8', 6, header=True)

def body():
    x = front() + presentation() + progression()
    evals = []
    for es in ETS:
        x += fiche(es)
        if es['n'] in (3, 6, 9):
            k = es['n'] // 3
            e, qs = eval_page(k, ETS[es['n'] - 3:es['n']]); x += e; evals.append((f'Évaluation {k}', qs))
    e, qs = eval_page(4, ETS, final=True); x += e; evals.append(('Évaluation finale', qs))
    x += corriges_eval(evals) + grille() + jeux() + suivi()
    return x

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else 'out/Maitre.docx'
    build(body(), out, cover='couverture_maitre.png', title='Lire le Coran pas à pas 2 — Livret du maître'); to_pdf(out, 'out')
