'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createCheckoutSession } from '@/app/actions/stripe';
import WorkshopDetailsCard from '../_components/WorkshopDetailsCard';
import CardGrid from '@/components/cards/CardGrid';
import { Workshop } from '@/utils/types/Workshop';

export default function WorkshopDetailsClientWrapper({
  workshop,
}: {
  workshop: Workshop;
}) {
  const { user, isLoggedIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  const handleBookNow = async (workshopId: string) => {
    setErrorMessage('');

    if (!isLoggedIn || !user) {
      router.push(`/login?redirectTo=workshop&workshopId=${workshopId}`);
      return;
    }

    const result = await createCheckoutSession(workshopId, user.id);

    if (result.error) {
      console.error('Error creating checkout session:', result.error);
      setErrorMessage(result.error);
      return;
    }

    if (result.url) {
      window.location.href = result.url;
    }
  };

  return (
    <div className="sm:-mt-10">
      <CardGrid cardWidth="xl" imageHeight="lg" cols={1}>
        {errorMessage && <p className="error">{errorMessage}</p>}

        <WorkshopDetailsCard
          key={workshop.id}
          workshop={workshop}
          onBookNow={handleBookNow}
        />
      </CardGrid>
    </div>
  );
}
