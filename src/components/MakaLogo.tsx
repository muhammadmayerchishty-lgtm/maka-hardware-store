import React from 'react';
import { motion } from 'motion/react';

interface MakaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showTagline?: boolean;
}

export const MakaLogo: React.FC<MakaLogoProps> = ({
  className = '',
  size = 'md',
  animated = false,
  showTagline = false,
}) => {
  const dimensions = {
    sm: { badge: 'w-8 h-8', text: 'text-2xl', sub: 'text-[9px]' },
    md: { badge: 'w-10 h-10', text: 'text-3xl', sub: 'text-[10px]' },
    lg: { badge: 'w-14 h-14', text: 'text-5xl', sub: 'text-xs' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Architectural Brass & Orange Emblem */}
      <div
        className={`relative ${dimensions.badge} rounded-xl bg-gradient-to-br from-[#1A1A1E] to-[#0A0A0B] border border-white/15 flex items-center justify-center shadow-[0_0_25px_rgba(242,106,33,0.18)] overflow-hidden shrink-0`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(242,106,33,0.28),transparent_70%)]" />
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5 relative z-10"
        >
          <defs>
            <linearGradient id="makaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A24B" />
              <stop offset="50%" stopColor="#F3E2A9" />
              <stop offset="100%" stopColor="#A8782A" />
            </linearGradient>
          </defs>
          {/* Outer architectural escutcheon diamond */}
          <motion.path
            d="M32 6 L56 32 L32 58 L8 32 Z"
            stroke="url(#makaGoldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={animated ? { pathLength: 0, opacity: 0 } : false}
            animate={animated ? { pathLength: 1, opacity: 1 } : false}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Stylized M & Keyhole Hardware Monogram */}
          <motion.path
            d="M20 40 V24 L32 35 L44 24 V40"
            stroke="#E9DFCF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animated ? { pathLength: 0 } : false}
            animate={animated ? { pathLength: 1 } : false}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Signature MAKA Orange Dot */}
          <motion.circle
            cx="32"
            cy="21"
            r="3"
            fill="#F26A21"
            initial={animated ? { scale: 0 } : false}
            animate={animated ? { scale: 1 } : false}
            transition={{ duration: 0.5, delay: 0.9 }}
          />
        </svg>
      </div>

      {/* Script Flourish + REX Hardware Sub-lockup */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-serif-display italic font-semibold tracking-wider text-[#E9DFCF] ${dimensions.text}`}
          >
            MAKA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21] inline-block" />
        </div>
        {showTagline && (
          <span
            className={`${dimensions.sub} tracking-[0.18em] text-[#E9DFCF]/60 font-light mt-0.5 whitespace-nowrap`}
          >
            REX Hardware &amp; Interior
          </span>
        )}
      </div>
    </div>
  );
};
