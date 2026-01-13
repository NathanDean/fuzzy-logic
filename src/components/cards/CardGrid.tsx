import cn from '@/utils/style/cn';

interface CardGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3;
  className?: string;
}

export default function CardGrid({
  children,
  cols = 2,
  className = '',
}: CardGridProps) {
  return (
    <div
      className={`${cn('grid justify-items-center gap-10', `md:grid-cols-${cols}`, className)}`}
    >
      {children}
    </div>
  );
}
