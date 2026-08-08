import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Hàm tự động nạp dữ liệu mẫu khởi tạo vào cơ sở dữ liệu Supabase
async function main() {
  console.log('🌱 Đang nạp tự động dữ liệu mẫu vào Cơ sở dữ liệu...');

  // Dự án mẫu 1: E-Commerce Platform
  await prisma.project.upsert({
    where: { slug: 'ecommerce-platform' },
    update: {},
    create: {
      title: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Ứng dụng mua sắm hiện đại sử dụng React & Express backend.',
      techStack: ['React', 'Node.js', 'Prisma', 'TailwindCSS'],
      featured: true,
    },
  });

  // Dự án mẫu 2: Portfolio Website
  await prisma.project.upsert({
    where: { slug: 'portfolio-website' },
    update: {},
    create: {
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      description: 'Website portfolio cá nhân tương tác có thành phần 3D.',
      techStack: ['Vite', 'React', 'Three.js', 'Express'],
      featured: true,
    },
  });

  console.log('✅ Đã nạp thành công dữ liệu mẫu khởi tạo!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi nạp dữ liệu mẫu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
