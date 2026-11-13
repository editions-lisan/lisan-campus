// Met à jour, dans site/data/livres.js, la ligne de chaque document de DOCS : pages, taille (Mo) et
// empreinte v (8 caractères du MD5 du fichier). Le site ajoute « ?v=<empreinte> » aux liens « Lire »
// et « Télécharger » : un document refait change d'adresse, et le téléphone ne ressert pas l'ancienne copie.
// Usage : node outils/cours/versions.js   (à relancer après chaque build_cours.js ou nouveau PDF dans livres/)
const fs = require('fs'), path = require('path'), crypto = require('crypto'), { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..', '..', 'site');
const P = path.join(ROOT, 'data', 'livres.js');
let s = fs.readFileSync(P, 'utf8');
const i = s.indexOf('window.DOCS');
let head = s.slice(0, i), docs = s.slice(i), n = 0;
docs = docs.replace(/^( \{ space: .*?file: "([^"]+)")(?:, v: "[0-9a-f]+")?(, pages: )\d+(, mb: )[\d.]+( \},?)$/gm, (m, a, file, p, mb, end) => {
  const f = path.join(ROOT, 'livres', file);
  if (!fs.existsSync(f)) { console.warn('absent :', file); return m; }
  const buf = fs.readFileSync(f);
  const v = crypto.createHash('md5').update(buf).digest('hex').slice(0, 8);
  const pages = execFileSync('qpdf', ['--show-npages', f]).toString().trim();
  const size = Math.max(0.1, Math.round(buf.length / 1048576 * 10) / 10);
  n++; console.log(file, pages + ' p.', size + ' Mo', v);
  return `${a}, v: "${v}"${p}${pages}${mb}${size}${end}`;
});
fs.writeFileSync(P, head + docs);
console.log(n, 'documents');
