import jwt from 'jsonwebtoken';
import { env } from '#config/env.js';
import { errorResponse } from '#helpers/response.js';
import { HTTP_STATUS } from '#constants/httpStatus.js';

/**
 * Middleware xác thực JWT Token và phân quyền cho Quản trị viên (Admin)
 * Yêu cầu Header: Authorization: Bearer <token>
 */
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const msgKey = req.t ? req.t('UNAUTHORIZED_NO_TOKEN') : 'UNAUTHORIZED_NO_TOKEN';
      return errorResponse(res, msgKey, HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    if (!token || token.trim() === '') {
      const msgKey = req.t ? req.t('UNAUTHORIZED_NO_TOKEN') : 'UNAUTHORIZED_NO_TOKEN';
      return errorResponse(res, msgKey, HTTP_STATUS.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Kiểm tra quyền hạn (Role: 1 là Admin)
    if (!decoded || decoded.role !== 1) {
      const msgKey = req.t ? req.t('FORBIDDEN_ADMIN_ONLY') : 'FORBIDDEN_ADMIN_ONLY';
      return errorResponse(res, msgKey, HTTP_STATUS.FORBIDDEN);
    }

    // Gắn thông tin Admin vào request
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const msgKey = req.t ? req.t('TOKEN_EXPIRED') : 'TOKEN_EXPIRED';
      return errorResponse(res, msgKey, HTTP_STATUS.UNAUTHORIZED);
    }
    const msgKey = req.t ? req.t('TOKEN_INVALID') : 'TOKEN_INVALID';
    return errorResponse(res, msgKey, HTTP_STATUS.UNAUTHORIZED);
  }
};
