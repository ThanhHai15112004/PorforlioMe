import { asyncHandler } from '#helpers/asyncHandler.js';
import { successResponse, errorResponse } from '#helpers/response.js';
import { HTTP_STATUS } from '#constants/httpStatus.js';
import { prisma } from '#config/prisma.js';
import { sendContactNotificationMail } from '#services/mail.service.js';

/**
 * Controller xử lý gửi tin nhắn từ biểu mẫu liên hệ
 * Endpoint: POST /api/contact
 */
export const submitContactMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body || {};

  // 1. Kiểm tra các thông tin dữ liệu đầu vào bắt buộc
  if (!name || !email || !message || !String(name).trim() || !String(email).trim() || !String(message).trim()) {
    return errorResponse(res, req.t('CONTACT_REQUIRED_FIELDS'), HTTP_STATUS.BAD_REQUEST);
  }

  // 2. Kiểm tra tính hợp lệ của cú pháp email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email).trim())) {
    return errorResponse(res, req.t('INVALID_EMAIL_FORMAT'), HTTP_STATUS.BAD_REQUEST);
  }

  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim();
  const cleanMessage = String(message).trim();

  // 3. Lưu thông tin tin nhắn vào cơ sở dữ liệu qua Prisma Model
  const newContactRecord = await prisma.contactMessage.create({
    data: {
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    },
  });

  // 4. Kích hoạt dịch vụ gửi email thông báo tới hòm thư Admin (bất đồng bộ)
  sendContactNotificationMail({
    name: cleanName,
    email: cleanEmail,
    message: cleanMessage,
  }).catch((err) => {
    console.error('[Lỗi gửi email liên hệ]', err);
  });

  return successResponse(res, newContactRecord, req.t('CONTACT_MESSAGE_SENT'), HTTP_STATUS.CREATED);
});

