'use client';

import { resetPassword } from '@/utils/auth/actions';

import { Turnstile } from '@marsidev/react-turnstile';

import { useState } from 'react';
import SignUpLink from '@/components/auth/SignUpLink';
import Text from '@/components/ui/Text';

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
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(new FormData(e.currentTarget));
      }}
    >
      {errorMessage && <p className="error">{errorMessage}</p>}

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />

      <div className="turnstile">
        <Turnstile
          siteKey={
            process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
            '1x00000000000000000000AA'
          }
          onSuccess={() => setIsTurnstileLoading(false)}
        />
      </div>

      <button
        className={`btn ${isTurnstileLoading || isSubmitting ? 'btn-disabled' : 'btn-primary'}`}
        type="submit"
        disabled={isTurnstileLoading || isSubmitting}
      >
        <Text as="span">
          {isTurnstileLoading
            ? 'Loading'
            : isSubmitting
              ? 'Please wait...'
              : 'Reset password'}
        </Text>
      </button>

      <SignUpLink />
    </form>
  );
}
