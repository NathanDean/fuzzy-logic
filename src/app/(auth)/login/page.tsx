'use client';

import { Suspense } from 'react';
import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { login } from '@/actions/auth';
import { createCheckoutSession } from '@/actions/stripe';
import AuthForm from '@/components/forms/auth/Authform';
import ResetPasswordLink from '@/components/forms/auth/links/ResetPasswordLink';
import SignUpLink from '@/components/forms/auth/links/SignUpLink';
import Main from '@/components/Main';
import Loading from '@/components/misc/Loading';
import Text from '@/components/ui/Text';

import { createClient } from '@/utils/supabase/browserClient';

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const workshopId = searchParams.get('workshopId');

  const handleSubmit = async (formData: FormData) => {
    setErrorMessage('');

    const result = await login(formData);

    if (result?.error) {
      setErrorMessage(result.error);
    }

    if (result?.success) {
      if (redirectTo === 'workshop' && workshopId) {
        try {
          const supabase = createClient();
          const { data } = await supabase.auth.getUser();
          if (data.user) {
            const user = data.user;
            const { url } = await createCheckoutSession(workshopId, user.id);

            if (url) {
              window.location.href = url;
              return;
            }
          }
        } catch (error) {
          console.error('Error creating checkout session:', error);
        }
      }

      window.location.href = '/';
    }
  };

  const navigationLinks = (
    <>
      <SignUpLink />
      <ResetPasswordLink />
    </>
  );

  return (
    <>
      <AuthForm
        navigationLinks={navigationLinks}
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
      >
        {({ FormTurnstile, FormButton }) => (
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

            <FormTurnstile />

            <FormButton>Log in</FormButton>
          </>
        )}
      </AuthForm>
    </>
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
