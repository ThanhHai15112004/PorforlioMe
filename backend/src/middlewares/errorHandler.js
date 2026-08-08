import { HTTP_STATUS } from '../constants/httpStatus.js';
import { getMessage } from '../lang/index.js';

// Middleware xử lý lỗi toàn cục cho ứng dụng
export const globalErrorHandler = (err, req, res, next) => {
  const lang = req.lang || 'vi';

  // In thông tin lỗi chi tiết ra console
  console.error(`[Global Error Handler]: ${err.stack || err.message}`);

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || getMessage('SERVER_ERROR', lang);

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: err.message,
  });
};
