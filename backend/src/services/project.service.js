import { prisma } from '../config/prisma.js';

// Dịch vụ lấy danh sách toàn bộ dự án từ cơ sở dữ liệu Supabase PostgreSQL
export const getAllProjects = async () => {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

// Dịch vụ lấy thông tin chi tiết dự án theo slug từ cơ sở dữ liệu Supabase PostgreSQL
export const getProjectBySlug = async (slug) => {
  return await prisma.project.findUnique({
    where: { slug },
  });
};
