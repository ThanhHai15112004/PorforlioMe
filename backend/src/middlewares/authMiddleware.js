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
      return errorResponse(res, req.t('UNAUTHORIZED_NO_TOKEN'), HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    if (!token || token.trim() === '') {
      return errorResponse(res, req.t('UNAUTHORIZED_NO_TOKEN'), HTTP_STATUS.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Kiểm tra quyền hạn (Role: 1 là Admin)
    if (!decoded || decoded.role !== 1) {
      return errorResponse(res, req.t('FORBIDDEN_ADMIN_ONLY'), HTTP_STATUS.FORBIDDEN);
    }

    // Gắn thông tin Admin vào request
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, req.t('TOKEN_EXPIRED'), HTTP_STATUS.UNAUTHORIZED);
    }
    return errorResponse(res, req.t('TOKEN_INVALID'), HTTP_STATUS.UNAUTHORIZED);
  }
};

