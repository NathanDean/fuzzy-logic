'use client';

import { useState } from 'react';

import AuthForm from '@/components/forms/Authform';
import SignUpLink from '@/components/forms/links/SignUpLink';
import TurnstileWidget from '@/components/forms/TurnstileWidget';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';

import { resetPassword } from '@/utils/auth/actions';

export default function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage('');

    const result = await resetPassword(formData);

    if (result?.error) {
      setErrorMessage(result.error);
    }

    setIsSubmitting(false);
  };

  return (
    <AuthForm onSubmit={handleSubmit} errorMessage={errorMessage}>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />

      <TurnstileWidget onSuccess={() => setIsTurnstileLoading(false)} />

      <Button type="submit" disabled={isTurnstileLoading || isSubmitting}>
        <Text as="span">
          {isTurnstileLoading
            ? 'Loading'
            : isSubmitting
              ? 'Please wait...'
              : 'Reset password'}
        </Text>
      </Button>

      <SignUpLink />
    </AuthForm>
  );
}
