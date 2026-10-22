# -*- coding: utf-8 -*-
"""Mestiere «Edilizia / Muratore» 🧱 — catalogo Italia.
Fonte: Catalogo_materiali_cantiere.xlsx fornito dal proprietario (ottobre 2026),
SENZA la categoria «Idraulica e sanitari» (servirà per il futuro mestiere idraulico).
Riga articolo: (italiano, arabo, inglese, francese, unità, misure 'a;b;c')
Genera app/src/main/assets/trades.js  →  window.LM_TRADES
Per aggiungere un mestiere: un nuovo file *_pack.py con lo stesso schema e una voce in TRADES qui sotto.
"""
import json, os

VERSION = 1

CATS = [
 ('cg', '📐', 'Cartongesso e sistemi a secco', 'الجبس والأنظمة الجافة', 'Drywall and dry systems', 'Plaque de plâtre et systèmes secs', [
  ('Lastra di cartongesso standard (Tipo A)', 'لوح جبسي قياسي', 'Standard plasterboard (type A)', 'Plaque de plâtre standard (type A)', 'pz', '12,5 mm;15 mm;1200x2000;1200x2500;1200x3000'),
  ('Lastra idrofuga verde (Tipo H2)', 'لوح جبسي مقاوم للرطوبة (أخضر)', 'Moisture-resistant board, green (H2)', 'Plaque hydrofuge verte (H2)', 'pz', '12,5 mm;15 mm'),
  ('Lastra ignifuga rosa (Tipo F)', 'لوح جبسي مقاوم للحريق (وردي)', 'Fire-resistant board, pink (F)', 'Plaque coupe-feu rose (F)', 'pz', '12,5 mm;15 mm'),
  ('Lastra acustica / fonoassorbente', 'لوح جبسي عازل للصوت', 'Acoustic plasterboard', 'Plaque acoustique', 'pz', '12,5 mm'),
  ('Lastra ad alta densità (Tipo D)', 'لوح جبسي عالي الكثافة', 'High-density board (type D)', 'Plaque haute dureté (type D)', 'pz', '12,5 mm;15 mm'),
  ('Lastra per esterni (Tipo E)', 'لوح جبسي خارجي', 'Exterior board (type E)', 'Plaque extérieure (type E)', 'pz', '12,5 mm'),
  ('Blocchi in gesso', 'طوب / بلوك جبسي', 'Gypsum blocks', 'Carreaux de plâtre', 'pz', '6 cm;8 cm;10 cm'),
  ('Guida a U', 'مقطع U (الدليل)', 'U track', 'Rail en U', 'pz', '50 mm;75 mm;100 mm;3 m;4 m'),
  ('Montante a C', 'مقطع C (العمود)', 'C stud', 'Montant en C', 'pz', '50 mm;75 mm;100 mm;3 m;4 m'),
  ('Profilo a omega / canale 50x27', 'مقطع أوميغا / قناة 50x27', 'Furring channel 50x27', 'Fourrure 50x27', 'pz', '3 m;4 m'),
  ('Stucco per giunti', 'معجون حشو الفواصل', 'Joint compound', 'Enduit à joints', 'sacco', '5 kg;20 kg;25 kg'),
  ('Nastro in carta per giunti', 'شريط ورقي للفواصل', 'Paper joint tape', 'Bande à joint papier', 'rot', '50 m;75 m;150 m'),
  ('Nastro in rete di fibra', 'شريط شبكي', 'Fibreglass mesh tape', 'Bande à joint en fibre', 'rot', '20 m;45 m;90 m'),
  ('Paraspigolo in metallo o PVC', 'زاوية حماية معدنية أو بلاستيك', 'Corner bead (metal or PVC)', 'Cornière d’angle (métal ou PVC)', 'pz', '2,5 m;3 m'),
  ('Viti autoperforanti per cartongesso', 'براغي الجبس (ذاتية الحفر)', 'Self-drilling drywall screws', 'Vis autoperceuses pour plaque', 'conf', '3,5x25;3,5x35;3,5x45'),
  ('Viti punta chiodo fosfatate', 'براغي جبس رأس مدبب', 'Sharp-point phosphated screws', 'Vis pointe aiguille phosphatées', 'conf', '3,5x25;3,5x35;3,5x45'),
  ('Viti testa piatta per profili', 'براغي ربط المقاطع', 'Wafer-head screws for studs', 'Vis tête plate pour rails', 'conf', ''),
  ('Botola di ispezione', 'فتحة تفتيش (باب صيانة)', 'Access panel', 'Trappe de visite', 'pz', '20x20;30x30;40x40;60x60'),
  ('Pendini e ganci per controsoffitto', 'معلاقات وخطافات السقف المعلق', 'Ceiling hangers and clips', 'Suspentes et crochets de plafond', 'pz', ''),
  ('Nastro vibrante / guarnizione per guide', 'شريط عازل تحت المقاطع', 'Sealing strip for tracks', 'Bande résiliente pour rails', 'rot', '50 mm;75 mm;100 mm'),
  ('Pannello in lana minerale per intercapedine', 'لوح صوف معدني لتعبئة الجدار', 'Mineral wool panel for cavity', 'Panneau de laine minérale', 'mq', '40 mm;50 mm;60 mm'),
 ]),
 ('pit', '🎨', 'Pittura, vernici e rasatura', 'الدهان والطلاء والتسوية', 'Paint, varnish and skim coat', 'Peinture, vernis et enduit', [
  ('Idropittura traspirante', 'دهان مائي قابل للتنفس', 'Breathable water-based paint', 'Peinture à l’eau respirante', 'secchio', '5 L;14 L'),
  ('Idropittura lavabile', 'دهان مائي قابل للغسل', 'Washable water-based paint', 'Peinture lessivable', 'secchio', '5 L;14 L'),
  ('Pittura per esterni', 'طلاء خارجي', 'Exterior paint', 'Peinture façade', 'secchio', '5 L;14 L'),
  ('Smalto murale (opaco / satinato / lucido)', 'طلاء مينا للجدران', 'Wall enamel (matt / satin / gloss)', 'Laque murale (mat / satiné / brillant)', 'secchio', '0,75 L;2,5 L;5 L'),
  ('Pittura termoisolante', 'دهان عازل حرارياً', 'Thermal insulating paint', 'Peinture isolante thermique', 'secchio', '4 L;10 L'),
  ('Pittura antimuffa', 'دهان مضاد للعفن', 'Anti-mould paint', 'Peinture anti-moisissure', 'secchio', '4 L;14 L'),
  ('Fondo / primer fissativo', 'مادة أساس (برايمر)', 'Primer / sealer', 'Fixateur / primaire', 'secchio', '1 L;5 L;10 L'),
  ('Stucco in pasta per muri', 'معجون حشو الجدران', 'Ready-mixed wall filler', 'Enduit de rebouchage en pâte', 'secchio', '1 kg;5 kg;20 kg'),
  ('Stucco in polvere per muri', 'معجون جدران بودرة', 'Powder wall filler', 'Enduit en poudre', 'sacco', '1 kg;5 kg;20 kg'),
  ('Rasante', 'معجون تسوية ناعم', 'Skim coat', 'Enduit de lissage', 'sacco', '5 kg;25 kg'),
  ('Vernice antiruggine', 'طلاء مضاد للصدأ', 'Anti-rust paint', 'Peinture antirouille', 'l', '0,75 L;2,5 L'),
  ('Smalto per legno e metallo', 'طلاء لاكيه للخشب والحديد', 'Enamel for wood and metal', 'Laque bois et métal', 'l', '0,75 L;2,5 L'),
  ('Impregnante per legno', 'مادة تشريب لحماية الخشب', 'Wood stain / preservative', 'Lasure pour bois', 'l', '0,75 L;2,5 L;5 L'),
  ('Pigmenti coloranti', 'أصباغ وتلوين دهانات', 'Tinting pigments', 'Colorants', 'pz', ''),
  ('Pittura al quarzo per esterni', 'دهان كوارتز للخارج', 'Quartz exterior paint', 'Peinture au quartz façade', 'secchio', '5 L;14 L'),
  ('Acqua ragia / diluente', 'تنر / مذيب', 'White spirit / thinner', 'White-spirit / diluant', 'l', '1 L;5 L'),
  ('Rivestimento silossanico / intonachino', 'طلاء سيلوكسان / تشطيب خارجي محبب', 'Siloxane render / textured finish', 'Enduit siloxane / crépi', 'secchio', '1,0 mm;1,2 mm;1,5 mm;25 kg'),
 ]),
 ('base', '🧱', 'Materiali edili di base e cementi', 'مواد البناء الأساسية والإسمنت', 'Basic building materials and cement', 'Matériaux de base et ciment', [
  ('Cemento Portland', 'أسمنت بورتلاندي', 'Portland cement', 'Ciment Portland', 'sacco', '32,5;42,5;25 kg'),
  ('Cemento rapido', 'أسمنت سريع التصلب', 'Rapid-setting cement', 'Ciment prompt', 'sacco', '5 kg;25 kg'),
  ('Calcestruzzo preconfezionato', 'خرسانة جاهزة', 'Ready-mix concrete', 'Béton prêt à l’emploi', 'mc', 'C20/25;C25/30;C30/37'),
  ('Mattoni forati', 'طوب مفرغ', 'Hollow clay bricks', 'Briques creuses', 'pz', '8x25x25;12x25x25;8x25x50;12x25x50'),
  ('Mattoni pieni', 'طوب مصمت (أحمر)', 'Solid bricks', 'Briques pleines', 'pz', '5,5x12x25'),
  ('Blocchi in calcestruzzo cellulare', 'بلوك خرسانة خلوية خفيفة', 'Aerated concrete blocks', 'Blocs béton cellulaire', 'pz', '8 cm;10 cm;12 cm;20 cm;25 cm;30 cm'),
  ('Blocchi di cemento', 'بلوك أسمنتي', 'Concrete blocks', 'Parpaings', 'pz', '8 cm;12 cm;20 cm;25 cm'),
  ('Pignatte / blocchi solaio', 'بلوك سقف (بنياتي)', 'Floor blocks (hollow pots)', 'Entrevous / hourdis', 'pz', '16 cm;20 cm;24 cm'),
  ('Architravi prefabbricati', 'أعتاب جاهزة', 'Precast lintels', 'Linteaux préfabriqués', 'pz', '1,2 m;1,5 m;2 m'),
  ('Malta premiscelata', 'مونة أسمنتية جاهزة', 'Premixed mortar', 'Mortier prêt à gâcher', 'sacco', '25 kg'),
  ('Malta bastarda', 'مونة مختلطة (أسمنت وجير)', 'Lime-cement mortar', 'Mortier bâtard', 'sacco', '25 kg'),
  ('Malta tixotropica / da ripristino', 'مونة ترميم الخرسانة', 'Repair mortar (thixotropic)', 'Mortier de réparation', 'sacco', '25 kg'),
  ('Intonaco premiscelato', 'لياسة جاهزة', 'Premixed plaster', 'Enduit prêt à l’emploi', 'sacco', '25 kg;30 kg'),
  ('Massetto premiscelato', 'صبة تسوية الأرضيات', 'Premixed screed', 'Chape prête à l’emploi', 'sacco', '25 kg;30 kg'),
  ('Massetto autolivellante', 'صبة تسوية ذاتية', 'Self-levelling screed', 'Ragréage autolissant', 'sacco', '25 kg'),
  ('Massetto alleggerito', 'صبة خفيفة الوزن', 'Lightweight screed', 'Chape allégée', 'sacco', '50 L'),
  ('Argilla espansa', 'حبيبات طين ممدد (ليكا)', 'Expanded clay', 'Billes d’argile expansée', 'sacco', '50 L'),
  ('Sabbia', 'رمل', 'Sand', 'Sable', 'sacco', '25 kg;big bag 1 m³'),
  ('Ghiaia / pietrisco', 'حصى', 'Gravel', 'Gravier', 'sacco', '25 kg;big bag 1 m³'),
  ('Calce (idrata / idraulica)', 'جير', 'Lime (hydrated / hydraulic)', 'Chaux (aérienne / hydraulique)', 'sacco', '25 kg'),
  ('Tondino per cemento armato', 'حديد تسليح', 'Reinforcing bar (rebar)', 'Fer à béton', 'pz', 'Ø6;Ø8;Ø10;Ø12;Ø14;Ø16;Ø20;12 m'),
  ('Rete elettrosaldata', 'شبكة حديد ملحومة', 'Welded mesh', 'Treillis soudé', 'pz', 'Ø5 20x20;Ø6 20x20;Ø8 20x20;2x3 m'),
  ('Distanziatori per ferri d’armatura', 'فواصل حديد التسليح', 'Rebar spacers', 'Cales d’armature', 'conf', '2 cm;3 cm;4 cm'),
  ('Additivo per calcestruzzo / malta', 'مادة مضافة للخرسانة والمونة', 'Concrete / mortar admixture', 'Adjuvant béton / mortier', 'l', '5 L;10 L;25 L'),
 ]),
 ('iso', '🛡️', 'Isolanti e impermeabilizzanti', 'مواد العزل الحراري والمائي', 'Insulation and waterproofing', 'Isolation et étanchéité', [
  ('Lana di roccia', 'صوف صخري', 'Rock wool', 'Laine de roche', 'mq', '40 mm;50 mm;60 mm;80 mm;100 mm'),
  ('Lana di vetro', 'صوف زجاجي', 'Glass wool', 'Laine de verre', 'mq', '40 mm;50 mm;60 mm;80 mm;100 mm'),
  ('Polistirene espanso (EPS)', 'فلين مضغوط أبيض', 'Expanded polystyrene (EPS)', 'Polystyrène expansé (PSE)', 'mq', '2 cm;3 cm;4 cm;5 cm;6 cm;8 cm;10 cm;12 cm'),
  ('Polistirene estruso (XPS)', 'فلين مبثوق', 'Extruded polystyrene (XPS)', 'Polystyrène extrudé (XPS)', 'mq', '2 cm;3 cm;4 cm;5 cm;6 cm;8 cm'),
  ('Pannelli in sughero', 'ألواح فلين طبيعي', 'Cork boards', 'Panneaux de liège', 'mq', '2 cm;3 cm;4 cm;6 cm'),
  ('Pannelli in poliuretano', 'ألواح بولي يوريثان', 'Polyurethane boards', 'Panneaux polyuréthane', 'mq', '3 cm;4 cm;6 cm;8 cm'),
  ('Pannelli in fibra di legno', 'ألواح ألياف خشبية', 'Wood fibre boards', 'Panneaux fibre de bois', 'mq', '4 cm;6 cm;8 cm'),
  ('Perlite espansa', 'برلايت ممدد', 'Expanded perlite', 'Perlite expansée', 'sacco', '100 L'),
  ('Vetro cellulare', 'زجاج خلوي', 'Cellular glass', 'Verre cellulaire', 'mq', ''),
  ('Barriera al vapore', 'حاجز بخار', 'Vapour barrier', 'Pare-vapeur', 'rot', ''),
  ('Guaina bituminosa', 'لفافة عزل مائي (بيتومين)', 'Bituminous membrane', 'Membrane bitumineuse', 'rot', '3 mm;4 mm;10 m²'),
  ('Guaina liquida / cementizia elastica', 'عزل مائي سائل / أسمنتي مرن', 'Liquid / flexible cementitious waterproofing', 'Étanchéité liquide / ciment souple', 'secchio', '5 kg;20 kg'),
  ('Bandella impermeabilizzante per angoli', 'شريط عزل مائي للزوايا', 'Waterproofing corner tape', 'Bande d’étanchéité d’angle', 'rot', '10 m;50 m'),
  ('Rete in fibra di vetro per cappotto', 'شبكة ألياف زجاجية للعزل الخارجي', 'Fibreglass mesh for ETICS', 'Treillis fibre de verre ITE', 'rot', '50 m²'),
  ('Tasselli per cappotto', 'دوايل تثبيت العزل الخارجي', 'Insulation anchors (ETICS)', 'Chevilles isolant (ITE)', 'conf', '90 mm;110 mm;140 mm;160 mm'),
  ('Profilo di partenza per cappotto', 'مقطع بداية العزل الخارجي', 'ETICS starter track', 'Rail de départ ITE', 'pz', '2,5 m'),
  ('Materassino anticalpestio', 'عازل صوت تحت الأرضية', 'Impact sound insulation mat', 'Sous-couche phonique', 'rot', '5 mm;8 mm;10 mm'),
  ('Membrana traspirante per tetti', 'غشاء تهوية للأسقف', 'Breathable roof membrane', 'Écran de sous-toiture', 'rot', ''),
 ]),
 ('ade', '🧴', 'Adesivi, sigillanti e fissaggi', 'اللواصق والسيليكون والتثبيت', 'Adhesives, sealants and fixings', 'Colles, mastics et fixations', [
  ('Adesivo per piastrelle', 'غراء / لاصق بلاط', 'Tile adhesive', 'Mortier-colle carrelage', 'sacco', 'C1;C2;C2TE S1;25 kg'),
  ('Malta rasante e collante', 'مونة لاصقة ومعجون تسوية', 'Adhesive and skim mortar', 'Mortier colle et enduit', 'sacco', '25 kg'),
  ('Colla per cartongesso / isolanti', 'لاصق الجبس والعزل', 'Adhesive for plasterboard / insulation', 'Colle plaque / isolant', 'sacco', '25 kg'),
  ('Tasselli per calcestruzzo', 'دوايل / فيش خرسانة', 'Concrete anchors', 'Chevilles béton', 'conf', 'Ø6;Ø8;Ø10;Ø12'),
  ('Tasselli per cartongesso', 'دوايل خاصة بالجبس', 'Plasterboard anchors', 'Chevilles plaque de plâtre', 'conf', ''),
  ('Schiuma poliuretanica', 'رغوة بولي يوريثان (فوم)', 'Polyurethane foam', 'Mousse polyuréthane', 'pz', '750 ml'),
  ('Silicone', 'سيليكون', 'Silicone sealant', 'Mastic silicone', 'pz', 'trasparente;bianco;grigio'),
  ('Sigillante acrilico', 'معجون أكريليك', 'Acrylic sealant', 'Mastic acrylique', 'pz', 'bianco;grigio'),
  ('Nastri adesivi', 'شرائط لاصقة', 'Adhesive tapes', 'Rubans adhésifs', 'rot', ''),
  ('Ancorante chimico', 'مثبت كيميائي', 'Chemical anchor', 'Scellement chimique', 'pz', '300 ml;400 ml'),
  ('Barre filettate', 'قضبان ملولبة', 'Threaded rods', 'Tiges filetées', 'pz', 'M6;M8;M10;M12;1 m'),
  ('Colla di montaggio', 'غراء تركيب قوي', 'Construction adhesive', 'Colle de montage', 'pz', '290 ml'),
  ('Colla vinilica', 'غراء خشب أبيض', 'PVA wood glue', 'Colle vinylique', 'conf', '0,75 kg;5 kg'),
 ]),
 ('pav', '🔲', 'Pavimenti e rivestimenti', 'الأرضيات والتلبيس', 'Floor and wall coverings', 'Sols et revêtements', [
  ('Piastrelle in gres porcellanato', 'بلاط بورسلين', 'Porcelain stoneware tiles', 'Carrelage grès cérame', 'mq', '30x60;60x60;60x120;20x120'),
  ('Piastrelle in ceramica per rivestimento', 'بلاط سيراميك للجدران', 'Ceramic wall tiles', 'Faïence murale', 'mq', '20x20;25x40;30x60'),
  ('Stucco per fughe', 'معجون الفواصل (الترويب)', 'Tile grout', 'Joint carrelage', 'sacco', '5 kg;20 kg'),
  ('Stucco epossidico', 'معجون فواصل إيبوكسي', 'Epoxy grout', 'Joint époxy', 'secchio', '2,5 kg;5 kg'),
  ('Distanziatori / crocette', 'فواصل بلاط (صلبان)', 'Tile spacers', 'Croisillons', 'conf', '1 mm;2 mm;3 mm;5 mm'),
  ('Sistema livellante per piastrelle', 'نظام تسوية البلاط (كليبس)', 'Tile levelling system', 'Système de nivellement', 'conf', ''),
  ('Battiscopa', 'وزرة / نعلة الجدار', 'Skirting board', 'Plinthe', 'm', ''),
  ('Profili per piastrelle (angolari, terminali)', 'مقاطع زوايا البلاط', 'Tile trims (corners, edges)', 'Profilés de carrelage', 'pz', '8 mm;10 mm;12 mm;2,5 m'),
  ('Soglie e davanzali', 'عتبات وحافات نوافذ', 'Thresholds and window sills', 'Seuils et appuis de fenêtre', 'pz', ''),
  ('Pavimento laminato', 'باركيه لامينيت', 'Laminate flooring', 'Sol stratifié', 'mq', '7 mm;8 mm;10 mm;12 mm'),
  ('Parquet', 'باركيه خشب', 'Wood parquet', 'Parquet', 'mq', ''),
  ('Pavimento in vinile / LVT', 'أرضية فينيل', 'Vinyl / LVT flooring', 'Sol vinyle / LVT', 'mq', ''),
  ('Materassino sottopavimento', 'طبقة عازلة تحت الباركيه', 'Underlay', 'Sous-couche', 'rot', '2 mm;3 mm;5 mm'),
  ('Primer per massetti', 'برايمر للصبة', 'Screed primer', 'Primaire pour chape', 'l', '5 L;10 L'),
 ]),
 ('ele', '⚡', 'Elettricità (base)', 'الكهرباء (أساسيات)', 'Electrical (basics)', 'Électricité (bases)', [
  ('Tubo corrugato', 'أنبوب كهرباء مرن (كوروغاتو)', 'Corrugated conduit', 'Gaine annelée', 'm', 'Ø16;Ø20;Ø25;Ø32'),
  ('Scatole da incasso 503', 'علب تركيب داخل الجدار', 'Flush wall boxes 503', 'Boîtes d’encastrement 503', 'pz', 'muratura;cartongesso'),
  ('Scatole di derivazione', 'علب توزيع', 'Junction boxes', 'Boîtes de dérivation', 'pz', '92x92;118x96;152x98'),
  ('Cavo unipolare FS17', 'سلك أحادي FS17', 'Single-core cable FS17', 'Câble unipolaire FS17', 'm', '1,5 mm²;2,5 mm²;4 mm²;6 mm²'),
  ('Frutti e placche', 'مفاتيح ومقابس وأغطيتها', 'Switches, sockets and plates', 'Mécanismes et plaques', 'pz', ''),
  ('Morsetti di giunzione', 'موصلات أسلاك', 'Wire connectors', 'Bornes de connexion', 'conf', ''),
  ('Quadro elettrico e interruttori', 'لوحات توزيع وقواطع', 'Electrical panel and breakers', 'Tableau électrique et disjoncteurs', 'pz', ''),
  ('Citofoni / videocitofoni', 'انتركوم / انتركوم فيديو', 'Intercoms / video intercoms', 'Interphones / visiophones', 'pz', ''),
  ('Faretti e plafoniere LED', 'سبوت وإضاءة LED', 'LED spotlights and ceiling lights', 'Spots et plafonniers LED', 'pz', ''),
 ]),
 ('leg', '🪵', 'Legno, metalli e serramenti', 'الخشب والمعادن والأبواب', 'Wood, metal and frames', 'Bois, métaux et menuiseries', [
  ('Profilati in alluminio', 'مقاطع ألمنيوم', 'Aluminium profiles', 'Profilés aluminium', 'pz', ''),
  ('Lamiera zincata', 'صفائح مجلفنة', 'Galvanised sheet', 'Tôle galvanisée', 'pz', ''),
  ('Pannelli OSB', 'ألواح OSB', 'OSB boards', 'Panneaux OSB', 'pz', '9 mm;12 mm;15 mm;18 mm'),
  ('Pannelli in multistrato', 'ألواح خشب أبلكاش', 'Plywood boards', 'Contreplaqué', 'pz', '10 mm;15 mm;18 mm'),
  ('Listelli e morali in legno', 'مرابيع وألواح خشب', 'Timber battens and beams', 'Tasseaux et chevrons', 'pz', '3x5;4x6;6x8;8x8'),
  ('Tavole da cantiere / casseforme', 'ألواح قوالب الصب', 'Formwork boards', 'Planches de coffrage', 'pz', ''),
  ('Controtelai per porte e finestre', 'إطارات تركيب الأبواب والنوافذ', 'Sub-frames for doors and windows', 'Précadres portes et fenêtres', 'pz', ''),
  ('Controtelaio per porta scorrevole', 'إطار باب منزلق داخل الجدار', 'Pocket door frame', 'Châssis de porte à galandage', 'pz', '70 cm;80 cm;90 cm'),
  ('Porte interne', 'أبواب داخلية', 'Interior doors', 'Portes intérieures', 'pz', '70 cm;80 cm;90 cm'),
  ('Angolari e staffe metalliche', 'زوايا ودعامات معدنية', 'Metal angles and brackets', 'Équerres et pattes métalliques', 'pz', ''),
 ]),
 ('fer', '🔩', 'Ferramenta e minuteria', 'الخردوات والمسامير', 'Hardware and small parts', 'Quincaillerie', [
  ('Viti per legno', 'براغي خشب', 'Wood screws', 'Vis à bois', 'conf', '4x30;4x40;5x50;5x70;6x80'),
  ('Chiodi', 'مسامير', 'Nails', 'Clous', 'conf', '30 mm;50 mm;70 mm;100 mm'),
  ('Chiodi d’acciaio per muro', 'مسامير فولاذ للجدار', 'Masonry nails', 'Clous acier pour maçonnerie', 'conf', ''),
  ('Filo di ferro cotto', 'سلك حديد للربط', 'Tie wire', 'Fil de fer recuit', 'kg', ''),
  ('Bulloni, dadi e rondelle', 'براغي وصواميل وحلقات', 'Bolts, nuts and washers', 'Boulons, écrous et rondelles', 'conf', 'M6;M8;M10;M12'),
  ('Fascette di plastica', 'أربطة بلاستيك', 'Cable ties', 'Colliers plastique', 'conf', '200 mm;300 mm;450 mm'),
 ]),
 ('att', '🛠️', 'Attrezzi e consumabili', 'الأدوات والمستهلكات', 'Tools and consumables', 'Outils et consommables', [
  ('Dischi da taglio per flessibile', 'أقراص قطع للصاروخ (فليكس)', 'Cutting discs for angle grinder', 'Disques à tronçonner', 'pz', 'Ø115;Ø125;Ø230'),
  ('Disco diamantato', 'قرص ماسي', 'Diamond blade', 'Disque diamant', 'pz', 'Ø115;Ø125;Ø230'),
  ('Punte per trapano (muro, ferro, legno)', 'ريش مثقاب', 'Drill bits (masonry, metal, wood)', 'Forets (béton, métal, bois)', 'pz', 'Ø6;Ø8;Ø10;Ø12;set'),
  ('Punte SDS per tassellatore', 'ريش SDS للهيلتي', 'SDS bits for rotary hammer', 'Forets SDS pour perforateur', 'pz', 'Ø6;Ø8;Ø10;Ø12;Ø14'),
  ('Frese a tazza', 'مثاقب دائرية (تاس)', 'Hole saws', 'Scies cloches', 'pz', 'Ø68;Ø80;Ø100'),
  ('Lame per seghetto / cutter', 'شفرات منشار / كتر', 'Saw / cutter blades', 'Lames de scie / cutter', 'conf', ''),
  ('Rulli e pennelli', 'رولات وفرش دهان', 'Rollers and brushes', 'Rouleaux et pinceaux', 'pz', ''),
  ('Spatole e frattazzi', 'مالج ومسطرين', 'Spatulas and floats', 'Spatules et taloches', 'pz', ''),
  ('Carta e retine abrasive', 'ورق صنفرة', 'Sandpaper and abrasive mesh', 'Papier et grilles abrasives', 'pz', 'P80;P120;P180;P240'),
  ('Nastro di carta per mascheratura', 'شريط ورقي للدهان', 'Masking tape', 'Ruban de masquage', 'rot', '25 mm;38 mm;50 mm'),
  ('Telo di protezione / cellophane', 'نايلون حماية', 'Protective sheeting', 'Bâche de protection', 'rot', ''),
  ('Cartone ondulato protettivo', 'كرتون حماية للأرضيات', 'Protective corrugated cardboard', 'Carton de protection', 'rot', ''),
  ('Secchi e mastelli', 'دلاء وأحواض خلط', 'Buckets and mixing tubs', 'Seaux et auges', 'pz', ''),
  ('Frusta miscelatrice', 'خلاط معجون للمثقاب', 'Mixing paddle', 'Fouet malaxeur', 'pz', ''),
  ('Sacchi per macerie', 'أكياس ردم', 'Rubble bags', 'Sacs à gravats', 'conf', ''),
  ('Matite, pennarelli e filo traccialinee', 'أقلام وخيط تخطيط', 'Pencils, markers and chalk line', 'Crayons, marqueurs et cordeau', 'pz', ''),
 ]),
 ('sic', '🦺', 'Sicurezza e cantiere', 'السلامة والورشة', 'Safety and site', 'Sécurité et chantier', [
  ('Guanti da lavoro', 'قفازات عمل', 'Work gloves', 'Gants de travail', 'coppia', '8;9;10;11'),
  ('Mascherine FFP2 / FFP3', 'كمامات FFP2 / FFP3', 'FFP2 / FFP3 masks', 'Masques FFP2 / FFP3', 'conf', 'FFP2;FFP3'),
  ('Occhiali protettivi', 'نظارات حماية', 'Safety glasses', 'Lunettes de protection', 'pz', ''),
  ('Casco', 'خوذة', 'Hard hat', 'Casque', 'pz', ''),
  ('Cuffie / tappi antirumore', 'واقي أذن', 'Ear defenders / plugs', 'Casque / bouchons antibruit', 'pz', ''),
  ('Scarpe antinfortunistiche', 'أحذية سلامة', 'Safety shoes', 'Chaussures de sécurité', 'coppia', '39;40;41;42;43;44;45;46'),
  ('Nastro segnaletico bianco-rosso', 'شريط تحذير أبيض وأحمر', 'Red-white warning tape', 'Rubalise rouge et blanc', 'rot', ''),
  ('Noleggio trabattello / ponteggio', 'تأجير سقالة', 'Scaffold rental', 'Location d’échafaudage', 'gg', ''),
  ('Noleggio cassone / big bag', 'تأجير حاوية ردم / بيغ باغ', 'Skip / big bag rental', 'Location de benne / big bag', 'pz', ''),
  ('Smaltimento macerie', 'التخلص من الردم', 'Rubble disposal', 'Évacuation des gravats', 'pz', ''),
  ('Cassetta pronto soccorso', 'حقيبة إسعافات أولية', 'First-aid kit', 'Trousse de secours', 'pz', ''),
  ('Estintore', 'طفاية حريق', 'Fire extinguisher', 'Extincteur', 'pz', '2 kg;6 kg'),
 ]),
]

# Manodopera muratore — Roma, IVA esclusa, prezzi indicativi (solo lavoro, materiali esclusi)
SVC = [
 ('dem', '⛏️', 'Demolizioni', 'الهدم', 'Demolition', 'Démolition', [
  ('e_dtram', 'Demolizione tramezzo', 'هدم حائط فاصل', 'Partition wall demolition', 'Démolition de cloison', 'mq', 18),
  ('e_dpav', 'Rimozione pavimento o rivestimento', 'إزالة بلاط الأرض أو الجدار', 'Floor or wall tile removal', 'Dépose de carrelage', 'mq', 12),
  ('e_dint', 'Rimozione intonaco', 'إزالة اللياسة', 'Plaster removal', 'Piquage d’enduit', 'mq', 10),
  ('e_dvano', 'Apertura vano porta in tramezzo', 'فتح مكان باب في حائط', 'Door opening in partition', 'Ouverture de porte dans cloison', 'pz', 250),
  ('e_dmac', 'Carico e trasporto macerie', 'تحميل ونقل الردم', 'Rubble loading and removal', 'Chargement et évacuation des gravats', 'pz', 150),
 ]),
 ('mur', '🧱', 'Murature e intonaci', 'البناء واللياسة', 'Masonry and plaster', 'Maçonnerie et enduits', [
  ('e_tram', 'Tramezzo in mattoni forati', 'حائط فاصل بالطوب المفرغ', 'Hollow brick partition', 'Cloison en briques creuses', 'mq', 30),
  ('e_blk', 'Muratura in blocchi', 'بناء بالبلوك', 'Block masonry', 'Maçonnerie en blocs', 'mq', 40),
  ('e_int', 'Intonaco civile interno', 'لياسة داخلية', 'Interior plaster', 'Enduit intérieur', 'mq', 18),
  ('e_ras', 'Rasatura pareti', 'تسوية الجدران (رازاتورا)', 'Wall skim coat', 'Enduit de lissage murs', 'mq', 10),
  ('e_mass', 'Massetto tradizionale', 'صبة تسوية تقليدية', 'Traditional screed', 'Chape traditionnelle', 'mq', 14),
  ('e_auto', 'Massetto autolivellante', 'صبة تسوية ذاتية', 'Self-levelling screed', 'Ragréage autolissant', 'mq', 10),
  ('e_trac', 'Tracce per impianti', 'حفر مجاري للتمديدات', 'Wall chases for systems', 'Saignées pour réseaux', 'm', 12),
  ('e_chtr', 'Chiusura tracce', 'إغلاق المجاري', 'Chase filling', 'Rebouchage des saignées', 'm', 6),
 ]),
 ('cgw', '📐', 'Cartongesso', 'الجبس', 'Drywall', 'Plaque de plâtre', [
  ('e_cgp', 'Parete in cartongesso', 'حائط جبس', 'Drywall partition', 'Cloison en plaque', 'mq', 30),
  ('e_cgcp', 'Controparete', 'تلبيس جدار بالجبس', 'Lining wall', 'Contre-cloison / doublage', 'mq', 25),
  ('e_cgcs', 'Controsoffitto', 'سقف معلق', 'Suspended ceiling', 'Faux plafond', 'mq', 28),
  ('e_cgvel', 'Veletta / abbassamento', 'ڤيليتا / تنزيل سقف', 'Bulkhead / soffit', 'Retombée / soffite', 'm', 35),
  ('e_cgst', 'Stuccatura giunti e rasatura', 'معجنة الفواصل والتسوية', 'Joint taping and finishing', 'Bandes et finition', 'mq', 8),
  ('e_cgbot', 'Posa botola di ispezione', 'تركيب فتحة تفتيش', 'Access panel installation', 'Pose de trappe de visite', 'pz', 40),
 ]),
 ('pavw', '🔲', 'Pavimenti e rivestimenti', 'الأرضيات والتلبيس', 'Floors and wall tiles', 'Sols et faïence', [
  ('e_pgres', 'Posa pavimento in gres', 'تركيب بلاط أرضي', 'Floor tile laying', 'Pose de carrelage au sol', 'mq', 25),
  ('e_priv', 'Posa rivestimento bagno / cucina', 'تركيب بلاط الجدران (حمام / مطبخ)', 'Wall tiling (bath / kitchen)', 'Pose de faïence (salle de bain / cuisine)', 'mq', 30),
  ('e_pgf', 'Posa grande formato', 'تركيب بلاط كبير الحجم', 'Large-format tile laying', 'Pose grand format', 'mq', 40),
  ('e_plam', 'Posa parquet / laminato flottante', 'تركيب باركيه / لامينيت', 'Floating parquet / laminate', 'Pose parquet / stratifié flottant', 'mq', 15),
  ('e_pbat', 'Posa battiscopa', 'تركيب الوزرة', 'Skirting installation', 'Pose de plinthes', 'm', 6),
  ('e_pfug', 'Stuccatura fughe', 'ترويب الفواصل', 'Grouting', 'Jointoiement', 'mq', 5),
 ]),
 ('pitw', '🎨', 'Pittura', 'الدهان', 'Painting', 'Peinture', [
  ('e_tpar', 'Tinteggiatura pareti (2 mani)', 'دهان الجدران (طبقتان)', 'Wall painting (2 coats)', 'Peinture murs (2 couches)', 'mq', 6),
  ('e_tsof', 'Tinteggiatura soffitti', 'دهان السقف', 'Ceiling painting', 'Peinture plafonds', 'mq', 7),
  ('e_tstu', 'Stuccatura e carteggiatura', 'معجنة وصنفرة', 'Filling and sanding', 'Rebouchage et ponçage', 'mq', 5),
  ('e_tmuf', 'Trattamento antimuffa', 'معالجة ضد العفن', 'Anti-mould treatment', 'Traitement anti-moisissure', 'mq', 8),
  ('e_tsm', 'Smalto su porte e ringhiere', 'دهان مينا للأبواب والدرابزين', 'Enamel on doors and railings', 'Laque portes et garde-corps', 'mq', 15),
 ]),
 ('isow', '🛡️', 'Isolamento e impermeabilizzazione', 'العزل', 'Insulation and waterproofing', 'Isolation et étanchéité', [
  ('e_capp', 'Cappotto termico (posa)', 'عزل حراري خارجي (تركيب)', 'External thermal insulation (ETICS)', 'Isolation thermique par l’extérieur', 'mq', 45),
  ('e_guliq', 'Impermeabilizzazione con guaina liquida', 'عزل مائي سائل', 'Liquid waterproofing', 'Étanchéité liquide', 'mq', 15),
  ('e_gubit', 'Posa guaina bituminosa', 'تركيب عزل بيتومين', 'Bituminous membrane laying', 'Pose de membrane bitumineuse', 'mq', 18),
 ]),
 ('orew', '⏱️', 'Ore e giornate', 'الساعات والأيام', 'Hours and days', 'Heures et journées', [
  ('e_hmur', 'Manodopera muratore', 'يد عاملة بنّاء', 'Bricklayer labour', 'Main-d’œuvre maçon', 'h', 30),
  ('e_hman', 'Manovale', 'مساعد (مانوفالي)', 'Labourer', 'Manœuvre', 'h', 22),
  ('e_gmur', 'Giornata muratore (8 ore)', 'يوم عمل بنّاء (8 ساعات)', 'Bricklayer day (8 h)', 'Journée maçon (8 h)', 'gg', 220),
  ('e_pul', 'Pulizia fine cantiere', 'تنظيف نهاية الورشة', 'End-of-works cleaning', 'Nettoyage de fin de chantier', 'mq', 4),
 ]),
]

CHECK = [
 ['الجدران مستقيمة وعمودية (بالميزان)', 'Pareti a piombo e in bolla', 'Walls plumb and level', 'Murs d’aplomb et de niveau'],
 ['البلاط مستوٍ والفواصل منتظمة', 'Pavimenti in piano e fughe regolari', 'Floors flat and joints even', 'Sols plans et joints réguliers'],
 ['لا يوجد بلاط مكسور أو صوت فارغ تحته', 'Nessuna piastrella rotta o vuota sotto', 'No cracked or hollow tiles', 'Aucun carreau cassé ou sonnant creux'],
 ['السيليكون حول الحمام والمطبخ جيد', 'Siliconi di bagno e cucina a posto', 'Bathroom and kitchen sealant done', 'Joints silicone salle de bain et cuisine faits'],
 ['الجبس: الفواصل معجونة ولا تظهر', 'Cartongesso: giunti stuccati e invisibili', 'Drywall: joints filled and invisible', 'Plaque : joints traités et invisibles'],
 ['الدهان متجانس بدون بقع أو آثار رول', 'Pittura uniforme, senza macchie o segni', 'Even paint, no stains or roller marks', 'Peinture uniforme, sans taches ni traces'],
 ['الأبواب والنوافذ تفتح وتغلق جيداً', 'Porte e finestre si aprono e chiudono bene', 'Doors and windows open and close well', 'Portes et fenêtres s’ouvrent et ferment bien'],
 ['العتبات والوزرات مركّبة', 'Soglie e battiscopa montati', 'Thresholds and skirting fitted', 'Seuils et plinthes posés'],
 ['المجاري مغلقة والجدران نظيفة', 'Tracce chiuse e pareti pulite', 'Chases filled and walls clean', 'Saignées rebouchées et murs propres'],
 ['العزل المائي مجرّب (الحمام / السطح)', 'Impermeabilizzazione provata (bagno / terrazzo)', 'Waterproofing tested (bathroom / terrace)', 'Étanchéité testée (salle de bain / terrasse)'],
 ['رفع الردم وتنظيف المكان', 'Macerie smaltite e cantiere pulito', 'Rubble removed and site cleaned', 'Gravats évacués et chantier nettoyé'],
 ['صور قبل وبعد للزبون', 'Foto prima/dopo per il cliente', 'Before/after photos for the client', 'Photos avant/après pour le client'],
]


def build_it():
    cats = []
    for cid, ic, it, ar, en, fr, items in CATS:
        lst = []
        for ix, (iit, iar, ien, ifr, unit, sizes) in enumerate(items):
            lst.append({'id': 'edi_%s_%d' % (cid, ix), 'it': iit, 'ar': iar, 'en': ien, 'fr': ifr, 'unit': unit,
                        'sizes': [s.strip() for s in sizes.split(';') if s.strip()], 'colors': False, 'hidden': False})
        cats.append({'id': 'edi_' + cid, 'ic': ic, 'it': it, 'ar': ar, 'en': en, 'fr': fr, 'hidden': False, 'items': lst})
    svc = []
    for gid, ic, it, ar, en, fr, lst in SVC:
        svc.append({'id': 'edi_' + gid, 'ic': ic, 'it': it, 'ar': ar, 'en': en, 'fr': fr, 'hidden': False,
                    'list': [{'id': x[0], 'it': x[1], 'ar': x[2], 'en': x[3], 'fr': x[4], 'unit': x[5], 'price': x[6], 'hidden': False} for x in lst]})
    return {'version': VERSION, 'cats': cats, 'kits': [], 'svc': svc,
            'priceNote': {'ar': 'أسعار يد عاملة البنّاء في روما بدون ضريبة — تقريبية، عدّلها حسب عملك.',
                          'it': 'Prezzi manodopera muratore a Roma, IVA esclusa — indicativi, modificali secondo il tuo lavoro.',
                          'en': 'Bricklayer labour prices in Rome, VAT excluded — indicative, adjust them to your work.',
                          'fr': 'Prix main-d’œuvre maçon à Rome, HT — indicatifs, adaptez-les à votre travail.'}}


TRADES = {
    'edi': {'ic': '🧱', 'name': {'ar': 'بنّاء', 'it': 'Edilizia', 'en': 'Building', 'fr': 'Maçonnerie'},
            'calcs': ['tiles', 'paint', 'drywall', 'screed', 'plaster', 'bricks', 'concrete'],
            'check': CHECK, 'packs': {'IT': build_it()}},
}

if __name__ == '__main__':
    here = os.path.dirname(os.path.abspath(__file__))
    assets = os.path.join(here, '..', '..', 'app', 'src', 'main', 'assets')
    open(os.path.join(assets, 'trades.js'), 'w').write(
        '// Mestieri oltre all\'elettricista (generato da tools/packs/edi_pack.py)\nwindow.LM_TRADES = ' + json.dumps(TRADES, ensure_ascii=False) + ';\n')
    p = TRADES['edi']['packs']['IT']
    print('edi IT:', len(p['cats']), 'categorie,', sum(len(c['items']) for c in p['cats']), 'articoli,', sum(len(g['list']) for g in p['svc']), 'lavori,', len(CHECK), 'collaudo')
