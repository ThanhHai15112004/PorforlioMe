import vi from './vi';
import en from './en';

export type Lang = 'vi' | 'en';

// Tổng hợp từ điển ngôn ngữ tập trung toàn ứng dụng Frontend
export const translations: Record<Lang, Record<string, string>> = {
  vi,
  en,
};

/**
 * Hàm truy xuất câu chữ theo Mã Ngôn Ngữ và Từ Khóa duy nhất (Single Key i18n)
 */
export function getMessage(key: string, lang: Lang = 'vi'): string {
  const dict = translations[lang] || translations.vi;
  return dict[key] || translations.vi[key] || key;
}

export { vi, en };
