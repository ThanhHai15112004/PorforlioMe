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
};
