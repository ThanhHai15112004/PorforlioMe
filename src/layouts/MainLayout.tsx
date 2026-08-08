import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function MainLayout() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#07080D] text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white relative noise-overlay transition-colors duration-300">
      <div className="absolute inset-0 bg-grid pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <Header />

      <main className="flex-grow w-full flex flex-col relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
