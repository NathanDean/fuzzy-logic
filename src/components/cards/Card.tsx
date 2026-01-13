import { ReactNode } from 'react';

import cn from '@/utils/style/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`${cn('overflow-hidden rounded-2xl bg-[var(--background)]/80 text-[var(--foreground)] shadow-sm', className)}`}
    >
      {children}
    </div>
  );
}
