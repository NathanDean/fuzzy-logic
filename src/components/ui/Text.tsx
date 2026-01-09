import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  variant?: 'body' | 'small';
  as?: 'p' | 'span';
  className?: string;
}

export default function Text({
  children,
  variant = 'body',
  as = 'p',
  className = '',
}: TextProps) {
  const variants = {
    body: 'text-base sm:text-lg',
    small: 'text-sm',
  };

  return as == 'p' ? (
    <p className={`${variants[variant]} ${className}`}>{children}</p>
  ) : (
    <span className={`${variants[variant]} ${className}`}>{children}</span>
  );
}
