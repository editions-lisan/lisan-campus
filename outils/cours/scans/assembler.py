# Pages nettoyées → pages de même format que le support (546 × 792 pt), couche de texte (OCR) pour la recherche, coordonnées masquées sur la couverture.
import glob, os, subprocess, numpy as np
from PIL import Image
W = 1360; H = round(W * 792 / 546); DPI = W / (546 / 72)
os.makedirs('pages', exist_ok=True); parts = []
for f in sorted(glob.glob('clean/c-*.jpg')):
    n = os.path.basename(f)[2:5]; im = Image.open(f).convert('RGB')
    k = min(W / im.width, H / im.height); im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    bg = (255, 255, 255)
    if n == '001':   # couverture : même cadre, fond d'origine autour
        c = im.resize((W, H), Image.LANCZOS)
        a = np.array(c); s = W / 546
        y0, y1, x0, x1 = int(742.3 * s), int(764 * s) + 2, int(200 * s), W
        ref = a[y0 - 40:y0 - 25, x0:x0 + 300].reshape(-1, 3).mean(0)   # teinte du fond juste au-dessus
        a[y0:y1, x0:x1] = ref.astype(np.uint8); c = Image.fromarray(a)
    else:
        c = Image.new('RGB', (W, H), bg); c.paste(im, ((W - im.width) // 2, (H - im.height) // 2))
    p = 'pages/' + n + '.jpg'; c.save(p, quality=64, dpi=(DPI, DPI), optimize=True, subsampling=2)
    out = 'pages/' + n
    subprocess.run(['tesseract', p, out, '-l', 'fra', '--dpi', str(round(DPI)), 'pdf'], check=True, capture_output=True)
    parts.append(out + '.pdf')
subprocess.run(['qpdf', '--empty', '--pages', *parts, '--', 'propre.pdf'], check=True)
print('propre.pdf', len(parts), 'pages', os.path.getsize('propre.pdf') // 1024, 'Ko')
