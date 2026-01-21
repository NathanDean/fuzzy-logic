'use client';

import CardGrid from '@/components/cards/CardGrid';
import MailingListForm from '@/components/forms/MailingListForm';
import Text from '@/components/ui/Text';
import type { Workshop } from '@/types/Workshop';

import { useWorkshopCheckout } from '@/hooks/useWorkshopCheckout';

import WorkshopCard from './_components/WorkshopCard';

export default function WorkshopsClientWrapper({
  workshops,
}: {
  workshops: Workshop[];
}) {
  const { handleBookNow, error } = useWorkshopCheckout();

  return (
    <>
      {workshops.length === 0 ? (
        <div className="space-y-2">
          <Text>
            No upcoming workshops. Please check back soon, or subscribe to our
            mailing list for announcements.
          </Text>
          <MailingListForm />
        </div>
      ) : (
        <div>
          {error && <Text>{error}</Text>}
          <CardGrid>
            {workshops.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                onBookNow={handleBookNow}
                className="w-full, md:w-lg"
              />
            ))}
          </CardGrid>
        </div>
      )}
    </>
  );
}
