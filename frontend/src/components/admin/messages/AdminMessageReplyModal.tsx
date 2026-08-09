import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang, pick } from '../../../lib/i18n';
import type { AdminMockMessage } from '../../../constants';

interface AdminMessageReplyModalProps {
  isOpen: boolean;
  message: AdminMockMessage | null;
  onClose: () => void;
  onSendSuccess: () => void;
}

// Modal Soạn Thảo & Gửi Email Trả Lời Trực Tiếp Cho Khách Hàng
export default function AdminMessageReplyModal({
  isOpen,
  message,
  onClose,
  onSendSuccess,
}: AdminMessageReplyModalProps) {
  const { lang } = useLang();

  const [subject, setSubject] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Điền tự động thông tin tiêu đề mail khi chọn tin nhắn
  useEffect(() => {
    if (message) {
      setSubject(`Re: ${message.subject}`);
      setReplyBody(
        lang === 'vi'
          ? `Chào ${message.name},\n\nCảm ơn bạn đã liên hệ với Hải. Về vấn đề "${message.subject}", Hải xin phản hồi như sau:\n\n`
          : `Hi ${message.name},\n\nThank you for reaching out. Regarding "${message.subject}", here is my response:\n\n`
      );
    }
  }, [message, lang, isOpen]);

  if (!isOpen || !message) return null;

  const handleSend = () => {
    if (!replyBody.trim()) return;
    setIsSending(true);

    // Giả lập hiệu ứng gửi email qua API backend trong 800ms
    setTimeout(() => {
      setIsSending(false);
      onSendSuccess();
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop mờ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Khung Modal Soạn Thảo Mail */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white dark:bg-[#0D0F17] rounded-3xl border border-black/[0.07] dark:border-white/10 shadow-2xl overflow-hidden z-10 my-8 flex flex-col"
        >
          {/* Header Modal */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/50 dark:border-blue-800/40">
                <Icon icon="ant-design:send-outlined" className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {pick(lang, 'Gửi email trả lời', 'Reply via Email')}
                </h3>
                <p className="text-[11px] text-slate-400 truncate max-w-xs">
                  {message.email}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
            >
              <Icon icon="ant-design:close-outlined" className="w-4 h-4" />
            </button>
          </div>

          {/* Form Soạn Email */}
          <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Người nhận */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 text-xs">
              <span className="font-semibold text-slate-500 w-16 shrink-0">
                {pick(lang, 'Gửi tới:', 'To:')}
              </span>
              <span className="font-bold text-slate-900 dark:text-white truncate">
                {message.name} &lt;{message.email}&gt;
              </span>
            </div>

            {/* Tiêu đề Mail */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Tiêu đề Email (*)', 'Email Subject (*)')}
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* Nội dung Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {pick(lang, 'Nội dung phản hồi (*)', 'Message Body (*)')}
              </label>
              <textarea
                rows={6}
                required
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-500 transition-all leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Footer Modal */}
          <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all"
            >
              {pick(lang, 'Hủy bỏ', 'Cancel')}
            </button>

            <button
              type="button"
              onClick={handleSend}
              disabled={isSending}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-60"
            >
              {isSending ? (
                <>
                  <Icon icon="ant-design:loading-outlined" className="w-4 h-4 animate-spin" />
                  <span>{pick(lang, 'Đang gửi mail...', 'Sending...')}</span>
                </>
              ) : (
                <>
                  <Icon icon="ant-design:send-outlined" className="w-4 h-4" />
                  <span>{pick(lang, 'Gửi Email', 'Send Email')}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
