'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useAuth } from '@/contexts/AuthContext';

import Logo from '../ui/Logo';
import FullMenu from './FullMenu';
import MenuToggleButton from './MenuToggleButton';
import MobileMenu from './MobileMenu';

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

  return (
    <header className="fixed top-0 right-0 left-0 z-10 w-screen bg-transparent py-4 text-[var(--foreground)]">
      <div className="flex items-center justify-between px-6">
        <Link href="/" className="text-3xl">
          <Logo />
        </Link>

        <FullMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <MenuToggleButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      </div>

      {/* Mobile dropdown menu */}

      {isMenuVisible && (
        <MobileMenu
          isMenuOpaque={isMenuOpaque}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          toggleMenu={toggleMenu}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
      )}
    </header>
  );
}
