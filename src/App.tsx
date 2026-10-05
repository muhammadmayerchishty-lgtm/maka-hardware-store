import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Showcase } from './components/Showcase';
import { Trust } from './components/Trust';
import { Booking } from './components/Booking';
import { FloatingContact } from './components/FloatingContact';
import { Footer } from './components/Footer';
import { Language } from './data/catalog';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [quoteList, setQuoteList] = useState<string[]>([]);
  const [selectedTagsFromQuote, setSelectedTagsFromQuote] = useState<string[]>([]);

  // Desktop custom cursor state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [hoveringCard, setHoveringCard] = useState(false);

  // Top orange scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Smooth scrolling via Lenis
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Track desktop cursor for custom VIEW follower
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleToggleQuoteItem = (itemTitle: string, bookingTag: string) => {
    setQuoteList((prev) =>
      prev.includes(itemTitle)
        ? prev.filter((item) => item !== itemTitle)
        : [...prev, itemTitle]
    );
    setSelectedTagsFromQuote((prev) =>
      prev.includes(bookingTag) ? prev : [...prev, bookingTag]
    );
  };

  const handleRemoveQuoteItem = (itemTitle: string) => {
    setQuoteList((prev) => prev.filter((item) => item !== itemTitle));
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#0A0A0B] text-[#E9DFCF] relative selection:bg-[#F26A21]/30 selection:text-[#E9DFCF]"
    >
      {/* Subtle Luxury Film Grain Overlay */}
      <div className="fixed inset-0 bg-noise-grain pointer-events-none z-30" />

      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A24B] via-[#F3E2A9] to-[#F26A21] origin-left z-[60]"
      />

      {/* Desktop Custom Magnetic Follower Cursor that expands to "VIEW" over Showcase cards */}
      <motion.div
        animate={{
          x: cursorPos.x - (hoveringCard ? 36 : 8),
          y: cursorPos.y - (hoveringCard ? 36 : 8),
          width: hoveringCard ? 72 : 16,
          height: hoveringCard ? 72 : 16,
        }}
        transition={{ type: 'spring', stiffness: 360, damping: 28, mass: 0.4 }}
        className="hidden lg:flex fixed top-0 left-0 z-50 rounded-full pointer-events-none items-center justify-center border border-[#C9A24B]/60 bg-[#0A0A0B]/70 backdrop-blur-md text-[10px] font-mono tracking-widest text-[#F3E2A9]"
      >
        {hoveringCard && <span>VIEW</span>}
      </motion.div>

      {/* Section 0: Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Section 1: Navbar + Hero */}
      <Navbar
        lang={lang}
        setLang={setLang}
        quoteListCount={quoteList.length}
        onOpenBooking={() => scrollToId('booking')}
      />

      <main>
        <Hero
          lang={lang}
          onExplore={() => scrollToId('collections')}
          onBookVisit={() => scrollToId('booking')}
        />

        {/* Section 2: Product Showcase */}
        <Showcase
          lang={lang}
          quoteList={quoteList}
          onToggleQuoteItem={handleToggleQuoteItem}
          onCardHoverChange={setHoveringCard}
        />

        {/* Section 3: Trust & Credibility */}
        <Trust lang={lang} />

        {/* Section 4: Multi-step Booking & Lead Capture */}
        <Booking
          lang={lang}
          quoteList={quoteList}
          selectedTagsFromQuote={selectedTagsFromQuote}
          onRemoveQuoteItem={handleRemoveQuoteItem}
        />
      </main>

      {/* Section 5: Floating Contact + Footer */}
      <FloatingContact
        lang={lang}
        quoteListCount={quoteList.length}
        onBookClick={() => scrollToId('booking')}
      />

      <Footer lang={lang} />
    </div>
  );
}
