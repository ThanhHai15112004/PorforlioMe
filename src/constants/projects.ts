import type { Lang } from '../lib/i18n';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Bi<T> {
  vi: T;
  en: T;
}

export interface Challenge {
  title: Bi<string>;
  problem: Bi<string>;
  solution: Bi<string>;
}

export interface RoleGroup {
  category: Bi<string>;
  icon: string;
  tasks: Bi<string[]>;
}

export interface UserPersona {
  type: Bi<string>;
  icon: string;
  tasks: Bi<string[]>;
}

export interface KeyModule {
  title: Bi<string>;
  desc: Bi<string>;
  features: Bi<string[]>;
}

export interface ProcessStep {
  num: string;
  title: Bi<string>;
  items: Bi<string[]>;
}

export interface Lesson {
  title: Bi<string>;
  desc: Bi<string>;
}

export interface Project {
  slug: string;
  index: string;
  title: Bi<string>;
  tag: ProjectTag;
  role: string;
  timeline: string;
  tech: string[];
  description: Bi<string>;
  highlights: Bi<string[]>;
  challenges: Challenge[];
  results: Bi<string[]>;
  nextSlug: string;

  // ─── Extended Case Study Fields ──────────────────────────────────
  overview?: Bi<string[]>;
  problems?: { num: string; title: Bi<string>; desc: Bi<string> }[];
  goals?: { num: string; title: Bi<string>; desc: Bi<string> }[];
  roleGroups?: RoleGroup[];
  users?: UserPersona[];
  architecture?: { layers: Bi<string[]>; support: Bi<string[]> };
  modules?: KeyModule[];
  deepDive?: {
    title: Bi<string>;
    problem: Bi<string>;
    solutionItems: Bi<string[]>;
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

/** Nhãn hiển thị cho từng tag theo ngôn ngữ — logic lọc vẫn dùng giá trị gốc của ProjectTag. */
export const TAG_LABEL: Record<ProjectTag, Bi<string>> = {
  'Tất cả': { vi: 'Tất cả', en: 'All' },
  LMS: { vi: 'LMS', en: 'LMS' },
  Backend: { vi: 'Backend', en: 'Backend' },
  Frontend: { vi: 'Frontend', en: 'Frontend' },
  DevOps: { vi: 'DevOps', en: 'DevOps' },
  Personal: { vi: 'Personal', en: 'Personal' },
};

// ─── localize helper ───────────────────────────────────────────────────────

function loc<T>(field: Bi<T>, lang: Lang): T {
  return lang === 'vi' ? field.vi : field.en;
}

/** Kiểu Project sau khi đã "phẳng hóa" mọi field {vi,en} về string/string[] theo ngôn ngữ hiện tại. */
export interface LocalizedProject {
  slug: string;
  index: string;
  title: string;
  tag: ProjectTag;
  role: string;
  timeline: string;
  tech: string[];
  description: string;
  highlights: string[];
  challenges: { title: string; problem: string; solution: string }[];
  results: string[];
  nextSlug: string;

  overview?: string[];
  problems?: { num: string; title: string; desc: string }[];
  goals?: { num: string; title: string; desc: string }[];
  roleGroups?: { category: string; icon: string; tasks: string[] }[];
  users?: { type: string; icon: string; tasks: string[] }[];
  architecture?: { layers: string[]; support: string[] };
  modules?: { title: string; desc: string; features: string[] }[];
  deepDive?: { title: string; problem: string; solutionItems: string[] };
  process?: { num: string; title: string; items: string[] }[];
  lessons?: { title: string; desc: string }[];
}

/** Chuyển một Project (chứa các field {vi,en}) thành object phẳng theo ngôn ngữ được chọn. */
export function localizeProject(p: Project, lang: Lang): LocalizedProject {
  return {
    slug: p.slug,
    index: p.index,
    title: loc(p.title, lang),
    tag: p.tag,
    role: p.role,
    timeline: p.timeline,
    tech: p.tech,
    description: loc(p.description, lang),
    highlights: loc(p.highlights, lang),
    challenges: p.challenges.map((c) => ({
      title: loc(c.title, lang),
      problem: loc(c.problem, lang),
      solution: loc(c.solution, lang),
    })),
    results: loc(p.results, lang),
    nextSlug: p.nextSlug,

    overview: p.overview ? loc(p.overview, lang) : undefined,
    problems: p.problems?.map((x) => ({
      num: x.num,
      title: loc(x.title, lang),
      desc: loc(x.desc, lang),
    })),
    goals: p.goals?.map((x) => ({
      num: x.num,
      title: loc(x.title, lang),
      desc: loc(x.desc, lang),
    })),
    roleGroups: p.roleGroups?.map((rg) => ({
      category: loc(rg.category, lang),
      icon: rg.icon,
      tasks: loc(rg.tasks, lang),
    })),
    users: p.users?.map((u) => ({
      type: loc(u.type, lang),
      icon: u.icon,
      tasks: loc(u.tasks, lang),
    })),
    architecture: p.architecture
      ? {
          layers: loc(p.architecture.layers, lang),
          support: loc(p.architecture.support, lang),
        }
      : undefined,
    modules: p.modules?.map((m) => ({
      title: loc(m.title, lang),
      desc: loc(m.desc, lang),
      features: loc(m.features, lang),
    })),
    deepDive: p.deepDive
      ? {
          title: loc(p.deepDive.title, lang),
          problem: loc(p.deepDive.problem, lang),
          solutionItems: loc(p.deepDive.solutionItems, lang),
        }
      : undefined,
    process: p.process?.map((step) => ({
      num: step.num,
      title: loc(step.title, lang),
      items: loc(step.items, lang),
    })),
    lessons: p.lessons?.map((l) => ({
      title: loc(l.title, lang),
      desc: loc(l.desc, lang),
    })),
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const PROJECTS_DATA: Project[] = [
  // ──────────────────────────────────────────────────────────────────
  // 01. Enterprise LMS — Full Case Study
  // ──────────────────────────────────────────────────────────────────
  {
    slug: 'enterprise-lms',
    index: '01',
    title: {
      vi: 'Enterprise Learning Management System',
      en: 'Enterprise Learning Management System',
    },
    tag: 'LMS',
    role: 'Full-stack Developer',
    timeline: '2025 – 2026',
    tech: ['Laravel', 'React', 'Ant Design', 'SQL Server', 'Redis', 'Docker'],
    description: {
      vi: 'Hệ thống quản lý đào tạo trực tuyến phục vụ doanh nghiệp, trung tâm và trường học. Hỗ trợ quản lý khóa học, học viên, giảng viên, kỳ thi, tài liệu, video và tiến độ học tập toàn diện.',
      en: 'An online training management system built for enterprises, training centers, and schools. It handles course management, learners, instructors, exams, documents, video, and end-to-end learning progress tracking.',
    },
    highlights: {
      vi: [
        'Phân quyền đa nhóm người dùng (Admin, Giảng viên, Học viên)',
        'Quản lý chương trình đào tạo và khóa học',
        'Hệ thống thi trắc nghiệm, tự luận và chấm điểm tự động',
        'Quản lý chứng chỉ và cấp phát tự động',
        'Theo dõi tiến độ học tập theo thời gian thực',
        'Báo cáo và thống kê trực quan',
      ],
      en: [
        'Multi-group role-based access control (Admin, Instructor, Learner)',
        'Training program and course management',
        'Multiple-choice and essay exams with automated grading',
        'Certificate management and automatic issuance',
        'Real-time learning progress tracking',
        'Visual reporting and analytics',
      ],
    },
    challenges: [
      {
        title: {
          vi: 'Tối ưu hiệu suất khi nhiều học viên cùng truy cập',
          en: 'Optimizing performance under heavy concurrent access',
        },
        problem: {
          vi: 'Hệ thống bị chậm khi có hơn 500 học viên cùng xem khóa học và làm bài thi đồng thời.',
          en: 'The system slowed down significantly whenever more than 500 learners viewed courses and took exams at the same time.',
        },
        solution: {
          vi: 'Áp dụng Redis cache cho dữ liệu khóa học và bài thi. Tách bộ chấm điểm thành Queue Worker riêng biệt. Tối ưu N+1 query bằng Eager Loading.',
          en: 'Applied Redis caching for course and exam data, offloaded grading to a dedicated queue worker, and eliminated N+1 queries with eager loading.',
        },
      },
      {
        title: {
          vi: 'Quy trình phê duyệt nội dung phức tạp',
          en: 'A complex content approval workflow',
        },
        problem: {
          vi: 'Nội dung bài học cần qua nhiều bước duyệt (Tạo → Chờ duyệt → Duyệt → Xuất bản) với nhiều vai trò khác nhau.',
          en: 'Lesson content had to pass through multiple approval stages (Draft → Pending Review → Approved → Published) involving several distinct roles.',
        },
        solution: {
          vi: 'Thiết kế State Machine cho lifecycle nội dung. Ghi log đầy đủ mọi hành động thay đổi trạng thái. Tích hợp thông báo realtime khi trạng thái thay đổi.',
          en: 'Designed a state machine to model the content lifecycle, logged every state transition in full, and added real-time notifications whenever a status changed.',
        },
      },
      {
        title: {
          vi: 'Hệ thống có nhiều module liên kết chặt chẽ',
          en: 'Tightly coupled modules across the system',
        },
        problem: {
          vi: 'Một thay đổi nhỏ trong khóa học có thể ảnh hưởng đến kỳ thi, học viên, báo cáo và thông báo.',
          en: 'A small change in the course module could ripple into exams, learners, reports, and notifications.',
        },
        solution: {
          vi: 'Phân tích dependency trước khi sửa. Tách xử lý nghiệp vụ theo Service Layer. Không thay đổi API đã ổn định. Kiểm thử các luồng liên quan sau mỗi thay đổi.',
          en: 'Analyzed dependencies before making changes, separated business logic into a service layer, avoided breaking stable APIs, and retested related flows after every change.',
        },
      },
      {
        title: {
          vi: 'Truy vấn dữ liệu lớn gây chậm màn hình',
          en: 'Large-scale queries slowing down screens',
        },
        problem: {
          vi: 'Một số màn hình tải chậm khi dữ liệu người dùng, khóa học và kết quả tăng lên đáng kể.',
          en: 'Several screens loaded slowly as user, course, and result data grew substantially.',
        },
        solution: {
          vi: 'Tối ưu select, hạn chế truy vấn lặp, dùng eager loading phù hợp. Thêm cache cho dữ liệu ít thay đổi. Phân trang và đưa xử lý nặng sang Queue Worker.',
          en: 'Optimized select statements, reduced repeated queries, applied eager loading appropriately, cached rarely-changing data, and moved heavy processing to pagination and queue workers.',
        },
      },
    ],
    results: {
      vi: [
        'Tập trung hóa toàn bộ quy trình đào tạo vào một hệ thống duy nhất',
        'Giảm đáng kể thời gian chấm bài thủ công nhờ tự động hóa',
        'Video phát ổn định hơn, dữ liệu được tổ chức rõ ràng',
        'Dễ theo dõi tiến độ học tập của học viên',
        'Hệ thống ổn định, dễ bảo trì và mở rộng thêm module mới',
        'Cải thiện khả năng xử lý lỗi và theo dõi vận hành',
      ],
      en: [
        'Centralized the entire training process into a single system',
        'Significantly reduced manual grading time through automation',
        'More stable video playback with clearly organized data',
        'Easier tracking of learner progress',
        'A stable system that is easy to maintain and extend with new modules',
        'Improved error handling and operational observability',
      ],
    },
    nextSlug: 'video-hls',

    // ─── Extended ────────────────────────────────────────────────────
    overview: {
      vi: [
        'Enterprise LMS là hệ thống quản lý đào tạo trực tuyến được xây dựng nhằm số hóa và tập trung hóa toàn bộ quy trình đào tạo trong doanh nghiệp và tổ chức giáo dục.',
        'Hệ thống phục vụ nhiều nhóm người dùng, bao gồm quản trị viên, giảng viên và học viên, với các giao diện và quyền truy cập riêng biệt cho từng vai trò.',
        'Trong dự án, tôi tham gia phát triển nhiều module nghiệp vụ, tối ưu hiệu suất, xử lý video, quản lý nội dung và cải thiện trải nghiệm sử dụng của hệ thống.',
      ],
      en: [
        'Enterprise LMS is an online training management system built to digitize and centralize the entire training process for enterprises and educational organizations.',
        'The system serves multiple user groups — administrators, instructors, and learners — each with a dedicated interface and access scope.',
        'On this project I worked across many business modules: performance optimization, video processing, content management, and overall UX improvements.',
      ],
    },
    problems: [
      {
        num: '01',
        title: { vi: 'Dữ liệu đào tạo phân tán', en: 'Fragmented training data' },
        desc: {
          vi: 'Thông tin khóa học, học viên và kết quả được quản lý tại nhiều khu vực khác nhau, gây khó khăn khi tổng hợp.',
          en: 'Course, learner, and result information was managed across many disconnected places, making it hard to consolidate.',
        },
      },
      {
        num: '02',
        title: { vi: 'Khó theo dõi tiến độ học tập', en: 'Difficult to track learning progress' },
        desc: {
          vi: 'Quản trị viên và giảng viên mất nhiều thời gian để xác định trạng thái học tập của từng học viên.',
          en: 'Admins and instructors spent a lot of time figuring out each learner\'s current status.',
        },
      },
      {
        num: '03',
        title: { vi: 'Quy trình thủ công tốn kém', en: 'Costly manual processes' },
        desc: {
          vi: 'Tạo khóa học, phân công giảng viên, tổ chức thi và tổng hợp kết quả đều thực hiện thủ công.',
          en: 'Creating courses, assigning instructors, organizing exams, and compiling results were all done manually.',
        },
      },
      {
        num: '04',
        title: { vi: 'Nội dung video và tài liệu chưa tổ chức', en: 'Disorganized video and document content' },
        desc: {
          vi: 'Bài giảng video và tài liệu đính kèm chưa có hệ thống lưu trữ và phân loại rõ ràng.',
          en: 'Video lectures and attached documents lacked a clear storage and categorization system.',
        },
      },
      {
        num: '05',
        title: { vi: 'Hiệu suất suy giảm khi tải cao', en: 'Performance degradation under load' },
        desc: {
          vi: 'Hệ thống phản hồi chậm khi số lượng người dùng đồng thời tăng lên.',
          en: 'The system responded slowly as the number of concurrent users increased.',
        },
      },
      {
        num: '06',
        title: { vi: 'Khó theo dõi lỗi vận hành', en: 'Hard to track operational issues' },
        desc: {
          vi: 'Không có hệ thống log tập trung, khó phát hiện và xử lý lỗi khi hệ thống chạy thực tế.',
          en: 'There was no centralized logging, making it difficult to detect and resolve issues in production.',
        },
      },
    ],
    goals: [
      {
        num: '01',
        title: { vi: 'Tập trung hóa dữ liệu', en: 'Centralize data' },
        desc: {
          vi: 'Toàn bộ dữ liệu đào tạo được quản lý tại một nơi duy nhất.',
          en: 'Manage all training data in a single, unified place.',
        },
      },
      {
        num: '02',
        title: { vi: 'Trải nghiệm học viên tốt hơn', en: 'A better learner experience' },
        desc: {
          vi: 'Giao diện rõ ràng, dễ theo dõi tiến độ và xem nội dung.',
          en: 'A clear interface that makes it easy to track progress and view content.',
        },
      },
      {
        num: '03',
        title: { vi: 'Kiến trúc có khả năng mở rộng', en: 'A scalable architecture' },
        desc: {
          vi: 'Hệ thống ổn định khi dữ liệu và số người dùng tăng theo thời gian.',
          en: 'A system that stays stable as data and user count grow over time.',
        },
      },
      {
        num: '04',
        title: { vi: 'Khả năng theo dõi vận hành', en: 'Operational observability' },
        desc: {
          vi: 'Dễ dàng phát hiện và xử lý sự cố khi hệ thống chạy thực tế.',
          en: 'Make it easy to detect and resolve issues once the system is live.',
        },
      },
    ],
    roleGroups: [
      {
        category: { vi: 'Phân tích Nghiệp vụ', en: 'Business Analysis' },
        icon: 'mdi:magnify',
        tasks: {
          vi: ['Làm rõ yêu cầu chức năng', 'Phân tích luồng người dùng', 'Xác định phạm vi ảnh hưởng', 'Đề xuất giải pháp kỹ thuật'],
          en: ['Clarify functional requirements', 'Analyze user flows', 'Determine impact scope', 'Propose technical solutions'],
        },
      },
      {
        category: { vi: 'Backend Development', en: 'Backend Development' },
        icon: 'mdi:server-outline',
        tasks: {
          vi: ['Phát triển REST API', 'Xử lý nghiệp vụ phức tạp', 'Tối ưu truy vấn cơ sở dữ liệu', 'Xây dựng Queue và Cache', 'Xử lý phân quyền và bảo mật'],
          en: ['Develop REST APIs', 'Implement complex business logic', 'Optimize database queries', 'Build queue and caching layers', 'Handle authorization and security'],
        },
      },
      {
        category: { vi: 'Frontend Development', en: 'Frontend Development' },
        icon: 'mdi:monitor-shimmer',
        tasks: {
          vi: ['Xây dựng giao diện quản trị', 'Kết nối và xử lý API', 'Quản lý trạng thái ứng dụng', 'Tối ưu trải nghiệm người dùng'],
          en: ['Build admin interfaces', 'Integrate and consume APIs', 'Manage application state', 'Optimize user experience'],
        },
      },
      {
        category: { vi: 'Vận hành & Tối ưu', en: 'Operations & Optimization' },
        icon: 'mdi:cog-outline',
        tasks: {
          vi: ['Xử lý lỗi trên môi trường Production', 'Theo dõi log hệ thống', 'Tối ưu hiệu suất dựa trên dữ liệu thực tế', 'Hỗ trợ đóng gói và triển khai'],
          en: ['Troubleshoot production issues', 'Monitor system logs', 'Optimize performance based on real usage data', 'Support packaging and deployment'],
        },
      },
    ],
    users: [
      {
        type: { vi: 'Quản trị viên', en: 'Administrator' },
        icon: 'mdi:shield-account-outline',
        tasks: {
          vi: ['Quản lý người dùng và phân quyền', 'Quản lý khóa học và chương trình', 'Tổ chức kỳ thi', 'Theo dõi báo cáo tổng hợp', 'Cấu hình hệ thống'],
          en: ['Manage users and permissions', 'Manage courses and programs', 'Organize exams', 'Monitor aggregate reports', 'Configure system settings'],
        },
      },
      {
        type: { vi: 'Giảng viên', en: 'Instructor' },
        icon: 'mdi:account-tie-outline',
        tasks: {
          vi: ['Tạo và quản lý nội dung bài học', 'Upload video và tài liệu', 'Theo dõi tiến độ học viên', 'Chấm bài và đánh giá', 'Quản lý lịch đào tạo'],
          en: ['Create and manage lesson content', 'Upload video and documents', 'Track learner progress', 'Grade and evaluate submissions', 'Manage the training schedule'],
        },
      },
      {
        type: { vi: 'Học viên', en: 'Learner' },
        icon: 'mdi:account-school-outline',
        tasks: {
          vi: ['Tham gia khóa học được giao', 'Xem video bài giảng và tài liệu', 'Làm bài kiểm tra và thi', 'Theo dõi tiến độ cá nhân', 'Nhận chứng chỉ hoàn thành'],
          en: ['Join assigned courses', 'Watch video lectures and view documents', 'Take quizzes and exams', 'Track personal progress', 'Receive completion certificates'],
        },
      },
    ],
    architecture: {
      layers: {
        vi: ['React Frontend', 'Laravel API', 'Application Services', 'Repositories', 'SQL Server / MySQL'],
        en: ['React Frontend', 'Laravel API', 'Application Services', 'Repositories', 'SQL Server / MySQL'],
      },
      support: {
        vi: ['Redis Cache', 'Queue Worker', 'AWS S3', 'FFmpeg', 'OpenTelemetry', 'Grafana', 'Notification Service'],
        en: ['Redis Cache', 'Queue Worker', 'AWS S3', 'FFmpeg', 'OpenTelemetry', 'Grafana', 'Notification Service'],
      },
    },
    modules: [
      {
        title: { vi: 'Quản lý Khóa học', en: 'Course Management' },
        desc: {
          vi: 'Cho phép tạo chương trình đào tạo, khóa học, bài học, tài liệu và gán giảng viên.',
          en: 'Create training programs, courses, lessons, and documents, and assign instructors.',
        },
        features: {
          vi: ['Tạo và cập nhật khóa học', 'Quản lý bài học và nội dung', 'Gán giảng viên', 'Phân loại và lọc', 'Điều kiện hoàn thành'],
          en: ['Create and update courses', 'Manage lessons and content', 'Assign instructors', 'Categorize and filter', 'Set completion conditions'],
        },
      },
      {
        title: { vi: 'Quản lý Học viên', en: 'Learner Management' },
        desc: {
          vi: 'Quản lý thông tin học viên, phân nhóm, gán khóa học và theo dõi tiến độ.',
          en: 'Manage learner information, group assignment, course enrollment, and progress tracking.',
        },
        features: {
          vi: ['Import học viên hàng loạt', 'Phân nhóm người dùng', 'Gán khóa học theo nhóm', 'Theo dõi trạng thái học', 'Báo cáo tiến độ chi tiết'],
          en: ['Bulk import learners', 'Group users', 'Assign courses by group', 'Track learning status', 'Detailed progress reports'],
        },
      },
      {
        title: { vi: 'Hệ thống Thi', en: 'Exam System' },
        desc: {
          vi: 'Tổ chức bài kiểm tra trắc nghiệm, tự luận và đánh giá kết quả học tập.',
          en: 'Organize multiple-choice and essay exams and evaluate learning outcomes.',
        },
        features: {
          vi: ['Tạo kỳ thi và ngân hàng câu hỏi', 'Trộn câu hỏi tự động', 'Chấm điểm trắc nghiệm tự động', 'Chấm bài tự luận kết hợp AI', 'Điều chỉnh kết quả và lịch sử thay đổi'],
          en: ['Create exams and question banks', 'Automatic question shuffling', 'Automatic multiple-choice grading', 'AI-assisted essay grading', 'Adjust results with a full change history'],
        },
      },
      {
        title: { vi: 'Video HLS', en: 'HLS Video' },
        desc: {
          vi: 'Xử lý và phát video theo nhiều mức chất lượng để thích ứng tốc độ mạng người dùng.',
          en: 'Process and stream video at multiple quality levels that adapt to each viewer\'s network speed.',
        },
        features: {
          vi: ['Upload và chuyển đổi bằng FFmpeg', 'Tạo nhiều mức chất lượng (360p–1080p)', 'Xử lý qua Queue — không block request', 'Theo dõi trạng thái xử lý realtime', 'Phát Adaptive Bitrate tự động'],
          en: ['Upload and transcode with FFmpeg', 'Generate multiple quality renditions (360p–1080p)', 'Process via queue — never blocks the request', 'Real-time processing status tracking', 'Automatic adaptive bitrate playback'],
        },
      },
      {
        title: { vi: 'Quản lý Tài liệu', en: 'Document Management' },
        desc: {
          vi: 'Tổ chức tài liệu theo cấu trúc thư mục nhiều cấp với phân quyền và kiểm soát an toàn.',
          en: 'Organize documents in a multi-level folder structure with permissions and safety controls.',
        },
        features: {
          vi: ['Cây thư mục nhiều cấp', 'Upload vào thư mục hiện tại', 'Breadcrumb động', 'Kiểm tra file đang dùng trước khi xóa', 'Lưu trữ trên AWS S3'],
          en: ['Multi-level folder tree', 'Upload directly into the current folder', 'Dynamic breadcrumbs', 'Check whether a file is in use before deletion', 'Storage on AWS S3'],
        },
      },
      {
        title: { vi: 'Báo cáo & Thống kê', en: 'Reports & Analytics' },
        desc: {
          vi: 'Dữ liệu tổng quan về khóa học, học viên, kỳ thi và tiến độ đào tạo.',
          en: 'Aggregate insight into courses, learners, exams, and overall training progress.',
        },
        features: {
          vi: ['Dashboard tổng quan', 'Báo cáo tiến độ và kết quả thi', 'Bộ lọc dữ liệu linh hoạt', 'Xuất báo cáo ra file'],
          en: ['Overview dashboard', 'Progress and exam result reports', 'Flexible data filters', 'Export reports to file'],
        },
      },
    ],
    deepDive: {
      title: { vi: 'Xử lý Video HLS với Queue', en: 'Processing HLS Video with a Queue' },
      problem: {
        vi: 'Upload và chuyển đổi video có chất lượng cao (>500MB) làm HTTP request bị timeout. Người dùng phải chờ hàng giây trước khi video bắt đầu phát, đặc biệt trên mạng chậm.',
        en: 'Uploading and transcoding high-quality video files (>500MB) caused HTTP request timeouts. Viewers had to wait several seconds before playback started, especially on slow networks.',
      },
      solutionItems: {
        vi: [
          'Tách luồng xử lý video vào Laravel Queue Worker riêng biệt',
          'Trả về Job ID ngay lập tức — Client polling trạng thái qua API',
          'Cấu hình HLS segment ngắn (2–4 giây), khởi đầu ở 360p',
          'Dùng Video.js ABR để tự động nâng chất lượng khi mạng ổn định',
          'Retry tự động khi Queue Worker gặp lỗi FFmpeg',
          'Ghi log đầy đủ trạng thái xử lý và thông báo khi hoàn thành',
        ],
        en: [
          'Moved video processing into a dedicated Laravel queue worker',
          'Return a job ID immediately — the client polls status via API',
          'Configured short HLS segments (2–4s), starting playback at 360p',
          'Used Video.js ABR to automatically raise quality once the network is stable',
          'Automatic retries when the queue worker hits an FFmpeg error',
          'Full logging of processing status with completion notifications',
        ],
      },
    },
    process: [
      {
        num: '01',
        title: { vi: 'Phân tích', en: 'Analysis' },
        items: {
          vi: ['Làm rõ yêu cầu', 'Xác định luồng hiện tại', 'Xác định luồng mong muốn', 'Đánh giá phạm vi ảnh hưởng'],
          en: ['Clarify requirements', 'Map the current flow', 'Define the target flow', 'Assess impact scope'],
        },
      },
      {
        num: '02',
        title: { vi: 'Thiết kế', en: 'Design' },
        items: {
          vi: ['Thiết kế luồng xử lý', 'Chọn giải pháp kỹ thuật', 'Xác định dữ liệu liên quan', 'Lập kế hoạch triển khai'],
          en: ['Design the processing flow', 'Choose the technical approach', 'Identify related data', 'Plan the rollout'],
        },
      },
      {
        num: '03',
        title: { vi: 'Phát triển', en: 'Development' },
        items: {
          vi: ['Chia nhỏ chức năng', 'Phát triển theo phạm vi rõ ràng', 'Kiểm soát thay đổi', 'Code review'],
          en: ['Break work into small units', 'Build within a clearly defined scope', 'Track changes carefully', 'Code review'],
        },
      },
      {
        num: '04',
        title: { vi: 'Kiểm thử', en: 'Testing' },
        items: {
          vi: ['Kiểm tra chức năng chính', 'Kiểm tra trường hợp biên', 'Kiểm tra ảnh hưởng chéo', 'Kiểm thử hiệu suất'],
          en: ['Test core functionality', 'Test edge cases', 'Check cross-feature impact', 'Performance testing'],
        },
      },
      {
        num: '05',
        title: { vi: 'Triển khai', en: 'Deployment' },
        items: {
          vi: ['Merge code và chạy migration', 'Build frontend', 'Deploy và theo dõi log', 'Xác nhận hoạt động ổn định'],
          en: ['Merge code and run migrations', 'Build the frontend', 'Deploy and monitor logs', 'Confirm stable operation'],
        },
      },
      {
        num: '06',
        title: { vi: 'Tối ưu', en: 'Optimization' },
        items: {
          vi: ['Phân tích dữ liệu vận hành', 'Xử lý điểm nghẽn', 'Cải thiện trải nghiệm', 'Điều chỉnh kiến trúc khi cần'],
          en: ['Analyze production data', 'Resolve bottlenecks', 'Improve the experience', 'Adjust the architecture when needed'],
        },
      },
    ],
    lessons: [
      {
        title: { vi: 'Hiểu nghiệp vụ trước khi code', en: 'Understand the business before writing code' },
        desc: {
          vi: 'Dành thời gian phân tích bài toán thực tế giúp tránh làm lại nhiều lần và giảm rủi ro ảnh hưởng chéo.',
          en: 'Investing time up front to understand the real problem avoids rework and reduces the risk of cross-feature side effects.',
        },
      },
      {
        title: { vi: 'Không tối ưu khi chưa đo lường', en: 'Never optimize before measuring' },
        desc: {
          vi: 'Hiệu suất nên được cải thiện dựa trên dữ liệu thực tế, không dựa trên cảm giác hay phỏng đoán.',
          en: 'Performance work should be driven by real data, not intuition or guesswork.',
        },
      },
      {
        title: { vi: 'Tách tác vụ nặng khỏi request', en: 'Move heavy work off the request cycle' },
        desc: {
          vi: 'Mọi tác vụ tốn thời gian (video, email, báo cáo) cần được xử lý bất đồng bộ qua Queue.',
          en: 'Any time-consuming task (video, email, reports) should be handled asynchronously through a queue.',
        },
      },
      {
        title: { vi: 'Kiểm soát phạm vi ảnh hưởng', en: 'Keep tight control over blast radius' },
        desc: {
          vi: 'Với hệ thống nhiều module liên kết, thay đổi nhỏ cũng cần phân tích dependency và kiểm tra kỹ lưỡng.',
          en: 'In a system with tightly coupled modules, even small changes need dependency analysis and thorough testing.',
        },
      },
      {
        title: { vi: 'Thiết kế cho vận hành thực tế', en: 'Design for real-world operations' },
        desc: {
          vi: 'Log đầy đủ, thông báo lỗi rõ ràng và khả năng quan sát hệ thống quan trọng không kém tính năng.',
          en: 'Comprehensive logging, clear error messages, and system observability matter just as much as the features themselves.',
        },
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────
  // 02. Video HLS — Data tóm tắt
  // ──────────────────────────────────────────────────────────────────
  {
    slug: 'video-hls',
    index: '02',
    title: { vi: 'Adaptive Video Streaming Platform', en: 'Adaptive Video Streaming Platform' },
    tag: 'Backend',
    role: 'Backend Developer',
    timeline: '2025',
    tech: ['Laravel', 'FFmpeg', 'HLS', 'Queue', 'Redis', 'Video.js'],
    description: {
      vi: 'Giải pháp xử lý và phát video nhiều chất lượng bằng giao thức HLS, giúp người dùng xem video ổn định trên mọi điều kiện mạng từ 3G đến cáp quang.',
      en: 'A video processing and playback solution built on the HLS protocol, delivering multi-quality streaming that stays smooth on any network — from 3G to fiber.',
    },
    highlights: {
      vi: [
        'Chuyển đổi video tự động bằng FFmpeg',
        'Tạo đồng thời nhiều mức chất lượng (360p, 480p, 720p, 1080p)',
        'Tự động chọn chất lượng phù hợp theo tốc độ mạng',
        'Khởi đầu ở chất lượng 360p, tăng dần khi mạng ổn định',
        'Xử lý chuyển đổi video qua Queue — không block request',
        'Theo dõi tiến trình xử lý và thông báo khi hoàn thành',
      ],
      en: [
        'Automatic video transcoding with FFmpeg',
        'Simultaneous generation of multiple quality renditions (360p, 480p, 720p, 1080p)',
        'Automatic quality selection based on network speed',
        'Starts at 360p and steps up once the network is stable',
        'Video transcoding runs through a queue — never blocks the request',
        'Processing progress tracking with completion notifications',
      ],
    },
    challenges: [
      {
        title: {
          vi: 'Video chất lượng cao gây chậm khi bắt đầu phát',
          en: 'High-quality video caused slow playback starts',
        },
        problem: {
          vi: 'Người dùng phải chờ hàng giây trước khi video bắt đầu phát, đặc biệt trên mạng chậm.',
          en: 'Viewers had to wait several seconds before playback began, especially on slow networks.',
        },
        solution: {
          vi: 'Cấu hình HLS segment ngắn (2–4 giây). Khởi đầu luôn ở 360p. Dùng Video.js ABR để tự động nâng chất lượng. Điều chỉnh buffer size phù hợp.',
          en: 'Configured short HLS segments (2–4s), always started playback at 360p, used Video.js ABR to auto-upgrade quality, and tuned buffer size accordingly.',
        },
      },
      {
        title: {
          vi: 'Xử lý video làm timeout request HTTP',
          en: 'Video processing caused HTTP request timeouts',
        },
        problem: {
          vi: 'Upload và chuyển đổi video lớn (>500MB) làm request bị timeout sau 60 giây.',
          en: 'Uploading and transcoding large videos (>500MB) caused requests to time out after 60 seconds.',
        },
        solution: {
          vi: 'Tách luồng xử lý video vào Laravel Queue Worker riêng. Trả về Job ID ngay lập tức. Client polling trạng thái xử lý qua API. Retry tự động khi Queue Worker gặp lỗi.',
          en: 'Moved video processing into a dedicated Laravel queue worker, returned a job ID immediately, had the client poll status via API, and added automatic retries on worker errors.',
        },
      },
    ],
    results: {
      vi: [
        'Thời gian bắt đầu phát video giảm đáng kể',
        'Trải nghiệm xem video mượt mà trên mọi tốc độ mạng',
        'Hệ thống xử lý video hoàn toàn không đồng bộ, không ảnh hưởng UX',
        'Dễ mở rộng thêm mức chất lượng mới',
      ],
      en: [
        'Significantly reduced video start-up time',
        'A smooth viewing experience across all network speeds',
        'Video processing runs fully asynchronously with no impact on UX',
        'Easy to extend with new quality levels',
      ],
    },
    nextSlug: 'coaching-management',
  },

  // ──────────────────────────────────────────────────────────────────
  // 03–06. Các dự án còn lại — Data tóm tắt
  // ──────────────────────────────────────────────────────────────────
  {
    slug: 'coaching-management',
    index: '03',
    title: { vi: 'Coaching and Mentor Management System', en: 'Coaching and Mentor Management System' },
    tag: 'LMS',
    role: 'Full-stack Developer',
    timeline: '2025',
    tech: ['Laravel', 'React', 'Docker', 'MySQL', 'Redis'],
    description: {
      vi: 'Hệ thống quản lý lịch coaching, mentor, hoạt động học tập và quá trình hoàn thành của học viên — từ lên lịch, tạo nội dung đến xác nhận kết quả.',
      en: 'A system for managing coaching schedules, mentors, learning activities, and learner completion — from scheduling and content creation through result confirmation.',
    },
    highlights: {
      vi: [
        'Quản lý lịch mentor và buổi coaching',
        'Tạo và sắp xếp hoạt động bằng kéo thả (Drag & Drop)',
        'Hỗ trợ nhiều loại nội dung: video, file, link, text',
        'Thiết lập điều kiện hoàn thành cho từng hoạt động',
        'Theo dõi tiến độ học viên theo buổi học',
        'Quy trình tạo → duyệt → xuất bản nội dung',
      ],
      en: [
        'Manage mentor schedules and coaching sessions',
        'Create and reorder activities with drag and drop',
        'Support multiple content types: video, file, link, text',
        'Configurable completion conditions per activity',
        'Track learner progress per session',
        'Create → review → publish content workflow',
      ],
    },
    challenges: [
      {
        title: {
          vi: 'Sắp xếp hoạt động theo thứ tự tùy ý',
          en: 'Free-form reordering of activities',
        },
        problem: {
          vi: 'Mentor cần sắp xếp lại thứ tự các hoạt động trong buổi học một cách linh hoạt và trực quan.',
          en: 'Mentors needed a flexible, intuitive way to reorder activities within a session.',
        },
        solution: {
          vi: 'Tích hợp thư viện Drag & Drop. Lưu thứ tự bằng cột `order` integer. Cập nhật batch khi người dùng thả phần tử vào vị trí mới.',
          en: 'Integrated a drag-and-drop library, persisted ordering via an integer `order` column, and applied batch updates whenever an item was dropped into a new position.',
        },
      },
      {
        title: {
          vi: 'Điều kiện hoàn thành đa dạng',
          en: 'Varied completion conditions',
        },
        problem: {
          vi: 'Mỗi hoạt động có điều kiện hoàn thành khác nhau: xem đủ video, nộp file, quiz đạt điểm tối thiểu...',
          en: 'Each activity type had a different completion rule: watching a video to completion, submitting a file, passing a quiz with a minimum score, and so on.',
        },
        solution: {
          vi: 'Thiết kế hệ thống Rule-based Completion. Mỗi loại hoạt động có Completion Handler riêng. Kết quả được tổng hợp theo buổi học và toàn khóa.',
          en: 'Designed a rule-based completion system with a dedicated completion handler per activity type, with results aggregated per session and across the full course.',
        },
      },
    ],
    results: {
      vi: [
        'Mentor có thể quản lý lịch và nội dung dễ dàng, trực quan',
        'Quy trình duyệt nội dung rõ ràng, giảm sai sót',
        'Học viên biết chính xác tiến độ hoàn thành của mình',
        'Hệ thống mở rộng được với nhiều loại hoạt động mới',
      ],
      en: [
        'Mentors can manage schedules and content easily and intuitively',
        'A clear content review process that reduces mistakes',
        'Learners always know exactly where they stand in their progress',
        'Easily extendable with new activity types',
      ],
    },
    nextSlug: 'file-manager',
  },
  {
    slug: 'file-manager',
    index: '04',
    title: { vi: 'Enterprise File and Content Manager', en: 'Enterprise File and Content Manager' },
    tag: 'Backend',
    role: 'Full-stack Developer',
    timeline: '2025',
    tech: ['Laravel', 'React', 'AWS S3', 'MySQL', 'Redis'],
    description: {
      vi: 'Hệ thống quản lý file và nội dung theo cấu trúc thư mục nhiều cấp, hỗ trợ tổ chức tài liệu, bài giảng và media cho chương trình và khóa học.',
      en: 'A file and content management system built around a multi-level folder structure, used to organize documents, lecture material, and media for training programs and courses.',
    },
    highlights: {
      vi: [
        'Quản lý thư mục nhiều cấp với tree view trực quan',
        'Upload file trực tiếp vào thư mục hiện tại',
        'Breadcrumb động theo đường dẫn thư mục',
        'Tìm kiếm tài liệu theo tên và loại file',
        'Kiểm tra file đang được sử dụng trước khi xóa',
        'Phân quyền xem và chỉnh sửa theo vai trò',
      ],
      en: [
        'Multi-level folder management with an intuitive tree view',
        'Upload files directly into the current folder',
        'Dynamic breadcrumbs based on the folder path',
        'Search documents by name and file type',
        'Check whether a file is in use before deletion',
        'Role-based view and edit permissions',
      ],
    },
    challenges: [
      {
        title: {
          vi: 'Ngăn xóa file đang được sử dụng',
          en: 'Preventing deletion of files still in use',
        },
        problem: {
          vi: 'Nếu xóa file đang được dùng trong bài học, nội dung bài học sẽ bị mất liên kết và hiển thị lỗi.',
          en: 'Deleting a file that was referenced by a lesson would break the link and cause the lesson to show an error.',
        },
        solution: {
          vi: 'Trước khi xóa, kiểm tra bảng liên kết file ↔ nội dung bài học. Hiển thị danh sách các nơi đang dùng file đó. Bắt buộc xác nhận tay nếu file đang được sử dụng.',
          en: 'Before deletion, checked the file-to-lesson link table, showed a list of everywhere the file was referenced, and required explicit manual confirmation if it was still in use.',
        },
      },
      {
        title: {
          vi: 'Hiển thị cây thư mục lớn',
          en: 'Rendering large folder trees',
        },
        problem: {
          vi: 'Cây thư mục có hàng trăm node gây chậm khi render và khó điều hướng.',
          en: 'A folder tree with hundreds of nodes was slow to render and difficult to navigate.',
        },
        solution: {
          vi: 'Lazy load các nhánh con khi người dùng mở rộng. Cache cấu trúc thư mục bằng Redis. Chỉ render các node trong viewport.',
          en: 'Lazy-loaded child branches on expansion, cached the folder structure in Redis, and rendered only the nodes within the viewport.',
        },
      },
    ],
    results: {
      vi: [
        'Tổ chức tài liệu rõ ràng, dễ tìm kiếm hơn',
        'Không còn tình trạng xóa nhầm file đang được sử dụng',
        'Phân quyền rõ ràng, an toàn cho dữ liệu nội bộ',
        'Tích hợp trơn tru với hệ thống LMS',
      ],
      en: [
        'Clear document organization that is easier to search',
        'No more accidental deletion of files still in use',
        'Clear, safe permission boundaries for internal data',
        'Integrates smoothly with the LMS platform',
      ],
    },
    nextSlug: 'ai-scoring',
  },
  {
    slug: 'ai-scoring',
    index: '05',
    title: { vi: 'AI-assisted Essay Scoring System', en: 'AI-assisted Essay Scoring System' },
    tag: 'Backend',
    role: 'Full-stack Developer',
    timeline: '2025 – 2026',
    tech: ['Laravel', 'React', 'OpenAI API', 'SQL Server'],
    description: {
      vi: 'Hệ thống hỗ trợ chấm điểm câu hỏi tự luận kết hợp rubric, keyword matching, rule-based scoring và trí tuệ nhân tạo — giảm tải công việc thủ công cho giáo viên.',
      en: 'An essay-grading assistant combining rubrics, keyword matching, rule-based scoring, and AI — reducing the manual grading workload for teachers.',
    },
    highlights: {
      vi: [
        'Tạo rubric chấm điểm theo từng tiêu chí',
        'Phân tích từ khóa và đối chiếu đáp án mẫu',
        'Chấm điểm tự động kết hợp AI và quy tắc nghiệp vụ',
        'Giáo viên điều chỉnh điểm và ghi lý do thay đổi',
        'Lưu lịch sử đầy đủ mọi thay đổi kết quả',
        'Giảm thời gian chấm bài thủ công đáng kể',
      ],
      en: [
        'Build grading rubrics per criterion',
        'Keyword analysis against reference answers',
        'Automated scoring combining AI with business rules',
        'Teachers can adjust scores and record the reason for the change',
        'Full history of every result change',
        'Significantly reduced manual grading time',
      ],
    },
    challenges: [
      {
        title: {
          vi: 'Kết quả AI không ổn định',
          en: 'Inconsistent AI results',
        },
        problem: {
          vi: 'Các lần gọi OpenAI API với cùng bài làm đôi khi cho điểm khác nhau, ảnh hưởng tính công bằng.',
          en: 'Repeated OpenAI API calls on the same submission sometimes produced different scores, undermining fairness.',
        },
        solution: {
          vi: 'Dùng AI cho phân tích ngữ nghĩa, kết hợp với rule-based scoring để đảm bảo tính nhất quán. Lưu cache kết quả AI theo hash bài làm. Giáo viên luôn có quyền override.',
          en: 'Used AI for semantic analysis combined with rule-based scoring for consistency, cached AI results by a hash of the submission, and always let teachers override the score.',
        },
      },
      {
        title: {
          vi: 'Tốc độ phản hồi khi chấm hàng loạt',
          en: 'Response time during bulk grading',
        },
        problem: {
          vi: 'Chấm cùng lúc 100+ bài tự luận làm API bị chậm và có thể timeout.',
          en: 'Grading 100+ essays at once slowed the API and risked timeouts.',
        },
        solution: {
          vi: 'Đưa tác vụ chấm AI vào Queue. Chấm xử lý batch theo nhóm nhỏ. Giáo viên nhận thông báo khi hoàn thành.',
          en: 'Moved AI grading into a queue, processed submissions in small batches, and notified teachers upon completion.',
        },
      },
    ],
    results: {
      vi: [
        'Thời gian chấm bài tự luận giảm đáng kể',
        'Giáo viên tập trung vào xem xét và điều chỉnh thay vì chấm thủ công',
        'Lịch sử thay đổi minh bạch, có thể kiểm tra bất kỳ lúc nào',
        'Hệ thống kết hợp được điểm mạnh của AI và quy tắc nghiệp vụ thực tế',
      ],
      en: [
        'Significantly reduced essay grading time',
        'Teachers focus on reviewing and adjusting rather than manual grading',
        'A transparent change history that can be audited at any time',
        'The system combines the strengths of AI with real-world business rules',
      ],
    },
    nextSlug: 'monitoring',
  },
  {
    slug: 'monitoring',
    index: '06',
    title: { vi: 'Application Monitoring and Observability', en: 'Application Monitoring and Observability' },
    tag: 'DevOps',
    role: 'DevOps Engineer',
    timeline: '2025',
    tech: ['Docker', 'Grafana', 'Prometheus', 'OpenTelemetry', 'Loki'],
    description: {
      vi: 'Hệ thống theo dõi sức khỏe ứng dụng, hiệu suất server, log tập trung và các chỉ số vận hành quan trọng — giúp phát hiện và xử lý sự cố nhanh chóng.',
      en: 'A monitoring system for application health, server performance, centralized logs, and key operational metrics — enabling fast incident detection and resolution.',
    },
    highlights: {
      vi: [
        'Thu thập metrics hệ thống (CPU, RAM, Disk, Network)',
        'Theo dõi response time và error rate của API',
        'Quản lý log tập trung bằng Loki',
        'Dashboard Grafana trực quan, cập nhật realtime',
        'Cảnh báo tự động qua Telegram khi hệ thống gặp sự cố',
        'Phân tích distributed traces với OpenTelemetry',
      ],
      en: [
        'Collect system metrics (CPU, RAM, Disk, Network)',
        'Track API response time and error rate',
        'Centralized log management with Loki',
        'Visual Grafana dashboards with real-time updates',
        'Automatic Telegram alerts when incidents occur',
        'Distributed trace analysis with OpenTelemetry',
      ],
    },
    challenges: [
      {
        title: {
          vi: 'Quá nhiều cảnh báo gây nhiễu (Alert fatigue)',
          en: 'Alert fatigue from excessive notifications',
        },
        problem: {
          vi: 'Khi threshold đặt quá thấp, nhóm nhận hàng trăm cảnh báo mỗi ngày, dẫn đến bỏ qua cảnh báo quan trọng.',
          en: 'With thresholds set too low, the team received hundreds of alerts a day, causing important ones to get ignored.',
        },
        solution: {
          vi: 'Phân loại cảnh báo theo mức độ (Critical / Warning / Info). Áp dụng alerting rules có thời gian chờ (for: 5m). Nhóm cảnh báo liên quan thành một thông báo.',
          en: 'Classified alerts by severity (Critical / Warning / Info), applied alerting rules with a hold-off duration (for: 5m), and grouped related alerts into a single notification.',
        },
      },
      {
        title: {
          vi: 'Log phân tán trên nhiều container',
          en: 'Logs scattered across many containers',
        },
        problem: {
          vi: 'Khi có lỗi, phải SSH vào từng container để đọc log, rất tốn thời gian.',
          en: 'Debugging an issue meant SSHing into each container individually to read logs — very time-consuming.',
        },
        solution: {
          vi: 'Triển khai Promtail trên mỗi container, đẩy log tập trung về Loki. Tìm kiếm và lọc log theo service, level, và thời gian trực tiếp trên Grafana.',
          en: 'Deployed Promtail on every container to ship logs centrally into Loki, then searched and filtered logs by service, level, and time directly in Grafana.',
        },
      },
    ],
    results: {
      vi: [
        'Phát hiện sự cố nhanh hơn trước khi người dùng báo cáo',
        'Log tập trung giúp debug nhanh hơn nhiều',
        'Cảnh báo có chọn lọc, không bị nhiễu',
        'Nhóm vận hành có cái nhìn toàn cảnh về sức khỏe hệ thống',
      ],
      en: [
        'Faster incident detection, often before users report anything',
        'Centralized logs make debugging much faster',
        'Selective, low-noise alerting',
        'The operations team gets a complete view of system health',
      ],
    },
    nextSlug: 'enterprise-lms',
  },
];

/** Màu nhấn theo tag — đồng bộ với hệ thống màu xanh dương của site. */
export const TAG_ACCENT: Record<string, string> = {
  LMS: '#2563EB',
  Backend: '#7C3AED',
  Frontend: '#0891B2',
  DevOps: '#059669',
  Personal: '#D97706',
};

/** Role + mô tả ngắn đi cùng nhau ở hero Projects — cùng component RoleSlider với các trang khác. */
export const PROJECTS_ROLE_SLIDES: Bi<{ title: string; subtitle: string }[]> = {
  vi: [
    { title: 'Dự án doanh nghiệp', subtitle: 'Hệ thống quản lý, LMS và các nền tảng quy mô lớn.' },
    { title: 'Xử lý dữ liệu & video', subtitle: 'Streaming HLS, xử lý hàng loạt và tối ưu hiệu suất.' },
    { title: 'Kiến trúc & vận hành', subtitle: 'Thiết kế hệ thống có khả năng mở rộng, dễ bảo trì.' },
  ],
  en: [
    { title: 'Enterprise Projects', subtitle: 'Management systems, LMS platforms, and large-scale applications.' },
    { title: 'Data & Video Processing', subtitle: 'HLS streaming, batch processing, and performance optimization.' },
    { title: 'Architecture & Operations', subtitle: 'Designing scalable systems that are easy to maintain.' },
  ],
};
