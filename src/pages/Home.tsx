import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { Icon } from '@iconify/react';

const easeOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: easeOut },
  }),
};

const techStack = [
  { name: 'React', icon: 'mdi:react' },
  { name: 'TypeScript', icon: 'mdi:language-typescript' },
  { name: 'Tailwind CSS', icon: 'mdi:tailwind' },
  { name: 'Next.js', icon: 'tabler:brand-nextjs' },
  { name: 'Node.js', icon: 'mdi:nodejs' },
  { name: 'Three.js', icon: 'mdi:axis-arrow' },
  { name: 'Figma', icon: 'ph:figma-logo' },
  { name: 'Vite', icon: 'file-icons:vite' },
];

// Decorative floating badges scattered around the hero text
const heroFloatingIcons = [
  { icon: 'mdi:react', className: 'top-[16%] left-[6%]', anim: 'animate-float-slow' },
  { icon: 'mdi:language-typescript', className: 'top-[22%] right-[8%]', anim: 'animate-float-fast' },
  { icon: 'ph:figma-logo', className: 'bottom-[26%] left-[11%]', anim: 'animate-float-medium' },
  { icon: 'mdi:nodejs', className: 'top-[54%] right-[3%]', anim: 'animate-float-slow' },
];

const expertiseItems = [
  {
    index: '01',
    icon: 'ph:layout-light',
    title: 'Frontend Development',
    desc: 'Xây dựng giao diện web mượt mà, tối ưu UX/UI với React ecosystem. Focus vào tiểu tiết và performance.',
  },
  {
    index: '02',
    icon: 'ph:cube-transparent-light',
    title: 'Creative 3D Web',
    desc: 'Tích hợp mô hình 3D, WebGL và các hiệu ứng cuộn tương tác để tạo ra trải nghiệm web độc đáo và cao cấp.',
  },
  {
    index: '03',
    icon: 'ph:devices-light',
    title: 'Responsive Design',
    desc: 'Đảm bảo website hoạt động hoàn hảo trên mọi thiết bị từ di động đến màn hình lớn cực rộng.',
  },
];

const featuredProjects = [
  {
    index: '01',
    title: 'E-Commerce Platform',
    desc: 'Nền tảng thương mại điện tử với trải nghiệm mua sắm siêu tốc, tích hợp giỏ hàng và thanh toán mượt mà.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    slug: 'e-commerce',
    image: '/images/project-ecommerce.jpg',
    badge: { icon: 'mdi:react', label: 'React' },
  },
  {
    index: '02',
    title: 'Dashboard Analytics',
    desc: 'Giao diện quản trị dữ liệu phức tạp được thiết kế trực quan, dễ nhìn với các biểu đồ tương tác thời gian thực.',
    tech: ['Next.js', 'Recharts', 'Tailwind'],
    slug: 'dashboard-analytics',
    image: '/images/project-dashboard.jpg',
    badge: { icon: 'tabler:brand-nextjs', label: 'Next.js' },
  },
];

/** Reveals a single word's opacity across a slice of a shared scroll-progress MotionValue. */
function RevealWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="inline-block">
        {word}
      </motion.span>{' '}
    </>
  );
}

function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.25'],
  });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <RevealWord key={i} word={word} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </p>
  );
}

/** Small mouse-driven 3D tilt wrapper — used on the project thumbnails for a foreground-depth feel. */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
  }
  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ExpertiseRow({ item, idx }: { item: (typeof expertiseItems)[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.5'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className={`relative overflow-hidden flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-8 md:py-10 ${
        idx !== expertiseItems.length - 1 ? 'border-b border-black/8 dark:border-white/10' : ''
      }`}
    >
      {/* Watermark icon for background depth */}
      <Icon
        icon={item.icon}
        className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-[140px] text-slate-900/[0.03] dark:text-white/[0.03] pointer-events-none"
      />

      <span className="relative text-3xl md:text-4xl font-bold text-slate-900/8 dark:text-white/15 w-16 shrink-0">
        {item.index}
      </span>
      <div className="relative w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 shrink-0">
        <Icon icon={item.icon} className="text-3xl" />
      </div>
      <div className="relative">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.94]);

  // Whole-page scroll progress drives a subtle parallax on the ambient background for depth
  const { scrollYProgress: pageProgress } = useScroll();
  const bgY = useTransform(pageProgress, [0, 1], [0, 160]);

  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ['start 0.85', 'start 0.35'],
  });
  const ctaScale = useTransform(ctaProgress, [0, 1], [0.85, 1]);
  const ctaOpacity = useTransform(ctaProgress, [0, 1], [0, 1]);

  return (
    <div className="w-full relative">
      {/* Background ambient light — drifts slightly with scroll for a sense of depth */}
      <motion.div
        style={{ y: bgY }}
        className="fixed inset-0 pointer-events-none bg-ambient-gradients -z-10"
      />

      {/* 1. OPENING / MANIFESTO */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] md:min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Foreground floating icon badges — visible at every screen size, scaled down on mobile */}
        {heroFloatingIcons.map((item, i) => (
          <div
            key={i}
            className={`flex absolute w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl glass-card elevate-sm items-center justify-center text-blue-600 dark:text-blue-400 text-base md:text-2xl pointer-events-none z-0 ${item.className} ${item.anim}`}
          >
            <Icon icon={item.icon} />
          </div>
        ))}

        {/* Mini mock browser window — decorative, no real screenshot needed yet */}
        <div className="hidden sm:block absolute bottom-6 sm:bottom-10 right-[3%] perspective-1000 pointer-events-none z-0">
          <div
            className="w-40 sm:w-56 preserve-3d glass-card elevate-md rounded-xl p-3 sm:p-4 animate-float-medium"
            style={{ transform: 'rotateY(-10deg) rotateX(6deg)' }}
          >
            <div className="flex gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="space-y-2">
              <div className="h-2 rounded bg-blue-500/30 w-3/4" />
              <div className="h-2 rounded bg-slate-900/10 dark:bg-white/10 w-full" />
              <div className="h-2 rounded bg-slate-900/10 dark:bg-white/10 w-5/6" />
              <div className="h-2 rounded bg-blue-500/20 w-2/3" />
            </div>
          </div>
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          <motion.p
            initial="hidden" animate="visible" custom={0.1} variants={fadeUp}
            className="text-blue-600 dark:text-blue-500 font-medium text-sm md:text-base mb-6 tracking-wider uppercase"
          >
            Ready to Innovate
          </motion.p>

          <motion.h1
            initial="hidden" animate="visible" custom={0.2} variants={fadeUp}
            className="hero-title text-slate-900 dark:text-white mb-2"
          >
            THANH HẢI
          </motion.h1>

          <motion.h2
            initial="hidden" animate="visible" custom={0.35} variants={fadeUp}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 mb-6 tracking-tight"
          >
            WEB DEVELOPER
          </motion.h2>

          <motion.p
            initial="hidden" animate="visible" custom={0.5} variants={fadeUp}
            className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
          >
            Sáng tạo những trải nghiệm số hiện đại. Biến ý tưởng thành các website tương tác cao, tinh tế và tối ưu hiệu năng.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" custom={0.65} variants={fadeUp}
            className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-4"
          >
            <Link
              to="/projects"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2"
            >
              Xem Dự Án
              <Icon icon="ph:arrow-right-bold" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-transparent border border-black/10 dark:border-white/20 hover:border-black/25 dark:hover:border-white/50 text-slate-900 dark:text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 elevate-sm dark:shadow-none"
            >
              Liên Hệ
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. BỐI CẢNH / GIỚI THIỆU */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          <div className="shrink-0 w-16 h-16 rounded-full glass-card elevate-sm flex items-center justify-center">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">TH</span>
          </div>
          <ScrollRevealText
            text="Tôi là một web developer tập trung vào việc kết hợp kỹ thuật vững chắc với thẩm mỹ tinh tế. Mỗi dự án là một cơ hội để biến những ý tưởng phức tạp thành trải nghiệm đơn giản, mượt mà và đáng nhớ cho người dùng."
            className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed md:leading-snug text-slate-900 dark:text-white tracking-tight text-center md:text-left"
          />
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <section className="py-10 border-y border-black/6 dark:border-white/5 bg-slate-50/70 dark:bg-black/20 backdrop-blur-md overflow-hidden relative z-10">
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-[marquee_40s_linear_infinite]">
            {techStack.map((tech, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 group">
                <Icon icon={tech.icon} className="text-4xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                <span className="font-medium text-lg whitespace-nowrap">{tech.name}</span>
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-[marquee_40s_linear_infinite]" aria-hidden="true">
            {techStack.map((tech, i) => (
              <li key={`clone-${i}`} className="flex items-center gap-3 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 group">
                <Icon icon={tech.icon} className="text-4xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                <span className="font-medium text-lg whitespace-nowrap">{tech.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. DỰ ÁN NỔI BẬT — STICKY STORYTELLING */}
      <section className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-blue-600 dark:text-blue-500 font-medium text-sm tracking-wider uppercase mb-2">Selected Works</h3>
            <h2 className="section-title text-slate-900 dark:text-white">Dự Án <br />Nổi Bật</h2>
          </motion.div>

          <div className="flex flex-col gap-24 md:gap-40">
            {featuredProjects.map((project) => (
              <div
                key={project.slug}
                className="relative flex flex-col md:flex-row gap-8 lg:gap-16 md:min-h-[160vh]"
              >
                {/* Image / Thumbnail — sticky while text scrolls past, tilts slightly with the cursor */}
                <div className="w-full md:w-3/5 md:sticky md:top-28 h-[50vh] md:h-[70vh] relative">
                  <TiltCard className="w-full h-full rounded-2xl overflow-hidden glass-card elevate-md relative aspect-video group">
                    <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <div className="w-full h-full bg-slate-100/60 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-600">
                      <Icon icon="ph:image-light" className="text-6xl opacity-30 dark:opacity-20" />
                      <span className="absolute bottom-4 text-xs tracking-widest opacity-60 dark:opacity-50 uppercase">Placeholder cho ảnh ({project.slug})</span>
                    </div>
                  </TiltCard>

                  {/* Overlapping tech badge for layered depth */}
                  <div className="absolute -top-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl glass-card elevate-md z-20">
                    <Icon icon={project.badge.icon} className="text-xl text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">{project.badge.label}</span>
                  </div>
                </div>

                {/* Info */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full md:w-2/5 flex flex-col justify-center"
                >
                  <span className="text-3xl md:text-4xl font-bold text-slate-900/8 dark:text-white/10 mb-3">{project.index}</span>
                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">{project.desc}</p>

                  <ul className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, i) => (
                      <li key={i} className="px-3 py-1 bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
                  >
                    Xem Chi Tiết
                    <Icon icon="ph:arrow-right-light" className="transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CHUYÊN MÔN */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-black/40 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-blue-600 dark:text-blue-500 font-medium text-sm tracking-wider uppercase mb-2">Chuyên Môn</h3>
            <h2 className="section-title text-slate-900 dark:text-white">Tôi có thể <br className="md:hidden" />làm gì?</h2>
          </motion.div>

          <div className="flex flex-col border-t border-black/8 dark:border-white/10">
            {expertiseItems.map((item, idx) => (
              <ExpertiseRow key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section ref={ctaRef} className="py-32 px-6 md:px-12 lg:px-24 text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-900/10 blur-[120px] rounded-full max-w-3xl mx-auto -z-10 pointer-events-none" />
        <motion.div
          style={{ scale: ctaScale, opacity: ctaOpacity }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Sẵn sàng cho <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">Dự án mới?</span>
          </h2>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 font-bold rounded-full text-lg transition-all duration-300 group elevate-lg"
          >
            Trò chuyện ngay
            <Icon icon="ph:paper-plane-right-fill" className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
