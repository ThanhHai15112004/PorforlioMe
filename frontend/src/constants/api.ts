// Cấu hình các hằng số API và Endpoints dùng chung trong ứng dụng

// Đường dẫn API gốc (lấy từ biến môi trường VITE_API_URL hoặc mặc định '/api' khi deploy chung 1 domain trên Vercel)
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Danh sách tập trung tất cả các API Endpoints (Client Public & Admin CMS)
export const API_ENDPOINTS = {
  HEALTH: '/health',
  PROJECTS: {
    GET_ALL: '/projects',
    GET_BY_SLUG: (slug: string) => `/projects/${slug}`,
  },
  ADMIN_PROJECTS: {
    GET_ALL: '/projects/admin/all',
    GET_BY_ID: (id: number | string) => `/projects/admin/${id}`,
    CREATE: '/projects',
    UPDATE: (id: number | string) => `/projects/${id}`,
    UPDATE_STATUS: (id: number | string) => `/projects/${id}/status`,
    DELETE: (id: number | string) => `/projects/${id}`,
  },
  UPLOAD: {
    IMAGE: '/upload/image',
    DELETE: '/upload/image',
  },
  CONTACT: '/contact',
} as const;

// Thời gian chờ mặc định cho lệnh gọi API (miliseconds)
export const API_TIMEOUT = 10000;
