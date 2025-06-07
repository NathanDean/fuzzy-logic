import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  imageHeight?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  imageHeight = 'lg',
}: CardProps) {
  const imageHeightClass = {
    sm: 'h-48',
    md: 'h-72',
    lg: 'h-96',
  }[imageHeight];

  return (
    <div
      className={`${className} ${imageHeightClass} h-full rounded-2xl bg-[var(--background)] text-[var(--foreground)] dark:border dark:border-gray-500 shadow-xl overflow-hidden`}
    >
      {children}
    </div>
  );
}
