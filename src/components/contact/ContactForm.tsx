import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

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

const SUBJECTS = [
  'Hợp tác dự án',
  'Cơ hội việc làm',
  'Trao đổi kỹ thuật',
  'Yêu cầu tư vấn',
  'Khác',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Vui lòng nhập họ và tên.';
  if (!data.email.trim()) {
    errors.email = 'Vui lòng nhập địa chỉ email.';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Địa chỉ email chưa đúng định dạng.';
  }
  if (!data.subject) errors.subject = 'Vui lòng chọn chủ đề liên hệ.';
  if (!data.message.trim()) {
    errors.message = 'Vui lòng nhập nội dung tin nhắn.';
  } else if (data.message.trim().length < 20) {
    errors.message = 'Vui lòng nhập thêm thông tin để tôi có thể hiểu rõ yêu cầu.';
  }
  return errors;
}

// Props cho phép truyền nội dung từ bên ngoài (quick suggestions)
interface ContactFormProps {
  prefillMessage?: string;
  onPrefillUsed?: () => void;
}

export default function ContactForm({ prefillMessage = '', onPrefillUsed }: ContactFormProps) {
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: prefillMessage,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>('idle');
  const prevPrefill = useRef(prefillMessage);

  // Cập nhật message khi prefill thay đổi từ bên ngoài
  if (prefillMessage !== prevPrefill.current) {
    prevPrefill.current = prefillMessage;
    setData((d) => ({ ...d, message: prefillMessage }));
    onPrefillUsed?.();
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(data);
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
            Cảm ơn bạn đã liên hệ!
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
            Tin nhắn đã được gửi thành công. Tôi sẽ đọc nội dung và phản hồi sớm nhất có thể.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            Gửi tin nhắn khác
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
            Họ và tên <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Nhập tên của bạn"
            className={fieldClass('name')}
            autoComplete="name"
          />
          {errors.name && <ErrorMsg text={errors.name} />}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Nhập địa chỉ email"
            className={fieldClass('email')}
            autoComplete="email"
          />
          {errors.email && <ErrorMsg text={errors.email} />}
        </div>
      </div>

      {/* Row 2: Subject */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
          Chủ đề <span className="text-red-400">*</span>
        </label>
        <select
          value={data.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className={`${fieldClass('subject')} cursor-pointer`}
        >
          <option value="">Chọn chủ đề liên hệ</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.subject && <ErrorMsg text={errors.subject} />}
      </div>

      {/* Row 3: Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
          Nội dung <span className="text-red-400">*</span>
        </label>
        <textarea
          value={data.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Hãy chia sẻ ngắn gọn về dự án, ý tưởng hoặc nội dung bạn muốn trao đổi..."
          rows={5}
          className={`${fieldClass('message')} resize-none`}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.message ? (
            <ErrorMsg text={errors.message} />
          ) : (
            <span />
          )}
          <span className={`text-xs ${data.message.length > 1500 ? 'text-red-400' : 'text-slate-400 dark:text-slate-500'}`}>
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
            Không thể gửi tin nhắn. Vui lòng thử lại hoặc liên hệ trực tiếp qua email.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className={`
          w-full flex items-center justify-center gap-2 py-3.5
          font-bold text-sm rounded-full
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
            Đang gửi...
          </>
        ) : (
          <>
            Gửi lời nhắn
            <Icon icon="mdi:arrow-right" className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        Tôi thường phản hồi trong vòng 24–48 giờ làm việc.
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
