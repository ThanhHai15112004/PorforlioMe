import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useLang, pick } from '../../lib/i18n';

export default function SpotlightProjectCard() {
  const { lang } = useLang();

  return (
    <div className="relative w-full max-w-lg mx-auto lg:ml-auto group">
      
      {/* Ambient Radial Background Glow */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-sky-400/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Main Glass Spotlight Card */}
      <div className="relative rounded-2xl glass-card border border-black/10 dark:border-white/10 p-5 sm:p-6 shadow-2xl shadow-blue-500/10 overflow-hidden">
        
        {/* Spotlight Badge & Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span>{pick(lang, 'Dự Án Tiêu Biểu', 'Featured Spotlight')}</span>
          </div>

          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
            {pick(lang, 'Hệ Thống LMS', 'LMS System')}
          </span>
        </div>

        {/* Mockup Frame Graphic */}
        <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 p-4 text-white mb-5 shadow-lg group-hover:border-blue-500/40 transition-colors">
          
          {/* macOS Titlebar */}
          <div className="flex items-center gap-1.5 mb-3 border-b border-slate-800 pb-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-[11px] font-mono text-slate-400">lms-portal.internal</span>
          </div>

          {/* Mini Dashboard Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-400">
                  <Icon icon="ph:play-circle-fill" className="text-lg" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Video HLS Streaming</h4>
                  <p className="text-[10px] text-slate-400 font-mono">1080p Adaptive Rate</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">Live</span>
            </div>

            {/* Simulated Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-3/4" />
            </div>

            {/* Mini Grid Stats */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="p-2 rounded-lg bg-slate-800/60 text-center">
                <p className="text-[10px] text-slate-400">{pick(lang, 'Học viên', 'Students')}</p>
                <p className="text-xs font-bold text-blue-400">12,500+</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/60 text-center">
                <p className="text-[10px] text-slate-400">{pick(lang, 'Khóa học', 'Courses')}</p>
                <p className="text-xs font-bold text-indigo-400">140+</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/60 text-center">
                <p className="text-[10px] text-slate-400">{pick(lang, 'Tải trung bình', 'Avg Load')}</p>
                <p className="text-xs font-bold text-emerald-400">&lt; 180ms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Title & Short Description */}
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {pick(lang, 'Hệ Thống LMS Học Trực Tuyến Chuyên Sâu', 'Enterprise E-Learning LMS Platform')}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {pick(
            lang,
            'Nền tảng quản lý đào tạo doanh nghiệp tích hợp video streaming HLS, phân quyền RBAC và xử lý tiến độ học tập thời gian thực.',
            'Enterprise training LMS featuring adaptive HLS video streaming, RBAC access control, and real-time learning analytics.',
          )}
        </p>

        {/* Tech Badges & Link */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-black/5 dark:border-white/10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[11px] font-medium text-slate-700 dark:text-slate-300">
              Laravel
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[11px] font-medium text-slate-700 dark:text-slate-300">
              React
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[11px] font-medium text-slate-700 dark:text-slate-300">
              HLS Stream
            </span>
          </div>

          <Link
            to="/projects/lms-platform"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0 group/btn"
          >
            <span>{pick(lang, 'Xem Case Study', 'Case Study')}</span>
            <Icon icon="ph:arrow-right-bold" className="transform group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ─── FOREGROUND FLOATING DEPTH CARDS ─────────────────────────────────── */}
      
      {/* Floating Card 1: Top-Right Overlapping Badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 z-20 px-3.5 py-2.5 rounded-2xl glass-card border border-blue-500/30 shadow-xl flex items-center gap-3 backdrop-blur-md"
      >
        <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
          <Icon icon="ph:lightning-fill" className="text-lg" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">10,000+ Users</p>
          <p className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Stream</span>
          </p>
        </div>
      </motion.div>

      {/* Floating Card 2: Bottom-Left Overlapping Badge */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6 z-20 px-3.5 py-2.5 rounded-2xl glass-card border border-indigo-500/30 shadow-xl flex items-center gap-3 backdrop-blur-md"
      >
        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
          <Icon icon="logos:laravel" className="text-lg" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Clean Architecture</p>
          <p className="text-[10px] font-mono text-blue-400">RBAC & API Security</p>
        </div>
      </motion.div>

    </div>
  );
}
