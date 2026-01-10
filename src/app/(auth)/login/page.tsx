'use client';

import { Suspense } from 'react';
import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { createCheckoutSession } from '@/app/actions/stripe';
import ResetPasswordLink from '@/components/auth/ResetPasswordLink';
import SignUpLink from '@/components/auth/SignUpLink';
import Loading from '@/components/misc/Loading';
import TurnstileWidget from '@/components/misc/TurnstileWidget';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';

import { login } from '@/utils/auth/actions';
import { createClient } from '@/utils/supabase/client';

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const workshopId = searchParams.get('workshopId');

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
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

    setIsSubmitting(false);
  };

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit(new FormData(e.currentTarget));
        }}
      >
        {redirectTo === 'workshop' && workshopId && (
          <p className="text-center">Please login to complete your booking</p>
        )}

        {errorMessage && <p className="error">{errorMessage}</p>}

        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />

        <TurnstileWidget onSuccess={() => setIsTurnstileLoading(false)} />

        <Button type="submit" disabled={isTurnstileLoading || isSubmitting}>
          <Text as="span">
            {isTurnstileLoading
              ? 'Loading'
              : isSubmitting
                ? 'Please wait...'
                : 'Log in'}
          </Text>
        </Button>

        <SignUpLink />
        <ResetPasswordLink />
      </form>
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
