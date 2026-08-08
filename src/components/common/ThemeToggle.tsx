import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      aria-label="Chuyển giao diện sáng/tối"
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-300 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 ${className}`}
    >
      <Icon icon={theme === 'dark' ? 'ph:sun-bold' : 'ph:moon-bold'} className="w-5 h-5" />
    </button>
  );
}
