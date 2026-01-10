import { MouseEventHandler } from 'react';

import Link from 'next/link';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

interface LinkProps extends BaseProps {
  href: string;
}

interface ButtonProps extends BaseProps {
  href?: never;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

type ButtonComponentProps = LinkProps | ButtonProps;

export default function Button(props: ButtonComponentProps) {
  const { children, className = '' } = props;
  const isDisabled = 'disabled' in props ? props.disabled : false;

  const styles = cn(
    'inline-flex items-center justify-center w-full mt-2 px-4 py-2 border rounded-md font-medium text-center transition-all ease-in-out',
    !isDisabled &&
      'border-[var(--foreground)] bg-[var(--background)]/50 text-[var(--foreground)] hover:bg-[var(--foreground)]/50 hover:border-[var(--foreground)] hover:text-[var(--background)]',
    isDisabled &&
      'opacity-50 cursor-not-allowed hover:bg-inherit hover:text-inherit',
    className
  );

  if ('href' in props) {
    const { href, onClick } = props;
    if (href?.startsWith('/') || href?.startsWith('#')) {
      return (
        <Link href={href} onClick={onClick} className={styles}>
          {children}
        </Link>
      );
    } else {
      return (
        <a href={href} onClick={onClick} className={styles}>
          {children}
        </a>
      );
    }
  } else {
    const { onClick, type = 'button', disabled = false } = props;
    return (
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={styles}
      >
        {children}
      </button>
    );
  }
}
