import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import FloatingImage from '../components/about/FloatingImage';
import ProcessTimeline from '../components/about/ProcessTimeline';
import { easeOut, fadeUp, revealViewport } from '../lib/motion';
import { useLang, pick } from '../lib/i18n';
import Eyebrow from '../components/common/Eyebrow';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import RoleSlider from '../components/common/RoleSlider';
import {
  QUICK_INFO,
  EXPERTISE,
  PRINCIPLES,
  JOURNEY,
  TECH_GROUPS,
  KEY_EXPERIENCE,
  ABOUT_ROLE_SLIDES,
  ABOUT_TEXT,
} from '../constants/about';

// ─── Shared Section Header ──────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      className="mb-12"
    >
      <Eyebrow as="p" className="mb-3">{label}</Eyebrow>
      <h2
        className="font-extrabold text-slate-900 dark:text-white leading-tight"
        style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontFamily: "'Inter', sans-serif" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function About() {
  const { lang } = useLang();
  const t = ABOUT_TEXT[lang];
  const roleSlides = ABOUT_ROLE_SLIDES.map((s) => ({
    title: s.title,
    subtitle: pick(lang, s.subtitle.vi, s.subtitle.en),
  }));

  return (
    <div className="w-full overflow-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Content */}
            <div className="flex flex-col gap-7 order-2 lg:order-1">
              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.05}
                className="text-blue-600 dark:text-blue-500 font-medium text-sm tracking-wider uppercase">
                {t.heroEyebrow}
              </motion.p>

              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.12}
                className="font-extrabold text-slate-900 dark:text-white leading-tight"
                style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: "'Inter', sans-serif" }}>
                {t.heroTitlePrefix}{' '}
                <span className="text-blue-600 dark:text-blue-400">{t.heroTitleHighlight}</span>{' '}
                {t.heroTitleSuffix}
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg">
                {t.heroSubtitle}
              </motion.p>

              {/* Role slider — đồng bộ hiệu ứng với Home */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.28}>
                <RoleSlider
                  slides={roleSlides}
                  titleClassName="inline-block px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-mono font-semibold rounded-full"
                  subtitleClassName="text-slate-500 dark:text-slate-400 text-sm mt-3"
                />
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.36}
                className="flex flex-wrap gap-3">
                <Button to="/projects" variant="primary" size="sm">
                  {t.ctaProjects}
                  <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                </Button>
                <Button href="#" variant="secondary" size="sm">
                  <Icon icon="mdi:download-outline" className="w-4 h-4" />
                  {t.ctaCv}
                </Button>
              </motion.div>
            </div>

            {/* Right: Floating Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
              className="order-1 lg:order-2">
              <FloatingImage className="min-h-[360px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. A LITTLE ABOUT ME ────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-blue-600 dark:text-blue-500 font-medium text-sm tracking-wider uppercase mb-8">
            {t.introEyebrow}
          </motion.p>
          <div className="space-y-6">
            {t.introParagraphs.map((text, i) => (
              <motion.p
                key={i}
                initial="hidden" whileInView="visible" viewport={revealViewport}
                variants={fadeUp} custom={i * 0.1}
                className="text-slate-700 dark:text-slate-300 leading-relaxed"
                style={{ fontSize: 'clamp(17px, 2vw, 20px)' }}>
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. QUICK INFO (Bento Grid) ──────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label={t.quickInfoLabel} title={t.quickInfoTitle} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {QUICK_INFO.map((info, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={revealViewport}
                variants={fadeUp} custom={i * 0.07}
                className={info.span}>
                <Card icon={info.icon} padding="sm">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-1.5">{pick(lang, info.label.vi, info.label.en)}</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-relaxed">{pick(lang, info.value.vi, info.value.en)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. EXPERTISE ────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label={t.expertiseLabel} title={t.expertiseTitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPERTISE.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={revealViewport}
                variants={fadeUp} custom={i * 0.08}>
                <Card icon={item.icon} title={pick(lang, item.title.vi, item.title.en)} layout="row" padding="lg">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{pick(lang, item.desc.vi, item.desc.en)}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-mono rounded-md">{tech}</span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WORK PROCESS ─────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label={t.processLabel} title={t.processTitle} />
          <ProcessTimeline />
        </div>
      </section>

      {/* ── 6. WORKING PRINCIPLES ───────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label={t.principlesLabel} title={t.principlesTitle} />
          <div className="flex flex-wrap justify-center gap-5">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={revealViewport}
                variants={fadeUp} custom={i * 0.07}
                className="w-full sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333%-0.834rem)]">
                <Card icon={p.icon} iconSize="sm" title={pick(lang, p.title.vi, p.title.en)} padding="md" className="h-full">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{pick(lang, p.desc.vi, p.desc.en)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CAREER JOURNEY ───────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader label={t.journeyLabel} title={t.journeyTitle} />
          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div className="absolute left-[21px] top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />
            {JOURNEY.map((j, i) => (
              <motion.div
                key={j.step}
                initial="hidden" whileInView="visible" viewport={revealViewport}
                variants={fadeUp} custom={i * 0.1}
                className="relative flex gap-6 pb-10 last:pb-0">
                {/* Node */}
                <div className="shrink-0 z-10">
                  <div className="w-11 h-11 rounded-full bg-white dark:bg-white/[0.03] border-2 border-blue-600 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-black font-mono text-blue-600 dark:text-blue-400">{j.step}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="pt-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {pick(lang, j.title.vi, j.title.en)}
                    </h4>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{pick(lang, j.period.vi, j.period.en)}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{pick(lang, j.desc.vi, j.desc.en)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. TECH STACK ───────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label={t.techLabel} title={t.techTitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_GROUPS.map((group, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={revealViewport}
                variants={fadeUp} custom={i * 0.08}>
                <Card padding="sm">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest font-mono mb-4">
                    {pick(lang, group.label.vi, group.label.en)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-mono rounded-md hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. KEY EXPERIENCE ───────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label={t.experienceLabel} title={t.experienceTitle} />
          <div className="flex flex-wrap justify-center gap-5">
            {KEY_EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={revealViewport}
                variants={fadeUp} custom={i * 0.08}
                className="w-full md:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333%-0.834rem)]">
                <Card icon={exp.icon} title={pick(lang, exp.title.vi, exp.title.en)} layout="row" padding="sm" className="h-full">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{pick(lang, exp.desc.vi, exp.desc.en)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FUTURE DIRECTION ────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-100 dark:bg-blue-500/10 blur-[100px] opacity-50 rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="flex flex-col gap-6">
            <p className="text-blue-600 dark:text-blue-500 font-medium text-sm tracking-wider uppercase">{t.futureLabel}</p>
            <h2
              className="font-extrabold text-slate-900 dark:text-white leading-tight"
              style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontFamily: "'Inter', sans-serif" }}>
              {t.futureTitle}
            </h2>
          </motion.div>
          <div className="mt-8 space-y-5">
            {t.futureParagraphs.map((text, i) => (
              <motion.p
                key={i}
                initial="hidden" whileInView="visible" viewport={revealViewport}
                variants={fadeUp} custom={i * 0.1}
                className="text-slate-600 dark:text-slate-400 leading-relaxed"
                style={{ fontSize: 'clamp(16px, 1.8vw, 19px)' }}>
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. CONTACT CTA ─────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 bg-white dark:bg-[#07080D] border-t border-black/[0.06] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="flex flex-col items-center gap-8">
            <p className="text-blue-600 dark:text-blue-500 font-medium text-sm tracking-wider uppercase">{t.collabLabel}</p>
            <h2
              className="font-extrabold text-slate-900 dark:text-white leading-tight"
              style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontFamily: "'Inter', sans-serif" }}>
              {t.collabTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl leading-relaxed">
              {t.collabSubtitle}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button to="/contact" variant="primary">
                {t.collabCtaPrimary}
                <Icon icon="mdi:arrow-right" className="w-5 h-5" />
              </Button>
              <Button to="/projects" variant="secondary">
                {t.collabCtaSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
