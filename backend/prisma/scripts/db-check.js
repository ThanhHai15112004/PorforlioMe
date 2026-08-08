import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Script tiện ích kiểm tra trạng thái kết nối Database và thống kê bản ghi
async function checkDatabaseConnection() {
  console.log('🔍 [Database Script] Đang kiểm tra kết nối tới Cơ sở dữ liệu...');

  try {
    const projectCount = await prisma.project.count();
    const contactCount = await prisma.contactMessage.count();

    console.log('✅ [Database Script] Kết nối Cơ sở dữ liệu thành công 100%!');
    console.log(`📊 Tổng số dự án hiện tại (Project): ${projectCount}`);
    console.log(`📊 Tổng số tin nhắn liên hệ (ContactMessage): ${contactCount}`);
  } catch (error) {
    console.error('❌ [Database Script] Lỗi kết nối Cơ sở dữ liệu:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseConnection();
