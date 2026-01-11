import { useState } from 'react';

import cn from '@/utils/style/cn';

import Button from '../../ui/Button';
import Text from '../../ui/Text';
import TurnstileWidget from './TurnstileWidget';

interface AuthFormProps {
  children: (components: {
    FormTurnstile: React.FC;
    FormButton: React.FC<{ children: React.ReactNode }>;
  }) => React.ReactNode;
  isDisabled?: boolean;
  navigationLinks?: React.ReactNode;
  onSubmit: (formData: FormData) => Promise<void>;
  errorMessage?: string;
  className?: string;
}

export default function AuthForm({
  children,
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

  const FormTurnstile = () => (
    <TurnstileWidget onSuccess={() => setIsTurnstileLoading(false)} />
  );

  const FormButton = ({
    children: buttonText,
  }: {
    children: React.ReactNode;
  }) => (
    <Button
      type="submit"
      disabled={isDisabled || isTurnstileLoading || isSubmitting}
    >
      <Text as="span">{isSubmitting ? 'Please wait...' : buttonText}</Text>
    </Button>
  );

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

      {children({ FormTurnstile, FormButton })}

      {navigationLinks}
    </form>
  );
}
