import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { PROJECTS_DATA, TAG_LABEL, localizeProject } from '../constants/projects';
import TechBadge from '../components/projects/TechBadge';
import ReadingProgress from '../components/projects/ReadingProgress';
import { fadeUp, revealViewport } from '../lib/motion';
import Eyebrow from '../components/common/Eyebrow';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useLang, pick } from '../lib/i18n';

// ─── Accent color map ──────────────────────────────────────────────────────
const TAG_ACCENT: Record<string, string> = {
  LMS: '#2563EB',
  Backend: '#7C3AED',
  Frontend: '#0891B2',
  DevOps: '#059669',
  Personal: '#D97706',
};

// ─── Shared section header ─────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
      className="mb-10"
    >
      <Eyebrow as="p" className="mb-3">{label}</Eyebrow>
      <h2 className="font-extrabold text-slate-900 dark:text-white leading-tight"
        style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontFamily: "'Inter', sans-serif" }}>
        {title}
      </h2>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();

  const rawProject = useMemo(() => PROJECTS_DATA.find((p) => p.slug === slug), [slug]);
  const rawNextProject = useMemo(
    () => PROJECTS_DATA.find((p) => p.slug === rawProject?.nextSlug),
    [rawProject],
  );

  const project = useMemo(() => (rawProject ? localizeProject(rawProject, lang) : undefined), [rawProject, lang]);
  const nextProject = useMemo(
    () => (rawNextProject ? localizeProject(rawNextProject, lang) : undefined),
    [rawNextProject, lang],
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
            <Link to="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{pick(lang, 'Dự án', 'Projects')}</Link>
            <Icon icon="mdi:chevron-right" className="w-4 h-4" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">{project.title}</span>
          </motion.div>

          {/* Category tag */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold mb-4"
              style={{ background: accentBg, color: accent }}>
              {TAG_LABEL[project.tag][lang]} · {project.index}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 max-w-4xl"
            style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: "'Inter', sans-serif" }}>
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
              { label: pick(lang, 'Vai trò', 'Role'), value: project.role },
              { label: 'Timeline', value: project.timeline },
              { label: pick(lang, 'Loại dự án', 'Project Type'), value: 'Enterprise Web App' },
              { label: pick(lang, 'Trạng thái', 'Status'), value: pick(lang, 'Sản phẩm nội bộ (Private)', 'Private Production') },
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
            <Button to="/contact" variant="primary" size="sm">
              {pick(lang, 'Liên hệ tư vấn', 'Get in touch')}
              <Icon icon="mdi:arrow-right" className="w-4 h-4" />
            </Button>
            <span className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-sm font-mono rounded-full">
              <Icon icon="mdi:lock-outline" className="w-4 h-4" />
              {pick(lang, 'Dự án riêng tư', 'Private Project')}
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
            <SectionHeader label={pick(lang, 'Tổng quan', 'Overview')} title={pick(lang, 'Về dự án này', 'About this project')} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl">
              <div className="lg:col-span-2 flex flex-col gap-5">
                {project.overview.map((para, i) => (
                  <motion.p key={i} initial="hidden" whileInView="visible"
                    viewport={revealViewport}
                    variants={fadeUp} custom={i * 0.08}
                    className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    {para}
                  </motion.p>
                ))}
              </div>
              <motion.div initial="hidden" whileInView="visible"
                viewport={revealViewport} variants={fadeUp} custom={0.1}
                className="flex flex-col gap-3">
                {[
                  { label: pick(lang, 'Loại hệ thống', 'System Type'), value: 'Enterprise LMS' },
                  { label: pick(lang, 'Người dùng chính', 'Primary Users'), value: pick(lang, 'Admin, Giảng viên, Học viên', 'Admin, Instructor, Learner') },
                  { label: pick(lang, 'Nền tảng', 'Platform'), value: pick(lang, 'Ứng dụng Web', 'Web Application') },
                  { label: pick(lang, 'Phạm vi', 'Scope'), value: pick(lang, 'Frontend, Backend, Tối ưu', 'Frontend, Backend, Optimization') },
                ].map((item) => (
                  <Card key={item.label} padding="sm">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{item.label}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{item.value}</p>
                  </Card>
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
            <SectionHeader label={pick(lang, 'Bài toán', 'The Problem')} title={pick(lang, 'Vấn đề cần giải quyết', 'Problems to solve')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.problems.map((p, i) => (
                <motion.div key={p.num} initial="hidden" whileInView="visible"
                  viewport={revealViewport}
                  variants={fadeUp} custom={i * 0.07}>
                  <Card padding="md">
                    <span className="block font-black text-2xl text-slate-100 dark:text-white/10 font-mono mb-3"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      {p.num}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      {p.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                  </Card>
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
            <SectionHeader label={pick(lang, 'Mục tiêu', 'Goals')} title={pick(lang, 'Hệ thống cần đạt được điều gì?', 'What should the system achieve?')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {project.goals.map((g, i) => (
                <motion.div key={g.num} initial="hidden" whileInView="visible"
                  viewport={revealViewport}
                  variants={fadeUp} custom={i * 0.1}>
                  <Card padding="md">
                    <span className="block font-black text-2xl mb-4 font-mono"
                      style={{ color: `${accent}30`, fontFamily: "'Inter', sans-serif" }}>
                      {g.num}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      {g.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{g.desc}</p>
                  </Card>
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
            <SectionHeader label={pick(lang, 'Vai trò', 'My Role')} title={pick(lang, 'Phạm vi công việc của tôi', 'My scope of work')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {project.roleGroups.map((rg, i) => (
                <motion.div key={rg.category} initial="hidden" whileInView="visible"
                  viewport={revealViewport}
                  variants={fadeUp} custom={i * 0.08}>
                  <Card icon={rg.icon} title={rg.category} padding="md">
                    <ul className="flex flex-col gap-1.5">
                      {rg.tasks.map((task) => (
                        <li key={task} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <Icon icon="mdi:check-circle" className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: accent }} />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </Card>
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
            <SectionHeader label={pick(lang, 'Người dùng', 'Users')} title={pick(lang, 'Hệ thống phục vụ ai?', 'Who is this system for?')} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.users.map((user, i) => (
                <motion.div key={user.type} initial="hidden" whileInView="visible"
                  viewport={revealViewport}
                  variants={fadeUp} custom={i * 0.1}>
                  <Card icon={user.icon} title={user.type} layout="row" padding="lg">
                    <ul className="flex flex-col gap-2">
                      {user.tasks.map((task) => (
                        <li key={task} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Icon icon="mdi:arrow-right-thin" className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: accent }} />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </Card>
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
            <SectionHeader label={pick(lang, 'Kiến trúc', 'Architecture')} title={pick(lang, 'Kiến trúc giải pháp', 'Solution architecture')} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Architecture layers */}
              <motion.div initial="hidden" whileInView="visible"
                viewport={revealViewport} variants={fadeUp}>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 font-mono">
                  {pick(lang, 'Luồng chính', 'Main Flow')}
                </p>
                <div className="flex flex-col gap-2">
                  {project.architecture.layers.map((layer, i) => (
                    <motion.div key={layer}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={revealViewport}
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
                viewport={revealViewport} variants={fadeUp} custom={0.1}>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 font-mono">
                  {pick(lang, 'Thành phần hỗ trợ', 'Supporting Components')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.architecture.support.map((s, i) => (
                    <motion.span key={s}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={revealViewport}
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
          <SectionHeader label={pick(lang, 'Chức năng', 'Features')} title={pick(lang, 'Các module nổi bật', 'Key modules')} />
          {project.modules ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.modules.map((mod, i) => (
                <motion.div key={mod.title} initial="hidden" whileInView="visible"
                  viewport={revealViewport}
                  variants={fadeUp} custom={i * 0.07}>
                  <Card title={mod.title} padding="md">
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
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.highlights.map((item, i) => (
                <motion.div key={item} initial="hidden" whileInView="visible"
                  viewport={revealViewport}
                  variants={fadeUp} custom={i * 0.06}>
                  <Card padding="sm">
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="w-5 h-5 shrink-0 mt-0.5"
                        style={{ color: accent }} />
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">{item}</p>
                    </div>
                  </Card>
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
            <SectionHeader label={pick(lang, 'Kỹ thuật chuyên sâu', 'Technical Deep Dive')} title={project.deepDive.title} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem */}
              <motion.div initial="hidden" whileInView="visible"
                viewport={revealViewport} variants={fadeUp}
                className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-7">
                <p className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-widest mb-4 font-mono">
                  {pick(lang, 'Vấn đề', 'Problem')}
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{project.deepDive.problem}</p>
              </motion.div>
              {/* Solution */}
              <motion.div initial="hidden" whileInView="visible"
                viewport={revealViewport} variants={fadeUp} custom={0.1}
                className="rounded-2xl p-7 border" style={{ background: accentBg, borderColor: `${accent}20` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4 font-mono" style={{ color: accent }}>
                  {pick(lang, 'Giải pháp', 'Solution')}
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
          <SectionHeader label={pick(lang, 'Thử thách', 'Challenges')} title={pick(lang, 'Các khó khăn kỹ thuật đã xử lý', 'Technical challenges I solved')} />
          <div className="flex flex-col gap-6">
            {project.challenges.map((ch, i) => (
              <motion.div key={ch.title} initial="hidden" whileInView="visible"
                viewport={revealViewport}
                variants={fadeUp} custom={i * 0.08}>
                <Card padding="lg">
                  <div className="flex items-center gap-3 pb-5 mb-5 border-b border-black/[0.06] dark:border-white/10">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 dark:bg-blue-500/10">
                      <span className="text-xs font-black font-mono text-blue-600 dark:text-blue-400">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{ch.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-widest mb-3 font-mono">
                        {pick(lang, 'Vấn đề', 'Problem')}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{ch.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-3 font-mono"
                        style={{ color: accent }}>
                        {pick(lang, 'Giải pháp', 'Solution')}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{ch.solution}</p>
                    </div>
                  </div>
                </Card>
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
            <SectionHeader label={pick(lang, 'Quy trình', 'Process')} title={pick(lang, 'Quy trình phát triển', 'Development process')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.process.map((step, i) => (
                <motion.div key={step.num} initial="hidden" whileInView="visible"
                  viewport={revealViewport}
                  variants={fadeUp} custom={i * 0.07}>
                  <Card padding="md">
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
                        <li key={item} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <Icon icon="mdi:circle-medium" className="w-3 h-3 shrink-0 mt-0.5"
                            style={{ color: accent }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
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
          <SectionHeader label={pick(lang, 'Kết quả', 'Results')} title={pick(lang, 'Giá trị mang lại', 'Value delivered')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            {project.results.map((result, i) => (
              <motion.div key={result} initial="hidden" whileInView="visible"
                viewport={revealViewport}
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
            <SectionHeader label={pick(lang, 'Bài học', 'Lessons Learned')} title={pick(lang, 'Những điều tôi học được', 'What I learned')} />
            <div className="flex flex-wrap justify-center gap-5">
              {project.lessons.map((lesson, i) => (
                <motion.div key={lesson.title} initial="hidden" whileInView="visible"
                  viewport={revealViewport}
                  variants={fadeUp} custom={i * 0.08}
                  className="w-full md:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333%-0.834rem)]">
                  <Card title={lesson.title} padding="md" className="h-full">
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{lesson.desc}</p>
                  </Card>
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
              {pick(lang, 'Quay lại tất cả dự án', 'Back to all projects')}
            </Link>

            {/* Next */}
            {nextProject && (
              <motion.div initial="hidden" whileInView="visible"
                viewport={revealViewport} variants={fadeUp}>
                <Link to={`/projects/${nextProject.slug}`}
                  className="group flex items-center gap-6 glass-card elevate-sm rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-50 dark:hover:shadow-blue-950/30 transition-all duration-300">
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono font-medium mb-1 uppercase tracking-widest">
                      {pick(lang, 'Dự án tiếp theo', 'Next Project')}
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      {nextProject.title}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{nextProject.role} · {TAG_LABEL[nextProject.tag][lang]}</p>
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
            <Eyebrow as="p">{pick(lang, 'Hợp tác', 'Collaboration')}</Eyebrow>
            <h2 className="font-extrabold text-slate-900 dark:text-white leading-tight"
              style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontFamily: "'Inter', sans-serif" }}>
              {pick(lang, 'Bạn đang xây dựng một hệ thống tương tự?', 'Building something similar?')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl leading-relaxed">
              {pick(
                lang,
                'Tôi luôn sẵn sàng trao đổi về những dự án, bài toán kỹ thuật và giải pháp phát triển hệ thống phù hợp.',
                "I'm always happy to talk through projects, technical challenges, and the right system development approach.",
              )}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button to="/contact" variant="primary">
                {pick(lang, 'Liên hệ với tôi', 'Contact me')}
                <Icon icon="mdi:arrow-right" className="w-5 h-5" />
              </Button>
              <Button to="/projects" variant="secondary">
                {pick(lang, 'Xem dự án khác', 'View other projects')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
