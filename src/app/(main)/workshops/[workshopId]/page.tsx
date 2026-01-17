import Main from '@/components/Main';
import { createClient } from '@/lib/supabase/serverClient';
import { formatWorkshop } from '@/types/Workshop';

import WorkshopDetailsClientWrapper from './WorkshopDetailsClientWrapper';

export default async function WorkshopDetails({
  params,
}: {
  params: Promise<{ workshopId: string }>;
}) {
  const { workshopId } = await params;

  const supabase = await createClient();

  const { data: workshopData, error } = await supabase
    .from('workshops')
    .select('*, bookings:bookings(count)')
    .eq('id', workshopId)
    .limit(1)
    .single();

  if (error) {
    throw new Error('Error fetching workshop.');
  }

  const workshop = formatWorkshop(workshopData);

  return (
    <Main>
      <WorkshopDetailsClientWrapper workshop={workshop} />
    </Main>
  );
}
