'use client';

import { useEffect } from 'react';

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
        <h1 className="secondary">Sorry, something went wrong.</h1>

        <p>
          Global error. Please try again, if the problem continues please get in
          touch.
        </p>

        <button className="btn btn-primary" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
