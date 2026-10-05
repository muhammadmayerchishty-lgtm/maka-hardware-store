import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUp, ArrowUpRight, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { MakaLogo } from './MakaLogo';
import { Language } from '../data/catalog';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [waNumber, setWaNumber] = useState('');
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start 95%', 'end end'],
  });

  const goldFillWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const handleNewArrivalsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Assalam-o-Alaikum MAKA, please add my WhatsApp number (${
      waNumber || 'My Number'
    }) to your New Hardware & Kitchen Arrivals broadcast list.`;
    window.open(
      `https://wa.me/923218860070?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setWaNumber('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0A0A0B] pt-20 pb-24 md:pb-14 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: "Get New Arrivals on WhatsApp" Capture Bar */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#111113] border border-white/10 mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-mono tracking-widest text-[#C9A24B] mb-1.5">
              CATALOG BROADCAST · LAHORE SHOWROOM
            </p>
            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#E9DFCF]">
              {lang === 'en'
                ? 'Get New Hardware Arrivals on WhatsApp'
                : 'نئی ہارڈویئر کلیکشن کی اپ ڈیٹس واٹس ایپ پر حاصل کریں'}
            </h3>
            <p className="text-xs sm:text-sm text-[#E9DFCF]/65 mt-1 font-light">
              Receive seasonal updates when new brass door pulls, mortise lock sets, and kitchen
              organizers arrive at Beadon Road.
            </p>
          </div>

          <form
            onSubmit={handleNewArrivalsSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto"
          >
            <input
              type="tel"
              required
              value={waNumber}
              onChange={(e) => setWaNumber(e.target.value)}
              placeholder="0321 8860070"
              aria-label="Enter your WhatsApp number for new arrivals"
              className="px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 focus:border-[#F26A21] focus:outline-none text-sm font-mono text-[#E9DFCF] placeholder:text-[#E9DFCF]/35 min-w-[230px]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#F26A21] hover:bg-[#e05d17] text-[#0A0A0B] font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join WhatsApp List</span>
            </button>
          </form>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Column 1: Brand Blurb + Logo + Socials */}
          <div className="lg:col-span-4 space-y-5">
            <MakaLogo size="md" showTagline />
            <p className="text-sm text-[#E9DFCF]/70 font-light leading-relaxed max-w-sm">
              “A leader in hardware and kitchen accessories, inspired by global trends to create
              beautiful kitchen stories.” Curated in Lahore for discerning homeowners, architects,
              and builders.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/makapkhardware"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs text-[#E9DFCF] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A24B]" />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs text-[#E9DFCF] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Instagram (1.4K+)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F26A21]" />
              </a>
            </div>
          </div>

          {/* Column 2: Real Product Collections */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#C9A24B] uppercase">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E9DFCF]/70">
              <li>
                <a href="#collections" className="hover:text-[#F3E2A9] transition-colors">
                  Antique &amp; Brass Door Pulls
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#F3E2A9] transition-colors">
                  Main Door Locks &amp; Handle Sets
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#F3E2A9] transition-colors">
                  Soft-Close Cabinet Hinges
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#F3E2A9] transition-colors">
                  Over-Sink Kitchen Accessories
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#F3E2A9] transition-colors">
                  Door Stoppers &amp; Magnetic Catches
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#F3E2A9] transition-colors">
                  Cabinet Handles, Knobs &amp; Laminates
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#C9A24B] uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E9DFCF]/70">
              <li>
                <a href="#collections" className="hover:text-[#F3E2A9] transition-colors">
                  The Collection
                </a>
              </li>
              <li>
                <a href="#why-maka" className="hover:text-[#F3E2A9] transition-colors">
                  Why MAKA
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#F3E2A9] transition-colors">
                  Showroom Gallery
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#F3E2A9] transition-colors">
                  Book a Visit / Quote
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923218860070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F26A21] transition-colors"
                >
                  WhatsApp Direct
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Visit Us (Lahore Showroom) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#C9A24B] uppercase">
              Visit Our Showroom
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#E9DFCF]/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F26A21] shrink-0 mt-0.5" />
                <span>16 Beadon Rd, Garhi Shahu, Lahore, 54000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <a href="tel:+923218860070" className="hover:text-[#F26A21] font-mono">
                  0321 8860070
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <a href="mailto:makapk92@gmail.com" className="hover:text-[#F26A21]">
                  makapk92@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#F26A21] shrink-0" />
                <span>Open daily, closes 8 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Display MAKA Wordmark that Fills Gold on Scroll + Back to Top Ring */}
        <div className="py-12 flex flex-col sm:flex-row items-center justify-between gap-8 border-b border-white/10">
          <div className="relative select-none">
            {/* Base Outlined Wordmark */}
            <div
              className="font-serif-display italic font-bold text-6xl sm:text-8xl md:text-9xl tracking-widest leading-none"
              style={{
                WebkitTextStroke: '1px rgba(233, 223, 207, 0.25)',
                color: 'transparent',
              }}
            >
              MAKA
            </div>
            {/* Gold Scroll-Filled Overlay Wordmark */}
            <motion.div
              style={{ width: goldFillWidth }}
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
            >
              <div className="font-serif-display italic font-bold text-6xl sm:text-8xl md:text-9xl tracking-widest leading-none text-gold-gradient whitespace-nowrap">
                MAKA
              </div>
            </motion.div>
          </div>

          {/* Back-to-top Button with Rotating Text Ring */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group relative w-24 h-24 rounded-full border border-white/15 hover:border-[#C9A24B] bg-[#111113] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-20 h-20 animate-[spin_14s_linear_infinite]"
            >
              <path
                id="circlePath"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
              <text className="text-[9.5px] fill-[#E9DFCF]/70 tracking-[0.22em] uppercase">
                <textPath href="#circlePath">
                  • BACK TO TOP • MAKA LAHORE
                </textPath>
              </text>
            </svg>
            <ArrowUp className="w-5 h-5 text-[#F26A21] absolute group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E9DFCF]/50">
          <p>© 2026 MAKA (REX Hardware &amp; Interior). All rights reserved.</p>
          <p>Online Hardware &amp; Interior Store · 16 Beadon Rd, Garhi Shahu, Lahore</p>
        </div>
      </div>
    </footer>
  );
};
