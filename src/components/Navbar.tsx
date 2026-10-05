import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { Language } from '../data/catalog';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  quoteListCount: number;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  quoteListCount,
  onOpenBooking,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Magnetic button state
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      if (currentY > lastScrollY.current && currentY > 180 && !mobileMenuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    setBtnPos({ x, y });
  };

  const handleMagneticReset = () => {
    setBtnPos({ x: 0, y: 0 });
  };

  const navLinks = [
    {
      href: '#collections',
      label: lang === 'en' ? 'Collections' : 'کلیکشنز',
    },
    {
      href: '#why-maka',
      label: lang === 'en' ? 'Why MAKA' : 'ماکا کیوں',
    },
    {
      href: '#projects',
      label: lang === 'en' ? 'Projects' : 'پروجیکٹس',
    },
    {
      href: '#booking',
      label: lang === 'en' ? 'Book a Visit' : 'وزٹ بک کریں',
    },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            aria-label="MAKA Home"
            className="font-serif-display italic text-2xl md:text-3xl font-semibold tracking-wider text-[#E9DFCF] hover:text-[#F3E2A9] transition-colors whitespace-nowrap shrink-0"
          >
            MAKA
          </a>

          {/* Zone 2: 4 Clean Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className={`hidden md:flex items-center gap-8 text-sm font-medium text-[#E9DFCF]/80 ${
              lang === 'ur' ? 'font-urdu text-base' : ''
            }`}
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="relative py-1 hover:text-[#E9DFCF] transition-colors whitespace-nowrap shrink-0 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#C9A24B] to-[#F26A21] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Language Switcher & Primary CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Optional EN / UR Toggle */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              aria-label="Switch language between English and Urdu"
              className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-medium text-[#E9DFCF]/80 hover:text-[#E9DFCF] transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'en' ? 'EN · اردو' : 'اردو · EN'}
            </button>

            {/* Primary Magnetic CTA */}
            <motion.button
              ref={btnRef}
              type="button"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticReset}
              animate={{ x: btnPos.x, y: btnPos.y }}
              transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.5 }}
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F26A21] hover:bg-[#e05d17] text-[#0A0A0B] font-semibold text-xs md:text-sm tracking-wide shadow-[0_0_24px_rgba(242,106,33,0.35)] hover:shadow-[0_0_32px_rgba(242,106,33,0.55)] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{lang === 'en' ? 'Get a Quote' : 'کوٹیشن حاصل کریں'}</span>
              {quoteListCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold bg-[#0A0A0B] text-[#F3E2A9] rounded-md tabular-nums">
                  {quoteListCount}
                </span>
              )}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2.5 rounded-xl border border-white/10 bg-white/5 text-[#E9DFCF] hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Animated Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0B]/98 backdrop-blur-2xl flex flex-col justify-between px-6 pt-24 pb-10 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <p className="text-xs text-[#C9A24B] tracking-widest">
                MAKA — REX HARDWARE &amp; INTERIOR
              </p>
              <nav className="flex flex-col gap-4">
                {navLinks.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                    className={`font-serif-display text-4xl text-[#E9DFCF] hover:text-[#F26A21] transition-colors py-1 border-b border-white/10 flex items-center justify-between ${
                      lang === 'ur' ? 'font-urdu text-3xl' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-6 h-6 text-[#C9A24B]" />
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-[#F26A21] text-[#0A0A0B] font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(242,106,33,0.4)]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {lang === 'en' ? 'Get a Quote' : 'کوٹیشن حاصل کریں'}
                  {quoteListCount > 0 ? ` (${quoteListCount})` : ''}
                </span>
              </button>
              <div className="text-xs text-[#E9DFCF]/60 flex items-center justify-between pt-2">
                <span>16 Beadon Rd, Garhi Shahu, Lahore</span>
                <span>0321 8860070</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
