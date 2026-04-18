'use client';

import Link from 'next/link';

import Logo from '../ui/Logo';

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-10 w-screen bg-transparent py-4 text-[var(--foreground)]">
      <div className="flex items-center justify-between px-6">
        <Link href="/" className="text-3xl">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
