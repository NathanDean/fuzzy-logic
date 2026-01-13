'use client';

import { Suspense } from 'react';
import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import DisplayMessageContainer from '@/components/containers/DisplayMessageContainer';
import Main from '@/components/Main';
import Loading from '@/components/misc/Loading';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';

function ConfirmSignupComponent() {
  const searchParams = useSearchParams();
  const confirmationUrl = searchParams.get('confirmation_url');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    if (confirmationUrl) {
      setIsConfirming(true);
      // Redirect to the actual Supabase confirmation URL
      window.location.href = confirmationUrl;
    }
  };

  if (!confirmationUrl) {
    return (
      <DisplayMessageContainer>
        <Heading variant="h1">Invalid confirmation link</Heading>
        <Text>This confirmation link appears to be invalid or incomplete.</Text>
        <Text>
          Please try clicking the link in your email again, or contact us if the
          problem continues.
        </Text>
      </DisplayMessageContainer>
    );
  }

  return (
    <DisplayMessageContainer>
      <Heading variant="h1">Please confirm your email address</Heading>

      <Text>
        Thanks for signing up. Please confirm your email address by clicking the
        button below.
      </Text>

      <Button
        className="sm:w-1/2"
        onClick={handleConfirm}
        disabled={isConfirming}
      >
        <Text as="span">
          {isConfirming ? 'Confirming...' : 'Confirm email address'}
        </Text>
      </Button>

      <Text>{`If you have any problems signing up please get in touch.`}</Text>
    </DisplayMessageContainer>
  );
}

export default function ConfirmSignupPage() {
  return (
    <Main>
      <Suspense fallback={<Loading />}>
        <ConfirmSignupComponent />
      </Suspense>
    </Main>
  );
}
