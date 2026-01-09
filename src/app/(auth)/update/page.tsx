'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import SignUpLink from '@/components/auth/SignUpLink';
import PasswordStrengthIndicator from '@/components/misc/PasswordStrengthIndicator';
import Text from '@/components/ui/Text';
import { useAuth } from '@/contexts/AuthContext';

import { updatePassword } from '@/utils/auth/actions';

export default function UpdatePassword() {
  const { user, isLoading } = useAuth();
  const [password, setPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Not logged in or in recovery state, redirect to login
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage('');

    const result = await updatePassword(formData);

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

      <PasswordStrengthIndicator
        password={password}
        onStrengthChange={setPasswordStrength}
      />

      <button
        className={`btn ${passwordStrength < 3 || isSubmitting ? 'btn-disabled' : 'btn-primary'}`}
        type="submit"
        disabled={passwordStrength < 3 || isSubmitting}
      >
        <Text as="span">
          {isSubmitting ? 'Please wait...' : 'Update password'}
        </Text>
      </button>

      <SignUpLink />
    </form>
  );
}
