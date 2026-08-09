import { seedAdmin } from './admin.seeder.js';
import { seedProjects } from './project.seeder.js';
import { seedSystemLanguages } from './lang.seeder.js';

// Hàm điều phối tổng hợp thực thi tất cả các seeders trong hệ thống
export const runAllSeeders = async () => {
  console.log('🚀 [Seeders Engine] Bắt đầu nạp tất cả dữ liệu khởi tạo...');
  await seedAdmin();
  await seedProjects();
  await seedSystemLanguages();
  console.log('🎉 [Seeders Engine] Hoàn tất nạp toàn bộ dữ liệu khởi tạo!');
};
