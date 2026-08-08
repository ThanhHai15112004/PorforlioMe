export const QUICK_INFO = [
  {
    label: { vi: 'Vai trò', en: 'Role' },
    value: { vi: 'Full-stack Developer', en: 'Full-stack Developer' },
    icon: 'mdi:code-braces',
    span: 'col-span-1',
  },
  {
    label: { vi: 'Chuyên môn', en: 'Focus' },
    value: { vi: 'Laravel · React · System', en: 'Laravel · React · System' },
    icon: 'mdi:layers-outline',
    span: 'col-span-1',
  },
  {
    label: { vi: 'Lĩnh vực', en: 'Domains' },
    value: { vi: 'LMS & Web Platforms', en: 'LMS & Web Platforms' },
    icon: 'mdi:domain',
    span: 'col-span-1',
  },
  {
    label: { vi: 'Định hướng', en: 'Direction' },
    value: { vi: 'Hệ thống mở rộng & Mã sạch', en: 'Scalable Systems & Clean Code' },
    icon: 'mdi:compass-outline',
    span: 'col-span-1',
  },
  {
    label: { vi: 'Kinh nghiệm', en: 'Core Tech' },
    value: { vi: 'Backend & Frontend Arch', en: 'Backend & Frontend Arch' },
    icon: 'mdi:lightning-bolt-outline',
    span: 'col-span-1',
  },
  {
    label: { vi: 'Ngôn ngữ', en: 'Languages' },
    value: { vi: 'Tiếng Việt · English', en: 'Vietnamese · English' },
    icon: 'mdi:translate',
    span: 'col-span-1',
  },
  {
    label: { vi: 'Địa điểm', en: 'Location' },
    value: { vi: 'TP. Hồ Chí Minh, VN', en: 'Ho Chi Minh City, VN' },
    icon: 'mdi:map-marker-outline',
    span: 'col-span-1',
  },
  {
    label: { vi: 'Trạng thái', en: 'Status' },
    value: { vi: 'Sẵn sàng nhận dự án', en: 'Open for Projects' },
    icon: 'mdi:check-circle-outline',
    span: 'col-span-1',
  },
];

export const EXPERTISE = [
  {
    title: { vi: 'Backend Development', en: 'Backend Development' },
    icon: 'mdi:server-outline',
    desc: {
      vi: 'Xây dựng API, xử lý nghiệp vụ, phân quyền, queue, cache, bảo mật và tối ưu hiệu suất hệ thống.',
      en: 'Building APIs, business logic, authorization, queues, caching, security and performance tuning.',
    },
    tech: ['Laravel', 'PHP', 'Redis', 'MySQL', 'SQL Server', 'Queue'],
  },
  {
    title: { vi: 'Frontend Development', en: 'Frontend Development' },
    icon: 'mdi:monitor-shimmer',
    desc: {
      vi: 'Xây dựng giao diện quản trị và người dùng rõ ràng, responsive, dễ thao tác và đồng bộ với nghiệp vụ.',
      en: 'Building clear, responsive admin and user interfaces that stay in sync with the underlying business logic.',
    },
    tech: ['React', 'TypeScript', 'InertiaJS', 'Ant Design', 'JavaScript'],
  },
  {
    title: { vi: 'System Architecture', en: 'System Architecture' },
    icon: 'mdi:sitemap-outline',
    desc: {
      vi: 'Tổ chức mã nguồn theo module, phân tách trách nhiệm và thiết kế hệ thống có khả năng bảo trì lâu dài.',
      en: 'Organizing code into modules, separating concerns, and designing systems that stay maintainable long-term.',
    },
    tech: ['Clean Architecture', 'Repository Pattern', 'Modular Monolith', 'REST API'],
  },
  {
    title: { vi: 'DevOps & Vận hành', en: 'DevOps & Operations' },
    icon: 'mdi:kubernetes',
    desc: {
      vi: 'Đóng gói ứng dụng, triển khai môi trường, theo dõi log, metrics và sức khỏe hệ thống.',
      en: 'Packaging applications, deploying environments, and monitoring logs, metrics and system health.',
    },
    tech: ['Docker', 'Nginx', 'AWS S3', 'Grafana', 'OpenTelemetry', 'Loki'],
  },
];

export const PRINCIPLES = [
  {
    title: {
      vi: 'Không làm phức tạp khi chưa cần thiết',
      en: "Don't complicate what doesn't need to be complicated",
    },
    desc: {
      vi: 'Giải pháp cần phù hợp với quy mô và bài toán, không nên áp dụng công nghệ chỉ vì nó mới hoặc phổ biến.',
      en: 'A solution should fit the scale and the problem — not be adopted just because it is new or trending.',
    },
    icon: 'mdi:puzzle-check-outline',
  },
  {
    title: { vi: 'Không làm vỡ chức năng ổn định', en: "Don't break what already works" },
    desc: {
      vi: 'Mọi thay đổi cần được đánh giá phạm vi ảnh hưởng trước khi triển khai vào hệ thống hiện tại.',
      en: 'Every change should be assessed for its impact before shipping into an existing system.',
    },
    icon: 'mdi:shield-check-outline',
  },
  {
    title: { vi: 'Ưu tiên khả năng bảo trì', en: 'Prioritize maintainability' },
    desc: {
      vi: 'Code cần rõ ràng, dễ hiểu và dễ phát triển cho cả người viết lẫn các thành viên khác.',
      en: 'Code should be clear, easy to understand, and easy to build on — for both the author and teammates.',
    },
    icon: 'mdi:wrench-cog-outline',
  },
  {
    title: { vi: 'Tập trung vào trải nghiệm thực tế', en: 'Focus on real-world experience' },
    desc: {
      vi: 'Một chức năng tốt không chỉ chạy đúng, mà còn phải dễ sử dụng và giải quyết đúng vấn đề.',
      en: 'A good feature doesn\'t just work correctly — it should also be easy to use and solve the right problem.',
    },
    icon: 'mdi:account-heart-outline',
  },
  {
    title: { vi: 'Đo lường trước khi tối ưu', en: 'Measure before optimizing' },
    desc: {
      vi: 'Hiệu suất nên được cải thiện dựa trên dữ liệu, không dựa hoàn toàn vào cảm giác.',
      en: 'Performance should be improved based on data, not gut feeling.',
    },
    icon: 'mdi:chart-bar-outline',
  },
];

export const JOURNEY = [
  {
    step: '01',
    period: { vi: '2022 – 2026', en: '2022 – 2026' },
    title: { vi: 'Sinh viên Đại học Văn Hiến', en: 'Student at Van Hien University' },
    desc: {
      vi: 'Theo học ngành CNTT, xây dựng nền tảng lập trình và tư duy hệ thống.',
      en: 'Studying Information Technology, building a foundation in programming and systems thinking.',
    },
  },
  {
    step: '02',
    period: { vi: '2024 – 2026', en: '2024 – 2026' },
    title: { vi: 'Freelance Developer', en: 'Freelance Developer' },
    desc: {
      vi: 'Nhận dự án website, thiết kế giao diện và thiết kế hệ thống cho khách hàng thực tế.',
      en: 'Took on website projects, UI design and system design work for real clients.',
    },
  },
  {
    step: '03',
    period: { vi: '12/2025 – 3/2026', en: '12/2025 – 3/2026' },
    title: { vi: 'Thực tập Business Analyst', en: 'Business Analyst Intern' },
    desc: {
      vi: 'Viết tài liệu phân tích kỹ năng, phân tích giao diện và phân tích nghiệp vụ.',
      en: 'Wrote skills analysis, UI analysis and business requirement documents.',
    },
  },
  {
    step: '04',
    period: { vi: '6/2026 – Hiện tại', en: '6/2026 – Present' },
    title: { vi: 'PHP Fullstack Developer', en: 'PHP Fullstack Developer' },
    desc: {
      vi: 'Code PHP, thiết kế giao diện, lập trình hệ thống cho các dự án lớn như Coaching, LMS, HLS.',
      en: 'Writing PHP, designing UI, and building systems for large projects like Coaching, LMS, and HLS.',
    },
  },
];

export const TECH_GROUPS = [
  {
    label: { vi: 'Backend', en: 'Backend' },
    items: ['PHP', 'Laravel', 'REST API', 'Redis', 'Queue', 'MySQL', 'SQL Server'],
  },
  {
    label: { vi: 'Frontend', en: 'Frontend' },
    items: ['React', 'TypeScript', 'InertiaJS', 'Ant Design', 'JavaScript', 'HTML/CSS'],
  },
  {
    label: { vi: 'DevOps', en: 'DevOps' },
    items: ['Docker', 'Nginx', 'GitLab CI/CD', 'AWS S3', 'Grafana', 'Prometheus', 'OpenTelemetry'],
  },
  {
    label: { vi: 'Media & Hệ thống', en: 'Media & Systems' },
    items: ['FFmpeg', 'HLS', 'Video.js', 'WebSocket', 'Object Storage'],
  },
];

export const KEY_EXPERIENCE = [
  {
    icon: 'mdi:school-outline',
    title: { vi: 'Hệ thống quản lý đào tạo', en: 'Training management systems' },
    desc: {
      vi: 'Phát triển và tối ưu các module khóa học, học viên, giảng viên, kỳ thi và báo cáo.',
      en: 'Developed and optimized course, learner, instructor, exam and reporting modules.',
    },
  },
  {
    icon: 'mdi:video-outline',
    title: { vi: 'Xử lý video HLS', en: 'HLS video processing' },
    desc: {
      vi: 'Xây dựng quy trình chuyển đổi và phát video HLS bằng FFmpeg, queue và adaptive bitrate.',
      en: 'Built HLS video transcoding and playback pipelines with FFmpeg, queues, and adaptive bitrate.',
    },
  },
  {
    icon: 'mdi:folder-multiple-outline',
    title: { vi: 'Quản lý nội dung', en: 'Content management' },
    desc: {
      vi: 'Thiết kế hệ thống thư mục, tài liệu, phân quyền và kiểm tra dữ liệu đang được sử dụng.',
      en: 'Designed folder/document structures, permissions, and in-use data validation.',
    },
  },
  {
    icon: 'mdi:lightning-bolt-circle',
    title: { vi: 'Hiệu suất hệ thống', en: 'System performance' },
    desc: {
      vi: 'Tối ưu truy vấn, cache, queue, API và thời gian phản hồi của ứng dụng.',
      en: 'Optimized queries, caching, queues, APIs and application response time.',
    },
  },
  {
    icon: 'mdi:monitor-dashboard',
    title: { vi: 'Giám sát vận hành', en: 'Operations monitoring' },
    desc: {
      vi: 'Tích hợp log, metrics và dashboard để theo dõi trạng thái hệ thống.',
      en: 'Integrated logs, metrics and dashboards to track system health.',
    },
  },
];

/** Role + mô tả ngắn đi cùng nhau ở hero About — cùng một component RoleSlider như Home. */
export const ABOUT_ROLE_SLIDES = [
  {
    title: 'Laravel Developer',
    subtitle: {
      vi: 'Xây dựng API và hệ thống backend vững chắc, dễ mở rộng.',
      en: 'Building solid, scalable APIs and backend systems.',
    },
  },
  {
    title: 'React Developer',
    subtitle: {
      vi: 'Phát triển giao diện quản trị rõ ràng, mượt mà và dễ dùng.',
      en: 'Building clear, smooth and easy-to-use admin interfaces.',
    },
  },
  {
    title: 'System Builder',
    subtitle: {
      vi: 'Thiết kế kiến trúc hệ thống có khả năng bảo trì lâu dài.',
      en: 'Designing system architecture built to stay maintainable long-term.',
    },
  },
];

/** Toàn bộ text tĩnh (không phải mảng lặp) của trang About, theo ngôn ngữ. */
export const ABOUT_TEXT = {
  vi: {
    heroEyebrow: 'Giới thiệu bản thân',
    heroTitlePrefix: 'Tôi xây dựng những hệ thống',
    heroTitleHighlight: 'ổn định, rõ ràng',
    heroTitleSuffix: 'và có giá trị thực tế.',
    heroSubtitle:
      'Lập trình viên tập trung vào phát triển hệ thống quản lý, nền tảng học trực tuyến và các sản phẩm web có khả năng mở rộng.',
    ctaProjects: 'Xem dự án',
    ctaCv: 'Tải CV',
    introEyebrow: 'Giới thiệu',
    introParagraphs: [
      'Tôi là một lập trình viên yêu thích việc xây dựng các hệ thống có cấu trúc rõ ràng, dễ sử dụng và có khả năng phát triển lâu dài.',
      'Trong quá trình làm việc, tôi tập trung nhiều vào các hệ thống quản lý, nền tảng đào tạo trực tuyến, xử lý dữ liệu, video streaming, quản lý nội dung và tối ưu hiệu suất ứng dụng.',
      'Tôi không chỉ quan tâm đến việc chức năng có hoạt động hay không, mà còn quan tâm đến cách hệ thống được tổ chức, khả năng bảo trì, trải nghiệm người dùng và mức độ ổn định khi vận hành thực tế.',
    ],
    quickInfoLabel: 'Thông tin',
    quickInfoTitle: 'Thông tin nhanh',
    expertiseLabel: 'Năng lực',
    expertiseTitle: 'Tôi tập trung vào điều gì?',
    processLabel: 'Quy trình',
    processTitle: 'Cách tôi tiếp cận một dự án',
    principlesLabel: 'Nguyên tắc',
    principlesTitle: 'Những nguyên tắc tôi luôn ưu tiên',
    journeyLabel: 'Hành trình',
    journeyTitle: 'Hành trình của tôi',
    techLabel: 'Công nghệ',
    techTitle: 'Công nghệ tôi thường làm việc',
    experienceLabel: 'Kinh nghiệm',
    experienceTitle: 'Kinh nghiệm nổi bật',
    futureLabel: 'Định hướng',
    futureTitle: 'Tôi đang hướng đến điều gì?',
    futureParagraphs: [
      'Tôi muốn tiếp tục phát triển theo hướng xây dựng các hệ thống web có kiến trúc rõ ràng, khả năng mở rộng tốt và vận hành ổn định.',
      'Bên cạnh chuyên môn Laravel và React, tôi đang mở rộng kiến thức về DevOps, Cloud, observability và thiết kế kiến trúc phần mềm.',
      'Mục tiêu của tôi không chỉ là trở thành một lập trình viên viết code tốt, mà còn có thể hiểu bài toán, thiết kế giải pháp và đồng hành cùng sản phẩm lâu dài.',
    ],
    collabLabel: 'Cộng tác',
    collabTitle: 'Hãy cùng xây dựng một sản phẩm có giá trị.',
    collabSubtitle: 'Tôi luôn sẵn sàng trao đổi về những ý tưởng, dự án hoặc cơ hội hợp tác phù hợp.',
    collabCtaPrimary: 'Liên hệ với tôi',
    collabCtaSecondary: 'Xem dự án',
    galleryEyebrow: 'Bộ sưu tập & Câu chuyện',
    galleryTitle: 'Hành trình & Góc nhìn sáng tạo',
    gallerySubtitle: 'Khám phá câu chuyện, định hướng phát triển và phong cách làm việc của tôi qua từng hình ảnh.',
  },
  en: {
    heroEyebrow: 'About Me',
    heroTitlePrefix: 'I build systems that are',
    heroTitleHighlight: 'stable, clear',
    heroTitleSuffix: 'and grounded in real value.',
    heroSubtitle:
      'A developer focused on building management systems, e-learning platforms, and scalable web products.',
    ctaProjects: 'View projects',
    ctaCv: 'Download CV',
    introEyebrow: 'Introduction',
    introParagraphs: [
      "I'm a developer who enjoys building systems with a clear structure, that are easy to use, and built to last.",
      'In my work I focus heavily on management systems, online training platforms, data processing, video streaming, content management, and application performance.',
      "I don't just care whether a feature works — I care about how the system is organized, how maintainable it is, the user experience, and how stable it stays in real-world operation.",
    ],
    quickInfoLabel: 'Info',
    quickInfoTitle: 'Quick facts',
    expertiseLabel: 'Expertise',
    expertiseTitle: 'What I focus on',
    processLabel: 'Process',
    processTitle: 'How I approach a project',
    principlesLabel: 'Principles',
    principlesTitle: 'Principles I always prioritize',
    journeyLabel: 'Journey',
    journeyTitle: 'My journey',
    techLabel: 'Tech Stack',
    techTitle: 'Technologies I work with',
    experienceLabel: 'Experience',
    experienceTitle: 'Highlighted experience',
    futureLabel: 'Direction',
    futureTitle: 'Where am I headed?',
    futureParagraphs: [
      'I want to keep growing toward building web systems with clear architecture, good scalability, and stable operation.',
      "Alongside my Laravel and React expertise, I'm expanding my knowledge of DevOps, cloud, observability, and software architecture design.",
      "My goal isn't just to be a developer who writes good code — but someone who understands the problem, designs solutions, and stays with the product for the long run.",
    ],
    collabLabel: 'Collaborate',
    collabTitle: "Let's build something valuable together.",
    collabSubtitle: "I'm always open to discussing ideas, projects, or the right kind of collaboration.",
    collabCtaPrimary: 'Contact me',
    collabCtaSecondary: 'View projects',
    galleryEyebrow: 'Gallery & Stories',
    galleryTitle: 'Journey & Creative Highlights',
    gallerySubtitle: 'Explore my story, growth direction, and work style through each visual highlight.',
  },
};

// ─── ABOUT GALLERY SLIDES ──────────────────────────────────────────────────
import meAvatar1 from '../assets/imgs/avatars/MeAvatar1.png';
import meAvatar2 from '../assets/imgs/avatars/MeAvatar2.png';
import cleanCodeBanner from '../assets/imgs/banners/cleancode.jpg';
import devOpsBanner from '../assets/imgs/banners/DevOps.jpg';
import systemLmsBanner from '../assets/imgs/banners/SystemLMSArchitecture.jpg';
import uiuxBanner from '../assets/imgs/banners/UIUXCreativeWorkspace.jpg';
import roadmap1Banner from '../assets/imgs/banners/Roadmap1.jpg';
import roadmap2Banner from '../assets/imgs/banners/Roadmap2.jpg';
import roadmap3Banner from '../assets/imgs/banners/Roadmap3.jpg';
import roadmap4Banner from '../assets/imgs/banners/Roadmap4.jpg';
import roadmap5Banner from '../assets/imgs/banners/Roadmap5.jpg';

export interface GallerySlide {
  id: string;
  image: string;
  tag: { vi: string; en: string };
  location: { vi: string; en: string };
  title: { vi: string; en: string };
  desc: { vi: string; en: string };
  quote: { vi: string; en: string };
  nodeIcon?: string;
  year?: string;
  highlights?: Array<{ icon: string; label: { vi: string; en: string } }>;
}

export const ABOUT_GALLERY_SLIDES: GallerySlide[] = [
  {
    id: 'workspace-dev',
    image: meAvatar2,
    nodeIcon: 'ph:user-circle-bold',
    tag: { vi: 'Hành Trình & Tư Duy', en: 'Journey & Mindset' },
    location: { vi: 'TP. Hồ Chí Minh · 2026', en: 'Ho Chi Minh City · 2026' },
    title: { vi: 'Tập trung vào giá trị cốt lõi của phần mềm', en: 'Focusing on Core Software Value' },
    desc: {
      vi: 'Xây dựng mã nguồn sạch, cấu trúc rõ ràng và hiệu năng tối ưu là ưu tiên số một trong mọi dự án. Tôi tin rằng một hệ thống tốt là hệ thống vận hành êm ái mà người dùng không cần bận tâm đến sự phức tạp bên dưới.',
      en: 'Clean code, clear structure, and optimal performance are top priorities in every project. I believe a good system runs so smoothly that users never have to worry about underlying complexity.',
    },
    quote: {
      vi: '“Sự đơn giản và mạch lạc là chìa khóa của một kiến trúc bền vững.”',
      en: '“Simplicity and clarity are the keys to a sustainable architecture.”',
    },
    highlights: [
      { icon: 'ph:lightning-bold', label: { vi: 'Tối Ưu Hiệu Năng', en: 'High Performance' } },
      { icon: 'ph:shield-check-bold', label: { vi: 'Mã Nguồn Tường Minh', en: 'Clean Code' } },
      { icon: 'ph:cube-bold', label: { vi: 'Kiến Trúc Mở Rộng', en: 'Scalable Design' } },
    ],
  },
  {
    id: 'system-architecture',
    image: roadmap1Banner,
    nodeIcon: 'ph:database-bold',
    tag: { vi: 'Hệ Thống & Backend', en: 'System & Backend' },
    location: { vi: 'Laravel & React Stack', en: 'Laravel & React Stack' },
    title: { vi: 'Thiết kế kiến trúc hệ thống quản lý & LMS', en: 'Designing Management & LMS Architecture' },
    desc: {
      vi: 'Đã trực tiếp thiết kế và triển khai các hệ thống quy mô lớn: quản lý đào tạo, phân quyền đa cấp, tích hợp video HLS streaming và tối ưu truy vấn cơ sở dữ liệu cho hàng ngàn người dùng.',
      en: 'Engineered and shipped large-scale systems: training management, multi-level RBAC, HLS video streaming integration, and database query optimization for thousands of active users.',
    },
    quote: {
      vi: '“Không chỉ chạy đúng, mà còn phải sẵn sàng mở rộng và bảo trì lâu dài.”',
      en: '“Not just working correctly, but ready to scale and maintain long-term.”',
    },
    highlights: [
      { icon: 'ph:users-three-bold', label: { vi: '10,000+ Học Viên', en: '10,000+ Students' } },
      { icon: 'ph:video-camera-bold', label: { vi: 'HLS Video Streaming', en: 'HLS Video Stream' } },
      { icon: 'ph:key-bold', label: { vi: 'Phân Quyền RBAC 4 Cấp', en: '4-Tier RBAC' } },
    ],
  },
  {
    id: 'coding-flow',
    image: roadmap2Banner,
    nodeIcon: 'ph:desktop-bold',
    tag: { vi: 'Lập Trình & Sáng Tạo', en: 'Coding & Creativity' },
    location: { vi: 'Fullstack Studio', en: 'Fullstack Studio' },
    title: { vi: 'Trải nghiệm người dùng & Giao diện hiện đại', en: 'User Experience & Modern Interface' },
    desc: {
      vi: 'Mỗi pixel và chuyển động đều được chăm chút tỉ mỉ. Kết hợp giữa sức mạnh Backend Laravel và tính linh hoạt của React/TypeScript mang đến cảm giác mượt mà và trực quan nhất.',
      en: 'Every pixel and motion transition is crafted with care. Combining Laravel backend strength with React/TypeScript flexibility delivers a seamless, intuitive feeling.',
    },
    quote: {
      vi: '“UI đẹp thu hút ánh nhìn, UX tốt giữ chân người dùng.”',
      en: '“Great UI turns heads; great UX keeps users coming back.”',
    },
    highlights: [
      { icon: 'ph:palette-bold', label: { vi: 'UI/UX Tối Giản', en: 'Minimal UI/UX' } },
      { icon: 'ph:atom-bold', label: { vi: 'React 19 & TypeScript', en: 'React 19 & TS' } },
      { icon: 'ph:database-bold', label: { vi: 'RESTful Laravel API', en: 'Laravel API' } },
    ],
  },
  {
    id: 'clean-code-slide',
    image: roadmap3Banner,
    nodeIcon: 'ph:code-bold',
    tag: { vi: 'Tư Duy Lập Trình', en: 'Clean Code Mindset' },
    location: { vi: 'Clean Architecture', en: 'Clean Architecture' },
    title: { vi: 'Mã nguồn sạch & Cấu trúc vững chắc', en: 'Clean Code & Solid Architecture' },
    desc: {
      vi: 'Ưu tiên viết mã nguồn tường minh, phân tách module rõ ràng và tuân thủ các nguyên tắc thiết kế phần mềm hiện đại.',
      en: 'Prioritizing clean, self-documenting code with clear separation of concerns and modern design principles.',
    },
    quote: {
      vi: '“Viết code để người khác đọc dễ như đọc sách.”',
      en: '“Write code that humans can read as easily as a book.”',
    },
    highlights: [
      { icon: 'ph:code-bold', label: { vi: 'Self-Documenting Code', en: 'Self-Documenting' } },
      { icon: 'ph:folders-bold', label: { vi: 'Repository Pattern', en: 'Repository Pattern' } },
      { icon: 'ph:lightning-bold', label: { vi: 'Multi-Level Cache', en: 'Multi-Level Cache' } },
    ],
  },
  {
    id: 'continuous-learning',
    image: roadmap4Banner,
    nodeIcon: 'ph:cloud-bold',
    tag: { vi: 'Học Hỏi & Đổi Mới', en: 'Continuous Learning' },
    location: { vi: 'DevOps & Observability', en: 'DevOps & Observability' },
    title: { vi: 'Mở rộng giới hạn với Cloud & Observability', en: 'Pushing Boundaries with Cloud & Observability' },
    desc: {
      vi: 'Không ngừng học hỏi công nghệ mới: Docker, Nginx, Grafana, OpenTelemetry và CI/CD pipelines. Mục tiêu là làm chủ toàn bộ vòng đời sản phẩm từ ý tưởng đến triển khai thực tế.',
      en: 'Continuously adopting modern tech: Docker, Nginx, Grafana, OpenTelemetry, and CI/CD pipelines to master the entire product lifecycle from vision to deployment.',
    },
    quote: {
      vi: '“Học tập liên tục là cách duy nhất để dẫn đầu trong thế giới công nghệ.”',
      en: '“Continuous learning is the only way to stay ahead in technology.”',
    },
    highlights: [
      { icon: 'ph:cloud-bold', label: { vi: 'Docker Containers', en: 'Docker Containers' } },
      { icon: 'ph:chart-bar-bold', label: { vi: 'Grafana & Loki Logs', en: 'Grafana & Loki' } },
      { icon: 'ph:arrow-clockwise-bold', label: { vi: 'Tự Động Hóa CI/CD', en: 'CI/CD Automation' } },
    ],
  },
  {
    id: 'ui-ux-creative',
    image: roadmap5Banner,
    nodeIcon: 'ph:palette-bold',
    tag: { vi: 'Giao Diện & Sáng Tạo', en: 'UI/UX & Creativity' },
    location: { vi: 'Minimal White Interactive', en: 'Minimal White Interactive' },
    title: { vi: 'Thiết kế giao diện hiện đại & Tối giản', en: 'Modern & Minimal UI Design' },
    desc: {
      vi: 'Xây dựng giao diện web phản hồi nhanh, chuyển động mượt mà và tương thích hoàn hảo trên mọi kích thước màn hình.',
      en: 'Creating fast-responding web interfaces with fluid micro-interactions and seamless responsiveness across devices.',
    },
    quote: {
      vi: '“Tối giản không phải là bớt đi, mà là chỉ giữ lại những gì tinh túy nhất.”',
      en: '“Simplicity is not about removing, but keeping what matters most.”',
    },
    highlights: [
      { icon: 'ph:sparkles-bold', label: { vi: 'Micro-motion 60fps', en: '60fps Micro-motion' } },
      { icon: 'ph:device-mobile-camera-bold', label: { vi: 'Responsive 100%', en: '100% Responsive' } },
      { icon: 'ph:eye-bold', label: { vi: 'Thẩm Mỹ Editorial', en: 'Editorial Aesthetics' } },
    ],
  },
];

// ─── ABOUT HERO SLIDES ───────────────────────────────────────────────────
export interface AboutHeroSlide {
  id: string;
  eyebrow: { vi: string; en: string };
  titlePrefix: { vi: string; en: string };
  titleHighlight: { vi: string; en: string };
  titleSuffix: { vi: string; en: string };
  subtitle: { vi: string; en: string };
  image: string;
  imageCaption: { vi: string; en: string };
  badges: Array<{
    label: { vi: string; en: string };
    icon: string;
    position: string;
  }>;
}

export const ABOUT_HERO_SLIDES: AboutHeroSlide[] = [
  {
    id: 'hero-1',
    eyebrow: { vi: 'Giới thiệu bản thân', en: 'About Me' },
    titlePrefix: { vi: 'Tôi xây dựng những hệ thống', en: 'I build systems that are' },
    titleHighlight: { vi: 'ổn định & rõ ràng', en: 'stable & clear' },
    titleSuffix: { vi: 'cho thực tế.', en: 'for real value.' },
    subtitle: {
      vi: 'Lập trình viên tập trung vào phát triển hệ thống quản lý, nền tảng học trực tuyến và các sản phẩm web có khả năng mở rộng.',
      en: 'A developer focused on building management systems, e-learning platforms, and scalable web products.',
    },
    image: meAvatar1,
    imageCaption: { vi: 'Thanh Hải · Full-stack Developer', en: 'Thanh Hai · Full-stack Developer' },
    badges: [
      { label: { vi: 'Tại Việt Nam', en: 'Based in Vietnam' }, icon: 'mdi:map-marker', position: 'top-4 -right-8' },
      { label: { vi: 'Sẵn sàng nhận việc', en: 'Open to Work' }, icon: 'mdi:check-circle', position: 'bottom-12 -left-8' },
      { label: { vi: 'Full-stack Dev', en: 'Full-stack Dev' }, icon: 'mdi:lightning-bolt', position: '-top-3 left-10' },
    ],
  },
  {
    id: 'hero-2',
    eyebrow: { vi: 'Tư Duy Lập Trình', en: 'Engineering Mindset' },
    titlePrefix: { vi: 'Ưu tiên trải nghiệm &', en: 'Prioritizing UX &' },
    titleHighlight: { vi: 'mã nguồn sạch', en: 'clean maintainable code' },
    titleSuffix: { vi: 'chuẩn mực.', en: 'standards.' },
    subtitle: {
      vi: 'Cân bằng giữa hiệu năng Backend với giao diện mượt mà. Đảm bảo mã nguồn dễ đọc, dễ mở rộng và vận hành ổn định lâu dài.',
      en: 'Balancing Backend performance with smooth frontend UX. Ensuring readable, scalable, and maintainable codebases.',
    },
    image: cleanCodeBanner,
    imageCaption: { vi: 'Clean Code & Architecture', en: 'Clean Code & Architecture' },
    badges: [
      { label: { vi: 'Mã nguồn sạch', en: 'Clean Code' }, icon: 'mdi:code-tags', position: 'top-4 -right-8' },
      { label: { vi: 'Dễ mở rộng', en: 'Scalable Design' }, icon: 'mdi:chart-line', position: 'bottom-12 -left-8' },
      { label: { vi: 'React & Laravel', en: 'React & Laravel' }, icon: 'mdi:cube-outline', position: '-top-3 left-10' },
    ],
  },
  {
    id: 'hero-3',
    eyebrow: { vi: 'Chuyên Môn Hệ Thống', en: 'System Specialization' },
    titlePrefix: { vi: 'Nền tảng quản lý &', en: 'Management platforms &' },
    titleHighlight: { vi: 'xử lý video HLS', en: 'HLS video streaming' },
    titleSuffix: { vi: 'tốc độ cao.', en: 'at high speed.' },
    subtitle: {
      vi: 'Tích hợp quy trình nén video FFmpeg, phân quyền RBAC nâng cao, và xử lý dữ liệu quy mô lớn cho các hệ thống LMS.',
      en: 'Integrating FFmpeg pipelines, advanced RBAC permissions, and large-scale data processing for LMS platforms.',
    },
    image: systemLmsBanner,
    imageCaption: { vi: 'LMS & HLS Video Streaming', en: 'LMS & HLS Video Streaming' },
    badges: [
      { label: { vi: 'FFmpeg & HLS', en: 'FFmpeg & HLS' }, icon: 'mdi:video-wireless', position: 'top-4 -right-8' },
      { label: { vi: 'Hệ thống LMS', en: 'LMS Platform' }, icon: 'mdi:school', position: 'bottom-12 -left-8' },
      { label: { vi: 'Tối ưu API', en: 'API Optimization' }, icon: 'mdi:flash', position: '-top-3 left-10' },
    ],
  },
  {
    id: 'hero-4',
    eyebrow: { vi: 'Định Hướng Tương Lai', en: 'Future Vision' },
    titlePrefix: { vi: 'Tối ưu Cloud, DevOps &', en: 'Optimizing Cloud, DevOps &' },
    titleHighlight: { vi: 'Giám sát hệ thống', en: 'System Observability' },
    titleSuffix: { vi: 'toàn diện.', en: 'end-to-end.' },
    subtitle: {
      vi: 'Làm chủ Docker, Grafana, OpenTelemetry và CI/CD để giám sát ứng dụng real-time, sẵn sàng cho những sản phẩm lớn.',
      en: 'Mastering Docker, Grafana, OpenTelemetry, and CI/CD for real-time monitoring and production deployment.',
    },
    image: devOpsBanner,
    imageCaption: { vi: 'DevOps, Cloud & Observability', en: 'DevOps, Cloud & Observability' },
    badges: [
      { label: { vi: 'Docker & Nginx', en: 'Docker & Nginx' }, icon: 'mdi:docker', position: 'top-4 -right-8' },
      { label: { vi: 'Grafana & Loki', en: 'Grafana & Loki' }, icon: 'mdi:chart-scatter-plot', position: 'bottom-12 -left-8' },
      { label: { vi: 'CI/CD Pipeline', en: 'CI/CD Pipeline' }, icon: 'mdi:cog-sync', position: '-top-3 left-10' },
    ],
  },
  {
    id: 'hero-5',
    eyebrow: { vi: 'Giao Diện Sáng Tạo', en: 'Creative Web Interface' },
    titlePrefix: { vi: 'Thiết kế giao diện &', en: 'Designing modern UI &' },
    titleHighlight: { vi: 'tương tác mượt mà', en: 'fluid micro-interactions' },
    titleSuffix: { vi: 'cho người dùng.', en: 'for seamless UX.' },
    subtitle: {
      vi: 'Kết hợp giao diện Minimalist White Interactive với các hiệu ứng chuyển động tinh tế, mang lại cảm giác cao cấp và thân thiện.',
      en: 'Combining Minimalist White Interactive UI with subtle micro-interactions to deliver a premium user experience.',
    },
    image: uiuxBanner,
    imageCaption: { vi: 'Modern UI/UX & Motion Design', en: 'Modern UI/UX & Motion Design' },
    badges: [
      { label: { vi: 'UI/UX Design', en: 'UI/UX Design' }, icon: 'mdi:palette', position: 'top-4 -right-8' },
      { label: { vi: 'Micro-motion', en: 'Micro-motion' }, icon: 'mdi:motion', position: 'bottom-12 -left-8' },
      { label: { vi: 'Responsive Web', en: 'Responsive Web' }, icon: 'mdi:cellphone-link', position: '-top-3 left-10' },
    ],
  },
];


