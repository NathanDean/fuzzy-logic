'use client';

import CardGrid from '@/components/cards/CardGrid';
import Text from '@/components/ui/Text';
import type { Workshop } from '@/types/Workshop';

import { useWorkshopCheckout } from '@/hooks/useWorkshopCheckout';

import WorkshopDetailsCard from '../_components/WorkshopDetailsCard';

export default function WorkshopDetailsClientWrapper({
  workshop,
}: {
  workshop: Workshop;
}) {
  const { handleBookNow, error } = useWorkshopCheckout();

  return (
    <CardGrid cols={1}>
      {error && <Text>{error}</Text>}

      <WorkshopDetailsCard
        key={workshop.id}
        workshop={workshop}
        onBookNow={handleBookNow}
        className="w-full, lg:w-4xl xl:w-6xl"
      />
    </CardGrid>
  );
}
