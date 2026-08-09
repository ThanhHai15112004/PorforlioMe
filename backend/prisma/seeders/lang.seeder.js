import { PrismaClient } from '@prisma/client';
import vi from '#lang/vi.js';
import en from '#lang/en.js';

const prisma = new PrismaClient();

/**
 * Script tự động quét và đồng bộ tất cả từ khóa ngôn ngữ hệ thống vào Database (Translation Table)
 */
export async function seedSystemLanguages() {
  console.log('🌐 [Seeder] Đang đồng bộ tự động từ khóa ngôn ngữ hệ thống vào Database...');

  const langMap = { vi, en };

  for (const [langCode, dictionary] of Object.entries(langMap)) {
    for (const [key, messageText] of Object.entries(dictionary)) {
      // Bỏ qua các câu log console không cần lưu DB
      if (key.endsWith('_LOG') || key.startsWith('SERVER_LISTENING')) continue;

      const existing = await prisma.translation.findFirst({
        where: {
          projectId: null,
          lang: langCode,
          title: key,
        },
      });

      if (existing) {
        await prisma.translation.update({
          where: { id: existing.id },
          data: { description: messageText },
        });
      } else {
        await prisma.translation.create({
          data: {
            projectId: null,
            lang: langCode,
            title: key,
            description: messageText,
          },
        });
      }
    }
  }

  console.log('✅ [Seeder] Đã đồng bộ thành công toàn bộ từ khóa ngôn ngữ hệ thống vào Database!');
}
