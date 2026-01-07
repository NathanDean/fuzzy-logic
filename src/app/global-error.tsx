'use client';

import { useEffect } from 'react';
import ErrorMessage from '@/components/misc/ErrorMessage';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Root error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <ErrorMessage onClick={reset} type="global" />
      </body>
    </html>
  );
}
