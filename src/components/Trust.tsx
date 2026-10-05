import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Compass,
  Layers,
  Store,
  MessageSquare,
  Globe,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MoveHorizontal,
} from 'lucide-react';
import { Language } from '../data/catalog';

interface TrustProps {
  lang: Language;
}

const GALLERY_ITEMS = [
  {
    id: 'g-1',
    title: 'Ornate Solid Brass Entrance Pulls & Lion Knockers',
    category: 'Door Hardware · Garhi Shahu Showroom',
    src: '/src/assets/images/brass_door_pulls_ornate_1791204896941.jpg',
    span: 'md:col-span-7 aspect-[16/10]',
  },
  {
    id: 'g-2',
    title: 'Heavy Diecast Anti-Theft Mortise Handle Set',
    category: 'Main Entrance Security · Steel Core',
    src: '/src/assets/images/main_door_lock_set_1791204912330.jpg',
    span: 'md:col-span-5 aspect-[4/3]',
  },
  {
    id: 'g-3',
    title: 'Soft-Close Concealed Hydraulic Hinges',
    category: 'Cabinetry & Wardrobe Motion',
    src: '/src/assets/images/concealed_cabinet_hinges_1791204922277.jpg',
    span: 'md:col-span-4 aspect-[4/3]',
  },
  {
    id: 'g-4',
    title: 'Over-Sink Stainless Steel Kitchen Organizer Station',
    category: 'Culinary Stories · SUS-304',
    src: '/src/assets/images/kitchen_organizer_rack_1791204932068.jpg',
    span: 'md:col-span-4 aspect-[4/3]',
  },
  {
    id: 'g-5',
    title: 'Fluted Wood Laminates, Knurled T-Bars & Magnetic Stops',
    category: 'Interior Surfaces & Accents',
    src: '/src/assets/images/cabinet_knobs_laminates_1791205023931.jpg',
    span: 'md:col-span-4 aspect-[4/3]',
  },
];

const TIMELINE_STEPS = [
  {
    num: '01',
    title: 'Consultation & Drawings Review',
    titleUr: 'مشاورت اور نقشہ جات کا جائزہ',
    desc: 'Bring your architectural door schedules, kitchen elevations, or contractor lists to our Beadon Road showroom or share them via WhatsApp.',
    descUr: 'اپنے گھر کے دروازوں یا کچن کی تفصیلات ہمارے شوروم لائیں یا واٹس ایپ پر شیئر کریں۔',
  },
  {
    num: '02',
    title: 'Tactile Selection & Finish Matching',
    titleUr: 'ہارڈویئر اور فنشنگ کا انتخاب',
    desc: 'Experience the weight of solid brass pulls, test soft-close hydraulic hinges in person, and pair hardware finishes directly against wood laminates.',
    descUr: 'براس ہینڈلز کا وزن اور کوالٹی خود چیک کریں اور لیمینیٹ شیٹس کے ساتھ کلر میچنگ کریں۔',
  },
  {
    num: '03',
    title: 'Transparent Itemized PKR Quotation',
    titleUr: 'واضح اور تفصیلی کوٹیشن',
    desc: 'Receive a clear room-by-room hardware bill of quantities in PKR tailored to your aesthetic and structural budget.',
    descUr: 'اپنے بجٹ اور ضرورت کے مطابق ہر کمرے کے ہارڈویئر کی مکمل اور شفاف کوٹیشن حاصل کریں۔',
  },
  {
    num: '04',
    title: 'Dispatch & Carpenter Fitting Guidance',
    titleUr: 'ڈلیوری اور فٹنگ رہنمائی',
    desc: 'Carefully packaged delivery across Lahore and nationwide, with technical cutout dimensions for your joinery and installation teams.',
    descUr: 'لاہور اور پورے پاکستان میں محفوظ ڈلیوری اور کاریگر کے لیے مکمل تکنیکی رہنمائی۔',
  },
];

const EDITABLE_TESTIMONIALS = [
  {
    id: 't-1',
    slotLabel: 'Editable Client Slot 01',
    quote:
      '[Client review placeholder — e.g. Share how MAKA assisted with main entrance brass pulls and anti-theft locks for a residential project in DHA Lahore.]',
    author: '[Customer Name] — [Project Type, e.g. 1-Kanal Residence, DHA Phase 6]',
  },
  {
    id: 't-2',
    slotLabel: 'Editable Architect Slot 02',
    quote:
      '[Architect / Designer review placeholder — e.g. Note on sourcing matching cabinet handles, soft-close hinges, and wood laminates under one roof at Beadon Road.]',
    author: '[Principal Architect / Firm Name] — [Interior Studio, Lahore]',
  },
  {
    id: 't-3',
    slotLabel: 'Editable Builder Slot 03',
    quote:
      '[Kitchen renovation review placeholder — e.g. Feedback on over-sink stainless steel dish racks and prompt WhatsApp order coordination.]',
    author: '[Homeowner / Builder Name] — [Kitchen Remodel, Gulberg / Bahria Town]',
  },
];

export const Trust: React.FC<TrustProps> = ({ lang }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScaleY = useTransform(timelineProgress, [0, 1], [0, 1]);

  // Lightbox state
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Before/After comparison slider state (0 to 100)
  const [sliderPos, setSliderPos] = useState(52);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Testimonial carousel index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') {
        setLightboxIdx((prev) => (prev === null ? null : (prev + 1) % GALLERY_ITEMS.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIdx((prev) =>
          prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIdx]);

  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  };

  const features = [
    {
      icon: ShieldCheck,
      title: lang === 'en' ? 'Premium Quality Materials' : 'اعلیٰ معیار کا میٹریل',
      desc:
        lang === 'en'
          ? 'Heavy diecast bodies, solid cast brass pulls, and hardened steel mortise mechanisms built for decades of daily use.'
          : 'مضبوط ڈائی کاسٹ باڈی، خالص براس ہینڈلز اور فولادی لاک سسٹم جو سالہا سال چلیں۔',
    },
    {
      icon: Globe,
      title: lang === 'en' ? 'Curated Global Design Trends' : 'عالمی معیار کے جدید ڈیزائن',
      desc:
        lang === 'en'
          ? 'A leader in hardware and kitchen accessories, inspired by global trends to create beautiful kitchen stories.'
          : 'عالمی ٹرینڈز کے مطابق منتخب کردہ ہارڈویئر جو آپ کے کچن اور گھر کو منفرد بنائے۔',
    },
    {
      icon: Compass,
      title: lang === 'en' ? 'Interior & Architectural Guidance' : 'آرکیٹیکچرل اور انٹیریئر رہنمائی',
      desc:
        lang === 'en'
          ? 'Tailored specification pairing for architects, interior designers, and homeowners building or renovating in Pakistan.'
          : 'آرکیٹیکٹس، انٹیریئر ڈیزائنرز اور گھر بنانے والوں کے لیے ماہرانہ مشاورت۔',
    },
    {
      icon: Layers,
      title: lang === 'en' ? 'Wide Range Under One Roof' : 'مکمل ورائٹی ایک ہی چھت تلے',
      desc:
        lang === 'en'
          ? 'From ornate entrance pulls and anti-theft locks to soft-close hinges, dish racks, and wood laminates.'
          : 'داخلی دروازوں کے ہینڈلز اور لاکس سے لے کر کچن ایکسیسریز اور لیمینیٹ شیٹس تک۔',
    },
    {
      icon: Store,
      title: lang === 'en' ? 'Online Store + Showroom Convenience' : 'آن لائن سٹور اور شوروم کی سہولت',
      desc:
        lang === 'en'
          ? 'Inspect finishes in person at 16 Beadon Rd, Garhi Shahu, Lahore or order remotely from anywhere in Pakistan.'
          : '16 بیڈن روڈ لاہور شوروم تشریف لائیں یا گھر بیٹھے آن لائن آرڈر کریں۔',
    },
    {
      icon: MessageSquare,
      title: lang === 'en' ? 'Fast Response on WhatsApp' : 'واٹس ایپ پر فوری رابطہ',
      desc:
        lang === 'en'
          ? 'Direct photos, finish comparisons, and itemized PKR quotations via WhatsApp at 0321 8860070.'
          : '0321 8860070 پر واٹس ایپ کے ذریعے فوری تصاویر اور کوٹیشن حاصل کریں۔',
    },
  ];

  return (
    <section
      id="why-maka"
      className="relative py-24 md:py-32 bg-[#111113] border-b border-white/10 overflow-hidden"
    >
      {/* Subtle Brass Line-Art Architectural Pattern */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-35 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs md:text-sm font-medium tracking-[0.22em] text-[#F26A21] mb-3">
            {lang === 'en' ? '02. WHY MAKA (REX HARDWARE & INTERIOR)' : '02. ماکا کا انتخاب کیوں کریں'}
          </p>
          <h2
            className={`font-serif-display text-3xl sm:text-5xl md:text-6xl text-[#E9DFCF] leading-[1.08] [text-wrap:balance] ${
              lang === 'ur' ? 'font-urdu leading-[1.6]' : ''
            }`}
          >
            {lang === 'en' ? (
              <>
                Trusted by Homes,{' '}
                <span className="italic text-gold-gradient">Designers &amp; Builders.</span>
              </>
            ) : (
              'گھروں، ڈیزائنرز اور بلڈرز کا بااعتماد نام۔'
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#E9DFCF]/70 font-light">
            “A leader in hardware and kitchen accessories, inspired by global trends to create
            beautiful kitchen stories.”
          </p>
        </div>

        {/* 2x3 Glass Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="p-7 rounded-2xl bg-[#0A0A0B]/70 backdrop-blur-md border border-white/10 hover:border-[#C9A24B]/45 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#C9A24B] mb-6">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3
                    className={`font-serif-display text-2xl text-[#E9DFCF] font-medium mb-2.5 ${
                      lang === 'ur' ? 'font-urdu text-xl' : ''
                    }`}
                  >
                    {feat.title}
                  </h3>
                  <p
                    className={`text-sm text-[#E9DFCF]/70 leading-relaxed font-light ${
                      lang === 'ur' ? 'font-urdu' : ''
                    }`}
                  >
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#E9DFCF]/40">
                  <span>0{i + 1}</span>
                  <span>GARHI SHAHU · LAHORE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Honest Metrics & Editable Placeholders Row (Zero Fabricated Numbers) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-2xl bg-[#0A0A0B] border border-white/10">
          <div className="border-b sm:border-b-0 sm:border-r border-white/10 pb-5 sm:pb-0 sm:pr-6">
            <div className="font-serif-display text-3xl md:text-4xl text-gold-gradient font-semibold tabular-nums">
              [500]+ Products
            </div>
            <p className="mt-1.5 text-xs text-[#E9DFCF]/60">
              Curated SKUs across 7 categories <span className="text-[#F26A21]">(Editable)</span>
            </p>
          </div>

          <div className="border-b lg:border-b-0 lg:border-r border-white/10 pb-5 lg:pb-0 lg:pr-6">
            <div className="font-serif-display text-3xl md:text-4xl text-[#E9DFCF] font-semibold tabular-nums">
              [Add count]+
            </div>
            <p className="mt-1.5 text-xs text-[#E9DFCF]/60">
              Projects Completed <span className="text-[#F26A21]">(Editable placeholder)</span>
            </p>
          </div>

          <div className="border-b sm:border-b-0 sm:border-r border-white/10 pb-5 sm:pb-0 sm:pr-6">
            <div className="font-serif-display text-3xl md:text-4xl text-gold-gradient font-semibold tabular-nums">
              1.4K+ Followers
            </div>
            <p className="mt-1.5 text-xs text-[#E9DFCF]/60">
              Verified Instagram &amp; Facebook Community
            </p>
          </div>

          <div>
            <div className="font-serif-display text-3xl md:text-4xl text-[#E9DFCF] font-semibold tabular-nums">
              Open Daily · 8 PM
            </div>
            <p className="mt-1.5 text-xs text-[#E9DFCF]/60">
              16 Beadon Rd, Garhi Shahu, Lahore
            </p>
          </div>
        </div>

        {/* Vertical Scroll-Drawn SVG Timeline */}
        <div ref={timelineRef} className="mt-24 pt-16 border-t border-white/10">
          <div className="max-w-2xl mb-14">
            <p className="text-xs tracking-[0.22em] text-[#C9A24B] mb-2">
              HOW WE WORK WITH YOU
            </p>
            <h3 className="font-serif-display text-3xl sm:text-4xl text-[#E9DFCF]">
              {lang === 'en'
                ? 'From Architectural Blueprint to Final Fitting'
                : 'مشاورت سے لے کر مکمل فٹنگ تک'}
            </h3>
          </div>

          <div className="relative pl-8 sm:pl-12">
            {/* Background Guide Line */}
            <div className="absolute top-2 bottom-2 left-3 sm:left-4 w-[2px] bg-white/10" />
            {/* Animated Scroll-Drawn Gold Line */}
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
              className="absolute top-2 bottom-2 left-3 sm:left-4 w-[2px] bg-gradient-to-b from-[#F26A21] via-[#F3E2A9] to-[#C9A24B]"
            />

            <div className="space-y-10">
              {TIMELINE_STEPS.map((step) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative p-6 sm:p-8 rounded-2xl bg-[#0A0A0B]/80 border border-white/10 hover:border-[#C9A24B]/40 transition-colors"
                >
                  {/* Node Circle on the Line */}
                  <span className="absolute -left-[27px] sm:-left-[39px] top-8 w-4 h-4 rounded-full bg-[#0A0A0B] border-2 border-[#F26A21] shadow-[0_0_12px_rgba(242,106,33,0.7)]" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono tracking-widest text-[#F26A21]">
                      STEP {step.num}
                    </span>
                    <span className="text-xs text-[#E9DFCF]/45">
                      Showroom &amp; WhatsApp Support
                    </span>
                  </div>
                  <h4 className="font-serif-display text-2xl text-[#E9DFCF] font-medium">
                    {lang === 'en' ? step.title : step.titleUr}
                  </h4>
                  <p className="mt-2 text-sm text-[#E9DFCF]/70 max-w-3xl leading-relaxed font-light">
                    {lang === 'en' ? step.desc : step.descUr}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Showroom & Product Gallery + Interactive Lightbox */}
        <div id="projects" className="mt-24 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs tracking-[0.22em] text-[#F26A21] mb-2">
                03. SHOWROOM &amp; FINISHES GALLERY
              </p>
              <h3 className="font-serif-display text-3xl sm:text-4xl text-[#E9DFCF]">
                {lang === 'en'
                  ? 'Inspect the Craftsmanship Up Close'
                  : 'ہماری پراڈکٹس کی کوالٹی اور فنشنگ دیکھیں'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#E9DFCF]/60 max-w-md">
              Click any photograph to open the full-resolution lightbox (supports keyboard arrow
              keys).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIdx(idx)}
                className={`${item.span} group relative rounded-2xl overflow-hidden bg-[#0A0A0B] border border-white/10 cursor-pointer`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-[#E9DFCF] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-[11px] font-mono text-[#C9A24B]">{item.category}</p>
                  <p className="font-serif-display text-xl text-[#E9DFCF] mt-0.5">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Before / After Hardware Transformation Drag Slider */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0A0A0B] border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-mono text-[#C9A24B]">
                  INTERACTIVE FINISH &amp; UPGRADE COMPARISON SLIDER
                </p>
                <h4 className="font-serif-display text-2xl text-[#E9DFCF] mt-1">
                  Compare Ornate Antique Brass vs. Modern Brushed Lock &amp; Kitchen Finishes
                </h4>
              </div>
              <span className="text-xs text-[#E9DFCF]/55">
                Drag handle left or right · Ready for your custom before/after project photos
              </span>
            </div>

            <div
              ref={sliderContainerRef}
              onMouseMove={(e) => {
                if (e.buttons === 1) handleSliderMove(e.clientX);
              }}
              onTouchMove={(e) => {
                if (e.touches[0]) handleSliderMove(e.touches[0].clientX);
              }}
              onClick={(e) => handleSliderMove(e.clientX)}
              className="relative w-full h-[280px] sm:h-[380px] rounded-xl overflow-hidden select-none cursor-ew-resize border border-white/10"
            >
              {/* Right / After Layer: Modern Kitchen & Lock Finish */}
              <img
                src="/src/assets/images/kitchen_organizer_rack_1791204932068.jpg"
                alt="After MAKA Modular Kitchen & Hardware Upgrade"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-xs text-[#F3E2A9]">
                Modern Culinary &amp; Matte Finish
              </span>

              {/* Left / Before Layer: Heritage Ornate Brass */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="/src/assets/images/brass_door_pulls_ornate_1791204896941.jpg"
                  alt="Classic Ornate Cast Brass Hardware"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover max-w-none"
                  style={{
                    width: sliderContainerRef.current
                      ? `${sliderContainerRef.current.clientWidth}px`
                      : '100vw',
                  }}
                />
                <span className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-xs text-[#E9DFCF]">
                  Heritage Solid Brass Series
                </span>
              </div>

              {/* Vertical Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#F26A21] shadow-[0_0_15px_#F26A21] z-20"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F26A21] text-[#0A0A0B] flex items-center justify-center shadow-lg">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Honest Editable Testimonial Carousel + Google Review CTA */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs tracking-[0.22em] text-[#C9A24B] mb-2">
                CLIENT &amp; ARCHITECT FEEDBACK SLOTS
              </p>
              <h3 className="font-serif-display text-3xl sm:text-4xl text-[#E9DFCF]">
                Client Stories &amp; Reviews
              </h3>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=MAKA+REX+Hardware+16+Beadon+Rd+Garhi+Shahu+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl border border-[#C9A24B]/50 hover:border-[#F26A21] bg-white/[0.03] text-xs sm:text-sm text-[#E9DFCF] hover:text-[#F3E2A9] inline-flex items-center gap-2 transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <span>Leave a Google Review</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F26A21]" />
            </a>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-[#0A0A0B] border border-white/10 relative">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-[#F26A21]">
                {EDITABLE_TESTIMONIALS[activeTestimonial].slotLabel} (Zero Fabricated Reviews)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial(
                      (prev) =>
                        (prev - 1 + EDITABLE_TESTIMONIALS.length) % EDITABLE_TESTIMONIALS.length
                    )
                  }
                  aria-label="Previous testimonial slot"
                  className="p-2 rounded-lg border border-white/10 hover:border-[#C9A24B] text-[#E9DFCF] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial((prev) => (prev + 1) % EDITABLE_TESTIMONIALS.length)
                  }
                  aria-label="Next testimonial slot"
                  className="p-2 rounded-lg border border-white/10 hover:border-[#C9A24B] text-[#E9DFCF] cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="font-serif-display italic text-xl sm:text-2xl md:text-3xl text-[#E9DFCF]/85 leading-relaxed">
              “{EDITABLE_TESTIMONIALS[activeTestimonial].quote}”
            </p>
            <p className="mt-4 text-xs sm:text-sm font-mono text-[#C9A24B]">
              {EDITABLE_TESTIMONIALS[activeTestimonial].author}
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            key="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            <button
              type="button"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close lightbox"
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-[#E9DFCF] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(
                  (lightboxIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
                );
              }}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-[#E9DFCF] cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full rounded-2xl overflow-hidden border border-white/15 bg-[#111113]"
            >
              <img
                src={GALLERY_ITEMS[lightboxIdx].src}
                alt={GALLERY_ITEMS[lightboxIdx].title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[72vh] object-contain bg-black"
              />
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-[#C9A24B]">
                    {GALLERY_ITEMS[lightboxIdx].category}
                  </p>
                  <h4 className="font-serif-display text-2xl text-[#E9DFCF]">
                    {GALLERY_ITEMS[lightboxIdx].title}
                  </h4>
                </div>
                <span className="text-xs font-mono text-[#E9DFCF]/50 tabular-nums">
                  {lightboxIdx + 1} / {GALLERY_ITEMS.length}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((lightboxIdx + 1) % GALLERY_ITEMS.length);
              }}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-[#E9DFCF] cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
