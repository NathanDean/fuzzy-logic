'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

import DisplayMessageContainer from '@/components/containers/DisplayMessageContainer';
import Loading from '@/components/misc/Loading';
import Heading from '@/components/ui/Heading';
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
    <DisplayMessageContainer>
      <Heading variant="h1">Sorry, something went wrong.</Heading>

      <Text>Error: {displayMessage}</Text>

      <Text>
        Please try again, if the problem continues please get in touch.
      </Text>
    </DisplayMessageContainer>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorPageComponent />
    </Suspense>
  );
}
