from PIL import Image, ImageDraw, ImageFont
import numpy as np
import os
S = os.environ.get('LC2_BASE', '/tmp/lc2-travail')
im=Image.open(S+'/lc1/x/word/media/imglc_couverture_coran.png').convert('RGB')
a=np.asarray(im).copy()
W=a.shape[1]
def clean(y0,y1,ranges):
    cols={}
    for x0,x1 in ranges:
        for x in range(x0,x1): cols.setdefault(x%300,x)
    assert len(cols)==300, len(cols)
    for x in range(W):
        a[y0:y1,x]=a[y0:y1,cols[x%300]]
clean(1165,1300,[(0,215),(2265,W)])
clean(3245,3410,[(0,690),(1790,W)])
im=Image.fromarray(a); d=ImageDraw.Draw(im)
FR='/root/.fonts/lisan/Fredoka_Bold_Regular.ttf'; NX='/root/.fonts/lisan/Nunito_ExtraBold_Regular.ttf'
def ctext(cx,cy,t,font,fill):
    b=d.textbbox((0,0),t,font=font); w=b[2]-b[0]; h=b[3]-b[1]
    d.text((cx-w/2-b[0],cy-h/2-b[1]),t,font=font,fill=fill)
# badge
g=tuple(a[240,1560]); print('gold',g, tuple(a[3000,450]))
d.rectangle([1590,200,2265,282],fill=g)
ctext(1924,241,'MÉTHODE DE TAJWÎD',ImageFont.truetype(NX,60),(14,59,46))
# subtitle
ctext(W/2,1232,'Niveau 2 • Je récite le Coran avec le tajwîd',ImageFont.truetype(NX,84),(255,255,255))
# number badge
cx,cy,r=1745,1068,92
d.ellipse([cx-r,cy-r,cx+r,cy+r],fill=g,outline=(255,255,255),width=10)
ctext(cx,cy-4,'2',ImageFont.truetype(FR,150),(14,59,46))
# white pill
wp=tuple(a[3000,520]); d.rectangle([420,2950,2060,3045],fill=wp)
ctext(W/2,2997,'10 étapes  •  40 leçons  •  exercices, jeux et corrigés',ImageFont.truetype(FR,64),(14,59,46))
ctext(W/2,3322,'Éditions Lisân',ImageFont.truetype(FR,100),(255,255,255))
im.save(S+'/lc2/assets/couverture_coran2.png')
im.resize((620,877)).save(S+'/lc2/cov2_small.png')
