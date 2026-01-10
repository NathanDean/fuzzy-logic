import cn from '@/utils/style/cn';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function Heading({ children, className }: HeadingProps) {
  return <h1 className={cn(className)}>{children}</h1>;
}
