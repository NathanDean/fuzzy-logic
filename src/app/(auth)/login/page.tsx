'use client';

import { Suspense } from 'react';
import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { createCheckoutSession } from '@/app/actions/stripe';
import AuthForm from '@/components/forms/Authform';
import ResetPasswordLink from '@/components/forms/links/ResetPasswordLink';
import SignUpLink from '@/components/forms/links/SignUpLink';
import Loading from '@/components/misc/Loading';
import Text from '@/components/ui/Text';

import { login } from '@/utils/auth/actions';
import { createClient } from '@/utils/supabase/client';

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
        buttonText="Log in"
        usesTurnstile={true}
        navigationLinks={navigationLinks}
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
      >
        {redirectTo === 'workshop' && workshopId && (
          <Text className="text-center">
            Please login to complete your booking
          </Text>
        )}

        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
      </AuthForm>
    </>
  );
}

// Needs to be wrapped in suspense boundary to access URL params
export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginForm />
    </Suspense>
  );
}
