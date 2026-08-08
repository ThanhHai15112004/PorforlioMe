import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import TerminalWindow from '../components/contact/TerminalWindow';
import ContactForm from '../components/contact/ContactForm';
import CopyButton from '../components/contact/CopyButton';
import FaqAccordion from '../components/contact/FaqAccordion';

// ─── Config — thay bằng thông tin thật ──────────────────────────────────────
const CONTACT_EMAIL = 'thanhhai.dev@gmail.com';
const GITHUB_URL = 'https://github.com/ThanhHai15112004';
const LINKEDIN_URL = '#';

// ─── Quick message suggestions ──────────────────────────────────────────────
const QUICK_SUGGESTIONS = [
  'Xin chào, tôi đang cần xây dựng một hệ thống quản lý và muốn trao đổi thêm về giải pháp.',
  'Tôi đang tìm một Laravel Developer cho dự án kéo dài khoảng ba tháng.',
  'Tôi muốn trao đổi về cách tối ưu hiệu suất cho hệ thống Laravel hiện tại.',
  'Tôi có cơ hội việc làm phù hợp và muốn kết nối với bạn.',
];

// ─── Shared easing ──────────────────────────────────────────────────────────
const easeOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay, ease: easeOut },
  }),
};

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      className="mb-10"
    >
      <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">{label}</p>
      <h2
        className="font-extrabold text-slate-900 dark:text-white leading-tight"
        style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontFamily: "'Inter', sans-serif" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

export default function Contact() {
  const [prefillMsg, setPrefillMsg] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const handleSuggestion = (text: string) => {
    setPrefillMsg(text);
    // Cuộn lên form
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="w-full overflow-hidden">

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Invitation copy */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <motion.p
                variants={fadeUp} initial="hidden" animate="visible" custom={0.05}
                className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-widest uppercase"
              >
                Let's Connect
              </motion.p>

              <motion.h1
                variants={fadeUp} initial="hidden" animate="visible" custom={0.12}
                className="font-extrabold text-slate-900 dark:text-white leading-tight"
                style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontFamily: "'Inter', sans-serif" }}
              >
                Bạn có một ý tưởng?{' '}
                <span className="text-blue-600 dark:text-blue-400">Hãy cùng biến nó thành sản phẩm thực tế.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                className="text-slate-500 dark:text-slate-500 text-lg leading-relaxed max-w-lg"
              >
                Tôi luôn sẵn sàng trao đổi về dự án, cơ hội hợp tác hoặc những ý tưởng công nghệ thú vị.
              </motion.p>

              {/* Availability badge */}
              <motion.div
                variants={fadeUp} initial="hidden" animate="visible" custom={0.28}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full w-fit"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400 font-mono">
                  Currently available for selected projects
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeUp} initial="hidden" animate="visible" custom={0.36}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/40 transition-all duration-300"
                >
                  Gửi lời nhắn
                  <Icon icon="mdi:arrow-down" className="w-4 h-4" />
                </button>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300"
                >
                  Xem dự án
                </Link>
              </motion.div>
            </div>

            {/* Right: Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
              className="order-1 lg:order-2"
            >
              <TerminalWindow />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. CONTACT INFO + FORM ────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

            {/* Left: Info panel (2/5) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
              >
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-widest uppercase mb-6">
                  Liên hệ
                </p>

                {/* Availability card */}
                <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-black/[0.06] dark:border-white/10 p-5 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Sẵn sàng hợp tác</span>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {[
                      'Dự án Laravel và React',
                      'Hệ thống quản lý và LMS',
                      'Tối ưu hiệu suất ứng dụng',
                      'Tư vấn kiến trúc hệ thống',
                      'Cơ hội việc làm phù hợp',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Icon icon="mdi:check-circle" className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Email */}
                <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-black/[0.06] dark:border-white/10 p-5 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon icon="mdi:email-outline" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Email</span>
                  </div>
                  <p className="font-mono text-slate-800 dark:text-slate-100 font-medium text-sm mb-3 break-all">
                    {CONTACT_EMAIL}
                  </p>
                  <div className="flex gap-2">
                    <CopyButton text={CONTACT_EMAIL} label="Sao chép email" />
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Icon icon="mdi:send-outline" className="w-3.5 h-3.5" />
                      Gửi email
                    </a>
                  </div>
                </div>

                {/* Social links */}
                <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-black/[0.06] dark:border-white/10 p-5">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-3">
                    Kết nối
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                    >
                      <Icon icon="mdi:github" className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">GitHub</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">ThanhHai15112004</p>
                      </div>
                      <Icon icon="mdi:arrow-top-right" className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </a>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                    >
                      <Icon icon="mdi:linkedin" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">LinkedIn</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">Cập nhật sớm</p>
                      </div>
                      <Icon icon="mdi:arrow-top-right" className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Form (3/5) */}
            <motion.div
              ref={formRef}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp} custom={0.1}
              className="lg:col-span-3 bg-white dark:bg-white/[0.03] rounded-2xl border border-black/[0.06] dark:border-white/10 p-7 shadow-sm"
            >
              <h2
                className="font-bold text-slate-900 dark:text-white mb-6"
                style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontFamily: "'Inter', sans-serif" }}
              >
                Gửi lời nhắn
              </h2>
              <ContactForm
                prefillMessage={prefillMsg}
                onPrefillUsed={() => setPrefillMsg('')}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. QUICK SUGGESTIONS ─────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
          >
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
              Gợi ý
            </p>
            <h3
              className="font-bold text-slate-900 dark:text-white mb-6"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(18px, 2.5vw, 26px)' }}
            >
              Bạn chưa biết bắt đầu như thế nào?
            </h3>
            <div className="flex flex-wrap gap-3">
              {QUICK_SUGGESTIONS.map((s, i) => (
                <motion.button
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i * 0.07}
                  onClick={() => handleSuggestion(s)}
                  className="text-left px-4 py-3 rounded-xl border border-black/[0.08] dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 text-sm hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-200 max-w-sm"
                >
                  <Icon icon="mdi:lightning-bolt" className="w-4 h-4 text-blue-400 inline mr-1.5 mb-0.5" />
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. RESPONSE PROCESS ──────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Quy trình" title="Sau khi bạn gửi tin nhắn" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', icon: 'mdi:email-open-outline', title: 'Tiếp nhận', desc: 'Tôi sẽ đọc và xem xét nội dung bạn gửi trong vòng 24–48 giờ làm việc.' },
              { num: '02', icon: 'mdi:message-reply-outline', title: 'Phản hồi', desc: 'Nếu dự án phù hợp, tôi sẽ phản hồi để trao đổi chi tiết hơn về yêu cầu.' },
              { num: '03', icon: 'mdi:handshake-outline', title: 'Thống nhất', desc: 'Hai bên sẽ thống nhất phạm vi, thời gian và phương thức làm việc cụ thể.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp} custom={i * 0.1}
                className="bg-white dark:bg-white/[0.03] rounded-2xl border border-black/[0.06] dark:border-white/10 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-black text-2xl text-slate-100 dark:text-white/10 font-mono select-none" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {step.num}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                    <Icon icon={step.icon} className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {step.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Câu hỏi" title="Câu hỏi thường gặp" />
          <FaqAccordion />
        </div>
      </section>

      {/* ── 6. SECONDARY CTA ─────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03] border-t border-black/[0.06] dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-slate-400 dark:text-slate-500 text-sm">Chưa sẵn sàng gửi tin nhắn?</p>
            <h3
              className="font-extrabold text-slate-900 dark:text-white leading-tight"
              style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontFamily: "'Inter', sans-serif" }}
            >
              Hãy xem những dự án tôi đã xây dựng trước.
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
              Bạn có thể xem các dự án tôi đã thực hiện để hiểu rõ hơn về cách tôi làm việc.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white font-bold text-sm rounded-full hover:bg-blue-600 transition-all duration-300"
              >
                Xem tất cả dự án
                <Icon icon="mdi:arrow-right" className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 font-bold text-sm rounded-full border border-black/[0.1] dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
              >
                Tìm hiểu về tôi
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
