import vi from './vi.js';
import en from './en.js';

// Danh sách các từ điển ngôn ngữ hỗ trợ
const translations = {
  vi,
  en,
};

// Ngôn ngữ mặc định của ứng dụng
export const DEFAULT_LANG = 'vi';

/**
 * Lấy chuỗi thông báo theo khóa và mã ngôn ngữ chỉ định
 * @param {string} key - Mã khóa cần tra cứu
 * @param {string} [lang='vi'] - Mã ngôn ngữ ('vi' hoặc 'en')
 * @returns {string} Chuỗi thông báo tương ứng
 */
export const getMessage = (key, lang = DEFAULT_LANG) => {
  const selectedLang = translations[lang] ? lang : DEFAULT_LANG;
  return translations[selectedLang][key];
};

export default translations;
