import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLang, pick } from '../../lib/i18n';
import { ABOUT_GALLERY_SLIDES, type GallerySlide } from '../../constants/about';

export default function AboutStoryTree() {
  const { lang } = useLang();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const slides: GallerySlide[] = ABOUT_GALLERY_SLIDES;

  return (
    <div ref={containerRef} className="w-full relative py-8">
      
      {/* Central Trunk Vertical Line */}
      <div className="absolute left-6 lg:left-1/2 top-10 bottom-10 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 rounded-full pointer-events-none" />
      
      {/* Animated Glowing Scroll Progress Line */}
      <motion.div
        style={{ scaleY }}
        className="absolute left-6 lg:left-1/2 top-10 bottom-10 w-1 bg-gradient-to-b from-blue-600 via-indigo-500 to-sky-400 -translate-x-1/2 origin-top rounded-full z-10 pointer-events-none shadow-[0_0_12px_rgba(37,99,235,0.6)]"
      />

      {/* Nodes List */}
      <div className="space-y-16 lg:space-y-24 relative z-10">
        {slides.map((slide, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-14 lg:pl-0 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center group"
            >
              {/* Central Node Badge on Trunk Line */}
              <div className="absolute left-6 lg:left-1/2 top-6 -translate-x-1/2 z-20 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 shadow-lg shadow-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110">
                  <Icon icon={slide.nodeIcon || 'ph:code-bold'} className="text-xl" />
                </div>
              </div>

              {/* Media Photo Column */}
              <div className={`w-full ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] max-h-[240px] sm:max-h-[260px] bg-slate-200 dark:bg-slate-800 border border-black/10 dark:border-white/10 shadow-xl group-hover:border-blue-500/40 transition-all duration-300">
                  <img
                    src={slide.image}
                    alt={pick(lang, slide.title.vi, slide.title.en)}
                    className="w-full h-full object-cover object-center cursor-pointer group-hover:scale-105 transition-transform duration-700"
                    onClick={() => setFullscreenImage(slide.image)}
                  />

                  {/* Location & Tag Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {pick(lang, slide.tag.vi, slide.tag.en)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-black/10 dark:border-white/20">
                      {pick(lang, slide.location.vi, slide.location.en)}
                    </span>
                  </div>

                  {/* Expand button */}
                  <button
                    onClick={() => setFullscreenImage(slide.image)}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                    title={pick(lang, 'Phóng to ảnh', 'Expand image')}
                  >
                    <Icon icon="mdi:fullscreen" className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Story Content Column */}
              <div className={`w-full ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col gap-3.5`}>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                    {pick(lang, slide.tag.vi, slide.tag.en)}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight">
                  {pick(lang, slide.title.vi, slide.title.en)}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {pick(lang, slide.desc.vi, slide.desc.en)}
                </p>

                {/* Quote Highlight */}
                <div className="border-l-3 border-blue-600 dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 p-3 rounded-r-xl text-slate-800 dark:text-slate-200 italic font-medium text-xs sm:text-sm">
                  {pick(lang, slide.quote.vi, slide.quote.en)}
                </div>

                {/* Highlights List */}
                {slide.highlights && slide.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {slide.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/10 text-[11px] font-semibold text-slate-700 dark:text-slate-200 shadow-xs"
                      >
                        <Icon icon={item.icon} className="text-xs text-blue-600 dark:text-blue-400" />
                        <span>{pick(lang, item.label.vi, item.label.en)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setFullscreenImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setFullscreenImage(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              >
                <Icon icon="mdi:close" className="text-2xl" />
              </button>
              <img src={fullscreenImage} alt="Expanded" className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
