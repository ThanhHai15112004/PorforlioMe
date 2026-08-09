import { asyncHandler } from '#helpers/asyncHandler.js';
import { successResponse, errorResponse } from '#helpers/response.js';
import { HTTP_STATUS } from '#constants/httpStatus.js';
import * as authService from '#services/auth.service.js';

// Bộ điều khiển xử lý đăng nhập hệ thống quản trị
export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body || {};

  // Kiểm tra trường hợp rỗng hoặc chỉ có khoảng trắng
  if (!username || typeof username !== 'string' || !username.trim() ||
      !password || typeof password !== 'string' || !password.trim()) {
    return errorResponse(res, req.t('LOGIN_CREDENTIALS_REQUIRED'), HTTP_STATUS.BAD_REQUEST);
  }

  try {
    const result = await authService.loginAdmin(username.trim(), password);
    return successResponse(res, result, req.t('LOGIN_SUCCESS'));
  } catch (err) {
    if (err.messageKey) {
      return errorResponse(res, req.t(err.messageKey), err.statusCode || HTTP_STATUS.UNAUTHORIZED);
    }
    throw err;
  }
});

// Bộ điều khiển lấy thông tin Admin hiện tại đang đăng nhập
export const getMe = asyncHandler(async (req, res) => {
  const adminId = req.admin?.id;
  if (!adminId) {
    return errorResponse(res, req.t('UNAUTHORIZED_NO_TOKEN'), HTTP_STATUS.UNAUTHORIZED);
  }

  try {
    const admin = await authService.getAdminProfile(adminId);
    return successResponse(res, admin, req.t('GET_ME_SUCCESS'));
  } catch (err) {
    if (err.messageKey) {
      return errorResponse(res, req.t(err.messageKey), err.statusCode || HTTP_STATUS.NOT_FOUND);
    }
    throw err;
  }
});

// Bộ điều khiển đổi mật khẩu Admin
export const changePassword = asyncHandler(async (req, res) => {
  const adminId = req.admin?.id;
  const { oldPassword, newPassword } = req.body || {};

  if (!oldPassword || typeof oldPassword !== 'string' || !oldPassword.trim() ||
      !newPassword || typeof newPassword !== 'string' || !newPassword.trim()) {
    return errorResponse(res, req.t('REQUIRED_FIELDS_MISSING'), HTTP_STATUS.BAD_REQUEST);
  }

  if (newPassword.trim().length < 6) {
    return errorResponse(res, req.t('NEW_PASSWORD_TOO_SHORT'), HTTP_STATUS.BAD_REQUEST);
  }

  try {
    await authService.changeAdminPassword(adminId, oldPassword.trim(), newPassword.trim());
    return successResponse(res, null, req.t('CHANGE_PASSWORD_SUCCESS'));
  } catch (err) {
    if (err.messageKey) {
      return errorResponse(res, req.t(err.messageKey), err.statusCode || HTTP_STATUS.BAD_REQUEST);
    }
    throw err;
  }
});
