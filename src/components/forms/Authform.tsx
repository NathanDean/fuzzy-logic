import { useState } from 'react';

import cn from '@/utils/style/cn';

import Button from '../ui/Button';
import Text from '../ui/Text';
import TurnstileWidget from './TurnstileWidget';

interface AuthFormProps {
  children: React.ReactNode;
  buttonText: string;
  usesTurnstile?: boolean;
  isDisabled?: boolean;
  navigationLinks?: React.ReactNode;
  onSubmit: (formData: FormData) => Promise<void>;
  errorMessage?: string;
  className?: string;
}

export default function AuthForm({
  children,
  buttonText,
  usesTurnstile = false,
  isDisabled,
  navigationLinks,
  onSubmit,
  errorMessage,
  className = '',
}: AuthFormProps) {
  const styles = cn(
    'grid min-w-[350px] bg-[var(--background)]/80 text-[var(--foreground)] shadow-sm rounded-2xl p-10 text-lg text-center',
    className
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
          await onSubmit(new FormData(e.currentTarget));
        } finally {
          setIsSubmitting(false);
        }
      }}
      className={styles}
    >
      {errorMessage && <p className="error">{errorMessage}</p>}

      {children}

      {usesTurnstile && (
        <TurnstileWidget onSuccess={() => setIsTurnstileLoading(false)} />
      )}

      <Button
        type="submit"
        disabled={
          isDisabled || (usesTurnstile && isTurnstileLoading) || isSubmitting
        }
      >
        <Text as="span">{isSubmitting ? 'Please wait...' : buttonText}</Text>
      </Button>
      {navigationLinks}
    </form>
  );
}
