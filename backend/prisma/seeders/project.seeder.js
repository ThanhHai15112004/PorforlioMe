import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Seeder tự động nạp danh sách 6 dự án thực tế khởi tạo vào cơ sở dữ liệu Supabase
export const seedProjects = async () => {
  console.log('🌱 [Seeder] Đang nạp danh sách các dự án thực tế...');

  // Dự án 1: Portfolio Website
  await prisma.project.upsert({
    where: { slug: 'portfolio-website' },
    update: {},
    create: {
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      description: 'Website portfolio cá nhân xây dựng bằng React, TypeScript và Node.js. Tích hợp hiệu ứng 3D, animation mượt mà và thiết kế hiện đại theo phong cách Light UI.',
      content: 'Dự án portfolio cá nhân được xây dựng bằng kiến trúc Fullstack Monorepo. Frontend sử dụng React + TypeScript + Vite với hiệu ứng 3D ở Hero section. Backend là Node.js Express REST API kết nối Supabase PostgreSQL qua Prisma ORM. Deploy toàn bộ lên Vercel Serverless.',
      techStack: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'Prisma', 'Supabase', 'PostgreSQL', 'Vercel'],
      demoUrl: 'https://pthprofile.vercel.app',
      githubUrl: 'https://github.com/ThanhHai15112004/PorforlioMe',
      featured: true,
    },
  });

  // Dự án 2: E-Commerce Platform
  await prisma.project.upsert({
    where: { slug: 'ecommerce-platform' },
    update: {},
    create: {
      title: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Ứng dụng thương mại điện tử hiện đại với đầy đủ tính năng: quản lý sản phẩm, giỏ hàng, thanh toán và dashboard quản trị.',
      content: 'Hệ thống E-Commerce đầy đủ chức năng bao gồm trang bán hàng, giỏ hàng, thanh toán trực tuyến tích hợp, trang quản trị admin với báo cáo thống kê doanh thu và quản lý đơn hàng.',
      techStack: ['React', 'Node.js', 'Express', 'MySQL', 'Prisma', 'TailwindCSS', 'JWT'],
      featured: true,
    },
  });

  // Dự án 3: Hệ thống Quản lý Y tế
  await prisma.project.upsert({
    where: { slug: 'healthcare-management-system' },
    update: {},
    create: {
      title: 'Hệ thống Quản lý Y tế',
      slug: 'healthcare-management-system',
      description: 'Hệ thống quản lý phòng khám và bệnh viện toàn diện hỗ trợ đặt lịch khám, quản lý hồ sơ bệnh nhân và theo dõi điều trị.',
      content: 'Nền tảng quản lý y tế tích hợp hệ thống đặt lịch khám trực tuyến, quản lý hồ sơ bệnh nhân, kê đơn thuốc điện tử và báo cáo y tế. Được xây dựng theo kiến trúc microservices đảm bảo tính bảo mật cao cho dữ liệu y tế.',
      techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'JWT'],
      featured: true,
    },
  });

  // Dự án 4: AI Workflow Automation
  await prisma.project.upsert({
    where: { slug: 'ai-workflow-automation' },
    update: {},
    create: {
      title: 'AI Workflow Automation',
      slug: 'ai-workflow-automation',
      description: 'Nền tảng tự động hóa quy trình làm việc sử dụng AI cho phép người dùng xây dựng và triển khai các luồng xử lý dữ liệu thông minh.',
      content: 'Ứng dụng tự động hóa quy trình công việc được hỗ trợ bởi AI. Người dùng có thể kéo thả để xây dựng workflow phức tạp kết nối nhiều API và dịch vụ bên ngoài. Hệ thống tích hợp mô hình ngôn ngữ lớn để phân tích và xử lý dữ liệu tự động.',
      techStack: ['React', 'Python', 'FastAPI', 'LangChain', 'OpenAI', 'PostgreSQL', 'Docker'],
      featured: false,
    },
  });

  // Dự án 5: LMS - Learning Management System
  await prisma.project.upsert({
    where: { slug: 'learning-management-system' },
    update: {},
    create: {
      title: 'Learning Management System (LMS)',
      slug: 'learning-management-system',
      description: 'Hệ thống quản lý học tập trực tuyến với đầy đủ tính năng: tạo khóa học, quản lý học viên, theo dõi tiến độ và chứng chỉ.',
      content: 'Nền tảng e-learning toàn diện cho phép giảng viên tạo và quản lý khóa học với video, tài liệu, bài kiểm tra. Học viên có thể đăng ký, học tập và nhận chứng chỉ hoàn thành. Tích hợp thanh toán và theo dõi tiến độ học tập chi tiết.',
      techStack: ['Next.js', 'TypeScript', 'Node.js', 'MySQL', 'Prisma', 'AWS S3', 'Stripe'],
      featured: false,
    },
  });

  // Dự án 6: DevOps Dashboard
  await prisma.project.upsert({
    where: { slug: 'devops-dashboard' },
    update: {},
    create: {
      title: 'DevOps Monitoring Dashboard',
      slug: 'devops-dashboard',
      description: 'Dashboard giám sát hệ thống DevOps tập trung hiển thị trạng thái server, pipeline CI/CD và các cảnh báo theo thời gian thực.',
      content: 'Bảng điều khiển giám sát infrastructure tập trung. Theo dõi CPU, RAM, disk và network của nhiều server cùng lúc. Tích hợp với GitHub Actions, Jenkins để hiển thị trạng thái CI/CD pipeline. Cảnh báo tức thời qua Slack và Email khi hệ thống gặp sự cố.',
      techStack: ['React', 'Node.js', 'WebSocket', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana'],
      featured: false,
    },
  });

  console.log('✅ [Seeder] Đã nạp thành công 6 dự án mẫu vào Cơ sở dữ liệu!');
};
