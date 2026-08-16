export interface AdminNavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
}

export interface AdminMockProject {
  id: number;
  title: string;
  slug: string;
  tag: string;
  isPublished: boolean;
  featured: boolean;
  updatedAt: string;
  coverImage?: string;
  description?: string;
  role?: string;
  client?: string;
  timeline?: string;
  techStack?: string[];
  demoUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  images?: { url: string; captionVi?: string; captionEn?: string }[];
  gallery?: { url: string; captionVi: string; captionEn: string }[];
  overviewVi?: string;
  overviewEn?: string;
  problemsVi?: string;
  problemsEn?: string;
  solutionsVi?: string;
  solutionsEn?: string;
  resultsVi?: string;
  resultsEn?: string;
}

export interface AdminMockMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  content: string;
  status: 'unread' | 'read' | 'archived';
  time: string;
  createdAt: string;
}

export interface AdminTrafficData {
  day: string;
  views: number;
  height: string;
}

export interface AdminSkill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools';
  icon: string;
  level: number; // 0 - 100
}

export interface AdminTimelineItem {
  id: string;
  period: string;
  titleVi: string;
  titleEn: string;
  organizationVi: string;
  organizationEn: string;
  descriptionVi: string;
  descriptionEn: string;
  category: 'experience' | 'education' | 'award';
}

export interface AdminSettingsData {
  name: string;
  email: string;
  avatarUrl: string;
  seoTitle: string;
  seoDescription: string;
  githubUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  zaloUrl: string;
}

// Danh sách các mục menu điều hướng chính của trang Admin theo ngôn ngữ
export function getAdminNavItems(lang: 'vi' | 'en'): AdminNavItem[] {
  const isVi = lang === 'vi';
  return [
    {
      label: isVi ? 'Tổng quan' : 'Overview',
      path: '/admin/dashboard',
      icon: 'ant-design:dashboard-outlined',
    },
    {
      label: isVi ? 'Quản lý dự án' : 'Projects Manager',
      path: '/admin/projects',
      icon: 'ant-design:project-outlined',
    },
    {
      label: isVi ? 'Tin nhắn liên hệ' : 'Messages Inbox',
      path: '/admin/messages',
      icon: 'ant-design:mail-outlined',
      badge: 3,
    },
    {
      label: isVi ? 'Kỹ năng & Hành trình' : 'Skills & Timeline',
      path: '/admin/skills',
      icon: 'ant-design:code-outlined',
    },
    {
      label: isVi ? 'Cài đặt hệ thống' : 'Settings',
      path: '/admin/settings',
      icon: 'ant-design:setting-outlined',
    },
  ];
}

// Dữ liệu mẫu danh sách Dự án mới cập nhật trên Dashboard theo ngôn ngữ
export function getMockAdminProjects(lang: 'vi' | 'en'): AdminMockProject[] {
  const isVi = lang === 'vi';
  return [
    {
      id: 1,
      title: 'Enterprise Learning Management System',
      slug: 'enterprise-lms',
      tag: 'LMS',
      isPublished: true,
      featured: true,
      updatedAt: isVi ? '10 phút trước' : '10 minutes ago',
      role: 'Lead Full-stack Engineer',
      client: 'EdTech Vietnam Enterprise',
      timeline: '2025 – 2026',
      techStack: ['Node.js', 'Express', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'],
      demoUrl: 'https://lms.thanhhai.dev',
      githubUrl: 'https://github.com/ThanhHai15112004/enterprise-lms',
      description: isVi
        ? 'Nền tảng quản lý học tập trực tuyến doanh nghiệp phục vụ 50,000+ học viên đồng thời.'
        : 'Enterprise online learning management platform serving 50,000+ simultaneous students.',
      overviewVi: 'Hệ thống LMS Enterprise tích hợp tính năng phát video chuẩn HLS, quản lý tiến trình học tập real-time và hệ thống thi trắc nghiệm tự động chấm điểm.',
      overviewEn: 'Enterprise LMS platform integrating HLS video streaming, real-time learning progress tracking, and automated exam grading.',
      problemsVi: 'Hệ thống cũ bị giật lag khi có hơn 5,000 học viên truy cập cùng lúc; thời gian phản hồi API trung bình lên tới 2.5s.',
      problemsEn: 'Legacy system lagged severely when over 5,000 students accessed simultaneously; average API latency exceeded 2.5s.',
      solutionsVi: 'Thiết kế kiến trúc phân lớp Express + Prisma kết hợp Redis Cache layer và thuật toán phân luồng Queue HLS giúp tải video siêu mượt.',
      solutionsEn: 'Designed layered Express + Prisma architecture with Redis caching and HLS Queue worker threads for ultra-smooth streaming.',
      resultsVi: 'Giảm 85% độ trễ API xuống còn < 45ms; chịu tải thành công 50,000+ người dùng đồng thời trong đợt thi học kỳ.',
      resultsEn: 'Reduced API latency by 85% down to < 45ms; successfully handled 50,000+ concurrent users during finals exam period.',
    },
    {
      id: 2,
      title: 'Video Streaming HLS Queue System',
      slug: 'video-hls-streaming',
      tag: 'Backend',
      isPublished: true,
      featured: false,
      updatedAt: isVi ? '2 giờ trước' : '2 hours ago',
      role: 'Backend Architect',
      client: 'MediaTech Global',
      timeline: '2025',
      techStack: ['Node.js', 'FFmpeg', 'RabbitMQ', 'AWS S3', 'Cloudinary', 'Redis'],
      demoUrl: 'https://stream.thanhhai.dev',
      githubUrl: 'https://github.com/ThanhHai15112004/video-hls-queue',
      description: isVi
        ? 'Hệ thống hàng chờ xử lý video mã hóa phân đoạn HLS m3u8 tự động scaling.'
        : 'Automated video encoding HLS queue system with dynamic worker scaling.',
      overviewVi: 'Giải pháp mã hóa đa định dạng 1080p, 720p, 480p tự động cắt thành các file segment .ts để phát mượt trên mọi thiết bị di động.',
      overviewEn: 'Multi-resolution encoding (1080p, 720p, 480p) automatically chunking video into .ts segments for mobile playback.',
    },
    {
      id: 3,
      title: 'DevOps Automated Deployment Pipeline',
      slug: 'devops-ci-cd',
      tag: 'DevOps',
      isPublished: false,
      featured: false,
      updatedAt: isVi ? '1 ngày trước' : '1 day ago',
      role: 'DevOps Engineer',
      client: 'Internal Project',
      timeline: '2026',
      techStack: ['Docker', 'Kubernetes', 'GitHub Actions', 'Nginx', 'Traefik', 'Prometheus'],
      description: isVi
        ? 'Quy trình CI/CD tự động hóa đóng gói container và triển khai Zero-downtime.'
        : 'Automated CI/CD container packaging and zero-downtime deployment pipeline.',
    },
    {
      id: 4,
      title: 'Personal Developer Portfolio v2',
      slug: 'portfolio-v2',
      tag: 'Frontend',
      isPublished: true,
      featured: true,
      updatedAt: isVi ? '3 ngày trước' : '3 days ago',
      role: 'Full-stack Developer & Designer',
      client: 'Personal Project',
      timeline: '2026',
      techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Prisma'],
      demoUrl: 'https://thanhhai.dev',
      githubUrl: 'https://github.com/ThanhHai15112004/PorforlioMe',
      description: isVi
        ? 'Trang web Portfolio cá nhân giao diện Light UI / White Interactive kết hợp 3D Hero.'
        : 'Personal developer portfolio with Light UI / White Interactive design & 3D Hero.',
    },
  ];
}

// Dữ liệu mẫu danh sách Tin nhắn liên hệ theo ngôn ngữ
export function getMockAdminMessages(lang: 'vi' | 'en'): AdminMockMessage[] {
  const isVi = lang === 'vi';
  return [
    {
      id: 'm1',
      name: 'Nguyễn Văn An',
      email: 'an.nguyen@enterprise-edtech.vn',
      phone: '0908 123 456',
      subject: isVi ? 'Hợp tác phát triển dự án LMS Enterprise' : 'Cooperation inquiry for LMS Enterprise',
      content: isVi
        ? 'Chào Thanh Hải, bên mình đang có nhu cầu tư vấn và hợp tác xây dựng hệ thống LMS cho tập đoàn giáo dục với khoảng 50k sinh viên. Rất mong có cơ hội trao đổi trực tiếp với Hải qua Email hoặc Zalo.'
        : 'Hi Thanh Hai, we are looking for architectural consulting and cooperation to build an LMS system for an educational enterprise serving ~50k students. Looking forward to discussing with you.',
      status: 'unread',
      time: isVi ? '15 phút trước' : '15 minutes ago',
      createdAt: '2026-08-09 12:45',
    },
    {
      id: 'm2',
      name: 'Trần Thị Nga',
      email: 'nga.tran@techcorp.vn',
      phone: '0912 345 678',
      subject: isVi ? 'Tư vấn giải pháp Streaming Video HLS' : 'Consulting for Video Streaming HLS',
      content: isVi
        ? 'Chào bạn Hải, mình ấn tượng với dự án HLS Queue System trên GitHub của bạn. Bên mình muốn nhờ bạn tư vấn giải pháp mã hóa video tối ưu chi phí AWS S3 và RabbitMQ.'
        : 'Hi Hai, I am impressed by your HLS Queue System project on GitHub. We would like your advice on optimizing AWS S3 and RabbitMQ video encoding costs.',
      status: 'unread',
      time: isVi ? '1 giờ trước' : '1 hour ago',
      createdAt: '2026-08-09 11:30',
    },
    {
      id: 'm3',
      name: 'Lê Hoàng Dũng',
      email: 'dung.le@startup.io',
      phone: '0988 777 666',
      subject: isVi ? 'Mời ứng tuyển vị trí Senior Full-stack' : 'Invitation for Senior Full-stack role',
      content: isVi
        ? 'Chào Hải, bên mình là Startup công nghệ chuyên về AI & Realtime Cloud Solution. Bên mình muốn mời Hải tham gia vị trí Lead Backend / Senior Full-stack với chế độ rất hấp dẫn.'
        : 'Hi Hai, we are an AI & Realtime Cloud tech startup. We would love to invite you to join as Lead Backend / Senior Full-stack with a highly competitive package.',
      status: 'unread',
      time: isVi ? '3 giờ trước' : '3 hours ago',
      createdAt: '2026-08-09 09:15',
    },
    {
      id: 'm4',
      name: 'Phạm Minh Đức',
      email: 'duc.pham@devops-consulting.com',
      phone: '0934 567 890',
      subject: isVi ? 'Thắc mắc về quy trình CI/CD Kubernetes' : 'Inquiry about Kubernetes CI/CD Pipeline',
      content: isVi
        ? 'Chào bạn, mình đã xem qua mô hình CI/CD của bạn trên Portfolio và rất thích cách bạn cấu hình Traefik & Nginx Reverse Proxy. Bạn có thể chia sẻ tệp config mẫu được không?'
        : 'Hi there, I checked your CI/CD model on your portfolio and really liked how you configured Traefik & Nginx Reverse Proxy. Could you share a sample config file?',
      status: 'read',
      time: isVi ? '1 ngày trước' : '1 day ago',
      createdAt: '2026-08-08 16:20',
    },
    {
      id: 'm5',
      name: 'Hoàng Quốc Việt',
      email: 'viet.hoang@investors-network.org',
      subject: isVi ? 'Đánh giá dự án và đề xuất tài trợ' : 'Project evaluation and sponsorship proposal',
      content: isVi
        ? 'Chào Hải, mạng lưới nhà đầu tư thiên thần bên mình đánh giá rất cao năng lực cá nhân và các dự án Open Source của bạn. Hãy phản hồi mail này để đặt lịch trao đổi online nhé.'
        : 'Hi Hai, our angel investor network highly evaluates your personal capabilities and open-source projects. Please reply to schedule an online meeting.',
      status: 'archived',
      time: isVi ? '3 ngày trước' : '3 days ago',
      createdAt: '2026-08-06 10:00',
    },
  ];
}

// Dữ liệu mẫu danh sách Kỹ năng kỹ thuật
export function getMockAdminSkills(): AdminSkill[] {
  return [
    { id: 's1', name: 'Node.js & Express', category: 'backend', icon: 'ant-design:code-outlined', level: 92 },
    { id: 's2', name: 'TypeScript & JavaScript ES6+', category: 'backend', icon: 'ant-design:code-outlined', level: 90 },
    { id: 's3', name: 'React 19 & Vite', category: 'frontend', icon: 'ant-design:layout-outlined', level: 88 },
    { id: 's4', name: 'Prisma ORM & PostgreSQL', category: 'tools', icon: 'ant-design:database-outlined', level: 85 },
    { id: 's5', name: 'Redis Cache & RabbitMQ', category: 'backend', icon: 'ant-design:thunderbolt-outlined', level: 82 },
    { id: 's6', name: 'Docker & CI/CD Pipeline', category: 'devops', icon: 'ant-design:cloud-server-outlined', level: 80 },
    { id: 's7', name: 'Tailwind CSS & Glassmorphism', category: 'frontend', icon: 'ant-design:bg-colors-outlined', level: 90 },
    { id: 's8', name: 'Cloudinary & AWS S3 Storage', category: 'devops', icon: 'ant-design:cloud-upload-outlined', level: 85 },
  ];
}

// Dữ liệu mẫu mốc Thời gian sự nghiệp (Career Timeline)
export function getMockAdminTimeline(): AdminTimelineItem[] {
  return [
    {
      id: 't1',
      period: '2025 – 2026',
      titleVi: 'Full-stack Engineer & System Architect',
      titleEn: 'Full-stack Engineer & System Architect',
      organizationVi: 'Dự án LMS Enterprise & Media Streaming',
      organizationEn: 'LMS Enterprise & Media Streaming Projects',
      descriptionVi: 'Chịu trách nhiệm thiết kế kiến trúc phân lớp Express + Prisma, tối ưu hóa phát video HLS và chịu tải 50,000+ sinh viên.',
      descriptionEn: 'Responsible for designing Express + Prisma architecture, HLS video optimization, and handling 50k+ students.',
      category: 'experience',
    },
    {
      id: 't2',
      period: '2024 – 2025',
      titleVi: 'Kỹ sư Phần mềm (Software Engineering)',
      titleEn: 'Software Engineering Major',
      organizationVi: 'Đại Học Công Nghệ / Công Ty Công Nghệ',
      organizationEn: 'University of Technology',
      descriptionVi: 'Nghiên cứu phát triển Web Frontend với React/TypeScript và Backend dịch vụ microservices.',
      descriptionEn: 'Researched Web Frontend with React/TypeScript and Backend microservices.',
      category: 'education',
    },
    {
      id: 't3',
      period: '2024',
      titleVi: 'Giải Nhất Cuộc Thi Lập Trình Open Source',
      titleEn: '1st Prize Open Source Hackathon',
      organizationVi: 'Hội Công Nghệ Thông Tin',
      organizationEn: 'IT Association Hackathon',
      descriptionVi: 'Xây dựng thư viện mã nguồn mở giúp tối ưu hóa hàng chờ mã hóa video HLS.',
      descriptionEn: 'Built open-source library for HLS video encoding queue optimization.',
      category: 'award',
    },
  ];
}

// Dữ liệu mẫu cài đặt hệ thống
export function getMockAdminSettings(): AdminSettingsData {
  return {
    name: 'Thanh Hải',
    email: 'thanhhai.dev@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop',
    seoTitle: 'Thanh Hải | Full-stack Engineer Portfolio',
    seoDescription: 'Web portfolio cá nhân của Thanh Hải — Chuyên gia phát triển ứng dụng Web React, Node.js Express, Prisma và kiến trúc hệ thống high-performance.',
    githubUrl: 'https://github.com/ThanhHai15112004/PorforlioMe',
    linkedinUrl: 'https://linkedin.com/in/thanhhai-dev',
    facebookUrl: 'https://facebook.com/thanhhai.dev',
    zaloUrl: '0908123456',
  };
}

// Dữ liệu mẫu biểu đồ lượt truy cập 7 ngày qua theo ngôn ngữ
export function getMockAdminTrafficData(lang: 'vi' | 'en'): AdminTrafficData[] {
  const isVi = lang === 'vi';
  return [
    { day: isVi ? 'Thứ 2' : 'Mon', views: 180, height: '40%' },
    { day: isVi ? 'Thứ 3' : 'Tue', views: 240, height: '55%' },
    { day: isVi ? 'Thứ 4' : 'Wed', views: 320, height: '75%' },
    { day: isVi ? 'Thứ 5' : 'Thu', views: 280, height: '65%' },
    { day: isVi ? 'Thứ 6' : 'Fri', views: 410, height: '95%' },
    { day: isVi ? 'Thứ 7' : 'Sat', views: 350, height: '80%' },
    { day: isVi ? 'Chủ nhật' : 'Sun', views: 290, height: '70%' },
  ];
}

// Kết quả tính toán mức độ hoàn thiện của Dự án
export interface ProjectCompletenessResult {
  percentage: number;
  completedItemsCount: number;
  totalItemsCount: number;
  missingItems: string[];
  statusText: string;
}

// Hàm tính toán mức độ hoàn thiện dữ liệu của Dự án theo các tiêu chuẩn nội dung
export function calculateProjectCompleteness(
  project: Partial<AdminMockProject>,
  caseStudyCount: number = 0,
  hasEnTranslation: boolean = false
): ProjectCompletenessResult {
  const checks = [
    { label: 'TITLE_SLUG_REQ', valid: Boolean(project.title && project.slug) },
    { label: 'CATEGORY_ROLE_REQ', valid: Boolean(project.tag && project.role) },
    { label: 'TECH_STACK_REQ', valid: Boolean(project.techStack && project.techStack.length > 0) },
    { label: 'SHORT_DESC_REQ', valid: Boolean(project.description && project.description.trim().length > 10) },
    { label: 'COVER_IMAGE_REQ', valid: Boolean(project.coverImage) },
    { label: 'DEMO_GITHUB_REQ', valid: Boolean(project.demoUrl || project.githubUrl) },
    { label: 'CS_CONTENT_REQ', valid: caseStudyCount > 0 },
    { label: 'EN_TRANSLATION_REQ', valid: hasEnTranslation || Boolean(project.overviewEn) },
  ];

  const completed = checks.filter((item) => item.valid).length;
  const total = checks.length;
  const percentage = Math.round((completed / total) * 100);

  const missingItems = checks.filter((item) => !item.valid).map((item) => item.label);

  let statusTextKey = 'STATUS_READY';
  if (percentage < 50) {
    statusTextKey = 'STATUS_DRAFT';
  } else if (percentage < 85) {
    statusTextKey = 'STATUS_IN_PROGRESS';
  }

  return {
    percentage,
    completedItemsCount: completed,
    totalItemsCount: total,
    missingItems,
    statusText: statusTextKey,
  };
}

