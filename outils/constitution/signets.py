# Signets du PDF : Chromium les tire des intitulés mais perd les espaces aux retours à la ligne ; on garde ses numéros
# de page et on remet les intitulés exacts (même ordre que dans le document).
# Usage : python3 signets.py <pdf> <signets.json>
import json, sys
import pymupdf as fitz
pdf, spec = sys.argv[1], json.load(open(sys.argv[2], encoding='utf8'))
d = fitz.open(pdf); toc = d.get_toc()
if len(toc) != len(spec): raise SystemExit(f'signets : {len(toc)} dans le PDF, {len(spec)} attendus')
d.set_toc([[s['lvl'], s['t'], e[2]] for s, e in zip(spec, toc)])
import os
tmp = pdf + '.tmp'; d.save(tmp, garbage=3, deflate=True); d.close(); os.replace(tmp, pdf)
print('signets :', len(spec))
