#!/bin/sh
# Copia la web app da lista-materiale-web al repo siteneeds-site (servito su https://siteneeds.net).
# Uso: tools/sync_site.sh <clone lista-materiale-web> <clone siteneeds-site>
set -e
W="$1"; D="$2"
for f in index.html app.js catalog.js packs.js lang.js trades.js sw.js html2canvas.min.js manifest.webmanifest \
  icon-180.png icon-192.png icon-512.png admin.html admin.webmanifest admin-icon-180.png admin-icon-192.png admin-icon-512.png \
  SiteNeeds.apk version.json people.json; do cp "$W/$f" "$D/"; done
rm -rf "$D/packs" && cp -r "$W/packs" "$D/"
rm -rf "$D/img" && cp -r "$W/img" "$D/"
rm -rf "$D/ic" "$D/brand" && cp -r "$W/ic" "$W/brand" "$D/"
V=$(python3 -c "import json;print(json.load(open('$W/version.json'))['live']['ver'])")
rm -rf "$D/live" && mkdir -p "$D/live" && cp -r "$W/live/$V" "$D/live/"
echo siteneeds.net > "$D/CNAME"
