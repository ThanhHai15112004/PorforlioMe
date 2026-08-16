import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useAdminProjects } from '../../hooks/useAdminProjects';
import { calculateProjectCompleteness, type AdminMockProject } from '../../constants/admin';
import { useLang } from '../../lib/i18n';


// Trang Quản Lý Dự Án — Admin CMS (Đa ngôn ngữ i18n chuẩn qua t('KEY'), chỉ truyền duy nhất 1 key string, không dùng ||)
export default function AdminProjectsPage() {
  const { t } = useLang();

  // Tích hợp Custom Hook quản lý state & API gọi ngầm
  const {
    projects,
    rawProjects,
    loading,
    counts,
    uniqueTags,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    togglePublished,
    toggleFeatured,
    deleteProject,
  } = useAdminProjects();

  // State Modal Xóa
  const [projectToDelete, setProjectToDelete] = useState<AdminMockProject | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Xóa dự án qua API
  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(projectToDelete.id);
      setToastMessage(t('PROJECT_DELETE_SUCCESS'));
      setTimeout(() => setToastMessage(''), 2500);
    } catch (err: any) {
      setToastMessage(err?.message ? String(err.message) : t('PROJECT_DELETE_ERROR'));
      setTimeout(() => setToastMessage(''), 3000);
    } finally {
      setProjectToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Thông Báo */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 border border-blue-500 animate-in fade-in slide-in-from-top-3">
          <Icon icon="ant-design:info-circle-filled" className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Trang Quản Lý Dự Án - Cấu trúc Project Manager */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.07] dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-blue-600 dark:text-blue-400 font-bold">{t('PROJECTS_MANAGER')}</span>
            <span>•</span>
            <span className="text-slate-600 dark:text-slate-300 font-mono">
              {rawProjects.length} {t('PROJECTS_TOTAL')}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('PORTFOLIO_PROJECTS_MANAGER')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('PORTFOLIO_PROJECTS_DESC')}
          </p>
        </div>

        <Link
          to="/admin/projects/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm shrink-0"
        >
          <Icon icon="ant-design:plus-outlined" className="w-4 h-4" />
          <span>{t('CREATE_PROJECT')}</span>
        </Link>
      </div>

      {/* 2. Thanh Bộ Lọc & Tìm Kiếm — Chuẩn Tab Container Pill Segmented Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Segmented Pill Container Bar chuẩn hệ thống */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100/80 dark:bg-white/5 border border-black/[0.05] dark:border-white/10 w-fit overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:project-outlined" className="w-3.5 h-3.5" />
            <span>{t('ALL_PROJECTS')}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'all'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                : 'bg-slate-200/60 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400'
            }`}>
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('published')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'published'
                ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:check-circle-outlined" className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t('PUBLISHED')}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'published'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                : 'bg-slate-200/60 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400'
            }`}>
              {counts.published}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('draft')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'draft'
                ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:file-text-outlined" className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('DRAFTS')}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'draft'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                : 'bg-slate-200/60 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400'
            }`}>
              {counts.draft}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('featured')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'featured'
                ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:star-filled" className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('FEATURED')}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'featured'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                : 'bg-slate-200/60 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400'
            }`}>
              {counts.featured}
            </span>
          </button>
        </div>

        {/* Ô Tìm Kiếm & Lọc Danh Mục */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Icon
              icon="ant-design:search-outlined"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('SEARCH_PROJECT_PLACEHOLDER')}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full border border-black/[0.07] dark:border-white/10 bg-white dark:bg-[#0D0F17] text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all shadow-2xs"
            />
          </div>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3.5 py-1.5 text-xs rounded-full border border-black/[0.07] dark:border-white/10 bg-white dark:bg-[#0D0F17] text-slate-700 dark:text-slate-300 focus:outline-none font-semibold shadow-2xs"
          >
            <option value="all">{t('ALL_CATEGORIES')}</option>
            {uniqueTags
              .filter((tag) => tag !== 'all')
              .map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* 3. Skeleton Loading hoặc Danh Sách Dự Án */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-28 bg-slate-100 dark:bg-slate-800/40 rounded-2xl animate-pulse border border-slate-200/50 dark:border-slate-800"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mx-auto text-blue-500">
            <Icon icon="ant-design:folder-open-outlined" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t('NO_PROJECTS_FOUND')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('NO_PROJECTS_DESC')}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => {
            // Tính toán mức độ hoàn thiện của từng dự án
            const completeness = calculateProjectCompleteness(
              project,
              project.overviewVi ? 4 : 0,
              Boolean(project.overviewEn)
            );

            return (
              <div
                key={project.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 transition-all hover:border-blue-300 dark:hover:border-blue-800 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Cột Trái: Thumbnail & Thông tin chính */}
                  <div className="flex items-start gap-3.5">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0">
                      {(project.images?.[0]?.url || project.coverImage) ? (
                        <img src={project.images?.[0]?.url || project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-blue-500">
                          <Icon icon="ant-design:code-outlined" className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Tiêu đề, Slug, Metadata */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Link to={`/admin/projects/${project.id}/edit`}>{project.title}</Link>
                        </h3>

                        {/* Nút Nổi Bật Star (Chỉ tô màu cho icon khi chọn) */}
                        <button
                          type="button"
                          onClick={() => toggleFeatured(project.id)}
                          className="p-1 rounded-full text-slate-300 hover:text-amber-400 transition-colors"
                          title={project.featured ? t('FEATURED_TOOLTIP_ON') : t('FEATURED_TOOLTIP_OFF')}
                        >
                          <Icon
                            icon="ant-design:star-filled"
                            className={`w-4 h-4 transition-colors ${
                              project.featured ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500">
                        <span>/{project.slug}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
                          {project.tag}
                        </span>
                        {project.role && (
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            • {project.role}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-1">
                          ({t('UPDATED_LABEL')} {project.updatedAt})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cột Phải: Trạng Thái Xuất Bản & Thao Tác */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    {/* Toggle Xuất Bản */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => togglePublished(project.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                          project.isPublished
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            project.isPublished ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        <span>{project.isPublished ? t('PUBLISHED') : t('DRAFTS')}</span>
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-full transition-colors"
                      >
                        {t('EDIT')}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setProjectToDelete(project)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-full transition-colors"
                        title={t('DELETE_PROJECT_TOOLTIP')}
                      >
                        <Icon icon="ant-design:delete-outlined" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Completeness Bar dưới dòng dự án */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                      {t('COMPLETENESS_LABEL')}
                    </span>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all rounded-full ${
                          completeness.percentage === 100
                            ? 'bg-emerald-500'
                            : completeness.percentage >= 70
                            ? 'bg-blue-600'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${completeness.percentage}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 font-mono shrink-0">
                      {completeness.percentage}%
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                    {completeness.statusText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Cảnh Báo Xóa */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-500">
              <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center shrink-0">
                <Icon icon="ant-design:warning-outlined" className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t('CONFIRM_DELETE_TITLE')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('PROJECT_LABEL')} <strong className="text-slate-900 dark:text-white">"{projectToDelete.title}"</strong> {t('DELETE_WARNING_TEXT')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              >
                {t('CANCEL')}
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-rose-600 hover:bg-rose-700 text-white transition-colors"
              >
                {t('CONFIRM_DELETE')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
