import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';

export interface UploadResponse {
  url: string;
  public_id?: string;
}

// Service gọi API Tải ảnh lên Cloudinary Backend dùng hằng số API_ENDPOINTS tập trung
export const uploadService = {
  uploadImage: async (file: File, folder: string = 'portfolio/projects'): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const adminToken = localStorage.getItem('admin_token');

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.UPLOAD.IMAGE}`, {
      method: 'POST',
      headers: {
        ...(adminToken && { Authorization: `Bearer ${adminToken}` }),
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message);
    }

    return data.data;
  },
};
