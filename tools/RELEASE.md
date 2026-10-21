# Pubblicare una nuova versione

1. Modifica il codice in `app/src/main/assets` e fai push su `main`.
   GitHub Actions offusca il JS, costruisce l'APK firmato e crea la release `v1.0.N`
   (N = numero della build = versionCode) con `TalabMawad-1.0.N.apk`, `web-app.js`, `web-catalog.js`.
2. Scarica i 3 file della release in una cartella `REL` come `app.apk`, `app.js`, `catalog.js`
   e scrivi le novità in `REL/notes_ar.txt` e `REL/notes_it.txt`.
3. `python3 tools/build_web.py <clone di lista-materiale-web> 1.0.N REL`
   (mantieni `html2canvas.min.js` nel repo web), poi commit e push del repo web.
4. Da quel momento le app installate (Android e iPad) vedono il messaggio di aggiornamento,
   perché leggono `https://mohamed203055.github.io/lista-materiale-web/version.json`.
