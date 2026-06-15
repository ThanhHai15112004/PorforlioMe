import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../components/common/Button';
import GemstoneCanvas from '../components/common/GemstoneCanvas';

export default function Home() {
  const floatingCards = [
    { 
      text: 'E-commerce UI', 
      icon: 'mdi:cart-outline', 
      className: 'top-[10%] left-[8%] md:top-[12%] md:left-[10%] animate-float-slow flex', // Always visible
      iconColor: 'text-[#38BDF8]'
    },
    { 
      text: 'Admin Dashboard', 
      icon: 'mdi:view-dashboard-outline', 
      className: 'top-[28%] right-[5%] md:top-[22%] md:right-[12%] animate-float-medium hidden sm:flex', 
      iconColor: 'text-[#A855F7]'
    },
    { 
      text: 'Responsive Design', 
      icon: 'mdi:cellphone-link', 
      className: 'top-[50%] left-[2%] md:top-[42%] md:left-[5%] animate-float-medium flex', // Always visible
      iconColor: 'text-[#22C55E]'
    },
    { 
      text: 'Clean Code', 
      icon: 'mdi:sparkles', 
      className: 'bottom-[35%] right-[2%] md:bottom-[40%] md:right-[8%] animate-float-slow hidden md:flex', 
      iconColor: 'text-[#FBBF24]'
    },
    { 
      text: 'Frontend Developer', 
      icon: 'mdi:monitor-dashboard', 
      className: 'bottom-[15%] left-[10%] md:bottom-[18%] md:left-[18%] animate-float-fast hidden sm:flex', 
      iconColor: 'text-[#38BDF8]'
    }
  ];

  const socialLinks = [
    { platform: 'GITHUB', icon: 'mdi:github', url: 'https://github.com/ThanhHai15112004/PorforlioMe' },
    { platform: 'LINKEDIN', icon: 'mdi:linkedin', url: '#' },
    { platform: 'EMAIL', icon: 'mdi:email-outline', url: '/contact' }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-ambient-gradients noise-overlay pt-[100px] md:pt-[120px] pb-8 select-none">
      
      {/* Background Stage Typography (Z-Index 0) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
        <span 
          className="font-extrabold uppercase tracking-tighter text-center bg-gradient-to-b from-[#F5F5F5]/[0.12] to-transparent bg-clip-text text-transparent select-none"
          style={{ 
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(80px, 15vw, 220px)', 
            lineHeight: 0.86,
            letterSpacing: '-0.07em'
          }}
        >
          THANH HẢI
        </span>
        <span 
          className="font-bold uppercase tracking-[0.2em] text-center text-[#71717A]/[0.12] select-none"
          style={{ 
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(16px, 3.5vw, 44px)', 
            marginTop: '16px' 
          }}
        >
          WEB DEVELOPER
        </span>
      </div>

      {/* Main Grid Content (Z-Index 10) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow max-w-[1180px] w-full mx-auto px-6 md:px-8">
        
        {/* Left Side: Copywriting & CTAs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 text-left max-w-xl mx-auto lg:mx-0 order-2 lg:order-1 mt-6 lg:mt-0 animate-fade-in">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping"></span>
            Available for freelance
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-[52px] font-extrabold tracking-tight text-[#F5F5F5] font-sans leading-[1.08]">
            Hi, I’m Thanh Hải.<br />
            I build premium web experiences.
          </h1>
          
          {/* Description */}
          <p className="body-text text-base md:text-lg text-[#A1A1AA] leading-relaxed">
            Tôi xây dựng website bán hàng, dashboard admin và giao diện web hiện đại, tập trung vào trải nghiệm người dùng, hiệu năng và khả năng mở rộng.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/projects">
              <Button 
                variant="primary"
                className="bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] border-none text-[#F5F5F5] hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                Xem dự án
                <Icon icon="mdi:arrow-right" className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <button className="px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 cursor-pointer bg-white/5 border border-white/10 hover:border-white/20 text-[#F5F5F5] hover:bg-white/10">
                Liên hệ ngay
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Centered 3D Canvas with Floating Cards (7 Cols) */}
        <div className="relative lg:col-span-7 flex items-center justify-center order-1 lg:order-2 h-[350px] sm:h-[450px] md:h-[550px] w-full">
          {/* 3D Canvas */}
          <div className="w-[110%] h-[110%] md:w-full md:h-full flex items-center justify-center">
            <GemstoneCanvas />
          </div>

          {/* Floating overlay cards around the Gemstone */}
          {floatingCards.map((card, index) => (
            <div 
              key={index} 
              className={`absolute items-center gap-2 px-4 py-2.5 bg-white/[0.055] backdrop-blur-[16px] border border-white/12 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.35)] select-none text-[13px] font-semibold text-[#F5F5F5] pointer-events-none transition-all duration-300 ${card.className}`}
            >
              <Icon icon={card.icon} className={`w-5 h-5 ${card.iconColor}`} />
              <span>{card.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Social Links & Scroll Indicator (Z-Index 10) */}
      <div className="relative z-10 max-w-[1180px] w-full mx-auto px-6 md:px-8 pt-6 flex items-center justify-between border-t border-white/[0.05]">
        {/* Social Links */}
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a 
              key={link.platform}
              href={link.url} 
              className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#71717A] hover:text-[#F5F5F5] transition-colors duration-250"
            >
              <Icon icon={link.icon} className="w-4 h-4" />
              <span className="hidden sm:inline">{link.platform}</span>
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wider text-[#71717A]">SCROLL</span>
          <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center p-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-bounce shadow-[0_0_6px_#22C55E]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
