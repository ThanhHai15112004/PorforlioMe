import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ReadingProgressProps {
  accentColor?: string;
}

export default function ReadingProgress({ accentColor = '#2563EB' }: ReadingProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [pct, setPct] = useState(0);
  useEffect(() => {
    return scrollYProgress.on('change', (v) => setPct(Math.round(v * 100)));
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-200/60 dark:bg-white/10">
      <motion.div
        className="h-full origin-left"
        style={{ scaleX, backgroundColor: accentColor }}
      />
      {/* Percentage badge */}
      <motion.div
        className="absolute right-4 top-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full text-white shadow-sm"
        style={{ backgroundColor: accentColor, opacity: pct > 2 ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {pct}%
      </motion.div>
    </div>
  );
}
