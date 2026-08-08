interface EyebrowProps {
  children: React.ReactNode;
  as?: 'p' | 'h3';
  className?: string;
}

/** Small tracked-out uppercase label used above section headings site-wide. */
export default function Eyebrow({ children, as = 'h3', className = '' }: EyebrowProps) {
  const Tag = as;
  return (
    <Tag
      className={`text-blue-600 dark:text-blue-500 font-medium text-sm tracking-wider uppercase ${className}`}
    >
      {children}
    </Tag>
  );
}
