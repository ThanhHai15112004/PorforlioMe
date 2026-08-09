import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getMockAdminProjects, type AdminMockProject } from '../../constants';
import { useLang, pick } from '../../lib/i18n';

// Trang Xem Chi Tiết Dự Án Chuyên Biệt trong Admin CMS (/admin/projects/:id)
export default function AdminProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLang();


  const [project, setProject] = useState<AdminMockProject | null>(null);

  // Nạp dữ liệu dự án theo ID
  useEffect(() => {
    if (id) {
      const allProjects = getMockAdminProjects(lang);
      const found = allProjects.find((p) => p.id === Number(id));
      if (found) {
        setProject(found);
      }
    }
  }, [id, lang]);

  // Đổi trạng thái Xuất bản realtime
  const togglePublished = () => {
    if (!project) return;
    setProject((prev) => (prev ? { ...prev, isPublished: !prev.isPublished } : null));
  };

  // Đổi trạng thái Nổi bật realtime
  const toggleFeatured = () => {
    if (!project) return;
    setProject((prev) => (prev ? { ...prev, featured: !prev.featured } : null));
  };

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-white/80 dark:bg-[#0D0F17] rounded-3xl border border-black/[0.07] dark:border-white/10 backdrop-blur-xl">
        <Icon icon="ant-design:warning-outlined" className="w-10 h-10 text-amber-500 mb-3" />
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          {pick(lang, 'Không tìm thấy dự án', 'Project Not Found')}
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          {pick(lang, 'Dự án này có thể đã bị xóa hoặc đường dẫn không đúng.', 'This project may have been deleted or the URL is invalid.')}
        </p>
        <Link
          to="/admin/projects"
          className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all"
        >
          {pick(lang, 'Quay lại danh sách dự án', 'Back to Projects List')}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header Thao Tác Chuyên Nghiệp */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-black/[0.07] dark:border-white/10">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
            title={pick(lang, 'Quay lại danh sách dự án', 'Back to Projects List')}
          >
            <Icon icon="ant-design:arrow-left-outlined" className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-0.5">
              <Link to="/admin/projects" className="hover:text-blue-600 transition-colors">
                {pick(lang, 'Quản lý dự án', 'Projects')}
              </Link>
              <span>/</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">/{project.slug}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Cụm Nút Hành Động */}
        <div className="flex items-center gap-2">
          {/* Nút Toggle Xuất Bản */}
          <button
            onClick={togglePublished}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
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

          {/* Nút Chỉnh Sửa */}
          <Link
            to={`/admin/projects/${project.id}/edit`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Icon icon="ant-design:edit-outlined" className="w-3.5 h-3.5" />
            <span>{pick(lang, 'Sửa dự án', 'Edit Project')}</span>
          </Link>

          {/* Link Live Demo */}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all"
            >
              <span>Live Site</span>
              <Icon icon="ant-design:export-outlined" className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* 2. Khối Banner Hero Dự Án */}
      <div className="glass-card elevate-sm rounded-3xl p-6 md:p-8 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-200/50 dark:border-blue-800/40">
            {project.tag}
          </span>

          <button
            onClick={toggleFeatured}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              project.featured
                ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/50'
                : 'bg-slate-100 dark:bg-white/5 text-slate-500 border border-slate-200/50 dark:border-white/10'
            }`}
          >
            <Icon icon={project.featured ? 'ant-design:star-filled' : 'ant-design:star-outlined'} className="w-3.5 h-3.5 text-amber-400" />
            <span>{project.featured ? pick(lang, 'Dự án Nổi bật', 'Featured Project') : pick(lang, 'Đánh dấu Nổi bật', 'Mark Featured')}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {project.title}
        </h1>

        {project.description && (
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {project.description}
          </p>
        )}

        {/* Tech Stack Badges */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-1.5">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. Bố Cục 2 Cột Chuyên Nghiệp (Main Content & Sidebar Metadata) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột Trái (Main Content - 2 Cột Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bài toán & Giải pháp Case Study */}
          {(project.problemsVi || project.solutionsVi) && (
            <div className="glass-card elevate-sm rounded-3xl p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
                <Icon icon="ant-design:file-text-outlined" className="w-4 h-4 text-blue-600" />
                <span>{pick(lang, 'Tổng quan Case Study kỹ thuật', 'Technical Case Study Overview')}</span>
              </h3>

              {/* Vấn đề */}
              {project.problemsVi && (
                <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 space-y-1">
                  <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                    <Icon icon="ant-design:warning-outlined" className="w-3.5 h-3.5" />
                    <span>{pick(lang, 'Bài toán & Thách thức', 'Problem & Challenge')}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {lang === 'vi' ? project.problemsVi : project.problemsEn}
                  </p>
                </div>
              )}

              {/* Giải pháp */}
              {project.solutionsVi && (
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1">
                  <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <Icon icon="ant-design:check-circle-outlined" className="w-3.5 h-3.5" />
                    <span>{pick(lang, 'Giải pháp kiến trúc', 'Architectural Solution')}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {lang === 'vi' ? project.solutionsVi : project.solutionsEn}
                  </p>
                </div>
              )}

              {/* Kết quả */}
              {project.resultsVi && (
                <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-1">
                  <h4 className="text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                    <Icon icon="ant-design:area-chart-outlined" className="w-3.5 h-3.5" />
                    <span>{pick(lang, 'Kết quả & Số liệu đo lường', 'Results & Metrics')}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {lang === 'vi' ? project.resultsVi : project.resultsEn}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bộ sưu tập Ảnh Gallery nếu có */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="glass-card elevate-sm rounded-3xl p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
                <Icon icon="ant-design:picture-outlined" className="w-4 h-4 text-blue-600" />
                <span>{pick(lang, 'Bộ sưu tập Ảnh màn hình (Gallery)', 'Screenshots Gallery')}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 group relative"
                  >
                    <img
                      src={img.url}
                      alt={`Gallery ${idx}`}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-2.5 bg-white/90 dark:bg-[#0D0F17]/90 text-[11px] font-medium text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-white/5 truncate">
                      {lang === 'vi' ? img.captionVi : img.captionEn}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cột Phải (Sidebar Metadata Card) */}
        <div className="space-y-6">
          <div className="glass-card elevate-sm rounded-3xl p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3">
              {pick(lang, 'Thông tin dự án', 'Project Metadata')}
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  {pick(lang, 'Vai trò', 'Role')}
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {project.role || 'Full-stack Engineer'}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  {pick(lang, 'Khách hàng / Doanh nghiệp', 'Client / Enterprise')}
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {project.client || 'Enterprise'}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  {pick(lang, 'Thời gian thực hiện', 'Timeline')}
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {project.timeline || '2025 – 2026'}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  {pick(lang, 'Cập nhật gần nhất', 'Last Updated')}
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {project.updatedAt}
                </span>
              </div>
            </div>

            {/* Cụm Link Repository & Demo */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all"
                >
                  <span>{pick(lang, 'Xem Demo trực tiếp', 'Live Demo')}</span>
                  <Icon icon="ant-design:export-outlined" className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="ant-design:github-filled" className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </div>
                  <Icon icon="ant-design:export-outlined" className="w-4 h-4 text-slate-400" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
