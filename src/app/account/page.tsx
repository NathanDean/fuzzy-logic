import { redirect } from 'next/navigation';

import Main from '@/components/Main';
import { createClient } from '@/lib/supabase/serverClient';

import AccountClientWrapper from './AccountClientWrapper';

export default async function Account() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  const { data: bookings, error: dbError } = await supabase
    .from('bookings')
    .select('*, workshop:workshops(id, class_name, venue, date, start_time)')
    .eq('user_id', user.id)
    .eq('status', 'confirmed')
    .gte('workshop.date', today)
    .order('date', { referencedTable: 'workshops', ascending: true })
    .order('start_time', { referencedTable: 'workshops', ascending: true });

  if (dbError) {
    throw new Error('Error loading bookings.');
  }

  return (
    <Main>
      <AccountClientWrapper user={user} bookings={bookings} />
    </Main>
  );
}
