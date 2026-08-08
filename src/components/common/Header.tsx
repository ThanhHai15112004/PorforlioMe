import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';
import { useLang, pick } from '../../lib/i18n';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Đóng menu sau khi chuyển trang
  const closeMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { path: '/', label: pick(lang, 'Trang chủ', 'Home') },
    { path: '/projects', label: pick(lang, 'Dự án', 'Work') },
    { path: '/about', label: pick(lang, 'Giới thiệu', 'About') },
    { path: '/contact', label: pick(lang, 'Liên hệ', 'Contact') },
  ];
  const downloadCvLabel = pick(lang, 'Tải CV', 'Download CV');

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 md:px-8 backdrop-blur-xl transition-all duration-500 border border-black/[0.07] dark:border-white/10 ${
          scrolled
            ? 'bg-white/85 dark:bg-black/70 shadow-[0_8px_40px_rgba(0,0,0,0.10)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
            : 'bg-white/70 dark:bg-black/50 shadow-[0_2px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.3)]'
        }`}
        style={{
          width: 'min(1180px, calc(100% - 48px))',
          height: '68px',
          top: '20px',
          borderRadius: '999px',
        }}
      >
        {/* Left: Logo TH. */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900 group-hover:shadow-md">
            <span className="text-sm font-bold text-white tracking-tight select-none">
              TH
            </span>
            {/* Available online dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-black shadow-sm" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-100">
            Thanh Hải
          </span>
        </NavLink>

        {/* Middle: Nav links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 h-full">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Theme toggle + CV button + Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LangToggle />

          <a
            href="#"
            className="group/cv hidden sm:inline-flex items-center justify-center gap-2 h-[40px] px-5 bg-blue-600 text-white text-[13px] font-semibold rounded-full transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/50 active:scale-95"
          >
            <span>{downloadCvLabel}</span>
            <Icon
              icon="mdi:download"
              className="w-4 h-4 transition-transform duration-300 group-hover/cv:translate-y-0.5"
            />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors p-1"
            aria-label={pick(lang, 'Mở menu', 'Toggle menu')}
          >
            <Icon
              icon={isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'}
              className="w-6 h-6"
            />
          </button>
        </div>
      </header>

      {/* Mobile Full-screen Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/97 dark:bg-black/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center">
          <nav className="flex flex-col items-center gap-4 w-full px-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `w-full max-w-xs text-center text-lg tracking-tight transition-all py-3 px-6 rounded-full ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 font-bold'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <a
              href="#"
              onClick={closeMenu}
              className="mt-4 inline-flex items-center justify-center gap-2 h-[48px] px-8 bg-blue-600 text-white text-base font-bold rounded-full transition-all hover:bg-blue-700 active:scale-95"
            >
              <span>{downloadCvLabel}</span>
              <Icon icon="mdi:download" className="w-5 h-5" />
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
