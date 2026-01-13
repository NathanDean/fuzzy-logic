import { useState } from 'react';

import cn from '@/utils/style/cn';

import Button from '../../ui/Button';
import Text from '../../ui/Text';

interface AuthFormProps {
  children: (components: {
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
    'grid min-w-[350px] space-y-2 rounded-2xl bg-[var(--background)]/80 p-10 text-center text-[var(--foreground)] shadow-sm',
    className
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const FormButton = ({
    children: buttonText,
  }: {
    children: React.ReactNode;
  }) => (
    <Button type="submit" disabled={isDisabled || isSubmitting}>
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

      {children({ FormButton })}

      {navigationLinks}
    </form>
  );
}
