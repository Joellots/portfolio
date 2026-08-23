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

BG='#0B0C0E'
INK='#E9E9E6'
MUTED='#9BA1A9'
ACCENT='#FF7A5C'
RULE='#24272C'

# Portrait panel: 420x630 crop of the hero portrait, dimmed toward the seam.
convert src/assets/images/joel-portrait.jpg \
  -resize 420x630^ -gravity north -extent 420x630 \
  -modulate 96,92,100 "$TMP/portrait.png"

# Soft seam so the photo edge does not read as a hard paste.
convert -size 630x230 gradient:"$BG"-none -rotate 90 "$TMP/seam.png"

convert -size 1200x630 "xc:$BG" \
  \( "$TMP/portrait.png" \) -gravity east -composite \
  \( "$TMP/seam.png" \) -gravity northwest -geometry +780+0 -composite \
  -gravity northwest \
  -fill "$RULE" -draw "rectangle 779,0 780,630" \
  -fill "$ACCENT" -draw "rectangle 0,0 1200,5" \
  \
  -font "$TMP/mono-500.ttf" -pointsize 22 -fill "$ACCENT" \
  -annotate +80+150 'SECURITY ENGINEER AND RESEARCHER' \
  \
  -font "$TMP/sans-500.ttf" -pointsize 76 -fill "$INK" \
  -annotate +78+228 'Okore Joel Chidike' \
  \
  -fill "$RULE" -draw "rectangle 80,348 700,349" \
  \
  -font "$TMP/sans-400.ttf" -pointsize 30 -fill "$MUTED" \
  -annotate +80+392 'Encrypted-traffic analysis, explainable' \
  -annotate +80+434 'detection, and graph-based methods' \
  -annotate +80+476 'for security.' \
  \
  -font "$TMP/mono-500.ttf" -pointsize 19 -fill "#757B83" \
  -annotate +80+540 'MSc SECURITY & NETWORK ENGINEERING' \
  -annotate +80+570 'MSc ADVANCED COMBINATORICS (IN PROGRESS)' \
  \
  -strip -interlace Plane -sampling-factor 4:2:0 -quality 86 public/og/joel-okore-og.jpg

echo "wrote public/og/joel-okore-og.jpg ($(du -h public/og/joel-okore-og.jpg | cut -f1))"
