import { getMessage, DEFAULT_LANG } from '#lang/index.js';

/**
 * Middleware tự động nhận biết ngôn ngữ từ request:
 * 1. Query parameter: ?lang=en hoặc ?lang=vi
 * 2. Header tùy chỉnh: X-Lang: en
 * 3. Header tiêu chuẩn: Accept-Language: en-US,en;q=0.9
 * 
 * Gắn thuộc tính req.lang và hàm trợ giúp req.t(key) vào đối tượng request
 */
export const langMiddleware = (req, res, next) => {
  let lang = req.query.lang;
  if (!lang) {
    lang = req.headers['x-lang'];
  }

  if (!lang && req.headers['accept-language']) {
    const acceptLang = req.headers['accept-language'].split(',')[0].trim().toLowerCase();
    if (acceptLang.startsWith('en')) {
      lang = 'en';
    } else if (acceptLang.startsWith('vi')) {
      lang = 'vi';
    }
  }

  // Gắn ngôn ngữ được chọn và hàm dịch trợ giúp vào req
  req.lang = lang === 'en' ? 'en' : DEFAULT_LANG;
  req.t = (key) => getMessage(key, req.lang);

  next();
};
