import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  X,
  Check,
  Plus,
  MessageCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import {
  PRODUCT_CATEGORIES,
  STATEMENT_PIECES,
  FINISH_SWATCHES,
  FilterCategory,
  ProductCategory,
  Language,
} from '../data/catalog';

interface ShowcaseProps {
  lang: Language;
  quoteList: string[];
  onToggleQuoteItem: (itemTitle: string, bookingTag: string) => void;
  onCardHoverChange?: (hovering: boolean) => void;
}

const FILTER_TABS: FilterCategory[] = [
  'All',
  'Door Hardware',
  'Kitchen',
  'Cabinet',
  'Interior',
];

const FILTER_LABELS_UR: Record<FilterCategory, string> = {
  All: 'تمام کلیکشن',
  'Door Hardware': 'ڈور ہارڈویئر',
  Kitchen: 'کچن ایکسیسریز',
  Cabinet: 'کیبنٹ فٹنگز',
  Interior: 'انٹیریئر اور لیمینیٹس',
};

export const Showcase: React.FC<ShowcaseProps> = ({
  lang,
  quoteList,
  onToggleQuoteItem,
  onCardHoverChange,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [activeSwatch, setActiveSwatch] = useState(FINISH_SWATCHES[0]);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  // 3D Tilt state per card
  const [tiltMap, setTiltMap] = useState<Record<string, { rx: number; ry: number }>>({});

  // Horizontal scroll ref for Statement Pieces
  const stripRef = useRef<HTMLDivElement>(null);

  const filteredCategories =
    activeFilter === 'All'
      ? PRODUCT_CATEGORIES
      : PRODUCT_CATEGORIES.filter((item) => item.filterGroup === activeFilter);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltMap((prev) => ({
      ...prev,
      [id]: { rx: -y * 7, ry: x * 7 },
    }));
  };

  const handleCardMouseLeave = (id: string) => {
    setTiltMap((prev) => ({
      ...prev,
      [id]: { rx: 0, ry: 0 },
    }));
    onCardHoverChange?.(false);
  };

  const scrollStatementStrip = (dir: 'left' | 'right') => {
    if (!stripRef.current) return;
    const scrollAmount = 420;
    stripRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="collections"
      className="relative py-24 md:py-32 bg-[#0A0A0B] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-xs md:text-sm font-medium tracking-[0.22em] text-[#F26A21] mb-3">
              {lang === 'en' ? '01. THE COLLECTION' : '01. ہماری کلیکشن'}
            </p>
            <h2
              className={`font-serif-display text-3xl sm:text-5xl md:text-6xl text-[#E9DFCF] leading-[1.08] [text-wrap:balance] ${
                lang === 'ur' ? 'font-urdu leading-[1.6]' : ''
              }`}
            >
              {lang === 'en' ? (
                <>
                  Crafted Details.{' '}
                  <span className="italic text-gold-gradient">Lasting Impressions.</span>
                </>
              ) : (
                'پائیدار بناوٹ، دلکش اور لازوال انداز۔'
              )}
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#E9DFCF]/65 max-w-md font-light">
            {lang === 'en'
              ? 'Seven architectural hardware categories curated for residential villas, modern kitchens, and commercial interiors across Pakistan.'
              : 'پاکستان بھر کے جدید گھروں، کچن اور کمرشل پراجیکٹس کے لیے منتخب کردہ سات خصوصی ہارڈویئر کیٹیگریز۔'}
          </p>
        </div>

        {/* Sticky Interactive Filter Bar */}
        <div className="sticky top-20 z-30 mb-10 py-2">
          <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#111113]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#0A0A0B]'
                      : 'text-[#E9DFCF]/70 hover:text-[#E9DFCF]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#C9A24B] via-[#F3E2A9] to-[#F26A21]"
                    />
                  )}
                  <span className="relative z-10">
                    {lang === 'en' ? tab : FILTER_LABELS_UR[tab]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Bento Grid of 7 Real Categories */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => {
              const tilt = tiltMap[cat.id] || { rx: 0, ry: 0 };
              const inQuote = quoteList.includes(cat.title);
              const imgFailed = brokenImages[cat.id];

              return (
                <motion.article
                  layout
                  key={cat.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onMouseMove={(e) => handleCardMouseMove(e, cat.id)}
                  onMouseEnter={() => onCardHoverChange?.(true)}
                  onMouseLeave={() => handleCardMouseLeave(cat.id)}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveSwatch(FINISH_SWATCHES[0]);
                  }}
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                    transition: 'transform 160ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className={`${cat.bentoSpan} group relative rounded-2xl overflow-hidden bg-[#111113] border border-white/10 hover:border-[#C9A24B]/60 cursor-pointer flex flex-col justify-between p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.4)]`}
                >
                  {/* Background Image with Slow Zoom or Resilient Gradient Fallback */}
                  <div className="absolute inset-0 overflow-hidden">
                    {!imgFailed ? (
                      <img
                        src={cat.image}
                        alt={cat.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setBrokenImages((prev) => ({ ...prev, [cat.id]: true }))
                        }
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1C1917] via-[#111113] to-[#292014] flex items-center justify-center p-6">
                        <span className="font-serif-display italic text-2xl text-[#C9A24B]/40 text-center">
                          {cat.title}
                        </span>
                      </div>
                    )}
                    {/* Measured Dark Gradient Scrims */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/65 to-black/25" />
                    {/* Gold Border Glow Sweep on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_80%_20%,rgba(201,162,75,0.18),transparent_55%)] pointer-events-none" />
                  </div>

                  {/* Top Row: Clean Editorial Number & Spec Code (No Pill Sandwich) */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-[#E9DFCF]/70">
                    <span className="font-mono tabular-nums tracking-widest text-[#F3E2A9]">
                      {cat.number} · {cat.filterGroup}
                    </span>
                    <span className="font-mono text-[11px] text-[#E9DFCF]/50">
                      {cat.specCode} · Request Price (PKR)
                    </span>
                  </div>

                  {/* Bottom Content: Title + Slide-up Description + View Range */}
                  <div className="relative z-10 mt-auto pt-16">
                    <h3
                      className={`font-serif-display text-2xl sm:text-3xl text-[#E9DFCF] font-medium leading-snug group-hover:text-[#F3E2A9] transition-colors ${
                        lang === 'ur' ? 'font-urdu text-2xl leading-[1.7]' : ''
                      }`}
                    >
                      {lang === 'en' ? cat.title : cat.titleUr}
                    </h3>

                    <p
                      className={`mt-2 text-sm text-[#E9DFCF]/75 line-clamp-2 transition-all duration-300 ${
                        lang === 'ur' ? 'font-urdu' : ''
                      }`}
                    >
                      {lang === 'en' ? cat.shortDesc : cat.shortDescUr}
                    </p>

                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#F26A21] group-hover:text-[#F3E2A9] transition-colors">
                        <span>{lang === 'en' ? 'View Range & Finishes' : 'تفصیل اور فنش دیکھیں'}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleQuoteItem(cat.title, cat.bookingTag);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                          inQuote
                            ? 'bg-[#C9A24B] text-[#0A0A0B]'
                            : 'bg-white/10 hover:bg-white/20 text-[#E9DFCF]'
                        }`}
                      >
                        {inQuote ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'In Quote List' : 'فہرست میں شامل'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'Add to Quote' : 'کوٹیشن میں شامل کریں'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Horizontal "Featured Statement Pieces" Strip (4 Hero Products) */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs tracking-[0.22em] text-[#C9A24B] mb-2">
                {lang === 'en' ? 'ARCHITECTURAL HIGHLIGHTS' : 'خصوصی انتخاب'}
              </p>
              <h3 className="font-serif-display text-2xl sm:text-4xl text-[#E9DFCF]">
                {lang === 'en' ? 'Featured Statement Pieces' : 'نمایاں ہارڈویئر شاہکار'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollStatementStrip('left')}
                aria-label="Scroll statement pieces left"
                className="p-3 rounded-xl border border-white/10 bg-[#111113] hover:border-[#C9A24B] text-[#E9DFCF] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollStatementStrip('right')}
                aria-label="Scroll statement pieces right"
                className="p-3 rounded-xl border border-white/10 bg-[#111113] hover:border-[#C9A24B] text-[#E9DFCF] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={stripRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
          >
            {STATEMENT_PIECES.map((piece) => {
              const inQuote = quoteList.includes(piece.title);
              return (
                <div
                  key={piece.id}
                  className="min-w-[300px] sm:min-w-[380px] md:min-w-[420px] snap-start rounded-2xl bg-[#111113] border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-[#C9A24B]/50 transition-colors"
                >
                  <div className="relative h-56 overflow-hidden bg-[#18181B]">
                    <img
                      src={piece.image}
                      alt={piece.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 text-[11px] font-mono tracking-widest text-[#F3E2A9] bg-[#0A0A0B]/75 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                      {piece.code}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-display text-2xl text-[#E9DFCF] font-medium">
                        {lang === 'en' ? piece.title : piece.titleUr}
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-[#E9DFCF]/70">
                        {lang === 'en' ? piece.subtitle : piece.subtitleUr}
                      </p>

                      <div className="mt-4 pt-4 border-t border-white/10 text-xs text-[#E9DFCF]/60 space-y-1">
                        <div>
                          <span className="text-[#C9A24B]">Material:</span> {piece.material}
                        </div>
                        <div>
                          <span className="text-[#C9A24B]">Mechanism:</span> {piece.mechanism}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                      <a
                        href={`https://wa.me/923218860070?text=${encodeURIComponent(
                          `Assalam-o-Alaikum MAKA, I would like to request the PKR price for "${piece.title}" (${piece.code}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#F26A21] hover:text-[#F3E2A9] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Request Price (PKR)' : 'قیمت معلوم کریں'}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => onToggleQuoteItem(piece.title, piece.categoryTag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                          inQuote
                            ? 'bg-[#C9A24B] text-[#0A0A0B]'
                            : 'bg-white/5 hover:bg-white/15 text-[#E9DFCF]'
                        }`}
                      >
                        {inQuote ? 'Added to Quote ✓' : '+ Add to Quote'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick-View Product & Finish Swatch Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            key="quick-view-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCategory(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl bg-[#111113] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden grid grid-cols-1 md:grid-cols-12 my-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                aria-label="Close quick view modal"
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-[#E9DFCF] border border-white/15 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Image Preview with Finish Tint Accent */}
              <div className="md:col-span-6 relative min-h-[280px] md:min-h-[460px] bg-[#0A0A0B] overflow-hidden">
                <img
                  src={selectedCategory.image}
                  alt={selectedCategory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {/* Interactive Finish Swatch Tint Overlay */}
                <div
                  className="absolute inset-0 mix-blend-color opacity-35 transition-colors duration-500 pointer-events-none"
                  style={{ backgroundColor: activeSwatch.hex }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />

                {/* Active Swatch Preview Indicator */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#0A0A0B]/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-6 h-6 rounded-full border border-white/25 shrink-0"
                      style={{ background: activeSwatch.gradient }}
                    />
                    <div>
                      <p className="text-[11px] text-[#E9DFCF]/60">SELECTED FINISH PREVIEW</p>
                      <p className="text-xs font-semibold text-[#E9DFCF]">
                        {lang === 'en' ? activeSwatch.name : activeSwatch.nameUr}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#C9A24B]">
                    {selectedCategory.specCode}
                  </span>
                </div>
              </div>

              {/* Right Specification & Actions */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-[#F26A21] tracking-widest mb-2">
                    {selectedCategory.number} · {selectedCategory.filterGroup} · PKR QUOTE
                  </div>

                  <h3 className="font-serif-display text-2xl sm:text-3xl text-[#E9DFCF] font-medium">
                    {lang === 'en' ? selectedCategory.title : selectedCategory.titleUr}
                  </h3>

                  <p className="mt-3 text-sm text-[#E9DFCF]/75 leading-relaxed">
                    {lang === 'en' ? selectedCategory.fullDesc : selectedCategory.fullDescUr}
                  </p>

                  {/* Interactive Finish Swatches */}
                  <div className="mt-6">
                    <p className="text-xs font-medium text-[#E9DFCF]/80 mb-2.5">
                      {lang === 'en' ? 'Available Architectural Finishes:' : 'دستیاب فنشنگ کلرز:'}
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5">
                      {FINISH_SWATCHES.map((swatch) => {
                        const selected = activeSwatch.id === swatch.id;
                        return (
                          <button
                            key={swatch.id}
                            type="button"
                            onClick={() => setActiveSwatch(swatch)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                              selected
                                ? 'border-[#C9A24B] bg-white/10 text-[#E9DFCF]'
                                : 'border-white/10 bg-white/[0.02] text-[#E9DFCF]/65 hover:border-white/25'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/20"
                              style={{ background: swatch.gradient }}
                            />
                            <span>{lang === 'en' ? swatch.name : swatch.nameUr}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Key Technical Features */}
                  <div className="mt-6">
                    <p className="text-xs font-medium text-[#E9DFCF]/80 mb-2">
                      {lang === 'en' ? 'Specifications & Highlights:' : 'نمایاں خصوصیات:'}
                    </p>
                    <ul className="space-y-1.5">
                      {(lang === 'en'
                        ? selectedCategory.features
                        : selectedCategory.featuresUr
                      ).map((feat, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-[#E9DFCF]/70 flex items-start gap-2"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#C9A24B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={`https://wa.me/923218860070?text=${encodeURIComponent(
                      `Assalam-o-Alaikum MAKA, I'd like to enquire about "${selectedCategory.title}" in ${activeSwatch.name} finish. Please share catalog images and PKR quotation.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#F26A21] hover:bg-[#e05d17] text-[#0A0A0B] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Enquire on WhatsApp' : 'واٹس ایپ پر رابطہ کریں'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      onToggleQuoteItem(selectedCategory.title, selectedCategory.bookingTag)
                    }
                    className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                      quoteList.includes(selectedCategory.title)
                        ? 'bg-[#C9A24B] text-[#0A0A0B] border-[#C9A24B]'
                        : 'bg-white/5 hover:bg-white/10 text-[#E9DFCF] border-white/15'
                    }`}
                  >
                    {quoteList.includes(selectedCategory.title) ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Added to Quote List' : 'کوٹیشن میں شامل ہے'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Add to Quote List' : 'کوٹیشن لسٹ میں ڈالیں'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
