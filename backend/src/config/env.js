import dotenv from 'dotenv';

// Tải tệp cấu hình .env (Nếu có ở môi trường local)
dotenv.config();

// Xuất các biến môi trường cấu hình hệ thống
export const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || '',
};
