'use client';

import { useEffect } from 'react';

import ErrorMessage from '@/components/misc/ErrorMessage';
import { ErrorProps } from '@/types/ErrorProps';

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Root error:', error);
  }, [error]);

  return <ErrorMessage onClick={reset} message={error.message} />;
}
