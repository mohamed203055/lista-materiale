"""Genera la versione web (iPad/iPhone) nella cartella indicata.
Uso: python3 tools/build_web.py <cartella-repo-web> <versione> [cartella-release]
La cartella-release contiene app.js, catalog.js offuscati, app.apk e (facoltativo) notes_ar.txt / notes_it.txt."""
import sys, os, shutil, re
from PIL import Image, ImageDraw

src = os.path.join(os.path.dirname(__file__), '..', 'app', 'src', 'main', 'assets')
dst, ver = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
for f in ('catalog.js', 'app.js'):
    shutil.copy(os.path.join(src, f), os.path.join(dst, f))
# file JS già offuscati (dalla release) se indicati come 3° argomento
if len(sys.argv) > 3:
    for f in ('catalog.js', 'app.js'):
        shutil.copy(os.path.join(sys.argv[3], f), os.path.join(dst, f))

html = open(os.path.join(src, 'index.html')).read()
head = '''<meta name="theme-color" content="#1F4FD8">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="طلب مواد">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" href="icon-192.png">
'''
html = html.replace('<title>', head + '<title>', 1)
html = html.replace('<script src="catalog.js"></script>', '<script>window.LM_WEB_VERSION="web-%s";window.LM_RELEASE=1</script>\n<script src="catalog.js"></script>' % ver)
html = html.replace('<script src="app.js"></script>', '''<script src="app.js"></script>
<script>if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(function(){})}</script>''')
open(os.path.join(dst, 'index.html'), 'w').write(html)

open(os.path.join(dst, 'manifest.webmanifest'), 'w').write('''{
  "name": "طلب مواد – Richiesta materiale",
  "short_name": "طلب مواد",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#F3F4F8",
  "theme_color": "#1F4FD8",
  "icons": [
    {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable"}
  ]
}
''')
files = ['./', 'index.html', 'catalog.js', 'app.js', 'html2canvas.min.js', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png']
open(os.path.join(dst, 'sw.js'), 'w').write('''// Funziona anche senza internet: i file restano in cache, e si aggiornano in background
var CACHE='lm-%s';
var FILES=%s;
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin||/version\\.json|\\.apk$/.test(u.pathname))return;
  e.respondWith(caches.open(CACHE).then(function(c){return c.match(e.request,{ignoreSearch:true}).then(function(hit){
    var net=fetch(e.request).then(function(r){if(r&&r.ok)c.put(e.request,r.clone());return r}).catch(function(){return hit});
    return hit||net;
  })}));
});
''' % (ver, str(files).replace("'", '"')))
open(os.path.join(dst, '.nojekyll'), 'w').write('')
shutil.copy(os.path.join(os.path.dirname(__file__), 'admin.html'), os.path.join(dst, 'admin.html'))

# icona (stessa dell'app Android)
def icon(size):
    S = 1024
    im = Image.new('RGB', (S, S), '#1F4FD8'); d = ImageDraw.Draw(im)
    k = S / 108.0
    def R(x0, y0, x1, y1, c, r=0): d.rounded_rectangle([x0*k, y0*k, x1*k, y1*k], radius=r*k, fill=c)
    R(32, 30, 76, 80, '#FFFFFF', 4)
    R(40, 42, 60, 46, '#C9D5FA'); R(40, 52, 60, 56, '#C9D5FA'); R(40, 62, 54, 66, '#C9D5FA')
    R(63, 41, 68, 46, '#1F4FD8'); R(63, 51, 68, 56, '#1F4FD8')
    d.polygon([(x*k, y*k) for x, y in [(70,56),(60,71),(67,71),(64,82),(75,66),(68,66),(72,56)]], fill='#FF8A00')
    return im.resize((size, size), Image.LANCZOS)
for s in (180, 192, 512):
    icon(s).save(os.path.join(dst, 'icon-%d.png' % s))
# aggiornamenti: APK pubblico + version.json
if len(sys.argv) > 3:
    import json
    rel = sys.argv[3]
    if os.path.exists(os.path.join(rel, 'app.apk')):
        shutil.copy(os.path.join(rel, 'app.apk'), os.path.join(dst, 'TalabMawad.apk'))
    def rd(n):
        f = os.path.join(rel, n)
        return open(f).read().strip() if os.path.exists(f) else ''
    # l'APK resta anche con il nome di versione: version.json punta a quello
    if os.path.exists(os.path.join(rel, 'app.apk')):
        shutil.copy(os.path.join(rel, 'app.apk'), os.path.join(dst, 'TalabMawad-%s.apk' % ver))
    vj = os.path.join(dst, 'version.json')
    old = {}
    try: old = json.load(open(vj))
    except Exception: pass
    data = {
        'send': False,
        'versionCode': int(ver.split('.')[-1]), 'versionName': ver, 'apk': 'TalabMawad-%s.apk' % ver,
        'notes_ar': rd('notes_ar.txt'), 'notes_it': rd('notes_it.txt'),
        'message': old.get('message') or {'id': '', 'ar': '', 'it': '', 'link': ''},
    }
    json.dump(data, open(vj, 'w'), ensure_ascii=False, indent=1)
print('ok', dst, ver)
