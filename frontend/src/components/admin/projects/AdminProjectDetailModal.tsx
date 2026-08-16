import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AdminMockProject } from '../../../constants';
import { useLang } from '../../../lib/i18n';

interface AdminProjectDetailModalProps {
  project: AdminMockProject | null;
  isOpen: boolean;
  onClose: () => void;
}

// Modal Xem Nhanh Chi Tiết Dự Án & Case Study trong Admin CMS (Sử dụng Ant Design Icons, KHÔNG emoji)
export default function AdminProjectDetailModal({
  project,
  isOpen,
  onClose,
}: AdminProjectDetailModalProps) {
  const { lang, t } = useLang();

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Mờ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Khung Modal Chi Tiết */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0D0F17] rounded-3xl border border-black/[0.07] dark:border-white/10 shadow-2xl overflow-hidden z-10 my-8 max-h-[85vh] flex flex-col"
        >
          {/* Header Modal */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200/50 dark:border-blue-800/40">
                {project.tag}
              </div>
              <div className="truncate">
                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                  {project.title}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">/{project.slug}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
            >
              <Icon icon="ant-design:close-outlined" className="w-4 h-4" />
            </button>
          </div>

          {/* Nội dung cuộn của Modal */}
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Badges Trạng thái & Meta info */}
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-100 dark:border-white/5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  project.isPublished
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/50'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/50'
                }`}
              >
                <Icon
                  icon={project.isPublished ? 'ant-design:check-circle-outlined' : 'ant-design:edit-outlined'}
                  className="w-3.5 h-3.5"
                />
                <span>
                  {project.isPublished
                    ? t('PUBLISHED')
                    : t('DRAFT')}
                </span>
              </span>

              {project.featured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/50">
                  <Icon icon="ant-design:star-filled" className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('FEATURED_PROJECT')}</span>
                </span>
              )}

              <span className="text-xs text-slate-400 ml-auto">
                {t('UPDATED_LABEL')} {project.updatedAt}
              </span>
            </div>

            {/* Thông tin Vai trò & Khách hàng */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  {t('ROLE')}
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {project.role || 'Full-stack Developer'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  {t('CLIENT')}
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {project.client || 'Enterprise'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  {t('TIMELINE')}
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {project.timeline || '2025 – 2026'}
                </span>
              </div>
            </div>

            {/* Mô tả & Tổng quan */}
            {project.description && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {t('SHORT_DESC')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {/* Bài toán & Giải pháp Case Study */}
            {project.overviewVi && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t('CASE_STUDY_SUMMARY')}
                </h4>
                <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
                  <p>
                    <strong className="text-blue-600 dark:text-blue-400">
                      {t('PROBLEM')}
                    </strong>{' '}
                    {lang === 'vi' ? project.problemsVi : project.problemsEn}
                  </p>
                  <p>
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      {t('ARCH_SOLUTION')}
                    </strong>{' '}
                    {lang === 'vi' ? project.solutionsVi : project.solutionsEn}
                  </p>
                  <p>
                    <strong className="text-purple-600 dark:text-purple-400">
                      {t('RESULTS_METRICS')}
                    </strong>{' '}
                    {lang === 'vi' ? project.resultsVi : project.resultsEn}
                  </p>
                </div>
              </div>
            )}

            {/* Công nghệ sử dụng (Tech Stack Badges) */}
            {project.techStack && project.techStack.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {t('TECH_STACK')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Liên kết Demo & GitHub */}
            <div className="flex flex-wrap gap-3 pt-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all"
                >
                  <span>{t('LIVE_DEMO')}</span>
                  <Icon icon="ant-design:export-outlined" className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
                >
                  <Icon icon="ant-design:github-filled" className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Footer Modal */}
          <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all"
            >
              {t('CLOSE')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
