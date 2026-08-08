import type { ReactNode } from 'react';
import { Icon } from '@iconify/react';

interface CardProps {
  children?: ReactNode;
  icon?: string;
  iconSize?: 'sm' | 'md';
  title?: string;
  layout?: 'stacked' | 'row';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  className?: string;
}

const PADDING = { sm: 'p-5', md: 'p-6', lg: 'p-7' };
const ICON_BOX = { sm: 'w-9 h-9', md: 'w-10 h-10' };

/** The one card style used site-wide — glass surface + optional icon badge. */
export default function Card({
  children,
  icon,
  iconSize = 'md',
  title,
  layout = 'stacked',
  padding = 'md',
  hoverable = true,
  className = '',
}: CardProps) {
  const iconBadge = icon ? (
    <div
      className={`${ICON_BOX[iconSize]} rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0`}
    >
      <Icon icon={icon} className="text-xl" />
    </div>
  ) : null;

  const content = (
    <div>
      {title && <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{title}</h3>}
      {children}
    </div>
  );

  return (
    <div
      className={`glass-card elevate-sm rounded-2xl ${PADDING[padding]} transition-all duration-300 ${
        hoverable
          ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-50 dark:hover:shadow-blue-950/30'
          : ''
      } ${className}`}
    >
      {layout === 'row' && iconBadge ? (
        <div className="flex items-start gap-4">
          {iconBadge}
          {content}
        </div>
      ) : (
        <>
          {iconBadge && <div className="mb-4">{iconBadge}</div>}
          {content}
        </>
      )}
    </div>
  );
}
