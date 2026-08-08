import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = '',
  hoverable = true,
}: CardProps) {
  return (
    <div
      className={`
        bg-white border border-black/[0.06] rounded-2xl p-6
        transition-all duration-300
        ${hoverable ? 'hover:shadow-xl hover:shadow-slate-200/80 hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
