interface MenuToggleButtonProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

export default function MenuToggleButton({
  toggleMenu,
  isMenuOpen,
}: MenuToggleButtonProps) {
  return (
    <button className="lg:hidden" onClick={toggleMenu} aria-label="Toggle menu">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isMenuOpen ? (
          // X icon when menu is open
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          // Hamburger icon when menu is closed
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
}
