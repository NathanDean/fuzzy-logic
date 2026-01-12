// Imports
import type { Metadata } from 'next';

import Footer from '@/components/misc/Footer';
import Header from '@/components/nav/Header';
import { AuthProvider } from '@/contexts/AuthContext';
import { outfit, sigmar } from '@/lib/fonts';
import { Analytics } from '@vercel/analytics/next';

import '@/styles/globals.css';

// Metadata
export const metadata: Metadata = {
  title: 'Fuzzy Logic: An improv company',
  description: 'An improv company',
  manifest: '/icons/site.webmanifest',
  icons: {
    icon: '/icons/favicon-32x32.png',
    shortcut: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Fuzzy Logic: An improv company',
    description: 'An improv company',
    url: 'https://www.fzzy.co.uk',
    siteName: 'Fuzzy Logic',
    images: [
      {
        url: '/icons/og-image.png',
        width: 400,
        height: 400,
        alt: 'Fuzzy Logic: An improv company',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
};

// Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sigmar.variable} ${outfit.variable}`}>
      <body
        className={`${sigmar} antialiased flex flex-col h-screen bg-[url('/canvas.png')] dark:bg-[url('/canvas-dark.png')] bg-cover bg-no-repeat bg-fixed bg-center sm:text-lg`}
      >
        <AuthProvider>
          <Header />

          <main className="w-3/4 sm:w-xl lg:w-3xl xl:w-4xl flex flex-grow flex-col items-center justify-center mx-auto pt-20 sm:px-10 sm:pt-35">
            {children}
          </main>
        </AuthProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
