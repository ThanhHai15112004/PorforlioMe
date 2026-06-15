import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Work' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <header 
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 md:px-8 border backdrop-blur-[18px] transition-all duration-300"
        style={{
          width: 'min(1180px, calc(100% - 48px))',
          height: '72px',
          top: '24px',
          borderRadius: '999px',
          background: 'rgba(5, 5, 5, 0.72)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Left side: Logo [TH.] Thanh Hải */}
        <NavLink to="/" className="flex items-center gap-3 group">
          {/* TH. Circle Logo */}
          <div className="relative w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-white/25">
            <span className="text-sm font-bold text-[#F5F5F5] font-sans tracking-tight select-none">
              TH
            </span>
            {/* Green available online dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-[#050505] shadow-[0_0_8px_#22C55E]"></span>
          </div>
          
          {/* Name */}
          <span className="text-sm font-semibold tracking-tight text-[#F5F5F5] font-sans">
            Thanh Hải
          </span>
        </NavLink>

        {/* Middle: Menu links (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `relative text-[14px] font-medium transition-all duration-200 py-2 flex flex-col items-center justify-center ${
                  isActive 
                    ? 'text-[#F5F5F5]' 
                    : 'text-[#A1A1AA] hover:text-[#F5F5F5]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {/* Green dot for active link */}
                  {isActive && (
                    <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_6px_#22C55E]"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right side: CV Download Button (Hidden on mobile) & Hamburger Menu (Visible on mobile) */}
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="group/cv hidden sm:inline-flex items-center justify-center gap-2 h-[42px] px-5 bg-[#F5F5F5] text-[#050505] text-[14px] font-semibold rounded-full select-none transition-all duration-300 hover:scale-[1.03] hover:bg-white active:scale-95 shadow-[0_0_15px_rgba(245,245,245,0.15)]"
          >
            <span>Download CV</span>
            <Icon 
              icon="mdi:download" 
              className="w-4 h-4 transition-transform duration-300 group-hover/cv:translate-y-0.5" 
            />
          </a>

          {/* Mobile hamburger menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors p-1"
            aria-label="Toggle Menu"
          >
            <Icon icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"} className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center animate-fade-in">
          <nav className="flex flex-col items-center gap-8 text-lg">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `relative py-2 font-medium tracking-wide text-2xl transition-colors ${
                    isActive ? 'text-[#22C55E]' : 'text-[#A1A1AA] hover:text-[#F5F5F5]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            
            <a 
              href="#" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 h-[48px] px-8 bg-[#F5F5F5] text-[#050505] text-base font-bold rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <span>Download CV</span>
              <Icon icon="mdi:download" className="w-5 h-5" />
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
