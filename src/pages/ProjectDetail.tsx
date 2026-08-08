import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { PROJECTS_DATA } from '../constants/projects';
import TechBadge from '../components/projects/TechBadge';
import ReadingProgress from '../components/projects/ReadingProgress';

// ─── Accent color map ──────────────────────────────────────────────────────
const TAG_ACCENT: Record<string, string> = {
  LMS: '#2563EB',
  Backend: '#7C3AED',
  Frontend: '#0891B2',
  DevOps: '#059669',
  Personal: '#D97706',
};

// ─── Animation helpers ─────────────────────────────────────────────────────
const easeOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay, ease: easeOut },
  }),
};

const scrollReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ─── Shared section header ─────────────────────────────────────────────────
function SectionHeader({
  label, title, accent,
}: { label: string; title: string; accent: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-60px' }} variants={scrollReveal}
      className="mb-10"
    >
      <p className="font-semibold text-sm tracking-widest uppercase mb-3 font-mono"
        style={{ color: accent }}>
        {label}
      </p>
      <h2 className="font-extrabold text-slate-900 dark:text-white leading-tight"
        style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontFamily: "'Inter', sans-serif" }}>
        {title}
      </h2>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  const project = useMemo(() => PROJECTS_DATA.find((p) => p.slug === slug), [slug]);
  const nextProject = useMemo(
    () => PROJECTS_DATA.find((p) => p.slug === project?.nextSlug),
    [project],
  );

  if (!project) return <Navigate to="/projects" replace />;

  const accent = TAG_ACCENT[project.tag] ?? '#2563EB';
  const accentBg = `${accent}12`;

  return (
    <div className="w-full overflow-hidden">
      {/* ── Reading Progress Bar ─────────────────────────────────── */}
      <ReadingProgress accentColor={accent} />

      {/* ════════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="pt-28 pb-16 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 mb-10">
            <Link to="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dự án</Link>
            <Icon icon="mdi:chevron-right" className="w-4 h-4" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">{project.title}</span>
          </motion.div>

          {/* Category tag */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold mb-4"
              style={{ background: accentBg, color: accent }}>
              {project.tag} · {project.index}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 max-w-4xl"
            style={{ fontSize: 'clamp(32px, 6vw, 72px)', fontFamily: "'Inter', sans-serif" }}>
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
            className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mb-8">
            {project.description}
          </motion.p>

          {/* Tech stack */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.25}
            className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t) => <TechBadge key={t} tech={t} size="md" />)}
          </motion.div>

          {/* Meta grid */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.32}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b border-black/[0.06] dark:border-white/10">
            {[
              { label: 'Vai trò', value: project.role },
              { label: 'Timeline', value: project.timeline },
              { label: 'Loại dự án', value: 'Enterprise Web App' },
              { label: 'Trạng thái', value: 'Private Production' },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-1">{m.label}</p>
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{m.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.38}
            className="flex flex-wrap gap-3 mt-6">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm rounded-full hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: accent }}>
              Liên hệ tư vấn
              <Icon icon="mdi:arrow-right" className="w-4 h-4" />
            </Link>
            <span className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-sm font-mono rounded-full">
              <Icon icon="mdi:lock-outline" className="w-4 h-4" />
              Private Project
            </span>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          2. OVERVIEW — Chỉ render khi có data
      ════════════════════════════════════════════════════════════ */}
      {project.overview && (
        <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Tổng quan" title="Về dự án này" accent={accent} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl">
              <div className="lg:col-span-2 flex flex-col gap-5">
                {project.overview.map((para, i) => (
                  <motion.p key={i} initial="hidden" whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={fadeUp} custom={i * 0.08}
                    className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    {para}
                  </motion.p>
                ))}
              </div>
              <motion.div initial="hidden" whileInView="visible"
                viewport={{ once: true }} variants={fadeUp} custom={0.1}
                className="flex flex-col gap-3">
                {[
                  { label: 'Loại hệ thống', value: 'Enterprise LMS' },
                  { label: 'Người dùng chính', value: 'Admin, Giảng viên, Học viên' },
                  { label: 'Nền tảng', value: 'Web Application' },
                  { label: 'Phạm vi', value: 'Frontend, Backend, Tối ưu' },
                ].map((item) => (
                  <div key={item.label} className="bg-white dark:bg-white/[0.03] rounded-xl p-4 border border-black/[0.06] dark:border-white/10">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{item.label}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{item.value}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          3. PROBLEMS — Chỉ render khi có data
      ════════════════════════════════════════════════════════════ */}
      {project.problems && project.problems.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Bài toán" title="Vấn đề cần giải quyết" accent={accent} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.problems.map((p, i) => (
                <motion.div key={p.num} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp} custom={i * 0.07}
                  className="bg-slate-50 dark:bg-white/[0.03] rounded-2xl p-6 border border-black/[0.06] dark:border-white/10">
                  <span className="block font-black text-3xl text-slate-100 dark:text-white/10 font-mono mb-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    {p.num}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    {p.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          4. GOALS — Chỉ render khi có data
      ════════════════════════════════════════════════════════════ */}
      {project.goals && project.goals.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Mục tiêu" title="Hệ thống cần đạt được điều gì?" accent={accent} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {project.goals.map((g, i) => (
                <motion.div key={g.num} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp} custom={i * 0.1}
                  className="bg-white dark:bg-white/[0.03] rounded-2xl p-6 border border-black/[0.06] dark:border-white/10">
                  <span className="block font-black text-4xl mb-4 font-mono"
                    style={{ color: `${accent}30`, fontFamily: "'Inter', sans-serif" }}>
                    {g.num}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    {g.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{g.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          5. MY ROLE — Chỉ render khi có data
      ════════════════════════════════════════════════════════════ */}
      {project.roleGroups && project.roleGroups.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Vai trò" title="Phạm vi công việc của tôi" accent={accent} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {project.roleGroups.map((rg, i) => (
                <motion.div key={rg.category} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp} custom={i * 0.08}
                  className="bg-slate-50 dark:bg-white/[0.03] rounded-2xl p-6 border border-black/[0.06] dark:border-white/10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: accentBg }}>
                    <Icon icon={rg.icon} className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    {rg.category}
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {rg.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-500">
                        <Icon icon="mdi:check-circle" className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: accent }} />
                        {task}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          6. TARGET USERS — Chỉ render khi có data
      ════════════════════════════════════════════════════════════ */}
      {project.users && project.users.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Người dùng" title="Hệ thống phục vụ ai?" accent={accent} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.users.map((user, i) => (
                <motion.div key={user.type} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp} custom={i * 0.1}
                  className="bg-white dark:bg-white/[0.03] rounded-2xl p-7 border border-black/[0.06] dark:border-white/10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: accentBg }}>
                      <Icon icon={user.icon} className="w-6 h-6" style={{ color: accent }} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      {user.type}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {user.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Icon icon="mdi:arrow-right-thin" className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: accent }} />
                        {task}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          7. ARCHITECTURE — Chỉ render khi có data
      ════════════════════════════════════════════════════════════ */}
      {project.architecture && (
        <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Kiến trúc" title="Kiến trúc giải pháp" accent={accent} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Architecture layers */}
              <motion.div initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 font-mono">
                  Luồng chính
                </p>
                <div className="flex flex-col gap-2">
                  {project.architecture.layers.map((layer, i) => (
                    <motion.div key={layer}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-white"
                          style={{ backgroundColor: accent }}>
                          {i + 1}
                        </div>
                        {i < project.architecture!.layers.length - 1 && (
                          <div className="w-px h-4 bg-slate-200 dark:bg-white/10 my-1" />
                        )}
                      </div>
                      <div className="flex-1 bg-slate-50 dark:bg-white/[0.03] rounded-xl px-4 py-3 border border-black/[0.06] dark:border-white/10">
                        <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm font-mono">{layer}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Support components */}
              <motion.div initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={0.1}>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 font-mono">
                  Thành phần hỗ trợ
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.architecture.support.map((s, i) => (
                    <motion.span key={s}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="px-3 py-1.5 rounded-full text-sm font-mono font-semibold border"
                      style={{ background: accentBg, color: accent, borderColor: `${accent}20` }}>
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          8. MODULES — Highlights (luôn có)
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Chức năng" title="Các module nổi bật" accent={accent} />
          {project.modules ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.modules.map((mod, i) => (
                <motion.div key={mod.title} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp} custom={i * 0.07}
                  className="bg-white dark:bg-white/[0.03] rounded-2xl p-6 border border-black/[0.06] dark:border-white/10">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    {mod.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{mod.desc}</p>
                  <ul className="flex flex-col gap-1.5">
                    {mod.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <Icon icon="mdi:check-circle" className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.highlights.map((item, i) => (
                <motion.div key={item} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp} custom={i * 0.06}
                  className="flex items-start gap-3 bg-white dark:bg-white/[0.03] rounded-xl p-5 border border-black/[0.06] dark:border-white/10">
                  <Icon icon="mdi:check-circle" className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: accent }} />
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">{item}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          9. DEEP DIVE — Chỉ render khi có data
      ════════════════════════════════════════════════════════════ */}
      {project.deepDive && (
        <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
          <div className="max-w-5xl mx-auto">
            <SectionHeader label="Kỹ thuật chuyên sâu" title={project.deepDive.title} accent={accent} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem */}
              <motion.div initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
                className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-7">
                <p className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-widest mb-4 font-mono">
                  Vấn đề
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{project.deepDive.problem}</p>
              </motion.div>
              {/* Solution */}
              <motion.div initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={0.1}
                className="rounded-2xl p-7 border" style={{ background: accentBg, borderColor: `${accent}20` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4 font-mono" style={{ color: accent }}>
                  Giải pháp
                </p>
                <ul className="flex flex-col gap-3">
                  {project.deepDive.solutionItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      <span className="font-mono font-bold text-xs mt-0.5 shrink-0" style={{ color: accent }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          10. CHALLENGES — Luôn có
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Thử thách" title="Các khó khăn kỹ thuật đã xử lý" accent={accent} />
          <div className="flex flex-col gap-6">
            {project.challenges.map((ch, i) => (
              <motion.div key={ch.title} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} custom={i * 0.08}
                className="bg-white dark:bg-white/[0.03] rounded-2xl border border-black/[0.06] dark:border-white/10 overflow-hidden">
                <div className="px-7 py-5 border-b border-black/[0.06] dark:border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: accentBg }}>
                    <span className="text-xs font-black font-mono" style={{ color: accent }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{ch.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/[0.06] dark:divide-white/10">
                  <div className="px-7 py-6">
                    <p className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-widest mb-3 font-mono">
                      Vấn đề
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{ch.problem}</p>
                  </div>
                  <div className="px-7 py-6">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3 font-mono"
                      style={{ color: accent }}>
                      Giải pháp
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{ch.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          11. PROCESS — Chỉ render khi có data
      ════════════════════════════════════════════════════════════ */}
      {project.process && project.process.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Quy trình" title="Quy trình phát triển" accent={accent} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.process.map((step, i) => (
                <motion.div key={step.num} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp} custom={i * 0.07}
                  className="bg-slate-50 dark:bg-white/[0.03] rounded-2xl p-6 border border-black/[0.06] dark:border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-black font-mono text-slate-100 dark:text-white/10"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      {step.num}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      {step.title}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {step.items.map((item) => (
                      <li key={item} className="text-xs text-slate-500 dark:text-slate-500 flex items-start gap-2">
                        <Icon icon="mdi:circle-medium" className="w-3 h-3 shrink-0 mt-0.5"
                          style={{ color: accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          12. RESULTS — Luôn có
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Kết quả" title="Giá trị mang lại" accent={accent} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            {project.results.map((result, i) => (
              <motion.div key={result} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} custom={i * 0.07}
                className="flex items-start gap-3">
                <Icon icon="mdi:check-circle" className="w-5 h-5 shrink-0 mt-0.5"
                  style={{ color: accent }} />
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          13. LESSONS — Chỉ render khi có data
      ════════════════════════════════════════════════════════════ */}
      {project.lessons && project.lessons.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Bài học" title="Những điều tôi học được" accent={accent} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.lessons.map((lesson, i) => (
                <motion.div key={lesson.title} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp} custom={i * 0.08}
                  className="bg-slate-50 dark:bg-white/[0.03] rounded-2xl p-6 border border-black/[0.06] dark:border-white/10
                             hover:border-blue-200 dark:hover:border-blue-400/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-none
                             transition-all duration-300">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    {lesson.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{lesson.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          14. NEXT PROJECT + CTA
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03] border-t border-black/[0.06] dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Back */}
            <Link to="/projects"
              className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors group">
              <Icon icon="mdi:arrow-left" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Quay lại tất cả dự án
            </Link>

            {/* Next */}
            {nextProject && (
              <motion.div initial="hidden" whileInView="visible"
                viewport={{ once: true }} variants={fadeUp}>
                <Link to={`/projects/${nextProject.slug}`}
                  className="group flex items-center gap-6 bg-white dark:bg-white/[0.03] rounded-2xl p-6 border border-black/[0.06] dark:border-white/10 hover:shadow-xl hover:shadow-slate-200/80 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300">
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono font-medium mb-1 uppercase tracking-widest">
                      Dự án tiếp theo
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      {nextProject.title}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{nextProject.role} · {nextProject.tag}</p>
                  </div>
                  <Icon icon="mdi:arrow-right"
                    className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ─────────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-12 bg-white dark:bg-[#07080D] border-t border-black/[0.06] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
            className="flex flex-col items-center gap-7">
            <p className="font-semibold text-sm tracking-widest uppercase" style={{ color: accent }}>
              Hợp tác
            </p>
            <h2 className="font-extrabold text-slate-900 dark:text-white leading-tight"
              style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontFamily: "'Inter', sans-serif" }}>
              Bạn đang xây dựng một hệ thống tương tự?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl leading-relaxed">
              Tôi luôn sẵn sàng trao đổi về những dự án, bài toán kỹ thuật và giải pháp phát triển hệ thống phù hợp.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold text-base rounded-full hover:shadow-xl transition-all duration-300 active:scale-95"
                style={{ backgroundColor: accent }}>
                Liên hệ với tôi
                <Icon icon="mdi:arrow-right" className="w-5 h-5" />
              </Link>
              <Link to="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold text-base rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300">
                Xem dự án khác
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
