import { useState } from 'react';
import { Icon } from '@iconify/react';

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
}

export default function CopyButton({ text, label = 'Sao chép', copiedLabel = 'Đã sao chép!' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
        transition-all duration-200
        ${copied
          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
          : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-black/[0.06] dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
        }
      `}
      aria-label={copied ? copiedLabel : label}
    >
      <Icon
        icon={copied ? 'mdi:check-circle' : 'mdi:content-copy'}
        className="w-3.5 h-3.5"
      />
      {copied ? copiedLabel : label}
    </button>
  );
}
