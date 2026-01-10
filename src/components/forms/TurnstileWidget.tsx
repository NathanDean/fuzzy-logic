import { useEffect, useState } from 'react';

import { Turnstile } from '@marsidev/react-turnstile';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TurnstileWidgetProps {
  onSuccess: () => void;
  className?: string;
}

export default function TurnstileWidget({
  onSuccess,
  className = '',
}: TurnstileWidgetProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 400);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <div
      className={cn(
        'min-h-[150px] sm:min-h-[75px] flex justify-center items-center',
        className
      )}
    >
      <Turnstile
        siteKey={
          process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
          '1x00000000000000000000AA'
        }
        onSuccess={onSuccess}
        options={{
          size: isMobile ? 'compact' : 'normal',
        }}
      />
    </div>
  );
}
