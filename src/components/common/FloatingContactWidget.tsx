import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { SOCIAL_LINKS } from '../../constants';
import { CONTACT_EMAIL } from '../../constants/contact';
import { useLang, pick } from '../../lib/i18n';

export default function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLang();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const facebookLink = SOCIAL_LINKS.find((s) => s.platform === 'Facebook')?.url || 'https://www.facebook.com/hai.15112004/';
  const zaloLink = SOCIAL_LINKS.find((s) => s.platform === 'Zalo')?.url || 'https://zalo.me/0376149975';

  const contactItems = [
    {
      id: 'facebook',
      label: pick(lang, 'Nhắn tin Facebook', 'Chat on Facebook'),
      icon: 'mdi:facebook-messenger',
      color: 'bg-[#0084FF] text-white hover:bg-[#0073E6]',
      href: facebookLink,
      target: '_blank',
    },
    {
      id: 'zalo',
      label: pick(lang, 'Chat qua Zalo', 'Chat on Zalo'),
      icon: 'simple-icons:zalo',
      color: 'bg-[#0068FF] text-white hover:bg-[#0057D9]',
      href: zaloLink,
      target: '_blank',
    },
    {
      id: 'email',
      label: pick(lang, 'Gửi Email', 'Send Email'),
      icon: 'mdi:email-outline',
      color: 'bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-900 dark:hover:bg-slate-600',
      href: `mailto:${CONTACT_EMAIL}`,
      target: '_self',
    },
  ];

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Contact Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 mb-4 items-end"
          >
            {contactItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                target={item.target}
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                {/* Tooltip Label */}
                <span className="px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-black/[0.08] dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-lg shadow-slate-200/50 dark:shadow-black/40 transition-transform group-hover:-translate-x-1">
                  {item.label}
                </span>

                {/* Round Icon Button */}
                <div
                  className={`w-12 h-12 rounded-full ${item.color} shadow-lg flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95 border border-white/20`}
                >
                  <Icon icon={item.icon} className="text-xl" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button (FAB) */}
      <div className="relative flex items-center justify-center">
        
        {/* Pulsing Aura Ripples */}
        {!isOpen && (
          <>
            {/* Outer expanding ring */}
            <motion.div
              animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-blue-500/40 dark:bg-blue-400/30 blur-xs pointer-events-none"
            />
            {/* Ping ring */}
            <span className="absolute inset-0 rounded-full bg-blue-600/30 animate-ping pointer-events-none" />
          </>
        )}

        {/* FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/40 flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 cursor-pointer z-10"
          aria-label={pick(lang, 'Liên hệ trực tiếp', 'Direct contact')}
          title={pick(lang, 'Liên hệ nhanh (Zalo, Facebook, Email)', 'Quick contact (Zalo, Facebook, Email)')}
        >
          {/* Double Icon Badge inside */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon icon="mdi:close" className="text-2xl" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center relative"
              >
                <Icon icon="mdi:forum" className="text-2xl" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Green Online Dot */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full shadow-xs animate-bounce" />
          )}
        </button>
      </div>
    </div>
  );
}
