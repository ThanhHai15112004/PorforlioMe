import { Icon } from '@iconify/react';
import { SOCIAL_LINKS } from '../../constants';
import { useLang, pick } from '../../lib/i18n';

export default function Footer() {
  const { lang } = useLang();
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/10 bg-slate-50 dark:bg-black/30 backdrop-blur-md py-8 text-center text-slate-400 dark:text-slate-500 text-sm relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-slate-600 dark:text-slate-300">Thanh Hải</span>. {pick(lang, 'Đã đăng ký bản quyền.', 'All rights reserved.')}
        </p>
        <div className="flex gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.platform}
              className="w-9 h-9 rounded-full glass-card elevate-sm flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Icon icon={link.icon} className="text-lg" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
