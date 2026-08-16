import { useState, type KeyboardEvent } from 'react';
import { Icon } from '@iconify/react';
import { useLang } from '../../../lib/i18n';

// Danh sách gợi ý các công nghệ phổ biến cho portfolio phát triển phần mềm
const POPULAR_TECHS = [
  'React',
  'Node.js',
  'Express',
  'TypeScript',
  'JavaScript',
  'Prisma',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'RabbitMQ',
  'Tailwind CSS',
  'Next.js',
  'Vite',
  'GraphQL',
  'AWS S3',
  'Python',
  'Go',
];

interface TechStackPickerProps {
  selectedTechs: string[];
  onChange: (techs: string[]) => void;
}

// Component chọn và quản lý danh sách Công nghệ (Tech Stack Chip Picker - Đồng bộ màu Blue 600)
export default function TechStackPicker({ selectedTechs, onChange }: TechStackPickerProps) {
  const { t } = useLang();
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Thêm một công nghệ mới vào danh sách
  const handleAddTech = (techName: string) => {
    const trimmed = techName.trim();
    if (!trimmed) return;
    if (!selectedTechs.includes(trimmed)) {
      onChange([...selectedTechs, trimmed]);
    }
    setInputValue('');
    setIsDropdownOpen(false);
  };

  // Xóa một công nghệ khỏi danh sách
  const handleRemoveTech = (techToRemove: string) => {
    onChange(selectedTechs.filter((tech) => tech !== techToRemove));
  };

  // Xử lý khi nhấn phím Enter trong ô nhập
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech(inputValue);
    }
  };

  // Lọc các gợi ý chưa được chọn
  const filteredSuggestions = POPULAR_TECHS.filter(
    (tech) =>
      !selectedTechs.includes(tech) &&
      tech.toLowerCase().includes(inputValue.trim().toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* 1. Danh sách Badge các công nghệ đã chọn */}
      <div className="flex flex-wrap items-center gap-2 min-h-[42px] p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
        {selectedTechs.length === 0 ? (
          <span className="text-xs text-slate-400 dark:text-slate-500 italic px-2">
            {t('NO_TECH_SELECTED')}
          </span>
        ) : (
          selectedTechs.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 shadow-2xs transition-all hover:border-blue-300"
            >
              <span>{tech}</span>
              <button
                type="button"
                onClick={() => handleRemoveTech(tech)}
                className="text-blue-400 hover:text-rose-600 dark:hover:text-rose-400 rounded p-0.5 transition-colors"
                title={`${t('REMOVE')} ${tech}`}
              >
                <Icon icon="ant-design:close-outlined" className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
      </div>

      {/* 2. Ô nhập thêm công nghệ & Dropdown gợi ý */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Icon
              icon="ant-design:search-outlined"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={t('TECH_INPUT_PLACEHOLDER')}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all"
            />
          </div>
          <button
            type="button"
            onClick={() => handleAddTech(inputValue)}
            disabled={!inputValue.trim()}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-1 shrink-0"
          >
            <Icon icon="ant-design:plus-outlined" className="w-3.5 h-3.5" />
            <span>{t('ADD')}</span>
          </button>
        </div>

        {/* Dropdown danh sách gợi ý */}
        {isDropdownOpen && filteredSuggestions.length > 0 && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className="absolute z-20 top-full left-0 right-0 mt-1.5 max-h-52 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5">
              <div className="px-3 py-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {t('POPULAR_TECH_SUGGESTIONS')}
              </div>
              {filteredSuggestions.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleAddTech(tech)}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between font-medium"
                >
                  <span>{tech}</span>
                  <Icon icon="ant-design:plus-outlined" className="w-3.5 h-3.5 text-blue-500" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
