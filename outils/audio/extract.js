// Extrait, avec les fonctions mêmes du site, le texte de chaque leçon à enregistrer (morceaux français / arabe)
const fs=require('fs');global.window=global;global.document={};
const D='/home/claude/lisan-campus/site/';
let src='';for(const f of ['data/droit.js','data/romans.js','data/ia.js','data/arabe.js','data/coran.js','data/islam.js']) src+=fs.readFileSync(D+f,'utf8')+'\n';
src+=fs.readFileSync(D+'boot.js','utf8').split('\n').filter(l=>l.startsWith('const SUBJECTS'))[0]+'\nglobal.SUBJECTS=SUBJECTS;';
eval(src);
const app=fs.readFileSync(D+'app.js','utf8');
const a=app.indexOf('const ARV ='), b=app.indexOf('function speak(');
const ls=app.match(/const lessonSpeech = .*\n/)[0];
eval('var voices={ar:true,fr:true,en:true};\n'+app.slice(a,app.indexOf('// ---------- écoute : vitesses'))+'\n'+ls+'\nglobal.speechParts=speechParts;global.lessonSpeech=lessonSpeech;');
const hash=t=>{let h=5381;for(let i=0;i<t.length;i++)h=((h*33)^t.charCodeAt(i))>>>0;return h.toString(36);};
const chunks=(text,lang)=>{const out=[];speechParts(text,lang).forEach(p=>(p.text.match(/(?:[^.!?;:؟،]|\.(?=\d))+[.!?;:؟،]*/g)||[p.text]).forEach(c=>{if(/[\p{L}\p{N}]/u.test(c))out.push({lang:p.lang,text:c.trim()})}));return out;};
const jobs=[];
for(const s of SUBJECTS){ if(s.noLessonVoice||s.id==='en') continue;
  for(const l of s.lessons){ const text=lessonSpeech(l); jobs.push({key:s.id+'/'+l.id,h:hash(text),chunks:chunks(text,'fr')}); } }
// dialogues de l'anglais juridique : une voix par personnage
const FEM=/^(Awa|Mrs\.|Ma[iî]tre Bamba|Salimata|Mrs |Mme)/;
for(const l of SUBJECTS.find(x=>x.id==='en').lessons) l.body.forEach((bl,i)=>{ if(!bl.endialog) return; const L=bl.endialog.lines; const all=L.map(x=>x[2]).join(' ');
  jobs.push({key:'en/'+l.id+'#'+i,h:hash(all),dialog:true,chunks:L.map(x=>({lang:FEM.test(x[0])?'enf':'enm',text:x[2]}))}); });
// romans juridiques en anglais : le chapitre entier (narrateur + voix des personnages) et chaque dialogue
const LITF=/^(Akissi|Mariam|The victim|Awa|Apprentice|Judge$)/, voice=w=>w==='Aïcha'?'enf':LITF.test(w)?'enl':'enm';
const sent=t=>{const u=t.replace(/\b(Mr|Mrs|Dr)\./g,'$1§');return (u.match(/[^.!?]+[.!?]+["”]?|[^.!?]+$/g)||[u]).map(x=>x.trim().replace(/§/g,'.')).filter(Boolean);};
const lit=SUBJECTS.find(x=>x.id==='lit');
if(lit) for(const l of lit.lessons){ const B=l.body, li=B.findIndex(b=>b.listen);
  if(li>=0){ const ch=[]; B.forEach(b=>{ if(b.enstory) b.enstory.forEach(p=>{sent(p[0]).forEach(x=>ch.push({lang:'enn',text:x}));ch[ch.length-1].gap=0.8;}); if(b.endialog) b.endialog.lines.forEach(x=>ch.push({lang:voice(x[0]),text:x[2]})); });
    jobs.push({key:'lit/'+l.id+'#c',h:hash(B[li].listen),chunks:ch}); }
  B.forEach((b,i)=>{ if(!b.endialog) return; const L=b.endialog.lines; jobs.push({key:'lit/'+l.id+'#'+i,h:hash(L.map(x=>x[2]).join(' ')),dialog:true,chunks:L.map(x=>({lang:voice(x[0]),text:x[2]}))}); }); }
fs.writeFileSync(process.argv[2],JSON.stringify(jobs));
console.log(jobs.length,'fichiers', jobs.reduce((n,j)=>n+j.chunks.length,0),'morceaux', jobs.filter(j=>j.chunks.some(c=>c.lang==='ar')).length,'avec arabe');
