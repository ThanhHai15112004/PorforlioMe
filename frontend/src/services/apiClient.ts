import type { ApiResponse } from '../types/api';
import { API_BASE_URL } from '../constants/api';

/**
 * Client gọi API dùng chung bọc Fetch API tiêu chuẩn
 * Tự động gắn Header Accept-Language và Content-Type
 */
export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const currentLang = localStorage.getItem('app_lang');

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(currentLang && { 'Accept-Language': currentLang }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data: ApiResponse<T> = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
};
