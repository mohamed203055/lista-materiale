/**
 * Richiesta materiale – registro utenti (Google Apps Script)
 * 1) Foglio Google nuovo → Estensioni → Apps Script → incolla tutto questo codice → Salva
 * 2) Esegui → "Distribuisci" → "Nuova distribuzione" → tipo "App web"
 *    Esegui come: Me · Chi ha accesso: Chiunque → Distribuisci → copia l'URL /exec
 */
var KEY = 'mrXcZGidw1_tTXAjfnIkB-Ju'; // chiave segreta per leggere la lista dall'app admin

var HEAD = ['Registrato il', 'Nome', 'Paese', 'Città', 'Lavoro', 'Codice', 'Versione', 'Dispositivo', 'Lingua', 'Ultimo accesso', 'Giorni di uso'];

function sheet_() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) { sh.appendRow(HEAD); sh.setFrozenRows(1); }
  return sh;
}

function doPost(e) {
  var p = (e && e.parameter) || {};
  var code = String(p.codice || '').slice(0, 20);
  if (!code) return out_('no');
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var sh = sheet_(), data = sh.getDataRange().getValues(), row = -1;
    for (var i = 1; i < data.length; i++) if (String(data[i][5]) === code) { row = i + 1; break; }
    var now = new Date();
    function c(v) { return String(v || '').slice(0, 80); }
    if (p.tipo === 'visto') {           // accesso giornaliero
      if (row > 0) {
        sh.getRange(row, 7).setValue(c(p.versione));
        sh.getRange(row, 10).setValue(now);
        sh.getRange(row, 11).setValue(Number(p.giorni) || (Number(data[row - 1][10]) || 0) + 1);
      }
      return out_('ok');
    }
    var vals = [row > 0 ? data[row - 1][0] : now, c(p.nome), c(p.paese), c(p.citta), c(p.lavoro), code,
                c(p.versione), c(p.dispositivo), c(p.lingua), now, Number(p.giorni) || 1];
    if (row > 0) sh.getRange(row, 1, 1, vals.length).setValues([vals]); else sh.appendRow(vals);
    return out_('ok');
  } finally { lock.releaseLock(); }
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.key !== KEY) return out_(JSON.stringify({ error: 'key' }), true);
  var data = sheet_().getDataRange().getValues();
  var rows = data.slice(1).map(function (r) {
    return { reg: r[0], nome: r[1], paese: r[2], citta: r[3], lavoro: r[4], codice: r[5], versione: r[6],
             dispositivo: r[7], lingua: r[8], ultimo: r[9], giorni: r[10] };
  });
  return out_(JSON.stringify({ users: rows }), true);
}

function out_(s, json) {
  return ContentService.createTextOutput(s).setMimeType(json ? ContentService.MimeType.JSON : ContentService.MimeType.TEXT);
}
