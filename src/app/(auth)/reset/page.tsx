'use client';

import { useCallback, useState } from 'react';

import { resetPassword } from '@/actions/auth';
import AuthForm from '@/components/forms/auth/Authform';
import SignUpLink from '@/components/forms/auth/links/SignUpLink';
import TurnstileWidget from '@/components/forms/auth/TurnstileWidget';
import Main from '@/components/Main';

export default function ResetPassword() {
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (formData: FormData): Promise<void> => {
    setErrorMessage('');

    const result = await resetPassword(formData);

    if (result?.error) {
      setErrorMessage(result.error);
    }
  };

  const handleTurnstileSuccess = useCallback(
    () => setIsTurnstileLoading(false),
    []
  );

  const navigationLinks = <SignUpLink />;

  return (
    <Main>
      <AuthForm
        navigationLinks={navigationLinks}
        onSubmit={handleSubmit}
        isDisabled={isTurnstileLoading}
        errorMessage={errorMessage}
      >
        {({ FormButton }) => (
          <>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />{' '}
            <TurnstileWidget onSuccess={handleTurnstileSuccess} />
            <FormButton>Reset password</FormButton>
          </>
        )}
      </AuthForm>
    </Main>
  );
}
