import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { getCheckoutSession } from '@/actions/stripe';
import { useAuth } from '@/contexts/AuthContext';

export function useWorkshopCheckout() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleBookNow(workshopId: string): Promise<void> {
    if (!isLoggedIn || !user) {
      router.push(`/login?redirectTo=workshop&workshopId=${workshopId}`);
      return;
    }

    const result = await getCheckoutSession(workshopId, user.id);

    if (result && 'error' in result) {
      console.error('Error creating checkout session:', result.error);
      setError(result.error);
      return;
    }

    if (result.url) {
      window.location.href = result.url;
    }
  }

  return { handleBookNow, error };
}
