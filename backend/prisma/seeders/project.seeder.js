import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mẫu dữ liệu mảng các dự án ban đầu
const PROJECTS_SEED_DATA = [
  {
    slug: 'enterprise-lms',
    tag: 'LMS',
    role: 'Full-stack Developer',
    timeline: '2025 – 2026',
    techStack: ['Laravel', 'React', 'Ant Design', 'SQL Server', 'Redis', 'Docker'],
    images: [{ url: '/assets/imgs/avatars/MeAvatar1.png', caption: 'Enterprise LMS' }],
    featured: true,
    isPublished: true,
    order: 1,
    translations: [
      {
        lang: 'vi',
        title: 'Enterprise Learning Management System',
        description: 'Hệ thống quản lý đào tạo trực tuyến phục vụ doanh nghiệp, trung tâm và trường học. Hỗ trợ quản lý khóa học, học viên, giảng viên, kỳ thi, tài liệu, video và tiến độ học tập toàn diện.',
        highlights: [
          'Phân quyền đa nhóm người dùng (Admin, Giảng viên, Học viên)',
          'Quản lý chương trình đào tạo và khóa học',
          'Hệ thống thi trắc nghiệm, tự luận và chấm điểm tự động',
          'Quản lý chứng chỉ và cấp phát tự động',
          'Theo dõi tiến độ học tập theo thời gian thực',
          'Báo cáo và thống kê trực quan'
        ],
        content: {
          overview: [
            'Enterprise LMS là hệ thống quản lý đào tạo trực tuyến được xây dựng nhằm số hóa và tập trung hóa toàn bộ quy trình đào tạo trong doanh nghiệp và tổ chức giáo dục.',
            'Hệ thống phục vụ nhiều nhóm người dùng, bao gồm quản trị viên, giảng viên và học viên, với các giao diện và quyền truy cập riêng biệt cho từng vai trò.',
            'Trong dự án, tôi tham gia phát triển nhiều module nghiệp vụ, tối ưu hiệu suất, xử lý video, quản lý nội dung và cải thiện trải nghiệm sử dụng của hệ thống.'
          ],
          problems: [
            { num: '01', title: 'Dữ liệu đào tạo phân tán', desc: 'Thông tin khóa học, học viên và kết quả được quản lý tại nhiều khu vực khác nhau, gây khó khăn khi tổng hợp.' },
            { num: '02', title: 'Khó theo dõi tiến độ học tập', desc: 'Quản trị viên và giảng viên mất nhiều thời gian để xác định trạng thái học tập của từng học viên.' }
          ],
          goals: [
            { num: '01', title: 'Tập trung hóa dữ liệu', desc: 'Toàn bộ dữ liệu đào tạo được quản lý tại một nơi duy nhất.' },
            { num: '02', title: 'Trải nghiệm học viên tốt hơn', desc: 'Giao diện rõ ràng, dễ theo dõi tiến độ và xem nội dung.' }
          ],
          roleGroups: [
            { category: 'Backend Development', icon: 'mdi:server-outline', tasks: ['Phát triển REST API', 'Tối ưu truy vấn SQL', 'Xây dựng Queue và Cache'] }
          ],
          users: [
            { type: 'Quản trị viên', icon: 'mdi:shield-account-outline', tasks: ['Quản lý người dùng và phân quyền', 'Quản lý khóa học'] }
          ],
          architecture: {
            layers: ['React Frontend', 'Laravel API', 'Application Services', 'Repositories', 'SQL Server'],
            support: ['Redis Cache', 'Queue Worker', 'AWS S3', 'FFmpeg']
          },
          modules: [
            { title: 'Quản lý Khóa học', desc: 'Cho phép tạo chương trình đào tạo, khóa học, bài học...', features: ['Tạo và cập nhật khóa học', 'Gán giảng viên'] }
          ],
          deepDive: {
            title: 'Xử lý Video HLS với Queue',
            problem: 'Upload và chuyển đổi video có chất lượng cao (>500MB) làm HTTP request bị timeout.',
            solutionItems: ['Tách luồng xử lý video vào Laravel Queue Worker riêng biệt', 'Trả về Job ID ngay lập tức']
          },
          process: [
            { num: '01', title: 'Phân tích', items: ['Làm rõ yêu cầu', 'Xác định luồng hiện tại'] }
          ],
          lessons: [
            { title: 'Hiểu nghiệp vụ trước khi code', desc: 'Dành thời gian phân tích bài toán thực tế giúp tránh làm lại nhiều lần.' }
          ],
          challenges: [
            { title: 'Tối ưu hiệu suất khi nhiều học viên cùng truy cập', problem: 'Hệ thống bị chậm khi có hơn 500 học viên cùng làm bài thi.', solution: 'Áp dụng Redis cache cho dữ liệu khóa học và bài thi.' }
          ],
          results: [
            'Tập trung hóa toàn bộ quy trình đào tạo vào một hệ thống duy nhất',
            'Giảm đáng kể thời gian chấm bài thủ công nhờ tự động hóa'
          ]
        }
      },
      {
        lang: 'en',
        title: 'Enterprise Learning Management System',
        description: 'An online training management system built for enterprises, training centers, and schools.',
        highlights: [
          'Multi-group role-based access control (Admin, Instructor, Learner)',
          'Training program and course management'
        ],
        content: {
          overview: ['Enterprise LMS is an online training management system built to digitize...'],
          problems: [],
          goals: [],
          roleGroups: [],
          users: [],
          architecture: { layers: [], support: [] },
          modules: [],
          deepDive: { title: '', problem: '', solutionItems: [] },
          process: [],
          lessons: [],
          challenges: [],
          results: ['Centralized the entire training process into a single system']
        }
      }
    ]
  },
  {
    slug: 'video-hls',
    tag: 'Backend',
    role: 'Backend Developer',
    timeline: '2025',
    techStack: ['Laravel', 'FFmpeg', 'HLS', 'Queue', 'Redis', 'Video.js'],
    images: [{ url: '/assets/imgs/avatars/MeAvatar1.png', caption: 'Video HLS' }],
    featured: true,
    isPublished: true,
    order: 2,
    translations: [
      {
        lang: 'vi',
        title: 'Adaptive Video Streaming Platform',
        description: 'Giải pháp xử lý và phát video nhiều chất lượng bằng giao thức HLS, giúp người dùng xem video ổn định trên mọi điều kiện mạng.',
        highlights: [
          'Chuyển đổi video tự động bằng FFmpeg',
          'Tạo đồng thời nhiều mức chất lượng (360p, 480p, 720p, 1080p)',
          'Xử lý chuyển đổi video qua Queue — không block request'
        ],
        content: {
          overview: ['Giải pháp xử lý và phát video HLS thích ứng tốc độ mạng...'],
          problems: [],
          goals: [],
          roleGroups: [],
          users: [],
          architecture: { layers: [], support: [] },
          modules: [],
          deepDive: { title: '', problem: '', solutionItems: [] },
          process: [],
          lessons: [],
          challenges: [],
          results: ['Thời gian bắt đầu phát video giảm đáng kể']
        }
      },
      {
        lang: 'en',
        title: 'Adaptive Video Streaming Platform',
        description: 'A video processing and playback solution built on the HLS protocol.',
        highlights: ['Automatic video transcoding with FFmpeg'],
        content: {
          overview: ['A video processing and playback solution...'],
          problems: [],
          goals: [],
          roleGroups: [],
          users: [],
          architecture: { layers: [], support: [] },
          modules: [],
          deepDive: { title: '', problem: '', solutionItems: [] },
          process: [],
          lessons: [],
          challenges: [],
          results: []
        }
      }
    ]
  }
];

/**
 * Script nạp dữ liệu Dự án mẫu vào Cơ sở dữ liệu
 */
export async function seedProjects() {
  console.log('🌱 [Seeder] Đang nạp dữ liệu các Dự án mẫu...');

  for (const item of PROJECTS_SEED_DATA) {
    const { translations, ...projectCore } = item;

    // 1. Tạo hoặc cập nhật thông tin chung của Project
    const project = await prisma.project.upsert({
      where: { slug: projectCore.slug },
      update: projectCore,
      create: projectCore,
    });

    // 2. Tạo hoặc cập nhật các bản dịch Translation
    for (const trans of translations) {
      await prisma.translation.upsert({
        where: {
          projectId_lang: {
            projectId: project.id,
            lang: trans.lang,
          },
        },
        update: {
          title: trans.title,
          description: trans.description,
          highlights: trans.highlights,
          content: trans.content,
        },
        create: {
          projectId: project.id,
          lang: trans.lang,
          title: trans.title,
          description: trans.description,
          highlights: trans.highlights,
          content: trans.content,
        },
      });
    }
  }

  console.log('✅ [Seeder] Đã nạp thành công các Dự án mẫu!');
}
