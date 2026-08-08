// Định nghĩa kiểu dữ liệu Dự án khớp với Prisma Model ở Backend
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  techStack: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Định nghĩa kiểu dữ liệu gửi tin nhắn liên hệ
export interface ContactMessagePayload {
  name: string;
  email: string;
  message: string;
}
