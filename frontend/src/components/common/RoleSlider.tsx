import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { easeOut } from '../../lib/motion';

export interface RoleSlide {
  title: string;
  subtitle?: string;
}

interface RoleSliderProps {
  slides: RoleSlide[];
  intervalMs?: number;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
}

/**
 * Trượt qua các cặp title+subtitle liên quan cùng lúc (không chỉ đổi 1 từ),
 * dùng chung cho hero của mọi trang để tạo cảm giác đồng bộ.
 */
export default function RoleSlider({
  slides,
  intervalMs = 3200,
  titleClassName = '',
  subtitleClassName = '',
  className = '',
}: RoleSliderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  const current = slides[index];

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.title}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <span className={`block ${titleClassName}`}>{current.title}</span>
          {current.subtitle && (
            <p className={`${subtitleClassName}`}>{current.subtitle}</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
