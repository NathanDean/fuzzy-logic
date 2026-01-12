import Text from '@/components/ui/Text';

import { createClient } from '@/utils/supabase/serverClient';
import { Workshop } from '@/utils/types/Workshop';

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

  if (error || !workshopData) {
    return <Text>Workshop not found</Text>;
  }

  const workshop: Workshop = {
    ...workshopData,
    bookings: workshopData.bookings?.[0]?.count || 0,
  };

  return <WorkshopDetailsClientWrapper workshop={workshop} />;
}
