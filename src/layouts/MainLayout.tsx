import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import CursorGlow from '../components/common/CursorGlow';

export default function MainLayout() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();

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

  // Luôn cuộn về đầu trang khi chuyển route, không giữ vị trí cuộn cũ
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

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
    </div>
  );
}
