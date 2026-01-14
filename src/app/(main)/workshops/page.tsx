import Main from '@/components/Main';

import { createClient } from '@/utils/supabase/serverClient';

import WorkshopsClientWrapper from './WorkshopsClientWrapper';

export default async function Workshops() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];

  // Get workshops from Supabase

  const { data, error } = await supabase
    .from('workshops')
    .select('*, bookings:bookings(count)')
    .gte('date', today)
    .eq('on_sale', true)
    .order('date');

  if (error) {
    throw new Error('Error fetching workshops.');
  }

  // Add no. of bookings to workshops
  const workshops =
    data?.map((workshop) => ({
      ...workshop,
      places_remaining:
        workshop.max_places_available - (workshop.bookings?.[0]?.count || 0),
    })) || [];

  return (
    <Main>
      <WorkshopsClientWrapper workshops={workshops} />
    </Main>
  );
}
