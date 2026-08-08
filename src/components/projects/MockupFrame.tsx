interface MockupFrameProps {
  /** Alt text và placeholder label */
  title: string;
  /** Màu gradient placeholder khi chưa có ảnh thật */
  accentColor?: string;
  className?: string;
}

export default function MockupFrame({
  title,
  accentColor = '#2563EB',
  className = '',
}: MockupFrameProps) {
  return (
    <div
      className={`
        relative rounded-xl overflow-hidden
        border border-black/[0.08] dark:border-white/10
        shadow-lg dark:shadow-none hover:shadow-2xl dark:hover:shadow-none hover:-translate-y-2
        transition-all duration-500
        ${className}
      `}
    >
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-white/5 border-b border-black/[0.06] dark:border-white/10">
        {/* Traffic light dots */}
        <span className="w-3 h-3 rounded-full bg-red-300" />
        <span className="w-3 h-3 rounded-full bg-yellow-300" />
        <span className="w-3 h-3 rounded-full bg-green-300" />

        {/* Fake URL bar */}
        <div className="flex-1 ml-2 h-6 bg-white dark:bg-white/[0.03] rounded-md border border-black/[0.06] dark:border-white/10 flex items-center px-3">
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate">
            https://app.system.vn
          </span>
        </div>
      </div>

      {/* Screenshot area — placeholder gradient */}
      <div
        className="relative w-full aspect-[16/10] flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${accentColor}10 0%, ${accentColor}05 50%, #F8FAFC 100%)`,
        }}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Center label */}
        <div className="relative flex flex-col items-center gap-2 text-center px-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
            style={{ background: `${accentColor}15` }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              style={{ color: accentColor }}
              fill="currentColor"
            >
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
          </div>
          <span
            className="text-xs font-semibold font-mono"
            style={{ color: accentColor }}
          >
            {title}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Private Enterprise Project
          </span>
        </div>
      </div>
    </div>
  );
}
