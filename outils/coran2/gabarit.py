"""Reconstitue le gabarit Word (LC2_BASE/lc1/x) dont build.py a besoin pour assembler les livres de « Lire le Coran pas
à pas 2 », sans le livre Word du niveau 1 : page A4, marges (880 twips à gauche et à droite, texte de 10 146 twips),
bandeau d'en-tête et pied de page en image pleine largeur (assets/header2.png, footer2.png), numéro de page en blanc
(Quicksand Bold 11 pt) dans le médaillon du pied de page, pas d'en-tête ni de pied sur la couverture, styles par défaut
(Nunito 11 pt, français), icônes des rubriques et schéma de l'appareil de la parole (assets/gabarit/).

Les polices doivent être installées pour LibreOffice (~/.fonts) : Nunito (normal, gras, italique), Nunito ExtraBold,
Quicksand Bold, Fredoka Bold, Lisan Naskh (voyelles en couleur) et Lisan Naskh Mono (même police, sans couleurs, pour
le texte blanc des bandeaux) ; voir LISEZMOI.md.

    LC2_BASE=/chemin/travail python3 gabarit.py
"""
import os, shutil
from PIL import Image

S = os.environ.get('LC2_BASE', '/tmp/lc2-travail')
HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, 'assets')
X = S + '/lc1/x'

NS = ('xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" '
      'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" '
      'xmlns:o="urn:schemas-microsoft-com:office:office" '
      'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
      'xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" '
      'xmlns:v="urn:schemas-microsoft-com:vml" '
      'xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" '
      'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" '
      'xmlns:w10="urn:schemas-microsoft-com:office:word" '
      'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
      'xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" '
      'xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" '
      'xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" '
      'xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" '
      'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
      'xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" mc:Ignorable="w14 w15 wp14"')
XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
PW, PH = 7560000, 10692000          # A4 en EMU

def w(path, s):
    p = X + '/' + path; os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w', encoding='utf8').write(s)

def anchored(rid, name, cy, y, i):
    return (f'<w:r><w:drawing><wp:anchor distT="0" distB="0" distL="0" distR="0" simplePos="0" relativeHeight="{i}" behindDoc="1" locked="1" '
            f'layoutInCell="1" allowOverlap="1"><wp:simplePos x="0" y="0"/><wp:positionH relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionH>'
            f'<wp:positionV relativeFrom="page"><wp:posOffset>{y}</wp:posOffset></wp:positionV><wp:extent cx="{PW}" cy="{cy}"/>'
            f'<wp:effectExtent l="0" t="0" r="0" b="0"/><wp:wrapNone/><wp:docPr id="{i}" name="{name}"/><wp:cNvGraphicFramePr/>'
            f'<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="{i}" name="{name}.png"/>'
            f'<pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
            f'<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{PW}" cy="{cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>'
            f'</pic:pic></a:graphicData></a:graphic></wp:anchor></w:drawing></w:r>')

def height(png):
    im = Image.open(png); return round(PW * im.size[1] / im.size[0])

def main():
    if os.path.exists(X): shutil.rmtree(X)
    hh, fh = height(A + '/header2.png'), height(A + '/footer2.png')
    w('[Content_Types].xml', XML + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
      '<Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/>'
      '<Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="jpg" ContentType="image/jpeg"/>'
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'
      '<Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>'
      '<Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>'
      + ''.join(f'<Override PartName="/word/{p}.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.{t}+xml"/>'
                for p, t in [('header1', 'header'), ('header2', 'header'), ('footer1', 'footer'), ('footer2', 'footer')]) +
      '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>'
      '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>')
    w('_rels/.rels', XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>'
      '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>')
    w('docProps/core.xml', XML + '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
      'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
      '<dc:title>Lire le Coran pas à pas</dc:title><dc:creator>Éditions Lisân</dc:creator><cp:lastModifiedBy>Éditions Lisân</cp:lastModifiedBy>'
      '<dc:language>fr-FR</dc:language></cp:coreProperties>')
    w('docProps/app.xml', XML + '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Éditions Lisân</Application></Properties>')
    R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/'
    w('word/_rels/document.xml.rels', XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
      f'<Relationship Id="rIdS1" Type="{R}styles" Target="styles.xml"/><Relationship Id="rIdS2" Type="{R}settings" Target="settings.xml"/>'
      f'<Relationship Id="rIdS3" Type="{R}fontTable" Target="fontTable.xml"/>'
      f'<Relationship Id="rIdH1" Type="{R}header" Target="header1.xml"/><Relationship Id="rIdH2" Type="{R}header" Target="header2.xml"/>'
      f'<Relationship Id="rIdF1" Type="{R}footer" Target="footer1.xml"/><Relationship Id="rIdF2" Type="{R}footer" Target="footer2.xml"/>'
      '</Relationships>')
    rpr0 = ('<w:rFonts w:ascii="Nunito" w:eastAsia="Nunito" w:hAnsi="Nunito" w:cs="Lisan Naskh"/><w:color w:val="1E2B26"/>'
            '<w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="fr-FR" w:eastAsia="fr-FR" w:bidi="ar-SA"/>')
    w('word/styles.xml', XML + f'<w:styles {NS}><w:docDefaults><w:rPrDefault><w:rPr>{rpr0}</w:rPr></w:rPrDefault>'
      '<w:pPrDefault><w:pPr><w:widowControl/><w:spacing w:before="0" w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>'
      '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>'
      '<w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont"><w:name w:val="Default Paragraph Font"/><w:uiPriority w:val="1"/><w:semiHidden/></w:style>'
      '<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:semiHidden/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/>'
      '<w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>'
      '<w:style w:type="character" w:styleId="Hyperlink"><w:name w:val="Hyperlink"/><w:rPr><w:color w:val="1565C0"/><w:u w:val="single"/></w:rPr></w:style>'
      '</w:styles>')
    w('word/settings.xml', XML + f'<w:settings {NS}><w:zoom w:percent="100"/><w:defaultTabStop w:val="709"/><w:characterSpacingControl w:val="doNotCompress"/>'
      '<w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat>'
      '<w:themeFontLang w:val="fr-FR" w:bidi="ar-SA"/></w:settings>')
    w('word/fontTable.xml', XML + f'<w:fonts {NS}>' + ''.join(f'<w:font w:name="{f}"/>' for f in
      ['Nunito', 'Nunito ExtraBold', 'Quicksand Bold', 'Fredoka Bold', 'Lisan Naskh', 'Lisan Naskh Mono', 'Segoe UI Symbol']) + '</w:fonts>')
    # en-têtes et pieds : couverture (vides), pages courantes (bandeau, pied et numéro de page)
    empty = lambda tag: XML + f'<w:{tag} {NS}><w:p><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:p></w:{tag}>'
    w('word/header1.xml', empty('hdr')); w('word/footer1.xml', empty('ftr'))
    w('word/header2.xml', XML + f'<w:hdr {NS}><w:p><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr>'
      + anchored('rIdI1', 'bandeau', hh, 0, 1) + '</w:p></w:hdr>')
    num = ('<w:rPr><w:rFonts w:ascii="Quicksand Bold" w:hAnsi="Quicksand Bold" w:cs="Quicksand Bold"/><w:b/><w:bCs/><w:color w:val="FFFFFF"/>'
           '<w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>')
    # numéro de page dans le médaillon : même paragraphe que l'image du pied, centré, bas de ligne à 38,2 pt du bas de page
    w('word/footer2.xml', XML + f'<w:ftr {NS}><w:p><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/><w:jc w:val="center"/></w:pPr>'
      + anchored('rIdI2', 'pied', fh, PH - fh, 2) +
      f'<w:r>{num}<w:fldChar w:fldCharType="begin"/></w:r><w:r>{num}<w:instrText xml:space="preserve"> PAGE </w:instrText></w:r>'
      f'<w:r>{num}<w:fldChar w:fldCharType="separate"/></w:r><w:r>{num}<w:t>2</w:t></w:r><w:r>{num}<w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>')
    for n, img in [(2, 'header'), (2, 'footer')]:
        w(f'word/_rels/{img}{n}.xml.rels', XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
          f'<Relationship Id="rIdI{1 if img == "header" else 2}" Type="{R}image" Target="media/image{1 if img == "header" else 2}.png"/></Relationships>')
    sect = ('<w:sectPr><w:headerReference w:type="first" r:id="rIdH1"/><w:headerReference w:type="default" r:id="rIdH2"/>'
            '<w:footerReference w:type="first" r:id="rIdF1"/><w:footerReference w:type="default" r:id="rIdF2"/>'
            '<w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1200" w:right="880" w:bottom="1440" w:left="880" w:header="0" w:footer="764" w:gutter="0"/>'
            '<w:cols w:space="708"/><w:titlePg/><w:docGrid w:linePitch="360"/></w:sectPr>')
    w('word/document.xml', XML + f'<w:document {NS}><w:body><w:p/>{sect}</w:body></w:document>')
    md = X + '/word/media'; os.makedirs(md, exist_ok=True)
    shutil.copy(A + '/header2.png', md + '/image1.png'); shutil.copy(A + '/footer2.png', md + '/image2.png')
    for f in os.listdir(A + '/gabarit'): shutil.copy(A + '/gabarit/' + f, md + '/' + f)
    shutil.copy(A + '/wordmark2.png', md + '/imglc_lisan_wordmark.png')       # retiré par build.py, remplacé par imglc2_wordmark
    shutil.copy(A + '/couverture_coran2.png', md + '/imglc_couverture_coran.png')
    print('gabarit :', X)

if __name__ == '__main__':
    main()
