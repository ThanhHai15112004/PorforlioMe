import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import FloatingImage from '../components/about/FloatingImage';
import ProcessTimeline from '../components/about/ProcessTimeline';

// ─── Shared easing ─────────────────────────────────────────────────────────
const easeOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay, ease: easeOut },
  }),
};

// ─── Static Data ────────────────────────────────────────────────────────────

const QUICK_INFO = [
  { label: 'Vai trò', value: 'Full-stack Developer', icon: 'mdi:code-braces', span: 'col-span-2 sm:col-span-1' },
  { label: 'Chuyên môn', value: 'Laravel · React · System', icon: 'mdi:layers-outline', span: 'col-span-2 sm:col-span-1' },
  { label: 'Lĩnh vực', value: 'LMS, Backend Architecture, DevOps, Observability', icon: 'mdi:domain', span: 'col-span-2' },
  { label: 'Định hướng', value: 'Xây dựng hệ thống ổn định và có khả năng mở rộng', icon: 'mdi:compass-outline', span: 'col-span-2 sm:col-span-1' },
  { label: 'Ngôn ngữ', value: 'Tiếng Việt · English (Technical)', icon: 'mdi:translate', span: 'col-span-2 sm:col-span-1' },
];

const EXPERTISE = [
  {
    title: 'Backend Development',
    icon: 'mdi:server-outline',
    desc: 'Xây dựng API, xử lý nghiệp vụ, phân quyền, queue, cache, bảo mật và tối ưu hiệu suất hệ thống.',
    tech: ['Laravel', 'PHP', 'Redis', 'MySQL', 'SQL Server', 'Queue'],
  },
  {
    title: 'Frontend Development',
    icon: 'mdi:monitor-shimmer',
    desc: 'Xây dựng giao diện quản trị và người dùng rõ ràng, responsive, dễ thao tác và đồng bộ với nghiệp vụ.',
    tech: ['React', 'TypeScript', 'InertiaJS', 'Ant Design', 'JavaScript'],
  },
  {
    title: 'System Architecture',
    icon: 'mdi:sitemap-outline',
    desc: 'Tổ chức mã nguồn theo module, phân tách trách nhiệm và thiết kế hệ thống có khả năng bảo trì lâu dài.',
    tech: ['Clean Architecture', 'Repository Pattern', 'Modular Monolith', 'REST API'],
  },
  {
    title: 'DevOps & Vận hành',
    icon: 'mdi:kubernetes',
    desc: 'Đóng gói ứng dụng, triển khai môi trường, theo dõi log, metrics và sức khỏe hệ thống.',
    tech: ['Docker', 'Nginx', 'AWS S3', 'Grafana', 'OpenTelemetry', 'Loki'],
  },
];

const PRINCIPLES = [
  {
    title: 'Không làm phức tạp khi chưa cần thiết',
    desc: 'Giải pháp cần phù hợp với quy mô và bài toán, không nên áp dụng công nghệ chỉ vì nó mới hoặc phổ biến.',
    icon: 'mdi:puzzle-check-outline',
  },
  {
    title: 'Không làm vỡ chức năng ổn định',
    desc: 'Mọi thay đổi cần được đánh giá phạm vi ảnh hưởng trước khi triển khai vào hệ thống hiện tại.',
    icon: 'mdi:shield-check-outline',
  },
  {
    title: 'Ưu tiên khả năng bảo trì',
    desc: 'Code cần rõ ràng, dễ hiểu và dễ phát triển cho cả người viết lẫn các thành viên khác.',
    icon: 'mdi:wrench-cog-outline',
  },
  {
    title: 'Tập trung vào trải nghiệm thực tế',
    desc: 'Một chức năng tốt không chỉ chạy đúng, mà còn phải dễ sử dụng và giải quyết đúng vấn đề.',
    icon: 'mdi:account-heart-outline',
  },
  {
    title: 'Đo lường trước khi tối ưu',
    desc: 'Hiệu suất nên được cải thiện dựa trên dữ liệu, không dựa hoàn toàn vào cảm giác.',
    icon: 'mdi:chart-bar-outline',
  },
];

const JOURNEY = [
  {
    step: '01',
    title: 'Bắt đầu với Web Development',
    desc: 'Học và xây dựng các website cơ bản, làm quen với PHP, JavaScript và cơ sở dữ liệu.',
  },
  {
    step: '02',
    title: 'Phát triển với Laravel',
    desc: 'Xây dựng các hệ thống quản lý, API và nghiệp vụ backend bằng Laravel.',
  },
  {
    step: '03',
    title: 'Mở rộng sang React',
    desc: 'Phát triển giao diện quản trị và trải nghiệm người dùng với React và các thư viện frontend hiện đại.',
  },
  {
    step: '04',
    title: 'Hệ thống quy mô lớn hơn',
    desc: 'Tham gia xây dựng LMS, hệ thống thi, video streaming, quản lý nội dung và dữ liệu lớn.',
  },
  {
    step: '05',
    title: 'DevOps & Kiến trúc hệ thống',
    desc: 'Tìm hiểu Docker, CI/CD, AWS, observability và cách tổ chức hệ thống có khả năng mở rộng.',
  },
];

const TECH_GROUPS = [
  {
    label: 'Backend',
    items: ['PHP', 'Laravel', 'REST API', 'Redis', 'Queue', 'MySQL', 'SQL Server'],
  },
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'InertiaJS', 'Ant Design', 'JavaScript', 'HTML/CSS'],
  },
  {
    label: 'DevOps',
    items: ['Docker', 'Nginx', 'GitLab CI/CD', 'AWS S3', 'Grafana', 'Prometheus', 'OpenTelemetry'],
  },
  {
    label: 'Media & Hệ thống',
    items: ['FFmpeg', 'HLS', 'Video.js', 'WebSocket', 'Object Storage'],
  },
];

const KEY_EXPERIENCE = [
  { icon: 'mdi:school-outline', title: 'Hệ thống quản lý đào tạo', desc: 'Phát triển và tối ưu các module khóa học, học viên, giảng viên, kỳ thi và báo cáo.' },
  { icon: 'mdi:video-outline', title: 'Xử lý video HLS', desc: 'Xây dựng quy trình chuyển đổi và phát video HLS bằng FFmpeg, queue và adaptive bitrate.' },
  { icon: 'mdi:folder-multiple-outline', title: 'Quản lý nội dung', desc: 'Thiết kế hệ thống thư mục, tài liệu, phân quyền và kiểm tra dữ liệu đang được sử dụng.' },
  { icon: 'mdi:lightning-bolt-circle', title: 'Hiệu suất hệ thống', desc: 'Tối ưu truy vấn, cache, queue, API và thời gian phản hồi của ứng dụng.' },
  { icon: 'mdi:monitor-dashboard', title: 'Giám sát vận hành', desc: 'Tích hợp log, metrics và dashboard để theo dõi trạng thái hệ thống.' },
];

// ─── Shared Section Header ──────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      className="mb-12"
    >
      <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">{label}</p>
      <h2
        className="font-extrabold text-slate-900 dark:text-white leading-tight"
        style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontFamily: "'Inter', sans-serif" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function About() {
  return (
    <div className="w-full overflow-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Content */}
            <div className="flex flex-col gap-7 order-2 lg:order-1">
              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.05}
                className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-widest uppercase">
                About Me
              </motion.p>

              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.12}
                className="font-extrabold text-slate-900 dark:text-white leading-tight"
                style={{ fontSize: 'clamp(32px, 5vw, 62px)', fontFamily: "'Inter', sans-serif" }}>
                Tôi xây dựng những hệ thống{' '}
                <span className="text-blue-600 dark:text-blue-400">ổn định, rõ ràng</span>{' '}
                và có giá trị thực tế.
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                className="text-slate-500 dark:text-slate-500 text-lg leading-relaxed max-w-lg">
                Lập trình viên tập trung vào phát triển hệ thống quản lý, nền tảng học trực tuyến và các sản phẩm web có khả năng mở rộng.
              </motion.p>

              {/* Role badges */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.28}
                className="flex flex-wrap gap-2">
                {['Laravel Developer', 'React Developer', 'System Builder'].map((r) => (
                  <span key={r} className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-mono font-semibold rounded-full">
                    {r}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.36}
                className="flex flex-wrap gap-3">
                <Link to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/40 transition-all duration-300">
                  Xem dự án
                  <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                </Link>
                <a href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300">
                  <Icon icon="mdi:download-outline" className="w-4 h-4" />
                  Tải CV
                </a>
              </motion.div>
            </div>

            {/* Right: Floating Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
              className="order-1 lg:order-2">
              <FloatingImage className="min-h-[360px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. A LITTLE ABOUT ME ────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-widest uppercase mb-8">
            Giới thiệu
          </motion.p>
          <div className="space-y-6">
            {[
              { text: 'Tôi là một lập trình viên yêu thích việc xây dựng các hệ thống có cấu trúc rõ ràng, dễ sử dụng và có khả năng phát triển lâu dài.', delay: 0.1 },
              { text: 'Trong quá trình làm việc, tôi tập trung nhiều vào các hệ thống quản lý, nền tảng đào tạo trực tuyến, xử lý dữ liệu, video streaming, quản lý nội dung và tối ưu hiệu suất ứng dụng.', delay: 0.2 },
              { text: 'Tôi không chỉ quan tâm đến việc chức năng có hoạt động hay không, mà còn quan tâm đến cách hệ thống được tổ chức, khả năng bảo trì, trải nghiệm người dùng và mức độ ổn định khi vận hành thực tế.', delay: 0.3 },
            ].map(({ text, delay }, i) => (
              <motion.p
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} custom={delay}
                className="text-slate-700 dark:text-slate-300 leading-relaxed"
                style={{ fontSize: 'clamp(17px, 2vw, 20px)' }}>
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. QUICK INFO (Bento Grid) ──────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Thông tin" title="Thông tin nhanh" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {QUICK_INFO.map((info, i) => (
              <motion.div
                key={info.label}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} custom={i * 0.07}
                className={`
                  ${info.span} group
                  bg-slate-50 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/10 rounded-2xl p-5
                  hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-50 dark:hover:shadow-blue-950/30
                  hover:-translate-y-1 transition-all duration-300
                `}>
                <Icon icon={info.icon} className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-3" />
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-1.5">{info.label}</p>
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-relaxed">{info.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. EXPERTISE ────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Năng lực" title="Tôi tập trung vào điều gì?" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPERTISE.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} custom={i * 0.08}
                className="bg-white dark:bg-white/[0.03] rounded-2xl p-7 border border-black/[0.06] dark:border-white/10 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                    <Icon icon={item.icon} className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span key={t} className="px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-mono rounded-md">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WORK PROCESS ─────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Quy trình" title="Cách tôi tiếp cận một dự án" />
          <ProcessTimeline />
        </div>
      </section>

      {/* ── 6. WORKING PRINCIPLES ───────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Nguyên tắc" title="Những nguyên tắc tôi luôn ưu tiên" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} custom={i * 0.07}
                className="bg-white dark:bg-white/[0.03] rounded-2xl p-6 border border-black/[0.06] dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-50 dark:hover:shadow-blue-950/30 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4">
                  <Icon icon={p.icon} className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {p.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CAREER JOURNEY ───────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader label="Hành trình" title="Hành trình của tôi" />
          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div className="absolute left-[21px] top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />
            {JOURNEY.map((j, i) => (
              <motion.div
                key={j.step}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} custom={i * 0.1}
                className="relative flex gap-6 pb-10 last:pb-0">
                {/* Node */}
                <div className="shrink-0 z-10">
                  <div className="w-11 h-11 rounded-full bg-white dark:bg-white/[0.03] border-2 border-blue-600 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-black font-mono text-blue-600 dark:text-blue-400">{j.step}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="pt-2">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {j.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">{j.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. TECH STACK ───────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Công nghệ" title="Công nghệ tôi thường làm việc" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_GROUPS.map((group, i) => (
              <motion.div
                key={group.label}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} custom={i * 0.08}
                className="bg-white dark:bg-white/[0.03] rounded-2xl p-5 border border-black/[0.06] dark:border-white/10">
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest font-mono mb-4">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-mono rounded-md hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. KEY EXPERIENCE ───────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Kinh nghiệm" title="Kinh nghiệm nổi bật" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {KEY_EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} custom={i * 0.08}
                className="flex gap-4 p-5 bg-slate-50 dark:bg-white/[0.03] rounded-2xl border border-black/[0.06] dark:border-white/10 hover:border-blue-100 dark:hover:border-blue-500/20 hover:shadow-md hover:shadow-blue-50 dark:hover:shadow-blue-950/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon icon={exp.icon} className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {exp.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FUTURE DIRECTION ────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-100 dark:bg-blue-500/10 blur-[100px] opacity-50 rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="flex flex-col gap-6">
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-widest uppercase">Định hướng</p>
            <h2
              className="font-extrabold text-slate-900 dark:text-white leading-tight"
              style={{ fontSize: 'clamp(28px, 5vw, 56px)', fontFamily: "'Inter', sans-serif" }}>
              Tôi đang hướng đến điều gì?
            </h2>
          </motion.div>
          <div className="mt-8 space-y-5">
            {[
              { text: 'Tôi muốn tiếp tục phát triển theo hướng xây dựng các hệ thống web có kiến trúc rõ ràng, khả năng mở rộng tốt và vận hành ổn định.', delay: 0.15 },
              { text: 'Bên cạnh chuyên môn Laravel và React, tôi đang mở rộng kiến thức về DevOps, Cloud, observability và thiết kế kiến trúc phần mềm.', delay: 0.25 },
              { text: 'Mục tiêu của tôi không chỉ là trở thành một lập trình viên viết code tốt, mà còn có thể hiểu bài toán, thiết kế giải pháp và đồng hành cùng sản phẩm lâu dài.', delay: 0.35 },
            ].map(({ text, delay }, i) => (
              <motion.p
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} custom={delay}
                className="text-slate-600 dark:text-slate-400 leading-relaxed"
                style={{ fontSize: 'clamp(16px, 1.8vw, 19px)' }}>
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. CONTACT CTA ─────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 bg-white dark:bg-[#07080D] border-t border-black/[0.06] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="flex flex-col items-center gap-8">
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-widest uppercase">Cộng tác</p>
            <h2
              className="font-extrabold text-slate-900 dark:text-white leading-tight"
              style={{ fontSize: 'clamp(28px, 5vw, 56px)', fontFamily: "'Inter', sans-serif" }}>
              Hãy cùng xây dựng một sản phẩm có giá trị.
            </h2>
            <p className="text-slate-500 dark:text-slate-500 text-lg max-w-xl leading-relaxed">
              Tôi luôn sẵn sàng trao đổi về những ý tưởng, dự án hoặc cơ hội hợp tác phù hợp.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold text-base rounded-full hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 dark:hover:shadow-blue-900/40 transition-all duration-300 active:scale-95">
                Liên hệ với tôi
                <Icon icon="mdi:arrow-right" className="w-5 h-5" />
              </Link>
              <Link to="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold text-base rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300">
                Xem dự án
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
