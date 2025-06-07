'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('People error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center space-y-1">
      <h1 className="header">Sorry, something went wrong.</h1>

      <p className="medium-text">
        Error loading page. Please try again, if the problem continues please
        get in touch.
      </p>

      <button className="btn btn-primary" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
