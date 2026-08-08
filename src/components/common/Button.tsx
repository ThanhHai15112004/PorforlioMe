import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsLink extends CommonProps {
  to: string;
  href?: never;
  onClick?: never;
}

interface ButtonAsAnchor extends CommonProps {
  href: string;
  to?: never;
  onClick?: never;
  target?: string;
  rel?: string;
}

interface ButtonAsButton extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  to?: never;
  href?: never;
}

type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

const SIZE = {
  sm: 'px-6 py-3 text-sm',
  md: 'px-8 py-4',
  lg: 'px-10 py-5 text-lg',
};

const VARIANT = {
  primary:
    'bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]',
  secondary:
    'bg-white dark:bg-transparent border border-black/10 dark:border-white/20 hover:border-black/25 dark:hover:border-white/50 text-slate-900 dark:text-white elevate-sm dark:shadow-none',
  inverse:
    'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 elevate-lg',
};

const BASE =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 active:scale-95';

/** The one button style used site-wide — pill CTA with primary/secondary/inverse variants. */
export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const classes = `${BASE} ${SIZE[size]} ${VARIANT[variant]} ${className}`;

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }
  if ('href' in props && props.href) {
    const { href, target, rel } = props as ButtonAsAnchor;
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }
  const { ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
