import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ 
  children, 
  className = '', 
  hoverable = true 
}: CardProps) {
  return (
    <div className={`
      bg-slate-900/40 border border-slate-800 rounded-xl p-6 transition-all duration-300 backdrop-blur-sm
      ${hoverable ? 'hover:border-slate-700/80 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}
