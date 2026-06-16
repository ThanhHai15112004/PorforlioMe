export interface NavItem {
  path: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detail: string;
  tech: string[];
  tag: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Trang chủ' },
  { path: '/projects', label: 'Dự án của tôi' },
  { path: '/about', label: 'Giới thiệu' },
  { path: '/contact', label: 'Liên hệ' }
];

export const PROJECTS_LIST: Project[] = [
  { 
    id: '1', 
    title: 'Hệ thống Quản lý Bệnh viện', 
    description: 'Ứng dụng quản lý lịch hẹn, bệnh án điện tử và thanh toán hóa đơn trực tuyến.', 
    detail: 'Dự án này giúp tự động hóa 80% quy trình đăng ký khám bệnh. Sử dụng React để xây dựng dashboard và Socket.io để cập nhật trạng thái lịch hẹn theo thời gian thực.', 
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    tag: 'React & Node.js' 
  },
  { 
    id: '2', 
    title: 'Nền tảng E-Learning trực tuyến', 
    description: 'Hệ thống học tập trực tuyến tích hợp video streaming và kiểm tra đánh giá năng lực.', 
    detail: 'Hệ thống hỗ trợ hơn 10.000 học viên học tập đồng thời mà không bị gián đoạn. Tích hợp CDN AWS Cloudfront để tối ưu luồng video.', 
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'AWS S3'],
    tag: 'Next.js & NestJS' 
  },
  { 
    id: '3', 
    title: 'Ứng dụng Tài chính Cá nhân', 
    description: 'Công cụ theo dõi thu chi, lập kế hoạch ngân sách và phân tích xu hướng tài chính.', 
    detail: 'Ứng dụng di động lai sử dụng React Native và Vite cho web app. Hỗ trợ biểu đồ trực quan hóa dữ liệu và xuất báo cáo PDF/Excel.', 
    tech: ['Vite', 'React', 'TailwindCSS', 'Chart.js', 'Vercel'],
    tag: 'Vite & Tailwind CSS' 
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'GitHub', url: '#' },
  { platform: 'LinkedIn', url: '#' },
  { platform: 'Twitter', url: '#' }
];

export * from './theme';

