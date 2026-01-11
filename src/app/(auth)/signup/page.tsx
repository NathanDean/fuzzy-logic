'use client';

import { useState } from 'react';

import AuthForm from '@/components/forms/Authform';
import LoginLink from '@/components/forms/links/LoginLink';
import PasswordStrengthIndicator from '@/components/forms/PasswordStrengthIndicator';

import { signup } from '@/utils/auth/actions';

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const handleSubmit = async (formData: FormData) => {
    setErrorMessage('');

    const result = await signup(formData);

    if (result?.error) {
      setErrorMessage(result.error);
    }
  };

  const navigationLinks = <LoginLink />;

  return (
    <AuthForm
      isDisabled={passwordStrength < 3}
      navigationLinks={navigationLinks}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      className="mb-10"
    >
      {({ FormTurnstile, FormButton }) => (
        <>
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

            <PasswordStrengthIndicator
              password={password}
              onStrengthChange={setPasswordStrength}
            />

            <div className="flex flex-col justify-end h-full">
              <FormTurnstile />
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-row justify-center items-center w-full space-x-2 text-center mb-2 lg:mb-0">
                <input
                  id="subscribe"
                  name="subscribe"
                  type="checkbox"
                  className="w-auto h-full"
                />
                <label htmlFor="subscribe">Subscribe to mailing list</label>
              </div>
              <FormButton>Sign up</FormButton>
            </div>
          </div>
          <div className="text-center mt-4"></div>
        </>
      )}
    </AuthForm>
  );
}
