// Richiesta materiale / طلب مواد — logica dell'app
(function(){
'use strict';
// protezione: la versione web funziona solo dal sito ufficiale (una copia su un altro sito non parte)
(function(){var h=location.hostname,ok=['siteneeds.net','www.siteneeds.net','mohamed203055.github.io','localhost','127.0.0.1'];
  if(/^https?:$/.test(location.protocol)&&h&&ok.indexOf(h)<0){document.documentElement.innerHTML='<body style="font-family:sans-serif;padding:40px;text-align:center"><h2>⚠️</h2><p>نسخة غير أصلية — Copia non originale</p><p><a href="https://mohamed203055.github.io/lista-materiale-web/">mohamed203055.github.io/lista-materiale-web</a></p></body>';throw new Error('x')}})();
var $=function(s){return document.querySelector(s)};
var main=$('#main');
var A=window.Android;

/* =====================================================================
   TESTI / النصوص
   ===================================================================== */
// ---- Español: traduzione dall'inglese (mappa in lang.js) con prefissi per i nomi composti ----
var ESM=window.LM_ES||{},ESK=Object.keys(ESM).filter(function(k){return / $/.test(k)}).sort(function(a,b){return b.length-a.length});
function ESx(s){if(s==null||typeof s!=='string')return s;if(ESM[s]!=null)return ESM[s];for(var i=0;i<ESK.length;i++){if(s.indexOf(ESK[i])===0)return ESM[ESK[i]]+s.slice(ESK[i].length)}
  var m=/^([^A-Za-z]*)(.*?)([^A-Za-z]*)$/.exec(s);if(m&&m[2]&&ESM[m[2]]!=null)return m[1]+ESM[m[2]]+m[3];return s}
function TL(o,l){if(!o)return '';if(l==='es')return o.es||(o.en!=null?ESx(o.en):o.it);return o[l]||o.it}
function esMap(o){var r={};Object.keys(o||{}).forEach(function(k){var v=o[k];r[k]=typeof v==='string'?ESx(v):(v&&typeof v==='object'&&!Array.isArray(v)?esMap(v):v)});return r}
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
  contact:'📞 تواصل معنا',contactHint:'وجدت خطأ أو عندك فكرة؟ راسلنا وسنصلحه.',report:'أبلغ عن خطأ عبر واتساب',call:'اتصال',reportMsg:'مرحباً، عندي ملاحظة عن تطبيق «SiteNeeds»:',
  // progetti
  projects:'📁 مشاريعي',newProj:'➕ مشروع جديد',projEmpty:'لا توجد مشاريع محفوظة بعد.',current:'الحالي',open:'فتح',dup:'نسخ',
  noName:'بدون اسم',saveT:'💾 حفظ المشروع',saveHint:'المشروع يُحفظ تلقائياً. اكتب اسماً لتجده بسهولة لاحقاً.',projName:'اسم المشروع',projNameP:'مثلاً: شقة Rossi – Via Appia',
  projSaved:'حُفظ المشروع ✓',delProjQ:'حذف هذا المشروع نهائياً؟',opened:'فُتح المشروع:',dupDone:'تم نسخ المشروع',searchProj:'ابحث في المشاريع…',lines:'مادة',
  // admin
  admin:'🔒 الإدارة',adminSub:'تعديل المواد والفئات والأسعار والصور',pw:'كلمة السر',pwWrong:'كلمة السر غير صحيحة',enter:'دخول',exit:'خروج',
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
  contact:'📞 Contatti',contactHint:'Hai trovato un errore o hai un\'idea? Scrivici e lo sistemiamo.',report:'Segnala un errore su WhatsApp',call:'Chiama',reportMsg:'Ciao, ho una segnalazione sull\'app «SiteNeeds»:',
  projects:'📁 I miei progetti',newProj:'➕ Nuovo progetto',projEmpty:'Nessun progetto salvato.',current:'attuale',open:'Apri',dup:'Duplica',
  noName:'Senza nome',saveT:'💾 Salva progetto',saveHint:'Il progetto si salva da solo. Dagli un nome per ritrovarlo facilmente.',projName:'Nome progetto',projNameP:'es. Appartamento Rossi – Via Appia',
  projSaved:'Progetto salvato ✓',delProjQ:'Eliminare definitivamente questo progetto?',opened:'Aperto:',dupDone:'Progetto duplicato',searchProj:'Cerca nei progetti…',lines:'voci',
  admin:'🔒 Amministrazione',adminSub:'Modifica materiali, categorie, prezzi e foto',pw:'Password',pwWrong:'Password errata',enter:'Entra',exit:'Esci',
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
var LANGS=[['ar','العربية'],['it','Italiano'],['es','Español'],['en','English'],['fr','Français']];
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
  if(lang==='es')return trSize(x,'en').replace(/[A-Za-z]+(?: [A-Za-z]+)?/g,function(w){return ESM[w]!=null?ESM[w]:w.split(' ').map(function(z){return ESM[z]!=null?ESM[z]:z}).join(' ')});
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
  var t=(window.LM_NAMES||{})[o.it];if(lang==='es'){var en=o.en||(t&&t[0]);return en?ESx(en):(o.it||'')}return (t&&t[lang==='en'?0:1])||o.it||'';
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
// prima apertura: lingua del telefono (it / ar / en / fr); altrimenti in base al fuso orario, poi inglese
function phoneLang(){
  var L=[];try{L=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''])}catch(e){}
  for(var i=0;i<L.length;i++){var c=String(L[i]||'').toLowerCase().slice(0,2);if(c==='it'||c==='ar'||c==='en'||c==='fr')return c}
  var tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){}
  if(tz==='Europe/Rome')return 'it';
  if(/^Africa\/(Casablanca|Algiers|Tunis|Tripoli|Cairo)|^Asia\/(Riyadh|Dubai|Amman|Beirut|Baghdad|Damascus|Qatar|Kuwait|Bahrain|Muscat|Gaza|Hebron)/.test(tz))return 'ar';
  if(tz==='Europe/Paris'||tz==='Europe/Brussels')return 'fr';
  return 'en';
}
if(!A&&!settings.reg&&!settings.uiPicked){settings.ui=phoneLang();if(settings.ui==='ar')settings.ui='en'} // web (iPhone/browser): mai arabo automatico
if(!settings.ui) settings.ui=phoneLang();
// ---- controllo remoto dall'admin (version.json → rc): interruttori + modifiche al catalogo per tutti ----
var RC=settings.rc||{};
function rcFlag(k){return !(RC.flags&&RC.flags[k]===false)}
if(!settings.out) settings.out='it';
function saveSettings(){put(K.set,settings)}
// ---- tema chiaro / scuro ----
function applyTheme(){
  var t=settings.theme||'auto';
  if(t==='auto') t=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  document.documentElement.setAttribute('data-theme',t);
  var m=document.querySelector('meta[name=theme-color]'); if(m) m.setAttribute('content',t==='dark'?'#121a33':'#1F4FD8');
}
applyTheme();
try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(){if(settings.theme==='auto')applyTheme()})}catch(e){}

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
function tradePack(cc){var td=tradeData();if(!td)return null;cc=cc||packId();return td.packs[cc]||(cc==='FR'&&td.packs.MA)||td.packs.IT}
function tradeList(){var l=[['ele','⚡',{ar:'كهربائي',it:'Elettricista',en:'Electrician',fr:'Électricien'}]];var T_=window.LM_TRADES||{};Object.keys(T_).forEach(function(k){if(rcFlag(k)||settings.trade===k)l.push([k,T_[k].ic,T_[k].name])});return l}
function tradeLabel(id){var t=tradeList().find(function(x){return x[0]===(id||tradeId())})||tradeList()[0];return t[1]+' '+TL(t[2],settings.ui)}
function profKey(){return tradeId()==='ele'?packId():tradeId()+'_'+packId()}
// ---- Paese / catalogo per Paese ----
function packId(){return settings.country||'IT'}
function packData(cc){cc=cc||packId();if(cc==='IT')return null;var cached=load('lm_pack_'+cc,null),b=(window.LM_PACKS||{})[cc];if(cached&&(!b||cached.version>b.version))return cached;return b||cached}
function packList(){var l=[{id:'IT',flag:'🇮🇹',name:{ar:'إيطاليا',it:'Italia',en:'Italy',fr:'Italie'}}];var P_=window.LM_PACKS||{};Object.keys(P_).forEach(function(k){if(rcFlag(k)||settings.country===k)l.push({id:k,flag:P_[k].flag,name:P_[k].name})});return l}
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
  settings.out=p?(cc==='FR'?'fr':(settings.ui==='ar'||settings.ui==='fr')?settings.ui:(p.outLang||'fr')):'it'; // Marocco: arabo o francese come il telefono
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
function rcKey(){var p=packId();return tradeId()+'_'+(p==='FR'?'MA':p)}
function rcApply(){
  var ov=RC.over||{}, adds=(RC.add||{})[rcKey()]||[], by={};
  DB.cats.forEach(function(c){by[c.id]=c;c.items=c.items.filter(function(i){return !i._rcadd})});
  adds.forEach(function(a){var c=by[a.cat];if(c&&a.id)c.items.push({id:a.id,it:a.it||'',ar:a.ar||a.it||'',fr:a.fr||'',unit:a.unit||'pz',sizes:a.sizes||[],colors:!!a.colors,hidden:false,_rcadd:1})});
  DB.cats.forEach(function(c){c.items.forEach(function(i){
    if(i._orig){['it','ar','fr','unit','sizes'].forEach(function(k){if(i._orig[k]===undefined)delete i[k];else i[k]=i._orig[k]});delete i._orig}
    delete i._rdel; var o=ov[i.id]; if(!o) return;
    if(o.del){i._rdel=1;return}
    i._orig={it:i.it,ar:i.ar,fr:i.fr,unit:i.unit,sizes:i.sizes};
    ['it','ar','fr','unit','sizes'].forEach(function(k){if(o[k]!==undefined&&o[k]!=='')i[k]=o[k]});
  })});
}
function reindex(){
  try{rcApply()}catch(e){}
  ITEMS=[];IBY={};CBY={};SBY={};GBY={};
  (DB.svc||[]).forEach(function(g){GBY[g.id]=g;g.list.forEach(function(x){x.grp=g.id;SBY[x.id]=x})});
  DB.cats.forEach(function(c){CBY[c.id]=c;c.items.forEach(function(i){i.cat=c.id;IBY[i.id]=i;ITEMS.push(i);i._s=norm(i.it+' '+i.ar+' '+trName(i,'en')+' '+trName(i,'fr')+' '+i.sizes.join(' '))})});
}

// ---- progetti ----
function blankProj(){return {id:uid('p'),trade:tradeId(),name:'',site:{cliente:'',indirizzo:'',luogo:'',note:'',open:false},lines:[],created:Date.now(),updated:Date.now()}}
var P=load(K.proj,null);
if(!P){
  P={cur:null,list:[]};
  var old=load(K.old,null);
  if(old&&(old.lines&&old.lines.length||old.site&&old.site.cliente)){var pr=blankProj();pr.site=old.site;pr.lines=old.lines;pr.created=old.created||Date.now();P.list.push(pr);P.cur=pr.id}
}
function ofTrade(p){return (p.trade||'ele')===tradeId()}
function cur(){var p=P.list.find(function(x){return x.id===P.cur});if(!p||!ofTrade(p)){p=P.list.filter(ofTrade).sort(function(a,b){return b.updated-a.updated})[0];if(p)P.cur=p.id}if(!p){p=blankProj();P.list.unshift(p);P.cur=p.id}if(!p.quote)p.quote={lines:[],sconto:0,iva:false,rate:0};return p}
function isEmpty(p){return !(p.panel&&((p.panel.mods&&p.panel.mods.length)||(p.panel.lts&&p.panel.lts.length)||(p.panel.plan&&p.panel.plan.els&&p.panel.plan.els.length)))&&!p.lines.length&&!(p.quote&&p.quote.lines.length)&&!p.site.cliente&&!p.site.indirizzo&&!p.site.note&&!p.name}
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
  addrP:'Rue …, Casablanca'},FR:{
  search:{ar:'ابحث… مثلاً prise، disjoncteur، gaine',it:'Cerca… es. disjoncteur, gaine, prise',en:'Search… e.g. disjoncteur, gaine, prise',fr:'Rechercher… ex. disjoncteur, gaine, prise'},
  noteP:{ar:'مثلاً: Legrand Céliane أبيض',it:'es. serie Legrand Céliane bianca',en:'e.g. Legrand Céliane white',fr:'ex. série Legrand Céliane blanche'},
  itemNoteP:{ar:'مثلاً Schneider Odace أبيض',it:'es. Schneider Odace bianco',en:'e.g. Schneider Odace white',fr:'ex. Schneider Odace blanc'},
  addrP:'Rue …, Paris'}};
var TRADE_TXT={edi:{
  search:{ar:'ابحث عن قطعة، إسمنت، بلاط...',it:'Cerca pezzo, cemento, piastrelle...',en:'Search part, cement, tiles...',fr:'Chercher pièce, ciment, carrelage...'},
  noteP:{ar:'مثلاً: بلاط 60×60 رمادي، إسمنت 42,5',it:'es. gres 60x60 grigio, cemento 42,5',en:'e.g. grey 60x60 tiles, cement 42.5',fr:'ex. carrelage 60x60 gris, ciment 42,5'}}};
function T(k){var es=settings.ui==='es',tt=TRADE_TXT[tradeId()];if(tt&&tt[k]&&(tt[k][settings.ui]||(es&&tt[k].en)))return es?TL(tt[k],'es'):tt[k][settings.ui];var o=PACK_TXT[packId()];if(o&&o[k]&&(o[k][settings.ui]||(es&&o[k].en)))return es?TL(o[k],'es'):o[k][settings.ui];return TXT[settings.ui][k]!=null?TXT[settings.ui][k]:k}
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
var LMIMG={};String(window.LM_IMG||'').split(' ').forEach(function(x){if(x)LMIMG[x]=1});
var IMG_BASE='https://mohamed203055.github.io/lista-materiale-web/img/';
function hasImg(id){return rcFlag('photos')&&!!(IMGS[id]||LMIMG[id])}
function thumb(id,cls){if(!rcFlag('photos'))return '';if(IMGS[id])return '<img class="thumb'+(cls?' '+cls:'')+'" src="'+IMGS[id]+'">';if(!LMIMG[id])return '';return '<img class="thumb pimg'+(cls?' '+cls:'')+'" data-pid="'+esc(id)+'" alt="" src="'+IMG_BASE+id+'.jpg?v=1" style="visibility:hidden" onload="this.style.visibility=\'\'" onerror="this.remove()">'}
// foto dei pezzi disponibili anche senza internet: salvate nel telefono (IndexedDB)
var PDB=null,PDBX=false,PV='@1';
function pdb(cb){if(PDB||PDBX)return cb(PDB);try{var r=indexedDB.open('lm_photos',1);r.onupgradeneeded=function(){try{r.result.createObjectStore('p')}catch(e){}};r.onsuccess=function(){PDB=r.result;cb(PDB)};r.onerror=function(){PDBX=true;cb(null)}}catch(e){PDBX=true;cb(null)}}
function pget(id,cb){pdb(function(db){if(!db)return cb(null);try{var q=db.transaction('p').objectStore('p').get(id+PV);q.onsuccess=function(){cb(q.result||null)};q.onerror=function(){cb(null)}}catch(e){cb(null)}})}
function pput(id,b){pdb(function(db){if(!db||!b||!b.size)return;try{db.transaction('p','readwrite').objectStore('p').put(b,id+PV)}catch(e){}})}
function pfetch(id){return fetch(IMG_BASE+id+'.jpg?v=1').then(function(r){if(!r.ok)throw 0;return r.blob()}).then(function(b){if(/^image\//.test(b.type)||b.size>500)pput(id,b);return b})}
function pHydrate(img){if(img.dataset.h)return;img.dataset.h=1;var id=img.dataset.pid;
  pget(id,function(b){if(b&&img.isConnected){try{img.src=URL.createObjectURL(b)}catch(e){}return}
    img.addEventListener('load',function(){if(/^https?:/.test(img.src))pfetch(id).catch(function(){})},{once:true})})}
try{new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType!==1)return;if(n.matches&&n.matches('img[data-pid]'))pHydrate(n);if(n.querySelectorAll)n.querySelectorAll('img[data-pid]').forEach(pHydrate)})})}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}
// scarica in silenzio una sola volta le foto mancanti (≈2,6 MB) per averle offline
function pPrefetch(){if(!rcFlag('photos')||!window.fetch)return;pdb(function(db){if(!db)return;try{var q=db.transaction('p').objectStore('p').getAllKeys();q.onsuccess=function(){var have={};(q.result||[]).forEach(function(k){have[k]=1});
  var miss=Object.keys(LMIMG).filter(function(id){return !have[id+PV]}),i=0,fails=0;if(!miss.length)return;
  function next(){if(i>=miss.length||fails>8)return;var id=miss[i++];pfetch(id).then(next,function(){fails++;next()})}
  next();next();next()}}catch(e){}})}
setTimeout(pPrefetch,6000);
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
function refreshCounts(){var n=view.tab==='price'?cur().quote.lines.length:view.tab==='mlist'?(cur().man||[]).filter(function(r){return String(r.n||'').trim()}).length:cur().lines.length;$('#badge').textContent=cur().lines.length;$('#cnt').textContent=n;['#btnWa','#btnCopy','#btnPdf'].forEach(function(b){$(b).disabled=!n})}

/* =====================================================================
   LINGUA
   ===================================================================== */
function applyLang(){
  var ar=settings.ui==='ar';
  document.documentElement.lang=settings.ui; document.documentElement.dir=ar?'rtl':'ltr';
  document.title='SiteNeeds – '+T('title');
  var nm=((settings.reg&&settings.reg.nome)||settings.tecnico||'').trim().split(/\s+/)[0]||'';
  $('#ttl').textContent=nm||'SiteNeeds';
  var sm=document.createElement('small');sm.textContent=tradeId()!=='ele'?tradeLabel():T('title');$('#ttl').appendChild(sm);
  $('#helloT').textContent=L4(XT.hello)+' 👋'+(packId()!=='IT'&&packData()?'  '+packData().flag:'');
  var av=$('#btnMe'); if(av){ if(settings.logo&&/^data:image\//.test(settings.logo)) av.innerHTML='<img src="'+settings.logo+'" alt="">'; else if(nm) av.textContent=nm.charAt(0).toUpperCase(); else av.innerHTML='<img class="lg" src="'+ASSET_BASE+'brand/logo.webp" alt="">'; }
  if($('#splTag'))$('#splTag').textContent=L4(XT.tagline);
  $('#btnLang').textContent='🌐 '+settings.ui.toUpperCase();
  $('#q').placeholder=(settings.trade||'ele')==='ele'?L4(HX.search):T('search');
  $('#tCalc').textContent=L4(XT.calcBtn);$('#btnCalc').title=CT('calc');
  $('#tMat').textContent=L4(XT.home);$('#tPriceT').textContent=T('price'); $('#tCart').textContent=L4(XT.myOrder); $('#tProj').textContent=L4(XT.projs);
  ic3nav();
  $('#cntL').textContent=T('items'); $('#btnCopyT').textContent=T('copy');
  $('#btnWaT').textContent=ar?'واتساب':'WhatsApp';
  if($('#tCalc'))$('#tCalc').title=T('calc');
}

/* =====================================================================
   RENDER PRINCIPALE
   ===================================================================== */
function rcUI(){
  if(view.tab==='price'&&!rcFlag('prices'))view.tab='mat';
  if(view.tab==='calc'&&!rcFlag('calc'))view.tab='mat';
  var tp=$('#tPrice');if(tp)tp.style.display=rcFlag('prices')?'':'none';
  var bc=$('#btnCalc');if(bc)bc.style.display=rcFlag('calc')?'':'none';
}
function render(){
  rcUI();
  var inStu=view.tab==='mat'&&view.cat==='__panel';document.body.classList.toggle('studio',inStu);if(inStu)pnCommit();
  var inAdmin=view.tab==='admin', inProj=view.tab==='projects', inPrice=view.tab==='price', inCalc=view.tab==='calc';
  $('#tabs').style.display=inAdmin?'none':'';
  $('#searchBox').style.display=(inAdmin||inProj||inPrice||inCalc)?'none':'';
  var showBar=view.tab==='cart'||view.tab==='price'||view.tab==='mlist'||(view.tab==='mat'&&cur().lines.length>0&&view.cat!=='__panel');
  $('#bar').style.display=showBar?'':'none';
  document.body.style.paddingBottom=inAdmin?'24px':(showBar?'170px':'100px');
  document.querySelectorAll('.tab').forEach(function(t){t.classList.toggle('on',(t.dataset.tab||t.dataset.nav)===view.tab&&!view.q)});
  var h='';
  if(inAdmin) h=renderAdmin();
  else if(inProj) h=renderProjects();
  else if(inCalc) h=renderCalc();
  else if(inPrice) h=renderPrice();
  else if(view.tab==='mlist') h=renderMList();
  else if(view.q) h=renderSearch();
  else if(view.tab==='mat') h=(view.cat?'':renderSite())+(view.cat==='__fav'?renderFavs():view.cat==='__tpl'?renderTpls():view.cat==='__tech'?renderTech():view.cat==='__panel'?renderStudio():view.cat&&CBY[view.cat]?renderCat(view.cat):renderCats());
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
  pwAsk:{ar:'طلب كلمة السر',it:'Richiedi la password',en:'Request the password',fr:'Demander le mot de passe'},
  pwAskMsg:{ar:'السلام عليكم، من فضلك أريد كلمة السر لإعدادات تطبيق SiteNeeds.',it:'Buongiorno, per favore vorrei la password per le impostazioni dell’app SiteNeeds.',en:'Hello, please, I would like the password for the SiteNeeds app settings.',fr:'Bonjour, s’il vous plaît, je voudrais le mot de passe des réglages de l’application SiteNeeds.'},
  waHello:{ar:'السلام عليكم، وجدت رقمك في تطبيق «SiteNeeds».',it:'Buongiorno, ho trovato il suo contatto nell’app «SiteNeeds».',en:'Hello, I found your contact in the «SiteNeeds» app.',fr:'Bonjour, j’ai trouvé votre contact dans l’application «SiteNeeds».'},
  tradeT:{ar:'🛠️ المهنة',it:'🛠️ Mestiere',en:'🛠️ Trade',fr:'🛠️ Métier'},
  tradeHint:{ar:'كل مهنة لها قطعها وأسعارها وحاسباتها ومشاريعها الخاصة. لا شيء يختلط.',it:'Ogni mestiere ha materiali, prezzi, calcoli e progetti propri. Niente si mescola.',en:'Each trade has its own materials, prices, calculators and projects. Nothing gets mixed.',fr:'Chaque métier a ses matériaux, prix, calculs et projets. Rien ne se mélange.'},
  tradeOn:{ar:'✓ التطبيق الآن:',it:'✓ App ora in modalità:',en:'✓ App now in mode:',fr:'✓ Appli maintenant en mode :'},
  shareApp:{ar:'أرسل التطبيق لصديق',it:'Invia l’app a un amico',en:'Send the app to a friend',fr:'Envoyer l’appli à un ami'},
  shareAppSub:{ar:'واتساب، رسالة، أو أي تطبيق',it:'WhatsApp, SMS o altra app',en:'WhatsApp, SMS or any app',fr:'WhatsApp, SMS ou autre appli'},
  shareAppMsg:{ar:'👷 جرّب تطبيق «SiteNeeds»: تختار المواد التي تحتاجها في الورشة وترسلها للمدير بواتساب أو PDF في ثوانٍ. مجاني.',
    it:'👷 Prova l’app «SiteNeeds»: scegli il materiale che serve in cantiere e invialo al responsabile su WhatsApp o in PDF in pochi secondi. Gratis.',
    en:'👷 Try the «SiteNeeds» app: pick the materials you need on site and send them to your manager by WhatsApp or PDF in seconds. Free.',
    fr:'👷 Essaie l’appli «SiteNeeds» : choisis le matériel nécessaire sur le chantier et envoie-le au responsable par WhatsApp ou PDF en quelques secondes. Gratuit.'},
  shareAndroid:{ar:'📱 أندرويد:',it:'📱 Android:',en:'📱 Android:',fr:'📱 Android :'},
  shareIos:{ar:'🍏 آيفون وآيباد:',it:'🍏 iPhone e iPad:',en:'🍏 iPhone and iPad:',fr:'🍏 iPhone et iPad :'},
  theme:{ar:'🎨 المظهر',it:'🎨 Aspetto',en:'🎨 Appearance',fr:'🎨 Apparence'},
  thLight:{ar:'☀️ فاتح',it:'☀️ Chiaro',en:'☀️ Light',fr:'☀️ Clair'},
  thDark:{ar:'🌙 داكن',it:'🌙 Scuro',en:'🌙 Dark',fr:'🌙 Sombre'},
  thAuto:{ar:'📱 حسب الهاتف',it:'📱 Come il telefono',en:'📱 Like the phone',fr:'📱 Comme le téléphone'},
  arrived:{ar:'📦 ما وصل من الطلب؟',it:'📦 Cosa è arrivato?',en:'📦 What has arrived?',fr:'📦 Qu’est-ce qui est arrivé ?'},
  arrivedHint:{ar:'ضع ✓ على كل ما وصل، ثم أرسل للمدير ما ينقص فقط.',it:'Spunta ciò che è arrivato, poi invia al responsabile solo ciò che manca.',en:'Tick what has arrived, then send the manager only what is missing.',fr:'Cochez ce qui est arrivé, puis envoyez au responsable seulement ce qui manque.'},
  arrivedN:{ar:'وصل % من #',it:'Arrivati % su #',en:'% of # arrived',fr:'% sur # arrivés'},
  sendMissing:{ar:'📤 أرسل ما ينقص للمدير',it:'📤 Invia ciò che manca',en:'📤 Send what is missing',fr:'📤 Envoyer ce qui manque'},
  allArrived:{ar:'✓ وصل كل شيء!',it:'✓ È arrivato tutto!',en:'✓ Everything has arrived!',fr:'✓ Tout est arrivé !'},
  gotTag:{ar:'✓ وصل',it:'✓ arrivato',en:'✓ arrived',fr:'✓ arrivé'},
  missTitle:{ar:'⚠️ ما ينقص من الطلب',it:'⚠️ Materiale mancante',en:'⚠️ Missing materials',fr:'⚠️ Matériel manquant'},
  photo:{ar:'📷 صورة لهذا السطر',it:'📷 Foto per questa riga',en:'📷 Photo for this line',fr:'📷 Photo pour cette ligne'},
  photoDel:{ar:'حذف الصورة',it:'Elimina foto',en:'Delete photo',fr:'Supprimer la photo'},
  photoAdded:{ar:'✓ أضيفت الصورة — تظهر في PDF',it:'✓ Foto aggiunta — compare nel PDF',en:'✓ Photo added — it appears in the PDF',fr:'✓ Photo ajoutée — elle apparaît dans le PDF'},
  tplSave:{ar:'📋 احفظ كقالب',it:'📋 Salva come modello',en:'📋 Save as template',fr:'📋 Enregistrer comme modèle'},
  tplName:{ar:'اسم القالب',it:'Nome del modello',en:'Template name',fr:'Nom du modèle'},
  tplNameP:{ar:'مثلاً: شقة 3 غرف',it:'es. Appartamento 3 stanze',en:'e.g. 3-room flat',fr:'ex. Appartement 3 pièces'},
  tplSaved:{ar:'✓ حُفظ القالب — تجده في «📋 قوالبي»',it:'✓ Modello salvato — lo trovi in «📋 I miei modelli»',en:'✓ Template saved — find it in «📋 My templates»',fr:'✓ Modèle enregistré — dans «📋 Mes modèles»'},
  tpls:{ar:'📋 قوالبي',it:'📋 I miei modelli',en:'📋 My templates',fr:'📋 Mes modèles'},
  tplEmpty:{ar:'لا توجد قوالب بعد. املأ طلباً ثم اضغط «📋 احفظ كقالب» في صفحة الطلب.',it:'Nessun modello. Compila una richiesta e premi «📋 Salva come modello».',en:'No templates yet. Fill a request and tap «📋 Save as template».',fr:'Aucun modèle. Remplissez une demande puis touchez «📋 Enregistrer comme modèle».'},
  tplUse:{ar:'➕ أضف إلى الطلب',it:'➕ Aggiungi alla richiesta',en:'➕ Add to request',fr:'➕ Ajouter à la demande'},
  tplUsed:{ar:'✓ أضيفت مواد القالب إلى الطلب',it:'✓ Materiali del modello aggiunti',en:'✓ Template materials added',fr:'✓ Matériel du modèle ajouté'},
  tplDelQ:{ar:'حذف هذا القالب؟',it:'Eliminare questo modello?',en:'Delete this template?',fr:'Supprimer ce modèle ?'},
  toMate:{ar:'🤝 أرسل المشروع لزميل',it:'🤝 Invia il progetto a un collega',en:'🤝 Send project to a colleague',fr:'🤝 Envoyer le projet à un collègue'},
  toMateHint:{ar:'زميلك يفتح الملف من ⚙️ الإعدادات ← «📥 فتح ملف».',it:'Il collega apre il file da ⚙️ Impostazioni → «📥 Apri file».',en:'Your colleague opens it from ⚙️ Settings → «📥 Open file».',fr:'Votre collègue l’ouvre depuis ⚙️ Réglages → «📥 Ouvrir un fichier».'},
  bk:{ar:'💾 نسخة احتياطية',it:'💾 Copia di sicurezza',en:'💾 Backup',fr:'💾 Sauvegarde'},
  bkHint:{ar:'احفظ كل مشاريعك في ملف، واسترجعها إذا غيّرت هاتفك.',it:'Salva tutti i progetti in un file e ripristinali se cambi telefono.',en:'Save all your projects to a file and restore them if you change phone.',fr:'Enregistrez tous vos projets dans un fichier et restaurez-les si vous changez de téléphone.'},
  bkSave:{ar:'💾 احفظ',it:'💾 Salva',en:'💾 Save',fr:'💾 Enregistrer'},
  bkOpen:{ar:'📥 فتح ملف',it:'📥 Apri file',en:'📥 Open file',fr:'📥 Ouvrir un fichier'},
  bkQ:{ar:'إضافة المشاريع والقوالب من هذا الملف؟ مشاريعك الحالية تبقى كما هي.',it:'Aggiungere progetti e modelli da questo file? I progetti attuali restano.',en:'Add projects and templates from this file? Your current projects stay.',fr:'Ajouter les projets et modèles de ce fichier ? Vos projets actuels restent.'},
  bkDone:{ar:'✓ تم الاسترجاع: % مشروع',it:'✓ Ripristinati: % progetti',en:'✓ Restored: % projects',fr:'✓ Restaurés : % projets'},
  prjDone:{ar:'✓ فُتح مشروع زميلك',it:'✓ Progetto del collega aperto',en:'✓ Colleague’s project opened',fr:'✓ Projet du collègue ouvert'},
  badF:{ar:'هذا الملف غير صالح',it:'File non valido',en:'Invalid file',fr:'Fichier non valide'},
  logo:{ar:'🖼️ شعار الشركة (يظهر في PDF)',it:'🖼️ Logo ditta (compare nel PDF)',en:'🖼️ Company logo (shown in the PDF)',fr:'🖼️ Logo de l’entreprise (dans le PDF)'},
  logoAdd:{ar:'اختر صورة',it:'Scegli immagine',en:'Choose image',fr:'Choisir une image'},
  logoTip:{ar:'💡 الأفضل: صورة PNG بخلفية شفافة (بدون خلفية بيضاء أو ملونة)، حتى يظهر الشعار نظيفاً في أعلى الورقة وفي وسطها.',it:'💡 Meglio un’immagine PNG con sfondo trasparente (senza sfondo bianco o colorato): il logo apparirà pulito in alto e al centro del foglio.',en:'💡 Best: a PNG with a transparent background (no white or coloured background) so the logo looks clean at the top and in the middle of the page.',fr:'💡 Idéal : une image PNG à fond transparent (sans fond blanc ou coloré) pour un logo net en haut et au centre de la page.'},
  myPhone:{ar:'هاتفك (يظهر في عرض السعر، اختياري)',it:'Il tuo telefono (nel preventivo, facoltativo)',en:'Your phone (on the quote, optional)',fr:'Votre téléphone (sur le devis, facultatif)'},
  secProfile:{ar:'👤 الملف المهني',it:'👤 Profilo professionale',en:'👤 Professional profile',fr:'👤 Profil professionnel'},
  secPrefs:{ar:'🎨 تفضيلات التطبيق',it:'🎨 Preferenze dell’app',en:'🎨 App preferences',fr:'🎨 Préférences de l’appli'},
  secData:{ar:'💾 البيانات والنسخ الاحتياطي',it:'💾 Dati e copia di sicurezza',en:'💾 Data and backup',fr:'💾 Données et sauvegarde'},
  secAdmin:{ar:'🗂️ الكتالوج والإدارة',it:'🗂️ Catalogo e gestione',en:'🗂️ Catalogue and management',fr:'🗂️ Catalogue et gestion'},
  secHelp:{ar:'💬 المساعدة والتواصل',it:'💬 Aiuto e contatti',en:'💬 Help and contact',fr:'💬 Aide et contact'},
  editProfile:{ar:'✏️ تعديل الملف المهني',it:'✏️ Modifica profilo',en:'✏️ Edit profile',fr:'✏️ Modifier le profil'},
  notSet:{ar:'لم يُكتب بعد',it:'non indicato',en:'not set',fr:'non renseigné'},
  mgr:{ar:'المدير:',it:'Responsabile:',en:'Manager:',fr:'Responsable :'},
  uiHint:{ar:'تغيّر لغة القوائم والأزرار في التطبيق.',it:'Cambia la lingua di menu e pulsanti dell’app.',en:'Changes the language of the app’s menus and buttons.',fr:'Change la langue des menus et boutons de l’appli.'},
  outHint:{ar:'لغة الرسائل وملفات PDF التي ترسلها للمدير أو للزبون.',it:'Lingua dei messaggi e dei PDF che invii al responsabile o al cliente.',en:'Language of the messages and PDFs you send to the manager or client.',fr:'Langue des messages et PDF envoyés au responsable ou au client.'},
  calcBtn:{ar:'حاسبة',it:'Calcoli',en:'Calc',fr:'Calculs'},
  hello:{ar:'مرحباً',it:'Ciao',en:'Hello',fr:'Bonjour'},
  home:{ar:'الرئيسية',it:'Home',en:'Home',fr:'Accueil'},
  myOrder:{ar:'طلبي',it:'Richiesta',en:'My order',fr:'Ma demande'},
  projs:{ar:'مشاريعي',it:'Progetti',en:'Projects',fr:'Projets'},
  tagline:{ar:'كل احتياجات مشروعك في مكان واحد',it:'Tutto ciò che serve al cantiere, in un unico posto',en:'All your project needs in one place',fr:'Tous les besoins de votre chantier, au même endroit'},
  bnSmall:{ar:'سريع وسهل ✨',it:'Facile e veloce ✨',en:'Quick and easy ✨',fr:'Simple et rapide ✨'},
  bnTitle:{ar:'اختر القطع وأرسل الطلب للمدير في دقيقة',it:'Scegli i pezzi e invia la richiesta in un minuto',en:'Pick the parts and send your order in a minute',fr:'Choisissez les pièces et envoyez la demande en une minute'},
  bnBtn:{ar:'📋 طلبي',it:'📋 La mia richiesta',en:'📋 My order',fr:'📋 Ma demande'},
  catsT:{ar:'الأقسام',it:'Categorie',en:'Categories',fr:'Catégories'},
  seeAll:{ar:'عرض الكل',it:'Vedi tutto',en:'See all',fr:'Voir tout'},
  addOwn:{ar:'أضف قطعة غير موجودة',it:'Aggiungi un pezzo non presente',en:'Add an item that is not listed',fr:'Ajouter une pièce absente'},
  searchCl:{ar:'ابحث عن زبون…',it:'Cerca un cliente…',en:'Search a client…',fr:'Rechercher un client…'},
  dupLine:{ar:'⧉ تكرار السطر',it:'⧉ Duplica riga',en:'⧉ Duplicate line',fr:'⧉ Dupliquer la ligne'},
  delLine:{ar:'🗑 حذف السطر',it:'🗑 Elimina riga',en:'🗑 Delete line',fr:'🗑 Supprimer la ligne'},
  lineDup:{ar:'✓ تم تكرار السطر',it:'✓ Riga duplicata',en:'✓ Line duplicated',fr:'✓ Ligne dupliquée'},
  favs:{ar:'⭐ المفضلة',it:'⭐ Preferiti',en:'⭐ Favourites',fr:'⭐ Favoris'},
  recent:{ar:'🕘 المستعملة مؤخراً',it:'🕘 Usati di recente',en:'🕘 Recently used',fr:'🕘 Utilisés récemment'},
  favEmpty:{ar:'لا توجد مفضلة بعد. اضغط ☆ بجانب أي قطعة لإضافتها هنا.',it:'Nessun preferito. Tocca ☆ accanto a un articolo per aggiungerlo qui.',en:'No favourites yet. Tap ☆ next to an item to add it here.',fr:'Aucun favori. Touchez ☆ à côté d’un article pour l’ajouter ici.'},
  favAdd:{ar:'⭐ أضيفت إلى المفضلة',it:'⭐ Aggiunto ai preferiti',en:'⭐ Added to favourites',fr:'⭐ Ajouté aux favoris'},
  favDel:{ar:'أُزيلت من المفضلة',it:'Rimosso dai preferiti',en:'Removed from favourites',fr:'Retiré des favoris'},
  pressHint:{ar:'اضغط مطولاً على أي سطر لإضافة صورة أو تكراره أو حذفه',it:'Tieni premuta una riga per foto, duplica o elimina',en:'Long-press a line to add a photo, duplicate or delete it',fr:'Appui long sur une ligne : photo, dupliquer ou supprimer'}
};
function L4(o){return settings.ui==='es'?TL(o,'es'):(TL(o,settings.ui))}
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
var HX={new:{ar:'قائمة مواد جديدة',it:'Nuova lista materiali',en:'New material list',fr:'Nouvelle liste de matériel',es:'Nueva lista de materiales'},
 newS:{ar:'أنشئ قائمة جديدة بالمواد الكهربائية',it:'Crea una nuova lista di materiale elettrico',en:'Create a new list of electrical materials',fr:'Créez une nouvelle liste de matériel électrique',es:'Crea una nueva lista de materiales eléctricos'},
 cont:{ar:'قائمتي الحالية',it:'La mia lista attuale',en:'My current list',fr:'Ma liste actuelle',es:'Mi lista actual'},
 how:{ar:'كيف تريد إضافة المواد؟',it:'Come vuoi aggiungere i materiali?',en:'How do you want to add materials?',fr:'Comment ajouter le matériel ?',es:'¿Cómo quieres añadir los materiales?'},
 o1:{ar:'🔎 ابحث عن مادة',it:'🔎 Cerca un materiale',en:'🔎 Search a material',fr:'🔎 Chercher un article',es:'🔎 Buscar un material'},o1s:{ar:'بالاسم أو المرجع أو العلامة',it:'Per nome, codice o marca',en:'By name, code or brand',fr:'Par nom, référence ou marque',es:'Por nombre, código o marca'},
 o2:{ar:'🗂 تصفّح الأقسام',it:'🗂 Sfoglia le categorie',en:'🗂 Browse categories',fr:'🗂 Parcourir les catégories',es:'🗂 Ver las categorías'},o2s:{ar:'كل المواد الكهربائية مرتبة',it:'Tutto il materiale elettrico in ordine',en:'All electrical materials, organised',fr:'Tout le matériel électrique, classé',es:'Todo el material eléctrico, ordenado'},
 o3:{ar:'✍️ اكتب يدوياً',it:'✍️ Scrivi a mano',en:'✍️ Write manually',fr:'✍️ Écrire à la main',es:'✍️ Escribir a mano'},o3s:{ar:'مواد غير موجودة في القائمة',it:'Materiali che non sono nel catalogo',en:'Materials not in the catalogue',fr:'Articles absents du catalogue',es:'Materiales que no están en el catálogo'},
 newNote:{ar:'قائمتك السابقة محفوظة في «مشاريعي».',it:'La lista precedente resta salvata in «Progetti».',en:'Your previous list stays saved in «Projects».',fr:'La liste précédente reste enregistrée dans «Projets».',es:'Tu lista anterior queda guardada en «Proyectos».'},
 mats:{ar:'المواد الكهربائية',it:'Materiale elettrico',en:'Electrical materials',fr:'Matériel électrique',es:'Materiales eléctricos'},
 all:{ar:'عرض كل الأقسام',it:'Vedi tutte le categorie',en:'View all categories',fr:'Voir toutes les catégories',es:'Ver todas las categorías'},less:{ar:'عرض أقل',it:'Mostra meno',en:'Show less',fr:'Voir moins',es:'Ver menos'},
 tools:{ar:'أدوات الكهربائي',it:'Strumenti dell’elettricista',en:'Electrician tools',fr:'Outils de l’électricien',es:'Herramientas del electricista'},
 calc:{ar:'الحسابات الكهربائية',it:'Calcoli elettrici',en:'Electrical calculations',fr:'Calculs électriques',es:'Cálculos eléctricos'},calcS:{ar:'الجهد، مقطع الكابل، القاطع وغيرها',it:'Tensione, sezione cavi, interruttori e altro',en:'Voltage, cable sections and other values',fr:'Tension, section des câbles et plus',es:'Tensión, sección de cables y más'},
 site:{ar:'بيانات الموقع (اختياري)',it:'Dati del cantiere (facoltativo)',en:'Site details (optional)',fr:'Infos du chantier (facultatif)',es:'Datos de la obra (opcional)'},
 search:{ar:'ابحث عن مادة أو مرجع أو علامة…',it:'Cerca materiale, codice o marca…',en:'Search materials, codes or brands…',fr:'Chercher article, référence ou marque…',es:'Buscar materiales, códigos o marcas…'},
 real:{ar:'قطع حقيقية بالمرجع',it:'Pezzi reali con codice',en:'Real parts with reference',fr:'Pièces réelles avec référence',es:'Piezas reales con referencia'}};
function newListSheet(){var p=cur(),n=p.lines.length,arr=settings.ui==='ar'?'‹':'›';
  openSheet('<h2>📋 '+esc(L4(HX.new))+'</h2><div class="mini" style="margin-bottom:10px">'+esc(L4(HX.how))+'</div>'+
   [['nl1',HX.o1,HX.o1s],['nl2',HX.o2,HX.o2s],['nl3',HX.o3,HX.o3s]].map(function(o){return '<button class="mlcard" id="'+o[0]+'"><span><b>'+esc(L4(o[1]))+'</b><small>'+esc(L4(o[2]))+'</small></span><i>'+arr+'</i></button>'}).join('')+
   (n?'<div class="mini" style="margin-top:4px">ⓘ '+esc(L4(HX.newNote))+'</div>':''));
  function fresh(){if(cur().lines.length||(cur().man||[]).some(function(r){return r&&r.n})){save();var np=blankProj();P.list.unshift(np);P.cur=np.id;prune();save()}}
  $('#nl1').onclick=function(){fresh();closeSheet();view.tab='mat';view.cat=null;render();window.scrollTo(0,0);setTimeout(function(){var q=$('#q');if(q)q.focus()},120)};
  $('#nl2').onclick=function(){fresh();closeSheet();view.tab='mat';view.cat=null;view.allc=true;render();setTimeout(function(){var g=document.getElementById('hcats');if(g)g.scrollIntoView({behavior:'smooth',block:'start'})},80)};
  $('#nl3').onclick=function(){fresh();closeSheet();view.tab='mlist';view.cat=null;clearSearch();render();window.scrollTo(0,0)}}
function quickRow(){
  return '<div class="qrow"><button class="pri" data-act="newproj">'+L4(XT.newP)+'</button><button data-act="clients">'+L4(XT.myCl)+'</button></div>';
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
  if(!s.open){var has=p.name||s.cliente||s.indirizzo;return '<div class="siter"><button class="sitec" data-act="siteopen"><span class="sp">📍</span><span class="st" dir="auto">'+esc(has?[p.name,s.cliente,s.indirizzo].filter(Boolean).join(' · '):L4(HX.site))+'</span><span class="sv">▾</span></button><button class="sitecl" data-act="clients" aria-label="'+esc(L4(XT.myCl))+'">👥</button></div>'}
  var chips=PLACES.map(function(x){return '<button class="chip'+(s.luogo===x.id?' on':'')+'" data-act="place" data-v="'+x.id+'">'+esc(N(x))+'</button>'}).join('');
  return '<div class="card"><button class="site-head" style="width:100%;text-align:start" data-act="siteclose"><b>'+T('site')+'</b><span class="mini">'+T('hide')+'</span></button>'+
   '<div class="field"><label>'+T('cliente')+'</label><div class="combo"><input data-f="cliente" value="'+esc(s.cliente)+'" placeholder="'+T('clienteP')+'"><button class="combo-btn" data-act="clients" aria-label="'+L4(XT.clients)+'">▾</button></div></div>'+
   '<div class="field"><label>'+T('indirizzo')+'</label><input data-f="indirizzo" value="'+esc(s.indirizzo)+'" placeholder="'+((PACK_TXT[packId()]||{}).addrP||'Via …, Roma')+'"></div>'+
   '<div class="field"><label>'+T('luogo')+'</label><div class="chips places">'+chips+'</div></div>'+
   '<div class="field"><label>'+T('note')+'</label><textarea data-f="note" rows="2" placeholder="'+T('noteP')+'">'+esc(s.note)+'</textarea></div>'+
   '<button class="btn main" data-act="sitesave">💾 '+T('save')+'</button></div>';
}
// icone disegnate (al posto di emoji poco chiare): 🌈 → striscia LED
var SVGIC={'🌈':'<svg class="svgic" viewBox="1 6 46 33" aria-hidden="true"><rect x="3" y="17" width="42" height="14" rx="3" fill="#EEF1F7" stroke="#8C95A8" stroke-width="2"/>'+
  [9,21,33].map(function(x){return '<g><path d="M'+(x+3)+' 9v4M'+(x-1)+' 11l2 3M'+(x+7)+' 11l-2 3" stroke="#FFB31A" stroke-width="2" stroke-linecap="round"/><rect x="'+x+'" y="20" width="7" height="8" rx="1.5" fill="#FFC83D" stroke="#C98A00" stroke-width="1.2"/></g>'}).join('')+
  '<path d="M3 37h42" stroke="#C4CAD6" stroke-width="2" stroke-dasharray="3 3"/></svg>'};
var ASSET_BASE='https://mohamed203055.github.io/lista-materiale-web/';
var IC3={'🧵':'package','〰️':'plug','🔩':'bolt','🗄️':'cabinet','⏱️':'stopwatch','🔘':'radio','💡':'bulb','⏚':'shield','🌐':'globe','🔔':'bell','📹':'camera','🚨':'siren','☀️':'sun','🧰':'toolbox','🛠️':'tools','🔌':'volt','🧱':'brick','📐':'triruler','🎨':'palette','🛡️':'shield','🧴':'lotion','🔲':'square','⚡':'volt','🪵':'wood','🦺':'vest','🏗️':'crane','🚪':'door','🌳':'tree','📏':'ruler','⭐':'star','📋':'clipboard','🤝':'handshake','🧮':'abacus','📁':'folder','⚙️':'gear','💶':'euro','💧':'drop','📦':'package','👷':'worker','🏠':'house','👤':'user','💬':'chat','➕':'memo','🧩':'package','📡':'satellite','🔧':'wrench','🔨':'hammer','📝':'memo','👋':'wave'};
var ICALL='abacus bell bolt brick bulb cabinet camera camera2 chat check clipboard crane door drop euro folder gear globe hammer handshake house lotion memo package page palette phone plug radio rainbow rocket ruler satellite search shield siren square star stopwatch sun toolbox tools tree triruler user vest volt wave wood worker wrench'.split(' ');
var IC3C={};try{IC3C=JSON.parse(localStorage.getItem('lm_ic3c')||'{}')||{}}catch(e){IC3C={}}
function ic3(key,em,cls){var d=IC3C[key];if(d)return '<img class="i3'+(cls?' '+cls:'')+'" alt="'+esc(em||'')+'" src="'+d+'">';icFetch();return esc(em||'')}
var icState={busy:0,next:0};
function icFetch(){var now=Date.now();if(icState.busy||now<icState.next||!window.fetch||!window.FileReader)return;var miss=ICALL.filter(function(k){return !IC3C[k]});if(!miss.length)return;
  icState.busy=1;var got=0,done=0,i=0;
  function fin(){icState.busy=0;if(got){try{localStorage.setItem('lm_ic3c',JSON.stringify(IC3C))}catch(e){}ic3nav();try{render()}catch(e){}}if(got<miss.length)icState.next=Date.now()+60000}
  function next(){if(i>=miss.length)return;var k=miss[i++];
    fetch(ASSET_BASE+'ic/'+k+'.webp').then(function(r){if(!r.ok)throw 0;return r.blob()}).then(function(b){return new Promise(function(res,rej){var fr=new FileReader();fr.onload=function(){res(fr.result)};fr.onerror=rej;fr.readAsDataURL(b)})})
     .then(function(d){if(/^data:image\//.test(d)){IC3C[k]=d;got++}}).catch(function(){}).then(function(){done++;if(done===miss.length)fin();else next()})}
  for(var c=0;c<5;c++)next()}
function icH(ic,fb){ic=ic||fb||'';if(SVGIC[ic])return SVGIC[ic];var k=IC3[ic];return k?ic3(k,ic):esc(ic)}
function ic3nav(){document.querySelectorAll('.nav .ni[data-ic]').forEach(function(n){if(!n.firstElementChild){var em=n.textContent;n.innerHTML=ic3(n.dataset.ic,em)}})}
function visibleItems(c){return c.items.filter(function(i){return !i.hidden&&!i._rdel})}
/* ---- preferiti e usati di recente (salvati a parte, per paese) ---- */
var FAV=load(K.fav,{});
var PH=load('lm_ph_v1',{}); function savePh(){return put('lm_ph_v1',PH)}
var TPL=load('lm_tpl_v1',{}); function tplList(){var k=profKey();if(!TPL[k])TPL[k]=[];return TPL[k]} function saveTpl(){put('lm_tpl_v1',TPL)}
function favBox(){var k=profKey();if(!FAV[k])FAV[k]={fav:[],rec:[]};return FAV[k]}
function isFav(id){return favBox().fav.indexOf(id)>=0}
function toggleFav(id){var f=favBox().fav,i=f.indexOf(id);if(i>=0)f.splice(i,1);else f.unshift(id);put(K.fav,FAV);return i<0}
function addRecent(id){if(!id)return;var r=favBox().rec,i=r.indexOf(id);if(i>=0)r.splice(i,1);r.unshift(id);if(r.length>8)r.length=8;put(K.fav,FAV)}
function liveItems(ids){return ids.map(function(id){return IBY[id]}).filter(function(it){return it&&!it.hidden&&!it._rdel&&!(CBY[it.cat]&&CBY[it.cat].hidden)})}
function renderRecent(){var r=liveItems(favBox().rec).slice(0,5);return r.length?'<div class="sec">'+L4(XT.recent)+'</div><div class="list" style="margin-bottom:12px">'+r.map(itemRow).join('')+'</div>':''}
function renderFavs(){
  var f=liveItems(favBox().fav);
  return '<button class="back" data-act="back">'+(settings.ui==='ar'?'→ ':'← ')+T('allCats')+'</button><div class="sec">'+L4(XT.favs)+'</div>'+
   (f.length?'<div class="list">'+f.map(itemRow).join('')+'</div>':'<div class="empty"><div class="big">☆</div>'+L4(XT.favEmpty)+'</div>');
}
function renderCats(){
  var n=cur().lines.length, pl=prosList(), arr=settings.ui==='ar'?'‹':'›', LIM=9;
  var tiles=[];if(tplList().length)tiles.push('<button class="cat" data-act="cat" data-v="__tpl"><span class="ic">'+icH('📋')+'</span><b>'+esc(L4(XT.tpls).replace('📋 ',''))+'</b><span>'+tplList().length+'</span></button>');
  tiles.push('<button class="cat" data-act="cat" data-v="__fav"><span class="ic">'+icH('⭐')+'</span><b>'+esc(L4(XT.favs).replace('⭐ ',''))+'</b><span>'+liveItems(favBox().fav).length+' '+T('items')+'</span></button>');
  DB.cats.filter(function(c){return !c.hidden}).forEach(function(c){tiles.push('<button class="cat" data-act="cat" data-v="'+c.id+'"><span class="ic">'+icH(c.ic,'📦')+'</span><b>'+esc(N(c))+'</b><span>'+visibleItems(c).length+' '+T('items')+'</span></button>')});
  tiles.push('<button class="cat" data-act="custom"><span class="ic">➕</span><b>'+T('custom')+'</b></button>');
  var more=tiles.length>LIM+1, show=view.allc||!more?tiles:tiles.slice(0,LIM);
  function card(act,ic,t,sub,cls){return '<button class="mlcard'+(cls?' '+cls:'')+'" data-act="'+act+'">'+icH(ic)+'<span><b>'+esc(L4(t))+'</b><small>'+esc(L4(sub))+'</small></span><i>'+arr+'</i></button>'}
  var ele=(settings.trade||'ele')==='ele';
  return '<div class="hnew"><button class="hmain" data-act="newlist"><span class="hic">'+icH('📋')+'</span><span class="htx"><b>'+esc(L4(HX.new))+'</b><small>'+esc(L4(HX.newS))+'</small></span><span class="hplus">+</span></button>'+
     (n?'<button class="hcur" data-tab="cart">📋 '+esc(L4(HX.cont))+' <b>'+n+'</b> '+arr+'</button>':'')+'</div>'+
   '<div class="h2" id="hcats"><b>'+esc(ele?L4(HX.mats):L4(XT.catsT))+'</b></div>'+
   '<div class="grid">'+show.join('')+'</div>'+
   (more?'<button class="hall" data-act="allc">'+esc(view.allc?L4(HX.less):L4(HX.all))+' '+(view.allc?'▴':'▾')+'</button>':'')+
   '<div class="h2"><b>'+esc(L4(HX.tools))+'</b></div>'+
   card('mlist','📝',MLT.home,MLT.homeS)+
   (ele&&rcFlag('panel')?card('panel','⚡',PN.t,PN.s,'pnc'):'')+
   (rcFlag('calc')?card('gocalc','🧮',HX.calc,HX.calcS,'calcc'):'')+
   (techList().length?card('tech','📐',TG.t,TG.s,'tgc'):'')+
   (pl.length?'<div class="h2"><b>'+esc(L4(XT.pros).replace('🤝 ',''))+'</b><button class="prosbtn" data-act="pros">'+esc(L4(XT.seeAll))+' '+arr+'</button></div><div class="pcar">'+pl.slice(0,12).map(function(p){
     return '<button class="pcard" data-act="pro" data-v="'+esc(p.id)+'">'+proPic(p)+'<b>'+esc(p.name)+'</b><span>'+esc(p.job||'')+'</span>'+(p.city?'<span>📍 '+esc(p.city)+'</span>':'')+'</button>'}).join('')+'</div>':'');
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
  return '<button class="back" data-act="back">'+(settings.ui==='ar'?'→ ':'← ')+T('allCats')+'</button><div class="sec">'+icH(c.ic)+' '+esc(N(c))+'</div>'+
   '<button class="addown" data-act="custom">'+icH('📝')+'<span>'+esc(L4(XT.addOwn))+'</span></button><div class="list">'+visibleItems(c).map(itemRow).join('')+'</div>';
}
function renderSearch(){
  var words=norm(view.q).split(' ').filter(Boolean);
  var res=ITEMS.filter(function(i){return !i.hidden&&!i._rdel&&!(CBY[i.cat]&&CBY[i.cat].hidden)&&words.every(function(w){return i._s.indexOf(w)>=0})});
  var kits=DB.kits.filter(function(k){var s=norm(k.it+' '+k.ar);return !k.hidden&&words.every(function(w){return s.indexOf(w)>=0})});
  var h='';
  if(res.length) h+='<div class="sec">'+T('materials')+' ('+res.length+')</div><div class="list">'+res.slice(0,80).map(itemRow).join('')+'</div>';
  // pezzi reali della guida: ricerca per marca e codice
  var tr=techList().filter(function(x){var t=norm([x.b,x.r,x.f,x.p,x.cv?x.cv+x.A:'',x.A!=null?x.A+'a':'',techName(x)].join(' '));return words.every(function(w){return t.indexOf(w)>=0})});
  if(tr.length)h+='<div class="sec">'+icH('📐')+' '+esc(L4(HX.real))+' ('+tr.length+')</div><div class="list">'+tr.slice(0,30).map(function(x){var gi=TECH_IX[x.i];
    return '<div class="row"><div class="t"><b dir="ltr" style="text-align:start">'+esc(x.b.split(' ')[0]+' '+x.r)+'</b><span dir="auto" style="text-align:start">'+esc(techName(x).split(' — ').pop())+' · '+esc([x.p,x.cv?x.cv+x.A:(x.A!=null?x.A+'A':'')].filter(Boolean).join(' '))+'</span></div><button class="plus" data-act="tadd" data-v="'+gi+'" aria-label="+">+</button></div>'}).join('')+'</div>';
  if(!res.length&&!tr.length) h+='<div class="empty"><div class="big">🔎</div>'+T('notFound')+' «'+esc(view.q)+'»</div>';
  h+='<button class="btn main" data-act="custom" data-v="'+esc(view.q)+'">➕ '+esc(T('addNew').replace('%',view.q))+'</button>';
  return h;
}
function kitRow(k){return '<button class="row" data-act="kit" data-v="'+k.id+'"><span style="font-size:24px">'+icH(k.ic,'🧩')+'</span><div class="t"><b>'+esc(N(k))+'</b><span>'+k.parts.length+' '+T('items')+'</span></div><span class="plus">+</span></button>'}
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
  if(!L.length) return '<div class="empty"><div class="big">🧺</div>'+T('emptyCart')+'</div><button class="mlcard" data-act="mlist">'+icH('📝')+'<span><b>'+esc(L4(MLT.home))+'</b><small>'+esc(L4(MLT.homeS))+'</small></span><i>'+(settings.ui==='ar'?'‹':'›')+'</i></button>';
  var groups={}, order=[];
  L.forEach(function(l,i){var g=l.cat||'x';if(!groups[g]){groups[g]=[];order.push(g)}groups[g].push(i)});
  order.sort(function(a,b){return catIndex(a)-catIndex(b)});
  var h=whenRow();
  order.forEach(function(g){
    var c=CBY[g];
    h+='<div class="sec">'+(c?icH(c.ic)+' '+esc(N(c)):'➕ '+T('other'))+'</div><div class="list">';
    groups[g].forEach(function(i){
      var l=L[i], sub=lineSub(l);
      h+='<div class="line'+(l.got?' got':'')+'" data-li="'+i+'">'+(l.pid&&PH[l.pid]?'<img class="thumb" src="'+PH[l.pid]+'">':(l.item?thumb(l.item):''))+'<div class="t"><b>'+esc(N(l))+(l.got?' <span class="gtag">'+L4(XT.gotTag)+'</span>':'')+'</b>'+(sub?'<span style="text-align:start">'+sub+'</span>':'')+(l.note?'<i>📝 '+esc(l.note)+'</i>':'')+'</div>'+
        '<div class="stepper"><button data-act="dec" data-v="'+i+'">−</button><input inputmode="decimal" data-q="'+i+'" value="'+fmt(l.qty)+'"><span class="u">'+N(unit(l.unit))+'</span><button data-act="inc" data-v="'+i+'">+</button></div>'+
        '<button class="del" data-act="del" data-v="'+i+'">🗑</button></div>';
    });
    h+='</div>';
  });
  h+='<div class="mini" style="text-align:center;margin-top:8px">👆 '+L4(XT.pressHint)+'</div>';
  h+='<div class="row2" style="margin-top:12px"><button class="btn ghost" data-act="tomate">'+L4(XT.toMate).replace(' المشروع','').replace(' il progetto','').replace(' project','').replace(' le projet','')+'</button><button class="btn ghost" data-act="preview">'+T('preview')+'</button></div>';
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
  var q=cur().quote, pk=tradePack()||packData(), h='<div class="note" style="margin:0 0 12px">'+(pk&&pk.priceNote?(TL(pk.priceNote,settings.ui)):T('priceInfo'))+'</div>';
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
function CT(k){var C=window.LM_CALC||{};if(settings.ui==='es'&&!C.es&&C.en)C.es=esMap(C.en);return (TL(C,settings.ui)||{})[k]||k}
function n2(x,d){if(!isFinite(x))return '—';var p=Math.pow(10,d==null?2:d);var v=Math.round(x*p)/p;return String(v).replace('.',settings.ui==='en'?'.':',')}
var SECTIONS=[1.5,2.5,4,6,10,16,25,35,50,70,95];
var IZ2={1.5:17.5,2.5:24,4:32,6:41,10:57,16:76,25:101,35:125,50:151,70:192,95:232};   // 2 conduttori carichi, posa B
var IZ3={1.5:15.5,2.5:21,4:28,6:36,10:50,16:68,25:89,35:110,50:134,70:171,95:207};   // 3 conduttori carichi, posa B
var POSA_K={b:1,c:1.12,d:0.95};
var BREAKERS=[6,10,13,16,20,25,32,40,50,63,80,100,125];
var RHO=0.0225; // ohm·mm²/m rame a 70°C
var XL=0.00008; // reattanza cavo ohm/m (0,08 ohm/km), CEI-UNEL 35023
var GRP_K={1:1,2:0.8,3:0.7,4:0.65,5:0.6,6:0.57};            // circuiti raggruppati in tubo — IEC 60364-5-52 tab. B.52.17
var TEMP_K={25:1.03,30:1,35:0.94,40:0.87,45:0.79,50:0.71};  // temperatura ambiente, isolante PVC — tab. B.52.14
function dropPct(sys,I,L,S,V,cos){var k=sys==='tri'?Math.sqrt(3):2,c=cos||1,sn=Math.sqrt(Math.max(0,1-c*c));return k*L*I*(RHO/S*c+XL*sn)/V*100}
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
 {id:'cable',ic:'〰️',f:[['sys','sys','sel',[['mono','mono'],['tri','tri']]],['P','powerKW'],['I','current'],['L','length','num',null,20],['cos','cosphi','num',null,0.9],['max','maxDrop','num',null,4],['posa','posa','sel',[['b','posa1'],['c','posa2'],['d','posa3']]],['grp','grpN','sel',[[1,'1'],[2,'2'],[3,'3'],[4,'4'],[5,'5'],[6,'6+']]],['ta','ambT','sel',[[30,'30 °C'],[25,'25 °C'],[35,'35 °C'],[40,'40 °C'],[45,'45 °C'],[50,'50 °C']]]],run:function(v){
   var V=v.sys==='tri'?400:230, cos=v.cos||1, Ib=v.I>0?v.I:(v.P>0?loadCurrent(v.sys,v.P*1000,V,cos):0);
   if(!(Ib>0)) return '<div class="mini">'+CT('needLoad')+'</div>';
   var tab=v.sys==='tri'?IZ3:IZ2, k=(POSA_K[v.posa||'b']||1)*(GRP_K[+v.grp||1]||1)*(TEMP_K[+v.ta||30]||1), L=v.L||0, max=v.max||4;
   var In=BREAKERS.filter(function(b){return b>=Ib})[0];
   if(!In) return '<div class="warn">'+CT('tooBig')+'</div>';
   var pick=null, rows='';
   SECTIONS.forEach(function(S){
     var Iz=tab[S]*k, d=dropPct(v.sys,Ib,L,S,V,cos), good=Iz>=In&&d<=max;
     if(good&&!pick) pick={S:S,Iz:Iz,d:d};
     if(S<=50) rows+='<tr'+(pick&&pick.S===S?' style="background:var(--ok-bg);font-weight:700"':'')+'><td>'+S+' mm²</td><td>'+n2(Iz,0)+' A</td><td>'+n2(d)+' %</td><td>'+(good?'✓':'✗')+'</td></tr>';
   });
   if(!pick) return '<div class="warn">'+CT('tooBig')+'</div>';
   return res([[CT('loadI'),n2(Ib)+' A'],[CT('recSection'),'<b style="font-size:20px">'+pick.S+' mm²</b>'],[CT('breaker'),In+' A'+(v.sys==='tri'?' 4P':' 1P+N')],[CT('capacity'),n2(pick.Iz,0)+' A'],[CT('drop'),n2(pick.d)+' %'],[CT('rcd'),'30 mA · '+CT('rcdTip')]])+
    '<table class="ctab"><tr><th>mm²</th><th>Iz</th><th>ΔV</th><th></th></tr>'+rows+'</table>'+
    '<div class="mini" style="margin-top:8px">📘 '+CT('refNorm')+'</div>';
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
      return '<button data-act="calcopen" data-v="'+c.id+'"><span class="ic" style="min-width:32px;text-align:center">'+(SVGIC[c.ic]||c.ic)+'</span><div><b>'+CT(c.id)+'</b><span>'+CT(c.id+'Sub')+'</span></div></button>'}).join('')+'</div>';
  }
  var c=CBYID[view.calc], v=calcVals(c);
  h+='<div class="sec" style="font-size:16px">'+(SVGIC[c.ic]||c.ic)+' '+CT(c.id)+'</div>';
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
function chkName(i){var r=chkList()[i]||[];if(settings.ui==='es')return ESx(r[2]||r[1]||'');return r[{ar:0,it:1,en:2,fr:3}[settings.ui]]||r[1]||''}
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
// ogni finestra ha in alto un pulsante ✕ (o ← per tornare alla pagina precedente), sempre visibile
var SHEET_BACK=null;
function openSheet(html){var back=SHEET_BACK;SHEET_BACK=null;
  sheet.innerHTML='<div class="shead"><div class="grab"></div>'+(back?'<button class="sbk" id="sBk">'+(settings.ui==='ar'?'→':'←')+'</button>':'')+'<button class="sx" id="sX" aria-label="✕">✕</button></div>'+html;
  sheet.querySelector('#sX').onclick=closeSheet; if(back) sheet.querySelector('#sBk').onclick=back;sheet.scrollTop=0;bg.style.display='block';requestAnimationFrame(function(){sheet.classList.add('open')});sheetOpen=true}
function closeSheet(){sheet.classList.remove('open');bg.style.display='none';sheetOpen=false;if(document.activeElement)document.activeElement.blur();var f=sheet._onclose;sheet._onclose=null;if(f)f()}
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
  openSheet((hasImg(it.id)?'<div style="text-align:center;margin-bottom:8px">'+thumb(it.id,'big')+'</div>':'')+
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
// lista scritta a mano: più pezzi in una volta (righe o testo libero)
var MLT={t:{ar:'قائمة يدوية',it:'Lista a mano',en:'Write your list',fr:'Liste manuelle'},
 sub:{ar:'اكتب القطع التي تحتاجها بنفسك، سطراً لكل قطعة',it:'Scrivi tu i pezzi che ti servono, una riga per pezzo',en:'Type the parts you need yourself, one line per part',fr:'Écrivez vous-même les pièces, une ligne par pièce'},
 home:{ar:'اكتب قائمتك يدوياً',it:'Scrivi la tua lista a mano',en:'Write your list by hand',fr:'Écrivez votre liste à la main'},
 homeS:{ar:'لم تجد القطع؟ اكتبها بنفسك بسرعة',it:'Non trovi i pezzi? Scrivili tu, veloce',en:'Can’t find the parts? Type them quickly',fr:'Pièces introuvables ? Écrivez-les vite'},
 row:{ar:'سطر جديد',it:'Nuova riga',en:'New line',fr:'Nouvelle ligne'},
 nm:{ar:'اسم القطعة',it:'Nome del pezzo',en:'Part name',fr:'Nom de la pièce'},
 txt:{ar:'أو الصق قائمة كنص',it:'Oppure incolla una lista di testo',en:'Or paste a text list',fr:'Ou collez une liste en texte'},
 txtP:{ar:'مثال:\n10 m كابل 2.5\n5 علبة 503\nقاطع 16A',it:'Esempio:\n10 m cavo 2,5\n5 scatole 503\ninterruttore 16A',en:'Example:\n10 m cable 2.5\n5 boxes 503\nbreaker 16A',fr:'Exemple :\n10 m câble 2,5\n5 boîtes\ndisjoncteur 16A'},
 add:{ar:'أضف الكل إلى طلبي',it:'Aggiungi tutto alla richiesta',en:'Add all to my order',fr:'Tout ajouter à la demande'},
 none:{ar:'اكتب قطعة واحدة على الأقل',it:'Scrivi almeno un pezzo',en:'Write at least one part',fr:'Écrivez au moins une pièce'},
 ok:{ar:'تمت إضافة',it:'Aggiunti',en:'Added',fr:'Ajoutés'}};
// pagina "foglio" per scrivere la lista a mano (stile documento, poi PDF professionale)
var WHEN=[['oggi',{ar:'⚡ عاجل اليوم',it:'⚡ Urgente, oggi',en:'⚡ Urgent, today',fr:'⚡ Urgent, aujourd’hui'}],['domani',{ar:'📅 غداً',it:'📅 Domani',en:'📅 Tomorrow',fr:'📅 Demain'}],['sett',{ar:'🗓️ هذا الأسبوع',it:'🗓️ Questa settimana',en:'🗓️ This week',fr:'🗓️ Cette semaine'}]];
var WHT={ar:'⏰ متى تحتاجها؟',it:'⏰ Quando serve?',en:'⏰ When is it needed?',fr:'⏰ Pour quand ?'};
var WHO={ar:'مطلوب',it:'Serve',en:'Needed',fr:'Pour'};
function whenTxt(lang,k){var w=WHEN.find(function(x){return x[0]===k});return w?(w[1][lang==='both'?'it':lang]||w[1].it):''}
function whenRow(){var k=cur().site.when||'';return '<div class="when"><span>'+esc(L4(WHT))+'</span><div class="chips">'+WHEN.map(function(w){return '<button class="chip'+(k===w[0]?' on':'')+'" data-act="when" data-v="'+w[0]+'">'+esc(L4(w[1]))+'</button>'}).join('')+'</div></div>'}
// ---- 📘 guida tecnica: pezzi reali (marca, codice, dati, scheda PDF) + filtro interruttori ----
var TG={t:{ar:'دليل القطع التقني',it:'Guida tecnica dei pezzi',en:'Technical parts guide',fr:'Guide technique des pièces'},
 s:{ar:'قطع حقيقية بالعلامة والمرجع والمواصفات',it:'Pezzi reali con marca, codice e caratteristiche',en:'Real parts with brand, reference and specifications',fr:'Pièces réelles avec marque, référence et caractéristiques'},
 f:{ar:'🔎 مساعد اختيار القاطع',it:'🔎 Trova l’interruttore',en:'🔎 Breaker finder',fr:'🔎 Trouver le disjoncteur'},
 type:{ar:'النوع',it:'Tipo',en:'Type',fr:'Type'},amp:{ar:'الأمبير',it:'Ampere',en:'Amps',fr:'Ampères'},curve:{ar:'المنحنى',it:'Curva',en:'Curve',fr:'Courbe'},poles:{ar:'الأقطاب',it:'Poli',en:'Poles',fr:'Pôles'},
 all:{ar:'الكل',it:'Tutti',en:'All',fr:'Tous'},res:{ar:'نتيجة',it:'risultati',en:'results',fr:'résultats'},reset:{ar:'مسح الفلتر',it:'Azzera filtri',en:'Clear filters',fr:'Effacer'},
 ds:{ar:'📄 الملف الرسمي',it:'📄 Scheda ufficiale',en:'📄 Official datasheet',fr:'📄 Fiche officielle'},pg:{ar:'🔗 صفحة المنتج',it:'🔗 Pagina prodotto',en:'🔗 Product page',fr:'🔗 Page produit'},
 add:{ar:'➕ أضف إلى طلبي',it:'➕ Aggiungi alla richiesta',en:'➕ Add to my order',fr:'➕ Ajouter à la demande'},
 toPn:{ar:'ضعه في اللوحة الكهربائية',it:'Mettilo nel quadro elettrico',en:'Put it in the electrical panel',fr:'Le placer dans le tableau'},
 none:{ar:'لا توجد قطعة مطابقة. غيّر الاختيار.',it:'Nessun pezzo corrisponde. Cambia i filtri.',en:'No matching part. Change the filters.',fr:'Aucune pièce ne correspond. Modifiez les filtres.'},
 note:{ar:'المواصفات للإرشاد. تأكد دائماً من بيانات القطعة على العلبة قبل التركيب.',it:'Caratteristiche indicative. Verifica sempre i dati riportati sul prodotto prima dell’installazione.',en:'Specifications are indicative. Always check the data printed on the product before installing.',fr:'Caractéristiques indicatives. Vérifiez toujours les données inscrites sur le produit avant l’installation.'},
 cats:{mcb:{ar:'قاطع',it:'Magnetotermico',en:'MCB',fr:'Disjoncteur'},rccb:{ar:'تفاضلي',it:'Differenziale',en:'RCCB',fr:'Interrupteur diff.'},contactor:{ar:'كونتاكتور',it:'Contattore',en:'Contactor',fr:'Contacteur'},wiring_switch:{ar:'مفتاح',it:'Frutto',en:'Switch',fr:'Interrupteur'},terminal:{ar:'موصل',it:'Morsetto',en:'Terminal',fr:'Borne'},enclosure:{ar:'لوحة',it:'Centralino',en:'Enclosure',fr:'Coffret'}}};
function techList(){var T_=window.LM_TECH;if(!T_||(settings.trade||'ele')!=='ele'||!rcFlag('tech'))return [];var cc=packId();var ix=T_.cc[cc]||T_.cc.IT||[];return ix.map(function(i){return T_.items[i]})}
function techF(){if(!view.tf)view.tf={c:'',A:'',cv:'',p:''};return view.tf}
function techName(x){return (x.n&&(TL(x.n,settings.ui)||x.n.en))||(x.b+' '+x.r)}
function techOk(x,f,skip){return (skip==='c'||!f.c||x.c===f.c)&&(skip==='A'||!f.A||String(x.A)===f.A)&&(skip==='cv'||!f.cv||x.cv===f.cv)&&(skip==='p'||!f.p||x.p===f.p)}
function renderTech(){
  var L=techList(), f=techF(), res=L.filter(function(x){return techOk(x,f)});
  function opts(key,vals,lab){var avail={};L.filter(function(x){return techOk(x,f,key)}).forEach(function(x){if(x[key]!=null&&x[key]!=='')avail[x[key]]=1});
    var vs=vals.filter(function(v){return avail[v]});if(!vs.length)return '';
    return '<div class="tgrow"><span>'+esc(L4(lab))+'</span><div class="chips"><button class="chip'+(f[key]?'':' on')+'" data-act="tf" data-k="'+key+'" data-v="">'+esc(L4(TG.all))+'</button>'+vs.map(function(v){return '<button class="chip'+(String(f[key])===String(v)?' on':'')+'" data-act="tf" data-k="'+key+'" data-v="'+esc(v)+'">'+(key==='c'?esc(L4(TG.cats[v]||{it:v})):'<bdi dir="ltr">'+esc(key==='A'?v+' A':v)+'</bdi>')+'</button>'}).join('')+'</div></div>'}
  var cats=['mcb','rccb','contactor','wiring_switch','terminal','enclosure'], amps={};L.forEach(function(x){if(x.A!=null)amps[x.A]=1});
  var A=Object.keys(amps).map(Number).sort(function(a,b){return a-b}).map(String);
  var h='<button class="back" data-act="back">'+(settings.ui==='ar'?'→ ':'← ')+T('allCats')+'</button>'+
   '<div class="sec">'+icH('📐')+' '+esc(L4(TG.t))+'</div>'+
   '<div class="tgbox"><b>'+esc(L4(TG.f))+'</b>'+opts('c',cats,TG.type)+opts('A',A,TG.amp)+opts('cv',['B','C','D'],TG.curve)+opts('p',['1P','1P+N','2P','3P','4P'],TG.poles)+
   '<div class="tgres"><span><b>'+res.length+'</b> '+esc(L4(TG.res))+'</span>'+((f.c||f.A||f.cv||f.p)?'<button data-act="tfreset">✕ '+esc(L4(TG.reset))+'</button>':'')+'</div></div>'+
   '<div class="mini" style="margin:8px 4px">ⓘ '+esc(L4(TG.note))+'</div>';
  if(!res.length) return h+'<div class="empty"><div class="big">🔎</div>'+esc(L4(TG.none))+'</div>';
  return h+res.map(function(x){
    var b=[];if(x.A!=null)b.push(x.A+' A');if(x.cv)b.push((settings.ui==='ar'?'منحنى ':'')+x.cv);if(x.p)b.push(x.p);(x.kA||[]).forEach(function(k){b.push(k[0].replace('I_delta_m','IΔm')+' '+String(k[1]).replace('.',settings.ui==='en'?'.':',')+' kA')});if(x.mA)b.push(x.mA+' mA'+(x.rt?' · '+x.rt:''));
    var gi=TECH_IX[x.i];
    return '<div class="tcard"><div class="th1"><span class="tb">'+esc(x.b)+'</span><span class="tr" dir="ltr">'+esc(x.r)+'</span><span class="tc">'+esc(L4(TG.cats[x.c]||{it:x.c}))+'</span></div>'+
     '<div class="tn" dir="auto">'+esc(techName(x).split(' — ').pop())+'</div>'+((x.d&&(TL(x.d,settings.ui)))?'<div class="mini" dir="auto" style="text-align:start">'+esc(TL(x.d,settings.ui))+'</div>':'')+
     '<div class="tbadges">'+b.map(function(t){return '<span dir="ltr">'+esc(t)+'</span>'}).join('')+'</div>'+
     '<div class="tact">'+'<button class="btn main" data-act="tadd" data-v="'+gi+'">'+esc(L4(TG.add))+'</button></div>'+(PNCAT[x.c]&&rcFlag('panel')?'<button class="tpn" data-act="tpanel" data-v="'+gi+'">⚡ '+esc(L4(TG.toPn))+'</button>':'')+'</div>'}).join('');
}
var TECH_IX={};(function(){var T_=window.LM_TECH;if(T_)T_.items.forEach(function(x,i){TECH_IX[x.i]=i})})();
function techAdd(i){var x=(window.LM_TECH||{items:[]}).items[+i];if(!x)return;var n=x.n||{};
  function bn(t){t=t||(x.f+' '+x.r);return t.indexOf(x.b)===0?t:x.b+' '+t}
  addLine({it:bn(n.it),ar:bn(n.ar||n.it),fr:bn(n.fr||n.it),en:bn(n.en||n.it),cat:'x',unit:'pz',qty:1,note:''});
  save();refreshCounts();toast(T('added')+' '+x.b+' '+x.r)}
// ---- ⚡ quadro elettrico realistico: generatore + disegno + modifica + PDF + materiali ----
var PN={t:{ar:'لوحة كهربائية واقعية',it:'Quadro elettrico realistico',en:'Realistic electrical panel',fr:'Tableau électrique réaliste'},
 s:{ar:'ارسم اللوحة بالقواطع والأسلاك وأرسلها للزبون',it:'Disegna il quadro con interruttori e cavi e invialo al cliente',en:'Draw the panel with breakers and wires, send it to the client',fr:'Dessinez le tableau avec disjoncteurs et câbles, envoyez-le au client'},
 gen:{ar:'✨ توليد تلقائي',it:'✨ Genera automatico',en:'✨ Auto-generate',fr:'✨ Générer auto'},
 add:{ar:'➕ إضافة قطعة',it:'➕ Aggiungi modulo',en:'➕ Add module',fr:'➕ Ajouter module'},
 set:{ar:'⚙️ الإعدادات',it:'⚙️ Impostazioni',en:'⚙️ Settings',fr:'⚙️ Réglages'},
 hint:{ar:'اضغط على أي قطعة في الرسم لتعديلها',it:'Tocca un modulo nel disegno per modificarlo',en:'Tap any module in the drawing to edit it',fr:'Touchez un module du dessin pour le modifier'},
 empty:{ar:'اختر الدوائر (إنارة، مقابس، فرن…) ويرسم التطبيق اللوحة والأسلاك وحده. بعدها تعدّل ما تريد.',it:'Scegli i circuiti (luci, prese, forno…) e l’app disegna da sola quadro e cavi. Poi modifichi quello che vuoi.',en:'Pick the circuits (lights, sockets, oven…) and the app draws the panel and wiring for you. Then edit anything.',fr:'Choisissez les circuits (éclairage, prises, four…) et l’app dessine le tableau et le câblage. Ensuite modifiez ce que vous voulez.'},
 start:{ar:'ابدأ: اختر الدوائر',it:'Inizia: scegli i circuiti',en:'Start: pick circuits',fr:'Commencer : choisir les circuits'},
 tpl:{ar:'أو ابدأ من نموذج جاهز',it:'Oppure parti da un modello',en:'Or start from a template',fr:'Ou partir d’un modèle'},
 legend:{ar:'جدول الدوائر',it:'Schema dei circuiti',en:'Circuit schedule',fr:'Tableau des circuits'},
 pdf:{ar:'📄 PDF',it:'📄 PDF',en:'📄 PDF',fr:'📄 PDF'},wa:{ar:'💬 واتساب',it:'💬 WhatsApp',en:'💬 WhatsApp',fr:'💬 WhatsApp'},
 ord:{ar:'🛒 أضف المواد إلى طلبي',it:'🛒 Aggiungi i materiali alla richiesta',en:'🛒 Add materials to my order',fr:'🛒 Ajouter le matériel à la demande'},
 added:{ar:'أضيفت المواد إلى طلبك',it:'Materiali aggiunti alla richiesta',en:'Materials added to your order',fr:'Matériel ajouté à la demande'},
 sys:{ar:'النظام',it:'Sistema',en:'System',fr:'Système'},mono:{ar:'أحادي الطور 230V‏',it:'Monofase 230V',en:'Single-phase 230V',fr:'Monophasé 230V'},tri:{ar:'ثلاثي الطور 400V‏',it:'Trifase 400V',en:'Three-phase 400V',fr:'Triphasé 400V'},
 mainA:{ar:'القاطع الرئيسي',it:'Interruttore generale',en:'Main breaker',fr:'Disjoncteur général'},
 circ:{ar:'الدوائر',it:'Circuiti',en:'Circuits',fr:'Circuits'},
 prot:{ar:'الحماية التفاضلية',it:'Protezione differenziale',en:'Earth-leakage protection',fr:'Protection différentielle'},
 p2:{ar:'تفاضليان (مجموعتان)',it:'2 differenziali (2 gruppi)',en:'2 RCCBs (2 groups)',fr:'2 interrupteurs diff. (2 groupes)'},
 p1:{ar:'تفاضلي واحد',it:'1 differenziale',en:'1 RCCB',fr:'1 interrupteur diff.'},
 pE:{ar:'قاطع تفاضلي لكل خط',it:'Magnetotermico differenziale per ogni linea',en:'RCBO on every line',fr:'Disjoncteur diff. par ligne'},
 spd:{ar:'واقي الصواعق SPD',it:'Scaricatore SPD',en:'Surge protector SPD',fr:'Parafoudre SPD'},
 row:{ar:'موديول في كل سطر',it:'Moduli per fila',en:'Modules per row',fr:'Modules par rangée'},
 lc:{ar:'لون سلك الطور',it:'Colore della fase',en:'Phase wire colour',fr:'Couleur de la phase'},
 name:{ar:'اسم اللوحة',it:'Nome del quadro',en:'Panel name',fr:'Nom du tableau'},
 make:{ar:'ارسم اللوحة',it:'Disegna il quadro',en:'Draw the panel',fr:'Dessiner le tableau'},
 type:{ar:'النوع',it:'Tipo',en:'Type',fr:'Type'},lbl:{ar:'اسم الدائرة',it:'Nome del circuito',en:'Circuit name',fr:'Nom du circuit'},
 amp:{ar:'الأمبير',it:'Ampere',en:'Amps',fr:'Ampères'},curve:{ar:'المنحنى',it:'Curva',en:'Curve',fr:'Courbe'},poles:{ar:'الأقطاب',it:'Poli',en:'Poles',fr:'Pôles'},
 sens:{ar:'الحساسية',it:'Sensibilità',en:'Sensitivity',fr:'Sensibilité'},rt:{ar:'النوع التفاضلي',it:'Tipo differenziale',en:'RCD type',fr:'Type diff.'},
 ph:{ar:'الطور',it:'Fase',en:'Phase',fr:'Phase'},sec:{ar:'مقطع السلك',it:'Sezione cavo',en:'Cable size',fr:'Section câble'},
 left:{ar:'→ يمين',it:'← Sinistra',en:'← Left',fr:'← Gauche'},right:{ar:'يسار ←',it:'Destra →',en:'Right →',fr:'Droite →'},
 dup:{ar:'نسخ',it:'Duplica',en:'Duplicate',fr:'Dupliquer'},del:{ar:'حذف',it:'Elimina',en:'Delete',fr:'Supprimer'},ok:{ar:'تم',it:'Fatto',en:'Done',fr:'OK'},
 clr:{ar:'🗑 مسح اللوحة',it:'🗑 Svuota quadro',en:'🗑 Clear panel',fr:'🗑 Vider le tableau'},
 sure:{ar:'سيتم استبدال اللوحة الحالية. متابعة؟',it:'Il quadro attuale verrà sostituito. Continuare?',en:'The current panel will be replaced. Continue?',fr:'Le tableau actuel sera remplacé. Continuer ?'},
 feed:{ar:'التغذية من العداد',it:'Alimentazione dal contatore',en:'Supply from the meter',fr:'Alimentation depuis le compteur'},
 out:{ar:'الخطوط نحو الاستعمالات',it:'Linee verso le utenze',en:'Lines to the loads',fr:'Lignes vers les utilisations'},
 earth:{ar:'الأرضي',it:'Terra',en:'Earth',fr:'Terre'},
 note:{ar:'رسم توضيحي. التصميم والتركيب النهائي يجب أن يتحقق منه كهربائي مؤهل وفق المعايير.',it:'Disegno illustrativo. Progetto e installazione vanno verificati da un tecnico abilitato secondo le norme.',en:'Illustrative drawing. Final design and installation must be checked by a qualified electrician to the standards.',fr:'Dessin illustratif. La conception et l’installation doivent être vérifiées par un électricien qualifié selon les normes.'},
 manual:{ar:'✋ ابنِ اللوحة بنفسك قطعة قطعة',it:'✋ Costruisci il quadro da te, pezzo per pezzo',en:'✋ Build the panel yourself, part by part',fr:'✋ Construisez le tableau vous-même, pièce par pièce'},
 zoom:{ar:'🔍 تكبير',it:'🔍 Zoom',en:'🔍 Zoom',fr:'🔍 Zoom'},
 types:{main:{ar:'قاطع رئيسي',it:'Generale',en:'Main',fr:'Général'},rcd:{ar:'تفاضلي',it:'Differenziale',en:'RCCB',fr:'Interrupteur diff.'},rcbo:{ar:'حراري تفاضلي',it:'Magnetot. diff.',en:'RCBO',fr:'Disj. diff.'},mcb:{ar:'قاطع',it:'Magnetotermico',en:'MCB',fr:'Disjoncteur'},spd:{ar:'واقي صواعق',it:'Scaricatore SPD',en:'SPD',fr:'Parafoudre'},cont:{ar:'كونتاكتور',it:'Contattore',en:'Contactor',fr:'Contacteur'},gap:{ar:'فراغ',it:'Spazio vuoto',en:'Blank',fr:'Obturateur'},
  isol:{ar:'مفصل رئيسي',it:'Sezionatore',en:'Isolator',fr:'Sectionneur'},fuse:{ar:'حامل فيوز',it:'Portafusibile',en:'Fuse holder',fr:'Porte-fusible'},
  rel:{ar:'ريليه خطوة بخطوة',it:'Relè passo-passo',en:'Impulse relay',fr:'Télérupteur'},tmr:{ar:'مؤقت الدرج',it:'Temporizzatore',en:'Staircase timer',fr:'Minuterie'},
  crep:{ar:'مفتاح ضوئي',it:'Crepuscolare',en:'Twilight switch',fr:'Crépusculaire'},meter:{ar:'عداد طاقة',it:'Contatore energia',en:'Energy meter',fr:'Compteur'},
  lamp:{ar:'لمبة إشارة',it:'Lampada spia',en:'Pilot lamp',fr:'Voyant'},sock:{ar:'مقبس لوحة',it:'Presa da quadro',en:'DIN socket',fr:'Prise modulaire'},
  trf:{ar:'محول جرس',it:'Trasformatore',en:'Bell transformer',fr:'Transfo sonnerie'},term:{ar:'موصلات DIN',it:'Morsettiera',en:'Terminal block',fr:'Bornier'}},
 grp:[{ar:'الحماية',it:'Protezione',en:'Protection',fr:'Protection'},{ar:'التحكم',it:'Comando',en:'Control',fr:'Commande'},{ar:'أخرى',it:'Altro',en:'Other',fr:'Autres'}],
 real:{ar:'📘 قطعة حقيقية من الدليل',it:'📘 Pezzo reale dalla guida',en:'📘 Real part from the guide',fr:'📘 Pièce réelle du guide'},
 realS:{ar:'اختر مرجعاً حقيقياً (علامة + مرجع) فيدخل في اللوحة وفي الطلب كما هو',it:'Scegli un codice reale (marca + codice): entra nel quadro e nella richiesta così com’è',en:'Pick a real reference (brand + code): it goes into the panel and the order as is',fr:'Choisissez une référence réelle (marque + code) : elle entre dans le tableau et la demande telle quelle'},
 noReal:{ar:'لا توجد قطع حقيقية مطابقة لبلدك في الدليل بعد',it:'Nessun pezzo reale compatibile nella guida per il tuo paese',en:'No compatible real parts in the guide for your country yet',fr:'Aucune pièce réelle compatible dans le guide pour votre pays'}};
var PNG3=[['main','isol','rcd','rcbo','mcb','spd','fuse'],['cont','rel','tmr','crep'],['meter','lamp','sock','trf','term','gap']];
var PNTALL=PNG3[0].concat(PNG3[1],PNG3[2]);
var PNBRK={main:1,isol:1,rcd:1,rcbo:1,mcb:1};
// circuiti tipici: ampere, sezione mm², nome
var PCT=[['luci',10,'1,5',{ar:'إنارة',it:'Luci',en:'Lighting',fr:'Éclairage'},2],['prese',16,'2,5',{ar:'مقابس',it:'Prese',en:'Sockets',fr:'Prises'},2],
 ['cucina',16,'2,5',{ar:'مطبخ / فرن',it:'Cucina / forno',en:'Kitchen / oven',fr:'Cuisine / four'},1],['induz',32,'6',{ar:'موقد كهربائي (Induction)',it:'Piano a induzione',en:'Induction hob',fr:'Plaque à induction'},0],
 ['lav',16,'2,5',{ar:'غسالة',it:'Lavatrice',en:'Washing machine',fr:'Lave-linge'},1],['clima',16,'2,5',{ar:'مكيّف',it:'Condizionatore',en:'Air conditioning',fr:'Climatisation'},1],
 ['boiler',16,'2,5',{ar:'سخان الماء',it:'Scaldabagno',en:'Water heater',fr:'Chauffe-eau'},1],['est',16,'2,5',{ar:'خارجي / حديقة',it:'Esterno / giardino',en:'Outdoor / garden',fr:'Extérieur / jardin'},0],
 ['box',16,'2,5',{ar:'مرآب / قبو',it:'Box / cantina',en:'Garage / cellar',fr:'Garage / cave'},0],['pompa',16,'2,5',{ar:'مضخة / محرك',it:'Pompa / motore',en:'Pump / motor',fr:'Pompe / moteur'},0],
 ['ev',32,'6',{ar:'شاحن سيارة',it:'Ricarica auto',en:'EV charger',fr:'Borne voiture'},0]];
var PCTBY={};PCT.forEach(function(c){PCTBY[c[0]]=c});
var PTPL=[['app',{ar:'شقة',it:'Appartamento',en:'Apartment',fr:'Appartement'},{sys:'1',A:32,prot:'2',spd:0,c:{luci:2,prese:2,cucina:1,lav:1,clima:1,boiler:1}}],
 ['mono',{ar:'استوديو',it:'Monolocale',en:'Studio flat',fr:'Studio'},{sys:'1',A:25,prot:'1',spd:0,c:{luci:1,prese:2,cucina:1,boiler:1}}],
 ['shop',{ar:'محل تجاري',it:'Negozio',en:'Shop',fr:'Commerce'},{sys:'1',A:40,prot:'E',spd:1,c:{luci:2,prese:3,clima:1,est:1}}],
 ['villa',{ar:'فيلا ثلاثي الطور',it:'Villetta trifase',en:'Three-phase house',fr:'Maison triphasée'},{sys:'3',A:32,prot:'2',spd:1,c:{luci:3,prese:3,cucina:1,induz:1,lav:1,clima:2,boiler:1,est:1,pompa:1}}]];
function pnL(o){return L4(o)}
function pnl(){var p=cur();return p.panel?pnMig(p.panel):null}
function pnPh(sys){return sys==='3'?['L1','L2','L3']:['L']}
function pnFix(m,sys){ // poli validi secondo tipo e sistema
  var tri=sys==='3',t=m.t,ok;
  if(t==='gap'||t==='term'){m.p='';return m}
  if(m.ref&&m.p){if(tri&&/^(1P|1P\+N|2P)$/.test(m.p)&&!/^L[123]$/.test(m.ph||''))m.ph='L1';return m}
  if(t==='main'||t==='rcd'||t==='spd'||t==='cont'||t==='isol')ok=tri?['2P','4P']:['2P'];
  else if(t==='rcbo')ok=tri?['1P+N','4P']:['1P+N'];
  else if(t==='meter')ok=tri?['1P+N','4P']:['1P+N'];
  else if(t==='mcb'||t==='fuse')ok=tri?['1P','1P+N','2P','3P','4P']:['1P','1P+N','2P'];
  else ok=['1P+N'];
  if(ok.indexOf(m.p)<0)m.p=t==='main'||t==='isol'||t==='rcd'||t==='spd'?(tri?'4P':'2P'):ok[0];
  if(tri&&/^(1P|1P\+N|2P)$/.test(m.p)&&!/^L[123]$/.test(m.ph||''))m.ph='L1';
  return m}
function pnW(m){if(m.wm)return m.wm;var t=m.t,np={'1P':1,'1P+N':2,'2P':2,'3P':3,'4P':4}[m.p]||1;
  switch(t){case 'gap':case 'tmr':case 'rel':case 'crep':case 'lamp':return 1;case 'sock':return 2.5;case 'trf':case 'term':return 2;
   case 'meter':return m.p==='4P'?4:1;case 'fuse':return np;case 'isol':case 'rcd':case 'spd':case 'cont':return m.p==='4P'?4:2;case 'rcbo':return m.p==='4P'?4:2}
  return {'1P':1,'1P+N':1,'2P':2,'3P':3,'4P':4}[m.p]||1}
function pnCond(m,sys){if(m.t==='term'||m.t==='gap')return [];var ph=sys==='3'?(m.ph||'L1'):'L';
  switch(m.p){case '1P':return [ph];case '1P+N':case '2P':return [ph,'N'];case '3P':return ['L1','L2','L3'];case '4P':return ['L1','L2','L3','N']}return []}
function pnGen(o){ // o={sys,A,prot:'1'|'2'|'E',spd,c:{key:n}}
  var sys=o.sys==='3'?'3':'1',ms=[],k=0,phs=['L1','L2','L3'];
  function nx(){return phs[(k++)%3]}
  ms.push({t:'main',p:sys==='3'?'4P':'2P',A:o.A||32,cv:'C',l:pnL({ar:'القاطع الرئيسي',it:'Generale',en:'Main switch',fr:'Général'})});
  if(o.spd)ms.push({t:'spd',p:sys==='3'?'4P':'2P',l:'SPD'});
  var lines=[];PCT.forEach(function(c){var n=+((o.c||{})[c[0]])||0;for(var i=0;i<n;i++){
    var tp=sys==='3'&&(c[0]==='pompa'||c[0]==='ev')?'4P':'1P+N';
    lines.push({t:'mcb',p:tp,A:c[1],cv:'C',s:c[2],k:c[0],l:pnL(c[3])+(n>1?' '+(i+1):'')})}});
  if(sys==='3')lines.forEach(function(m){if(m.p==='1P+N')m.ph=nx()});
  var rA=Math.max(40,o.A||32)>40?63:40;
  if(o.prot==='E'){lines.forEach(function(m){m.t='rcbo';m.mA=30;m.rt='A';if(m.p!=='4P')m.p='1P+N'});ms=ms.concat(lines)}
  else if(o.prot==='1'||lines.length<3){ms.push({t:'rcd',p:sys==='3'?'4P':'2P',A:rA,mA:30,rt:'A',l:pnL({ar:'تفاضلي',it:'Differenziale',en:'RCCB',fr:'Différentiel'})});ms=ms.concat(lines)}
  else {var g1=lines.filter(function(m){return m.k==='luci'||m.k==='prese'||m.k==='box'||m.k==='est'}),g2=lines.filter(function(m){return g1.indexOf(m)<0});
    if(!g1.length||!g2.length){var h=Math.ceil(lines.length/2);g1=lines.slice(0,h);g2=lines.slice(h)}
    ms.push({t:'rcd',p:sys==='3'?'4P':'2P',A:rA,mA:30,rt:'A',l:pnL({ar:'تفاضلي 1',it:'Differenziale 1',en:'RCCB 1',fr:'Différentiel 1'})});ms=ms.concat(g1);
    ms.push({t:'rcd',p:sys==='3'?'4P':'2P',A:rA,mA:30,rt:'A',l:pnL({ar:'تفاضلي 2',it:'Differenziale 2',en:'RCCB 2',fr:'Différentiel 2'})});ms=ms.concat(g2)}
  var tot=0;ms.forEach(function(m){pnFix(m,sys);tot+=pnW(m)+0.6});
  return {v:1,sys:sys,row:tot>26?18:12,lc:(packId()==='IT'?'br':'rd'),name:'',mods:ms}}
// ---------- layout ----------
var PNM=36,PNG=22,PNDH=150,PND=26,PNSP=36,PNRH=PND+PNSP+PNDH+PNSP;
function pnLayout(P){
  var ms=P.mods||[],cap=(P.row||12)*PNM+3*PNG,rows=[[]],x=0,head=-1,lastMain=-1,items=[],prevMem=null,q=0;
  ms.forEach(function(m,i){
    var it={m:m,i:i,w:pnW(m)*PNM};
    if(m.t==='main'||m.t==='isol'){it.src='feed';lastMain=i;head=i}
    else if(m.t==='rcd'){it.src=lastMain>=0?lastMain:'feed';head=i}
    else if(m.t==='spd'){it.src=lastMain>=0?lastMain:'feed'}
    else if(m.t!=='gap'){it.head=head<0?'feed':head}
    if(m.t!=='gap')it.q=m.n||++q;
    items.push(it)});
  items.forEach(function(it,j){
    var row=rows[rows.length-1],prev=row.length?row[row.length-1]:null;
    function segStart(pr){return it.head!==undefined&&!(pr&&pr.head===it.head)}
    var g=(it.m.t==='rcd'||it.m.t==='spd'||(it.head!==undefined&&segStart(prev)))?PNG:(prev?2:0);
    if(row.length&&x+g+it.w>cap){rows.push([]);row=rows[rows.length-1];x=0;prev=null;g=(it.m.t==='rcd'||it.m.t==='spd'||it.head!==undefined)?PNG:0}
    x+=g;it.x=x;it.r=rows.length-1;it.seg=it.head!==undefined&&segStart(prev);x+=it.w;row.push(it);it.rx=x});
  var W=Math.max(cap,Math.max.apply(null,rows.map(function(r){return r.length?r[r.length-1].rx:0})));
  return {items:items,rows:rows,W:W}}
// ---------- disegno SVG ----------
function pnCol(P,c){var lc={br:'#7B4A22',rd:'#D7362B',bk:'#1E2226'}[P.lc||'br']||'#7B4A22';
  return {L:lc,L1:'#7B4A22',L2:'#1E2226',L3:'#8C949C',N:'#1F6FD6',PE:'#2E9E48'}[c]||'#888'}
function pnWire(d,col,pe){return '<path d="'+d+'" stroke="'+col+'" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
  (pe?'<path d="'+d+'" stroke="#F4D31C" stroke-width="5" fill="none" stroke-dasharray="7 7" stroke-linecap="butt"/>':'')+
  '<path d="'+d+'" stroke="#fff" stroke-opacity=".28" stroke-width="1.4" fill="none" transform="translate(-1,0)"/>'}
function pnFer(x,y){return '<rect x="'+(x-4)+'" y="'+y+'" width="8" height="9" rx="1.5" fill="#F2C200" stroke="#B88F00" stroke-width=".6"/>'}
function pnScrew(x,y){return '<circle cx="'+x+'" cy="'+y+'" r="7" fill="url(#pnScr)" stroke="#7d848c" stroke-width=".8"/><path d="M'+(x-4)+' '+(y+1.5)+'L'+(x+4)+' '+(y-1.5)+'" stroke="#3b4148" stroke-width="1.6" stroke-linecap="round"/>'}
function pnDev(it,X,Y,P,sel){
  var m=it.m,w=it.w,x=X+it.x,y=Y,n=pnCond(m,P.sys).length||1,h='',cx=x+w/2,i;
  var tx=function(k){return x+(k+0.5)*w/n};
  var shY=m.t==='gap'?30:m.t==='term'?18:0,shH=m.t==='gap'?PNDH-60:m.t==='term'?PNDH-36:PNDH;
  h+='<g data-act="pnle" data-v="'+it.i+'" style="cursor:pointer"><rect x="'+(x+3)+'" y="'+(y+4+shY)+'" width="'+(w-2)+'" height="'+shH+'" rx="4" fill="#000" opacity=".35"/>';
  if(m.t==='term'){h+='<rect x="'+(x+1)+'" y="'+(y+18)+'" width="'+(w-2)+'" height="'+(PNDH-36)+'" rx="3" fill="#cfd4d9" stroke="#9aa1a8"/>';var nt=Math.max(2,Math.round(w/12));for(i=0;i<nt;i++){var xx=x+(i+0.5)*w/nt,cl=i%3===2?'#2E9E48':i%3===1?'#1F6FD6':'#8C949C';h+='<rect x="'+(xx-w/nt/2+1)+'" y="'+(y+40)+'" width="'+(w/nt-2)+'" height="'+(PNDH-80)+'" rx="2" fill="'+cl+'" opacity=".85"/>'+pnScrew(xx,y+30)+pnScrew(xx,y+PNDH-30)}
    return h+'<text x="'+cx+'" y="'+(y+PNDH/2+4)+'" text-anchor="middle" font-family="Arial" font-weight="700" font-size="10" fill="#fff">X'+it.q+'</text>'+(sel?'<rect x="'+(x-2)+'" y="'+(y+14)+'" width="'+(w+4)+'" height="'+(PNDH-28)+'" rx="5" fill="none" stroke="#2F6BFF" stroke-width="3"/>':'')+'</g>'}
  if(m.t==='gap'){return h+'<rect x="'+(x+1)+'" y="'+(y+30)+'" width="'+(w-2)+'" height="'+(PNDH-60)+'" rx="3" fill="url(#pnBody)" stroke="#aab0b7"/><rect x="'+(x+8)+'" y="'+(y+60)+'" width="'+(w-16)+'" height="30" rx="2" fill="#d5d9de"/>'+(sel?'<rect x="'+(x-2)+'" y="'+(y+26)+'" width="'+(w+4)+'" height="'+(PNDH-52)+'" rx="5" fill="none" stroke="#2F6BFF" stroke-width="3"/>':'')+'</g>'}
  var body=m.t==='spd'?'url(#pnBodyG)':'url(#pnBody)';
  h+='<rect x="'+(x+1)+'" y="'+y+'" width="'+(w-2)+'" height="'+PNDH+'" rx="4" fill="'+body+'" stroke="#a9afb6"/>'+
   '<rect x="'+(x+2)+'" y="'+(y+1)+'" width="'+(w-4)+'" height="27" rx="3" fill="#e4e7ea"/><rect x="'+(x+2)+'" y="'+(y+PNDH-28)+'" width="'+(w-4)+'" height="27" rx="3" fill="#e4e7ea"/>';
  for(i=0;i<n;i++){h+=pnScrew(tx(i),y+14)+pnScrew(tx(i),y+PNDH-14)}
  var stripe={main:'#C92A2A',isol:'#C92A2A',rcd:'#1F6FD6',rcbo:'#1F6FD6',mcb:'#2F9E44',spd:'#E8590C',cont:'#5F3DC4',rel:'#5F3DC4',tmr:'#5F3DC4',crep:'#5F3DC4',fuse:'#868E96',meter:'#0B7285',lamp:'#E67700',sock:'#495057',trf:'#495057'}[m.t]||'#868E96';
  h+='<rect x="'+(x+3)+'" y="'+(y+31)+'" width="'+(w-6)+'" height="3.5" rx="1" fill="'+stripe+'"/>';
  var big='',small='';
  if(m.t==='mcb'||m.t==='main'){big=(m.cv||'C')+(m.A||16)}
  else if(m.t==='rcbo'){big=(m.cv||'C')+(m.A||16);small=(m.mA||30)+'mA'}
  else if(m.t==='rcd'){big=(m.A||40)+'A';small=(m.mA||30)+'mA'}
  else if(m.t==='spd'){big='SPD'}
  else if(m.t==='cont'){big='KM';small=(m.A||25)+'A'}
  else if(m.t==='isol'){big=(m.A||40)+'A';small='0 - I'}
  else if(m.t==='fuse'){big=(m.A||10)+'A';small='gG'}
  else if(m.t==='rel'){big='RL';small='16A'}
  else if(m.t==='tmr'){big='T';small='min'}
  else if(m.t==='crep'){big='LUX'}
  else if(m.t==='meter'){big='kWh'}
  else if(m.t==='lamp'){big='H'}
  else if(m.t==='sock'){big='16A'}
  else if(m.t==='trf'){big='12V';small='~'}
  var fs=w<=PNM?(big.length>3?11.5:13.5):16;
  h+='<text x="'+cx+'" y="'+(y+52)+'" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="'+fs+'" fill="#1d2329">'+esc(big)+'</text>';
  if(small)h+='<text x="'+cx+'" y="'+(y+64)+'" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="9" fill="#1F6FD6">'+esc(small)+'</text>';
  var ly=y+(small?70:62),lh=40;
  if(m.t==='spd'){for(i=0;i<n;i++){h+='<rect x="'+(tx(i)-6)+'" y="'+(ly+6)+'" width="12" height="18" rx="2" fill="#2F9E44" stroke="#1d6b2e"/>'}}
  else if(m.t==='meter'){h+='<rect x="'+(x+4)+'" y="'+(ly+2)+'" width="'+(w-8)+'" height="18" rx="2" fill="#1b2a1e"/><text x="'+cx+'" y="'+(ly+15)+'" text-anchor="middle" font-family="Courier New,monospace" font-weight="700" font-size="'+(w>40?11:8)+'" fill="#8CE99A">'+(w>40?'0001234.5':'0123')+'</text><circle cx="'+cx+'" cy="'+(ly+30)+'" r="3" fill="#FA5252"/>'}
  else if(m.t==='lamp'){h+='<circle cx="'+cx+'" cy="'+(ly+16)+'" r="11" fill="#40C057" stroke="#2b8a3e" stroke-width="2"/><circle cx="'+(cx-3)+'" cy="'+(ly+12)+'" r="3.5" fill="#fff" opacity=".6"/>'}
  else if(m.t==='sock'){h+='<circle cx="'+cx+'" cy="'+(ly+18)+'" r="17" fill="#e9ecef" stroke="#868e96" stroke-width="1.5"/><circle cx="'+(cx-7)+'" cy="'+(ly+18)+'" r="2.5" fill="#343a40"/><circle cx="'+(cx+7)+'" cy="'+(ly+18)+'" r="2.5" fill="#343a40"/><circle cx="'+cx+'" cy="'+(ly+18)+'" r="2.5" fill="#343a40"/>'}
  else if(m.t==='fuse'){var nf=pnCond(m,P.sys).length||1;for(i=0;i<nf;i++){var fx=x+(i+0.5)*w/nf;h+='<rect x="'+(fx-8)+'" y="'+(ly)+'" width="16" height="34" rx="3" fill="#bfe3f5" stroke="#74a9c4"/><rect x="'+(fx-4)+'" y="'+(ly+4)+'" width="8" height="26" rx="3" fill="#f1f3f5" stroke="#adb5bd"/>'}}
  else if(m.t==='tmr'||m.t==='crep'||m.t==='trf'){h+='<circle cx="'+cx+'" cy="'+(ly+16)+'" r="10" fill="#dee2e6" stroke="#868e96" stroke-width="1.5"/><path d="M'+cx+' '+(ly+16)+'L'+(cx+6)+' '+(ly+10)+'" stroke="#343a40" stroke-width="2" stroke-linecap="round"/>'}
  else if(m.t==='rel'){h+='<rect x="'+(cx-8)+'" y="'+(ly+4)+'" width="16" height="24" rx="3" fill="#2B3036"/><rect x="'+(cx-5)+'" y="'+(ly+7)+'" width="10" height="8" rx="1" fill="#fff" opacity=".3"/>'}
  else if(m.t==='cont'){h+='<rect x="'+(x+8)+'" y="'+(ly+2)+'" width="'+(w-16)+'" height="30" rx="3" fill="#2b3036"/><circle cx="'+cx+'" cy="'+(ly+17)+'" r="5" fill="#40C057"/>'}
  else{
    var pw=Math.min(15,w/n-6);
    h+='<rect x="'+(x+4)+'" y="'+ly+'" width="'+(w-8)+'" height="'+lh+'" rx="3" fill="#cfd4d9"/>';
    var lv=m.t==='main'||m.t==='isol'?'#C92A2A':'#2B3036';
    var nl=w<=PNM?1:n,lx=function(k){return nl===1?cx:tx(k)};if(nl===1)pw=14;
    for(i=0;i<nl;i++){h+='<rect x="'+(lx(i)-pw/2)+'" y="'+(ly+3)+'" width="'+pw+'" height="20" rx="2.5" fill="'+lv+'"/><rect x="'+(lx(i)-pw/2+2)+'" y="'+(ly+5)+'" width="'+(pw-4)+'" height="4" rx="1" fill="#fff" opacity=".22"/>'}
    if(nl>1)h+='<rect x="'+(tx(0)-2)+'" y="'+(ly+10)+'" width="'+(tx(n-1)-tx(0)+4)+'" height="4" fill="'+lv+'" opacity=".85"/>';
    if(m.t==='rcd'||m.t==='rcbo')h+='<circle cx="'+(x+w-11)+'" cy="'+(ly+lh-8)+'" r="5.5" fill="#F2C200" stroke="#9b7a00"/><text x="'+(x+w-11)+'" y="'+(ly+lh-5)+'" text-anchor="middle" font-family="Arial" font-size="7.5" font-weight="700" fill="#333">T</text>'
  }
  h+='<text x="'+cx+'" y="'+(y+PNDH-34)+'" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="10" fill="#495057">Q'+it.q+'</text>';
  if(m.ref)h+='<text x="'+cx+'" y="'+(y+PNDH-46)+'" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="'+(w>40?9:7)+'" fill="#1F4FD8">'+esc(m.ref.b.split(' ')[0].toUpperCase().slice(0,w>40?12:7))+'</text>';
  else if(m.t!=='gap'&&m.p)h+='<text x="'+cx+'" y="'+(y+PNDH-46)+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="#868e96">'+esc(m.p)+(m.ph&&P.sys==='3'&&/^(1P|1P\+N|2P)$/.test(m.p)?' '+esc(m.ph):'')+'</text>';
  if(sel)h+='<rect x="'+(x-2)+'" y="'+(y-4)+'" width="'+(w+4)+'" height="'+(PNDH+8)+'" rx="6" fill="none" stroke="#2F6BFF" stroke-width="3"/>';
  return h+'</g>'}
function pnSVG(P,opt){
  opt=opt||{};var L=pnLayout(P),R=L.rows.length,SD=24,PAD=14,EL=60,ET=88;
  var X=EL+PAD+SD+14,W=L.W,EW=PAD+SD+14+W+14+SD+PAD,EH=PAD+R*PNRH+PND+70,SW=EL*2+EW,SH=ET+EH+90;
  var lang=opt.lang||settings.ui,t4=function(o){return TL(o,lang)};
  var h='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+SW+' '+SH+'" width="'+(opt.px?SW:'100%')+'"'+(opt.px?' height="'+SH+'"':'')+' style="display:block">'+
   '<defs><linearGradient id="pnBody" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fbfcfd"/><stop offset=".55" stop-color="#eef0f2"/><stop offset="1" stop-color="#d9dde1"/></linearGradient>'+
   '<linearGradient id="pnBodyG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e9ecef"/><stop offset="1" stop-color="#c3c9cf"/></linearGradient>'+
   '<radialGradient id="pnScr" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#c3c8ce"/><stop offset="1" stop-color="#8d949c"/></radialGradient>'+
   '<linearGradient id="pnRail" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#eef1f4"/><stop offset=".5" stop-color="#b4bbc3"/><stop offset="1" stop-color="#dfe3e7"/></linearGradient>'+
   '<linearGradient id="pnEnc" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3a4047"/><stop offset="1" stop-color="#23272c"/></linearGradient>'+
   '<linearGradient id="pnDuct" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#cfd3d8"/><stop offset="1" stop-color="#aeb4bb"/></linearGradient>'+
   '<linearGradient id="pnTube" x1="0" x2="1"><stop offset="0" stop-color="#9aa1a8"/><stop offset=".45" stop-color="#e6e9ec"/><stop offset="1" stop-color="#8b9299"/></linearGradient>'+
   '<pattern id="pnSlot" width="12" height="26" patternUnits="userSpaceOnUse"><rect width="12" height="26" fill="url(#pnDuct)"/><rect x="4" y="3" width="4" height="20" rx="1" fill="#8d949b" opacity=".55"/></pattern>'+
   '<pattern id="pnSlotV" width="24" height="12" patternUnits="userSpaceOnUse"><rect width="24" height="12" fill="#b9bfc5"/><rect x="3" y="4" width="18" height="4" rx="1" fill="#8d949b" opacity=".55"/></pattern>'+
   '<pattern id="pnRib" width="24" height="9" patternUnits="userSpaceOnUse"><rect width="24" height="9" fill="url(#pnTube)"/><rect y="6" width="24" height="3" fill="#7d848b" opacity=".45"/></pattern></defs>'+
   '<rect width="'+SW+'" height="'+SH+'" fill="#ffffff"/>';
  var EX=EL,EY=ET,sdL=EX+PAD,sdR=EX+EW-PAD-SD,top0=EY+PAD,botD=top0+R*PNRH;
  // didascalie
  h+='<text x="'+(sdL+SD/2)+'" y="24" text-anchor="start" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="#212529">'+esc(t4(PN.feed))+'</text>';
  // tubo di ingresso (sopra) e uscite (sotto)
  var tubes='';function tube(x,y1,y2){return '<rect x="'+(x-15)+'" y="'+y1+'" width="30" height="'+(y2-y1)+'" fill="url(#pnRib)" stroke="#7d848b" stroke-width=".8"/>'}
  // cassetta
  h+='<rect x="'+(EX+4)+'" y="'+(EY+6)+'" width="'+EW+'" height="'+EH+'" rx="16" fill="#000" opacity=".25"/><rect x="'+EX+'" y="'+EY+'" width="'+EW+'" height="'+EH+'" rx="16" fill="url(#pnEnc)" stroke="#15181b" stroke-width="2"/>'+
   '<rect x="'+(EX+8)+'" y="'+(EY+8)+'" width="'+(EW-16)+'" height="'+(EH-16)+'" rx="10" fill="#30363c"/>';
  // canaline orizzontali + verticali
  for(var r=0;r<=R;r++){var dy=top0+r*PNRH;h+='<rect x="'+sdL+'" y="'+dy+'" width="'+(sdR+SD-sdL)+'" height="'+PND+'" rx="3" fill="url(#pnSlot)" stroke="#8f969d" stroke-width=".8"/>'}
  h+='<rect x="'+sdL+'" y="'+top0+'" width="'+SD+'" height="'+(botD+PND-top0)+'" rx="3" fill="url(#pnSlotV)" stroke="#8f969d" stroke-width=".8"/><rect x="'+sdR+'" y="'+top0+'" width="'+SD+'" height="'+(botD+PND-top0)+'" rx="3" fill="url(#pnSlotV)" stroke="#8f969d" stroke-width=".8"/>';
  // binari DIN
  L.rows.forEach(function(row,r){var dy=top0+r*PNRH+PND+PNSP;h+='<rect x="'+(X-10)+'" y="'+(dy+PNDH/2-17)+'" width="'+(W+20)+'" height="34" rx="2" fill="url(#pnRail)" stroke="#8c939a" stroke-width=".8"/>';
    for(var sx=X;sx<X+W;sx+=28)h+='<rect x="'+(sx+6)+'" y="'+(dy+PNDH/2-4)+'" width="14" height="8" rx="4" fill="#7c838a" opacity=".6"/>'});
  // cavi (sotto ai moduli? no: sopra, come nella realtà i cavi entrano nei morsetti)
  var wires='';
  L.items.forEach(function(it){
    var m=it.m;if(m.t==='gap')return;
    var dy=top0+it.r*PNRH+PND+PNSP,cs=pnCond(m,P.sys),n=cs.length,ty=dy+14,by=dy+PNDH-14,dTop=dy-PNSP,dBot=dy+PNDH+PNSP;
    var tx=function(k){return X+it.x+(k+0.5)*it.w/n};
    // ingresso
    if(it.head===undefined){cs.forEach(function(c,k){wires+=pnWire('M'+tx(k)+' '+dTop+'V'+(ty-8),pnCol(P,c))+pnFer(tx(k),ty-17)})}
    // uscita
    if(m.t==='spd'){wires+=pnWire('M'+(X+it.x+it.w/2)+' '+(by+8)+'V'+dBot,pnCol(P,'PE'),1)}
    else cs.forEach(function(c,k){wires+=pnWire('M'+tx(k)+' '+(by+8)+'V'+dBot,pnCol(P,c))+pnFer(tx(k),by+8)});
  });
  // pettini di collegamento per ogni gruppo nella fila
  L.rows.forEach(function(row,r){
    var dy=top0+r*PNRH+PND+PNSP,ty=dy+14,segs=[],cur_=null;
    row.forEach(function(it){if(it.head===undefined){cur_=null;return}if(it.seg||!cur_){cur_={h:it.head,its:[]};segs.push(cur_)}cur_.its.push(it)});
    segs.forEach(function(sg){
      var order=['L','L1','L2','L3','N'],used=[];sg.its.forEach(function(it){pnCond(it.m,P.sys).forEach(function(c){if(used.indexOf(c)<0)used.push(c)})});
      used.sort(function(a,b){return order.indexOf(a)-order.indexOf(b)});
      var x0=X+sg.its[0].x;
      used.forEach(function(c,k){var by_=ty-20-k*6,fx=x0-5-k*4,last=fx,drops='';
        sg.its.forEach(function(it){var cs=pnCond(it.m,P.sys),n=cs.length;cs.forEach(function(cc,j){if(cc!==c)return;var xx=X+it.x+(j+0.5)*it.w/n;last=Math.max(last,xx);drops+=pnWire('M'+xx+' '+by_+'V'+(ty-8),pnCol(P,c))+pnFer(xx,ty-17)})});
        wires+=pnWire('M'+fx+' '+(dy-PNSP)+'V'+by_+'H'+last,pnCol(P,c))+drops});
    })});
  if(!opt.nw)h+=wires;
  var TP=pnTP(P,L,X,top0);
  (P.uw||[]).forEach(function(w){var a=TP[w.a],b=TP[w.b];if(!a||!b)return;var d=pnUwPath(a,w.pts,b),bad=a.c!==b.c,cc=w.c||a.c;
    h+='<g data-act="pnuw" data-v="'+w.id+'" style="cursor:pointer"><path d="'+d+'" stroke="#000" stroke-opacity="0" stroke-width="16" fill="none"/>'+pnWire(d,bad?'#C92A2A':pnCol(P,cc),cc==='PE')+(bad?'<path d="'+d+'" stroke="#fff" stroke-width="1.6" stroke-dasharray="4 4" fill="none"/>':'')+(opt.selW===w.id?'<path d="'+d+'" stroke="#2F6BFF" stroke-width="10" fill="none" opacity=".35"/>':'')+'</g>'});
  // moduli
  L.items.forEach(function(it){h+=pnDev(it,X,top0+it.r*PNRH+PND+PNSP,P,opt.sel===it.i)});
  L.rows.forEach(function(row,r){var ry=top0+r*PNRH+PND/2;h+='<circle cx="'+(X+2)+'" cy="'+ry+'" r="9" fill="#14213D" stroke="#fff" stroke-width="1.5"/><text x="'+(X+2)+'" y="'+(ry+4)+'" text-anchor="middle" font-family="Arial" font-weight="700" font-size="11" fill="#fff">'+(r+1)+'</text>'});
  if(opt.lbl)L.items.forEach(function(it){var m=it.m;if(!m.l||m.t==='gap')return;var dy=top0+it.r*PNRH+PND+PNSP,w=it.w,x=X+it.x,n=Math.max(3,Math.floor((w-6)/4.9)),t=m.l.length>n?m.l.slice(0,n-1)+'…':m.l;
    h+='<rect x="'+(x+2)+'" y="'+(dy+PNDH+6)+'" width="'+(w-4)+'" height="15" rx="3" fill="#fffbe6" stroke="#c9a227" stroke-width=".8"/><text x="'+(x+w/2)+'" y="'+(dy+PNDH+16.5)+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="8.5" font-weight="700" fill="#212529">'+esc(t)+'</text>'});
  if(opt.wt){var dr=opt.wd;
    if(dr&&TP[dr.a]){var a2=TP[dr.a],d2='M'+a2.x+' '+a2.y;(dr.pts||[]).forEach(function(q){d2+='V'+q[1]+'H'+q[0]});h+='<path d="'+d2+'" stroke="#E8590C" stroke-width="4" stroke-dasharray="8 6" fill="none"/>';(dr.pts||[]).forEach(function(q){h+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="5" fill="#E8590C"/>'})}
    Object.keys(TP).forEach(function(k){var t=TP[k];h+='<g data-act="pnterm" data-v="'+k+'" style="cursor:crosshair"><circle cx="'+t.x+'" cy="'+t.y+'" r="9" fill="'+(dr&&dr.a===k?'#E8590C':'#fff')+'" fill-opacity=".9" stroke="'+pnCol(P,t.c)+'" stroke-width="3"/></g>'})}
  // barra di terra e tubi
  var pbY=botD+PND+22,pbX=X+W/2-110;
  for(var k2=0;k2<6;k2++){var px=pbX+20+k2*36;h+=pnWire('M'+px+' '+(botD+PND)+'V'+(pbY+4),pnCol(P,'PE'),1)}
  h+='<rect x="'+pbX+'" y="'+pbY+'" width="220" height="16" rx="3" fill="#C9A227" stroke="#8a6d10"/>';
  for(k2=0;k2<6;k2++)h+=pnScrew(pbX+20+k2*36,pbY+8);
  h+='<text x="'+(pbX+230)+'" y="'+(pbY+13)+'" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#e9ecef">PE · '+esc(t4(PN.earth))+'</text>';
  h+=tube(sdL+SD/2,30,EY+PAD+4);
  var by2=EY+EH-4;h+=tube(sdL+SD/2,by2,SH-40)+tube(sdR+SD/2,by2,SH-40);
  h+='<text x="'+(EX+EW/2)+'" y="'+(SH-14)+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="#212529">'+esc(t4(PN.out))+'</text>';
  if(P.name)h+='<text x="'+(EX+EW-20)+'" y="24" text-anchor="end" font-family="Arial,sans-serif" font-size="15" font-weight="800" fill="#2F6BFF">'+esc(P.name)+'</text>';
  return h+'</svg>'}
// ---------- pagina ----------
function pnName(m,lang){return m.l||pnL(PN.types[m.t])}
function pnSpec(m){if(m.t==='gap'||m.t==='term')return '';var a=[];if(m.ref)a.push(m.ref.b+' '+m.ref.r);if(m.p)a.push(m.p);
  if(m.t==='mcb'||m.t==='main'||m.t==='rcbo')a.push((m.cv||'C')+(m.A||16));if(m.t==='rcd'||m.t==='isol'||m.t==='fuse')a.push((m.A||40)+'A');if(m.t==='cont')a.push((m.A||25)+'A');
  if(m.t==='rcd'||m.t==='rcbo')a.push((m.mA||30)+'mA '+(m.rt||'A'));if(m.ph&&/^(1P|1P\+N|2P)$/.test(m.p))a.push(m.ph);return a.join(' · ')}
var PNAMP={rcd:[25,40,63,80],isol:[32,40,63,80,100],fuse:[2,4,6,10,16,20,25,32],cont:[16,20,25,40,63],main:[16,20,25,32,40,50,63,80,100]};
function pnDefA(t){return {rcd:40,isol:40,main:32,cont:25,fuse:10,rel:16,tmr:16}[t]||16}
function pnNew(t,sys){var m={t:t,p:'',A:pnDefA(t),cv:'C',mA:30,rt:'A',l:(t==='mcb'||t==='rcbo'||t==='gap')?'':pnL(PN.types[t])};return pnFix(m,sys)}
function pnPolesOk(t,tri){var m={t:t,p:'?'};var r=[];['1P','1P+N','2P','3P','4P'].forEach(function(pp){m.p=pp;pnFix(m,tri?'3':'1');if(m.p===pp)r.push(pp)});return r}
// scelta di un pezzo reale dalla guida tecnica (stesso paese, compatibile con il sistema)
var PNCAT={mcb:'mcb',rccb:'rcd',contactor:'cont'};
function pnRealList(P){var T_=window.LM_TECH;if(!T_)return [];var ix=T_.cc[packId()]||T_.cc.IT||[];
  return ix.map(function(i){return T_.items[i]}).filter(function(x){return PNCAT[x.c]&&!(P.sys!=='3'&&/^(3P|4P)$/.test(x.p||''))})}
function pnApplyReal(m,x,P){m.t=PNCAT[x.c];m.p=x.p||m.p;if(x.A!=null)m.A=x.A;if(x.cv)m.cv=x.cv;if(x.mA)m.mA=x.mA;if(x.rt)m.rt=/^(AC|A|F|B)$/.test(x.rt)?x.rt:m.rt;
  m.ref={i:x.i,b:x.b,r:x.r};if(x.w)m.wm=x.w;else delete m.wm;if(!m.l&&m.t!=='mcb')m.l=pnL(PN.types[m.t]);
  var n=x.n||{};m.ref.n={it:n.it,ar:n.ar,fr:n.fr,en:n.en};pnFix(m,P.sys);if(m.p!==(x.p||m.p)){m.p=x.p}}
function pnRealSheet(P,onPick){
  var L=pnRealList(P),f={c:'',A:''};
  function draw(){var res=L.filter(function(x){return (!f.c||PNCAT[x.c]===f.c)&&(!f.A||String(x.A)===f.A)});
    var amps={};L.filter(function(x){return !f.c||PNCAT[x.c]===f.c}).forEach(function(x){if(x.A!=null)amps[x.A]=1});
    var h='<h2>'+esc(pnL(PN.real))+'</h2><div class="mini" style="margin-bottom:6px">'+esc(pnL(PN.realS))+'</div>';
    if(!L.length){openSheet(h+'<div class="empty">'+esc(pnL(PN.noReal))+'</div>');return}
    h+=pnChips('c',[['',pnL(TG.all)],['mcb',pnL(PN.types.mcb)],['rcd',pnL(PN.types.rcd)],['cont',pnL(PN.types.cont)]].filter(function(o){return !o[0]||L.some(function(x){return PNCAT[x.c]===o[0]})}),f.c,pnL(PN.type))+
      pnChips('A',[['',pnL(TG.all)]].concat(Object.keys(amps).map(Number).sort(function(a,b){return a-b}).map(function(a){return [String(a),a+' A']})),f.A,pnL(PN.amp))+
      '<div class="mini" style="margin:8px 2px"><b>'+res.length+'</b></div>'+
      res.map(function(x){return '<button class="pnrow" data-rp="'+esc(x.i)+'"><b style="font-size:12px">'+esc(x.b.split(' ')[0])+'</b><span dir="ltr" style="text-align:start">'+esc(x.r)+'</span><i dir="ltr">'+esc([x.p,x.cv?x.cv+x.A:(x.A!=null?x.A+'A':''),x.mA?x.mA+'mA '+(x.rt||''):''].filter(Boolean).join(' · '))+'</i></button>'}).join('');
    openSheet(h);
    sheet.querySelectorAll('[data-pk]').forEach(function(b){b.onclick=function(){f[b.dataset.pk]=b.dataset.pv;if(b.dataset.pk==='c')f.A='';draw()}});
    sheet.querySelectorAll('[data-rp]').forEach(function(b){b.onclick=function(){var x=null;L.forEach(function(y){if(y.i===b.dataset.rp)x=y});if(x)onPick(x)}})}
  draw()}
function renderPanel(){
  var P=pnl(),hd='<button class="back" data-act="back">'+(settings.ui==='ar'?'→ ':'← ')+T('allCats')+'</button><div class="sec">'+icH('⚡')+' '+esc(pnL(PN.t))+'</div>';
  if(!P||!(P.mods||[]).length) return hd+'<div class="pnempty"><div class="big">⚡</div><p>'+esc(pnL(PN.empty))+'</p><button class="btn main" data-act="pngen">'+esc(pnL(PN.start))+'</button><button class="btn ghost" data-act="pnadd" style="width:100%;margin-top:8px">'+esc(pnL(PN.manual))+'</button>'+
   '<div class="mini" style="margin:14px 0 8px">'+esc(pnL(PN.tpl))+'</div><div class="chips" style="justify-content:center">'+PTPL.map(function(t,i){return '<button class="chip" data-act="pntpl" data-v="'+i+'">'+esc(pnL(t[1]))+'</button>'}).join('')+'</div></div>';
  var L=pnLayout(P),rows=L.items.filter(function(it){return it.m.t!=='gap'}).map(function(it){var m=it.m;
    return '<button class="pnrow" data-act="pnle" data-v="'+it.i+'"><b>Q'+it.q+'</b><span dir="auto">'+esc(pnName(m))+'</span><i dir="ltr">'+esc(pnSpec(m))+(m.s?' · '+esc(m.s)+' mm²':'')+(pnSecLow(m)?' ⚠️':'')+'</i></button>'}).join('');
  return hd+'<div class="chips pnact"><button class="chip" data-act="pngen">'+esc(pnL(PN.gen))+'</button><button class="chip" data-act="pnadd">'+esc(pnL(PN.add))+'</button><button class="chip" data-act="pnset">'+esc(pnL(PN.set))+'</button><button class="chip" data-act="pnzoom">'+esc(pnL(PN.zoom))+'</button></div>'+
   '<div class="pnwrap"><div class="pnin'+(view.pZoom?' z':'')+'">'+pnSVG(P,{sel:view.pSel})+'</div></div>'+
   '<div class="mini" style="margin:6px 4px 12px">👆 '+esc(pnL(PN.hint))+'</div>'+
   '<div class="pngo"><button class="btn ghost" data-act="pnpdf">'+esc(pnL(PN.pdf))+'</button><button class="btn ghost" data-act="pnwa">'+esc(pnL(PN.wa))+'</button></div>'+
   '<button class="btn main" data-act="pnord" style="margin-top:8px">'+esc(pnL(PN.ord))+'</button>'+
   '<div class="h2" style="margin-top:18px"><b>'+esc(pnL(PN.legend))+'</b></div><div class="pnlist">'+rows+'</div>'+
   '<div class="mini" style="margin:10px 4px">ⓘ '+esc(pnL(PN.note))+'</div>'}
function pnSave(){save();render()}
// terminali (ingresso ↑ / uscita ↓ per ogni polo) nelle coordinate del disegno
function pnTP(P,L,X,top0){var TP={};L.items.forEach(function(it){var cs=pnCond(it.m,P.sys),n=cs.length;if(!n)return;var dy=top0+it.r*PNRH+PND+PNSP;
  cs.forEach(function(c,k){var x=X+it.x+(k+0.5)*it.w/n;TP[it.m.id+'|i|'+k]={x:x,y:dy+14,c:c,q:it.q,s:'↑'};TP[it.m.id+'|o|'+k]={x:x,y:dy+PNDH-14,c:c,q:it.q,s:'↓'}})});return TP}
function pnUwPath(a,pts,b){var d='M'+a.x+' '+a.y;if(!pts||!pts.length)return d+'V'+Math.round((a.y+b.y)/2+(a.y===b.y?(a.s==='↑'?-24:24):0))+'H'+b.x+'V'+b.y;pts.forEach(function(q){d+='V'+q[1]+'H'+q[0]});return d+'H'+b.x+'V'+b.y}
function pnTI(P,key){var k=String(key).split('|'),m=(P.mods||[]).find(function(x){return x.id===k[0]});if(!m)return null;var c=pnCond(m,P.sys)[+k[2]];if(!c)return null;return {m:m,c:c,lab:(m.t==='term'?'X':'Q')+m.n+' '+(k[1]==='i'?'↑':'↓')+c}}
function pnUwSheet(id){var P=pnl(),w=(P.uw||[]).find(function(x){return x.id===id});if(!w)return;stS().selW=id;render();
  function draw(){var a=pnTI(P,w.a),b=pnTI(P,w.b),conds=pnPh(P.sys).concat(['N','PE']);
    openSheet('<h2>〰 '+esc(a?a.lab:'?')+' → '+esc(b?b.lab:'?')+'</h2>'+(a&&b&&a.c!==b.c?'<div class="stlvl" style="border-color:#C92A2A;color:#C92A2A">✕ '+esc(sL(STX.badC))+': '+a.c+' ↔ '+b.c+'</div>':'')+
     pnChips('c',conds,w.c||(a?a.c:''),sL(STX.wC))+pnChips('s',['1,5','2,5','4','6','10','16'].map(function(x){return [x,x+' mm²']}),w.s||'',sL(STX.wS))+
     '<div class="field"><label>'+esc(sL(STX.notes))+'</label><input id="uwN" dir="auto" value="'+esc(w.note||'')+'"></div>'+
     '<div class="pngo" style="margin-top:12px"><button class="btn ghost" id="uwB">↺ '+esc(sL(STX.noBend))+'</button><button class="btn ghost" id="uwX" style="color:var(--danger)">🗑 '+esc(sL(STX.del))+'</button></div><button class="btn main" id="pnOk" style="margin-top:8px">'+esc(sL(PN.ok))+'</button>');
    sheet._onclose=function(){stS().selW=null;render()};
    sheet.querySelectorAll('[data-pk]').forEach(function(x){x.onclick=function(){w[x.dataset.pk]=x.dataset.pv;save();render();draw()}});
    $('#uwN').oninput=function(){w.note=this.value;save()};
    $('#uwB').onclick=function(){w.pts=[];save();render();draw()};
    $('#uwX').onclick=function(){P.uw=P.uw.filter(function(x){return x.id!==id});sheet._onclose=null;stS().selW=null;save();closeSheet();render()};
    $('#pnOk').onclick=closeSheet}
  draw()}
var PNSEC=['1,5','2,5','4','6','10','16'];
function pnMinSec(A){return A<=10?'1,5':A<=20?'2,5':A<=25?'4':A<=32?'6':A<=40?'10':'16'}
function pnSecLow(m){return !!(m.s&&(m.t==='mcb'||m.t==='rcbo')&&PNSEC.indexOf(m.s)<PNSEC.indexOf(pnMinSec(m.A||16)))}
function pnChips(name,vals,curV,lab){return '<div class="tgrow"><span>'+esc(lab)+'</span><div class="chips">'+vals.map(function(v){var val=Array.isArray(v)?v[0]:v,tx=Array.isArray(v)?v[1]:v;return '<button class="chip'+(String(curV)===String(val)?' on':'')+'" data-pk="'+name+'" data-pv="'+esc(val)+'"><bdi>'+esc(tx)+'</bdi></button>'}).join('')+'</div></div>'}
function pnGenSheet(pre){
  var P=pnl(),o=pre||{sys:(P&&P.sys)||'1',A:32,prot:'2',spd:0,c:{}};if(!pre)PCT.forEach(function(c){o.c[c[0]]=c[4]});
  function draw(){
    openSheet('<h2>'+esc(pnL(PN.gen))+'</h2>'+pnChips('sys',[['1',pnL(PN.mono)],['3',pnL(PN.tri)]],o.sys,pnL(PN.sys))+
     pnChips('A',[16,20,25,32,40,50,63].map(function(a){return [a,'C'+a]}),o.A,pnL(PN.mainA))+
     '<div class="tgrow"><span>'+esc(pnL(PN.circ))+'</span>'+PCT.map(function(c){var n=o.c[c[0]]||0;return '<div class="pnct"><span dir="auto">'+esc(pnL(c[3]))+' <small dir="ltr">C'+c[1]+' · '+c[2]+' mm²</small></span><div class="pnq"><button data-pc="'+c[0]+'" data-d="-1">−</button><b>'+n+'</b><button data-pc="'+c[0]+'" data-d="1">+</button></div></div>'}).join('')+'</div>'+
     pnChips('prot',[['2',pnL(PN.p2)],['1',pnL(PN.p1)],['E',pnL(PN.pE)]],o.prot,pnL(PN.prot))+
     pnChips('spd',[[1,'✓'],[0,'✕']],o.spd?1:0,pnL(PN.spd))+
     '<button class="btn main" id="pnGo">'+esc(pnL(PN.make))+'</button>');
    sheet.querySelectorAll('[data-pk]').forEach(function(b){b.onclick=function(){var k=b.dataset.pk,v=b.dataset.pv;o[k]=k==='A'||k==='spd'?+v:v;var st=sheet.scrollTop;draw();sheet.scrollTop=st}});
    sheet.querySelectorAll('[data-pc]').forEach(function(b){b.onclick=function(){var k=b.dataset.pc;o.c[k]=Math.max(0,Math.min(12,(o.c[k]||0)+(+b.dataset.d)));var st=sheet.scrollTop;draw();sheet.scrollTop=st}});
    $('#pnGo').onclick=function(){var tot=0;for(var k in o.c)tot+=o.c[k];if(!tot){toast('⚠️ '+pnL(PN.circ));return}
      if(pnl()&&(pnl().mods||[]).length&&!confirm(pnL(PN.sure)))return;
      var nP=pnGen(o);if(P&&P.name)nP.name=P.name;cur().panel=nP;view.pSel=null;closeSheet();pnSave();window.scrollTo(0,0)}}
  draw()}
function pnEdit(i){
  var P=pnl();if(!P)return;var m=P.mods[+i];if(!m)return;view.pSel=+i;render();
  function upd(){pnFix(m,P.sys);save();render()}
  function draw(){
    var tri=P.sys==='3',polesBy=pnPolesOk(m.t,tri),hasA=!/^(spd|gap|term|crep|lamp|sock|trf|meter|rel|tmr)$/.test(m.t);
    var h='<h2>'+(m.n?'Q'+m.n:'')+(m.lock?' 🔒':'')+' · '+esc(pnL(PN.types[m.t]))+'</h2>'+
     (m.ref?'<div class="pnref"><b dir="ltr">'+esc(m.ref.b+' · '+m.ref.r)+'</b><button class="chip" id="pnUnref">✕</button></div>':'')+
     (PNCAT_R[m.t]?'<button class="btn ghost" id="pnReal" style="width:100%;margin:4px 0 6px">'+esc(pnL(PN.real))+'</button>':'')+
     pnChips('t',PNTALL.map(function(k){return [k,pnL(PN.types[k])]}),m.t,pnL(PN.type));
    if(m.t!=='gap'&&m.t!=='term'){
      h+='<div class="field"><label>'+esc(pnL(PN.lbl))+'</label><input id="pnLbl" dir="auto" value="'+esc(m.l||'')+'" maxlength="40"></div>';
      if(m.t==='mcb'||m.t==='rcbo')h+='<div class="chips" style="margin-top:6px">'+PCT.map(function(c){return '<button class="chip" data-pq="'+c[0]+'">'+esc(pnL(c[3]))+'</button>'}).join('')+'</div>';
      if(hasA){var noC=!(m.t==='mcb'||m.t==='main'||m.t==='rcbo');h+=pnChips('A',(PNAMP[m.t]||[6,10,13,16,20,25,32,40,50,63]).map(function(a){return [a,(noC?'':(m.cv||'C'))+a+(noC?'A':'')]}),m.A||'',pnL(PN.amp))}
      if(m.t==='mcb'||m.t==='main'||m.t==='rcbo')h+=pnChips('cv',['B','C','D'],m.cv||'C',pnL(PN.curve));
      if(polesBy.length>1)h+=pnChips('p',polesBy,m.p,pnL(PN.poles));
      if(tri&&/^(1P|1P\+N|2P)$/.test(m.p))h+=pnChips('ph',['L1','L2','L3'],m.ph||'L1',pnL(PN.ph));
      if(m.t==='rcd'||m.t==='rcbo'){h+=pnChips('mA',[[10,'10mA'],[30,'30mA'],[300,'300mA']],m.mA||30,pnL(PN.sens))+pnChips('rt',['AC','A','F','B'],m.rt||'A',pnL(PN.rt))}
      if(m.t==='mcb'||m.t==='rcbo')h+=pnChips('s',['1,5','2,5','4','6','10','16'].map(function(s){return [s,s+' mm²']}),m.s||'',pnL(PN.sec));
    }
    h+='<button class="btn ghost" id="pnLk" style="width:100%;margin-top:12px">'+(m.lock?'🔓 ':'🔒 ')+esc(pnL(STX.lock))+'</button>';
    h+='<div class="pngo" style="margin-top:8px"><button class="btn ghost" id="pnL">'+esc(pnL(PN.left))+'</button><button class="btn ghost" id="pnR">'+esc(pnL(PN.right))+'</button></div>'+
     '<div class="pngo" style="margin-top:8px"><button class="btn ghost" id="pnD">'+esc(pnL(PN.dup))+'</button><button class="btn ghost" id="pnX" style="color:var(--danger)">'+esc(pnL(PN.del))+'</button></div>'+
     '<button class="btn main" id="pnOk" style="margin-top:8px">'+esc(pnL(PN.ok))+'</button>';
    openSheet(h);sheet._onclose=function(){view.pSel=null;render()};
    sheet.querySelectorAll('[data-pk]').forEach(function(b){b.onclick=function(){var k=b.dataset.pk,v=b.dataset.pv;
      if(k==='t'){var was=m.t;if(v===was)return;m.t=v;delete m.ref;delete m.wm;if(PNAMP[v]&&PNAMP[v].indexOf(m.A)<0)m.A=pnDefA(v);if(!(v==='mcb'||v==='rcbo'||v==='main'))m.cv=m.cv||'C';m.mA=m.mA||30;m.rt=m.rt||'A';
        if(v==='gap'||v==='term')m.l='';else if(!m.l||m.l===pnL(PN.types[was]))m.l=(v==='mcb'||v==='rcbo')?'':pnL(PN.types[v])}
      else {m[k]=(k==='A'||k==='mA')?+v:v;if(m.ref&&k!=='s'&&k!=='ph'){delete m.ref;delete m.wm}}
      if(k==='A'&&pnSecLow(m)){m.s=pnMinSec(m.A);toast('⚠️ '+pnL(PN.sec)+' → '+m.s+' mm²')}
      upd();var st=sheet.scrollTop;draw();sheet.scrollTop=st}});
    sheet.querySelectorAll('[data-pq]').forEach(function(b){b.onclick=function(){var c=PCTBY[b.dataset.pq];m.l=pnL(c[3]);m.A=c[1];m.s=c[2];m.k=c[0];upd();var st=sheet.scrollTop;draw();sheet.scrollTop=st}});
    var rb=$('#pnReal');if(rb)rb.onclick=function(){pnRealSheet(P,function(x){pnApplyReal(m,x,P);save();render();draw()})};
    var ub=$('#pnUnref');if(ub)ub.onclick=function(){delete m.ref;delete m.wm;upd();draw()};
    var li=$('#pnLbl');if(li)li.oninput=function(){m.l=li.value;save();var sv=document.querySelector('.pnin');if(sv)sv.innerHTML=pnSVG(P,{sel:view.pSel})};
    $('#pnLk').onclick=function(){m.lock=!m.lock;save();render();draw()};
    function mv(d){if(m.lock){toast(pnL(STX.locked));return}var j=+i+d;if(j<0||j>=P.mods.length)return;P.mods.splice(+i,1);P.mods.splice(j,0,m);i=j;view.pSel=j;upd();draw()}
    $('#pnL').onclick=function(){mv(settings.ui==='ar'?1:-1)};$('#pnR').onclick=function(){mv(settings.ui==='ar'?-1:1)};
    $('#pnD').onclick=function(){var c=JSON.parse(JSON.stringify(m));delete c.id;delete c.n;delete c.lock;P.mods.splice(+i+1,0,c);i=+i+1;m=c;view.pSel=i;upd();draw()};
    $('#pnX').onclick=function(){if(m.lock){toast(pnL(STX.locked));return}P.mods.splice(+i,1);view.pSel=null;sheet._onclose=null;closeSheet();pnSave()};
    $('#pnOk').onclick=closeSheet}
  draw()}
var PNCAT_R={mcb:1,rcd:1,cont:1,main:1};
function pnAdd(){
  function P0(){var P=pnl();if(!P){P=cur().panel={v:1,sys:'1',row:12,lc:packId()==='IT'?'br':'rd',name:'',mods:[]}}return P}
  function put(m){var P=P0();var at=view.pSel!=null&&view.pSel<P.mods.length?view.pSel+1:P.mods.length;P.mods.splice(at,0,m);save();closeSheet();pnEdit(at)}
  openSheet('<h2>'+esc(pnL(PN.add))+'</h2>'+(window.LM_TECH?'<button class="btn main" id="pnAR" style="margin-bottom:10px">'+esc(pnL(PN.real))+'</button>':'')+
   PNG3.map(function(g,gi){return '<div class="h2" style="margin:10px 2px 6px"><b>'+esc(pnL(PN.grp[gi]))+'</b></div><div class="pnadd">'+g.map(function(k){return '<button class="btn ghost" data-pa="'+k+'">'+esc(pnL(PN.types[k]))+'</button>'}).join('')+'</div>'}).join(''));
  sheet.querySelectorAll('[data-pa]').forEach(function(b){b.onclick=function(){put(pnNew(b.dataset.pa,P0().sys))}});
  var ar=$('#pnAR');if(ar)ar.onclick=function(){var P=P0();SHEET_BACK=pnAdd;pnRealSheet(P,function(x){var m=pnNew(PNCAT[x.c],P.sys);pnApplyReal(m,x,P);put(m)})}}
function pnSet(){var P=pnl();if(!P)return;
  function draw(){openSheet('<h2>'+esc(pnL(PN.set))+'</h2><div class="field"><label>'+esc(pnL(PN.name))+'</label><input id="pnNm" dir="auto" maxlength="40" value="'+esc(P.name||'')+'"></div>'+
    pnChips('sys',[['1',pnL(PN.mono)],['3',pnL(PN.tri)]],P.sys,pnL(PN.sys))+pnChips('row',[12,18,24],P.row||12,pnL(PN.row))+
    (P.sys==='3'?'':pnChips('lc',[['br','🟤'],['rd','🔴'],['bk','⚫']],P.lc||'br',pnL(PN.lc)))+
    '<button class="btn ghost" id="pnClr" style="width:100%;margin-top:14px;color:var(--danger)">'+esc(pnL(PN.clr))+'</button><button class="btn main" id="pnOk" style="margin-top:8px">'+esc(pnL(PN.ok))+'</button>');
    sheet.querySelectorAll('[data-pk]').forEach(function(b){b.onclick=function(){var k=b.dataset.pk,v=b.dataset.pv;P[k]=k==='row'?+v:v;if(k==='sys')P.mods.forEach(function(m){if(/^(main|isol|rcd|spd|cont)$/.test(m.t))m.p=v==='3'?'4P':'2P';if(m.t==='meter'&&v==='3')m.p='4P';if(m.ref&&v!=='3'&&/^(3P|4P)$/.test(m.p)){delete m.ref;delete m.wm}pnFix(m,v)});save();render();draw()}});
    $('#pnNm').oninput=function(){P.name=$('#pnNm').value;save()};
    $('#pnClr').onclick=function(){if(!confirm(pnL(PN.sure)))return;cur().panel=null;closeSheet();pnSave()};
    $('#pnOk').onclick=function(){closeSheet();render()}}
  draw()}
// materiali per la richiesta
function pnMat(P){
  var by={},ord=[],nm={ar:'',it:'',en:'',fr:''};
  function add(k,n4,q,u,st){if(!by[k]){by[k]={k:k,n:n4,q:0,u:u||'pz',s:st||'ok'};ord.push(k)}by[k].q=Math.round((by[k].q+q)*100)/100}
  P.mods.forEach(function(m){var sp=m.p+' ',a=m.A||16,tri=P.sys==='3';
    if(m.ref){var rn=m.ref.n||{},bb=function(t){t=t||(m.ref.b+' '+m.ref.r);return t.indexOf(m.ref.b)===0?t:m.ref.b+' '+t};add('ref'+m.ref.i,{it:bb(rn.it),ar:bb(rn.ar||rn.it),en:bb(rn.en||rn.it),fr:bb(rn.fr||rn.it)},1);return}
    if(m.t==='isol')add('isol'+m.p+a,{it:'Sezionatore modulare '+sp+a+'A',ar:'مفصل رئيسي (Sezionatore) '+sp+a+'A',en:'Modular isolator switch '+sp+a+'A',fr:'Interrupteur-sectionneur '+sp+a+'A'},1);
    else if(m.t==='fuse')add('fuse'+m.p+a,{it:'Portafusibile sezionabile '+sp+'10x38 + fusibili gG '+a+'A',ar:'حامل فيوز '+sp+'10x38 + فيوزات gG '+a+'A',en:'Fuse holder '+sp+'10x38 + gG fuses '+a+'A',fr:'Porte-fusible sectionneur '+sp+'10x38 + fusibles gG '+a+'A'},1);
    else if(m.t==='rel')add('rel',{it:'Relè passo-passo modulare 16A',ar:'ريليه خطوة بخطوة (Passo-passo) 16A',en:'Modular impulse relay 16A',fr:'Télérupteur modulaire 16A'},1);
    else if(m.t==='tmr')add('tmr',{it:'Temporizzatore luce scale modulare',ar:'مؤقت إنارة الدرج (موديولي)',en:'Modular staircase timer',fr:'Minuterie d’escalier modulaire'},1);
    else if(m.t==='crep')add('crep',{it:'Interruttore crepuscolare modulare con sonda',ar:'مفتاح ضوئي (Crepuscolare) مع حساس',en:'Modular twilight switch with sensor',fr:'Interrupteur crépusculaire modulaire avec sonde'},1);
    else if(m.t==='meter')add('meter'+m.p,m.p==='4P'?{it:'Contatore di energia trifase MID',ar:'عداد طاقة ثلاثي الطور MID',en:'Three-phase energy meter MID',fr:'Compteur d’énergie triphasé MID'}:{it:'Contatore di energia monofase MID',ar:'عداد طاقة أحادي الطور MID',en:'Single-phase energy meter MID',fr:'Compteur d’énergie monophasé MID'},1);
    else if(m.t==='lamp')add('lamp',{it:'Lampada spia modulare 230V',ar:'لمبة إشارة 230V للوحة',en:'Modular pilot lamp 230V',fr:'Voyant lumineux modulaire 230V'},1);
    else if(m.t==='sock')add('sock',{it:'Presa modulare da quadro 2P+T 16A',ar:'مقبس داخل اللوحة 2P+T 16A',en:'DIN-rail socket 2P+E 16A',fr:'Prise modulaire 2P+T 16A'},1);
    else if(m.t==='trf')add('trf',{it:'Trasformatore modulare per campanello 230/12V',ar:'محول جرس 230/12V للوحة',en:'Modular bell transformer 230/12V',fr:'Transformateur de sonnerie modulaire 230/12V'},1);
    else if(m.t==='term')add('term',{it:'Morsettiera modulare da guida DIN',ar:'مجموعة موصلات على سكة DIN',en:'DIN-rail terminal block',fr:'Bornier modulaire sur rail DIN'},1);
    else if(m.t==='mcb'||m.t==='main')add('mcb'+m.p+m.cv+a,{it:'Interruttore magnetotermico '+sp+(m.cv||'C')+a,ar:'قاطع حراري مغناطيسي '+sp+(m.cv||'C')+a,en:'MCB '+sp+(m.cv||'C')+a,fr:'Disjoncteur '+sp+'courbe '+(m.cv||'C')+' '+a+'A'},1);
    else if(m.t==='rcd')add('rcd'+m.p+a+m.mA+m.rt,{it:'Interruttore differenziale puro '+sp+a+'A '+(m.mA||30)+'mA tipo '+(m.rt||'A'),ar:'قاطع تفاضلي '+sp+a+'A '+(m.mA||30)+'mA نوع '+(m.rt||'A'),en:'RCCB '+sp+a+'A '+(m.mA||30)+'mA type '+(m.rt||'A'),fr:'Interrupteur différentiel '+sp+a+'A '+(m.mA||30)+'mA type '+(m.rt||'A')},1);
    else if(m.t==='rcbo')add('rcbo'+m.p+m.cv+a+m.mA+m.rt,{it:'Magnetotermico differenziale '+sp+(m.cv||'C')+a+' '+(m.mA||30)+'mA tipo '+(m.rt||'A'),ar:'قاطع حراري تفاضلي '+sp+(m.cv||'C')+a+' '+(m.mA||30)+'mA نوع '+(m.rt||'A'),en:'RCBO '+sp+(m.cv||'C')+a+' '+(m.mA||30)+'mA type '+(m.rt||'A'),fr:'Disjoncteur différentiel '+sp+(m.cv||'C')+a+' '+(m.mA||30)+'mA type '+(m.rt||'A')},1);
    else if(m.t==='spd')add('spd'+m.p,{it:'Scaricatore di sovratensione SPD '+m.p,ar:'واقي الصواعق SPD '+m.p,en:'Surge protection device SPD '+m.p,fr:'Parafoudre '+m.p},1);
    else if(m.t==='cont')add('cont'+m.p+a,{it:'Contattore modulare '+sp+a+'A',ar:'كونتاكتور '+sp+a+'A',en:'Modular contactor '+sp+a+'A',fr:'Contacteur modulaire '+sp+a+'A'},1);
    else if(m.t==='gap')add('gap',{it:'Copriforo modulare',ar:'غطاء فراغ موديول',en:'Blanking module',fr:'Obturateur modulaire'},1)});
  var L=pnLayout(P),mods=L.rows.length*(P.row||12);
  add('enc',{it:'Centralino '+mods+' moduli',ar:'علبة لوحة '+mods+' موديول',en:'Consumer unit '+mods+' modules',fr:'Coffret '+mods+' modules'},1,'pz','est');
  var segs=0;L.items.forEach(function(it){if(it.seg)segs++});
  if(segs)add('comb',{it:'Pettine di collegamento',ar:'مشط توصيل (Pettine)',en:'Busbar comb',fr:'Peigne de raccordement'},segs,'pz','est');
  add('pe',{it:'Morsettiera di terra',ar:'قضيب توصيل الأرضي',en:'Earth terminal bar',fr:'Bornier de terre'},1,'pz','est');
  P.mods.forEach(function(m){if(!PNOUT[m.t]||m.t==='trf'||!(m.len>0)||!m.s)return;var nc=pnCond(m,P.sys).length+1;add('cab'+m.s,{it:'Cavo unipolare FS17 '+m.s+' mm²',ar:'سلك FS17 مقطع '+m.s+' مم²',en:'Single-core cable FS17 '+m.s+' mm²',fr:'Câble unipolaire FS17 '+m.s+' mm²'},m.len*nc,'m','calc')});
  return ord.map(function(k){return by[k]})}
function pnOrder(){var P=pnl();if(!P)return;pnMat(P).forEach(function(x){addLine({it:x.n.it,ar:x.n.ar,fr:x.n.fr,en:x.n.en,cat:'x',unit:x.u==='m'?'m':'pz',qty:x.q,note:''})});save();refreshCounts();toast('✓ '+pnL(PN.added))}
function pnText(P,lang){var t4=function(o){return TL(o,lang)},L=pnLayout(P);
  var t='⚡ '+t4(PN.t)+(P.name?' — '+P.name:'')+'\n'+(P.sys==='3'?t4(PN.tri):t4(PN.mono))+'\n\n';
  L.items.forEach(function(it){if(it.m.t==='gap')return;var m=it.m;t+='Q'+it.q+' · '+(m.l||t4(PN.types[m.t]))+' — '+pnSpec(m)+(m.s?' · '+m.s+' mm²':'')+'\n'});
  return t+'\n'+(settings.ditta?settings.ditta+'\n':'')+'SiteNeeds.net'}
function pnWa(){var P=pnl();if(!P)return;var lang=settings.out==='both'?settings.ui:settings.out,t=pnText(P,lang);if(A&&A.whatsapp)A.whatsapp(t,'');else openUrl('https://wa.me/?text='+encodeURIComponent(t))}
function pnDoc(P,lang){
  var rtl=lang==='ar',t4=function(o){return TL(o,lang)},L=pnLayout(P),s=cur().site||{};
  var svg=pnSVG(P,{px:1,lang:lang}),img='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(svg)));
  var d=new Date(),ds=('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear();
  var box=[[DL(lang,'client'),s.cliente||'—'],[t4(PN.sys),P.sys==='3'?t4(PN.tri):t4(PN.mono)],['📅',ds]];
  var rows=L.items.filter(function(it){return it.m.t!=='gap'}).map(function(it,n){var m=it.m;return '<div class="blk r'+(n%2?' alt':'')+'"><div class="n">Q'+it.q+'</div><div class="d"><b dir="auto">'+esc(m.l||t4(PN.types[m.t]))+'</b></div><div class="s" dir="ltr">'+esc(pnSpec(m))+'</div><div class="q" dir="ltr">'+(m.s?esc(m.s)+' mm²':'—')+'</div></div>'}).join('');
  return '<!doctype html><html dir="'+(rtl?'rtl':'ltr')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=794"><style>'+DOC_CSS+'.pimg{display:block;width:100%;height:auto;margin:6px 0 4px}.r{grid-template-columns:44px 1fr 170px 80px}.n{font-weight:800}</style></head><body>'+wmImg()+'<div class="wrap"><div class="pad"></div>'+
   docHead(lang,'⚡ '+esc(t4(PN.t))+(P.name?' — '+esc(P.name):''),box)+'<div class="blk"><img class="pimg" src="'+img+'" alt=""></div>'+
   '<div class="blk cat">'+esc(t4(PN.legend))+'</div>'+rows+'<div class="blk" style="font-size:11px;color:#646A80;margin-top:10px">ⓘ '+esc(t4(PN.note))+'</div>'+
   docFoot(lang,'')+'<div class="pad"></div></div><script>'+PAGINATE+'<\/script></body></html>'}
window.LM_stDocs=function(){var P=pnl();if(!P)return null;var l=settings.out==='both'?'it':settings.out;return {sld:stSldDoc(P,l),rep:stRepDoc(P,l)}};
window.LM_pnDoc=function(){var P=pnl();return P?pnDoc(P,settings.out==='both'?'it':settings.out):''};
function pnPdf(){var P=pnl();if(!P)return;var lang=settings.out==='both'?'it':settings.out,html=pnDoc(P,lang);
  var nm=(settings.out==='ar'?'لوحة_كهربائية':'Quadro_elettrico')+(P.name?'_'+P.name.replace(/[^\w؀-ۿ -]+/g,'').trim().replace(/\s+/g,'_'):'')+'.pdf';
  ping('/usa/quadro-pdf','Uso quadro PDF');
  if(A&&A.pdf){toast(T('pdfWait'));A.pdf(html,nm)}else webPdfHtml(html,nm)}

// ======================= STUDIO: piattaforma di progettazione del quadro =======================
function S4(ar,it,en,fr){return {ar:ar,it:it,en:en,fr:fr}}
var STX={
 home:S4('مشاريعي','Progetti','Projects','Projets'),panel:S4('اللوحة','Quadro','Panel','Tableau'),sld:S4('أحادي الخط','Unifilare','Single-line','Unifilaire'),
 wire:S4('الأسلاك','Cablaggio','Wiring','Câblage'),calc:S4('الحسابات','Calcoli','Calculations','Calculs'),bom:S4('المواد والسعر','Materiali e prezzi','Materials & price','Matériel et prix'),rep:S4('التقرير','Rapporto','Report','Rapport'),
 saved:S4('✓ محفوظ','✓ Salvato','✓ Saved','✓ Enregistré'),newP:S4('➕ لوحة جديدة','➕ Nuovo quadro','➕ New panel','➕ Nouveau tableau'),
 search:S4('ابحث بالاسم أو الزبون…','Cerca per nome o cliente…','Search by name or client…','Rechercher par nom ou client…'),
 all:S4('الكل','Tutti','All','Tous'),res:S4('سكني','Residenziale','Residential','Résidentiel'),com:S4('تجاري','Commerciale','Commercial','Commercial'),ind:S4('صناعي','Industriale','Industrial','Industriel'),
 draft:S4('مسودة','Bozza','Draft','Brouillon'),review:S4('قيد المراجعة','In revisione','In review','En révision'),ok:S4('معتمد','Approvato','Approved','Approuvé'),done:S4('تم التسليم','Consegnato','Delivered','Livré'),
 open:S4('فتح','Apri','Open','Ouvrir'),dup:S4('نسخ','Duplica','Duplicate','Dupliquer'),noProj:S4('لا توجد لوحات بعد','Nessun quadro ancora','No panels yet','Aucun tableau'),
 mods:S4('موديول','moduli','modules','modules'),spare:S4('احتياطي','riserva','spare','réserve'),circ:S4('دائرة','circuiti','circuits','circuits'),
 lib:S4('📚 المكتبة','📚 Libreria','📚 Library','📚 Bibliothèque'),prop:S4('✏️ الخصائص','✏️ Proprietà','✏️ Properties','✏️ Propriétés'),
 copy:S4('نسخ','Copia','Copy','Copier'),paste:S4('لصق','Incolla','Paste','Coller'),del:S4('حذف','Elimina','Delete','Supprimer'),lock:S4('قفل','Blocca','Lock','Verrouiller'),
 lbl:S4('الأسماء','Etichette','Labels','Étiquettes'),wires:S4('الأسلاك','Cavi','Wires','Câbles'),renum:S4('إعادة الترقيم','Rinumera','Renumber','Renuméroter'),
 selFirst:S4('اختر قطعة أولاً (اضغط عليها)','Seleziona prima un modulo (toccalo)','Select a module first (tap it)','Sélectionnez d’abord un module'),
 locked:S4('🔒 القطعة مقفلة','🔒 Modulo bloccato','🔒 Module locked','🔒 Module verrouillé'),
 tapHint:S4('اضغط مرة للتحديد، ومرة ثانية للتعديل. اسحب بإصبع للتحريك وبإصبعين للتكبير.','Tocca una volta per selezionare, di nuovo per modificare. Trascina per spostare, due dita per lo zoom.','Tap once to select, again to edit. Drag to pan, pinch to zoom.','Touchez pour sélectionner, encore pour modifier. Glissez pour déplacer, pincez pour zoomer.'),
 exp:S4('تصدير وحفظ','Esporta e salva','Export & save','Exporter et enregistrer'),
 pdfP:S4('📄 PDF اللوحة','📄 PDF quadro','📄 Panel PDF','📄 PDF tableau'),pdfS:S4('📄 PDF المخطط أحادي الخط','📄 PDF unifilare','📄 Single-line PDF','📄 PDF unifilaire'),pdfR:S4('📄 PDF تقرير التسليم','📄 PDF rapporto di consegna','📄 Handover report PDF','📄 PDF rapport de livraison'),
 svgP:S4('🖼 SVG اللوحة','🖼 SVG quadro','🖼 Panel SVG','🖼 SVG tableau'),svgS:S4('🖼 SVG أحادي الخط','🖼 SVG unifilare','🖼 Single-line SVG','🖼 SVG unifilaire'),png:S4('🖼 صورة PNG','🖼 Immagine PNG','🖼 PNG image','🖼 Image PNG'),
 csvM:S4('📊 CSV المواد','📊 CSV materiali','📊 Materials CSV','📊 CSV matériel'),csvW:S4('📊 CSV الأسلاك','📊 CSV cavi','📊 Wires CSV','📊 CSV câbles'),
 file:S4('💾 ملف المشروع','💾 File progetto','💾 Project file','💾 Fichier projet'),imp:S4('📂 فتح ملف مشروع','📂 Apri file progetto','📂 Open project file','📂 Ouvrir un fichier projet'),
 ver:S4('🕓 حفظ نسخة','🕓 Salva versione','🕓 Save version','🕓 Enregistrer version'),vers:S4('النسخ السابقة','Versioni precedenti','Previous versions','Versions précédentes'),restore:S4('استرجاع','Ripristina','Restore','Restaurer'),
 verOk:S4('تم حفظ النسخة','Versione salvata','Version saved','Version enregistrée'),impOk:S4('تم فتح المشروع','Progetto aperto','Project opened','Projet ouvert'),impBad:S4('الملف غير صالح','File non valido','Invalid file','Fichier invalide'),
 pngWeb:S4('الصورة PNG متاحة في نسخة الويب؛ استعمل PDF أو SVG هنا','PNG disponibile nella versione web; qui usa PDF o SVG','PNG is available in the web version; use PDF or SVG here','PNG disponible en version web ; utilisez PDF ou SVG ici'),
 type:S4('النوع','Tipo','Type','Type'),status:S4('الحالة','Stato','Status','Statut'),client:S4('الزبون','Cliente','Client','Client'),
 // unifilare
 sldNote:S4('المخطط يُرسم من نفس اللوحة: أي تعديل في اللوحة يظهر هنا بنفس رقم الدائرة.','Lo schema è generato dallo stesso quadro: ogni modifica appare qui con lo stesso numero di circuito.','The diagram is generated from the same panel: every change appears here with the same circuit number.','Le schéma est généré à partir du même tableau : chaque modification apparaît ici avec le même numéro.'),
 grid:S4('الشبكة','Rete','Supply','Réseau'),
 // cablaggio
 modeV:S4('الوضع البصري','Modalità visiva','Visual mode','Mode visuel'),modeE:S4('الوضع الكهربائي','Modalità elettrica','Electrical mode','Mode électrique'),
 modeVd:S4('الرسم في «اللوحة» للعرض فقط.','Il disegno nel «Quadro» è solo illustrativo.','The drawing in «Panel» is illustrative only.','Le dessin du «Tableau» est illustratif.'),
 modeEd:S4('هنا كل توصيلة مسجلة: من أي طرف إلى أي طرف، بالموصل والمقطع.','Qui ogni collegamento è registrato: da quale morsetto a quale, con conduttore e sezione.','Here every connection is recorded: from which terminal to which, with conductor and size.','Ici chaque connexion est enregistrée : de quelle borne à quelle borne, avec conducteur et section.'),
 check:S4('🔎 فحص التوصيلات','🔎 Verifica collegamenti','🔎 Check connections','🔎 Vérifier les connexions'),
 lvl0:S4('رسم بصري فقط — لم يُفحص بعد','Solo disegno — non ancora verificato','Drawing only — not checked yet','Dessin seulement — pas encore vérifié'),
 lvl1:S4('✓ تم فحص اتصال الأطراف منطقياً (ليس محاكاة ولا شهادة مطابقة)','✓ Collegamenti dei morsetti verificati logicamente (non è una simulazione né una certificazione)','✓ Terminal connections logically checked (not a simulation or a certificate)','✓ Connexions des bornes vérifiées logiquement (ni simulation ni certificat)'),
 lvl2:S4('✕ توجد أخطاء يجب إصلاحها','✕ Ci sono errori da correggere','✕ There are errors to fix','✕ Des erreurs sont à corriger'),
 noIss:S4('لا توجد ملاحظات','Nessuna segnalazione','No findings','Aucune remarque'),
 wFrom:S4('من','Da','From','De'),wTo:S4('إلى','A','To','À'),wC:S4('الموصل','Cond.','Cond.','Cond.'),wS:S4('المقطع','Sez.','Size','Sect.'),wK:S4('النوع','Tipo','Type','Type'),
 kMan:S4('يدوي','manuale','manual','manuel'),badC:S4('اتصال غير صالح','Collegamento non valido','Invalid connection','Connexion invalide'),noBend:S4('بدون انعطافات','Senza curve','No bends','Sans coudes'),
 wtOn:S4('ارسم سلكاً','Disegna cavo','Draw wire','Tracer un câble'),wtOff:S4('إنهاء الرسم','Fine disegno','Stop drawing','Terminer'),
 wt1:S4('اضغط الطرف الأول (الدوائر الملونة)','Tocca il primo morsetto (cerchi colorati)','Tap the first terminal (coloured circles)','Touchez la première borne (cercles)'),
 wt2:S4('اضغط على اللوحة لإضافة انعطاف، ثم اضغط الطرف الثاني','Tocca il quadro per aggiungere curve, poi il secondo morsetto','Tap the panel to add bends, then the second terminal','Touchez pour ajouter des coudes, puis la seconde borne'),
 wtHint:S4('ارسم أسلاكك بيدك من طرف إلى طرف','Disegna i tuoi cavi da morsetto a morsetto','Draw your own wires terminal to terminal','Tracez vos câbles de borne à borne'),manW:S4('أسلاك مرسومة يدوياً','cavi disegnati a mano','hand-drawn wires','câbles tracés'),
 wSame:S4('اختر طرفاً آخر','Scegli un altro morsetto','Pick another terminal','Choisissez une autre borne'),
 kFeed:S4('تغذية','alimentazione','supply','alimentation'),kJmp:S4('وصلة','ponticello','jumper','pont'),kComb:S4('مشط','pettine','comb','peigne'),kCab:S4('كابل دائرة','linea','circuit cable','ligne'),kPE:S4('أرضي','terra','earth','terre'),
 // calcoli
 len:S4('الطول م','Lungh. m','Length m','Long. m'),kw:S4('الحمل W','Carico W','Load W','Charge W'),pf:S4('cosφ','cosφ','cosφ','cosφ'),
 ib:S4('التيار','Corrente','Current','Courant'),dv:S4('هبوط الجهد','Caduta di tensione','Voltage drop','Chute de tension'),lim:S4('الحد المسموح %','Limite %','Limit %','Limite %'),
 tot:S4('مجموع الأحمال المتصلة','Totale carichi collegati','Total connected load','Total des charges raccordées'),
 calcNote:S4('أدخل الطول والحمل لكل دائرة. لا نستعمل معامل طلب مفترض: المجموع هو الحمل المتصل فقط.','Inserisci lunghezza e carico per ogni circuito. Nessun fattore di contemporaneità inventato: il totale è solo il carico collegato.','Enter length and load for each circuit. No assumed demand factor: the total is the connected load only.','Saisissez longueur et charge pour chaque circuit. Aucun facteur de simultanéité supposé : le total est la charge raccordée.'),
 formula:S4('المعادلة والافتراضات','Formula e ipotesi','Formula and assumptions','Formule et hypothèses'),moreCalc:S4('🧮 حاسبات أخرى','🧮 Altri calcolatori','🧮 More calculators','🧮 Autres calculateurs'),
 phase:S4('الطور','Fase','Phase','Phase'),
 // materiali
 price:S4('السعر','Prezzo','Price','Prix'),qty:S4('الكمية','Q.tà','Qty','Qté'),
 stOk:S4('مؤكد من المشروع','confermato dal progetto','confirmed from project','confirmé'),stEst:S4('تقديري','stimato','estimated','estimé'),stCalc:S4('محسوب من الأطوال','calcolato dalle lunghezze','calculated from lengths','calculé'),
 field:S4('الأسلاك: يُضاف هامش ويُراجع في الموقع','Cavi: aggiungere margine e verificare in cantiere','Cables: add margin and verify on site','Câbles : ajouter une marge et vérifier sur site'),
 toQuote:S4('💶 حوّل إلى عرض سعر','💶 Crea preventivo','💶 Make a quote','💶 Créer un devis'),quoted:S4('أضيفت المواد المسعّرة إلى عرض السعر','Materiali con prezzo aggiunti al preventivo','Priced materials added to the quote','Matériel chiffré ajouté au devis'),
 noPrice:S4('أدخل سعراً واحداً على الأقل','Inserisci almeno un prezzo','Enter at least one price','Saisissez au moins un prix'),
 // rapporto
 tech:S4('الفني المسؤول','Tecnico responsabile','Responsible technician','Technicien responsable'),dDate:S4('تاريخ التسليم','Data di consegna','Delivery date','Date de livraison'),nDate:S4('الفحص القادم','Prossima verifica','Next inspection','Prochaine vérification'),
 works:S4('وصف الأعمال','Descrizione dei lavori','Description of works','Description des travaux'),notes:S4('ملاحظات','Note','Notes','Notes'),
 checks:S4('الفحوصات','Verifiche','Checks','Vérifications'),nt:S4('لم يُفحص','Non verificato','Not checked','Non vérifié'),pass:S4('مطابق','Conforme','Pass','Conforme'),fail:S4('غير مطابق','Non conforme','Fail','Non conforme'),
 val:S4('القيمة المقاسة','Valore misurato','Measured value','Valeur mesurée'),
 repNote:S4('لا يظهر أي فحص كمنجز إلا إذا أدخلته أنت.','Nessuna verifica appare come eseguita se non l’hai inserita tu.','No check appears as done unless you entered it.','Aucune vérification n’apparaît comme faite si vous ne l’avez pas saisie.'),
 summary:S4('ملخص المشروع','Riepilogo del progetto','Project summary','Résumé du projet'),version:S4('الإصدار','Versione','Version','Version')};
var STCHK=[['vis',S4('فحص بصري للوحة والتوصيلات','Esame a vista del quadro e dei collegamenti','Visual inspection of panel and connections','Examen visuel du tableau et des connexions')],
 ['tight',S4('شدّ براغي الأطراف','Serraggio dei morsetti','Terminal tightening','Serrage des bornes')],
 ['pe',S4('استمرارية الأرضي (Ω)','Continuità del conduttore di protezione (Ω)','Protective conductor continuity (Ω)','Continuité du conducteur de protection (Ω)')],
 ['iso',S4('مقاومة العزل (MΩ)','Resistenza di isolamento (MΩ)','Insulation resistance (MΩ)','Résistance d’isolement (MΩ)')],
 ['pol',S4('القطبية','Polarità','Polarity','Polarité')],
 ['rcd',S4('اختبار التفاضلي (ms / mA)','Prova differenziali (ms / mA)','RCD test (ms / mA)','Essai différentiels (ms / mA)')],
 ['lbl',S4('تسميات الدوائر ملصقة','Etichette dei circuiti applicate','Circuit labels applied','Étiquettes des circuits posées')]];
function stS(){if(!view.st)view.st={mod:'panel',z:1,x:0,y:0,q:'',f:''};return view.st}
function sL(o){return L4(o)}
function pnUid(){return 'm'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function pnMig(P){if(!P)return P;if(!P.meta)P.meta={type:'res',st:'draft',c:Date.now(),u:Date.now(),ver:1};if(!P.vw)P.vw={lbl:1,wires:1};if(!P.rep)P.rep={chk:{}};if(!P.price)P.price={};
  var mx=0,ch=false;(P.mods||[]).forEach(function(m){if(m.n>mx)mx=m.n});var seen={};
  (P.mods||[]).forEach(function(m){if(!m.id||seen[m.id]){m.id=pnUid();ch=true}seen[m.id]=1;if(m.t!=='gap'&&!m.n){m.n=++mx;ch=true}if(m.t==='gap'&&m.n){delete m.n;ch=true}});
  var ns={};(P.mods||[]).forEach(function(m){if(m.n){if(ns[m.n]){m.n=++mx;ch=true}ns[m.n]=1}});
  if(ch&&!pnMig.pend){pnMig.pend=1;setTimeout(function(){pnMig.pend=0;put(K.proj,{cur:P_cur(),list:projList()})},0)}return P}
function P_cur(){return P.cur}function projList(){return P.list}
// ---- annulla / ripeti (istantanee del modello) ----
var PNU={pid:null,u:[],r:[],last:null};
function pnCommit(){var P=pnl();if(!P)return;var pid=cur().id,js=JSON.stringify({m:P.mods,s:P.sys,r:P.row,l:P.lc,u:P.uw||[],pl:P.plan||null});
  if(PNU.pid!==pid){PNU={pid:pid,u:[],r:[],last:js};return}
  if(js!==PNU.last){if(PNU.last!=null){PNU.u.push(PNU.last);if(PNU.u.length>60)PNU.u.shift();PNU.r=[]}PNU.last=js;P.meta.u=Date.now();save()}}
function pnRestoreSnap(js){var P=pnl(),o=JSON.parse(js);P.mods=o.m;P.sys=o.s;P.row=o.r;P.lc=o.l;P.uw=o.u||[];if(o.pl)P.plan=o.pl;PNU.last=js;P.meta.u=Date.now();save()}
function pnUndo(){if(!PNU.u.length)return;PNU.r.push(PNU.last);pnRestoreSnap(PNU.u.pop());view.pSel=null;render()}
function pnRedo(){if(!PNU.r.length)return;PNU.u.push(PNU.last);pnRestoreSnap(PNU.r.pop());view.pSel=null;render()}
var PNCLIP=null;
function stSel(){var P=pnl();if(!P||view.pSel==null||!P.mods[view.pSel]){toast(sL(STX.selFirst));return null}return P.mods[view.pSel]}
function stTime(t){var d=new Date(t||Date.now());return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}
function stDate(t){var d=new Date(t||Date.now());return ('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear()}
// ---- guscio dello studio ----
var STMODS=[['home','🏠'],['panel','⚡'],['lt','💡'],['plan','📐'],['sld','📈'],['wire','🔌'],['calc','🧮'],['bom','📋'],['rep','📝']];
function renderStudio(){
  var st=stS(),P=pnl(),p=cur(),body;
  if(st.mod!=='home'&&st.mod!=='lt'&&st.mod!=='plan'&&(!P||!(P.mods||[]).length)&&st.mod!=='panel')st.mod='panel';
  switch(st.mod){case 'home':body=stHome();break;case 'lt':body=stLt();break;case 'plan':body=stPlan();break;case 'sld':body=stDiag();break;case 'wire':body=stWire();break;case 'calc':body=stCalc();break;case 'bom':body=stBom();break;case 'rep':body=stRep();break;default:body=stPanel()}
  var title=st.mod==='home'?sL(STX.home):(P&&P.name)||projTitle(p);
  return '<div class="stu"><div class="stbar"><button class="stb" data-act="stexit" aria-label="back">'+(settings.ui==='ar'?'→':'←')+'</button>'+
   '<div class="stt"><b dir="auto">'+esc(title)+'</b><small>'+(P&&st.mod!=='home'?esc(sL(STX.saved))+' '+stTime(P.meta.u):'⚡ '+esc(sL(PN.t)))+'</small></div>'+
   (st.mod!=='home'?'<button class="stb" data-act="stundo"'+(PNU.u.length?'':' disabled')+' title="Undo">↶</button><button class="stb" data-act="stredo"'+(PNU.r.length?'':' disabled')+' title="Redo">↷</button><button class="stb" data-act="stexp" title="Export">⤓</button>':'')+'</div>'+
   '<div class="stmods">'+STMODS.map(function(x){return '<button class="'+(st.mod===x[0]?'on':'')+'" data-act="stmod" data-v="'+x[0]+'"><i>'+x[1]+'</i>'+esc(sL(STX[x[0]]))+'</button>'}).join('')+'</div>'+
   '<div class="stbody">'+body+'</div></div>'}
// ---- 🏠 progetti ----
function stHome(){var st=stS();
  return '<div class="stsrch"><input id="stQ" dir="auto" placeholder="'+esc(sL(STX.search))+'" value="'+esc(st.q||'')+'"></div>'+
   '<div class="chips" style="margin:8px 0">'+[['',STX.all],['res',STX.res],['com',STX.com],['ind',STX.ind]].map(function(o){return '<button class="chip'+((st.f||'')===o[0]?' on':'')+'" data-act="stf" data-v="'+o[0]+'">'+esc(sL(o[1]))+'</button>'}).join('')+'</div>'+
   '<button class="btn main" data-act="stnew" style="margin-bottom:10px">'+esc(sL(STX.newP))+'</button><button class="btn ghost" data-act="stimp" style="width:100%;margin-bottom:12px">'+esc(sL(STX.imp))+'</button>'+
   '<div id="stList">'+stHomeList()+'</div>'}
function stHomeList(){var st=stS(),q=(st.q||'').toLowerCase();
  var L=P.list.filter(function(p){return ofTrade(p)&&p.panel&&((p.panel.mods||[]).length||(p.panel.lts||[]).length||(p.panel.plan&&p.panel.plan.els.length))}).filter(function(p){var pp=pnMig(p.panel);
    if(st.f&&pp.meta.type!==st.f)return false;if(!q)return true;return (projTitle(p)+' '+(p.site&&p.site.cliente||'')+' '+(pp.name||'')).toLowerCase().indexOf(q)>=0})
   .sort(function(a,b){return (b.panel.meta.u||0)-(a.panel.meta.u||0)});
  if(!L.length)return '<div class="empty"><div class="big">⚡</div>'+esc(sL(STX.noProj))+'</div>';
  return L.map(function(p){var pp=p.panel,n=pp.mods.filter(function(m){return m.t!=='gap'}).length,stc={draft:'#868e96',review:'#E67700',ok:'#2F9E44',done:'#1F6FD6'}[pp.meta.st]||'#868e96';
    return '<div class="stcard'+(p.id===cur().id?' cur':'')+'"><div class="sth"><b dir="auto">'+esc(pp.name||projTitle(p))+'</b><span class="stst" style="background:'+stc+'">'+esc(sL(STX[pp.meta.st]||STX.draft))+'</span></div>'+
     '<div class="mini" dir="auto">'+(p.site&&p.site.cliente?'👤 '+esc(p.site.cliente)+' · ':'')+esc(sL(STX[pp.meta.type]||STX.res))+' · '+n+' Q · '+(pp.sys==='3'?'400V':'230V')+' · 🕓 '+stDate(pp.meta.u)+' '+stTime(pp.meta.u)+'</div>'+
     '<div class="pngo" style="margin-top:8px"><button class="btn main" data-act="stopen" data-v="'+esc(p.id)+'">'+esc(sL(STX.open))+'</button><button class="btn ghost" data-act="stdupp" data-v="'+esc(p.id)+'">'+esc(sL(STX.dup))+'</button><button class="btn ghost" data-act="stmeta" data-v="'+esc(p.id)+'" style="flex:0 0 52px">⚙️</button></div></div>'}).join('')}
function stMeta(pid){var p=P.list.find(function(x){return x.id===pid});if(!p||!p.panel)return;var pp=pnMig(p.panel);
  function draw(){openSheet('<h2>⚙️ '+esc(pp.name||projTitle(p))+'</h2>'+pnChips('type',[['res',sL(STX.res)],['com',sL(STX.com)],['ind',sL(STX.ind)]],pp.meta.type,sL(STX.type))+
    pnChips('st',[['draft',sL(STX.draft)],['review',sL(STX.review)],['ok',sL(STX.ok)],['done',sL(STX.done)]],pp.meta.st,sL(STX.status))+'<button class="btn main" id="pnOk" style="margin-top:12px">'+esc(sL(PN.ok))+'</button>');
    sheet.querySelectorAll('[data-pk]').forEach(function(b){b.onclick=function(){pp.meta[b.dataset.pk]=b.dataset.pv;pp.meta.u=Date.now();put(K.proj,{cur:P.cur,list:P.list});draw();var l=$('#stList');if(l)l.innerHTML=stHomeList()}});
    $('#pnOk').onclick=closeSheet}
  draw()}
// ---- ⚡ quadro ----
function stPanel(){var P=pnl();
  if(!P||!(P.mods||[]).length)return renderPanel().replace(/^[\s\S]*?<div class="pnempty">/,'<div class="pnempty">');
  var L=pnLayout(P),used=0;L.items.forEach(function(it){if(it.m.t!=='gap')used+=pnW(it.m)});var cap=L.rows.length*(P.row||12),sel=view.pSel!=null?P.mods[view.pSel]:null,st=stS();
  var tb=[['stlib',sL(STX.lib)],['stprop',sL(STX.prop)],['stdupm','⧉ '+sL(PN.dup)],['stcopy','📋 '+sL(STX.copy)],['stpaste','📥 '+sL(STX.paste)+(PNCLIP?'':'')],['stmvl','◀'],['stmvr','▶'],['stlock',(sel&&sel.lock?'🔓 ':'🔒 ')+sL(STX.lock)],['stdel','🗑 '+sL(STX.del)]];
  return '<div class="sttools">'+tb.map(function(b){return '<button data-act="'+b[0]+'"'+(b[0]==='stpaste'&&!PNCLIP?' disabled':'')+'>'+esc(b[1])+'</button>'}).join('')+'</div>'+
   '<div class="sttools sub"><button data-act="pngen">'+esc(sL(PN.gen))+'</button><button data-act="pnset">'+esc(sL(PN.set))+'</button><button class="'+(P.vw.lbl?'on':'')+'" data-act="stvw" data-v="lbl">🏷 '+esc(sL(STX.lbl))+'</button><button class="'+(P.vw.wires?'on':'')+'" data-act="stvw" data-v="wires">〰 '+esc(sL(STX.wires))+'</button><button data-act="stren">#️⃣ '+esc(sL(STX.renum))+'</button></div>'+
   '<div class="stwire'+(st.wt?' on':'')+'"><button data-act="stwt">'+(st.wt?'✕ ':'✏️ ')+esc(sL(st.wt?STX.wtOff:STX.wtOn))+'</button>'+(st.wt?'<span>'+esc(sL(st.wd?STX.wt2:STX.wt1))+'</span>'+(st.wd&&st.wd.pts.length?'<button data-act="stwu">↶</button>':''):'<span>'+((P.uw||[]).length?(P.uw.length+' '+esc(sL(STX.manW))):esc(sL(STX.wtHint)))+'</span>')+'</div>'+
   '<div class="stc" id="stc"><div class="stz" style="transform:translate('+st.x+'px,'+st.y+'px) scale('+st.z+')">'+pnSVG(P,{sel:view.pSel,lbl:P.vw.lbl,nw:!P.vw.wires,wt:st.wt,wd:st.wd,selW:st.selW})+'</div>'+
   '<div class="stzoom"><button data-act="stz" data-v="1">＋</button><button data-act="stz" data-v="-1">－</button><button data-act="stz" data-v="0">⤢</button><button data-act="stz" data-v="s">🎯</button></div></div>'+
   '<div class="ststat"><span>Q: <b>'+L.items.filter(function(it){return it.m.t!=='gap'}).length+'</b></span><span>'+esc(sL(STX.mods))+': <b>'+used+'/'+cap+'</b></span><span>'+esc(sL(STX.spare))+': <b>'+Math.max(0,cap-used)+'</b></span><span>'+(P.sys==='3'?'400V 3~':'230V 1~')+'</span>'+(sel?'<span>▶ <b>'+(sel.n?'Q'+sel.n:'—')+'</b>'+(sel.lock?' 🔒':'')+'</span>':'')+'</div>'+
   '<div class="mini" style="margin:6px 4px 10px">👆 '+esc(sL(STX.tapHint))+'</div>'+
   '<div class="pngo"><button class="btn ghost" data-act="pnpdf">'+esc(sL(PN.pdf))+'</button><button class="btn ghost" data-act="pnwa">'+esc(sL(PN.wa))+'</button></div>'+
   '<button class="btn main" data-act="pnord" style="margin-top:8px">'+esc(sL(PN.ord))+'</button>'+
   '<div class="h2" style="margin-top:16px"><b>'+esc(sL(PN.legend))+'</b></div><div class="pnlist">'+L.items.filter(function(it){return it.m.t!=='gap'}).map(function(it){var m=it.m;
     return '<button class="pnrow" data-act="pnedit" data-v="'+it.i+'"><b>'+(m.t==='term'?'X':'Q')+it.q+'</b><span dir="auto">'+esc(pnName(m))+(m.lock?' 🔒':'')+'</span><i dir="ltr">'+esc(pnSpec(m))+(m.s?' · '+esc(m.s)+' mm²':'')+(pnSecLow(m)?' ⚠️':'')+'</i></button>'}).join('')+'</div>'+
   '<div class="mini" style="margin:10px 4px">ⓘ '+esc(sL(PN.note))+'</div>'}
// libreria con ricerca (tipi generici + pezzi reali)
function stLib(){var P=pnl()||(cur().panel=pnMig({v:1,sys:'1',row:12,lc:packId()==='IT'?'br':'rd',name:'',mods:[]}));var q='';
  function put(m){pnMig(P);var at=view.pSel!=null&&view.pSel<P.mods.length?view.pSel+1:P.mods.length;P.mods.splice(at,0,m);pnMig(P);view.pSel=at;save();closeSheet();render()}
  function list(){var qq=q.toLowerCase().trim(),h='';
    var gen=PNTALL.filter(function(k){if(!qq)return true;var t=PN.types[k];return [t.ar,t.it,t.en,t.fr,k].join(' ').toLowerCase().indexOf(qq)>=0});
    if(!qq)h+=PNG3.map(function(g,gi){return '<div class="h2" style="margin:10px 2px 6px"><b>'+esc(sL(PN.grp[gi]))+'</b></div><div class="pnadd">'+g.map(function(k){return '<button class="btn ghost" data-pa="'+k+'">'+esc(sL(PN.types[k]))+'</button>'}).join('')+'</div>'}).join('');
    else if(gen.length)h+='<div class="pnadd">'+gen.map(function(k){return '<button class="btn ghost" data-pa="'+k+'">'+esc(sL(PN.types[k]))+'</button>'}).join('')+'</div>';
    var R=pnRealList(P).filter(function(x){if(!qq)return true;var n=x.n||{};return [x.b,x.r,x.f,x.p,x.cv?x.cv+x.A:'',x.A!=null?x.A+'a':'',x.A,n.it,n.ar,n.fr,n.en].join(' ').toLowerCase().indexOf(qq.replace(/\s+/g,' '))>=0});
    if(R.length)h+='<div class="h2" style="margin:14px 2px 6px"><b>'+esc(sL(PN.real))+'</b> <small>'+R.length+'</small></div>'+R.slice(0,60).map(function(x){return '<button class="pnrow" data-rp="'+esc(x.i)+'"><b style="font-size:12px">'+esc(x.b.split(' ')[0])+'</b><span dir="ltr" style="text-align:start">'+esc(x.r)+'</span><i dir="ltr">'+esc([x.f,x.p,x.cv?x.cv+x.A:(x.A!=null?x.A+'A':''),x.mA?x.mA+'mA':'',x.w?x.w+' mod':''].filter(Boolean).join(' · '))+'</i></button>'}).join('');
    var box=$('#stLibL');if(box){box.innerHTML=h;bind()}}
  function bind(){sheet.querySelectorAll('[data-pa]').forEach(function(b){b.onclick=function(){put(pnNew(b.dataset.pa,P.sys))}});
    sheet.querySelectorAll('[data-rp]').forEach(function(b){b.onclick=function(){var x=null;pnRealList(P).forEach(function(y){if(y.i===b.dataset.rp)x=y});if(!x)return;var m=pnNew(PNCAT[x.c],P.sys);pnApplyReal(m,x,P);put(m)}})}
  openSheet('<h2>'+esc(sL(STX.lib))+'</h2><div class="stsrch"><input id="stLQ" dir="auto" placeholder="🔍 C16, 2P, Schneider, A9F…, '+esc(sL(PN.types.rcd))+'…"></div><div id="stLibL"></div>');
  $('#stLQ').oninput=function(){q=this.value;list()};list()}
// pan / zoom / pinch sulla tela (delegato: sopravvive ai render)
(function(){var ps={},s0=null,moved=false,sup=false;
  function apply(){var z=document.querySelector('.stz');if(z){var s=stS();z.style.transform='translate('+s.x+'px,'+s.y+'px) scale('+s.z+')'}}
  function dist(){var k=Object.keys(ps);if(k.length<2)return 0;var a=ps[k[0]],b=ps[k[1]];return Math.hypot(a.x-b.x,a.y-b.y)}
  function mid(){var k=Object.keys(ps),a=ps[k[0]],b=ps[k[1]];return {x:(a.x+b.x)/2,y:(a.y+b.y)/2}}
  function start(){var s=stS(),c=document.querySelector('.stc'),r=c.getBoundingClientRect(),k=Object.keys(ps),p=k.length>1?mid():ps[k[0]];s0={x:s.x,y:s.y,z:s.z,px:p.x-r.left,py:p.y-r.top,d:dist()}}
  document.addEventListener('pointerdown',function(e){var c=e.target.closest&&e.target.closest('.stc');if(!c||e.target.closest('.stzoom'))return;if(e.target.closest('.plc .pls')&&(stS().pt||'sel')==='sel')return;ps[e.pointerId]={x:e.clientX,y:e.clientY};moved=false;start()});
  document.addEventListener('pointermove',function(e){if(!ps[e.pointerId]||!s0)return;ps[e.pointerId]={x:e.clientX,y:e.clientY};var s=stS(),c=document.querySelector('.stc');if(!c)return;var r=c.getBoundingClientRect(),k=Object.keys(ps);
    if(k.length>1&&s0.d){var m=mid(),nz=Math.max(0.5,Math.min(6,s0.z*dist()/s0.d)),mx=m.x-r.left,my=m.y-r.top;s.z=nz;s.x=mx-(s0.px-s0.x)*nz/s0.z;s.y=my-(s0.py-s0.y)*nz/s0.z;moved=true}
    else{var p=ps[k[0]],dx=p.x-r.left-s0.px,dy=p.y-r.top-s0.py;if(Math.abs(dx)+Math.abs(dy)>8)moved=true;if(moved){s.x=s0.x+dx;s.y=s0.y+dy}}
    if(moved){e.preventDefault();apply()}},{passive:false});
  function end(e){if(!ps[e.pointerId])return;delete ps[e.pointerId];if(moved)sup=true;if(Object.keys(ps).length)start();else s0=null}
  document.addEventListener('pointerup',end);document.addEventListener('pointercancel',end);
  document.addEventListener('click',function(e){if(sup&&e.target.closest&&e.target.closest('.stc')){sup=false;e.stopPropagation();e.preventDefault()}else sup=false},true);
  document.addEventListener('wheel',function(e){var c=e.target.closest&&e.target.closest('.stc');if(!c)return;e.preventDefault();var s=stS(),r=c.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top,nz=Math.max(0.5,Math.min(6,s.z*(e.deltaY<0?1.15:1/1.15)));s.x=mx-(mx-s.x)*nz/s.z;s.y=my-(my-s.y)*nz/s.z;s.z=nz;apply()},{passive:false});
  // scorciatoie da tastiera (computer)
  document.addEventListener('keydown',function(e){if(view.cat!=='__panel'||stS().mod!=='panel'||sheetOpen)return;var t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'))return;var k=e.key.toLowerCase(),c=e.ctrlKey||e.metaKey;
    if(c&&k==='z'){e.preventDefault();e.shiftKey?pnRedo():pnUndo()}else if(c&&k==='y'){e.preventDefault();pnRedo()}else if(c&&k==='c'){e.preventDefault();stAct('stcopy')}else if(c&&k==='v'){e.preventDefault();stAct('stpaste')}else if(c&&k==='d'){e.preventDefault();stAct('stdupm')}
    else if(k==='delete'||k==='backspace'){if(view.pSel!=null){e.preventDefault();stAct('stdel')}}else if(k==='arrowleft'){stAct('stmvl')}else if(k==='arrowright'){stAct('stmvr')}else if(k==='escape'){view.pSel=null;render()}})})();
function stZoom(v){var s=stS(),c=document.querySelector('.stc');if(!c)return;var r=c.getBoundingClientRect();
  if(v==='0'){s.z=1;s.x=0;s.y=0}
  else if(v==='s'){var g=document.querySelector('.stz [data-act="pnle"][data-v="'+view.pSel+'"]');if(!g){toast(sL(STX.selFirst));return}var gr=g.getBoundingClientRect(),zr=document.querySelector('.stz').getBoundingClientRect(),cx=(gr.left+gr.width/2-zr.left)/s.z,cy=(gr.top+gr.height/2-zr.top)/s.z;s.z=Math.min(6,Math.max(2,s.z));s.x=r.width/2-cx*s.z;s.y=r.height/2-cy*s.z}
  else{var nz=Math.max(0.5,Math.min(6,s.z*(v==='1'?1.3:1/1.3))),mx=r.width/2,my=r.height/2;s.x=mx-(mx-s.x)*nz/s.z;s.y=my-(my-s.y)*nz/s.z;s.z=nz}
  var z=document.querySelector('.stz');if(z)z.style.transform='translate('+s.x+'px,'+s.y+'px) scale('+s.z+')'}
function stAct(a,v){var P=pnl(),m;
  switch(a){
   case 'stlib':stLib();break;
   case 'stprop':if(stSel())pnEdit(view.pSel);break;
   case 'stdupm':m=stSel();if(!m)break;var c=JSON.parse(JSON.stringify(m));delete c.id;delete c.n;delete c.lock;P.mods.splice(view.pSel+1,0,c);pnMig(P);view.pSel++;save();render();break;
   case 'stcopy':m=stSel();if(!m)break;PNCLIP=JSON.stringify(m);toast('📋 '+(m.n?'Q'+m.n:''));render();break;
   case 'stpaste':if(!PNCLIP||!P)break;var c2=JSON.parse(PNCLIP);delete c2.id;delete c2.n;delete c2.lock;pnFix(c2,P.sys);var at=view.pSel!=null?view.pSel+1:P.mods.length;P.mods.splice(at,0,c2);pnMig(P);view.pSel=at;save();render();break;
   case 'stdel':m=stSel();if(!m)break;if(m.lock){toast(sL(STX.locked));break}P.mods.splice(view.pSel,1);view.pSel=null;save();render();break;
   case 'stlock':m=stSel();if(!m)break;m.lock=!m.lock;save();render();break;
   case 'stmvl':case 'stmvr':m=stSel();if(!m)break;if(m.lock){toast(sL(STX.locked));break}var d=a==='stmvr'?1:-1,j=view.pSel+d;if(j<0||j>=P.mods.length)break;P.mods.splice(view.pSel,1);P.mods.splice(j,0,m);view.pSel=j;save();render();break;
  }}
// ---- 📈 schema unifilare (generato dallo stesso modello: stessi codici Q) ----
function sldTree(P){var L=pnLayout(P),I={},chain=[],top=[],grp={};L.items.forEach(function(it){I[it.i]=it});
  L.items.forEach(function(it){var m=it.m;if(m.t==='gap'||m.t==='term')return;
    if(it.src==='feed'&&(m.t==='main'||m.t==='isol'))chain.push(it);
    else if(m.t==='rcd'){var g={it:it,kids:[]};grp[it.i]=g;top.push(g)}
    else if(m.t==='spd')top.push({it:it,kids:null});
    else if(it.head!==undefined&&grp[it.head])grp[it.head].kids.push(it);
    else top.push({it:it,kids:null})});
  return {chain:chain,top:top}}
function sldSym(m,x,y,col,closed){var h='',s='stroke="'+col+'" stroke-width="2" fill="none"',t=m.t;
  function ln(a,b,c,d){return '<path d="M'+a+' '+b+'L'+c+' '+d+'" '+s+'/>'}
  var poles=(m.p==='4P'?4:m.p==='3P'?3:(m.p==='2P'||m.p==='1P+N')?2:1);
  for(var k=0;k<poles&&poles>1;k++)h+=ln(x-5,y+8+k*4,x+5,y+4+k*4);
  if(t==='mcb'||t==='main'||t==='rcbo'||t==='rcd'||t==='isol'||t==='cont'||t==='rel'){
    h+=ln(x,y,x,y+22)+ln(x,y+46,x,y+62)+(closed?ln(x,y+22,x,y+46):ln(x+13,y+22,x,y+46));
    if(t==='mcb'||t==='main'||t==='rcbo')h+=ln(x-4,y+18,x+4,y+26)+ln(x-4,y+26,x+4,y+18);
    if(t==='isol')h+=ln(x-5,y+22,x+5,y+22);
    if(t==='cont'||t==='rel')h+='<path d="M'+(x-5)+' '+(y+22)+'A5 5 0 0 0 '+(x+5)+' '+(y+22)+'" '+s+'/>';
    if(t==='rcd'||t==='rcbo')h+='<ellipse cx="'+x+'" cy="'+(y+54)+'" rx="9" ry="4" '+s+'/><text x="'+(x-12)+'" y="'+(y+58)+'" text-anchor="end" font-size="9" font-family="Arial" fill="'+col+'">IΔ</text>'}
  else if(t==='fuse'){h+=ln(x,y,x,y+62)+'<rect x="'+(x-5)+'" y="'+(y+16)+'" width="10" height="30" '+s+'/>'}
  else if(t==='spd'){h+=ln(x,y,x,y+16)+'<rect x="'+(x-8)+'" y="'+(y+16)+'" width="16" height="28" '+s+'/>'+ln(x+5,y+20,x-5,y+40)+ln(x,y+44,x,y+56)+ln(x-9,y+56,x+9,y+56)+ln(x-6,y+60,x+6,y+60)+ln(x-3,y+64,x+3,y+64)}
  else {var lt={meter:'kWh',tmr:'T',crep:'☾',lamp:'⊗',sock:'⊐',trf:'TR'}[t]||'?';h+=ln(x,y,x,y+16)+'<rect x="'+(x-13)+'" y="'+(y+16)+'" width="26" height="28" rx="2" '+s+'/><text x="'+x+'" y="'+(y+34)+'" text-anchor="middle" font-size="'+(lt.length>2?8:11)+'" font-family="Arial" font-weight="700" fill="'+col+'">'+esc(lt)+'</text>'+ln(x,y+44,x,y+62)}
  return h}
function sldSVG(P,opt){opt=opt||{};var T=sldTree(P),CW=78,lang=opt.lang||settings.ui,t4=function(o){return TL(o,lang)};
  var E=opt.sim?sldEnergy(P):null,OFF=stS().off||{},RED='#E03131',GRY='#adb5bd';
  function ec(b){return !E?'#14213D':(b?RED:GRY)}
  function sy(it,x,y){var on=!E||!!E[it.i],g=sldSym(it.m,x,y,E?ec(on):'#14213D',E?!OFF[it.m.id]:false);return E?'<g data-act="sldt" data-v="'+it.m.id+'" style="cursor:pointer"><rect x="'+(x-20)+'" y="'+y+'" width="40" height="64" fill="#fff" fill-opacity="0"/>'+g+(OFF[it.m.id]?'<text x="'+(x-16)+'" y="'+(y+40)+'" text-anchor="end" font-family="Arial" font-size="10" font-weight="800" fill="#C92A2A">OFF</text>':'')+'</g>':g}
  var cols=0;T.top.forEach(function(g){g.w=(g.kids&&g.kids.length?g.kids.length:1);cols+=g.w});cols=Math.max(cols,2);
  var W=Math.max(520,70+cols*CW+40),x0=70,yS=46,yB=yS+40+T.chain.length*84+16,yLoad=yB+(T.top.some(function(g){return g.kids})?260:150),H=yLoad+150,col='#14213D',h='';
  h+='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" '+(opt.fh?(function(){var k=Math.min(1.3,Math.max(0.45,((window.innerHeight||800)*0.58-16)/H));return 'width="'+Math.round(W*k)+'" height="'+Math.round(H*k)+'"'})():'width="'+(opt.px?W:'100%')+'"'+(opt.px?' height="'+H+'"':''))+' style="display:block;background:#fff"><rect width="'+W+'" height="'+H+'" fill="#fff"/>';
  // sorgente
  h+='<circle cx="'+x0+'" cy="'+yS+'" r="14" fill="none" stroke="'+col+'" stroke-width="2"/><path d="M'+(x0-7)+' '+yS+'q3.5 -6 7 0t7 0" stroke="'+col+'" stroke-width="2" fill="none"/>'+
   '<text x="'+(x0+22)+'" y="'+(yS-2)+'" font-family="Arial" font-size="12" font-weight="700" fill="'+col+'">'+(P.sys==='3'?'3~ 400V + N':'1~ 230V')+'</text><text x="'+(x0+22)+'" y="'+(yS+12)+'" font-family="Arial" font-size="10.5" fill="#495057">'+esc(t4(STX.grid))+'</text>';
  var y=yS+14,upE=true;
  T.chain.forEach(function(it){h+='<path d="M'+x0+' '+y+'V'+(y+12)+'" stroke="'+ec(upE)+'" stroke-width="2"/>'+sy(it,x0,y+12)+
    '<text x="'+(x0+20)+'" y="'+(y+40)+'" font-family="Arial" font-size="12" font-weight="800" fill="#1F4FD8">Q'+it.q+'</text><text x="'+(x0+20)+'" y="'+(y+54)+'" font-family="Arial" font-size="10" fill="'+col+'">'+esc(pnSpec(it.m))+'</text>';upE=!E||!!E[it.i];y+=84});
  h+='<path d="M'+x0+' '+y+'V'+yB+'" stroke="'+ec(upE)+'" stroke-width="2"/>';
  var cx=x0,xs=[];T.top.forEach(function(g){var w=g.w*CW;g.x=cx+w/2-CW/2+ (g.w>1?0:0);g.x0=cx;cx+=w});
  var bx1=Math.max(x0,T.top.length?T.top[T.top.length-1].x0+(T.top[T.top.length-1].w-1)*CW:x0)+0;
  h+='<path d="M'+(x0-10)+' '+yB+'H'+(Math.max(bx1,x0)+10)+'" stroke="'+ec(upE)+'" stroke-width="4"/>';
  function leaf(it,x,yt,inE){var m=it.m,lb=(m.l||t4(PN.types[m.t])),me=!E||!!E[it.i];h+='<path d="M'+x+' '+yt+'V'+(yt+10)+'" stroke="'+ec(inE)+'" stroke-width="2"/>'+sy(it,x,yt+10)+
    '<text x="'+(x+16)+'" y="'+(yt+30)+'" font-family="Arial" font-size="11" font-weight="800" fill="#1F4FD8">'+(m.t==='term'?'X':'Q')+it.q+'</text>'+
    '<path d="M'+x+' '+(yt+72)+'V'+yLoad+'" stroke="'+ec(me)+'" stroke-width="'+(E&&me?3:2)+'"/>'+(m.t==='spd'?'':'<path d="M'+(x-5)+' '+(yLoad-8)+'L'+x+' '+yLoad+'L'+(x+5)+' '+(yLoad-8)+'" stroke="'+ec(me)+'" stroke-width="2" fill="none"/>')+
    '<g transform="translate('+(x+4)+','+(yLoad+8)+') rotate(90)"><text font-family="Arial" font-size="11" font-weight="700" fill="'+col+'">'+esc(lb.slice(0,22))+'</text><text y="-12" font-family="Arial" font-size="9.5" fill="#495057">'+esc(pnSpec(m).replace(/^[^·]*· /,m.ref?'':'$&'))+(m.s?' · '+esc(m.s)+'mm²':'')+(m.len?' · '+esc(String(m.len))+'m':'')+'</text></g>'}
  T.top.forEach(function(g){var x=g.x0+CW/2;
    if(g.kids){var it=g.it,kx0=g.x0+CW/2,kx1=g.x0+(g.w-1)*CW+CW/2,ge=!E||!!E[it.i];h+='<path d="M'+x+' '+yB+'V'+(yB+10)+'" stroke="'+ec(upE)+'" stroke-width="2"/>'+sy(it,x,yB+10)+
      '<text x="'+(x+16)+'" y="'+(yB+34)+'" font-family="Arial" font-size="11" font-weight="800" fill="#1F4FD8">Q'+it.q+'</text><text x="'+(x+16)+'" y="'+(yB+47)+'" font-family="Arial" font-size="9.5" fill="'+col+'">'+esc((it.m.A||40)+'A '+(it.m.mA||30)+'mA '+(it.m.rt||'A'))+'</text>'+
      '<path d="M'+x+' '+(yB+72)+'V'+(yB+96)+'" stroke="'+ec(ge)+'" stroke-width="2"/><path d="M'+(kx0-6)+' '+(yB+96)+'H'+(kx1+6)+'" stroke="'+ec(ge)+'" stroke-width="3"/>';
      if(!g.kids.length)return;g.kids.forEach(function(k,j){leaf(k,g.x0+j*CW+CW/2,yB+96,ge)})}
    else leaf(g.it,x,yB,upE)});
  // cartiglio
  var tw=300,tx=W-tw-12,ty=H-58,p=cur();
  h+='<rect x="'+tx+'" y="'+ty+'" width="'+tw+'" height="48" fill="#fff" stroke="'+col+'"/><path d="M'+tx+' '+(ty+24)+'H'+(tx+tw)+'" stroke="'+col+'"/>'+
   '<text x="'+(tx+8)+'" y="'+(ty+16)+'" font-family="Arial" font-size="11" font-weight="700" fill="'+col+'">'+esc((P.name||projTitle(p)).slice(0,34))+'</text>'+
   '<text x="'+(tx+8)+'" y="'+(ty+40)+'" font-family="Arial" font-size="10" fill="'+col+'">'+esc(t4(STX.sld))+' · '+esc(t4(STX.version))+' '+((P.meta&&P.meta.ver)||1)+' · '+stDate(P.meta&&P.meta.u)+(settings.ditta?' · '+esc(settings.ditta.slice(0,18)):'')+'</text>';
  return h+'</svg>'}
function stSld(){var P=pnl();
  return '<div class="mini" style="margin:2px 4px 8px">ⓘ '+esc(sL(STX.sldNote))+'</div><div class="stc sldc"><div class="stz" style="transform:translate('+stS().x+'px,'+stS().y+'px) scale('+stS().z+')">'+sldSVG(P,{fh:1})+'</div><div class="stzoom"><button data-act="stz" data-v="1">＋</button><button data-act="stz" data-v="-1">－</button><button data-act="stz" data-v="0">⤢</button></div></div>'+
   '<div class="pngo" style="margin-top:10px"><button class="btn ghost" data-act="stx" data-v="pdfS">📄 PDF</button><button class="btn ghost" data-act="stx" data-v="svgS">🖼 SVG</button><button class="btn ghost" data-act="stx" data-v="pngS">🖼 PNG</button></div>'}
// ---- 🔌 rete dei collegamenti (modello elettrico) + verifica ----
function pnColName(P,c,lang){var t4=function(o){return TL(o,lang)};if(c==='N')return t4(S4('أزرق','blu','blue','bleu'));if(c==='PE')return t4(S4('أصفر-أخضر','giallo-verde','green-yellow','vert-jaune'));
  if(c==='L2')return t4(S4('أسود','nero','black','noir'));if(c==='L3')return t4(S4('رمادي','grigio','grey','gris'));if(c==='L1')return t4(S4('بني','marrone','brown','marron'));
  return t4({br:S4('بني','marrone','brown','marron'),rd:S4('أحمر','rosso','red','rouge'),bk:S4('أسود','nero','black','noir')}[P.lc||'br'])}
var PNOUT={mcb:1,rcbo:1,fuse:1,cont:1,rel:1,tmr:1,crep:1,trf:1};
function pnNet(P,lang){lang=lang||settings.ui;var L=pnLayout(P),sys=P.sys,ph=pnPh(sys).concat(['N']),I={},W=[],iss=[],t4=function(o){return TL(o,lang)};
  L.items.forEach(function(it){I[it.i]=it});
  function Q(it){return (it.m.t==='term'?'X':'Q')+it.q}
  function av(src){return src==='feed'?ph:pnCond(src.m,sys)}
  function lab(src,c){return src==='feed'?t4(STX.grid)+' '+c:Q(src)+' ↓'+c}
  function A_(src){return src==='feed'?null:src.m.A}
  function issue(lv,txt){iss.push([lv,txt])}
  var mains=L.items.filter(function(it){return it.m.t==='main'||it.m.t==='isol'}),mainA=mains.length?(mains[0].m.A||0):0,prev={};
  if(!mains.length)issue(1,t4(S4('لا يوجد قاطع رئيسي في بداية اللوحة','Manca l’interruttore generale all’inizio del quadro','No main switch at the start of the panel','Pas d’interrupteur général en tête du tableau')));
  L.items.forEach(function(it){var m=it.m;if(m.t==='gap'||m.t==='term')return;var cs=pnCond(m,sys),src,kind;
    if(it.src!==undefined){src=it.src==='feed'?'feed':I[it.src];kind=src==='feed'?'feed':'jmp'}
    else{src=it.head==='feed'?'feed':I[it.head];kind=it.seg?(src==='feed'?'feed':'jmp'):'comb'}
    var a=av(src),pv=prev[it.head];
    cs.forEach(function(c){if(a.indexOf(c)<0){issue(2,Q(it)+': '+t4(S4('الطرف '+c+' بدون تغذية من المصدر','morsetto '+c+' non alimentato dalla sorgente','terminal '+c+' not supplied by the source','borne '+c+' non alimentée par la source')));return}
      var from=(kind==='comb'&&pv&&pnCond(pv.m,sys).indexOf(c)>=0)?Q(pv)+' ↑'+c:lab(src,c);
      W.push({f:from,t:Q(it)+' ↑'+c,c:c,s:pnMinSec(mainA||(src!=='feed'&&src.m.t!=='rcd'&&src.m.t!=='isol'?A_(src):0)||m.A||16),k:kind==='comb'?'kComb':kind==='feed'?'kFeed':'kJmp',q:it.q})});
    if(it.head!==undefined)prev[it.head]=it;
    if(m.t==='spd')W.push({f:Q(it)+' ⏚',t:'PE',c:'PE',s:'',k:'kPE',q:it.q});
    if(PNOUT[m.t]){var lb=m.l||t4(PN.types[m.t]);cs.forEach(function(c){W.push({f:Q(it)+' ↓'+c,t:'→ '+lb,c:c,s:m.s||'',k:'kCab',q:it.q})});if(m.t!=='trf')W.push({f:'PE',t:'→ '+lb,c:'PE',s:m.s||'',k:'kCab',q:it.q});
      if(!m.l)issue(1,Q(it)+': '+t4(S4('الدائرة بدون اسم','circuito senza nome','circuit without a name','circuit sans nom')));
      if(!m.s&&m.t!=='trf')issue(1,Q(it)+': '+t4(S4('مقطع السلك غير محدد','sezione del cavo non indicata','cable size not set','section du câble non indiquée')));
      if(pnSecLow(m))issue(2,Q(it)+': '+t4(S4('مقطع '+m.s+' مم² صغير على '+(m.cv||'C')+m.A,'sezione '+m.s+' mm² piccola per '+(m.cv||'C')+m.A,'size '+m.s+' mm² too small for '+(m.cv||'C')+m.A,'section '+m.s+' mm² trop faible pour '+(m.cv||'C')+m.A)));
      var hd=it.head!==undefined&&it.head!=='feed'?I[it.head]:null;if(m.t!=='rcbo'&&!(hd&&hd.m.t==='rcd')&&m.t!=='trf')issue(1,Q(it)+': '+t4(S4('بدون حماية تفاضلية قبلها','senza protezione differenziale a monte','no residual-current protection upstream','sans protection différentielle en amont')));
      if(mainA&&m.A&&(m.t==='mcb'||m.t==='rcbo'||m.t==='fuse')&&m.A>=mainA)issue(1,Q(it)+': '+t4(S4(m.A+'A ≥ القاطع الرئيسي '+mainA+'A (انتقائية)',m.A+'A ≥ generale '+mainA+'A (selettività)',m.A+'A ≥ main '+mainA+'A (selectivity)',m.A+'A ≥ général '+mainA+'A (sélectivité)')));
      var cr=pnCirc(P,m);if(cr){if(cr.ib>m.A)issue(2,Q(it)+': '+t4(S4('تيار الحمل '+cr.ib.toFixed(1)+'A أكبر من القاطع','corrente di impiego '+cr.ib.toFixed(1)+'A > interruttore','load current '+cr.ib.toFixed(1)+'A > breaker','courant d’emploi '+cr.ib.toFixed(1)+'A > disjoncteur')));if(cr.dvp>(P.vlim||4))issue(1,Q(it)+': '+t4(S4('هبوط الجهد ','caduta di tensione ','voltage drop ','chute de tension '))+cr.dvp.toFixed(2)+'% > '+(P.vlim||4)+'%')}}
    if(m.t==='rcd'&&mainA&&(m.A||0)<mainA)issue(1,Q(it)+': '+t4(S4('تيار التفاضلي '+m.A+'A أقل من الرئيسي '+mainA+'A','In differenziale '+m.A+'A < generale '+mainA+'A','RCCB '+m.A+'A < main '+mainA+'A','différentiel '+m.A+'A < général '+mainA+'A')));
    if(m.ref&&!m.wm)issue(0,Q(it)+': '+t4(S4('عرض القطعة غير مؤكد من المصدر (مُقدَّر في الرسم)','larghezza non confermata dalla fonte (stimata nel disegno)','width not confirmed by the source (estimated in drawing)','largeur non confirmée par la source (estimée)')))});
  (P.uw||[]).forEach(function(u){var a=pnTI(P,u.a),b=pnTI(P,u.b);if(!a||!b){issue(2,t4(S4('سلك مرسوم ينتهي دون طرف (قطعة محذوفة)','Cavo disegnato senza morsetto (modulo eliminato)','Drawn wire ends without a terminal (module deleted)','Câble tracé sans borne (module supprimé)')));return}
    if(a.c!==b.c)issue(2,t4(STX.badC)+': '+a.lab+' ↔ '+b.lab);W.push({f:a.lab,t:b.lab,c:u.c||a.c,s:u.s||'',k:'kMan',q:a.m.n})});
  W.forEach(function(w,i){w.id='W'+(i+1)});
  if(sys==='3'){var pl={L1:0,L2:0,L3:0},any=false;L.items.forEach(function(it){var m=it.m;if(!PNOUT[m.t]||!m.kw)return;any=true;var cs=pnCond(m,sys).filter(function(c){return /^L/.test(c)});cs.forEach(function(c){pl[c]+=m.kw/cs.length})});
    if(any){var mx=Math.max(pl.L1,pl.L2,pl.L3),mn=Math.min(pl.L1,pl.L2,pl.L3);if(mx>0&&(mx-mn)/mx>0.2)issue(0,t4(S4('توزيع الأحمال على الأطوار غير متوازن','carichi sulle fasi non equilibrati','phase loads not balanced','charges des phases déséquilibrées'))+': L1 '+Math.round(pl.L1)+'W · L2 '+Math.round(pl.L2)+'W · L3 '+Math.round(pl.L3)+'W')}}
  return {w:W,iss:iss}}
function stWire(){var P=pnl(),st=stS(),N=pnNet(P),err=N.iss.filter(function(x){return x[0]===2}).length;
  var lvl=!st.chk?['#868e96',sL(STX.lvl0)]:err?['#C92A2A',sL(STX.lvl2)]:['#2F9E44',sL(STX.lvl1)];
  return '<div class="stmode"><button data-act="stmod" data-v="panel"><b>👁 '+esc(sL(STX.modeV))+'</b><small>'+esc(sL(STX.modeVd))+'</small></button><button class="on"><b>⚡ '+esc(sL(STX.modeE))+'</b><small>'+esc(sL(STX.modeEd))+'</small></button></div>'+
   '<div class="stlvl" style="border-color:'+lvl[0]+';color:'+lvl[0]+'">'+esc(lvl[1])+'</div>'+
   '<button class="btn main" data-act="stchk" style="margin:8px 0">'+esc(sL(STX.check))+'</button>'+
   (st.chk?'<div class="stiss">'+(N.iss.length?N.iss.map(function(x){return '<div class="lv'+x[0]+'">'+['ⓘ','⚠️','✕'][x[0]]+' <span dir="auto">'+esc(x[1])+'</span></div>'}).join(''):'<div class="lv0">✓ '+esc(sL(STX.noIss))+'</div>')+'</div>':'')+
   '<div class="sttbl"><table><thead><tr><th>#</th><th>'+esc(sL(STX.wFrom))+'</th><th>'+esc(sL(STX.wTo))+'</th><th>'+esc(sL(STX.wC))+'</th><th>'+esc(sL(STX.wS))+'</th><th>'+esc(sL(STX.wK))+'</th></tr></thead><tbody>'+
   N.w.map(function(w){return '<tr><td>'+w.id+'</td><td dir="auto">'+esc(w.f)+'</td><td dir="auto">'+esc(w.t)+'</td><td><i class="cdot" style="background:'+pnCol(P,w.c)+(w.c==='PE'?';box-shadow:inset 0 0 0 3px #F4D31C':'')+'"></i>'+esc(w.c)+'</td><td dir="ltr">'+(w.s?esc(w.s)+' mm²':'—')+'</td><td>'+esc(sL(STX[w.k]))+'</td></tr>'}).join('')+'</tbody></table></div>'+
   '<button class="btn ghost" data-act="stx" data-v="csvW" style="width:100%;margin-top:10px">'+esc(sL(STX.csvW))+'</button>'}
// ---- 🧮 calcoli per circuito ----
function pnCirc(P,m){if(!m.kw||!(m.kw>0))return null;var tri=/^(3P|4P)$/.test(m.p),U=tri?400:230,pf=m.pf>0&&m.pf<=1?m.pf:1,ib=m.kw/((tri?Math.sqrt(3):1)*U*pf),S=parseFloat(String(m.s||'').replace(',','.'));
  var r={ib:ib,U:U,pf:pf,tri:tri,dv:null,dvp:null};if(m.len>0&&S>0){var sin=Math.sqrt(1-pf*pf);r.dv=(tri?Math.sqrt(3):2)*m.len*ib*(0.0225/S*pf+0.00008*sin);r.dvp=r.dv/U*100}return r}
function stCalc(){var P=pnl(),L=pnLayout(P),tot=0,lim=P.vlim||4,ph={L1:0,L2:0,L3:0};
  var rows=L.items.filter(function(it){return PNOUT[it.m.t]&&it.m.t!=='trf'}).map(function(it){var m=it.m,r=pnCirc(P,m);if(m.kw)tot+=+m.kw;
    if(P.sys==='3'&&m.kw){var cs=pnCond(m,P.sys).filter(function(c){return /^L/.test(c)});cs.forEach(function(c){ph[c]+=m.kw/cs.length})}
    var bad=r&&(r.ib>m.A||(r.dvp!=null&&r.dvp>lim));
    return '<div class="stcr'+(bad?' bad':'')+'"><div class="sth"><b>Q'+it.q+' <span dir="auto">'+esc(m.l||sL(PN.types[m.t]))+'</span></b><i dir="ltr">'+esc((m.cv&&m.t!=='fuse'?m.cv:'')+(m.A||'')+(m.t==='fuse'?'A':''))+' · '+(m.s?esc(m.s)+' mm²':'—')+'</i></div>'+
     '<div class="stin"><label>'+esc(sL(STX.len))+'<input inputmode="decimal" data-cl="len" data-v="'+it.i+'" value="'+(m.len||'')+'"></label><label>'+esc(sL(STX.kw))+'<input inputmode="decimal" data-cl="kw" data-v="'+it.i+'" value="'+(m.kw||'')+'"></label><label>'+esc(sL(STX.pf))+'<input inputmode="decimal" data-cl="pf" data-v="'+it.i+'" value="'+(m.pf||'')+'" placeholder="1"></label></div>'+
     (r?'<div class="stres"><span>'+esc(sL(STX.ib))+' <b dir="ltr">'+r.ib.toFixed(2)+' A</b>'+(r.ib>m.A?' ✕':'')+'</span><span>'+esc(sL(STX.dv))+' <b dir="ltr">'+(r.dv!=null?r.dv.toFixed(2)+' V · '+r.dvp.toFixed(2)+'%':'—')+'</b>'+(r.dvp!=null&&r.dvp>lim?' ⚠️':'')+'</span></div>':'')+'</div>'}).join('');
  return '<div class="mini" style="margin:2px 4px 8px">ⓘ '+esc(sL(STX.calcNote))+'</div>'+
   '<div class="stin" style="margin-bottom:8px"><label>'+esc(sL(STX.lim))+'<input inputmode="decimal" data-cl="vlim" value="'+lim+'"></label></div>'+rows+
   '<div class="stcr"><b>'+esc(sL(STX.tot))+': <span dir="ltr">'+(tot/1000).toFixed(2)+' kW</span></b>'+(P.sys==='3'?'<div class="mini" dir="ltr">L1 '+Math.round(ph.L1)+' W · L2 '+Math.round(ph.L2)+' W · L3 '+Math.round(ph.L3)+' W</div>':'')+'</div>'+
   '<details class="stf"><summary>'+esc(sL(STX.formula))+'</summary><div dir="ltr">Ib = P / (U · cosφ) &nbsp;(1~, U = 230 V)<br>Ib = P / (√3 · U · cosφ) &nbsp;(3~, U = 400 V)<br>ΔV = k · L · Ib · (ρ/S · cosφ + x · sinφ)<br>k = 2 (1~), √3 (3~) · ρ = 0.0225 Ω·mm²/m (Cu) · x = 0.08 mΩ/m<br>ΔV% = ΔV / U · 100</div><div class="mini">'+esc(sL(S4('افتراضات: نحاس، درجة حرارة التشغيل، دون تصحيح للتجميع أو طريقة التمديد. للنتيجة النهائية راجع جداول المعيار المعتمد في بلدك.','Ipotesi: rame, temperatura di esercizio, senza correzioni per raggruppamento o posa. Per il dimensionamento finale usa le tabelle della norma del tuo paese.','Assumptions: copper, operating temperature, no correction for grouping or installation method. For final sizing use your country’s standard tables.','Hypothèses : cuivre, température de service, sans correction de groupement ni de pose. Pour le dimensionnement final, utilisez les tables de la norme de votre pays.')))+'</div></details>'+
   '<button class="btn ghost" data-act="stgocalc" style="width:100%;margin-top:10px">'+esc(sL(STX.moreCalc))+'</button>'}
// ---- 📋 materiali e prezzi ----
function stBomRows(P){var M=pnMat(P);return M}
function stBom(){var P=pnl(),M=stBomRows(P),sym=curSym(),tot=0,lang=settings.ui;
  var rows=M.map(function(x){var pr=P.price[x.k],t=pr!=null&&pr!==''?pr*x.q:null;if(t!=null)tot+=t;var stl={ok:STX.stOk,est:STX.stEst,calc:STX.stCalc}[x.s];
    return '<div class="stcr"><div class="sth"><b dir="auto">'+esc(TL(x.n,lang))+'</b><span class="stst" style="background:'+({ok:'#2F9E44',est:'#E67700',calc:'#1F6FD6'}[x.s])+'">'+esc(sL(stl))+'</span></div>'+
     '<div class="stin"><label>'+esc(sL(STX.qty))+'<b dir="ltr" style="display:block;padding:8px 2px">'+fmt(x.q)+' '+esc(x.u==='m'?'m':'pz')+'</b></label><label>'+esc(sL(STX.price))+' '+esc(sym)+'<input inputmode="decimal" data-bp="'+esc(x.k)+'" value="'+(pr!=null?pr:'')+'"></label><label>Σ<b dir="ltr" style="display:block;padding:8px 2px">'+(t!=null?t.toFixed(2)+' '+esc(sym):'—')+'</b></label></div></div>'}).join('');
  return rows+'<div class="stcr"><b>Σ '+tot.toFixed(2)+' '+esc(sym)+'</b><div class="mini">ⓘ '+esc(sL(STX.field))+'</div></div>'+
   '<button class="btn main" data-act="sttoq" style="margin-top:8px">'+esc(sL(STX.toQuote))+'</button><button class="btn ghost" data-act="pnord" style="width:100%;margin-top:8px">'+esc(sL(PN.ord))+'</button><div class="pngo" style="margin-top:8px"><button class="btn ghost" data-act="stx" data-v="xlsx">'+esc(sL(XLX.xl))+'</button><button class="btn ghost" data-act="stx" data-v="csvM">'+esc(sL(STX.csvM))+'</button></div>'}
function stToQuote(){var P=pnl(),q=cur().quote,n=0;pnMat(P).forEach(function(x){var pr=P.price[x.k];if(pr==null||pr==='')return;q.lines.push({sid:null,it:x.n.it,ar:x.n.ar,fr:x.n.fr,en:x.n.en,unit:x.u==='m'?'m':'pz',price:+pr,qty:x.q});n++});
  if(!n){toast(sL(STX.noPrice));return}save();toast('✓ '+sL(STX.quoted));view.cat=null;view.tab='price';document.body.classList.remove('studio');render();window.scrollTo(0,0)}
// ---- 📝 rapporto di consegna ----
function stRep(){var P=pnl(),R=P.rep;
  function fld(k,lab,type){return '<div class="field"><label>'+esc(sL(lab))+'</label><input '+(type?'type="'+type+'" ':'dir="auto" ')+'data-rf="'+k+'" value="'+esc(R[k]||(k==='tech'?settings.tecnico||'':''))+'"></div>'}
  return fld('tech',STX.tech)+fld('dd',STX.dDate,'date')+fld('nd',STX.nDate,'date')+
   '<div class="field"><label>'+esc(sL(STX.works))+'</label><textarea dir="auto" rows="3" data-rf="works">'+esc(R.works||'')+'</textarea></div>'+
   '<div class="h2" style="margin-top:14px"><b>'+esc(sL(STX.checks))+'</b></div><div class="mini">ⓘ '+esc(sL(STX.repNote))+'</div>'+
   STCHK.map(function(c){var v=R.chk[c[0]]||{};return '<div class="stcr"><b dir="auto">'+esc(sL(c[1]))+'</b><div class="chips" style="margin-top:6px">'+[['',STX.nt],['ok',STX.pass],['ko',STX.fail]].map(function(o){return '<button class="chip'+((v.r||'')===o[0]?' on':'')+'" data-act="strc" data-k="'+c[0]+'" data-v="'+o[0]+'">'+esc(sL(o[1]))+'</button>'}).join('')+'</div>'+
     '<input class="stv" dir="auto" data-rv="'+c[0]+'" placeholder="'+esc(sL(STX.val))+'" value="'+esc(v.v||'')+'"></div>'}).join('')+
   '<div class="field"><label>'+esc(sL(STX.notes))+'</label><textarea dir="auto" rows="3" data-rf="notes">'+esc(R.notes||'')+'</textarea></div>'+
   '<button class="btn main" data-act="stx" data-v="pdfR" style="margin-top:12px">'+esc(sL(STX.pdfR))+'</button>'}
// ---- documenti / esportazioni ----
function svgImg(svg){return 'data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(svg)))}
function stDoc(lang,title,inner,extraCss){var rtl=lang==='ar';
  return '<!doctype html><html dir="'+(rtl?'rtl':'ltr')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=794"><style>'+DOC_CSS+'.pimg{display:block;width:100%;height:auto;margin:6px 0 4px}.r{grid-template-columns:44px 1fr 170px 80px}.n{font-weight:800}'+(extraCss||'')+'</style></head><body>'+wmImg()+'<div class="wrap"><div class="pad"></div>'+
   inner+docFoot(lang,'')+'<div class="pad"></div></div><script>'+PAGINATE+'<\/script></body></html>'}
function stBox(P,lang){var t4=function(o){return TL(o,lang)},s=cur().site||{};return [[DL(lang,'client'),s.cliente||'—'],[t4(PN.sys),P.sys==='3'?t4(PN.tri):t4(PN.mono)],[t4(STX.version),String(P.meta.ver||1)],['📅',stDate()]]}
function stCircRows(P,lang){var t4=function(o){return TL(o,lang)};return pnLayout(P).items.filter(function(it){return it.m.t!=='gap'}).map(function(it,n){var m=it.m;return '<div class="blk r'+(n%2?' alt':'')+'"><div class="n">'+(m.t==='term'?'X':'Q')+it.q+'</div><div class="d"><b dir="auto">'+esc(m.l||t4(PN.types[m.t]))+'</b></div><div class="s" dir="ltr">'+esc(pnSpec(m))+'</div><div class="q" dir="ltr">'+(m.s?esc(m.s)+' mm²':'—')+'</div></div>'}).join('')}
function stSldDoc(P,lang){var t4=function(o){return TL(o,lang)};return stDoc(lang,'',docHead(lang,'📈 '+esc(t4(STX.sld))+(P.name?' — '+esc(P.name):''),stBox(P,lang))+'<div class="blk"><img class="pimg" src="'+svgImg(sldSVG(P,{px:1,lang:lang}))+'" alt=""></div><div class="blk cat">'+esc(t4(PN.legend))+'</div>'+stCircRows(P,lang))}
function stRepDoc(P,lang){var t4=function(o){return TL(o,lang)},R=P.rep,M=pnMat(P);
  var chk=STCHK.map(function(c,n){var v=R.chk[c[0]]||{},r=v.r==='ok'?'✓ '+t4(STX.pass):v.r==='ko'?'✕ '+t4(STX.fail):'— '+t4(STX.nt);return '<div class="blk r'+(n%2?' alt':'')+'"><div class="n">'+(n+1)+'</div><div class="d"><b dir="auto">'+esc(t4(c[1]))+'</b></div><div class="s" dir="auto">'+esc(r)+'</div><div class="q" dir="auto">'+esc(v.r?v.v||'':'')+'</div></div>'}).join('');
  var bom=M.map(function(x,n){return '<div class="blk r'+(n%2?' alt':'')+'"><div class="n">'+(n+1)+'</div><div class="d"><b dir="auto">'+esc(TL(x.n,lang))+'</b></div><div class="s" dir="auto">'+esc(t4({ok:STX.stOk,est:STX.stEst,calc:STX.stCalc}[x.s]))+'</div><div class="q" dir="ltr">'+fmt(x.q)+' '+(x.u==='m'?'m':'pz')+'</div></div>'}).join('');
  var sum=[[t4(STX.tech),R.tech||settings.tecnico||'—'],[t4(STX.dDate),R.dd||'—'],[t4(STX.nDate),R.nd||'—'],[t4(STX.status),t4(STX[P.meta.st]||STX.draft)]];
  return stDoc(lang,'',docHead(lang,'📝 '+esc(t4(STX.rep))+(P.name?' — '+esc(P.name):''),stBox(P,lang))+
   '<div class="blk cat">'+esc(t4(STX.summary))+'</div><div class="blk box" style="margin:6px 0">'+sum.map(function(r){return '<div class="kv"><span>'+esc(r[0])+':</span> <b dir="auto">'+esc(r[1])+'</b></div>'}).join('')+(R.works?'<div dir="auto" style="margin-top:6px;white-space:pre-wrap">'+esc(R.works)+'</div>':'')+'</div>'+
   '<div class="blk"><img class="pimg" src="'+svgImg(pnSVG(P,{px:1,lang:lang,lbl:1}))+'" alt=""></div>'+
   '<div class="blk"><img class="pimg" src="'+svgImg(sldSVG(P,{px:1,lang:lang}))+'" alt=""></div>'+
   (P.plan&&P.plan.els&&P.plan.els.length?'<div class="blk"><img class="pimg" src="'+svgImg(plSVG(P,{px:1,lang:lang}))+'" alt=""></div>':'')+
   '<div class="blk cat">'+esc(t4(PN.legend))+'</div>'+stCircRows(P,lang)+
   '<div class="blk cat">'+esc(t4(STX.bom))+'</div>'+bom+
   '<div class="blk cat">'+esc(t4(STX.checks))+'</div>'+chk+
   (R.notes?'<div class="blk box" style="margin-top:8px"><b>'+esc(t4(STX.notes))+':</b><div dir="auto" style="white-space:pre-wrap">'+esc(R.notes)+'</div></div>':'')+
   '<div class="blk" style="font-size:11px;color:#646A80;margin-top:10px">ⓘ '+esc(t4(STX.repNote))+' '+esc(t4(PN.note))+'</div>')}
function stFname(P,base,ext){return base+(P.name?'_'+P.name.replace(/[^\w؀-ۿ -]+/g,'').trim().replace(/\s+/g,'_'):'')+'_v'+(P.meta.ver||1)+'.'+ext}
function stShareTxt(name,txt,mime){if(A&&A.shareFile)A.shareFile(name,txt,mime);else fileReadySheet(new File([txt],name,{type:mime}))}
function stPdf(html,name){if(A&&A.pdf){toast(T('pdfWait'));A.pdf(html,name)}else webPdfHtml(html,name)}
function stPng(svg,name){if(A){toast(sL(STX.pngWeb));return}var im=new Image();im.onload=function(){var c=document.createElement('canvas');c.width=im.width*2;c.height=im.height*2;var g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);g.drawImage(im,0,0,c.width,c.height);c.toBlob(function(b){fileReadySheet(new File([b],name,{type:'image/png'}))},'image/png')};im.src=svgImg(svg)}
function csvCell(v){v=String(v==null?'':v);return /[";\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
function stExport(k){var P=pnl();if(!P)return;var lang=settings.out==='both'?'it':settings.out,ar=settings.out==='ar';
  switch(k){
   case 'pdfP':pnPdf();break;
   case 'pdfS':stPdf(stSldDoc(P,lang),stFname(P,ar?'مخطط_أحادي':'Schema_unifilare','pdf'));break;
   case 'pdfR':stPdf(stRepDoc(P,lang),stFname(P,ar?'تقرير_تسليم':'Rapporto_consegna','pdf'));break;
   case 'svgP':stShareTxt(stFname(P,'Quadro','svg'),pnSVG(P,{px:1,lang:lang,lbl:P.vw.lbl,nw:!P.vw.wires}),'image/svg+xml');break;
   case 'svgS':stShareTxt(stFname(P,'Unifilare','svg'),sldSVG(P,{px:1,lang:lang}),'image/svg+xml');break;
   case 'pngP':stPng(pnSVG(P,{px:1,lang:lang,lbl:P.vw.lbl,nw:!P.vw.wires}),stFname(P,'Quadro','png'));break;
   case 'pngS':stPng(sldSVG(P,{px:1,lang:lang}),stFname(P,'Unifilare','png'));break;
   case 'pdfM':stPdf(stDoc(lang,'',docHead(lang,'📐 '+esc((TL(MLX.multi,lang)))+(P.name?' — '+esc(P.name):''),stBox(P,lang))+'<div class="blk"><img class="pimg" src="'+svgImg(mlSVG(P,{px:1,lang:lang}))+'" alt=""></div><div class="blk cat">'+esc(TL(MLX.cab,lang))+'</div>'+pnCables(P,lang).map(function(c,n){return '<div class="blk r'+(n%2?' alt':'')+'"><div class="n">'+c.id+'</div><div class="d"><b dir="auto">'+esc(c.from+' → '+c.to)+'</b></div><div class="s" dir="ltr">'+esc(c.txt)+(c.s?' mm²':'')+'</div><div class="q" dir="ltr">'+(c.len?c.len+' m':'—')+'</div></div>'}).join('')),stFname(P,ar?'متعدد_الخطوط':'Schema_multifilare','pdf'));break;
   case 'xlsx':stXlsx(P);break;
   case 'pdfL':{var pc={};(P.plan?P.plan.els:[]).forEach(function(e){if(e.t==='sym')pc[e.k]=(pc[e.k]||0)+1});stPdf(stDoc(lang,'',docHead(lang,'📐 '+esc(TL(PLX.plan,lang))+(P.name?' — '+esc(P.name):''),stBox(P,lang))+'<div class="blk"><img class="pimg" src="'+svgImg(plSVG(P,{px:1,lang:lang}))+'" alt=""></div><div class="blk cat">'+esc(TL(PLX.count,lang))+'</div>'+Object.keys(pc).map(function(k,n){return '<div class="blk r'+(n%2?' alt':'')+'"><div class="n">'+(n+1)+'</div><div class="d"><b dir="auto">'+esc(TL(PLSYMBY[k][1],lang))+'</b></div><div class="s"></div><div class="q" dir="ltr">'+pc[k]+'</div></div>'}).join('')),stFname(P,ar?'مخطط_المنزل':'Pianta_impianto','pdf'));break}
   case 'svgL':stShareTxt(stFname(P,'Pianta','svg'),plSVG(P,{px:1,lang:lang}),'image/svg+xml');break;
   case 'dxfL':stShareTxt(stFname(P,'Pianta','dxf'),plDXF(P),'application/dxf');break;
   case 'svgM':stShareTxt(stFname(P,'Multifilare','svg'),mlSVG(P,{px:1,lang:lang}),'image/svg+xml');break;
   case 'pngM':stPng(mlSVG(P,{px:1,lang:lang}),stFname(P,'Multifilare','png'));break;
   case 'csvT':{var c3='\ufeff'+['Device','Terminal','Conductor','Wire'].join(';')+'\n';pnTerms(P,lang).forEach(function(r){c3+=[r.d,r.t,r.c,r.w].map(csvCell).join(';')+'\n'});stShareTxt(stFname(P,'Morsetti','csv'),c3,'text/csv');break}
   case 'csvC':{var c4='\ufeff'+['Cable','From','To','Conductors','Size mm2','Length m'].join(';')+'\n';pnCables(P,lang).forEach(function(r){c4+=[r.id,r.from,r.to,r.n,r.s,r.len].map(csvCell).join(';')+'\n'});stShareTxt(stFname(P,'Cavi','csv'),c4,'text/csv');break}
   case 'csvM':{var sym=curSym(),c='﻿'+['#','Item','Qty','Unit','Price '+sym,'Total '+sym,'Status'].join(';')+'\n';pnMat(P).forEach(function(x,i){var pr=P.price[x.k];c+=[i+1,TL(x.n,lang),fmt(x.q),x.u==='m'?'m':'pz',pr!=null?pr:'',pr!=null&&pr!==''?(pr*x.q).toFixed(2):'',x.s].map(csvCell).join(';')+'\n'});stShareTxt(stFname(P,'Materiali','csv'),c,'text/csv');break}
   case 'csvW':{var N=pnNet(P,lang),c2='﻿'+['ID','From','To','Conductor','Colour','Size mm2','Type','Circuit'].join(';')+'\n';N.w.forEach(function(w){c2+=[w.id,w.f,w.t,w.c,pnColName(P,w.c,lang),w.s,(TL(STX[w.k],lang)),'Q'+w.q].map(csvCell).join(';')+'\n'});stShareTxt(stFname(P,'Cablaggio','csv'),c2,'text/csv');break}
   case 'file':{var p=cur(),o={app:'SiteNeeds',kind:'panel-project',format:1,saved:new Date().toISOString(),project:{name:p.name||'',site:p.site||{},panel:P}};stShareTxt(stFname(P,'SiteNeeds_quadro','json'),JSON.stringify(o,null,1),'application/json');break}
  }}
function stImport(){var inp=document.createElement('input');inp.type='file';inp.accept='.json,application/json';inp.onchange=function(){var f=inp.files&&inp.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){try{var o=JSON.parse(rd.result);if(!o||o.kind!=='panel-project'||!o.project||!o.project.panel||!Array.isArray(o.project.panel.mods))throw 0;
    var np=blankProj();np.name=o.project.name||'';np.site=Object.assign(np.site,o.project.site||{});np.panel=pnMig(o.project.panel);P.list.unshift(np);P.cur=np.id;save();stS().mod='panel';view.pSel=null;toast('✓ '+sL(STX.impOk));render()}catch(e){toast('⚠️ '+sL(STX.impBad))}};rd.readAsText(f)};inp.click()}
function stExpSheet(){var P=pnl(),web=!A;
  var b=function(k,lab){return '<button class="btn ghost" data-sx="'+k+'">'+esc(sL(lab))+'</button>'};
  openSheet('<h2>⤓ '+esc(sL(STX.exp))+'</h2><div class="pnadd">'+b('pdfP',STX.pdfP)+b('pdfS',STX.pdfS)+b('pdfR',STX.pdfR)+b('svgP',STX.svgP)+b('svgS',STX.svgS)+b('pdfM',MLX.pdfM)+(web?b('pngP',STX.png):'')+b('xlsx',XLX.xl)+b('csvM',STX.csvM)+b('csvW',STX.csvW)+b('csvT',MLX.csvT)+b('csvC',MLX.csvC)+(P.plan&&P.plan.els.length?b('pdfL',S4('📄 PDF المخطط','📄 PDF pianta','📄 Floor plan PDF','📄 PDF plan'))+b('dxfL',S4('📐 DXF المخطط','📐 DXF pianta','📐 Floor plan DXF','📐 DXF plan')):'')+b('file',STX.file)+'</div>'+
   '<div class="h2" style="margin:14px 2px 6px"><b>'+esc(sL(STX.vers))+'</b></div><button class="btn main" id="stVer">'+esc(sL(STX.ver))+'</button>'+
   (P.vers&&P.vers.length?'<div class="pnlist" style="margin-top:8px">'+P.vers.slice().reverse().map(function(v,i){var j=P.vers.length-1-i;return '<div class="pnrow" style="grid-template-columns:1fr auto"><span>v'+v.ver+' · '+stDate(v.t)+' '+stTime(v.t)+' · '+v.mods.filter(function(m){return m.t!=='gap'}).length+' Q</span><button class="chip" data-vr="'+j+'">'+esc(sL(STX.restore))+'</button></div>'}).join('')+'</div>':''));
  sheet.querySelectorAll('[data-sx]').forEach(function(x){x.onclick=function(){closeSheet();stExport(x.dataset.sx)}});
  $('#stVer').onclick=function(){if(!P.vers)P.vers=[];P.vers.push({t:Date.now(),ver:P.meta.ver||1,mods:JSON.parse(JSON.stringify(P.mods)),sys:P.sys,row:P.row,lc:P.lc});if(P.vers.length>10)P.vers.shift();P.meta.ver=(P.meta.ver||1)+1;save();toast('✓ '+sL(STX.verOk));stExpSheet();render()};
  sheet.querySelectorAll('[data-vr]').forEach(function(x){x.onclick=function(){var v=P.vers[+x.dataset.vr];if(!v||!confirm(sL(PN.sure)))return;P.mods=JSON.parse(JSON.stringify(v.mods));P.sys=v.sys;P.row=v.row;P.lc=v.lc;pnMig(P);save();closeSheet();view.pSel=null;render()}})}
// input dello studio (calcoli, prezzi, rapporto, ricerca progetti)
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-lk]');if(!b||!b.closest('.stu'))return;var c=ltCur();if(!c)return;var k=b.dataset.lk,v=b.dataset.lv;c[k]=k==='q'?(v||null):+v;if(k==='pts'||k==='lamps'){c.st={brk:c.st&&c.st.brk===0?0:1}}save();var y=window.scrollY;render();window.scrollTo(0,y)});
document.addEventListener('input',function(e){var t=e.target;if(!t||!t.closest||!t.closest('.stu'))return;var P_=pnl();
  if(t.dataset.ln){var lc=ltCur();if(lc){lc.name=t.value;save()}return}
  if(t.id==='stQ'){stS().q=t.value;var l=$('#stList');if(l)l.innerHTML=stHomeList();return}
  if(!P_)return;
  if(t.dataset.rf){P_.rep[t.dataset.rf]=t.value;P_.meta.u=Date.now();save();return}
  if(t.dataset.rv){var c=P_.rep.chk[t.dataset.rv]||(P_.rep.chk[t.dataset.rv]={});c.v=t.value;save();return}});
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.closest||!t.closest('.stu'))return;var P_=pnl();if(!P_)return;
  if(t.dataset.cl){var v=num(t.value);if(t.dataset.cl==='vlim'){P_.vlim=v>0?v:4}else{var m=P_.mods[+t.dataset.v];if(!m)return;var k=t.dataset.cl;if(v>0)m[k]=k==='pf'?Math.min(1,v):v;else delete m[k]}save();stRerender();return}
  if(t.dataset.bp){var pv=t.value.trim();if(pv==='')delete P_.price[t.dataset.bp];else P_.price[t.dataset.bp]=num(pv);save();stRerender()}});
document.addEventListener('click',function(e){var s_=view.st;if(!s_||!s_.wt||!s_.wd||view.cat!=='__panel')return;var t=e.target;if(!t.closest||t.closest('[data-act="pnterm"]')||t.closest('.stzoom'))return;var sv=t.closest('.stc .stz svg');if(!sv)return;
  var r=sv.getBoundingClientRect(),vb=sv.viewBox.baseVal,x=Math.round((e.clientX-r.left)*vb.width/r.width/6)*6,y=Math.round((e.clientY-r.top)*vb.height/r.height/6)*6;s_.wd.pts.push([x,y]);render()});
var stRT=null;function stRerender(){if(stRT)return;stRT=setTimeout(function(){stRT=null;var y=window.scrollY,ae=document.activeElement,key=ae&&ae.dataset?(ae.dataset.cl?'[data-cl="'+ae.dataset.cl+'"]'+(ae.dataset.v?'[data-v="'+ae.dataset.v+'"]':''):ae.dataset.bp?'[data-bp="'+ae.dataset.bp+'"]':''):'';render();window.scrollTo(0,y);if(key){var el=document.querySelector(key);if(el)try{el.focus({preventScroll:true})}catch(e){}}},0)}

// ======================= 💡 circuiti di illuminazione (modelli modificabili + simulazione logica) =======================
var LTX={lt:S4('الإنارة','Luci','Lighting','Éclairage'),add:S4('➕ دائرة إنارة','➕ Circuito luci','➕ Lighting circuit','➕ Circuit éclairage'),
 none:S4('اختر نموذجاً جاهزاً: يضع التطبيق الأجهزة والتوصيلات الحقيقية، ثم تجرّب المفاتيح.','Scegli un modello: l’app inserisce apparecchi e collegamenti reali, poi provi gli interruttori.','Pick a template: the app inserts the devices and real connections, then you try the switches.','Choisissez un modèle : l’app place les appareils et les vraies connexions, puis vous testez.'),
 lamps:S4('المصابيح','Lampade','Lamps','Lampes'),pts:S4('أماكن التحكم','Punti di comando','Control points','Points de commande'),btns:S4('الأزرار','Pulsanti','Push-buttons','Boutons'),
 link:S4('الدائرة في اللوحة','Circuito nel quadro','Panel circuit','Circuit du tableau'),nolink:S4('غير مربوطة','Non collegato','Not linked','Non lié'),
 sim:S4('المحاكاة','Simulazione','Simulation','Simulation'),simHint:S4('اضغط على المفاتيح والأزرار والقاطع في الرسم لتجربة الدائرة.','Tocca interruttori, pulsanti e interruttore del quadro nel disegno per provare il circuito.','Tap the switches, push-buttons and breaker in the drawing to try the circuit.','Touchez interrupteurs, boutons et disjoncteur pour tester le circuit.'),
 lvl:S4('✓ محاكاة منطقية منفذة فعلاً على توصيلات هذه الدائرة. لا تثبت أن التركيب الحقيقي آمن أو مطابق.','✓ Simulazione logica eseguita davvero sui collegamenti di questo circuito. Non dimostra che l’impianto reale sia sicuro o conforme.','✓ Logic simulation actually run on this circuit’s connections. It does not prove the real installation is safe or compliant.','✓ Simulation logique réellement exécutée sur les connexions. Ne prouve pas que l’installation réelle est sûre ou conforme.'),
 short:S4('✕ قصر بين الطور والنوتر! القاطع يفصل.','✕ Cortocircuito fase-neutro! L’interruttore scatta.','✕ Phase-neutral short circuit! The breaker trips.','✕ Court-circuit phase-neutre ! Le disjoncteur déclenche.'),
 on:S4('مضاء','Accese','On','Allumées'),devs:S4('الأجهزة','Apparecchi','Devices','Appareils'),conns:S4('التوصيلات','Collegamenti','Connections','Connexions'),
 notes:S4('ملاحظات التركيب','Note di installazione','Installation notes','Notes d’installation'),ref:S4('المرجع','Riferimento','Reference','Référence'),
 review:S4('يجب أن يراجع كهربائي مؤهل كل مخطط قبل اعتماده للتركيب.','Ogni schema va verificato da un tecnico abilitato prima di usarlo per l’installazione.','Every diagram must be reviewed by a qualified electrician before using it for installation.','Chaque schéma doit être vérifié par un électricien qualifié avant installation.'),
 box:S4('علبة التوصيل','Scatola di derivazione','Junction box','Boîte de dérivation'),del:S4('🗑 حذف الدائرة','🗑 Elimina circuito','🗑 Delete circuit','🗑 Supprimer le circuit'),
 sure:S4('حذف هذه الدائرة؟','Eliminare questo circuito?','Delete this circuit?','Supprimer ce circuit ?'),name:S4('الاسم','Nome','Name','Nom'),
 back:S4('كل دوائر الإنارة','Tutti i circuiti luci','All lighting circuits','Tous les circuits')};
var LTPL=[['one',S4('مفتاح واحد ومصباح','Interruttore e lampada','One switch, one lamp','Simple allumage'),S4('أبسط دائرة: مفتاح يقطع الطور.','Il circuito più semplice: l’interruttore interrompe la fase.','Simplest circuit: the switch breaks the phase.','Le plus simple : l’interrupteur coupe la phase.')],
 ['multi',S4('مفتاح واحد وعدة مصابيح','Un interruttore, più lampade','One switch, several lamps','Un interrupteur, plusieurs lampes'),S4('المصابيح على التوازي على نفس سلك الرجوع.','Lampade in parallelo sullo stesso ritorno.','Lamps in parallel on the same switched return.','Lampes en parallèle sur le même retour.')],
 ['two',S4('التحكم من مكانين (Deviatori)','Comando da due punti (deviatori)','Two-way switching','Va-et-vient'),S4('مفتاحان تبادليان وسلكا تبادل بينهما.','Due deviatori collegati da due fili di scambio.','Two two-way switches linked by two travellers.','Deux va-et-vient reliés par deux navettes.')],
 ['inter',S4('التحكم من 3 أماكن أو أكثر','Comando da 3 o più punti','Control from 3+ points','Commande de 3 points ou plus'),S4('تبادليان في الطرفين ومفتاح عاكس (Invertitore) بينهما.','Deviatori alle estremità e invertitori in mezzo.','Two-way switches at the ends, intermediate switches between.','Va-et-vient aux extrémités, permutateurs entre.')],
 ['relay',S4('ريليه خطوة بخطوة وأزرار','Relè passo-passo con pulsanti','Impulse relay with push-buttons','Télérupteur et boutons-poussoirs'),S4('كل ضغطة على أي زر تقلب حالة الريليه.','Ogni pressione su un pulsante commuta il relè.','Each press on any button toggles the relay.','Chaque appui bascule le télérupteur.')],
 ['sensor',S4('حساس حركة','Sensore di movimento','Motion sensor','Détecteur de mouvement'),S4('الحساس يشغّل المصابيح عند وجود حركة.','Il sensore accende le lampade quando rileva movimento.','The sensor switches the lamps on when it detects motion.','Le détecteur allume à la détection de mouvement.')],
 ['auto',S4('تحكم آلي بالضوء (Crepuscolare)','Comando automatico crepuscolare','Automatic twilight control','Commande crépusculaire'),S4('المفتاح الضوئي يشغّل الإنارة عند الظلام.','L’interruttore crepuscolare accende al buio.','The twilight switch turns lights on when dark.','L’interrupteur crépusculaire allume à la nuit tombée.')]];
var LTPLBY={};LTPL.forEach(function(t){LTPLBY[t[0]]=t});
var LTNOTE={one:S4('الطور (بني) يمر عبر المفتاح، والنوتر (أزرق) والأرضي يذهبان مباشرة إلى المصباح.','La fase passa dall’interruttore; neutro e terra vanno direttamente alla lampada.','The phase goes through the switch; neutral and earth go straight to the lamp.','La phase passe par l’interrupteur ; neutre et terre vont directement à la lampe.'),
 two:S4('الطور إلى المشترك (C) في المفتاح الأول، والرجوع من المشترك (C) في المفتاح الثاني.','Fase al comune (C) del primo deviatore; ritorno dal comune del secondo.','Phase to the common (C) of the first switch; return from the common of the second.','Phase au commun (C) du premier ; retour depuis le commun du second.'),
 inter:S4('سلكا التبادل يمران عبر كل مفتاح عاكس: 1-2 دخول و3-4 خروج.','I fili di scambio passano da ogni invertitore: 1-2 ingresso, 3-4 uscita.','The travellers pass through each intermediate switch: 1-2 in, 3-4 out.','Les navettes passent par chaque permutateur : 1-2 entrée, 3-4 sortie.'),
 relay:S4('الأزرار تغذي ملف الريليه (A1-A2)، والتلامس 1-2 يغذي المصابيح.','I pulsanti alimentano la bobina (A1-A2); il contatto 1-2 alimenta le lampade.','The push-buttons feed the coil (A1-A2); contact 1-2 feeds the lamps.','Les boutons alimentent la bobine (A1-A2) ; le contact 1-2 alimente les lampes.'),
 sensor:S4('الحساس يحتاج نوتر لتغذيته، ومخرجه (L′) يغذي المصابيح.','Il sensore richiede il neutro per alimentarsi; l’uscita L′ alimenta le lampade.','The sensor needs the neutral for its supply; output L′ feeds the lamps.','Le détecteur a besoin du neutre ; la sortie L′ alimente les lampes.'),
 auto:S4('ضع حساس الضوء في الخارج بعيداً عن المصابيح.','Posiziona la sonda all’esterno, lontano dalle lampade.','Place the light probe outdoors, away from the lamps.','Placez la sonde à l’extérieur, loin des lampes.')};
LTNOTE.multi=LTNOTE.one;
var LTCOL={L:'#7B4A22',N:'#1F6FD6',PE:'#2E9E48',R:'#6c757d',T:'#212529',P:'#9c36b5'};
function ltList(){var P_=pnl();return P_?(P_.lts||(P_.lts=[])):[]}
function ltNew(tpl){var P_=pnl();if(!P_){P_=cur().panel=pnMig({v:1,sys:'1',row:12,lc:packId()==='IT'?'br':'rd',name:'',mods:[]})}if(!P_.lts)P_.lts=[];
  var c={id:pnUid(),tpl:tpl,name:sL(LTPLBY[tpl][1]),lamps:tpl==='multi'?3:tpl==='one'?1:2,pts:tpl==='inter'?3:tpl==='two'?2:tpl==='relay'?3:1,q:null,st:{brk:1}};
  var outs=P_.mods.filter(function(m){return PNOUT[m.t]&&m.k==='luci'});if(outs.length)c.q=outs[0].id;P_.lts.push(c);save();return c}
// --- costruzione: apparecchi, morsetti nella scatola, collegamenti (modello elettrico) ---
function ltBuild(c){var P_=pnl(),q=c.q&&P_?P_.mods.find(function(m){return m.id===c.q}):null;
  var dev=[],clamps=[],W=[],t=c.tpl,nl=Math.max(1,Math.min(8,c.lamps||1)),np=c.pts||1;
  function D(id,k,row,lab,terms){var d={id:id,k:k,row:row,lab:lab,terms:terms};dev.push(d);return d}
  function C(id,cond){clamps.push({id:id,c:cond})}
  function w(a,b,cond){W.push({a:a,b:b,c:cond})}
  D('src','src','b',q?('Q'+q.n+' '+(q.cv||'C')+(q.A||10)):'Q',['L','N','PE']);
  C('L','L');C('N','N');C('PE','PE');C('R','R');
  w('src.L','box.L','L');w('src.N','box.N','N');w('src.PE','box.PE','PE');
  if(t==='one'||t==='multi'){D('s1','sw','b','S1',['L','1']);w('s1.L','box.L','L');w('s1.1','box.R','R')}
  else if(t==='two'||t==='inter'){var n=t==='two'?2:Math.max(3,Math.min(6,np));
    for(var k=0;k<n-1;k++){C('T'+k+'a','T');C('T'+k+'b','T')}
    for(k=0;k<n;k++){var first=k===0,last=k===n-1;
      if(first||last){D('s'+(k+1),'dev','b','S'+(k+1),['C','1','2']);var tp=first?0:n-2;w('s'+(k+1)+'.1','box.T'+tp+'a','T');w('s'+(k+1)+'.2','box.T'+tp+'b','T');w('s'+(k+1)+'.C',first?'box.L':'box.R',first?'L':'R')}
      else{D('s'+(k+1),'inv','b','S'+(k+1),['1','2','3','4']);w('s'+(k+1)+'.1','box.T'+(k-1)+'a','T');w('s'+(k+1)+'.2','box.T'+(k-1)+'b','T');w('s'+(k+1)+'.3','box.T'+k+'a','T');w('s'+(k+1)+'.4','box.T'+k+'b','T')}}}
  else if(t==='relay'){C('P','P');D('k1','rel','b','K1',['A1','A2','1','2']);w('k1.A1','box.P','P');w('k1.A2','box.N','N');w('k1.1','box.L','L');w('k1.2','box.R','R');
    for(var b=0;b<Math.max(1,Math.min(6,np));b++){D('p'+(b+1),'pb','b','P'+(b+1),['1','2']);w('p'+(b+1)+'.1','box.L','L');w('p'+(b+1)+'.2','box.P','P')}}
  else if(t==='sensor'){D('m1','pir','t','M1',['L','N','L′']);w('m1.L','box.L','L');w('m1.N','box.N','N');w('m1.L′','box.R','R')}
  else if(t==='auto'){D('c1','crep','b','LUX',['L','N','L′']);w('c1.L','box.L','L');w('c1.N','box.N','N');w('c1.L′','box.R','R')}
  for(var i=0;i<nl;i++){D('h'+(i+1),'lamp','t','H'+(i+1),['L','N','PE']);w('h'+(i+1)+'.L','box.R','R');w('h'+(i+1)+'.N','box.N','N');w('h'+(i+1)+'.PE','box.PE','PE')}
  // ordina i morsetti: PE, N, L, scambi, P, R
  var ord=['PE','N','L','T','P','R'];clamps.sort(function(a,b){return ord.indexOf(a.c)-ord.indexOf(b.c)});
  return {dev:dev,clamps:clamps,w:W,q:q}}
// --- simulazione logica (union-find sui morsetti) ---
function ltSim(c,B,press){var par={};function f(x){if(par[x]===undefined)par[x]=x;while(par[x]!==x){par[x]=par[par[x]];x=par[x]}return x}function u(a,b){par[f(a)]=f(b)}
  B.w.forEach(function(x){u(x.a,x.b)});var st=c.st||{};
  B.dev.forEach(function(d){var s=st[d.id];
    if(d.k==='sw'&&s)u(d.id+'.L',d.id+'.1');
    if(d.k==='dev')u(d.id+'.C',d.id+'.'+(s?'2':'1'));
    if(d.k==='inv'){if(s){u(d.id+'.1',d.id+'.4');u(d.id+'.2',d.id+'.3')}else{u(d.id+'.1',d.id+'.3');u(d.id+'.2',d.id+'.4')}}
    if(d.k==='pb'&&press===d.id)u(d.id+'.1',d.id+'.2');
    if(d.k==='rel'&&st.k1on)u(d.id+'.1',d.id+'.2');
    if((d.k==='pir'||d.k==='crep')&&s)u(d.id+'.L',d.id+'.L′')});
  var live=st.brk!==0,L=f('src.L'),N=f('src.N'),short=live&&L===N,res={short:short,lamp:{},live:{},coil:false};
  if(live&&!short){B.dev.forEach(function(d){if(d.k==='lamp')res.lamp[d.id]=f(d.id+'.L')===L&&f(d.id+'.N')===N});res.coil=f('k1.A1')===L&&f('k1.A2')===N;
    Object.keys(par).forEach(function(x){if(f(x)===L)res.live[x]=1})}
  return res}
function ltPress(c,pid){var B=ltBuild(c),r=ltSim(c,B,pid);if(r.coil){c.st.k1on=!c.st.k1on}save()}
// --- disegno ---
function ltSVG(c,opt){opt=opt||{};var B=ltBuild(c),R=ltSim(c,B),lang=opt.lang||settings.ui,t4=function(o){return TL(o,lang)};
  var top=B.dev.filter(function(d){return d.row==='t'}),bot=B.dev.filter(function(d){return d.row==='b'});
  var CW=58,DW=96,DH=70,LW=78,LH=64,nC=B.clamps.length,boxW=Math.max(nC*CW+40,300);
  var wT=0,wB=0;B.w.forEach(function(w){var d=B.dev.find(function(x){return x.id===w.a.split('.')[0]});w.side=d&&d.row==='t'?'t':'b';if(w.side==='t')w.lane=wT++;else w.lane=wB++});
  var W_=Math.max(boxW+120,top.length*(LW+22)+120,bot.length*(DW+22)+120),bx=(W_-boxW)/2,LS=7;
  var yTopDev=20,yBoxT=yTopDev+LH+24+wT*LS,yClamp=yBoxT+44,yBoxB=yClamp+44,yBotDev=yBoxB+24+wB*LS,H=yBotDev+DH+70;
  var cx={},tp={};B.clamps.forEach(function(k,i){cx[k.id]=bx+20+CW/2+i*((boxW-40)/nC)});
  top.forEach(function(d,i){var tot=top.length*(LW+22)-22,x0=(W_-tot)/2+i*(LW+22);d.x=x0;d.y=yTopDev;d.terms.forEach(function(tn,j){tp[d.id+'.'+tn]={x:x0+(j+0.5)*LW/d.terms.length,y:yTopDev+LH}})});
  bot.forEach(function(d,i){var tot=bot.length*(DW+22)-22,x0=(W_-tot)/2+i*(DW+22);d.x=x0;d.y=yBotDev;d.terms.forEach(function(tn,j){tp[d.id+'.'+tn]={x:x0+(j+0.5)*DW/d.terms.length,y:yBotDev}})});
  var ent={};B.w.forEach(function(w){var k=w.b.split('.')[1]+w.side;ent[k]=(ent[k]||0)+1});var ei={};
  var sz=opt.fh?(function(){var k=Math.min(1.6,Math.max(0.5,((window.innerHeight||800)*0.62-16)/H));return 'width="'+Math.round(W_*k)+'" height="'+Math.round(H*k)+'"'})():'width="'+(opt.px?W_:'100%')+'"'+(opt.px?' height="'+H+'"':'');
  var h='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W_+' '+H+'" '+sz+' style="display:block;background:#fff"><rect width="'+W_+'" height="'+H+'" fill="#fff"/>';
  // scatola
  h+='<rect x="'+bx+'" y="'+yBoxT+'" width="'+boxW+'" height="'+(yBoxB-yBoxT)+'" rx="10" fill="#f1f3f5" stroke="#868e96" stroke-width="2" stroke-dasharray="7 5"/><text x="'+(bx+10)+'" y="'+(yBoxT+16)+'" font-family="Arial" font-size="11" font-weight="700" fill="#495057">'+esc(t4(LTX.box))+'</text>';
  // cavi
  B.w.forEach(function(w){var a=tp[w.a],ck=w.b.split('.')[1],k=ck+w.side;ei[k]=(ei[k]||0);var n=ent[k],ex=cx[ck]+(ei[k]-(n-1)/2)*6;ei[k]++;
    var lane=w.side==='t'?yBoxT-14-w.lane*LS:yBoxB+14+w.lane*LS,ey=w.side==='t'?yClamp-12:yClamp+12,on=R.live[w.a];
    var d='M'+a.x+' '+a.y+'V'+lane+'H'+ex+'V'+ey,col=LTCOL[w.c];
    h+='<path d="'+d+'" stroke="'+col+'" stroke-width="'+(on?4.2:3)+'" fill="none" stroke-linejoin="round"'+(on?'':' opacity=".9"')+'/>'+(w.c==='PE'?'<path d="'+d+'" stroke="#F4D31C" stroke-width="3" fill="none" stroke-dasharray="6 6"/>':'')+(on&&w.c!=='N'&&w.c!=='PE'?'<path d="'+d+'" stroke="#ffe066" stroke-width="1.2" fill="none" stroke-dasharray="3 5"/>':'')});
  // morsetti
  B.clamps.forEach(function(k){var x=cx[k.id];h+='<rect x="'+(x-22)+'" y="'+(yClamp-12)+'" width="44" height="24" rx="4" fill="#fff" stroke="'+LTCOL[k.c]+'" stroke-width="2"/><text x="'+x+'" y="'+(yClamp+4)+'" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#212529">'+esc(k.c==='T'?k.id.replace(/^T(\d)/,function(m,a){return 'T'+(+a+1)}).replace('a','a'):k.id)+'</text>'});
  // apparecchi
  B.dev.forEach(function(d){var s=(c.st||{})[d.id],x=d.x,y=d.y,top_=d.row==='t',w=top_?LW:DW,hh=top_?LH:DH,g='<g data-act="ltt" data-v="'+d.id+'" style="cursor:pointer">';
    if(d.k==='lamp'){var lit=R.lamp[d.id];g+=(lit?'<circle cx="'+(x+w/2)+'" cy="'+(y+28)+'" r="30" fill="#ffe066" opacity=".55"/>':'')+'<circle cx="'+(x+w/2)+'" cy="'+(y+28)+'" r="18" fill="'+(lit?'#FFD43B':'#fff')+'" stroke="#343a40" stroke-width="2"/><path d="M'+(x+w/2-12)+' '+(y+16)+'L'+(x+w/2+12)+' '+(y+40)+'M'+(x+w/2+12)+' '+(y+16)+'L'+(x+w/2-12)+' '+(y+40)+'" stroke="#343a40" stroke-width="2"/>'}
    else if(d.k==='pir'){g+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+(hh-6)+'" rx="10" fill="'+(s?'#FFF3BF':'#fff')+'" stroke="#343a40" stroke-width="2"/><path d="M'+(x+w/2-16)+' '+(y+30)+'a16 16 0 0 1 32 0" fill="#ced4da" stroke="#343a40"/><text x="'+(x+w/2)+'" y="'+(y+48)+'" text-anchor="middle" font-family="Arial" font-size="9" font-weight="700" fill="#343a40">'+(s?'👋':'')+'PIR</text>'}
    else if(d.k==='src'){var on=(c.st||{}).brk!==0&&!R.short;g+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+hh+'" rx="8" fill="#fff" stroke="#343a40" stroke-width="2"/><rect x="'+(x+w/2-9)+'" y="'+(y+18)+'" width="18" height="30" rx="3" fill="#dee2e6"/><rect x="'+(x+w/2-7)+'" y="'+(y+(on?20:32))+'" width="14" height="14" rx="2" fill="'+(on?'#2F9E44':'#C92A2A')+'"/><text x="'+(x+w/2)+'" y="'+(y+62)+'" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#212529">'+esc(d.lab)+'</text>'}
    else{var lbl={sw:'',dev:'',inv:'',pb:'',rel:(c.st.k1on?'ON':'OFF'),crep:s?'☾':'☀'}[d.k];
      g+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+hh+'" rx="10" fill="'+((d.k==='rel'&&c.st.k1on)||(d.k==='crep'&&s)?'#EBFBEE':'#fff')+'" stroke="#343a40" stroke-width="2"/>';
      // contatto interno visibile
      var xs=function(tn){return x+(d.terms.indexOf(tn)+0.5)*w/d.terms.length},yy=y+12,col2='#1F4FD8';
      if(d.k==='sw')g+='<path d="M'+xs('L')+' '+yy+'L'+(s?xs('1'):xs('1')-10)+' '+(yy+(s?0:14))+'" stroke="'+col2+'" stroke-width="3" stroke-linecap="round"/>';
      if(d.k==='dev')g+='<path d="M'+xs('C')+' '+yy+'L'+xs(s?'2':'1')+' '+(yy+2)+'" stroke="'+col2+'" stroke-width="3" stroke-linecap="round"/>';
      if(d.k==='inv')g+=(s?'<path d="M'+xs('1')+' '+yy+'L'+xs('4')+' '+(yy+16)+'M'+xs('2')+' '+yy+'L'+xs('3')+' '+(yy+16)+'"':'<path d="M'+xs('1')+' '+yy+'L'+xs('3')+' '+(yy+16)+'M'+xs('2')+' '+yy+'L'+xs('4')+' '+(yy+16)+'"')+' stroke="'+col2+'" stroke-width="2.5"/>';
      if(d.k==='pb')g+='<circle cx="'+(x+w/2)+'" cy="'+(y+36)+'" r="13" fill="#E7F5FF" stroke="#1F6FD6" stroke-width="2"/>';
      if(d.k==='rel')g+='<rect x="'+(xs('A1')-6)+'" y="'+(y+22)+'" width="'+(xs('A2')-xs('A1')+12)+'" height="14" rx="2" fill="none" stroke="#343a40"/>'+'<path d="M'+xs('1')+' '+yy+'L'+(c.st.k1on?xs('2'):xs('2')-8)+' '+(yy+(c.st.k1on?0:12))+'" stroke="'+col2+'" stroke-width="3"/>';
      g+='<text x="'+(x+w/2)+'" y="'+(y+hh-10)+'" text-anchor="middle" font-family="Arial" font-size="11" font-weight="800" fill="#212529">'+esc(d.lab+(lbl?' '+lbl:''))+'</text>'}
    d.terms.forEach(function(tn){var p=tp[d.id+'.'+tn];g+='<circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="#fff" stroke="#212529" stroke-width="1.5"/><text x="'+p.x+'" y="'+(top_?p.y-7:p.y+16)+'" text-anchor="middle" font-family="Arial" font-size="9" font-weight="700" fill="#495057">'+esc(tn)+'</text>'});
    h+=g+'</g>'});
  if(R.short)h+='<text x="'+(W_/2)+'" y="'+(H-14)+'" text-anchor="middle" font-family="Arial" font-size="14" font-weight="800" fill="#C92A2A">'+esc(t4(LTX.short))+'</text>';
  return h+'</svg>'}
function ltMat(c){var B=ltBuild(c),M={},o=[];function a(k,n4,q){if(!M[k]){M[k]={n:n4,q:0};o.push(k)}M[k].q+=q}
  B.dev.forEach(function(d){switch(d.k){case 'sw':a('sw',S4('مفتاح إنارة 1P 10A','Interruttore unipolare 10A','One-way switch 10A','Interrupteur simple allumage 10A'),1);break;
    case 'dev':a('dev',S4('مفتاح تبادلي (Deviatore) 10A','Deviatore 10A','Two-way switch 10A','Va-et-vient 10A'),1);break;case 'inv':a('inv',S4('مفتاح عاكس (Invertitore) 10A','Invertitore 10A','Intermediate switch 10A','Permutateur 10A'),1);break;
    case 'pb':a('pb',S4('زر ضغط NO 10A','Pulsante NA 10A','Push-button NO 10A','Bouton-poussoir NO 10A'),1);break;case 'rel':a('rel',S4('ريليه خطوة بخطوة 230V','Relè passo-passo 230V','Impulse relay 230V','Télérupteur 230V'),1);break;
    case 'pir':a('pir',S4('حساس حركة PIR','Sensore di movimento PIR','PIR motion sensor','Détecteur PIR'),1);break;case 'crep':a('crep',S4('مفتاح ضوئي مع حساس','Interruttore crepuscolare con sonda','Twilight switch with probe','Interrupteur crépusculaire avec sonde'),1);break;
    case 'lamp':a('lamp',S4('نقطة إنارة','Punto luce','Light point','Point lumineux'),1);break}});
  a('box',S4('علبة توصيل','Scatola di derivazione','Junction box','Boîte de dérivation'),1);
  function wg(n){a('wago'+n,S4('موصل ضغط '+n+' مداخل','Morsetto a leva '+n+' poli','Lever connector '+n+'-way','Borne à levier '+n+' entrées'),1)}
  B.clamps.forEach(function(k){var n=B.w.filter(function(w){return w.b==='box.'+k.id}).length;while(n>5){wg(5);n=n-5+1}if(n>=2)wg(n)});
  return o.map(function(k){return {k:k,n:M[k].n,q:M[k].q}})}
function stLt(){var st=stS(),L=ltList(),c=st.lt?L.find(function(x){return x.id===st.lt}):null;
  if(!c){st.lt=null;
    return '<button class="btn main" data-act="ltadd">'+esc(sL(LTX.add))+'</button>'+(L.length?'':'<div class="mini" style="margin:10px 4px">'+esc(sL(LTX.none))+'</div>')+
      L.map(function(x){var B=ltBuild(x);return '<div class="stcard" style="margin-top:10px"><div class="sth"><b dir="auto">💡 '+esc(x.name)+'</b><span class="stst" style="background:#E67700">'+B.dev.filter(function(d){return d.k==='lamp'}).length+' 💡</span></div><div class="mini" dir="auto">'+esc(sL(LTPLBY[x.tpl][1]))+(B.q?' · Q'+B.q.n+' '+esc(B.q.l||''):'')+'</div><div class="pngo" style="margin-top:8px"><button class="btn main" data-act="ltopen" data-v="'+x.id+'">'+esc(sL(STX.open))+'</button></div></div>'}).join('')}
  var B=ltBuild(c),R=ltSim(c,B),P_=pnl(),outs=P_.mods.filter(function(m){return PNOUT[m.t]&&m.t!=='trf'}),nOn=Object.keys(R.lamp).filter(function(k){return R.lamp[k]}).length;
  var par=c.tpl==='one'?'':pnChips('lamps',[1,2,3,4,5,6,7,8],c.lamps,sL(LTX.lamps)).replace(/data-pk=/g,'data-lk=').replace(/data-pv=/g,'data-lv=');
  if(c.tpl==='inter')par+=pnChips('pts',[3,4,5,6],c.pts,sL(LTX.pts)).replace(/data-pk=/g,'data-lk=').replace(/data-pv=/g,'data-lv=');
  if(c.tpl==='relay')par+=pnChips('pts',[1,2,3,4,5,6],c.pts,sL(LTX.btns)).replace(/data-pk=/g,'data-lk=').replace(/data-pv=/g,'data-lv=');
  par+=pnChips('q',[['',sL(LTX.nolink)]].concat(outs.map(function(m){return [m.id,'Q'+m.n+' '+(m.l||'')]})),c.q||'',sL(LTX.link)).replace(/data-pk=/g,'data-lk=').replace(/data-pv=/g,'data-lv=');
  return '<button class="back" data-act="ltback">'+(settings.ui==='ar'?'→ ':'← ')+esc(sL(LTX.back))+'</button>'+
   '<div class="field" style="margin-top:4px"><label>'+esc(sL(LTX.name))+'</label><input dir="auto" data-ln="1" value="'+esc(c.name)+'" maxlength="40"></div>'+
   '<div class="stlvl" style="border-color:'+(R.short?'#C92A2A':'#2F9E44')+';color:'+(R.short?'#C92A2A':'#2F9E44')+'">'+esc(R.short?sL(LTX.short):sL(LTX.lvl))+'</div>'+
   '<div class="mini" style="margin:6px 4px">👆 '+esc(sL(LTX.simHint))+' · 💡 '+nOn+'/'+B.dev.filter(function(d){return d.k==='lamp'}).length+' '+esc(sL(LTX.on))+'</div>'+
   '<div class="stc ltc"><div class="stz" style="transform:translate('+st.x+'px,'+st.y+'px) scale('+st.z+')">'+ltSVG(c,{fh:1})+'</div><div class="stzoom"><button data-act="stz" data-v="1">＋</button><button data-act="stz" data-v="-1">－</button><button data-act="stz" data-v="0">⤢</button></div></div>'+par+
   '<details class="stf" open><summary>'+esc(sL(LTX.notes))+'</summary><div dir="auto">'+esc(sL(LTNOTE[c.tpl]))+'</div><div class="mini">'+esc(sL(LTX.ref))+': '+esc(sL(S4('مخطط نموذجي للتركيبات المنزلية','schema tipico per impianti civili','typical residential wiring scheme','schéma type habitat')))+' · ⚠️ '+esc(sL(LTX.review))+'</div></details>'+
   '<div class="h2" style="margin-top:12px"><b>'+esc(sL(LTX.conns))+'</b></div><div class="sttbl"><table><thead><tr><th>#</th><th>'+esc(sL(STX.wFrom))+'</th><th>'+esc(sL(STX.wTo))+'</th><th>'+esc(sL(STX.wC))+'</th></tr></thead><tbody>'+
   B.w.map(function(w,i){return '<tr><td>'+(i+1)+'</td><td>'+esc(w.a.replace('src',B.q?'Q'+B.q.n:'Q').replace(/^([a-z])(\d)/,function(m,a,b){return a.toUpperCase()+b}).replace('.',' : '))+'</td><td>'+esc(sL(LTX.box))+' : '+esc(w.b.split('.')[1])+'</td><td><i class="cdot" style="background:'+LTCOL[w.c]+'"></i>'+esc({L:'L',N:'N',PE:'PE',R:sL(S4('رجوع','ritorno','return','retour')),T:sL(S4('تبادل','scambio','traveller','navette')),P:sL(S4('زر','pulsante','button','bouton'))}[w.c])+'</td></tr>'}).join('')+'</tbody></table></div>'+
   '<div class="h2" style="margin-top:12px"><b>'+esc(sL(STX.bom))+'</b></div><div class="pnlist">'+ltMat(c).map(function(x){return '<div class="pnrow" style="grid-template-columns:1fr auto"><span dir="auto">'+esc(sL(x.n))+'</span><b>'+x.q+'</b></div>'}).join('')+'</div>'+
   '<button class="btn main" data-act="ltord" style="margin-top:10px">'+esc(sL(PN.ord))+'</button><button class="btn ghost" data-act="ltdel" style="width:100%;margin-top:8px;color:var(--danger)">'+esc(sL(LTX.del))+'</button>'}
function ltAddSheet(){openSheet('<h2>'+esc(sL(LTX.add))+'</h2>'+LTPL.map(function(t){return '<button class="pnrow" data-lt="'+t[0]+'" style="grid-template-columns:42px 1fr"><b>💡</b><span dir="auto">'+esc(sL(t[1]))+'</span><i dir="auto">'+esc(sL(t[2]))+'</i></button>'}).join(''));
  sheet.querySelectorAll('[data-lt]').forEach(function(b){b.onclick=function(){var c=ltNew(b.dataset.lt);var st=stS();st.lt=c.id;st.z=1;st.x=0;st.y=0;closeSheet();render();window.scrollTo(0,0)}})}
function ltCur(){var st=stS();return st.lt?ltList().find(function(x){return x.id===st.lt}):null}
function ltTap(id){var c=ltCur();if(!c)return;c.st=c.st||{brk:1};var B=ltBuild(c),d=B.dev.find(function(x){return x.id===id});if(!d)return;
  if(d.k==='src')c.st.brk=c.st.brk===0?1:0;
  else if(d.k==='pb'){ltPress(c,id)}
  else if(d.k==='sw'||d.k==='dev'||d.k==='inv'||d.k==='pir'||d.k==='crep')c.st[id]=c.st[id]?0:1;
  else if(d.k==='rel')c.st.k1on=!c.st.k1on;
  else return;
  save();var z=document.querySelector('.ltc .stz');if(z){z.innerHTML=ltSVG(c,{fh:1});var y=window.scrollY;render();window.scrollTo(0,y)}}
function ltOrder(){var c=ltCur();if(!c)return;ltMat(c).forEach(function(x){addLine({it:x.n.it,ar:x.n.ar,fr:x.n.fr,en:x.n.en,cat:'x',unit:'pz',qty:x.q,note:c.name})});save();refreshCounts();toast('✓ '+sL(PN.added))}

STX.lt=LTX.lt;

// ======================= schema multifilare + tabelle morsetti/cavi + simulazione sull'unifilare =======================
var MLX={uni:S4('أحادي الخط','Unifilare','Single-line','Unifilaire'),multi:S4('متعدد الخطوط','Multifilare','Multi-line','Multifilaire'),
 sim:S4('⚡ محاكاة','⚡ Simulazione','⚡ Simulation','⚡ Simulation'),
 simHint:S4('اضغط على أي قاطع لفتحه أو غلقه: الخطوط المغذاة بالأحمر.','Tocca un interruttore per aprirlo/chiuderlo: le linee alimentate sono in rosso.','Tap any breaker to open/close it: energised lines are red.','Touchez un disjoncteur pour l’ouvrir/fermer : les lignes sous tension sont en rouge.'),
 simLvl:S4('✓ محاكاة منطقية لحالة القواطع (مغذاة / مفصولة) — ليست حساباً كهربائياً.','✓ Simulazione logica dello stato degli interruttori (alimentato / sezionato) — non è un calcolo elettrico.','✓ Logic simulation of breaker states (energised / isolated) — not an electrical calculation.','✓ Simulation logique de l’état des disjoncteurs — pas un calcul électrique.'),
 fed:S4('مغذاة','alimentati','energised','sous tension'),
 term:S4('جدول أطراف الأجهزة','Tabella morsetti apparecchi','Device terminal table','Tableau des bornes'),cab:S4('جدول الكابلات','Tabella cavi','Cable table','Tableau des câbles'),
 dev:S4('الجهاز','Apparecchio','Device','Appareil'),tm:S4('الطرف','Morsetto','Terminal','Borne'),wire:S4('السلك','Filo','Wire','Fil'),
 cabId:S4('الكابل','Cavo','Cable','Câble'),cond:S4('الموصلات','Conduttori','Conductors','Conducteurs'),ln:S4('الطول','Lunghezza','Length','Longueur'),
 mlNote:S4('كل موصل مرسوم وحده (طور، نوتر، أرضي) مع أرقام الأطراف والأسلاك. يُولَّد من نفس نموذج اللوحة.','Ogni conduttore è disegnato separatamente (fase, neutro, terra) con numeri di morsetti e fili. Generato dallo stesso modello del quadro.','Each conductor is drawn separately (phase, neutral, earth) with terminal and wire numbers. Generated from the same panel model.','Chaque conducteur est dessiné séparément avec numéros de bornes et de fils. Généré depuis le même modèle.'),
 csvT:S4('📊 CSV الأطراف','📊 CSV morsetti','📊 Terminals CSV','📊 CSV bornes'),csvC:S4('📊 CSV الكابلات','📊 CSV cavi','📊 Cables CSV','📊 CSV câbles'),pdfM:S4('📄 PDF متعدد الخطوط','📄 PDF multifilare','📄 Multi-line PDF','📄 PDF multifilaire')};
function pnTermNo(m,k,bottom){var cs=pnCond(m,'3'===(pnl()||{}).sys?'3':'1'),c=cs[k];if(c==='N')return 'N';return String(k*2+(bottom?2:1))}
function mlSVG(P,opt){opt=opt||{};var T=sldTree(P),sys=P.sys,BC=pnPh(sys).concat(['N']),lang=opt.lang||settings.ui,t4=function(o){return TL(o,lang)};
  var PS=16,DH=70,SP=12,col='#14213D',wn=0,h='';
  function pc(c){return pnCol(P,c)}
  function dw(m){return Math.max(2,pnCond(m,sys).length)*PS+44}
  T.top.forEach(function(g){var w=dw(g.it.m);if(g.kids&&g.kids.length){var s=0;g.kids.forEach(function(k){s+=dw(k.m)});w=Math.max(w,s)}g.mw=w});
  var chainW=T.chain.reduce(function(a,it){return Math.max(a,dw(it.m))},90)+30,x0=40,cxs=x0+chainW,W=Math.max(600,cxs+T.top.reduce(function(a,g){return a+g.mw},0)+60);
  var yS=34,yC=yS+BC.length*SP+26,yL1=yC+T.chain.length*(DH+50)+10,yD2=yL1+BC.length*SP+26,yL2=yD2+DH+34,yD3=yL2+BC.length*SP+26,yX=yD3+DH+60,yPE=yX+70,H=yPE+150;
  var sz=opt.fh?(function(){var k=Math.min(1.3,Math.max(0.45,((window.innerHeight||800)*0.58-16)/H));return 'width="'+Math.round(W*k)+'" height="'+Math.round(H*k)+'"'})():'width="'+(opt.px?W:'100%')+'"'+(opt.px?' height="'+H+'"':'');
  h+='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" '+sz+' style="display:block;background:#fff"><rect width="'+W+'" height="'+H+'" fill="#fff"/>';
  function bus(y,xa,xb,lbl){BC.forEach(function(c,i){var yy=y+i*SP;h+='<path d="M'+xa+' '+yy+'H'+xb+'" stroke="'+pc(c)+'" stroke-width="2.4"/>'+(lbl?'<text x="'+(xa-4)+'" y="'+(yy+4)+'" text-anchor="end" font-family="Arial" font-size="9" font-weight="700" fill="'+pc(c)+'">'+c+'</text>':'')})}
  function wl(x,y1,y2,c){var n=++wn;h+='<path d="M'+x+' '+y1+'V'+y2+'" stroke="'+pc(c)+'" stroke-width="2"/><text transform="translate('+(x-3)+','+((y1+y2)/2)+') rotate(-90)" text-anchor="middle" font-family="Arial" font-size="7.5" fill="#495057">'+n+'</text>';return n}
  function dot(x,y,c){h+='<circle cx="'+x+'" cy="'+y+'" r="2.8" fill="'+pc(c)+'"/>'}
  // apparecchio multipolare: ogni polo con contatto e numeri di morsetto
  function dev(it,x,y){var m=it.m,cs=pnCond(m,sys),n=cs.length,px=[],i;for(i=0;i<n;i++)px.push(x+16+i*PS);
    h+='<rect x="'+(x+6)+'" y="'+(y+14)+'" width="'+(n*PS)+'" height="'+(DH-28)+'" fill="none" stroke="#adb5bd" stroke-dasharray="3 3"/>';
    cs.forEach(function(c,k){var xx=px[k],s='stroke="'+col+'" stroke-width="1.6" fill="none"';
      if(m.t==='spd'||m.t==='meter'||m.t==='lamp'||m.t==='sock'||m.t==='trf'||m.t==='tmr'||m.t==='crep')h+='<path d="M'+xx+' '+y+'V'+(y+DH)+'" '+s+'/><rect x="'+(xx-5)+'" y="'+(y+24)+'" width="10" height="20" fill="#fff" stroke="'+col+'" stroke-width="1.4"/>';
      else if(m.t==='fuse')h+='<path d="M'+xx+' '+y+'V'+(y+DH)+'" '+s+'/><rect x="'+(xx-4)+'" y="'+(y+20)+'" width="8" height="28" fill="#fff" stroke="'+col+'" stroke-width="1.4"/>';
      else{h+='<path d="M'+xx+' '+y+'V'+(y+20)+'M'+xx+' '+(y+48)+'V'+(y+DH)+'M'+(xx+9)+' '+(y+22)+'L'+xx+' '+(y+48)+'" '+s+'/>';if(m.t==='mcb'||m.t==='main'||m.t==='rcbo')h+='<path d="M'+(xx-3)+' '+(y+17)+'l6 6m0 -6l-6 6" stroke="'+col+'" stroke-width="1.4"/>'}
      h+='<text x="'+xx+'" y="'+(y-3)+'" text-anchor="middle" font-family="Arial" font-size="8" fill="#868e96">'+pnTermNo(m,k,0)+'</text><text x="'+xx+'" y="'+(y+DH+9)+'" text-anchor="middle" font-family="Arial" font-size="8" fill="#868e96">'+pnTermNo(m,k,1)+'</text>'});
    if(n>1&&m.t!=='spd')h+='<path d="M'+(px[0]+6)+' '+(y+34)+'H'+(px[n-1]+6)+'" stroke="#868e96" stroke-width="1.2" stroke-dasharray="2 2"/>';
    if(m.t==='rcd'||m.t==='rcbo')h+='<ellipse cx="'+((px[0]+px[n-1])/2)+'" cy="'+(y+58)+'" rx="'+((px[n-1]-px[0])/2+9)+'" ry="5" fill="none" stroke="'+col+'" stroke-width="1.4"/>';
    h+='<text x="'+(px[n-1]+12)+'" y="'+(y+30)+'" font-family="Arial" font-size="10.5" font-weight="800" fill="#1F4FD8">'+(m.t==='term'?'X':'Q')+it.q+'</text><text x="'+(px[n-1]+12)+'" y="'+(y+42)+'" font-family="Arial" font-size="8" fill="'+col+'">'+esc(pnSpec(m).replace(/ · L\d$/,''))+'</text>';
    return px}
  // ingresso
  h+='<text x="'+x0+'" y="'+(yS-12)+'" font-family="Arial" font-size="11" font-weight="700" fill="'+col+'">'+(sys==='3'?'3~ 400V + N':'1~ 230V')+' — '+esc(t4(STX.grid))+'</text>';
  var cxC=x0+20,yy=yC,srcY=yS,lastPx=null,lastCs=BC;
  bus(yS,x0,cxC+chainW-40,true);
  if(!T.chain.length){bus(yL1,x0,W-30,true)}
  T.chain.forEach(function(it,ci){var cs=pnCond(it.m,sys),px=dev(it,cxC,yy);
    if(ci===0)cs.forEach(function(c,k){var by=yS+BC.indexOf(c)*SP;dot(px[k],by,c);wl(px[k],by,yy,c)});
    lastPx=px;lastCs=cs;yy+=DH+50});
  // uscita della catena verso la sbarra 1
  if(T.chain.length){var lc=T.chain[T.chain.length-1],cs1=pnCond(lc.m,sys);cs1.forEach(function(c,k){var by=yL1+BC.indexOf(c)*SP;wl(lastPx[k],yy-50+DH,by,c);dot(lastPx[k],by,c)});
    bus(yL1,lastPx[0]-6,W-30,false)}
  // collegamenti in serie nella catena (uscita di uno -> ingresso del successivo)
  var cy=yC;for(var ci2=0;ci2<T.chain.length-1;ci2++){var a=T.chain[ci2].m,b=T.chain[ci2+1].m,ca=pnCond(a,sys),cb=pnCond(b,sys);cb.forEach(function(c,k){var ka=ca.indexOf(c);if(ka<0)return;var xa=cxC+16+ka*PS,xb=cxC+16+k*PS;h+='<path d="M'+xa+' '+(cy+DH)+'V'+(cy+DH+25)+'H'+xb+'V'+(cy+DH+50)+'" stroke="'+pc(c)+'" stroke-width="2" fill="none"/>'});cy+=DH+50}
  // uscite: morsettiera X e sbarra PE
  var xc=cxs,outs=[];
  function out(it,px,yb){var m=it.m,cs=pnCond(m,sys);if(!PNOUT[m.t])return;cs.forEach(function(c,k){wl(px[k],yb,yX,c);h+='<rect x="'+(px[k]-6)+'" y="'+yX+'" width="12" height="16" fill="#fff" stroke="'+col+'"/>'});
    var pe=px[cs.length-1]+PS;h+='<path d="M'+pe+' '+(yX+16)+'V'+yPE+'" stroke="'+pc('PE')+'" stroke-width="2"/><path d="M'+pe+' '+(yX+16)+'V'+yPE+'" stroke="#F4D31C" stroke-width="2" stroke-dasharray="4 4"/><rect x="'+(pe-6)+'" y="'+yX+'" width="12" height="16" fill="#fff" stroke="'+col+'"/>';dot(pe,yPE,'PE');
    h+='<text x="'+(px[0]-6)+'" y="'+(yX+28)+'" font-family="Arial" font-size="8" fill="#495057">X'+it.q+'</text><g transform="translate('+(px[0]+2)+','+(yPE+12)+') rotate(90)"><text font-family="Arial" font-size="10.5" font-weight="700" fill="'+col+'">'+esc((m.l||t4(PN.types[m.t])).slice(0,24))+'</text><text y="-11" font-family="Arial" font-size="8.5" fill="#495057">'+(m.s?esc(m.s)+' mm² · ':'')+(cs.length+1)+'×</text></g>';outs.push(pe)}
  T.top.forEach(function(g){var it=g.it,m=it.m,x=xc,cs=pnCond(m,sys);
    var px=dev(it,x,yD2);cs.forEach(function(c,k){var by=yL1+BC.indexOf(c)*SP;dot(px[k],by,c);wl(px[k],by,yD2,c)});
    if(m.t==='spd'){var ex=px[cs.length-1]+PS;h+='<path d="M'+px[0]+' '+(yD2+DH)+'V'+(yD2+DH+12)+'H'+ex+'V'+yPE+'" stroke="'+pc('PE')+'" stroke-width="2" fill="none"/>';dot(ex,yPE,'PE')}
    else if(g.kids){var kx=x,first=true;
      cs.forEach(function(c,k){var by=yL2+BC.indexOf(c)*SP;wl(px[k],yD2+DH,by,c);dot(px[k],by,c)});
      BC.forEach(function(c,i){if(cs.indexOf(c)<0)return;var yy2=yL2+i*SP;h+='<path d="M'+(px[0]-6)+' '+yy2+'H'+(x+g.mw-20)+'" stroke="'+pc(c)+'" stroke-width="2.2"/>'});
      g.kids.forEach(function(k){var kp=dev(k,kx,yD3),kc=pnCond(k.m,sys);kc.forEach(function(c,j){var by=yL2+BC.indexOf(c)*SP;if(cs.indexOf(c)<0){h+='<text x="'+kp[j]+'" y="'+(yD3-30)+'" font-family="Arial" font-size="12" fill="#C92A2A">✕</text>';return}dot(kp[j],by,c);wl(kp[j],by,yD3,c)});out(k,kp,yD3+DH);kx+=dw(k.m)})}
    else out(it,px,yD2+DH);
    xc+=g.mw});
  if(outs.length||T.top.length){h+='<path d="M'+(x0)+' '+yPE+'H'+(W-30)+'" stroke="'+pc('PE')+'" stroke-width="3"/><path d="M'+x0+' '+yPE+'H'+(W-30)+'" stroke="#F4D31C" stroke-width="3" stroke-dasharray="6 6"/><text x="'+(x0-4)+'" y="'+(yPE+4)+'" text-anchor="end" font-family="Arial" font-size="9" font-weight="700" fill="'+pc('PE')+'">PE</text>'}
  // cartiglio
  var tw=300,tx=W-tw-12,ty=H-58,p=cur();
  h+='<rect x="'+tx+'" y="'+ty+'" width="'+tw+'" height="48" fill="#fff" stroke="'+col+'"/><path d="M'+tx+' '+(ty+24)+'H'+(tx+tw)+'" stroke="'+col+'"/><text x="'+(tx+8)+'" y="'+(ty+16)+'" font-family="Arial" font-size="11" font-weight="700" fill="'+col+'">'+esc((P.name||projTitle(p)).slice(0,34))+'</text><text x="'+(tx+8)+'" y="'+(ty+40)+'" font-family="Arial" font-size="10" fill="'+col+'">'+esc(t4(MLX.multi))+' · '+esc(t4(STX.version))+' '+((P.meta&&P.meta.ver)||1)+' · '+stDate(P.meta&&P.meta.u)+'</text>';
  return h+'</svg>'}
// tabelle
function pnTerms(P,lang){var N=pnNet(P,lang),rows=[];N.w.forEach(function(w){[w.f,w.t].forEach(function(e){var m_=/^([QX]\d+) ([↑↓⏚])(\S*)$/.exec(e);if(!m_)return;rows.push({d:m_[1],t:(m_[2]==='↑'?'IN ':m_[2]==='↓'?'OUT ':'')+(m_[3]||'PE'),c:w.c,w:w.id})})});
  rows.sort(function(a,b){var na=+a.d.slice(1),nb=+b.d.slice(1);return na-nb||a.t.localeCompare(b.t)});return rows}
function pnCables(P,lang){var t4=function(o){return TL(o,lang)};return pnLayout(P).items.filter(function(it){return PNOUT[it.m.t]}).map(function(it){var m=it.m,n=pnCond(m,P.sys).length+(m.t==='trf'?0:1);
  return {id:'C'+it.q,from:'Q'+it.q,to:m.l||t4(PN.types[m.t]),n:n,s:m.s||'',len:m.len||'',txt:n+'G'+(m.s||'?')}})}
function stDiag(){var P=pnl(),st=stS(),dg=st.dg||'u',lang=settings.ui;
  var tg='<div class="stmode" style="grid-template-columns:1fr 1fr 1fr;margin-bottom:8px"><button class="'+(dg==='u'?'on':'')+'" data-act="stdg" data-v="u"><b>'+esc(sL(MLX.uni))+'</b></button><button class="'+(dg==='m'?'on':'')+'" data-act="stdg" data-v="m"><b>'+esc(sL(MLX.multi))+'</b></button><button class="'+(st.sim?'on':'')+'" data-act="stsim"><b>'+esc(sL(MLX.sim))+'</b></button></div>';
  if(dg==='m'){var TR=pnTerms(P,lang),CB=pnCables(P,lang);
    return tg+'<div class="mini" style="margin:2px 4px 8px">ⓘ '+esc(sL(MLX.mlNote))+'</div><div class="stc sldc"><div class="stz" style="transform:translate('+st.x+'px,'+st.y+'px) scale('+st.z+')">'+mlSVG(P,{fh:1})+'</div><div class="stzoom"><button data-act="stz" data-v="1">＋</button><button data-act="stz" data-v="-1">－</button><button data-act="stz" data-v="0">⤢</button></div></div>'+
     '<div class="pngo" style="margin-top:10px"><button class="btn ghost" data-act="stx" data-v="pdfM">📄 PDF</button><button class="btn ghost" data-act="stx" data-v="svgM">🖼 SVG</button><button class="btn ghost" data-act="stx" data-v="pngM">🖼 PNG</button></div>'+
     '<div class="h2" style="margin-top:14px"><b>'+esc(sL(MLX.cab))+'</b></div><div class="sttbl"><table><thead><tr><th>'+esc(sL(MLX.cabId))+'</th><th>'+esc(sL(STX.wFrom))+'</th><th>'+esc(sL(STX.wTo))+'</th><th>'+esc(sL(MLX.cond))+'</th><th>'+esc(sL(MLX.ln))+'</th></tr></thead><tbody>'+
     CB.map(function(c){return '<tr><td>'+c.id+'</td><td>'+c.from+'</td><td dir="auto">'+esc(c.to)+'</td><td dir="ltr">'+esc(c.txt)+(c.s?' mm²':'')+'</td><td dir="ltr">'+(c.len?esc(String(c.len))+' m':'—')+'</td></tr>'}).join('')+'</tbody></table></div>'+
     '<div class="h2" style="margin-top:14px"><b>'+esc(sL(MLX.term))+'</b></div><div class="sttbl"><table><thead><tr><th>'+esc(sL(MLX.dev))+'</th><th>'+esc(sL(MLX.tm))+'</th><th>'+esc(sL(STX.wC))+'</th><th>'+esc(sL(MLX.wire))+'</th></tr></thead><tbody>'+
     TR.map(function(r){return '<tr><td>'+r.d+'</td><td dir="ltr">'+esc(r.t)+'</td><td><i class="cdot" style="background:'+pnCol(P,r.c)+'"></i>'+esc(r.c)+'</td><td>'+r.w+'</td></tr>'}).join('')+'</tbody></table></div>'+
     '<div class="pngo" style="margin-top:10px"><button class="btn ghost" data-act="stx" data-v="csvT">'+esc(sL(MLX.csvT))+'</button><button class="btn ghost" data-act="stx" data-v="csvC">'+esc(sL(MLX.csvC))+'</button></div>'}
  var on=0,tot=0;if(st.sim){var E=sldEnergy(P);pnLayout(P).items.forEach(function(it){if(PNOUT[it.m.t]){tot++;if(E[it.i])on++}})}
  return tg+(st.sim?'<div class="stlvl" style="border-color:#2F9E44;color:#2F9E44">'+esc(sL(MLX.simLvl))+'</div><div class="mini" style="margin:6px 4px">👆 '+esc(sL(MLX.simHint))+' · <b>'+on+'/'+tot+'</b> '+esc(sL(MLX.fed))+'</div>':stSld().replace(/^<div class="mini"[^>]*>[\s\S]*?<\/div>/,'<div class="mini" style="margin:2px 4px 8px">ⓘ '+esc(sL(STX.sldNote))+'</div>').split('<div class="stc sldc">')[0])+
   '<div class="stc sldc"><div class="stz" style="transform:translate('+st.x+'px,'+st.y+'px) scale('+st.z+')">'+sldSVG(P,{fh:1,sim:st.sim})+'</div><div class="stzoom"><button data-act="stz" data-v="1">＋</button><button data-act="stz" data-v="-1">－</button><button data-act="stz" data-v="0">⤢</button></div></div>'+
   '<div class="pngo" style="margin-top:10px"><button class="btn ghost" data-act="stx" data-v="pdfS">📄 PDF</button><button class="btn ghost" data-act="stx" data-v="svgS">🖼 SVG</button><button class="btn ghost" data-act="stx" data-v="pngS">🖼 PNG</button></div>'}
// energia: quali apparecchi sono alimentati con gli stati aperto/chiuso
function sldEnergy(P){var off=stS().off||{},L=pnLayout(P),E={},chainOk=true;
  L.items.forEach(function(it){var m=it.m;if(m.t==='gap'||m.t==='term')return;
    if(it.src==='feed'&&(m.t==='main'||m.t==='isol')){E[it.i]=chainOk&&!off[m.id];chainOk=E[it.i];return}
    var up=it.src!==undefined?it.src:it.head,upOk=(up==='feed'||up===undefined)?true:!!E[up];
    E[it.i]=upOk&&!off[m.id]});
  return E}

// ======================= 🏠 mappa dell'abitazione (CAD 2D) =======================
var PLX={plan:S4('المخطط','Pianta','Floor plan','Plan'),
 sel:S4('تحديد','Seleziona','Select','Sélection'),wall:S4('جدار','Muro','Wall','Mur'),door:S4('باب','Porta','Door','Porte'),win:S4('نافذة','Finestra','Window','Fenêtre'),txt:S4('اسم غرفة','Nome stanza','Room name','Nom de pièce'),
 cab:S4('مسار كابل','Percorso cavo','Cable route','Tracé de câble'),dim:S4('بُعد','Quota','Dimension','Cote'),note:S4('ملاحظة','Nota','Note','Note'),
 fin:S4('✓ إنهاء','✓ Fine','✓ Finish','✓ Terminer'),rot:S4('⟳ تدوير','⟳ Ruota','⟳ Rotate','⟳ Pivoter'),layers:S4('الطبقات','Livelli','Layers','Calques'),grid:S4('الشبكة','Griglia','Grid','Grille'),
 bg:S4('🖼 صورة خلفية','🖼 Sfondo','🖼 Background','🖼 Fond'),bgDel:S4('حذف الخلفية','Rimuovi sfondo','Remove background','Retirer le fond'),scale:S4('حجم المربع','Lato quadretto','Grid size','Taille de grille'),
 hSel:S4('اضغط عنصراً لتحديده ثم اسحبه لتحريكه. اسحب الفراغ لتحريك المخطط.','Tocca un elemento per selezionarlo, poi trascinalo. Trascina il vuoto per spostare la vista.','Tap an element to select it, then drag it. Drag empty space to pan.','Touchez un élément puis faites-le glisser. Glissez le vide pour déplacer la vue.'),
 hPoly:S4('اضغط لإضافة النقاط ثم «إنهاء».','Tocca per aggiungere punti, poi «Fine».','Tap to add points, then «Finish».','Touchez pour ajouter des points, puis «Terminer».'),
 hOne:S4('اضغط مكان العنصر على المخطط.','Tocca dove mettere l’elemento.','Tap where to place the element.','Touchez l’emplacement.'),hDim:S4('اضغط نقطتين.','Tocca due punti.','Tap two points.','Touchez deux points.'),
 Lw:S4('الجدران والأبواب','Muri e porte','Walls & doors','Murs et portes'),Lt:S4('أسماء الغرف','Nomi stanze','Room names','Noms des pièces'),Le:S4('الرموز الكهربائية','Simboli elettrici','Electrical symbols','Symboles électriques'),Lc:S4('مسارات الكابلات','Percorsi cavi','Cable routes','Tracés de câbles'),Ld:S4('الأبعاد والملاحظات','Quote e note','Dimensions & notes','Cotes et notes'),Lb:S4('الخلفية','Sfondo','Background','Fond'),
 vis:S4('ظاهر','Visibile','Visible','Visible'),lk:S4('مقفل','Bloccato','Locked','Verrouillé'),
 lenTot:S4('طول المسار','Lunghezza percorso','Route length','Longueur du tracé'),useLen:S4('استعمل الطول في الحسابات','Usa la lunghezza nei calcoli','Use length in calculations','Utiliser la longueur dans les calculs'),
 lenOk:S4('تم وضع الطول في الدائرة','Lunghezza inserita nel circuito','Length set on the circuit','Longueur appliquée au circuit'),
 count:S4('عدّ الرموز','Conteggio simboli','Symbol count','Comptage des symboles'),dxf:S4('📐 DXF','📐 DXF','📐 DXF','📐 DXF'),
 dxfNote:S4('DXF بصيغة R12 بالمتر: خطوط، دوائر، أقواس، نصوص على طبقات. لا يدعم DWG.','DXF R12 in metri: linee, cerchi, archi, testi su livelli. DWG non supportato.','DXF R12 in metres: lines, circles, arcs, texts on layers. DWG not supported.','DXF R12 en mètres : lignes, cercles, arcs, textes sur calques. DWG non pris en charge.'),
 empty:S4('ارسم جدران المنزل، ثم ضع المصابيح والمفاتيح والمقابس ومسارات الكابلات واربطها بدوائر اللوحة.','Disegna i muri, poi posiziona luci, interruttori, prese e percorsi cavi collegandoli ai circuiti del quadro.','Draw the walls, then place lights, switches, sockets and cable routes linked to the panel circuits.','Dessinez les murs, puis placez luminaires, interrupteurs, prises et câbles liés aux circuits.'),
 room:S4('مثال: مطبخ','Es. Cucina','e.g. Kitchen','ex. Cuisine')};
var PLSYM=[['lamp',S4('مصباح سقف','Punto luce a soffitto','Ceiling light','Plafonnier')],['wlamp',S4('مصباح حائط','Applique','Wall light','Applique')],['sw',S4('مفتاح','Interruttore','Switch','Interrupteur')],['sw2',S4('مفتاح تبادلي','Deviatore','Two-way switch','Va-et-vient')],['sw3',S4('مفتاح عاكس','Invertitore','Intermediate switch','Permutateur')],['pb',S4('زر','Pulsante','Push-button','Bouton-poussoir')],
 ['sock',S4('مقبس','Presa','Socket','Prise')],['sock2',S4('مقبس مزدوج','Presa doppia','Double socket','Prise double')],['sockp',S4('مقبس قوة 16A','Presa 16A forza','16A power socket','Prise 16A')],['tv',S4('مقبس تلفاز','Presa TV','TV outlet','Prise TV')],['data',S4('مقبس شبكة','Presa dati RJ45','Data outlet','Prise RJ45')],
 ['qd',S4('لوحة كهربائية','Quadro elettrico','Electrical panel','Tableau électrique')],['jb',S4('علبة توصيل','Scatola di derivazione','Junction box','Boîte de dérivation')],['pir',S4('حساس حركة','Sensore di movimento','Motion sensor','Détecteur')],['ac',S4('مكيّف','Condizionatore','Air conditioner','Climatiseur')],['bell',S4('جرس','Campanello','Doorbell','Sonnette')]];
var PLSYMBY={};PLSYM.forEach(function(s){PLSYMBY[s[0]]=s});
var PLLAY=[['w','Lw'],['t','Lt'],['e','Le'],['c','Lc'],['d','Ld'],['b','Lb']];
function plGet(){var P_=pnl();if(!P_){P_=cur().panel=pnMig({v:1,sys:'1',row:12,lc:packId()==='IT'?'br':'rd',name:'',mods:[]})}if(!P_.plan)P_.plan={g:50,W:1500,H:1000,els:[],lay:{w:{v:1},t:{v:1},e:{v:1},c:{v:1},d:{v:1},b:{v:1}},grid:1,bgo:0.45};return P_.plan}
function plLen(pts){var s=0;for(var i=1;i<pts.length;i++)s+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);return s}
function plFm(cm){return (cm/100).toFixed(2).replace('.',settings.ui==='en'?'.':',')+' m'}
function plSymSVG(k,x,y,r,col){var g='<g transform="translate('+x+','+y+') rotate('+(r||0)+')">',s='stroke="'+col+'" stroke-width="3" fill="none"',f='fill="#fff"';
  switch(k){
   case 'lamp':g+='<circle r="16" '+f+' '+s+'/><path d="M-11 -11L11 11M11 -11L-11 11" '+s+'/>';break;
   case 'wlamp':g+='<path d="M-16 0A16 16 0 0 1 16 0Z" '+f+' '+s+'/><path d="M-9 -2L0 -12M9 -2L0 -12" '+s+'/>';break;
   case 'sw':g+='<circle r="7" fill="'+col+'"/><path d="M5 -5L18 -18L23 -13" '+s+'/>';break;
   case 'sw2':g+='<circle r="7" fill="'+col+'"/><path d="M5 -5L18 -18L23 -13M-5 5L-18 18L-23 13" '+s+'/>';break;
   case 'sw3':g+='<circle r="7" fill="'+col+'"/><path d="M5 -5L18 -18L23 -13M-5 5L-18 18L-23 13M5 5L18 18M-5 -5L-18 -18" '+s+'/>';break;
   case 'pb':g+='<circle r="9" '+f+' '+s+'/><circle r="3" fill="'+col+'"/>';break;
   case 'sock':g+='<path d="M-14 0A14 14 0 0 1 14 0" '+s+'/><path d="M0 -14V-24M-14 0H14" '+s+'/>';break;
   case 'sock2':g+='<path d="M-14 0A14 14 0 0 1 14 0" '+s+'/><path d="M-5 -14V-24M5 -14V-24M-14 0H14" '+s+'/>';break;
   case 'sockp':g+='<path d="M-14 0A14 14 0 0 1 14 0Z" fill="'+col+'" '+s+'/><path d="M0 -14V-24" '+s+'/>';break;
   case 'tv':g+='<rect x="-16" y="-12" width="32" height="24" '+f+' '+s+'/><text y="5" text-anchor="middle" font-family="Arial" font-size="12" font-weight="700" fill="'+col+'">TV</text>';break;
   case 'data':g+='<rect x="-16" y="-12" width="32" height="24" '+f+' '+s+'/><text y="5" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="'+col+'">RJ</text>';break;
   case 'qd':g+='<rect x="-26" y="-12" width="52" height="24" fill="'+col+'" '+s+'/><path d="M-26 -12L26 12" stroke="#fff" stroke-width="2"/>';break;
   case 'jb':g+='<rect x="-9" y="-9" width="18" height="18" '+f+' '+s+'/>';break;
   case 'pir':g+='<circle r="16" '+f+' '+s+'/><text y="4" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="'+col+'">PIR</text>';break;
   case 'ac':g+='<rect x="-24" y="-11" width="48" height="22" '+f+' '+s+'/><text y="5" text-anchor="middle" font-family="Arial" font-size="12" font-weight="700" fill="'+col+'">AC</text>';break;
   case 'bell':g+='<path d="M-14 6A14 14 0 0 1 14 6Z" '+f+' '+s+'/><path d="M-14 6H14" '+s+'/>';break}
  return g+'</g>'}
function plSVG(P_,opt){opt=opt||{};var pl=P_.plan,W=pl.W,H=pl.H,lay=pl.lay,st=stS(),sel=opt.sel,h='',CC='#E8590C';
  var sz=opt.px?'width="'+W+'" height="'+H+'"':opt.fh?(function(){var k=Math.min(2,Math.max(0.15,Math.min(((window.innerWidth||400)-28)/W,((window.innerHeight||800)*0.6-16)/H)));return 'width="'+Math.round(W*k)+'" height="'+Math.round(H*k)+'"'})():'width="100%"';
  h+='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" '+sz+' style="display:block;background:#fff"><rect width="'+W+'" height="'+H+'" fill="#fff"/>';
  if(pl.bg&&lay.b.v)h+='<image href="'+pl.bg+'" x="0" y="0" width="'+W+'" height="'+H+'" preserveAspectRatio="xMidYMid meet" opacity="'+(pl.bgo||0.45)+'"/>';
  if(pl.grid&&!opt.px){var g=pl.g||50;h+='<defs><pattern id="plG" width="'+g+'" height="'+g+'" patternUnits="userSpaceOnUse"><path d="M'+g+' 0H0V'+g+'" fill="none" stroke="#dee2e6" stroke-width="1"/></pattern></defs><rect width="'+W+'" height="'+H+'" fill="url(#plG)"/>'}
  var circ={};(P_.mods||[]).forEach(function(m){circ[m.id]=m});
  function grp(e,inner){var cls=sel===e.id?' class="pls"':'';return '<g data-act="ple" data-v="'+e.id+'"'+cls+' style="cursor:pointer">'+inner+(sel===e.id?'':'')+'</g>'}
  var order=['w','c','e','t','d'];
  order.forEach(function(L){if(!lay[L]||!lay[L].v)return;pl.els.forEach(function(e){if(e.L!==L)return;var s='',hl=sel===e.id;
    if(e.t==='wall'){var d='M'+e.pts.map(function(p){return p[0]+' '+p[1]}).join('L');s+=(hl?'<path d="'+d+'" stroke="#2F6BFF" stroke-width="'+((e.th||20)+10)+'" fill="none" opacity=".35" stroke-linejoin="round"/>':'')+'<path d="'+d+'" stroke="#343a40" stroke-width="'+(e.th||20)+'" fill="none" stroke-linejoin="miter" stroke-linecap="square"/>'}
    else if(e.t==='door'){var w=e.w||80;s+='<g transform="translate('+e.x+','+e.y+') rotate('+(e.r||0)+')"><rect x="0" y="-12" width="'+w+'" height="24" fill="#fff"/><path d="M0 0L0 '+(-w)+'" stroke="#343a40" stroke-width="3"/><path d="M0 '+(-w)+'A'+w+' '+w+' 0 0 1 '+w+' 0" stroke="#868e96" stroke-width="2" fill="none" stroke-dasharray="6 5"/>'+(hl?'<rect x="-6" y="'+(-w-6)+'" width="'+(w+12)+'" height="'+(w+18)+'" fill="none" stroke="#2F6BFF" stroke-width="3"/>':'')+'</g>'}
    else if(e.t==='win'){var w2=e.w||120;s+='<g transform="translate('+e.x+','+e.y+') rotate('+(e.r||0)+')"><rect x="0" y="-12" width="'+w2+'" height="24" fill="#fff" stroke="#343a40" stroke-width="2"/><path d="M0 0H'+w2+'" stroke="#343a40" stroke-width="2"/>'+(hl?'<rect x="-6" y="-18" width="'+(w2+12)+'" height="36" fill="none" stroke="#2F6BFF" stroke-width="3"/>':'')+'</g>'}
    else if(e.t==='txt'||e.t==='note'){s+='<text x="'+e.x+'" y="'+e.y+'" text-anchor="middle" font-family="Arial" font-size="'+(e.t==='txt'?30:20)+'" font-weight="'+(e.t==='txt'?700:400)+'" fill="'+(e.t==='txt'?'#14213D':'#7048e8')+'" '+(hl?'stroke="#2F6BFF" stroke-width=".8"':'')+'>'+esc(e.s||'')+'</text>'}
    else if(e.t==='sym'){var col=e.q&&circ[e.q]?'#1F4FD8':'#212529';s+=(hl?'<circle cx="'+e.x+'" cy="'+e.y+'" r="34" fill="#2F6BFF" opacity=".18"/>':'')+plSymSVG(e.k,e.x,e.y,e.r,col)+(e.q&&circ[e.q]?'<text x="'+(e.x+20)+'" y="'+(e.y+28)+'" font-family="Arial" font-size="15" font-weight="700" fill="#1F4FD8">Q'+circ[e.q].n+'</text>':'')+(e.lab?'<text x="'+e.x+'" y="'+(e.y-26)+'" text-anchor="middle" font-family="Arial" font-size="14" fill="#495057">'+esc(e.lab)+'</text>':'')}
    else if(e.t==='cab'){var d2='M'+e.pts.map(function(p){return p[0]+' '+p[1]}).join('L'),m=e.q&&circ[e.q],lp=e.pts[Math.floor((e.pts.length-1)/2)],lq=e.pts[Math.floor((e.pts.length-1)/2)+1]||lp;
      s+='<path d="'+d2+'" stroke="#000" stroke-opacity="0" stroke-width="22" fill="none"/>'+(hl?'<path d="'+d2+'" stroke="#2F6BFF" stroke-width="12" fill="none" opacity=".35"/>':'')+'<path d="'+d2+'" stroke="'+CC+'" stroke-width="4" fill="none" stroke-dasharray="14 8" stroke-linejoin="round"/>'+
       '<text x="'+((lp[0]+lq[0])/2)+'" y="'+((lp[1]+lq[1])/2-8)+'" text-anchor="middle" font-family="Arial" font-size="15" font-weight="700" fill="'+CC+'">'+(m?'Q'+m.n+' · ':'')+esc(plFm(plLen(e.pts)))+'</text>'}
    else if(e.t==='dim'){var a=e.a,b=e.b,ang=Math.atan2(b[1]-a[1],b[0]-a[0]),nx=-Math.sin(ang)*8,ny=Math.cos(ang)*8;
      s+='<path d="M'+a[0]+' '+a[1]+'L'+b[0]+' '+b[1]+'M'+(a[0]-nx)+' '+(a[1]-ny)+'L'+(a[0]+nx)+' '+(a[1]+ny)+'M'+(b[0]-nx)+' '+(b[1]-ny)+'L'+(b[0]+nx)+' '+(b[1]+ny)+'" stroke="'+(hl?'#2F6BFF':'#0B7285')+'" stroke-width="2"/><text x="'+((a[0]+b[0])/2)+'" y="'+((a[1]+b[1])/2-8)+'" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" fill="#0B7285">'+esc(plFm(Math.hypot(b[0]-a[0],b[1]-a[1])))+'</text>'}
    h+=grp(e,s)})});
  // disegno in corso
  var dr=opt.draw;if(dr&&dr.pts&&dr.pts.length){h+='<path d="M'+dr.pts.map(function(p){return p[0]+' '+p[1]}).join('L')+'" stroke="'+(dr.t==='wall'?'#495057':CC)+'" stroke-width="'+(dr.t==='wall'?20:4)+'" fill="none" opacity=".6" stroke-dasharray="'+(dr.t==='wall'?'0':'14 8')+'"/>';dr.pts.forEach(function(p){h+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="7" fill="#E8590C"/>'});if(dr.pts.length>1&&dr.t!=='dim')h+='<text x="'+dr.pts[dr.pts.length-1][0]+'" y="'+(dr.pts[dr.pts.length-1][1]-14)+'" font-family="Arial" font-size="16" font-weight="700" fill="#E8590C">'+esc(plFm(plLen(dr.pts)))+'</text>'}
  // scala grafica
  var sx=20,sy=H-24;h+='<path d="M'+sx+' '+sy+'H'+(sx+100)+'M'+sx+' '+(sy-6)+'V'+(sy+6)+'M'+(sx+100)+' '+(sy-6)+'V'+(sy+6)+'" stroke="#212529" stroke-width="2"/><text x="'+(sx+50)+'" y="'+(sy-10)+'" text-anchor="middle" font-family="Arial" font-size="14" fill="#212529">1 m</text>';
  return h+'</svg>'}
var PLT=[['sel','👆'],['wall','🧱'],['door','🚪'],['win','🪟'],['txt','🔤'],['sym:lamp','💡'],['sym:sw','🔘'],['sym:sock','🔌'],['cab','〰'],['dim','📏'],['note','📝']];
function stPlan(){var pl=plGet(),st=stS(),P_=pnl(),tool=st.pt||'sel',sel=st.ps?pl.els.find(function(e){return e.id===st.ps}):null,dr=st.pd;
  var tools='<div class="sttools">'+PLT.map(function(t){var lab=t[0].indexOf('sym:')===0?sL(PLSYMBY[t[0].slice(4)][1]):sL(PLX[t[0]]);return '<button class="'+(tool===t[0]?'on':'')+'" data-act="plt" data-v="'+t[0]+'">'+t[1]+' '+esc(lab)+'</button>'}).join('')+'<button data-act="plsym">➕ '+esc(sL(PN.add))+'</button></div>';
  var acts='<div class="sttools sub"><button data-act="plpr"'+(sel?'':' disabled')+'>✏️ '+esc(sL(STX.prop))+'</button><button data-act="plrot"'+(sel?'':' disabled')+'>'+esc(sL(PLX.rot))+'</button><button data-act="pldup"'+(sel?'':' disabled')+'>⧉ '+esc(sL(PN.dup))+'</button><button data-act="pllock"'+(sel?'':' disabled')+'>'+(sel&&sel.lock?'🔓':'🔒')+' '+esc(sL(STX.lock))+'</button><button data-act="pldel"'+(sel?'':' disabled')+'>🗑 '+esc(sL(STX.del))+'</button><button data-act="pllay">🗂 '+esc(sL(PLX.layers))+'</button><button class="'+(pl.grid?'on':'')+'" data-act="plgrid">▦ '+esc(sL(PLX.grid))+'</button><button data-act="plbg">'+esc(sL(PLX.bg))+'</button></div>';
  var hint=tool==='sel'?PLX.hSel:(tool==='wall'||tool==='cab')?PLX.hPoly:tool==='dim'?PLX.hDim:PLX.hOne;
  var cnt={};pl.els.forEach(function(e){if(e.t==='sym')cnt[e.k]=(cnt[e.k]||0)+1});var cl=0;pl.els.forEach(function(e){if(e.t==='cab')cl+=plLen(e.pts)});
  return (pl.els.length?'':'<div class="mini" style="margin:2px 4px 8px">ⓘ '+esc(sL(PLX.empty))+'</div>')+tools+acts+
   '<div class="stwire'+(dr?' on':'')+'"><span>👉 '+esc(sL(hint))+'</span>'+(dr&&dr.pts.length?'<button data-act="plun">↶</button>'+((dr.t==='wall'||dr.t==='cab')&&dr.pts.length>1?'<button data-act="plfin">'+esc(sL(PLX.fin))+'</button>':''):'')+'</div>'+
   '<div class="stc plc"><div class="stz" style="transform:translate('+st.x+'px,'+st.y+'px) scale('+st.z+')">'+plSVG(P_,{fh:1,sel:st.ps,draw:dr})+'</div><div class="stzoom"><button data-act="stz" data-v="1">＋</button><button data-act="stz" data-v="-1">－</button><button data-act="stz" data-v="0">⤢</button></div></div>'+
   '<div class="ststat"><span>'+esc(sL(PLX.count))+': '+(Object.keys(cnt).map(function(k){return esc(sL(PLSYMBY[k][1]))+' <b>'+cnt[k]+'</b>'}).join(' · ')||'—')+'</span><span>〰 <b>'+esc(plFm(cl))+'</b></span></div>'+
   '<div class="pngo" style="margin-top:10px"><button class="btn ghost" data-act="stx" data-v="pdfL">📄 PDF</button><button class="btn ghost" data-act="stx" data-v="svgL">🖼 SVG</button><button class="btn ghost" data-act="stx" data-v="dxfL">📐 DXF</button></div>'+
   '<button class="btn main" data-act="plord" style="margin-top:8px">'+esc(sL(PN.ord))+'</button><div class="mini" style="margin:8px 4px">ⓘ '+esc(sL(PLX.dxfNote))+'</div>'}
// coordinate del disegno da un tocco
function plPt(e){var sv=document.querySelector('.plc .stz svg');if(!sv)return null;var r=sv.getBoundingClientRect(),vb=sv.viewBox.baseVal;var x=(e.clientX-r.left)*vb.width/r.width,y=(e.clientY-r.top)*vb.height/r.height,g=10;return [Math.round(x/g)*g,Math.round(y/g)*g]}
function plOrtho(prev,p){if(!prev)return p;var dx=Math.abs(p[0]-prev[0]),dy=Math.abs(p[1]-prev[1]);if(dy<dx*0.27)return [p[0],prev[1]];if(dx<dy*0.27)return [prev[0],p[1]];return p}
function plAdd(e){var pl=plGet();pl.els.push(e);stS().ps=e.id;save()}
function plTap(ev){var st=stS(),tool=st.pt||'sel',p=plPt(ev);if(!p)return;var pl=plGet();
  if(tool==='wall'||tool==='cab'){if(!st.pd)st.pd={t:tool,pts:[]};var last=st.pd.pts[st.pd.pts.length-1];st.pd.pts.push(plOrtho(last,p));render();return}
  if(tool==='dim'){if(!st.pd)st.pd={t:'dim',pts:[]};st.pd.pts.push(p);if(st.pd.pts.length===2){plAdd({id:pnUid(),t:'dim',L:'d',a:st.pd.pts[0],b:plOrtho(st.pd.pts[0],st.pd.pts[1])});st.pd=null}render();return}
  if(tool==='door'||tool==='win'){plAdd({id:pnUid(),t:tool,L:'w',x:p[0],y:p[1],r:0,w:tool==='door'?80:120});render();return}
  if(tool==='txt'||tool==='note'){var e={id:pnUid(),t:tool,L:tool==='txt'?'t':'d',x:p[0],y:p[1],s:''};plAdd(e);render();plProp(e.id);return}
  if(tool.indexOf('sym:')===0){var k=tool.slice(4),e2={id:pnUid(),t:'sym',L:'e',k:k,x:p[0],y:p[1],r:0,lab:'',q:null};var outs=(pnl().mods||[]).filter(function(m){return PNOUT[m.t]});
    var guess=k==='lamp'||k==='wlamp'||k==='sw'||k==='sw2'||k==='sw3'||k==='pb'||k==='pir'?'luci':k==='sock'||k==='sock2'||k==='sockp'?'prese':k==='ac'?'clima':null;var gm=outs.find(function(m){return m.k===guess});if(gm)e2.q=gm.id;plAdd(e2);render();return}}
function plFinish(){var st=stS(),d=st.pd;if(!d||d.pts.length<2){st.pd=null;render();return}plAdd(d.t==='wall'?{id:pnUid(),t:'wall',L:'w',pts:d.pts,th:20}:{id:pnUid(),t:'cab',L:'c',pts:d.pts,q:null,lab:''});st.pd=null;render();if(d.t==='cab')plProp(stS().ps)}
function plProp(id){var pl=plGet(),e=pl.els.find(function(x){return x.id===id}),P_=pnl();if(!e)return;var outs=(P_.mods||[]).filter(function(m){return PNOUT[m.t]});
  function draw(){var h='<h2>'+esc(e.t==='sym'?sL(PLSYMBY[e.k][1]):sL(PLX[e.t]))+'</h2>';
    if(e.t==='txt'||e.t==='note')h+='<div class="field"><label>'+esc(sL(LTX.name))+'</label><input id="plS" dir="auto" value="'+esc(e.s||'')+'" placeholder="'+esc(sL(PLX.room))+'"></div>';
    if(e.t==='sym'){h+=pnChips('k',PLSYM.map(function(s){return [s[0],sL(s[1])]}),e.k,sL(STX.type))+'<div class="field"><label>'+esc(sL(LTX.name))+'</label><input id="plS" dir="auto" value="'+esc(e.lab||'')+'"></div>'}
    if(e.t==='sym'||e.t==='cab')h+=pnChips('q',[['',sL(LTX.nolink)]].concat(outs.map(function(m){return [m.id,'Q'+m.n+' '+(m.l||'')]})),e.q||'',sL(LTX.link));
    if(e.t==='wall')h+=pnChips('th',[10,15,20,30,40].map(function(v){return [v,v+' cm']}),e.th||20,sL(S4('السماكة','Spessore','Thickness','Épaisseur')));
    if(e.t==='door'||e.t==='win')h+=pnChips('w',(e.t==='door'?[70,80,90,120]:[60,90,120,150,180]).map(function(v){return [v,v+' cm']}),e.w,sL(S4('العرض','Larghezza','Width','Largeur')));
    if(e.t==='cab'){var L=plLen(e.pts);h+='<div class="stcr"><b>'+esc(sL(PLX.lenTot))+': <span dir="ltr">'+esc(plFm(L))+'</span></b></div>'+(e.q?'<button class="btn ghost" id="plUse" style="width:100%">'+esc(sL(PLX.useLen))+'</button>':'')}
    h+='<button class="btn main" id="pnOk" style="margin-top:10px">'+esc(sL(PN.ok))+'</button>';
    openSheet(h);
    var si=$('#plS');if(si)si.oninput=function(){if(e.t==='sym')e.lab=si.value;else e.s=si.value;save();var z=document.querySelector('.plc .stz');if(z)z.innerHTML=plSVG(P_,{fh:1,sel:stS().ps})};
    sheet.querySelectorAll('[data-pk]').forEach(function(b){b.onclick=function(){var k=b.dataset.pk,v=b.dataset.pv;e[k]=(k==='th'||k==='w')?+v:(k==='q'?(v||null):v);save();render();draw()}});
    var ub=$('#plUse');if(ub)ub.onclick=function(){var m=(P_.mods||[]).find(function(x){return x.id===e.q});if(m){m.len=Math.round(plLen(e.pts)/10)/10;save();toast('✓ '+sL(PLX.lenOk)+' Q'+m.n+' = '+m.len+' m')}};
    $('#pnOk').onclick=closeSheet}
  draw()}
function plLayers(){var pl=plGet();function draw(){openSheet('<h2>🗂 '+esc(sL(PLX.layers))+'</h2>'+PLLAY.map(function(l){var o=pl.lay[l[0]]||(pl.lay[l[0]]={v:1});return '<div class="pnrow" style="grid-template-columns:1fr auto auto;align-items:center"><span>'+esc(sL(PLX[l[1]]))+'</span><button class="chip'+(o.v?' on':'')+'" data-ly="'+l[0]+'" data-f="v">👁 '+esc(sL(PLX.vis))+'</button>'+(l[0]!=='b'?'<button class="chip'+(o.l?' on':'')+'" data-ly="'+l[0]+'" data-f="l">🔒 '+esc(sL(PLX.lk))+'</button>':'<span></span>')+'</div>'}).join('')+
   pnChips('g',[[25,'25 cm'],[50,'50 cm'],[100,'1 m']],pl.g||50,sL(PLX.scale))+(pl.bg?pnChips('bgo',[[0.25,'25%'],[0.45,'45%'],[0.7,'70%'],[1,'100%']],pl.bgo||0.45,sL(PLX.Lb))+'<button class="btn ghost" id="plBgX" style="width:100%;margin-top:8px">'+esc(sL(PLX.bgDel))+'</button>':'')+'<button class="btn main" id="pnOk" style="margin-top:10px">'+esc(sL(PN.ok))+'</button>');
  sheet.querySelectorAll('[data-ly]').forEach(function(b){b.onclick=function(){var o=pl.lay[b.dataset.ly];o[b.dataset.f]=o[b.dataset.f]?0:1;save();render();draw()}});
  sheet.querySelectorAll('[data-pk]').forEach(function(b){b.onclick=function(){pl[b.dataset.pk]=+b.dataset.pv;save();render();draw()}});
  var bx=$('#plBgX');if(bx)bx.onclick=function(){delete pl.bg;save();render();draw()};$('#pnOk').onclick=closeSheet}draw()}
function plBg(){var inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.onchange=function(){var f=inp.files&&inp.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){var im=new Image();im.onload=function(){var pl=plGet(),k=Math.min(1,1600/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);pl.bg=c.toDataURL('image/jpeg',0.8);pl.H=Math.round(pl.W*c.height/c.width);save();render()};im.src=rd.result};rd.readAsDataURL(f)};inp.click()}
function plSymSheet(){openSheet('<h2>➕ '+esc(sL(PLX.Le))+'</h2><div class="pnadd">'+PLSYM.map(function(s){return '<button class="btn ghost" data-ps="'+s[0]+'">'+esc(sL(s[1]))+'</button>'}).join('')+'</div>');
  sheet.querySelectorAll('[data-ps]').forEach(function(b){b.onclick=function(){var st=stS();st.pt='sym:'+b.dataset.ps;st.pd=null;closeSheet();render()}})}
function plMat(){var pl=plGet(),M={},o=[];pl.els.forEach(function(e){if(e.t!=='sym')return;if(!M[e.k]){M[e.k]=0;o.push(e.k)}M[e.k]++});var cl=0;pl.els.forEach(function(e){if(e.t==='cab')cl+=plLen(e.pts)});
  var r=o.map(function(k){return {n:PLSYMBY[k][1],q:M[k],u:'pz'}});if(cl>0)r.push({n:S4('أنبوب مرن Ø20 (حسب المسارات)','Tubo corrugato Ø20 (da percorsi)','Corrugated conduit Ø20 (from routes)','Gaine ICTA Ø20 (selon tracés)'),q:Math.ceil(cl/100),u:'m'});return r}
function plOrder(){var r=plMat();if(!r.length)return;r.forEach(function(x){addLine({it:x.n.it,ar:x.n.ar,fr:x.n.fr,en:x.n.en,cat:'x',unit:x.u,qty:x.q,note:''})});save();refreshCounts();toast('✓ '+sL(PN.added))}
// trascinamento dell'elemento selezionato
(function(){var dg=null;
  document.addEventListener('pointerdown',function(e){var g=e.target.closest&&e.target.closest('.plc .pls');if(!g||(stS().pt||'sel')!=='sel')return;var pl=plGet(),el=pl.els.find(function(x){return x.id===g.dataset.v});if(!el||el.lock||(pl.lay[el.L]&&pl.lay[el.L].l))return;
    var p=plPt(e);if(!p)return;dg={el:el,p0:p,snap:JSON.stringify(el),moved:false};e.stopPropagation()},true);
  document.addEventListener('pointermove',function(e){if(!dg)return;var p=plPt(e);if(!p)return;var dx=p[0]-dg.p0[0],dy=p[1]-dg.p0[1];if(!dx&&!dy)return;dg.moved=true;var o=JSON.parse(dg.snap),el=dg.el;
    if(o.pts)el.pts=o.pts.map(function(q){return [q[0]+dx,q[1]+dy]});if(o.a){el.a=[o.a[0]+dx,o.a[1]+dy];el.b=[o.b[0]+dx,o.b[1]+dy]}if(o.x!=null){el.x=o.x+dx;el.y=o.y+dy}
    var z=document.querySelector('.plc .stz');if(z)z.innerHTML=plSVG(pnl(),{fh:1,sel:stS().ps});e.preventDefault()},{passive:false});
  function up(){if(!dg)return;var m=dg.moved;dg=null;if(m){save();plSup=true;render()}}
  document.addEventListener('pointerup',up);document.addEventListener('pointercancel',up)})();
var plSup=false;
document.addEventListener('click',function(e){if(view.cat!=='__panel'||!view.st||view.st.mod!=='plan')return;var t=e.target;if(!t.closest||!t.closest('.plc')||t.closest('.stzoom'))return;
  if(plSup){plSup=false;return}var st=stS(),tool=st.pt||'sel';
  if(tool==='sel'){var g=t.closest('[data-act="ple"]');st.ps=g?g.dataset.v:null;render();return}
  plTap(e)});
// DXF R12 (metri, Y verso l'alto)
function plDXF(P_){var pl=P_.plan,H=pl.H,o=[],circ={};(P_.mods||[]).forEach(function(m){circ[m.id]=m});
  function X(v){return (v/100).toFixed(3)}function Y(v){return ((H-v)/100).toFixed(3)}
  function ln(L,a,b){o.push('0','LINE','8',L,'10',X(a[0]),'20',Y(a[1]),'30','0','11',X(b[0]),'21',Y(b[1]),'31','0')}
  function tx(L,x,y,hgt,s){o.push('0','TEXT','8',L,'10',X(x),'20',Y(y),'30','0','40',(hgt/100).toFixed(3),'1',String(s).replace(/[\r\n]/g,' '))}
  function ci(L,x,y,r){o.push('0','CIRCLE','8',L,'10',X(x),'20',Y(y),'30','0','40',(r/100).toFixed(3))}
  function rot(x,y,r,px,py){var a=(r||0)*Math.PI/180;return [x+px*Math.cos(a)-py*Math.sin(a),y+px*Math.sin(a)+py*Math.cos(a)]}
  pl.els.forEach(function(e){
    if(e.t==='wall')for(var i=1;i<e.pts.length;i++)ln('WALLS',e.pts[i-1],e.pts[i]);
    else if(e.t==='door'){var w=e.w||80;ln('WALLS',[e.x,e.y],rot(e.x,e.y,e.r,0,-w));o.push('0','ARC','8','WALLS','10',X(e.x),'20',Y(e.y),'30','0','40',(w/100).toFixed(3),'50',String(-(e.r||0)),'51',String(90-(e.r||0)))}
    else if(e.t==='win'){var w2=e.w||120;ln('WALLS',rot(e.x,e.y,e.r,0,-12),rot(e.x,e.y,e.r,w2,-12));ln('WALLS',rot(e.x,e.y,e.r,0,12),rot(e.x,e.y,e.r,w2,12));ln('WALLS',[e.x,e.y],rot(e.x,e.y,e.r,w2,0))}
    else if(e.t==='txt'||e.t==='note')tx(e.t==='txt'?'ROOMS':'NOTES',e.x,e.y,e.t==='txt'?30:20,e.s||'');
    else if(e.t==='sym'){ci('ELECTRICAL',e.x,e.y,16);tx('ELECTRICAL',e.x+20,e.y-6,12,(PLSYMBY[e.k][1].it||e.k)+(e.q&&circ[e.q]?' Q'+circ[e.q].n:''))}
    else if(e.t==='cab'){for(var j=1;j<e.pts.length;j++)ln('CABLES',e.pts[j-1],e.pts[j]);tx('CABLES',e.pts[0][0],e.pts[0][1]-10,12,(e.q&&circ[e.q]?'Q'+circ[e.q].n+' ':'')+(plLen(e.pts)/100).toFixed(2)+' m')}
    else if(e.t==='dim'){ln('DIMENSIONS',e.a,e.b);tx('DIMENSIONS',(e.a[0]+e.b[0])/2,(e.a[1]+e.b[1])/2-8,14,(Math.hypot(e.b[0]-e.a[0],e.b[1]-e.a[1])/100).toFixed(2)+' m')}});
  var lays=['WALLS','ROOMS','NOTES','ELECTRICAL','CABLES','DIMENSIONS'],cols={WALLS:7,ROOMS:5,NOTES:6,ELECTRICAL:1,CABLES:30,DIMENSIONS:4},t=['0','SECTION','2','HEADER','9','$ACADVER','1','AC1009','0','ENDSEC','0','SECTION','2','TABLES','0','TABLE','2','LAYER','70',String(lays.length)];
  lays.forEach(function(l){t.push('0','LAYER','2',l,'70','0','62',String(cols[l]),'6','CONTINUOUS')});t.push('0','ENDTAB','0','ENDSEC','0','SECTION','2','ENTITIES');
  return t.concat(o,['0','ENDSEC','0','EOF']).join('\r\n')}

STX.plan=PLX.plan;

// ======================= Excel .xlsx (OOXML, zip senza compressione) =======================
var CRCT=null;function crc32(u){if(!CRCT){CRCT=new Uint32Array(256);for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;CRCT[n]=c>>>0}}var x=0xFFFFFFFF;for(var i=0;i<u.length;i++)x=CRCT[(x^u[i])&255]^(x>>>8);return (x^0xFFFFFFFF)>>>0}
function zipStore(files){var enc=new TextEncoder(),parts=[],cd=[],off=0;
  function u16(v){return [v&255,(v>>>8)&255]}function u32(v){return [v&255,(v>>>8)&255,(v>>>16)&255,(v>>>24)&255]}
  files.forEach(function(f){var name=enc.encode(f.name),data=typeof f.data==='string'?enc.encode(f.data):f.data,crc=crc32(data);
    var lh=[].concat(u32(0x04034b50),u16(20),u16(0x0800),u16(0),u16(0),u16(0x21),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0));
    parts.push(new Uint8Array(lh),name,data);
    cd.push(new Uint8Array([].concat(u32(0x02014b50),u16(20),u16(20),u16(0x0800),u16(0),u16(0),u16(0x21),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(off))),name);
    off+=lh.length+name.length+data.length});
  var cdLen=cd.reduce(function(a,b){return a+b.length},0);
  var end=new Uint8Array([].concat(u32(0x06054b50),u16(0),u16(0),u16(files.length),u16(files.length),u32(cdLen),u32(off),u16(0)));
  return new Blob(parts.concat(cd,[end]),{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})}
function xEsc(v){return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'')}
function xCol(n){var s='';n++;while(n>0){var m=(n-1)%26;s=String.fromCharCode(65+m)+s;n=Math.floor((n-1)/26)}return s}
// sheets: [{name, rows:[[cell...]], widths:[..]}], cella: stringa | numero | {f:'formula'} ; la prima riga è intestazione (grassetto)
function xlsxBlob(sheets,rtl){
  var wb='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>'+
   sheets.map(function(s,i){return '<sheet name="'+xEsc(s.name.replace(/[\[\]:*?\/\\]/g,' ').slice(0,31))+'" sheetId="'+(i+1)+'" r:id="rId'+(i+1)+'"/>'}).join('')+'</sheets></workbook>';
  var wbr='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+sheets.map(function(s,i){return '<Relationship Id="rId'+(i+1)+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet'+(i+1)+'.xml"/>'}).join('')+
   '<Relationship Id="rId'+(sheets.length+1)+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
  var styles='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="#,##0.00"/></numFmts><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts>'+
   '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF1F4FD8"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'+
   '<cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';
  var ct='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'+
   sheets.map(function(s,i){return '<Override PartName="/xl/worksheets/sheet'+(i+1)+'.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'}).join('')+'<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>';
  var rels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>';
  var files=[{name:'[Content_Types].xml',data:ct},{name:'_rels/.rels',data:rels},{name:'xl/workbook.xml',data:wb},{name:'xl/_rels/workbook.xml.rels',data:wbr},{name:'xl/styles.xml',data:styles}];
  sheets.forEach(function(s,i){var x='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"'+(rtl?' rightToLeft="1"':'')+'><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>';
    if(s.widths)x+='<cols>'+s.widths.map(function(w,j){return '<col min="'+(j+1)+'" max="'+(j+1)+'" width="'+w+'" customWidth="1"/>'}).join('')+'</cols>';
    x+='<sheetData>'+s.rows.map(function(r,ri){return '<row r="'+(ri+1)+'">'+r.map(function(c,ci){var ref=xCol(ci)+(ri+1),st=ri===0?' s="1"':'';
      if(c==null||c==='')return '';if(typeof c==='number'&&isFinite(c))return '<c r="'+ref+'"'+(st||(Math.round(c)!==c?' s="2"':''))+'><v>'+c+'</v></c>';
      if(typeof c==='object'&&c.f)return '<c r="'+ref+'" s="2"><f>'+xEsc(c.f)+'</f></c>';
      return '<c r="'+ref+'" t="inlineStr"'+st+'><is><t xml:space="preserve">'+xEsc(c)+'</t></is></c>'}).join('')+'</row>'}).join('')+'</sheetData></worksheet>';
    files.push({name:'xl/worksheets/sheet'+(i+1)+'.xml',data:x})});
  return zipStore(files)}
var XLX={xl:S4('📗 Excel','📗 Excel','📗 Excel','📗 Excel'),and:S4('ملف Excel يعمل في نسخة الويب والآيفون؛ هنا يُصدَّر CSV يفتح في Excel.','Il file Excel funziona nella versione web e iPhone; qui esporto un CSV che si apre in Excel.','The Excel file works in the web and iPhone version; here a CSV that opens in Excel is exported.','Le fichier Excel fonctionne en version web et iPhone ; ici un CSV ouvrable dans Excel est exporté.')};
function stXlsx(P){var lang=settings.out==='both'?'it':settings.out,t4=function(o){return TL(o,lang)},sym=curSym();
  if(A){toast(sL(XLX.and));stExport('csvM');return}
  var M=pnMat(P),mat=[[t4(S4('#','#','#','#')),t4(S4('المادة','Materiale','Item','Article')),t4(STX.qty),'U',t4(STX.price)+' '+sym,'Σ '+sym,t4(STX.status)]];
  M.forEach(function(x,i){var pr=P.price[x.k];mat.push([i+1,TL(x.n,lang),x.q,x.u==='m'?'m':'pz',pr!=null&&pr!==''?+pr:'',{f:'IF(E'+(i+2)+'="","",C'+(i+2)+'*E'+(i+2)+')'},t4({ok:STX.stOk,est:STX.stEst,calc:STX.stCalc}[x.s])])});
  mat.push(['','','','','Σ',{f:'SUM(F2:F'+(M.length+1)+')'},'']);
  var L=pnLayout(P),cir=[['Q',t4(LTX.name),t4(STX.type),t4(PN.poles),t4(PN.amp),t4(PN.sec)+' mm²',t4(STX.len),t4(STX.kw),'Ib A','ΔV %']];
  L.items.forEach(function(it){var m=it.m;if(m.t==='gap')return;var r=pnCirc(P,m);cir.push([(m.t==='term'?'X':'Q')+it.q,m.l||t4(PN.types[m.t]),t4(PN.types[m.t])+(m.ref?' · '+m.ref.b+' '+m.ref.r:''),m.p||'',m.A||'',m.s||'',m.len||'',m.kw||'',r?Math.round(r.ib*100)/100:'',r&&r.dvp!=null?Math.round(r.dvp*100)/100:''])});
  var N=pnNet(P,lang),wr=[['ID',t4(STX.wFrom),t4(STX.wTo),t4(STX.wC),t4(S4('اللون','Colore','Colour','Couleur')),t4(STX.wS)+' mm²',t4(STX.wK)]];N.w.forEach(function(w){wr.push([w.id,w.f,w.t,w.c,pnColName(P,w.c,lang),w.s||'',t4(STX[w.k])])});
  var cb=[[t4(MLX.cabId),t4(STX.wFrom),t4(STX.wTo),t4(MLX.cond),t4(STX.wS)+' mm²',t4(MLX.ln)+' m']];pnCables(P,lang).forEach(function(c){cb.push([c.id,c.from,c.to,c.n,c.s,c.len===''?'':+c.len])});
  var tm=[[t4(MLX.dev),t4(MLX.tm),t4(STX.wC),t4(MLX.wire)]];pnTerms(P,lang).forEach(function(r){tm.push([r.d,r.t,r.c,r.w])});
  var sheets=[{name:t4(S4('المواد','Materiali','Materials','Matériel')),rows:mat,widths:[5,52,10,6,14,14,22]},{name:t4(S4('الدوائر','Circuiti','Circuits','Circuits')),rows:cir,widths:[6,26,30,8,8,12,10,10,10,10]},{name:t4(STX.wires),rows:wr,widths:[7,18,22,8,14,10,14]},{name:t4(MLX.cab),rows:cb,widths:[8,8,26,10,10,10]},{name:t4(MLX.term),rows:tm,widths:[10,12,8,8]}];
  if(P.plan&&P.plan.els&&P.plan.els.length){var pc=[[t4(S4('الرمز','Simbolo','Symbol','Symbole')),t4(STX.qty)]],cnt={};P.plan.els.forEach(function(e){if(e.t==='sym')cnt[e.k]=(cnt[e.k]||0)+1});Object.keys(cnt).forEach(function(k){pc.push([t4(PLSYMBY[k][1]),cnt[k]])});sheets.push({name:t4(PLX.plan),rows:pc,widths:[30,10]})}
  fileReadySheet(new File([xlsxBlob(sheets,lang==='ar')],stFname(P,lang==='ar'?'SiteNeeds_لوحة':'SiteNeeds_quadro','xlsx'),{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}))}

var MLD={more:{ar:'سطور إضافية',it:'Altre righe',en:'More lines',fr:'Plus de lignes'},clear:{ar:'مسح',it:'Svuota',en:'Clear',fr:'Effacer'},
 send:{ar:'حفظ وإرسال',it:'Salva e invia',en:'Save & send',fr:'Enregistrer et envoyer'},back:{ar:'رجوع',it:'Indietro',en:'Back',fr:'Retour'},
 hint:{ar:'اكتب بنفسك القطع والكمية والوحدة. تبقى محفوظة في الهاتف حتى ترسلها.',it:'Scrivi tu pezzi, quantità e unità. Resta salvata sul telefono finché la invii.',en:'Type parts, quantity and unit. It stays saved on your phone until you send it.',fr:'Écrivez pièces, quantités et unités. La liste reste enregistrée jusqu’à l’envoi.'},
 noPrice:{ar:'قطع وكميات فقط، بدون أسعار.',it:'Solo pezzi e quantità, senza prezzi.',en:'Parts and quantities only, no prices.',fr:'Pièces et quantités uniquement, sans prix.'},
 ph:{ar:'مثلاً أنبوب مرن 25',it:'es. tubo corrugato 25',en:'e.g. flexible conduit 25',fr:'ex. gaine ICTA 25'},
 site:{ar:'الورشة',it:'Cantiere',en:'Site',fr:'Chantier'},by:{ar:'طلب من',it:'Richiesta di',en:'Requested by',fr:'Demandé par'},
 how:{ar:'كيف تريد إرسالها؟',it:'Come vuoi inviarla?',en:'How do you want to send it?',fr:'Comment l’envoyer ?'},sure:{ar:'مسح كل السطور؟',it:'Svuotare tutte le righe?',en:'Clear all lines?',fr:'Effacer toutes les lignes ?'}};
function manRow(){return {n:'',q:'',u:'pz'}}
function manDoc(){var p=cur();if(!p.man||!p.man.length){p.man=[];for(var i=0;i<12;i++)p.man.push(manRow())}return p.man}
function renderMList(){
  var p=cur(), rows=manDoc(), lang=settings.out==='both'?'it':settings.out;
  var lg=settings.logo&&/^data:image\//.test(settings.logo)?'<img src="'+settings.logo+'" alt="">':'<img src="'+ASSET_BASE+'brand/logo.webp" alt="" onerror="this.remove()">';
  var co=[settings.ditta,settings.coSub].filter(Boolean).join(' ');
  function uo(sel){return Object.keys(UNITS).map(function(k){return '<option value="'+k+'"'+(k===sel?' selected':'')+'>'+esc(unitOut(lang,k)||k)+'</option>'}).join('')}
  return '<button class="back" data-act="mlback">'+(settings.ui==='ar'?'→ ':'← ')+esc(L4(MLD.back))+'</button><div class="mini" style="margin:0 4px 10px">'+esc(L4(MLD.hint))+'</div>'+
   '<div class="paper"><div class="ph"><div class="pl">'+lg+'</div><div class="pt">'+(co?'<small dir="auto">'+esc(co)+'</small>':'')+'<b>'+esc(OUT[lang].titleL)+'</b></div></div><div class="pr"></div>'+
   '<div class="pm"><div>'+esc(L4(MLD.site))+': <b dir="auto">'+esc(p.name||p.site.cliente||'—')+'</b></div><div>'+esc(L4(MLD.by))+': <b dir="auto">'+esc(settings.tecnico||(settings.reg&&settings.reg.nome)||'—')+'</b> · <span dir="ltr">'+dateTxt()+'</span></div></div>'+
   '<div class="pth"><span>#</span><span>'+esc(lang==='ar'?OUT.ar.mat:OUT.it.mat||'Materiale')+'</span><span>'+esc(lang==='ar'?OUT.ar.qty:OUT.it.qty)+'</span><span></span></div>'+
   rows.map(function(r,i){return '<div class="prw"><span class="pn">'+(i+1)+'</span><input class="pin" data-pm="'+i+'" dir="auto" value="'+esc(r.n)+'"'+(i===0?' placeholder="'+esc(L4(MLD.ph))+'"':'')+'><input class="pq" data-pq="'+i+'" inputmode="decimal" placeholder="0" value="'+esc(r.q)+'"><select class="pu" data-pu="'+i+'">'+uo(r.u)+'</select></div>'}).join('')+
   whenRow()+'<div class="pbt"><button data-act="mlmore">➕ '+esc(L4(MLD.more))+'</button><button data-act="mlclear">🗑 '+esc(L4(MLD.clear))+'</button></div>'+
   '<div class="mini" style="margin-top:8px">'+esc(L4(MLD.noPrice))+'</div></div>'+
''; 
}
function manSync(){var rows=document.querySelectorAll('.paper .prw');if(!rows.length)return;var out=[];
  for(var i=0;i<rows.length;i++){var r=rows[i],a=r.querySelector('.pin'),b=r.querySelector('.pq'),c=r.querySelector('.pu');out.push({n:a?a.value:'',q:b?b.value:'',u:c?c.value:'pz'})}
  cur().man=out;save();}
function manApply(){
  manSync(); var p=cur(), m=manDoc().filter(function(r){return String(r.n||'').trim()});
  if(!m.length){toast(L4(MLT.none));return false}
  p.lines=p.lines.filter(function(l){return !l.man});
  m.forEach(function(r){p.lines.push({item:null,it:r.n.trim(),ar:r.n.trim(),cat:'x',unit:r.u||'pz',size:'',color:'',qty:num(r.q)||1,note:'',man:1})});
  save(); refreshCounts(); return true;
}
function manSend(){
  if(!manApply()) return;
  openSheet('<h2>📤 '+esc(L4(MLD.how))+'</h2><div class="sendopts"><button class="btn wa" id="moWa">WhatsApp</button><button class="btn pdf" id="moPdf">PDF</button><button class="btn cp" id="moCp">'+esc(T('copy'))+'</button></div>');
  $('#moWa').onclick=function(){closeSheet();doWa()};$('#moPdf').onclick=function(){closeSheet();doPdf()};$('#moCp').onclick=function(){closeSheet();doCopy()};
}
function manualList(){
  var rows=[{n:'',q:'1',u:'pz'},{n:'',q:'1',u:'pz'},{n:'',q:'1',u:'pz'}];
  function uOpts(sel){return Object.keys(UNITS).map(function(k){return '<option value="'+k+'"'+(k===sel?' selected':'')+'>'+esc(N(UNITS[k]))+'</option>'}).join('')}
  function rowsHtml(){return rows.map(function(r,i){return '<div class="mlrow"><input class="mln" data-mn="'+i+'" placeholder="'+esc(L4(MLT.nm))+'" value="'+esc(r.n)+'"><input class="mlq" data-mq="'+i+'" inputmode="decimal" value="'+esc(r.q)+'"><select class="mlu" data-mu="'+i+'">'+uOpts(r.u)+'</select><button class="mldel" data-md="'+i+'">✕</button></div>'}).join('')}
  function sync(){sheet.querySelectorAll('[data-mn]').forEach(function(x){rows[+x.dataset.mn].n=x.value});sheet.querySelectorAll('[data-mq]').forEach(function(x){rows[+x.dataset.mq].q=x.value});sheet.querySelectorAll('[data-mu]').forEach(function(x){rows[+x.dataset.mu].u=x.value})}
  function draw(){
    var box=$('#mlRows'); box.innerHTML=rowsHtml();
    box.querySelectorAll('[data-md]').forEach(function(b){b.onclick=function(){sync();rows.splice(+b.dataset.md,1);if(!rows.length)rows.push({n:'',q:'1',u:'pz'});draw()}});
  }
  openSheet('<h2>'+icH('📝')+' '+esc(L4(MLT.t))+'</h2><div class="mini" style="margin-bottom:10px">'+esc(L4(MLT.sub))+'</div><div id="mlRows"></div>'+
   '<button class="btn ghost" id="mlAdd" style="width:100%;margin-top:6px">➕ '+esc(L4(MLT.row))+'</button>'+
   '<details class="mltxt"><summary>📋 '+esc(L4(MLT.txt))+'</summary><textarea id="mlT" dir="auto" rows="5" placeholder="'+esc(L4(MLT.txtP))+'"></textarea></details>'+
   '<button class="btn main" id="mlGo">✓ '+esc(L4(MLT.add))+'</button>');
  draw();
  $('#mlAdd').onclick=function(){sync();rows.push({n:'',q:'1',u:'pz'});draw();var l=sheet.querySelectorAll('.mln');l[l.length-1].focus()};
  $('#mlGo').onclick=function(){
    sync(); var out=rows.filter(function(r){return r.n.trim()}).map(function(r){return {n:r.n.trim(),q:num(r.q)||1,u:r.u}});
    ($('#mlT').value||'').split('\n').forEach(function(l){l=l.trim();if(!l)return;
      var m=l.match(/^(\d+(?:[.,]\d+)?)\s*(m|mt|metri|metres?|متر|pz|pezzi|قطعة|kg|كغ)?\s+(.+)$/i)||null, q=1, u='pz', n=l;
      if(m){q=num(m[1])||1;n=m[3];if(m[2])u=/^(m|mt|metri|metres?|متر)$/i.test(m[2])?'m':/^(kg|كغ)$/i.test(m[2])?'kg':'pz'}
      else{var e=l.match(/^(.+?)\s*[x×*]\s*(\d+(?:[.,]\d+)?)$/i);if(e){n=e[1];q=num(e[2])||1}}
      out.push({n:n.trim(),q:q,u:u})});
    if(!out.length){toast(L4(MLT.none));return}
    out.forEach(function(o){addLine({it:o.n,ar:o.n,cat:'x',unit:o.u,qty:o.q,note:''})});
    closeSheet();toast(L4(MLT.ok)+' '+out.length);render();
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
function appVersion(){try{if(A&&A.version){var v=A.version(),j=+window.LM_JS_VER||0,m=String(v).match(/(\d+)$/);return j&&m&&j>+m[1]?v+' ⚡'+j:v}return WEB_VERSION}catch(e){return WEB_VERSION}}
function urlOk(u){u=String(u||'');return /^tel:/.test(u)||/^https:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?siteneeds\.net|mohamed203055\.github\.io)(\/|$)/.test(u)||u.indexOf('https://www.instagram.com/'+CONTACT.ig)===0||u.indexOf('https://www.tiktok.com/@'+CONTACT.tt)===0}
function openUrl(u,own){if(!own&&!urlOk(u))return;if(A&&A.open)A.open(u);else if(/^https?:/.test(u))window.open(u,'_blank');else location.href=u}
function openContact(k){
  if(k==='wa'){var t=T('reportMsg')+'\n\n(v'+appVersion()+')';if(A&&A.whatsapp)A.whatsapp(t,CONTACT.num);else openUrl('https://wa.me/'+CONTACT.num+'?text='+encodeURIComponent(t))}
  else if(k==='tel') openUrl('tel:+'+CONTACT.num);
  else if(k==='ig') openUrl('https://www.instagram.com/'+CONTACT.ig+'/');
  else if(k==='tt') openUrl('https://www.tiktok.com/@'+CONTACT.tt);
}
/* ---- professionisti consigliati: gestiti dal proprietario (app admin) in people.json ---- */
var PEOPLE=load(K.people,{ver:0,list:[]});
// ogni professionista appare solo agli utenti dello stesso Paese ('ALL' = a tutti)
function ccOf(txt){var t=String(txt||'').toLowerCase();if(/ital|إيطال/.test(t))return 'IT';if(/maroc|morocc|المغرب/.test(t))return 'MA';if(/fran|فرنس/.test(t))return 'FR';return t.trim()}
function myCC(){var r=settings.reg&&settings.reg.paese;return r?ccOf(r):packId()}
function proCC(p){return p.cc||ccOf(p.country)||'ALL'}
function prosList(){if(!rcFlag('pros'))return [];
  var me=myCC();
  return (PEOPLE.list||[]).filter(function(p){if(!p||p.hidden||!p.name)return false;var c=proCC(p);return c==='ALL'||c===me});
}
function proPic(p,big){
  var sz=big?96:56;
  if(p.photo&&/^data:image\//.test(p.photo)) return '<img src="'+esc(p.photo)+'" alt="" style="width:'+sz+'px;height:'+sz+'px;border-radius:'+(big?24:14)+'px;object-fit:cover;flex:none;background:var(--ghost)">';
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
  var apk=settings.liveApk||'SiteNeeds.apk';
  var t=L4(XT.shareAppMsg)+'\n\n'+L4(XT.shareAndroid)+'\n'+SITE+'SiteNeeds.apk'+'\n\n'+L4(XT.shareIos)+'\n'+SITE;
  ping('/usa/condividi-app','Invia app a un amico');
  if(A&&A.shareText)A.shareText(t);else if(navigator.share)navigator.share({text:t}).catch(function(){});else openUrl('https://wa.me/?text='+encodeURIComponent(t));
}
function settingsSheet(){
  var cty=(packList().find(function(p){return p.id===packId()})||packList()[0]);
  var langName=(LANGS.find(function(l){return l[0]===settings.ui})||LANGS[0])[1];
  var outName={it:T('langIt'),ar:T('langAr'),es:T('langEs'),en:T('langEn'),fr:T('langFr'),both:T('langBoth')}[settings.out]||'';
  var thName={light:L4(XT.thLight),dark:L4(XT.thDark),auto:L4(XT.thAuto)}[settings.theme||'auto'];
  function mrow(id,ic,bg,title,sub){return '<button class="mrow" id="'+id+'"><span class="ci" style="background:'+bg+'">'+ic+'</span><div><b>'+title+'</b>'+(sub?'<span dir="auto">'+sub+'</span>':'')+'</div><i>›</i></button>'}
  openSheet('<h2>'+T('settings')+'</h2><div class="mlist">'+
   mrow('mProf','👤','var(--brand)',L4(XT.secProfile).replace(/^\S+\s/,''),esc([cty.flag+' '+tradeLabel(),settings.tecnico,settings.ditta].filter(Boolean).join(' · ')))+
   mrow('mLang','🌐','#0EA5A4',T('uiLang'),esc(langName+' · 📄 '+outName))+
   mrow('mTheme','🎨','#8B5CF6',L4(XT.theme).replace(/^\S+\s/,''),thName)+
   mrow('mData','💾','#64748B',L4(XT.secData).replace(/^\S+\s/,''),L4(XT.bkHint))+
   '</div><div class="mlist">'+
   mrow('goAdmin','🔒','var(--dark)',T('admin').replace('🔒 ',''),T('adminSub'))+
   '</div><div class="mlist">'+
   (rcFlag('share')?mrow('shareApp','📤','var(--brand)',L4(XT.shareApp),''):'')+
   mrow('mBug','✉','#1DA851',T('report'),'')+
   mrow('updChk','🔄','#F59E0B',T('updCheck').replace(/^\S+\s/,''),'')+
   '</div><div class="mini" style="text-align:center;margin-top:14px" dir="ltr">v'+appVersion()+' · '+esc(anonId())+'<br>© 2026 SiteNeeds</div>');
  $('#mProf').onclick=function(){profileSheet()};
  $('#mLang').onclick=langSheet; $('#mTheme').onclick=themeSheet; $('#mData').onclick=dataSheet;
  $('#mBug').onclick=function(){openContact('wa')};
  $('#updChk').onclick=function(){checkUpdate(true)};
  if($('#shareApp'))$('#shareApp').onclick=shareApp;
  $('#goAdmin').onclick=function(){if(adminOK){closeSheet();enterAdmin()}else pwSheet()};
}
function backTo(){SHEET_BACK=settingsSheet;return ''}
function langSheet(){
  openSheet(backTo()+'<h2>🌐 '+T('uiLang')+'</h2>'+segChips('ui',settings.ui,LANGS)+'<div class="mini">'+L4(XT.uiHint)+'</div>'+
   '<h3>📄 '+T('outLang')+'</h3>'+segChips('out',settings.out,[['it',T('langIt')],['ar',T('langAr')],['es',T('langEs')],['en',T('langEn')],['fr',T('langFr')],['both',T('langBoth')]])+'<div class="mini">'+L4(XT.outHint)+'</div>');
  sheet.querySelectorAll('[data-ui]').forEach(function(b){b.onclick=function(){settings.ui=b.dataset.ui;saveSettings();applyLang();render();langSheet();toast(T('saved'))}});
  sheet.querySelectorAll('[data-out]').forEach(function(b){b.onclick=function(){settings.out=b.dataset.out;saveSettings();langSheet();toast(T('saved'))}});
}
function themeSheet(){
  openSheet(backTo()+'<h2>'+L4(XT.theme)+'</h2>'+segChips('th',settings.theme||'auto',[['light',L4(XT.thLight)],['dark',L4(XT.thDark)],['auto',L4(XT.thAuto)]]));
  sheet.querySelectorAll('[data-th]').forEach(function(b){b.onclick=function(){settings.theme=b.dataset.th;saveSettings();applyTheme();themeSheet()}});
}
function dataSheet(){
  openSheet(backTo()+'<h2>'+L4(XT.secData)+'</h2><div class="mini">'+L4(XT.bkHint)+'</div><div class="row2" style="margin-top:12px"><button class="btn ghost" id="bkSave">'+L4(XT.bkSave)+'</button><button class="btn ghost" id="bkOpen">'+L4(XT.bkOpen)+'</button></div>');
  $('#bkSave').onclick=userBackup; $('#bkOpen').onclick=openUserFile;
}
// profilo professionale: modifica con «Salva» sempre visibile in basso
function profileSheet(keep){
  var cc=(keep&&keep.cc)||packId(), tr=(keep&&keep.tr)||tradeId(), k=keep||{};
  function val(x,d){return k[x]!=null?k[x]:d}
  openSheet(backTo()+'<h2>'+L4(XT.editProfile)+'</h2>'+
   '<h3>'+CT('country')+'</h3>'+segChips('cc',cc,packList().map(function(p){return [p.id,p.flag+' '+(TL(p.name,settings.ui))]}))+'<div class="mini">'+CT('countryHint')+'</div>'+
   '<h3>'+L4(XT.tradeT)+'</h3>'+segChips('tr',tr,tradeList().map(function(t){return [t[0],t[1]+' '+TL(t[2],settings.ui)]}))+'<div class="mini">'+L4(XT.tradeHint)+'</div>'+
   '<div class="field"><label>'+T('tecnico')+'</label><input id="st" value="'+esc(val('st',settings.tecnico))+'"></div>'+
   '<div class="field"><label>'+T('ditta')+'</label><input id="sd" value="'+esc(val('sd',settings.ditta))+'" placeholder="'+T('dittaP')+'"></div>'+
   '<div class="field"><label>'+L4(XT.logo)+'</label><div class="logorow">'+(settings.logo?'<img src="'+settings.logo+'" alt="">':'')+'<button class="btn ghost" id="slogo">'+L4(XT.logoAdd)+'</button>'+(settings.logo?'<button class="del" id="slogoDel">🗑</button>':'')+'</div><div class="mini" style="margin-top:6px">'+L4(XT.logoTip)+'</div>'+(settings.logo?'<label class="tgl"><span>'+L4(LGT.pdf)+'</span><input type="checkbox" id="lgPdf"'+(settings.logoPdfOff?'':' checked')+'></label>':'')+'<label class="tgl"><span>'+L4(LGT.wm)+'</span><input type="checkbox" id="lgWm"'+(settings.wmOff?'':' checked')+'></label></div>'+
   '<div class="field"><label>'+L4(XT.myPhone)+'</label><input id="sph" class="ltr" inputmode="tel" value="'+esc(val('sph',settings.myPhone||''))+'" placeholder="+39 3xx xxx xxxx"></div>'+
   '<div class="field"><label>'+T('waNum')+'</label><input id="sw" class="ltr" inputmode="tel" value="'+esc(val('sw',settings.waNum))+'" placeholder="'+T('waNumP')+'"></div>'+
   '<div class="mini">'+T('waHint')+'</div>'+
   '<h3>'+icH('📄')+' '+L4(CO.sec)+'</h3><div class="mini">'+L4(CO.secH)+'</div>'+
   '<div class="field"><label>'+L4(CO.sub)+'</label><input id="cSub" dir="auto" value="'+esc(val('cSub',settings.coSub||''))+'" placeholder="di Nome Cognome"></div>'+
   '<div class="field"><label>'+L4(CO.addr)+'</label><input id="cAddr" dir="auto" value="'+esc(val('cAddr',settings.coAddr||''))+'" placeholder="Roma (RM)"></div>'+
   '<div class="field"><label>'+L4(CO.mail)+'</label><input id="cMail" class="ltr" inputmode="email" value="'+esc(val('cMail',settings.coMail||''))+'" placeholder="info@…"></div>'+
   '<div class="field"><label>'+L4(CO.vat)+'</label><input id="cVat" class="ltr" value="'+esc(val('cVat',settings.coVat||''))+'"></div>'+
   '<div class="field"><label>'+L4(CO.srv)+'</label><input id="cSrv" dir="auto" value="'+esc(val('cSrv',settings.coSrv||''))+'" placeholder="Impianti elettrici • Sicurezza • Domotica"></div>'+
   '<div class="field"><label>'+L4(CO.pay)+'</label><input id="cPay" dir="auto" value="'+esc(val('cPay',settings.coPay||''))+'" placeholder="Bonifico / Contanti"></div>'+
   '<div class="ssave"><button class="btn main" id="ssave" style="margin:0">'+T('save')+'</button></div>');
  sheet.querySelectorAll('[data-tr]').forEach(function(b){b.onclick=function(){tr=b.dataset.tr;sheet.querySelectorAll('[data-tr]').forEach(function(x){x.classList.toggle('on',x.dataset.tr===tr)})}});
  sheet.querySelectorAll('[data-cc]').forEach(function(b){b.onclick=function(){cc=b.dataset.cc;sheet.querySelectorAll('[data-cc]').forEach(function(x){x.classList.toggle('on',x.dataset.cc===cc)})}});
  function typed(){return {cc:cc,tr:tr,st:$('#st').value,sd:$('#sd').value,sph:$('#sph').value,sw:$('#sw').value,cSub:$('#cSub').value,cAddr:$('#cAddr').value,cMail:$('#cMail').value,cVat:$('#cVat').value,cSrv:$('#cSrv').value,cPay:$('#cPay').value}}
  $('#slogo').onclick=function(){var t=typed();pickPhoto(function(d){
    var im=new Image();im.onload=function(){var M=300,q=Math.min(1,M/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*q);cv.height=Math.round(im.height*q);var g=cv.getContext('2d');g.drawImage(im,0,0,cv.width,cv.height);
      cleanLogo(cv.toDataURL('image/png'),function(c){settings.logo=c;settings.logoClean=1;saveSettings();applyLang();profileSheet(t);sheet.scrollTop=300})};im.src=d})};
  var ld=$('#slogoDel'); if(ld) ld.onclick=function(){var t=typed();settings.logo='';saveSettings();profileSheet(t);sheet.scrollTop=300};
  $('#ssave').onclick=function(){
    var ch=cc!==packId(),tch=tr!==tradeId();
    settings.statsOff=false;settings.tecnico=$('#st').value.trim();settings.ditta=$('#sd').value.trim();settings.myPhone=$('#sph').value.trim();settings.waNum=$('#sw').value.trim();settings.coSub=$('#cSub').value.trim();settings.coAddr=$('#cAddr').value.trim();settings.coMail=$('#cMail').value.trim();settings.coVat=$('#cVat').value.trim();settings.coSrv=$('#cSrv').value.trim();settings.coPay=$('#cPay').value.trim();var lp=$('#lgPdf');if(lp)settings.logoPdfOff=!lp.checked;var lw=$('#lgWm');if(lw)settings.wmOff=!lw.checked;saveSettings();
    if(ch){setCountry(cc);view.cat=null} if(tch)setTrade(tr);
    closeSheet();applyLang();render();window.scrollTo(0,0);toast(tch?L4(XT.tradeOn)+' '+tradeLabel():T('saved'));
  };
}
// professionisti consigliati: pagina a parte (non più nelle impostazioni)
function prosPage(){
  openSheet('<h2>'+L4(XT.pros)+'</h2><div class="mini">'+L4(XT.prosHint)+'</div>'+prosSection().replace(/^<h3[^>]*>.*?<\/h3><div class="mini">.*?<\/div>/,''));
  sheet.querySelectorAll('[data-pro]').forEach(function(b){b.onclick=function(){SHEET_BACK=prosPage;proSheet(b.dataset.pro)}});
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
  openSheet('<h2>'+T('admin')+'</h2><div class="field"><label>'+T('pw')+'</label><input id="pw" type="password" class="ltr" autocomplete="off"></div><button class="btn main" id="pwok">'+T('enter')+'</button>'+
   '<button class="btn pwask" id="pwAsk"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3 20 3"/><path d="m16 7 3 3"/><path d="m18.5 4.5 2 2"/></svg><span>'+esc(L4(XT.pwAsk))+'</span></button>');
  $('#pwAsk').onclick=function(){ping('/usa/richiesta-password','Richiesta password');var nm=settings.reg&&settings.reg.nome?settings.reg.nome:'';var t=L4(XT.pwAskMsg)+(nm?'\n— '+nm:'');if(A&&A.whatsapp)A.whatsapp(t,CONTACT.num);else openUrl('https://wa.me/'+CONTACT.num+'?text='+encodeURIComponent(t))};
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
     DB.cats.map(function(c,i){return '<div class="row'+(c.hidden?' hid':'')+'"><button class="t" style="text-align:start;display:flex;gap:10px;align-items:center" data-act="admcat" data-v="'+c.id+'"><span style="font-size:22px">'+icH(c.ic,'📦')+'</span><span><b style="display:block">'+esc(N(c))+'</b><span style="display:block;font-size:12.5px;color:var(--sub)">'+c.items.length+' '+T('items')+'</span></span></button>'+tools('cat',c.id,i,DB.cats.length,c.hidden)+'</div>'}).join('')+'</div>';
  }
  if(a.page==='items'){
    var c=CBY[a.cat]; if(!c){view.adm={page:'cats'};return renderAdmin()}
    return admHead(icH(c.ic)+' '+esc(N(c)),'cats')+
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
   '<div class="field"><label>'+T('category')+'</label><div class="chips">'+DB.cats.map(function(c){return '<button class="chip'+(c.id===cat?' on':'')+'" data-cat="'+c.id+'">'+icH(c.ic)+' '+esc(N(c))+'</button>'}).join('')+'</div></div>'+
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
      importBackupData(d);
    };
    r.onerror=function(){toast(T('badFile'))};
    r.readAsText(f);
  };
  inp.click();
}
function importBackupData(d){
      confirmSheet(T('importQ'),T('importB').replace(/^\S+\s/,''),function(){
        DB=d.db; IMGS=d.imgs||{};
        if(d.projects&&d.projects.list){
          var have={};P.list.forEach(function(p){have[p.id]=1});
          d.projects.list.forEach(function(p){if(!have[p.id])P.list.push(p)});
        }
        saveDB();saveImgs();save();render();toast(T('imported'));
      });
}

/* =====================================================================
   OUTPUT (messaggio + PDF)
   ===================================================================== */
function O(lang,k){return lang==='both'?OUT.it[k]+' / '+OUT.ar[k]:OUT[lang][k]}
function nameOut(lang,o){if(lang==='both')return o.it+(o.ar&&o.ar!==o.it?' / '+o.ar:'');return trName(o,lang)}
function unitOut(lang,u){var U=unit(u);return TL(U,lang)}
function placeOut(lang){var p=placeOf(cur().site.luogo);return p?nameOut(lang,p):''}
var LGT={pdf:{ar:'🖼️ إظهار شعاري في أعلى PDF',it:'🖼️ Mostra il mio logo in alto nel PDF',en:'🖼️ Show my logo at the top of the PDF',fr:'🖼️ Afficher mon logo en haut du PDF'},
 wm:{ar:'💧 الشعار والاسم شفافان في وسط الورقة',it:'💧 Logo e nome trasparenti al centro del foglio',en:'💧 Faint logo and name in the middle of the page',fr:'💧 Logo et nom en filigrane au centre'}};
var CO={sec:{ar:'بيانات الشركة في الفاتورة وPDF',it:'Dati azienda su PDF e preventivi',en:'Company details on PDFs',fr:'Infos entreprise sur les PDF'},
 secH:{ar:'تظهر في أعلى وأسفل الورقة مع الشعار. كلها اختيارية.',it:'Appaiono in alto e in basso nel documento, con il logo. Tutto facoltativo.',en:'Shown at the top and bottom of the document with your logo. All optional.',fr:'Affichées en haut et en bas du document avec le logo. Tout est facultatif.'},
 sub:{ar:'سطر تحت اسم الشركة (مثلاً: di الاسم)',it:'Riga sotto il nome (es. di Nome Cognome)',en:'Line under the name',fr:'Ligne sous le nom'},
 addr:{ar:'العنوان / المدينة',it:'Indirizzo / Città',en:'Address / City',fr:'Adresse / Ville'},
 mail:{ar:'البريد الإلكتروني',it:'Email',en:'Email',fr:'E-mail'},
 vat:{ar:'الرقم الضريبي P.IVA / C.F.',it:'P.IVA / C.F.',en:'VAT no.',fr:'N° TVA / SIRET'},
 srv:{ar:'خدماتك (سطر قصير)',it:'Servizi (riga breve)',en:'Services (short line)',fr:'Services (ligne courte)'},
 pay:{ar:'طريقة الدفع',it:'Pagamento',en:'Payment',fr:'Paiement'}};
var DOCL={it:{num:'N.',date:'Data',valid:'Valido fino al',client:'Cliente',addr:'Indirizzo',place:'Luogo',tech:'Tecnico',pay:'Pagamento',notes:'Note',sign:'Firma e timbro',vat:'P.IVA / C.F.',ref:'Riferimento'},
 ar:{num:'رقم',date:'التاريخ',valid:'صالح حتى',client:'الزبون',addr:'العنوان',place:'المكان',tech:'التقني',pay:'الدفع',notes:'ملاحظات',sign:'التوقيع والختم',vat:'الرقم الضريبي',ref:'المرجع'},
 en:{num:'No.',date:'Date',valid:'Valid until',client:'Client',addr:'Address',place:'Place',tech:'Technician',pay:'Payment',notes:'Notes',sign:'Signature & stamp',vat:'VAT no.',ref:'Reference'},
 fr:{num:'N°',date:'Date',valid:'Valable jusqu’au',client:'Client',addr:'Adresse',place:'Lieu',tech:'Technicien',pay:'Paiement',notes:'Notes',sign:'Signature et cachet',vat:'N° TVA',ref:'Référence'}};
function DL(lang,k){return lang==='both'?DOCL.it[k]+' / <span dir="rtl">'+DOCL.ar[k]+'</span>':(TL(DOCL,lang))[k]}
var DOC_CSS='*{box-sizing:border-box}body{margin:0;font-family:"Noto Sans","Noto Sans Arabic",sans-serif;color:#14213D;font-size:13.5px;background:#fff}'+
 '.wrap{padding:0 38px}.pad{height:30px}'+
 '.bh{display:flex;justify-content:space-between;align-items:center;gap:18px;padding-bottom:12px}'+
 '.bh .co{display:flex;align-items:center;gap:14px;min-width:0}.bh .co img{max-height:84px;max-width:120px;object-fit:contain}'+
 '.bh .nm b{display:block;font-size:24px;line-height:1.1;color:#0E2A5C;font-weight:900;font-style:italic;text-transform:uppercase}.bh .nm i{display:block;font-size:16px;color:#0E2A5C;font-weight:700}'+
 '.bh .ct{font-size:12.5px;color:#334;line-height:1.75;text-align:start}.bh .ct div{white-space:nowrap}.bh .ct em{display:block;font-weight:800;color:#0E2A5C;margin-top:2px}'+
 '.rule{height:4px;border-radius:2px;background:linear-gradient(90deg,#0E2A5C 0%,#1F5BFF 55%,#F5B700 100%);margin-bottom:18px}'+
 '.tt{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:12px}.tt h1{margin:0;font-size:32px;font-weight:900;color:#0E2A5C;letter-spacing:.5px}'+
 '.box{border:1px solid #D9E1F0;background:#F6F9FE;border-radius:10px;padding:10px 14px}.kv{display:flex;justify-content:space-between;gap:18px;padding:2px 0}.kv span{color:#4A5470}.kv b{direction:ltr}'+
 '.two{display:grid;grid-template-columns:1.25fr 1fr;gap:12px;margin-bottom:14px}.two .box b.h{display:block;color:#0E2A5C;margin-bottom:4px}.two .box div{line-height:1.6}'+
 '.th,.r{display:grid;gap:10px;align-items:center;padding:9px 10px}'+
 '.th{background:#0E2A5C;color:#fff;font-size:12px;font-weight:700;border-radius:8px 8px 0 0}.th .e,.r .e{text-align:end}'+
 '.r{border:1px solid #E1E7F2;border-top:0;background:#fff}.r .n{color:#4A5470}.r .ar{color:#4A5068;font-size:12.5px;text-align:start}.r .nt{color:#B35C00;font-size:12px}.r .b{font-weight:800}.r .q{font-weight:800}.r .q small{font-weight:400;color:#646A80}'+
 '.cat{margin-top:10px;padding:6px 10px;font-weight:800;color:#0E2A5C;font-size:12.5px;background:#EEF3FC;border:1px solid #E1E7F2;border-top:0}.cat span{margin-inline-start:8px;color:#646A80;font-weight:600}'+
 '.ph{display:block;max-width:200px;max-height:150px;border-radius:6px;margin:6px 0 2px;border:1px solid #E3E5EC}'+
 '.cd{display:inline-block;width:11px;height:11px;border-radius:50%;border:1px solid rgba(0,0,0,.3);vertical-align:-1px;margin:0 4px}'+
 '.end{display:flex;gap:14px;align-items:flex-start;margin-top:16px}.end .box{flex:1}.tots{width:330px;flex:none;border-radius:10px;overflow:hidden;border:1px solid #D9E1F0}'+
 '.tr{display:flex;justify-content:space-between;padding:8px 12px;border-bottom:1px solid #E1E7F2;background:#F6F9FE}.tr span{color:#4A5470}.tr.big{background:#0E2A5C;color:#fff;font-size:18px;padding:12px}.tr.big span{color:#fff;font-weight:800}'+
 '.sg{display:flex;justify-content:space-between;align-items:flex-end;margin-top:22px;gap:12px}.sg .ln{width:220px;text-align:center;color:#4A5470;font-size:12px}.sg .ln:before{content:"";display:block;border-top:1.5px solid #9AA6C0;margin-bottom:4px}.sg .nb{font-size:12px;color:#646A80}'+
 '.bar{margin-top:18px;background:#0E2A5C;color:#fff;border-radius:8px;padding:9px 14px;font-size:11.5px;display:flex;justify-content:center;gap:10px;flex-wrap:wrap;border-top:3px solid #F5B700}'+
 '.sp{height:0}.wm{position:fixed;top:52%;left:50%;width:56%;transform:translate(-50%,-50%);opacity:.09;z-index:5;pointer-events:none;mix-blend-mode:multiply;text-align:center}.wm img{width:62%;max-height:300px;object-fit:contain}.wm b{display:block;font-size:44px;font-weight:900;font-style:italic;color:#0E2A5C;line-height:1.05;text-transform:uppercase}.wm i{display:block;font-size:26px;font-weight:700;color:#0E2A5C}';
function docHead(lang,title,boxRows){
  var lg=settings.logo&&/^data:image\//.test(settings.logo)&&!settings.logoPdfOff?'<img src="'+settings.logo+'" alt="">':'';
  var ct=[settings.coAddr?'📍 '+esc(settings.coAddr):'',settings.myPhone?'📞 <span dir="ltr">'+esc(settings.myPhone)+'</span>':'',settings.coMail?'✉️ <span dir="ltr">'+esc(settings.coMail)+'</span>':''].filter(Boolean).map(function(x){return '<div>'+x+'</div>'}).join('')+(settings.coSrv?'<em dir="auto">'+esc(settings.coSrv)+'</em>':'');
  var nm=(settings.ditta||settings.tecnico)?'<div class="nm"><b dir="auto">'+esc(settings.ditta||settings.tecnico)+'</b>'+(settings.coSub?'<i dir="auto">'+esc(settings.coSub)+'</i>':'')+'</div>':'';
  return '<div class="blk bh"><div class="co">'+lg+nm+'</div><div class="ct">'+ct+'</div></div><div class="blk rule"></div>'+
   '<div class="blk tt"><h1>'+title+'</h1><div class="box">'+boxRows.map(function(r){return '<div class="kv"><span>'+r[0]+':</span><b>'+esc(r[1])+'</b></div>'}).join('')+'</div></div>';
}
function docFoot(lang,withSign){
  var parts=[settings.ditta?esc(settings.ditta)+(settings.coSub?' '+esc(settings.coSub):''):'',settings.coVat?DL(lang,'vat')+' '+esc(settings.coVat):'',settings.coAddr?esc(settings.coAddr):''].filter(Boolean);
  var mk='<div class="blk" style="text-align:center;font-size:10.5px;color:#9AA3B8;margin-top:8px" dir="ltr">'+(settings.ui==='ar'?'SiteNeeds.net':'SiteNeeds.net')+'</div>';
  return (withSign?'<div class="blk sg"><span class="nb">'+withSign+'</span><span class="ln">'+DL(lang,'sign')+'</span></div>':'')+(parts.length?'<div class="blk bar">'+parts.join('<span>|</span>')+'</div>':'')+mk;
}
// toglie lo sfondo uniforme del logo (bianco, nero, colorato) partendo dai bordi → PNG trasparente
function cleanLogo(src,cb){
  var im=new Image();im.onload=function(){try{
    var w=im.width,h=im.height,cv=document.createElement('canvas');cv.width=w;cv.height=h;var g=cv.getContext('2d');g.drawImage(im,0,0);
    var d=g.getImageData(0,0,w,h),a=d.data;function px(x,y){var i=(y*w+x)*4;return [a[i],a[i+1],a[i+2],a[i+3]]}
    var cs=[px(0,0),px(w-1,0),px(0,h-1),px(w-1,h-1)];
    if(cs.every(function(c){return c[3]<20})){cb(src);return}
    var seen=new Uint8Array(w*h),st=[];
    function near(i){if(a[i+3]<20)return true;for(var k=0;k<4;k++){var c=cs[k];if(Math.abs(a[i]-c[0])+Math.abs(a[i+1]-c[1])+Math.abs(a[i+2]-c[2])<60)return true}return false}
    for(var x=0;x<w;x++){st.push(x,0,x,h-1)}for(var y=0;y<h;y++){st.push(0,y,w-1,y)}
    var cnt=0;
    while(st.length){var yy=st.pop(),xx=st.pop();if(xx<0||yy<0||xx>=w||yy>=h)continue;var j=yy*w+xx;if(seen[j])continue;seen[j]=1;var i=j*4;if(!near(i))continue;a[i+3]=0;cnt++;st.push(xx+1,yy,xx-1,yy,xx,yy+1,xx,yy-1)}
    if(cnt>w*h*0.85){cb(src);return}
    g.putImageData(d,0,0);cb(cv.toDataURL('image/png'))}catch(e){cb(src)}};
  im.onerror=function(){cb(src)};im.src=src;
}
if(settings.logo&&!settings.logoClean&&/^data:image\//.test(settings.logo)){setTimeout(function(){cleanLogo(settings.logo,function(c){settings.logo=c;settings.logoClean=1;saveSettings();try{applyLang()}catch(e){}})},800)}
function wmImg(){if(settings.wmOff)return '';var lg=settings.logo&&/^data:image\//.test(settings.logo)&&!settings.logoPdfOff;if(!lg&&!settings.ditta)return '';return '<div class="wm">'+(lg?'<img src="'+settings.logo+'" alt="">':'')+(settings.ditta?'<b>'+esc(settings.ditta)+'</b>'+(settings.coSub?'<i>'+esc(settings.coSub)+'</i>':''):'')+'</div>'}
function wmImgOld(){return settings.logo&&/^data:image\//.test(settings.logo)?'<img class="wm" src="'+settings.logo+'" alt="">':''}
function logoImg(){return settings.logo&&/^data:image\//.test(settings.logo)?'<img class="logo" src="'+settings.logo+'" style="max-height:56px;max-width:160px;display:block;margin-bottom:4px;margin-inline-start:auto">':''}
function dateTxt(){var d=new Date();function z(n){return (n<10?'0':'')+n}return z(d.getDate())+'/'+z(d.getMonth()+1)+'/'+d.getFullYear()}
var OUTF=null; // 'miss' = solo ciò che manca
function sortedLines(){
  var L=cur().lines.map(function(l,i){return {l:l,i:i}}).filter(function(x){return OUTF!=='miss'||!x.l.got});
  L.sort(function(a,b){return (catIndex(a.l.cat)-catIndex(b.l.cat))||(a.i-b.i)});
  return L.map(function(x){return x.l});
}
function specOut(lang,l){return [trSize(l.size,lang),l.color?colName(l.color,lang==='both'?'it':lang):''].filter(Boolean).join(' ')}
function buildText(wa,lang){
  lang=lang||settings.out;
  var B=wa?'*':'', p=cur(), s=p.site, out=[];
  out.push(B+(OUTF==='miss'?(XT.missTitle[lang==='both'?'it':lang]||XT.missTitle.it):'📋 '+O(lang,'title'))+B);
  if(s.cliente) out.push('👤 '+O(lang,'cliente')+': '+s.cliente);
  if(s.indirizzo) out.push('📍 '+O(lang,'indirizzo')+': '+s.indirizzo);
  if(s.luogo) out.push('🏠 '+O(lang,'luogo')+': '+placeOut(lang));
  out.push('📅 '+O(lang,'data')+': '+dateTxt());
  if(s.when) out.push(B+whenTxt(lang,s.when)+B);
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
    var ph=l.pid&&PH[l.pid]?'<img class="ph" src="'+PH[l.pid]+'">':'';
    rows+='<div class="blk r'+(n%2?'':' alt')+'"><div class="n">'+n+'</div><div class="d">'+nm+ph+(l.note?'<div class="nt">📝 <span dir="auto">'+esc(l.note)+'</span></div>':'')+'</div><div class="s">'+(spec||'—')+'</div><div class="q"><span dir="ltr">'+fmt(l.qty)+'</span> <small>'+unitOut(lang==='both'?'it':lang,l.unit)+'</small></div></div>';
  });
  var title=lang==='both'?'RICHIESTA MATERIALE <small style="display:block;font-size:16px;color:#646A80" dir="rtl">'+OUT.ar.title+'</small>':esc(OUT[lang].titleL).toUpperCase();
  var box=[[DL(lang,'date'),dateTxt()]]; if(settings.tecnico) box.push([DL(lang,'tech'),settings.tecnico]); if(s.when) box.push([(WHO[lang==='both'?'it':lang]||WHO.it),whenTxt(lang,s.when).replace(/^\S+\s/,'')]);
  var pl=placeOut(lang), cli=(s.cliente||s.indirizzo)?'<div class="box"><b class="h">'+DL(lang,'client')+'</b>'+(s.cliente?'<div dir="auto">'+esc(s.cliente)+'</div>':'')+(s.indirizzo?'<div dir="auto">📍 '+esc(s.indirizzo)+'</div>':'')+'</div>':'<div></div>';
  var rb=(pl||cur().name)?'<div class="box">'+(pl?'<b class="h">'+DL(lang,'place')+'</b><div dir="auto">'+esc(pl)+'</div>':'')+(cur().name?'<div dir="auto">'+DL(lang,'ref')+': '+esc(cur().name)+'</div>':'')+'</div>':'<div></div>';
  return '<!doctype html><html dir="'+(rtl?'rtl':'ltr')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=794"><style>'+DOC_CSS+
   '.th,.r{grid-template-columns:34px 1fr 170px 96px}</style></head><body>'+wmImg()+'<div class="wrap"><div class="pad"></div>'+
   docHead(lang,title,box)+
   ((s.cliente||s.indirizzo||pl||cur().name)?'<div class="blk two">'+cli+rb+'</div>':'')+
   '<div class="blk th"><div>#</div><div>'+lab('mat')+'</div><div>'+lab('size')+'</div><div class="e">'+(lang==='ar'?OUT.ar.qty:OUT.it.qty)+'</div></div>'+
   rows.replace(/class="blk r( alt)?"/g,'class="blk r"').replace(/<div class="q">/g,'<div class="q e">')+
   (s.note?'<div class="blk end"><div class="box"><b>'+lab('note')+':</b> <span dir="auto">'+esc(s.note)+'</span></div></div>':'')+
   '<div class="blk sg"><span class="nb">'+lab('tot')+': <b>'+n+'</b></span><span class="nb" dir="ltr">'+dateTxt()+'</span></div>'+
   docFoot(lang,'')+'<div class="pad"></div></div>'+
   '<script>'+PAGINATE+'<\/script></body></html>';
}
var QOUT={
 it:{title:'PREVENTIVO',titleL:'Preventivo',descr:'Descrizione lavori',qty:'Q.tà',price:'Prezzo',tot:'Totale',labour:'Totale manodopera',sconto:'Sconto',imp:'Imponibile',iva:'IVA',total:'TOTALE',noIva:'Prezzi IVA esclusa',matEx:'Solo manodopera, materiali esclusi.'},
 ar:{title:'عرض سعر',titleL:'عرض سعر',descr:'وصف الأعمال',qty:'الكمية',price:'السعر',tot:'المجموع',labour:'مجموع العمل',sconto:'خصم',imp:'المبلغ بدون ضريبة',iva:'IVA',total:'السعر النهائي',noIva:'الأسعار بدون IVA',matEx:'العمل اليدوي فقط، بدون المواد.'}
};
Object.assign(QOUT,window.LM_QOUT||{});
(function(){var X={num:['رقم العرض','N. preventivo','Quote no.','Devis n°'],valid:['صالح حتى','Valido fino al','Valid until','Valable jusqu’au'],
  nb:['عرض سعر غير ملزم','Preventivo non vincolante','Non-binding quote','Devis non contractuel'],phone:['الهاتف','Tel.','Phone','Tél.']};
  var L={ar:0,it:1,en:2,fr:3};Object.keys(L).forEach(function(l){if(QOUT[l])Object.keys(X).forEach(function(k){QOUT[l][k]=X[k][L[l]]})})})();
var VALID_DAYS=30;
function quoteNum(q){if(!q.num){var y=new Date().getFullYear();settings.qseq=(settings.qseq||0)+1;saveSettings();q.num=y+'-'+('00'+settings.qseq).slice(-3);save()}return q.num}
function validTxt(){var d=new Date(Date.now()+VALID_DAYS*864e5);function z(n){return (n<10?'0':'')+n}return z(d.getDate())+'/'+z(d.getMonth()+1)+'/'+d.getFullYear()}
function QO(lang,k){return lang==='both'?QOUT.it[k]+' / '+QOUT.ar[k]:QOUT[lang][k]}
function buildQuoteText(wa,lang){
  lang=lang||settings.out;
  var B=wa?'*':'', p=cur(), s=p.site, q=p.quote, t=qTotals(q), out=[];
  out.push(B+'🧾 '+QO(lang,'title')+' #'+quoteNum(q)+B);
  if(settings.ditta) out.push('🏢 '+settings.ditta+(settings.myPhone?' · 📞 '+settings.myPhone:''));
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
  out.push('⏳ '+QO(lang,'valid')+' '+validTxt()+' · '+QO(lang,'nb'));
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
  function tr(k,v,cls){return '<div class="tr'+(cls?' '+cls:'')+'"><span>'+k+'</span><b dir="ltr">'+v+'</b></div>'}
  var tots=tr(lab('labour'),eur(t.lab))+(t.sc?tr(lab('sconto'),'-'+eur(t.sc))+tr(lab('imp'),eur(t.imp)):'')+(q.iva?tr(lab('iva')+' '+qRate(q)+'%',eur(t.iva)):'')+tr(lab('total'),eur(t.tot),'big');
  var title=lang==='both'?'PREVENTIVO <small style="display:block;font-size:16px;color:#646A80" dir="rtl">'+QOUT.ar.title+'</small>':esc(QOUT[lang].titleL).toUpperCase();
  var box=[[DL(lang,'num'),quoteNum(q)],[DL(lang,'date'),dateTxt()],[DL(lang,'valid'),validTxt()]];
  var cli='<div class="box"><b class="h">'+DL(lang,'client')+'</b>'+(s.cliente?'<div dir="auto">'+esc(s.cliente)+'</div>':'<div>—</div>')+(s.indirizzo?'<div dir="auto">📍 '+esc(s.indirizzo)+'</div>':'')+'</div>';
  var rb='<div class="box">'+(cur().name?'<div><b class="h" style="display:inline">'+DL(lang,'ref')+':</b> <span dir="auto">'+esc(cur().name)+'</span></div>':'')+'<b class="h">'+DL(lang,'pay')+'</b><div dir="auto">'+esc(settings.coPay||'—')+'</div>'+(settings.tecnico?'<div>'+DL(lang,'tech')+': '+esc(settings.tecnico)+'</div>':'')+'</div>';
  var notes=[q.iva?'':lab('noIva'),lab('matEx')].filter(Boolean).join(' · ');
  return '<!doctype html><html dir="'+(rtl?'rtl':'ltr')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=794"><style>'+DOC_CSS+
   '.th,.r{grid-template-columns:30px 1fr 80px 100px 110px}</style></head><body>'+wmImg()+'<div class="wrap"><div class="pad"></div>'+
   docHead(lang,title,box)+'<div class="blk two">'+cli+rb+'</div>'+
   '<div class="blk th"><div>#</div><div>'+lab('descr')+'</div><div class="e">'+lab('qty')+'</div><div class="e">'+lab('price')+'</div><div class="e">'+lab('tot')+'</div></div>'+
   rows.replace(/class="blk r( alt)?"/g,'class="blk r"').replace(/<div class="c( b)?" dir="ltr">/g,function(m,b2){return '<div class="e'+(b2?' b':'')+'" dir="ltr">'})+
   '<div class="blk end"><div class="box"><b>'+DL(lang,'notes')+':</b><div>'+notes+'</div></div><div class="tots">'+tots+'</div></div>'+
   docFoot(lang,lab('nb'))+'<div class="pad"></div></div>'+
   '<script>'+PAGINATE+'<\/script></body></html>';
}
var PAGINATE="(function(){function go(){var W=document.documentElement.clientWidth||794,P=W*297/210,M=36,b=document.querySelectorAll('.blk');for(var i=0;i<b.length;i++){var e=b[i],r=e.getBoundingClientRect(),t=r.top+window.scrollY,h=r.height,pg=Math.floor(t/P),end=(pg+1)*P-M;if(t+h>end&&h<P-2*M){var sp=document.createElement('div');sp.className='sp';sp.style.height=((pg+1)*P+M-t)+'px';e.parentNode.insertBefore(sp,e)}}var wm=document.querySelector('.wm');if(wm){var HH=document.body.scrollHeight,nP=Math.max(1,Math.ceil((HH-2)/P));document.body.style.minHeight=Math.floor(nP*P-2)+'px';for(var k=0;k<nP;k++){var c=wm.cloneNode(true);c.style.position='absolute';c.style.top=Math.round(k*P+P/2)+'px';c.style.left='50%';c.style.transform='translate(-50%,-50%)';document.body.appendChild(c)}wm.parentNode.removeChild(wm)}var H=document.body.scrollHeight;if(window.Report)Report.ready(H,W);}if(document.readyState==='complete')setTimeout(go,60);else window.addEventListener('load',function(){setTimeout(go,60)})})();";
function fileName(isQuote){
  var p=cur(), c=(p.name||p.site.cliente||'').replace(/[^\w؀-ۿ -]+/g,'').trim().replace(/\s+/g,'_');
  var d=new Date(), base=isQuote?(settings.out==='ar'?'عرض_سعر':'Preventivo'):(settings.out==='ar'?'طلب_مواد':'Richiesta_materiale');
  return base+(c?'_'+c:'')+'_'+d.getFullYear()+('0'+(d.getMonth()+1)).slice(-2)+('0'+d.getDate()).slice(-2)+'.pdf';
}
function doWa(){if(view.tab==='mlist'&&!manApply())return;ping('/usa/whatsapp'+(view.tab==='price'?'-preventivo':''),'Uso WhatsApp');if(view.tab==='price'){var tq=buildQuoteText(true);if(A&&A.whatsapp)A.whatsapp(tq,'');else openUrl('https://wa.me/?text='+encodeURIComponent(tq));return}var t=buildText(true),n=settings.waNum.replace(/[^\d]/g,'');if(A&&A.whatsapp)A.whatsapp(t,n);else openUrl('https://wa.me/'+n+'?text='+encodeURIComponent(t))}
function doCopy(){if(view.tab==='mlist'&&!manApply())return;ping('/usa/copia'+(view.tab==='price'?'-preventivo':''),'Uso copia');
  var t=view.tab==='price'?buildQuoteText(false):buildText(false);
  if(A&&A.copy){A.copy(t);toast(T('copied'));return}
  function legacy(){var ta=document.createElement('textarea');ta.value=t;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,t.length);var ok=false;try{ok=document.execCommand('copy')}catch(e){}document.body.removeChild(ta);toast(ok?T('copied'):'✗')}
  if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function(){toast(T('copied'))},legacy); else legacy();
}
function doPdf(){if(view.tab==='mlist'&&!manApply())return;ping('/usa/pdf'+(view.tab==='price'?'-preventivo':''),'Uso PDF');
  var q=view.tab==='price';
  if(A&&A.pdf){toast(T('pdfWait'));A.pdf(q?buildQuoteReport():buildReport(),fileName(q))}
  else webPdf(q);
}

/* ---------- versione web (iPad / iPhone): PDF, condivisione file ---------- */
var WEB_VERSION=window.LM_WEB_VERSION||'web';
function loadScript(src,cb){if(window.html2canvas){cb();return}var sc=document.createElement('script');sc.src=src;sc.onload=cb;sc.onerror=function(){toast(T('pdfErr'))};document.head.appendChild(sc)}
function webPdf(isQuote){webPdfHtml(isQuote?buildQuoteReport():buildReport(),fileName(isQuote))}
function webPdfHtml(html,fname){
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
          if(i>=n){document.body.removeChild(ifr);var blob=pdfFromJpegs(pages);fileReadySheet(new File([blob],fname,{type:'application/pdf'}));return}
          window.html2canvas(doc.body,{x:0,y:Math.round(i*P),width:W,height:Math.round(P),scale:2,windowWidth:W,windowHeight:Math.round(P),backgroundColor:'#ffffff',logging:false,scrollX:0,scrollY:0})
           .then(function(cv){var d=cv.toDataURL('image/jpeg',0.9);pages.push({b:b64bytes(d.split(',')[1]),w:cv.width,h:cv.height});i++;next()})
           .catch(function(){document.body.removeChild(ifr);toast(T('pdfErr'))});
        })();
      },250);
    };
    ifr.srcdoc=html;
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
  if(!A&&/\.pdf$/i.test(file.name)) toast(T('pdfOk'));else if(!A)toast('✓ '+file.name.split('.').pop().toUpperCase());
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
   case 'arrived': arrivedSheet();break;
   case 'pros': prosPage();break;
   case 'pro': proSheet(v);break;
   case 'tplsave': tplSaveSheet();break;
   case 'tpluse': useTpl(v);break;
   case 'tpldel': confirmSheet(L4(XT.tplDelQ),T('del'),function(){TPL[profKey()]=tplList().filter(function(t){return t.id!==v});saveTpl();render()});break;
   case 'tomate': projectToMate();break;
   case 'fav': var y=window.scrollY;toast(L4(toggleFav(v)?XT.favAdd:XT.favDel));render();window.scrollTo(0,y);break;
   case 'kit': kitSheet(DB.kits.find(function(k){return k.id===v}));break;
   case 'custom': customSheet(v||'');break;
   case 'mlist': view.tab='mlist';view.cat=null;clearSearch();render();window.scrollTo(0,0);break;
   case 'mlback': manSync();view.tab='mat';render();break;
   case 'mlmore': manSync();for(var mi=0;mi<6;mi++)manDoc().push(manRow());save();render();break;
   case 'mlclear': if(confirm(L4(MLD.sure))){cur().man=null;cur().lines=cur().lines.filter(function(l){return !l.man});save();render()}break;
   case 'mlsend': manSend();break;
   case 'panel': view.tab='mat';view.cat='__panel';view.pSel=null;clearSearch();render();window.scrollTo(0,0);break;
   case 'pngen': pnGenSheet();break;
   case 'pntpl': {var tp=PTPL[+v];if(tp){var o2=JSON.parse(JSON.stringify(tp[2]));var nP=pnGen(o2);nP.name=pnL(tp[1]);cur().panel=nP;pnSave()}}break;
   case 'pnle': if(stS().wt)break;if(stS().mod==='panel'&&view.pSel!==+v){view.pSel=+v;render()}else pnEdit(v);break;
   case 'pnedit': pnEdit(v);break;
   case 'stexit': view.cat=null;view.pSel=null;render();window.scrollTo(0,0);break;
   case 'stmod': {var s_=stS();s_.mod=v;s_.z=1;s_.x=0;s_.y=0;render();window.scrollTo(0,0)}break;
   case 'stundo': pnUndo();break;
   case 'stredo': pnRedo();break;
   case 'stexp': stExpSheet();break;
   case 'stx': stExport(v);break;
   case 'stz': stZoom(v);break;
   case 'stlib': case 'stprop': case 'stdupm': case 'stcopy': case 'stpaste': case 'stdel': case 'stlock': case 'stmvl': case 'stmvr': stAct(a,v);break;
   case 'stvw': {var Pv=pnl();if(Pv){Pv.vw[v]=Pv.vw[v]?0:1;save();render()}}break;
   case 'stren': {var Pr=pnl();if(Pr&&confirm(pnL(STX.renum)+'?')){var nn=0;Pr.mods.forEach(function(m){if(m.t!=='gap')m.n=++nn});save();render()}}break;
   case 'stchk': stS().chk=true;render();break;
   case 'strc': {var Pc=pnl();if(Pc){var cc=Pc.rep.chk[b.dataset.k]||(Pc.rep.chk[b.dataset.k]={});cc.r=v;if(!v)cc.v='';Pc.meta.u=Date.now();save();var yy=window.scrollY;render();window.scrollTo(0,yy)}}break;
   case 'stgocalc': view.cat=null;view.tab='calc';render();window.scrollTo(0,0);break;
   case 'sttoq': stToQuote();break;
   case 'stf': stS().f=v;render();break;
   case 'stnew': {save();var np=blankProj();P.list.unshift(np);P.cur=np.id;save();var s2=stS();s2.mod='panel';view.pSel=null;render();window.scrollTo(0,0)}break;
   case 'stopen': P.cur=v;save();stS().mod='panel';view.pSel=null;render();window.scrollTo(0,0);break;
   case 'stdupp': if(dupProj(v)){var dp=P.list[0];if(dp.panel){pnMig(dp.panel);dp.panel.meta.st='draft';dp.panel.meta.c=dp.panel.meta.u=Date.now();delete dp.panel.vers}save();render()}break;
   case 'stmeta': stMeta(v);break;
   case 'ltadd': ltAddSheet();break;
   case 'plt': {var sp=stS();sp.pt=v;sp.pd=null;if(v!=='sel')sp.ps=null;render()}break;
   case 'plsym': plSymSheet();break;
   case 'plpr': if(stS().ps)plProp(stS().ps);break;
   case 'plrot': {var pe=plGet().els.find(function(x){return x.id===stS().ps});if(pe&&!pe.lock&&pe.x!=null){pe.r=((pe.r||0)+90)%360;save();render()}}break;
   case 'pldup': {var pd=plGet().els.find(function(x){return x.id===stS().ps});if(pd){var cp=JSON.parse(JSON.stringify(pd));cp.id=pnUid();delete cp.lock;if(cp.pts)cp.pts=cp.pts.map(function(q){return [q[0]+40,q[1]+40]});if(cp.a){cp.a=[cp.a[0]+40,cp.a[1]+40];cp.b=[cp.b[0]+40,cp.b[1]+40]}if(cp.x!=null){cp.x+=40;cp.y+=40}plAdd(cp);render()}}break;
   case 'pllock': {var pk=plGet().els.find(function(x){return x.id===stS().ps});if(pk){pk.lock=!pk.lock;save();render()}}break;
   case 'pldel': {var pl_=plGet(),pz=pl_.els.find(function(x){return x.id===stS().ps});if(pz){if(pz.lock){toast(pnL(STX.locked));break}pl_.els=pl_.els.filter(function(x){return x!==pz});stS().ps=null;save();render()}}break;
   case 'pllay': plLayers();break;
   case 'plgrid': {var pg_=plGet();pg_.grid=pg_.grid?0:1;save();render()}break;
   case 'plbg': plBg();break;
   case 'plun': {var su=stS();if(su.pd){su.pd.pts.pop();if(!su.pd.pts.length)su.pd=null}render()}break;
   case 'plfin': plFinish();break;
   case 'plord': plOrder();break;
   case 'stwt': {var s7=stS();s7.wt=!s7.wt;s7.wd=null;view.pSel=null;render()}break;
   case 'stwu': {var s8=stS();if(s8.wd)s8.wd.pts.pop();render()}break;
   case 'pnterm': {var s9=stS(),Pw=pnl();if(!s9.wt||!Pw)break;
     if(!s9.wd){s9.wd={a:v,pts:[]};render();break}
     if(s9.wd.a===v){toast(pnL(STX.wSame));break}
     var ta=pnTI(Pw,s9.wd.a),tb=pnTI(Pw,v);if(!Pw.uw)Pw.uw=[];Pw.uw.push({id:pnUid(),a:s9.wd.a,b:v,pts:s9.wd.pts,c:ta?ta.c:'',s:''});s9.wd=null;
     if(ta&&tb&&ta.c!==tb.c)toast('⚠️ '+pnL(STX.badC)+': '+ta.c+' ↔ '+tb.c);save();render()}break;
   case 'pnuw': if(!stS().wt)pnUwSheet(v);break;
   case 'stdg': {var s4=stS();s4.dg=v;s4.z=1;s4.x=0;s4.y=0;render()}break;
   case 'stsim': {var s5=stS();s5.sim=!s5.sim;s5.dg='u';if(!s5.off)s5.off={};render()}break;
   case 'sldt': {var s6=stS();if(!s6.off)s6.off={};if(s6.off[v])delete s6.off[v];else s6.off[v]=1;var y6=window.scrollY;render();window.scrollTo(0,y6)}break;
   case 'ltopen': {var s3=stS();s3.lt=v;s3.z=1;s3.x=0;s3.y=0;render();window.scrollTo(0,0)}break;
   case 'ltback': stS().lt=null;render();window.scrollTo(0,0);break;
   case 'ltt': ltTap(v);break;
   case 'ltord': ltOrder();break;
   case 'ltdel': {var lc=ltCur();if(lc&&confirm(pnL(LTX.sure))){var Pl=pnl();Pl.lts=Pl.lts.filter(function(x){return x.id!==lc.id});stS().lt=null;save();render()}}break;
   case 'stimp': stImport();break;
   case 'pnadd': stLib();break;
   case 'pnset': pnSet();break;
   case 'pnzoom': view.pZoom=!view.pZoom;render();break;
   case 'pnpdf': pnPdf();break;
   case 'pnwa': pnWa();break;
   case 'pnord': pnOrder();break;
   case 'tech': view.tab='mat';view.cat='__tech';clearSearch();render();window.scrollTo(0,0);break;
   case 'tf': {var tf=techF();tf[b.dataset.k]=v;render();}break;
   case 'tfreset': view.tf=null;render();break;
   case 'tadd': techAdd(v);break;
   case 'tpanel': {var tx2=(window.LM_TECH||{items:[]}).items[+v];if(!tx2)break;var P2=pnl();if(!P2){P2=cur().panel={v:1,sys:/^(3P|4P)$/.test(tx2.p||'')?'3':'1',row:12,lc:packId()==='IT'?'br':'rd',name:'',mods:[]}}
     if(P2.sys!=='3'&&/^(3P|4P)$/.test(tx2.p||'')){P2.sys='3';P2.mods.forEach(function(m){if(/^(main|isol|rcd|spd|cont)$/.test(m.t))m.p='4P';pnFix(m,'3')})}
     var m2=pnNew(PNCAT[tx2.c],P2.sys);pnApplyReal(m2,tx2,P2);P2.mods.push(m2);save();view.cat='__panel';view.pSel=P2.mods.length-1;render();window.scrollTo(0,0);toast('⚡ ✓ '+tx2.b+' '+tx2.r);}break;
   case 'when': {var st=cur().site;st.when=st.when===v?'':v;save();render();}break;
   case 'siteopen': cur().site.open=true;save();render();break;
   case 'siteclose': cur().site.open=false;save();render();break;
   case 'place': cur().site.luogo=cur().site.luogo===v?'':v;save();render();break;
   case 'inc': case 'dec':
    var l=L[+v],st=unit(l.unit).step;l.qty=Math.max(0,Math.round((l.qty+(a==='inc'?st:-st))*100)/100);if(l.qty===0)L.splice(+v,1);save();render();break;
   case 'del': L.splice(+v,1);save();render();break;
   case 'clear': confirmSheet(T('clearQ'),T('clear'),function(){cur().lines=[];save();render()});break;
   case 'preview': openSheet('<h2>'+T('previewT')+'</h2><pre dir="'+(settings.out==='ar'?'rtl':'ltr')+'" style="white-space:pre-wrap;font-family:inherit;font-size:14px;background:var(--field);color:var(--ink);padding:12px;border-radius:12px;text-align:start">'+esc(buildText(false))+'</pre>');break;
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
   case 'newlist': newListSheet();break;
   case 'allc': view.allc=!view.allc;render();break;
   case 'gocalc': view.tab='calc';view.cat=null;view.calc=null;clearSearch();render();window.scrollTo(0,0);break;
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
function pickPhoto(cb){
  var inp=$('#fileImg'); inp.value='';
  inp.onchange=function(){
    var f=inp.files&&inp.files[0]; if(!f) return;
    var r=new FileReader();
    r.onload=function(){var im=new Image();im.onload=function(){
      var M=800,w=im.width,h=im.height,k=Math.min(1,M/Math.max(w,h)),cv=document.createElement('canvas');
      cv.width=Math.round(w*k);cv.height=Math.round(h*k);var g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,cv.width,cv.height);g.drawImage(im,0,0,cv.width,cv.height);
      cb(cv.toDataURL('image/jpeg',0.62))};im.src=r.result};
    r.readAsDataURL(f);
  };
  inp.click();
}
function arrivedSheet(){
  var p=cur(),L=p.lines;
  function draw(){
    var g=L.filter(function(l){return l.got}).length;
    sheet.querySelector('#arrN').textContent=L4(XT.arrivedN).replace('%',g).replace('#',L.length);
    var b=sheet.querySelector('#arrSend'); b.disabled=g===L.length; b.textContent=g===L.length?L4(XT.allArrived):L4(XT.sendMissing);
  }
  openSheet('<h2>'+L4(XT.arrived)+'</h2><div class="it">'+L4(XT.arrivedHint)+'</div><div class="mini" id="arrN" style="margin:10px 0 4px;font-weight:700"></div><div class="list arrlist">'+
   sortedLines().map(function(l){var i=L.indexOf(l);return '<label class="arr"><input type="checkbox" data-got="'+i+'"'+(l.got?' checked':'')+'><span><b>'+esc(N(l))+'</b><small>'+fmt(l.qty)+' '+N(unit(l.unit))+(lineSub(l)?' · '+lineSub(l):'')+'</small></span></label>'}).join('')+
   '</div><button class="btn wa" id="arrSend" style="width:100%;margin-top:14px;padding:14px"></button>');
  sheet.querySelectorAll('[data-got]').forEach(function(c){c.onchange=function(){L[+c.dataset.got].got=c.checked;save();draw();refreshCounts()}});
  $('#arrSend').onclick=function(){
    ping('/usa/manca','Invio mancanti');
    OUTF='miss'; var t=buildText(true); OUTF=null;
    var n=settings.waNum.replace(/[^\d]/g,''); if(A&&A.whatsapp)A.whatsapp(t,n); else openUrl('https://wa.me/'+n+'?text='+encodeURIComponent(t));
  };
  draw();
  sheet._onclose=function(){render()};
}
function tplSaveSheet(){
  var p=cur(); if(!p.lines.length){toast(T('emptyCart'));return}
  openSheet('<h2>'+L4(XT.tplSave)+'</h2><div class="field"><label>'+L4(XT.tplName)+'</label><input id="tplN" value="'+esc(p.site.cliente||'')+'" placeholder="'+L4(XT.tplNameP)+'"></div><button class="btn main" id="tplOk">'+T('save')+'</button>');
  $('#tplOk').onclick=function(){var n=$('#tplN').value.trim()||L4(XT.tplNameP).replace(/^\S+:?\s*/,'');
    tplList().unshift({id:uid('t'),name:n,created:Date.now(),lines:p.lines.map(function(l){var c=JSON.parse(JSON.stringify(l));delete c.pid;delete c.got;return c})});
    saveTpl();closeSheet();toast(L4(XT.tplSaved));ping('/usa/modello','Modello salvato')};
}
function renderTpls(){
  var L=tplList();
  return '<button class="back" data-act="back">'+(settings.ui==='ar'?'→ ':'← ')+T('allCats')+'</button><div class="sec">'+L4(XT.tpls)+'</div>'+
   (L.length?'<div class="list">'+L.map(function(t){return '<div class="row tplrow"><div class="t"><b>'+esc(t.name)+'</b><span>'+t.lines.length+' '+T('items')+' · '+dstr(t.created).split(' ')[0]+'</span></div>'+
     '<button class="btn main" style="width:auto;margin:0;padding:9px 12px;font-size:13.5px" data-act="tpluse" data-v="'+t.id+'">'+L4(XT.tplUse)+'</button><button class="del" data-act="tpldel" data-v="'+t.id+'">🗑</button></div>'}).join('')+'</div>'
    :'<div class="empty"><div class="big">📋</div>'+L4(XT.tplEmpty)+'</div>');
}
function useTpl(id){var t=tplList().find(function(x){return x.id===id});if(!t)return;t.lines.forEach(function(l){addLine(JSON.parse(JSON.stringify(l)))});save();toast(L4(XT.tplUsed));view.tab='cart';view.cat=null;render();window.scrollTo(0,0)}
function shareFileTxt(name,txt){if(A&&A.shareFile)A.shareFile(name,txt,'application/json');else fileReadySheet(new File([txt],name,{type:'application/json'}))}
function projectToMate(){
  var p=cur(); if(isEmpty(p)){toast(T('emptyCart'));return}
  var ph={}; p.lines.forEach(function(l){if(l.pid&&PH[l.pid])ph[l.pid]=PH[l.pid]});
  var name=('progetto_'+(p.site.cliente||p.name||'')).replace(/[^\w\u0600-\u06FF -]+/g,'').trim().replace(/\s+/g,'_')+'.json';
  ping('/usa/collega','Progetto a collega');
  shareFileTxt(name,JSON.stringify({app:'lista-materiale',type:'project',trade:tradeId(),country:packId(),project:p,photos:ph}));
}
function userBackup(){
  var dbs={};try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(/^lm_db_/.test(k))dbs[k]=load(k,null)}}catch(e){}
  var d=new Date(), name='backup_progetti_'+d.getFullYear()+('0'+(d.getMonth()+1)).slice(-2)+('0'+d.getDate()).slice(-2)+'.json';
  ping('/usa/backup','Backup');
  shareFileTxt(name,JSON.stringify({app:'lista-materiale',type:'backup',v:1,at:Date.now(),projects:P,photos:PH,tpl:TPL,fav:FAV,dbs:dbs,
    settings:{tecnico:settings.tecnico,ditta:settings.ditta,waNum:settings.waNum,myPhone:settings.myPhone,logo:settings.logo,qseq:settings.qseq}}));
}
function openUserFile(){
  var inp=$('#fileJson'); inp.value='';
  inp.onchange=function(){
    var f=inp.files&&inp.files[0]; if(!f) return;
    var r=new FileReader();
    r.onload=function(){
      var d; try{d=JSON.parse(r.result)}catch(e){toast(L4(XT.badF));return}
      if(!d||d.app!=='lista-materiale'){toast(L4(XT.badF));return}
      if(d.type==='project'&&d.project&&d.project.lines){
        var p=d.project; p.id=uid('p'); p.updated=Date.now(); p.trade=d.trade||p.trade||'ele';
        Object.keys(d.photos||{}).forEach(function(k){PH[k]=d.photos[k]}); savePh();
        P.list.unshift(p); if((p.trade||'ele')!==tradeId()) setTrade(p.trade); P.cur=p.id; save(); closeSheet(); view.tab='cart'; render(); toast(L4(XT.prjDone)); return;
      }
      if(d.type==='backup'&&d.projects&&d.projects.list){
        confirmSheet(L4(XT.bkQ),L4(XT.bkOpen).replace(/^\S+\s/,''),function(){
          var have={},n=0;P.list.forEach(function(p){have[p.id]=1});
          d.projects.list.forEach(function(p){if(!have[p.id]){P.list.push(p);n++}});
          Object.keys(d.photos||{}).forEach(function(k){PH[k]=d.photos[k]});
          Object.keys(d.tpl||{}).forEach(function(k){var ex={};(TPL[k]=TPL[k]||[]).forEach(function(t){ex[t.id]=1});d.tpl[k].forEach(function(t){if(!ex[t.id])TPL[k].push(t)})});
          Object.keys(d.dbs||{}).forEach(function(k){if(load(k,null)==null)put(k,d.dbs[k])});
          var st=d.settings||{};['tecnico','ditta','waNum','myPhone','logo'].forEach(function(k){if(st[k]&&!settings[k])settings[k]=st[k]});
          if(st.qseq>(settings.qseq||0))settings.qseq=st.qseq;
          saveSettings();savePh();saveTpl();save();closeSheet();render();toast(L4(XT.bkDone).replace('%',n));
        });
        return;
      }
      if(d.db&&d.db.cats){importBackupData(d);return}
      toast(L4(XT.badF));
    };
    r.readAsText(f);
  };
  inp.click();
}
function lineMenu(i){
  var L=cur().lines,l=L[i];if(!l)return;
  openSheet('<h2>'+esc(N(l))+'</h2>'+(lineSub(l)?'<div class="it">'+lineSub(l)+' · '+fmt(l.qty)+' '+N(unit(l.unit))+'</div>':'')+
   (l.pid&&PH[l.pid]?'<img src="'+PH[l.pid]+'" style="display:block;max-width:100%;max-height:200px;border-radius:12px;margin:10px auto 0">':'')+
   '<button class="btn main" id="lmPh" style="background:var(--wa)">'+L4(XT.photo)+'</button>'+
   (l.pid&&PH[l.pid]?'<button class="btn ghost" id="lmPhDel" style="width:100%;margin-top:8px;padding:12px">🗑 '+L4(XT.photoDel)+'</button>':'')+
   '<button class="btn main" id="lmDup" style="margin-top:8px">'+L4(XT.dupLine)+'</button>'+
   '<button class="btn ghost" id="lmDel" style="width:100%;margin-top:8px;padding:14px;color:var(--danger)">'+L4(XT.delLine)+'</button>');
  $('#lmDup').onclick=function(){var c=JSON.parse(JSON.stringify(l));delete c.pid;delete c.got;L.splice(i+1,0,c);save();closeSheet();render();toast(L4(XT.lineDup))};
  $('#lmDel').onclick=function(){L.splice(i,1);save();closeSheet();render()};
  $('#lmPh').onclick=function(){pickPhoto(function(d){if(!l.pid)l.pid=uid('ph');PH[l.pid]=d;if(!savePh()){delete PH[l.pid];return}save();closeSheet();render();toast(L4(XT.photoAdded))})};
  var pd=$('#lmPhDel'); if(pd) pd.onclick=function(){delete PH[l.pid];savePh();save();closeSheet();render()};
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
main.addEventListener('change',function(e){if(e.target.dataset&&e.target.dataset.pu!=null)manSync()});
main.addEventListener('input',function(e){
  if(e.target.dataset&&(e.target.dataset.pm!=null||e.target.dataset.pq!=null)){clearTimeout(manSync._t);manSync._t=setTimeout(function(){manSync();refreshCounts()},400);return}
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
function jobName(j,tr){if(tr&&tr!=='ele'&&JOBS_G[j[0]]){if(settings.ui==='es')return ESx(JOBS_G[j[0]][2]);var ix={ar:0,it:1,en:2,fr:3}[settings.ui];return JOBS_G[j[0]][ix==null?1:ix]}return j[{ar:1,it:2,en:3,fr:4}[settings.ui]||2]}
var REG_T={
 ar:{title:'👋 أهلاً بك في «SiteNeeds»',sub:'سجّل مرة واحدة فقط لتبدأ استعمال التطبيق.',name:'الاسم واللقب',country:'البلد الذي تعمل فيه',city:'المدينة (اختياري)',job:'عملك',go:'ابدأ ✓',need:'اكتب اسمك واختر البلد',priv:'نستعمل اسمك وبلدك فقط لمعرفة من يستعمل التطبيق وتحسينه. لا نبيعها ولا نعطيها لأحد.',other:'اكتب اسم البلد'},
 it:{title:'👋 Benvenuto in «SiteNeeds»',sub:'Registrati una sola volta per iniziare a usare l\'app.',name:'Nome e cognome',country:'Paese in cui lavori',city:'Città (facoltativo)',job:'Il tuo lavoro',go:'Inizia ✓',need:'Scrivi il nome e scegli il Paese',priv:'Usiamo nome e Paese solo per sapere chi usa l\'app e migliorarla. Non li vendiamo né li cediamo a nessuno.',other:'Scrivi il Paese'},
 en:{title:'👋 Welcome to «SiteNeeds»',sub:'Register just once to start using the app.',name:'Full name',country:'Country where you work',city:'City (optional)',job:'Your job',go:'Start ✓',need:'Write your name and choose the country',priv:'We use your name and country only to know who uses the app and to improve it. We never sell or share them.',other:'Write the country'},
 fr:{title:'👋 Bienvenue dans «SiteNeeds»',sub:'Inscrivez-vous une seule fois pour utiliser l\'appli.',name:'Nom et prénom',country:'Pays où vous travaillez',city:'Ville (facultatif)',job:'Votre métier',go:'Commencer ✓',need:'Écrivez votre nom et choisissez le pays',priv:'Nous utilisons votre nom et votre pays uniquement pour savoir qui utilise l\'appli et l\'améliorer. Nous ne les vendons ni ne les cédons.',other:'Écrivez le pays'}
};
function regTxt(k){return (TL(REG_T,settings.ui))[k]}
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
var WZ={
 lang:{ar:'اختر لغتك',it:'Scegli la lingua',en:'Choose your language',fr:'Choisissez votre langue'},
 trade:{ar:'ما هو مجالك؟',it:'Qual è il tuo mestiere?',en:'What is your trade?',fr:'Quel est votre métier ?'},
 tradeS:{ar:'اختر نوع العمل الذي تزاوله',it:'Scegli il lavoro che fai',en:'Choose the work you do',fr:'Choisissez votre activité'},
 plumb:{ar:'سبّاك',it:'Idraulico',en:'Plumber',fr:'Plombier'},
 soon:{ar:'قريباً',it:'Presto',en:'Soon',fr:'Bientôt'},
 eleS:{ar:'أدوات ومواد كهربائية',it:'Materiale elettrico',en:'Electrical materials',fr:'Matériel électrique'},
 ediS:{ar:'مواد البناء والإنشاءات',it:'Materiali edili',en:'Building materials',fr:'Matériaux de construction'},
 idrS:{ar:'أدوات ومواد السباكة',it:'Materiale idraulico',en:'Plumbing materials',fr:'Matériel de plomberie'},
 cty:{ar:'اختر بلدك',it:'Scegli il tuo Paese',en:'Choose your country',fr:'Choisissez votre pays'},
 ctyS:{ar:'البلد الذي تعمل فيه',it:'Il Paese dove lavori',en:'The country where you work',fr:'Le pays où vous travaillez'},
 other:{ar:'بلد آخر',it:'Altro Paese',en:'Other country',fr:'Autre pays'},
 me:{ar:'عرّفنا بنفسك',it:'Presentati',en:'About you',fr:'Présentez-vous'},
 next:{ar:'التالي',it:'Avanti',en:'Next',fr:'Suivant'},
 prep:{ar:'جاري إعداد حسابك…',it:'Stiamo preparando il tuo account…',en:'Setting up your account…',fr:'Préparation de votre compte…'}
};
function regScreen(){
  if(settings.reg) return false;
  var ov=document.createElement('div'); ov.id='regOv'; ov.className='wz';
  var st={step:0,tr:tradeId(),cc:'',c:'',job:'dipendente',n:'',ci:''};
  var FL={ar:'🇲🇦',it:'🇮🇹',fr:'🇫🇷',en:'🇬🇧'};
  function W(k){return L4(WZ[k])}
  function head(){return (st.step?'<button class="wzback" id="wzB">'+(settings.ui==='ar'?'→':'←')+'</button>':'')+'<div class="wzdots">'+[0,1,2,3].map(function(i){return '<i'+(i===st.step?' class="on"':i<st.step?' class="ok"':'')+'></i>'}).join('')+'</div>'}
  function draw(){
    var h='';
    if(st.step===0){
      h='<div class="wzlogo"><img src="'+ASSET_BASE+'brand/logo.webp" alt="" onerror="this.remove()"><div class="wzname">SiteNeeds<span>.net</span></div><div class="mini">'+esc(L4(XT.tagline))+'</div></div>'+
        '<h2>'+W('lang')+'</h2><div class="mini wzs">Please choose your language</div>'+
        LANGS.map(function(l){return '<button class="wzopt'+(settings.ui===l[0]?' on':'')+'" data-rl="'+l[0]+'"><span class="wzf">'+(FL[l[0]]||'🌐')+'</span><b>'+l[1]+'</b><span class="wzr"></span></button>'}).join('');
    } else if(st.step===1){
      var tl=tradeList(), trs=[['ele','volt','⚡',W('eleS'),{ar:'كهربائي',it:'Elettricista',en:'Electrician',fr:'Électricien'}]];
      if(tl.some(function(t){return t[0]==='edi'})) trs.push(['edi','brick','🧱',W('ediS'),(window.LM_TRADES.edi||{}).name]);
      h='<h2>'+W('trade')+'</h2><div class="mini wzs">'+W('tradeS')+'</div>'+
        trs.map(function(t){return '<button class="wzopt big'+(st.tr===t[0]?' on':'')+'" data-rt="'+t[0]+'"><span class="wzi">'+ic3(t[1],t[2])+'</span><span class="wzt"><b>'+esc(TL(t[4]||{},settings.ui)||t[0])+'</b><small>'+esc(t[3])+'</small></span><span class="wzr"></span></button>'}).join('')+
        '<div class="wzopt big dis"><span class="wzi">'+ic3('drop','💧')+'</span><span class="wzt"><b>'+W('plumb')+' <em class="soon">'+W('soon')+'</em></b><small>'+W('idrS')+'</small></span></div>';
    } else if(st.step===2){
      var cs=[['MA','🇲🇦','Marocco'],['IT','🇮🇹','Italia'],['FR','🇫🇷','Francia']].filter(function(c){return c[0]==='IT'||((window.LM_PACKS||{})[c[0]]&&rcFlag(c[0]))});
      var cOpts='<option value="">—</option>'+COUNTRIES.map(function(c){return '<option value="'+c[0]+'">'+(settings.ui==='ar'?c[1]+' · '+c[0]:c[0])+'</option>'}).join('');
      h='<h2>'+W('cty')+'</h2><div class="mini wzs">'+W('ctyS')+'</div>'+
        cs.map(function(c){var nm=(COUNTRIES.find(function(x){return x[0]===c[2]})||[c[2],c[2]]);return '<button class="wzopt'+(st.c===c[2]?' on':'')+'" data-cty="'+c[2]+'"><span class="wzf">'+c[1]+'</span><b>'+esc(settings.ui==='ar'?nm[1]:TL((packList().find(function(x){return x.id===c[0]})||{name:{}}).name,settings.ui)||c[2])+'</b><span class="wzr"></span></button>'}).join('')+
        '<div class="field"><label>🌍 '+W('other')+'</label><select id="rgC" class="wzsel">'+cOpts+'</select></div><div class="field" id="rgOW" style="display:none"><label>'+regTxt('other')+'</label><input id="rgO"></div>'+
        '<button class="btn main" id="wzN">'+W('next')+' '+(settings.ui==='ar'?'←':'→')+'</button>';
    } else if(st.step===3){
      h='<h2>'+W('me')+'</h2><div class="mini wzs">'+regTxt('sub')+'</div><div class="card">'+
        '<div class="field"><label>'+regTxt('name')+' *</label><input id="rgN" autocomplete="name" value="'+esc(st.n)+'"></div>'+
        '<div class="field"><label>'+regTxt('city')+'</label><input id="rgCi" value="'+esc(st.ci)+'"></div>'+
        '<div class="field"><label>'+regTxt('job')+'</label><div class="chips" id="rgJobs">'+JOBS.map(function(j){return '<button class="chip'+(j[0]===st.job?' on':'')+'" data-rj="'+j[0]+'">'+jobName(j,st.tr)+'</button>'}).join('')+'</div></div></div>'+
        '<button class="btn main" id="rgGo">'+regTxt('go')+'</button>';
    } else {
      h='<div class="wzprep"><img src="'+ASSET_BASE+'brand/logo.webp" alt="" onerror="this.remove()"><div class="wzname">SiteNeeds<span>.net</span></div><div class="spin"></div><div>'+W('prep')+'</div></div>';
    }
    ov.innerHTML='<div class="wzin">'+(st.step<4?head():'')+h+'</div>';
    wire();
  }
  function go(n){st.step=n;draw();ov.scrollTop=0}
  function wire(){
    var b=ov.querySelector('#wzB'); if(b) b.onclick=function(){if(st.step===3){var nn=ov.querySelector('#rgN');if(nn)st.n=nn.value;var cc=ov.querySelector('#rgCi');if(cc)st.ci=cc.value}go(st.step-1)};
    ov.querySelectorAll('[data-rl]').forEach(function(x){x.onclick=function(){settings.ui=x.dataset.rl;settings.uiPicked=1;saveSettings();applyLang();render();go(1)}});
    ov.querySelectorAll('[data-rt]').forEach(function(x){x.onclick=function(){st.tr=x.dataset.rt;go(2)}});
    ov.querySelectorAll('[data-cty]').forEach(function(x){x.onclick=function(){st.c=x.dataset.cty;go(3)}});
    var sel=ov.querySelector('#rgC'); if(sel) sel.onchange=function(){ov.querySelector('#rgOW').style.display=this.value==='Altro'?'block':'none'};
    var nx=ov.querySelector('#wzN'); if(nx) nx.onclick=function(){var c=sel.value;if(c==='Altro')c=(ov.querySelector('#rgO').value||'').trim();if(!c){toast(regTxt('need'));return}st.c=c;go(3)};
    ov.querySelectorAll('[data-rj]').forEach(function(x){x.onclick=function(){st.job=x.dataset.rj;ov.querySelectorAll('[data-rj]').forEach(function(y){y.classList.toggle('on',y===x)})}});
    var g=ov.querySelector('#rgGo'); if(g) g.onclick=function(){
      var n=ov.querySelector('#rgN').value.trim(), c=st.c;
      if(n.length<2||!c){toast(regTxt('need'));return}
      settings.reg={nome:n,paese:c,citta:ov.querySelector('#rgCi').value.trim(),lavoro:st.job,mestiere:st.tr,at:Date.now(),sent:0};
      if(!settings.tecnico) settings.tecnico=n;
      var rcc={Marocco:'MA',Francia:'FR'}[c]; if(rcc&&(window.LM_PACKS||{})[rcc]&&rcFlag(rcc)) setCountry(rcc);
      saveSettings(); if(st.tr!==tradeId()) setTrade(st.tr);
      go(4);
      setTimeout(function(){ov.classList.add('out');setTimeout(function(){ov.remove()},350);applyLang();render()},1300);
      ping('/iscritto/'+c.replace(/[\/?#]/g,' '),'Nuovo iscritto (Paese)');
      sendReg();
    };
  }
  document.body.appendChild(ov); draw();
  return true;
}

/* =====================================================================
   AGGIORNAMENTI / التحديثات
   version.json pubblico su GitHub Pages: {versionCode, versionName, apk, notes_ar, notes_it}
   ===================================================================== */
var UPD_BASE='https://mohamed203055.github.io/lista-materiale-web/'; // dati (version.json, live, packs): niente redirect, CORS ok
var SITE='https://siteneeds.net/'; // link visibili agli utenti
function verNum(v){var m=String(v||'').match(/(\d+)\.(\d+)\.(\d+)/);return m?(+m[1])*1e6+(+m[2])*1e3+(+m[3]):0}
function checkUpdate(manual){
  if(!window.fetch) return;
  fetch(UPD_BASE+'version.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(v){
    if(v.reg_url&&v.reg_url!==settings.regUrl){settings.regUrl=v.reg_url;saveSettings()}
    try{var nrc=v.rc||{};if(JSON.stringify(nrc)!==JSON.stringify(settings.rc||{})){settings.rc=nrc;RC=nrc;saveSettings();reindex();if(!sheetOpen)render()}}catch(e){}
    sendReg();sendSeen();
    if(v.packs) checkPacks(v.packs);
    checkPeople(v.people_ver);
    try{if(A&&A.liveFetch&&v.live&&v.live.ver)A.liveFetch(JSON.stringify(v.live),UPD_BASE)}catch(e){}
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
  if(m.link)$('#bmLink').onclick=function(){seen();openUrl(m.link,1)};
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
   '<div style="height:10px;background:var(--ghost);border-radius:6px;margin-top:8px;overflow:hidden;display:none" id="updBarW"><div id="updBar" style="height:100%;width:0;background:var(--brand)"></div></div>'+
   '<button class="btn main" id="updGo">'+T('updNow')+'</button>'+
   (v.force?'':'<button class="btn ghost" style="width:100%;margin-top:10px" id="updNo">'+T('updLater')+'</button>'));
  if(v.force){sheetLocked=true}
  if(!v.force)$('#updNo').onclick=function(){settings.updSkip=v.versionName;settings.updSkipDay=new Date().toISOString().slice(0,10);saveSettings();closeSheet()};
  $('#updGo').onclick=function(){
    ping('/aggiornamento/'+v.versionName,'Aggiornamento');
    if(A&&A.update){
      $('#updGo').disabled=true;$('#updBarW').style.display='block';$('#updMsg').textContent=T('updDl');
      var apk=v.apk||'SiteNeeds.apk';A.update((/^https?:\/\//.test(apk)?apk:UPD_BASE+apk+'?v='+encodeURIComponent(v.versionName)));
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

(function esFill(){try{
  TXT.es=esMap(TXT.en);var LE={it:'Spagnolo',ar:'الإسبانية',en:'Spanish',fr:'Espagnol',es:'Español'};Object.keys(LE).forEach(function(l){if(TXT[l])TXT[l].langEs=LE[l]});
  if(OUT.en)OUT.es=esMap(OUT.en);if(QOUT.en)QOUT.es=esMap(QOUT.en);if(DOCL.en)DOCL.es=esMap(DOCL.en);if(REG_T.en)REG_T.es=esMap(REG_T.en);
  [UNITS,SERVICE_UNITS].forEach(function(U){Object.keys(U).forEach(function(k){if(U[k]&&U[k].en)U[k].es=ESx(U[k].en)})});
}catch(e){}})();
reindex(); cur(); save(); applyLang(); render(); setTimeout(statsStart,1500); setTimeout(function(){checkUpdate(false)},3000);
if(!regScreen()) setTimeout(function(){sendReg();sendSeen()},2500);

// ---- web: invito a installare sull'iPhone/iPad (o scaricare l'APK su Android) ----
function installHint(){
  if(A||!rcFlag('install')) return;
  var ua=navigator.userAgent||'', ios=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1), andr=/Android/.test(ua);
  var standalone=navigator.standalone===true||(window.matchMedia&&matchMedia('(display-mode: standalone)').matches);
  if(standalone||(!ios&&!andr)) return;
  try{var t=+localStorage.getItem('lm_ihint')||0;if(Date.now()-t<3*864e5)return}catch(e){}
  var safari=ios&&/Safari/.test(ua)&&!/CriOS|FxiOS|EdgiOS|OPiOS|GSA|Instagram|FBAN|FBAV|WhatsApp|Line\//.test(ua);
  var ipad=/iPad/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  var SH='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-4px"><path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';
  var X={
   t:{ar:'📲 ثبّت SiteNeeds على شاشتك',it:'📲 Installa SiteNeeds sulla schermata Home',en:'📲 Install SiteNeeds on your Home Screen',fr:'📲 Installez SiteNeeds sur l’écran d’accueil'},
   s1:{ar:'اضغط زر المشاركة '+SH+(ipad?' في الأعلى':' في أسفل الشاشة'),it:'Tocca Condividi '+SH+(ipad?' in alto':' in basso'),en:'Tap Share '+SH+(ipad?' at the top':' at the bottom'),fr:'Touchez Partager '+SH+(ipad?' en haut':' en bas')},
   s2:{ar:'اختر «إضافة إلى الشاشة الرئيسية» ➕',it:'Scegli «Aggiungi alla schermata Home» ➕',en:'Choose «Add to Home Screen» ➕',fr:'Choisissez «Sur l’écran d’accueil» ➕'},
   s3:{ar:'اضغط «إضافة»، ثم افتح التطبيق من الأيقونة',it:'Tocca «Aggiungi», poi apri l’app dall’icona',en:'Tap «Add», then open the app from the icon',fr:'Touchez «Ajouter», puis ouvrez l’app depuis l’icône'},
   sf:{ar:'افتح هذا الرابط في Safari أولاً (⋯ ثم «فتح في Safari»)، فالإضافة للشاشة لا تشتغل إلا منه.',it:'Apri prima questo link in Safari (⋯ → «Apri in Safari»): solo da Safari si può aggiungere alla Home.',en:'First open this link in Safari (⋯ → «Open in Safari»): only Safari can add it to the Home Screen.',fr:'Ouvrez d’abord ce lien dans Safari (⋯ → «Ouvrir dans Safari») : seul Safari peut l’ajouter à l’écran d’accueil.'},
   at:{ar:'🤖 حمّل تطبيق أندرويد',it:'🤖 Scarica l’app Android',en:'🤖 Get the Android app',fr:'🤖 Téléchargez l’app Android'},
   as:{ar:'التطبيق يشتغل أحسن وبدون إنترنت.',it:'L’app funziona meglio, anche senza internet.',en:'The app works better, even offline.',fr:'L’app fonctionne mieux, même hors ligne.'},
   dl:{ar:'تحميل',it:'Scarica',en:'Download',fr:'Télécharger'},
   ok:{ar:'لاحقاً',it:'Più tardi',en:'Later',fr:'Plus tard'}};
  var d=document.createElement('div');d.className='ihint';
  var body=ios?(safari?'<ol><li>'+L4(X.s1)+'</li><li>'+L4(X.s2)+'</li><li>'+L4(X.s3)+'</li></ol>':'<p>'+L4(X.sf)+'</p>'):'<p>'+L4(X.as)+'</p><a class="btn main" href="'+SITE+'SiteNeeds.apk">'+L4(X.dl)+'</a>';
  d.innerHTML='<div class="ihc"><b>'+(ios?L4(X.t):L4(X.at))+'</b>'+body+'<button class="btn ghost" id="ihOk">'+L4(X.ok)+'</button></div>'+(ios&&safari&&!ipad?'<div class="iharr">▼</div>':'');
  document.body.appendChild(d);
  d.querySelector('#ihOk').onclick=function(){try{localStorage.setItem('lm_ihint',String(Date.now()))}catch(e){}d.remove()};
}
setTimeout(installHint,1200);
// splash all'avvio (solo la prima apertura della sessione)
(function(){var sp=$('#splash');if(!sp)return;var seen=false;try{seen=sessionStorage.getItem('lm_spl')==='1';sessionStorage.setItem('lm_spl','1')}catch(e){}
  if(seen){sp.classList.add('gone');return}
  setTimeout(function(){sp.classList.add('off');setTimeout(function(){sp.classList.add('gone')},500)},1400)})();
// aggiornamento silenzioso: conferma che questa versione è partita bene
try{if(A&&A.liveOk&&window.LM_JS_VER)setTimeout(function(){A.liveOk(String(window.LM_JS_VER))},1500)}catch(e){}
})();
