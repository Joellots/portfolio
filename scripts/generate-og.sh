#!/usr/bin/env bash
# Regenerate public/og/joel-okore-og.jpg (1200x630 Open Graph card).
#
# The card is rendered from scripts/og/template.html by headless Chrome, so it
# uses the same typeface, palette and portrait shape as the site rather than a
# separate approximation. Edit the template, not this script, to change design.
#
# Requires: google-chrome (or chromium), ImageMagick, python3 + fonttools.
#   ./scripts/generate-og.sh
#
# The generated JPEG is committed; re-run it when the name, role, tagline,
# portrait or typeface changes.
set -euo pipefail
cd "$(dirname "$0")/.."

ROLE='Security Engineer &amp; Researcher'
NAME='Joel Okore'
TAGLINE='Exploring how graph-based methods, trustworthy AI, and secure systems can solve real-world security problems.'

BG='#FCFBFA'; INK='#1A1B1D'; MUTED='#5C5F64'
ACCENT='#B0402A'; RULE='#E6E3DF'; BLOB='#E3B5A8'

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Portrait: same 4:5 source the hero uses, sized for the card.
convert src/assets/images/joel-portrait.jpg -resize 700x -quality 88 "$TMP/p.jpg"

ROLE="$ROLE" NAME="$NAME" TAGLINE="$TAGLINE" \
BG="$BG" INK="$INK" MUTED="$MUTED" ACCENT="$ACCENT" RULE="$RULE" BLOB="$BLOB" \
TMP="$TMP" python3 - <<'PY'
import base64, os, pathlib
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

tmp = os.environ['TMP']

# Chrome cannot apply a variable-font weight axis from a data: URL reliably,
# so pin the two instances the card uses and inline those.
def instance(src, weight, out):
    f = TTFont(src)
    instancer.instantiateVariableFont(f, {'wght': weight}).save(out)
    return base64.b64encode(pathlib.Path(out).read_bytes()).decode()

sans = instance('src/assets/fonts/geist-latin-wght-normal.woff2', 600, f'{tmp}/sans.woff2')
mono = instance('src/assets/fonts/geist-mono-latin-wght-normal.woff2', 500, f'{tmp}/mono.woff2')
portrait = base64.b64encode(pathlib.Path(f'{tmp}/p.jpg').read_bytes()).decode()

html = pathlib.Path('scripts/og/template.html').read_text()
for key, value in {
    'SANS': sans, 'MONO': mono, 'PORTRAIT': portrait,
    'ROLE': os.environ['ROLE'], 'NAME': os.environ['NAME'],
    'TAGLINE': os.environ['TAGLINE'],
    'BG': os.environ['BG'], 'INK': os.environ['INK'], 'MUTED': os.environ['MUTED'],
    'ACCENT': os.environ['ACCENT'], 'RULE': os.environ['RULE'], 'BLOB': os.environ['BLOB'],
}.items():
    html = html.replace(f'__{key}__', value)
pathlib.Path(f'{tmp}/card.html').write_text(html)
PY

CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser)"
"$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=5000 \
  --screenshot="$TMP/card.png" "file://$TMP/card.html" >/dev/null 2>&1

convert "$TMP/card.png" -strip -interlace Plane -sampling-factor 4:2:0 \
  -quality 88 public/og/joel-okore-og.jpg

echo "wrote public/og/joel-okore-og.jpg ($(du -h public/og/joel-okore-og.jpg | cut -f1))"
