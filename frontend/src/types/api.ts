// Định nghĩa kiểu dữ liệu Phản hồi API chuẩn từ Backend
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

// Định nghĩa kiểu dữ liệu Phản hồi Lỗi API
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: any;
}
