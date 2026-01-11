'use client';

import { useState } from 'react';

import AuthForm from '@/components/forms/auth/Authform';
import SignUpLink from '@/components/forms/auth/links/SignUpLink';

import { resetPassword } from '@/utils/auth/actions';

export default function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (formData: FormData) => {
    setErrorMessage('');

    const result = await resetPassword(formData);

    if (result?.error) {
      setErrorMessage(result.error);
    }
  };

  const navigationLinks = <SignUpLink />;

  return (
    <AuthForm
      navigationLinks={navigationLinks}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
    >
      {({ FormTurnstile, FormButton }) => (
        <>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />{' '}
          <FormTurnstile />
          <FormButton>Reset password</FormButton>
        </>
      )}
    </AuthForm>
  );
}
