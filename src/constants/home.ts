/** Icon Iconify tương ứng theo tên công nghệ — dùng cho badge nổi trên ảnh dự án nổi bật. */
export const TECH_ICON: Record<string, string> = {
  Laravel: 'mdi:laravel',
  React: 'mdi:react',
  PHP: 'mdi:language-php',
  MySQL: 'mdi:database',
  Docker: 'mdi:docker',
  Redis: 'simple-icons:redis',
  FFmpeg: 'simple-icons:ffmpeg',
  'Video.js': 'mdi:video-outline',
  HLS: 'mdi:video-outline',
  'SQL Server': 'mdi:database',
  'Ant Design': 'simple-icons:antdesign',
};

export const TECH_STACK = [
  { name: 'PHP', icon: 'mdi:language-php' },
  { name: 'Laravel', icon: 'mdi:laravel' },
  { name: 'MySQL', icon: 'mdi:database' },
  { name: 'React', icon: 'mdi:react' },
  { name: 'TypeScript', icon: 'mdi:language-typescript' },
  { name: 'Tailwind CSS', icon: 'mdi:tailwind' },
  { name: 'Docker', icon: 'mdi:docker' },
  { name: 'Figma', icon: 'ph:figma-logo' },
];

// Decorative floating badges scattered around the hero text
export const HERO_FLOATING_ICONS = [
  { icon: 'mdi:react', className: 'top-[16%] left-[6%]', anim: 'animate-float-slow' },
  { icon: 'mdi:language-typescript', className: 'top-[22%] right-[8%]', anim: 'animate-float-fast' },
  { icon: 'ph:figma-logo', className: 'bottom-[26%] left-[11%]', anim: 'animate-float-medium' },
  { icon: 'mdi:laravel', className: 'top-[54%] right-[3%]', anim: 'animate-float-slow' },
];

export const EXPERTISE_ITEMS = {
  vi: [
    {
      index: '01',
      icon: 'ph:database-light',
      title: 'Backend Development',
      desc: 'Xây dựng API, xử lý nghiệp vụ, phân quyền và tối ưu hiệu suất hệ thống với PHP, Laravel và MySQL.',
    },
    {
      index: '02',
      icon: 'ph:layout-light',
      title: 'Frontend Development',
      desc: 'Xây dựng giao diện web mượt mà, tối ưu UX/UI với React, TypeScript. Chú trọng tiểu tiết và performance.',
    },
    {
      index: '03',
      icon: 'ph:stack-light',
      title: 'Triển khai & Vận hành',
      desc: 'Đóng gói, triển khai với Docker và theo dõi hệ thống để đảm bảo hoạt động ổn định khi lên production.',
    },
  ],
  en: [
    {
      index: '01',
      icon: 'ph:database-light',
      title: 'Backend Development',
      desc: 'Building APIs, business logic, access control, and performance tuning with PHP, Laravel, and MySQL.',
    },
    {
      index: '02',
      icon: 'ph:layout-light',
      title: 'Frontend Development',
      desc: 'Building smooth web interfaces with strong UX/UI using React and TypeScript, with a close eye on detail and performance.',
    },
    {
      index: '03',
      icon: 'ph:stack-light',
      title: 'Deployment & Operations',
      desc: 'Packaging and deploying with Docker, and monitoring systems to keep production running reliably.',
    },
  ],
};

/** Role + tagline đi cùng nhau trong RoleSlider ở hero — đổi cả cụm khi trượt, không chỉ đổi 1 chữ. */
export const HOME_ROLE_SLIDES = {
  vi: [
    {
      title: 'Full-stack Developer',
      subtitle: 'Sáng tạo những trải nghiệm số hiện đại. Biến ý tưởng thành các website tương tác cao, tinh tế và tối ưu hiệu năng.',
    },
    {
      title: 'Laravel Developer',
      subtitle: 'Xây dựng API, xử lý nghiệp vụ và hệ thống backend vững chắc, dễ mở rộng với Laravel và MySQL.',
    },
    {
      title: 'React Developer',
      subtitle: 'Phát triển giao diện mượt mà, tương tác cao với React và TypeScript, tối ưu trải nghiệm người dùng.',
    },
  ],
  en: [
    {
      title: 'Full-stack Developer',
      subtitle: 'Crafting modern digital experiences. Turning ideas into highly interactive, polished, and performant websites.',
    },
    {
      title: 'Laravel Developer',
      subtitle: 'Building robust, scalable APIs and backend systems with Laravel and MySQL.',
    },
    {
      title: 'React Developer',
      subtitle: 'Developing smooth, highly interactive interfaces with React and TypeScript, optimized for the user experience.',
    },
  ],
};

/** Chuỗi UI tĩnh riêng của trang Home — theo ngôn ngữ. */
export const HOME_UI = {
  heroEyebrow: { vi: 'Sẵn Sàng Đổi Mới', en: 'Ready to Innovate' },
  heroCtaProjects: { vi: 'Xem Dự Án', en: 'View Projects' },
  heroCtaContact: { vi: 'Liên Hệ', en: 'Contact' },
  introText: {
    vi: 'Tôi là một web developer tập trung vào việc kết hợp kỹ thuật vững chắc với thẩm mỹ tinh tế. Mỗi dự án là một cơ hội để biến những ý tưởng phức tạp thành trải nghiệm đơn giản, mượt mà và đáng nhớ cho người dùng.',
    en: 'I am a web developer focused on pairing solid engineering with refined aesthetics. Every project is a chance to turn complex ideas into experiences that feel simple, smooth, and memorable for users.',
  },
  featuredEyebrow: { vi: 'Dự Án Nổi Bật', en: 'Selected Works' },
  featuredTitleLine1: { vi: 'Dự Án', en: 'Featured' },
  featuredTitleLine2: { vi: 'Nổi Bật', en: 'Works' },
  viewDetail: { vi: 'Xem Chi Tiết', en: 'View Details' },
  expertiseEyebrow: { vi: 'Chuyên Môn', en: 'Expertise' },
  expertiseTitleLine1: { vi: 'Tôi có thể', en: 'What can' },
  expertiseTitleLine2: { vi: 'làm gì?', en: 'I do?' },
  ctaTitleLine1: { vi: 'Sẵn sàng cho', en: 'Ready for a' },
  ctaTitleHighlight: { vi: 'Dự án mới?', en: 'new project?' },
  ctaButton: { vi: 'Trò chuyện ngay', en: "Let's talk" },
};
