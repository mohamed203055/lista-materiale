# -*- coding: utf-8 -*-
"""Catalogo Marocco 🇲🇦 — fonte unica, compilata da 4 elenchi forniti dal proprietario (ottobre 2026).
Riga articolo: (francese professionale, darija, italiano equivalente, inglese, unità, misure 'a;b;c', colori True/False)
Genera: app/src/main/assets/packs.js (incluso nell'app) e, con build_web, packs/MA.json sul sito.
"""
import json, os

VERSION = 1

CATS = [
 ('cab', '〰️', 'Câbles et fils', 'الكابلات والسلوك', 'Cavi e fili', 'Cables and wires', [
  ('Fil rigide H07V-U', 'الفيل الصلب (الرصيص)', 'Filo rigido H07V-U', 'Rigid wire H07V-U', 'm', '1.5 mm²;2.5 mm²;4 mm²;6 mm²;10 mm²;16 mm²', True),
  ('Fil souple H07V-K', 'الفيل المرن', 'Filo flessibile H07V-K', 'Flexible wire H07V-K', 'm', '1.5 mm²;2.5 mm²;4 mm²;6 mm²;10 mm²;16 mm²', True),
  ('Câble U-1000 R2V', 'كابل R2V', 'Cavo U-1000 R2V', 'U-1000 R2V cable', 'm', '3G1.5;3G2.5;3G4;3G6;3G10;5G1.5;5G2.5;5G4;5G6;5G10', False),
  ('Câble souple H05VV-F', 'كابل مرن (رالونج)', 'Cavo flessibile H05VV-F', 'Flexible cord H05VV-F', 'm', '2x0.75;3G0.75;3G1.5;3G2.5', False),
  ('Câble préassemblé 3G', 'كابل مطبّع', 'Cavo multipolare 3G', 'Pre-assembled cable 3G', 'm', '3G1.5;3G2.5', False),
  ('Câble de terre vert-jaune', 'سلك الأرضي (التار)', 'Cavo giallo-verde', 'Green-yellow earth wire', 'm', '6 mm²;10 mm²;16 mm²;25 mm²', False),
  ('Câblette cuivre nu', 'نحاس عاري للأرضي', 'Corda di rame nuda', 'Bare copper conductor', 'm', '16 mm²;25 mm²;35 mm²', False),
  ('Câble réseau RJ45', 'كابل الأنترنيت', 'Cavo LAN', 'LAN cable', 'm', 'Cat 5e;Cat 6;Cat 6A', False),
  ('Câble coaxial TV', 'كابل التلفزة', 'Cavo coassiale TV', 'TV coaxial cable', 'm', 'RG6 75Ω;RG59', False),
  ('Câble téléphonique', 'كابل التيليفون', 'Cavo telefonico', 'Telephone cable', 'm', '1 paire;2 paires;4 paires', False),
  ('Câble interphone', 'كابل الإنترفون', 'Cavo citofonico', 'Intercom cable', 'm', '2 fils;4 fils;6 fils', False),
  ('Câble alarme', 'كابل الألارم', 'Cavo allarme', 'Alarm cable', 'm', '4x0.22;6x0.22+2x0.5', False),
  ('Câble résistant au feu CR1', 'كابل ضد العافية', 'Cavo resistente al fuoco', 'Fire-resistant cable', 'm', '2x1.5;3G1.5', False),
  ('Câble solaire', 'كابل البانو سولير', 'Cavo solare', 'Solar cable', 'm', '4 mm²;6 mm²', False),
 ]),
 ('gai', '🧵', 'Gaines, goulottes et boîtes', 'الگين والبواطات', 'Tubi, canaline e scatole', 'Conduits, trunking and boxes', [
  ('Gaine ICTA annelée', 'الگين', 'Tubo corrugato', 'Corrugated conduit (ICTA)', 'm', 'Ø16;Ø20;Ø25;Ø32;Ø40', False),
  ('Gaine TPC enterrée', 'الگين ديال تحت الأرض', 'Cavidotto da interro', 'Underground duct (TPC)', 'm', 'Ø40;Ø63;Ø90;Ø110', False),
  ('Tube IRL rigide', 'التيب الصلب', 'Tubo rigido PVC', 'Rigid PVC conduit', 'm', 'Ø16;Ø20;Ø25;Ø32;Ø40', False),
  ('Coude / manchon pour tube', 'كوضة / مانشون', 'Curva / manicotto', 'Bend / coupler', 'pz', 'Ø16;Ø20;Ø25;Ø32', False),
  ('Goulotte', 'الگولوت', 'Canalina', 'Trunking', 'm', '16x16;20x12;25x16;40x16;40x25;60x40;80x40', False),
  ('Angle / embout de goulotte', 'زاوية الگولوت', 'Angolo / tappo canalina', 'Trunking corner / end cap', 'pz', 'intérieur;extérieur;plat;embout', False),
  ('Plinthe passe-câbles', 'بلانت ديال السلوك', 'Battiscopa passacavi', 'Skirting trunking', 'm', '', False),
  ('Chemin de câbles', 'شومان دو كابل', 'Passerella portacavi', 'Cable tray', 'm', '100x50;200x50;300x60', False),
  ("Boîte d'encastrement maçonnerie", 'البواط (للياجور)', 'Scatola da incasso (muratura)', 'Flush box (masonry)', 'pz', 'Ø67 1 poste;2 postes;3 postes;4 postes;5 postes', False),
  ("Boîte d'encastrement placo", 'البواط ديال البلاكو', 'Scatola per cartongesso', 'Drywall box', 'pz', 'Ø67 1 poste;2 postes;3 postes', False),
  ('Boîte de dérivation encastrée', 'بواط الديريفاسيون', 'Scatola di derivazione', 'Junction box', 'pz', 'Ø65;80x80;100x100;150x110;200x150', False),
  ('Boîte de dérivation étanche', 'بواط ضد الما', 'Scatola stagna', 'Waterproof junction box', 'pz', '80x80;100x100;150x110 IP55;IP65', False),
  ('Boîte de sol', 'بواط الأرض', 'Scatola a pavimento', 'Floor box', 'pz', '', False),
  ('Presse-étoupe', 'بريس إيتوب', 'Pressacavo', 'Cable gland', 'pz', 'M16;M20;M25;M32;PG9;PG11;PG13.5', False),
  ('Regard / chambre de tirage', 'الريگار', 'Pozzetto', 'Inspection pit', 'pz', '30x30;40x40;60x60', False),
 ]),
 ('app', '🔘', 'Appareillage (interrupteurs et prises)', 'الفويتات والبريزات', 'Frutti, prese e placche', 'Switches and sockets', [
  ('Interrupteur simple allumage', 'الانترروبتور / فويت بسيط', 'Interruttore', 'One-way switch', 'pz', '10A', False),
  ('Va-et-vient', 'الكومودو / فا إي فيان', 'Deviatore', 'Two-way switch', 'pz', '10A', False),
  ('Permutateur', 'البرميطاطور', 'Invertitore', 'Intermediate switch', 'pz', '10A', False),
  ('Double allumage / double va-et-vient', 'دوبل ألوماج', 'Interruttore doppio', 'Double switch', 'pz', '2x10A', False),
  ('Bouton poussoir', 'البوتون', 'Pulsante', 'Push button', 'pz', 'simple;lumineux;sonnette', False),
  ('Prise 2P+T 16A', 'البريزة (مع الأرضي)', 'Presa 2P+T 16A (tipo E)', 'Socket 2P+E 16A (type E)', 'pz', '', False),
  ('Prise 2P+T double', 'بريزة جوج', 'Presa doppia 2P+T', 'Double socket 2P+E', 'pz', '', False),
  ('Prise 20A climatiseur', 'بريزة الكليماتيزور', 'Presa 20A climatizzatore', 'Socket 20A (air conditioner)', 'pz', '', False),
  ('Prise 32A cuisinière', 'البريزة الكبيرة (الكوزينيير)', 'Presa 32A piano cottura', 'Socket 32A (cooker)', 'pz', '', False),
  ('Prise USB', 'بريزة USB', 'Presa USB', 'USB socket', 'pz', 'USB-A;USB-A+C', False),
  ('Prise TV', 'بريزة التلفزة', 'Presa TV', 'TV socket', 'pz', 'TV;TV+SAT', False),
  ('Prise RJ45', 'بريزة الأنترنيت', 'Presa RJ45', 'RJ45 socket', 'pz', 'Cat 5e;Cat 6', False),
  ('Prise téléphone RJ11', 'بريزة التيليفون', 'Presa telefono RJ11', 'Phone socket RJ11', 'pz', '', False),
  ('Variateur', 'الديمر', 'Dimmer', 'Dimmer', 'pz', '', False),
  ('Interrupteur volet roulant', 'فويت الستور', 'Comando tapparella', 'Shutter switch', 'pz', '', False),
  ('Support / châssis', 'الشاسي', 'Supporto', 'Mounting frame', 'pz', '1 poste;2 postes;3 postes', False),
  ('Plaque de finition', 'البلاك', 'Placca', 'Cover plate', 'pz', '1 poste;2 postes;3 postes;4 postes;5 postes', False),
  ('Appareillage étanche IP55', 'فويت / بريزة ضد الما', 'Frutto stagno IP55', 'Waterproof switch / socket IP55', 'pz', 'interrupteur;va-et-vient;prise', False),
  ('Socle / prise en saillie', 'بريزة برا الحيط', 'Presa a vista', 'Surface socket', 'pz', '16A;32A', False),
  ('Fiche mâle 2P+T', 'الفيشة', 'Spina 2P+T', 'Plug 2P+E', 'pz', '16A;32A', False),
  ('Prise industrielle CEE', 'بريزة صناعية', 'Presa industriale CEE', 'CEE industrial socket', 'pz', '16A 2P+T;32A 2P+T;16A 3P+N+T;32A 3P+N+T', False),
  ('Détecteur de mouvement', 'الديتكتور / كابتور الحركة', 'Sensore di movimento', 'Motion sensor', 'pz', 'encastré;mural;plafond', False),
  ('Sonnette / carillon', 'السونيت', 'Campanello', 'Doorbell', 'pz', '', False),
 ]),
 ('tab', '🗄️', 'Tableau et protection', 'الطابلو والحماية', 'Quadri e protezioni', 'Panel and protection', [
  ('Coffret / tableau encastré', 'الطابلو (داخل الحيط)', 'Centralino da incasso', 'Flush panel', 'pz', '13 modules;18 modules;24 modules;36 modules;54 modules', False),
  ('Coffret en saillie', 'الطابلو (برا الحيط)', 'Centralino da parete', 'Surface panel', 'pz', '4 modules;8 modules;13 modules;24 modules', False),
  ('Coffret étanche IP65', 'كوفري ضد الما', 'Centralino stagno IP65', 'Waterproof panel IP65', 'pz', '4 modules;8 modules;12 modules;18 modules', False),
  ('Coffret de chantier', 'كوفري الشانطي', 'Quadro da cantiere', 'Site distribution box', 'pz', '', False),
  ('Disjoncteur divisionnaire 1P+N', 'الديجونكتور (الشنايدر)', 'Magnetotermico 1P+N', 'MCB 1P+N', 'pz', '2A;10A;16A;20A;25A;32A;40A', False),
  ('Disjoncteur 2P', 'ديجونكتور 2P', 'Magnetotermico 2P', 'MCB 2P', 'pz', '16A;20A;32A;40A;63A', False),
  ('Disjoncteur tétrapolaire 4P', 'ديجونكتور تريفيزي', 'Magnetotermico 4P', 'MCB 4P', 'pz', '16A;20A;32A;40A;63A', False),
  ('Interrupteur différentiel 30mA', 'الديفيرونسيال', 'Differenziale puro', 'RCD 30mA', 'pz', '25A 30mA AC;40A 30mA AC;40A 30mA type A;63A 30mA AC;40A 4P 30mA', False),
  ('Disjoncteur différentiel 1P+N', 'ديجونكتور ديفيرونسيال', 'Magnetotermico differenziale', 'RCBO 1P+N', 'pz', '10A 30mA;16A 30mA;20A 30mA;32A 30mA', False),
  ('Interrupteur général / sectionneur', 'الكوبور العام', 'Interruttore generale / sezionatore', 'Main switch / isolator', 'pz', '2P 40A;2P 63A;4P 40A;4P 63A', False),
  ('Parafoudre type 2', 'البارافودر', 'Scaricatore SPD tipo 2', 'Surge protector type 2', 'pz', '1P+N;3P+N', False),
  ('Peigne d\'alimentation', 'المشط (البينيي)', 'Pettine di collegamento', 'Busbar comb', 'pz', '1P+N;2P;3P+N', False),
  ('Bornier de terre / neutre', 'بورنيي ديال التار والنوترو', 'Morsettiera terra / neutro', 'Earth / neutral terminal block', 'pz', '', False),
  ('Porte-fusible + cartouche', 'بورت فيوز', 'Portafusibile + fusibile', 'Fuse holder + fuse', 'pz', '10x38 2A;10x38 10A;10x38 16A;10x38 20A', False),
  ('Contacteur modulaire', 'الكونتاكتور', 'Contattore modulare', 'Modular contactor', 'pz', '25A 2NO;25A 4NO;40A 4NO', False),
  ('Télérupteur', 'التيليروبتور', 'Relè passo-passo', 'Impulse relay', 'pz', '16A', False),
  ('Minuterie', 'المينوتري', 'Temporizzatore luce scale', 'Staircase timer', 'pz', '', False),
  ('Interrupteur horaire', 'المونطر ديال الوقت', 'Interruttore orario', 'Time switch', 'pz', 'journalier;hebdomadaire', False),
  ('Délesteur', 'الديليستور', 'Relè di distacco carichi', 'Load shedding relay', 'pz', '', False),
  ('Transformateur sonnerie / alimentation', 'الترانسفو', 'Trasformatore / alimentatore', 'Bell transformer / power supply', 'pz', '12V;24V', False),
  ('Obturateur de tableau', 'كاش ديال الطابلو', 'Copriforo per quadro', 'Panel blanking plate', 'pz', '', False),
 ]),
 ('cpt', '🔌', 'Comptage et branchement', 'العداد والاشتراك', 'Contatore e allacciamento', 'Metering and connection', [
  ('Coffret / boîtier de compteur', 'علبة الكونطور', 'Cassetta contatore', 'Meter box', 'pz', 'monophasé;triphasé', False),
  ('Socle de compteur', 'قاعدة الكونطور', 'Base contatore', 'Meter base', 'pz', '', False),
  ('Disjoncteur de branchement', 'ديجونكتور الاشتراك', 'Interruttore generale di fornitura', 'Supply main breaker', 'pz', '15/45A 500mA;30/60A 500mA;triphasé', False),
  ('Coffret de branchement extérieur', 'الكوفري ديال برا', 'Cassetta di allacciamento', 'Outdoor connection box', 'pz', '', False),
 ]),
 ('ter', '⏚', 'Mise à la terre', 'الأرضي (التار)', 'Impianto di terra', 'Earthing', [
  ('Piquet de terre', 'بيكي ديال التار', 'Picchetto di terra', 'Earth rod', 'pz', '1 m;1.5 m;2 m', False),
  ('Barrette de coupure / mesure', 'باريت ديال التار', 'Morsetto di sezionamento terra', 'Earth test link', 'pz', '', False),
  ('Barrette équipotentielle', 'بار الربط الأرضي', 'Collettore equipotenziale', 'Equipotential bar', 'pz', '', False),
  ('Collier de piquet', 'كوليي البيكي', 'Morsetto per picchetto', 'Earth rod clamp', 'pz', '', False),
  ('Regard de terre', 'ريگار التار', 'Pozzetto di terra', 'Earth pit', 'pz', '', False),
 ]),
 ('ecl', '💡', 'Éclairage', 'الضو والإنارة', 'Illuminazione', 'Lighting', [
  ('Ampoule LED', 'اللمبة LED', 'Lampadina LED', 'LED bulb', 'pz', 'E27 9W;E27 12W;E27 15W;E14;GU10', False),
  ('Douille', 'الديوي', 'Portalampada', 'Lamp holder', 'pz', 'E27;E14', False),
  ('Spot encastré', 'السبوت', 'Faretto da incasso', 'Recessed spotlight', 'pz', 'GU10;LED intégré 7W;LED intégré 10W', False),
  ('Plafonnier LED', 'البلافونيي', 'Plafoniera LED', 'LED ceiling light', 'pz', '', False),
  ('Dalle LED 60x60', 'البانو LED', 'Pannello LED 60x60', 'LED panel 60x60', 'pz', '40W', False),
  ('Tube LED T8', 'التيوب', 'Tubo LED T8', 'LED tube T8', 'pz', '60 cm;120 cm;150 cm', False),
  ('Réglette étanche IP65', 'ريگليت ضد الما', 'Plafoniera stagna IP65', 'Waterproof batten IP65', 'pz', '120 cm;150 cm', False),
  ('Projecteur LED extérieur', 'البروجكطور', 'Proiettore LED', 'LED floodlight', 'pz', '30W;50W;100W;150W', False),
  ('Applique murale', 'الأبليك', 'Applique', 'Wall light', 'pz', 'intérieur;extérieur', False),
  ('Bloc de secours', 'ضو الطوارئ', 'Lampada di emergenza', 'Emergency light', 'pz', '', False),
  ('Cellule crépusculaire', 'كابتور الليل', 'Interruttore crepuscolare', 'Twilight switch', 'pz', '', False),
  ('Ventilateur de plafond', 'فينطو السقف', 'Ventilatore da soffitto', 'Ceiling fan', 'pz', '132 cm;avec télécommande', False),
 ]),
 ('led', '🌈', 'Ruban LED', 'شريط LED', 'Strisce LED', 'LED strip', [
  ('Ruban LED', 'شريط LED (روبان)', 'Striscia LED', 'LED strip', 'm', '12V;24V;24V RGB;220V', False),
  ('Alimentation LED', 'أليمونتاسيون LED', 'Alimentatore LED', 'LED power supply', 'pz', '12V 60W;12V 100W;24V 100W;24V 150W;24V 200W;24V 320W', False),
  ('Contrôleur / télécommande LED', 'الكونطرولور / التيليكوموند', 'Controller / telecomando LED', 'LED controller / remote', 'pz', 'monochrome;RGB;wifi', False),
  ('Profilé aluminium + diffuseur', 'البروفيلي ألومينيوم', 'Profilo alluminio + diffusore', 'Aluminium profile + diffuser', 'pz', '2 m saillie;2 m encastré;2 m angle', False),
  ('Connecteur ruban LED', 'كونيكتور الروبان', 'Connettore striscia LED', 'LED strip connector', 'pz', '8 mm;10 mm;RGB', False),
 ]),
 ('cfa', '📹', 'Courants faibles et sécurité', 'الإنترفون والكاميرات والإنذار', 'Citofonia, rete e sicurezza', 'Low voltage and security', [
  ('Interphone audio', 'الإنترفون', 'Citofono', 'Audio intercom', 'pz', '', False),
  ('Visiophone (kit)', 'الفيديوفون', 'Kit videocitofono', 'Video intercom kit', 'pz', '1 logement;2 logements;2 fils', False),
  ('Platine de rue', 'بلاكة الإنترفون برا', 'Pulsantiera esterna', 'Outdoor entry panel', 'pz', '1 bouton;2 boutons;4 boutons;8 boutons', False),
  ('Gâche électrique', 'الگاش الكهربائية', 'Elettroserratura', 'Electric strike', 'pz', '', False),
  ('Caméra de surveillance', 'كاميرا المراقبة', 'Telecamera', 'Surveillance camera', 'pz', 'IP;analogique HD;dôme;bullet', False),
  ('Enregistreur NVR / DVR', 'جهاز التسجيل', 'Registratore NVR / DVR', 'NVR / DVR recorder', 'pz', '4 canaux;8 canaux;16 canaux', False),
  ('Disque dur surveillance', 'الديسك ديال التسجيل', 'Hard disk videosorveglianza', 'Surveillance hard disk', 'pz', '1 To;2 To;4 To', False),
  ('Switch PoE', 'سويتش PoE', 'Switch PoE', 'PoE switch', 'pz', '4 ports;8 ports;16 ports', False),
  ('Alimentation caméras', 'أليمونتاسيون الكاميرات', 'Alimentatore telecamere', 'Camera power supply', 'pz', '12V 2A;12V 5A;boîtier 9 sorties', False),
  ('Connecteurs BNC / DC / RJ45', 'الكونيكتورات', 'Connettori BNC / DC / RJ45', 'BNC / DC / RJ45 connectors', 'conf', '', False),
  ('Centrale d\'alarme', 'سنطرال الألارم', 'Centrale allarme', 'Alarm control panel', 'pz', '', False),
  ('Détecteur volumétrique', 'كابتور الألارم', 'Sensore volumetrico', 'PIR detector', 'pz', 'filaire;sans fil', False),
  ('Contact magnétique', 'كونطاكط مانييتيك', 'Contatto magnetico', 'Magnetic contact', 'pz', 'filaire;sans fil', False),
  ('Sirène d\'alarme', 'السيرين', 'Sirena', 'Alarm siren', 'pz', 'intérieure;extérieure', False),
  ('Détecteur de fumée', 'كاشف الدخان', 'Rilevatore di fumo', 'Smoke detector', 'pz', '', False),
  ('Coffret / baie réseau', 'الكوفري ديال الريزو', 'Armadio rack', 'Network cabinet', 'pz', '6U;9U;12U', False),
  ('Switch réseau / routeur / point d\'accès', 'السويتش / الروتور', 'Switch / router / access point', 'Switch / router / access point', 'pz', 'switch 8 ports;routeur;point d\'accès Wi-Fi', False),
  ('Onduleur (UPS)', 'الأوندولور', 'UPS', 'UPS', 'pz', '650 VA;1000 VA;2000 VA', False),
 ]),
 ('acc', '🔩', 'Accessoires et consommables', 'الإكسسوارات والمستهلكات', 'Morsetti e consumabili', 'Accessories and consumables', [
  ('Connecteur rapide Wago', 'الواگو / كونيكتور', 'Morsetto a leva Wago', 'Wago lever connector', 'pz', '2 entrées;3 entrées;5 entrées', False),
  ('Domino / bornier à vis', 'الدومينو', 'Morsetto a vite (mammut)', 'Screw terminal strip', 'pz', '2.5 mm²;4 mm²;6 mm²;10 mm²', False),
  ('Embout de câblage', 'التيب ديال السلك', 'Puntalino', 'Ferrule', 'conf', '1.5 mm²;2.5 mm²;4 mm²;6 mm²', False),
  ('Cosse', 'الكوسة', 'Capocorda', 'Cable lug', 'pz', '1.5 mm²;2.5 mm²;6 mm²;10 mm²;16 mm²', False),
  ('Ruban isolant', 'السكوتش (الشاطرتون)', 'Nastro isolante', 'Insulating tape', 'pz', 'noir;bleu;rouge;vert-jaune', False),
  ('Gaine thermorétractable', 'گين ثيرمو', 'Guaina termorestringente', 'Heat-shrink tubing', 'm', 'Ø3;Ø6;Ø9;Ø12', False),
  ('Colliers de serrage', 'الكوليات (الربطات)', 'Fascette', 'Cable ties', 'conf', '100 mm;200 mm;300 mm', False),
  ('Colliers de fixation gaine', 'الكلي ديال الگين', 'Collari fissatubo', 'Conduit clips', 'conf', 'Ø16;Ø20;Ø25', False),
  ('Chevilles et vis', 'الشويكة والبراغي (الفيشرات)', 'Tasselli e viti', 'Wall plugs and screws', 'conf', 'Ø5;Ø6;Ø8;Ø10', False),
  ('Chevilles placo', 'شويكة البلاكو', 'Tasselli cartongesso', 'Drywall plugs', 'conf', '', False),
  ('Plâtre', 'الجبص', 'Scagliola', 'Plaster', 'sacco', '5 kg;25 kg', False),
  ('Ciment', 'السيمة', 'Cemento', 'Cement', 'sacco', '', False),
  ('Aiguille tire-fils', 'السوند', 'Sonda tirafili', 'Fish tape', 'pz', '10 m;20 m;30 m', False),
  ('Multiprise / rallonge', 'الرالونج', 'Multipresa / prolunga', 'Power strip / extension', 'pz', '3 prises;4 prises;5 prises', False),
  ('Silicone', 'السيليكون', 'Silicone', 'Silicone', 'pz', '', False),
  ('Mousse polyuréthane', 'المووس', 'Schiuma poliuretanica', 'Expanding foam', 'pz', '', False),
  ('Disque / foret', 'الديسك والميش', 'Disco / punta', 'Cutting disc / drill bit', 'pz', 'disque 115;disque 230;foret 6;foret 8;foret 10', False),
 ]),
 ('pv', '☀️', 'Solaire et recharge', 'الطاقة الشمسية والشحن', 'Fotovoltaico e ricarica', 'Solar and EV charging', [
  ('Panneau solaire', 'البانو سولير', 'Modulo fotovoltaico', 'Solar panel', 'pz', '', False),
  ('Onduleur solaire', 'أوندولور سولير', 'Inverter', 'Solar inverter', 'pz', 'on-grid;hybride;off-grid', False),
  ('Batterie de stockage', 'البطارية', 'Batteria di accumulo', 'Storage battery', 'pz', '', False),
  ('Connecteurs MC4', 'كونيكتور MC4', 'Connettori MC4', 'MC4 connectors', 'coppia', '', False),
  ('Coffret DC', 'كوفري DC', 'Quadro di campo DC', 'DC string box', 'pz', '', False),
  ('Borne de recharge voiture', 'شارجور الطوموبيل', 'Wallbox', 'EV charger', 'pz', '3.7 kW;7.4 kW;11 kW;22 kW', False),
 ]),
]

# kit: (id, icona, francese, darija, italiano, inglese, [(francese articolo, misura, quantità, colore)])
KITS = [
 ('ma_luce1', '💡', 'Point lumineux simple allumage', 'نقطة ضو بفويت واحد', 'Punto luce interrotto', 'Light point with switch', [
   ("Boîte d'encastrement maçonnerie", 'Ø67 1 poste', 1, ''), ('Interrupteur simple allumage', '10A', 1, ''), ('Plaque de finition', '1 poste', 1, ''),
   ('Gaine ICTA annelée', 'Ø16', 6, ''), ('Fil rigide H07V-U', '1.5 mm²', 6, 'rosso'), ('Fil rigide H07V-U', '1.5 mm²', 6, 'blu'),
   ('Fil rigide H07V-U', '1.5 mm²', 6, 'giallo-verde'), ('Connecteur rapide Wago', '3 entrées', 3, '')]),
 ('ma_luce2', '🔁', 'Point lumineux va-et-vient', 'نقطة ضو من جوج بلايص', 'Punto luce deviato', 'Two-way light point', [
   ("Boîte d'encastrement maçonnerie", 'Ø67 1 poste', 2, ''), ('Va-et-vient', '10A', 2, ''), ('Plaque de finition', '1 poste', 2, ''),
   ('Gaine ICTA annelée', 'Ø16', 10, ''), ('Fil rigide H07V-U', '1.5 mm²', 10, 'rosso'), ('Fil rigide H07V-U', '1.5 mm²', 10, 'blu'),
   ('Fil rigide H07V-U', '1.5 mm²', 10, 'nero'), ('Fil rigide H07V-U', '1.5 mm²', 10, 'giallo-verde'), ('Connecteur rapide Wago', '3 entrées', 4, '')]),
 ('ma_presa', '🔌', 'Point prise 2P+T 16A', 'نقطة بريزة 16A', 'Punto presa', 'Socket point 16A', [
   ("Boîte d'encastrement maçonnerie", 'Ø67 1 poste', 1, ''), ('Prise 2P+T 16A', '', 1, ''), ('Plaque de finition', '1 poste', 1, ''),
   ('Gaine ICTA annelée', 'Ø20', 6, ''), ('Fil rigide H07V-U', '2.5 mm²', 6, 'rosso'), ('Fil rigide H07V-U', '2.5 mm²', 6, 'blu'),
   ('Fil rigide H07V-U', '2.5 mm²', 6, 'giallo-verde')]),
 ('ma_clim', '❄️', 'Prise climatiseur 20A', 'بريزة الكليماتيزور', 'Presa climatizzatore', 'Air conditioner socket', [
   ("Boîte d'encastrement maçonnerie", 'Ø67 1 poste', 1, ''), ('Prise 20A climatiseur', '', 1, ''), ('Plaque de finition', '1 poste', 1, ''),
   ('Gaine ICTA annelée', 'Ø20', 10, ''), ('Fil rigide H07V-U', '4 mm²', 10, 'rosso'), ('Fil rigide H07V-U', '4 mm²', 10, 'blu'),
   ('Fil rigide H07V-U', '4 mm²', 10, 'giallo-verde'), ('Disjoncteur divisionnaire 1P+N', '20A', 1, '')]),
 ('ma_cuis', '🍳', 'Prise cuisinière 32A', 'بريزة الكوزينيير', 'Presa piano cottura', 'Cooker socket 32A', [
   ('Prise 32A cuisinière', '', 1, ''), ('Gaine ICTA annelée', 'Ø25', 10, ''), ('Fil rigide H07V-U', '6 mm²', 10, 'rosso'),
   ('Fil rigide H07V-U', '6 mm²', 10, 'blu'), ('Fil rigide H07V-U', '6 mm²', 10, 'giallo-verde'), ('Disjoncteur divisionnaire 1P+N', '32A', 1, '')]),
 ('ma_tvnet', '📺', 'Point TV + RJ45', 'نقطة التلفزة والأنترنيت', 'Punto TV + dati', 'TV + data point', [
   ("Boîte d'encastrement maçonnerie", '2 postes', 1, ''), ('Prise TV', 'TV', 1, ''), ('Prise RJ45', 'Cat 6', 1, ''), ('Plaque de finition', '2 postes', 1, ''),
   ('Gaine ICTA annelée', 'Ø20', 10, ''), ('Câble coaxial TV', 'RG6 75Ω', 10, ''), ('Câble réseau RJ45', 'Cat 6', 10, '')]),
 ('ma_tab', '🗄️', 'Tableau logement (base)', 'طابلو الدار (أساسي)', 'Quadro appartamento', 'Home panel (basic)', [
   ('Coffret / tableau encastré', '24 modules', 1, ''), ('Interrupteur différentiel 30mA', '40A 30mA AC', 1, ''), ('Interrupteur différentiel 30mA', '40A 30mA type A', 1, ''),
   ('Disjoncteur divisionnaire 1P+N', '10A', 2, ''), ('Disjoncteur divisionnaire 1P+N', '16A', 4, ''), ('Disjoncteur divisionnaire 1P+N', '20A', 1, ''),
   ('Disjoncteur divisionnaire 1P+N', '32A', 1, ''), ("Peigne d'alimentation", '1P+N', 2, ''), ('Bornier de terre / neutre', '', 1, '')]),
 ('ma_terre', '⏚', 'Prise de terre', 'التار (الأرضي)', 'Impianto di terra', 'Earthing', [
   ('Piquet de terre', '1.5 m', 1, ''), ('Câblette cuivre nu', '25 mm²', 5, ''), ('Barrette de coupure / mesure', '', 1, ''),
   ('Collier de piquet', '', 1, ''), ('Regard de terre', '', 1, ''), ('Câble de terre vert-jaune', '16 mm²', 5, '')]),
 ('ma_cam', '📹', 'Point caméra IP', 'نقطة كاميرا', 'Punto telecamera IP', 'IP camera point', [
   ('Caméra de surveillance', 'IP', 1, ''), ('Câble réseau RJ45', 'Cat 6', 30, ''), ('Connecteurs BNC / DC / RJ45', '', 1, ''), ('Gaine ICTA annelée', 'Ø20', 10, '')]),
 ('ma_ruban', '🌈', 'Ruban LED 24V (5 m)', 'روبان LED 24V (5 متر)', 'Striscia LED 24V', 'LED strip 24V (5 m)', [
   ('Ruban LED', '24V', 5, ''), ('Alimentation LED', '24V 100W', 1, ''), ('Profilé aluminium + diffuseur', '2 m saillie', 3, ''), ('Connecteur ruban LED', '10 mm', 2, '')]),
]

# listino manodopera Marocco (MAD, HT) — indicativo, da verificare: (id, francese, darija, italiano, inglese, unità, prezzo)
SVC = [
 ('ma_points', '🔌', 'Points d\'installation', 'نقط التركيب', 'Punti impianto', 'Wiring points', [
  ('mas_luce1', 'Point lumineux simple allumage', 'نقطة ضو', 'Punto luce', 'Light point', 'pz', 25),
  ('mas_luce2', 'Point lumineux va-et-vient', 'نقطة ضو من جوج بلايص', 'Punto luce deviato', 'Two-way light point', 'pz', 35),
  ('mas_presa', 'Point prise 2P+T', 'نقطة بريزة', 'Punto presa', 'Socket point', 'pz', 25),
  ('mas_spec', 'Prise spécialisée (clim, cuisinière)', 'بريزة خاصة (كليم، كوزينيير)', 'Presa dedicata', 'Dedicated socket', 'pz', 40),
  ('mas_rj45', 'Point RJ45 / TV', 'نقطة أنترنيت / تلفزة', 'Punto dati / TV', 'Data / TV point', 'pz', 30),
  ('mas_m2', 'Installation complète (au m²)', 'تركيب كامل (للمتر المربع)', 'Impianto completo (al m²)', 'Full installation (per m²)', 'mq', 60),
 ]),
 ('ma_tab', '🗄️', 'Tableau et branchement', 'الطابلو والاشتراك', 'Quadro e allacciamento', 'Panel and connection', [
  ('mas_tab', 'Pose et câblage du tableau', 'تركيب وتوصيل الطابلو', 'Cablaggio quadro', 'Panel wiring', 'pz', 300),
  ('mas_disj', 'Remplacement disjoncteur', 'تبديل ديجونكتور', 'Sostituzione magnetotermico', 'Breaker replacement', 'pz', 40),
  ('mas_diff', 'Remplacement différentiel', 'تبديل الديفيرونسيال', 'Sostituzione differenziale', 'RCD replacement', 'pz', 60),
  ('mas_cpt', 'Préparation branchement compteur', 'تجهيز الكونطور', 'Preparazione allacciamento contatore', 'Meter connection preparation', 'pz', 250),
  ('mas_terre', 'Mise à la terre (piquet + liaisons)', 'تركيب التار', 'Impianto di terra', 'Earthing installation', 'pz', 200),
 ]),
 ('ma_ecl', '💡', 'Éclairage et appareils', 'الضو والأجهزة', 'Illuminazione e apparecchi', 'Lighting and appliances', [
  ('mas_lustre', 'Pose plafonnier / lustre', 'تركيب بلافونيي / ثريا', 'Montaggio lampadario', 'Ceiling light fitting', 'pz', 40),
  ('mas_spot', 'Pose spot encastré', 'تركيب سبوت', 'Montaggio faretto', 'Spotlight fitting', 'pz', 15),
  ('mas_ruban', 'Pose ruban LED (au mètre)', 'تركيب روبان LED (للمتر)', 'Posa striscia LED (al metro)', 'LED strip (per metre)', 'm', 15),
  ('mas_vent', 'Pose ventilateur de plafond', 'تركيب فينطو السقف', 'Montaggio ventilatore da soffitto', 'Ceiling fan fitting', 'pz', 100),
  ('mas_clim', 'Alimentation climatiseur', 'تغذية الكليماتيزور', 'Alimentazione climatizzatore', 'Air conditioner supply', 'pz', 150),
 ]),
 ('ma_sec', '📹', 'Interphone et sécurité', 'الإنترفون والأمان', 'Citofonia e sicurezza', 'Intercom and security', [
  ('mas_visio', 'Installation visiophone', 'تركيب فيديوفون', 'Installazione videocitofono', 'Video intercom installation', 'pz', 250),
  ('mas_cam', 'Installation caméra (par point)', 'تركيب كاميرا (للنقطة)', 'Installazione telecamera', 'Camera installation', 'pz', 120),
  ('mas_nvr', 'Configuration enregistreur / appli', 'إعداد جهاز التسجيل', 'Configurazione NVR', 'NVR setup', 'pz', 150),
  ('mas_alarme', 'Installation alarme', 'تركيب الألارم', 'Installazione allarme', 'Alarm installation', 'pz', 400),
 ]),
 ('ma_div', '🧰', 'Interventions diverses', 'خدمات متنوعة', 'Interventi vari', 'Various jobs', [
  ('mas_h', 'Heure de travail', 'ساعة خدمة', 'Ora di lavoro', 'Hour of work', 'h', 50),
  ('mas_j', 'Journée de travail', 'نهار خدمة', 'Giornata di lavoro', 'Working day', 'gg', 350),
  ('mas_panne', 'Recherche de panne', 'البحث عن العطب', 'Ricerca guasto', 'Fault finding', 'pz', 150),
  ('mas_saignee', 'Saignées (au mètre)', 'التقطاع فالحيط (للمتر)', 'Tracce a muro (al metro)', 'Wall chasing (per metre)', 'm', 10),
  ('mas_frutto', 'Remplacement prise / interrupteur', 'تبديل بريزة / فويت', 'Sostituzione frutto', 'Socket / switch replacement', 'pz', 20),
  ('mas_depl', 'Déplacement', 'التنقل', 'Uscita / spostamento', 'Call-out', 'pz', 50),
  ('mas_urg', 'Urgence / nuit / jour férié', 'استعجال / ليل / عطلة', 'Urgenza / notte / festivo', 'Emergency / night / holiday', 'pz', 150),
 ]),
]


def build():
    cats = []
    names = {}
    for cid, ic, fr, ar, it, en, items in CATS:
        lst = []
        for ix, (ifr, iar, iit, ien, unit, sizes, col) in enumerate(items):
            iid = 'ma_%s_%d' % (cid, ix)
            names[ifr] = iid
            lst.append({'id': iid, 'fr': ifr, 'ar': iar, 'it': iit, 'en': ien, 'unit': unit,
                        'sizes': [s.strip() for s in sizes.split(';') if s.strip()], 'colors': col, 'hidden': False})
        cats.append({'id': 'ma_' + cid, 'ic': ic, 'fr': fr, 'ar': ar, 'it': it, 'en': en, 'hidden': False, 'items': lst})
    kits = []
    for kid, ic, fr, ar, it, en, parts in KITS:
        ps = []
        for (pfr, size, q, col) in parts:
            assert pfr in names, pfr
            ps.append({'item': names[pfr], 'name': pfr, 'size': size, 'qty': q, 'color': col})
        kits.append({'id': kid, 'ic': ic, 'fr': fr, 'ar': ar, 'it': it, 'en': en, 'note': '', 'noteIt': '', 'hidden': False, 'parts': ps})
    svc = []
    for gid, ic, fr, ar, it, en, lst in SVC:
        svc.append({'id': gid, 'ic': ic, 'fr': fr, 'ar': ar, 'it': it, 'en': en, 'hidden': False,
                    'list': [{'id': x[0], 'fr': x[1], 'ar': x[2], 'it': x[3], 'en': x[4], 'unit': x[5], 'price': x[6], 'hidden': False} for x in lst]})
    return {'pack': 'MA', 'version': VERSION, 'name': {'ar': 'المغرب', 'it': 'Marocco', 'en': 'Morocco', 'fr': 'Maroc'}, 'flag': '🇲🇦',
            'currency': 'DH', 'vat': [20, 14, 10], 'vatDefault': 20, 'outLang': 'fr', 'local': 'fr',
            'priceNote': {'ar': 'أسعار العمل بالدرهم بدون TVA — تقريبية، عدّلها حسب منطقتك.', 'it': 'Prezzi manodopera in dirham, IVA esclusa — indicativi, adattali alla tua zona.',
                          'en': 'Labour prices in dirham, VAT excluded — indicative, adapt them to your area.', 'fr': 'Prix main-d\'œuvre en dirhams HT — indicatifs, adaptez-les à votre région.'},
            'cats': cats, 'kits': kits, 'svc': svc}


if __name__ == '__main__':
    import sys
    p = build()
    n = sum(len(c['items']) for c in p['cats'])
    here = os.path.dirname(os.path.abspath(__file__))
    assets = os.path.join(here, '..', '..', 'app', 'src', 'main', 'assets')
    open(os.path.join(assets, 'packs.js'), 'w').write('// Cataloghi per Paese inclusi nell\'app (generato da tools/packs/ma_pack.py)\nwindow.LM_PACKS = ' + json.dumps({'MA': p}, ensure_ascii=False) + ';\n')
    if len(sys.argv) > 1:
        os.makedirs(sys.argv[1], exist_ok=True)
        json.dump(p, open(os.path.join(sys.argv[1], 'MA.json'), 'w'), ensure_ascii=False)
    print('MA:', len(p['cats']), 'categorie,', n, 'articoli,', len(p['kits']), 'kit,', sum(len(g['list']) for g in p['svc']), 'lavori')
