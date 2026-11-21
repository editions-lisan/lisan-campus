# Nettoyage des photos des pages du support : redressement, fond blanc uniforme, contraste, netteté.
# Le contenu n'est jamais retouché (ni texte, ni tableaux, ni images) : seules la géométrie et la lumière changent.
import cv2, numpy as np, sys, os, glob

def order(pts):
    s = pts.sum(1); d = np.diff(pts, axis=1).ravel()
    return np.array([pts[np.argmin(s)], pts[np.argmin(d)], pts[np.argmax(s)], pts[np.argmax(d)]], np.float32)

def find_page(img):
    """Contour de la feuille (quadrilatère clair) ; None si la photo est déjà cadrée sur la page."""
    h, w = img.shape[:2]; k = 1000 / max(h, w)
    sm = cv2.resize(img, None, fx=k, fy=k); g = cv2.cvtColor(sm, cv2.COLOR_BGR2GRAY)
    g = cv2.GaussianBlur(g, (5, 5), 0)
    _, th = cv2.threshold(g, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    th = cv2.morphologyEx(th, cv2.MORPH_CLOSE, np.ones((25, 25), np.uint8))
    cs, _ = cv2.findContours(th, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not cs: return None
    c = max(cs, key=cv2.contourArea); a = cv2.contourArea(c)
    if a < 0.55 * sm.shape[0] * sm.shape[1]: return None
    ap = cv2.approxPolyDP(c, 0.02 * cv2.arcLength(c, True), True)
    if len(ap) != 4: return None
    q = order(ap.reshape(4, 2).astype(np.float32)) / k
    # inutile si le quadrilatère touche presque les bords (photo déjà cadrée)
    m = np.array([[0, 0], [w, 0], [w, h], [0, h]], np.float32)
    if np.abs(q - m).max() < 0.012 * max(w, h): return None
    return q

def warp(img, q):
    (tl, tr, br, bl) = q
    W = int(max(np.linalg.norm(tr - tl), np.linalg.norm(br - bl))); H = int(max(np.linalg.norm(bl - tl), np.linalg.norm(br - tr)))
    M = cv2.getPerspectiveTransform(q, np.array([[0, 0], [W, 0], [W, H], [0, H]], np.float32))
    return cv2.warpPerspective(img, M, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)

def deskew(img):
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY); h, w = g.shape
    k = 1200 / w; s = cv2.resize(g, None, fx=k, fy=k)
    bw = cv2.adaptiveThreshold(s, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 31, 15)
    bw = cv2.morphologyEx(bw, cv2.MORPH_CLOSE, np.ones((1, 25), np.uint8))   # mots → lignes
    lines = cv2.HoughLinesP(bw, 1, np.pi / 1800, 120, minLineLength=s.shape[1] // 4, maxLineGap=20)
    if lines is None: return img, 0
    ang = [np.degrees(np.arctan2(y2 - y1, x2 - x1)) for x1, y1, x2, y2 in lines.reshape(-1, 4)]
    ang = [a for a in ang if abs(a) < 4]
    if len(ang) < 5: return img, 0
    a = float(np.median(ang))
    if abs(a) < 0.08: return img, 0
    M = cv2.getRotationMatrix2D((w / 2, h / 2), a, 1)
    c, s_ = abs(M[0, 0]), abs(M[0, 1]); nW, nH = int(h * s_ + w * c) + 2, int(h * c + w * s_) + 2   # cadre agrandi : rien n'est coupé
    M[0, 2] += nW / 2 - w / 2; M[1, 2] += nH / 2 - h / 2
    return cv2.warpAffine(img, M, (nW, nH), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT, borderValue=(255, 255, 255)), a

def flatten(img):
    """Fond de la feuille estimé seulement sur le papier (pixels clairs et peu colorés), par convolution normalisée :
    les grandes cases colorées et les photos ne sont pas prises pour du papier. Puis division : papier blanc, ombres effacées."""
    h, w = img.shape[:2]; f = 8
    sm = cv2.resize(img, (w // f, h // f), interpolation=cv2.INTER_AREA).astype(np.float32)
    hsv = cv2.cvtColor(sm.astype(np.uint8), cv2.COLOR_BGR2HSV).astype(np.float32)
    v, sat = hsv[..., 2], hsv[..., 1]
    paper = ((sat < 45) & (v > 0.62 * np.percentile(v, 99))).astype(np.float32)
    paper = cv2.erode(paper, np.ones((3, 3), np.uint8))          # écarte le bord des lettres et des cases
    sig = max(6, (w // f) / 22)
    num = cv2.GaussianBlur(sm * paper[..., None], (0, 0), sig); den = cv2.GaussianBlur(paper, (0, 0), sig)[..., None]
    bg = num / np.maximum(den, 1e-3)
    # là où il n'y a presque pas de papier, on élargit
    num2 = cv2.GaussianBlur(sm * paper[..., None], (0, 0), sig * 4); den2 = cv2.GaussianBlur(paper, (0, 0), sig * 4)[..., None]
    bg2 = num2 / np.maximum(den2, 1e-4)
    wgt = np.clip(den / 0.25, 0, 1); bg = bg * wgt + bg2 * (1 - wgt)
    bg = cv2.resize(bg, (w, h), interpolation=cv2.INTER_CUBIC)
    out = img.astype(np.float32) / np.maximum(bg, 1) * 255
    return np.clip(out, 0, 255)

def tone(x):
    """Papier blanc, encre foncée : le gamma est choisi pour chaque page selon la pâleur de l'encre
    (pages surexposées : les gris clairs redeviennent lisibles) ; les couleurs gardent leur teinte."""
    lo, hi = 20.0, 236.0
    y = np.clip((x - lo) / (hi - lo), 0, 1)
    lum = y.mean(2) * 255
    ink = lum[lum < 215]
    g = 1.15
    if ink.size > 1000:
        p = float(np.median(ink))
        if p > 62: g = min(3.0, max(1.15, np.log(62 / 255) / np.log(p / 255)))
    return y ** g * 255, g

def sharpen(img):
    b = cv2.GaussianBlur(img, (0, 0), 1.2)
    return cv2.addWeighted(img, 1.3, b, -0.3, 0)

def trim(img):
    """Enlève les bandes sombres des bords (table, ombre) : une colonne ou une ligne de bord est retirée
    tant qu'une part notable de ses pixels est sombre (au plus 6 % de chaque côté)."""
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY); h, w = g.shape; d = g < 120
    def edge(frac, n):
        k = 0
        while k < int(0.06 * n) and frac[k] > 0.12: k += 1
        return k + (6 if k else 0)
    cols, rows = d.mean(0), d.mean(1)
    l, r = edge(cols, w), edge(cols[::-1], w); t, b = edge(rows, h), edge(rows[::-1], h)
    out = img[t:h - b, l:w - r].copy()
    return out

def process(path, cover=False):
    img = cv2.imread(path)
    if cover:   # couverture illustrée : lumière et netteté seulement, couleurs d'origine
        x = img.astype(np.float32); lo, hi = np.percentile(x, 0.5), np.percentile(x, 99.5)
        x = np.clip((x - lo) / (hi - lo), 0, 1) * 255
        return sharpen(x.astype(np.uint8)), 'couverture'
    q = find_page(img); info = []
    if q is not None: img = warp(img, q); info.append('perspective')
    img, a = deskew(img)
    if a: info.append('rotation %.2f°' % a)
    x, g = tone(flatten(img)); x = x.astype(np.uint8); info.append('gamma %.2f' % g)
    x = trim(x)
    return sharpen(x), ', '.join(info) or '—'

if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]; only = sys.argv[3:]
    os.makedirs(dst, exist_ok=True)
    for i, p in enumerate(sorted(glob.glob(os.path.join(src, 'p-*.jpg')))):
        if only and str(i + 1) not in only: continue
        out, info = process(p, cover=(i == 0))
        # largeur 1700 px (≈ 200 points par pouce sur la page du support)
        k = 1700 / out.shape[1]; out = cv2.resize(out, None, fx=k, fy=k, interpolation=cv2.INTER_AREA)
        cv2.imwrite(os.path.join(dst, 'c-%03d.jpg' % (i + 1)), out, [cv2.IMWRITE_JPEG_QUALITY, 84])
        print(i + 1, out.shape[1], 'x', out.shape[0], info)
