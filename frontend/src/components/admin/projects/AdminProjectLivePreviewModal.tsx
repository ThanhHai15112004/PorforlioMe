import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import type { AdminMockProject } from '../../../constants/admin';
import type { CaseStudySectionItem } from './CaseStudyBuilder';
import { CASE_STUDY_SECTIONS } from './CaseStudyBuilder';
import { useLang, pick } from '../../../lib/i18n';
import ReadingProgress from '../../projects/ReadingProgress';
import TechBadge from '../../projects/TechBadge';
import { fadeUp, revealViewport } from '../../../lib/motion';
import Eyebrow from '../../common/Eyebrow';
import Button from '../../common/Button';
import Card from '../../common/Card';
import { TAG_LABEL, type ProjectTag } from '../../../constants/projects';

interface AdminProjectLivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AdminMockProject | any;
  caseStudyItems?: CaseStudySectionItem[];
}

type ViewportMode = 'desktop' | 'mobile';

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

// Modal Xem Trước Toàn Màn Hình Lấy Giao Diện Trang Client Làm Gốc (Live Preview Modal)
export default function AdminProjectLivePreviewModal({
  isOpen,
  onClose,
  project,
  caseStudyItems = [],
}: AdminProjectLivePreviewModalProps) {
  const { lang, t } = useLang();
  const [viewport, setViewport] = useState<ViewportMode>('desktop');

  const techList = project.techStack || [];

  
  // Lấy data đa ngôn ngữ hiện tại của Form
  const isVi = lang === 'vi';
  const title = project.title || t('NO_TITLE');
  const description = project.description || t('NO_DESC');
  const role = project.role || 'Full-stack Developer';
  const timeline = project.timeline || '2025 – 2026';
  
  const tagStr = project.tag || 'LMS';
  const tagObj = TAG_LABEL[tagStr as ProjectTag] || { vi: tagStr, en: tagStr };
  
  const accent = TAG_ACCENT[tagStr] ?? '#2563EB';
  const accentBg = `${accent}12`;

  // Group caseStudyItems by sectionKey
  const sectionsGrouped = useMemo(() => {
    const groups: Record<string, CaseStudySectionItem[]> = {};
    caseStudyItems.forEach(item => {
      // Chỉ hiển thị item nếu có dữ liệu (dựa theo ngôn ngữ hiện tại)
      const hasData = isVi ? (item.titleVi || item.descVi) : (item.titleEn || item.descEn);
      if (hasData) {
        if (!groups[item.sectionKey]) groups[item.sectionKey] = [];
        groups[item.sectionKey].push(item);
      }
    });
    return groups;
  }, [caseStudyItems, isVi]);

  const renderSectionHeaderByGroup = (key: string) => {
    const def = CASE_STUDY_SECTIONS.find(s => s.key === key);
    return def ? (
      <SectionHeader label={t(def.nameKey)} title={t(def.descKey)} />
    ) : null;
  };

  if (!isOpen) return null;

  const renderSectionContent = (key: string, items: CaseStudySectionItem[]) => {
    switch (key) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl">
            <div className="lg:col-span-2 flex flex-col gap-5">
              {items.map((item, i) => (
                <motion.p key={item.id} initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} custom={i * 0.08} className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed whitespace-pre-line">
                  {isVi ? item.descVi : item.descEn}
                </motion.p>
              ))}
            </div>
            {(() => {
              const projData = project as Record<string, string>;
              const metaItems = [
                { label: pick(lang, 'Loại hệ thống', 'System Type'), value: projData.systemType || 'Enterprise LMS' },
                { label: pick(lang, 'Người dùng chính', 'Primary Users'), value: projData.primaryUsers || pick(lang, 'Admin, Giảng viên, Học viên', 'Admin, Instructor, Learner') },
                { label: pick(lang, 'Nền tảng', 'Platform'), value: projData.platform || pick(lang, 'Ứng dụng Web', 'Web Application') },
                { label: pick(lang, 'Phạm vi', 'Scope'), value: projData.scope || pick(lang, 'Frontend, Backend, Tối ưu', 'Frontend, Backend, Optimization') },
              ].filter(item => item.value);

              if (metaItems.length === 0) return null;

              return (
                <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} custom={0.1} className="flex flex-col gap-3">
                  {metaItems.map((item) => (
                    <Card key={item.label} padding="sm">
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{item.label}</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{item.value}</p>
                    </Card>
                  ))}
                </motion.div>
              );
            })()}
          </div>
        );
      
      case 'role':
      case 'users':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, i) => {
              const title = isVi ? item.titleVi : item.titleEn;
              const desc = isVi ? item.descVi : item.descEn;
              const tasks = desc.split('\n').filter(Boolean);
              return (
                <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} custom={i * 0.1}>
                  <Card title={title} layout="row" padding="lg" className="h-full">
                    <ul className="flex flex-col gap-2">
                      {tasks.map(task => (
                        <li key={task} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Icon icon={key === 'role' ? 'mdi:check-circle' : 'mdi:arrow-right-thin'} className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accent }} />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        );

      case 'modules':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, i) => {
              const title = isVi ? item.titleVi : item.titleEn;
              const desc = isVi ? item.descVi : item.descEn;
              const features = desc.split('\n').filter(Boolean);
              return (
                <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} custom={i * 0.07}>
                  <Card title={title} padding="md" className="h-full">
                    <ul className="flex flex-col gap-1.5 mt-3">
                      {features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <Icon icon="mdi:check-circle" className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        );

      case 'process':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, i) => {
              const title = isVi ? item.titleVi : item.titleEn;
              const desc = isVi ? item.descVi : item.descEn;
              const tasks = desc.split('\n').filter(Boolean);
              return (
                <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} custom={i * 0.07}>
                  <Card padding="md" className="h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-black font-mono text-slate-100 dark:text-white/10" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">{title}</h3>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {tasks.map(t => (
                        <li key={t} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <Icon icon="mdi:circle-medium" className="w-3 h-3 shrink-0 mt-0.5" style={{ color: accent }} />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        );

      case 'architecture':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 font-mono">
                {pick(lang, 'Luồng chính', 'Main Flow')}
              </p>
              <div className="flex flex-col gap-2">
                {items.map((item, i) => (
                  <motion.div key={item.id} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-white" style={{ backgroundColor: accent }}>
                        {i + 1}
                      </div>
                      {i < items.length - 1 && <div className="w-px h-4 bg-slate-200 dark:bg-white/10 my-1" />}
                    </div>
                    <div className="flex-1 bg-slate-50 dark:bg-white/[0.03] rounded-xl px-4 py-3 border border-black/[0.06] dark:border-white/10">
                      <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm font-mono">
                        {isVi ? item.titleVi : item.titleEn}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} custom={0.1}>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 font-mono">
                {pick(lang, 'Thành phần hỗ trợ', 'Supporting Components')}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.flatMap(item => (isVi ? item.descVi : item.descEn).split('\n').filter(Boolean)).map((s, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-sm font-mono font-semibold border" style={{ background: accentBg, color: accent, borderColor: `${accent}20` }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'challenges':
        return (
          <div className="flex flex-col gap-6">
            {items.map((item, i) => (
              <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} custom={i * 0.08}>
                <Card padding="lg">
                  <div className="flex items-center gap-3 pb-5 mb-5 border-b border-black/[0.06] dark:border-white/10">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 dark:bg-blue-500/10">
                      <span className="text-xs font-black font-mono text-blue-600 dark:text-blue-400">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{isVi ? item.titleVi : item.titleEn}</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-widest mb-3 font-mono">
                        {pick(lang, 'Chi tiết', 'Details')}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">{isVi ? item.descVi : item.descEn}</p>
                      {item.imageUrl && (
                        <div className="mt-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                          <img src={item.imageUrl} alt="challenge" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        );

      case 'screenshots':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} custom={i * 0.1}>
                {item.imageUrl ? (
                  <div className="relative group rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 aspect-video shadow-sm">
                    <img src={item.imageUrl} alt="screenshot" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h4 className="text-white font-bold text-sm mb-1">{isVi ? item.titleVi : item.titleEn}</h4>
                      <p className="text-white/80 text-xs line-clamp-2">{isVi ? item.descVi : item.descEn}</p>
                    </div>
                  </div>
                ) : (
                  <Card padding="md" className="h-full flex items-center justify-center aspect-video">
                    <p className="text-sm font-semibold text-slate-400 text-center">{isVi ? item.titleVi : item.titleEn}</p>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        );

      case 'results':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            {items.flatMap(item => (isVi ? item.descVi : item.descEn).split('\n').filter(Boolean)).map((res, j) => (
              <motion.div key={j} initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} custom={j * 0.07} className="flex items-start gap-3">
                <Icon icon="mdi:check-circle" className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{res}</p>
              </motion.div>
            ))}
          </div>
        );

      default:
        return (
          <div className={`grid gap-6 ${key === 'lessons' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
            {items.map((item, i) => (
              <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} custom={i * 0.1}>
                <Card padding="md" className="h-full">
                  <span className="block font-black text-2xl mb-4 font-mono" style={{ color: `${accent}40`, fontFamily: "'Inter', sans-serif" }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {isVi ? item.titleVi : item.titleEn}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                    {isVi ? item.descVi : item.descEn}
                  </p>
                  {item.metric && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                      <span className="inline-block px-3 py-1 rounded text-xs font-mono font-bold" style={{ background: accentBg, color: accent }}>
                        {item.metric}
                      </span>
                    </div>
                  )}
                  {item.imageUrl && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                      <img src={item.imageUrl} alt="case-study-item" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md animate-in fade-in">
      {/* 1. TOP FLOATING CONTROL BAR */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between gap-4 shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <Icon icon="ant-design:eye-outlined" className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {t('LIVE_PREVIEW_MODE')}
              </span>
              <span className="px-2 py-0.2 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {t('CLIENT_INTERFACE')}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {t('LIVE_PREVIEW_DESC')}
            </p>
          </div>
        </div>

        {/* Controls Switch Viewport Desktop / Mobile & Nút Đóng */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-full bg-slate-800 border border-slate-700">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewport === 'desktop'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon icon="ant-design:desktop-outlined" className="w-3.5 h-3.5" />
              <span>{t('DESKTOP')}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewport === 'mobile'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon icon="ant-design:mobile-outlined" className="w-3.5 h-3.5" />
              <span>{t('MOBILE')}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
          >
            <Icon icon="ant-design:close-outlined" className="w-3.5 h-3.5" />
            <span>{t('EXIT_PREVIEW')}</span>
          </button>
        </div>
      </div>

      {/* 2. BODY FRAMEWORK CONTAINER */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center bg-slate-900/60 relative">
        <div
          className={`bg-white dark:bg-[#07080D] relative transition-all duration-300 shadow-2xl rounded-2xl overflow-y-auto overflow-x-hidden border border-slate-200 dark:border-slate-800 flex flex-col ${
            viewport === 'mobile'
              ? 'w-[395px] max-h-full my-auto rounded-[36px] border-[8px] border-slate-800 shadow-blue-500/10'
              : 'w-full max-w-6xl h-full'
          }`}
        >
          {/* ── Reading Progress Bar ─────────────────────────────────── */}
          <ReadingProgress accentColor={accent} />

          {/* ════════════════════════════════════════════════════════════
              1. HERO SECTION
          ════════════════════════════════════════════════════════════ */}
          <section className="pt-16 pb-12 px-6 md:px-12 bg-white dark:bg-[#07080D]">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
                className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 mb-8">
                <span className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">{pick(lang, 'Dự án', 'Projects')}</span>
                <Icon icon="mdi:chevron-right" className="w-4 h-4" />
                <span className="text-slate-600 dark:text-slate-400 font-medium">{title}</span>
              </motion.div>

              {/* Category tag */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold mb-4"
                  style={{ background: accentBg, color: accent }}>
                  {isVi ? tagObj.vi : tagObj.en}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
                className="font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 max-w-4xl"
                style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: "'Inter', sans-serif" }}>
                {title}
              </motion.h1>

              {/* Description */}
              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
                className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mb-8 whitespace-pre-line">
                {description}
              </motion.p>

              {/* Tech stack */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.25}
                className="flex flex-wrap gap-2 mb-8">
                {techList.map((t: string) => <TechBadge key={t} tech={t} size="md" />)}
              </motion.div>

              {/* Meta grid */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.32}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b border-black/[0.06] dark:border-white/10">
                {[
                  { label: pick(lang, 'Vai trò', 'Role'), value: role },
                  { label: 'Timeline', value: timeline },
                  { label: pick(lang, 'Trạng thái', 'Status'), value: project.isPublished ? t('PUBLISHED') : t('DRAFT') },
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
                <Button variant="primary" size="sm" onClick={() => {}}>
                  {pick(lang, 'Liên hệ tư vấn', 'Get in touch')}
                  <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                </Button>
                {project.demoUrl ? (
                  <Button variant="secondary" size="sm" onClick={() => {}}>
                    {pick(lang, 'Xem Live Demo', 'Live Demo')}
                    <Icon icon="mdi:open-in-new" className="w-4 h-4" />
                  </Button>
                ) : (
                  <span className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-sm font-mono rounded-full">
                    <Icon icon="mdi:lock-outline" className="w-4 h-4" />
                    {pick(lang, 'Dự án riêng tư', 'Private Project')}
                  </span>
                )}
              </motion.div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════
              CASE STUDY SECTIONS DYNAMIC RENDER
          ════════════════════════════════════════════════════════════ */}
          {Object.entries(sectionsGrouped).map(([key, items], sectionIndex) => {
            const isOdd = sectionIndex % 2 !== 0;
            const bgClass = isOdd ? 'bg-slate-50 dark:bg-white/[0.03]' : 'bg-white dark:bg-[#07080D]';
            
            return (
              <section key={key} className={`py-16 px-6 md:px-12 ${bgClass}`}>
                <div className="max-w-7xl mx-auto">
                  {renderSectionHeaderByGroup(key)}
                  
                  {renderSectionContent(key, items)}
                </div>
              </section>
            );
          })}

          {/* Placeholder CTA end of preview */}
          <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03] border-t border-black/[0.06] dark:border-white/10 text-center">
            <h2 className="font-extrabold text-slate-900 dark:text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(20px, 2.2vw, 28px)' }}>
              {pick(lang, 'Hợp tác', 'Collaboration')}
            </h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto text-sm">
              {t('LIVE_PREVIEW_DESC')}
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
