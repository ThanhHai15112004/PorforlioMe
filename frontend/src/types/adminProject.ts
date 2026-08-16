// Định nghĩa kiểu dữ liệu DTO cho Admin Project matching với Backend Prisma Model Schema

// Dữ liệu từng bản dịch ngôn ngữ của bài viết dự án
export interface AdminProjectTranslationPayload {
  id?: number;
  lang: 'vi' | 'en' | string;
  title: string;
  description?: string;
  highlights?: string[];
  content?: any; // Lưu danh sách 12 nhóm Case Study dạng mảng JSON
  metaTitle?: string;
  metaDescription?: string;
}

// Cấu trúc dự án thô trả về từ GET /api/projects/admin/:id
export interface AdminProjectRaw {
  id: number;
  slug: string;
  tag: string;
  role: string;
  timeline: string;
  techStack: string[];
  images: { url: string; captionVi?: string; captionEn?: string }[];
  demoUrl?: string | null;
  githubUrl?: string | null;
  figmaUrl?: string | null;
  featured: boolean;
  isPublished: boolean;
  order: number;
  translations: AdminProjectTranslationPayload[];
  createdAt?: string;
  updatedAt?: string;
}

// DTO Payload gửi khi tạo mới dự án (POST /api/projects)
export interface CreateProjectPayload {
  slug?: string;
  tag: string;
  role: string;
  timeline: string;
  techStack?: string[];
  images?: { url: string; captionVi?: string; captionEn?: string }[];
  demoUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  featured?: boolean;
  isPublished?: boolean;
  order?: number;
  translations: AdminProjectTranslationPayload[];
}

// DTO Payload gửi khi cập nhật dự án (PUT /api/projects/:id)
export interface UpdateProjectPayload extends Partial<CreateProjectPayload> {}

// Kết quả phân trang tiêu chuẩn từ Backend
export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Interface Phản hồi API phân trang từ Backend
export interface PaginatedProjectsResult<T> {
  data: T[];
  pagination: PaginationMeta;
}
