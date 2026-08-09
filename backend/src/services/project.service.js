import slugify from 'slugify';
import * as projectModel from '#models/project.model.js';
import { deleteImage } from '#services/upload.service.js';
import { prisma } from '#config/prisma.js';

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

// Dịch vụ xử lý nghiệp vụ xóa dự án (Dọn dẹp ảnh trên Cloudinary trước khi xóa DB)
export const deleteProject = async (id) => {
  const numId = Number(id);

  // 1. Kiểm tra và lấy danh sách các ảnh đã lưu trên Cloudinary của dự án
  const existingProject = await prisma.project.findUnique({
    where: { id: numId },
    select: { images: true },
  });

  if (existingProject && Array.isArray(existingProject.images)) {
    for (const img of existingProject.images) {
      if (img && typeof img === 'object' && img.public_id) {
        try {
          await deleteImage(img.public_id);
        } catch (error) {
          console.error(`[Dọn dẹp Cloudinary] Không thể xóa ảnh ${img.public_id}:`, error);
        }
      }
    }
  }

  // 2. Xóa bản ghi dự án khỏi cơ sở dữ liệu
  return await projectModel.deleteProject(numId);
};

