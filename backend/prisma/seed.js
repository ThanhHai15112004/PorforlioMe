import { PrismaClient } from '@prisma/client';
import { runAllSeeders } from './seeders/index.js';

const prisma = new PrismaClient();

// Hàm entrypoint tự động nạp dữ liệu mẫu khởi tạo vào cơ sở dữ liệu Supabase
async function main() {
  await runAllSeeders();
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi nạp dữ liệu mẫu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
