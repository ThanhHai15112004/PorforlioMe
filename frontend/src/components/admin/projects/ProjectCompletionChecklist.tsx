import { Icon } from '@iconify/react';
import { calculateProjectCompleteness, type AdminMockProject } from '../../../constants/admin';
import { useLang } from '../../../lib/i18n';

interface ProjectCompletionChecklistProps {
  project: Partial<AdminMockProject>;
  caseStudyCount?: number;
  hasEnTranslation?: boolean;
}

// Component hiển thị Tiến độ Hoàn thiện và Danh sách Checklist thông tin Dự án
export default function ProjectCompletionChecklist({
  project,
  caseStudyCount = 0,
  hasEnTranslation = false,
}: ProjectCompletionChecklistProps) {
  const { t } = useLang();
  const result = calculateProjectCompleteness(project, caseStudyCount, hasEnTranslation);

  const checklistItems = [
    { label: t('TITLE_SLUG_REQ'), valid: Boolean(project.title && project.slug) },
    { label: t('CATEGORY_ROLE_REQ'), valid: Boolean(project.tag && project.role) },
    { label: t('TECH_STACK_REQ'), valid: Boolean(project.techStack && project.techStack.length > 0) },
    { label: t('SHORT_DESC_REQ'), valid: Boolean(project.description && project.description.trim().length > 10) },
    { label: t('COVER_IMAGE_REQ'), valid: Boolean(project.coverImage) },
    { label: t('DEMO_GITHUB_REQ'), valid: Boolean(project.demoUrl || project.githubUrl) },
    { label: t('CS_CONTENT_REQ'), valid: caseStudyCount > 0, detail: `${caseStudyCount} ${t('PARTS_FILLED')}` },
    { label: t('EN_TRANSLATION_REQ'), valid: hasEnTranslation || Boolean(project.overviewEn) },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4 shadow-sm">
      {/* 1. Header & Percent Progress */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {t('PROJECT_COMPLETION')}
          </span>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
            {result.percentage}%
          </span>
        </div>

        {/* Thanh Progress Bar */}
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              result.percentage === 100
                ? 'bg-emerald-500'
                : result.percentage >= 70
                ? 'bg-blue-600'
                : 'bg-amber-500'
            }`}
            style={{ width: `${result.percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
          <span>{result.statusText}</span>
          <span>
            {result.completedItemsCount}/{result.totalItemsCount} {t('STANDARD')}
          </span>
        </div>
      </div>

      {/* 2. Checklist Items */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        {checklistItems.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {item.valid ? (
                <Icon icon="ant-design:check-circle-filled" className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <Icon icon="ant-design:info-circle-outlined" className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span className={item.valid ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-400 dark:text-slate-500'}>
                {item.label}
              </span>
            </div>
            {item.detail && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                {item.detail}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 3. Cảnh báo các phần còn thiếu nếu có */}
      {result.missingItems.length > 0 && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg text-xs space-y-1">
          <div className="font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <Icon icon="ant-design:warning-outlined" className="w-3.5 h-3.5" />
            <span>{t('MISSING_REQUIREMENTS')}</span>
          </div>
          <ul className="list-disc list-inside text-amber-700 dark:text-amber-400 text-[11px] space-y-0.5">
            {result.missingItems.map((missing, idx) => (
              <li key={idx}>{missing}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
