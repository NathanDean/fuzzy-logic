// CardGrid.tsx
import cn from '@/utils/style/cn';

interface CardGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3;
  className?: string;
}

// 1. Define the mapping with full strings
const numCols = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
};

export default function CardGrid({
  children,
  cols = 2,
  className = '',
}: CardGridProps) {
  return (
    <div
      className={cn(
        'grid justify-items-center gap-10',
        numCols[cols],
        className
      )}
    >
      {children}
    </div>
  );
}
