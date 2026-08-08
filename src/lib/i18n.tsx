import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'vi' | 'en';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

function getInitialLang(): Lang {
  const stored = localStorage.getItem('lang');
  if (stored === 'vi' || stored === 'en') return stored;
  return 'vi';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === 'vi' ? 'en' : 'vi'));

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook cần sống cùng Provider trong 1 file context nhỏ
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}

/** Chọn giá trị theo ngôn ngữ hiện tại — tiện dùng inline: pick(lang, 'vi text', 'en text'). */
// eslint-disable-next-line react-refresh/only-export-components -- helper thuần, không phải component
export function pick<T>(lang: Lang, vi: T, en: T): T {
  return lang === 'vi' ? vi : en;
}
