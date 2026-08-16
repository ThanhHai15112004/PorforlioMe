import { Icon } from '@iconify/react';
import type { AdminMockProject } from '../../../constants/admin';
import { useLang } from '../../../lib/i18n';

interface ProjectLivePreviewCardProps {
  project: Partial<AdminMockProject>;
}

// Component Xem Trước Thời Gian Thực (Live Preview Card) mô phỏng hiển thị trên trang Portfolio public
export default function ProjectLivePreviewCard({ project }: ProjectLivePreviewCardProps) {
  const { t } = useLang();
  const {
    title = 'Tiêu đề dự án mẫu',
    tag = 'LMS',
    role = 'Full-stack Developer',
    description = 'Mô tả ngắn về dự án của bạn sẽ xuất hiện ở đây...',
    coverImage,
    techStack = [],
    featured = false,
  } = project;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
      {/* 1. Card Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Icon icon="ant-design:eye-outlined" className="w-3.5 h-3.5 text-blue-500" />
          <span>{t('LIVE_PREVIEW_MODE')}</span>
        </div>
        {featured && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Icon icon="ant-design:star-filled" className="w-3 h-3 text-amber-500" />
            {t('FEATURED')}
          </span>
        )}
      </div>

      {/* 2. Ảnh Thumbnail Dự Án */}
      <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback khi hình ảnh lỗi
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop';
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-1.5 p-4 text-center">
            <Icon icon="ant-design:picture-outlined" className="w-8 h-8 opacity-60" />
            <span className="text-xs italic">{t('NO_COVER')}</span>
          </div>
        )}

        {/* Tag danh mục nổi lên góc ảnh */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md bg-slate-900/80 backdrop-blur-md text-white border border-white/10 shadow-sm">
            {tag}
          </span>
        </div>
      </div>

      {/* 3. Nội dung Card Thông Tin */}
      <div className="p-4 space-y-3">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h4>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {role}
          </p>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Badges Công Nghệ (Tech Stack) */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 5 && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                +{techStack.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Footer Card */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>{t('VIEW_CASE_STUDY')}</span>
          <Icon icon="ant-design:arrow-right-outlined" className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
