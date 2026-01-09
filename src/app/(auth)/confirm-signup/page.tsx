'use client';

import { Suspense } from 'react';
import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import Loading from '@/components/misc/Loading';
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
      <div className="flex flex-col items-center sm:w-xl lg:w-3xl xl:w-4xl space-y-2">
        <h1 className="heading">Invalid confirmation link</h1>
        <p className="medium-text">
          This confirmation link appears to be invalid or incomplete.
        </p>
        <p className="medium-text">
          Please try clicking the link in your email again, or contact us if the
          problem continues.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center sm:w-xl lg:w-3xl xl:w-4xl space-y-2">
      <h1 className="heading">Please confirm your email address</h1>

      <p className="medium-text">
        Thanks for signing up. Please confirm your email address by clicking the
        button below.
      </p>

      <button
        className={`btn ${isConfirming ? 'btn-disabled' : 'btn-primary'} sm:w-1/2`}
        onClick={handleConfirm}
        disabled={isConfirming}
      >
        <Text as="span">
          {isConfirming ? 'Confirming...' : 'Confirm email address'}
        </Text>
      </button>

      <Text>{`If you have any problems signing up please get in touch.`}</Text>
    </div>
  );
}

export default function ConfirmSignupPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ConfirmSignupComponent />
    </Suspense>
  );
}
