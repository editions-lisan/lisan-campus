#!/bin/sh
# Versions du site à partir de la vidéo maîtresse (sans son) et de la bande-son :
#   sh encode.sh <maitresse.mp4> <son.wav> <nom> <largeur> <hauteur> [<largeur réduite> <hauteur réduite>]
# Produit site/media/<nom>-<hauteur ou largeur>.mp4 et .webm (et la version réduite si demandée).
# Exemples : sh encode.sh campus-master.mp4 campus.wav campus 1280 720 854 480   (présentation : campus-720, campus-480)
#            sh encode.sh guide-master.mp4 guide.wav guide 720 1280                (mode d'emploi : guide-720)
set -e
M=$1; A=$2; N=$3; OUT=$(dirname "$0")/../../site/media
enc() { # $1 largeur $2 hauteur $3 suffixe $4 crf h264 $5 crf vp9 $6 débit audio
  ffmpeg -y -v error -i "$M" -i "$A" -map 0:v -map 1:a -vf "scale=$1:$2:flags=lanczos" -c:v libx264 -preset slow -crf $4 -pix_fmt yuv420p \
    -c:a aac -b:a $6 -shortest -movflags +faststart "$OUT/$N-$3.mp4"
  ffmpeg -y -v error -i "$M" -i "$A" -map 0:v -map 1:a -vf "scale=$1:$2:flags=lanczos" -c:v libvpx-vp9 -crf $5 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
    -c:a libopus -b:a $6 -shortest "$OUT/$N-$3.webm"
}
if [ "$4" -gt "$5" ]; then S1=$5; else S1=$4; fi
enc $4 $5 $S1 26 36 96k
if [ -n "$6" ]; then if [ "$6" -gt "$7" ]; then S2=$7; else S2=$6; fi; enc $6 $7 $S2 30 41 64k; fi
ls -la "$OUT"/$N-*
