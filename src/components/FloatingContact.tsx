import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, Calendar, X } from 'lucide-react';
import { Language } from '../data/catalog';

interface FloatingContactProps {
  lang: Language;
  quoteListCount: number;
  onBookClick: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({
  lang,
  quoteListCount,
  onBookClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  // Show helpful non-intrusive tooltip after 10s dwell
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!tooltipDismissed && !expanded) {
        setShowTooltip(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [tooltipDismissed, expanded]);

  const dismissTooltip = () => {
    setShowTooltip(false);
    setTooltipDismissed(true);
  };

  return (
    <>
      {/* Desktop & Tablet Floating Bottom-Right Action Hub */}
      <div className="hidden md:flex fixed bottom-7 right-7 z-40 flex-col items-end gap-3">
        {/* Floating Quote List Counter Button if items added */}
        <AnimatePresence>
          {quoteListCount > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              type="button"
              onClick={onBookClick}
              className="px-4 py-2.5 rounded-xl bg-[#111113]/95 backdrop-blur-xl border border-[#C9A24B]/60 text-xs font-medium text-[#E9DFCF] shadow-xl flex items-center gap-2 hover:border-[#F26A21] transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#F26A21]" />
              <span>Quote List ({quoteListCount}) — Complete Request</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Expanded Menu Options */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="expanded-contact-options"
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-3 rounded-2xl bg-[#111113]/95 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col gap-2 min-w-[240px]"
            >
              <a
                href="https://wa.me/923218860070?text=Hi%20MAKA%2C%20I'd%20like%20to%20know%20more%20about%20your%20hardware%20collection."
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismissTooltip}
                className="px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0A0B] font-semibold text-xs flex items-center gap-2.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+923218860070"
                onClick={dismissTooltip}
                className="px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#E9DFCF] font-medium text-xs flex items-center gap-2.5 border border-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <span>Call 0321 8860070</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip after dwell */}
        <AnimatePresence>
          {showTooltip && !expanded && (
            <motion.div
              key="whatsapp-tooltip"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111113]/95 backdrop-blur-md border border-white/15 text-xs text-[#E9DFCF] shadow-xl"
            >
              <span>
                {lang === 'en'
                  ? 'Need help choosing? Chat with us.'
                  : 'رہنمائی کے لیے واٹس ایپ پر بات کریں۔'}
              </span>
              <button
                type="button"
                onClick={dismissTooltip}
                aria-label="Dismiss chat prompt"
                className="text-[#E9DFCF]/50 hover:text-[#E9DFCF] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Pulsing WhatsApp Floating Trigger */}
        <button
          type="button"
          onClick={() => {
            setExpanded(!expanded);
            dismissTooltip();
          }}
          aria-label="Toggle WhatsApp and Phone quick contact"
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-[#0A0A0B] flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.45)] hover:scale-105 transition-transform cursor-pointer"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
          {expanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Compact Sticky Bottom Bar (Strictly <= 56px height to respect 15% mobile sticky cap) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-[#0A0A0B]/95 backdrop-blur-xl border-t border-white/15 px-3 flex items-center justify-between gap-2">
        <a
          href="tel:+923218860070"
          className="flex-1 h-10 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-medium text-[#E9DFCF] flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>Call</span>
        </a>

        <a
          href="https://wa.me/923218860070?text=Hi%20MAKA%2C%20I'd%20like%20to%20know%20more%20about%20your%20hardware%20collection."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-10 rounded-lg bg-[#25D366] text-[#0A0A0B] text-xs font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onBookClick}
          className="flex-1 h-10 rounded-lg bg-[#F26A21] text-[#0A0A0B] text-xs font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book{quoteListCount > 0 ? ` (${quoteListCount})` : ''}</span>
        </button>
      </div>
    </>
  );
};
