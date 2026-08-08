import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLang, pick } from '../lib/i18n';
import Button from '../components/common/Button';
import notFoundImg from '../assets/imgs/404/404 Error-pana.png';

export default function NotFound() {
  const { lang } = useLang();

  return (
    <div className="min-h-[85vh] pt-32 sm:pt-36 pb-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden bg-white dark:bg-[#07080D]">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto flex flex-col items-center gap-6 relative z-10"
      >
        {/* 404 Illustration Image */}
        <div className="w-full max-w-sm sm:max-w-md h-auto p-2">
          <img
            src={notFoundImg}
            alt="404 Not Found"
            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[340px] drop-shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Status Badge */}
        <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold uppercase tracking-widest border border-blue-200 dark:border-blue-800 shadow-xs">
          404 · Page Not Found
        </span>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {pick(lang, 'Trang Bạn Tìm Kiếm Không Tồn Tại', 'Page Not Found')}
        </h1>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
          {pick(
            lang,
            'Đường dẫn này không tồn tại, đã bị di chuyển hoặc thay đổi tên. Hãy quay về trang chủ để tiếp tục khám phá website nhé!',
            'The link you followed may be broken or the page has been moved. Return to homepage to continue exploring.'
          )}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-2">
          <Button to="/" variant="primary" size="md">
            <Icon icon="mdi:home" className="text-lg" />
            <span>{pick(lang, 'Quay Về Trang Chủ', 'Back to Home')}</span>
          </Button>

          <Button to="/projects" variant="secondary" size="md">
            <Icon icon="mdi:folder-text-outline" className="text-lg" />
            <span>{pick(lang, 'Xem Các Dự Án', 'View Projects')}</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
