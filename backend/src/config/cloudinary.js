import { v2 as cloudinary } from 'cloudinary';
import { env } from '#config/env.js';

// Khởi tạo kết nối cấu hình SDK Cloudinary v2 từ các biến môi trường
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
