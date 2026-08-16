import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useLang } from '../../../lib/i18n';
import { uploadService } from '../../../services/uploadService';


// Định nghĩa kiểu cho một mục Case Study
export interface CaseStudySectionItem {
  id: string;
  sectionKey: string; // overview, problems, goals, role, users, architecture, modules, deepDive, process, lessons, challenges, results
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  metric?: string;
  imageUrl?: string;
}

export const CASE_STUDY_SECTIONS = [
  { key: 'overview', number: '01', nameKey: 'CS_OVERVIEW', descKey: 'CS_OVERVIEW_DESC' },
  { key: 'problems', number: '02', nameKey: 'CS_PROBLEMS', descKey: 'CS_PROBLEMS_DESC' },
  { key: 'goals', number: '03', nameKey: 'CS_GOALS', descKey: 'CS_GOALS_DESC' },
  { key: 'screenshots', number: '04', nameKey: 'CS_SCREENSHOTS', descKey: 'CS_SCREENSHOTS_DESC' },
  { key: 'role', number: '05', nameKey: 'CS_ROLE', descKey: 'CS_ROLE_DESC' },
  { key: 'users', number: '06', nameKey: 'CS_USERS', descKey: 'CS_USERS_DESC' },
  { key: 'architecture', number: '07', nameKey: 'CS_ARCHITECTURE', descKey: 'CS_ARCHITECTURE_DESC' },
  { key: 'modules', number: '08', nameKey: 'CS_MODULES', descKey: 'CS_MODULES_DESC' },
  { key: 'deepDive', number: '09', nameKey: 'CS_DEEPDIVE', descKey: 'CS_DEEPDIVE_DESC' },
  { key: 'process', number: '10', nameKey: 'CS_PROCESS', descKey: 'CS_PROCESS_DESC' },
  { key: 'lessons', number: '11', nameKey: 'CS_LESSONS', descKey: 'CS_LESSONS_DESC' },
  { key: 'challenges', number: '12', nameKey: 'CS_CHALLENGES', descKey: 'CS_CHALLENGES_DESC' },
  { key: 'results', number: '13', nameKey: 'CS_RESULTS', descKey: 'CS_RESULTS_DESC' },
];

interface CaseStudyBuilderProps {
  items: CaseStudySectionItem[];
  onChange: (items: CaseStudySectionItem[]) => void;
  activeLang: 'vi' | 'en';
}

const getFieldConfig = (sectionKey: string, t: (key: string) => string) => {
  switch (sectionKey) {
    case 'challenges':
      return {
        titleVi: 'Vấn đề / Tên thử thách (VI)',
        titleEn: 'Problem / Challenge Name (EN)',
        descVi: 'Giải pháp xử lý (VI)',
        descEn: 'Solution (EN)',
        descPlaceholderVi: 'Chi tiết cách bạn giải quyết vấn đề...',
        descPlaceholderEn: 'Detailed solution...',
        hideTitle: false,
      };
    case 'architecture':
      return {
        titleVi: 'Luồng chính (Mỗi ý 1 dòng) (VI)',
        titleEn: 'Main Flow (1 per line) (EN)',
        descVi: 'Thành phần hỗ trợ (Mỗi ý 1 dòng) (VI)',
        descEn: 'Supporting components (1 per line) (EN)',
        descPlaceholderVi: 'Giao diện\nAPI Server\nDatabase...',
        descPlaceholderEn: 'Frontend\nAPI Server\nDatabase...',
        hideTitle: false,
      };
    case 'role':
    case 'users':
      return {
        titleVi: 'Tên Vai trò / Đối tượng (VI)',
        titleEn: 'Role / Persona Name (EN)',
        descVi: 'Các nhiệm vụ chính (Nhấn Enter tách dòng) (VI)',
        descEn: 'Key tasks (Press Enter for new line) (EN)',
        descPlaceholderVi: 'Quản lý người dùng\nXuất báo cáo...',
        descPlaceholderEn: 'User management\nExport reports...',
        hideTitle: false,
      };
    case 'modules':
    case 'process':
      return {
        titleVi: 'Tên Chức năng / Bước (VI)',
        titleEn: 'Module / Step Name (EN)',
        descVi: 'Chi tiết / Tính năng con (Nhấn Enter tách dòng) (VI)',
        descEn: 'Details / Sub-features (Press Enter for new line) (EN)',
        descPlaceholderVi: 'Tính năng A\nTính năng B...',
        descPlaceholderEn: 'Feature A\nFeature B...',
        hideTitle: false,
      };
    case 'results':
      return {
        titleVi: '', 
        titleEn: '', 
        descVi: 'Kết quả đạt được (Nhấn Enter tách dòng) (VI)',
        descEn: 'Achieved results (Press Enter for new line) (EN)',
        descPlaceholderVi: 'Giảm 50% thời gian tải\nTăng 20% chuyển đổi...',
        descPlaceholderEn: 'Reduced load time by 50%\nIncreased conversion by 20%...',
        hideTitle: true,
      };
    case 'screenshots':
      return {
        titleVi: 'Tiêu đề hình ảnh (VI)',
        titleEn: 'Image Title (EN)',
        descVi: 'Mô tả hình ảnh (VI)',
        descEn: 'Image Description (EN)',
        descPlaceholderVi: 'Mô tả ngắn gọn về giao diện này...',
        descPlaceholderEn: 'Brief description of this screen...',
        hideTitle: false,
      };
    default:
      return {
        titleVi: t('ITEM_TITLE_VI'),
        titleEn: t('ITEM_TITLE_EN'),
        descVi: t('DETAILED_CONTENT_VI'),
        descEn: t('DETAILED_CONTENT_EN'),
        descPlaceholderVi: 'Nội dung giải thích chi tiết...',
        descPlaceholderEn: 'Detailed explanation content...',
        hideTitle: false,
      };
  }
};

// Component Trình Dựng Case Study Trực Quan (Case Study Builder - Đồng bộ màu Blue 600)
export default function CaseStudyBuilder({ items, onChange, activeLang }: CaseStudyBuilderProps) {
  const { t } = useLang();
  const isVi = activeLang === 'vi';
  const [selectedSectionKey, setSelectedSectionKey] = useState<string>('overview');
  
  // Quản lý state cho upload ảnh của từng item
  const [uploadingItemId, setUploadingItemId] = useState<string | null>(null);

  const handleImageUpload = async (itemId: string, file: File) => {
    setUploadingItemId(itemId);
    try {
      const result = await uploadService.uploadImage(file, 'portfolio/projects/casestudy');
      if (result && result.url) {
        handleUpdateItem(itemId, 'imageUrl', result.url);
      }
    } catch (err: any) {
      console.error(err);
      alert('Tải ảnh thất bại: ' + (err?.message || 'Lỗi'));
    } finally {
      setUploadingItemId(null);
    }
  };

  // Lọc các item thuộc section đang chọn
  const currentSectionItems = items.filter((item) => item.sectionKey === selectedSectionKey);
  const selectedSection = CASE_STUDY_SECTIONS.find((s) => s.key === selectedSectionKey) || CASE_STUDY_SECTIONS[0];
  const fieldConfig = getFieldConfig(selectedSectionKey, t);

  // Tính toán tổng số section đã có dữ liệu
  const completedSectionsCount = CASE_STUDY_SECTIONS.filter((sec) =>
    items.some((item) => item.sectionKey === sec.key && (item.titleVi || item.descVi))
  ).length;

  const completionPercentage = Math.round((completedSectionsCount / 12) * 100);

  // Thêm một item mới vào section hiện tại
  const handleAddItem = () => {
    const newItem: CaseStudySectionItem = {
      id: `cs_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      sectionKey: selectedSectionKey,
      titleVi: '',
      titleEn: '',
      descVi: '',
      descEn: '',
      metric: '',
    };
    onChange([...items, newItem]);
  };

  // Cập nhật một item
  const handleUpdateItem = (id: string, field: keyof CaseStudySectionItem, value: string) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Xóa một item
  const handleRemoveItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  // Di chuyển item lên/xuống trong section
  const handleMoveItem = (indexInCurrent: number, direction: 'up' | 'down') => {
    const targetIndexInCurrent = direction === 'up' ? indexInCurrent - 1 : indexInCurrent + 1;
    if (targetIndexInCurrent < 0 || targetIndexInCurrent >= currentSectionItems.length) return;

    const updatedCurrent = [...currentSectionItems];
    const temp = updatedCurrent[indexInCurrent];
    updatedCurrent[indexInCurrent] = updatedCurrent[targetIndexInCurrent];
    updatedCurrent[targetIndexInCurrent] = temp;

    // Giữ nguyên các item thuộc section khác
    const otherItems = items.filter((item) => item.sectionKey !== selectedSectionKey);
    onChange([...otherItems, ...updatedCurrent]);
  };

  return (
    <div className="space-y-4">
      {/* Header Tiến Độ Hoàn Thành Case Study */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Icon icon="ant-design:read-outlined" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{t('CASE_STUDY_BUILDER')}</span>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-600 text-white">
              {completedSectionsCount} / 12 {t('COMPLETED_PARTS')} ({completionPercentage}%)
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t('CS_BUILDER_DESC')}
          </p>
        </div>

        <div className="w-full sm:w-36 h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shrink-0">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Bố cục 2 Cột: Sidebar 12 Nhóm Section bên trái & Editor Bên Phải */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Cột Trái (md:col-span-4): Navigation 12 Nhóm */}
        <div className="md:col-span-4 space-y-1 max-h-[580px] overflow-y-auto pr-1">
          {CASE_STUDY_SECTIONS.map((sec) => {
            const secItems = items.filter((i) => i.sectionKey === sec.key);
            const isCompleted = secItems.some((i) => (isVi ? i.titleVi || i.descVi : i.titleEn || i.descEn));
            const isSelected = selectedSectionKey === sec.key;

            return (
              <button
                key={sec.key}
                type="button"
                onClick={() => setSelectedSectionKey(sec.key)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md font-semibold'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {sec.number}
                  </span>
                  <div>
                    <div className="text-xs font-semibold">
                      {t(sec.nameKey)}
                    </div>
                    <div
                      className={`text-[11px] line-clamp-1 ${
                        isSelected
                          ? 'text-white/80'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {t(sec.descKey)}
                    </div>
                  </div>
                </div>

                {/* Badge trạng thái */}
                <div className="flex items-center gap-1.5">
                  {secItems.length > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 font-mono rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {secItems.length} {t('CS_ITEM')}
                    </span>
                  )}
                  {isCompleted ? (
                    <Icon
                      icon="ant-design:check-circle-filled"
                      className={`w-4 h-4 ${
                        isSelected ? 'text-emerald-300' : 'text-emerald-500'
                      }`}
                    />
                  ) : (
                    <Icon
                      icon="ant-design:minus-circle-outlined"
                      className={`w-4 h-4 opacity-40 ${
                        isSelected ? 'text-white' : 'text-slate-400'
                      }`}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Cột Phải (md:col-span-8): Trình Biên Tập Nội Dung Section Được Chọn */}
        <div className="md:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  {selectedSection.number}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {t(selectedSection.nameKey)}
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t(selectedSection.descKey)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
            >
              <Icon icon="ant-design:plus-outlined" className="w-3.5 h-3.5" />
              <span>{t('ADD')} {t(selectedSection.nameKey).toLowerCase()}</span>
            </button>
          </div>

          {/* Danh sách các item thuộc Section đang xem */}
          {currentSectionItems.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Icon icon="ant-design:file-text-outlined" className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {t('CS_NO_ITEMS_YET')} "{t(selectedSection.nameKey)}"
                </p>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  {t('CS_CLICK_TO_ADD')}
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                + {t('CS_ADD_FIRST_ITEM')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {currentSectionItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 relative group hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
                >
                  {/* Action Bar của từng Item */}
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200/60 dark:border-slate-800">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      {t('CS_ITEM')} #{idx + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveItem(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 transition-colors"
                        title={t('CS_MOVE_UP')}
                      >
                        <Icon icon="ant-design:arrow-up-outlined" className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveItem(idx, 'down')}
                        disabled={idx === currentSectionItems.length - 1}
                        className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 transition-colors"
                        title={t('CS_MOVE_DOWN')}
                      >
                        <Icon icon="ant-design:arrow-down-outlined" className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 transition-colors ml-2"
                        title={t('CS_REMOVE_ITEM')}
                      >
                        <Icon icon="ant-design:delete-outlined" className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Input Tiêu đề */}
                  {!fieldConfig.hideTitle && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                          {fieldConfig.titleVi}
                        </label>
                        <input
                          type="text"
                          value={item.titleVi}
                          onChange={(e) => handleUpdateItem(item.id, 'titleVi', e.target.value)}
                          placeholder="VD: Hệ thống cũ bị quá tải..."
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                          {fieldConfig.titleEn}
                        </label>
                        <input
                          type="text"
                          value={item.titleEn}
                          onChange={(e) => handleUpdateItem(item.id, 'titleEn', e.target.value)}
                          placeholder="e.g. Legacy system lagged under load..."
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Input Mô tả chi tiết */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        {fieldConfig.descVi}
                      </label>
                      <textarea
                        rows={3}
                        value={item.descVi}
                        onChange={(e) => handleUpdateItem(item.id, 'descVi', e.target.value)}
                        placeholder={fieldConfig.descPlaceholderVi}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        {fieldConfig.descEn}
                      </label>
                      <textarea
                        rows={3}
                        value={item.descEn}
                        onChange={(e) => handleUpdateItem(item.id, 'descEn', e.target.value)}
                        placeholder={fieldConfig.descPlaceholderEn}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all resize-y"
                      />
                    </div>
                  </div>

                  {/* Input Metric / Chỉ số đo lường tùy chọn */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      {t('METRIC_OPTIONAL')}
                    </label>
                    <input
                      type="text"
                      value={item.metric || ''}
                      onChange={(e) => handleUpdateItem(item.id, 'metric', e.target.value)}
                      placeholder="VD: Latency < 45ms hoặc 50,000+ Students"
                      className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Ảnh minh họa (Image URL) */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Ảnh minh họa (Tùy chọn)
                    </label>
                    {item.imageUrl ? (
                      <div className="relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video w-full sm:w-64 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <img src={item.imageUrl} alt="Case Study Media" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e: Event) => {
                                const target = e.target as HTMLInputElement;
                                if (target.files && target.files[0]) {
                                  handleImageUpload(item.id, target.files[0]);
                                }
                              };
                              input.click();
                            }}
                            className="p-1.5 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform"
                          >
                            <Icon icon="ant-design:edit-outlined" className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateItem(item.id, 'imageUrl', '')}
                            className="p-1.5 bg-rose-500 rounded-full text-white hover:scale-110 transition-transform"
                          >
                            <Icon icon="ant-design:delete-outlined" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={uploadingItemId === item.id}
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e: Event) => {
                              const target = e.target as HTMLInputElement;
                              if (target.files && target.files[0]) {
                                handleImageUpload(item.id, target.files[0]);
                              }
                            };
                            input.click();
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {uploadingItemId === item.id ? (
                            <Icon icon="ant-design:loading-outlined" className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Icon icon="ant-design:picture-outlined" className="w-3.5 h-3.5" />
                          )}
                          <span>Tải ảnh lên</span>
                        </button>
                        <span className="text-xs text-slate-400">hoặc dán Link:</span>
                        <input
                          type="text"
                          value={item.imageUrl || ''}
                          onChange={(e) => handleUpdateItem(item.id, 'imageUrl', e.target.value)}
                          placeholder="https://..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Nút Thêm ở cuối danh sách */}
              <button
                type="button"
                onClick={handleAddItem}
                className="w-full py-2.5 border border-dashed border-blue-300 dark:border-blue-800/60 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Icon icon="ant-design:plus-outlined" className="w-4 h-4" />
                <span>{t('CS_ADD_NEW')} {t(selectedSection.nameKey)}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
