'use client';

import { useEffect } from 'react';

import ErrorMessage from '@/components/misc/ErrorMessage';

import { ErrorProps } from '@/utils/types/ErrorProps';

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Account error:', error);
  }, [error]);

  return <ErrorMessage onClick={reset} type="account" />;
}
