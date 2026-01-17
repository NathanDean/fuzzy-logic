import Main from '@/components/Main';
import { createClient } from '@/lib/supabase/serverClient';

import { formatWorkshop } from '@/utils/transformers/formatWorkshop';

import WorkshopsClientWrapper from './WorkshopsClientWrapper';

export default async function Workshops() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];

  // Get workshops from Supabase

  const { data, error } = await supabase
    .from('workshops')
    .select('*, bookings:bookings(count)')
    .gte('date', today)
    .eq('is_on_sale', true)
    .order('date');

  if (error) {
    throw new Error('Error fetching workshops.');
  }

  const workshops = data?.map((workshop) => formatWorkshop(workshop)) || [];

  return (
    <Main>
      <WorkshopsClientWrapper workshops={workshops} />
    </Main>
  );
}
