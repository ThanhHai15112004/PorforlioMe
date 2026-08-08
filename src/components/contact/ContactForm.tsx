import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLang, pick } from '../../lib/i18n';
import { CONTACT_FORM_SUBJECTS, CONTACT_FORM_TEXT } from '../../constants/contact';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData, errText: typeof CONTACT_FORM_TEXT['vi']['errors']): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = errText.name;
  if (!data.email.trim()) {
    errors.email = errText.emailRequired;
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = errText.emailInvalid;
  }
  if (!data.subject) errors.subject = errText.subject;
  if (!data.message.trim()) {
    errors.message = errText.messageRequired;
  } else if (data.message.trim().length < 20) {
    errors.message = errText.messageShort;
  }
  return errors;
}

// Props cho phép truyền nội dung từ bên ngoài (quick suggestions)
interface ContactFormProps {
  prefillMessage?: string;
  onPrefillUsed?: () => void;
}

export default function ContactForm({ prefillMessage = '', onPrefillUsed }: ContactFormProps) {
  const { lang } = useLang();
  const t = CONTACT_FORM_TEXT[lang];
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: prefillMessage,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>('idle');
  const [prevPrefill, setPrevPrefill] = useState(prefillMessage);

  // Cập nhật message khi prefill thay đổi từ bên ngoài — điều chỉnh state
  // ngay trong lúc render (mẫu chính thức của React), tránh cả lỗi đọc ref
  // lúc render lẫn setState-trong-effect gây render nối tiếp không cần thiết.
  if (prefillMessage !== prevPrefill) {
    setPrevPrefill(prefillMessage);
    if (prefillMessage) {
      setData((d) => ({ ...d, message: prefillMessage }));
      onPrefillUsed?.();
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(data, t.errors);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setFormState('submitting');
    // Mô phỏng gửi — thay bằng API call thực tế khi có backend
    try {
      await new Promise((res) => setTimeout(res, 1800));
      setFormState('success');
    } catch {
      setFormState('error');
    }
  };

  const handleReset = () => {
    setData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setFormState('idle');
  };

  // ── Input styles ─────────────────────────────────────────────────
  const inputBase = `
    w-full rounded-xl border px-4 py-3 text-sm text-slate-900 dark:text-white
    bg-white dark:bg-white/5 placeholder-slate-400 dark:placeholder-slate-500 outline-none
    transition-all duration-200
  `;
  const inputNormal = `border-black/[0.1] dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20`;
  const inputError = `border-red-400 dark:border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-500/20`;

  const fieldClass = (field: keyof FormErrors) =>
    `${inputBase} ${errors[field] ? inputError : inputNormal}`;

  // ── Success screen ────────────────────────────────────────────────
  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center text-center gap-6 py-16 px-6"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border-2 border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center">
          <Icon icon="mdi:check-circle" className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t.successTitle}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
            {t.successDesc}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            {t.sendAnother}
          </button>
        </div>
      </motion.div>
    );
  }

  // ── Main Form ─────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
            {t.nameLabel} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder={t.namePlaceholder}
            className={fieldClass('name')}
            autoComplete="name"
          />
          {errors.name && <ErrorMsg text={errors.name} />}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
            {t.emailLabel} <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder={t.emailPlaceholder}
            className={fieldClass('email')}
            autoComplete="email"
          />
          {errors.email && <ErrorMsg text={errors.email} />}
        </div>
      </div>

      {/* Row 2: Subject */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
          {t.subjectLabel} <span className="text-red-400">*</span>
        </label>
        <select
          value={data.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className={`${fieldClass('subject')} cursor-pointer`}
        >
          <option value="">{t.subjectPlaceholder}</option>
          {CONTACT_FORM_SUBJECTS.map((s) => (
            <option key={s.vi} value={s.vi}>{pick(lang, s.vi, s.en)}</option>
          ))}
        </select>
        {errors.subject && <ErrorMsg text={errors.subject} />}
      </div>

      {/* Row 3: Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
          {t.messageLabel} <span className="text-red-400">*</span>
        </label>
        <textarea
          value={data.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder={t.messagePlaceholder}
          rows={5}
          className={`${fieldClass('message')} resize-none`}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.message ? (
            <ErrorMsg text={errors.message} />
          ) : (
            <span />
          )}
          <span className={`text-xs font-mono ${data.message.length > 1500 ? 'text-red-400' : 'text-slate-400 dark:text-slate-500'}`}>
            {data.message.length}/1500
          </span>
        </div>
      </div>

      {/* Error state */}
      <AnimatePresence>
        {formState === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-sm text-red-600 dark:text-red-400"
          >
            <Icon icon="mdi:alert-circle-outline" className="w-4 h-4 shrink-0" />
            {t.errorBanner}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className={`
          w-full flex items-center justify-center gap-2 py-3.5
          font-bold text-sm rounded-full cursor-pointer
          transition-all duration-300 active:scale-[0.98]
          ${formState === 'submitting'
            ? 'bg-slate-300 dark:bg-white/10 text-slate-500 dark:text-slate-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/40'
          }
        `}
      >
        {formState === 'submitting' ? (
          <>
            <Icon icon="mdi:loading" className="w-4 h-4 animate-spin" />
            {t.submitting}
          </>
        ) : (
          <>
            {t.submitIdle}
            <Icon icon="mdi:arrow-right" className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
        {t.responseTime}
      </p>
    </form>
  );
}

function ErrorMsg({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500 dark:text-red-400">
      <Icon icon="mdi:alert-circle-outline" className="w-3.5 h-3.5 shrink-0" />
      {text}
    </p>
  );
}
