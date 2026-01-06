'use client';

import { updatePassword } from '@/utils/auth/actions';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { dictionary } from '@zxcvbn-ts/language-common';
import SignUpLink from '@/components/auth/SignUpLink';

zxcvbnOptions.setOptions({
  dictionary: {
    ...dictionary,
  },
});

export default function UpdatePassword() {
  const { user, isLoading } = useAuth();
  const [password, setPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordFeedback, setPasswordFeedback] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Not logged in or in recovery state, redirect to login
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);

      setPasswordStrength(result.score);

      setPasswordFeedback(result.feedback.warning || '');
    } else {
      setPasswordStrength(0);
      setPasswordFeedback('');
    }
  }, [password]);

  const getStrengthColor = (): string => {
    switch (passwordStrength) {
      case 0:
        return 'bg-red-500';
      case 1:
        return 'bg-orange-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-lime-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthLabel = (): string => {
    switch (passwordStrength) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

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

      {password && (
        <div className="zxcvbn">
          <div>Password strength: {getStrengthLabel()}</div>

          <div
            className={`${getStrengthColor()} h-2.5 rounded-full transition-all`}
            style={{ width: `${(passwordStrength + 1) * 20}%` }}
          ></div>

          {passwordFeedback && (
            <p className="text-red-500">{passwordFeedback}</p>
          )}
        </div>
      )}

      <button
        className={`btn ${passwordStrength < 3 || isSubmitting ? 'btn-disabled' : 'btn-primary'}`}
        type="submit"
        disabled={passwordStrength < 3 || isSubmitting}
      >
        {isSubmitting ? 'Please wait...' : 'Update password'}
      </button>

      <SignUpLink />
    </form>
  );
}
