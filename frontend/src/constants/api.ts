// Cấu hình các hằng số API và Endpoints dùng chung trong ứng dụng

// Đường dẫn API gốc (lấy từ biến môi trường VITE_API_URL hoặc mặc định '/api' khi deploy chung 1 domain trên Vercel)
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Danh sách tập trung tất cả các API Endpoints
export const API_ENDPOINTS = {
  HEALTH: '/health',
  PROJECTS: {
    GET_ALL: '/projects',
    GET_BY_SLUG: (slug: string) => `/projects/${slug}`,
  },
  CONTACT: '/contact',
} as const;

// Thời gian chờ mặc định cho lệnh gọi API (miliseconds)
export const API_TIMEOUT = 10000;
