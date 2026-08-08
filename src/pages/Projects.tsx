import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { PROJECTS_DATA, PROJECT_TAGS, TAG_ACCENT, TAG_LABEL, PROJECTS_ROLE_SLIDES, localizeProject } from '../constants/projects';
import type { ProjectTag } from '../constants/projects';
import MockupFrame from '../components/projects/MockupFrame';
import FilterTabs from '../components/projects/FilterTabs';
import TechBadge from '../components/projects/TechBadge';
import { easeOut, fadeUp } from '../lib/motion';
import Eyebrow from '../components/common/Eyebrow';
import Button from '../components/common/Button';
import TiltCard from '../components/common/TiltCard';
import RoleSlider from '../components/common/RoleSlider';
import { useLang, pick } from '../lib/i18n';

export default function Projects() {
  const { lang } = useLang();
  const [activeTag, setActiveTag] = useState<ProjectTag>('Tất cả');

  const filtered = useMemo(() => {
    const raw = activeTag === 'Tất cả' ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.tag === activeTag);
    return raw.map((p) => localizeProject(p, lang));
  }, [activeTag, lang]);

  return (
    <div className="w-full overflow-hidden">

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 max-w-3xl">
          {/* Label */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
            <Eyebrow as="p">{pick(lang, 'Dự án', 'Projects')}</Eyebrow>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.15}
            className="font-extrabold text-slate-900 dark:text-white leading-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: "'Inter', sans-serif" }}
          >
            {pick(lang, 'Những dự án tôi đã xây dựng', 'Projects I have built')}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.25}
            className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed"
          >
            {pick(
              lang,
              'Một số hệ thống, sản phẩm và giải pháp tôi đã tham gia phân tích, thiết kế và phát triển trong quá trình làm việc.',
              'A selection of systems, products, and solutions I have analyzed, designed, and developed throughout my work.',
            )}
          </motion.p>

          {/* Role slider — đồng bộ hiệu ứng với các trang khác */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}>
            <RoleSlider
              slides={PROJECTS_ROLE_SLIDES[lang]}
              titleClassName="text-blue-600 dark:text-blue-400 font-bold text-base"
              subtitleClassName="text-slate-500 dark:text-slate-400 text-sm mt-1"
            />
          </motion.div>

          {/* Filter */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0.4}
          >
            <FilterTabs
              tags={PROJECT_TAGS}
              active={activeTag}
              onChange={setActiveTag}
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mt-16"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className="text-xs tracking-widest uppercase font-medium">{pick(lang, 'Cuộn để xem', 'Scroll to explore')}</span>
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <Icon icon="mdi:chevron-down" className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PROJECT LIST ─────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: easeOut }}
        >
          {filtered.map((project, i) => {
            const isEven = i % 2 === 1; // Đảo chiều layout
            const accent = TAG_ACCENT[project.tag] ?? '#2563EB';

            return (
              <section
                key={project.slug}
                className={`py-20 px-6 md:px-12 ${isEven ? 'bg-slate-50 dark:bg-white/[0.03]' : 'bg-white dark:bg-[#07080D]'}`}
              >
                <div className="max-w-7xl mx-auto">
                  <div className={`
                    grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center
                    ${isEven ? 'lg:[direction:rtl]' : ''}
                  `}>

                    {/* Mockup — đảo chiều bằng direction RTL trick */}
                    <motion.div
                      className="lg:[direction:ltr]"
                      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.7, ease: easeOut }}
                    >
                      <TiltCard>
                        <MockupFrame title={project.title} subtitle={TAG_LABEL[project.tag][lang]} accentColor={accent} />
                      </TiltCard>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className="flex flex-col gap-6 lg:[direction:ltr]"
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
                    >
                      {/* Index + badge */}
                      <div className="flex items-center gap-3">
                        <span
                          className="font-black font-mono text-slate-200 dark:text-white/10 leading-none select-none"
                          style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: "'Inter', sans-serif" }}
                        >
                          {project.index}
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
                          / {pick(lang, 'Nổi bật', 'Featured')}
                        </span>
                        <span
                          className="ml-auto px-2.5 py-1 rounded-md text-xs font-semibold font-mono"
                          style={{ background: `${accent}12`, color: accent }}
                        >
                          {TAG_LABEL[project.tag][lang]}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className="font-extrabold text-slate-900 dark:text-white leading-tight"
                        style={{ fontSize: 'clamp(18px, 2.4vw, 26px)', fontFamily: "'Inter', sans-serif" }}
                      >
                        {project.title}
                      </h2>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.description}</p>

                      {/* Role + Timeline */}
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                        <span className="text-slate-400 dark:text-slate-500">
                          {pick(lang, 'Vai trò', 'Role')}: <span className="text-slate-700 dark:text-slate-300 font-medium">{project.role}</span>
                        </span>
                        <span className="text-slate-400 dark:text-slate-500">
                          Timeline: <span className="text-slate-700 dark:text-slate-300 font-medium">{project.timeline}</span>
                        </span>
                      </div>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <TechBadge key={t} tech={t} />
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-black/[0.06] dark:bg-white/10" />

                      {/* Highlights */}
                      <ul className="flex flex-col gap-2">
                        {project.highlights.slice(0, 4).map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Icon
                              icon="mdi:check-circle"
                              className="w-4 h-4 mt-0.5 shrink-0"
                              style={{ color: accent }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Button to={`/projects/${project.slug}`} variant="primary" size="sm">
                          {pick(lang, 'Xem chi tiết', 'View details')}
                          <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                        </Button>
                        <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-sm font-mono rounded-full cursor-default">
                          <Icon icon="mdi:lock-outline" className="w-4 h-4" />
                          {pick(lang, 'Dự án riêng tư', 'Private Project')}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
            );
          })}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-32 text-center text-slate-400 dark:text-slate-500">
              <Icon icon="mdi:folder-open-outline" className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-white/10" />
              <p className="text-lg font-medium">{pick(lang, 'Chưa có dự án nào trong danh mục này.', 'No projects in this category yet.')}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ─── CONTACT CTA ──────────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 bg-white dark:bg-[#07080D] border-t border-black/[0.06] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="flex flex-col items-center gap-8"
          >
            <Eyebrow as="p">{pick(lang, 'Cộng tác', 'Collaboration')}</Eyebrow>
            <h2
              className="font-extrabold text-slate-900 dark:text-white leading-tight"
              style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: "'Inter', sans-serif" }}
            >
              {pick(lang, 'Bạn đang có một dự án cần được xây dựng?', 'Have a project that needs building?')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl leading-relaxed">
              {pick(
                lang,
                'Tôi luôn sẵn sàng trao đổi về những ý tưởng, sản phẩm và hệ thống có giá trị thực tế.',
                "I'm always happy to talk through ideas, products, and systems that deliver real-world value.",
              )}
            </p>
            <Button to="/contact" variant="primary">
              {pick(lang, 'Bắt đầu cuộc trò chuyện', 'Start the conversation')}
              <Icon icon="mdi:arrow-right" className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
