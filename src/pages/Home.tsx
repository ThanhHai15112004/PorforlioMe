import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Icon } from '@iconify/react';
import { fadeUp, revealViewport } from '../lib/motion';
import Eyebrow from '../components/common/Eyebrow';
import Button from '../components/common/Button';
import TiltCard from '../components/common/TiltCard';
import MockupFrame from '../components/projects/MockupFrame';
import RoleSlider from '../components/common/RoleSlider';
import { PROJECTS_DATA, localizeProject, TAG_LABEL } from '../constants/projects';
import { useLang } from '../lib/i18n';
import {
  TECH_ICON,
  TECH_STACK as techStack,
  HERO_FLOATING_ICONS as heroFloatingIcons,
  EXPERTISE_ITEMS,
  HOME_ROLE_SLIDES,
  HOME_UI,
} from '../constants/home';

type ExpertiseItem = (typeof EXPERTISE_ITEMS)['vi'][number];

/** Reveals a single word's opacity across a slice of a shared scroll-progress MotionValue. */
function RevealWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="inline-block">
        {word}
      </motion.span>{' '}
    </>
  );
}

function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.25'],
  });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <RevealWord key={i} word={word} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </p>
  );
}

function ExpertiseRow({ item, idx, total }: { item: ExpertiseItem; idx: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.5'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className={`relative overflow-hidden flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-8 md:py-10 ${
        idx !== total - 1 ? 'border-b border-black/8 dark:border-white/10' : ''
      }`}
    >
      {/* Watermark icon for background depth */}
      <Icon
        icon={item.icon}
        className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-[140px] text-slate-900/[0.03] dark:text-white/[0.03] pointer-events-none"
      />

      <span className="relative text-2xl md:text-3xl font-bold text-slate-900/8 dark:text-white/15 w-16 shrink-0">
        {item.index}
      </span>
      <div className="relative w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 shrink-0">
        <Icon icon={item.icon} className="text-3xl" />
      </div>
      <div className="relative">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { lang } = useLang();

  const featuredProjects = useMemo(
    () =>
      PROJECTS_DATA.slice(0, 2).map((p) => {
        const project = localizeProject(p, lang);
        const badgeTech = project.tech[1] ?? project.tech[0];
        return {
          index: project.index,
          title: project.title,
          desc: project.description,
          tech: project.tech.slice(0, 3),
          slug: project.slug,
          tag: project.tag,
          badge: { icon: TECH_ICON[badgeTech] ?? 'mdi:code-tags', label: badgeTech },
        };
      }),
    [lang],
  );

  const expertiseItems = EXPERTISE_ITEMS[lang];
  const roleSlides = HOME_ROLE_SLIDES[lang];

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.94]);

  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ['start 0.85', 'start 0.35'],
  });
  const ctaScale = useTransform(ctaProgress, [0, 1], [0.85, 1]);
  const ctaOpacity = useTransform(ctaProgress, [0, 1], [0, 1]);

  return (
    <div className="w-full relative">
      {/* 1. OPENING / MANIFESTO */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] md:min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Foreground floating icon badges — visible at every screen size, scaled down on mobile */}
        {heroFloatingIcons.map((item, i) => (
          <div
            key={i}
            className={`flex absolute w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl glass-card elevate-sm items-center justify-center text-blue-600 dark:text-blue-400 text-base md:text-2xl pointer-events-none z-0 ${item.className} ${item.anim}`}
          >
            <Icon icon={item.icon} />
          </div>
        ))}

        {/* Mini mock browser window — decorative, no real screenshot needed yet */}
        <div className="hidden sm:block absolute bottom-6 sm:bottom-10 right-[3%] perspective-1000 pointer-events-none z-0">
          <div
            className="w-40 sm:w-56 preserve-3d glass-card elevate-md rounded-xl p-3 sm:p-4 animate-float-medium"
            style={{ transform: 'rotateY(-10deg) rotateX(6deg)' }}
          >
            <div className="flex gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="space-y-2">
              <div className="h-2 rounded bg-blue-500/30 w-3/4" />
              <div className="h-2 rounded bg-slate-900/10 dark:bg-white/10 w-full" />
              <div className="h-2 rounded bg-slate-900/10 dark:bg-white/10 w-5/6" />
              <div className="h-2 rounded bg-blue-500/20 w-2/3" />
            </div>
          </div>
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          <motion.p
            initial="hidden" animate="visible" custom={0.1} variants={fadeUp}
            className="text-blue-600 dark:text-blue-500 font-medium text-sm md:text-base mb-6 tracking-wider uppercase"
          >
            {HOME_UI.heroEyebrow[lang]}
          </motion.p>

          <motion.h1
            initial="hidden" animate="visible" custom={0.2} variants={fadeUp}
            className="hero-title text-slate-900 dark:text-white mb-2"
          >
            THANH HẢI
          </motion.h1>

          <motion.div initial="hidden" animate="visible" custom={0.35} variants={fadeUp} className="w-full flex flex-col items-center">
            <RoleSlider
              slides={roleSlides}
              className="mb-6"
              titleClassName="text-lg md:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 tracking-tight uppercase"
              subtitleClassName="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-xl mt-4 mb-12 leading-relaxed mx-auto"
            />
          </motion.div>

          <motion.div
            initial="hidden" animate="visible" custom={0.65} variants={fadeUp}
            className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-4"
          >
            <Button to="/projects" variant="primary" className="w-full sm:w-auto">
              {HOME_UI.heroCtaProjects[lang]}
              <Icon icon="ph:arrow-right-bold" />
            </Button>
            <Button to="/contact" variant="secondary" className="w-full sm:w-auto">
              {HOME_UI.heroCtaContact[lang]}
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. BỐI CẢNH / GIỚI THIỆU */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          <div className="shrink-0 w-16 h-16 rounded-full glass-card elevate-sm flex items-center justify-center">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">TH</span>
          </div>
          <ScrollRevealText
            text={HOME_UI.introText[lang]}
            className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed md:leading-snug text-slate-900 dark:text-white tracking-tight text-center md:text-left"
          />
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <section className="py-10 border-y border-black/6 dark:border-white/5 bg-slate-50/70 dark:bg-black/20 backdrop-blur-md overflow-hidden relative z-10">
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-[marquee_40s_linear_infinite]">
            {techStack.map((tech, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 group">
                <Icon icon={tech.icon} className="text-4xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                <span className="font-medium text-lg whitespace-nowrap">{tech.name}</span>
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-[marquee_40s_linear_infinite]" aria-hidden="true">
            {techStack.map((tech, i) => (
              <li key={`clone-${i}`} className="flex items-center gap-3 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 group">
                <Icon icon={tech.icon} className="text-4xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                <span className="font-medium text-lg whitespace-nowrap">{tech.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. DỰ ÁN NỔI BẬT — STICKY STORYTELLING */}
      <section className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Eyebrow className="mb-2">{HOME_UI.featuredEyebrow[lang]}</Eyebrow>
            <h2 className="section-title text-slate-900 dark:text-white">{HOME_UI.featuredTitleLine1[lang]} <br />{HOME_UI.featuredTitleLine2[lang]}</h2>
          </motion.div>

          <div className="flex flex-col gap-16 md:gap-24">
            {featuredProjects.map((project) => (
              <div
                key={project.slug}
                className="relative flex flex-col md:flex-row gap-8 lg:gap-16 md:min-h-[105vh]"
              >
                {/* Image / Thumbnail — sticky while text scrolls past, tilts slightly with the cursor */}
                <div className="w-full md:w-3/5 md:sticky md:top-28 h-[50vh] md:h-[70vh] relative">
                  <TiltCard className="w-full h-full">
                    <MockupFrame
                      title={project.title}
                      subtitle={TAG_LABEL[project.tag][lang]}
                      className="w-full h-full [&>div:last-child]:h-[calc(100%-49px)] [&>div:last-child]:aspect-auto"
                    />
                  </TiltCard>

                  {/* Overlapping tech badge for layered depth */}
                  <div className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl glass-card elevate-md z-20">
                    <Icon icon={project.badge.icon} className="text-xl text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">{project.badge.label}</span>
                  </div>
                </div>

                {/* Info */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{ duration: 0.7 }}
                  className="w-full md:w-2/5 flex flex-col justify-center"
                >
                  <span className="text-2xl md:text-3xl font-bold text-slate-900/8 dark:text-white/10 mb-3">{project.index}</span>
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-4">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">{project.desc}</p>

                  <ul className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, i) => (
                      <li key={i} className="px-3 py-1 bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
                  >
                    {HOME_UI.viewDetail[lang]}
                    <Icon icon="ph:arrow-right-light" className="transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CHUYÊN MÔN */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-black/40 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Eyebrow className="mb-2">{HOME_UI.expertiseEyebrow[lang]}</Eyebrow>
            <h2 className="section-title text-slate-900 dark:text-white">{HOME_UI.expertiseTitleLine1[lang]} <br className="md:hidden" />{HOME_UI.expertiseTitleLine2[lang]}</h2>
          </motion.div>

          <div className="flex flex-col border-t border-black/8 dark:border-white/10">
            {expertiseItems.map((item, idx) => (
              <ExpertiseRow key={idx} item={item} idx={idx} total={expertiseItems.length} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section ref={ctaRef} className="py-32 px-6 md:px-12 lg:px-24 text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-900/10 blur-[120px] rounded-full max-w-3xl mx-auto -z-10 pointer-events-none" />
        <motion.div
          style={{ scale: ctaScale, opacity: ctaOpacity }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            {HOME_UI.ctaTitleLine1[lang]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">{HOME_UI.ctaTitleHighlight[lang]}</span>
          </h2>

          <Button to="/contact" variant="inverse" size="lg" className="group">
            {HOME_UI.ctaButton[lang]}
            <Icon icon="ph:paper-plane-right-fill" className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
