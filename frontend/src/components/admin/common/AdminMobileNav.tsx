import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAdminNavItems, type AdminNavItem } from '../../../constants';
import { useLang, pick } from '../../../lib/i18n';

interface AdminMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

// Component điều hướng chuyên dụng cho giao diện di động (Chuẩn i18n 100%)
export default function AdminMobileNav({ isOpen, onClose }: AdminMobileNavProps) {
  const location = useLocation();
  const { lang } = useLang();
  const navItems = getAdminNavItems(lang);

  return (
    <>
      {/* 1. Slide-over Navigation Drawer khi bấm Hamburger */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Lớp nền mờ (Backdrop Blur) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Slide-over Drawer từ trái sang */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-[#07080D] border-r border-black/[0.07] dark:border-white/10 flex flex-col p-4 shadow-2xl"
            >
              {/* Header Drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.07] dark:border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    <span>TH</span>
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border-2 border-white dark:border-black" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Thanh Hải</h3>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">
                      {pick(lang, 'Quản trị Mobile', 'Mobile CMS')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  <Icon icon="ant-design:close-outlined" className="w-5 h-5" />
                </button>
              </div>

              {/* Danh sách các đường dẫn */}
              <nav className="flex-1 space-y-1.5">
                {navItems.map((item: AdminNavItem) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center justify-between px-4 py-3 rounded-full text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white font-semibold shadow-sm'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon icon={item.icon} className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && item.badge > 0 && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive ? 'bg-white/20 text-white' : 'bg-rose-500 text-white'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer Drawer */}
              <div className="pt-4 border-t border-black/[0.07] dark:border-white/10">
                <Link
                  to="/"
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold"
                >
                  <span>{pick(lang, 'Xem trang công khai', 'View Live Site')}</span>
                  <Icon icon="ant-design:export-outlined" className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. Thanh Điều Hướng Đáy Màn Hình (Bottom Navigation Bar) trên Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-16 bg-white/90 dark:bg-[#07080D]/90 backdrop-blur-lg border-t border-black/[0.07] dark:border-white/10 px-2 flex items-center justify-around">
        {navItems.slice(0, 4).map((item: AdminNavItem) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon icon={item.icon} className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{item.label}</span>

              {item.badge && item.badge > 0 && (
                <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#07080D]" />
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
