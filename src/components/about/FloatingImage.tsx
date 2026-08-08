import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Floating badges xung quanh ảnh
const BADGES = [
  { label: 'Based in Vietnam', icon: '🇻🇳', position: 'top-4 -right-8' },
  { label: 'Open to Work', icon: '✅', position: 'bottom-12 -left-8' },
  { label: 'Full-stack Dev', icon: '⚡', position: '-top-3 left-10' },
];

interface FloatingImageProps {
  className?: string;
}

export default function FloatingImage({ className = '' }: FloatingImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax effect (desktop only)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / rect.width;
      const dy = (e.clientY - centerY) / rect.height;

      container.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-3xl bg-blue-50 dark:bg-blue-500/10 blur-3xl opacity-60" />

      {/* Main image container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-sm transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Photo frame */}
        <div className="relative rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/10 shadow-2xl shadow-slate-200/80 dark:shadow-black/40 aspect-[4/5] bg-slate-100 dark:bg-white/5">
          {/* Placeholder gradient (thay bằng ảnh thật khi có) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 40%, #BFDBFE 100%)',
            }}
          />

          {/* Center avatar placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-24 h-24 rounded-full bg-blue-600/10 border-4 border-blue-100 dark:border-blue-500/20 flex items-center justify-center">
              <span className="text-4xl font-black text-blue-600 dark:text-blue-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                TH
              </span>
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-700 dark:text-slate-300 text-sm font-mono">Thanh Hải</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs font-mono mt-1">Full-stack Developer</p>
            </div>
          </div>

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(37,99,235,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.08) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* Floating badges */}
        {BADGES.map((badge, i) => (
          <motion.div
            key={badge.label}
            className={`absolute ${badge.position} z-10`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.4, ease: 'easeOut' }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.8,
              }}
              className="flex items-center gap-2 bg-white/90 dark:bg-white/[0.06] backdrop-blur-md border border-black/[0.08] dark:border-white/10 rounded-full px-3 py-1.5 shadow-lg shadow-slate-200/60 dark:shadow-black/30 whitespace-nowrap"
            >
              <span className="text-sm leading-none">{badge.icon}</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{badge.label}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
