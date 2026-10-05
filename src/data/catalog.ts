export type Language = 'en' | 'ur';

export type FilterCategory = 'All' | 'Door Hardware' | 'Kitchen' | 'Cabinet' | 'Interior';

export interface FinishSwatch {
  id: string;
  name: string;
  nameUr: string;
  hex: string;
  gradient: string;
}

export interface ProductCategory {
  id: string;
  number: string;
  title: string;
  titleUr: string;
  filterGroup: Exclude<FilterCategory, 'All'>;
  shortDesc: string;
  shortDescUr: string;
  fullDesc: string;
  fullDescUr: string;
  image: string;
  bentoSpan: string;
  features: string[];
  featuresUr: string[];
  bookingTag: string;
  specCode: string;
}

export interface StatementPiece {
  id: string;
  code: string;
  title: string;
  titleUr: string;
  subtitle: string;
  subtitleUr: string;
  material: string;
  mechanism: string;
  image: string;
  categoryTag: string;
}

export const FINISH_SWATCHES: FinishSwatch[] = [
  {
    id: 'antique-brass',
    name: 'Antique Brass',
    nameUr: 'اینٹیک براس',
    hex: '#C9A24B',
    gradient: 'linear-gradient(135deg, #C9A24B 0%, #F3E2A9 50%, #8E6421 100%)',
  },
  {
    id: 'satin-nickel',
    name: 'Satin Nickel',
    nameUr: 'سیٹن نکل',
    hex: '#B8B9B4',
    gradient: 'linear-gradient(135deg, #9E9F9A 0%, #E2E3DE 50%, #7C7D78 100%)',
  },
  {
    id: 'matte-black',
    name: 'Matte Black',
    nameUr: 'میٹ بلیک',
    hex: '#1F1F23',
    gradient: 'linear-gradient(135deg, #2E2E33 0%, #151518 50%, #0A0A0B 100%)',
  },
  {
    id: 'chrome',
    name: 'Polished Chrome',
    nameUr: 'پالش کروم',
    hex: '#D8DDE2',
    gradient: 'linear-gradient(135deg, #B4BCC4 0%, #FFFFFF 50%, #86919B 100%)',
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    nameUr: 'روز گولڈ',
    hex: '#C88A78',
    gradient: 'linear-gradient(135deg, #B77461 0%, #F2C6B8 50%, #8C4E3C 100%)',
  },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'antique-brass-door-pulls',
    number: '01',
    title: 'Antique & Brass Door Pulls and Handles',
    titleUr: 'اینٹیک اور براس ڈور پلز اور ہینڈلز',
    filterGroup: 'Door Hardware',
    shortDesc: 'Ornate statement pulls, architectural bars, and hand-cast lion-head knockers.',
    shortDescUr: 'منفرد ڈیزائن کے دروازے کے ہینڈلز اور روایتی دستک دینے والے کنڈے۔',
    fullDesc:
      'Designed for grand entrances across Lahore, our antique and solid brass door pulls combine heritage relief detailing with deep lacquer protection. Available in matched pairs for double timber doors as well as sculpted lion-head knockers.',
    fullDescUr:
      'لاہور کے شاندار گھروں کے داخلی دروازوں کے لیے خاص طور پر تیار کردہ اینٹیک اور خالص براس ہینڈلز جو پائیداری اور خوبصورتی کا بہترین امتزاج ہیں۔',
    image: '/src/assets/images/brass_door_pulls_ornate_1791204896941.jpg',
    bentoSpan: 'md:col-span-7 lg:col-span-7 min-h-[380px] md:min-h-[440px]',
    features: [
      'Solid cast brass & heavy zinc-alloy construction',
      'Hand-rubbed antique patina & PVD tarnish-resistant coating',
      'Concealed through-bolt mounting for solid wood & veneer doors',
      'Matching lion-head knockers and escutcheon plates available',
    ],
    featuresUr: [
      'خالص براس اور مضبوط زنک الائے سے تیار کردہ',
      'زنگ اور موسمی اثرات سے محفوظ پی وی ڈی کوٹنگ',
      'مضبوط لکڑی کے دروازوں کے لیے مخفی فٹنگ سسٹم',
      'میچنگ لائن ہیڈ دستک اور لاک پلیٹس دستیاب ہیں',
    ],
    bookingTag: 'Door Handles',
    specCode: 'MK-DP-101',
  },
  {
    id: 'main-door-locks-sets',
    number: '02',
    title: 'Main Door Locks & Handle Sets',
    titleUr: 'مین ڈور لاکس اور ہینڈل سیٹس',
    filterGroup: 'Door Hardware',
    shortDesc: 'Anti-theft heavy diecast bodies engineered with precision steel mortise mechanisms.',
    shortDescUr: 'اینٹی تھیفٹ مضبوط ڈائی کاسٹ باڈی اور فولادی لاک سسٹم۔',
    fullDesc:
      'Engineered for uncompromising residential and commercial security. Our main door handle sets feature high-density diecast plates paired with multi-bolt steel mortise bodies and anti-pick brass cylinders.',
    fullDescUr:
      'مکمل حفاظت اور دلکش انداز۔ ہمارے مین ڈور لاک سیٹس میں بھاری ڈائی کاسٹ پلیٹس اور فولادی مورٹائز سسٹم شامل ہیں جو سالہا سال بے مثال کارکردگی دیتے ہیں۔',
    image: '/src/assets/images/main_door_lock_set_1791204912330.jpg',
    bentoSpan: 'md:col-span-5 lg:col-span-5 min-h-[380px] md:min-h-[440px]',
    features: [
      'Anti-theft hardened steel deadbolt & latch mechanism',
      'Heavy-duty diecast grip handles with zero-sag return springs',
      'Computerized dimple brass keys with smooth cylinder action',
      'Suitable for 38mm to 65mm main entrance doors',
    ],
    featuresUr: [
      'اینٹی تھیفٹ فولادی ڈیڈ بولٹ اور مضبوط لاک سسٹم',
      'پائیدار سپرنگ سسٹم جو ہینڈل کو ڈھیلا نہیں ہونے دیتا',
      'کمپیوٹرائزڈ براس چابیاں اور ہموار سلنڈر ایکشن',
      '38 ملی میٹر سے 65 ملی میٹر موٹے دروازوں کے لیے موزوں',
    ],
    bookingTag: 'Locks',
    specCode: 'MK-LK-204',
  },
  {
    id: 'cabinet-hinges',
    number: '03',
    title: 'Cabinet Hinges (Soft-Close & Concealed)',
    titleUr: 'کیبنٹ قبضے (سوفٹ کلوز اور مخفی)',
    filterGroup: 'Cabinet',
    shortDesc: 'Whisper-quiet hydraulic soft-close, concealed cup, and clip-on wardrobe hinges.',
    shortDescUr: 'خاموشی سے بند ہونے والے ہائیڈرولک اور کلپ آن کیبنٹ قبضے۔',
    fullDesc:
      'The unseen backbone of luxury kitchens and wardrobes. Our hydraulic damping hinges ensure effortless, silent closure every time, featuring 3D micro-adjustment screws for millimetre-accurate door alignment.',
    fullDescUr:
      'جدید کچن اور الماریوں کی جان۔ ہائیڈرولک سوفٹ کلوز ٹیکنالوجی جو پٹخنے کی آواز ختم کرے اور تھری ڈی ایڈجسٹمنٹ سے کیبنٹ کے دروازوں کو بالکل سیدھا رکھے۔',
    image: '/src/assets/images/concealed_cabinet_hinges_1791204922277.jpg',
    bentoSpan: 'md:col-span-4 lg:col-span-4 min-h-[340px]',
    features: [
      'Integrated hydraulic damper for silent soft-close motion',
      'Quick-release clip-on mounting plate for rapid installation',
      'Full overlay, half overlay, and inset configurations',
      'Corrosion-tested nickel & dark titanium electroplated steel',
    ],
    featuresUr: [
      'خاموش بندش کے لیے بلٹ ان ہائیڈرولک ڈیمپر',
      'آسان فٹنگ کے لیے کوئیک ریلیز کلپ آن پلیٹ',
      'فل اوورلے، ہاف اوورلے اور ان سیٹ سائز دستیاب',
      'نمی اور زنگ سے محفوظ نکل اور ٹائٹینیم فنش',
    ],
    bookingTag: 'Hinges',
    specCode: 'MK-HG-309',
  },
  {
    id: 'kitchen-accessories',
    number: '04',
    title: 'Kitchen Accessories & Organizers',
    titleUr: 'کچن ایکسیسریز اور آرگنائزرز',
    filterGroup: 'Kitchen',
    shortDesc: 'Over-sink architectural dish racks, pull-out pantries, and stainless steel organizers.',
    shortDescUr: 'اوور سنک ڈش ریک، پل آؤٹ پینٹری اور سٹین لیس سٹیل آرگنائزرز۔',
    fullDesc:
      'Inspired by global trends to create beautiful kitchen stories. From space-saving over-sink tiered dish racks to concealed pull-out bottle organizers and cutlery systems, engineered in rust-proof stainless steel.',
    fullDescUr:
      'عالمی معیار کے مطابق آپ کے کچن کو منظم اور خوبصورت بنانے کے لیے اوور سنک ڈش ریک، پل آؤٹ باسکٹس اور زنگ سے پاک سٹین لیس سٹیل آرگنائزرز۔',
    image: '/src/assets/images/kitchen_organizer_rack_1791204932068.jpg',
    bentoSpan: 'md:col-span-8 lg:col-span-8 min-h-[340px]',
    features: [
      'Multi-tier over-sink dish drying racks in Matte Black & Brushed Gold',
      'Heavy-load ball-bearing pull-out pantry & spice baskets',
      'Food-grade SUS-304 stainless steel wirework & drainage trays',
      'Custom cabinet width compatibility (450mm to 900mm)',
    ],
    featuresUr: [
      'میٹ بلیک اور گولڈ فنش میں ملٹی ٹیئر اوور سنک ڈش ریک',
      'مضبوط بال بیرنگ سلائیڈز کے ساتھ پل آؤٹ پینٹری باسکٹس',
      'فوڈ گریڈ 304 سٹین لیس سٹیل سے تیار کردہ',
      'تمام معیاری کیبنٹ سائزز کے لیے موزوں',
    ],
    bookingTag: 'Kitchen Accessories',
    specCode: 'MK-KT-412',
  },
  {
    id: 'door-stoppers-catches',
    number: '05',
    title: 'Door Stoppers & Magnetic Catches',
    titleUr: 'ڈور سٹاپرز اور میگنیٹک کیچز',
    filterGroup: 'Door Hardware',
    shortDesc: 'Floor & wall magnetic door holders, concealed buffers, and cabinet push-latches.',
    shortDescUr: 'فلور اور وال میگنیٹک ڈور سٹاپرز اور کیبنٹ کیچز۔',
    fullDesc:
      'Protect walls and custom joinery from impact with heavy-pull neodymium magnetic door stoppers, rubber-buffered dome stops, and ultra-slim magnetic cabinet catches.',
    fullDescUr:
      'دیواروں اور قیمتی دروازوں کو ٹکرانے سے بچانے کے لیے طاقتور میگنیٹک ڈور سٹاپرز اور ربر بفر ہولڈرز۔',
    image: '/src/assets/images/cabinet_knobs_laminates_1791205023931.jpg',
    bentoSpan: 'md:col-span-4 lg:col-span-4 min-h-[320px]',
    features: [
      'High-pull neodymium magnet holds heavy doors in drafty corridors',
      'Spring-loaded shock absorption prevents slamming impact',
      'Floor-mount and skirting wall-mount profiles in all 5 finishes',
      'Ultra-thin magnetic catches for handleless wardrobe shutters',
    ],
    featuresUr: [
      'ہوادار جگہوں پر بھاری دروازوں کو روکنے کے لیے طاقتور مقناطیس',
      'جھٹکا جذب کرنے والا سپرنگ سسٹم',
      'فرش اور دیوار دونوں پر لگانے کے ڈیزائن دستیاب',
      'الماری کے دروازوں کے لیے سلم میگنیٹک کیچز',
    ],
    bookingTag: 'Other',
    specCode: 'MK-DS-502',
  },
  {
    id: 'cabinet-handles-knobs',
    number: '06',
    title: 'Cabinet Handles & Knobs',
    titleUr: 'کیبنٹ ہینڈلز اور نوبز',
    filterGroup: 'Cabinet',
    shortDesc: 'Knurled brass T-bars, concealed edge profiles, and classic porcelain-inlay knobs.',
    shortDescUr: 'جدید ٹی بارز، مخفی پروفائل ہینڈلز اور کلاسک نوبز۔',
    fullDesc:
      'Jewellery for your cabinetry. Choose from precision-knurled architectural pulls, minimalist G-profile edge handles, and timeless vintage knobs in brushed champagne gold, matte black, and antique bronze.',
    fullDescUr:
      'آپ کی الماریوں اور درازوں کے لیے زیور کی مانند۔ جدید نرلڈ براس ہینڈلز، منیملسٹ پروفائلز اور کلاسک نوبز۔',
    image: '/src/assets/images/cabinet_knobs_laminates_1791205023931.jpg',
    bentoSpan: 'md:col-span-4 lg:col-span-4 min-h-[320px]',
    features: [
      'Standard centre-to-centre hole pitches (96mm, 128mm, 160mm, 320mm)',
      'Diamond-knurled texture and smooth architectural chamfers',
      'Scratch-resistant anodized aluminium & solid brass options',
      'Supplied with break-off M4 machine screws for variable board thickness',
    ],
    featuresUr: [
      'تمام معیاری سائزز (96mm سے 320mm) میں دستیاب',
      'ڈائمنڈ نرلڈ ٹیکسچر اور ہموار فنشنگ',
      'خراش سے محفوظ ایلومینیم اور براس آپشنز',
      'ہر موٹائی کی شیٹ کے لیے مخصوص پیچ ہمراہ ہیں',
    ],
    bookingTag: 'Door Handles',
    specCode: 'MK-CH-618',
  },
  {
    id: 'wood-laminates-finishes',
    number: '07',
    title: 'Wood Laminates & Interior Finishes',
    titleUr: 'ووڈ لیمینیٹس اور انٹیریئر فنشز',
    filterGroup: 'Interior',
    shortDesc: 'Tactile woodgrain laminates, fluted wall panels, and decorative interior surfaces.',
    shortDescUr: 'ٹیکسچرڈ ووڈ لیمینیٹس، فلوٹڈ وال پینلز اور انٹیریئر شیٹس۔',
    fullDesc:
      'Complete your interior specification under one roof. We pair our architectural hardware with curated high-pressure laminates, synchronized pore woodgrains, and modern surface finishes for wardrobes, kitchens, and feature walls.',
    fullDescUr:
      'ہارڈویئر کے ساتھ بہترین ہم آہنگی کے لیے اعلیٰ معیار کی ووڈ لیمینیٹ شیٹس، ٹیکسچرڈ گرینز اور جدید انٹیریئر فنشز۔',
    image: '/src/assets/images/cabinet_knobs_laminates_1791205023931.jpg',
    bentoSpan: 'md:col-span-4 lg:col-span-4 min-h-[320px]',
    features: [
      'Deep synchronized wood-grain textures & ultra-matte finishes',
      'Heat, moisture, and scratch-resistant surfaces for kitchen shutters',
      'Curated hardware-to-laminate colour pairing advice in showroom',
      'Ideal for residential wardrobes, commercial offices & feature walls',
    ],
    featuresUr: [
      'قدرتی لکڑی جیسا ٹیکسچر اور الٹرا میٹ فنش',
      'حرارت، نمی اور خراش سے محفوظ سطح',
      'شوروم میں ہارڈویئر کے ساتھ کلر میچنگ کی سہولت',
      'الماریوں، دفاتر اور فیچر والز کے لیے بہترین انتخاب',
    ],
    bookingTag: 'Laminates',
    specCode: 'MK-LM-705',
  },
];

export const STATEMENT_PIECES: StatementPiece[] = [
  {
    id: 'sp-01',
    code: 'EDITION 01 / ROYAL PULL',
    title: 'Imperial Cast Brass Entrance Pull & Lion Knocker',
    titleUr: 'امپیریل کاسٹ براس ڈور پل اور لائن ناکر',
    subtitle: 'Hand-finished relief casting with heritage patina for solid timber double doors.',
    subtitleUr: 'شاندار لکڑی کے دروازوں کے لیے ہاتھ سے تراشا گیا خالص براس ہینڈل۔',
    material: 'Solid Brass / Antique Bronze Patina',
    mechanism: 'Heavy Concealed Through-Bolt Spindle',
    image: '/src/assets/images/brass_door_pulls_ornate_1791204896941.jpg',
    categoryTag: 'Door Handles',
  },
  {
    id: 'sp-02',
    code: 'EDITION 02 / FORTRESS LOCK',
    title: 'overeign Heavy Diecast Anti-Theft Mortise Set',
    titleUr: 'ہیوی ڈائی کاسٹ اینٹی تھیفٹ مین ڈور لاک سیٹ',
    subtitle: 'Triple-deadbolt steel mortise core wrapped in brushed champagne gold armour plates.',
    subtitleUr: 'ٹرپل ڈیڈ بولٹ فولادی سسٹم اور شیمپین گولڈ فنش۔',
    material: 'High-Density Diecast Alloy + Hardened Steel',
    mechanism: 'Multi-Bolt Anti-Pick Cylinder Mechanism',
    image: '/src/assets/images/main_door_lock_set_1791204912330.jpg',
    categoryTag: 'Locks',
  },
  {
    id: 'sp-03',
    code: 'EDITION 03 / SILENT MOTION',
    title: 'Zero-Slam Hydraulic Concealed Hinge System',
    titleUr: 'زیرو سلیم ہائیڈرولک سوفٹ کلوز قبضہ سسٹم',
    subtitle: 'Precision fluid damping with 3-axis micro-calibration and one-touch clip release.',
    subtitleUr: 'خاموش بندش اور تھری ڈی ایڈجسٹمنٹ والا جدید قبضہ۔',
    material: 'Cold-Rolled Steel / Dark Titanium Finish',
    mechanism: 'Integrated Sealed Hydraulic Cylinder',
    image: '/src/assets/images/concealed_cabinet_hinges_1791204922277.jpg',
    categoryTag: 'Hinges',
  },
  {
    id: 'sp-04',
    code: 'EDITION 04 / CULINARY ARCH',
    title: 'Modular Over-Sink Stainless Culinary Station',
    titleUr: 'ماڈیولر اوور سنک سٹین لیس سٹیل کچن ریک',
    subtitle: 'Architectural tiered drainage and knife/utensil organization above your sink basin.',
    subtitleUr: 'سنک کے اوپر برتن خشک کرنے اور کچن کو منظم رکھنے کا بہترین حل۔',
    material: 'SUS-304 Stainless Steel / Matte Obsidian',
    mechanism: 'Modular Snap-Lock Tier Architecture',
    image: '/src/assets/images/kitchen_organizer_rack_1791204932068.jpg',
    categoryTag: 'Kitchen Accessories',
  },
];
