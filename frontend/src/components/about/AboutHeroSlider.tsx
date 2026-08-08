import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import FloatingImage from './FloatingImage';
import Button from '../common/Button';
import RoleSlider from '../common/RoleSlider';
import { useLang, pick } from '../../lib/i18n';
import { ABOUT_HERO_SLIDES, ABOUT_ROLE_SLIDES, ABOUT_TEXT, type AboutHeroSlide } from '../../constants/about';

const HERO_SLIDE_INTERVAL = 6000; // 6s interval

export default function AboutHeroSlider() {
  const { lang } = useLang();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const heroSlides: AboutHeroSlide[] = ABOUT_HERO_SLIDES;
  const activeSlide = heroSlides[currentSlideIndex];
  const t = ABOUT_TEXT[lang];

  const roleSlides = ABOUT_ROLE_SLIDES.map((s) => ({
    title: s.title,
    subtitle: pick(lang, s.subtitle.vi, s.subtitle.en),
  }));

  // Clean ambient background slide transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text Content Slider */}
        <div className="flex flex-col gap-6 order-2 lg:order-1 min-h-[380px] justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase w-fit shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                <span>{pick(lang, activeSlide.eyebrow.vi, activeSlide.eyebrow.en)}</span>
              </div>

              {/* Title */}
              <h1
                className="font-black text-slate-900 dark:text-white leading-[1.25] tracking-tight max-w-xl"
                style={{ fontSize: 'clamp(24px, 2.8vw, 40px)', fontFamily: "'Inter', sans-serif" }}
              >
                {pick(lang, activeSlide.titlePrefix.vi, activeSlide.titlePrefix.en)}{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400">
                  {pick(lang, activeSlide.titleHighlight.vi, activeSlide.titleHighlight.en)}
                </span>{' '}
                {pick(lang, activeSlide.titleSuffix.vi, activeSlide.titleSuffix.en)}
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-xl font-normal">
                {pick(lang, activeSlide.subtitle.vi, activeSlide.subtitle.en)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Role Slider */}
          <div className="pt-2">
            <RoleSlider
              slides={roleSlides}
              titleClassName="inline-block px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-mono font-semibold rounded-full"
              subtitleClassName="text-slate-500 dark:text-slate-400 text-sm mt-2"
            />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button to="/projects" variant="primary" size="sm">
              {t.ctaProjects}
              <Icon icon="mdi:arrow-right" className="w-4 h-4" />
            </Button>
            <Button href="#" variant="secondary" size="sm">
              <Icon icon="mdi:download-outline" className="w-4 h-4" />
              {t.ctaCv}
            </Button>
          </div>
        </div>

        {/* Right Column: Floating Image & Badges Slider */}
        <div className="order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <FloatingImage
                image={activeSlide.image}
                caption={pick(lang, activeSlide.imageCaption.vi, activeSlide.imageCaption.en)}
                badges={activeSlide.badges}
                className="min-h-[380px]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
