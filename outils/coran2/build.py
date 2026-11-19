#!/usr/bin/env python3
# Assemble le .docx de « Lire le Coran pas à pas 2 » à partir du gabarit du niveau 1
import sys, os, re, shutil, zipfile, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import *
import blocks
from blocks import MEDIA_NEW

B = S + '/lc2'
ASSETS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets')
SRC = S + '/lc1/x'

def build(body, out_docx, cover='couverture_coran2.png', title='Lire le Coran pas à pas 2'):
    root_doc = open(SRC + '/word/document.xml', encoding='utf8').read()
    head = root_doc[:root_doc.find('<w:body>') + len('<w:body>')]
    sect = re.search(r'<w:sectPr[^>]*>(?:(?!<w:sectPr).)*?</w:sectPr>\s*</w:body>', root_doc, re.S).group(0)
    sect = re.sub(r' w:rsid\w*="[^"]*"', '', sect)
    doc = head + body + sect + '</w:document>'
    tmp = B + '/pkg'
    if os.path.exists(tmp): shutil.rmtree(tmp)
    shutil.copytree(SRC, tmp)
    # médias : garder icônes et images utiles, retirer les QR du niveau 1
    md = tmp + '/word/media'
    for f in os.listdir(md):
        if f.startswith('imglc_qr_') or f.startswith('imglc_jeu') or f == 'imglc_couverture_coran.png': os.remove(md + '/' + f)
    shutil.copy(ASSETS + '/header2.png', md + '/image1.png')
    shutil.copy(ASSETS + '/footer2.png', md + '/image2.png')
    shutil.copy(ASSETS + '/' + cover, md + '/imglc2_couverture.png')
    shutil.copy(ASSETS + '/wordmark2.png', md + '/imglc2_wordmark.png')
    os.remove(md + '/imglc_lisan_wordmark.png')
    for name, p in MEDIA_NEW.items(): shutil.copy(p, md + '/' + name)
    open(tmp + '/word/document.xml', 'w', encoding='utf8').write(doc)
    rels = open(SRC + '/word/_rels/document.xml.rels', encoding='utf8').read()
    keep = re.findall(r'<Relationship [^>]*/>', rels)
    keep = [k for k in keep if 'rIdImg' not in k and 'rIdUrl' not in k]
    for rid, typ, tgt, ext in RELS:
        t = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/' + typ
        keep.append(f'<Relationship Id="{rid}" Type="{t}" Target="{esc(tgt)}"' + (' TargetMode="External"' if ext else '') + '/>')
    used = set(re.findall(r'Target="media/([^"]+)"', ''.join(keep)))
    for f in os.listdir(md):
        if f not in used and f not in ('image1.png', 'image2.png'): os.remove(md + '/' + f)
    open(tmp + '/word/_rels/document.xml.rels', 'w', encoding='utf8').write(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + ''.join(keep) + '</Relationships>')
    # métadonnées : pas de nom d'auteur
    core = open(tmp + '/docProps/core.xml', encoding='utf8').read()
    core = re.sub(r'<dc:creator>.*?</dc:creator>', '<dc:creator>Éditions Lisân</dc:creator>', core)
    core = re.sub(r'<cp:lastModifiedBy>.*?</cp:lastModifiedBy>', '<cp:lastModifiedBy>Éditions Lisân</cp:lastModifiedBy>', core)
    core = re.sub(r'<dc:title>.*?</dc:title>', '<dc:title>' + title + '</dc:title>', core)
    open(tmp + '/docProps/core.xml', 'w', encoding='utf8').write(core)
    if os.path.exists(out_docx): os.remove(out_docx)
    with zipfile.ZipFile(out_docx, 'w', zipfile.ZIP_DEFLATED) as z:
        z.write(tmp + '/[Content_Types].xml', '[Content_Types].xml')
        for dp, dn, fn in os.walk(tmp):
            for f in fn:
                full = os.path.join(dp, f); arc = os.path.relpath(full, tmp)
                if arc != '[Content_Types].xml': z.write(full, arc)
    return out_docx

def to_pdf(docx, outdir):
    subprocess.run(['soffice', '--headless', '-env:UserInstallation=file://' + S + '/lo_prof', '--convert-to', 'pdf', '--outdir', outdir, docx],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=900)
