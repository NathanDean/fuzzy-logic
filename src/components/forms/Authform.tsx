import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface AuthFormProps {
  children: React.ReactNode;
  onSubmit: (formData: FormData) => Promise<void>;
  errorMessage?: string;
  className?: string;
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AuthForm({
  children,
  onSubmit,
  errorMessage,
  className = '',
}: AuthFormProps) {
  const styles = cn(
    'grid min-w-[350px] bg-[var(--background)]/80 text-[var(--foreground)] shadow-sm rounded-2xl p-10 text-lg text-center',
    className
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(new FormData(e.currentTarget));
      }}
      className={styles}
    >
      {errorMessage && <p className="error">{errorMessage}</p>}

      {children}
    </form>
  );
}
