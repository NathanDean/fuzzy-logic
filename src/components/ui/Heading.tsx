import cn from '@/utils/style/cn';

interface HeadingProps {
  children: React.ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export default function Heading({
  children,
  variant,
  className = '',
}: HeadingProps) {
  switch (variant) {
    case 'h1':
      return <h1 className={cn(className)}>{children}</h1>;
    case 'h2':
      return <h2 className={cn(className)}>{children}</h2>;
    case 'h3':
      return <h3 className={cn(className)}>{children}</h3>;
    case 'h4':
      return <h4 className={cn(className)}>{children}</h4>;
    case 'h5':
      return <h5 className={cn(className)}>{children}</h5>;
    case 'h6':
      return <h6 className={cn(className)}>{children}</h6>;
  }
}
