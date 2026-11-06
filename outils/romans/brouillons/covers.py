# Couvertures des quatre romans (640 x 320), dessinées en SVG
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'couvertures') + '/'
os.makedirs(OUT, exist_ok=True)
SERIF = "font-family=\"Georgia, 'Times New Roman', serif\""
SANS = "font-family=\"'Atkinson Hyperlegible', Arial, sans-serif\""

def cover(name, bg1, bg2, num, title, fr, art, ink='#ffffff', accent='#f0b24a'):
    s = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320" role="img">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{bg1}"/><stop offset="1" stop-color="{bg2}"/></linearGradient></defs>
<rect width="640" height="320" rx="22" fill="url(#g)"/>
{art}
<text x="36" y="58" {SANS} font-size="15" font-weight="700" letter-spacing="3" fill="{accent}">LEGAL STORIES FROM ABIDJAN · {num}</text>
<text x="36" y="112" {SERIF} font-size="40" font-weight="700" fill="{ink}">{title}</text>
<text x="36" y="146" {SERIF} font-size="20" font-style="italic" fill="{ink}" opacity=".85">{fr}</text>
<rect x="36" y="166" width="64" height="4" rx="2" fill="{accent}"/>
</svg>'''
    open(OUT + name + '.svg', 'w').write(s)

# 1. Le testament : parchemin scellé, cabosses de cacao, collines de Bouaké
will_art = '''
<path d="M0 270 Q160 225 320 262 T640 248 V320 H0Z" fill="#0b3d24" opacity=".7"/>
<path d="M0 292 Q200 262 400 290 T640 284 V320 H0Z" fill="#082e1b"/>
<g transform="translate(440 70)">
 <rect x="0" y="0" width="150" height="190" rx="10" fill="#f6ecd2"/>
 <rect x="-12" y="-10" width="174" height="22" rx="11" fill="#e6d5ab"/>
 <rect x="-12" y="178" width="174" height="22" rx="11" fill="#e6d5ab"/>
 <g stroke="#b9a57a" stroke-width="4" stroke-linecap="round"><path d="M24 40H126M24 62H126M24 84H110M24 106H126M24 128H90"/></g>
 <path d="M30 156 q14 -16 26 0 t26 0" stroke="#3a3a6a" stroke-width="3" fill="none"/>
 <circle cx="118" cy="154" r="20" fill="#b5332b"/><circle cx="118" cy="154" r="12" fill="none" stroke="#e8857c" stroke-width="2"/>
 <path d="M108 172 l-6 26 l10 -6 l6 8 z M128 172 l6 26 l-10 -6 l-6 8z" fill="#b5332b"/>
</g>
<g transform="translate(372 196) rotate(-25)"><ellipse rx="22" ry="40" fill="#c98a1b"/><path d="M0 -40 V40 M-12 -34 Q-18 0 -12 34 M12 -34 Q18 0 12 34" stroke="#8a5a0a" stroke-width="2.5" fill="none"/></g>
<g transform="translate(606 230) rotate(20)"><ellipse rx="18" ry="34" fill="#d8a02a"/><path d="M0 -34 V34 M-10 -28 Q-15 0 -10 28 M10 -28 Q15 0 10 28" stroke="#8a5a0a" stroke-width="2.2" fill="none"/></g>
'''
cover('will', '#1f6b45', '#0e3f2a', 'I', 'The Missing Will', 'Le testament introuvable', will_art)

# 2. Le bail : porte fermée à clé, pluie, gouttes
lease_art = '''
<g stroke="#9fc3f0" stroke-width="2.5" stroke-linecap="round" opacity=".55">
''' + ''.join(f'<path d="M{x} {y} l-6 16"/>' for x, y in [(600,40),(612,120),(380,200),(600,200),(392,124),(612,262),(360,170)]) + '''
</g>
<g transform="translate(430 64)">
 <rect x="-14" y="-14" width="148" height="236" rx="6" fill="#0e2a52"/>
 <rect x="0" y="0" width="120" height="222" rx="4" fill="#c9773a"/>
 <rect x="14" y="16" width="92" height="80" rx="4" fill="none" stroke="#a65e28" stroke-width="5"/>
 <rect x="14" y="116" width="92" height="90" rx="4" fill="none" stroke="#a65e28" stroke-width="5"/>
 <circle cx="98" cy="110" r="7" fill="#f0c45a"/>
 <g transform="translate(96 132)"><rect x="-17" y="0" width="34" height="28" rx="5" fill="#f0b24a"/><path d="M-10 0 V-10 a10 10 0 0 1 20 0 V0" fill="none" stroke="#f0b24a" stroke-width="5"/><circle cx="0" cy="12" r="4" fill="#7a4b10"/></g>
 <rect x="20" y="-46" width="80" height="26" rx="4" fill="#ffffff"/><text x="60" y="-28" text-anchor="middle" font-family="Arial" font-size="13" font-weight="700" fill="#b5332b">LOCKED</text>
</g>
<g transform="translate(376 248)"><path d="M0 0 h44 v30 a6 6 0 0 1 -6 6 h-32 a6 6 0 0 1 -6 -6z" fill="#7d8da6"/><path d="M-4 0 h52" stroke="#5c6b82" stroke-width="5" stroke-linecap="round"/><path d="M14 -18 q6 10 0 14 q-6 -4 0 -14z" fill="#9fc3f0"/></g>
'''
cover('lease', '#2a5d9c', '#132f5a', 'II', 'The Locked Door', 'La porte fermée', lease_art)

# 3. La nuit au commissariat : lune, bâtiment, moto, veste rouge
night_art = '''
<circle cx="590" cy="60" r="30" fill="#f5e7b5"/><circle cx="602" cy="52" r="28" fill="#1a2350"/>
''' + ''.join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#ffffff" opacity=".8"/>' for x, y, r in [(350,40,1.6),(400,90,1.2),(470,30,1.8),(520,110,1.2),(380,150,1.4),(620,140,1.5)]) + '''
<g transform="translate(400 120)">
 <rect x="0" y="40" width="200" height="140" fill="#2d3a6e"/>
 <rect x="60" y="0" width="80" height="40" fill="#34437d"/>
 <rect x="50" y="56" width="100" height="24" rx="3" fill="#e9eefc"/><text x="100" y="73" text-anchor="middle" font-family="Arial" font-size="13" font-weight="700" fill="#1a2350">POLICE</text>
 <g fill="#f6d77a"><rect x="18" y="96" width="30" height="26" rx="2"/><rect x="152" y="96" width="30" height="26" rx="2"/><rect x="18" y="138" width="30" height="26" rx="2" opacity=".4"/></g>
 <rect x="80" y="110" width="40" height="70" fill="#151c40"/><rect x="96" y="-14" width="8" height="16" fill="#5aa0ff"/><circle cx="100" cy="-18" r="7" fill="#5aa0ff" opacity=".9"/>
</g>
<g transform="translate(330 262)">
 <circle cx="0" cy="20" r="20" fill="none" stroke="#e9eefc" stroke-width="6"/><circle cx="84" cy="20" r="20" fill="none" stroke="#e9eefc" stroke-width="6"/>
 <path d="M0 20 L30 -6 H60 L84 20 M30 -6 L22 -22 M52 -6 L60 -24 H74" stroke="#3f8fe0" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
 <rect x="34" y="-60" width="26" height="40" rx="9" fill="#d23b33"/><circle cx="47" cy="-72" r="11" fill="#6b4226"/>
</g>
'''
cover('night', '#27326e', '#10163a', 'III', 'A Night at the', 'Une nuit au commissariat', night_art)
# titre sur deux lignes pour ce roman
p = OUT + 'night.svg'; s = open(p).read()
s = s.replace('font-size="20" font-style="italic"', 'font-size="20" font-style="italic" dy="0"')
s = s.replace(f'<text x="36" y="112" {SERIF} font-size="40" font-weight="700" fill="#ffffff">A Night at the</text>',
              f'<text x="36" y="104" {SERIF} font-size="38" font-weight="700" fill="#ffffff">A Night at the</text><text x="36" y="148" {SERIF} font-size="38" font-weight="700" fill="#ffffff">Police Station</text>')
s = s.replace('y="146"', 'y="182"').replace('<rect x="36" y="166"', '<rect x="36" y="200"')
open(p, 'w').write(s)

# 4. Les uniformes : machine à coudre, uniformes sur cintres, eau
uni_art = '''
<path d="M0 286 q40 -12 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 V320 H0Z" fill="#5fa7d8" opacity=".75"/>
<path d="M0 300 q40 -10 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 V320 H0Z" fill="#3b86c0"/>
<path d="M440 40 H630" stroke="#5a3a14" stroke-width="5" stroke-linecap="round"/>
''' + ''.join(f'''<g transform="translate({x} 40)"><path d="M0 0 v10 M-20 22 L0 10 L20 22" stroke="#5a3a14" stroke-width="3" fill="none"/><path d="M-26 22 h52 l6 26 h-12 v62 h-40 v-62 h-12z" fill="{c}"/><path d="M-6 22 l6 16 l6 -16" fill="#ffffff" opacity=".9"/><circle cx="0" cy="56" r="2.5" fill="#ffffff"/><circle cx="0" cy="72" r="2.5" fill="#ffffff"/></g>''' for x, c in [(478, '#7a2e8e'), (540, '#7a2e8e'), (602, '#7a2e8e')]) + '''
<g transform="translate(420 190)">
 <rect x="0" y="62" width="170" height="16" rx="5" fill="#2b2b2b"/>
 <path d="M14 62 V22 a22 22 0 0 1 22 -22 H140 a20 20 0 0 1 20 20 V40 H120 V24 H44 V62z" fill="#e8e1d2"/>
 <rect x="128" y="40" width="22" height="22" fill="#e8e1d2"/><path d="M139 62 v10" stroke="#555" stroke-width="3"/>
 <circle cx="152" cy="22" r="9" fill="#b5332b"/><rect x="58" y="6" width="48" height="8" rx="4" fill="#c9c0ad"/>
 <path d="M0 78 h170" stroke="#7a2e8e" stroke-width="3"/>
</g>
'''
cover('uniforms', '#d18a1e', '#9c5a0c', 'IV', 'Two Hundred', 'Deux cents uniformes', uni_art, accent='#fff3d6')
p = OUT + 'uniforms.svg'; s = open(p).read()
s = s.replace(f'<text x="36" y="112" {SERIF} font-size="40" font-weight="700" fill="#ffffff">Two Hundred</text>',
              f'<text x="36" y="104" {SERIF} font-size="38" font-weight="700" fill="#ffffff">Two Hundred</text><text x="36" y="148" {SERIF} font-size="38" font-weight="700" fill="#ffffff">Uniforms</text>')
s = s.replace('y="146"', 'y="182"').replace('<rect x="36" y="166"', '<rect x="36" y="200"')
open(p, 'w').write(s)
print('ok')
