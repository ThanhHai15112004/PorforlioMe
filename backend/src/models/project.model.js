import { prisma } from '../config/prisma.js';

/**
 * Định nghĩa cấu trúc Entity Project (Mẫu đối tượng Dự án)
 * @typedef {Object} ProjectEntity
 * @property {string} id - Định danh duy nhất (UUID)
 * @property {string} title - Tiêu đề dự án
 * @property {string} slug - Chuỗi định danh URL duy nhất
 * @property {string} description - Mô tả ngắn gọn dự án
 * @property {string|null} content - Nội dung chi tiết bài viết dự án
 * @property {string[]} techStack - Danh sách danh mục công nghệ sử dụng
 * @property {string|null} imageUrl - Đường dẫn hình ảnh minh họa
 * @property {string|null} demoUrl - Đường dẫn xem thử dự án trực tiếp
 * @property {string|null} githubUrl - Đường dẫn mã nguồn GitHub
 * @property {boolean} featured - Trạng thái nổi bật hiển thị ở trang chủ
 * @property {Date} createdAt - Thời gian khởi tạo bản ghi
 * @property {Date} updatedAt - Thời gian cập nhật bản ghi gần nhất
 */

// Hàm định dạng và chuẩn hóa dữ liệu Entity Project
export const formatProjectEntity = (data) => {
  if (!data) return null;
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    content: data.content || null,
    techStack: Array.isArray(data.techStack) ? data.techStack : [],
    imageUrl: data.imageUrl || null,
    demoUrl: data.demoUrl || null,
    githubUrl: data.githubUrl || null,
    featured: Boolean(data.featured),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

// --- CÁC HÀM TRUY VẤN CƠ SỞ DỮ LIỆU (DATABASE QUERIES) ---

// Truy vấn danh sách toàn bộ dự án (sắp xếp theo thời gian mới nhất)
export const findAllProjects = async () => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return projects.map(formatProjectEntity);
};

// Truy vấn thông tin chi tiết dự án theo slug
export const findProjectBySlug = async (slug) => {
  const project = await prisma.project.findUnique({
    where: { slug },
  });
  return formatProjectEntity(project);
};

// Tạo mới một bản ghi dự án
export const createProject = async (projectData) => {
  const newProject = await prisma.project.create({
    data: projectData,
  });
  return formatProjectEntity(newProject);
};

// Cập nhật thông tin dự án theo ID
export const updateProject = async (id, projectData) => {
  const updatedProject = await prisma.project.update({
    where: { id },
    data: projectData,
  });
  return formatProjectEntity(updatedProject);
};

// Xóa dự án theo ID
export const deleteProject = async (id) => {
  const deletedProject = await prisma.project.delete({
    where: { id },
  });
  return formatProjectEntity(deletedProject);
};
