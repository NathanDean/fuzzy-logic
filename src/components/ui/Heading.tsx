import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function Heading({ children, className }: HeadingProps) {
  return <h1 className={cn(className)}>{children}</h1>;
}
