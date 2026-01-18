'use client';

import { useCallback, useState } from 'react';

import { signup } from '@/actions/auth';
import AuthForm from '@/components/forms/auth/Authform';
import LoginLink from '@/components/forms/auth/links/LoginLink';
import {
  PasswordStrengthBar,
  PasswordStrengthLabel,
} from '@/components/forms/auth/PasswordStrength';
import TurnstileWidget from '@/components/forms/auth/TurnstileWidget';
import Main from '@/components/Main';

import usePasswordStrength from '@/hooks/usePasswordStrength';

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const passwordStrength = usePasswordStrength(password);
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);
  const isDisabled = passwordStrength < 3 || isTurnstileLoading;

  const handleSubmit = async (formData: FormData): Promise<void> => {
    setErrorMessage('');

    const result = await signup(formData);

    if (result?.error) {
      setErrorMessage(result.error);
    }
  };

  const navigationLinks = <LoginLink />;

  const handleTurnstileSuccess = useCallback(
    () => setIsTurnstileLoading(false),
    []
  );

  return (
    <Main>
      <AuthForm
        isDisabled={isDisabled}
        navigationLinks={navigationLinks}
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
      >
        {({ FormButton }) => (
          <>
            <div className="grid grid-cols-1 gap-y-3 lg:grid-cols-2 lg:gap-x-6">
              <div className="flex flex-col space-y-1">
                <label htmlFor="firstName">First name:</label>
                <input id="firstName" name="firstName" type="text" required />
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="lastName">Last name:</label>
                <input id="lastName" name="lastName" type="text" required />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required />
              </div>
              <div className="flex flex-col space-y-1">
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
              <div className="flex flex-col space-y-1">
                <label htmlFor="confirmPassword">Confirm password:</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <PasswordStrengthLabel score={passwordStrength} />

                <PasswordStrengthBar score={passwordStrength} />
              </div>

              <div className="flex h-full flex-col justify-end">
                <TurnstileWidget onSuccess={handleTurnstileSuccess} />
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-2 flex w-full flex-row items-center justify-center space-x-2 text-center lg:mb-0">
                  <input
                    id="subscribe"
                    name="subscribe"
                    type="checkbox"
                    className="h-full w-auto"
                  />
                  <label htmlFor="subscribe">Subscribe to mailing list</label>
                </div>
                <FormButton>Sign up</FormButton>
              </div>
            </div>
            <div className="mt-4 text-center"></div>
          </>
        )}
      </AuthForm>
    </Main>
  );
}
