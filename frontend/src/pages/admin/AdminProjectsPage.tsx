import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { getMockAdminProjects, type AdminMockProject } from '../../constants';
import { useLang, pick } from '../../lib/i18n';

type FilterTab = 'all' | 'published' | 'draft' | 'featured';

// Trang Quản Lý Dự Án — Admin CMS (Tái thiết kế theo frontend-design skill, liên kết trang chi tiết /admin/projects/:id)
export default function AdminProjectsPage() {
  const { lang } = useLang();

  // State Quản lý danh sách dự án
  const [projects, setProjects] = useState<AdminMockProject[]>(() => getMockAdminProjects(lang));
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // State Modal Xóa
  const [projectToDelete, setProjectToDelete] = useState<AdminMockProject | null>(null);

  // Thao tác đổi trạng thái Xuất bản realtime (Optimistic Update)
  const togglePublished = (id: number) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPublished: !item.isPublished } : item))
    );
  };

  // Thao tác đổi trạng thái Nổi bật realtime (Optimistic Update)
  const toggleFeatured = (id: number) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, featured: !item.featured } : item))
    );
  };

  // Xóa dự án khỏi danh sách
  const handleDeleteConfirm = () => {
    if (!projectToDelete) return;
    setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
    setProjectToDelete(null);
  };

  // Tính toán số lượng dự án theo từng Tab
  const counts = useMemo(() => {
    return {
      all: projects.length,
      published: projects.filter((p) => p.isPublished).length,
      draft: projects.filter((p) => !p.isPublished).length,
      featured: projects.filter((p) => p.featured).length,
    };
  }, [projects]);

  // Danh sách Tag danh mục duy nhất
  const uniqueTags = useMemo(() => {
    const tags = Array.from(new Set(projects.map((p) => p.tag)));
    return ['all', ...tags];
  }, [projects]);

  // Lọc danh sách dự án theo Tab, Từ khóa tìm kiếm & Tag
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Lọc theo Tab
      if (activeTab === 'published' && !project.isPublished) return false;
      if (activeTab === 'draft' && project.isPublished) return false;
      if (activeTab === 'featured' && !project.featured) return false;

      // 2. Lọc theo Tag
      if (selectedTag !== 'all' && project.tag !== selectedTag) return false;

      // 3. Lọc theo Từ khóa tìm kiếm
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = project.title.toLowerCase().includes(q);
        const matchSlug = project.slug.toLowerCase().includes(q);
        const matchTag = project.tag.toLowerCase().includes(q);
        if (!matchTitle && !matchSlug && !matchTag) return false;
      }

      return true;
    });
  }, [projects, activeTab, selectedTag, searchQuery]);

  return (
    <div className="space-y-6">
      {/* 1. Header Trang Quản Lý Dự Án */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-black/[0.07] dark:border-white/10">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            <span>Thanh Hải</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              {pick(lang, 'Quản lý dự án', 'Projects Manager')}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {pick(lang, 'Danh sách dự án portfolio', 'Portfolio Projects List')}
          </h1>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Icon icon="ant-design:plus-outlined" className="w-4 h-4" />
          <span>{pick(lang, 'Tạo dự án mới', 'New Project')}</span>
        </Link>
      </div>

      {/* 2. Thanh 4 Tab Lọc & Bộ Tìm Kiếm */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* 4 Tab lọc chính (Sử dụng Ant Design Icons) */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100/80 dark:bg-white/5 border border-black/[0.05] dark:border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:appstore-outlined" className="w-3.5 h-3.5" />
            <span>{pick(lang, 'Tất cả', 'All')}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[10px] font-bold">
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('published')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'published'
                ? 'bg-white dark:bg-[#0D0F17] text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:check-circle-outlined" className="w-3.5 h-3.5 text-emerald-500" />
            <span>{pick(lang, 'Đã xuất bản', 'Published')}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[10px] font-bold">
              {counts.published}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('draft')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'draft'
                ? 'bg-white dark:bg-[#0D0F17] text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:edit-outlined" className="w-3.5 h-3.5 text-amber-500" />
            <span>{pick(lang, 'Bản nháp', 'Drafts')}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-50 dark:bg-amber-950/60 text-[10px] font-bold">
              {counts.draft}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('featured')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'featured'
                ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:star-filled" className="w-3.5 h-3.5 text-amber-400" />
            <span>{pick(lang, 'Nổi bật', 'Featured')}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[10px] font-bold">
              {counts.featured}
            </span>
          </button>
        </div>

        {/* Thanh Tìm Kiếm & Dropdown Lọc theo Tag */}
        <div className="flex items-center gap-2">
          {/* Input Tìm kiếm */}
          <div className="relative flex-1 sm:w-64">
            <Icon
              icon="ant-design:search-outlined"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={pick(lang, 'Tìm theo tên, slug, tag...', 'Search title, slug...')}
              className="w-full h-9 pl-9 pr-3 rounded-full bg-white/80 dark:bg-white/5 border border-black/[0.07] dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Select Tag Category */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="h-9 px-3 rounded-full bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold outline-none cursor-pointer hover:border-blue-500 transition-all"
          >
            <option value="all">{pick(lang, 'Tất cả danh mục', 'All Tags')}</option>
            {uniqueTags
              .filter((t) => t !== 'all')
              .map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* 3. Danh Sách Dự Án (Bố cục Desktop Table & Mobile Card List) */}
      <div className="glass-card elevate-sm rounded-3xl bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl overflow-hidden shadow-sm">
        {filteredProjects.length === 0 ? (
          /* Trạng thái trống */
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 mb-3">
              <Icon icon="ant-design:inbox-outlined" className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              {pick(lang, 'Không tìm thấy dự án nào', 'No projects found')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              {pick(
                lang,
                'Thử thay đổi từ khóa tìm kiếm hoặc chuyển sang Tab khác.',
                'Try adjusting your search terms or switching tabs.'
              )}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop View: Data Table (màn hình ≥ 768px) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/[0.07] dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4">{pick(lang, 'Dự án & Slug', 'Project & Slug')}</th>
                    <th className="py-3.5 px-4">{pick(lang, 'Danh mục', 'Category')}</th>
                    <th className="py-3.5 px-4">{pick(lang, 'Trạng thái', 'Status')}</th>
                    <th className="py-3.5 px-4">{pick(lang, 'Nổi bật', 'Featured')}</th>
                    <th className="py-3.5 px-4">{pick(lang, 'Cập nhật', 'Updated')}</th>
                    <th className="py-3.5 px-4 text-right">{pick(lang, 'Thao tác', 'Actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.05] dark:divide-white/5 text-xs">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-blue-50/30 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Tiêu đề & Slug (Liên kết tới trang chi tiết mới /admin/projects/:id) */}
                      <td className="py-3.5 px-4">
                        <Link
                          to={`/admin/projects/${project.id}`}
                          className="flex items-center gap-3 group/link"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200/50 dark:border-blue-800/40 group-hover/link:bg-blue-600 group-hover/link:text-white transition-all">
                            {project.tag}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors">
                              {project.title}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400">/{project.slug}</span>
                          </div>
                        </Link>
                      </td>

                      {/* Tag */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-[11px] border border-slate-200/50 dark:border-white/10">
                          {project.tag}
                        </span>
                      </td>

                      {/* Công tắc Xuất bản realtime */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => togglePublished(project.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
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
                              ? pick(lang, 'Đã xuất bản', 'Published')
                              : pick(lang, 'Bản nháp', 'Draft')}
                          </span>
                        </button>
                      </td>

                      {/* Nút Sao Nổi bật realtime */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleFeatured(project.id)}
                          className={`p-1.5 rounded-full transition-colors ${
                            project.featured
                              ? 'text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                              : 'text-slate-300 dark:text-slate-600 hover:text-slate-500'
                          }`}
                          title={project.featured ? pick(lang, 'Bỏ nổi bật', 'Unstar') : pick(lang, 'Đánh dấu Nổi bật', 'Set Featured')}
                        >
                          <Icon icon={project.featured ? 'ant-design:star-filled' : 'ant-design:star-outlined'} className="w-4 h-4" />
                        </button>
                      </td>

                      {/* Ngày cập nhật */}
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {project.updatedAt}
                      </td>

                      {/* Nút Thao Tác (Xem chi tiết trang mới, Sửa, Xóa) */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Xem Chi Tiết Trang Mới */}
                          <Link
                            to={`/admin/projects/${project.id}`}
                            className="p-1.5 rounded-full text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                            title={pick(lang, 'Xem trang chi tiết', 'View Full Detail Page')}
                          >
                            <Icon icon="ant-design:eye-outlined" className="w-4 h-4" />
                          </Link>

                          {/* Chỉnh sửa */}
                          <Link
                            to={`/admin/projects/${project.id}/edit`}
                            className="p-1.5 rounded-full text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                            title={pick(lang, 'Chỉnh sửa dự án', 'Edit Project')}
                          >
                            <Icon icon="ant-design:edit-outlined" className="w-4 h-4" />
                          </Link>

                          {/* Xóa */}
                          <button
                            onClick={() => setProjectToDelete(project)}
                            className="p-1.5 rounded-full text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title={pick(lang, 'Xóa dự án', 'Delete Project')}
                          >
                            <Icon icon="ant-design:delete-outlined" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View: Card List (màn hình < 768px) */}
            <div className="md:hidden divide-y divide-black/[0.05] dark:divide-white/5">
              {filteredProjects.map((project) => (
                <div key={project.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      to={`/admin/projects/${project.id}`}
                      className="flex items-center gap-2.5 overflow-hidden"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200/50 dark:border-blue-800/40">
                        {project.tag}
                      </div>
                      <div className="truncate">
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">
                          {project.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">/{project.slug}</span>
                      </div>
                    </Link>

                    <button
                      onClick={() => toggleFeatured(project.id)}
                      className={`p-1 rounded-full ${
                        project.featured ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      <Icon icon={project.featured ? 'ant-design:star-filled' : 'ant-design:star-outlined'} className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => togglePublished(project.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        project.isPublished
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/50'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/50'
                      }`}
                    >
                      <Icon
                        icon={project.isPublished ? 'ant-design:check-circle-outlined' : 'ant-design:edit-outlined'}
                        className="w-3 h-3"
                      />
                      <span>
                        {project.isPublished
                          ? pick(lang, 'Đã xuất bản', 'Published')
                          : pick(lang, 'Bản nháp', 'Draft')}
                      </span>
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/projects/${project.id}`}
                        className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-medium"
                      >
                        {pick(lang, 'Xem', 'View')}
                      </Link>
                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold"
                      >
                        {pick(lang, 'Sửa', 'Edit')}
                      </Link>
                      <button
                        onClick={() => setProjectToDelete(project)}
                        className="px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-medium"
                      >
                        {pick(lang, 'Xóa', 'Delete')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 4. Modal Xác Nhận Xóa Dự Án */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#0D0F17] rounded-3xl p-6 border border-black/[0.07] dark:border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center border border-rose-200 dark:border-rose-900/50">
                <Icon icon="ant-design:warning-outlined" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {pick(lang, 'Xác nhận xóa dự án?', 'Confirm Delete Project?')}
                </h3>
                <p className="text-xs text-slate-500">
                  {pick(lang, 'Hành động này không thể hoàn tác.', 'This action cannot be undone.')}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.02] p-3 rounded-2xl border border-slate-100 dark:border-white/5">
              {pick(lang, 'Bạn có chắc chắn muốn xóa dự án:', 'Are you sure you want to delete:')}{' '}
              <strong className="text-slate-900 dark:text-white">{projectToDelete.title}</strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all"
              >
                {pick(lang, 'Hủy bỏ', 'Cancel')}
              </button>

              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-500/20 active:scale-95 transition-all"
              >
                {pick(lang, 'Đồng ý xóa', 'Yes, Delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
