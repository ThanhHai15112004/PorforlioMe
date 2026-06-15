import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import GemstoneCanvas from '../components/common/GemstoneCanvas';
import { SOCIAL_LINKS } from '../constants';

export default function Home() {
  const floatingCards = [
    { text: '🛒 E-commerce UI', className: 'top-[15%] left-[5%] md:top-[12%] md:left-[10%] animate-float-slow' },
    { text: '📊 Admin Dashboard', className: 'top-[35%] right-[2%] md:top-[20%] md:right-[15%] animate-float-medium' },
    { text: '💻 Frontend Developer', className: 'bottom-[25%] left-[2%] md:bottom-[22%] md:left-[15%] animate-float-fast' },
    { text: '✨ Clean Code', className: 'bottom-[40%] right-[10%] md:bottom-[45%] md:right-[12%] animate-float-slow' },
    { text: '📱 Responsive Design', className: 'top-[50%] left-[8%] md:top-[45%] md:left-[5%] animate-float-medium' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-144px)] flex flex-col justify-between overflow-hidden bg-ambient-gradients noise-overlay py-8">
      {/* Background Stage Typography (Z-Index 0) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
        <h1 className="hero-title tracking-tighter text-center bg-gradient-to-b from-[#FFFFFF] via-[#E4E4E7] to-[#71717A] bg-clip-text text-transparent select-none opacity-20 md:opacity-30">
          THANH HẢI
        </h1>
        <h2 className="section-title tracking-tight text-center text-[#71717A] mt-2 select-none opacity-15 md:opacity-25 font-bold uppercase">
          Web Developer
        </h2>
      </div>

      {/* Main Grid Content (Z-Index 10) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow max-w-6xl w-full mx-auto px-4">
        
        {/* Left Side: Copywriting & CTAs (5 Cols) */}
        <div className="lg:col-span-6 space-y-6 text-left max-w-xl mx-auto lg:mx-0 order-2 lg:order-1 mt-6 lg:mt-0">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping"></span>
            Available for freelance
          </div>
          
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F5F5] font-sans leading-tight">
            Hi, I'm Thanh Hải. <br />
            I build premium web experiences.
          </h3>
          
          <p className="body-text text-base md:text-lg text-[#A1A1AA] leading-relaxed">
            Tôi xây dựng website bán hàng, dashboard admin và giao diện web hiện đại, tập trung vào trải nghiệm người dùng, hiệu năng và khả năng mở rộng.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/projects">
              <Button variant="primary">Xem dự án</Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary">Liên hệ ngay</Button>
            </Link>
          </div>
        </div>

        {/* Right Side: Centered 3D Canvas with Floating Cards (6 Cols + 1 Offset) */}
        <div className="relative lg:col-span-6 flex items-center justify-center order-1 lg:order-2 h-[400px] md:h-[500px] w-full">
          {/* 3D Canvas */}
          <div className="w-full h-full">
            <GemstoneCanvas />
          </div>

          {/* Floating overlay cards around the Gemstone */}
          {floatingCards.map((card, index) => (
            <div 
              key={index} 
              className={`absolute px-4 py-2 bg-white/[0.03] backdrop-blur-[12px] border border-white/10 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.4)] select-none text-[13px] font-medium text-[#F5F5F5] pointer-events-none ${card.className}`}
            >
              {card.text}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Social Links & Scroll Indicator (Z-Index 10) */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 pt-12 flex items-center justify-between border-t border-white/[0.03]">
        {/* Social Links */}
        <div className="flex gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a 
              key={link.platform}
              href={link.url} 
              className="text-xs uppercase tracking-wider text-[#71717A] hover:text-[#F5F5F5] transition-colors duration-250 font-semibold"
            >
              {link.platform}
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[#71717A] font-semibold">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center p-1.5">
            <div className="w-1 h-2 bg-[#22C55E] rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
