import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import meAvatar from '../../assets/imgs/avatars/MeAvatar1.png';
import { useLang, pick } from '../../lib/i18n';

// Floating badges xung quanh ảnh
const BADGES = [
  { label: { vi: 'Tại Việt Nam', en: 'Based in Vietnam' }, icon: 'mdi:map-marker', position: 'top-4 -right-8' },
  { label: { vi: 'Sẵn sàng nhận việc', en: 'Open to Work' }, icon: 'mdi:check-circle', position: 'bottom-12 -left-8' },
  { label: { vi: 'Full-stack Dev', en: 'Full-stack Dev' }, icon: 'mdi:lightning-bolt', position: '-top-3 left-10' },
];

interface FloatingImageProps {
  className?: string;
}

export default function FloatingImage({ className = '' }: FloatingImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

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
          {/* Ambient backdrop behind the photo */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 40%, #BFDBFE 100%)',
            }}
          />

          <img
            src={meAvatar}
            alt="Thanh Hải"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          {/* Name caption */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 py-5 bg-gradient-to-t from-black/50 to-transparent">
            <p className="font-bold text-white text-sm font-mono">Thanh Hải</p>
            <p className="text-white/70 text-xs font-mono">{pick(lang, 'Full-stack Developer', 'Full-stack Developer')}</p>
          </div>
        </div>

        {/* Floating badges */}
        {BADGES.map((badge, i) => (
          <motion.div
            key={badge.label.en}
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
              className="flex items-center gap-2 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-black/[0.08] dark:border-white/10 rounded-full px-3 py-1.5 shadow-lg shadow-slate-200/60 dark:shadow-black/40 whitespace-nowrap"
            >
              <Icon icon={badge.icon} className="text-sm text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{pick(lang, badge.label.vi, badge.label.en)}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
