import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getMockAdminProjects, type AdminMockProject } from '../../constants';
import { useLang, pick } from '../../lib/i18n';
import AdminCaseStudyItemModal, { type CaseStudyItem } from '../../components/admin/projects/AdminCaseStudyItemModal';

type EditTab = 'basic' | 'content' | 'media';

// Trình soạn thảo Tạo mới & Chỉnh sửa Dự án Admin (3 Tab chuyên sâu & Dynamic Case Study Section Builder)
export default function AdminProjectEditPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { lang } = useLang();
  const isEditing = Boolean(id);

  // Active Tab State
  const [activeTab, setActiveTab] = useState<EditTab>('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState<Partial<AdminMockProject>>({
    title: '',
    slug: '',
    tag: 'LMS',
    isPublished: true,
    featured: false,
    role: 'Full-stack Developer',
    client: '',
    timeline: '2025 – 2026',
    techStack: ['Node.js', 'React', 'TypeScript'],
    demoUrl: '',
    githubUrl: '',
    figmaUrl: '',
    description: '',
    coverImage: '',
    gallery: [],
  });

  // State danh sách các mục Case Study động
  const [caseStudyItems, setCaseStudyItems] = useState<CaseStudyItem[]>([
    {
      id: 'cs_1',
      type: 'problem',
      titleVi: 'Hệ thống cũ bị quá tải khi hơn 5,000 học viên truy cập đồng thời',
      titleEn: 'Legacy system lagged severely under 5,000+ concurrent students',
      descVi: 'Thời gian phản hồi API trung bình bị đẩy lên tới 2.5s gây gián đoạn đợt thi học kỳ.',
      descEn: 'Average API latency reached 2.5s causing disruptions during finals exam period.',
      metric: 'API Latency > 2.5s',
    },
    {
      id: 'cs_2',
      type: 'architecture',
      titleVi: 'Thiết kế kiến trúc phân lớp Express + Prisma & Redis Cache Layer',
      titleEn: 'Layered Express + Prisma Architecture & Redis Cache Layer',
      descVi: 'Tối ưu truy vấn cơ sở dữ liệu PostgreSQL và phân luồng hàng chờ Queue HLS streaming.',
      descEn: 'Optimized PostgreSQL database queries and HLS video streaming queue worker threads.',
      metric: 'Latency < 45ms',
    },
    {
      id: 'cs_3',
      type: 'result',
      titleVi: 'Giảm 85% độ trễ API và phục vụ 50,000+ học viên đồng thời',
      titleEn: 'Reduced API latency by 85% and served 50,000+ concurrent students',
      descVi: 'Triển khai thành công đợt thi học kỳ toàn hệ thống không phát sinh bất kỳ lỗi downtime nào.',
      descEn: 'Successfully deployed system-wide finals exam without a single downtime incident.',
      metric: '50,000+ Users',
    },
  ]);

  // Modal State cho Thêm / Sửa mục Case Study
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);
  const [editingCaseStudyItem, setEditingCaseStudyItem] = useState<CaseStudyItem | null>(null);

  // State nháp cho tech stack badge input
  const [techInput, setTechInput] = useState('');

  // Tải dữ liệu ban đầu nếu đang ở chế độ chỉnh sửa (isEditing)
  useEffect(() => {
    if (isEditing && id) {
      const existingProjects = getMockAdminProjects(lang);
      const found = existingProjects.find((p) => p.id === Number(id));
      if (found) {
        setFormData(found);
      }
    }
  }, [id, isEditing, lang]);

  // Tự động tạo Slug chuẩn SEO từ Tiêu đề tiếng Việt
  const generateSlugFromTitle = () => {
    if (!formData.title) return;
    const slugified = formData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setFormData((prev) => ({ ...prev, slug: slugified }));
  };

  // Thêm một Tech Tag mới
  const addTechTag = () => {
    if (!techInput.trim()) return;
    const current = formData.techStack || [];
    if (!current.includes(techInput.trim())) {
      setFormData((prev) => ({ ...prev, techStack: [...current, techInput.trim()] }));
    }
    setTechInput('');
  };

  // Xóa một Tech Tag
  const removeTechTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: (prev.techStack || []).filter((t) => t !== tagToRemove),
    }));
  };

  // Thêm / Cập nhật mục Case Study từ Modal
  const handleSaveCaseStudyItem = (item: CaseStudyItem) => {
    setCaseStudyItems((prev) => {
      const existsIndex = prev.findIndex((i) => i.id === item.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = item;
        return updated;
      }
      return [...prev, item];
    });
  };

  // Xóa mục Case Study
  const handleDeleteCaseStudyItem = (itemId: string) => {
    setCaseStudyItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  // Di chuyển thứ tự mục Case Study lên/xuống
  const moveCaseStudyItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === caseStudyItems.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...caseStudyItems];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setCaseStudyItems(updated);
  };

  // Thêm ảnh vào Gallery
  const addGalleryItem = () => {
    const current = formData.gallery || [];
    setFormData((prev) => ({
      ...prev,
      gallery: [
        ...current,
        {
          url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
          captionVi: 'Ảnh minh họa giao diện',
          captionEn: 'UI Preview screenshot',
        },
      ],
    }));
  };

  // Xóa ảnh khỏi Gallery
  const removeGalleryItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index),
    }));
  };

  // Xử lý gửi Form Lưu dự án
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setToastMessage(
        pick(
          lang,
          isEditing ? 'Đã lưu thay đổi dự án thành công!' : 'Đã tạo dự án mới thành công!',
          isEditing ? 'Project saved successfully!' : 'New project created successfully!'
        )
      );

      setTimeout(() => {
        navigate('/admin/projects');
      }, 800);
    }, 600);
  };

  // Map phân loại Category Badge cho mục Case Study
  const CATEGORY_MAP = {
    problem: { labelVi: 'Bài toán', labelEn: 'Problem', color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200/50' },
    goal: { labelVi: 'Mục tiêu', labelEn: 'Goal', color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200/50' },
    architecture: { labelVi: 'Kiến trúc', labelEn: 'Architecture', color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200/50' },
    feature: { labelVi: 'Tính năng', labelEn: 'Feature', color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 border-cyan-200/50' },
    challenge: { labelVi: 'Thách thức', labelEn: 'Challenge', color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/50' },
    result: { labelVi: 'Kết quả', labelEn: 'Result', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/50' },
    lesson: { labelVi: 'Bài học', labelEn: 'Lesson', color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-200/50' },
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Trang Chỉnh Sửa */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-black/[0.07] dark:border-white/10">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            <Link to="/admin/projects" className="hover:text-blue-600 transition-colors">
              {pick(lang, 'Quản lý dự án', 'Projects Manager')}
            </Link>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              {isEditing ? pick(lang, 'Chỉnh sửa dự án', 'Edit Project') : pick(lang, 'Tạo dự án mới', 'New Project')}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {isEditing
              ? `${pick(lang, 'Chỉnh sửa:', 'Edit:')} ${formData.title || 'Dự án'}`
              : pick(lang, 'Tạo dự án mới', 'Create New Project')}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/projects"
            className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all"
          >
            {pick(lang, 'Hủy bỏ', 'Cancel')}
          </Link>

          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <Icon icon="ant-design:loading-outlined" className="w-4 h-4 animate-spin" />
                <span>{pick(lang, 'Đang lưu...', 'Saving...')}</span>
              </>
            ) : (
              <>
                <Icon icon="ant-design:save-outlined" className="w-4 h-4" />
                <span>{pick(lang, 'Lưu dự án', 'Save Project')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Thông báo Toast thành công */}
      {toastMessage && (
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400">
          <Icon icon="ant-design:check-circle-outlined" className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Điều Hướng 3 Tab Chỉnh Sửa */}
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-black/[0.05] dark:border-white/10 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'basic'
              ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon icon="ant-design:info-circle-outlined" className="w-4 h-4" />
          <span>{pick(lang, '1. Thông tin cơ bản', '1. Basic Info')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'content'
              ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon icon="ant-design:file-text-outlined" className="w-4 h-4" />
          <span>{pick(lang, '2. Case Study 12 phần', '2. Case Study Content')}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[10px] font-bold">
            {caseStudyItems.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'media'
              ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon icon="ant-design:picture-outlined" className="w-4 h-4" />
          <span>{pick(lang, '3. Bộ sưu tập Media', '3. Media Gallery')}</span>
        </button>
      </div>

      {/* Form Soạn Thảo 3 Tab */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ================= TAB 1: THÔNG TIN CƠ BẢN ================= */}
        {activeTab === 'basic' && (
          <div className="glass-card elevate-sm rounded-3xl p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
              <Icon icon="ant-design:info-circle-outlined" className="w-4 h-4 text-blue-600" />
              <span>{pick(lang, 'Cấu hình thông tin cơ bản & đường dẫn', 'Basic Settings & Links')}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Tiêu đề dự án */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {pick(lang, 'Tiêu đề dự án (*)', 'Project Title (*)')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enterprise Learning Management System"
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Slug URL */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {pick(lang, 'Slug URL (*)', 'URL Slug (*)')}
                  </label>
                  <button
                    type="button"
                    onClick={generateSlugFromTitle}
                    className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {pick(lang, 'Tạo từ Tiêu đề', 'Auto-generate')}
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formData.slug || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="enterprise-lms"
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-mono outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Danh mục Tag */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {pick(lang, 'Danh mục Tag', 'Category Tag')}
                </label>
                <select
                  value={formData.tag || 'LMS'}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tag: e.target.value }))}
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0D0F17] border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-semibold outline-none cursor-pointer"
                >
                  <option value="LMS">LMS Enterprise</option>
                  <option value="Backend">Backend Streaming</option>
                  <option value="Frontend">Frontend Web App</option>
                  <option value="DevOps">DevOps Automation</option>
                  <option value="Personal">Personal Portfolio</option>
                </select>
              </div>

              {/* Vai trò */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {pick(lang, 'Vai trò của bạn', 'Your Role')}
                </label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="Lead Full-stack Developer"
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {/* Khách hàng */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {pick(lang, 'Khách hàng / Doanh nghiệp', 'Client / Enterprise')}
                </label>
                <input
                  type="text"
                  value={formData.client || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
                  placeholder="EdTech Enterprise"
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {/* Thời gian */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {pick(lang, 'Thời gian thực hiện', 'Timeline')}
                </label>
                <input
                  type="text"
                  value={formData.timeline || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                  placeholder="2025 – 2026"
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Mô tả ngắn */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Mô tả ngắn tóm tắt', 'Short Summary Description')}
              </label>
              <textarea
                rows={2}
                value={formData.description || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Nền tảng quản lý học tập trực tuyến doanh nghiệp phục vụ 50,000+ học viên đồng thời..."
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>

            {/* Tech Stack Badge Management */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {pick(lang, 'Công nghệ sử dụng (Tech Stack)', 'Tech Stack Badges')}
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechTag())}
                  placeholder="Nhập tên công nghệ (Node.js, React...)"
                  className="h-9 px-3 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 w-64"
                />
                <button
                  type="button"
                  onClick={addTechTag}
                  className="h-9 px-4 rounded-full bg-slate-900 dark:bg-white hover:bg-slate-800 text-white dark:text-slate-900 text-xs font-semibold transition-all"
                >
                  {pick(lang, 'Thêm', 'Add')}
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(formData.techStack || []).map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechTag(tech)}
                      className="hover:text-rose-500"
                    >
                      <Icon icon="ant-design:close-outlined" className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Đường dẫn Demo & Repositories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Link Live Demo
                </label>
                <input
                  type="url"
                  value={formData.demoUrl || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, demoUrl: e.target.value }))}
                  placeholder="https://lms.thanhhai.dev"
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Link GitHub Repository
                </label>
                <input
                  type="url"
                  value={formData.githubUrl || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                  placeholder="https://github.com/ThanhHai15112004/..."
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Cài đặt Xuất bản & Nổi bật */}
            <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-100 dark:border-white/5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isPublished ?? true}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {pick(lang, 'Xuất bản ngay lập tức', 'Publish immediately')}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.featured ?? false}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <Icon icon="ant-design:star-filled" className="w-3.5 h-3.5 text-amber-400" />
                  <span>{pick(lang, 'Đánh dấu làm Dự án Nổi bật', 'Set as Featured Project')}</span>
                </span>
              </label>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CASE STUDY DYNAMIC SECTION BUILDER ================= */}
        {activeTab === 'content' && (
          <div className="glass-card elevate-sm rounded-3xl p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Icon icon="ant-design:file-text-outlined" className="w-4 h-4 text-blue-600" />
                  <span>{pick(lang, 'Trình quản lý các mục nội dung Case Study', 'Case Study Dynamic Section Builder')}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {pick(
                    lang,
                    'Tự do thêm, sửa, xóa và thay đổi thứ tự các phần nội dung của bài Case Study.',
                    'Add, edit, remove, and re-order case study sections dynamically.'
                  )}
                </p>
              </div>

              {/* Nút bấm mở Modal Thêm mục mới */}
              <button
                type="button"
                onClick={() => {
                  setEditingCaseStudyItem(null);
                  setIsCaseStudyModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all self-start sm:self-auto"
              >
                <Icon icon="ant-design:plus-outlined" className="w-4 h-4" />
                <span>{pick(lang, 'Thêm mục nội dung mới', 'Add New Section Item')}</span>
              </button>
            </div>

            {/* Danh sách các mục Case Study đã thêm */}
            {caseStudyItems.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                <Icon icon="ant-design:file-add-outlined" className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {pick(lang, 'Chưa có mục Case Study nào', 'No Case Study items added yet')}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {pick(lang, 'Bấm nút "+ Thêm mục nội dung mới" ở trên để bổ sung bài toán, mục tiêu hoặc kết quả.', 'Click "+ Add New Section Item" above to add problems, goals, or metrics.')}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {caseStudyItems.map((csItem, index) => {
                  const cat = CATEGORY_MAP[csItem.type] || CATEGORY_MAP.problem;

                  return (
                    <div
                      key={csItem.id}
                      className="p-4 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-300/50 transition-all"
                    >
                      <div className="flex items-start gap-3 overflow-hidden">
                        {/* Nút điều hướng thứ tự lên/xuống */}
                        <div className="flex flex-col gap-1 shrink-0 pt-0.5">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => moveCaseStudyItem(index, 'up')}
                            className="p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            title={pick(lang, 'Di chuyển lên', 'Move Up')}
                          >
                            <Icon icon="ant-design:arrow-up-outlined" className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={index === caseStudyItems.length - 1}
                            onClick={() => moveCaseStudyItem(index, 'down')}
                            className="p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            title={pick(lang, 'Di chuyển xuống', 'Move Down')}
                          >
                            <Icon icon="ant-design:arrow-down-outlined" className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-1 truncate">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${cat.color}`}
                            >
                              {lang === 'vi' ? cat.labelVi : cat.labelEn}
                            </span>
                            {csItem.metric && (
                              <span className="px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-[10px] font-mono font-bold">
                                {csItem.metric}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {lang === 'vi' ? csItem.titleVi : csItem.titleEn}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                            {lang === 'vi' ? csItem.descVi : csItem.descEn}
                          </p>
                        </div>
                      </div>

                      {/* Nút Thao tác Sửa / Xóa */}
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCaseStudyItem(csItem);
                            setIsCaseStudyModalOpen(true);
                          }}
                          className="p-2 rounded-full text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                          title={pick(lang, 'Chỉnh sửa mục này', 'Edit Item')}
                        >
                          <Icon icon="ant-design:edit-outlined" className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCaseStudyItem(csItem.id)}
                          className="p-2 rounded-full text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title={pick(lang, 'Xóa mục này', 'Delete Item')}
                        >
                          <Icon icon="ant-design:delete-outlined" className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: MEDIA & CLOUDINARY ================= */}
        {activeTab === 'media' && (
          <div className="glass-card elevate-sm rounded-3xl p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
              <Icon icon="ant-design:picture-outlined" className="w-4 h-4 text-blue-600" />
              <span>{pick(lang, 'Ảnh Cover Thumbnail & Bộ sưu tập Gallery', 'Cover Image & Gallery Assets')}</span>
            </h3>

            {/* Ảnh Cover Thumbnail */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {pick(lang, 'Đường dẫn Ảnh Cover Thumbnail', 'Cover Thumbnail Image URL')}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="url"
                  value={formData.coverImage || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.value }))}
                  placeholder="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                  className="flex-1 h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {formData.coverImage && (
                <div className="mt-3 relative w-full max-w-sm h-40 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Bộ sưu tập Gallery */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {pick(lang, 'Bộ sưu tập Ảnh Gallery', 'Gallery Screenshots')}
                </label>
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 transition-all"
                >
                  <Icon icon="ant-design:plus-outlined" className="w-3.5 h-3.5" />
                  <span>{pick(lang, 'Thêm ảnh mới', 'Add Screenshot')}</span>
                </button>
              </div>

              <div className="space-y-3">
                {(formData.gallery || []).map((item, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                      <img src={item.url} alt="Gallery" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <input
                        type="url"
                        value={item.url}
                        onChange={(e) => {
                          const updated = [...(formData.gallery || [])];
                          updated[index].url = e.target.value;
                          setFormData((prev) => ({ ...prev, gallery: updated }));
                        }}
                        className="w-full h-7 px-2.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs font-mono outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeGalleryItem(index)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Icon icon="ant-design:delete-outlined" className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>

      {/* 4. Modal Thêm / Chỉnh Sửa Mục Case Study */}
      <AdminCaseStudyItemModal
        isOpen={isCaseStudyModalOpen}
        item={editingCaseStudyItem}
        onClose={() => setIsCaseStudyModalOpen(false)}
        onSave={handleSaveCaseStudyItem}
      />
    </div>
  );
}
