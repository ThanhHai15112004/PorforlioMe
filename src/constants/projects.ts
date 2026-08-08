// ─── Types ────────────────────────────────────────────────────────────────────

export interface Challenge {
  title: string;
  problem: string;
  solution: string;
}

export interface RoleGroup {
  category: string;
  icon: string;
  tasks: string[];
}

export interface UserPersona {
  type: string;
  icon: string;
  tasks: string[];
}

export interface KeyModule {
  title: string;
  desc: string;
  features: string[];
}

export interface ProcessStep {
  num: string;
  title: string;
  items: string[];
}

export interface Lesson {
  title: string;
  desc: string;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  tag: ProjectTag;
  role: string;
  timeline: string;
  tech: string[];
  description: string;
  highlights: string[];
  challenges: Challenge[];
  results: string[];
  nextSlug: string;

  // ─── Extended Case Study Fields ──────────────────────────────────
  overview?: string[];
  problems?: { num: string; title: string; desc: string }[];
  goals?: { num: string; title: string; desc: string }[];
  roleGroups?: RoleGroup[];
  users?: UserPersona[];
  architecture?: { layers: string[]; support: string[] };
  modules?: KeyModule[];
  deepDive?: {
    title: string;
    problem: string;
    solutionItems: string[];
  };
  process?: ProcessStep[];
  lessons?: Lesson[];
}

export type ProjectTag =
  | 'Tất cả'
  | 'LMS'
  | 'Backend'
  | 'Frontend'
  | 'DevOps'
  | 'Personal';

export const PROJECT_TAGS: ProjectTag[] = [
  'Tất cả',
  'LMS',
  'Backend',
  'Frontend',
  'DevOps',
  'Personal',
];

// ─── Data ─────────────────────────────────────────────────────────────────────

export const PROJECTS_DATA: Project[] = [
  // ──────────────────────────────────────────────────────────────────
  // 01. Enterprise LMS — Full Case Study
  // ──────────────────────────────────────────────────────────────────
  {
    slug: 'enterprise-lms',
    index: '01',
    title: 'Enterprise Learning Management System',
    tag: 'LMS',
    role: 'Full-stack Developer',
    timeline: '2025 – 2026',
    tech: ['Laravel', 'React', 'Ant Design', 'SQL Server', 'Redis', 'Docker'],
    description:
      'Hệ thống quản lý đào tạo trực tuyến phục vụ doanh nghiệp, trung tâm và trường học. Hỗ trợ quản lý khóa học, học viên, giảng viên, kỳ thi, tài liệu, video và tiến độ học tập toàn diện.',
    highlights: [
      'Phân quyền đa nhóm người dùng (Admin, Giảng viên, Học viên)',
      'Quản lý chương trình đào tạo và khóa học',
      'Hệ thống thi trắc nghiệm, tự luận và chấm điểm tự động',
      'Quản lý chứng chỉ và cấp phát tự động',
      'Theo dõi tiến độ học tập theo thời gian thực',
      'Báo cáo và thống kê trực quan',
    ],
    challenges: [
      {
        title: 'Tối ưu hiệu suất khi nhiều học viên cùng truy cập',
        problem:
          'Hệ thống bị chậm khi có hơn 500 học viên cùng xem khóa học và làm bài thi đồng thời.',
        solution:
          'Áp dụng Redis cache cho dữ liệu khóa học và bài thi. Tách bộ chấm điểm thành Queue Worker riêng biệt. Tối ưu N+1 query bằng Eager Loading.',
      },
      {
        title: 'Quy trình phê duyệt nội dung phức tạp',
        problem:
          'Nội dung bài học cần qua nhiều bước duyệt (Tạo → Chờ duyệt → Duyệt → Xuất bản) với nhiều vai trò khác nhau.',
        solution:
          'Thiết kế State Machine cho lifecycle nội dung. Ghi log đầy đủ mọi hành động thay đổi trạng thái. Tích hợp thông báo realtime khi trạng thái thay đổi.',
      },
      {
        title: 'Hệ thống có nhiều module liên kết chặt chẽ',
        problem:
          'Một thay đổi nhỏ trong khóa học có thể ảnh hưởng đến kỳ thi, học viên, báo cáo và thông báo.',
        solution:
          'Phân tích dependency trước khi sửa. Tách xử lý nghiệp vụ theo Service Layer. Không thay đổi API đã ổn định. Kiểm thử các luồng liên quan sau mỗi thay đổi.',
      },
      {
        title: 'Truy vấn dữ liệu lớn gây chậm màn hình',
        problem:
          'Một số màn hình tải chậm khi dữ liệu người dùng, khóa học và kết quả tăng lên đáng kể.',
        solution:
          'Tối ưu select, hạn chế truy vấn lặp, dùng eager loading phù hợp. Thêm cache cho dữ liệu ít thay đổi. Phân trang và đưa xử lý nặng sang Queue Worker.',
      },
    ],
    results: [
      'Tập trung hóa toàn bộ quy trình đào tạo vào một hệ thống duy nhất',
      'Giảm đáng kể thời gian chấm bài thủ công nhờ tự động hóa',
      'Video phát ổn định hơn, dữ liệu được tổ chức rõ ràng',
      'Dễ theo dõi tiến độ học tập của học viên',
      'Hệ thống ổn định, dễ bảo trì và mở rộng thêm module mới',
      'Cải thiện khả năng xử lý lỗi và theo dõi vận hành',
    ],
    nextSlug: 'video-hls',

    // ─── Extended ────────────────────────────────────────────────────
    overview: [
      'Enterprise LMS là hệ thống quản lý đào tạo trực tuyến được xây dựng nhằm số hóa và tập trung hóa toàn bộ quy trình đào tạo trong doanh nghiệp và tổ chức giáo dục.',
      'Hệ thống phục vụ nhiều nhóm người dùng, bao gồm quản trị viên, giảng viên và học viên, với các giao diện và quyền truy cập riêng biệt cho từng vai trò.',
      'Trong dự án, tôi tham gia phát triển nhiều module nghiệp vụ, tối ưu hiệu suất, xử lý video, quản lý nội dung và cải thiện trải nghiệm sử dụng của hệ thống.',
    ],
    problems: [
      {
        num: '01',
        title: 'Dữ liệu đào tạo phân tán',
        desc: 'Thông tin khóa học, học viên và kết quả được quản lý tại nhiều khu vực khác nhau, gây khó khăn khi tổng hợp.',
      },
      {
        num: '02',
        title: 'Khó theo dõi tiến độ học tập',
        desc: 'Quản trị viên và giảng viên mất nhiều thời gian để xác định trạng thái học tập của từng học viên.',
      },
      {
        num: '03',
        title: 'Quy trình thủ công tốn kém',
        desc: 'Tạo khóa học, phân công giảng viên, tổ chức thi và tổng hợp kết quả đều thực hiện thủ công.',
      },
      {
        num: '04',
        title: 'Nội dung video và tài liệu chưa tổ chức',
        desc: 'Bài giảng video và tài liệu đính kèm chưa có hệ thống lưu trữ và phân loại rõ ràng.',
      },
      {
        num: '05',
        title: 'Hiệu suất suy giảm khi tải cao',
        desc: 'Hệ thống phản hồi chậm khi số lượng người dùng đồng thời tăng lên.',
      },
      {
        num: '06',
        title: 'Khó theo dõi lỗi vận hành',
        desc: 'Không có hệ thống log tập trung, khó phát hiện và xử lý lỗi khi hệ thống chạy thực tế.',
      },
    ],
    goals: [
      { num: '01', title: 'Tập trung hóa dữ liệu', desc: 'Toàn bộ dữ liệu đào tạo được quản lý tại một nơi duy nhất.' },
      { num: '02', title: 'Trải nghiệm học viên tốt hơn', desc: 'Giao diện rõ ràng, dễ theo dõi tiến độ và xem nội dung.' },
      { num: '03', title: 'Kiến trúc có khả năng mở rộng', desc: 'Hệ thống ổn định khi dữ liệu và số người dùng tăng theo thời gian.' },
      { num: '04', title: 'Khả năng theo dõi vận hành', desc: 'Dễ dàng phát hiện và xử lý sự cố khi hệ thống chạy thực tế.' },
    ],
    roleGroups: [
      {
        category: 'Phân tích Nghiệp vụ',
        icon: 'mdi:magnify',
        tasks: ['Làm rõ yêu cầu chức năng', 'Phân tích luồng người dùng', 'Xác định phạm vi ảnh hưởng', 'Đề xuất giải pháp kỹ thuật'],
      },
      {
        category: 'Backend Development',
        icon: 'mdi:server-outline',
        tasks: ['Phát triển REST API', 'Xử lý nghiệp vụ phức tạp', 'Tối ưu truy vấn cơ sở dữ liệu', 'Xây dựng Queue và Cache', 'Xử lý phân quyền và bảo mật'],
      },
      {
        category: 'Frontend Development',
        icon: 'mdi:monitor-shimmer',
        tasks: ['Xây dựng giao diện quản trị', 'Kết nối và xử lý API', 'Quản lý trạng thái ứng dụng', 'Tối ưu trải nghiệm người dùng'],
      },
      {
        category: 'Vận hành & Tối ưu',
        icon: 'mdi:cog-outline',
        tasks: ['Xử lý lỗi trên môi trường Production', 'Theo dõi log hệ thống', 'Tối ưu hiệu suất dựa trên dữ liệu thực tế', 'Hỗ trợ đóng gói và triển khai'],
      },
    ],
    users: [
      {
        type: 'Quản trị viên',
        icon: 'mdi:shield-account-outline',
        tasks: ['Quản lý người dùng và phân quyền', 'Quản lý khóa học và chương trình', 'Tổ chức kỳ thi', 'Theo dõi báo cáo tổng hợp', 'Cấu hình hệ thống'],
      },
      {
        type: 'Giảng viên',
        icon: 'mdi:account-tie-outline',
        tasks: ['Tạo và quản lý nội dung bài học', 'Upload video và tài liệu', 'Theo dõi tiến độ học viên', 'Chấm bài và đánh giá', 'Quản lý lịch đào tạo'],
      },
      {
        type: 'Học viên',
        icon: 'mdi:account-school-outline',
        tasks: ['Tham gia khóa học được giao', 'Xem video bài giảng và tài liệu', 'Làm bài kiểm tra và thi', 'Theo dõi tiến độ cá nhân', 'Nhận chứng chỉ hoàn thành'],
      },
    ],
    architecture: {
      layers: ['React Frontend', 'Laravel API', 'Application Services', 'Repositories', 'SQL Server / MySQL'],
      support: ['Redis Cache', 'Queue Worker', 'AWS S3', 'FFmpeg', 'OpenTelemetry', 'Grafana', 'Notification Service'],
    },
    modules: [
      {
        title: 'Quản lý Khóa học',
        desc: 'Cho phép tạo chương trình đào tạo, khóa học, bài học, tài liệu và gán giảng viên.',
        features: ['Tạo và cập nhật khóa học', 'Quản lý bài học và nội dung', 'Gán giảng viên', 'Phân loại và lọc', 'Điều kiện hoàn thành'],
      },
      {
        title: 'Quản lý Học viên',
        desc: 'Quản lý thông tin học viên, phân nhóm, gán khóa học và theo dõi tiến độ.',
        features: ['Import học viên hàng loạt', 'Phân nhóm người dùng', 'Gán khóa học theo nhóm', 'Theo dõi trạng thái học', 'Báo cáo tiến độ chi tiết'],
      },
      {
        title: 'Hệ thống Thi',
        desc: 'Tổ chức bài kiểm tra trắc nghiệm, tự luận và đánh giá kết quả học tập.',
        features: ['Tạo kỳ thi và ngân hàng câu hỏi', 'Trộn câu hỏi tự động', 'Chấm điểm trắc nghiệm tự động', 'Chấm bài tự luận kết hợp AI', 'Điều chỉnh kết quả và lịch sử thay đổi'],
      },
      {
        title: 'Video HLS',
        desc: 'Xử lý và phát video theo nhiều mức chất lượng để thích ứng tốc độ mạng người dùng.',
        features: ['Upload và chuyển đổi bằng FFmpeg', 'Tạo nhiều mức chất lượng (360p–1080p)', 'Xử lý qua Queue — không block request', 'Theo dõi trạng thái xử lý realtime', 'Phát Adaptive Bitrate tự động'],
      },
      {
        title: 'Quản lý Tài liệu',
        desc: 'Tổ chức tài liệu theo cấu trúc thư mục nhiều cấp với phân quyền và kiểm soát an toàn.',
        features: ['Cây thư mục nhiều cấp', 'Upload vào thư mục hiện tại', 'Breadcrumb động', 'Kiểm tra file đang dùng trước khi xóa', 'Lưu trữ trên AWS S3'],
      },
      {
        title: 'Báo cáo & Thống kê',
        desc: 'Dữ liệu tổng quan về khóa học, học viên, kỳ thi và tiến độ đào tạo.',
        features: ['Dashboard tổng quan', 'Báo cáo tiến độ và kết quả thi', 'Bộ lọc dữ liệu linh hoạt', 'Xuất báo cáo ra file'],
      },
    ],
    deepDive: {
      title: 'Xử lý Video HLS với Queue',
      problem:
        'Upload và chuyển đổi video có chất lượng cao (>500MB) làm HTTP request bị timeout. Người dùng phải chờ hàng giây trước khi video bắt đầu phát, đặc biệt trên mạng chậm.',
      solutionItems: [
        'Tách luồng xử lý video vào Laravel Queue Worker riêng biệt',
        'Trả về Job ID ngay lập tức — Client polling trạng thái qua API',
        'Cấu hình HLS segment ngắn (2–4 giây), khởi đầu ở 360p',
        'Dùng Video.js ABR để tự động nâng chất lượng khi mạng ổn định',
        'Retry tự động khi Queue Worker gặp lỗi FFmpeg',
        'Ghi log đầy đủ trạng thái xử lý và thông báo khi hoàn thành',
      ],
    },
    process: [
      { num: '01', title: 'Phân tích', items: ['Làm rõ yêu cầu', 'Xác định luồng hiện tại', 'Xác định luồng mong muốn', 'Đánh giá phạm vi ảnh hưởng'] },
      { num: '02', title: 'Thiết kế', items: ['Thiết kế luồng xử lý', 'Chọn giải pháp kỹ thuật', 'Xác định dữ liệu liên quan', 'Lập kế hoạch triển khai'] },
      { num: '03', title: 'Phát triển', items: ['Chia nhỏ chức năng', 'Phát triển theo phạm vi rõ ràng', 'Kiểm soát thay đổi', 'Code review'] },
      { num: '04', title: 'Kiểm thử', items: ['Kiểm tra chức năng chính', 'Kiểm tra trường hợp biên', 'Kiểm tra ảnh hưởng chéo', 'Kiểm thử hiệu suất'] },
      { num: '05', title: 'Triển khai', items: ['Merge code và chạy migration', 'Build frontend', 'Deploy và theo dõi log', 'Xác nhận hoạt động ổn định'] },
      { num: '06', title: 'Tối ưu', items: ['Phân tích dữ liệu vận hành', 'Xử lý điểm nghẽn', 'Cải thiện trải nghiệm', 'Điều chỉnh kiến trúc khi cần'] },
    ],
    lessons: [
      {
        title: 'Hiểu nghiệp vụ trước khi code',
        desc: 'Dành thời gian phân tích bài toán thực tế giúp tránh làm lại nhiều lần và giảm rủi ro ảnh hưởng chéo.',
      },
      {
        title: 'Không tối ưu khi chưa đo lường',
        desc: 'Hiệu suất nên được cải thiện dựa trên dữ liệu thực tế, không dựa trên cảm giác hay phỏng đoán.',
      },
      {
        title: 'Tách tác vụ nặng khỏi request',
        desc: 'Mọi tác vụ tốn thời gian (video, email, báo cáo) cần được xử lý bất đồng bộ qua Queue.',
      },
      {
        title: 'Kiểm soát phạm vi ảnh hưởng',
        desc: 'Với hệ thống nhiều module liên kết, thay đổi nhỏ cũng cần phân tích dependency và kiểm tra kỹ lưỡng.',
      },
      {
        title: 'Thiết kế cho vận hành thực tế',
        desc: 'Log đầy đủ, thông báo lỗi rõ ràng và khả năng quan sát hệ thống quan trọng không kém tính năng.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  // 02. Video HLS — Data tóm tắt
  // ──────────────────────────────────────────────────────────────────
  {
    slug: 'video-hls',
    index: '02',
    title: 'Adaptive Video Streaming Platform',
    tag: 'Backend',
    role: 'Backend Developer',
    timeline: '2025',
    tech: ['Laravel', 'FFmpeg', 'HLS', 'Queue', 'Redis', 'Video.js'],
    description:
      'Giải pháp xử lý và phát video nhiều chất lượng bằng giao thức HLS, giúp người dùng xem video ổn định trên mọi điều kiện mạng từ 3G đến cáp quang.',
    highlights: [
      'Chuyển đổi video tự động bằng FFmpeg',
      'Tạo đồng thời nhiều mức chất lượng (360p, 480p, 720p, 1080p)',
      'Tự động chọn chất lượng phù hợp theo tốc độ mạng',
      'Khởi đầu ở chất lượng 360p, tăng dần khi mạng ổn định',
      'Xử lý chuyển đổi video qua Queue — không block request',
      'Theo dõi tiến trình xử lý và thông báo khi hoàn thành',
    ],
    challenges: [
      {
        title: 'Video chất lượng cao gây chậm khi bắt đầu phát',
        problem:
          'Người dùng phải chờ hàng giây trước khi video bắt đầu phát, đặc biệt trên mạng chậm.',
        solution:
          'Cấu hình HLS segment ngắn (2–4 giây). Khởi đầu luôn ở 360p. Dùng Video.js ABR để tự động nâng chất lượng. Điều chỉnh buffer size phù hợp.',
      },
      {
        title: 'Xử lý video làm timeout request HTTP',
        problem:
          'Upload và chuyển đổi video lớn (>500MB) làm request bị timeout sau 60 giây.',
        solution:
          'Tách luồng xử lý video vào Laravel Queue Worker riêng. Trả về Job ID ngay lập tức. Client polling trạng thái xử lý qua API. Retry tự động khi Queue Worker gặp lỗi.',
      },
    ],
    results: [
      'Thời gian bắt đầu phát video giảm đáng kể',
      'Trải nghiệm xem video mượt mà trên mọi tốc độ mạng',
      'Hệ thống xử lý video hoàn toàn không đồng bộ, không ảnh hưởng UX',
      'Dễ mở rộng thêm mức chất lượng mới',
    ],
    nextSlug: 'coaching-management',
  },

  // ──────────────────────────────────────────────────────────────────
  // 03–06. Các dự án còn lại — Data tóm tắt
  // ──────────────────────────────────────────────────────────────────
  {
    slug: 'coaching-management',
    index: '03',
    title: 'Coaching and Mentor Management System',
    tag: 'LMS',
    role: 'Full-stack Developer',
    timeline: '2025',
    tech: ['Laravel', 'React', 'Docker', 'MySQL', 'Redis'],
    description:
      'Hệ thống quản lý lịch coaching, mentor, hoạt động học tập và quá trình hoàn thành của học viên — từ lên lịch, tạo nội dung đến xác nhận kết quả.',
    highlights: [
      'Quản lý lịch mentor và buổi coaching',
      'Tạo và sắp xếp hoạt động bằng kéo thả (Drag & Drop)',
      'Hỗ trợ nhiều loại nội dung: video, file, link, text',
      'Thiết lập điều kiện hoàn thành cho từng hoạt động',
      'Theo dõi tiến độ học viên theo buổi học',
      'Quy trình tạo → duyệt → xuất bản nội dung',
    ],
    challenges: [
      {
        title: 'Sắp xếp hoạt động theo thứ tự tùy ý',
        problem:
          'Mentor cần sắp xếp lại thứ tự các hoạt động trong buổi học một cách linh hoạt và trực quan.',
        solution:
          'Tích hợp thư viện Drag & Drop. Lưu thứ tự bằng cột `order` integer. Cập nhật batch khi người dùng thả phần tử vào vị trí mới.',
      },
      {
        title: 'Điều kiện hoàn thành đa dạng',
        problem:
          'Mỗi hoạt động có điều kiện hoàn thành khác nhau: xem đủ video, nộp file, quiz đạt điểm tối thiểu...',
        solution:
          'Thiết kế hệ thống Rule-based Completion. Mỗi loại hoạt động có Completion Handler riêng. Kết quả được tổng hợp theo buổi học và toàn khóa.',
      },
    ],
    results: [
      'Mentor có thể quản lý lịch và nội dung dễ dàng, trực quan',
      'Quy trình duyệt nội dung rõ ràng, giảm sai sót',
      'Học viên biết chính xác tiến độ hoàn thành của mình',
      'Hệ thống mở rộng được với nhiều loại hoạt động mới',
    ],
    nextSlug: 'file-manager',
  },
  {
    slug: 'file-manager',
    index: '04',
    title: 'Enterprise File and Content Manager',
    tag: 'Backend',
    role: 'Full-stack Developer',
    timeline: '2025',
    tech: ['Laravel', 'React', 'AWS S3', 'MySQL', 'Redis'],
    description:
      'Hệ thống quản lý file và nội dung theo cấu trúc thư mục nhiều cấp, hỗ trợ tổ chức tài liệu, bài giảng và media cho chương trình và khóa học.',
    highlights: [
      'Quản lý thư mục nhiều cấp với tree view trực quan',
      'Upload file trực tiếp vào thư mục hiện tại',
      'Breadcrumb động theo đường dẫn thư mục',
      'Tìm kiếm tài liệu theo tên và loại file',
      'Kiểm tra file đang được sử dụng trước khi xóa',
      'Phân quyền xem và chỉnh sửa theo vai trò',
    ],
    challenges: [
      {
        title: 'Ngăn xóa file đang được sử dụng',
        problem:
          'Nếu xóa file đang được dùng trong bài học, nội dung bài học sẽ bị mất liên kết và hiển thị lỗi.',
        solution:
          'Trước khi xóa, kiểm tra bảng liên kết file ↔ nội dung bài học. Hiển thị danh sách các nơi đang dùng file đó. Bắt buộc xác nhận tay nếu file đang được sử dụng.',
      },
      {
        title: 'Hiển thị cây thư mục lớn',
        problem:
          'Cây thư mục có hàng trăm node gây chậm khi render và khó điều hướng.',
        solution:
          'Lazy load các nhánh con khi người dùng mở rộng. Cache cấu trúc thư mục bằng Redis. Chỉ render các node trong viewport.',
      },
    ],
    results: [
      'Tổ chức tài liệu rõ ràng, dễ tìm kiếm hơn',
      'Không còn tình trạng xóa nhầm file đang được sử dụng',
      'Phân quyền rõ ràng, an toàn cho dữ liệu nội bộ',
      'Tích hợp trơn tru với hệ thống LMS',
    ],
    nextSlug: 'ai-scoring',
  },
  {
    slug: 'ai-scoring',
    index: '05',
    title: 'AI-assisted Essay Scoring System',
    tag: 'Backend',
    role: 'Full-stack Developer',
    timeline: '2025 – 2026',
    tech: ['Laravel', 'React', 'OpenAI API', 'SQL Server'],
    description:
      'Hệ thống hỗ trợ chấm điểm câu hỏi tự luận kết hợp rubric, keyword matching, rule-based scoring và trí tuệ nhân tạo — giảm tải công việc thủ công cho giáo viên.',
    highlights: [
      'Tạo rubric chấm điểm theo từng tiêu chí',
      'Phân tích từ khóa và đối chiếu đáp án mẫu',
      'Chấm điểm tự động kết hợp AI và quy tắc nghiệp vụ',
      'Giáo viên điều chỉnh điểm và ghi lý do thay đổi',
      'Lưu lịch sử đầy đủ mọi thay đổi kết quả',
      'Giảm thời gian chấm bài thủ công đáng kể',
    ],
    challenges: [
      {
        title: 'Kết quả AI không ổn định',
        problem:
          'Các lần gọi OpenAI API với cùng bài làm đôi khi cho điểm khác nhau, ảnh hưởng tính công bằng.',
        solution:
          'Dùng AI cho phân tích ngữ nghĩa, kết hợp với rule-based scoring để đảm bảo tính nhất quán. Lưu cache kết quả AI theo hash bài làm. Giáo viên luôn có quyền override.',
      },
      {
        title: 'Tốc độ phản hồi khi chấm hàng loạt',
        problem:
          'Chấm cùng lúc 100+ bài tự luận làm API bị chậm và có thể timeout.',
        solution:
          'Đưa tác vụ chấm AI vào Queue. Chấm xử lý batch theo nhóm nhỏ. Giáo viên nhận thông báo khi hoàn thành.',
      },
    ],
    results: [
      'Thời gian chấm bài tự luận giảm đáng kể',
      'Giáo viên tập trung vào xem xét và điều chỉnh thay vì chấm thủ công',
      'Lịch sử thay đổi minh bạch, có thể kiểm tra bất kỳ lúc nào',
      'Hệ thống kết hợp được điểm mạnh của AI và quy tắc nghiệp vụ thực tế',
    ],
    nextSlug: 'monitoring',
  },
  {
    slug: 'monitoring',
    index: '06',
    title: 'Application Monitoring and Observability',
    tag: 'DevOps',
    role: 'DevOps Engineer',
    timeline: '2025',
    tech: ['Docker', 'Grafana', 'Prometheus', 'OpenTelemetry', 'Loki'],
    description:
      'Hệ thống theo dõi sức khỏe ứng dụng, hiệu suất server, log tập trung và các chỉ số vận hành quan trọng — giúp phát hiện và xử lý sự cố nhanh chóng.',
    highlights: [
      'Thu thập metrics hệ thống (CPU, RAM, Disk, Network)',
      'Theo dõi response time và error rate của API',
      'Quản lý log tập trung bằng Loki',
      'Dashboard Grafana trực quan, cập nhật realtime',
      'Cảnh báo tự động qua Telegram khi hệ thống gặp sự cố',
      'Phân tích distributed traces với OpenTelemetry',
    ],
    challenges: [
      {
        title: 'Quá nhiều cảnh báo gây nhiễu (Alert fatigue)',
        problem:
          'Khi threshold đặt quá thấp, nhóm nhận hàng trăm cảnh báo mỗi ngày, dẫn đến bỏ qua cảnh báo quan trọng.',
        solution:
          'Phân loại cảnh báo theo mức độ (Critical / Warning / Info). Áp dụng alerting rules có thời gian chờ (for: 5m). Nhóm cảnh báo liên quan thành một thông báo.',
      },
      {
        title: 'Log phân tán trên nhiều container',
        problem:
          'Khi có lỗi, phải SSH vào từng container để đọc log, rất tốn thời gian.',
        solution:
          'Triển khai Promtail trên mỗi container, đẩy log tập trung về Loki. Tìm kiếm và lọc log theo service, level, và thời gian trực tiếp trên Grafana.',
      },
    ],
    results: [
      'Phát hiện sự cố nhanh hơn trước khi người dùng báo cáo',
      'Log tập trung giúp debug nhanh hơn nhiều',
      'Cảnh báo có chọn lọc, không bị nhiễu',
      'Nhóm vận hành có cái nhìn toàn cảnh về sức khỏe hệ thống',
    ],
    nextSlug: 'enterprise-lms',
  },
];
