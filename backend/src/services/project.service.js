import { prisma } from '../config/prisma.js';
import { getMessage } from '../lang/index.js';

// Dịch vụ xử lý dữ liệu các dự án (Tương tác với cơ sở dữ liệu MySQL qua Prisma)
export const getAllProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (projects.length > 0) {
      return projects;
    }
  } catch (error) {
    console.warn(`[Prisma DB Warning] ${error.message}`);
  }

  // Dữ liệu mẫu dự phòng nếu bảng dữ liệu mới tạo chưa có bản ghi
  return [
    {
      id: '1',
      title: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Ứng dụng mua sắm hiện đại sử dụng React & Express backend.',
      techStack: ['React', 'Node.js', 'Prisma', 'TailwindCSS'],
      featured: true,
    },
    {
      id: '2',
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      description: 'Website portfolio cá nhân tương tác có thành phần 3D.',
      techStack: ['Vite', 'React', 'Three.js', 'Express'],
      featured: true,
    },
  ];
};

export const getProjectBySlug = async (slug) => {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    if (project) return project;
  } catch (error) {
    console.warn(`[Prisma DB Warning] ${error.message}`);
  }

  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug);
};
