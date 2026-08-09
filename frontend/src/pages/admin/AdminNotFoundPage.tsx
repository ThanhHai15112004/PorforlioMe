import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useLang, pick } from '../../lib/i18n';

// Trang 404 dành riêng cho khu vực Quản trị Admin
export default function AdminNotFoundPage() {
  const { lang } = useLang();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-white/80 dark:bg-[#0D0F17] rounded-3xl border border-black/[0.07] dark:border-white/10 backdrop-blur-xl my-4">
      {/* Badge 404 Status */}
      <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold uppercase tracking-widest border border-blue-200/60 dark:border-blue-800/50 mb-4">
        404 · {pick(lang, 'KHÔNG TÌM THẤY TRANG', 'PAGE NOT FOUND')}
      </span>

      {/* Icon Ant Design */}
      <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 border border-blue-200/50 dark:border-blue-800/40">
        <Icon icon="ant-design:warning-outlined" className="w-8 h-8" />
      </div>

      {/* Tiêu đề */}
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        {pick(lang, 'Trang quản trị không tồn tại', 'Admin page not found')}
      </h1>

      {/* Mô tả */}
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {pick(
          lang,
          'Đường dẫn quản trị này không hợp lệ hoặc tính năng đang trong quá trình cập nhật. Vui lòng quay về Tổng quan bảng điều khiển.',
          'This admin URL does not exist or is currently under development. Please return to your Dashboard.'
        )}
      </p>

      {/* Nút hành động quay lại Admin */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Icon icon="ant-design:dashboard-outlined" className="w-4 h-4" />
          <span>{pick(lang, 'Quay lại Tổng quan Dashboard', 'Back to Dashboard')}</span>
        </Link>

        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all"
        >
          <Icon icon="ant-design:project-outlined" className="w-4 h-4" />
          <span>{pick(lang, 'Quản lý dự án', 'Manage Projects')}</span>
        </Link>
      </div>
    </div>
  );
}
