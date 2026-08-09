import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/common/AdminHeader';
import AdminSidebar from '../components/admin/common/AdminSidebar';
import AdminMobileNav from '../components/admin/common/AdminMobileNav';

// Layout bọc khung chuẩn dành cho toàn bộ các trang Admin Dashboard
export default function AdminLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07080D] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 antialiased selection:bg-blue-500 selection:text-white">
      {/* Sidebar cố định bên trái (Desktop) */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Navigation chuyên dụng cho Mobile (< 768px) */}
      <AdminMobileNav
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      {/* Khối Nội Dung Chính (Main Content Area) */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
        } pb-16 md:pb-0`}
      >
        {/* Header cố định phía trên */}
        <AdminHeader
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
          onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
        />

        {/* Nội dung động của các trang Admin con */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
