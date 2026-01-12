'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import AuthForm from '@/components/forms/auth/Authform';
import SignUpLink from '@/components/forms/auth/links/SignUpLink';
import {
  PasswordStrengthBar,
  PasswordStrengthLabel,
} from '@/components/forms/auth/PasswordStrength';
import { useAuth } from '@/contexts/AuthContext';

import usePasswordStrength from '@/hooks/usePasswordStrength';

import { updatePassword } from '@/utils/auth/actions';

export default function UpdatePassword() {
  const { user, isLoading } = useAuth();
  const [password, setPassword] = useState<string>('');
  const passwordStrength = usePasswordStrength(password);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  // Not logged in or in recovery state, redirect to login
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  const handleSubmit = async (formData: FormData) => {
    setErrorMessage('');

    const result = await updatePassword(formData);

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
      isDisabled={passwordStrength < 3}
    >
      {({ FormButton }) => (
        <>
          {errorMessage && <p className="error">{errorMessage}</p>}

          <label htmlFor="password">New password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword">Confirm new password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />

          <div className="space-y-2">
            <PasswordStrengthLabel score={passwordStrength} />

            <PasswordStrengthBar score={passwordStrength} />
          </div>

          <FormButton>Update password</FormButton>
        </>
      )}
    </AuthForm>
  );
}
