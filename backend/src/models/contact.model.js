import { prisma } from '#config/prisma.js';

/**
 * Định nghĩa cấu trúc Entity ContactMessage (Mẫu đối tượng Tin nhắn liên hệ)
 * @typedef {Object} ContactMessageEntity
 * @property {string} id - Định danh duy nhất (UUID)
 * @property {string} name - Họ tên người gửi
 * @property {string} email - Địa chỉ email người gửi
 * @property {string} message - Nội dung tin nhắn liên hệ
 * @property {Date} createdAt - Thời gian khởi tạo tin nhắn
 */

// Hàm định dạng và chuẩn hóa dữ liệu Entity ContactMessage
export const formatContactMessageEntity = (data) => {
  if (!data) return null;
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    message: data.message,
    createdAt: data.createdAt,
  };
};

// --- CÁC HÀM TRUY VẤN CƠ SỞ DỮ LIỆU (DATABASE QUERIES) ---

// Tạo mới một tin nhắn liên hệ vào cơ sở dữ liệu
export const createContactMessage = async (contactData) => {
  const newMessage = await prisma.contactMessage.create({
    data: contactData,
  });
  return formatContactMessageEntity(newMessage);
};

// Truy vấn danh sách toàn bộ tin nhắn liên hệ (sắp xếp theo thời gian mới nhất)
export const findAllContactMessages = async () => {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return messages.map(formatContactMessageEntity);
};
