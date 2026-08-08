import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../lib/i18n';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import CursorGlow from '../components/common/CursorGlow';
import FloatingContactWidget from '../components/common/FloatingContactWidget';

export default function MainLayout() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Cuộn về đầu trang & cập nhật Dynamic Page Title (document.title) khi chuyển route
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    let title: string;

    if (pathname === '/') {
      title = lang === 'vi' ? 'Thanh Hải · Full-stack Web Developer' : 'Thanh Hai · Full-stack Web Developer';
    } else if (pathname === '/projects') {
      title = lang === 'vi' ? 'Dự Án Tiêu Biểu · Thanh Hải Portfolio' : 'Featured Projects · Thanh Hai Portfolio';
    } else if (pathname.startsWith('/projects/')) {
      title = lang === 'vi' ? 'Chi Tiết Dự Án · Thanh Hải Portfolio' : 'Project Detail · Thanh Hai Portfolio';
    } else if (pathname === '/about') {
      title = lang === 'vi' ? 'Giới Thiệu Bản Thân · Thanh Hải Portfolio' : 'About Me · Thanh Hai Portfolio';
    } else if (pathname === '/contact') {
      title = lang === 'vi' ? 'Liên Hệ Trực Tiếp · Thanh Hải Portfolio' : 'Contact Me · Thanh Hai Portfolio';
    } else {
      title = lang === 'vi' ? '404 Không Tìm Thấy Trang · Thanh Hải Portfolio' : '404 Page Not Found · Thanh Hai Portfolio';
    }

    document.title = title;
  }, [pathname, lang]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#07080D] text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white relative noise-overlay transition-colors duration-300">
      <div className="absolute inset-0 bg-grid pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <motion.div
        style={{ y: bgY }}
        className="fixed inset-0 pointer-events-none bg-ambient-gradients -z-10"
      />
      <CursorGlow />
      <Header />

      <main className="flex-grow w-full flex flex-col relative z-10">
        <Outlet />
      </main>

      <Footer />
      <ScrollToTop />
      <FloatingContactWidget />
    </div>
  );
}
