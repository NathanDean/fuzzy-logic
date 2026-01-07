'use client';

import { useEffect } from 'react';
import ErrorMessage from '@/components/misc/ErrorMessage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Login error:', error);
  }, [error]);

  return <ErrorMessage onClick={reset} type="login" />;
}
