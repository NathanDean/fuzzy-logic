import cn from '@/utils/style/cn';

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export default function Main({ children, className }: MainProps) {
  return (
    <main
      className={`${cn('flex min-h-screen flex-grow flex-col items-center justify-center px-7 pt-25 lg:pb-20', className)}`}
    >
      {children}
    </main>
  );
}
