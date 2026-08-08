import { PrismaClient } from '@prisma/client';

// Khởi tạo và xuất phiên bản Prisma Client duy nhất (Singleton) cho toàn ứng dụng
export const prisma = new PrismaClient();
