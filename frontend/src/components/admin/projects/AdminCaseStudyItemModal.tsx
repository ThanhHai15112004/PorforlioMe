import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang, pick } from '../../../lib/i18n';

export interface CaseStudyItem {
  id: string;
  type: 'problem' | 'goal' | 'architecture' | 'feature' | 'challenge' | 'result' | 'lesson';
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  metric?: string;
}

interface AdminCaseStudyItemModalProps {
  isOpen: boolean;
  item: CaseStudyItem | null;
  onClose: () => void;
  onSave: (item: CaseStudyItem) => void;
}

// Modal Thêm / Chỉnh Sửa Mục Nội Dung Case Study Linh Hoạt
export default function AdminCaseStudyItemModal({
  isOpen,
  item,
  onClose,
  onSave,
}: AdminCaseStudyItemModalProps) {
  const { lang } = useLang();

  // State Form nhập nội dung mục Case Study
  const [type, setType] = useState<CaseStudyItem['type']>('problem');
  const [titleVi, setTitleVi] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descVi, setDescVi] = useState('');
  const [descEn, setDescEn] = useState('');
  const [metric, setMetric] = useState('');

  // Nạp dữ liệu khi mở Modal ở chế độ Chỉnh Sửa
  useEffect(() => {
    if (item) {
      setType(item.type);
      setTitleVi(item.titleVi || '');
      setTitleEn(item.titleEn || '');
      setDescVi(item.descVi || '');
      setDescEn(item.descEn || '');
      setMetric(item.metric || '');
    } else {
      setType('problem');
      setTitleVi('');
      setTitleEn('');
      setDescVi('');
      setDescEn('');
      setMetric('');
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!titleVi.trim() && !titleEn.trim()) return;

    onSave({
      id: item ? item.id : `cs_${Date.now()}`,
      type,
      titleVi: titleVi.trim(),
      titleEn: titleEn.trim() || titleVi.trim(),
      descVi: descVi.trim(),
      descEn: descEn.trim() || descVi.trim(),
      metric: metric.trim(),
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop mờ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Khung Modal Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white dark:bg-[#0D0F17] rounded-3xl border border-black/[0.07] dark:border-white/10 shadow-2xl overflow-hidden z-10 my-8 flex flex-col"
        >
          {/* Header Modal */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/50 dark:border-blue-800/40">
                <Icon icon="ant-design:plus-outlined" className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {item
                  ? pick(lang, 'Chỉnh sửa mục Case Study', 'Edit Case Study Item')
                  : pick(lang, 'Thêm mục nội dung mới', 'Add New Case Study Item')}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
            >
              <Icon icon="ant-design:close-outlined" className="w-4 h-4" />
            </button>
          </div>

          {/* Body Form */}
          <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Loại mục Case Study */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Phân loại mục', 'Item Section Category')}
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as CaseStudyItem['type'])}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0D0F17] border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-semibold outline-none cursor-pointer"
              >
                <option value="problem">{pick(lang, 'Bài toán & Vấn đề', 'Problem Statement')}</option>
                <option value="goal">{pick(lang, 'Mục tiêu dự án', 'Project Goal')}</option>
                <option value="architecture">{pick(lang, 'Kiến trúc hệ thống', 'System Architecture')}</option>
                <option value="feature">{pick(lang, 'Tính năng nổi bật', 'Key Feature')}</option>
                <option value="challenge">{pick(lang, 'Thách thức & Giải pháp', 'Technical Challenge')}</option>
                <option value="result">{pick(lang, 'Kết quả & Số liệu', 'Result & Metric')}</option>
                <option value="lesson">{pick(lang, 'Bài học kinh nghiệm', 'Lesson Learned')}</option>
              </select>
            </div>

            {/* Tiêu đề Tiếng Việt */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Tiêu đề mục (Tiếng Việt) (*)', 'Item Title (Vietnamese) (*)')}
              </label>
              <input
                type="text"
                required
                value={titleVi}
                onChange={(e) => setTitleVi(e.target.value)}
                placeholder="Tải lag khi truy cập đông người..."
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* Tiêu đề Tiếng Anh */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Tiêu đề mục (Tiếng Anh)', 'Item Title (English)')}
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="High latency under heavy load..."
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* Số liệu / Metric nếu có */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Số liệu đo lường / Metric (Tùy chọn)', 'Metric / Highlight (Optional)')}
              </label>
              <input
                type="text"
                value={metric}
                onChange={(e) => setMetric(e.target.value)}
                placeholder="< 45ms / 50,000+ Users"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* Nội dung Tiếng Việt */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Nội dung chi tiết (Tiếng Việt)', 'Detailed Content (Vietnamese)')}
              </label>
              <textarea
                rows={3}
                value={descVi}
                onChange={(e) => setDescVi(e.target.value)}
                placeholder="Mô tả chi tiết giải pháp hoặc kết quả đạt được..."
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>

            {/* Nội dung Tiếng Anh */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Nội dung chi tiết (Tiếng Anh)', 'Detailed Content (English)')}
              </label>
              <textarea
                rows={3}
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                placeholder="Detailed description of solution or result..."
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Footer Modal */}
          <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all"
            >
              {pick(lang, 'Hủy bỏ', 'Cancel')}
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              {pick(lang, 'Lưu mục này', 'Save Item')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
