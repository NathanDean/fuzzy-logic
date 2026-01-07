'use client';

import { useEffect } from 'react';
import ErrorMessage from '@/components/misc/ErrorMessage';
import ErrorProps from '@/utils/types/ErrorProps';

export default function GlobalError({ error, reset }: ErrorProps) {
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
