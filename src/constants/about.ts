export const QUICK_INFO = [
  {
    label: { vi: 'Vai trò', en: 'Role' },
    value: { vi: 'Full-stack Developer', en: 'Full-stack Developer' },
    icon: 'mdi:code-braces',
    span: 'col-span-2 sm:col-span-1',
  },
  {
    label: { vi: 'Chuyên môn', en: 'Focus' },
    value: { vi: 'Laravel · React · System', en: 'Laravel · React · System' },
    icon: 'mdi:layers-outline',
    span: 'col-span-2 sm:col-span-1',
  },
  {
    label: { vi: 'Lĩnh vực', en: 'Domains' },
    value: {
      vi: 'LMS, Backend Architecture, DevOps, Observability',
      en: 'LMS, Backend Architecture, DevOps, Observability',
    },
    icon: 'mdi:domain',
    span: 'col-span-2',
  },
  {
    label: { vi: 'Định hướng', en: 'Direction' },
    value: {
      vi: 'Xây dựng hệ thống ổn định và có khả năng mở rộng',
      en: 'Building systems that are stable and scalable',
    },
    icon: 'mdi:compass-outline',
    span: 'col-span-2 sm:col-span-1',
  },
  {
    label: { vi: 'Ngôn ngữ', en: 'Languages' },
    value: { vi: 'Tiếng Việt · English (Technical)', en: 'Vietnamese · English (Technical)' },
    icon: 'mdi:translate',
    span: 'col-span-2 sm:col-span-1',
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
  },
};
