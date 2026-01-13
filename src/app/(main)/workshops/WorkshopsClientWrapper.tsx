'use client';

import { useRouter } from 'next/navigation';

import { createCheckoutSession } from '@/actions/stripe';
import CardGrid from '@/components/cards/CardGrid';
import MailingListForm from '@/components/forms/MailingListForm';
import Text from '@/components/ui/Text';
import { useAuth } from '@/contexts/AuthContext';

import type { Workshop } from '@/utils/types/Workshop';

import WorkshopCard from './_components/WorkshopCard';

export default function WorkshopsClientWrapper({
  workshops,
}: {
  workshops: Workshop[];
}) {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  const handleBookNow = async (workshopId: string) => {
    if (!isLoggedIn || !user) {
      router.push(`/login?redirectTo=workshop&workshopId=${workshopId}`);
      return;
    }

    const result = await createCheckoutSession(workshopId, user.id);

    if (result.error) {
      throw new Error('Error creating checkout session.');
    }

    if (result.url) {
      window.location.href = result.url;
    }
  };
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
          <CardGrid cols={1}>
            {workshops.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                onBookNow={handleBookNow}
                className="w-full, md:w-xl"
              />
            ))}
          </CardGrid>
        </div>
      )}
    </>
  );
}
