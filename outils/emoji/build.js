// Construit site/emoji/*.svg (émoticônes utilisées par le site) et site/emoji.js
const fs=require('fs'),path=require('path');
const SITE=path.resolve(__dirname,'../../site'), OUT=SITE+'/emoji';
const icons=JSON.parse(fs.readFileSync('package/icons.json')), chars=JSON.parse(fs.readFileSync('package/chars.json'));
const used=JSON.parse(fs.readFileSync('used.json'));
const SKIP=new Set(['a9','2630','2197','2b07']);           // ©, ☰, ↗, ⬇ : signes typographiques du site, laissés en texte
const SUB={'1f46a':'1fac2'};          // famille → personnes qui s’enlacent (absent du jeu Fluent)
const hex=s=>[...s].map(c=>c.codePointAt(0).toString(16)).filter(h=>h!=='fe0f').join('-');
fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT);
const have=[];let bytes=0;
const svgOf=name=>{let n=name;const al=icons.aliases||{};while(!icons.icons[n]&&al[n])n=al[n].parent;const ic=icons.icons[n];if(!ic)return null;
  const w=ic.width||icons.width||32,h=ic.height||icons.height||32;return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ic.left||0} ${ic.top||0} ${w} ${h}">${ic.body}</svg>`;};
for(const e of used){const h=hex(e);if(SKIP.has(h))continue;let svg=null;
  const cps=[...e].map(c=>c.codePointAt(0));
  if(cps.length===2&&cps.every(c=>c>=0x1f1e6&&c<=0x1f1ff)){const cc=cps.map(c=>String.fromCharCode(c-0x1f1e6+97)).join('');const f=`fi/package/flags/4x3/${cc}.svg`;if(fs.existsSync(f))svg=fs.readFileSync(f,'utf8');}
  else{const name=chars[SUB[h]||h];if(name)svg=svgOf(name);}
  if(!svg){console.log('manque',e,h);continue;}
  fs.writeFileSync(`${OUT}/${h}.svg`,svg);bytes+=svg.length;have.push(h);}
console.log(have.length,'fichiers',Math.round(bytes/1024),'Ko');
fs.writeFileSync('have.json',JSON.stringify(have));

const ej=SITE+'/emoji.js';fs.writeFileSync(ej,fs.readFileSync(ej,'utf8').replace(/const HAVE = new Set\(\[[^\]]*\]\);/,'const HAVE = new Set('+JSON.stringify(have.sort())+');'));
