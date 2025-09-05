// Imports
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { sigmar } from '@/lib/fonts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

// Metadata
export const metadata: Metadata = {
  title: 'Fuzzy Logic',
  description: 'Fuzzy Logic',
  openGraph: {
    title: 'Fuzzy Logic',
    description: 'An improv company',
    url: 'https://www.fzzy.co.uk',
    siteName: 'Fuzzy Logic',
    images: [
      {
        url: '/og-image.png',
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
    <html lang="en">
      <body className={`${sigmar} antialiased flex flex-col h-screen`}>
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
