import Main from '@/components/Main';

import { createClient } from '@/utils/supabase/serverClient';

import AboutClientWrapper from './AboutClientWrapper';

export default async function About() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('team').select('*').order('id');

  if (error) {
    throw new Error('Error fetching team members.');
  }

  return (
    <Main className="py-0 lg:py-0">
      <AboutClientWrapper people={data} />
    </Main>
  );
}
