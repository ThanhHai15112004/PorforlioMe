import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium text-sm transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20',
    secondary: 'bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
