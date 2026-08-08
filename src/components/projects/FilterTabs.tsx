import { motion } from 'framer-motion';
import type { ProjectTag } from '../../constants/projects';

interface FilterTabsProps {
  tags: ProjectTag[];
  active: ProjectTag;
  onChange: (tag: ProjectTag) => void;
}

export default function FilterTabs({ tags, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Lọc dự án">
      {tags.map((tag) => {
        const isActive = tag === active;
        return (
          <button
            key={tag}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tag)}
            className={`
              relative px-4 py-2 rounded-full text-sm font-medium
              transition-colors duration-200 outline-none
              focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2
              ${isActive
                ? 'text-white'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }
            `}
          >
            {/* Sliding pill background */}
            {isActive && (
              <motion.span
                layoutId="filter-active-pill"
                className="absolute inset-0 rounded-full bg-blue-600"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            {/* Label */}
            <span className="relative z-10">{tag}</span>
          </button>
        );
      })}
    </div>
  );
}
