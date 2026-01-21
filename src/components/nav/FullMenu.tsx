import Link from 'next/link';

interface FullMenuProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

export default function FullMenu({ isLoggedIn, handleLogout }: FullMenuProps) {
  return (
    <nav className="hidden space-x-6 text-xl tracking-wider lg:flex">
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
  );
}
