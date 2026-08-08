export const CONTACT_EMAIL = 'thanhhai.dev@gmail.com';

export const QUICK_SUGGESTIONS = [
  {
    label: { vi: 'Hệ thống quản lý', en: 'Management system' },
    message: {
      vi: 'Xin chào, tôi đang cần xây dựng một hệ thống quản lý và muốn trao đổi thêm về giải pháp.',
      en: "Hi, I'm looking to build a management system and would like to discuss the solution.",
    },
  },
  {
    label: { vi: 'Laravel Developer', en: 'Laravel Developer' },
    message: {
      vi: 'Tôi đang tìm một Laravel Developer cho dự án kéo dài khoảng ba tháng.',
      en: "I'm looking for a Laravel Developer for a project lasting about three months.",
    },
  },
  {
    label: { vi: 'Tối ưu hiệu suất', en: 'Performance tuning' },
    message: {
      vi: 'Tôi muốn trao đổi về cách tối ưu hiệu suất cho hệ thống Laravel hiện tại.',
      en: "I'd like to discuss how to optimize performance for our current Laravel system.",
    },
  },
  {
    label: { vi: 'Cơ hội việc làm', en: 'Job opportunity' },
    message: {
      vi: 'Tôi có cơ hội việc làm phù hợp và muốn kết nối với bạn.',
      en: "I have a job opportunity that could be a good fit and would like to connect.",
    },
  },
];

export const AVAILABILITY_ITEMS = [
  { vi: 'Dự án Laravel và React', en: 'Laravel and React projects' },
  { vi: 'Hệ thống quản lý và LMS', en: 'Management systems and LMS' },
  { vi: 'Tối ưu hiệu suất ứng dụng', en: 'Application performance tuning' },
  { vi: 'Tư vấn kiến trúc hệ thống', en: 'System architecture consulting' },
  { vi: 'Cơ hội việc làm phù hợp', en: 'The right job opportunities' },
];

export const RESPONSE_PROCESS = [
  {
    num: '01',
    icon: 'mdi:email-open-outline',
    title: { vi: 'Tiếp nhận', en: 'Receive' },
    desc: {
      vi: 'Tôi sẽ đọc và xem xét nội dung bạn gửi trong vòng 24–48 giờ làm việc.',
      en: "I'll read and review your message within 24–48 working hours.",
    },
  },
  {
    num: '02',
    icon: 'mdi:message-reply-outline',
    title: { vi: 'Phản hồi', en: 'Reply' },
    desc: {
      vi: 'Nếu dự án phù hợp, tôi sẽ phản hồi để trao đổi chi tiết hơn về yêu cầu.',
      en: "If it's a good fit, I'll reply to discuss the requirements in more detail.",
    },
  },
  {
    num: '03',
    icon: 'mdi:handshake-outline',
    title: { vi: 'Thống nhất', en: 'Align' },
    desc: {
      vi: 'Hai bên sẽ thống nhất phạm vi, thời gian và phương thức làm việc cụ thể.',
      en: "We'll agree on scope, timeline, and the specific way of working together.",
    },
  },
];

export const FAQ_ITEMS = [
  {
    q: { vi: 'Bạn có nhận dự án freelance không?', en: 'Do you take on freelance projects?' },
    a: {
      vi: 'Tôi sẵn sàng trao đổi về các dự án phù hợp với chuyên môn và thời gian hiện tại. Bạn có thể liên hệ để mình cùng xem xét.',
      en: "I'm open to discussing projects that fit my expertise and current availability. Feel free to reach out so we can take a look together.",
    },
  },
  {
    q: { vi: 'Bạn có làm việc từ xa không?', en: 'Do you work remotely?' },
    a: {
      vi: 'Có. Tôi có thể trao đổi và làm việc từ xa thông qua các công cụ quản lý dự án và giao tiếp trực tuyến.',
      en: 'Yes. I can communicate and work remotely using project management and online collaboration tools.',
    },
  },
  {
    q: { vi: 'Bạn thường làm việc với công nghệ nào?', en: 'What technologies do you usually work with?' },
    a: {
      vi: 'Tôi thường làm việc với Laravel, React, MySQL, SQL Server, Redis, Docker và AWS S3. Chi tiết hơn bạn có thể xem ở trang Giới thiệu.',
      en: 'I mainly work with Laravel, React, MySQL, SQL Server, Redis, Docker, and AWS S3. See the About page for more detail.',
    },
  },
  {
    q: { vi: 'Tôi có thể xem mã nguồn dự án không?', en: 'Can I see a project\'s source code?' },
    a: {
      vi: 'Một số dự án cá nhân có thể được công khai trên GitHub. Các dự án doanh nghiệp thường không thể chia sẻ mã nguồn do yêu cầu bảo mật.',
      en: "Some personal projects are public on GitHub. Enterprise projects usually can't share source code due to confidentiality requirements.",
    },
  },
  {
    q: { vi: 'Bạn có thể tham gia dự án đang phát triển không?', en: 'Can you join a project already in progress?' },
    a: {
      vi: 'Có, nhưng cần đánh giá kiến trúc hiện tại, phạm vi công việc và mức độ ảnh hưởng trước khi tham gia.',
      en: "Yes, but I'll need to assess the current architecture, scope of work, and impact before joining.",
    },
  },
];

/** Role + mô tả ngắn đi cùng nhau ở hero Contact — cùng component RoleSlider với Home/About. */
export const CONTACT_ROLE_SLIDES = [
  {
    title: { vi: 'Sẵn sàng nhận dự án mới', en: 'Open to new projects' },
    subtitle: {
      vi: 'Laravel, React và các hệ thống quản lý quy mô vừa đến lớn.',
      en: 'Laravel, React, and management systems from mid to large scale.',
    },
  },
  {
    title: { vi: 'Tư vấn kiến trúc hệ thống', en: 'System architecture consulting' },
    subtitle: {
      vi: 'Đánh giá và tối ưu hiệu suất cho hệ thống đang vận hành.',
      en: 'Assessing and optimizing performance for systems already in production.',
    },
  },
  {
    title: { vi: 'Cơ hội hợp tác dài hạn', en: 'Long-term collaboration' },
    subtitle: {
      vi: 'Full-stack Developer cho đội ngũ cần một người làm chủ cả hai phía.',
      en: 'A Full-stack Developer for teams that need someone who owns both sides.',
    },
  },
];

export const CONTACT_FORM_SUBJECTS = [
  { vi: 'Hợp tác dự án', en: 'Project collaboration' },
  { vi: 'Cơ hội việc làm', en: 'Job opportunity' },
  { vi: 'Trao đổi kỹ thuật', en: 'Technical discussion' },
  { vi: 'Yêu cầu tư vấn', en: 'Consulting request' },
  { vi: 'Khác', en: 'Other' },
];

export const CONTACT_FORM_TEXT = {
  vi: {
    nameLabel: 'Họ và tên',
    namePlaceholder: 'Nhập tên của bạn',
    emailLabel: 'Email',
    emailPlaceholder: 'Nhập địa chỉ email',
    subjectLabel: 'Chủ đề',
    subjectPlaceholder: 'Chọn chủ đề liên hệ',
    messageLabel: 'Nội dung',
    messagePlaceholder: 'Hãy chia sẻ ngắn gọn về dự án, ý tưởng hoặc nội dung bạn muốn trao đổi...',
    submitIdle: 'Gửi lời nhắn',
    submitting: 'Đang gửi...',
    errorBanner: 'Không thể gửi tin nhắn. Vui lòng thử lại hoặc liên hệ trực tiếp qua email.',
    responseTime: 'Tôi thường phản hồi trong vòng 24–48 giờ làm việc.',
    successTitle: 'Cảm ơn bạn đã liên hệ!',
    successDesc: 'Tin nhắn đã được gửi thành công. Tôi sẽ đọc nội dung và phản hồi sớm nhất có thể.',
    sendAnother: 'Gửi tin nhắn khác',
    errors: {
      name: 'Vui lòng nhập họ và tên.',
      emailRequired: 'Vui lòng nhập địa chỉ email.',
      emailInvalid: 'Địa chỉ email chưa đúng định dạng.',
      subject: 'Vui lòng chọn chủ đề liên hệ.',
      messageRequired: 'Vui lòng nhập nội dung tin nhắn.',
      messageShort: 'Vui lòng nhập thêm thông tin để tôi có thể hiểu rõ yêu cầu.',
    },
  },
  en: {
    nameLabel: 'Full name',
    namePlaceholder: 'Enter your name',
    emailLabel: 'Email',
    emailPlaceholder: 'Enter your email address',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'Choose a subject',
    messageLabel: 'Message',
    messagePlaceholder: 'Briefly share the project, idea, or topic you would like to discuss...',
    submitIdle: 'Send message',
    submitting: 'Sending...',
    errorBanner: "Couldn't send your message. Please try again or reach out directly via email.",
    responseTime: 'I usually respond within 24–48 working hours.',
    successTitle: 'Thanks for reaching out!',
    successDesc: 'Your message was sent successfully. I will read it and reply as soon as possible.',
    sendAnother: 'Send another message',
    errors: {
      name: 'Please enter your full name.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'That email address doesn\'t look valid.',
      subject: 'Please choose a subject.',
      messageRequired: 'Please enter your message.',
      messageShort: 'Please add a bit more detail so I can understand your request.',
    },
  },
};

/** Toàn bộ text tĩnh (không phải mảng lặp) của trang Contact, theo ngôn ngữ. */
export const CONTACT_TEXT = {
  vi: {
    heroEyebrow: 'Kết Nối',
    heroTitle: 'Bạn có một ý tưởng?',
    heroTitleHighlight: 'Hãy cùng biến nó thành sản phẩm thực tế.',
    heroSubtitle: 'Tôi luôn sẵn sàng trao đổi về dự án, cơ hội hợp tác hoặc những ý tưởng công nghệ thú vị.',
    availabilityBadge: 'Hiện đang nhận dự án mới',
    ctaSend: 'Gửi lời nhắn',
    ctaProjects: 'Xem dự án',
    infoEyebrow: 'Liên hệ',
    availabilityTitle: 'Sẵn sàng hợp tác',
    emailLabel: 'Email',
    copyEmail: 'Sao chép email',
    sendEmail: 'Gửi email',
    connectLabel: 'Kết nối',
    formTitle: 'Gửi lời nhắn',
    suggestionsEyebrow: 'Chủ đề gợi ý',
    suggestionsTitle: 'Bạn chưa biết bắt đầu như thế nào?',
    processLabel: 'Quy trình',
    processTitle: 'Sau khi bạn gửi tin nhắn',
    faqLabel: 'Câu hỏi',
    faqTitle: 'Câu hỏi thường gặp',
    secondaryEyebrow: 'Chưa sẵn sàng gửi tin nhắn?',
    secondaryTitle: 'Hãy xem những dự án tôi đã xây dựng trước.',
    secondarySubtitle: 'Bạn có thể xem các dự án tôi đã thực hiện để hiểu rõ hơn về cách tôi làm việc.',
    secondaryCtaPrimary: 'Xem tất cả dự án',
    secondaryCtaSecondary: 'Tìm hiểu về tôi',
    copied: 'Đã sao chép!',
  },
  en: {
    heroEyebrow: "Let's Connect",
    heroTitle: 'Got an idea?',
    heroTitleHighlight: "Let's turn it into a real product.",
    heroSubtitle: "I'm always happy to talk about projects, collaboration opportunities, or interesting tech ideas.",
    availabilityBadge: 'Currently available for new projects',
    ctaSend: 'Send a message',
    ctaProjects: 'View projects',
    infoEyebrow: 'Contact',
    availabilityTitle: 'Available for collaboration',
    emailLabel: 'Email',
    copyEmail: 'Copy email',
    sendEmail: 'Send email',
    connectLabel: 'Connect',
    formTitle: 'Send a message',
    suggestionsEyebrow: 'Suggested topics',
    suggestionsTitle: "Not sure where to start?",
    processLabel: 'Process',
    processTitle: 'After you send a message',
    faqLabel: 'FAQ',
    faqTitle: 'Frequently asked questions',
    secondaryEyebrow: 'Not ready to send a message yet?',
    secondaryTitle: "Check out the projects I've built first.",
    secondarySubtitle: 'You can browse the projects I have worked on to get a better sense of how I work.',
    secondaryCtaPrimary: 'View all projects',
    secondaryCtaSecondary: 'Learn about me',
    copied: 'Copied!',
  },
};
