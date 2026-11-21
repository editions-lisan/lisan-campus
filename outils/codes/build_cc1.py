"""Code civil I de la bibliothèque (site/livres/droit/code-civil-i.pdf) : page d'état de mise à jour (avertissement_cc1.html),
puis la compilation d'origine sans modification, avec des signets par partie.
    python3 build_cc1.py <Code-civil-I-original.pdf>
Après chaque nouvelle loi touchant ce code : mettre à jour avertissement_cc1.html (date de vérification, tableau), relancer,
puis node ../cours/versions.js."""
import sys, os, subprocess, tempfile
from pypdf import PdfReader, PdfWriter
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', '..', 'site', 'livres', 'droit', 'code-civil-i.pdf')
# début de chaque partie, en pages du document d'origine
PARTIES = [('Titre préliminaire', 2), ('Livre premier : des personnes (art. 7 à 140)', 4), ('Le nom (loi de 1964 remplacée en 2020)', 20),
           ('L’état civil (loi de 2018, modifiée en 2025)', 26), ('Procédure spéciale de déclaration (loi de 2018)', 75), ('Le mariage (loi de 2019)', 86),
           ('Divorce et séparation de corps (loi de 1964 remplacée en 2022)', 121), ('La filiation (loi de 2019)', 150),
           ('L’adoption (loi de 1964 remplacée en 2019)', 160), ('Les successions (loi de 2019)', 178),
           ('Donations et testaments (loi de 1964 remplacée en 2020)', 220), ('Dispositions diverses (1964, abrogée)', 250),
           ('Textes transitoires et prise d’effet (1964)', 260), ('La minorité (loi de 2019)', 273)]
src = sys.argv[1]
tmp = tempfile.mkdtemp(); notice = os.path.join(tmp, 'avis.pdf')
js = ("const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();"
      f"await p.goto('file://{HERE}/avertissement_cc1.html');await p.evaluate(()=>document.fonts.ready);"
      f"await p.pdf({{path:'{notice}',format:'A4',printBackground:true,preferCSSPageSize:true}});await b.close();}})();")
subprocess.run(['node', '-e', js], check=True)
w = PdfWriter()
for pg in PdfReader(notice).pages: w.add_page(pg)
n0 = len(w.pages)
for pg in PdfReader(src).pages: w.add_page(pg)
w.add_outline_item('État de mise à jour (21 novembre 2026)', 0)
for t, p in PARTIES: w.add_outline_item(t, p - 1 + n0)
w.add_metadata({'/Title': 'Code civil I : droit des personnes et de la famille', '/Subject': 'Compilation de 2021, avec son état de mise à jour (Lisân Campus)', '/Author': 'Compilation ivoire-juriste.com'})
w.page_mode = '/UseOutlines'
with open(OUT, 'wb') as f: w.write(f)
print(OUT, len(w.pages), 'pages')
