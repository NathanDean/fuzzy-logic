'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

import DisplayMessageContainer from '@/components/containers/DisplayMessageContainer';
import Loading from '@/components/misc/Loading';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

function AuthSuccessComponent() {
  const searchParams = useSearchParams();
  const successCode = searchParams.get('message');

  const successMessages: { [key: string]: string[] } = {
    'signup-successful': [
      'Thanks for signing up.',
      'Please check your inbox and confirm your email address to continue.',
      "If you haven't received an email it may be in your junk folder, or you may have already signed up with this email address.",
    ],
    'password-reset-request-successful': [
      "We've received your password reset request.",
      "If this email address is registered to an account we'll send you a password reset email.",
      'Please follow the instructions inside to continue.',
    ],
    'password-update-successful': [
      'Your password has been reset.',
      'Please login to continue.',
    ],
  };

  const displayMessages =
    successCode && successMessages[successCode]
      ? successMessages[successCode]
      : [];

  return (
    <>
      {displayMessages.length > 0 ? (
        <DisplayMessageContainer>
          <Heading variant="h1">{displayMessages[0]}</Heading>

          {displayMessages[1] && <Text>{displayMessages[1]}</Text>}

          {displayMessages[2] && <Text>{displayMessages[2]}</Text>}
        </DisplayMessageContainer>
      ) : (
        <DisplayMessageContainer>
          <Heading variant="h1">Invalid success code</Heading>
        </DisplayMessageContainer>
      )}
    </>
  );
}

export default function AuthSuccess() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthSuccessComponent />
    </Suspense>
  );
}
