import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Script nạp dữ liệu tài khoản Quản trị viên (Admin) ban đầu
 */
export async function seedAdmin() {
  console.log('🌱 [Seeder] Đang khởi tạo tài khoản Admin mặc định...');

  const initialPassword = '!Password@#123';
  const hashedPassword = await bcrypt.hash(initialPassword, 10);

  const adminData = {
    username: 'admin',
    email: 'admin@thanhhai.dev',
    password: hashedPassword,
    name: 'Thanh Hải Admin',
    role: 1, // 1 = Admin
    isActive: true,
  };

  const admin = await prisma.admin.upsert({
    where: { username: adminData.username },
    update: {
      password: hashedPassword,
      name: adminData.name,
      role: 1,
    },
    create: adminData,
  });

  console.log(`✅ [Seeder] Đã nạp thành công tài khoản Admin: username="${admin.username}", password="${initialPassword}"`);
}
