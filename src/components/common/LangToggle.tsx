import { useLang } from '../../lib/i18n';

export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      aria-label="Switch language / Đổi ngôn ngữ"
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-300 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 text-xs font-bold font-mono ${className}`}
    >
      {lang === 'vi' ? 'EN' : 'VI'}
    </button>
  );
}
