import sys, importlib
from build import *
from blocks import CORRIGES
from c_front import TITLEPAGE, SOMMAIRE, BIENVENUE, MODE_EMPLOI, TEST
from c_e1 import ETAPE1
from lesson import etape_docx
from annexes import ATTESTATION, RECAPS, GLOSSAIRE, CARNET
NE = int(sys.argv[2]) if len(sys.argv) > 2 else 10
ETS = [importlib.import_module(f'e{k}').ETAPE for k in range(2, NE + 1)]
body = TITLEPAGE() + SOMMAIRE() + BIENVENUE() + MODE_EMPLOI() + TEST() + ETAPE1()
for es in ETS: body += etape_docx(es)
body += (ATTESTATION() if NE == 10 else '') + RECAPS() + GLOSSAIRE() + CORRIGES() + CARNET()
out = sys.argv[1] if len(sys.argv) > 1 else 'out/LC2.docx'
build(body, out); to_pdf(out, 'out')
