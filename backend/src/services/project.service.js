import slugify from 'slugify';
import * as projectModel from '#models/project.model.js';

// Dịch vụ xử lý nghiệp vụ lấy danh sách dự án (Phân trang + Lọc + i18n)
export const getProjectsList = async (queryParams) => {
  return await projectModel.findProjects(queryParams);
};

// Dịch vụ xử lý nghiệp vụ lấy thông tin chi tiết dự án theo slug
export const getProjectDetailBySlug = async (slug, lang) => {
  return await projectModel.findProjectBySlug(slug, lang);
};

// Dịch vụ xử lý nghiệp vụ tạo mới dự án
export const createNewProject = async (data) => {
  let { slug, translations, ...coreData } = data || {};

  // Tự động sinh slug từ tiêu đề tiếng Việt hoặc tiếng Anh nếu để trống
  if (!slug && translations && Array.isArray(translations) && translations.length > 0) {
    const firstTitle = translations[0].title || 'project';
    slug = slugify(firstTitle, { lower: true, strict: true });
  }

  return await projectModel.createProject({
    slug: slug || `project-${Date.now()}`,
    translations,
    ...coreData,
  });
};

// Dịch vụ xử lý nghiệp vụ cập nhật thông tin dự án
export const updateProject = async (id, data) => {
  return await projectModel.updateProject(id, data);
};

// Dịch vụ xử lý nghiệp vụ xóa dự án
export const deleteProject = async (id) => {
  return await projectModel.deleteProject(id);
};
