// Catalogo materiali — formato riga: "Nome italiano|الاسم بالعربية|unità|misure separate da ;"
// Unità: pz, m, conf, sacco, coppia
window.UNITS = {
  pz:    { it: 'pz',    ar: 'قطعة',  step: 1 },
  m:     { it: 'm',     ar: 'متر',   step: 5 },
  conf:  { it: 'conf',  ar: 'علبة',  step: 1 },
  sacco: { it: 'sacco', ar: 'كيس',   step: 1 },
  coppia:{ it: 'coppia',ar: 'زوج',   step: 1 }
};

// Colori dei cavi unipolari (campo finale 'C' nella riga dell'articolo)
window.COLORS = [
  { id: 'blu', it: 'blu', ar: 'أزرق', hex: '#1E5BD6' },
  { id: 'marrone', it: 'marrone', ar: 'بني', hex: '#7A4A21' },
  { id: 'nero', it: 'nero', ar: 'أسود', hex: '#111111' },
  { id: 'grigio', it: 'grigio', ar: 'رمادي', hex: '#8A8F99' },
  { id: 'giallo-verde', it: 'giallo-verde', ar: 'أصفر-أخضر', hex: 'linear-gradient(135deg,#F2D200 50%,#1F9D3A 50%)' },
  { id: 'rosso', it: 'rosso', ar: 'أحمر', hex: '#D62828' },
  { id: 'bianco', it: 'bianco', ar: 'أبيض', hex: '#FFFFFF' },
  { id: 'arancione', it: 'arancione', ar: 'برتقالي', hex: '#F28C28' },
  { id: 'viola', it: 'viola', ar: 'بنفسجي', hex: '#7B3FBF' }
];

window.CATEGORIES = [
  { id: 'tubi', ic: '🧵', it: 'Tubi, canaline e scatole', ar: 'أنابيب وقنوات وعلب', items: `
Tubo corrugato|أنبوب مموّج مرن|m|Ø16;Ø20;Ø25;Ø32;Ø40;Ø50
Tubo corrugato pesante|أنبوب مموّج ثقيل (للأرضيات)|m|Ø20;Ø25;Ø32;Ø40
Cavidotto corrugato da interro|أنبوب مموّج للدفن تحت الأرض|m|Ø40;Ø50;Ø63;Ø90;Ø110;Ø125
Tubo rigido PVC|أنبوب PVC صلب|m|Ø16;Ø20;Ø25;Ø32;Ø40
Guaina spiralata|أنبوب مرن حلزوني|m|Ø16;Ø20;Ø25;Ø32
Curva per tubo rigido|كوع للأنبوب الصلب|pz|Ø16;Ø20;Ø25;Ø32
Manicotto per tubo rigido|وصلة أنبوب صلب|pz|Ø16;Ø20;Ø25;Ø32
Raccordo tubo-scatola|وصلة أنبوب مع علبة|pz|Ø16;Ø20;Ø25;Ø32
Raccordo per guaina|وصلة للأنبوب المرن|pz|Ø16;Ø20;Ø25;Ø32
Fissatubo / collare|مشبك تثبيت أنبوب|pz|Ø16;Ø20;Ø25;Ø32
Canalina|قناة أسلاك بلاستيكية|m|10x10;15x10;20x10;25x17;40x17;60x40;80x40;100x40
Angolo per canalina|زاوية قناة|pz|interno;esterno;piano
Tappo terminale per canalina|غطاء نهاية القناة|pz|
Battiscopa passacavi|قناة أرضية (باتيسكوبا)|m|
Passerella portacavi metallica|حامل كابلات معدني|m|100x50;200x50;300x75
Passerella a filo|حامل كابلات شبكي|m|100x50;200x60;300x60
Scatola da incasso 503 (muratura)|علبة حائط 503 للبناء (3 وحدات)|pz|
Scatola da incasso 504 (muratura)|علبة حائط 504 للبناء (4 وحدات)|pz|
Scatola da incasso 506 (muratura)|علبة حائط 506 للبناء (7 وحدات)|pz|
Scatola tonda da incasso (muratura)|علبة دائرية للبناء|pz|Ø60;Ø65
Scatola per cartongesso|علبة للجبس بورد (cartongesso)|pz|503;504;506;tonda
Scatola di derivazione da incasso|علبة توزيع داخل الحائط للبناء|pz|92x92;118x96;152x98;160x130;196x152;294x152;392x152;480x160
Coperchio per scatola di derivazione|غطاء علبة التوزيع|pz|92x92;118x96;152x98;196x152;294x152;392x152
Scatola di derivazione stagna|علبة توزيع خارجية محكمة|pz|80x80;100x100;150x110;190x140;240x190
Scatola da esterno porta frutti|علبة خارجية للمفاتيح (سطحية)|pz|1 posto;2 posti;3 posti
Pressacavo|سدادة مدخل كابل|pz|PG7;PG9;PG11;PG13.5;PG16;PG21;M16;M20;M25;M32
Pozzetto|غرفة تفتيش أرضية|pz|20x20;30x30;40x40;55x55
Chiusino per pozzetto|غطاء غرفة التفتيش|pz|20x20;30x30;40x40;55x55` },

  { id: 'cavi', ic: '〰️', it: 'Cavi', ar: 'كابلات وأسلاك', items: `
Cavo unipolare FS17|سلك أحادي FS17|m|1 mm²;1.5 mm²;2.5 mm²;4 mm²;6 mm²;10 mm²;16 mm²;25 mm²|C
Cavo unipolare FG17|سلك أحادي FG17 (ضد اللهب)|m|1.5 mm²;2.5 mm²;4 mm²;6 mm²;10 mm²;16 mm²|C
Cavo multipolare FG16OR16|كابل متعدد الأسلاك FG16OR16|m|2x1.5;3G1.5;3G2.5;3G4;3G6;3G10;5G1.5;5G2.5;5G4;5G6;5G10;5G16
Cavo unipolare FG16R16|كابل أحادي FG16R16|m|6 mm²;10 mm²;16 mm²;25 mm²;35 mm²;50 mm²|C
Cavo FROR / H05VV-F|كابل مرن متعدد (كوردينا)|m|2x1;3G1;3G1.5;3G2.5;5G1.5
Cavo resistente al fuoco FTG18OM16|كابل مقاوم للحريق|m|2x1.5;3G1.5;3G2.5
Cavo giallo-verde|سلك أرضي أصفر-أخضر|m|1.5 mm²;2.5 mm²;6 mm²;10 mm²;16 mm²;25 mm²;35 mm²
Cavo LAN|كابل شبكة|m|Cat 5e UTP;Cat 6 UTP;Cat 6 FTP;Cat 6A;Cat 7
Cavo coassiale TV|كابل تلفاز محوري|m|5 mm;6.8 mm
Cavo allarme schermato|كابل إنذار مدرّع|m|2x0.22+2x0.50;4x0.22+2x0.50;6x0.22+2x0.50;8x0.22+2x0.50
Cavo citofonico|كابل إنترفون|m|2 fili;4 fili;6 fili;10 fili;2x1 bus
Cavo telefonico|كابل هاتف|m|1 coppia;2 coppie;4 coppie
Cavo per strisce LED|كابل لشريط LED|m|2x0.5;2x0.75;2x1;4x0.5 RGB;5x0.5 RGBW
Cavo videosorveglianza coax + alimentazione|كابل كاميرات (محوري + تغذية)|m|
Cavo bus KNX|كابل KNX|m|
Cavo fibra ottica|كابل ألياف ضوئية|m|
Cavo solare|كابل طاقة شمسية|m|4 mm²;6 mm²` },

  { id: 'acc', ic: '🔩', it: 'Morsetti e accessori', ar: 'موصلات وملحقات', items: `
Morsetto a leva Wago|موصل ضغط (واغو)|pz|2 poli;3 poli;5 poli
Morsetto a vite (mammut)|موصل براغي (ماموت)|pz|2.5 mm²;4 mm²;6 mm²;10 mm²
Morsetto a cappuccio|موصل لولبي (كابشون)|pz|
Capocorda ad occhiello|طرف كابل بحلقة|pz|1.5 mm²;2.5 mm²;4-6 mm²;10 mm²;16 mm²;25 mm²
Capocorda a forcella|طرف كابل شوكة|pz|1.5 mm²;2.5 mm²;4-6 mm²
Puntalino|نهاية سلك (بونتالينو)|pz|0.5 mm²;0.75 mm²;1 mm²;1.5 mm²;2.5 mm²;4 mm²;6 mm²;10 mm²
Faston|موصل فاستون|pz|maschio;femmina
Giunto a crimpare|وصلة كبس|pz|1.5 mm²;2.5 mm²;4-6 mm²
Nastro isolante|شريط عزل|pz|nero;blu;marrone;grigio;giallo-verde;rosso
Guaina termorestringente|أنبوب حراري ينكمش|m|Ø3;Ø6;Ø9;Ø12;Ø19
Fascette stringicavo|رباطات كابلات|conf|100 mm;200 mm;300 mm;370 mm
Segnafili|أرقام الأسلاك|conf|
Sonda tirafili|سلك سحب (سوندا)|pz|10 m;20 m;30 m
Lubrificante tirafili|مادة تزليق لسحب الكابلات|pz|
Morsetto su guida DIN|طرفية على سكة DIN|pz|2.5 mm²;4 mm²;6 mm²;10 mm²;16 mm²
Blocco ripartitore|كتلة توزيع|pz|4 poli 100A;4 poli 125A` },

  { id: 'quadri', ic: '🗄️', it: 'Quadri e protezioni', ar: 'لوحات وقواطع', items: `
Centralino da incasso|لوحة داخل الحائط|pz|4 moduli;8 moduli;12 moduli;24 moduli;36 moduli;54 moduli
Centralino da parete|لوحة سطحية|pz|4 moduli;8 moduli;12 moduli;24 moduli;36 moduli;54 moduli
Centralino stagno IP65|لوحة خارجية محكمة IP65|pz|4 moduli;8 moduli;12 moduli;18 moduli;24 moduli
Armadio / quadro elettrico|خزانة كهربائية|pz|
Guida DIN|سكة DIN|pz|
Magnetotermico 1P+N|قاطع حراري مغناطيسي 1P+N|pz|6A;10A;16A;20A;25A;32A;40A
Magnetotermico 2P|قاطع حراري مغناطيسي 2P|pz|16A;25A;32A;40A;63A
Magnetotermico 4P|قاطع حراري مغناطيسي 4P (ثلاثي)|pz|16A;25A;32A;40A;63A
Magnetotermico differenziale 1P+N|قاطع تفاضلي حراري 1P+N|pz|10A 30mA;16A 30mA;20A 30mA;25A 30mA;32A 30mA
Differenziale puro 2P|قاطع تفاضلي 2P|pz|25A 30mA;40A 30mA;63A 30mA;40A 300mA
Differenziale puro 4P|قاطع تفاضلي 4P|pz|25A 30mA;40A 30mA;63A 30mA;40A 300mA
Interruttore sezionatore|مفتاح فصل رئيسي|pz|2P 32A;2P 63A;4P 32A;4P 63A;4P 100A
Scaricatore di sovratensione SPD|حماية زيادة الجهد SPD|pz|monofase;trifase
Portafusibile sezionabile|حامل فيوز|pz|1P;1P+N;3P
Fusibile|فيوز|pz|10x38 2A;10x38 4A;10x38 10A;10x38 16A
Salvamotore|قاطع حماية محرك|pz|
Pettine di collegamento|مشط توصيل القواطع|pz|1P+N;2P;3P;4P
Contatore di energia|عداد طاقة|pz|monofase;trifase
Strumento multifunzione da quadro|جهاز قياس متعدد للوحة|pz|
Spia luminosa da quadro|لمبة إشارة للوحة|pz|
Presa da quadro DIN|مقبس على سكة DIN|pz|
Trasformatore per campanello|محول جرس|pz|12V;24V
Copriforo per quadro|غطاء فراغات اللوحة|pz|
UPS|جهاز UPS|pz|` },

  { id: 'auto', ic: '⏱️', it: 'Relè, automazione e domotica', ar: 'مرحلات وتحكم وأتمتة', items: `
Contattore modulare|كونتاكتور على سكة|pz|20A 2NA;25A 2NA;25A 4NA;40A 4NA
Relè passo-passo|مرحل نبضي|pz|230V;24V;12V
Relè ausiliario con zoccolo|مرحل مساعد مع قاعدة|pz|230V;24V;12V
Interruttore orario|ساعة توقيت|pz|giornaliero;settimanale digitale;astronomico
Temporizzatore luce scale|مؤقت إنارة الدرج|pz|
Interruttore crepuscolare|حساس غروب (كريبوسكولاري)|pz|
Relè controllo tensione / fasi|مرحل مراقبة الجهد أو الأطوار|pz|
Termostato / cronotermostato|ثرموستات|pz|da incasso;da parete;wifi
Attuatore per tapparelle|وحدة تحكم ستائر|pz|
Modulo smart wifi|وحدة ذكية واي فاي (Shelly / Sonoff)|pz|1 canale;2 canali;tapparella;dimmer
Alimentatore su guida DIN|مزود طاقة على سكة DIN|pz|12V;24V` },

  { id: 'frutti', ic: '🔘', it: 'Frutti, prese e placche', ar: 'مفاتيح ومقابس وإطارات', items: `
Interruttore 1P 16A|مفتاح إنارة|pz|
Deviatore|مفتاح تبادلي (ديفياتوري)|pz|
Invertitore|مفتاح تقاطعي (إنفيرتيتوري)|pz|
Pulsante|زر ضاغط|pz|normale;campanello;luminoso
Interruttore bipolare|مفتاح قطبين|pz|16A;20A
Comando tapparella|مفتاح ستارة|pz|
Dimmer|منظم إضاءة (ديمر)|pz|
Presa bipasso 10/16A|مقبس إيطالي ثنائي 10/16A|pz|
Presa 10A|مقبس صغير 10A|pz|
Presa Schuko / universale|مقبس شوكو (أوروبي)|pz|
Presa USB|مقبس USB|pz|USB-A;USB-A+C;USB-C
Presa TV|مقبس تلفاز|pz|TV;TV+SAT;SAT
Presa RJ45|مقبس شبكة RJ45|pz|Cat 5e;Cat 6;Cat 6A
Presa telefonica RJ11|مقبس هاتف|pz|
Supporto|حامل المفاتيح|pz|3 moduli;4 moduli;7 moduli;tondo
Placca|إطار نهائي (بلاكا)|pz|2 moduli;3 moduli;4 moduli;7 moduli;tonda
Copriforo|غطاء وحدة فارغة|pz|
Lampada segnapasso|ضوء ممر (سنياباسو)|pz|
Presa stagna IP55|مقبس خارجي محكم|pz|
Interruttore stagno IP55|مفتاح خارجي محكم|pz|
Presa industriale CEE|مقبس صناعي CEE|pz|16A 2P+T;32A 2P+T;16A 3P+N+T;32A 3P+N+T
Spina industriale CEE|قابس صناعي CEE|pz|16A 2P+T;32A 2P+T;16A 3P+N+T;32A 3P+N+T
Spina|قابس|pz|10A;16A;Schuko
Multipresa|مشترك كهرباء|pz|
Sensore di movimento|حساس حركة|pz|da incasso;da parete;da soffitto
Campanello / suoneria|جرس|pz|
Interruttore a badge|مفتاح بطاقة|pz|
Presa HDMI|وحدة HDMI|pz|` },

  { id: 'luce', ic: '💡', it: 'Illuminazione', ar: 'إنارة', items: `
Lampadina LED|لمبة LED|pz|E27;E14;GU10;G9
Faretto LED da incasso|سبوت LED داخل السقف|pz|5W;7W;10W
Portafaretto GU10|حامل سبوت GU10|pz|tondo;quadrato;orientabile
Pannello LED|بانل LED|pz|60x60;30x120;30x30;tondo
Plafoniera LED|بلافونيرا LED|pz|
Plafoniera stagna IP65|بلافونيرا محكمة IP65|pz|60 cm;120 cm;150 cm
Tubo LED T8|نيون LED T8|pz|60 cm;120 cm;150 cm
Proiettore LED|كشاف LED خارجي|pz|10W;20W;30W;50W;100W
Proiettore LED con sensore|كشاف مع حساس حركة|pz|10W;20W;30W;50W
Applique da esterno|إنارة جدارية خارجية|pz|
Lampada di emergenza|إنارة طوارئ|pz|SE 1h;SA 1h;SE 3h
Segnaletica uscita di emergenza|لوحة مخرج طوارئ|pz|
Portalampada|حامل لمبة|pz|E27;E14
Kit sospensione lampadario|طقم تعليق ثريا|pz|
Driver LED|مشغل LED (درايفر)|pz|` },

  { id: 'led', ic: '🌈', it: 'Strisce LED', ar: 'أشرطة LED', items: `
Striscia LED|شريط LED|m|12V;24V;24V RGB;24V RGBW;24V CCT;230V
Alimentatore LED|محول شريط LED|pz|12V 30W;12V 60W;24V 60W;24V 100W;24V 150W;24V 200W;24V 320W
Controller LED|وحدة تحكم LED|pz|monocolore;RGB;RGBW;CCT;wifi
Telecomando LED|ريموت LED|pz|
Dimmer LED|ديمر LED|pz|
Amplificatore segnale LED|مقوي إشارة LED|pz|
Profilo in alluminio|بروفيل ألمنيوم|pz|2 m a superficie;2 m da incasso;2 m angolare;2 m per cartongesso
Diffusore per profilo|غطاء البروفيل (ديفيوزر)|pz|1 m;2 m
Tappi per profilo|أغطية نهاية البروفيل|pz|
Clip di fissaggio profilo|مشابك تثبيت البروفيل|pz|
Connettore per striscia LED|موصل شريط LED|pz|8 mm;10 mm;12 mm;RGB` },

  { id: 'terra', ic: '⏚', it: 'Impianto di terra', ar: 'التأريض', items: `
Picchetto di terra|وتد أرضي|pz|1 m;1.5 m;2 m
Corda di rame nuda|سلك نحاس عاري|m|16 mm²;25 mm²;35 mm²;50 mm²
Bandella zincata|شريط مجلفن|m|
Collettore di terra|قضيب تجميع الأرضي|pz|
Morsetto per picchetto|مشبك الوتد|pz|
Morsetto equipotenziale per tubi|مشبك أرضي للأنابيب|pz|
Pozzetto di terra con chiusino|غرفة تفتيش الأرضي مع غطاء|pz|` },

  { id: 'rete', ic: '🌐', it: 'Rete dati e TV', ar: 'شبكات وتلفاز', items: `
Armadio rack|خزانة راك|pz|6U;9U;12U;15U;22U;42U
Patch panel|لوحة باتش|pz|12 porte;24 porte;48 porte
Switch di rete|سويتش شبكة|pz|5 porte;8 porte;16 porte;24 porte
Access point Wi-Fi|نقطة وصول واي فاي|pz|
Router|راوتر|pz|
Connettore RJ45|رأس RJ45|conf|Cat 5e;Cat 6;Cat 6A
Frutto keystone RJ45|وحدة keystone RJ45|pz|Cat 5e;Cat 6;Cat 6A
Patch cord|كابل باتش|pz|0.5 m;1 m;2 m;3 m;5 m
Multipresa rack|مشترك كهرباء للراك|pz|
Partitore TV|مقسم تلفاز|pz|2 vie;3 vie;4 vie
Derivatore TV|مفرّع تلفاز|pz|
Amplificatore TV|مقوي إشارة تلفاز|pz|
Antenna TV|هوائي تلفاز|pz|
Parabola satellitare|صحن ستالايت|pz|
Multiswitch SAT|ملتي سويتش ستالايت|pz|
Connettore F|موصل F|conf|
Borchia fibra ottica|نقطة ألياف ضوئية|pz|` },

  { id: 'cito', ic: '🔔', it: 'Citofonia e videocitofonia', ar: 'إنترفون وفيديو إنترفون', items: `
Kit videocitofono|طقم فيديو إنترفون|pz|monofamiliare;bifamiliare;2 fili
Pulsantiera esterna|لوحة خارجية بأزرار|pz|1 pulsante;2 pulsanti;4 pulsanti;6 pulsanti
Monitor videocitofono|شاشة فيديو إنترفون|pz|
Citofono (cornetta)|سماعة إنترفون|pz|
Alimentatore citofonico|مزود طاقة إنترفون|pz|
Elettroserratura|قفل كهربائي|pz|
Modulo audio / video|وحدة صوت أو صورة|pz|
Scatola da incasso per pulsantiera|علبة اللوحة الخارجية|pz|
Tettuccio antipioggia|مظلة مطر للوحة|pz|
Distributore video|موزع فيديو|pz|` },

  { id: 'tvcc', ic: '📹', it: 'Videosorveglianza', ar: 'كاميرات مراقبة', items: `
Telecamera IP|كاميرا IP|pz|bullet;dome;turret;PTZ
Telecamera AHD|كاميرا تماثلية AHD|pz|bullet;dome
NVR|مسجل NVR|pz|4 canali;8 canali;16 canali
DVR|مسجل DVR|pz|4 canali;8 canali;16 canali
Hard disk videosorveglianza|هارد ديسك للتسجيل|pz|1 TB;2 TB;4 TB;6 TB
Switch PoE|سويتش PoE|pz|4 porte;8 porte;16 porte
Alimentatore telecamere|مزود طاقة كاميرات|pz|12V 2A;12V 5A;box 9 uscite
Balun video|بالون فيديو|coppia|
Connettori BNC / DC|موصلات BNC / DC|conf|
Staffa / scatola per telecamera|حامل أو علبة كاميرا|pz|
Monitor|شاشة|pz|
Cartello area videosorvegliata|لافتة «منطقة مراقبة»|pz|` },

  { id: 'allarme', ic: '🚨', it: 'Allarme e sicurezza', ar: 'إنذار وأمان', items: `
Centrale allarme|لوحة إنذار مركزية|pz|8 zone;16 zone;32 zone
Tastiera allarme|لوحة مفاتيح الإنذار|pz|
Sensore volumetrico|حساس حركة للإنذار|pz|filare;radio;doppia tecnologia
Contatto magnetico|حساس باب/نافذة مغناطيسي|pz|filare;radio
Sensore a tenda|حساس ستارة|pz|filare;radio
Sirena esterna|صفارة خارجية|pz|
Sirena interna|صفارة داخلية|pz|
Rilevatore di fumo|كاشف دخان|pz|
Rilevatore di gas|كاشف غاز|pz|
Batteria 12V|بطارية 12V|pz|1.2Ah;2.2Ah;7Ah;18Ah
Combinatore GSM|متصل GSM|pz|
Telecomando allarme|ريموت إنذار|pz|` },

  { id: 'fv', ic: '☀️', it: 'Fotovoltaico e ricarica auto', ar: 'طاقة شمسية وشحن سيارات', items: `
Modulo fotovoltaico|لوح شمسي|pz|
Inverter|إنفرتر|pz|monofase;trifase;ibrido
Batteria di accumulo|بطارية تخزين|pz|
Quadro di campo DC|لوحة التيار المستمر DC|pz|
Connettori MC4|موصلات MC4|coppia|
Struttura fissaggio pannelli|هيكل تثبيت الألواح|pz|
Wallbox ricarica auto|شاحن سيارة كهربائية|pz|3.7 kW;7.4 kW;11 kW;22 kW` },

  { id: 'fiss', ic: '🧰', it: 'Fissaggi e consumabili', ar: 'تثبيت ومستهلكات', items: `
Tasselli|دُبل (تاسيلّي)|conf|Ø5;Ø6;Ø8;Ø10
Viti|براغي|conf|3.5x25;4x30;4x40;5x50;6x60
Tasselli per cartongesso|دبل للجبس بورد|conf|
Chiodi / clip per fissaggio|مسامير ومشابك تثبيت|conf|
Scagliola|جبس (سكاليولا)|sacco|5 kg;25 kg
Cemento rapido|إسمنت سريع|sacco|5 kg;25 kg
Silicone|سيليكون|pz|trasparente;bianco
Schiuma poliuretanica|رغوة فوم|pz|
Barra filettata|قضيب ملولب|pz|M6;M8;M10
Staffa per passerella|كتيفة لحامل الكابلات|pz|
Nastro biadesivo|شريط لاصق وجهين|pz|
Disco da taglio|قرص قص|pz|115 mm;125 mm;230 mm
Punta per trapano|ريشة دريل|pz|Ø6;Ø8;Ø10;Ø12;tazza 68 mm
Sacchi per macerie|أكياس ردم|conf|` }
];

// Kit pronti: [nome italiano articolo, misura, quantità per 1 kit, colore facoltativo]
window.KITS = [
  { id: 'luce1', ic: '💡', it: 'Punto luce interrotto', ar: 'نقطة إنارة بمفتاح', parts: [
    ['Scatola da incasso 503 (muratura)', '', 1], ['Supporto', '3 moduli', 1], ['Interruttore 1P 16A', '', 1], ['Placca', '3 moduli', 1],
    ['Tubo corrugato', 'Ø20', 6], ['Cavo unipolare FS17', '1.5 mm²', 6, 'marrone'], ['Cavo unipolare FS17', '1.5 mm²', 6, 'blu'], ['Cavo unipolare FS17', '1.5 mm²', 6, 'grigio'], ['Cavo unipolare FS17', '1.5 mm²', 6, 'giallo-verde'], ['Morsetto a leva Wago', '3 poli', 3] ] },
  { id: 'luce2', ic: '🔁', it: 'Punto luce deviato (2 punti)', ar: 'نقطة إنارة من مكانين', parts: [
    ['Scatola da incasso 503 (muratura)', '', 2], ['Supporto', '3 moduli', 2], ['Deviatore', '', 2], ['Placca', '3 moduli', 2],
    ['Tubo corrugato', 'Ø20', 10], ['Cavo unipolare FS17', '1.5 mm²', 10, 'marrone'], ['Cavo unipolare FS17', '1.5 mm²', 10, 'blu'], ['Cavo unipolare FS17', '1.5 mm²', 10, 'nero'], ['Cavo unipolare FS17', '1.5 mm²', 10, 'grigio'], ['Cavo unipolare FS17', '1.5 mm²', 10, 'giallo-verde'], ['Morsetto a leva Wago', '3 poli', 4] ] },
  { id: 'luce3', ic: '🔀', it: 'Punto luce invertito (3 punti)', ar: 'نقطة إنارة من 3 أماكن', parts: [
    ['Scatola da incasso 503 (muratura)', '', 3], ['Supporto', '3 moduli', 3], ['Deviatore', '', 2], ['Invertitore', '', 1], ['Placca', '3 moduli', 3],
    ['Tubo corrugato', 'Ø20', 15], ['Cavo unipolare FS17', '1.5 mm²', 15, 'marrone'], ['Cavo unipolare FS17', '1.5 mm²', 15, 'blu'], ['Cavo unipolare FS17', '1.5 mm²', 15, 'nero'], ['Cavo unipolare FS17', '1.5 mm²', 15, 'grigio'], ['Cavo unipolare FS17', '1.5 mm²', 15, 'giallo-verde'], ['Morsetto a leva Wago', '3 poli', 6] ] },
  { id: 'presa', ic: '🔌', it: 'Punto presa 10/16A', ar: 'نقطة مقبس 10/16A', parts: [
    ['Scatola da incasso 503 (muratura)', '', 1], ['Supporto', '3 moduli', 1], ['Presa bipasso 10/16A', '', 1], ['Placca', '3 moduli', 1],
    ['Tubo corrugato', 'Ø20', 6], ['Cavo unipolare FS17', '2.5 mm²', 6, 'marrone'], ['Cavo unipolare FS17', '2.5 mm²', 6, 'blu'], ['Cavo unipolare FS17', '2.5 mm²', 6, 'giallo-verde'], ['Morsetto a leva Wago', '3 poli', 3] ] },
  { id: 'presa2', ic: '🔌', it: 'Punto presa Schuko + bipasso', ar: 'نقطة مقبس شوكو + إيطالي', parts: [
    ['Scatola da incasso 503 (muratura)', '', 1], ['Supporto', '3 moduli', 1], ['Presa Schuko / universale', '', 1], ['Presa bipasso 10/16A', '', 1], ['Placca', '3 moduli', 1],
    ['Tubo corrugato', 'Ø20', 6], ['Cavo unipolare FS17', '2.5 mm²', 6, 'marrone'], ['Cavo unipolare FS17', '2.5 mm²', 6, 'blu'], ['Cavo unipolare FS17', '2.5 mm²', 6, 'giallo-verde'] ] },
  { id: 'tvdati', ic: '📺', it: 'Punto TV + dati', ar: 'نقطة تلفاز + شبكة', parts: [
    ['Scatola da incasso 503 (muratura)', '', 1], ['Supporto', '3 moduli', 1], ['Presa TV', 'TV', 1], ['Presa RJ45', 'Cat 6', 1], ['Placca', '3 moduli', 1],
    ['Tubo corrugato', 'Ø25', 8], ['Cavo coassiale TV', '5 mm', 10], ['Cavo LAN', 'Cat 6 UTP', 10] ] },
  { id: 'esterno', ic: '🌧️', it: 'Punto luce esterno stagno', ar: 'نقطة إنارة خارجية محكمة', parts: [
    ['Scatola di derivazione stagna', '100x100', 1], ['Interruttore stagno IP55', '', 1], ['Applique da esterno', '', 1], ['Pressacavo', 'M20', 2],
    ['Tubo rigido PVC', 'Ø20', 4], ['Cavo multipolare FG16OR16', '3G1.5', 10] ] },
  { id: 'quadro', ic: '🗄️', it: 'Quadro appartamento (base)', ar: 'لوحة شقة (أساسية)', note: 'القيم تقريبية — عدّلها حسب التصميم', noteIt: 'Valori indicativi — da adattare al progetto', parts: [
    ['Centralino da incasso', '12 moduli', 1], ['Differenziale puro 2P', '40A 30mA', 1], ['Magnetotermico 1P+N', '10A', 1], ['Magnetotermico 1P+N', '16A', 2],
    ['Scaricatore di sovratensione SPD', 'monofase', 1], ['Pettine di collegamento', '1P+N', 1] ] },
  { id: 'striscia', ic: '🌈', it: 'Striscia LED 24V (5 m)', ar: 'شريط LED 24V (5 متر)', parts: [
    ['Striscia LED', '24V', 5], ['Alimentatore LED', '24V 100W', 1], ['Profilo in alluminio', '2 m a superficie', 3], ['Diffusore per profilo', '2 m', 3],
    ['Tappi per profilo', '', 6], ['Clip di fissaggio profilo', '', 9], ['Cavo per strisce LED', '2x0.75', 5] ] },
  { id: 'cito', ic: '🔔', it: 'Videocitofono monofamiliare', ar: 'فيديو إنترفون لبيت واحد', parts: [
    ['Kit videocitofono', 'monofamiliare', 1], ['Cavo citofonico', '2x1 bus', 25], ['Elettroserratura', '', 1], ['Scatola da incasso per pulsantiera', '', 1], ['Tubo corrugato', 'Ø25', 20] ] },
  { id: 'cam', ic: '📹', it: 'Punto telecamera IP', ar: 'نقطة كاميرا IP', parts: [
    ['Telecamera IP', 'bullet', 1], ['Cavo LAN', 'Cat 6 FTP', 30], ['Staffa / scatola per telecamera', '', 1], ['Tubo corrugato', 'Ø20', 10] ] }
];
