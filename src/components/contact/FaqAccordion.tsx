import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Bạn có nhận dự án freelance không?',
    a: 'Tôi sẵn sàng trao đổi về các dự án phù hợp với chuyên môn và thời gian hiện tại. Bạn có thể liên hệ để mình cùng xem xét.',
  },
  {
    q: 'Bạn có làm việc từ xa không?',
    a: 'Có. Tôi có thể trao đổi và làm việc từ xa thông qua các công cụ quản lý dự án và giao tiếp trực tuyến.',
  },
  {
    q: 'Bạn thường làm việc với công nghệ nào?',
    a: 'Tôi thường làm việc với Laravel, React, MySQL, SQL Server, Redis, Docker và AWS S3. Chi tiết hơn bạn có thể xem ở trang Giới thiệu.',
  },
  {
    q: 'Tôi có thể xem mã nguồn dự án không?',
    a: 'Một số dự án cá nhân có thể được công khai trên GitHub. Các dự án doanh nghiệp thường không thể chia sẻ mã nguồn do yêu cầu bảo mật.',
  },
  {
    q: 'Bạn có thể tham gia dự án đang phát triển không?',
    a: 'Có, nhưng cần đánh giá kiến trúc hiện tại, phạm vi công việc và mức độ ảnh hưởng trước khi tham gia.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="flex flex-col gap-3">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`
              rounded-xl border transition-colors duration-200
              ${isOpen ? 'border-blue-200 dark:border-blue-500/30 bg-blue-50/40 dark:bg-blue-500/10' : 'border-black/[0.06] dark:border-white/10 bg-white dark:bg-white/[0.03]'}
            `}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-snug">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
              >
                <Icon icon="mdi:plus" className={`w-5 h-5 ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
