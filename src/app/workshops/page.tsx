'use client';

import { useState, useEffect } from 'react';
import supabase from '@/utils/supabase/supabaseClient';
import { createCheckoutSession } from '../actions/stripe';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

import Loading from '@/components/Loading';
import CardGrid from '@/components/CardGrid';
import WorkshopCard from '@/components/WorkshopCard';

import { Workshop } from '@/utils/types/Workshop';
import MailingListForm from '@/components/MailingListForm';

export default function Workshops() {
  const { user, isLoggedIn } = useAuth();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Get workshops from Supabase
    async function fetchWorkshops() {
      setErrorMessage('');

      try {
        // Get workshops
        const { data, error } = await supabase
          .from('workshops')
          .select('*, bookings:bookings(count)')
          .gte('date', today)
          .eq('on_sale', true)
          .order('date');

        if (error) {
          throw error;
        }

        if (data) {
          // Add no. of bookings to each workshop
          const workshopsWithCount = data.map((workshop) => ({
            ...workshop,
            bookings: workshop.bookings?.[0]?.count || 0,
          }));

          setWorkshops(workshopsWithCount);
        }
      } catch (error) {
        console.error('Error fetching workshops:', error);
        setErrorMessage(
          'Error fetching workshops.  Please try refreshing the page, or contact us if the problem continues.'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWorkshops();
  }, []);

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
    <>
      {loading ? (
        <Loading />
      ) : errorMessage ? (
        <p className="medium-text error">{errorMessage}</p>
      ) : workshops.length === 0 ? (
        <div className="space-y-2">
          <p className="large-text">
            No upcoming workshops. Please check back soon, or subscribe to our
            mailing list for announcements.
          </p>
          <MailingListForm />
        </div>
      ) : (
        <div className="mt-10 sm:-mt-5">
          <CardGrid cardWidth="md" imageHeight="md" cols={1}>
            {workshops.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                onBookNow={handleBookNow}
              />
            ))}
          </CardGrid>
        </div>
      )}
    </>
  );
}
