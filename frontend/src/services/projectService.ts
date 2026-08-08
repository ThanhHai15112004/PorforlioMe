import { apiClient } from './apiClient';
import type { Project } from '../types/project';
import { API_ENDPOINTS } from '../constants/api';

// Dịch vụ gọi API liên quan đến danh sách và chi tiết các Dự án
export const projectService = {
  // Lấy danh sách toàn bộ dự án từ Backend
  getAllProjects: async (): Promise<Project[]> => {
    const res = await apiClient<Project[]>(API_ENDPOINTS.PROJECTS.GET_ALL);
    return res.data;
  },

  // Lấy chi tiết dự án theo slug từ Backend
  getProjectBySlug: async (slug: string): Promise<Project> => {
    const res = await apiClient<Project>(API_ENDPOINTS.PROJECTS.GET_BY_SLUG(slug));
    return res.data;
  },
};
