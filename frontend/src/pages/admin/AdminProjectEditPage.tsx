import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAdminProjectDetail } from '../../hooks/useAdminProjectDetail';
import { useLang } from '../../lib/i18n';

// Import các sub-component chuyên biệt đã được module hóa
import TechStackPicker from '../../components/admin/projects/TechStackPicker';
import ProjectLivePreviewCard from '../../components/admin/projects/ProjectLivePreviewCard';
import ProjectCompletionChecklist from '../../components/admin/projects/ProjectCompletionChecklist';
import CaseStudyBuilder from '../../components/admin/projects/CaseStudyBuilder';
import MediaGalleryEditor from '../../components/admin/projects/MediaGalleryEditor';
import AdminProjectLivePreviewModal from '../../components/admin/projects/AdminProjectLivePreviewModal';

type SectionTab = 'general' | 'tech_links' | 'casestudy' | 'media' | 'seo';

// Trình Biên Tập & Tạo Mới Dự Án Portfolio (Có Nút & Modal Xem Trước Lấy Giao Diện Client Gốc Làm Chuẩn)
export default function AdminProjectEditPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { t, lang } = useLang();

  // Section Tab đang hoạt động
  const [activeSection, setActiveSection] = useState<SectionTab>('general');

  // State Modal Xuất Bản, Modal Xem Trước Live Preview & Toast
  const [toastMessage, setToastMessage] = useState('');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Tích hợp Custom Hook quản lý dữ liệu và thao tác API cho Editor
  const {
    formData,
    caseStudyItems,
    setCaseStudyItems,
    loading,
    isSaving,
    error,
    isEditing,
    hasUnsavedChanges,
    lastSavedTime,
    handleInputChange,
    saveDraft,
    publishProject,
  } = useAdminProjectDetail(id);

  // Tự động tạo Slug chuẩn SEO từ Tiêu đề
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
    handleInputChange('slug', slugified);
  };

  // Xử lý Lưu Nháp (Save Draft) qua Hook & API
  const handleSaveDraft = async () => {
    const success = await saveDraft();
    if (success) {
      setToastMessage(isEditing ? 'Đã lưu bản nháp dự án thành công!' : 'Đã tạo bản nháp dự án mới thành công!');
      setTimeout(() => {
        setToastMessage('');
        if (!isEditing) {
          navigate('/admin/projects');
        }
      }, 1200);
    }
  };

  // Xử lý Xuất bản Dự án (Publish) qua Hook & API
  const handleConfirmPublish = async () => {
    setIsPublishModalOpen(false);
    const success = await publishProject();
    if (success) {
      setToastMessage(isEditing ? 'Đã cập nhật xuất bản dự án thành công!' : 'Chúc mừng! Bạn đã tạo và xuất bản dự án mới thành công.');
      setTimeout(() => {
        setToastMessage('');
        navigate('/admin/projects');
      }, 1200);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold">Đang tải dữ liệu dự án từ máy chủ...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast thông báo lưu thành công */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 bg-blue-600 text-white rounded-full shadow-2xl text-xs font-semibold flex items-center gap-2 border border-blue-500 animate-in fade-in slide-in-from-top-3">
          <Icon icon="ant-design:check-circle-filled" className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Thông báo Lỗi nếu có */}
      {error && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-semibold flex items-center gap-2 border border-rose-200 dark:border-rose-800">
          <Icon icon="ant-design:warning-outlined" className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. TOP ACTION BAR: Header Điều Hướng & Trạng Thái Lưu */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/[0.07] dark:border-white/10">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="p-2 rounded-full text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-black/[0.07] dark:border-white/10"
            title="Quay lại danh sách dự án"
          >
            <Icon icon="ant-design:arrow-left-outlined" className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {isEditing ? `Chỉnh sửa dự án: ${formData.title || ''}` : 'Tạo dự án mới'}
              </h1>
              <span
                className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                  formData.isPublished
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                }`}
              >
                {formData.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              {hasUnsavedChanges ? (
                <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Chưa lưu thay đổi
                </span>
              ) : lastSavedTime ? (
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                  <Icon icon="ant-design:check-outlined" className="w-3.5 h-3.5 text-emerald-500" />
                  Đã lưu lúc {lastSavedTime}
                </span>
              ) : (
                <span>Điền thông tin và bấm Lưu nháp hoặc Xuất bản</span>
              )}
            </div>
          </div>
        </div>

        {/* Nút Xem Trước Live & Các Nút Lưu */}
        <div className="flex flex-wrap items-center gap-3">


          {/* Nút XEM TRƯỚC (Live Preview Modal) */}
          <button
            type="button"
            onClick={() => setIsPreviewModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <Icon icon="ant-design:eye-outlined" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{t('LIVE_PREVIEW')}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="px-4 py-2 text-xs font-semibold rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            {isSaving ? 'Đang lưu...' : 'Lưu nháp'}
          </button>

          <button
            type="button"
            onClick={() => setIsPublishModalOpen(true)}
            disabled={isSaving}
            className="px-4 py-2 text-xs font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
          >
            <Icon icon="ant-design:send-outlined" className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cập nhật Xuất bản' : 'Xuất bản dự án'}</span>
          </button>
        </div>
      </div>

      {/* 2. SECTION NAVIGATION TABS — Mẫu Segmented Pill Container Bar 100% */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100/80 dark:bg-white/5 border border-black/[0.05] dark:border-white/10 overflow-x-auto w-fit">
        <button
          onClick={() => setActiveSection('general')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
            activeSection === 'general'
              ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon icon="ant-design:file-text-outlined" className="w-3.5 h-3.5" />
          <span>1. Thông tin chung</span>
        </button>

        <button
          onClick={() => setActiveSection('tech_links')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
            activeSection === 'tech_links'
              ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon icon="ant-design:code-outlined" className="w-3.5 h-3.5" />
          <span>2. Công nghệ & Liên kết</span>
        </button>

        <button
          onClick={() => setActiveSection('casestudy')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
            activeSection === 'casestudy'
              ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon icon="ant-design:read-outlined" className="w-3.5 h-3.5" />
          <span>3. Case Study</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            activeSection === 'casestudy'
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
              : 'bg-slate-200/60 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400'
          }`}>
            {caseStudyItems.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('media')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
            activeSection === 'media'
              ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon icon="ant-design:picture-outlined" className="w-3.5 h-3.5" />
          <span>4. Hình ảnh & Media</span>
        </button>

        <button
          onClick={() => setActiveSection('seo')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
            activeSection === 'seo'
              ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Icon icon="ant-design:global-outlined" className="w-3.5 h-3.5" />
          <span>5. Thẻ SEO</span>
        </button>
      </div>

      {/* 3. BỐ CỤC 2 CỘT CHÍNH: NỘI DUNG SECTION (CỘT TRÁI) & PREVIEW + CHECKLIST (CỘT PHẢI) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CỘT TRÁI (lg:col-span-8): NỘI DUNG CÁC SECTION EDIT FORM */}
        <div className="lg:col-span-8 space-y-6">
          {/* SECTION 1: THÔNG TIN CHUNG DỰ ÁN */}
          {activeSection === 'general' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5 shadow-sm">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  THÔNG TIN DỰ ÁN (PROJECT IDENTITY)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Định danh tên dự án, đường dẫn slug SEO và phân loại vai trò.
                </p>
              </div>

              {/* Tên dự án & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tên dự án *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    onBlur={generateSlugFromTitle}
                    placeholder="VD: Enterprise Learning Management System"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all font-semibold"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Đường dẫn Slug (URL) *
                    </label>
                    <button
                      type="button"
                      onClick={generateSlugFromTitle}
                      className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Tạo từ tên dự án
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="enterprise-lms"
                    className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phân loại Tag & Vai trò */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Danh mục Tag *
                  </label>
                  <select
                    value={formData.tag || 'LMS'}
                    onChange={(e) => handleInputChange('tag', e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none font-semibold"
                  >
                    <option value="LMS">LMS Enterprise</option>
                    <option value="Backend">Backend / API</option>
                    <option value="Frontend">Frontend / Web</option>
                    <option value="DevOps">DevOps & Cloud</option>
                    <option value="Personal">Dự án Cá nhân</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Vai trò chính
                  </label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="VD: Full-stack Developer"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Thời gian thực hiện
                  </label>
                  <input
                    type="text"
                    value={formData.timeline || ''}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    placeholder="VD: 2025 – 2026"
                    className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Mô tả ngắn dự án */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Mô tả ngắn dự án ({lang === 'vi' ? 'Tiếng Việt' : 'English'})
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {(formData.description || '').length} / 180 ký tự
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={
                    lang === 'vi'
                      ? formData.description || ''
                      : formData.overviewEn || ''
                  }
                  onChange={(e) =>
                    handleInputChange(
                      lang === 'vi' ? 'description' : 'overviewEn',
                      e.target.value
                    )
                  }
                  placeholder="Nhập mô tả ngắn gọn giúp thu hút người đọc trên card dự án..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all resize-y"
                />
              </div>
            </div>
          )}

          {/* SECTION 2: CÔNG NGHỆ SỬ DỤNG & LIÊN KẾT */}
          {activeSection === 'tech_links' && (
            <div className="space-y-6">
              {/* Tech Stack Picker */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    CÔNG NGHỆ SỬ DỤNG (TECH STACK)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Quản lý danh sách các công nghệ, framework và thư viện được dùng trong dự án này.
                  </p>
                </div>

                <TechStackPicker
                  selectedTechs={formData.techStack || []}
                  onChange={(techs) => handleInputChange('techStack', techs)}
                />
              </div>

              {/* Đường dẫn liên kết Demo, GitHub, Figma */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    ĐƯỜNG DẪN LIÊN KẾT (PROJECT LINKS)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Các đường dẫn trực tiếp giúp người xem truy cập sản phẩm hoặc mã nguồn.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                      <Icon icon="ant-design:link-outlined" className="w-3.5 h-3.5 text-blue-500" />
                      <span>URL Xem Demo trực tiếp</span>
                    </label>
                    <input
                      type="text"
                      value={formData.demoUrl || ''}
                      onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                      placeholder="https://demo.thanhhai.dev"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                      <Icon icon="ant-design:github-outlined" className="w-3.5 h-3.5 text-slate-800 dark:text-white" />
                      <span>URL Mã nguồn GitHub</span>
                    </label>
                    <input
                      type="text"
                      value={formData.githubUrl || ''}
                      onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                      <Icon icon="ant-design:skin-outlined" className="w-3.5 h-3.5 text-purple-500" />
                      <span>URL Bản vẽ Figma</span>
                    </label>
                    <input
                      type="text"
                      value={formData.figmaUrl || ''}
                      onChange={(e) => handleInputChange('figmaUrl', e.target.value)}
                      placeholder="https://figma.com/file/..."
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: NỘI DUNG CASE STUDY (CASE STUDY BUILDER 12 PHẦN) */}
          {activeSection === 'casestudy' && (
            <CaseStudyBuilder
              items={caseStudyItems}
              onChange={(updated) => {
                setCaseStudyItems(updated);
              }}
              activeLang={lang}
            />
          )}

          {/* SECTION 4: HÌNH ẢNH & MEDIA GALLERY */}
          {activeSection === 'media' && (
            <MediaGalleryEditor
              coverImage={formData.coverImage || ''}
              onCoverChange={(url) => handleInputChange('coverImage', url)}
            />
          )}

          {/* SECTION 5: THẺ SEO META */}
          {activeSection === 'seo' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  CẤU HÌNH TỐI ƯU HÓA TÌM KIẾM (SEO META)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tùy chỉnh thẻ tiêu đề và mô tả xuất hiện khi tìm kiếm Google hoặc chia sẻ liên kết trên Mạng xã hội.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Thẻ SEO Title
                </label>
                <input
                  type="text"
                  value={formData.title ? `${formData.title} | Thanh Hải Portfolio` : ''}
                  readOnly
                  placeholder="Tiêu đề bài viết SEO..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Thẻ SEO Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Mô tả SEO xuất hiện trên kết quả tìm kiếm..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none resize-y"
                />
              </div>
            </div>
          )}
        </div>

        {/* CỘT PHẢI (lg:col-span-4): STICKY WIDGET CHECKLIST HOÀN THIỆN & LIVE PREVIEW */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          {/* Checklist Hoàn Thiện */}
          <ProjectCompletionChecklist
            project={formData}
            caseStudyCount={caseStudyItems.length}
            hasEnTranslation={caseStudyItems.some((i) => Boolean(i.titleEn || i.descEn))}
          />

          {/* Live Preview Card */}
          <ProjectLivePreviewCard project={formData} />
        </div>
      </div>

      {/* MODAL XEM TRƯỚC GIAO DIỆN CLIENT GỐC (LIVE PREVIEW MODAL) */}
      {isPreviewModalOpen && (
        <AdminProjectLivePreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          project={formData}
          caseStudyItems={caseStudyItems}
        />
      )}

      {/* MODAL XÁC NHẬN XUẤT BẢN */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Icon icon="ant-design:send-outlined" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isEditing ? 'Cập nhật xuất bản dự án?' : 'Xuất bản dự án mới?'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dự án sẽ xuất hiện trực tiếp trên trang Portfolio cá nhân của bạn.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Kiểm tra thông tin trước khi xuất bản:
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>• Tiêu đề dự án:</span>
                <span className="font-semibold">{formData.title || 'Chưa nhập'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>• Case Study:</span>
                <span className="font-semibold">{caseStudyItems.length} mục nội dung</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>• Ảnh đại diện:</span>
                <span className="font-semibold">{formData.coverImage ? 'Đã có' : 'Chưa có'}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              >
                Quay lại chỉnh sửa
              </button>
              <button
                type="button"
                onClick={handleConfirmPublish}
                disabled={isSaving}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Đang gửi...' : 'Xác nhận Xuất bản'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
