// Richiesta materiale / طلب مواد — logica dell'app
(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var main=$('#main');
var A=window.Android;

/* =====================================================================
   TESTI / النصوص
   ===================================================================== */
var TXT={
 ar:{title:'طلب مواد',search:'ابحث عن قطعة، كابل...',mat:'المواد',kit:'الكيتات',cart:'الطلب',items:'مادة',copy:'نسخ',
  site:'📍 بيانات الموقع',edit:'تعديل ▾',hide:'إخفاء ▴',siteHint:'اضغط لإدخال اسم الزبون والعنوان',cliente:'الزبون',clienteP:'اسم الزبون أو الشركة',
  indirizzo:'العنوان',luogo:'نوع المكان',note:'ملاحظات عامة',noteP:'مثلاً: السلسلة BTicino Living بيضاء',
  custom:'مادة غير موجودة',allCats:'كل الفئات',kits:'الكيتات',materials:'المواد',notFound:'لم أجد',addNew:'أضف «%» كمادة جديدة',
  kitInfo:'الكيت يضيف كل قطع النقطة بضغطة واحدة. الكميات تقريبية وتستطيع تعديلها قبل الإضافة.',
  emptyCart:'لم تضف أي مادة بعد.<br>اختر من «المواد» أو «الكيتات».',other:'مواد أخرى',preview:'👁 معاينة الرسالة',clear:'مسح الكل',
  qty:'الكمية',size:'المقاس',sizeOther:'مقاس آخر (اختياري)',sizeFree:'المقاس أو النوع (اختياري)',itemNote:'ملاحظة (اللون، الماركة، السلسلة…)',itemNoteP:'مثلاً BTicino Living أبيض',
  colors:'الألوان — اكتب كمية كل لون',colorsHint:'اترك 0 للون الذي لا تحتاجه',needColor:'اكتب كمية لون واحد على الأقل',
  add:'أضف إلى الطلب ✓',needQty:'اكتب الكمية',needSize:'اختر المقاس أولاً',added:'أُضيف:',customSub:'تُكتب في الطلب كما هي',name:'اسم المادة',unit:'الوحدة',
  needName:'اكتب اسم المادة',howMany:'كم نقطة؟',parts:'القطع (تستطيع تعديل أي كمية)',kitNote:'ملاحظة للكيت (مثلاً الغرفة)',kitNoteP:'مثلاً: المطبخ',addKit:'أضف الكيت إلى الطلب ✓',kitAdded:'أُضيف الكيت:',
  settings:'⚙️ الإعدادات',tecnico:'اسمك (الفني)',ditta:'اسم الشركة (يظهر في PDF)',dittaP:'اكتب اسم شركتك هنا',waNum:'رقم واتساب المدير (اختياري)',waNumP:'مثلاً ‎+39 3xx xxx xxxx',
  waHint:'إذا كتبت الرقم، زر واتساب يفتح محادثة المدير مباشرة.',uiLang:'لغة التطبيق',outLang:'لغة الرسالة وملف PDF',
  langIt:'الإيطالية',langAr:'العربية',langBoth:'الاثنتان',save:'حفظ',saved:'تم الحفظ ✓',cancel:'إلغاء',del:'حذف',
  clearQ:'مسح كل المواد من هذا الطلب؟',
  copied:'تم نسخ الطلب ✓',pdfWait:'جاري تجهيز PDF…',pdfOk:'PDF جاهز ✓',pdfErr:'تعذّر إنشاء PDF',previewT:'معاينة الرسالة',
  contact:'📞 تواصل معنا',contactHint:'وجدت خطأ أو عندك فكرة؟ راسلنا وسنصلحه.',report:'أبلغ عن خطأ عبر واتساب',call:'اتصال',reportMsg:'مرحباً، عندي ملاحظة عن تطبيق «طلب مواد»:',
  // progetti
  projects:'📁 مشاريعي',newProj:'➕ مشروع جديد',projEmpty:'لا توجد مشاريع محفوظة بعد.',current:'الحالي',open:'فتح',dup:'نسخ',
  noName:'بدون اسم',saveT:'💾 حفظ المشروع',saveHint:'المشروع يُحفظ تلقائياً. اكتب اسماً لتجده بسهولة لاحقاً.',projName:'اسم المشروع',projNameP:'مثلاً: شقة Rossi – Via Appia',
  projSaved:'حُفظ المشروع ✓',delProjQ:'حذف هذا المشروع نهائياً؟',opened:'فُتح المشروع:',dupDone:'تم نسخ المشروع',searchProj:'ابحث في المشاريع…',lines:'مادة',
  // admin
  admin:'🔒 الإدارة',adminSub:'تعديل المواد والفئات والكيتات والصور',pw:'كلمة السر',pwWrong:'كلمة السر غير صحيحة',enter:'دخول',exit:'خروج',
  admCats:'الفئات والمواد',admCatsSub:'إضافة، تعديل، إخفاء، ترتيب، صور',admKits:'الكيتات',admKitsSub:'إنشاء وتعديل الكيتات',
  admBackup:'نسخة احتياطية',admBackupSub:'تصدير واستيراد كل التعديلات',admPw:'تغيير كلمة السر',admReset:'استرجاع القائمة الأصلية',
  newCat:'➕ فئة جديدة',newItem:'➕ مادة جديدة',newKit:'➕ كيت جديد',editCat:'تعديل الفئة',editItem:'تعديل المادة',editKit:'تعديل الكيت',
  icon:'الأيقونة (رمز تعبيري)',nameIt:'الاسم بالإيطالية',nameAr:'الاسم بالعربية',sizesL:'المقاسات (كل مقاس في سطر)',hasColors:'سلك بألوان (يطلب كمية لكل لون)',
  category:'الفئة',photo:'الصورة',addPhoto:'📷 إضافة صورة',delPhoto:'حذف الصورة',hidden:'مخفي',show:'إظهار',hideL:'إخفاء',
  delCatQ:'حذف هذه الفئة وكل موادها؟',delItemQ:'حذف هذه المادة؟',delKitQ:'حذف هذا الكيت؟',needNames:'اكتب الاسم بالإيطالية على الأقل',
  kitParts:'قطع الكيت',addPart:'➕ أضف قطعة',partSearch:'ابحث عن مادة لإضافتها…',color:'اللون',none:'بدون',
  exportB:'📤 تصدير نسخة احتياطية',exportHint:'ملف واحد فيه كل المواد والفئات والكيتات والصور والمشاريع. أرسله لنفسك أو للمطوّر.',
  importB:'📥 استيراد نسخة',importHint:'يستبدل القائمة الحالية بالملف المختار.',importQ:'استيراد هذا الملف؟ ستُستبدل القائمة الحالية.',imported:'تم الاستيراد ✓',badFile:'الملف غير صالح',
  resetQ:'استرجاع القائمة الأصلية؟ ستُحذف كل تعديلاتك على المواد والكيتات (المشاريع لا تُحذف).',resetDone:'تمت الاستعادة',
  pwOld:'كلمة السر الحالية',pwNew:'كلمة السر الجديدة',pwNew2:'أعد كتابة الجديدة',pwWeak:'8 أحرف على الأقل، فيها حرف ورقم',pwMismatch:'الكلمتان غير متطابقتين',pwChanged:'تم تغيير كلمة السر ✓',
  storageFull:'الذاكرة ممتلئة! صغّر الصور أو احذف بعضها.',updTitle:'🔔 يوجد تحديث جديد',updNow:'⬇️ تحديث الآن',updLater:'لاحقاً',updDl:'جاري التنزيل…',updPerm:'اسمح للتطبيق بتثبيت التحديثات (مرة واحدة فقط)، ثم ارجع إلى التطبيق.',updInst:'اضغط «تثبيت» في النافذة التي ظهرت. بياناتك ومشاريعك تبقى كما هي.',updErr:'تعذّر التحديث. تأكد من الإنترنت وحاول مرة أخرى.',updCheck:'🔄 البحث عن تحديث',updNone:'عندك آخر نسخة ✓',updWeb:'النسخة الجديدة جاهزة، سيُعاد فتح التطبيق.',stats:'📊 إحصائيات مجهولة الهوية',statsHint:'يرسل التطبيق فقط: أنه فُتح، والدولة، ورقمك المجهول. لا اسم ولا رقم هاتف ولا موقع دقيق ولا محتوى طلباتك.',statsOn:'السماح بالإحصائيات',yourId:'رقمك المجهول',
  price:'الأسعار',priceInfo:'أسعار العمل اليدوي فقط (بدون المواد)، بدون IVA. الأسعار المكتوبة تقريبية لروما — عدّلها من 🔒 الإدارة ← أسعار العمل.',
  quote:'عرض السعر',quoteEmpty:'اختر الخدمات من القائمة في الأسفل لتبدأ الحساب.',services:'قائمة الخدمات',customExtra:'➕ إضافة خاصة (تكتبها بنفسك)',
  unitPrice:'سعر الوحدة €',lineTotal:'المجموع',labour:'مجموع العمل',discount:'خصم €',taxable:'المبلغ بدون ضريبة',withIva:'إضافة IVA (الضريبة)',iva:'IVA',total:'السعر النهائي',
  noIvaNote:'السعر بدون IVA',descr:'الوصف',needPrice:'اكتب السعر',addToQuote:'أضف إلى عرض السعر ✓',addedQ:'أُضيف إلى العرض:',clearQuoteQ:'مسح عرض السعر لهذا المشروع؟',
  admSvc:'أسعار العمل',admSvcSub:'تعديل سعر كل خدمة، إضافة وحذف',newSvc:'➕ خدمة جديدة',editSvc:'تعديل الخدمة',priceL:'السعر € (بدون IVA)',group:'المجموعة',delSvcQ:'حذف هذه الخدمة؟',resetSvc:'استرجاع الأسعار الأصلية',resetSvcQ:'استرجاع أسعار العمل الأصلية؟ ستُحذف تعديلاتك على الأسعار.',photoErr:'تعذّر قراءة الصورة',moved:'نُقلت',editsSaved:'تم الحفظ ✓'},
 it:{title:'Richiesta materiale',search:'Cerca pezzo, cavo...',mat:'Materiali',kit:'Kit',cart:'Richiesta',items:'voci',copy:'Copia',
  site:'📍 Dati del cantiere',edit:'Modifica ▾',hide:'Nascondi ▴',siteHint:'Tocca per inserire cliente e indirizzo',cliente:'Cliente',clienteP:'Nome cliente o azienda',
  indirizzo:'Indirizzo',luogo:'Tipo di luogo',note:'Note generali',noteP:'es. serie BTicino Living bianca',
  custom:'Articolo non in elenco',allCats:'Tutte le categorie',kits:'Kit',materials:'Materiali',notFound:'Nessun risultato per',addNew:'Aggiungi «%» come nuovo articolo',
  kitInfo:'Il kit aggiunge tutti i pezzi del punto con un tocco. Le quantità sono indicative e puoi modificarle prima di aggiungere.',
  emptyCart:'Nessun materiale aggiunto.<br>Scegli da «Materiali» o «Kit».',other:'Altro',preview:'👁 Anteprima messaggio',clear:'Svuota',
  qty:'Quantità',size:'Misura',sizeOther:'Altra misura (facoltativo)',sizeFree:'Misura o tipo (facoltativo)',itemNote:'Nota (colore, marca, serie…)',itemNoteP:'es. BTicino Living bianco',
  colors:'Colori — quantità per ogni colore',colorsHint:'Lascia 0 per i colori che non servono',needColor:'Inserisci la quantità di almeno un colore',
  add:'Aggiungi alla richiesta ✓',needQty:'Inserisci la quantità',needSize:'Scegli prima la misura',added:'Aggiunto:',customSub:'Viene scritto nella richiesta così com\'è',name:'Nome articolo',unit:'Unità',
  needName:'Scrivi il nome dell\'articolo',howMany:'Quanti punti?',parts:'Pezzi (puoi modificare ogni quantità)',kitNote:'Nota per il kit (es. stanza)',kitNoteP:'es. Cucina',addKit:'Aggiungi il kit ✓',kitAdded:'Kit aggiunto:',
  settings:'⚙️ Impostazioni',tecnico:'Il tuo nome (tecnico)',ditta:'Nome ditta (compare nel PDF)',dittaP:'Scrivi qui il nome della tua ditta',waNum:'Numero WhatsApp del responsabile (facoltativo)',waNumP:'es. +39 3xx xxx xxxx',
  waHint:'Se inserisci il numero, il tasto WhatsApp apre subito la sua chat.',uiLang:'Lingua dell\'app',outLang:'Lingua del messaggio e del PDF',
  langIt:'Italiano',langAr:'Arabo',langBoth:'Entrambe',save:'Salva',saved:'Salvato ✓',cancel:'Annulla',del:'Elimina',
  clearQ:'Svuotare tutta questa richiesta?',
  copied:'Richiesta copiata ✓',pdfWait:'Preparazione PDF…',pdfOk:'PDF pronto ✓',pdfErr:'Impossibile creare il PDF',previewT:'Anteprima messaggio',
  contact:'📞 Contatti',contactHint:'Hai trovato un errore o hai un\'idea? Scrivici e lo sistemiamo.',report:'Segnala un errore su WhatsApp',call:'Chiama',reportMsg:'Ciao, ho una segnalazione sull\'app «Richiesta materiale»:',
  projects:'📁 I miei progetti',newProj:'➕ Nuovo progetto',projEmpty:'Nessun progetto salvato.',current:'attuale',open:'Apri',dup:'Duplica',
  noName:'Senza nome',saveT:'💾 Salva progetto',saveHint:'Il progetto si salva da solo. Dagli un nome per ritrovarlo facilmente.',projName:'Nome progetto',projNameP:'es. Appartamento Rossi – Via Appia',
  projSaved:'Progetto salvato ✓',delProjQ:'Eliminare definitivamente questo progetto?',opened:'Aperto:',dupDone:'Progetto duplicato',searchProj:'Cerca nei progetti…',lines:'voci',
  admin:'🔒 Amministrazione',adminSub:'Modifica materiali, categorie, kit e foto',pw:'Password',pwWrong:'Password errata',enter:'Entra',exit:'Esci',
  admCats:'Categorie e materiali',admCatsSub:'Aggiungi, modifica, nascondi, ordina, foto',admKits:'Kit',admKitsSub:'Crea e modifica i kit',
  admBackup:'Backup',admBackupSub:'Esporta e importa tutte le modifiche',admPw:'Cambia password',admReset:'Ripristina elenco originale',
  newCat:'➕ Nuova categoria',newItem:'➕ Nuovo articolo',newKit:'➕ Nuovo kit',editCat:'Modifica categoria',editItem:'Modifica articolo',editKit:'Modifica kit',
  icon:'Icona (emoji)',nameIt:'Nome in italiano',nameAr:'Nome in arabo',sizesL:'Misure (una per riga)',hasColors:'Cavo a colori (quantità per colore)',
  category:'Categoria',photo:'Foto',addPhoto:'📷 Aggiungi foto',delPhoto:'Rimuovi foto',hidden:'nascosto',show:'Mostra',hideL:'Nascondi',
  delCatQ:'Eliminare questa categoria e tutti i suoi articoli?',delItemQ:'Eliminare questo articolo?',delKitQ:'Eliminare questo kit?',needNames:'Scrivi almeno il nome in italiano',
  kitParts:'Pezzi del kit',addPart:'➕ Aggiungi pezzo',partSearch:'Cerca un articolo da aggiungere…',color:'Colore',none:'nessuno',
  exportB:'📤 Esporta backup',exportHint:'Un unico file con materiali, categorie, kit, foto e progetti. Invialo a te stesso o allo sviluppatore.',
  importB:'📥 Importa backup',importHint:'Sostituisce l\'elenco attuale con il file scelto.',importQ:'Importare questo file? L\'elenco attuale verrà sostituito.',imported:'Importato ✓',badFile:'File non valido',
  resetQ:'Ripristinare l\'elenco originale? Le modifiche a materiali e kit verranno perse (i progetti restano).',resetDone:'Ripristinato',
  pwOld:'Password attuale',pwNew:'Nuova password',pwNew2:'Ripeti la nuova password',pwWeak:'Almeno 8 caratteri, con lettere e numeri',pwMismatch:'Le password non coincidono',pwChanged:'Password cambiata ✓',
  storageFull:'Memoria piena! Riduci o elimina alcune foto.',updTitle:'🔔 Nuovo aggiornamento disponibile',updNow:'⬇️ Aggiorna ora',updLater:'Più tardi',updDl:'Download in corso…',updPerm:'Consenti all\'app di installare aggiornamenti (solo la prima volta), poi torna nell\'app.',updInst:'Tocca «Installa» nella finestra che si è aperta. I tuoi dati e progetti restano.',updErr:'Aggiornamento non riuscito. Controlla internet e riprova.',updCheck:'🔄 Cerca aggiornamenti',updNone:'Hai già l\'ultima versione ✓',updWeb:'Nuova versione pronta, l\'app si riavvia.',stats:'📊 Statistiche anonime',statsHint:'L\'app invia solo: che è stata aperta, il Paese e il tuo codice anonimo. Nessun nome, telefono, posizione precisa o contenuto delle richieste.',statsOn:'Consenti statistiche',yourId:'Il tuo codice anonimo',
  price:'Prezzi',priceInfo:'Solo manodopera (materiali esclusi), IVA esclusa. I prezzi sono indicativi per Roma — modificali da 🔒 Amministrazione → Listino manodopera.',
  quote:'Preventivo',quoteEmpty:'Scegli i lavori dall\'elenco qui sotto per iniziare il calcolo.',services:'Elenco lavori',customExtra:'➕ Voce libera (la scrivi tu)',
  unitPrice:'Prezzo unitario €',lineTotal:'Totale',labour:'Totale manodopera',discount:'Sconto €',taxable:'Imponibile',withIva:'Aggiungi IVA',iva:'IVA',total:'Totale',
  noIvaNote:'Prezzo IVA esclusa',descr:'Descrizione',needPrice:'Inserisci il prezzo',addToQuote:'Aggiungi al preventivo ✓',addedQ:'Aggiunto al preventivo:',clearQuoteQ:'Svuotare il preventivo di questo progetto?',
  admSvc:'Listino manodopera',admSvcSub:'Prezzo di ogni lavoro, aggiungi ed elimina',newSvc:'➕ Nuovo lavoro',editSvc:'Modifica lavoro',priceL:'Prezzo € (IVA esclusa)',group:'Gruppo',delSvcQ:'Eliminare questo lavoro?',resetSvc:'Ripristina prezzi originali',resetSvcQ:'Ripristinare il listino originale? Le modifiche ai prezzi verranno perse.',photoErr:'Impossibile leggere la foto',moved:'Spostato',editsSaved:'Salvato ✓'}
};
var OUT={
 it:{title:'RICHIESTA MATERIALE',cliente:'Cliente',indirizzo:'Indirizzo',luogo:'Luogo',data:'Data',tecnico:'Tecnico',note:'Note',tot:'Totale voci',other:'Altro',mat:'Materiale',size:'Misura',qty:'Q.tà'},
 ar:{title:'طلب مواد',cliente:'الزبون',indirizzo:'العنوان',luogo:'المكان',data:'التاريخ',tecnico:'الفني',note:'ملاحظات',tot:'عدد المواد',other:'مواد أخرى',mat:'المادة',size:'المقاس',qty:'الكمية'}
};
// --- lingue aggiuntive (lang.js) ---
var LANGS=[['ar','العربية'],['it','Italiano'],['en','English'],['fr','Français']];
(function(){
  var X=window.LM_TXT||{};
  ['en','fr'].forEach(function(l){TXT[l]=Object.assign({},TXT.it,X[l]||{})});
  ['ar','it'].forEach(function(l){Object.assign(TXT[l],X[l]||{})});
  Object.assign(OUT,window.LM_OUT||{});
  OUT.it.titleL='Richiesta materiale';OUT.ar.titleL='طلب مواد';
  if(OUT.en)OUT.en.titleL='Material request'; if(OUT.fr)OUT.fr.titleL='Demande de matériel';
  var U=window.LM_UNITS||{};
  Object.keys(UNITS).forEach(function(k){if(U[k]){UNITS[k].en=U[k][0];UNITS[k].fr=U[k][1]}});
  Object.keys(SERVICE_UNITS).forEach(function(k){if(U[k]){SERVICE_UNITS[k].en=U[k][0];SERVICE_UNITS[k].fr=U[k][1]}});
})();
function trSize(x,lang){
  if(!x||lang==='it'||lang==='ar'||lang==='both') return x||'';
  var M={en:{moduli:'modules',modulo:'module',poli:'poles',posti:'places',canali:'channels',porte:'ports',vie:'ways',fili:'wires',coppia:'pair',coppie:'pairs',tondo:'round',tonda:'round',quadrato:'square',orientabile:'adjustable',interno:'internal',esterno:'external',piano:'flat','a superficie':'surface','da incasso':'recessed',angolare:'corner','per cartongesso':'for drywall',monofase:'single phase',trifase:'three phase',giornaliero:'daily','settimanale digitale':'weekly digital',astronomico:'astronomical',nero:'black',blu:'blue',marrone:'brown',grigio:'grey',rosso:'red',bianco:'white',trasparente:'clear',maschio:'male',femmina:'female',filare:'wired',radio:'wireless','doppia tecnologia':'dual technology',ibrido:'hybrid',normale:'standard',campanello:'bell',luminoso:'illuminated',mammut:'strip'},
         fr:{moduli:'modules',modulo:'module',poli:'pôles',posti:'postes',canali:'canaux',porte:'ports',vie:'voies',fili:'fils',coppia:'paire',coppie:'paires',tondo:'rond',tonda:'ronde',quadrato:'carré',orientabile:'orientable',interno:'intérieur',esterno:'extérieur',piano:'plat','a superficie':'en saillie','da incasso':'encastré',angolare:'d\'angle','per cartongesso':'pour placo',monofase:'monophasé',trifase:'triphasé',giornaliero:'journalier','settimanale digitale':'hebdo numérique',astronomico:'astronomique',nero:'noir',blu:'bleu',marrone:'marron',grigio:'gris',rosso:'rouge',bianco:'blanc',trasparente:'transparent',maschio:'mâle',femmina:'femelle',filare:'filaire',radio:'radio','doppia tecnologia':'double technologie',ibrido:'hybride',normale:'standard',campanello:'sonnette',luminoso:'lumineux'}}[lang]||{};
  var keys=Object.keys(M).sort(function(a,b){return b.length-a.length});
  keys.forEach(function(k){x=x.replace(new RegExp('(^|\\s)'+k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=\\s|$)','g'),function(m,a){return a+M[k]})});
  return x;
}
function trName(o,lang){
  if(!o) return '';
  if(lang==='it') return o.it||'';
  if(lang==='ar') return o.ar||o.it||'';
  if(o[lang]) return o[lang];
  var t=(window.LM_NAMES||{})[o.it]; return (t&&t[lang==='en'?0:1])||o.it||'';
}
var PLACES=[{id:'appartamento',it:'Appartamento',ar:'شقة'},{id:'villa',it:'Villa / casa',ar:'فيلا / بيت'},{id:'ufficio',it:'Ufficio',ar:'مكتب'},{id:'negozio',it:'Negozio',ar:'محل'},{id:'azienda',it:'Azienda',ar:'شركة / مصنع'},{id:'condominio',it:'Condominio',ar:'عمارة'},{id:'cantiere',it:'Cantiere',ar:'ورشة بناء'}];
var CONTACT={phone:'+39 329 558 6046',num:'393295586046',ig:'rage_simo',tt:'banbochagaming'};
var COLBY={}; COLORS.forEach(function(c){COLBY[c.id]=c});

/* =====================================================================
   ARCHIVIO LOCALE / التخزين
   ===================================================================== */
var K={db:'lm_db_v2',img:'lm_img_v2',proj:'lm_proj_v2',set:'lm_settings_v1',old:'lm_state_v1',fav:'lm_fav_v1',people:'lm_people_v1'};
function load(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function put(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){toast(T('storageFull'));return false}}

var settings=load(K.set,{});
['tecnico','ditta','waNum'].forEach(function(k){if(settings[k]==null)settings[k]=''});
if(!settings.ui) settings.ui='ar';
if(!settings.out) settings.out='it';
function saveSettings(){put(K.set,settings)}

// ---- catalogo modificabile ----
var uid=function(p){return (p||'x')+Date.now().toString(36)+Math.random().toString(36).slice(2,6)};
function defaultDB(){
  var db={v:2,cats:[],kits:[]}, byName={};
  CATEGORIES.forEach(function(c){
    var cat={id:c.id,ic:c.ic,it:c.it,ar:c.ar,hidden:false,items:[]};
    c.items.trim().split('\n').forEach(function(l,ix){
      var p=l.split('|'); if(p.length<3) return;
      var it={id:c.id+'_'+ix,it:p[0].trim(),ar:p[1].trim(),unit:p[2].trim(),
        sizes:(p[3]||'').split(';').map(function(s){return s.trim()}).filter(Boolean),colors:(p[4]||'').trim()==='C',hidden:false};
      cat.items.push(it); byName[it.it]=it.id;
    });
    db.cats.push(cat);
  });
  KITS.forEach(function(k){
    db.kits.push({id:k.id,ic:k.ic,it:k.it,ar:k.ar,note:k.note||'',noteIt:k.noteIt||'',hidden:false,
      parts:k.parts.map(function(p){return {item:byName[p[0]]||null,name:p[0],size:p[1]||'',qty:p[2],color:p[3]||''}})});
  });
  db.svc=defaultSvc();
  db.pack='IT';db.packVer=window.CATALOG_VER||1;
  return db;
}
function defaultSvc(){
  return SERVICE_GROUPS.map(function(g){return {id:g.id,ic:g.ic,it:g.it,ar:g.ar,hidden:false,
    list:g.list.map(function(x){return {id:x[0],it:x[1],ar:x[2],unit:x[3],price:x[4],hidden:false}})}});
}
// ---- Mestiere (elettricista = 'ele', default; altri in trades.js → window.LM_TRADES) ----
function tradeId(){var t=settings.trade||'ele';return t==='ele'||(window.LM_TRADES||{})[t]?t:'ele'}
function tradeData(){return tradeId()==='ele'?null:(window.LM_TRADES||{})[tradeId()]}
function tradePack(cc){var td=tradeData();if(!td)return null;return td.packs[cc||packId()]||td.packs.IT}
function tradeList(){var l=[['ele','⚡',{ar:'كهربائي',it:'Elettricista',en:'Electrician',fr:'Électricien'}]];var T_=window.LM_TRADES||{};Object.keys(T_).forEach(function(k){l.push([k,T_[k].ic,T_[k].name])});return l}
function tradeLabel(id){var t=tradeList().find(function(x){return x[0]===(id||tradeId())})||tradeList()[0];return t[1]+' '+(t[2][settings.ui]||t[2].it)}
function profKey(){return tradeId()==='ele'?packId():tradeId()+'_'+packId()}
// ---- Paese / catalogo per Paese ----
function packId(){return settings.country||'IT'}
function packData(cc){cc=cc||packId();if(cc==='IT')return null;var cached=load('lm_pack_'+cc,null),b=(window.LM_PACKS||{})[cc];if(cached&&(!b||cached.version>b.version))return cached;return b||cached}
function packList(){var l=[{id:'IT',flag:'🇮🇹',name:{ar:'إيطاليا',it:'Italia',en:'Italy',fr:'Italie'}}];var P_=window.LM_PACKS||{};Object.keys(P_).forEach(function(k){l.push({id:k,flag:P_[k].flag,name:P_[k].name})});return l}
function dbKey(){if(tradeId()!=='ele')return 'lm_db_'+profKey();return packId()==='IT'?K.db:'lm_db_'+packId()}
function clone(o){return JSON.parse(JSON.stringify(o))}
function defaultDBFor(cc){
  var tp=tradePack(cc); if(tp) return {v:2,pack:cc,trade:tradeId(),packVer:tp.version,cats:clone(tp.cats),kits:clone(tp.kits||[]),svc:clone(tp.svc||[])};
  if(cc==='IT') return defaultDB();
  var p=packData(cc); if(!p){settings.country='IT';return defaultDB()}
  return {v:2,pack:cc,packVer:p.version,cats:clone(p.cats),kits:clone(p.kits),svc:clone(p.svc)};
}
function defaultSvcFor(cc){var tp=tradePack(cc);if(tp)return clone(tp.svc||[]);return cc==='IT'?defaultSvc():clone((packData(cc)||{}).svc||[])}
function packVerNow(cc){var tp=tradePack(cc);if(tp)return tp.version||1;return cc==='IT'?(window.CATALOG_VER||1):((packData(cc)||{}).version||1)}
function loadDB(){
  var cc=packId(), db=load(dbKey(),null), ver=packVerNow(cc);
  if(!db) db=defaultDBFor(cc);
  else if(!db.packVer) db.packVer=ver;                 // elenco vecchio: lo teniamo così com'è
  else if(db.packVer<ver&&!db.edited) db=defaultDBFor(cc); // catalogo aggiornato e mai modificato: aggiorna
  if(!db.svc) db.svc=defaultSvcFor(cc);
  return db;
}
var DB=loadDB();
function curSym(){var p=packData();return p?p.currency:'€'}
function vatRates(){var p=packData();return p?p.vat:[10,22]}
function qRate(q){return vatRates().indexOf(+q.rate)>=0?+q.rate:vatDef()}
function vatDef(){var p=packData();return p?p.vatDefault:22}
function setCountry(cc){
  if(cc===packId())return;
  settings.country=cc; var p=packData(cc);
  settings.out=p?(p.outLang||'fr'):'it';
  saveSettings(); DB=loadDB(); put(dbKey(),DB); reindex(); applyLang();
}
function setTrade(t){
  if(t===tradeId())return;
  save(); settings.trade=t; saveSettings();
  DB=loadDB(); put(dbKey(),DB); reindex();
  P.cur=null; cur(); prune(); save();
  view.tab='mat'; view.cat=null; view.calc=null; applyLang();
  ping('/mestiere/'+t,'Cambio mestiere');
}
var IMGS=load(K.img,{});
function saveDB(clean){DB.edited=!clean;reindex();return put(dbKey(),DB)}
function saveImgs(){return put(K.img,IMGS)}

var ITEMS=[],IBY={},CBY={},SBY={},GBY={};
function reindex(){
  ITEMS=[];IBY={};CBY={};SBY={};GBY={};
  (DB.svc||[]).forEach(function(g){GBY[g.id]=g;g.list.forEach(function(x){x.grp=g.id;SBY[x.id]=x})});
  DB.cats.forEach(function(c){CBY[c.id]=c;c.items.forEach(function(i){i.cat=c.id;IBY[i.id]=i;ITEMS.push(i);i._s=norm(i.it+' '+i.ar+' '+trName(i,'en')+' '+trName(i,'fr')+' '+i.sizes.join(' '))})});
}

// ---- progetti ----
function blankProj(){return {id:uid('p'),trade:tradeId(),name:'',site:{cliente:'',indirizzo:'',luogo:'',note:'',open:true},lines:[],created:Date.now(),updated:Date.now()}}
var P=load(K.proj,null);
if(!P){
  P={cur:null,list:[]};
  var old=load(K.old,null);
  if(old&&(old.lines&&old.lines.length||old.site&&old.site.cliente)){var pr=blankProj();pr.site=old.site;pr.lines=old.lines;pr.created=old.created||Date.now();P.list.push(pr);P.cur=pr.id}
}
function ofTrade(p){return (p.trade||'ele')===tradeId()}
function cur(){var p=P.list.find(function(x){return x.id===P.cur});if(!p||!ofTrade(p)){p=P.list.filter(ofTrade).sort(function(a,b){return b.updated-a.updated})[0];if(p)P.cur=p.id}if(!p){p=blankProj();P.list.unshift(p);P.cur=p.id}if(!p.quote)p.quote={lines:[],sconto:0,iva:false,rate:0};return p}
function isEmpty(p){return !p.lines.length&&!(p.quote&&p.quote.lines.length)&&!p.site.cliente&&!p.site.indirizzo&&!p.site.note&&!p.name}
function save(){var p=cur();p.updated=Date.now();put(K.proj,{cur:P.cur,list:P.list})}
function prune(){P.list=P.list.filter(function(p){return p.id===P.cur||!isEmpty(p)})}

var view={tab:'mat',cat:null,q:'',adm:null};
var adminOK=false;

/* =====================================================================
   UTIL
   ===================================================================== */
var PACK_TXT={MA:{
  search:{ar:'ابحث… مثلاً بريزة، ديجونكتور، gaine',it:'Cerca… es. disjoncteur, gaine, prise',en:'Search… e.g. disjoncteur, gaine, socket',fr:'Rechercher… ex. disjoncteur, gaine, prise'},
  noteP:{ar:'مثلاً: Legrand Niloé أبيض',it:'es. serie Legrand Niloé bianca',en:'e.g. Legrand Niloé white',fr:'ex. série Legrand Niloé blanche'},
  itemNoteP:{ar:'مثلاً Ingelec أبيض',it:'es. Ingelec bianco',en:'e.g. Ingelec white',fr:'ex. Ingelec blanc'},
  addrP:'Rue …, Casablanca'}};
var TRADE_TXT={edi:{
  search:{ar:'ابحث عن قطعة، إسمنت، بلاط...',it:'Cerca pezzo, cemento, piastrelle...',en:'Search part, cement, tiles...',fr:'Chercher pièce, ciment, carrelage...'},
  noteP:{ar:'مثلاً: بلاط 60×60 رمادي، إسمنت 42,5',it:'es. gres 60x60 grigio, cemento 42,5',en:'e.g. grey 60x60 tiles, cement 42.5',fr:'ex. carrelage 60x60 gris, ciment 42,5'}}};
function T(k){var tt=TRADE_TXT[tradeId()];if(tt&&tt[k]&&tt[k][settings.ui])return tt[k][settings.ui];var o=PACK_TXT[packId()];if(o&&o[k]&&o[k][settings.ui])return o[k][settings.ui];return TXT[settings.ui][k]!=null?TXT[settings.ui][k]:k}
function N(o){return trName(o,settings.ui)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function norm(s){
  return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
   .replace(/[ً-ٰٟـ]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي')
   .replace(/²/g,'2').replace(/ø/g,'o').replace(/\s+/g,' ').trim();
}
function unit(u){return UNITS[u]||{it:u,ar:u,step:1}}
function fmt(n){n=Math.round(n*100)/100;return String(n)}
function num(v){return parseFloat(String(v).replace(',','.'))||0}
function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(function(){t.classList.remove('show')},2200)}
function dot(c){if(!c)return '';var C=COLBY[c];return '<span class="dot" style="background:'+(C?C.hex:'#ccc')+'"></span>'}
function colName(c,lang){var C=COLBY[c];if(!C)return c||'';return lang==='both'?C.it+' / '+C.ar:trName(C,lang)}
function thumb(id,cls){return IMGS[id]?'<img class="thumb'+(cls?' '+cls:'')+'" src="'+IMGS[id]+'">':''}
function haveQty(it){var s=0;cur().lines.forEach(function(l){if(l.item===it.id)s+=l.qty});return s}
function catIndex(id){var i=DB.cats.findIndex(function(c){return c.id===id});return i<0?999:i}
function move(arr,i,d){var j=i+d;if(j<0||j>=arr.length)return;var x=arr[i];arr[i]=arr[j];arr[j]=x}

/* =====================================================================
   RIGHE DEL PROGETTO
   ===================================================================== */
function addLine(o){
  var qty=+o.qty||0; if(qty<=0) return;
  var L=cur().lines;
  var ex=L.find(function(l){return l.it===o.it&&l.size===(o.size||'')&&(l.color||'')===(o.color||'')&&(l.note||'')===(o.note||'')});
  if(ex){ex.qty=Math.round((ex.qty+qty)*100)/100}
  else L.push({item:o.item||null,it:o.it,ar:o.ar||'',fr:o.fr,en:o.en,cat:o.cat||'x',unit:o.unit||'pz',size:o.size||'',color:o.color||'',qty:qty,note:o.note||''});
  save(); refreshCounts();
}
function lineFromItem(it,size,qty,color,note){return {item:it.id,it:it.it,ar:it.ar,fr:it.fr,en:it.en,cat:it.cat,unit:it.unit,size:size||'',color:color||'',qty:qty,note:note||''}}
function refreshCounts(){var n=view.tab==='price'?cur().quote.lines.length:cur().lines.length;$('#badge').textContent=cur().lines.length;$('#cnt').textContent=n;['#btnWa','#btnCopy','#btnPdf'].forEach(function(b){$(b).disabled=!n})}

/* =====================================================================
   LINGUA
   ===================================================================== */
function applyLang(){
  var ar=settings.ui==='ar';
  document.documentElement.lang=settings.ui; document.documentElement.dir=ar?'rtl':'ltr';
  document.title=T('title'); $('#ttl').textContent=(packId()!=='IT'&&packData()?packData().flag+' ':'')+T('title');
  if(tradeId()!=='ele'){var sm=document.createElement('small');sm.textContent=tradeLabel();$('#ttl').appendChild(sm)}
  $('#btnLang').textContent='🌐 '+settings.ui.toUpperCase();
  $('#q').placeholder=T('search');
  $('#btnCalc').innerHTML='🧮 <span>'+L4(XT.calcBtn)+'</span>';$('#btnCalc').title=CT('calc');
  $('#tMat').textContent=T('mat');$('#tPrice').textContent='💶 '+T('price'); $('#tCart').textContent=T('cart');
  $('#cntL').textContent=T('items'); $('#btnCopyT').textContent=T('copy');
  $('#btnWaT').textContent=ar?'واتساب':'WhatsApp';
  if($('#tCalc'))$('#tCalc').title=T('calc');
}

/* =====================================================================
   RENDER PRINCIPALE
   ===================================================================== */
function render(){
  var inAdmin=view.tab==='admin', inProj=view.tab==='projects', inPrice=view.tab==='price', inCalc=view.tab==='calc';
  $('#tabs').style.display=(inAdmin||inProj||inCalc)?'none':'';
  $('#searchBox').style.display=(inAdmin||inProj||inPrice||inCalc)?'none':'';
  $('#bar').style.display=(inAdmin||inCalc)?'none':'';
  document.body.style.paddingBottom=(inAdmin||inCalc)?'24px':'';
  document.querySelectorAll('.tab').forEach(function(t){t.classList.toggle('on',t.dataset.tab===view.tab&&!view.q)});
  var h='';
  if(inAdmin) h=renderAdmin();
  else if(inProj) h=renderProjects();
  else if(inCalc) h=renderCalc();
  else if(inPrice) h=renderPrice();
  else if(view.q) h=renderSearch();
  else if(view.tab==='mat') h=quickRow()+renderSite()+(view.cat==='__fav'?renderFavs():view.cat&&CBY[view.cat]?renderCat(view.cat):renderCats());
  else if(view.tab==='kit'){view.tab='mat';h=quickRow()+renderSite()+renderCats()}
  else h=renderCart();
  main.innerHTML=h; refreshCounts();
}
function placeOf(id){return PLACES.find(function(p){return p.id===id})}
var XT={
  clients:{ar:'👥 الزبائن',it:'👥 Clienti',en:'👥 Clients',fr:'👥 Clients'},
  newClient:{ar:'➕ زبون جديد',it:'➕ Nuovo cliente',en:'➕ New client',fr:'➕ Nouveau client'},
  newP:{ar:'➕ مشروع جديد',it:'➕ Nuovo progetto',en:'➕ New project',fr:'➕ Nouveau projet'},
  myCl:{ar:'👥 زبائني',it:'👥 I miei clienti',en:'👥 My clients',fr:'👥 Mes clients'},
  savedNew:{ar:'✓ حُفظ المشروع السابق — صفحة جديدة',it:'✓ Progetto salvato — nuova pagina',en:'✓ Project saved — new page',fr:'✓ Projet enregistré — nouvelle page'},
  noClients:{ar:'لا يوجد زبائن محفوظون بعد.',it:'Nessun cliente salvato.',en:'No saved clients yet.',fr:'Aucun client enregistré.'},
  pros:{ar:'🤝 مهنيون موثوقون',it:'🤝 Professionisti consigliati',en:'🤝 Recommended pros',fr:'🤝 Professionnels recommandés'},
  prosHint:{ar:'أشخاص وشركات نثق بهم. اضغط على أي شخص لترى خدماته ورقمه.',it:'Persone e ditte di fiducia. Tocca una persona per vedere servizi e contatti.',en:'People and companies we trust. Tap someone to see services and contacts.',fr:'Personnes et entreprises de confiance. Touchez une personne pour voir ses services et contacts.'},
  services:{ar:'الخدمات',it:'Servizi',en:'Services',fr:'Services'},
  call:{ar:'📞 اتصال',it:'📞 Chiama',en:'📞 Call',fr:'📞 Appeler'},
  waHello:{ar:'السلام عليكم، وجدت رقمك في تطبيق «طلب مواد».',it:'Buongiorno, ho trovato il suo contatto nell’app «Richiesta materiale».',en:'Hello, I found your contact in the «Material request» app.',fr:'Bonjour, j’ai trouvé votre contact dans l’application «Demande de matériel».'},
  tradeT:{ar:'🛠️ المهنة',it:'🛠️ Mestiere',en:'🛠️ Trade',fr:'🛠️ Métier'},
  tradeHint:{ar:'كل مهنة لها قطعها وأسعارها وحاسباتها ومشاريعها الخاصة. لا شيء يختلط.',it:'Ogni mestiere ha materiali, prezzi, calcoli e progetti propri. Niente si mescola.',en:'Each trade has its own materials, prices, calculators and projects. Nothing gets mixed.',fr:'Chaque métier a ses matériaux, prix, calculs et projets. Rien ne se mélange.'},
  tradeOn:{ar:'✓ التطبيق الآن:',it:'✓ App ora in modalità:',en:'✓ App now in mode:',fr:'✓ Appli maintenant en mode :'},
  shareApp:{ar:'أرسل التطبيق لصديق',it:'Invia l’app a un amico',en:'Send the app to a friend',fr:'Envoyer l’appli à un ami'},
  shareAppSub:{ar:'واتساب، رسالة، أو أي تطبيق',it:'WhatsApp, SMS o altra app',en:'WhatsApp, SMS or any app',fr:'WhatsApp, SMS ou autre appli'},
  shareAppMsg:{ar:'👷 جرّب تطبيق «طلب مواد»: تختار المواد التي تحتاجها في الورشة وترسلها للمدير بواتساب أو PDF في ثوانٍ. مجاني.',
    it:'👷 Prova l’app «Richiesta materiale»: scegli il materiale che serve in cantiere e invialo al responsabile su WhatsApp o in PDF in pochi secondi. Gratis.',
    en:'👷 Try the «Material request» app: pick the materials you need on site and send them to your manager by WhatsApp or PDF in seconds. Free.',
    fr:'👷 Essaie l’appli «Demande de matériel» : choisis le matériel nécessaire sur le chantier et envoie-le au responsable par WhatsApp ou PDF en quelques secondes. Gratuit.'},
  shareAndroid:{ar:'📱 أندرويد:',it:'📱 Android:',en:'📱 Android:',fr:'📱 Android :'},
  shareIos:{ar:'🍏 آيفون وآيباد:',it:'🍏 iPhone e iPad:',en:'🍏 iPhone and iPad:',fr:'🍏 iPhone et iPad :'},
  calcBtn:{ar:'حاسبة',it:'Calcoli',en:'Calc',fr:'Calculs'},
  searchCl:{ar:'ابحث عن زبون…',it:'Cerca un cliente…',en:'Search a client…',fr:'Rechercher un client…'},
  dupLine:{ar:'⧉ تكرار السطر',it:'⧉ Duplica riga',en:'⧉ Duplicate line',fr:'⧉ Dupliquer la ligne'},
  delLine:{ar:'🗑 حذف السطر',it:'🗑 Elimina riga',en:'🗑 Delete line',fr:'🗑 Supprimer la ligne'},
  lineDup:{ar:'✓ تم تكرار السطر',it:'✓ Riga duplicata',en:'✓ Line duplicated',fr:'✓ Ligne dupliquée'},
  favs:{ar:'⭐ المفضلة',it:'⭐ Preferiti',en:'⭐ Favourites',fr:'⭐ Favoris'},
  recent:{ar:'🕘 المستعملة مؤخراً',it:'🕘 Usati di recente',en:'🕘 Recently used',fr:'🕘 Utilisés récemment'},
  favEmpty:{ar:'لا توجد مفضلة بعد. اضغط ☆ بجانب أي قطعة لإضافتها هنا.',it:'Nessun preferito. Tocca ☆ accanto a un articolo per aggiungerlo qui.',en:'No favourites yet. Tap ☆ next to an item to add it here.',fr:'Aucun favori. Touchez ☆ à côté d’un article pour l’ajouter ici.'},
  favAdd:{ar:'⭐ أضيفت إلى المفضلة',it:'⭐ Aggiunto ai preferiti',en:'⭐ Added to favourites',fr:'⭐ Ajouté aux favoris'},
  favDel:{ar:'أُزيلت من المفضلة',it:'Rimosso dai preferiti',en:'Removed from favourites',fr:'Retiré des favoris'},
  pressHint:{ar:'اضغط مطولاً على أي سطر لتكراره أو حذفه',it:'Tieni premuta una riga per duplicarla o eliminarla',en:'Long-press a line to duplicate or delete it',fr:'Appui long sur une ligne pour la dupliquer ou la supprimer'}
};
function L4(o){return o[settings.ui]||o.it}
function clientsSheet(){
  save(); prune();
  var q='';
  function draw(){
    var words=norm(q).split(' ').filter(Boolean);
    var list=P.list.filter(ofTrade).filter(function(p){return !isEmpty(p)||p.id===P.cur}).sort(function(a,b){return b.updated-a.updated}).filter(function(p){
      var t=norm([p.site.cliente,p.name,p.site.indirizzo].join(' '));return words.every(function(w){return t.indexOf(w)>=0})});
    $('#clList').innerHTML=list.length?list.map(function(p){
      var isCur=p.id===P.cur, n=p.lines.length, qn=(p.quote&&p.quote.lines.length)||0;
      return '<div class="clrow"><button class="contact" data-cl="'+p.id+'" style="'+(isCur?'border-color:var(--brand);border-width:2px':'')+'"><span class="ci" style="background:'+(isCur?'var(--brand)':'#8A8F99')+'">'+esc(((p.site.cliente||p.name||'?').trim()[0]||'?').toUpperCase())+'</span><div style="min-width:0"><b>'+esc(p.name||p.site.cliente||projTitle(p))+(isCur?' <span class="tag">'+T('current')+'</span>':'')+'</b><span>'+esc(p.site.indirizzo||'')+(p.site.indirizzo?' · ':'')+n+' '+T('lines')+(qn?' · 💶 '+qn:'')+' · '+dstr(p.updated).split(' ')[0]+'</span></div></button><button class="cldup" data-cldup="'+p.id+'" title="'+T('dup')+'" aria-label="'+T('dup')+'">⧉</button></div>'}).join(''):'<div class="mini" style="padding:12px">'+L4(XT.noClients)+'</div>';
    $('#clList').querySelectorAll('[data-cl]').forEach(function(b){b.onclick=function(){closeSheet();if(b.dataset.cl!==P.cur)openProject(b.dataset.cl)}});
    $('#clList').querySelectorAll('[data-cldup]').forEach(function(b){b.onclick=function(){if(dupProj(b.dataset.cldup))draw()}});
  }
  openSheet('<h2>'+L4(XT.clients)+'</h2><div class="field"><input id="clQ" placeholder="'+L4(XT.searchCl)+'"></div>'+
   '<button class="btn main" id="clNew" style="margin-top:10px">'+L4(XT.newClient)+'</button><div id="clList" style="margin-top:6px"></div>');
  $('#clQ').oninput=function(){q=this.value;draw()};
  $('#clNew').onclick=function(){closeSheet();startNew()};
  draw();
}
function dupProj(v){
  var src=P.list.find(function(p){return p.id===v});if(!src)return false;
  var cp=JSON.parse(JSON.stringify(src));cp.id=uid('p');cp.name=(projTitle(src))+' (2)';cp.created=cp.updated=Date.now();P.list.unshift(cp);save();toast(T('dupDone'));return true;
}
function quickRow(){
  return '<div class="row2" style="margin-bottom:12px"><button class="btn main" style="margin:0;flex:1.3" data-act="newproj">'+L4(XT.newP)+'</button><button class="btn ghost" style="flex:1;background:var(--card);box-shadow:0 1px 2px rgba(20,25,60,.06)" data-act="clients">'+L4(XT.myCl)+'</button></div>';
}
function startNew(){
  var p=cur(), had=!isEmpty(p);
  newProject();
  var s=cur().site; s.open=true; save(); render();
  if(had) toast(L4(XT.savedNew));
  setTimeout(function(){var i=document.querySelector('[data-f=cliente]');if(i)i.focus()},250);
}
function renderSite(){
  var p=cur(), s=p.site, pl=placeOf(s.luogo);
  var sum=[p.name,s.cliente,s.indirizzo,pl?N(pl):''].filter(Boolean).join(' · ')||T('siteHint');
  if(!s.open) return '<div class="card"><button class="site-head" style="width:100%;text-align:start" data-act="siteopen"><b>'+T('site')+'</b><span class="mini">'+T('edit')+'</span></button><div class="site-sum">'+esc(sum)+'</div></div>';
  var chips=PLACES.map(function(x){return '<button class="chip'+(s.luogo===x.id?' on':'')+'" data-act="place" data-v="'+x.id+'">'+esc(N(x))+'</button>'}).join('');
  return '<div class="card"><button class="site-head" style="width:100%;text-align:start" data-act="siteclose"><b>'+T('site')+'</b><span class="mini">'+T('hide')+'</span></button>'+
   '<div class="field"><label>'+T('cliente')+'</label><div class="combo"><input data-f="cliente" value="'+esc(s.cliente)+'" placeholder="'+T('clienteP')+'"><button class="combo-btn" data-act="clients" aria-label="'+L4(XT.clients)+'">▾</button></div></div>'+
   '<div class="field"><label>'+T('indirizzo')+'</label><input data-f="indirizzo" value="'+esc(s.indirizzo)+'" placeholder="'+((PACK_TXT[packId()]||{}).addrP||'Via …, Roma')+'"></div>'+
   '<div class="field"><label>'+T('luogo')+'</label><div class="chips places">'+chips+'</div></div>'+
   '<div class="field"><label>'+T('note')+'</label><textarea data-f="note" rows="2" placeholder="'+T('noteP')+'">'+esc(s.note)+'</textarea></div>'+
   '<button class="btn main" data-act="sitesave">💾 '+T('save')+'</button></div>';
}
function visibleItems(c){return c.items.filter(function(i){return !i.hidden})}
/* ---- preferiti e usati di recente (salvati a parte, per paese) ---- */
var FAV=load(K.fav,{});
function favBox(){var k=profKey();if(!FAV[k])FAV[k]={fav:[],rec:[]};return FAV[k]}
function isFav(id){return favBox().fav.indexOf(id)>=0}
function toggleFav(id){var f=favBox().fav,i=f.indexOf(id);if(i>=0)f.splice(i,1);else f.unshift(id);put(K.fav,FAV);return i<0}
function addRecent(id){if(!id)return;var r=favBox().rec,i=r.indexOf(id);if(i>=0)r.splice(i,1);r.unshift(id);if(r.length>8)r.length=8;put(K.fav,FAV)}
function liveItems(ids){return ids.map(function(id){return IBY[id]}).filter(function(it){return it&&!it.hidden&&!(CBY[it.cat]&&CBY[it.cat].hidden)})}
function renderRecent(){var r=liveItems(favBox().rec).slice(0,5);return r.length?'<div class="sec">'+L4(XT.recent)+'</div><div class="list" style="margin-bottom:12px">'+r.map(itemRow).join('')+'</div>':''}
function renderFavs(){
  var f=liveItems(favBox().fav);
  return '<button class="back" data-act="back">'+(settings.ui==='ar'?'→ ':'← ')+T('allCats')+'</button><div class="sec">'+L4(XT.favs)+'</div>'+
   (f.length?'<div class="list">'+f.map(itemRow).join('')+'</div>':'<div class="empty"><div class="big">☆</div>'+L4(XT.favEmpty)+'</div>');
}
function renderCats(){
  return renderRecent()+'<div class="grid"><button class="cat" data-act="cat" data-v="__fav"><span class="ic">⭐</span><b>'+esc(L4(XT.favs).replace('⭐ ',''))+'</b><span>'+liveItems(favBox().fav).length+' '+T('items')+'</span></button>'+DB.cats.filter(function(c){return !c.hidden}).map(function(c){
    return '<button class="cat" data-act="cat" data-v="'+c.id+'"><span class="ic">'+esc(c.ic||'📦')+'</span><b>'+esc(N(c))+'</b><span>'+visibleItems(c).length+' '+T('items')+'</span></button>'}).join('')+
   '<button class="cat" data-act="custom"><span class="ic">➕</span><b>'+T('custom')+'</b></button></div>';
}
function itemRow(it){
  var h=haveQty(it);
  var sub=it.sizes.length?it.sizes.slice(0,4).join(' · ')+(it.sizes.length>4?' …':''):'';
  if(it.colors) sub=(sub?sub+' · ':'')+'🎨';
  return '<button class="row" data-act="item" data-v="'+it.id+'">'+thumb(it.id)+'<div class="t"><b>'+esc(N(it))+'</b>'+(sub?'<span class="ltr" style="text-align:start">'+esc(sub)+'</span>':'')+'</div>'+
    (h?'<span class="have">'+fmt(h)+' '+N(unit(it.unit))+'</span>':'')+'<span class="fav'+(isFav(it.id)?' on':'')+'" role="button" data-act="fav" data-v="'+it.id+'" aria-label="'+esc(L4(XT.favs))+'">'+(isFav(it.id)?'★':'☆')+'</span><span class="plus">+</span></button>';
}
function renderCat(id){
  var c=CBY[id];
  return '<button class="back" data-act="back">'+(settings.ui==='ar'?'→ ':'← ')+T('allCats')+'</button><div class="sec">'+esc(c.ic||'')+' '+esc(N(c))+'</div><div class="list">'+visibleItems(c).map(itemRow).join('')+'</div>';
}
function renderSearch(){
  var words=norm(view.q).split(' ').filter(Boolean);
  var res=ITEMS.filter(function(i){return !i.hidden&&!(CBY[i.cat]&&CBY[i.cat].hidden)&&words.every(function(w){return i._s.indexOf(w)>=0})});
  var kits=DB.kits.filter(function(k){var s=norm(k.it+' '+k.ar);return !k.hidden&&words.every(function(w){return s.indexOf(w)>=0})});
  var h='';
  if(res.length) h+='<div class="sec">'+T('materials')+' ('+res.length+')</div><div class="list">'+res.slice(0,80).map(itemRow).join('')+'</div>';
  if(!res.length) h+='<div class="empty"><div class="big">🔎</div>'+T('notFound')+' «'+esc(view.q)+'»</div>';
  h+='<button class="btn main" data-act="custom" data-v="'+esc(view.q)+'">➕ '+esc(T('addNew').replace('%',view.q))+'</button>';
  return h;
}
function kitRow(k){return '<button class="row" data-act="kit" data-v="'+k.id+'"><span style="font-size:24px">'+esc(k.ic||'🧩')+'</span><div class="t"><b>'+esc(N(k))+'</b><span>'+k.parts.length+' '+T('items')+'</span></div><span class="plus">+</span></button>'}
function renderKits(){
  return '<div class="note" style="margin:0 0 12px">'+T('kitInfo')+'</div><div class="list">'+DB.kits.filter(function(k){return !k.hidden}).map(kitRow).join('')+'</div>';
}
function lineSub(l){
  var a=[];
  if(l.size) a.push('<span class="ltr">'+esc(trSize(l.size,settings.ui))+'</span>');
  if(l.color) a.push(dot(l.color)+esc(colName(l.color,settings.ui)));
  return a.join(' · ');
}
function chkCount(){var p=cur(),n=Object.keys(p.check||{}).filter(function(k){return p.check[k]}).length;return n?'('+n+'/'+chkList().length+')':''}
function hoursCount(){var t=(cur().hours||[]).reduce(function(a,h){return a+(+h.h||0)},0);return t?'('+n2(t,1)+' h)':''}
function renderCart(){
  var L=cur().lines;
  if(!L.length) return '<div class="empty"><div class="big">🧺</div>'+T('emptyCart')+'</div><div class="row2" style="margin-top:14px"><button class="btn ghost" data-act="check">✅ '+CT('check')+' '+chkCount()+'</button><button class="btn ghost" data-act="hours">⏱️ '+CT('hours')+' '+hoursCount()+'</button></div>';
  var groups={}, order=[];
  L.forEach(function(l,i){var g=l.cat||'x';if(!groups[g]){groups[g]=[];order.push(g)}groups[g].push(i)});
  order.sort(function(a,b){return catIndex(a)-catIndex(b)});
  var h='';
  order.forEach(function(g){
    var c=CBY[g];
    h+='<div class="sec">'+(c?esc(c.ic||'')+' '+esc(N(c)):'➕ '+T('other'))+'</div><div class="list">';
    groups[g].forEach(function(i){
      var l=L[i], sub=lineSub(l);
      h+='<div class="line" data-li="'+i+'">'+(l.item?thumb(l.item):'')+'<div class="t"><b>'+esc(N(l))+'</b>'+(sub?'<span style="text-align:start">'+sub+'</span>':'')+(l.note?'<i>📝 '+esc(l.note)+'</i>':'')+'</div>'+
        '<div class="stepper"><button data-act="dec" data-v="'+i+'">−</button><input inputmode="decimal" data-q="'+i+'" value="'+fmt(l.qty)+'"><span class="u">'+N(unit(l.unit))+'</span><button data-act="inc" data-v="'+i+'">+</button></div>'+
        '<button class="del" data-act="del" data-v="'+i+'">🗑</button></div>';
    });
    h+='</div>';
  });
  h+='<div class="mini" style="text-align:center;margin-top:8px">👆 '+L4(XT.pressHint)+'</div>';
  h+='<div class="row2" style="margin-top:14px"><button class="btn ghost" data-act="check">✅ '+CT('check')+' '+chkCount()+'</button><button class="btn ghost" data-act="hours">⏱️ '+CT('hours')+' '+hoursCount()+'</button></div>';
  h+='<div class="row2" style="margin-top:8px"><button class="btn ghost" data-act="preview">'+T('preview')+'</button><button class="btn ghost" data-act="clear" style="color:var(--danger)">'+T('clear')+'</button></div>';
  return h;
}

/* =====================================================================
   PREZZI / الأسعار (preventivo manodopera, separato dalla richiesta materiale)
   ===================================================================== */
function eur(n){n=Math.round((+n||0)*100)/100;var s=n.toFixed(2).split('.');s[0]=s[0].replace(/\B(?=(\d{3})+(?!\d))/g,curSym()==='€'?'.':' ');return s.join(',')+' '+curSym()}
function sunit(u,lang){var U=SERVICE_UNITS[u]||{it:u,ar:u};var l=lang||settings.ui;return U[l]||U.it}
function qTotals(q){
  var lab=0;q.lines.forEach(function(l){lab+=l.qty*l.price});
  lab=Math.round(lab*100)/100;
  var sc=Math.min(Math.max(+q.sconto||0,0),lab), imp=Math.round((lab-sc)*100)/100;
  var iva=q.iva?Math.round(imp*qRate(q))/100:0;
  return {lab:lab,sc:sc,imp:imp,iva:iva,tot:Math.round((imp+iva)*100)/100};
}
function renderPrice(){
  var q=cur().quote, pk=tradePack()||packData(), h='<div class="note" style="margin:0 0 12px">'+(pk&&pk.priceNote?(pk.priceNote[settings.ui]||pk.priceNote.fr):T('priceInfo'))+'</div>';
  h+='<div class="sec">🧾 '+T('quote')+'</div>';
  if(!q.lines.length) h+='<div class="card mini">'+T('quoteEmpty')+'</div>';
  else{
    h+='<div class="list">'+q.lines.map(function(l,i){
      return '<div class="line"><div class="t"><b>'+esc(N(l))+'</b><span dir="ltr" style="text-align:start">'+fmt(l.qty)+' '+sunit(l.unit)+' × '+eur(l.price)+' = <b style="display:inline;color:var(--ink)">'+eur(l.qty*l.price)+'</b></span></div>'+
       '<div class="stepper"><button data-act="qdec" data-v="'+i+'">−</button><input inputmode="decimal" data-qq="'+i+'" value="'+fmt(l.qty)+'"><button data-act="qinc" data-v="'+i+'">+</button></div>'+
       '<button class="del" data-act="qedit" data-v="'+i+'">✏️</button><button class="del" data-act="qdel" data-v="'+i+'">🗑</button></div>'}).join('')+'</div>';
    var t=qTotals(q);
    h+='<div class="card" style="margin-top:12px">'+
     '<div class="trow"><span>'+T('labour')+'</span><b dir="ltr">'+eur(t.lab)+'</b></div>'+
     '<div class="trow"><span>'+T('discount')+'</span><input id="qsc" inputmode="decimal" dir="ltr" value="'+(q.sconto?fmt(q.sconto):'')+'" placeholder="0"></div>'+
     '<div class="trow"><span>'+T('taxable')+'</span><b dir="ltr">'+eur(t.imp)+'</b></div>'+
     '<label class="toggle"><span>🧾 '+T('withIva')+'</span><input type="checkbox" id="qiva"'+(q.iva?' checked':'')+'></label>'+
     (q.iva?'<div class="seg" style="margin-top:8px">'+vatRates().map(function(r){return '<button class="chip'+(qRate(q)===r?' on':'')+'" data-act="qrate" data-v="'+r+'">IVA '+r+'%</button>'}).join('')+'</div>'+
       '<div class="trow"><span>'+T('iva')+' '+qRate(q)+'%</span><b dir="ltr">'+eur(t.iva)+'</b></div>':'')+
     '<div class="trow big"><span>'+T('total')+'</span><b dir="ltr">'+eur(t.tot)+'</b></div>'+
     (q.iva?'':'<div class="mini" style="text-align:end;margin-top:4px">'+T('noIvaNote')+'</div>')+
     '<button class="btn ghost" style="width:100%;margin-top:10px;color:var(--danger)" data-act="qclear">'+T('clear')+'</button></div>';
  }
  h+='<button class="btn main" data-act="qcustom">'+T('customExtra')+'</button>';
  h+='<div class="sec" style="margin-top:18px">📋 '+T('services')+'</div>';
  DB.svc.filter(function(g){return !g.hidden}).forEach(function(g){
    h+='<div class="sec" style="color:var(--sub)">'+esc(g.ic||'')+' '+esc(N(g))+'</div><div class="list">'+
     g.list.filter(function(x){return !x.hidden}).map(function(x){
       var have=0;q.lines.forEach(function(l){if(l.sid===x.id)have+=l.qty});
       return '<button class="row" data-act="svc" data-v="'+x.id+'"><div class="t"><b>'+esc(N(x))+'</b><span dir="ltr" style="text-align:start">'+eur(x.price)+' / '+sunit(x.unit)+'</span></div>'+
        (have?'<span class="have">'+fmt(have)+'</span>':'')+'<span class="plus">+</span></button>'}).join('')+'</div>';
  });
  return h;
}
// o = lavoro del listino ({id,...}) oppure riga ({sid,...}); idx = indice se si modifica una riga
function quoteLineSheet(o,idx){
  var editing=idx!=null, sid=o.sid||(SBY[o.id]?o.id:null), isFree=!sid;
  var qty=editing?o.qty:1, price=o.price, u=o.unit||'pz';
  openSheet('<h2>'+(isFree&&!editing?T('customExtra').replace(/^\S+\s/,''):esc(N(o)))+'</h2>'+
   (isFree?'<div class="field"><label>'+T('descr')+'</label><input id="qd" value="'+esc(editing?N(o):'')+'"></div>'+
     '<div class="field"><label>'+T('unit')+'</label><div class="chips">'+Object.keys(SERVICE_UNITS).map(function(k){return '<button class="chip'+(k===u?' on':'')+'" data-su="'+k+'">'+sunit(k)+'</button>'}).join('')+'</div></div>':'')+
   '<h3>'+T('qty')+'</h3><div class="qty-big"><button data-s="-">−</button><input id="sq" inputmode="decimal" value="'+fmt(qty)+'"><button data-s="+">+</button><span class="u" id="qu">'+sunit(u)+'</span></div>'+
   '<div class="quick">'+[1,2,5,10,20].map(function(n){return '<button class="chip" data-quick="'+n+'">'+n+'</button>'}).join('')+'</div>'+
   '<div class="field"><label>'+T('unitPrice')+'</label><input id="qp" inputmode="decimal" dir="ltr" value="'+(price!=null?fmt(price):'')+'" style="font-size:20px;font-weight:700"></div>'+
   '<div class="trow big" style="margin-top:12px"><span>'+T('lineTotal')+'</span><b id="qlt" dir="ltr"></b></div>'+
   '<button class="btn main" id="qadd">'+(editing?T('save'):T('addToQuote'))+'</button>');
  wireQty(1);
  function upd(){$('#qlt').textContent=eur(num($('#sq').value)*num($('#qp').value))}
  sheet.querySelectorAll('[data-s],[data-quick]').forEach(function(b){b.addEventListener('click',function(){setTimeout(upd,0)})});
  $('#sq').oninput=upd; $('#qp').oninput=upd; upd();
  sheet.querySelectorAll('[data-su]').forEach(function(b){b.onclick=function(){u=b.dataset.su;sheet.querySelectorAll('[data-su]').forEach(function(x){x.classList.toggle('on',x.dataset.su===u)});$('#qu').textContent=sunit(u)}});
  $('#qadd').onclick=function(){
    var n=num($('#sq').value), raw=$('#qp').value.trim(), pr=raw===''?null:num(raw), q=cur().quote;
    if(n<=0){toast(T('needQty'));return}
    if(pr==null){toast(T('needPrice'));return}
    var line;
    if(isFree){var d=$('#qd').value.trim();if(!d){toast(T('needName'));return}line={sid:null,it:d,ar:d,unit:u,price:pr,qty:n}}
    else line={sid:sid,it:o.it,ar:o.ar,fr:o.fr,en:o.en,unit:o.unit,price:pr,qty:n};
    if(editing) q.lines[idx]=line;
    else{
      var ex=q.lines.find(function(l){return l.sid&&l.sid===line.sid&&l.price===line.price});
      if(ex) ex.qty=Math.round((ex.qty+n)*100)/100; else q.lines.push(line);
    }
    save();closeSheet();if(!editing)toast(T('addedQ')+' '+N(line));render();
  };
}

/* =====================================================================
   CALCOLI ELETTRICI / الحسابات
   Valori indicativi (rame, PVC 70°C, 30°C ambiente). Verificare sempre con CEI 64-8.
   ===================================================================== */
function CT(k){var C=window.LM_CALC||{};return (C[settings.ui]||C.it||{})[k]||k}
function n2(x,d){if(!isFinite(x))return '—';var p=Math.pow(10,d==null?2:d);var v=Math.round(x*p)/p;return String(v).replace('.',settings.ui==='en'?'.':',')}
var SECTIONS=[1.5,2.5,4,6,10,16,25,35,50,70,95];
var IZ2={1.5:17.5,2.5:24,4:32,6:41,10:57,16:76,25:101,35:125,50:151,70:192,95:232};   // 2 conduttori carichi, posa B
var IZ3={1.5:15.5,2.5:21,4:28,6:36,10:50,16:68,25:89,35:110,50:134,70:171,95:207};   // 3 conduttori carichi, posa B
var POSA_K={b:1,c:1.12,d:0.95};
var BREAKERS=[6,10,13,16,20,25,32,40,50,63,80,100,125];
var RHO=0.0225; // ohm·mm²/m rame a 70°C
function dropPct(sys,I,L,S,V,cos){var k=sys==='tri'?Math.sqrt(3):2;return k*L*I*RHO*(cos||1)/S/V*100}
function loadCurrent(sys,P,V,cos){ // P in W
  if(sys==='tri') return P/(Math.sqrt(3)*V*(cos||1));
  if(sys==='dc') return P/V;
  return P/(V*(cos||1));
}
var CALCS=[
 {id:'ohm',ic:'Ω',f:[['V','voltage'],['I','current'],['R','resist'],['P','powerW']],run:function(v){
   var V=v.V,I=v.I,R=v.R,P=v.P,n=[V,I,R,P].filter(function(x){return x>0}).length;
   if(n<2) return '<div class="mini">'+CT('needTwo')+'</div>';
   for(var k=0;k<3;k++){
     if(!(V>0)){if(I>0&&R>0)V=I*R;else if(P>0&&I>0)V=P/I;else if(P>0&&R>0)V=Math.sqrt(P*R)}
     if(!(I>0)){if(V>0&&R>0)I=V/R;else if(P>0&&V>0)I=P/V;else if(P>0&&R>0)I=Math.sqrt(P/R)}
     if(!(R>0)){if(V>0&&I>0)R=V/I;else if(V>0&&P>0)R=V*V/P;else if(P>0&&I>0)R=P/(I*I)}
     if(!(P>0)){if(V>0&&I>0)P=V*I}
   }
   return res([[CT('voltage'),n2(V)+' V'],[CT('current'),n2(I,3)+' A'],[CT('resist'),n2(R,3)+' Ω'],[CT('powerW'),n2(P)+' W']]);
 }},
 {id:'power',ic:'⚡',f:[['sys','sys','sel',[['mono','mono'],['tri','tri'],['dc','dc']]],['P','powerKW'],['I','current'],['cos','cosphi','num',null,0.9]],run:function(v){
   var V=v.sys==='tri'?400:v.sys==='dc'?(v.V||24):230, cos=v.sys==='dc'?1:(v.cos||1);
   if(v.P>0){var I=loadCurrent(v.sys,v.P*1000,V,cos);return res([[CT('current'),n2(I)+' A'],['kVA',n2(v.P/cos)],[CT('voltage'),V+' V']])+'<div class="mini">'+CT('cosHint')+'</div>'}
   if(v.I>0){var P=v.sys==='tri'?Math.sqrt(3)*V*v.I*cos:V*v.I*cos;return res([[CT('powerKW'),n2(P/1000)+' kW'],['kVA',n2(P/1000/cos)],[CT('voltage'),V+' V']])+'<div class="mini">'+CT('cosHint')+'</div>'}
   return '<div class="mini">'+CT('needLoad')+'</div>';
 }},
 {id:'cable',ic:'〰️',f:[['sys','sys','sel',[['mono','mono'],['tri','tri']]],['P','powerKW'],['I','current'],['L','length','num',null,20],['cos','cosphi','num',null,0.9],['max','maxDrop','num',null,4],['posa','posa','sel',[['b','posa1'],['c','posa2'],['d','posa3']]]],run:function(v){
   var V=v.sys==='tri'?400:230, cos=v.cos||1, Ib=v.I>0?v.I:(v.P>0?loadCurrent(v.sys,v.P*1000,V,cos):0);
   if(!(Ib>0)) return '<div class="mini">'+CT('needLoad')+'</div>';
   var tab=v.sys==='tri'?IZ3:IZ2, k=POSA_K[v.posa||'b']||1, L=v.L||0, max=v.max||4;
   var In=BREAKERS.filter(function(b){return b>=Ib})[0];
   if(!In) return '<div class="warn">'+CT('tooBig')+'</div>';
   var pick=null, rows='';
   SECTIONS.forEach(function(S){
     var Iz=tab[S]*k, d=dropPct(v.sys,Ib,L,S,V,cos), good=Iz>=In&&d<=max;
     if(good&&!pick) pick={S:S,Iz:Iz,d:d};
     if(S<=50) rows+='<tr'+(pick&&pick.S===S?' style="background:#E5F7EC;font-weight:700"':'')+'><td>'+S+' mm²</td><td>'+n2(Iz,0)+' A</td><td>'+n2(d)+' %</td><td>'+(good?'✓':'✗')+'</td></tr>';
   });
   if(!pick) return '<div class="warn">'+CT('tooBig')+'</div>';
   return res([[CT('loadI'),n2(Ib)+' A'],[CT('recSection'),'<b style="font-size:20px">'+pick.S+' mm²</b>'],[CT('breaker'),In+' A'+(v.sys==='tri'?' 4P':' 1P+N')],[CT('capacity'),n2(pick.Iz,0)+' A'],[CT('drop'),n2(pick.d)+' %'],[CT('rcd'),'30 mA · '+CT('rcdTip')]])+
    '<table class="ctab"><tr><th>mm²</th><th>Iz</th><th>ΔV</th><th></th></tr>'+rows+'</table>';
 }},
 {id:'vdrop',ic:'📉',f:[['sys','sys','sel',[['mono','mono'],['tri','tri'],['dc','dc']]],['I','current'],['L','length','num',null,20],['S','section','sel',[[1.5,'1.5'],[2.5,'2.5'],[4,'4'],[6,'6'],[10,'10'],[16,'16'],[25,'25']]],['V','voltage','num',null,230],['cos','cosphi','num',null,0.9]],run:function(v){
   if(!(v.I>0)) return '<div class="mini">'+CT('needLoad')+'</div>';
   var V=v.V||(v.sys==='tri'?400:230), d=dropPct(v.sys==='dc'?'mono':v.sys,v.I,v.L||0,+v.S||1.5,V,v.sys==='dc'?1:(v.cos||1));
   return res([[CT('drop'),n2(d*V/100)+' V'],[CT('drop'),'<b style="font-size:20px">'+n2(d)+' %</b>'],[CT('result'),d<=4?CT('ok'):CT('ko')]]);
 }},
 {id:'led',ic:'🌈',f:[['L','stripLen','num',null,5],['W','wpm','num',null,14.4],['V','ledV','sel',[[24,'24 V'],[12,'12 V'],[48,'48 V']]],['d','psuDist','num',null,2],['S','feedSec','sel',[[0.5,'0.5'],[0.75,'0.75'],[1,'1'],[1.5,'1.5'],[2.5,'2.5'],[4,'4']]]],run:function(v){
   var L=v.L||0,W=L*(v.W||0),V=+v.V||24; if(!(W>0)) return '<div class="mini">'+CT('needLoad')+'</div>';
   var need=W*1.2, PSU=[15,30,36,60,75,100,120,150,185,200,240,320,480,600], psu=PSU.filter(function(x){return x>=need})[0];
   var I=W/V, run={12:5,24:10,48:20}[V]||10, feeds=Math.max(1,Math.ceil(L/run));
   var d=v.d||0, S=+v.S||1, drop=2*d*I*0.0178/S/V*100;
   var minS=[0.5,0.75,1,1.5,2.5,4,6,10].filter(function(s){return 2*d*I*0.0178/s/V*100<=3})[0];
   return res([[CT('totW'),n2(W,1)+' W'],[CT('current'),n2(I)+' A'],[CT('psu'),psu?'<b style="font-size:20px">'+psu+' W · '+V+' V</b>':CT('manyPsu')],[CT('maxRun'),run+' m'],[CT('feeds'),feeds],[CT('drop')+' ('+S+' mm²)',n2(drop)+' % '+(drop<=3?'✓':'✗')],[CT('minFeedSec'),minS?minS+' mm²':'> 10 mm²']])+
    (feeds>1?'<div class="note">'+CT('feedTip')+'</div>':'');
 }},
 {id:'lux',ic:'💡',f:[['A','area','num',null,20],['room','room','sel',[[100,'Corridoio / Corridor · 100 lx'],[150,'Camera / Bedroom · 150 lx'],[200,'Soggiorno, bagno / Living, bath · 200 lx'],[300,'Cucina / Kitchen · 300 lx'],[500,'Ufficio, negozio / Office, shop · 500 lx'],[750,'Laboratorio / Workshop · 750 lx'],[200.1,'Magazzino / Warehouse · 200 lx']]],['lm','lmFix','num',null,800]],run:function(v){
   var lx=Math.round(+v.room||200), need=lx*(v.A||0)/0.6; if(!(need>0)) return '';
   var n=Math.ceil(need/(v.lm||800));
   return res([[CT('lmNeed'),n2(need,0)+' lm'],[CT('fixtures'),'<b style="font-size:20px">'+n+'</b>'],[CT('estW'),'≈ '+n2(need/100,0)+' W']]);
 }},
 {id:'tube',ic:'⭕',f:[['D','tubeD','sel',[[16,'Ø16'],[20,'Ø20'],[25,'Ø25'],[32,'Ø32'],[40,'Ø40'],[50,'Ø50']]],['S','section','sel',[[1,'1'],[1.5,'1.5'],[2.5,'2.5'],[4,'4'],[6,'6'],[10,'10'],[16,'16']]],['n','wires','num',null,0]],run:function(v){
   var DI={16:10.7,20:14.1,25:18.3,32:24.3,40:31.2,50:39.6}[+v.D||20], DC={1:2.6,1.5:3,2.5:3.6,4:4.2,6:4.8,10:6.2,16:7.4}[+v.S||1.5];
   var max=Math.floor(0.4*DI*DI/(DC*DC)), out=[[CT('maxWires'),'<b style="font-size:20px">'+max+'</b>']];
   if(v.n>0){var f=v.n*DC*DC/(DI*DI)*100;out.push([CT('fill'),n2(f,0)+' % '+(f<=40?'✓':'✗')])}
   return res(out)+'<div class="mini">'+CT('tubeTip')+'</div>';
 }},
 {id:'energy',ic:'🔋',f:[['W','powerW','num',null,2000],['h','hoursDay','num',null,2],['g','daysMonth','num',null,30],['p','priceKwh','num',null,0.25]],run:function(v){
   var d=(v.W||0)*(v.h||0)/1000, m=d*(v.g||30), pr=v.p||0;
   return res([[CT('perDay'),n2(d)+' kWh · '+eur(d*pr)],[CT('perMonth'),n2(m,1)+' kWh · <b>'+eur(m*pr)+'</b>'],[CT('perYear'),n2(d*365,0)+' kWh · '+eur(d*365*pr)]]);
 }},
 {id:'conv',ic:'🔁',f:[['kw','powerKW','num',null,1],['cv','CV / HP','num',null,0],['cos','cosphi','num',null,0.9]],run:function(v){
   var o=[];
   if(v.kw>0) o.push(['kW → CV',n2(v.kw*1.35962)+' CV'],['kW → HP',n2(v.kw*1.34102)+' HP'],['kW → kVA',n2(v.kw/(v.cos||1))+' kVA']);
   if(v.cv>0) o.push(['CV → kW',n2(v.cv*0.7355)+' kW']);
   var awg=[['0.5','20'],['0.75','18'],['1','17'],['1.5','16'],['2.5','14'],['4','12'],['6','10'],['10','8'],['16','6'],['25','4'],['35','2'],['50','1/0']];
   return res(o)+'<table class="ctab"><tr><th>mm²</th><th>AWG</th></tr>'+awg.map(function(a){return '<tr><td>'+a[0]+'</td><td>'+a[1]+'</td></tr>'}).join('')+'</table>';
 }},
 {id:'ref',ic:'📘',f:[],run:function(){
   function dot2(c){return '<span class="dot" style="background:'+c+'"></span>'}
   return '<h3>'+CT('colorsRef')+'</h3>'+res([[CT('phase')+' L1 / L2 / L3',dot2('#7A4A21')+dot2('#111')+dot2('#8A8F99')],[CT('neutral')+' N',dot2('#1E5BD6')],[CT('earth'),dot2('linear-gradient(135deg,#F2D200 50%,#1F9D3A 50%)')]])+
    '<h3>'+CT('ipRef')+'</h3><table class="ctab"><tr><th>IP</th><th>⛏️ / 💧</th></tr>'+[['IP20','dita / fingers · —'],['IP44','> 1 mm · spruzzi / splashes'],['IP55','polvere / dust · getti / jets'],['IP65','stagno polvere / dust-tight · getti / jets'],['IP66','stagno / dust-tight · getti forti / strong jets'],['IP67','stagno / dust-tight · immersione 1 m'],['IP68','stagno / dust-tight · immersione continua']].map(function(r){return '<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td></tr>'}).join('')+'</table>'+
    '<h3>'+CT('brRef')+'</h3><div class="mini" dir="ltr">'+BREAKERS.join(' · ')+' A — curve B (luce/lighting), C (prese, motori / sockets, motors), D (motori pesanti / heavy motors)</div>'+
    '<h3>'+CT('rcdRef')+'</h3><table class="ctab">'+[['AC','corrente alternata / AC only'],['A','+ pulsante (lavatrici, piani induzione) / pulsating DC'],['F','+ inverter monofase (climatizzatori) / single-phase inverters'],['B','+ DC continua (wallbox, FV, inverter trifase) / smooth DC']].map(function(r){return '<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td></tr>'}).join('')+'</table>';
 }}
];
function res(rows){return '<div class="card cres">'+rows.map(function(r){return '<div class="trow"><span>'+r[0]+'</span><b dir="ltr">'+r[1]+'</b></div>'}).join('')+'</div>'}
/* ---- calcoli per l'edilizia (mestiere 'edi') ---- */
function bags(kg,size){size=size||25;return Math.ceil(kg/size)}
var CALCS_EDI=[
 {id:'tiles',ic:'🔲',f:[['A','areaM2','num',null,20],['w','waste','num',null,10],['b','boxM2','num',null,1.44],['g','glueKg','num',null,5]],run:function(v){
   var A=v.A||0; if(!(A>0)) return '<div class="mini">'+CT('needArea')+'</div>';
   var tot=A*(1+(v.w||0)/100), boxes=v.b>0?Math.ceil(tot/v.b):0, glue=A*(v.g||5), grout=A*0.5;
   return res([[CT('m2Buy'),'<b style="font-size:20px">'+n2(tot,1)+' m²</b>'],[CT('boxes'),boxes||'—'],[CT('glue'),n2(glue,0)+' kg · '+bags(glue)+' × 25 kg'],[CT('grout'),n2(grout,1)+' kg · '+bags(grout,5)+' × 5 kg']])+'<div class="mini">'+CT('tilesTip')+'</div>';
 }},
 {id:'paint',ic:'🎨',f:[['A','areaM2','num',null,50],['c','coats','num',null,2],['y','yieldL','num',null,10],['k','bucketL','sel',[[14,'14 L'],[5,'5 L'],[10,'10 L'],[4,'4 L']]]],run:function(v){
   var A=v.A||0; if(!(A>0)) return '<div class="mini">'+CT('needArea')+'</div>';
   var L=A*(v.c||2)/(v.y||10), k=+v.k||14;
   return res([[CT('liters'),'<b style="font-size:20px">'+n2(L,1)+' L</b>'],[CT('buckets'),Math.ceil(L/k)+' × '+k+' L'],[CT('primer'),n2(A/10,1)+' L']])+'<div class="mini">'+CT('paintTip')+'</div>';
 }},
 {id:'drywall',ic:'📐',f:[['L','wallLen','num',null,4],['H','wallH','num',null,2.7],['s','sides','sel',[[2,'2'],[1,'1']]],['p','plate','sel',[['3.6','1,2 × 3 m'],['3','1,2 × 2,5 m'],['2.4','1,2 × 2 m']]]],run:function(v){
   var L=v.L||0,H=v.H||0; if(!(L>0&&H>0)) return '<div class="mini">'+CT('needArea')+'</div>';
   var A=L*H, sides=+v.s||2, plates=Math.ceil(A*sides*1.05/(+v.p||3.6)), studs=Math.ceil(L/0.6)+1, track=Math.ceil(L*2/3);
   return res([[CT('area'),n2(A,1)+' m²'],[CT('plates'),'<b style="font-size:20px">'+plates+'</b>'],[CT('studs'),studs+' × '+n2(H,2)+' m'],[CT('tracks'),track+' × 3 m'],[CT('screws'),Math.ceil(A*sides*25)],[CT('joint'),n2(A*sides*0.5,1)+' kg'],[CT('tape'),Math.ceil(A*sides*1.5)+' m']])+'<div class="mini">'+CT('dryTip')+'</div>';
 }},
 {id:'screed',ic:'🟫',f:[['A','areaM2','num',null,20],['t','thickCm','num',null,5],['r','kgM2cm','num',null,20]],run:function(v){
   var A=v.A||0,t=v.t||0; if(!(A>0&&t>0)) return '<div class="mini">'+CT('needArea')+'</div>';
   var kg=A*t*(v.r||20);
   return res([[CT('volume'),n2(A*t/100,2)+' m³'],[CT('kgTot'),n2(kg,0)+' kg'],[CT('bags25'),'<b style="font-size:20px">'+bags(kg)+'</b>']])+'<div class="mini">'+CT('screedTip')+'</div>';
 }},
 {id:'plaster',ic:'🧽',f:[['A','areaM2','num',null,30],['t','thickCm','num',null,1.5],['r','kgM2cm','num',null,13]],run:function(v){
   var A=v.A||0,t=v.t||0; if(!(A>0&&t>0)) return '<div class="mini">'+CT('needArea')+'</div>';
   var kg=A*t*(v.r||13);
   return res([[CT('kgTot'),n2(kg,0)+' kg'],[CT('bags25'),'<b style="font-size:20px">'+bags(kg)+'</b>']])+'<div class="mini">'+CT('plasterTip')+'</div>';
 }},
 {id:'bricks',ic:'🧱',f:[['A','wallM2','num',null,10],['b','block','sel',[[16,'blkF25'],[8,'blkF50'],[10,'blkCem'],[6.7,'blkCel'],[50,'blkPie']]],['w','waste','num',null,5]],run:function(v){
   var A=v.A||0; if(!(A>0)) return '<div class="mini">'+CT('needArea')+'</div>';
   var per=+v.b||16, pcs=Math.ceil(A*per*(1+(v.w||0)/100)), mortar=A*(per>=50?60:per>=10?25:15);
   return res([[CT('perM2'),per],[CT('pieces'),'<b style="font-size:20px">'+pcs+'</b>'],[CT('mortar'),n2(mortar,0)+' kg · '+bags(mortar)+' × 25 kg']])+'<div class="mini">'+CT('bricksTip')+'</div>';
 }},
 {id:'concrete',ic:'🏗️',f:[['L','lenM','num',null,3],['W','widM','num',null,3],['H','thickM','num',null,0.1],['c','cementKg','num',null,300]],run:function(v){
   var V=(v.L||0)*(v.W||0)*(v.H||0); if(!(V>0)) return '<div class="mini">'+CT('needArea')+'</div>';
   var cem=V*(v.c||300);
   return res([[CT('volume'),'<b style="font-size:20px">'+n2(V,2)+' m³</b>'],[CT('cement'),n2(cem,0)+' kg · '+bags(cem)+' × 25 kg'],[CT('sand'),n2(V*0.45,2)+' m³'],[CT('gravel'),n2(V*0.85,2)+' m³'],[CT('water'),n2(V*180,0)+' L']])+'<div class="mini">'+CT('concTip')+'</div>';
 }}
];
function activeCalcs(){var td=tradeData();return td?CALCS_EDI.filter(function(c){return (td.calcs||[]).indexOf(c.id)>=0}):CALCS}
var CBYID={};CALCS.concat(CALCS_EDI).forEach(function(c){CBYID[c.id]=c});
function calcVals(c){
  var saved=(settings.calcVals||{})[c.id]||{}, v={};
  c.f.forEach(function(f){var k=f[0];v[k]=saved[k]!=null?saved[k]:(f[2]==='sel'?f[3][0][0]:(f[4]!=null?f[4]:''))});
  return v;
}
function renderCalc(){
  var h='<div class="adm-head"><b>🧮 '+CT('calc')+'</b>'+(view.calc?'<button data-act="calcback">'+(settings.ui==='ar'?'→':'←')+' '+CT('allCalc')+'</button>':'')+'<button data-act="calcclose">✕</button></div>';
  if(!view.calc){
    return h+'<div class="note" style="margin:0 0 12px">'+CT(tradeData()?'calcSubEdi':'calcSub')+'</div><div class="menu">'+activeCalcs().map(function(c){
      return '<button data-act="calcopen" data-v="'+c.id+'"><span class="ic" style="min-width:32px;text-align:center">'+c.ic+'</span><div><b>'+CT(c.id)+'</b><span>'+CT(c.id+'Sub')+'</span></div></button>'}).join('')+'</div>';
  }
  var c=CBYID[view.calc], v=calcVals(c);
  h+='<div class="sec" style="font-size:16px">'+c.ic+' '+CT(c.id)+'</div>';
  if(c.f.length){
    h+='<div class="card">'+c.f.map(function(f){
      var k=f[0],lab=CT(f[1]);
      if(f[2]==='sel') return '<div class="field"><label>'+lab+'</label><div class="chips">'+f[3].map(function(o){return '<button class="chip'+(String(v[k])===String(o[0])?' on':'')+'" data-cs-k="'+k+'" data-cs-v="'+o[0]+'">'+esc(CT(o[1]))+'</button>'}).join('')+'</div></div>';
      return '<div class="field"><label>'+lab+'</label><input data-cf="'+k+'" inputmode="decimal" dir="ltr" value="'+(v[k]===''||v[k]==null?'':esc(v[k]))+'"></div>';
    }).join('')+'</div>';
  }
  h+='<div id="cres">'+calcRun(c,v)+'</div>';
  return h;
}
function calcRun(c,v){
  var x={};Object.keys(v).forEach(function(k){var s=String(v[k]).replace(',','.');x[k]=s===''?0:(isNaN(+s)?v[k]:+s)});
  try{return c.run(x)}catch(e){return ''}
}
function calcSet(k,val){
  var c=CBYID[view.calc]; if(!c) return;
  settings.calcVals=settings.calcVals||{}; var v=calcVals(c); v[k]=val; settings.calcVals[c.id]=v; saveSettings();
  var r=$('#cres'); if(r) r.innerHTML=calcRun(c,v);
}

/* =====================================================================
   COLLAUDO E ORE DI LAVORO (per progetto)
   ===================================================================== */
function chkList(){var td=tradeData();return (td&&td.check)||window.LM_CHECK||[]}
function chkName(i){var r=chkList()[i]||[];return r[{ar:0,it:1,en:2,fr:3}[settings.ui]]||r[1]||''}
function checkSheet(){
  var p=cur(); p.check=p.check||{}; var L=chkList();
  function draw(){
    var done=L.filter(function(_,i){return p.check[i]}).length;
    openSheet('<h2>✅ '+CT('check')+' <span class="mini">'+done+'/'+L.length+'</span></h2>'+L.map(function(_,i){
      return '<label class="toggle" style="margin-top:6px"><span>'+esc(chkName(i))+'</span><input type="checkbox" data-ck="'+i+'"'+(p.check[i]?' checked':'')+'></label>'}).join('')+
     '<button class="btn main" id="ckShare">'+CT('shareCheck')+'</button>');
    sheet.querySelectorAll('[data-ck]').forEach(function(b){b.onchange=function(){p.check[b.dataset.ck]=b.checked;save();var s=sheet.scrollTop;draw();sheet.scrollTop=s}});
    $('#ckShare').onclick=function(){
      var t='✅ '+CT('check')+(p.site.cliente?' — '+p.site.cliente:'')+'\n'+dateTxt()+'\n\n'+L.map(function(_,i){return (p.check[i]?'✅ ':'⬜ ')+chkName(i)}).join('\n');
      if(A&&A.shareText)A.shareText(t);else if(navigator.share)navigator.share({text:t}).catch(function(){});else{try{navigator.clipboard.writeText(t);toast(T('copied'))}catch(e){}}
    };
  }
  draw();
}
function hoursSheet(){
  var p=cur(); p.hours=p.hours||[];
  function tot(){return p.hours.reduce(function(a,h){return a+(+h.h||0)},0)}
  function draw(){
    openSheet('<h2>⏱️ '+CT('hours')+'</h2>'+
     '<div class="row2"><div class="field" style="flex:1.2"><label>'+CT('date')+'</label><input type="date" id="hD" value="'+new Date().toISOString().slice(0,10)+'"></div><div class="field" style="flex:.8"><label>'+CT('nHours')+'</label><input id="hH" inputmode="decimal" dir="ltr" placeholder="8"></div></div>'+
     '<div class="field"><label>'+CT('who')+'</label><input id="hW"></div>'+
     '<button class="btn main" id="hAdd">'+CT('addHours')+'</button>'+
     '<div class="list" style="margin-top:14px">'+(p.hours.length?p.hours.slice().reverse().map(function(h,ri){var i=p.hours.length-1-ri;
        return '<div class="line"><div class="t"><b dir="ltr" style="text-align:start">'+esc(h.d.split('-').reverse().join('/'))+' · '+n2(+h.h,2)+' h</b>'+(h.w?'<span>'+esc(h.w)+'</span>':'')+'</div><button class="del" data-hdel="'+i+'">🗑</button></div>'}).join(''):'<div class="mini" style="padding:12px">'+CT('noHours')+'</div>')+'</div>'+
     '<div class="trow big"><span>'+CT('totHours')+'</span><b dir="ltr">'+n2(tot(),2)+' h</b></div>'+
     (tot()>0?'<button class="btn ghost" style="width:100%;margin-top:10px" id="hQuote">'+CT('toQuote')+'</button>':''));
    $('#hAdd').onclick=function(){var h=num($('#hH').value);if(!(h>0)){toast(T('needQty'));return}p.hours.push({d:$('#hD').value||new Date().toISOString().slice(0,10),h:h,w:$('#hW').value.trim()});save();draw()};
    sheet.querySelectorAll('[data-hdel]').forEach(function(b){b.onclick=function(){p.hours.splice(+b.dataset.hdel,1);save();draw()}});
    var q=$('#hQuote'); if(q) q.onclick=function(){
      var s=SBY.s_ora||SBY.e_hmur||{id:'s_ora',it:'Ora di lavoro',ar:'ساعة عمل',unit:'h',price:30};
      var Q=cur().quote, ex=Q.lines.find(function(l){return l.sid===s.id&&l.fromHours});
      if(ex) ex.qty=tot(); else Q.lines.push({sid:s.id,it:s.it,ar:s.ar,en:s.en,fr:s.fr,unit:'h',price:s.price,qty:tot(),fromHours:1});
      save();closeSheet();view.tab='price';render();toast(T('addedQ')+' '+n2(tot(),2)+' h');
    };
  }
  draw();
}

/* =====================================================================
   PROGETTI / المشاريع
   ===================================================================== */
function projTitle(p){var pl=placeOf(p.site.luogo);return p.name||[p.site.cliente,p.site.indirizzo].filter(Boolean).join(' – ')||(pl?N(pl):'')||T('noName')}
function dstr(t){var d=new Date(t);function z(n){return (n<10?'0':'')+n}return z(d.getDate())+'/'+z(d.getMonth()+1)+'/'+d.getFullYear()+' '+z(d.getHours())+':'+z(d.getMinutes())}
var projQ='';
function renderProjects(){
  prune();
  var words=norm(projQ).split(' ').filter(Boolean);
  var list=P.list.filter(ofTrade).sort(function(a,b){return b.updated-a.updated}).filter(function(p){
    if(isEmpty(p)&&p.id!==P.cur) return false;
    var s=norm(projTitle(p)+' '+p.site.cliente+' '+p.site.indirizzo);return words.every(function(w){return s.indexOf(w)>=0})});
  var h='<div class="adm-head"><b>'+T('projects')+'</b><button data-act="projclose">✕</button></div>'+
   '<button class="btn main" style="margin:0 0 12px" data-act="projnew">'+T('newProj')+'</button>'+
   '<div class="search" style="margin:0 0 12px;border:1px solid var(--line)"><span>🔍</span><input id="pq" type="search" value="'+esc(projQ)+'" placeholder="'+T('searchProj')+'"></div>';
  if(!list.length) return h+'<div class="empty"><div class="big">📁</div>'+T('projEmpty')+'</div>';
  h+='<div class="list">'+list.map(function(p){
    var isCur=p.id===P.cur;
    return '<div class="proj'+(isCur?' cur':'')+'"><button class="t" data-act="projopen" data-v="'+p.id+'"><b>'+esc(projTitle(p))+(isCur?'<span class="tag">'+T('current')+'</span>':'')+'</b><span>'+p.lines.length+' '+T('lines')+' · '+dstr(p.updated)+'</span></button>'+
      '<div class="tools"><button data-act="projdup" data-v="'+p.id+'" title="'+T('dup')+'">⧉</button><button data-act="projdel" data-v="'+p.id+'" title="'+T('del')+'">🗑</button></div></div>';
  }).join('')+'</div>';
  return h;
}
function openProject(id){P.cur=id;prune();save();view.tab='mat';view.cat=null;clearSearch();render();toast(T('opened')+' '+projTitle(cur()))}
function newProject(){save();var p=blankProj();P.list.unshift(p);P.cur=p.id;prune();save();view.tab='mat';view.cat=null;clearSearch();render();window.scrollTo(0,0)}
function saveSheet(){
  var p=cur();
  openSheet('<h2>'+T('saveT')+'</h2><div class="it">'+T('saveHint')+'</div>'+
   '<div class="field"><label>'+T('projName')+'</label><input id="pn" value="'+esc(p.name||projTitle(p)===T('noName')?p.name:projTitle(p))+'" placeholder="'+T('projNameP')+'"></div>'+
   '<button class="btn main" id="psave">'+T('save')+'</button>'+
   '<div class="row2" style="margin-top:10px"><button class="btn ghost" id="pnew">'+T('newProj')+'</button><button class="btn ghost" id="plist">'+T('projects')+'</button></div>');
  function doSave(){p.name=$('#pn').value.trim();save();toast(T('projSaved'))}
  $('#psave').onclick=function(){doSave();closeSheet();render()};
  $('#pnew').onclick=function(){doSave();closeSheet();newProject()};
  $('#plist').onclick=function(){doSave();closeSheet();view.tab='projects';render();window.scrollTo(0,0)};
}

/* =====================================================================
   FOGLI (sheet)
   ===================================================================== */
var sheet=$('#sheet'), bg=$('#sheetBg'), sheetOpen=false;
function openSheet(html){sheet.innerHTML='<div class="grab"></div>'+html;sheet.scrollTop=0;bg.style.display='block';requestAnimationFrame(function(){sheet.classList.add('open')});sheetOpen=true}
function closeSheet(){sheet.classList.remove('open');bg.style.display='none';sheetOpen=false;if(document.activeElement)document.activeElement.blur()}
var sheetLocked=false;
bg.onclick=function(){if(!sheetLocked)closeSheet()};
function confirmSheet(msg,okText,fn){
  openSheet('<h2>'+msg+'</h2><div class="row2" style="margin-top:18px"><button class="btn ghost" id="cno">'+T('cancel')+'</button><button class="btn" style="background:var(--danger);color:#fff" id="cok">'+okText+'</button></div>');
  $('#cno').onclick=closeSheet; $('#cok').onclick=function(){closeSheet();fn()};
}
function qtyBlock(u,val){
  var quick=u==='m'?[5,10,25,50,100]:[1,2,5,10,20];
  return '<h3>'+T('qty')+'</h3><div class="qty-big"><button data-s="-">−</button><input id="sq" inputmode="decimal" value="'+fmt(val)+'"><button data-s="+">+</button><span class="u">'+N(unit(u))+'</span></div>'+
   '<div class="quick">'+quick.map(function(n){return '<button class="chip" data-quick="'+n+'">'+n+'</button>'}).join('')+'</div>';
}
function wireQty(step){
  var q=$('#sq'); if(!q) return;
  sheet.querySelectorAll('[data-s]').forEach(function(b){b.onclick=function(){var v=num(q.value);v=b.dataset.s==='+'?v+step:Math.max(0,v-step);q.value=fmt(v)}});
  sheet.querySelectorAll('[data-quick]').forEach(function(b){b.onclick=function(){q.value=b.dataset.quick}});
}

function itemSheet(it){
  var U=unit(it.unit), sel=it.sizes.length===1?it.sizes[0]:'';
  var sizes=it.sizes.length?'<h3>'+T('size')+'</h3><div class="chips">'+it.sizes.map(function(s){return '<button class="chip ltr'+(s===sel?' on':'')+'" data-size="'+esc(s)+'">'+esc(s)+'</button>'}).join('')+'</div>':'';
  var colorBlock='';
  if(it.colors){
    colorBlock='<h3>'+T('colors')+'</h3><div class="mini">'+T('colorsHint')+'</div>'+COLORS.map(function(c){
      return '<div class="crow" data-crow="'+c.id+'"><div class="cn">'+dot(c.id)+esc(N(c))+'</div>'+
       '<div class="stepper"><button data-cs="-" data-c="'+c.id+'">−</button><input inputmode="decimal" data-cq="'+c.id+'" value="0"><span class="u">'+N(U)+'</span><button data-cs="+" data-c="'+c.id+'">+</button></div></div>'}).join('');
  }
  openSheet((IMGS[it.id]?'<div style="text-align:center;margin-bottom:8px">'+thumb(it.id,'big')+'</div>':'')+
   '<h2>'+esc(N(it))+'</h2>'+sizes+
   '<div class="field"><label>'+(it.sizes.length?T('sizeOther'):T('sizeFree'))+'</label><input id="szc" placeholder="3 moduli, bianco…"></div>'+
   (it.colors?colorBlock:qtyBlock(it.unit,U.step))+
   '<div class="field"><label>'+T('itemNote')+'</label><input id="sn" placeholder="'+T('itemNoteP')+'"></div>'+
   '<button class="btn main" id="sadd">'+T('add')+'</button>');
  wireQty(U.step);
  sheet.querySelectorAll('[data-cs]').forEach(function(b){b.onclick=function(){
    var inp=sheet.querySelector('[data-cq="'+b.dataset.c+'"]'),v=num(inp.value),st=U.step||1;
    v=b.dataset.cs==='+'?v+st:Math.max(0,v-st);inp.value=fmt(v);markColors()}});
  sheet.querySelectorAll('[data-cq]').forEach(function(i){i.oninput=markColors;i.onfocus=function(){if(i.value==='0')i.value=''}});
  function markColors(){sheet.querySelectorAll('[data-crow]').forEach(function(r){var v=num(sheet.querySelector('[data-cq="'+r.dataset.crow+'"]').value);r.classList.toggle('on',v>0)})}
  sheet.querySelectorAll('[data-size]').forEach(function(b){b.onclick=function(){sel=b.classList.contains('on')?'':b.dataset.size;sheet.querySelectorAll('[data-size]').forEach(function(x){x.classList.toggle('on',x.dataset.size===sel)});$('#szc').value=''}});
  $('#sadd').onclick=function(){
    var size=$('#szc').value.trim()||sel, note=$('#sn').value.trim();
    if(it.sizes.length>1&&!size){toast(T('needSize'));return}
    if(it.colors){
      var any=0;
      COLORS.forEach(function(c){var q=num(sheet.querySelector('[data-cq="'+c.id+'"]').value);if(q>0){any+=q;addLine(lineFromItem(it,size,q,c.id,note))}});
      if(!any){toast(T('needColor'));return}
      addRecent(it.id);closeSheet();toast(T('added')+' '+N(it)+(size?' '+size:''));render();return;
    }
    var qty=num($('#sq').value);
    if(qty<=0){toast(T('needQty'));return}
    addLine(lineFromItem(it,size,qty,'',note));
    addRecent(it.id);closeSheet(); toast(T('added')+' '+qty+' '+N(U)+' '+N(it)); render();
  };
}
function customSheet(name){
  var u='pz';
  openSheet('<h2>➕ '+T('custom')+'</h2><div class="it">'+T('customSub')+'</div>'+
   '<div class="field"><label>'+T('name')+'</label><input id="cn" value="'+esc(name||'')+'"></div>'+
   '<div class="field"><label>'+T('unit')+'</label><div class="chips">'+Object.keys(UNITS).map(function(k){return '<button class="chip'+(k===u?' on':'')+'" data-u="'+k+'">'+N(UNITS[k])+'</button>'}).join('')+'</div></div>'+
   qtyBlock(u,1)+'<div class="field"><label>'+T('itemNote')+'</label><input id="sn"></div><button class="btn main" id="sadd">'+T('add')+'</button>');
  wireQty(1);
  sheet.querySelectorAll('[data-u]').forEach(function(b){b.onclick=function(){u=b.dataset.u;sheet.querySelectorAll('[data-u]').forEach(function(x){x.classList.toggle('on',x.dataset.u===u)})}});
  $('#sadd').onclick=function(){
    var n=$('#cn').value.trim(), qty=num($('#sq').value);
    if(!n){toast(T('needName'));return} if(qty<=0){toast(T('needQty'));return}
    addLine({it:n,ar:n,cat:'x',unit:u,qty:qty,note:$('#sn').value.trim()});
    closeSheet();toast(T('added')+' '+n);render();
  };
}
function partItem(p){return (p.item&&IBY[p.item])||{id:null,it:p.name,ar:p.name,unit:'pz',cat:'x'}}
function kitSheet(k){
  var n=1;
  function partsHtml(){
    return k.parts.map(function(p,j){var it=partItem(p);
      var sub=[p.size?'<span class="ltr">'+esc(p.size)+'</span>':'',p.color?dot(p.color)+esc(colName(p.color,settings.ui)):''].filter(Boolean).join(' · ');
      return '<div class="kitpart">'+(it.id?thumb(it.id):'')+'<div class="t">'+esc(N(it))+(sub?'<span style="text-align:start">'+sub+'</span>':'')+'</div>'+
       '<div class="stepper"><input inputmode="decimal" data-kq="'+j+'" value="'+fmt(p.qty*n)+'"><span class="u">'+N(unit(it.unit))+'</span></div></div>'}).join('');
  }
  var note=settings.ui==='ar'?k.note:(k.noteIt?trName({it:k.noteIt},settings.ui):'');
  openSheet('<h2>'+esc(k.ic||'')+' '+esc(N(k))+'</h2>'+
   '<h3>'+T('howMany')+'</h3><div class="qty-big"><button data-n="-">−</button><input id="kn" inputmode="numeric" value="1"><button data-n="+">+</button></div>'+
   (note?'<div class="note">'+esc(note)+'</div>':'')+
   '<h3>'+T('parts')+'</h3><div id="kp">'+partsHtml()+'</div>'+
   '<div class="field"><label>'+T('kitNote')+'</label><input id="sn" placeholder="'+T('kitNoteP')+'"></div>'+
   '<button class="btn main" id="kadd">'+T('addKit')+'</button>');
  function setN(v){n=Math.max(1,Math.round(v)||1);$('#kn').value=n;$('#kp').innerHTML=partsHtml()}
  sheet.querySelectorAll('[data-n]').forEach(function(b){b.onclick=function(){setN(n+(b.dataset.n==='+'?1:-1))}});
  $('#kn').oninput=function(){var v=parseInt(this.value,10);if(v>0){n=v;$('#kp').innerHTML=partsHtml()}};
  $('#kadd').onclick=function(){
    var nt=$('#sn').value.trim();
    k.parts.forEach(function(p,j){var it=partItem(p);
      var q=num(sheet.querySelector('[data-kq="'+j+'"]').value);
      if(it.id) addLine(lineFromItem(it,p.size,q,p.color,nt));
      else addLine({it:it.it,ar:it.ar,cat:'x',unit:'pz',size:p.size,color:p.color,qty:q,note:nt});
    });
    closeSheet();toast(T('kitAdded')+' '+N(k)+' × '+n);render();
  };
}

/* =====================================================================
   IMPOSTAZIONI
   ===================================================================== */
function segChips(name,curv,opts){return '<div class="seg">'+opts.map(function(o){return '<button class="chip'+(o[0]===curv?' on':'')+'" data-'+name+'="'+o[0]+'">'+o[1]+'</button>'}).join('')+'</div>'}
function appVersion(){try{return (A&&A.version)?A.version():WEB_VERSION}catch(e){return WEB_VERSION}}
function openUrl(u){if(A&&A.open)A.open(u);else if(/^https?:/.test(u))window.open(u,'_blank');else location.href=u}
function openContact(k){
  if(k==='wa'){var t=T('reportMsg')+'\n\n(v'+appVersion()+')';if(A&&A.whatsapp)A.whatsapp(t,CONTACT.num);else openUrl('https://wa.me/'+CONTACT.num+'?text='+encodeURIComponent(t))}
  else if(k==='tel') openUrl('tel:+'+CONTACT.num);
  else if(k==='ig') openUrl('https://www.instagram.com/'+CONTACT.ig+'/');
  else if(k==='tt') openUrl('https://www.tiktok.com/@'+CONTACT.tt);
}
/* ---- professionisti consigliati: gestiti dal proprietario (app admin) in people.json ---- */
var PEOPLE=load(K.people,{ver:0,list:[]});
function prosList(){
  var me=((settings.reg&&settings.reg.paese)||'').toLowerCase();
  return (PEOPLE.list||[]).filter(function(p){return p&&!p.hidden&&p.name}).map(function(p,i){return {p:p,i:i}})
   .sort(function(a,b){var x=(a.p.country||'').toLowerCase()===me?0:1,y=(b.p.country||'').toLowerCase()===me?0:1;return x-y||a.i-b.i}).map(function(o){return o.p});
}
function proPic(p,big){
  var sz=big?96:56;
  if(p.photo&&/^data:image\//.test(p.photo)) return '<img src="'+esc(p.photo)+'" alt="" style="width:'+sz+'px;height:'+sz+'px;border-radius:'+(big?24:14)+'px;object-fit:cover;flex:none;background:#EEF0F4">';
  return '<span style="width:'+sz+'px;height:'+sz+'px;border-radius:'+(big?24:14)+'px;display:grid;place-items:center;background:var(--brand-soft);color:var(--brand);font-weight:800;font-size:'+(big?36:22)+'px;flex:none">'+esc((p.name.trim()[0]||'?').toUpperCase())+'</span>';
}
function prosSection(){
  var L=prosList(); if(!L.length) return '';
  return '<h3 style="margin-top:24px">'+L4(XT.pros)+'</h3><div class="mini">'+L4(XT.prosHint)+'</div><div class="pros">'+
   L.map(function(p){return '<button class="pro" data-pro="'+esc(p.id)+'">'+proPic(p)+'<b>'+esc(p.name)+'</b><span>'+esc(p.job||'')+'</span>'+(p.city||p.country?'<span>📍 '+esc([p.city,p.country].filter(Boolean).join(', '))+'</span>':'')+'</button>'}).join('')+'</div>';
}
function proSheet(id){
  var p=(PEOPLE.list||[]).find(function(x){return x.id===id});if(!p)return;
  var ph=String(p.phone||'').replace(/[^\d+]/g,''), wa=ph.replace(/^\+/,'').replace(/^00/,'');
  openSheet('<div style="display:flex;gap:14px;align-items:center">'+proPic(p,true)+'<div style="min-width:0"><h2>'+esc(p.name)+'</h2>'+(p.job?'<div class="it" style="font-weight:600;color:var(--ink)">'+esc(p.job)+'</div>':'')+
    (p.city||p.country?'<div class="it">📍 '+esc([p.city,p.country].filter(Boolean).join(', '))+'</div>':'')+'</div></div>'+
   (p.services?'<h3>'+L4(XT.services)+'</h3><div style="white-space:pre-wrap;line-height:1.6;font-size:15px" dir="auto">'+esc(p.services)+'</div>':'')+
   (ph?'<div class="ltr mini" style="margin-top:14px;text-align:center;font-size:15px">'+esc(p.phone)+'</div>'+
    '<div class="row2" style="margin-top:8px"><button class="btn wa" id="proWa">WhatsApp</button><button class="btn cp" id="proCall">'+L4(XT.call)+'</button></div>':''));
  if(ph){
    $('#proWa').onclick=function(){ping('/usa/professionista','Contatto professionista');var t=L4(XT.waHello);if(A&&A.whatsapp)A.whatsapp(t,wa);else openUrl('https://wa.me/'+wa+'?text='+encodeURIComponent(t))};
    $('#proCall').onclick=function(){openUrl('tel:'+ph)};
  }
}
function checkPeople(ver){
  if(!ver||ver===PEOPLE.ver) return;
  fetch(UPD_BASE+'people.json?v='+encodeURIComponent(ver),{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
    PEOPLE={ver:ver,list:Array.isArray(j.people)?j.people:[]};put(K.people,PEOPLE);
  }).catch(function(){});
}
function shareApp(){
  var apk=settings.liveApk||'TalabMawad.apk';
  var t=L4(XT.shareAppMsg)+'\n\n'+L4(XT.shareAndroid)+'\n'+(/^https?:/.test(apk)?apk:UPD_BASE+apk)+'\n\n'+L4(XT.shareIos)+'\n'+UPD_BASE;
  ping('/usa/condividi-app','Invia app a un amico');
  if(A&&A.shareText)A.shareText(t);else if(navigator.share)navigator.share({text:t}).catch(function(){});else openUrl('https://wa.me/?text='+encodeURIComponent(t));
}
function settingsSheet(){
  var ui=settings.ui, out=settings.out;
  openSheet('<h2>'+T('settings')+'</h2>'+
   '<h3>'+CT('country')+'</h3>'+segChips('cc',packId(),packList().map(function(p){return [p.id,p.flag+' '+(p.name[settings.ui]||p.name.it)]}))+'<div class="mini">'+CT('countryHint')+'</div>'+
   '<h3>'+L4(XT.tradeT)+'</h3>'+segChips('tr',tradeId(),tradeList().map(function(t){return [t[0],t[1]+' '+(t[2][settings.ui]||t[2].it)]}))+'<div class="mini">'+L4(XT.tradeHint)+'</div>'+
   '<h3>'+T('uiLang')+'</h3>'+segChips('ui',ui,LANGS)+
   '<h3>'+T('outLang')+'</h3>'+segChips('out',out,[['it',T('langIt')],['ar',T('langAr')],['en',T('langEn')],['fr',T('langFr')],['both',T('langBoth')]])+
   '<div class="field"><label>'+T('tecnico')+'</label><input id="st" value="'+esc(settings.tecnico)+'"></div>'+
   '<div class="field"><label>'+T('ditta')+'</label><input id="sd" value="'+esc(settings.ditta)+'" placeholder="'+T('dittaP')+'"></div>'+
   '<div class="field"><label>'+T('waNum')+'</label><input id="sw" class="ltr" inputmode="tel" value="'+esc(settings.waNum)+'" placeholder="'+T('waNumP')+'"></div>'+
   '<div class="mini">'+T('waHint')+'</div>'+
   '<button class="btn main" id="ssave">'+T('save')+'</button>'+
   '<div style="margin-top:22px"></div>'+
   '<div class="mini" style="margin-top:6px">'+T('yourId')+': <b dir="ltr">'+esc(anonId())+'</b>'+(settings.reg?' · '+esc(settings.reg.nome)+' ('+esc(settings.reg.paese)+')':'')+'</div>'+
   '<button class="contact" style="margin-top:16px" id="goAdmin"><span class="ci" style="background:#16192B">🔒</span><div><b>'+T('admin').replace('🔒 ','')+'</b><span>'+T('adminSub')+'</span></div></button>'+
   prosSection()+
   '<button class="contact" style="margin-top:16px" id="shareApp"><span class="ci" style="background:var(--brand)">📤</span><div><b>'+L4(XT.shareApp)+'</b><span>'+L4(XT.shareAppSub)+'</span></div></button>'+
   '<h3 style="margin-top:24px">'+T('contact')+'</h3><div class="mini">'+T('contactHint')+'</div>'+
   '<button class="contact" data-link="wa"><span class="ci" style="background:#1DA851">✉</span><div><b>'+T('report')+'</b><span class="ltr" style="display:block;text-align:start">'+CONTACT.phone+'</span></div></button>'+
   '<button class="btn ghost" style="width:100%;margin-top:16px" id="updChk">'+T('updCheck')+'</button>'+
   '<div class="mini" style="text-align:center;margin-top:14px" dir="ltr">v'+appVersion()+'<br>© 2026 Richiesta materiale – tutti i diritti riservati</div>');
  sheet.querySelectorAll('[data-link]').forEach(function(b){b.onclick=function(){openContact(b.dataset.link)}});
  sheet.querySelectorAll('[data-pro]').forEach(function(b){b.onclick=function(){proSheet(b.dataset.pro)}});
  $('#updChk').onclick=function(){checkUpdate(true)};
  $('#shareApp').onclick=shareApp;
  var cc=packId(), tr=tradeId();
  sheet.querySelectorAll('[data-tr]').forEach(function(b){b.onclick=function(){tr=b.dataset.tr;sheet.querySelectorAll('[data-tr]').forEach(function(x){x.classList.toggle('on',x.dataset.tr===tr)})}});
  sheet.querySelectorAll('[data-cc]').forEach(function(b){b.onclick=function(){cc=b.dataset.cc;sheet.querySelectorAll('[data-cc]').forEach(function(x){x.classList.toggle('on',x.dataset.cc===cc)})}});
  sheet.querySelectorAll('[data-ui]').forEach(function(b){b.onclick=function(){ui=b.dataset.ui;sheet.querySelectorAll('[data-ui]').forEach(function(x){x.classList.toggle('on',x.dataset.ui===ui)})}});
  sheet.querySelectorAll('[data-out]').forEach(function(b){b.onclick=function(){out=b.dataset.out;sheet.querySelectorAll('[data-out]').forEach(function(x){x.classList.toggle('on',x.dataset.out===out)})}});
  function store(){settings.statsOff=false;settings.tecnico=$('#st').value.trim();settings.ditta=$('#sd').value.trim();settings.waNum=$('#sw').value.trim();settings.ui=ui;settings.out=out;saveSettings()}
  $('#ssave').onclick=function(){var ch=cc!==packId(),tch=tr!==tradeId();store();if(ch){setCountry(cc);view.cat=null}if(tch)setTrade(tr);closeSheet();applyLang();render();window.scrollTo(0,0);toast(tch?L4(XT.tradeOn)+' '+tradeLabel():T('saved'))};
  $('#goAdmin').onclick=function(){store();applyLang();if(adminOK){closeSheet();enterAdmin()}else pwSheet()};
}

/* =====================================================================
   PASSWORD (SHA-256)
   ===================================================================== */
function sha256(ascii){
  function rr(v,a){return (v>>>a)|(v<<(32-a))}
  var mp=Math.pow,maxWord=mp(2,32),result='',words=[],asciiBitLength,i,j;
  var str=unescape(encodeURIComponent(ascii)); asciiBitLength=str.length*8;
  var hash=[],k=[],primeCounter=0,isComposite={};
  for(var c=2;primeCounter<64;c++){if(!isComposite[c]){for(i=0;i<313;i+=c)isComposite[i]=c;hash[primeCounter]=(mp(c,.5)*maxWord)|0;k[primeCounter++]=(mp(c,1/3)*maxWord)|0}}
  hash=hash.slice(0,8);
  str+='\x80'; while(str.length%64-56)str+='\x00';
  for(i=0;i<str.length;i++){j=str.charCodeAt(i);words[i>>2]|=j<<((3-i)%4)*8}
  words[words.length]=((asciiBitLength/maxWord)|0); words[words.length]=(asciiBitLength);
  for(j=0;j<words.length;){
    var w=words.slice(j,j+=16),oldHash=hash; hash=hash.slice(0,8);
    for(i=0;i<64;i++){
      var w15=w[i-15],w2=w[i-2],a=hash[0],e=hash[4];
      var temp1=hash[7]+(rr(e,6)^rr(e,11)^rr(e,25))+((e&hash[5])^((~e)&hash[6]))+k[i]+(w[i]=(i<16)?w[i]:(w[i-16]+(rr(w15,7)^rr(w15,18)^(w15>>>3))+w[i-7]+(rr(w2,17)^rr(w2,19)^(w2>>>10)))|0);
      var temp2=(rr(a,2)^rr(a,13)^rr(a,22))+((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
      hash=[(temp1+temp2)|0].concat(hash); hash[4]=(hash[4]+temp1)|0;
    }
    for(i=0;i<8;i++)hash[i]=(hash[i]+oldHash[i])|0;
  }
  for(i=0;i<8;i++){for(j=3;j+1;j--){var b=(hash[i]>>(j*8))&255;result+=((b<16)?0:'')+b.toString(16)}}
  return result;
}
var DEFAULT_PW_HASH='6e0fb2592c99bf8e5c4ee0cdc14d58a45761c844c306464aae2424bb1d604263';
function pwHash(p){return sha256('lm-salt:'+p)}
function checkPw(p){return pwHash(p)===(settings.pwHash||DEFAULT_PW_HASH)}
function pwSheet(){
  openSheet('<h2>'+T('admin')+'</h2><div class="field"><label>'+T('pw')+'</label><input id="pw" type="password" class="ltr" autocomplete="off"></div><button class="btn main" id="pwok">'+T('enter')+'</button>');
  var f=$('#pw'); setTimeout(function(){f.focus()},250);
  function go(){if(checkPw(f.value)){adminOK=true;closeSheet();enterAdmin()}else{toast(T('pwWrong'));f.value=''}}
  $('#pwok').onclick=go; f.onkeydown=function(e){if(e.key==='Enter')go()};
}
function pwChangeSheet(){
  openSheet('<h2>'+T('admPw')+'</h2>'+
   '<div class="field"><label>'+T('pwOld')+'</label><input id="p0" type="password" class="ltr"></div>'+
   '<div class="field"><label>'+T('pwNew')+'</label><input id="p1" type="password" class="ltr"></div>'+
   '<div class="field"><label>'+T('pwNew2')+'</label><input id="p2" type="password" class="ltr"></div>'+
   '<div class="mini">'+T('pwWeak')+'</div><button class="btn main" id="pok">'+T('save')+'</button>');
  $('#pok').onclick=function(){
    var a=$('#p0').value,b=$('#p1').value,c=$('#p2').value;
    if(!checkPw(a)){toast(T('pwWrong'));return}
    if(b.length<8||!/[0-9]/.test(b)||!/[A-Za-z]/.test(b)){toast(T('pwWeak'));return}
    if(b!==c){toast(T('pwMismatch'));return}
    settings.pwHash=pwHash(b);saveSettings();closeSheet();toast(T('pwChanged'));
  };
}

/* =====================================================================
   AMMINISTRAZIONE / الإدارة
   ===================================================================== */
function enterAdmin(){view.tab='admin';view.adm={page:'home'};clearSearch();render();window.scrollTo(0,0)}
function admHead(title,backTo){
  return '<div class="adm-head">'+(backTo?'<button data-act="adm" data-v="'+backTo+'">'+(settings.ui==='ar'?'→':'←')+'</button>':'')+'<b>'+title+'</b><button data-act="admexit">'+T('exit')+' ✕</button></div>';
}
function tools(kind,id,idx,len,hidden){
  return '<div class="tools">'+
   '<button data-act="admup" data-k="'+kind+'" data-v="'+id+'"'+(idx===0?' disabled style="opacity:.3"':'')+'>▲</button>'+
   '<button data-act="admdown" data-k="'+kind+'" data-v="'+id+'"'+(idx===len-1?' disabled style="opacity:.3"':'')+'>▼</button>'+
   '<button data-act="admhide" data-k="'+kind+'" data-v="'+id+'" class="'+(hidden?'on':'')+'" title="'+(hidden?T('show'):T('hideL'))+'">'+(hidden?'🚫':'👁')+'</button></div>';
}
function renderAdmin(){
  var a=view.adm||{page:'home'};
  if(a.page==='home') return admHead(T('admin'))+'<div class="menu">'+
    '<button data-act="adm" data-v="cats"><span class="ic">📦</span><div><b>'+T('admCats')+'</b><span>'+T('admCatsSub')+'</span></div></button>'+
    '<button data-act="adm" data-v="svc"><span class="ic">💶</span><div><b>'+T('admSvc')+'</b><span>'+T('admSvcSub')+'</span></div></button>'+

    '<button data-act="adm" data-v="backup"><span class="ic">💾</span><div><b>'+T('admBackup')+'</b><span>'+T('admBackupSub')+'</span></div></button>'+
    '<button data-act="admpw"><span class="ic">🔑</span><div><b>'+T('admPw')+'</b></div></button>'+
    '<button data-act="admreset"><span class="ic">↩️</span><div><b>'+T('admReset')+'</b></div></button></div>';
  if(a.page==='cats'){
    return admHead(T('admCats'),'home')+'<button class="btn main" style="margin:0 0 12px" data-act="catnew">'+T('newCat')+'</button><div class="list">'+
     DB.cats.map(function(c,i){return '<div class="row'+(c.hidden?' hid':'')+'"><button class="t" style="text-align:start;display:flex;gap:10px;align-items:center" data-act="admcat" data-v="'+c.id+'"><span style="font-size:22px">'+esc(c.ic||'📦')+'</span><span><b style="display:block">'+esc(N(c))+'</b><span style="display:block;font-size:12.5px;color:var(--sub)">'+c.items.length+' '+T('items')+'</span></span></button>'+tools('cat',c.id,i,DB.cats.length,c.hidden)+'</div>'}).join('')+'</div>';
  }
  if(a.page==='items'){
    var c=CBY[a.cat]; if(!c){view.adm={page:'cats'};return renderAdmin()}
    return admHead(esc(c.ic||'')+' '+esc(N(c)),'cats')+
     '<div class="row2" style="margin-bottom:12px"><button class="btn main" style="margin:0" data-act="itemnew" data-v="'+c.id+'">'+T('newItem')+'</button><button class="btn ghost" style="flex:none;width:auto;padding:0 16px" data-act="catedit" data-v="'+c.id+'">✏️</button></div><div class="list">'+
     c.items.map(function(it,i){return '<div class="row'+(it.hidden?' hid':'')+'"><button class="t" style="text-align:start;display:flex;gap:10px;align-items:center;min-width:0" data-act="itemedit" data-v="'+it.id+'">'+(thumb(it.id)||'<span class="thumb" style="display:grid;place-items:center">📷</span>')+'<span style="min-width:0"><b style="display:block">'+esc(N(it))+'</b><span class="ltr" style="display:block;font-size:12px;color:var(--sub);text-align:start;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(it.sizes.slice(0,3).join(' · '))+(it.colors?' 🎨':'')+'</span></span></button>'+tools('item',it.id,i,c.items.length,it.hidden)+'</div>'}).join('')+'</div>';
  }
  if(a.page==='kits'){
    return admHead(T('admKits'),'home')+'<button class="btn main" style="margin:0 0 12px" data-act="kitnew">'+T('newKit')+'</button><div class="list">'+
     DB.kits.map(function(k,i){return '<div class="row'+(k.hidden?' hid':'')+'"><button class="t" style="text-align:start;display:flex;gap:10px;align-items:center" data-act="kitedit" data-v="'+k.id+'"><span style="font-size:22px">'+esc(k.ic||'🧩')+'</span><span><b style="display:block">'+esc(N(k))+'</b><span style="display:block;font-size:12.5px;color:var(--sub)">'+k.parts.length+' '+T('items')+'</span></span></button>'+tools('kit',k.id,i,DB.kits.length,k.hidden)+'</div>'}).join('')+'</div>';
  }
  if(a.page==='svc'){
    var h2=admHead(T('admSvc'),'home')+'<button class="btn main" style="margin:0 0 12px" data-act="svcnew">'+T('newSvc')+'</button>';
    DB.svc.forEach(function(g,gi){
      h2+='<div class="row'+(g.hidden?' hid':'')+'" style="background:transparent;border:0;padding:12px 4px 6px"><div class="t"><b>'+esc(g.ic||'')+' '+esc(N(g))+'</b></div>'+tools('grp',g.id,gi,DB.svc.length,g.hidden)+'</div><div class="list">'+
       g.list.map(function(x,i){return '<div class="row'+(x.hidden?' hid':'')+'"><button class="t" style="text-align:start" data-act="svcedit" data-v="'+x.id+'"><b style="display:block">'+esc(N(x))+'</b><span dir="ltr" style="display:block;font-size:13px;color:var(--brand);font-weight:700;text-align:start">'+eur(x.price)+' / '+sunit(x.unit)+'</span></button>'+tools('svc',x.id,i,g.list.length,x.hidden)+'</div>'}).join('')+'</div>';
    });
    return h2+'<button class="btn ghost" style="width:100%;margin-top:14px" data-act="svcreset">↩️ '+T('resetSvc')+'</button>';
  }
  if(a.page==='backup'){
    var size=0;try{for(var key in localStorage)if(localStorage.hasOwnProperty(key))size+=(localStorage[key].length+key.length)*2}catch(e){}
    return admHead(T('admBackup'),'home')+
     '<div class="card"><button class="btn main" style="margin:0" data-act="export">'+T('exportB')+'</button><div class="mini" style="margin-top:8px">'+T('exportHint')+'</div></div>'+
     '<div class="card"><button class="btn ghost" style="width:100%" data-act="import">'+T('importB')+'</button><div class="mini" style="margin-top:8px">'+T('importHint')+'</div></div>'+
     '<div class="mini" style="text-align:center" dir="ltr">'+ITEMS.length+' · '+DB.kits.length+' kit · '+Object.keys(IMGS).length+' foto · '+(size/1048576).toFixed(2)+' MB</div>';
  }
  return '';
}
function listOf(kind,id){if(kind==='grp')return DB.svc;if(kind==='svc'){var x=SBY[id];return x?GBY[x.grp].list:[]}return kind==='cat'?DB.cats:kind==='kit'?DB.kits:(CBY[view.adm.cat]||{items:[]}).items}

// --- modifica lavoro del listino ---
function svcEditSheet(x){
  var isNew=!x; x=x||{id:uid('s'),it:'',ar:'',unit:'pz',price:0,hidden:false};
  var u=x.unit, grp=x.grp||(DB.svc[0]&&DB.svc[0].id);
  openSheet('<h2>'+(isNew?T('newSvc'):T('editSvc'))+'</h2>'+
   '<div class="field"><label>'+T('priceL')+'</label><input id="sp" inputmode="decimal" dir="ltr" value="'+fmt(x.price)+'" style="font-size:22px;font-weight:800"></div>'+
   '<div class="field"><label>'+T('nameIt')+'</label><input id="eit" class="ltr" value="'+esc(x.it)+'"></div>'+
   '<div class="field"><label>'+T('nameAr')+'</label><input id="ear" dir="rtl" value="'+esc(x.ar)+'"></div>'+
   '<div class="field"><label>'+T('unit')+'</label><div class="chips">'+Object.keys(SERVICE_UNITS).map(function(k){return '<button class="chip'+(k===u?' on':'')+'" data-su="'+k+'">'+sunit(k)+'</button>'}).join('')+'</div></div>'+
   '<div class="field"><label>'+T('group')+'</label><div class="chips">'+DB.svc.map(function(g){return '<button class="chip'+(g.id===grp?' on':'')+'" data-g="'+g.id+'">'+esc(g.ic||'')+' '+esc(N(g))+'</button>'}).join('')+'</div></div>'+
   '<button class="btn main" id="esave">'+T('save')+'</button>'+(isNew?'':'<button class="btn ghost" style="width:100%;margin-top:10px;color:var(--danger)" id="edel">🗑 '+T('del')+'</button>'));
  sheet.querySelectorAll('[data-su]').forEach(function(b){b.onclick=function(){u=b.dataset.su;sheet.querySelectorAll('[data-su]').forEach(function(y){y.classList.toggle('on',y.dataset.su===u)})}});
  sheet.querySelectorAll('[data-g]').forEach(function(b){b.onclick=function(){grp=b.dataset.g;sheet.querySelectorAll('[data-g]').forEach(function(y){y.classList.toggle('on',y.dataset.g===grp)})}});
  $('#esave').onclick=function(){
    var n1=$('#eit').value.trim(),n2=$('#ear').value.trim();
    if(!n1&&!n2){toast(T('needNames'));return}
    x.it=n1||n2;x.ar=n2||n1;x.unit=u;x.price=num($('#sp').value);
    var old=x.grp&&GBY[x.grp];
    if(isNew||!old||old.id!==grp){if(old)old.list=old.list.filter(function(y){return y!==x});GBY[grp].list.push(x)}
    saveDB();closeSheet();render();toast(T('editsSaved'));
  };
  if(!isNew)$('#edel').onclick=function(){confirmSheet(T('delSvcQ'),T('del'),function(){var g=GBY[x.grp];g.list=g.list.filter(function(y){return y!==x});saveDB();render()})};
}

// --- modifica categoria ---
function catSheet(c){
  var isNew=!c; c=c||{id:uid('c'),ic:'📦',it:'',ar:'',hidden:false,items:[]};
  openSheet('<h2>'+(isNew?T('newCat'):T('editCat'))+'</h2>'+
   '<div class="field"><label>'+T('icon')+'</label><input id="ei" value="'+esc(c.ic)+'" maxlength="4" style="font-size:22px;width:80px;text-align:center"></div>'+
   '<div class="field"><label>'+T('nameIt')+'</label><input id="eit" class="ltr" value="'+esc(c.it)+'"></div>'+
   '<div class="field"><label>'+T('nameAr')+'</label><input id="ear" dir="rtl" value="'+esc(c.ar)+'"></div>'+
   '<button class="btn main" id="esave">'+T('save')+'</button>'+(isNew?'':'<button class="btn ghost" style="width:100%;margin-top:10px;color:var(--danger)" id="edel">🗑 '+T('del')+'</button>'));
  $('#esave').onclick=function(){
    var it=$('#eit').value.trim(),ar=$('#ear').value.trim();
    if(!it&&!ar){toast(T('needNames'));return}
    c.ic=$('#ei').value.trim()||'📦';c.it=it||ar;c.ar=ar||it;
    if(isNew)DB.cats.push(c);
    saveDB();closeSheet();if(isNew)view.adm={page:'items',cat:c.id};render();toast(T('editsSaved'));
  };
  if(!isNew)$('#edel').onclick=function(){confirmSheet(T('delCatQ'),T('del'),function(){
    c.items.forEach(function(i){delete IMGS[i.id]});saveImgs();
    DB.cats=DB.cats.filter(function(x){return x!==c});saveDB();view.adm={page:'cats'};render()})};
}

// --- modifica articolo (con foto) ---
var pendingImg=null; // undefined = invariata, null = rimuovi, string = nuova
function itemEditSheet(it,catId){
  var isNew=!it; it=it||{id:uid('i'),it:'',ar:'',unit:'pz',sizes:[],colors:false,hidden:false};
  var u=it.unit, cat=catId||it.cat, img=IMGS[it.id]||'';
  pendingImg=undefined;
  function photoHtml(){var src=pendingImg===undefined?img:pendingImg;return src?'<img class="thumb big" src="'+src+'">':'<span class="thumb big" style="display:grid;place-items:center;font-size:30px">📷</span>'}
  openSheet('<h2>'+(isNew?T('newItem'):T('editItem'))+'</h2>'+
   '<h3>'+T('photo')+'</h3><div style="display:flex;gap:12px;align-items:center"><span id="ph">'+photoHtml()+'</span><div style="display:grid;gap:6px;flex:1"><button class="btn ghost" id="phadd">'+T('addPhoto')+'</button><button class="btn ghost" id="phdel" style="color:var(--danger)">'+T('delPhoto')+'</button></div></div>'+
   '<div class="field"><label>'+T('nameIt')+'</label><input id="eit" class="ltr" value="'+esc(it.it)+'"></div>'+
   '<div class="field"><label>'+T('nameAr')+'</label><input id="ear" dir="rtl" value="'+esc(it.ar)+'"></div>'+
   '<div class="row2"><div class="field" style="flex:1"><label>Français</label><input id="efr" class="ltr" value="'+esc(it.fr||'')+'" placeholder="'+esc(trName(it,'fr'))+'"></div><div class="field" style="flex:1"><label>English</label><input id="een" class="ltr" value="'+esc(it.en||'')+'" placeholder="'+esc(trName(it,'en'))+'"></div></div>'+
   '<div class="field"><label>'+T('unit')+'</label><div class="chips">'+Object.keys(UNITS).map(function(k){return '<button class="chip'+(k===u?' on':'')+'" data-u="'+k+'">'+N(UNITS[k])+'</button>'}).join('')+'</div></div>'+
   '<div class="field"><label>'+T('sizesL')+'</label><textarea id="esz" rows="4" class="ltr">'+esc(it.sizes.join('\n'))+'</textarea></div>'+
   '<label class="toggle"><span>🎨 '+T('hasColors')+'</span><input type="checkbox" id="ecol"'+(it.colors?' checked':'')+'></label>'+
   '<div class="field"><label>'+T('category')+'</label><div class="chips">'+DB.cats.map(function(c){return '<button class="chip'+(c.id===cat?' on':'')+'" data-cat="'+c.id+'">'+esc(c.ic||'')+' '+esc(N(c))+'</button>'}).join('')+'</div></div>'+
   '<button class="btn main" id="esave">'+T('save')+'</button>'+(isNew?'':'<button class="btn ghost" style="width:100%;margin-top:10px;color:var(--danger)" id="edel">🗑 '+T('del')+'</button>'));
  sheet.querySelectorAll('[data-u]').forEach(function(b){b.onclick=function(){u=b.dataset.u;sheet.querySelectorAll('[data-u]').forEach(function(x){x.classList.toggle('on',x.dataset.u===u)})}});
  sheet.querySelectorAll('[data-cat]').forEach(function(b){b.onclick=function(){cat=b.dataset.cat;sheet.querySelectorAll('[data-cat]').forEach(function(x){x.classList.toggle('on',x.dataset.cat===cat)})}});
  $('#phadd').onclick=function(){pickImage(function(d){pendingImg=d;$('#ph').innerHTML=photoHtml()})};
  $('#phdel').onclick=function(){pendingImg=null;$('#ph').innerHTML=photoHtml()};
  $('#esave').onclick=function(){
    var n1=$('#eit').value.trim(),n2=$('#ear').value.trim();
    if(!n1&&!n2){toast(T('needNames'));return}
    it.it=n1||n2;it.ar=n2||n1;it.unit=u;it.colors=$('#ecol').checked;
    var nf=$('#efr').value.trim(),ne=$('#een').value.trim();if(nf)it.fr=nf;else delete it.fr;if(ne)it.en=ne;else delete it.en;
    it.sizes=$('#esz').value.split(/[\n;]+/).map(function(s){return s.trim()}).filter(Boolean);
    var oldCat=it.cat&&CBY[it.cat];
    if(isNew||!oldCat||oldCat.id!==cat){
      if(oldCat) oldCat.items=oldCat.items.filter(function(x){return x!==it});
      CBY[cat].items.push(it);
    }
    if(pendingImg!==undefined){if(pendingImg)IMGS[it.id]=pendingImg;else delete IMGS[it.id];if(!saveImgs()){return}}
    saveDB();closeSheet();view.adm={page:'items',cat:cat};render();toast(T('editsSaved'));
  };
  if(!isNew)$('#edel').onclick=function(){confirmSheet(T('delItemQ'),T('del'),function(){
    var c=CBY[it.cat];c.items=c.items.filter(function(x){return x!==it});delete IMGS[it.id];saveImgs();saveDB();render()})};
}
// foto: ridimensionata a max 320px, JPEG
function pickImage(cb){
  var inp=$('#fileImg'); inp.value='';
  inp.onchange=function(){
    var f=inp.files&&inp.files[0]; if(!f) return;
    var r=new FileReader();
    r.onload=function(){
      var im=new Image();
      im.onload=function(){
        var M=320,w=im.width,h=im.height,s=Math.min(1,M/Math.max(w,h));
        var cv=document.createElement('canvas');cv.width=Math.round(w*s);cv.height=Math.round(h*s);
        var cx=cv.getContext('2d');cx.fillStyle='#fff';cx.fillRect(0,0,cv.width,cv.height);cx.drawImage(im,0,0,cv.width,cv.height);
        cb(cv.toDataURL('image/jpeg',0.72));
      };
      im.onerror=function(){toast(T('photoErr'))};
      im.src=r.result;
    };
    r.onerror=function(){toast(T('photoErr'))};
    r.readAsDataURL(f);
  };
  inp.click();
}

// --- modifica kit ---
function kitEditSheet(k){
  var isNew=!k;
  var w=k?JSON.parse(JSON.stringify(k)):{id:uid('k'),ic:'🧩',it:'',ar:'',note:'',noteIt:'',hidden:false,parts:[]};
  var pq='';
  function partsHtml(){
    if(!w.parts.length) return '<div class="mini">—</div>';
    return w.parts.map(function(p,j){var it=partItem(p);
      var sizeOpts=(it.sizes||[]);
      return '<div class="card" style="padding:10px;margin:8px 0;border:1px solid var(--line);box-shadow:none">'+
       '<div style="display:flex;gap:8px;align-items:center">'+(it.id?thumb(it.id):'')+'<b style="flex:1;font-size:14px">'+esc(N(it))+'</b><button class="del" data-pdel="'+j+'">🗑</button></div>'+
       '<div style="display:flex;gap:8px;margin-top:8px;align-items:center">'+
        '<input data-psz="'+j+'" class="ltr" list="sz'+j+'" value="'+esc(p.size)+'" placeholder="'+T('size')+'" style="flex:1;min-width:0;border:1px solid var(--line);border-radius:10px;padding:8px">'+
        '<datalist id="sz'+j+'">'+sizeOpts.map(function(s){return '<option value="'+esc(s)+'">'}).join('')+'</datalist>'+
        '<div class="stepper"><input inputmode="decimal" data-pq="'+j+'" value="'+fmt(p.qty)+'"><span class="u">'+N(unit(it.unit))+'</span></div></div>'+
       (it.colors?'<div class="chips" style="margin-top:8px">'+['' ].concat(COLORS.map(function(c){return c.id})).map(function(cid){return '<button class="chip'+((p.color||'')===cid?' on':'')+'" data-pcol="'+j+'" data-c="'+cid+'">'+(cid?dot(cid)+esc(colName(cid,settings.ui)):T('none'))+'</button>'}).join('')+'</div>':'')+
      '</div>'}).join('');
  }
  function pickHtml(){
    if(!pq) return '';
    var words=norm(pq).split(' ').filter(Boolean);
    var res=ITEMS.filter(function(i){return words.every(function(x){return i._s.indexOf(x)>=0})}).slice(0,30);
    return '<div class="pick">'+res.map(function(i){return '<button data-padd="'+i.id+'">'+esc(N(i))+'</button>'}).join('')+'</div>';
  }
  openSheet('<h2>'+(isNew?T('newKit'):T('editKit'))+'</h2>'+
   '<div class="field"><label>'+T('icon')+'</label><input id="ei" value="'+esc(w.ic)+'" maxlength="4" style="font-size:22px;width:80px;text-align:center"></div>'+
   '<div class="field"><label>'+T('nameIt')+'</label><input id="eit" class="ltr" value="'+esc(w.it)+'"></div>'+
   '<div class="field"><label>'+T('nameAr')+'</label><input id="ear" dir="rtl" value="'+esc(w.ar)+'"></div>'+
   '<h3>'+T('kitParts')+'</h3><div id="kparts">'+partsHtml()+'</div>'+
   '<div class="field"><label>'+T('addPart')+'</label><input id="kpq" placeholder="'+T('partSearch')+'"></div><div id="kpick"></div>'+
   '<button class="btn main" id="esave">'+T('save')+'</button>'+(isNew?'':'<button class="btn ghost" style="width:100%;margin-top:10px;color:var(--danger)" id="edel">🗑 '+T('del')+'</button>'));
  function syncInputs(){
    sheet.querySelectorAll('[data-psz]').forEach(function(i){w.parts[+i.dataset.psz].size=i.value.trim()});
    sheet.querySelectorAll('[data-pq]').forEach(function(i){w.parts[+i.dataset.pq].qty=num(i.value)});
  }
  function wire(){
    sheet.querySelectorAll('[data-pdel]').forEach(function(b){b.onclick=function(){syncInputs();w.parts.splice(+b.dataset.pdel,1);redraw()}});
    sheet.querySelectorAll('[data-pcol]').forEach(function(b){b.onclick=function(){syncInputs();w.parts[+b.dataset.pcol].color=b.dataset.c;redraw()}});
    sheet.querySelectorAll('[data-padd]').forEach(function(b){b.onclick=function(){syncInputs();var it=IBY[b.dataset.padd];w.parts.push({item:it.id,name:it.it,size:it.sizes.length===1?it.sizes[0]:'',qty:1,color:''});pq='';$('#kpq').value='';redraw()}});
  }
  function redraw(){$('#kparts').innerHTML=partsHtml();$('#kpick').innerHTML=pickHtml();wire()}
  $('#kpq').oninput=function(){pq=this.value.trim();$('#kpick').innerHTML=pickHtml();wire()};
  wire();
  $('#esave').onclick=function(){
    syncInputs();
    var n1=$('#eit').value.trim(),n2=$('#ear').value.trim();
    if(!n1&&!n2){toast(T('needNames'));return}
    w.ic=$('#ei').value.trim()||'🧩';w.it=n1||n2;w.ar=n2||n1;
    w.parts=w.parts.filter(function(p){return p.qty>0});
    if(isNew)DB.kits.push(w);else{var i=DB.kits.indexOf(k);DB.kits[i]=w}
    saveDB();closeSheet();render();toast(T('editsSaved'));
  };
  if(!isNew)$('#edel').onclick=function(){confirmSheet(T('delKitQ'),T('del'),function(){DB.kits=DB.kits.filter(function(x){return x!==k});saveDB();render()})};
}

// --- backup ---
function exportBackup(){
  var data={app:'lista-materiale',version:2,exported:new Date().toISOString(),appVersion:appVersion(),db:DB,imgs:IMGS,projects:P,
    settings:{tecnico:settings.tecnico,ditta:settings.ditta,waNum:settings.waNum,ui:settings.ui,out:settings.out}};
  var txt=JSON.stringify(data), d=new Date(), name='backup_materiale_'+d.getFullYear()+('0'+(d.getMonth()+1)).slice(-2)+('0'+d.getDate()).slice(-2)+'.json';
  if(A&&A.shareFile) A.shareFile(name,txt,'application/json');
  else fileReadySheet(new File([txt],name,{type:'application/json'}));
}
function importBackup(){
  var inp=$('#fileJson'); inp.value='';
  inp.onchange=function(){
    var f=inp.files&&inp.files[0]; if(!f) return;
    var r=new FileReader();
    r.onload=function(){
      var d; try{d=JSON.parse(r.result)}catch(e){toast(T('badFile'));return}
      if(!d||d.app!=='lista-materiale'||!d.db||!d.db.cats){toast(T('badFile'));return}
      confirmSheet(T('importQ'),T('importB').replace(/^\S+\s/,''),function(){
        DB=d.db; IMGS=d.imgs||{};
        if(d.projects&&d.projects.list){
          var have={};P.list.forEach(function(p){have[p.id]=1});
          d.projects.list.forEach(function(p){if(!have[p.id])P.list.push(p)});
        }
        saveDB();saveImgs();save();render();toast(T('imported'));
      });
    };
    r.onerror=function(){toast(T('badFile'))};
    r.readAsText(f);
  };
  inp.click();
}

/* =====================================================================
   OUTPUT (messaggio + PDF)
   ===================================================================== */
function O(lang,k){return lang==='both'?OUT.it[k]+' / '+OUT.ar[k]:OUT[lang][k]}
function nameOut(lang,o){if(lang==='both')return o.it+(o.ar&&o.ar!==o.it?' / '+o.ar:'');return trName(o,lang)}
function unitOut(lang,u){var U=unit(u);return U[lang]||U.it}
function placeOut(lang){var p=placeOf(cur().site.luogo);return p?nameOut(lang,p):''}
function dateTxt(){var d=new Date();function z(n){return (n<10?'0':'')+n}return z(d.getDate())+'/'+z(d.getMonth()+1)+'/'+d.getFullYear()}
function sortedLines(){
  var L=cur().lines.map(function(l,i){return {l:l,i:i}});
  L.sort(function(a,b){return (catIndex(a.l.cat)-catIndex(b.l.cat))||(a.i-b.i)});
  return L.map(function(x){return x.l});
}
function specOut(lang,l){return [trSize(l.size,lang),l.color?colName(l.color,lang==='both'?'it':lang):''].filter(Boolean).join(' ')}
function buildText(wa,lang){
  lang=lang||settings.out;
  var B=wa?'*':'', p=cur(), s=p.site, out=[];
  out.push(B+'📋 '+O(lang,'title')+B);
  if(s.cliente) out.push('👤 '+O(lang,'cliente')+': '+s.cliente);
  if(s.indirizzo) out.push('📍 '+O(lang,'indirizzo')+': '+s.indirizzo);
  if(s.luogo) out.push('🏠 '+O(lang,'luogo')+': '+placeOut(lang));
  out.push('📅 '+O(lang,'data')+': '+dateTxt());
  if(settings.tecnico) out.push('👷 '+O(lang,'tecnico')+': '+settings.tecnico);
  var last=null, n=0;
  sortedLines().forEach(function(l){
    if(l.cat!==last){last=l.cat;var c=CBY[l.cat];out.push('');out.push(B+'— '+(c?nameOut(lang,c):O(lang,'other'))+' —'+B)}
    n++;
    var sp=specOut(lang,l);
    if(lang==='both'){
      var arSpec=[l.size,l.color?colName(l.color,'ar'):''].filter(Boolean).join(' ');
      out.push(n+'. '+fmt(l.qty)+' '+unitOut('it',l.unit)+' — '+l.it+(sp?' '+sp:'')+(l.ar&&l.ar!==l.it?'\n    ('+l.ar+(arSpec?' '+arSpec:'')+')':''));
    } else out.push(n+'. '+fmt(l.qty)+' '+unitOut(lang,l.unit)+' — '+nameOut(lang,l)+(sp?' '+sp:''));
    if(l.note) out.push('    📝 '+l.note);
  });
  if(s.note){out.push('');out.push('📝 '+O(lang,'note')+': '+s.note)}
  out.push('');
  out.push(O(lang,'tot')+': '+n);
  return out.join('\n');
}
function buildReport(lang){
  lang=lang||settings.out;
  var rtl=lang==='ar', s=cur().site, rows='', last=null, n=0;
  function lab(k){return lang==='both'?OUT.it[k]+' / <span dir="rtl">'+OUT.ar[k]+'</span>':OUT[lang][k]}
  sortedLines().forEach(function(l){
    if(l.cat!==last){last=l.cat;var c=CBY[l.cat];rows+='<div class="blk cat">'+(c?(lang==='both'?esc(c.it)+' <span dir="rtl">'+esc(c.ar)+'</span>':esc(nameOut(lang,c))):lab('other'))+'</div>'}
    n++;
    var nm=lang==='both'?'<b>'+esc(l.it)+'</b>'+(l.ar&&l.ar!==l.it?'<div class="ar" dir="rtl">'+esc(l.ar)+'</div>':''):'<b>'+esc(nameOut(lang,l))+'</b>';
    var spec=(l.size?'<span dir="ltr">'+esc(trSize(l.size,lang))+'</span>':'')+(l.color?' <span class="cd" style="background:'+(COLBY[l.color]?COLBY[l.color].hex:'#ccc')+'"></span>'+esc(colName(l.color,lang==='both'?'it':lang)):'');
    rows+='<div class="blk r'+(n%2?'':' alt')+'"><div class="n">'+n+'</div><div class="d">'+nm+(l.note?'<div class="nt">📝 <span dir="auto">'+esc(l.note)+'</span></div>':'')+'</div><div class="s">'+(spec||'—')+'</div><div class="q"><span dir="ltr">'+fmt(l.qty)+'</span> <small>'+unitOut(lang==='both'?'it':lang,l.unit)+'</small></div></div>';
  });
  var info=[['cliente',s.cliente],['indirizzo',s.indirizzo],['luogo',placeOut(lang)],['data',dateTxt()],['tecnico',settings.tecnico]]
    .filter(function(x){return x[1]}).map(function(x){return '<div><span>'+lab(x[0])+'</span><b dir="auto">'+esc(x[1])+'</b></div>'}).join('');
  var title=lang==='both'?'Richiesta materiale<small dir="rtl">'+OUT.ar.title+'</small>':OUT[lang].titleL;
  return '<!doctype html><html dir="'+(rtl?'rtl':'ltr')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=794"><style>'+
   '*{box-sizing:border-box}body{margin:0;font-family:"Noto Sans","Noto Sans Arabic",sans-serif;color:#16192B;font-size:14px;background:#fff}'+
   '.wrap{padding:0 40px}.pad{height:36px}'+
   '.hd{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid #1F4FD8;padding-bottom:12px}'+
   '.hd h1{margin:0;font-size:24px;color:#1F4FD8}.hd h1 small{display:block;font-size:16px;color:#646A80;font-weight:600;text-align:start}.hd .co{font-weight:700;font-size:15px}'+
   '.info{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin:14px 0 6px}.info div{display:flex;flex-direction:column;border-bottom:1px solid #E3E5EC;padding-bottom:4px}.info span{font-size:11px;color:#646A80}.info b{font-size:14px}'+
   '.th,.r{display:grid;grid-template-columns:34px 1fr 170px 90px;gap:10px;align-items:center;padding:8px 8px}'+
   '.th{background:#1F4FD8;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-top:14px}.th .q,.r .q{text-align:end}'+
   '.r{border-bottom:1px solid #EEF0F4}.r.alt{background:#F7F8FB}.r .n{color:#646A80}.r .ar{color:#4A5068;font-size:13px;text-align:start}.r .nt{color:#B35C00;font-size:12px}.r .q{font-weight:800;font-size:15px}.r .q small{font-weight:400;color:#646A80}.r .s{font-size:13px;text-align:start}'+
   '.cd{display:inline-block;width:11px;height:11px;border-radius:50%;border:1px solid rgba(0,0,0,.3);vertical-align:-1px;margin:0 4px}'+
   '.cat{margin-top:12px;padding:6px 8px;font-weight:800;color:#1F4FD8;font-size:13px;border-bottom:2px solid #E4EBFF}.cat span{margin-inline-start:8px;color:#646A80;font-weight:600}'+
   '.foot{margin-top:16px;display:flex;justify-content:space-between;font-size:13px;color:#646A80}.notes{margin-top:14px;padding:10px 12px;background:#FFF6E8;border-radius:8px;font-size:13px}'+
   '.sp{height:0}</style></head><body><div class="wrap"><div class="pad"></div>'+
   '<div class="blk hd"><h1>'+title+'</h1><div class="co">'+esc(settings.ditta)+'</div></div>'+
   '<div class="blk info">'+info+'</div>'+
   '<div class="blk th"><div>#</div><div>'+lab('mat')+'</div><div>'+lab('size')+'</div><div class="q">'+(lang==='ar'?OUT.ar.qty:OUT.it.qty)+'</div></div>'+
   rows+
   (s.note?'<div class="blk notes"><b>'+lab('note')+':</b> <span dir="auto">'+esc(s.note)+'</span></div>':'')+
   '<div class="blk foot"><span>'+lab('tot')+': <b>'+n+'</b></span><span dir="ltr">'+dateTxt()+'</span></div><div class="pad"></div></div>'+
   '<script>'+PAGINATE+'<\/script></body></html>';
}
var QOUT={
 it:{title:'PREVENTIVO',titleL:'Preventivo',descr:'Descrizione lavori',qty:'Q.tà',price:'Prezzo',tot:'Totale',labour:'Totale manodopera',sconto:'Sconto',imp:'Imponibile',iva:'IVA',total:'TOTALE',noIva:'Prezzi IVA esclusa',matEx:'Solo manodopera, materiali esclusi.'},
 ar:{title:'عرض سعر',titleL:'عرض سعر',descr:'وصف الأعمال',qty:'الكمية',price:'السعر',tot:'المجموع',labour:'مجموع العمل',sconto:'خصم',imp:'المبلغ بدون ضريبة',iva:'IVA',total:'السعر النهائي',noIva:'الأسعار بدون IVA',matEx:'العمل اليدوي فقط، بدون المواد.'}
};
Object.assign(QOUT,window.LM_QOUT||{});
function QO(lang,k){return lang==='both'?QOUT.it[k]+' / '+QOUT.ar[k]:QOUT[lang][k]}
function buildQuoteText(wa,lang){
  lang=lang||settings.out;
  var B=wa?'*':'', p=cur(), s=p.site, q=p.quote, t=qTotals(q), out=[];
  out.push(B+'🧾 '+QO(lang,'title')+B);
  if(settings.ditta) out.push('🏢 '+settings.ditta);
  if(s.cliente) out.push('👤 '+O(lang,'cliente')+': '+s.cliente);
  if(s.indirizzo) out.push('📍 '+O(lang,'indirizzo')+': '+s.indirizzo);
  out.push('📅 '+O(lang,'data')+': '+dateTxt());
  out.push('');
  q.lines.forEach(function(l,i){
    var u=sunit(l.unit,lang==='both'?'it':lang);
    out.push((i+1)+'. '+nameOut(lang,l)+'\n    '+fmt(l.qty)+' '+u+' × '+eur(l.price)+' = '+eur(l.qty*l.price));
  });
  out.push('');
  out.push(QO(lang,'labour')+': '+eur(t.lab));
  if(t.sc){out.push(QO(lang,'sconto')+': -'+eur(t.sc));out.push(QO(lang,'imp')+': '+eur(t.imp))}
  if(q.iva) out.push(QO(lang,'iva')+' '+qRate(q)+'%: '+eur(t.iva));
  out.push(B+'💶 '+QO(lang,'total')+': '+eur(t.tot)+B);
  if(!q.iva) out.push('('+QO(lang,'noIva')+')');
  out.push(QO(lang,'matEx'));
  return out.join('\n');
}
function buildQuoteReport(lang){
  lang=lang||settings.out;
  var rtl=lang==='ar', p=cur(), s=p.site, q=p.quote, t=qTotals(q), rows='';
  function lab(k){return lang==='both'?QOUT.it[k]+' / <span dir="rtl">'+QOUT.ar[k]+'</span>':QOUT[lang][k]}
  function labO(k){return lang==='both'?OUT.it[k]+' / <span dir="rtl">'+OUT.ar[k]+'</span>':OUT[lang][k]}
  q.lines.forEach(function(l,i){
    var nm=lang==='both'?'<b>'+esc(l.it)+'</b>'+(l.ar&&l.ar!==l.it?'<div class="ar" dir="rtl">'+esc(l.ar)+'</div>':''):'<b>'+esc(nameOut(lang,l))+'</b>';
    rows+='<div class="blk r'+(i%2?' alt':'')+'"><div class="n">'+(i+1)+'</div><div class="d">'+nm+'</div><div class="c" dir="ltr">'+fmt(l.qty)+' '+sunit(l.unit,lang==='both'?'it':lang)+'</div><div class="c" dir="ltr">'+eur(l.price)+'</div><div class="c b" dir="ltr">'+eur(l.qty*l.price)+'</div></div>';
  });
  var info=[['cliente',s.cliente],['indirizzo',s.indirizzo],['data',dateTxt()],['tecnico',settings.tecnico]]
    .filter(function(x){return x[1]}).map(function(x){return '<div><span>'+labO(x[0])+'</span><b dir="auto">'+esc(x[1])+'</b></div>'}).join('');
  function tr(k,v,cls){return '<div class="tr'+(cls?' '+cls:'')+'"><span>'+k+'</span><b dir="ltr">'+v+'</b></div>'}
  var tots=tr(lab('labour'),eur(t.lab))+(t.sc?tr(lab('sconto'),'-'+eur(t.sc))+tr(lab('imp'),eur(t.imp)):'')+(q.iva?tr(lab('iva')+' '+qRate(q)+'%',eur(t.iva)):'')+tr(lab('total'),eur(t.tot),'big');
  var title=lang==='both'?'Preventivo<small dir="rtl">'+QOUT.ar.title+'</small>':QOUT[lang].titleL;
  return '<!doctype html><html dir="'+(rtl?'rtl':'ltr')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=794"><style>'+
   '*{box-sizing:border-box}body{margin:0;font-family:"Noto Sans","Noto Sans Arabic",sans-serif;color:#16192B;font-size:14px;background:#fff}'+
   '.wrap{padding:0 40px}.pad{height:36px}'+
   '.hd{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid #1F4FD8;padding-bottom:12px}'+
   '.hd h1{margin:0;font-size:26px;color:#1F4FD8}.hd h1 small{display:block;font-size:16px;color:#646A80;font-weight:600;text-align:start}.hd .co{font-weight:700;font-size:15px}'+
   '.info{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin:14px 0 6px}.info div{display:flex;flex-direction:column;border-bottom:1px solid #E3E5EC;padding-bottom:4px}.info span{font-size:11px;color:#646A80}.info b{font-size:14px}'+
   '.th,.r{display:grid;grid-template-columns:30px 1fr 80px 95px 105px;gap:10px;align-items:center;padding:9px 8px}'+
   '.th{background:#1F4FD8;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-top:16px}.th .c,.r .c{text-align:end}'+
   '.r{border-bottom:1px solid #EEF0F4}.r.alt{background:#F7F8FB}.r .n{color:#646A80}.r .ar{color:#4A5068;font-size:13px;text-align:start}.r .b{font-weight:800}'+
   '.tots{margin-top:14px;margin-inline-start:auto;width:340px}.tr{display:flex;justify-content:space-between;padding:6px 8px;border-bottom:1px solid #EEF0F4}.tr span{color:#4A5068}'+
   '.tr.big{background:#1F4FD8;color:#fff;border-radius:6px;font-size:17px;margin-top:6px;padding:10px 8px}.tr.big span{color:#fff;font-weight:700}'+
   '.foot{margin-top:18px;font-size:12.5px;color:#646A80}.sp{height:0}</style></head><body><div class="wrap"><div class="pad"></div>'+
   '<div class="blk hd"><h1>'+title+'</h1><div class="co">'+esc(settings.ditta)+'</div></div>'+
   '<div class="blk info">'+info+'</div>'+
   '<div class="blk th"><div>#</div><div>'+lab('descr')+'</div><div class="c">'+lab('qty')+'</div><div class="c">'+lab('price')+'</div><div class="c">'+lab('tot')+'</div></div>'+
   rows+'<div class="blk tots">'+tots+'</div>'+
   '<div class="blk foot">'+(q.iva?'':lab('noIva')+' · ')+lab('matEx')+'</div><div class="pad"></div></div>'+
   '<script>'+PAGINATE+'<\/script></body></html>';
}
var PAGINATE="(function(){function go(){var W=document.documentElement.clientWidth||794,P=W*297/210,M=36,b=document.querySelectorAll('.blk');for(var i=0;i<b.length;i++){var e=b[i],r=e.getBoundingClientRect(),t=r.top+window.scrollY,h=r.height,pg=Math.floor(t/P),end=(pg+1)*P-M;if(t+h>end&&h<P-2*M){var sp=document.createElement('div');sp.className='sp';sp.style.height=((pg+1)*P+M-t)+'px';e.parentNode.insertBefore(sp,e)}}var H=document.body.scrollHeight;if(window.Report)Report.ready(H,W);}if(document.readyState==='complete')setTimeout(go,60);else window.addEventListener('load',function(){setTimeout(go,60)})})();";
function fileName(isQuote){
  var p=cur(), c=(p.name||p.site.cliente||'').replace(/[^\w؀-ۿ -]+/g,'').trim().replace(/\s+/g,'_');
  var d=new Date(), base=isQuote?(settings.out==='ar'?'عرض_سعر':'Preventivo'):(settings.out==='ar'?'طلب_مواد':'Richiesta_materiale');
  return base+(c?'_'+c:'')+'_'+d.getFullYear()+('0'+(d.getMonth()+1)).slice(-2)+('0'+d.getDate()).slice(-2)+'.pdf';
}
function doWa(){ping('/usa/whatsapp'+(view.tab==='price'?'-preventivo':''),'Uso WhatsApp');if(view.tab==='price'){var tq=buildQuoteText(true);if(A&&A.whatsapp)A.whatsapp(tq,'');else openUrl('https://wa.me/?text='+encodeURIComponent(tq));return}var t=buildText(true),n=settings.waNum.replace(/[^\d]/g,'');if(A&&A.whatsapp)A.whatsapp(t,n);else openUrl('https://wa.me/'+n+'?text='+encodeURIComponent(t))}
function doCopy(){ping('/usa/copia'+(view.tab==='price'?'-preventivo':''),'Uso copia');
  var t=view.tab==='price'?buildQuoteText(false):buildText(false);
  if(A&&A.copy){A.copy(t);toast(T('copied'));return}
  function legacy(){var ta=document.createElement('textarea');ta.value=t;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,t.length);var ok=false;try{ok=document.execCommand('copy')}catch(e){}document.body.removeChild(ta);toast(ok?T('copied'):'✗')}
  if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function(){toast(T('copied'))},legacy); else legacy();
}
function doPdf(){ping('/usa/pdf'+(view.tab==='price'?'-preventivo':''),'Uso PDF');
  var q=view.tab==='price';
  if(A&&A.pdf){toast(T('pdfWait'));A.pdf(q?buildQuoteReport():buildReport(),fileName(q))}
  else webPdf(q);
}

/* ---------- versione web (iPad / iPhone): PDF, condivisione file ---------- */
var WEB_VERSION=window.LM_WEB_VERSION||'web';
function loadScript(src,cb){if(window.html2canvas){cb();return}var sc=document.createElement('script');sc.src=src;sc.onload=cb;sc.onerror=function(){toast(T('pdfErr'))};document.head.appendChild(sc)}
function webPdf(isQuote){
  toast(T('pdfWait'));
  loadScript('html2canvas.min.js',function(){
    var W=794,ifr=document.createElement('iframe');
    ifr.setAttribute('style','position:fixed;left:-20000px;top:0;width:'+W+'px;height:1123px;border:0;background:#fff');
    document.body.appendChild(ifr);
    ifr.onload=function(){
      setTimeout(function(){
        var doc=ifr.contentDocument, H=doc.body.scrollHeight, P=W*297/210, n=Math.max(1,Math.ceil((H-2)/P)), pages=[], i=0;
        ifr.style.height=H+'px';
        (function next(){
          if(i>=n){document.body.removeChild(ifr);var blob=pdfFromJpegs(pages);fileReadySheet(new File([blob],fileName(isQuote),{type:'application/pdf'}));return}
          window.html2canvas(doc.body,{x:0,y:Math.round(i*P),width:W,height:Math.round(P),scale:2,windowWidth:W,windowHeight:Math.round(P),backgroundColor:'#ffffff',logging:false,scrollX:0,scrollY:0})
           .then(function(cv){var d=cv.toDataURL('image/jpeg',0.9);pages.push({b:b64bytes(d.split(',')[1]),w:cv.width,h:cv.height});i++;next()})
           .catch(function(){document.body.removeChild(ifr);toast(T('pdfErr'))});
        })();
      },250);
    };
    ifr.srcdoc=isQuote?buildQuoteReport():buildReport();
  });
}
function b64bytes(b){var s=atob(b),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u}
// PDF minimale: una immagine JPEG per pagina A4
function pdfFromJpegs(pages){
  var parts=[],len=0,offs=[];
  function add(x){var u=typeof x==='string'?new TextEncoder().encode(x):x;parts.push(u);len+=u.length}
  function obj(n,body){offs[n]=len;add(n+' 0 obj\n');(Array.isArray(body)?body:[body]).forEach(add);add('\nendobj\n')}
  add('%PDF-1.4\n%\xE2\xE3\n');
  var N=pages.length, kids=[];
  for(var i=0;i<N;i++)kids.push((3+i*3)+' 0 R');
  obj(1,'<< /Type /Catalog /Pages 2 0 R >>');
  obj(2,'<< /Type /Pages /Kids ['+kids.join(' ')+'] /Count '+N+' >>');
  pages.forEach(function(p,i){
    var po=3+i*3, io=po+1, co=po+2, cs='q 595.28 0 0 841.89 0 0 cm /Im0 Do Q';
    obj(po,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 '+io+' 0 R >> >> /Contents '+co+' 0 R >>');
    obj(io,['<< /Type /XObject /Subtype /Image /Width '+p.w+' /Height '+p.h+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+p.b.length+' >>\nstream\n',p.b,'\nendstream']);
    obj(co,'<< /Length '+cs.length+' >>\nstream\n'+cs+'\nendstream');
  });
  var total=3+N*3, xref=len, x='xref\n0 '+total+'\n0000000000 65535 f \n';
  for(var k=1;k<total;k++)x+=('0000000000'+offs[k]).slice(-10)+' 00000 n \n';
  add(x+'trailer\n<< /Size '+total+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF');
  return new Blob(parts,{type:'application/pdf'});
}
// condivisione file: serve un tocco dell'utente, quindi si mostra un foglio con i pulsanti
function fileReadySheet(file){
  var canShare=!!(navigator.canShare&&navigator.canShare({files:[file]}));
  openSheet('<h2>✓ '+esc(file.name)+'</h2><div class="mini" dir="ltr">'+(file.size/1024).toFixed(0)+' KB</div>'+
   (canShare?'<button class="btn main" id="fshare">'+T('share')+'</button>':'')+
   '<button class="btn ghost" style="width:100%;margin-top:10px" id="fdl">'+T('download')+'</button>');
  if(canShare)$('#fshare').onclick=function(){navigator.share({files:[file],title:file.name}).then(closeSheet,function(){})};
  $('#fdl').onclick=function(){var u=URL.createObjectURL(file),a=document.createElement('a');a.href=u;a.download=file.name;a.target='_blank';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},60000)};
  if(!A) toast(T('pdfOk'));
}
window.onPdfDone=function(ok){toast(ok?T('pdfOk'):T('pdfErr'))};

/* =====================================================================
   EVENTI
   ===================================================================== */
document.addEventListener('click',function(e){
  var cs=e.target.closest('[data-cs-k]');
  if(cs){var k=cs.dataset.csK;cs.parentNode.querySelectorAll('[data-cs-k]').forEach(function(x){x.classList.toggle('on',x===cs)});calcSet(k,cs.dataset.csV);return}
  var b=e.target.closest('[data-act],[data-tab]'); if(!b||b.disabled) return;
  if(b.dataset.tab){view.tab=b.dataset.tab;view.cat=null;clearSearch();render();window.scrollTo(0,0);return}
  var a=b.dataset.act, v=b.dataset.v, L=cur().lines;
  switch(a){
   case 'cat': view.cat=v;render();window.scrollTo(0,0);break;
   case 'back': view.cat=null;render();break;
   case 'item': itemSheet(IBY[v]);break;
   case 'fav': var y=window.scrollY;toast(L4(toggleFav(v)?XT.favAdd:XT.favDel));render();window.scrollTo(0,y);break;
   case 'kit': kitSheet(DB.kits.find(function(k){return k.id===v}));break;
   case 'custom': customSheet(v||'');break;
   case 'siteopen': cur().site.open=true;save();render();break;
   case 'siteclose': cur().site.open=false;save();render();break;
   case 'place': cur().site.luogo=cur().site.luogo===v?'':v;save();render();break;
   case 'inc': case 'dec':
    var l=L[+v],st=unit(l.unit).step;l.qty=Math.max(0,Math.round((l.qty+(a==='inc'?st:-st))*100)/100);if(l.qty===0)L.splice(+v,1);save();render();break;
   case 'del': L.splice(+v,1);save();render();break;
   case 'clear': confirmSheet(T('clearQ'),T('clear'),function(){cur().lines=[];save();render()});break;
   case 'preview': openSheet('<h2>'+T('previewT')+'</h2><pre dir="'+(settings.out==='ar'?'rtl':'ltr')+'" style="white-space:pre-wrap;font-family:inherit;font-size:14px;background:#F3F4F8;padding:12px;border-radius:12px;text-align:start">'+esc(buildText(false))+'</pre>');break;
   // progetti
   case 'projclose': view.tab='mat';render();break;
   case 'projnew': newProject();break;
   case 'projopen': openProject(v);break;
   case 'projdup':
    if(dupProj(v))render();break;
   case 'projdel':
    confirmSheet(T('delProjQ'),T('del'),function(){P.list=P.list.filter(function(p){return p.id!==v});if(P.cur===v){P.cur=null;cur()}save();render()});break;
   // admin
   case 'admexit': view.tab='mat';view.adm=null;render();window.scrollTo(0,0);break;
   case 'adm': view.adm={page:v};render();window.scrollTo(0,0);break;
   case 'admcat': view.adm={page:'items',cat:v};render();window.scrollTo(0,0);break;
   case 'admpw': pwChangeSheet();break;
   case 'admreset': confirmSheet(T('resetQ'),T('admReset'),function(){DB=defaultDBFor(packId());saveDB(true);render();toast(T('resetDone'))});break;
   case 'admup': case 'admdown': case 'admhide':
    var arr=listOf(b.dataset.k,v), i=arr.findIndex(function(x){return x.id===v});
    if(i<0)break;
    if(a==='admhide') arr[i].hidden=!arr[i].hidden; else move(arr,i,a==='admup'?-1:1);
    saveDB();render();break;
   case 'catnew': catSheet(null);break;
   case 'catedit': catSheet(CBY[v]);break;
   case 'itemnew': itemEditSheet(null,v);break;
   case 'itemedit': itemEditSheet(IBY[v]);break;
   case 'kitnew': kitEditSheet(null);break;
   case 'kitedit': kitEditSheet(DB.kits.find(function(k){return k.id===v}));break;
   case 'export': exportBackup();break;
   case 'clients': clientsSheet();break;
   case 'newproj': startNew();break;
   case 'sitesave': var pp=cur(); if(!pp.name&&pp.site.cliente) pp.name=''; save(); toast(T('projSaved')); break;
   case 'calcopen': view.calc=v;render();window.scrollTo(0,0);break;
   case 'calcback': view.calc=null;render();break;
   case 'calcclose': view.tab='mat';view.calc=null;render();break;
   case 'check': checkSheet();break;
   case 'hours': hoursSheet();break;
   case 'svc': quoteLineSheet(SBY[v]);break;
   case 'qcustom': quoteLineSheet({sid:null,unit:'pz',price:null});break;
   case 'qedit': var ql=cur().quote.lines[+v];quoteLineSheet(Object.assign({},ql,{id:ql.sid}),+v);break;
   case 'qdel': cur().quote.lines.splice(+v,1);save();render();break;
   case 'qinc': case 'qdec': var qq=cur().quote.lines[+v];qq.qty=Math.max(0,qq.qty+(a==='qinc'?1:-1));if(!qq.qty)cur().quote.lines.splice(+v,1);save();render();break;
   case 'qrate': cur().quote.rate=+v;save();render();break;
   case 'qclear': confirmSheet(T('clearQuoteQ'),T('clear'),function(){cur().quote={lines:[],sconto:0,iva:false,rate:0};save();render()});break;
   case 'svcnew': svcEditSheet(null);break;
   case 'svcedit': svcEditSheet(SBY[v]);break;
   case 'svcreset': confirmSheet(T('resetSvcQ'),T('resetSvc'),function(){DB.svc=defaultSvcFor(packId());saveDB();render();toast(T('resetDone'))});break;
   case 'import': importBackup();break;
  }
});
/* ---- pressione lunga su una riga della richiesta: duplica / elimina ---- */
function lineMenu(i){
  var L=cur().lines,l=L[i];if(!l)return;
  openSheet('<h2>'+esc(N(l))+'</h2>'+(lineSub(l)?'<div class="it">'+lineSub(l)+' · '+fmt(l.qty)+' '+N(unit(l.unit))+'</div>':'')+
   '<button class="btn main" id="lmDup">'+L4(XT.dupLine)+'</button>'+
   '<button class="btn ghost" id="lmDel" style="width:100%;margin-top:8px;padding:14px;color:var(--danger)">'+L4(XT.delLine)+'</button>');
  $('#lmDup').onclick=function(){L.splice(i+1,0,JSON.parse(JSON.stringify(l)));save();closeSheet();render();toast(L4(XT.lineDup))};
  $('#lmDel').onclick=function(){L.splice(i,1);save();closeSheet();render()};
}
(function(){
  var tm=null,x0=0,y0=0,fired=false;
  function cancel(){if(tm){clearTimeout(tm);tm=null}}
  main.addEventListener('pointerdown',function(e){
    var ln=e.target.closest&&e.target.closest('.line[data-li]');fired=false;cancel();
    if(!ln||e.target.closest('button,input'))return;
    x0=e.clientX;y0=e.clientY;
    tm=setTimeout(function(){tm=null;fired=true;try{if(navigator.vibrate)navigator.vibrate(15)}catch(x){}lineMenu(+ln.dataset.li)},550);
  });
  main.addEventListener('pointermove',function(e){if(tm&&(Math.abs(e.clientX-x0)>10||Math.abs(e.clientY-y0)>10))cancel()});
  ['pointerup','pointercancel','pointerleave'].forEach(function(t){main.addEventListener(t,function(){cancel();if(fired)setTimeout(function(){fired=false},400)})});
  main.addEventListener('contextmenu',function(e){if(e.target.closest&&e.target.closest('.line[data-li]'))e.preventDefault()});
  main.addEventListener('click',function(e){if(fired){fired=false;e.stopPropagation();e.preventDefault()}},true);
})();
main.addEventListener('input',function(e){
  var t=e.target;
  if(t.dataset.cf){calcSet(t.dataset.cf,t.value);return}
  if(t.dataset.f){cur().site[t.dataset.f]=t.value;save()}
  if(t.id==='pq'){projQ=t.value;var pos=t.selectionStart;render();var n=$('#pq');if(n){n.focus();try{n.setSelectionRange(pos,pos)}catch(x){}}}
});
main.addEventListener('change',function(e){
  var t=e.target;
  if(t.dataset.q!=null){var i=+t.dataset.q,v=num(t.value),L=cur().lines;if(v<=0)L.splice(i,1);else L[i].qty=v;save();render()}
  if(t.dataset.qq!=null){var j=+t.dataset.qq,w=num(t.value),QL=cur().quote.lines;if(w<=0)QL.splice(j,1);else QL[j].qty=w;save();render()}
  if(t.id==='qsc'){cur().quote.sconto=num(t.value);save();render()}
  if(t.id==='qiva'){cur().quote.iva=t.checked;save();render()}
});
var qi=$('#q');
qi.addEventListener('input',function(){view.q=qi.value.trim();$('#qx').style.display=view.q?'block':'none';render()});
function clearSearch(){qi.value='';view.q='';$('#qx').style.display='none'}
$('#qx').onclick=function(){clearSearch();render()};
$('#btnSettings').onclick=settingsSheet;
$('#btnCalc').onclick=function(){view.tab='calc';view.calc=null;clearSearch();render();window.scrollTo(0,0)};
$('#btnLang').onclick=function(){
  openSheet('<h2>🌐 '+T('uiLang')+'</h2>'+LANGS.map(function(l){return '<button class="contact" data-pl="'+l[0]+'" style="'+(l[0]===settings.ui?'border-color:var(--brand);border-width:2px':'')+'"><span class="ci" style="background:var(--brand);font-size:13px">'+l[0].toUpperCase()+'</span><div><b>'+l[1]+'</b></div></button>'}).join(''));
  sheet.querySelectorAll('[data-pl]').forEach(function(b){b.onclick=function(){settings.ui=b.dataset.pl;saveSettings();closeSheet();applyLang();render()}});
};
$('#btnProj').onclick=function(){save();view.tab='projects';projQ='';render();window.scrollTo(0,0)};
$('#btnWa').onclick=doWa; $('#btnCopy').onclick=doCopy; $('#btnPdf').onclick=doPdf;

window.appBack=function(){
  if(document.getElementById('regOv'))return true;
  if(sheetOpen){if(!sheetLocked)closeSheet();return true}
  if(view.tab==='admin'){
    var a=view.adm||{};
    if(a.page==='items'){view.adm={page:'cats'};render();return true}
    if(a.page&&a.page!=='home'){view.adm={page:'home'};render();return true}
    view.tab='mat';view.adm=null;render();return true;
  }
  if(view.tab==='projects'){view.tab='mat';render();return true}
  if(view.tab==='calc'){if(view.calc)view.calc=null;else view.tab='mat';render();return true}
  if(view.q){clearSearch();render();return true}
  if(view.cat){view.cat=null;render();return true}
  if(view.tab!=='mat'){view.tab='mat';render();return true}
  return false;
};
if(!window.LM_RELEASE)window.__test={buildQuoteText:buildQuoteText,buildQuoteReport:buildQuoteReport,cur:cur,P:function(){return P},DB:function(){return DB},settings:function(){return settings},buildText:buildText,buildReport:buildReport,sha:pwHash};

/* =====================================================================
   STATISTICHE ANONIME (GoatCounter: niente cookie, niente dati personali)
   Si invia solo un percorso, es. /open/android. Il Paese lo calcola GoatCounter dall'IP, senza salvarlo.
   ===================================================================== */
var STATS_CODE=window.LM_STATS||'';
function anonId(){
  if(!settings.anon){var c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',r='';for(var i=0;i<6;i++)r+=c[Math.floor(Math.random()*c.length)];settings.anon='U-'+r;settings.installed=Date.now();saveSettings()}
  return settings.anon;
}
function ping(path,title){
  if(!STATS_CODE) return;
  try{
    var u='https://'+STATS_CODE+'.goatcounter.com/count?p='+encodeURIComponent(path)+'&t='+encodeURIComponent(title||path)+'&e=true&rnd='+Math.random().toString(36).slice(2);
    var im=new Image(); im.referrerPolicy='no-referrer'; im.src=u;
  }catch(e){}
}
function statsStart(){
  var plat=A?'android':(/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)&&'ontouchend' in document?'ios':'web');
  var first=!settings.anon; anonId();
  if(first) ping('/install/'+plat,'Installazione '+plat);
  ping('/open/'+plat,'Apertura '+plat);
  var today=new Date().toISOString().slice(0,10);
  if(settings.lastDay!==today){
    settings.lastDay=today; settings.days=(settings.days||0)+1; saveSettings();
    ping('/user/'+settings.anon,'Utente attivo (giorni)');
    var d=settings.days, b=d>=30?'30+':d>=8?'8-29':d>=2?'2-7':'1';
    ping('/fedelta/'+b+'-giorni','Utenti per giorni di uso');
    ping('/lingua/'+settings.ui,'Lingua app');
  }
}
window.lmPing=ping;
// durata d'uso: si conta all'uscita dall'app, raggruppata in fasce
var sessStart=Date.now();
function sessEnd(){
  if(!sessStart) return;
  var min=(Date.now()-sessStart)/60000; sessStart=0;
  if(min<0.2) return;
  var b=min<1?'0-1':min<5?'1-5':min<15?'5-15':min<30?'15-30':'30+';
  ping('/tempo/'+b+'-min','Durata uso (minuti)');
}
function sessResume(){if(!sessStart)sessStart=Date.now()}
window.lmPause=sessEnd; window.lmResume=sessResume;
document.addEventListener('visibilitychange',function(){if(document.hidden)sessEnd();else sessResume()});
window.addEventListener('pagehide',sessEnd);

/* =====================================================================
   REGISTRAZIONE OBBLIGATORIA (nome + Paese) → foglio Google del proprietario
   Indirizzo dello script (Google Apps Script /exec): da version.json "reg_url" (impostato dall'app admin).
   Se non c'è rete, la registrazione resta in coda e si invia al prossimo avvio.
   ===================================================================== */
var COUNTRIES=[['Italia','إيطاليا'],['Marocco','المغرب'],['Tunisia','تونس'],['Algeria','الجزائر'],['Egitto','مصر'],['Libia','ليبيا'],['Mauritania','موريتانيا'],['Sudan','السودان'],['Siria','سوريا'],['Libano','لبنان'],['Giordania','الأردن'],['Palestina','فلسطين'],['Iraq','العراق'],['Arabia Saudita','السعودية'],['Emirati Arabi','الإمارات'],['Qatar','قطر'],['Kuwait','الكويت'],['Oman','عُمان'],['Bahrein','البحرين'],['Yemen','اليمن'],['Francia','فرنسا'],['Spagna','إسبانيا'],['Germania','ألمانيا'],['Belgio','بلجيكا'],['Paesi Bassi','هولندا'],['Svizzera','سويسرا'],['Regno Unito','بريطانيا'],['Senegal','السنغال'],['Bangladesh','بنغلاديش'],['Pakistan','باكستان'],['Albania','ألبانيا'],['Romania','رومانيا'],['Altro','بلد آخر']];
var JOBS=[['dipendente','كهربائي أعمل عند شركة','Elettricista dipendente','Employed electrician','Électricien salarié'],['proprio','كهربائي أعمل لحسابي','Elettricista in proprio','Self-employed electrician','Électricien indépendant'],['ditta','صاحب شركة','Titolare di ditta','Company owner','Chef d\'entreprise'],['altro','عمل آخر','Altro lavoro','Other job','Autre métier']];
var JOBS_G={dipendente:['أعمل عند شركة','Dipendente','Employee','Salarié'],proprio:['أعمل لحسابي','In proprio','Self-employed','Indépendant']};
function jobName(j,tr){if(tr&&tr!=='ele'&&JOBS_G[j[0]]){var ix={ar:0,it:1,en:2,fr:3}[settings.ui];return JOBS_G[j[0]][ix==null?1:ix]}return j[{ar:1,it:2,en:3,fr:4}[settings.ui]||2]}
var REG_T={
 ar:{title:'👋 أهلاً بك في «طلب مواد»',sub:'سجّل مرة واحدة فقط لتبدأ استعمال التطبيق.',name:'الاسم واللقب',country:'البلد الذي تعمل فيه',city:'المدينة (اختياري)',job:'عملك',go:'ابدأ ✓',need:'اكتب اسمك واختر البلد',priv:'نستعمل اسمك وبلدك فقط لمعرفة من يستعمل التطبيق وتحسينه. لا نبيعها ولا نعطيها لأحد.',other:'اكتب اسم البلد'},
 it:{title:'👋 Benvenuto in «Richiesta materiale»',sub:'Registrati una sola volta per iniziare a usare l\'app.',name:'Nome e cognome',country:'Paese in cui lavori',city:'Città (facoltativo)',job:'Il tuo lavoro',go:'Inizia ✓',need:'Scrivi il nome e scegli il Paese',priv:'Usiamo nome e Paese solo per sapere chi usa l\'app e migliorarla. Non li vendiamo né li cediamo a nessuno.',other:'Scrivi il Paese'},
 en:{title:'👋 Welcome to «Material request»',sub:'Register just once to start using the app.',name:'Full name',country:'Country where you work',city:'City (optional)',job:'Your job',go:'Start ✓',need:'Write your name and choose the country',priv:'We use your name and country only to know who uses the app and to improve it. We never sell or share them.',other:'Write the country'},
 fr:{title:'👋 Bienvenue dans «Demande de matériel»',sub:'Inscrivez-vous une seule fois pour utiliser l\'appli.',name:'Nom et prénom',country:'Pays où vous travaillez',city:'Ville (facultatif)',job:'Votre métier',go:'Commencer ✓',need:'Écrivez votre nom et choisissez le pays',priv:'Nous utilisons votre nom et votre pays uniquement pour savoir qui utilise l\'appli et l\'améliorer. Nous ne les vendons ni ne les cédons.',other:'Écrivez le pays'}
};
function regTxt(k){return (REG_T[settings.ui]||REG_T.it)[k]}
function regPending(){return settings.reg&&!settings.reg.sent}
function regUrl(){return settings.regUrl||window.LM_REG||''}
function plat(){return A?'android':(/iPad|iPhone|Macintosh/.test(navigator.userAgent)&&'ontouchend' in document?'ios':'web')}
function postReg(fields){
  var u=regUrl(); if(!u) return Promise.reject();
  var fd=new URLSearchParams(); Object.keys(fields).forEach(function(k){if(fields[k]!=null)fd.append(k,fields[k])});
  return fetch(u,{method:'POST',mode:'no-cors',body:fd});
}
function sendReg(){
  if(!settings.reg||settings.reg.sent||!regUrl()) return;
  var r=settings.reg;
  postReg({tipo:'iscrizione',nome:r.nome,paese:r.paese,citta:r.citta,lavoro:r.lavoro+((r.mestiere||'ele')!=='ele'?'|'+r.mestiere:''),codice:anonId(),versione:appVersion(),dispositivo:plat(),lingua:settings.ui,giorni:settings.days||1})
   .then(function(){r.sent=Date.now();settings.seenSent=new Date().toISOString().slice(0,10);saveSettings()},function(){});
}
// accesso giornaliero: aggiorna "ultimo accesso" e "giorni di uso" nel foglio
function sendSeen(){
  if(!settings.reg||!settings.reg.sent||!regUrl()) return;
  var today=new Date().toISOString().slice(0,10); if(settings.seenSent===today) return;
  postReg({tipo:'visto',codice:anonId(),versione:appVersion(),giorni:settings.days||1})
   .then(function(){settings.seenSent=today;saveSettings()},function(){});
}
function regScreen(){
  if(settings.reg) return false;
  var ov=document.createElement('div');
  ov.id='regOv';
  ov.setAttribute('style','position:fixed;inset:0;z-index:90;background:var(--bg);overflow:auto;padding:24px 16px calc(24px + env(safe-area-inset-bottom))');
  var cOpts='<option value="">—</option>'+COUNTRIES.map(function(c){return '<option value="'+c[0]+'">'+(settings.ui==='ar'?c[1]+' · '+c[0]:c[0])+'</option>'}).join('');
  ov.innerHTML='<div style="max-width:520px;margin:0 auto">'+
   '<div style="text-align:center;margin:10px 0 18px"><img src="'+(window.LM_ICON||'')+'" onerror="this.remove()" style="width:72px;height:72px;border-radius:18px"><h2 style="margin:10px 0 4px;font-size:21px">'+regTxt('title')+'</h2><div class="mini">'+regTxt('sub')+'</div></div>'+
   '<div class="seg" style="margin-bottom:6px;flex-wrap:wrap">'+LANGS.map(function(l){return '<button class="chip'+(settings.ui===l[0]?' on':'')+'" data-rl="'+l[0]+'">'+l[1]+'</button>'}).join('')+'</div>'+
   '<div class="card"><div class="field"><label>'+regTxt('name')+' *</label><input id="rgN" autocomplete="name"></div>'+
   '<div class="field"><label>'+regTxt('country')+' *</label><select id="rgC" style="width:100%;border:1px solid var(--line);border-radius:10px;padding:10px 12px;background:#FAFBFD;font:inherit">'+cOpts+'</select></div>'+
   '<div class="field" id="rgOW" style="display:none"><label>'+regTxt('other')+'</label><input id="rgO"></div>'+
   '<div class="field"><label>'+regTxt('city')+'</label><input id="rgCi"></div>'+
   '<div class="field"><label>'+L4(XT.tradeT)+'</label><div class="chips">'+tradeList().map(function(t){return '<button class="chip'+(t[0]===tradeId()?' on':'')+'" data-rt="'+t[0]+'">'+t[1]+' '+esc(t[2][settings.ui]||t[2].it)+'</button>'}).join('')+'</div></div>'+
   '<div class="field"><label>'+regTxt('job')+'</label><div class="chips" id="rgJobs"></div></div>'+
   '<div class="mini" style="margin-top:12px">🔒 '+regTxt('priv')+'</div>'+
   '<button class="btn main" id="rgGo">'+regTxt('go')+'</button></div></div>';
  document.body.appendChild(ov);
  var job='dipendente', rtr=tradeId();
  function jobs(){var w=ov.querySelector('#rgJobs');w.innerHTML=JOBS.map(function(j){return '<button class="chip'+(j[0]===job?' on':'')+'" data-rj="'+j[0]+'">'+jobName(j,rtr)+'</button>'}).join('');
    w.querySelectorAll('[data-rj]').forEach(function(b){b.onclick=function(){job=b.dataset.rj;w.querySelectorAll('[data-rj]').forEach(function(x){x.classList.toggle('on',x===b)})}})}
  jobs();
  ov.querySelectorAll('[data-rt]').forEach(function(b){b.onclick=function(){rtr=b.dataset.rt;ov.querySelectorAll('[data-rt]').forEach(function(x){x.classList.toggle('on',x===b)});jobs()}});
  ov.querySelectorAll('[data-rl]').forEach(function(b){b.onclick=function(){settings.ui=b.dataset.rl;saveSettings();applyLang();render();ov.remove();regScreen()}});
  ov.querySelector('#rgC').onchange=function(){ov.querySelector('#rgOW').style.display=this.value==='Altro'?'block':'none'};
  ov.querySelector('#rgGo').onclick=function(){
    var n=ov.querySelector('#rgN').value.trim(), c=ov.querySelector('#rgC').value;
    if(c==='Altro') c=ov.querySelector('#rgO').value.trim();
    if(n.length<2||!c){toast(regTxt('need'));return}
    settings.reg={nome:n,paese:c,citta:ov.querySelector('#rgCi').value.trim(),lavoro:job,mestiere:rtr,at:Date.now(),sent:0};
    if(!settings.tecnico) settings.tecnico=n;
    if(c==='Marocco'&&(window.LM_PACKS||{}).MA) setCountry('MA');
    saveSettings(); if(rtr!==tradeId()) setTrade(rtr); ov.remove();
    ping('/iscritto/'+c.replace(/[\/?#]/g,' '),'Nuovo iscritto (Paese)');
    sendReg(); render();
  };
  return true;
}

/* =====================================================================
   AGGIORNAMENTI / التحديثات
   version.json pubblico su GitHub Pages: {versionCode, versionName, apk, notes_ar, notes_it}
   ===================================================================== */
var UPD_BASE='https://mohamed203055.github.io/lista-materiale-web/';
function verNum(v){var m=String(v||'').match(/(\d+)\.(\d+)\.(\d+)/);return m?(+m[1])*1e6+(+m[2])*1e3+(+m[3]):0}
function checkUpdate(manual){
  if(!window.fetch) return;
  fetch(UPD_BASE+'version.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(v){
    if(v.reg_url&&v.reg_url!==settings.regUrl){settings.regUrl=v.reg_url;saveSettings()}
    sendReg();sendSeen();
    if(v.packs) checkPacks(v.packs);
    checkPeople(v.people_ver);
    showBroadcast(v.message);
    if(v.apk&&v.send!==false&&settings.liveApk!==v.apk){settings.liveApk=v.apk;saveSettings()}
    var newer;
    if(v.send===false) newer=false;
    else if(A&&A.versionCode) newer=(+v.versionCode||0)>(+A.versionCode()||0);
    else newer=verNum(v.versionName)>verNum(appVersion());
    if(!newer){if(manual)toast(T('updNone'));return}
    if(!manual&&!v.force&&settings.updSkip===v.versionName&&settings.updSkipDay===new Date().toISOString().slice(0,10)) return;
    updSheet(v);
  }).catch(function(){if(manual)toast(T('updErr'))});
}
// messaggio libero scritto dal proprietario in version.json → "message": {"id","ar","it","link"}
function showBroadcast(m){
  if(!m||!m.id||(settings.msgSeen||[]).indexOf(m.id)>=0) return;
  var txt=(m[settings.ui]||(settings.ui==='ar'?m.ar:m.it)||m.it||m.ar)||''; if(!txt) return;
  if(sheetOpen){setTimeout(function(){showBroadcast(m)},4000);return}
  openSheet('<h2>📢 '+T('newMsg')+'</h2><div class="note" style="white-space:pre-line;font-size:15px">'+esc(txt)+'</div>'+
   (m.link?'<button class="btn ghost" style="width:100%;margin-top:10px" id="bmLink">🔗 '+T('openLink')+'</button>':'')+
   '<button class="btn main" id="bmOk">'+T('ok')+'</button>');
  function seen(){settings.msgSeen=(settings.msgSeen||[]).concat([m.id]).slice(-30);saveSettings()}
  if(m.link)$('#bmLink').onclick=function(){seen();openUrl(m.link)};
  $('#bmOk').onclick=function(){seen();closeSheet()};
  ping('/messaggio/'+m.id,'Messaggio letto');
}
function checkPacks(vers){
  Object.keys(vers).forEach(function(cc){
    var have=packData(cc); if(have&&have.version>=vers[cc]) return;
    fetch(UPD_BASE+'packs/'+cc+'.json?v='+vers[cc],{cache:'no-store'}).then(function(r){return r.json()}).then(function(p){
      if(!p||!p.cats) return; put('lm_pack_'+cc,p); window.LM_PACKS=window.LM_PACKS||{}; if(!window.LM_PACKS[cc]||window.LM_PACKS[cc].version<p.version) window.LM_PACKS[cc]=p;
      if(packId()===cc){DB=loadDB();put(dbKey(),DB);reindex();render()}
    }).catch(function(){});
  });
}
function updSheet(v){
  var notes=(v['notes_'+settings.ui]||(settings.ui==='ar'?v.notes_ar:v.notes_it))||'';
  openSheet('<h2>'+T('updTitle')+'</h2><div class="mini" dir="ltr">v'+esc(v.versionName)+'</div>'+
   (notes?'<div class="note" style="white-space:pre-line">'+esc(notes)+'</div>':'')+
   '<div id="updMsg" class="mini" style="margin-top:10px"></div>'+
   '<div style="height:10px;background:#EEF0F4;border-radius:6px;margin-top:8px;overflow:hidden;display:none" id="updBarW"><div id="updBar" style="height:100%;width:0;background:var(--brand)"></div></div>'+
   '<button class="btn main" id="updGo">'+T('updNow')+'</button>'+
   (v.force?'':'<button class="btn ghost" style="width:100%;margin-top:10px" id="updNo">'+T('updLater')+'</button>'));
  if(v.force){sheetLocked=true}
  if(!v.force)$('#updNo').onclick=function(){settings.updSkip=v.versionName;settings.updSkipDay=new Date().toISOString().slice(0,10);saveSettings();closeSheet()};
  $('#updGo').onclick=function(){
    ping('/aggiornamento/'+v.versionName,'Aggiornamento');
    if(A&&A.update){
      $('#updGo').disabled=true;$('#updBarW').style.display='block';$('#updMsg').textContent=T('updDl');
      var apk=v.apk||'TalabMawad.apk';A.update((/^https?:\/\//.test(apk)?apk:UPD_BASE+apk+'?v='+encodeURIComponent(v.versionName)));
    }else{
      $('#updMsg').textContent=T('updWeb');
      var done=function(){location.reload()};
      if(window.caches&&caches.keys) caches.keys().then(function(k){return Promise.all(k.map(function(x){return caches.delete(x)}))}).then(done,done); else done();
    }
  };
}
window.onUpdProgress=function(p){var b=$('#updBar');if(b)b.style.width=p+'%';var m=$('#updMsg');if(m)m.textContent=T('updDl')+' '+p+'%'};
window.onUpdNeedPermission=function(){var m=$('#updMsg');if(m)m.textContent=T('updPerm')};
window.onUpdInstalling=function(){var m=$('#updMsg');if(m)m.textContent=T('updInst');var g=$('#updGo');if(g)g.disabled=false};
window.onUpdError=function(){var m=$('#updMsg');if(m)m.textContent=T('updErr');var g=$('#updGo');if(g)g.disabled=false};

reindex(); cur(); save(); applyLang(); render(); setTimeout(statsStart,1500); setTimeout(function(){checkUpdate(false)},3000);
if(!regScreen()) setTimeout(function(){sendReg();sendSeen()},2500);
})();
