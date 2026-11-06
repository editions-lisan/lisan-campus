# Enregistrement des leçons (audio/)

Les leçons qui ont le bouton « Écouter la leçon » (espaces Droit, IA et Islam) et les dialogues de l'anglais juridique sont enregistrés en MP3 dans `site/audio/`, avec des voix de synthèse Piper (sherpa-onnx) : français `fr_FR-siwis-medium`, arabe `ar_JO-kareem-medium` (passages `[[...]]`), anglais `en_US-amy-medium` (voix de femme) et `en_US-joe-medium` (voix d'homme) pour les dialogues.

Ce sont de vrais fichiers audio : le téléphone continue de les lire dans une autre application ou écran éteint. `site/data/audio.js` donne, pour chaque fichier, l'empreinte `h` du texte enregistré, la durée `d` et le début `t` de chaque phrase (boutons phrase précédente / suivante). Quand une leçon change, son empreinte ne correspond plus : le site lit alors la leçon avec la voix du téléphone, jusqu'au prochain enregistrement.

Refaire les enregistrements :

1. `pip install sherpa-onnx==1.12.40 soundfile` (la version 2 n'a pas le module de prononciation espeak) ;
2. télécharger les voix `vits-piper-<voix>.tar.bz2` depuis les publications « tts-models » du dépôt k2-fsa/sherpa-onnx, et adapter le chemin `V` de `synth.py` ;
3. `node extract.js jobs.json` (le texte est tiré des fonctions mêmes du site : `lessonSpeech()`, `speechParts()`, prononciation des transcriptions) ;
4. `python3 synth.py 0 2` et `python3 synth.py 1 2` en parallèle, puis fusionner `man0.json` et `man1.json` dans `site/data/audio.js` ;
5. changer `VERSION` dans `site/sw.js`.

Les mots des cartes de révision en anglais (anglais juridique et roman) sont aussi enregistrés, un fichier par mot (`audio/cartes/<empreinte>.mp3`, voix `en_US-joe-medium`) ; ils sont joués sans le lecteur du bas. Pour ne refaire que ceux-là : `node extract.js jobs.json cartes`, puis les étapes 4 et 5.
