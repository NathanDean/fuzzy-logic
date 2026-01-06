import { createClient } from '@/utils/supabase/server';
import WorkshopDetailsClientWrapper from './WorkshopDetailsClientWrapper';
import { Workshop } from '@/utils/types/Workshop';

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
    return <p className="medium-text error">Workshop not found</p>;
  }

  const workshop: Workshop = {
    ...workshopData,
    bookings: workshopData.bookings?.[0]?.count || 0,
  };

  return <WorkshopDetailsClientWrapper workshop={workshop} />;
}
