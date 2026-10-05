import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Language } from '../data/catalog';

const LazyHeroCanvas3D = lazy(() => import('./HeroCanvas3D'));

interface HeroProps {
  lang: Language;
  onExplore: () => void;
  onBookVisit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onExplore, onBookVisit }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [useStaticFallback, setUseStaticFallback] = useState(false);
  const [scrollVal, setScrollVal] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.91]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.85], [0, -70]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => setScrollVal(v));
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    // Check reduced motion or low-end device / missing WebGL
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    let webglSupported = true;
    try {
      const canvas = document.createElement('canvas');
      webglSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      webglSupported = false;
    }

    if (prefersReduced || lowCores || !webglSupported) {
      setUseStaticFallback(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const marqueeItems =
    lang === 'en'
      ? [
          'DOOR HANDLES',
          'SOFT-CLOSE HINGES',
          'KITCHEN RACKS',
          'ANTI-THEFT LOCKS',
          'WOOD LAMINATES',
          'INTERIOR FITTINGS',
          'ANTIQUE BRASS PULLS',
          'MAGNETIC CATCHES',
        ]
      : [
          'ڈور ہینڈلز',
          'سوفٹ کلوز قبضے',
          'کچن ریکس',
          'اینٹی تھیفٹ لاکس',
          'ووڈ لیمینیٹس',
          'انٹیریئر فٹنگز',
          'اینٹیک براس پلز',
          'میگنیٹک کیچز',
        ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0A0A0B] pt-24 md:pt-28"
    >
      {/* Architectural Blueprint Grid & Ambient Radial Glow */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-55 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] md:w-[820px] h-[560px] md:h-[820px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(242,106,33,0.13) 0%, rgba(201,162,75,0.09) 38%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* 3D Procedural Luxury Brass Door Handle Viewport or Static Fallback */}
      <div className="absolute inset-0 z-0 pointer-events-none lg:left-[28%] opacity-90">
        {useStaticFallback ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-[#C9A24B]/20 via-[#F26A21]/15 to-transparent blur-2xl" />
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-[#C9A24B]/10 blur-3xl animate-pulse" />
              </div>
            }
          >
            <LazyHeroCanvas3D scrollProgress={scrollVal} mousePos={mousePos} />
          </Suspense>
        )}
      </div>

      {/* Measured contrast scrim so typography achieves high legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/75 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B]/50 z-[1] pointer-events-none" />

      {/* Foreground Semantic Hero Content */}
      <motion.div
        style={{ scale: textScale, opacity: textOpacity, y: textY }}
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-12 md:py-16"
      >
        <div className="max-w-3xl">
          {/* Quiet 1-line architectural kicker (no pill enclosure) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] text-[#C9A24B] mb-5"
          >
            <span className="w-8 h-[1px] bg-[#F26A21]" />
            <span>
              {lang === 'en'
                ? 'MAKA · REX HARDWARE & INTERIOR · LAHORE'
                : 'ماکا · ریکس ہارڈویئر اینڈ انٹیریئر · لاہور'}
            </span>
          </motion.div>

          {/* Masked Slide-Up Display Headline */}
          <h1
            className={`font-serif-display font-normal tracking-tight leading-[1.04] text-[#E9DFCF] [text-wrap:balance] ${
              lang === 'ur'
                ? 'font-urdu text-4xl sm:text-5xl md:text-6xl leading-[1.6]'
                : 'text-[clamp(2.75rem,6.5vw,5.75rem)]'
            }`}
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {lang === 'en' ? 'Hardware That Defines' : 'ایسا ہارڈویئر جو ہر جگہ کو'}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="block italic text-gold-gradient font-semibold"
              >
                {lang === 'en' ? 'Every Space.' : 'منفرد پہچان دے۔'}
              </motion.span>
            </span>
          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-6 text-base sm:text-lg md:text-xl text-[#E9DFCF]/75 max-w-2xl font-light leading-relaxed ${
              lang === 'ur' ? 'font-urdu text-lg' : ''
            }`}
          >
            {lang === 'en'
              ? 'Premium door hardware, kitchen accessories & interior fittings, curated in Lahore for homes, architects and builders.'
              : 'گھروں، آرکیٹیکٹس اور بلڈرز کے لیے لاہور میں منتخب کردہ اعلیٰ معیار کے ڈور ہینڈلز، کچن ایکسیسریز اور انٹیریئر فٹنگز۔'}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onExplore}
              className="px-7 py-4 rounded-xl bg-[#F26A21] hover:bg-[#e05d17] text-[#0A0A0B] font-semibold text-sm md:text-base tracking-wide shadow-[0_0_30px_rgba(242,106,33,0.4)] hover:shadow-[0_0_40px_rgba(242,106,33,0.65)] transition-all inline-flex items-center gap-2.5 whitespace-nowrap cursor-pointer"
            >
              <span>{lang === 'en' ? 'Explore Collections' : 'کلیکشنز دیکھیں'}</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onBookVisit}
              className="px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-md border border-white/15 hover:border-[#C9A24B]/60 text-[#E9DFCF] font-medium text-sm md:text-base transition-all inline-flex items-center gap-2.5 whitespace-nowrap cursor-pointer"
            >
              <span>{lang === 'en' ? 'Book a Showroom Visit' : 'شوروم وزٹ بک کریں'}</span>
              <ArrowUpRight className="w-4 h-4 text-[#C9A24B]" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Metadata Bar + Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Info row with clean typographic separators */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#E9DFCF]/75 bg-[#111113]/80 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl">
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#F26A21] shrink-0" />
            <span>{lang === 'en' ? '16 Beadon Rd, Garhi Shahu, Lahore' : '16 بیڈن روڈ، گڑھی شاہو، لاہور'}</span>
          </span>
          <span aria-hidden="true" className="text-white/25">
            ·
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
            <span>{lang === 'en' ? 'Open until 8 PM' : 'روزانہ رات 8 بجے تک'}</span>
          </span>
          <span aria-hidden="true" className="text-white/25">
            ·
          </span>
          <a
            href="https://wa.me/923218860070?text=Hi%20MAKA%2C%20I'd%20like%20to%20enquire%20about%20your%20hardware%20range."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#F3E2A9] hover:text-[#F26A21] transition-colors font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'WhatsApp Orders' : 'واٹس ایپ آرڈرز'}</span>
          </a>
        </div>

        {/* Animated Scroll Indicator */}
        <button
          type="button"
          onClick={onExplore}
          aria-label="Scroll down to collections"
          className="hidden md:inline-flex items-center gap-3 text-xs tracking-[0.2em] text-[#E9DFCF]/60 hover:text-[#E9DFCF] transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="w-8 h-12 rounded-full border border-white/15 flex items-start justify-center p-1.5">
            <motion.span
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#F26A21]"
            />
          </span>
        </button>
      </div>

      {/* Infinite Marquee Strip Below Hero */}
      <div className="relative z-10 w-full border-y border-white/10 bg-[#111113]/90 backdrop-blur-md py-3.5 overflow-hidden">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-10">
              <span className="text-xs md:text-sm font-medium tracking-[0.24em] text-[#E9DFCF]/75">
                {item}
              </span>
              <span className="text-[#C9A24B] text-xs" aria-hidden="true">
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
