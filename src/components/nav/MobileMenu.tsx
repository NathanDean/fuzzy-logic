import Link from 'next/link';

import cn from '@/utils/style/cn';

import Logo from '../ui/Logo';
import MenuToggleButton from './MenuToggleButton';

interface MobileMenuProps {
  isMenuOpaque: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
  isLoggedIn: boolean;
  handleLogout: () => void;
}

export default function MobileMenu({
  isMenuOpaque,
  isMenuOpen,
  setIsMenuOpen,
  toggleMenu,
  isLoggedIn,
  handleLogout,
}: MobileMenuProps) {
  return (
    <div
      data-testid="mobile-menu"
      className={cn(
        isMenuOpaque ? 'opacity-100' : 'opacity-0',
        'fixed inset-0 z-0 flex h-screen w-full items-center justify-center bg-[var(--background)] p-6 text-[var(--foreground)] transition-opacity duration-300 ease-in-out lg:hidden'
      )}
    >
      <div className="bg fixed top-0 right-0 left-0 flex items-center justify-between px-6 py-4">
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
          className="flex flex-col items-center justify-center space-y-6 text-2xl"
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
  );
}
