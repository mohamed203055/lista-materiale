# -*- coding: utf-8 -*-
"""Mestiere «Edilizia» 🧱 — catalogo Marocco 🇲🇦.
Fonte: edi_ma_source.csv fornito dal proprietario (ottobre 2026): nome arabo, nome francese, unità.
Escluse le categorie idrauliche/sanitarie (per il futuro mestiere idraulico).
Qui sotto: traduzione italiana e inglese per ogni riferimento (MAT-xxxx) e prezzi manodopera in dirham.
"""
import csv, os

VERSION = 1
HERE = os.path.dirname(os.path.abspath(__file__))
EXCLUDE = ('السباكة والصرف الصحي', 'الأدوات الصحية')

# categoria (prefisso arabo) → id, icona, italiano, inglese
CATS = [
 ('مواد البناء الأساسية', 'base', '🧱', 'Materiali da costruzione', 'Structural materials'),
 ('حديد التسليح', 'fer', '🔩', 'Ferro e carpenteria metallica', 'Rebar and metalwork'),
 ('القوالب', 'cof', '🪵', 'Casseforme, ponteggi e puntelli', 'Formwork, scaffolding and props'),
 ('العزل', 'iso', '🛡️', 'Impermeabilizzazione e isolamento', 'Waterproofing and insulation'),
 ('اللياسة', 'enduit', '📐', 'Intonaci, gesso e cartongesso', 'Plaster, gypsum and drywall'),
 ('البلاط', 'carr', '🔲', 'Piastrelle, ceramica e pietra', 'Tiles, ceramics and stone'),
 ('الدهانات', 'pein', '🎨', 'Pittura', 'Paint'),
 ('أدوات البناء اليدوية', 'outil', '🛠️', 'Attrezzi manuali', 'Hand tools'),
 ('الآلات الكهربائية', 'mach', '🏗️', 'Macchine e attrezzature di cantiere', 'Machines and site equipment'),
 ('الكهرباء والإنارة', 'elec', '⚡', 'Elettricità e illuminazione', 'Electricity and lighting'),
 ('الأبواب والنوافذ', 'menu', '🚪', 'Porte, finestre e falegnameria', 'Doors, windows and joinery'),
 ('المثبتات', 'fix', '🧴', 'Fissaggi e consumabili', 'Fixings and consumables'),
 ('السلامة المهنية', 'sec', '🦺', 'Sicurezza e DPI', 'Safety and PPE'),
 ('الصرف الخارجي', 'ext', '🌳', 'Scarichi esterni e lavori esterni', 'Drainage and outdoor works'),
 ('معدات الرفع', 'lev', '📏', 'Sollevamento, topografia e cantiere', 'Lifting, surveying and site'),
]

# MAT-xxxx → (italiano, inglese)
TR = {
 1: ('Cemento grigio', 'Grey cement'), 2: ('Cemento bianco', 'White cement'), 3: ('Calce', 'Lime'), 4: ('Gesso', 'Plaster of Paris'),
 5: ('Sabbia fine', 'Fine sand'), 6: ('Sabbia lavata', 'Washed sand'), 7: ('Sabbia di cava', 'Quarry sand'), 8: ('Ghiaia', 'Gravel'),
 9: ('Pietrisco frantumato', 'Crushed gravel'), 10: ('Calcestruzzo preconfezionato', 'Ready-mix concrete'), 11: ('Cemento armato', 'Reinforced concrete'),
 12: ('Malta cementizia', 'Cement mortar'), 13: ('Blocco di cemento forato', 'Hollow concrete block'), 14: ('Blocco di cemento pieno', 'Solid concrete block'),
 15: ('Mattone rosso', 'Red brick'), 16: ('Mattone forato', 'Hollow brick'), 17: ('Mattone refrattario', 'Firebrick'), 18: ('Pietra naturale', 'Natural stone'),
 19: ('Architravi in cemento', 'Concrete lintels'), 20: ('Tegola', 'Roof tile'), 21: ('Magrone', 'Blinding concrete'),
 22: ('Ferro per cemento armato', 'Reinforcing steel'), 23: ('Acciaio ad aderenza migliorata (HA)', 'High-bond steel (HA)'), 24: ('Tondo liscio', 'Plain round bar'),
 25: ('Staffe per armatura', 'Rebar stirrups'), 26: ('Rete elettrosaldata', 'Welded mesh'), 27: ('Filo per legature', 'Tie wire'),
 28: ('Distanziatori per armatura', 'Rebar spacers'), 29: ('Barra filettata', 'Threaded rod'), 30: ('Lamiere d’acciaio', 'Steel sheets'),
 31: ('Ferro quadro', 'Square bar'), 32: ('Ferro piatto', 'Flat bar'), 33: ('Angolare in acciaio', 'Steel angle'), 34: ('Profilati metallici', 'Steel profiles'),
 35: ('Travi in acciaio', 'Steel beams'), 36: ('Lamiere zincate', 'Galvanised sheets'),
 37: ('Tavole da cassaforma', 'Formwork boards'), 38: ('Compensato', 'Plywood'), 39: ('Compensato filmato', 'Film-faced plywood'),
 40: ('Pannelli metallici per casseforme', 'Steel formwork panels'), 41: ('Puntelli metallici', 'Steel props'), 42: ('Tavolone (bastaing)', 'Timber plank (bastaing)'),
 43: ('Travetto (morale)', 'Rafter'), 44: ('Morsetto per casseforme', 'Formwork clamp'), 45: ('Tirante per casseforme', 'Formwork tie rod'),
 46: ('Dado per casseforme', 'Formwork nut'), 47: ('Olio disarmante', 'Release oil'), 48: ('Ponteggio', 'Scaffolding'), 49: ('Piattaforma di lavoro', 'Work platform'),
 50: ('Scala in alluminio', 'Aluminium ladder'),
 51: ('Guaina bituminosa', 'Bituminous membrane'), 52: ('Bitume', 'Bitumen'), 53: ('Impermeabilizzante liquido', 'Liquid waterproofing'),
 54: ('Idrorepellente', 'Water repellent'), 55: ('Nastro impermeabilizzante', 'Waterproofing tape'), 56: ('Schiuma poliuretanica', 'Polyurethane foam'),
 57: ('Pannelli EPS', 'EPS boards'), 58: ('Pannelli XPS', 'XPS boards'), 59: ('Lana di vetro', 'Glass wool'), 60: ('Lana di roccia', 'Rock wool'),
 61: ('Barriera al vapore', 'Vapour barrier'), 62: ('Geotessile', 'Geotextile'), 63: ('Sigillante per giunti di dilatazione', 'Expansion joint sealant'),
 64: ('Malta per intonaco', 'Rendering mortar'), 65: ('Rasante', 'Skim coat'), 66: ('Stucco di riempimento', 'Filler'), 67: ('Stucco di finitura', 'Finishing plaster'),
 68: ('Intonaco cementizio', 'Cement render'), 69: ('Intonaco a calce', 'Lime plaster'), 70: ('Rete in fibra di vetro', 'Fibreglass mesh'),
 71: ('Rete metallica di rinforzo', 'Metal reinforcing mesh'), 72: ('Nastro per giunti', 'Joint tape'), 73: ('Paraspigolo', 'Corner bead'),
 74: ('Lastra di cartongesso', 'Plasterboard'), 75: ('Lastra idrofuga', 'Moisture-resistant board'), 76: ('Lastra ignifuga', 'Fire-resistant board'),
 77: ('Guida metallica', 'Metal track'), 78: ('Montante metallico', 'Metal stud'), 79: ('Pendino per controsoffitto', 'Ceiling hanger'),
 80: ('Pannello per controsoffitto', 'Ceiling tile'), 81: ('Botola di ispezione', 'Access panel'),
 82: ('Piastrelle da pavimento', 'Floor tiles'), 83: ('Piastrelle da rivestimento', 'Wall tiles'), 84: ('Gres porcellanato', 'Porcelain stoneware'),
 85: ('Piastrelle antiscivolo', 'Non-slip tiles'), 86: ('Piastrelle per esterni', 'Outdoor tiles'), 87: ('Mosaico', 'Mosaic'), 88: ('Marmo', 'Marble'),
 89: ('Granito', 'Granite'), 90: ('Battiscopa in piastrella', 'Tile skirting'), 91: ('Colla per piastrelle', 'Tile adhesive'),
 92: ('Colla flessibile per piastrelle', 'Flexible tile adhesive'), 93: ('Colla per marmo', 'Marble adhesive'), 94: ('Stucco per fughe', 'Grout'),
 95: ('Crocette distanziatrici', 'Tile spacers'), 96: ('Clip di livellamento', 'Levelling clips'), 97: ('Cunei di livellamento', 'Levelling wedges'),
 98: ('Profili di finitura', 'Finishing trims'), 99: ('Disco diamantato per piastrelle', 'Diamond blade for tiles'),
 100: ('Pittura acrilica per interni', 'Interior acrylic paint'), 101: ('Pittura per esterni', 'Exterior paint'), 102: ('Pittura a olio (glicero)', 'Oil-based paint'),
 103: ('Pittura per facciate', 'Facade paint'), 104: ('Pittura antiumidità', 'Anti-damp paint'), 105: ('Pittura antimuffa', 'Anti-mould paint'),
 106: ('Antiruggine', 'Anti-rust paint'), 107: ('Pittura per metallo', 'Metal paint'), 108: ('Pittura per legno', 'Wood paint'), 109: ('Pittura per pavimenti', 'Floor paint'),
 110: ('Pittura alte temperature', 'High-temperature paint'), 111: ('Pittura decorativa', 'Decorative paint'), 112: ('Primer di aggancio', 'Bonding primer'),
 113: ('Fondo', 'Undercoat'), 114: ('Vernice per legno', 'Wood varnish'), 115: ('Diluente per pittura', 'Paint thinner'), 116: ('Stucco per pittura', 'Painter’s filler'),
 117: ('Carta abrasiva', 'Sandpaper'), 118: ('Nastro di carta per mascheratura', 'Masking tape'), 119: ('Telo di protezione', 'Protective sheet'),
 120: ('Rullo per pittura', 'Paint roller'), 121: ('Pennello', 'Paintbrush'), 122: ('Vaschetta per pittura', 'Paint tray'), 123: ('Asta telescopica', 'Telescopic pole'),
 124: ('Pistola a spruzzo', 'Spray gun'), 125: ('Raschietto', 'Paint scraper'),
 126: ('Pala', 'Shovel'), 127: ('Piccone', 'Pickaxe'), 128: ('Vanga', 'Spade'), 129: ('Carriola', 'Wheelbarrow'), 130: ('Secchio', 'Bucket'), 131: ('Mastello da muratore', 'Mortar tub'),
 132: ('Cazzuola da muratore', 'Bricklayer’s trowel'), 133: ('Cazzuola da finitura', 'Finishing trowel'), 134: ('Frattazzo americano', 'Plastering trowel'),
 135: ('Spatola dentata', 'Notched trowel'), 136: ('Frattazzo a spugna', 'Sponge float'), 137: ('Staggia', 'Straightedge'), 138: ('Livella a bolla', 'Spirit level'),
 139: ('Livella laser', 'Laser level'), 140: ('Filo a piombo', 'Plumb line'), 141: ('Metro a nastro', 'Tape measure'), 142: ('Squadra', 'Square'),
 143: ('Filo traccialinee', 'Chalk line'), 144: ('Martello', 'Hammer'), 145: ('Mazzuolo in gomma', 'Rubber mallet'), 146: ('Mazza', 'Sledgehammer'), 147: ('Scalpello', 'Chisel'),
 148: ('Sega a mano', 'Hand saw'), 149: ('Seghetto per metalli', 'Hacksaw'), 150: ('Pinza', 'Pliers'), 151: ('Chiave regolabile', 'Adjustable wrench'),
 152: ('Cacciavite', 'Screwdriver'), 153: ('Cutter', 'Utility knife'), 154: ('Spazzola metallica', 'Wire brush'), 155: ('Setaccio per sabbia', 'Sand sieve'),
 156: ('Corda', 'Rope'), 157: ('Cassetta degli attrezzi', 'Toolbox'),
 158: ('Trapano elettrico', 'Electric drill'), 159: ('Trapano a percussione', 'Hammer drill'), 160: ('Martello demolitore', 'Demolition hammer'),
 161: ('Tassellatore', 'Rotary hammer'), 162: ('Smerigliatrice angolare', 'Angle grinder'), 163: ('Tagliapiastrelle elettrico', 'Electric tile cutter'),
 164: ('Sega circolare', 'Circular saw'), 165: ('Sega a gattuccio', 'Reciprocating saw'), 166: ('Seghetto alternativo', 'Jigsaw'), 167: ('Levigatrice', 'Sander'),
 168: ('Betoniera', 'Concrete mixer'), 169: ('Miscelatore per malta', 'Mortar mixer'), 170: ('Vibratore per calcestruzzo', 'Concrete vibrator'),
 171: ('Compressore', 'Air compressor'), 172: ('Generatore', 'Generator'), 173: ('Pompa per acqua', 'Water pump'), 174: ('Aspiratore industriale', 'Industrial vacuum'),
 175: ('Saldatrice', 'Welding machine'), 176: ('Piegaferro', 'Rebar bender'), 177: ('Cesoia per metalli', 'Metal shears'), 178: ('Piastra vibrante', 'Plate compactor'),
 179: ('Costipatore', 'Rammer'), 180: ('Montacarichi', 'Material hoist'), 181: ('Pompa per calcestruzzo', 'Concrete pump'), 182: ('Escavatore', 'Excavator'), 183: ('Pala caricatrice', 'Loader'),
 221: ('Filo elettrico', 'Electric wire'), 222: ('Cavo elettrico', 'Electric cable'), 223: ('Guaina / tubo corrugato', 'Flexible conduit'), 224: ('Tubo rigido', 'Rigid conduit'),
 225: ('Canalina', 'Trunking'), 226: ('Scatola di derivazione', 'Junction box'), 227: ('Scatola da incasso', 'Flush box'), 228: ('Quadro elettrico', 'Electrical panel'),
 229: ('Interruttore magnetotermico', 'Circuit breaker'), 230: ('Interruttore differenziale', 'RCD'), 231: ('Scaricatore di sovratensione', 'Surge arrester'),
 232: ('Picchetto di terra', 'Earth rod'), 233: ('Interruttore', 'Switch'), 234: ('Deviatore', 'Two-way switch'), 235: ('Presa di corrente', 'Socket'),
 236: ('Presa stagna', 'Waterproof socket'), 237: ('Presa RJ45', 'RJ45 socket'), 238: ('Lampada LED', 'LED lamp'), 239: ('Striscia LED', 'LED strip'),
 240: ('Proiettore', 'Floodlight'), 241: ('Dimmer', 'Dimmer'), 242: ('Rilevatore di movimento', 'Motion detector'), 243: ('Campanello', 'Doorbell'),
 244: ('Rilevatore di fumo', 'Smoke detector'), 245: ('Pulsante di allarme manuale', 'Manual call point'), 246: ('Telecamera di videosorveglianza', 'CCTV camera'),
 247: ('Videocitofono', 'Video intercom'),
 248: ('Porta in legno', 'Wooden door'), 249: ('Porta metallica', 'Metal door'), 250: ('Porta in alluminio', 'Aluminium door'), 251: ('Porta in PVC', 'PVC door'),
 252: ('Porta tagliafuoco', 'Fire door'), 253: ('Porta blindata', 'Security door'), 254: ('Telaio della porta', 'Door frame'), 255: ('Finestra in alluminio', 'Aluminium window'),
 256: ('Finestra in PVC', 'PVC window'), 257: ('Vetrocamera', 'Double glazing'), 258: ('Vetro temperato', 'Tempered glass'), 259: ('Cerniere', 'Hinges'),
 260: ('Maniglia', 'Door handle'), 261: ('Serratura', 'Door lock'), 262: ('Cilindro', 'Lock cylinder'), 263: ('Binario per porta scorrevole', 'Sliding door track'),
 264: ('Pannelli MDF', 'MDF boards'), 265: ('Pannelli truciolari', 'Particle boards'), 266: ('Guide per cassetti', 'Drawer slides'),
 278: ('Chiodi', 'Nails'), 279: ('Viti', 'Screws'), 280: ('Viti autoperforanti', 'Self-drilling screws'), 281: ('Dadi', 'Nuts'), 282: ('Rondelle', 'Washers'),
 283: ('Tasselli in plastica', 'Plastic wall plugs'), 284: ('Tasselli metallici', 'Metal anchors'), 285: ('Ancorante chimico', 'Chemical anchor'),
 286: ('Ganci di fissaggio', 'Fixing hooks'), 287: ('Squadrette di fissaggio', 'Fixing brackets'), 288: ('Colla multiuso', 'All-purpose adhesive'),
 289: ('Colla epossidica', 'Epoxy adhesive'), 290: ('Silicone', 'Silicone'), 291: ('Sigillante acrilico', 'Acrylic sealant'), 292: ('Dischi da taglio', 'Cutting discs'),
 293: ('Dischi da sbavo', 'Grinding discs'), 294: ('Punte per cemento', 'Masonry drill bits'), 295: ('Punte per metallo', 'Metal drill bits'), 296: ('Lame per sega', 'Saw blades'),
 297: ('Sacchi per macerie', 'Rubble bags'),
 298: ('Casco di sicurezza', 'Hard hat'), 299: ('Scarpe antinfortunistiche', 'Safety shoes'), 300: ('Guanti da lavoro', 'Work gloves'), 301: ('Occhiali protettivi', 'Safety glasses'),
 302: ('Visiera', 'Face shield'), 303: ('Mascherina antipolvere', 'Dust mask'), 304: ('Respiratore', 'Respirator'), 305: ('Protezioni acustiche', 'Hearing protection'),
 306: ('Imbracatura di sicurezza', 'Safety harness'), 307: ('Gilet alta visibilità', 'High-visibility vest'), 308: ('Ginocchiere', 'Knee pads'), 309: ('Estintore', 'Fire extinguisher'),
 310: ('Cassetta pronto soccorso', 'First-aid kit'), 311: ('Nastro segnaletico', 'Warning tape'), 312: ('Transenna da cantiere', 'Site barrier'),
 313: ('Tubo fognario', 'Sewer pipe'), 314: ('Canaletta', 'Drainage channel'), 315: ('Tubo drenante', 'Perforated drain'), 316: ('Ghiaia drenante', 'Drainage gravel'),
 317: ('Cordolo marciapiede', 'Kerb'), 318: ('Lastra per marciapiede', 'Paving slab'), 319: ('Autobloccanti', 'Interlocking pavers'), 320: ('Ciottoli decorativi', 'Decorative pebbles'),
 321: ('Palo di recinzione', 'Fence post'), 322: ('Cancello d’ingresso', 'Entrance gate'), 323: ('Materiale di riempimento', 'Backfill material'),
 324: ('Livello topografico', 'Surveyor’s level'), 325: ('Livella laser rotante', 'Rotary laser level'), 326: ('Teodolite', 'Theodolite'), 327: ('Distanziometro laser', 'Laser distance meter'),
 328: ('Stadia', 'Levelling staff'), 329: ('Gru a torre', 'Tower crane'), 330: ('Carrello elevatore', 'Forklift'), 331: ('Sollevatore telescopico', 'Telehandler'),
 332: ('Autobetoniera', 'Concrete mixer truck'), 333: ('Cassone per macerie', 'Rubble skip'), 334: ('Quadro elettrico di cantiere', 'Site distribution board'),
 335: ('Prolunga elettrica da cantiere', 'Site extension cable'),
}

UNIT = [('م³', 'mc'), ('م²', 'mq'), ('كيس', 'sacco'), ('لتر', 'l'), ('دلو', 'secchio'), ('لفة', 'rot'), ('علبة', 'conf'), ('زوج', 'coppia'),
        ('كغ', 'kg'), ('متر', 'm'), ('طن', 'pz')]


def unit_of(u):
    first = u.split('/')[0].strip()
    for k, v in UNIT:
        if first.startswith(k):
            return v
    return 'pz'


# Manodopera muratore — Marocco, dirham HT, indicativi (solo lavoro)
SVC = [
 ('dem', '⛏️', 'Démolition', 'الهدم', 'Demolizioni', 'Demolition', [
  ('m_dcl', 'Démolition de cloison', 'هدم حائط فاصل', 'Demolizione tramezzo', 'Partition demolition', 'mq', 40),
  ('m_dcar', 'Dépose de carrelage', 'إزالة الزليج / البلاط', 'Rimozione piastrelle', 'Tile removal', 'mq', 25),
  ('m_denduit', 'Piquage d’enduit', 'إزالة اللياسة', 'Rimozione intonaco', 'Plaster removal', 'mq', 20),
  ('m_dgrav', 'Évacuation des gravats (voyage)', 'رفع الردم (رحلة)', 'Trasporto macerie (viaggio)', 'Rubble removal (trip)', 'pz', 300),
 ]),
 ('mac', '🧱', 'Maçonnerie et enduits', 'البناء والتلبيس', 'Murature e intonaci', 'Masonry and plaster', [
  ('m_mur', 'Mur en briques / parpaings', 'بناء حائط بالياجور / البلوك', 'Muratura in mattoni / blocchi', 'Brick / block wall', 'mq', 60),
  ('m_enint', 'Enduit ciment intérieur', 'تلبيس داخلي بالإسمنت', 'Intonaco cementizio interno', 'Interior cement render', 'mq', 35),
  ('m_enext', 'Enduit de façade', 'تلبيس الواجهة', 'Intonaco di facciata', 'Facade render', 'mq', 45),
  ('m_chape', 'Chape ciment', 'تسوية الأرضية (شاب)', 'Massetto', 'Cement screed', 'mq', 40),
  ('m_saign', 'Saignées pour réseaux', 'حفر مجاري التمديدات', 'Tracce per impianti', 'Wall chases', 'm', 15),
  ('m_dalle', 'Coulage de dalle (main-d’œuvre)', 'صب الدالة (يد عاملة)', 'Getto solaio (manodopera)', 'Slab pouring (labour)', 'mq', 80),
 ]),
 ('pla', '📐', 'Plâtre et faux plafond', 'الجبس والسقف المعلق', 'Gesso e controsoffitti', 'Plaster and ceilings', [
  ('m_fpl', 'Faux plafond en plâtre', 'سقف معلق بالجبس', 'Controsoffitto in gesso', 'Plaster suspended ceiling', 'mq', 80),
  ('m_cba', 'Cloison en plaque de plâtre', 'حائط بألواح الجبس', 'Parete in cartongesso', 'Drywall partition', 'mq', 70),
  ('m_corn', 'Corniche / staff', 'كورنيش / ستاف', 'Cornice in gesso', 'Plaster cornice', 'm', 50),
  ('m_enpl', 'Enduit plâtre', 'تلبيس بالجبس', 'Intonaco a gesso', 'Gypsum plaster', 'mq', 30),
 ]),
 ('car', '🔲', 'Carrelage', 'الزليج والبلاط', 'Piastrelle', 'Tiling', [
  ('m_csol', 'Pose carrelage sol (droite)', 'تركيب بلاط الأرض (مستقيم)', 'Posa pavimento (dritta)', 'Floor tiling (straight)', 'mq', 35),
  ('m_cdiag', 'Pose en diagonale', 'تركيب مائل', 'Posa in diagonale', 'Diagonal laying', 'mq', 45),
  ('m_cgf', 'Pose grand format', 'تركيب بلاط كبير', 'Posa grande formato', 'Large-format laying', 'mq', 75),
  ('m_cfai', 'Pose faïence murale', 'تركيب زليج الحائط', 'Posa rivestimento', 'Wall tiling', 'mq', 40),
  ('m_cpl', 'Pose de plinthes', 'تركيب الوزرة', 'Posa battiscopa', 'Skirting', 'm', 10),
  ('m_zel', 'Pose de zellige', 'تركيب الزليج البلدي', 'Posa zellige', 'Zellige laying', 'mq', 130),
 ]),
 ('pei', '🎨', 'Peinture', 'الصباغة', 'Pittura', 'Painting', [
  ('m_pmur', 'Peinture murs (2 couches)', 'صباغة الحيطان (طبقتان)', 'Tinteggiatura pareti (2 mani)', 'Wall painting (2 coats)', 'mq', 20),
  ('m_ppla', 'Peinture plafonds', 'صباغة السقف', 'Tinteggiatura soffitti', 'Ceiling painting', 'mq', 25),
  ('m_pfac', 'Peinture façade', 'صباغة الواجهة', 'Pittura facciata', 'Facade painting', 'mq', 30),
  ('m_plis', 'Enduit de lissage', 'معجون التسوية', 'Rasatura', 'Skim coat', 'mq', 15),
 ]),
 ('eta', '🛡️', 'Étanchéité', 'العزل المائي', 'Impermeabilizzazione', 'Waterproofing', [
  ('m_etmem', 'Étanchéité terrasse (membrane)', 'عزل السطح (لفائف)', 'Impermeabilizzazione terrazzo (guaina)', 'Roof waterproofing (membrane)', 'mq', 60),
  ('m_etliq', 'Étanchéité liquide', 'عزل مائي سائل', 'Impermeabilizzazione liquida', 'Liquid waterproofing', 'mq', 35),
 ]),
 ('jou', '⏱️', 'Heures et journées', 'الساعات والأيام', 'Ore e giornate', 'Hours and days', [
  ('m_jmaa', 'Journée maâlem', 'يوم معلّم', 'Giornata capomastro', 'Master builder day', 'gg', 300),
  ('m_jaide', 'Journée aide / manœuvre', 'يوم مساعد (خدّام)', 'Giornata manovale', 'Labourer day', 'gg', 150),
  ('m_heure', 'Heure de travail', 'ساعة عمل', 'Ora di lavoro', 'Working hour', 'h', 40),
 ]),
]


def build_ma():
    rows = list(csv.reader(open(os.path.join(HERE, 'edi_ma_source.csv'), encoding='utf-8-sig')))[1:]
    cats, by = [], {}
    for pre, cid, ic, it, en in CATS:
        by[pre] = {'id': 'edm_' + cid, 'ic': ic, 'it': it, 'en': en, 'hidden': False, 'items': []}
        cats.append(by[pre])
    for r in rows:
        ref, cat, ar, fr, un = r[0], r[1], r[2].strip(), r[3].strip(), r[4]
        if cat.startswith(EXCLUDE):
            continue
        key = next(p for p, *_ in CATS if cat.startswith(p))
        c = by[key]
        if 'ar' not in c:
            c['ar'], c['fr'] = [s.strip() for s in cat.split('|')]
        n = int(ref.split('-')[1])
        it, en = TR[n]
        c['items'].append({'id': 'edm_%d' % n, 'it': it, 'ar': ar, 'fr': fr, 'en': en, 'unit': unit_of(un),
                           'sizes': [s.strip() for s in (r[7] or '').split(';') if s.strip()], 'colors': False, 'hidden': False})
    svc = []
    for gid, ic, fr, ar, it, en, lst in SVC:
        svc.append({'id': 'edm_' + gid, 'ic': ic, 'fr': fr, 'ar': ar, 'it': it, 'en': en, 'hidden': False,
                    'list': [{'id': x[0], 'fr': x[1], 'ar': x[2], 'it': x[3], 'en': x[4], 'unit': x[5], 'price': x[6], 'hidden': False} for x in lst]})
    return {'version': VERSION, 'cats': cats, 'kits': [], 'svc': svc,
            'priceNote': {'ar': 'أسعار يد عاملة البناء في المغرب بالدرهم بدون TVA — تقريبية، عدّلها حسب مدينتك.',
                          'it': 'Prezzi manodopera edile in Marocco, in dirham IVA esclusa — indicativi, adattali alla tua città.',
                          'en': 'Building labour prices in Morocco, in dirham excl. VAT — indicative, adapt them to your city.',
                          'fr': 'Prix main-d’œuvre bâtiment au Maroc, en dirhams HT — indicatifs, adaptez-les à votre ville.'}}
