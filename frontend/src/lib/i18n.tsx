import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, getMessage, type Lang } from '../lang';

export type { Lang };

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
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

  // Hàm dịch i18n lấy duy nhất 1 key string thông qua module lang/index.ts
  const t = (key: string): string => {
    return getMessage(key, lang);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>
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

/** Chọn giá trị theo ngôn ngữ hiện tại — dùng cho dữ liệu động */
// eslint-disable-next-line react-refresh/only-export-components -- helper thuần
export function pick<T>(lang: Lang, viVal: T, enVal: T): T {
  return lang === 'vi' ? viVal : enVal;
}

export { translations, getMessage };
