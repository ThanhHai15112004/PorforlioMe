import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tải tệp cấu hình .env từ thư mục gốc của workspace hoặc thư mục backend
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Xuất các biến môi trường cấu hình hệ thống
export const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
};
