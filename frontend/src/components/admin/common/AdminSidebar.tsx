import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getAdminNavItems, type AdminNavItem } from '../../../constants';
import { useLang, pick } from '../../../lib/i18n';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse?: () => void;
}

// Component Sidebar điều hướng dành riêng cho màn hình Desktop (Chuẩn i18n 100%)
export default function AdminSidebar({
  isCollapsed,
}: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useLang();
  const navItems = getAdminNavItems(lang);

  // Thao tác Đăng xuất tài khoản Admin
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <aside
      className={`hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-white dark:bg-[#07080D] border-r border-black/[0.07] dark:border-white/10 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Khối Header Logo thương hiệu */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-black/[0.07] dark:border-white/10">
        <Link to="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="relative w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
            <span>TH</span>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border-2 border-white dark:border-black" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm tracking-tight">
                Thanh Hải
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono uppercase tracking-wider">
                {pick(lang, 'Quản trị hệ thống', 'System CMS')}
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Danh sách Menu điều hướng */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item: AdminNavItem) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
              }`}
            >
              <Icon
                icon={item.icon}
                className={`w-4 h-4 shrink-0 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                }`}
              />

              {!isCollapsed && <span className="truncate">{item.label}</span>}

              {/* Badge thông báo phụ */}
              {item.badge && item.badge > 0 && (
                <span
                  className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-rose-500 text-white shadow-sm'
                  } ${isCollapsed ? 'absolute top-1.5 right-1.5 px-1.5 py-0.2 text-[9px]' : ''}`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Nút Đăng xuất ở đáy Sidebar */}
      <div className="p-3 border-t border-black/[0.07] dark:border-white/10">
        <button
          onClick={handleLogout}
          title={isCollapsed ? pick(lang, 'Đăng xuất', 'Logout') : undefined}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/50 dark:border-rose-900/30 transition-all duration-200"
        >
          <Icon icon="ant-design:logout-outlined" className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>{pick(lang, 'Đăng xuất', 'Logout')}</span>}
        </button>
      </div>
    </aside>
  );
}
