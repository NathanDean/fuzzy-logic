'use client';

import { Suspense } from 'react';
import { useCallback, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { login } from '@/actions/auth';
import AuthForm from '@/components/forms/auth/Authform';
import ResetPasswordLink from '@/components/forms/auth/links/ResetPasswordLink';
import SignUpLink from '@/components/forms/auth/links/SignUpLink';
import TurnstileWidget from '@/components/forms/auth/TurnstileWidget';
import Main from '@/components/Main';
import Loading from '@/components/misc/Loading';
import Text from '@/components/ui/Text';

function LoginForm() {
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const workshopId = searchParams.get('workshopId');

  const handleSubmit = async (formData: FormData): Promise<void> => {
    setErrorMessage('');

    const result = await login(formData, workshopId);

    if (result && 'error' in result) {
      setErrorMessage(result.error);
      return;
    }

    if (result?.success && result.redirectUrl) {
      window.location.href = result.redirectUrl;
    }
  };

  const handleTurnstileSuccess = useCallback(
    () => setIsTurnstileLoading(false),
    []
  );

  const navigationLinks = (
    <>
      <SignUpLink />
      <ResetPasswordLink />
    </>
  );

  return (
    <AuthForm
      navigationLinks={navigationLinks}
      onSubmit={handleSubmit}
      isDisabled={isTurnstileLoading}
      errorMessage={errorMessage}
    >
      {({ FormButton }) => (
        <>
          {redirectTo === 'workshop' && workshopId && (
            <Text className="text-center">
              Please login to complete your booking
            </Text>
          )}
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />

          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />

          <TurnstileWidget onSuccess={handleTurnstileSuccess} />

          <FormButton>Log in</FormButton>
        </>
      )}
    </AuthForm>
  );
}

// Needs to be wrapped in suspense boundary to access URL params
export default function LoginPage() {
  return (
    <Main>
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </Main>
  );
}
