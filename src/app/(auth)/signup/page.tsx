'use client';

import { signup } from '@/utils/auth/actions';
import { Turnstile } from '@marsidev/react-turnstile';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { dictionary } from '@zxcvbn-ts/language-common';
import { useEffect, useState } from 'react';
import LoginLink from '@/components/auth/LoginLink';

zxcvbnOptions.setOptions({
  dictionary: {
    ...dictionary,
  },
});

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordFeedback, setPasswordFeedback] = useState<string>('');

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

    const result = await signup(formData);

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
      className="mb-10"
    >
      {errorMessage && <p className="error">{errorMessage}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 gap-y-3 lg:gap-y-1">
        <div>
          <label htmlFor="firstName">First name:</label>
          <input id="firstName" name="firstName" type="text" required />
        </div>

        <div>
          <label htmlFor="lastName">Last name:</label>
          <input id="lastName" name="lastName" type="text" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />
        </div>

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

        <div className="lg:order-8 flex flex-row justify-center items-center w-full space-x-2 text-center">
          <input
            id="subscribe"
            name="subscribe"
            type="checkbox"
            className="w-auto h-full"
          />
          <label htmlFor="subscribe">Subscribe to mailing list</label>
        </div>

        <div className="flex flex-col justify-end">
          <button
            className={`btn ${isTurnstileLoading || passwordStrength < 3 || isSubmitting ? 'btn-disabled' : 'btn-primary'} my-2 p-2`}
            type="submit"
            disabled={
              isTurnstileLoading || passwordStrength < 3 || isSubmitting
            }
          >
            {isTurnstileLoading
              ? 'Loading'
              : isSubmitting
                ? 'Please wait'
                : 'Sign up'}
          </button>
        </div>
        <div className="lg:order-7 text-center lg:text-start">
          <LoginLink />
        </div>
      </div>
      <div className="turnstile">
        <Turnstile
          siteKey={
            process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
            '1x00000000000000000000AA'
          }
          onSuccess={() => setIsTurnstileLoading(false)}
        />
      </div>
    </form>
  );
}
