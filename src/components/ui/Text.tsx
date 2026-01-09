import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  variant?: 'large' | 'medium' | 'small';
  as?: 'p' | 'span';
  className?: string;
}

export default function Text({
  children,
  variant = 'large',
  as = 'p',
  className = '',
}: TextProps) {
  const variants = {
    large: 'text-base sm:text-lg',
    medium: 'text-base',
    small: 'text-sm',
  };

  return as == 'p' ? (
    <p className={`${variants[variant]} ${className}`}>{children}</p>
  ) : (
    <span className={`${variants[variant]} ${className}`}>{children}</span>
  );
}
