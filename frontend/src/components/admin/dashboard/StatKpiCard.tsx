import { Icon } from '@iconify/react';

interface StatKpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  colorVariant?: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose';
}

// Map màu sắc hiển thị cho icon của thẻ KPI
const COLOR_MAP = {
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/30',
  emerald:
    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/30',
  amber:
    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/30',
  purple:
    'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-800/30',
  rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/30',
};

// Component thẻ chỉ số KPI dùng lại cho trang Dashboard Overview (Sử dụng Ant Design icons)
export default function StatKpiCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendUp = true,
  colorVariant = 'blue',
}: StatKpiCardProps) {
  return (
    <div className="glass-card elevate-sm rounded-2xl p-4 md:p-5 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] border border-black/[0.07] dark:border-white/10 bg-white/80 dark:bg-[#0D0F17] backdrop-blur-xl">
      {/* Khối Header thẻ: Title & Icon */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
          {title}
        </span>
        <div
          className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${COLOR_MAP[colorVariant]}`}
        >
          <Icon icon={icon} className="w-4 h-4" />
        </div>
      </div>

      {/* Khối Giá trị chính & Trend */}
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </h3>

        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
              trendUp
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
            }`}
          >
            <Icon
              icon={trendUp ? 'ant-design:arrow-up-outlined' : 'ant-design:arrow-down-outlined'}
              className="w-3.5 h-3.5"
            />
            {trend}
          </span>
        )}
      </div>

      {/* Dòng phụ đề giải thích */}
      {subtitle && (
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-sans truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
}
