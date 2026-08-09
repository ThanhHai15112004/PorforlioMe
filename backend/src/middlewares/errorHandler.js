import { HTTP_STATUS } from '#constants/httpStatus.js';
import { getMessage } from '#lang/index.js';

// Middleware xử lý lỗi toàn cục cho ứng dụng
export const globalErrorHandler = (err, req, res, next) => {
  const lang = req.lang;

  // In thông tin lỗi ra console
  console.error(`${getMessage('GLOBAL_ERROR_LOG', lang)}: ${err.stack}`);

  // Dùng fallback 500 nếu lỗi không có statusCode (ví dụ: lỗi JavaScript thông thường)
  const statusCode = Number.isInteger(err.statusCode) ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || getMessage('INTERNAL_ERROR', lang);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
