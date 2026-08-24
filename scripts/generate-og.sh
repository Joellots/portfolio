#!/usr/bin/env bash
# Regenerate public/og/joel-okore-og.jpg (1200x630 Open Graph card).
#
# Requires: ImageMagick (`convert`) and python3 + fonttools (to turn the
# vendored woff2 subsets into TTFs that ImageMagick can render).
#
#   sudo apt install imagemagick && pip install fonttools brotli
#   ./scripts/generate-og.sh
#
# The generated JPEG is committed, so this only needs re-running when the name,
# strapline or portrait changes.
set -euo pipefail
cd "$(dirname "$0")/.."

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

python3 - "$TMP" <<'PY'
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

out = sys.argv[1]
TTFont('src/assets/fonts/ibm-plex-mono-latin-500-normal.woff2').save(f'{out}/mono-500.ttf')
for weight in (400, 500):
    font = TTFont('src/assets/fonts/ibm-plex-sans-latin-wght-normal.woff2')
    instancer.instantiateVariableFont(font, {'wght': weight}).save(f'{out}/sans-{weight}.ttf')
PY

BG='#1B1C1F'
INK='#E8E7E4'
MUTED='#A8A9AC'
ACCENT='#F0876A'
RULE='#2E3033'

# Portrait panel: 420x630 crop of the hero portrait, dimmed toward the seam.
convert src/assets/images/joel-portrait.jpg \
  -resize x630 -gravity center -extent 420x630 \
  "$TMP/portrait.png"

convert -size 1200x630 "xc:$BG" \
  \( "$TMP/portrait.png" \) -gravity east -composite \
  -gravity northwest \
  -fill "$RULE" -draw "rectangle 779,0 780,630" \
  -fill "$ACCENT" -draw "rectangle 0,0 1200,5" \
  \
  -font "$TMP/mono-500.ttf" -pointsize 22 -fill "$ACCENT" \
  -annotate +80+150 'SECURITY ENGINEER & RESEARCHER' \
  \
  -font "$TMP/sans-500.ttf" -pointsize 76 -fill "$INK" \
  -annotate +78+228 'Okore Joel Chidike' \
  \
  -fill "$RULE" -draw "rectangle 80,348 700,349" \
  \
  -font "$TMP/sans-400.ttf" -pointsize 30 -fill "$MUTED" \
  -annotate +80+392 'Security systems that use machine' \
  -annotate +80+434 'learning, and the work of making' \
  -annotate +80+476 'their decisions checkable.' \
  \
  -strip -interlace Plane -sampling-factor 4:2:0 -quality 86 public/og/joel-okore-og.jpg

echo "wrote public/og/joel-okore-og.jpg ($(du -h public/og/joel-okore-og.jpg | cut -f1))"
