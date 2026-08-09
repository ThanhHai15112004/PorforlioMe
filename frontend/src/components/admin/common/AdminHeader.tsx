import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import LangToggle from '../../common/LangToggle';
import ThemeToggle from '../../common/ThemeToggle';
import { useLang, pick } from '../../../lib/i18n';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  onOpenMobileDrawer: () => void;
}

// Component Header dành riêng cho trang Quản trị Admin (Hỗ trợ đa ngôn ngữ 100% VI / EN)
export default function AdminHeader({
  onToggleSidebar,
  isSidebarCollapsed,
  onOpenMobileDrawer,
}: AdminHeaderProps) {
  const navigate = useNavigate();
  const { lang } = useLang();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Xử lý đăng xuất tài khoản admin
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/85 dark:bg-[#07080D]/80 backdrop-blur-xl border-b border-black/[0.07] dark:border-white/10 px-4 md:px-6 flex items-center justify-between transition-colors duration-300">
      {/* Khối bên trái: Nút điều khiển Sidebar & Ô tìm kiếm */}
      <div className="flex items-center gap-3">
        {/* Nút Hamburger cho Mobile (< 768px) */}
        <button
          onClick={onOpenMobileDrawer}
          className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          aria-label={pick(lang, 'Mở menu điều hướng', 'Open navigation menu')}
        >
          <Icon icon="ant-design:menu-outlined" className="w-5 h-5" />
        </button>

        {/* Nút thu gọn / mở rộng Sidebar trên Desktop */}
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          title={pick(
            lang,
            isSidebarCollapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên',
            isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
          )}
        >
          <Icon
            icon={isSidebarCollapsed ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'}
            className="w-5 h-5"
          />
        </button>

        {/* Ô tìm kiếm nhanh trên Desktop */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-400 text-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all w-64">
          <Icon icon="ant-design:search-outlined" className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={pick(lang, 'Tìm kiếm...', 'Search...')}
            className="bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 text-xs w-full font-sans"
          />
        </div>
      </div>

      {/* Khối bên phải: Công cụ & Tài khoản Admin */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Nút xem trang Portfolio Public */}
        <Link
          to="/"
          target="_blank"
          className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-800/50 transition-all"
        >
          <span>{pick(lang, 'Xem trang công khai', 'View Live Site')}</span>
          <Icon icon="ant-design:export-outlined" className="w-3.5 h-3.5" />
        </Link>

        {/* Chuyển đổi ngôn ngữ VI / EN */}
        <LangToggle />

        {/* Chuyển đổi Theme Sáng / Tối */}
        <ThemeToggle />

        {/* Divider ngăn cách */}
        <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10 mx-1" />

        {/* Menu Profile Admin */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <div className="relative w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              <span>TH</span>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border-2 border-white dark:border-black" />
            </div>
            <span className="hidden sm:block text-xs font-semibold text-slate-800 dark:text-slate-200">
              Thanh Hải
            </span>
            <Icon icon="ant-design:down-outlined" className="w-3 h-3 text-slate-400" />
          </button>

          {/* Menu thả xuống Profile */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#0D0F17] border border-slate-200/80 dark:border-white/10 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-white/5">
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Thanh Hải</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">admin@thanhhai.dev</p>
              </div>

              <Link
                to="/admin/settings"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <Icon icon="ant-design:setting-outlined" className="w-4 h-4 text-slate-400" />
                <span>{pick(lang, 'Cài đặt tài khoản', 'Account Settings')}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
              >
                <Icon icon="ant-design:logout-outlined" className="w-4 h-4" />
                <span>{pick(lang, 'Đăng xuất', 'Sign Out')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
