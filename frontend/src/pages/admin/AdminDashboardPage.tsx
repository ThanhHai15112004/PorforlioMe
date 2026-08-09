import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import StatKpiCard from '../../components/admin/dashboard/StatKpiCard';
import {
  getMockAdminProjects,
  getMockAdminMessages,
  getMockAdminTrafficData,
} from '../../constants';
import { useLang, pick } from '../../lib/i18n';

// Trang Dashboard Overview chính của Admin CMS (Tối giản chuẩn Ant Design Icons, KHÔNG emoji hay chấm giả icon)
export default function AdminDashboardPage() {
  const { lang } = useLang();
  const [projects, setProjects] = useState(() => getMockAdminProjects(lang));
  const messages = getMockAdminMessages(lang);
  const trafficData = getMockAdminTrafficData(lang);

  // Thao tác đổi trạng thái Xuất bản realtime (Optimistic Update)
  const togglePublish = (id: number) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPublished: !item.isPublished } : item))
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Tối Giản (Minimal Header) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-black/[0.07] dark:border-white/10">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            <span>Thanh Hải</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              {pick(lang, 'Tổng quan', 'Dashboard')}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {pick(lang, 'Tổng quan hệ thống', 'System Overview')}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Icon icon="ant-design:plus-outlined" className="w-3.5 h-3.5" />
            <span>{pick(lang, 'Tạo dự án mới', 'New Project')}</span>
          </Link>
        </div>
      </div>

      {/* 2. Lưới 4 Thẻ Chỉ Số KPI (Stat Cards Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatKpiCard
          title={pick(lang, 'TỔNG DỰ ÁN', 'TOTAL PROJECTS')}
          value="12"
          subtitle={pick(lang, '10 xuất bản, 2 bản nháp', '10 published, 2 drafts')}
          icon="ant-design:project-outlined"
          trend="+12%"
          trendUp={true}
          colorVariant="blue"
        />
        <StatKpiCard
          title={pick(lang, 'TIN NHẮN CHƯA ĐỌC', 'UNREAD MESSAGES')}
          value="3"
          subtitle={pick(lang, 'Cần phản hồi ngay', 'Needs response')}
          icon="ant-design:mail-outlined"
          trend={pick(lang, '3 mới', '3 new')}
          trendUp={true}
          colorVariant="rose"
        />
        <StatKpiCard
          title={pick(lang, 'LƯỢT XEM TRANG', 'PAGE VIEWS')}
          value="1,420"
          subtitle={pick(lang, 'Tháng này', 'This month')}
          icon="ant-design:eye-outlined"
          trend="+18.5%"
          trendUp={true}
          colorVariant="emerald"
        />
        <StatKpiCard
          title={pick(lang, 'TRẠNG THÁI HỆ THỐNG', 'SYSTEM STATUS')}
          value={pick(lang, 'Hoạt động tốt', 'Healthy')}
          subtitle={pick(lang, 'Độ trễ API < 45ms', 'API Latency < 45ms')}
          icon="ant-design:check-circle-outlined"
          trend="100%"
          trendUp={true}
          colorVariant="purple"
        />
      </div>

      {/* 3. Khối Biểu Đồ Thống Kê & Phân Tích (Traffic Analytics Chart) */}
      <div className="glass-card elevate-sm rounded-3xl p-5 md:p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Icon icon="ant-design:area-chart-outlined" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{pick(lang, 'Biểu đồ lượt truy cập', 'Traffic Analytics')}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {pick(
                lang,
                'Lượt ghé thăm portfolio 7 ngày gần nhất',
                'Portfolio visitors over the last 7 days'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
              {pick(lang, '7 ngày qua', 'Last 7 days')}
            </span>
          </div>
        </div>

        {/* Biểu đồ dạng Bar/Line thanh lịch */}
        <div className="h-44 md:h-52 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-white/5">
          {trafficData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-blue-600 dark:text-blue-400 transition-opacity">
                {item.views}
              </span>
              <div
                style={{ height: item.height }}
                className="w-full max-w-[32px] bg-blue-600/80 hover:bg-blue-600 rounded-t-lg transition-all duration-300 shadow-sm"
              />
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Khối Hoạt Động Gần Đây (2 Cột SaaS Data List) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cột 1: Danh sách Dự án gần đây */}
        <div className="glass-card elevate-sm rounded-3xl p-5 md:p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Icon icon="ant-design:folder-outlined" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{pick(lang, 'Dự án mới cập nhật', 'Recent Projects')}</span>
            </h3>
            <Link
              to="/admin/projects"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors flex items-center gap-1"
            >
              <span>{pick(lang, 'Xem tất cả', 'View All')}</span>
              <Icon icon="ant-design:right-outlined" className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between py-3 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] px-1 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-[11px] flex items-center justify-center shrink-0 border border-blue-200/50 dark:border-blue-800/40">
                    {project.tag}
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {project.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">{project.updatedAt}</span>
                  </div>
                </div>

                {/* Công tắc Xuất bản realtime (Sử dụng Icon Ant Design) */}
                <button
                  onClick={() => togglePublish(project.id)}
                  title={project.isPublished ? pick(lang, 'Chuyển thành nháp', 'Switch to draft') : pick(lang, 'Xuất bản', 'Publish')}
                  className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                    project.isPublished
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/50'
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/50'
                  }`}
                >
                  <Icon
                    icon={project.isPublished ? 'ant-design:check-circle-outlined' : 'ant-design:edit-outlined'}
                    className="w-3 h-3"
                  />
                  <span>
                    {project.isPublished ? pick(lang, 'Đã xuất bản', 'Published') : pick(lang, 'Nháp', 'Draft')}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cột 2: Danh sách Tin nhắn gần đây */}
        <div className="glass-card elevate-sm rounded-3xl p-5 md:p-6 bg-white/80 dark:bg-[#0D0F17] border border-black/[0.07] dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Icon icon="ant-design:mail-outlined" className="w-4 h-4 text-rose-500" />
              <span>{pick(lang, 'Tin nhắn liên hệ mới', 'Recent Messages')}</span>
            </h3>
            <Link
              to="/admin/messages"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors flex items-center gap-1"
            >
              <span>{pick(lang, 'Vào hòm thư', 'Go to Inbox')}</span>
              <Icon icon="ant-design:right-outlined" className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="py-3 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] px-1 rounded-xl transition-colors flex items-center justify-between gap-3"
              >
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">{msg.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {msg.subject}
                  </p>
                </div>

                <Link
                  to="/admin/messages"
                  className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold transition-colors shrink-0"
                >
                  {pick(lang, 'Trả lời', 'Reply')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
