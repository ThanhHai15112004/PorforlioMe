import * as projectModel from '../models/project.model.js';

// Dịch vụ xử lý nghiệp vụ lấy danh sách toàn bộ dự án (Thông qua tầng Model)
export const getAllProjects = async () => {
  return await projectModel.findAllProjects();
};

// Dịch vụ xử lý nghiệp vụ lấy thông tin chi tiết dự án theo slug (Thông qua tầng Model)
export const getProjectBySlug = async (slug) => {
  return await projectModel.findProjectBySlug(slug);
};

// Dịch vụ xử lý nghiệp vụ tạo mới một dự án
export const createNewProject = async (projectData) => {
  return await projectModel.createProject(projectData);
};
