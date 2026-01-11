'use client';

import { Suspense } from 'react';
import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { createCheckoutSession } from '@/app/actions/stripe';
import AuthForm from '@/components/forms/Authform';
import ResetPasswordLink from '@/components/forms/links/ResetPasswordLink';
import SignUpLink from '@/components/forms/links/SignUpLink';
import TurnstileWidget from '@/components/forms/TurnstileWidget';
import Loading from '@/components/misc/Loading';
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
      <AuthForm onSubmit={handleSubmit} errorMessage={errorMessage}>
        {redirectTo === 'workshop' && workshopId && (
          <Text className="text-center">
            Please login to complete your booking
          </Text>
        )}

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
