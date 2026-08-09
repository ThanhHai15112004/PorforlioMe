import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '#config/env.js';
import * as adminModel from '#models/admin.model.js';

// Dịch vụ xử lý nghiệp vụ đăng nhập Admin
export const loginAdmin = async (username, password) => {
  const admin = await adminModel.findAdminByUsername(username);

  if (!admin) {
    throw { statusCode: 401, messageKey: 'ACCOUNT_NOT_FOUND' };
  }

  if (!admin.isActive) {
    throw { statusCode: 403, messageKey: 'ACCOUNT_DISABLED' };
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw { statusCode: 401, messageKey: 'INVALID_CREDENTIALS' };
  }

  // Cập nhật thời gian đăng nhập
  await adminModel.updateLastLogin(admin.id);

  // Ký mã JWT Token
  const token = jwt.sign(
    {
      id: admin.id,
      username: admin.username,
      role: admin.role,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );

  return {
    token,
    admin: adminModel.formatAdminEntity(admin),
  };
};

// Dịch vụ lấy thông tin Admin hiện tại
export const getAdminProfile = async (id) => {
  const admin = await adminModel.findAdminById(id);
  if (!admin) {
    throw { statusCode: 404, messageKey: 'ACCOUNT_NOT_FOUND' };
  }
  return admin;
};

// Dịch vụ thay đổi mật khẩu Admin
export const changeAdminPassword = async (id, oldPassword, newPassword) => {
  const admin = await adminModel.findAdminByUsername(id);
  const rawAdmin = await adminModel.findAdminById(id);

  if (!rawAdmin || !admin) {
    throw { statusCode: 404, messageKey: 'ACCOUNT_NOT_FOUND' };
  }

  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) {
    throw { statusCode: 400, messageKey: 'OLD_PASSWORD_INVALID' };
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await adminModel.updatePassword(id, newHash);

  return true;
};
