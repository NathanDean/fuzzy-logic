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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 400);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

        <div className="flex flex-col justify-start">
          <div className="zxcvbn">
            <div>Password strength: {password && getStrengthLabel()}</div>

            <div className="bg-gray-300 w-full h-2.5 rounded-full">
              <div
                className={
                  password
                    ? `${getStrengthColor()} h-2.5 rounded-full transition-all`
                    : 'bg-gray-300'
                }
                style={{ width: `${(passwordStrength + 1) * 20}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-end mt-6 mb-4 lg:m-0">
          <Turnstile
            siteKey={
              process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
              '1x00000000000000000000AA'
            }
            onSuccess={() => setIsTurnstileLoading(false)}
            options={{
              size: isMobile ? 'compact' : 'normal',
            }}
          />
        </div>

        <div className="flex flex-col-reverse lgflex-col justify-end">
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
          <div className="flex flex-row justify-center items-center w-full space-x-2 text-center mb-2 lg:mb-0">
            <input
              id="subscribe"
              name="subscribe"
              type="checkbox"
              className="w-auto h-full"
            />
            <label htmlFor="subscribe">Subscribe to mailing list</label>
          </div>
        </div>
      </div>
      <div className=" text-center lg:text-start mt-4">
        <LoginLink />
      </div>
    </form>
  );
}
