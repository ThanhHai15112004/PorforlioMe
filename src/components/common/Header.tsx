import { NavLink } from 'react-router-dom';

export default function Header() {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Work' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
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
          {/* Xanh ngọc (emerald green) dot at bottom right */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-[#050505] shadow-[0_0_8px_#22C55E]"></span>
        </div>
        
        {/* Name */}
        <span className="text-sm font-semibold tracking-tight text-[#F5F5F5] font-sans">
          Thanh Hải
        </span>
      </NavLink>

      {/* Middle: Menu links */}
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
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_6px_#22C55E]"></span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Right side: CV Download Button */}
      <div>
        <a 
          href="#" 
          className="group/cv inline-flex items-center justify-center gap-2 h-[42px] px-5 bg-[#F5F5F5] text-[#050505] text-xs md:text-sm font-semibold rounded-full select-none transition-all duration-300 hover:scale-[1.03] hover:bg-white active:scale-95 shadow-[0_0_15px_rgba(245,245,245,0.15)]"
        >
          <span>Download CV</span>
          {/* Download Icon with slide down on hover */}
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover/cv:translate-y-0.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>
    </header>
  );
}
