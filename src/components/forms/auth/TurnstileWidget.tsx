import { memo, useEffect, useState } from 'react';

import { Turnstile } from '@marsidev/react-turnstile';

import cn from '@/utils/style/cn';

interface TurnstileWidgetProps {
  onSuccess: () => void;
  className?: string;
}

function TurnstileWidget({ onSuccess, className = '' }: TurnstileWidgetProps) {
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
        'flex min-h-[150px] items-center justify-center sm:min-h-[75px]',
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

export default memo(TurnstileWidget);
