'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/misc/Loading';
import Text from '@/components/ui/Text';

function ErrorPageComponent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('message');

  const errorMessage: { [key: string]: string } = {
    'no-code': 'The authentication link was missing required information.',
    'error-exchanging-code-for-session': 'Unable to complete authentication.',
    'email-verification-failed':
      'Email verification failed.  Please try again or request a new verification email.',
    'invalid-verification-link':
      'This verification link is invalid or has expired.',
  };

  const displayMessage =
    errorCode && errorMessage[errorCode]
      ? errorMessage[errorCode]
      : 'Unknown error';

  return (
    <div className="flex flex-col items-center space-y-1">
      <h1>Sorry, something went wrong.</h1>

      <Text>Error: {displayMessage}</Text>

      <Text>
        Please try again, if the problem continues please get in touch.
      </Text>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorPageComponent />
    </Suspense>
  );
}
