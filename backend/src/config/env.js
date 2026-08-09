import appRoot from 'app-root-path';
import dotenv from 'dotenv';

// Tải tệp cấu hình .env từ thư mục gốc của dự án bằng app-root-path
dotenv.config({ path: appRoot.resolve('.env') });

// Xuất các biến môi trường cấu hình hệ thống
export const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

  // Cấu hình kho lưu trữ ảnh Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  // Cấu hình dịch vụ gửi email Nodemailer SMTP
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  // Xóa khoảng trắng trong mật khẩu ứng dụng Gmail (nếu có)
  EMAIL_PASS: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '',
  EMAIL_FROM: process.env.EMAIL_FROM,
};


