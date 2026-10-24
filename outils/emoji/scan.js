// Lisân Campus · émoticônes en images. Dans ce dossier : npm pack @iconify-json/fluent-emoji-flat flag-icons,
// tar xzf iconify-json-fluent-emoji-flat-*.tgz ; mkdir fi && tar xzf flag-icons-*.tgz -C fi ; puis node scan.js && node build.js
// (les paquets téléchargés ne sont pas versionnés : voir .gitignore).
const fs=require('fs'),path=require('path');
const SITE=path.resolve(__dirname,'../../site');
const RE=/(?:\p{Regional_Indicator}{2}|\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})?(?:‍\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})?)*)/gu;
const files=['app.js','certificats.js','admin.js','inscription.js','auth.js','boot.js','index.html',...fs.readdirSync(SITE+'/data').map(f=>'data/'+f)];
const chars=JSON.parse(fs.readFileSync('package/chars.json'));const icons=JSON.parse(fs.readFileSync('package/icons.json'));
const hex=s=>[...s].map(c=>c.codePointAt(0).toString(16)).filter(h=>h!=='fe0f').join('-');
const seen=new Map();
for(const f of files){const s=fs.readFileSync(path.join(SITE,f),'utf8');for(const m of s.matchAll(RE)){seen.set(m[0],(seen.get(m[0])||0)+1);}}
const miss=[],ok=[];
for(const [e,n] of seen){const h=hex(e);let name=chars[h]||chars[h.split('-')[0]];(chars[h]?ok:miss).push([e,h,name,n]);}
console.log('total',seen.size,'ok',ok.length);console.log('missing exact',miss.map(x=>x.join(' ')).join('\n'));
fs.writeFileSync('used.json',JSON.stringify([...seen.keys()]));
