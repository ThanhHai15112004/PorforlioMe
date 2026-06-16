import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-in">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
        Xin chào! Chào mừng tới Portfolio của tôi
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent mb-6">
        Trang chủ
      </h1>
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
        Đây là trang chủ của dự án Portfolio cá nhân. Được xây dựng dựa trên React, Vite, TypeScript và Tailwind CSS v4.
      </p>
      <div className="mt-10 flex gap-4">
        <Link to="/projects">
          <Button variant="primary">Xem dự án</Button>
        </Link>
        <Link to="/contact">
          <Button variant="secondary">Liên hệ ngay</Button>
        </Link>
      </div>
    </div>
  );
}
