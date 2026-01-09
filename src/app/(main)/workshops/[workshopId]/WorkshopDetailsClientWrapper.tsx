'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { createCheckoutSession } from '@/app/actions/stripe';
import CardGrid from '@/components/cards/CardGrid';
import Text from '@/components/ui/Text';
import { useAuth } from '@/contexts/AuthContext';

import { Workshop } from '@/utils/types/Workshop';

import WorkshopDetailsCard from '../_components/WorkshopDetailsCard';

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
        {errorMessage && <Text>{errorMessage}</Text>}

        <WorkshopDetailsCard
          key={workshop.id}
          workshop={workshop}
          onBookNow={handleBookNow}
        />
      </CardGrid>
    </div>
  );
}
