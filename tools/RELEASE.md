# Pubblicare una nuova versione

1. Modifica il codice in `app/src/main/assets` e fai push su `main`.
   GitHub Actions offusca il JS, costruisce l'APK firmato e crea la release `v1.0.N`
   (N = numero della build = versionCode) con `TalabMawad-1.0.N.apk`, `web-app.js`, `web-catalog.js`.
2. Scarica i 3 file della release in una cartella `REL` come `app.apk`, `app.js`, `catalog.js`
   e scrivi le novità in `REL/notes_ar.txt` e `REL/notes_it.txt`.
3. `python3 tools/build_web.py <clone di lista-materiale-web> 1.0.N REL`
   (mantieni `html2canvas.min.js` nel repo web), poi commit e push del repo web.
4. Il nuovo version.json ha `"send": false`: nessuno vede ancora l'aggiornamento.
   Il proprietario lo invia quando vuole cambiando `false` in `true` su GitHub (version.json).
   Il campo `message` (id, ar, it, link) mostra un messaggio libero una volta a ogni utente; cambiare `id` per un nuovo messaggio.

5. Non cancellare mai l'APK indicato in `version.json` (`apk`): è quello che gli utenti scaricano. Si può cancellare solo un APK non più citato né in `apk` né in `next.apk`.

## Aggiornamento silenzioso (⚡, dalla 1.0.41)
Per piccoli cambi alla parte web (icone, testi, cataloghi, correzioni JS/CSS) senza nuovo APK:
1. Push su `main` → la release `v1.0.N` contiene anche `live.json` (firmato ECDSA con `signing/live_ec.pem`) e `live-bundle.zip`.
2. Nel repo web: estrarre `live-bundle.zip` in `live/N/` e mettere il contenuto di `live.json` in `version.json` → `liveNext`.
3. Il proprietario preme «⚡ إرسال التحديث الصامت» nell'admin (`liveNext` → `live`).
4. L'app (nativo ≥ `min`) scarica `live/N/*`, verifica firma e SHA-256, lo usa dal prossimo avvio; se non conferma `liveOk` entro 12 s torna alla versione interna.
Regole: non cancellare `live/<ver>` di `live` o `liveNext`. Se cambia il ponte Android (metodi `Bridge`), alzare `LIVE_MIN` nel workflow.



## Dominio siteneeds.net
- `lista-materiale-web` resta su github.io SENZA `CNAME`: le app leggono da lì version.json/live/packs (UPD_BASE).
  Un redirect 301 di GitHub non ha CORS e blocca gli aggiornamenti delle app: non rimettere mai `CNAME` lì.
- `siteneeds-site` (con `CNAME`) serve https://siteneeds.net: web app, SiteNeeds.apk, admin.
  Dopo ogni pubblicazione: `tools/sync_site.sh <lista-materiale-web> <siteneeds-site>` poi commit e push.
