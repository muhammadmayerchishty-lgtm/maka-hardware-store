import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MakaLogo } from './MakaLogo';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setProgress(100);
      setIsDone(true);
      onComplete();
      return;
    }

    const duration = 1500; // 1.5s sleek luxury load
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const easedProgress = Math.min(
        100,
        Math.round((1 - Math.pow(1 - currentStep / steps, 3)) * 100)
      );
      setProgress(easedProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 650);
        }, 180);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="maka-preloader"
          initial={{ y: '0%' }}
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#0A0A0B] flex flex-col items-center justify-between p-8 md:p-14 select-none overflow-hidden"
          aria-label="Loading MAKA Online Hardware and Interior Store"
        >
          {/* Ambient radial brass/orange glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,75,0.08),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none" />

          {/* Top Bar Info */}
          <div className="w-full max-w-7xl flex items-center justify-between text-xs text-[#E9DFCF]/50 tracking-widest">
            <span>LAHORE, PAKISTAN</span>
            <span>EST. ARCHITECTURAL FITTINGS</span>
          </div>

          {/* Center Animated Logo & Tagline */}
          <div className="relative z-10 flex flex-col items-center text-center my-auto">
            <MakaLogo size="lg" animated showTagline />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-5 font-serif-display italic text-lg md:text-xl text-gold-gradient tracking-wide"
            >
              Online Hardware &amp; Interior Store
            </motion.p>

            {/* Progress Line */}
            <div className="mt-8 w-56 md:w-72 h-[1px] bg-white/10 overflow-hidden relative rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C9A24B] via-[#F3E2A9] to-[#F26A21]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom Counter 0 -> 100 */}
          <div className="w-full max-w-7xl flex items-end justify-between">
            <span className="text-xs text-[#E9DFCF]/40 max-w-xs hidden sm:inline-block">
              Curating solid brass pulls, anti-theft locks &amp; culinary hardware.
            </span>
            <div className="ml-auto flex items-baseline gap-1 font-serif-display tabular-nums">
              <span className="text-5xl md:text-7xl font-light text-[#E9DFCF]">
                {String(progress).padStart(2, '0')}
              </span>
              <span className="text-xl text-[#F26A21]">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
