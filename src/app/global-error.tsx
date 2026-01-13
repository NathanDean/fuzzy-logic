'use client';

import { useEffect } from 'react';

import ErrorMessage from '@/components/misc/ErrorMessage';
import Footer from '@/components/misc/Footer';
import Header from '@/components/nav/Header';
import { AuthProvider } from '@/contexts/AuthContext';
import { outfit, sigmar } from '@/lib/fonts';
import { Analytics } from '@vercel/analytics/next';

import ErrorProps from '@/utils/types/ErrorProps';

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Root error:', error);
  }, [error]);

  return (
    <html lang="en" className={`${sigmar.variable} ${outfit.variable}`}>
      <body className="flex h-screen flex-col bg-[url('/canvas.png')] bg-cover bg-fixed bg-center bg-no-repeat antialiased sm:text-lg dark:bg-[url('/canvas-dark.png')]">
        <AuthProvider>
          <Header />
          <ErrorMessage onClick={reset} type="global" />
        </AuthProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
