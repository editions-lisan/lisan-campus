# Enregistre chaque leçon en MP3 avec des voix de synthèse (piper via sherpa-onnx) et note le début de chaque phrase
import sherpa_onnx, numpy as np, json, os, sys, subprocess, tempfile, soundfile as sf
V='/tmp/claude-0/-home-claude/0f3cb0cd-0cf9-5b06-8a83-3e028970dea5/scratchpad/voices/'
OUT='/home/claude/lisan-campus/site/audio/'
W='/tmp/claude-0/-home-claude/0f3cb0cd-0cf9-5b06-8a83-3e028970dea5/scratchpad/ttswork/'
part, nparts = int(sys.argv[1]), int(sys.argv[2])
def load(name, model):
    d=V+name+'/'
    return sherpa_onnx.OfflineTts(sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(vits=sherpa_onnx.OfflineTtsVitsModelConfig(model=d+model, tokens=d+'tokens.txt', data_dir=d+'espeak-ng-data'), num_threads=1)))
VO={'fr':(load('vits-piper-fr_FR-siwis-medium','fr_FR-siwis-medium.onnx'),1.0),
    'ar':(load('vits-piper-ar_JO-kareem-medium','ar_JO-kareem-medium.onnx'),0.85),
    'enf':(load('vits-piper-en_US-amy-medium','en_US-amy-medium.onnx'),0.95),
    'enm':(load('vits-piper-en_US-joe-medium','en_US-joe-medium.onnx'),0.95)}
SR=22050
def rs(x, sr):
    if sr==SR: return x
    n=int(len(x)*SR/sr); return np.interp(np.linspace(0,len(x)-1,n), np.arange(len(x)), x).astype(np.float32)
jobs=json.load(open(W+'jobs.json'))
man={}
for k,j in enumerate(jobs):
    if k % nparts != part: continue
    sid,rest=j['key'].split('/',1); name=rest.replace('#','-d')
    os.makedirs(OUT+sid, exist_ok=True); f=f'audio/{sid}/{name}.mp3'
    pieces=[]; marks=[]; t=0.0
    for c in j['chunks']:
        tts,speed=VO[c['lang']]
        a=tts.generate(c['text'], sid=0, speed=speed); x=rs(np.array(a.samples,dtype=np.float32), a.sample_rate)
        if len(x)==0: continue
        marks.append(round(t,2)); pieces.append(x); t+=len(x)/SR
        gap=0.55 if j.get('dialog') else (0.45 if c['text'].endswith(':') or len(c['text'])<40 else 0.3)
        pieces.append(np.zeros(int(gap*SR),dtype=np.float32)); t+=gap
    wav=np.concatenate(pieces); tmp=W+f'tmp{part}.wav'; sf.write(tmp, wav, SR)
    subprocess.run(['ffmpeg','-v','error','-y','-i',tmp,'-af','loudnorm=I=-16:TP=-1.5:LRA=11','-ac','1','-ar','22050','-b:a','32k',OUT+f[6:]],check=True)
    man[j['key']]={'f':f,'h':j['h'],'d':round(t,1),'t':marks}
    print(k, j['key'], round(t), 's', flush=True)
json.dump(man, open(W+f'man{part}.json','w'), ensure_ascii=False)
print('FIN', part)
