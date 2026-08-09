import { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  getMockAdminSkills,
  getMockAdminTimeline,
  type AdminSkill,
  type AdminTimelineItem,
} from '../../constants';
import { useLang, pick } from '../../lib/i18n';

type ActiveTab = 'skills' | 'timeline';

// Trang Quản Lý Kỹ Năng & Hành Trình Sự Nghiệp Admin (/admin/skills)
export default function AdminSkillsPage() {
  const { lang } = useLang();

  // State Quản lý Tab chính
  const [activeTab, setActiveTab] = useState<ActiveTab>('skills');

  // State Danh sách Kỹ năng & Timeline
  const [skills, setSkills] = useState<AdminSkill[]>(() => getMockAdminSkills());
  const [timeline, setTimeline] = useState<AdminTimelineItem[]>(() => getMockAdminTimeline());

  // State Toast notification
  const [toastMessage, setToastMessage] = useState('');

  // State Modal Kỹ Năng
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<AdminSkill | null>(null);
  const [skillForm, setSkillForm] = useState<Partial<AdminSkill>>({
    name: '',
    category: 'backend',
    icon: 'ant-design:code-outlined',
    level: 80,
  });

  // State Modal Timeline
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [editingTimeline, setEditingTimeline] = useState<AdminTimelineItem | null>(null);
  const [timelineForm, setTimelineForm] = useState<Partial<AdminTimelineItem>>({
    period: '2025 – 2026',
    titleVi: '',
    titleEn: '',
    organizationVi: '',
    organizationEn: '',
    descriptionVi: '',
    descriptionEn: '',
    category: 'experience',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Mở Modal Kỹ năng (Thêm/Sửa)
  const handleOpenSkillModal = (skill?: AdminSkill) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillForm(skill);
    } else {
      setEditingSkill(null);
      setSkillForm({
        name: '',
        category: 'backend',
        icon: 'ant-design:code-outlined',
        level: 80,
      });
    }
    setIsSkillModalOpen(true);
  };

  // Lưu Kỹ năng
  const handleSaveSkill = () => {
    if (!skillForm.name?.trim()) return;

    if (editingSkill) {
      setSkills((prev) =>
        prev.map((s) => (s.id === editingSkill.id ? ({ ...s, ...skillForm } as AdminSkill) : s))
      );
      showToast(pick(lang, 'Đã cập nhật kỹ năng thành công!', 'Skill updated successfully!'));
    } else {
      const newSkill: AdminSkill = {
        id: `s_${Date.now()}`,
        name: skillForm.name.trim(),
        category: skillForm.category || 'backend',
        icon: skillForm.icon || 'ant-design:code-outlined',
        level: skillForm.level || 80,
      };
      setSkills((prev) => [...prev, newSkill]);
      showToast(pick(lang, 'Đã thêm kỹ năng mới thành công!', 'New skill added successfully!'));
    }

    setIsSkillModalOpen(false);
  };

  // Xóa Kỹ năng
  const handleDeleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
    showToast(pick(lang, 'Đã xóa kỹ năng!', 'Skill deleted!'));
  };

  // Mở Modal Timeline (Thêm/Sửa)
  const handleOpenTimelineModal = (item?: AdminTimelineItem) => {
    if (item) {
      setEditingTimeline(item);
      setTimelineForm(item);
    } else {
      setEditingTimeline(null);
      setTimelineForm({
        period: '2025 – 2026',
        titleVi: '',
        titleEn: '',
        organizationVi: '',
        organizationEn: '',
        descriptionVi: '',
        descriptionEn: '',
        category: 'experience',
      });
    }
    setIsTimelineModalOpen(true);
  };

  // Lưu Timeline
  const handleSaveTimeline = () => {
    if (!timelineForm.titleVi?.trim()) return;

    if (editingTimeline) {
      setTimeline((prev) =>
        prev.map((t) => (t.id === editingTimeline.id ? ({ ...t, ...timelineForm } as AdminTimelineItem) : t))
      );
      showToast(pick(lang, 'Đã cập nhật mốc hành trình!', 'Timeline item updated!'));
    } else {
      const newItem: AdminTimelineItem = {
        id: `t_${Date.now()}`,
        period: timelineForm.period || '2025 – 2026',
        titleVi: timelineForm.titleVi.trim(),
        titleEn: timelineForm.titleEn?.trim() || timelineForm.titleVi.trim(),
        organizationVi: timelineForm.organizationVi?.trim() || '',
        organizationEn: timelineForm.organizationEn?.trim() || timelineForm.organizationVi?.trim() || '',
        descriptionVi: timelineForm.descriptionVi?.trim() || '',
        descriptionEn: timelineForm.descriptionEn?.trim() || timelineForm.descriptionVi?.trim() || '',
        category: timelineForm.category || 'experience',
      };
      setTimeline((prev) => [newItem, ...prev]);
      showToast(pick(lang, 'Đã thêm mốc hành trình mới!', 'New timeline item added!'));
    }

    setIsTimelineModalOpen(false);
  };

  // Xóa Timeline
  const handleDeleteTimeline = (id: string) => {
    setTimeline((prev) => prev.filter((t) => t.id !== id));
    showToast(pick(lang, 'Đã xóa mốc hành trình!', 'Timeline item deleted!'));
  };

  // Category Filter Map
  const CATEGORY_TITLE = {
    backend: { vi: 'Backend & Kiến trúc Hệ thống', en: 'Backend & System Architecture' },
    frontend: { vi: 'Frontend Web Application', en: 'Frontend Web Application' },
    devops: { vi: 'DevOps & Cloud Automation', en: 'DevOps & Cloud Automation' },
    tools: { vi: 'Công cụ & Cơ sở dữ liệu', en: 'Tools & Databases' },
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Trang Quản Lý Kỹ Năng & Timeline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-black/[0.07] dark:border-white/10">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            <span>Thanh Hải</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              {pick(lang, 'Kỹ năng & Hành trình', 'Skills & Timeline')}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {pick(lang, 'Quản lý năng lực chuyên môn', 'Professional Competencies')}
          </h1>
        </div>

        {/* Thông báo Toast */}
        {toastMessage && (
          <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <Icon icon="ant-design:check-circle-outlined" className="w-3.5 h-3.5" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* 2. Điều Hướng 2 Tab Chính */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-black/[0.05] dark:border-white/10 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'skills'
                ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:code-outlined" className="w-4 h-4" />
            <span>{pick(lang, 'Kỹ năng kỹ thuật', 'Tech Skills')}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[10px] font-bold">
              {skills.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'timeline'
                ? 'bg-white dark:bg-[#0D0F17] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon icon="ant-design:history-outlined" className="w-4 h-4" />
            <span>{pick(lang, 'Hành trình sự nghiệp', 'Career Timeline')}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[10px] font-bold">
              {timeline.length}
            </span>
          </button>
        </div>

        {/* Nút Thêm mới linh hoạt theo Tab */}
        {activeTab === 'skills' ? (
          <button
            type="button"
            onClick={() => handleOpenSkillModal()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Icon icon="ant-design:plus-outlined" className="w-4 h-4" />
            <span>{pick(lang, 'Thêm kỹ năng mới', 'Add New Skill')}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleOpenTimelineModal()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Icon icon="ant-design:plus-outlined" className="w-4 h-4" />
            <span>{pick(lang, 'Thêm mốc hành trình', 'Add Timeline Item')}</span>
          </button>
        )}
      </div>

      {/* ================= TAB 1: QUẢN LÝ KỸ NĂNG ================= */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          {(['backend', 'frontend', 'devops', 'tools'] as const).map((catKey) => {
            const catSkills = skills.filter((s) => s.category === catKey);
            if (catSkills.length === 0) return null;

            return (
              <div
                key={catKey}
                className="glass-card elevate-sm rounded-3xl p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-4"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3">
                  {lang === 'vi' ? CATEGORY_TITLE[catKey].vi : CATEGORY_TITLE[catKey].en}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-4 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 flex items-center justify-between gap-4 hover:border-blue-300/50 transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200/50">
                          <Icon icon={skill.icon || 'ant-design:code-outlined'} className="w-4 h-4" />
                        </div>

                        <div className="flex-1 space-y-1 truncate">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                            <span className="truncate">{skill.name}</span>
                            <span className="font-mono text-blue-600 dark:text-blue-400">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Thanh progress bar */}
                          <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full transition-all duration-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Nút Thao Tác Sửa / Xóa */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenSkillModal(skill)}
                          className="p-1.5 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                          title={pick(lang, 'Chỉnh sửa', 'Edit')}
                        >
                          <Icon icon="ant-design:edit-outlined" className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title={pick(lang, 'Xóa', 'Delete')}
                        >
                          <Icon icon="ant-design:delete-outlined" className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= TAB 2: HÀNH TRÌNH SỰ NGHIỆP ================= */}
      {activeTab === 'timeline' && (
        <div className="glass-card elevate-sm rounded-3xl p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-3">
            {pick(lang, 'Các mốc thời gian sự nghiệp & Học vấn', 'Career & Education Timeline Milestones')}
          </h3>

          <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 pl-6 space-y-8">
            {timeline.map((item) => (
              <div key={item.id} className="relative group">
                {/* Dấu chấm mốc thời gian */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white dark:border-[#0D0F17] shadow-sm" />

                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 space-y-2 hover:border-blue-300/50 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-mono text-[11px] font-bold border border-blue-200/50">
                        {item.period}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.category === 'experience'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50'
                            : item.category === 'award'
                            ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/50'
                            : 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200/50'
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenTimelineModal(item)}
                        className="p-1.5 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                        title={pick(lang, 'Chỉnh sửa', 'Edit')}
                      >
                        <Icon icon="ant-design:edit-outlined" className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteTimeline(item.id)}
                        className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title={pick(lang, 'Xóa', 'Delete')}
                      >
                        <Icon icon="ant-design:delete-outlined" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {lang === 'vi' ? item.titleVi : item.titleEn}
                  </h4>

                  {(item.organizationVi || item.organizationEn) && (
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {lang === 'vi' ? item.organizationVi : item.organizationEn}
                    </p>
                  )}

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lang === 'vi' ? item.descriptionVi : item.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Modal Thêm / Chỉnh Sửa Kỹ Năng */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#0D0F17] rounded-3xl p-6 border border-black/[0.07] dark:border-white/10 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingSkill
                ? pick(lang, 'Chỉnh sửa kỹ năng', 'Edit Skill')
                : pick(lang, 'Thêm kỹ năng mới', 'Add New Skill')}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {pick(lang, 'Tên kỹ năng (*)', 'Skill Name (*)')}
                </label>
                <input
                  type="text"
                  required
                  value={skillForm.name || ''}
                  onChange={(e) => setSkillForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="React / Node.js..."
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {pick(lang, 'Danh mục', 'Category')}
                </label>
                <select
                  value={skillForm.category || 'backend'}
                  onChange={(e) =>
                    setSkillForm((prev) => ({
                      ...prev,
                      category: e.target.value as AdminSkill['category'],
                    }))
                  }
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0D0F17] border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-semibold outline-none cursor-pointer"
                >
                  <option value="backend">Backend & Architecture</option>
                  <option value="frontend">Frontend Web</option>
                  <option value="devops">DevOps & Cloud</option>
                  <option value="tools">Tools & Databases</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>{pick(lang, 'Mức độ thành thạo', 'Proficiency Level')}</span>
                  <span className="font-mono text-blue-600">{skillForm.level}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skillForm.level || 80}
                  onChange={(e) =>
                    setSkillForm((prev) => ({ ...prev, level: Number(e.target.value) }))
                  }
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsSkillModalOpen(false)}
                className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                {pick(lang, 'Hủy bỏ', 'Cancel')}
              </button>

              <button
                type="button"
                onClick={handleSaveSkill}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                {pick(lang, 'Lưu kỹ năng', 'Save Skill')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Thêm / Chỉnh Sửa Timeline */}
      {isTimelineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-[#0D0F17] rounded-3xl p-6 border border-black/[0.07] dark:border-white/10 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingTimeline
                ? pick(lang, 'Chỉnh sửa mốc hành trình', 'Edit Timeline Item')
                : pick(lang, 'Thêm mốc hành trình mới', 'Add New Timeline Item')}
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {pick(lang, 'Thời gian (Period)', 'Period')}
                  </label>
                  <input
                    type="text"
                    value={timelineForm.period || ''}
                    onChange={(e) => setTimelineForm((prev) => ({ ...prev, period: e.target.value }))}
                    placeholder="2025 – 2026"
                    className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {pick(lang, 'Phân loại', 'Category')}
                  </label>
                  <select
                    value={timelineForm.category || 'experience'}
                    onChange={(e) =>
                      setTimelineForm((prev) => ({
                        ...prev,
                        category: e.target.value as AdminTimelineItem['category'],
                      }))
                    }
                    className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0D0F17] border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-semibold outline-none cursor-pointer"
                  >
                    <option value="experience">Experience (Kinh nghiệm)</option>
                    <option value="education">Education (Học vấn)</option>
                    <option value="award">Award (Giải thưởng)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {pick(lang, 'Chức danh / Tiêu đề (VI) (*)', 'Title (Vietnamese) (*)')}
                </label>
                <input
                  type="text"
                  required
                  value={timelineForm.titleVi || ''}
                  onChange={(e) => setTimelineForm((prev) => ({ ...prev, titleVi: e.target.value }))}
                  placeholder="Full-stack Engineer..."
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {pick(lang, 'Tên công ty / Tổ chức (VI)', 'Organization (Vietnamese)')}
                </label>
                <input
                  type="text"
                  value={timelineForm.organizationVi || ''}
                  onChange={(e) =>
                    setTimelineForm((prev) => ({ ...prev, organizationVi: e.target.value }))
                  }
                  placeholder="Công ty / Trường học..."
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {pick(lang, 'Mô tả ngắn (VI)', 'Description (Vietnamese)')}
                </label>
                <textarea
                  rows={3}
                  value={timelineForm.descriptionVi || ''}
                  onChange={(e) =>
                    setTimelineForm((prev) => ({ ...prev, descriptionVi: e.target.value }))
                  }
                  placeholder="Mô tả chi tiết công việc hoặc thành tựu..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsTimelineModalOpen(false)}
                className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                {pick(lang, 'Hủy bỏ', 'Cancel')}
              </button>

              <button
                type="button"
                onClick={handleSaveTimeline}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                {pick(lang, 'Lưu mốc hành trình', 'Save Item')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
