import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import TerminalWindow from '../components/contact/TerminalWindow';
import ContactForm from '../components/contact/ContactForm';
import CopyButton from '../components/contact/CopyButton';
import FaqAccordion from '../components/contact/FaqAccordion';
import { easeOut, fadeUp, revealViewport } from '../lib/motion';
import { useLang, pick } from '../lib/i18n';
import Eyebrow from '../components/common/Eyebrow';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import RoleSlider from '../components/common/RoleSlider';
import { SOCIAL_LINKS } from '../constants';
import {
  CONTACT_EMAIL,
  QUICK_SUGGESTIONS,
  AVAILABILITY_ITEMS,
  RESPONSE_PROCESS,
  CONTACT_ROLE_SLIDES,
  CONTACT_TEXT,
} from '../constants/contact';

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      className="mb-10"
    >
      <Eyebrow as="p" className="mb-3">{label}</Eyebrow>
      <h2
        className="font-extrabold text-slate-900 dark:text-white leading-tight"
        style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontFamily: "'Inter', sans-serif" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

export default function Contact() {
  const { lang } = useLang();
  const t = CONTACT_TEXT[lang];
  const [prefillMsg, setPrefillMsg] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const roleSlides = CONTACT_ROLE_SLIDES.map((s) => ({
    title: pick(lang, s.title.vi, s.title.en),
    subtitle: pick(lang, s.subtitle.vi, s.subtitle.en),
  }));

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
                className="text-blue-600 dark:text-blue-500 font-medium text-sm tracking-wider uppercase"
              >
                {t.heroEyebrow}
              </motion.p>

              <motion.h1
                variants={fadeUp} initial="hidden" animate="visible" custom={0.12}
                className="font-extrabold text-slate-900 dark:text-white leading-tight"
                style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: "'Inter', sans-serif" }}
              >
                {t.heroTitle}{' '}
                <span className="text-blue-600 dark:text-blue-400">{t.heroTitleHighlight}</span>
              </motion.h1>

              <motion.p
                variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg"
              >
                {t.heroSubtitle}
              </motion.p>

              {/* Availability badge */}
              <motion.div
                variants={fadeUp} initial="hidden" animate="visible" custom={0.28}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full w-fit"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400 font-mono">
                  {t.availabilityBadge}
                </span>
              </motion.div>

              {/* Role slider — đồng bộ hiệu ứng với Home/About */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.32}>
                <RoleSlider
                  slides={roleSlides}
                  titleClassName="text-blue-600 dark:text-blue-400 font-bold text-base"
                  subtitleClassName="text-slate-500 dark:text-slate-400 text-sm mt-1"
                />
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeUp} initial="hidden" animate="visible" custom={0.36}
                className="flex flex-wrap gap-3"
              >
                <Button
                  variant="primary" size="sm"
                  onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  {t.ctaSend}
                  <Icon icon="mdi:arrow-down" className="w-4 h-4" />
                </Button>
                <Button to="/projects" variant="secondary" size="sm">
                  {t.ctaProjects}
                </Button>
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
                initial="hidden" whileInView="visible" viewport={revealViewport}
                variants={fadeUp}
                className="flex flex-col gap-4"
              >
                <Eyebrow as="p">{t.infoEyebrow}</Eyebrow>

                {/* Availability card */}
                <Card padding="sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{t.availabilityTitle}</span>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {AVAILABILITY_ITEMS.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Icon icon="mdi:check-circle" className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {pick(lang, item.vi, item.en)}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Email */}
                <Card padding="sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon icon="mdi:email-outline" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.emailLabel}</span>
                  </div>
                  <p className="font-mono text-slate-800 dark:text-slate-100 font-medium text-sm mb-3 break-all">
                    {CONTACT_EMAIL}
                  </p>
                  <div className="flex gap-2">
                    <CopyButton text={CONTACT_EMAIL} label={t.copyEmail} copiedLabel={t.copied} />
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Icon icon="mdi:send-outline" className="w-3.5 h-3.5" />
                      {t.sendEmail}
                    </a>
                  </div>
                </Card>

                {/* Kết nối trực tiếp — social links thật */}
                <Card padding="sm">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                    {t.connectLabel}
                  </p>
                  <div className="flex flex-col gap-2">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                      >
                        <Icon icon={link.icon} className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{link.platform}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">{link.handle}</p>
                        </div>
                        <Icon icon="mdi:arrow-top-right" className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </a>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Right: Form (3/5) */}
            <motion.div
              ref={formRef}
              initial="hidden" whileInView="visible" viewport={revealViewport}
              variants={fadeUp} custom={0.1}
              className="lg:col-span-3"
            >
              <Card padding="lg">
                <h2
                  className="font-bold text-slate-900 dark:text-white mb-6"
                  style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontFamily: "'Inter', sans-serif" }}
                >
                  {t.formTitle}
                </h2>
                <ContactForm
                  prefillMessage={prefillMsg}
                  onPrefillUsed={() => setPrefillMsg('')}
                />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. QUICK SUGGESTIONS ─────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={revealViewport}
            variants={fadeUp}
          >
            <Eyebrow as="p" className="mb-3">{t.suggestionsEyebrow}</Eyebrow>
            <h3
              className="font-bold text-slate-900 dark:text-white mb-6"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(16px, 2vw, 22px)' }}
            >
              {t.suggestionsTitle}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {QUICK_SUGGESTIONS.map((s, i) => (
                <motion.button
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i * 0.07}
                  onClick={() => handleSuggestion(pick(lang, s.message.vi, s.message.en))}
                  className="px-4 py-2 rounded-full border border-black/[0.08] dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 text-sm font-medium hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-200"
                >
                  {pick(lang, s.label.vi, s.label.en)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. RESPONSE PROCESS ──────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-slate-50 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label={t.processLabel} title={t.processTitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESPONSE_PROCESS.map((step, i) => (
              <motion.div
                key={step.num}
                initial="hidden" whileInView="visible" viewport={revealViewport}
                variants={fadeUp} custom={i * 0.1}
              >
                <Card padding="md">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-black text-2xl text-slate-900/10 dark:text-white/10 font-mono select-none" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                      <Icon icon={step.icon} className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {pick(lang, step.title.vi, step.title.en)}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{pick(lang, step.desc.vi, step.desc.en)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-white dark:bg-[#07080D]">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label={t.faqLabel} title={t.faqTitle} />
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
            <p className="text-slate-400 dark:text-slate-500 text-sm">{t.secondaryEyebrow}</p>
            <h3
              className="font-extrabold text-slate-900 dark:text-white leading-tight"
              style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontFamily: "'Inter', sans-serif" }}
            >
              {t.secondaryTitle}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
              {t.secondarySubtitle}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button to="/projects" variant="inverse">
                {t.secondaryCtaPrimary}
                <Icon icon="mdi:arrow-right" className="w-4 h-4" />
              </Button>
              <Button to="/about" variant="secondary">
                {t.secondaryCtaSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
