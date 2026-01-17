import { Outfit, Sigmar } from 'next/font/google';

export const sigmar = Sigmar({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sigmar',
});

export const outfit = Outfit({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-outfit',
});
