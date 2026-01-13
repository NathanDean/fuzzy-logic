'use client';

import { useEffect, useState } from 'react';

import { Outfit } from 'next/font/google';
import Link from 'next/link';

import { useAuth } from '@/contexts/AuthContext';

import cn from '@/utils/style/cn';

import Logo from '../ui/Logo';
import MenuToggleButton from './MenuToggleButton';

export const outfit = Outfit({
  weight: 'variable',
  subsets: ['latin'],
});

export default function Header() {
  // Auth context
  const { isLoggedIn, signOut } = useAuth();

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuOpaque, setIsMenuOpaque] = useState(false);

  // Menu controls
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuVisible(true);

      const timer = setTimeout(() => {
        setIsMenuOpaque(true);
      }, 10);

      return () => clearTimeout(timer);
    } else {
      setIsMenuOpaque(false);

      const timer = setTimeout(() => {
        setIsMenuVisible(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Logout
  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  // Styling
  const styles = {
    fullNavbar: 'px-6 flex justify-between items-center',
    fullNavLinkContainer: 'hidden lg:flex space-x-6 text-xl tracking-wider',
    mobileNavMenu: `${cn(isMenuOpaque ? 'opacity-100' : 'opacity-0', 'fixed inset-0 z-0 flex h-screen w-full items-center justify-center bg-[var(--background)] p-6 text-[var(--foreground)] transition-opacity duration-300 ease-in-out lg:hidden')}`,
    mobileNavbar:
      'fixed top-0 left-0 right-0 px-6 py-4 flex justify-between items-center bg',
    mobileNavLinkContainer:
      'flex flex-col justify-center items-center space-y-6 text-2xl',
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-10 w-screen bg-transparent py-4 text-[var(--foreground)]">
      <div className={styles.fullNavbar}>
        <Link href="/" className="text-3xl">
          <Logo />
        </Link>

        <nav className={styles.fullNavLinkContainer}>
          <Link href="/workshops">Workshops</Link>

          <Link href="/about">About</Link>

          {isLoggedIn ? (
            <>
              <Link href="/account">Account</Link>

              <button
                onClick={handleLogout}
                className="transition hover:text-blue-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signup">Sign up</Link>
              <Link href="/login">Login</Link>
            </>
          )}
        </nav>

        <MenuToggleButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      </div>

      {/* Mobile dropdown menu */}

      {isMenuVisible && (
        <div data-testid="mobile-menu" className={styles.mobileNavMenu}>
          <div className={styles.mobileNavbar}>
            <Link
              href="/"
              className="text-3xl"
              onClick={() => setIsMenuOpen(false)}
            >
              <Logo />
            </Link>

            <MenuToggleButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
          </div>

          <nav>
            <div
              className={styles.mobileNavLinkContainer}
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/workshops">Workshops</Link>
              <Link href="/mailing-list">Mailing list</Link>
              <Link href="/about">About</Link>

              {isLoggedIn ? (
                <>
                  <Link href="/account">Account</Link>
                  <button className="text-center" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/signup">Sign up</Link>
                  <Link href="/login">Login</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
