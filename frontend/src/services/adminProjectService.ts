import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../constants/api';
import type {
  AdminProjectRaw,
  CreateProjectPayload,
  UpdateProjectPayload,
  PaginatedProjectsResult,
} from '../types/adminProject';
import type { AdminMockProject } from '../constants/admin';

export interface AdminProjectQueryParams {
  page?: number;
  limit?: number;
  tag?: string;
  search?: string;
  isPublished?: boolean | string;
  featured?: boolean | string;
}

// Service bọc tất cả các lệnh gọi RESTful API dành cho Admin Projects
export const adminProjectService = {
  // 1. Lấy danh sách toàn bộ dự án cho Admin CMS
  getAdminProjects: async (
    params: AdminProjectQueryParams = {}
  ): Promise<PaginatedProjectsResult<AdminMockProject>> => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', String(params.page));
    if (params.limit) query.append('limit', String(params.limit));
    if (params.tag && params.tag !== 'all') query.append('tag', params.tag);
    if (params.search) query.append('search', params.search);
    if (params.isPublished !== undefined && params.isPublished !== '') {
      query.append('isPublished', String(params.isPublished));
    }
    if (params.featured !== undefined && params.featured !== '') {
      query.append('featured', String(params.featured));
    }

    const endpoint = `${API_ENDPOINTS.ADMIN_PROJECTS.GET_ALL}?${query.toString()}`;
    const response = await apiClient<AdminMockProject[]>(endpoint);

    return {
      data: response.data || [],
      pagination: (response as any).pagination || {
        page: params.page || 1,
        limit: params.limit || 10,
        totalItems: (response.data || []).length,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  },

  // 2. Lấy chi tiết thô dự án theo ID cho Admin Form Editor (chứa cả bản dịch Tiếng Việt & Tiếng Anh)
  getAdminProjectById: async (id: number | string): Promise<AdminProjectRaw> => {
    const response = await apiClient<AdminProjectRaw>(
      API_ENDPOINTS.ADMIN_PROJECTS.GET_BY_ID(id)
    );
    return response.data;
  },

  // 3. Tạo mới dự án
  createProject: async (payload: CreateProjectPayload): Promise<AdminProjectRaw> => {
    const response = await apiClient<AdminProjectRaw>(
      API_ENDPOINTS.ADMIN_PROJECTS.CREATE,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
    return response.data;
  },

  // 4. Cập nhật dự án theo ID
  updateProject: async (
    id: number | string,
    payload: UpdateProjectPayload
  ): Promise<AdminProjectRaw> => {
    const response = await apiClient<AdminProjectRaw>(
      API_ENDPOINTS.ADMIN_PROJECTS.UPDATE(id),
      {
        method: 'PUT',
        body: JSON.stringify(payload),
      }
    );
    return response.data;
  },

  // 5. Cập nhật nhanh trạng thái Nổi bật / Phụ bản / Thứ tự
  updateProjectStatus: async (
    id: number | string,
    statusData: { featured?: boolean; isPublished?: boolean; order?: number }
  ): Promise<AdminMockProject> => {
    const response = await apiClient<AdminMockProject>(
      API_ENDPOINTS.ADMIN_PROJECTS.UPDATE_STATUS(id),
      {
        method: 'PATCH',
        body: JSON.stringify(statusData),
      }
    );
    return response.data;
  },

  // 6. Xóa vĩnh viễn dự án theo ID
  deleteProject: async (id: number | string): Promise<{ id: number }> => {
    const response = await apiClient<{ id: number }>(
      API_ENDPOINTS.ADMIN_PROJECTS.DELETE(id),
      {
        method: 'DELETE',
      }
    );
    return response.data;
  },
};
