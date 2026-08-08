import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLang, pick } from '../../lib/i18n';
import { ABOUT_GALLERY_SLIDES, type GallerySlide } from '../../constants/about';

const AUTOPLAY_DURATION = 7000; // 7s per slide

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
};

export default function AboutStorySlider() {
  const { lang } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);

  const slides: GallerySlide[] = ABOUT_GALLERY_SLIDES;
  const activeSlide = slides[currentIndex];

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + newDirection;
        if (nextIndex < 0) nextIndex = slides.length - 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        return nextIndex;
      });
      setProgress(0);
    },
    [slides.length]
  );

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  // Autoplay logic & progress bar
  useEffect(() => {
    if (!isPlaying || isFullscreen) return;

    const interval = 50; // update progress every 50ms
    const step = (interval / AUTOPLAY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          paginate(1);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, isFullscreen, paginate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'Escape') setIsFullscreen(false);
        if (e.key === 'ArrowLeft') paginate(-1);
        if (e.key === 'ArrowRight') paginate(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, paginate]);

  return (
    <div className="w-full relative">
      {/* Outer Card Wrapper */}
      <div className="relative rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/10 p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Header Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10 border-b border-black/[0.06] dark:border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">
              {pick(lang, 'Hình Ảnh & Câu Chuyện', 'Gallery & Life Stories')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/20 transition-all cursor-pointer"
              title={isPlaying ? 'Tạm dừng autoplay' : 'Phát autoplay'}
            >
              <Icon icon={isPlaying ? 'mdi:pause' : 'mdi:play'} className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{isPlaying ? pick(lang, 'Tạm dừng', 'Pause') : pick(lang, 'Tự động phát', 'Auto Play')}</span>
            </button>

            {/* Slide Index Counter */}
            <div className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/10 px-3 py-1.5 rounded-full">
              <span className="text-blue-600 dark:text-blue-400">0{currentIndex + 1}</span>
              <span className="opacity-40"> / 0{slides.length}</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 min-h-[420px]">
          
          {/* Left Column: Image Container (5 cols) */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] max-h-[350px] sm:max-h-[370px] bg-slate-200 dark:bg-slate-800 shadow-lg border border-black/[0.06] dark:border-white/10">
              <AnimatePresence custom={direction} mode="wait">
                <motion.img
                  key={activeSlide.id}
                  src={activeSlide.image}
                  alt={pick(lang, activeSlide.title.vi, activeSlide.title.en)}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover object-center cursor-pointer hover:scale-105 transition-transform duration-700"
                  onClick={() => setIsFullscreen(true)}
                />
              </AnimatePresence>

              {/* Tag & Location Overlay Badge */}
              <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 justify-between items-center pointer-events-none">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {pick(lang, activeSlide.tag.vi, activeSlide.tag.en)}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/85 dark:bg-slate-900/85 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-black/10 dark:border-white/20 shadow-sm">
                  {pick(lang, activeSlide.location.vi, activeSlide.location.en)}
                </span>
              </div>

              {/* Fullscreen Expand Icon */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute bottom-3 right-3 p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                title={pick(lang, 'Xem phóng to', 'Expand image')}
              >
                <Icon icon="mdi:fullscreen" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Story Text (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col gap-4"
              >
                {/* Category Tag */}
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 font-mono tracking-wider uppercase">
                  {pick(lang, activeSlide.tag.vi, activeSlide.tag.en)}
                </span>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight">
                  {pick(lang, activeSlide.title.vi, activeSlide.title.en)}
                </h3>

                {/* Story Description */}
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {pick(lang, activeSlide.desc.vi, activeSlide.desc.en)}
                </p>

                {/* Quote Highlight */}
                <div className="border-l-4 border-blue-600 dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 p-3.5 rounded-r-2xl text-slate-800 dark:text-slate-200 italic font-medium text-xs sm:text-sm">
                  {pick(lang, activeSlide.quote.vi, activeSlide.quote.en)}
                </div>

                {/* Highlights List */}
                {activeSlide.highlights && activeSlide.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeSlide.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xs"
                      >
                        <Icon icon={item.icon} className="text-sm text-blue-600 dark:text-blue-400" />
                        <span>{pick(lang, item.label.vi, item.label.en)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrow Buttons & Indicators */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-black/[0.06] dark:border-white/10">
              
              {/* Thumbnails list */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
                {slides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      idx === currentIndex
                        ? 'border-blue-600 ring-2 ring-blue-600/30 scale-105'
                        : 'border-transparent opacity-50 hover:opacity-100 hover:scale-100'
                    }`}
                  >
                    <img src={slide.image} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Prev / Next Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => paginate(-1)}
                  className="p-3 rounded-full bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <Icon icon="mdi:chevron-left" className="w-5 h-5" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="p-3 rounded-full bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                  aria-label="Next slide"
                >
                  <Icon icon="mdi:chevron-right" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200/50 dark:bg-white/10">
            <div
              className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Fullscreen Image Modal Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>

              <img
                src={activeSlide.image}
                alt={pick(lang, activeSlide.title.vi, activeSlide.title.en)}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />

              <div className="mt-4 text-center text-white">
                <p className="text-lg font-bold">{pick(lang, activeSlide.title.vi, activeSlide.title.en)}</p>
                <p className="text-xs text-white/70 font-mono mt-1">{pick(lang, activeSlide.location.vi, activeSlide.location.en)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
