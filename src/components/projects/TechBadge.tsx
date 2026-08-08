interface TechBadgeProps {
  tech: string;
  size?: 'sm' | 'md';
}

export default function TechBadge({ tech, size = 'sm' }: TechBadgeProps) {
  return (
    <span
      className={`
        inline-block font-mono font-medium rounded-md
        bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400
        hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400
        transition-colors duration-200 cursor-default
        ${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
      `}
    >
      {tech}
    </span>
  );
}
